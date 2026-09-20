import { BasePlugin } from '@uppy/core'

const PIECES_IN_PARALLEL = 3
const ATTEMPTS = 4
const PARTS_SIGNED_AT_ONCE = 10

class Paused extends Error {}

class Cancelled extends Error {}

/**
 * Sends each file the way the field plans it: a small one through Livewire's
 * own upload, as Filament's upload field does, and a large one in pieces,
 * either as chunks to the package's route or as the parts of an S3 multipart
 * upload. Whichever way, the file reaches the form's state as a temporary
 * upload.
 */
export default class LivewireUpload extends BasePlugin {
    // What is in flight for each file being sent in pieces, by file ID.
    transfers = new Map()

    constructor(uppy, opts) {
        super(uppy, opts)

        this.id = 'LivewireUpload'
        this.type = 'uploader'
    }

    install() {
        this.uppy.addUploader(this.upload)
        this.uppy.on('file-removed', this.cancel)
        this.uppy.on('upload-pause', this.pauseOrResume)
        this.uppy.on('pause-all', this.pauseAll)
        this.uppy.on('resume-all', this.resumeAll)

        if (this.opts.isChunked) {
            this.uppy.setState({
                capabilities: {
                    ...this.uppy.getState().capabilities,
                    resumableUploads: true,
                },
            })
        }
    }

    uninstall() {
        this.uppy.removeUploader(this.upload)
        this.uppy.off('file-removed', this.cancel)
        this.uppy.off('upload-pause', this.pauseOrResume)
        this.uppy.off('pause-all', this.pauseAll)
        this.uppy.off('resume-all', this.resumeAll)
    }

    upload = (fileIds) => {
        const files = this.uppy.getFilesByIds(fileIds)

        this.uppy.emit('upload-start', files)

        const queue = [...files]

        const work = async () => {
            while (queue.length) {
                await this.uploadFile(queue.shift())
            }
        }

        return Promise.all(
            Array.from({ length: this.opts.maxParallelUploads }, work),
        )
    }

    async uploadFile(file) {
        try {
            const plan = await this.plan(file)

            if (!this.uppy.getFile(file.id)) {
                return
            }

            if (plan.strategy === 'reject') {
                throw new Error(plan.message)
            }

            if (this.isInPieces(plan)) {
                await this.uploadInPieces(file, plan)
            } else {
                await this.uploadThroughLivewire(file)
            }

            if (!this.uppy.getFile(file.id)) {
                return
            }

            this.uppy.emit('upload-success', this.uppy.getFile(file.id), {
                status: 200,
                body: {},
            })
        } catch (error) {
            if (error instanceof Cancelled || !this.uppy.getFile(file.id)) {
                return
            }

            this.uppy.emit('upload-error', this.uppy.getFile(file.id), error)
        }
    }

    plan(file) {
        return this.opts.planUsing({
            name: file.name,
            size: file.size,
            type: file.type ?? '',
            lastModified: file.data.lastModified ?? 0,
        })
    }

    isInPieces(plan) {
        return plan.strategy === 'chunked' || plan.strategy === 's3'
    }

    uploadThroughLivewire(file) {
        return new Promise((resolve, reject) => {
            this.opts.uploadUsing(
                file.meta.fileKey,
                // What the camera and the other sources produce has no name
                // of its own, and Livewire takes the name from the file.
                file.data instanceof File
                    ? file.data
                    : new File([file.data], file.name, { type: file.type }),
                resolve,
                () => reject(this.failure()),
                (percentage) =>
                    this.reportProgress(file, (file.size * percentage) / 100),
            )
        })
    }

    async uploadInPieces(file, plan) {
        const transfer = {
            isPaused: false,
            isCancelled: false,
            requests: new Set(),
            resume: null,
            abort: null,
        }

        this.transfers.set(file.id, transfer)

        try {
            let reference = plan.completed

            // Sending stops when the file is paused, and when the signed
            // address of the chunk route expires on a long upload. Both
            // continue from a new plan, which says what has arrived.
            while (!reference) {
                const { capability } = plan

                // The field may be gone by the time this is called.
                transfer.abort =
                    plan.strategy === 's3'
                        ? () =>
                              Promise.resolve()
                                  .then(() => this.opts.abortUsing(capability))
                                  .catch(() => {})
                        : null

                try {
                    reference =
                        plan.strategy === 's3'
                            ? await this.sendParts(file, plan, transfer)
                            : await this.sendChunks(file, plan, transfer)
                } catch (error) {
                    if (!(error instanceof Paused) && error.status !== 401) {
                        throw error
                    }

                    while (transfer.isPaused && !transfer.isCancelled) {
                        await new Promise((resume) => (transfer.resume = resume))
                    }

                    if (transfer.isCancelled) {
                        throw new Cancelled()
                    }

                    plan = await this.plan(file)

                    if (!this.isInPieces(plan)) {
                        throw this.failure(plan.message)
                    }

                    reference = plan.completed
                }
            }

            if (!(await this.opts.adoptUsing(file.meta.fileKey, reference))) {
                throw this.failure()
            }
        } finally {
            this.transfers.delete(file.id)
        }
    }

    /**
     * Sends the pieces that are missing, a few at a time, reporting progress
     * as the bytes of the ones that arrived plus those on their way.
     */
    async sendPieces(file, { missing, sizeOf, arrived, send }) {
        const inFlight = new Map()
        const pending = [...missing]

        const report = () =>
            this.reportProgress(
                file,
                [...arrived].reduce((bytes, piece) => bytes + sizeOf(piece), 0) +
                    [...inFlight.values()].reduce((a, b) => a + b, 0),
            )

        const work = async () => {
            while (pending.length) {
                const piece = pending.shift()

                const isDone = await send(piece, pending, (loaded) => {
                    inFlight.set(piece, loaded)
                    report()
                })

                inFlight.delete(piece)
                arrived.add(piece)
                report()

                if (isDone) {
                    pending.length = 0
                }
            }
        }

        report()

        await Promise.all(Array.from({ length: PIECES_IN_PARALLEL }, work))
    }

    async sendChunks(file, plan, transfer) {
        const arrived = new Set(plan.receivedChunks)
        const chunkOf = (index) =>
            file.data.slice(
                index * plan.chunkSize,
                Math.min(file.size, (index + 1) * plan.chunkSize),
            )

        const sendChunk = (index, onProgress) => {
            const body = new FormData()

            body.append('capability', plan.capability)
            body.append('index', index)
            body.append('name', file.name)
            body.append('type', file.type ?? '')
            body.append('chunk', chunkOf(index), file.name)

            return this.attempt(transfer, () =>
                this.request(transfer, {
                    method: 'POST',
                    url: plan.url,
                    headers: {
                        Accept: 'application/json',
                        'X-CSRF-TOKEN': this.opts.csrfToken,
                    },
                    body,
                    onProgress,
                }),
            )
        }

        let reference = null
        let lastIndex = plan.totalChunks - 1

        await this.sendPieces(file, {
            missing: this.range(0, plan.totalChunks - 1).filter(
                (index) => !arrived.has(index),
            ),
            sizeOf: (index) => chunkOf(index).size,
            arrived,
            send: async (index, pending, onProgress) => {
                lastIndex = index

                const response = await sendChunk(index, onProgress)

                reference = response?.complete ? response.reference : reference

                return Boolean(reference)
            },
        })

        // Every chunk arrived but none was answered with the file: another
        // request was assembling it. Asking again gets the answer.
        for (let attempt = 0; !reference && attempt < ATTEMPTS; attempt++) {
            await this.wait(1000 * (attempt + 1))

            const response = await sendChunk(lastIndex, () => {})

            reference = response?.complete ? response.reference : null
        }

        if (!reference) {
            throw this.failure()
        }

        return reference
    }

    async sendParts(file, plan, transfer) {
        const arrived = new Set(plan.uploadedParts)
        const addresses = new Map()
        const partOf = (number) =>
            file.data.slice(
                (number - 1) * plan.partSize,
                Math.min(file.size, number * plan.partSize),
            )

        let signing = null

        // Addresses are signed a few parts ahead: each is only valid for a
        // while, and a very large file has thousands of parts.
        const addressOf = async (number, pending) => {
            await signing

            if (!addresses.has(number)) {
                signing = this.opts
                    .signPartsUsing(plan.capability, [
                        number,
                        ...pending.slice(0, PARTS_SIGNED_AT_ONCE - 1),
                    ])
                    .then((signed) =>
                        Object.entries(signed ?? {}).forEach(([part, address]) =>
                            addresses.set(Number(part), address),
                        ),
                    )
                    .finally(() => (signing = null))

                await signing
            }

            if (!addresses.has(number)) {
                throw this.failure()
            }

            const address = addresses.get(number)

            addresses.delete(number)

            return address
        }

        await this.sendPieces(file, {
            missing: this.range(1, plan.totalParts).filter(
                (number) => !arrived.has(number),
            ),
            sizeOf: (number) => partOf(number).size,
            arrived,
            send: async (number, pending, onProgress) => {
                await this.attempt(
                    transfer,
                    async () =>
                        this.request(transfer, {
                            method: 'PUT',
                            url: await addressOf(number, pending),
                            body: partOf(number),
                            onProgress,
                        }),
                    { retryForbidden: true },
                )

                return false
            },
        })

        const reference = await this.opts.completeUsing(plan.capability)

        if (!reference) {
            throw this.failure()
        }

        return reference
    }

    /**
     * What the server refuses once it refuses again, apart from being asked
     * to slow down. S3 also refuses an address that has expired, which is
     * worth another attempt because each one signs a new address.
     */
    async attempt(transfer, send, { retryForbidden = false } = {}) {
        for (let attempt = 1; ; attempt++) {
            if (transfer.isCancelled) {
                throw new Cancelled()
            }

            if (transfer.isPaused) {
                throw new Paused()
            }

            try {
                return await send()
            } catch (error) {
                if (error instanceof Paused || error instanceof Cancelled) {
                    throw error
                }

                const isWorthRetrying =
                    !error.status ||
                    (retryForbidden && error.status === 403) ||
                    error.status === 429 ||
                    error.status >= 500

                if (!isWorthRetrying || attempt === ATTEMPTS) {
                    throw error
                }

                await this.wait(error.retryAfter ?? 1000 * 2 ** (attempt - 1))
            }
        }
    }

    request(transfer, { method, url, headers = {}, body, onProgress }) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest()

            transfer.requests.add(request)

            const fail = (error) => {
                transfer.requests.delete(request)
                reject(error)
            }

            request.open(method, url)

            Object.entries(headers).forEach(([name, value]) =>
                request.setRequestHeader(name, value),
            )

            request.upload.addEventListener('progress', (event) =>
                onProgress(event.loaded),
            )

            request.addEventListener('load', () => {
                if (request.status >= 200 && request.status < 300) {
                    transfer.requests.delete(request)

                    return resolve(this.json(request))
                }

                const error = this.failure(this.json(request)?.message)

                error.status = request.status

                const retryAfter = Number(request.getResponseHeader('Retry-After'))

                if (retryAfter) {
                    error.retryAfter = retryAfter * 1000
                }

                fail(error)
            })

            request.addEventListener('error', () => fail(this.failure()))

            request.addEventListener('abort', () =>
                fail(transfer.isCancelled ? new Cancelled() : new Paused()),
            )

            request.send(body)
        })
    }

    json(request) {
        try {
            return JSON.parse(request.responseText)
        } catch {
            return null
        }
    }

    failure(message) {
        return new Error(message || this.opts.uploadFailedMessage)
    }

    range(from, to) {
        return Array.from({ length: to - from + 1 }, (_, index) => from + index)
    }

    reportProgress(file, bytesUploaded) {
        const current = this.uppy.getFile(file.id)

        if (!current) {
            return
        }

        this.uppy.emit('upload-progress', current, {
            uploadStarted: current.progress.uploadStarted ?? Date.now(),
            bytesUploaded: Math.min(bytesUploaded, file.size),
            bytesTotal: file.size,
        })
    }

    wait(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds))
    }

    setPaused(fileId, isPaused) {
        const transfer = this.transfers.get(fileId)

        if (!transfer || transfer.isPaused === isPaused) {
            return
        }

        transfer.isPaused = isPaused

        if (isPaused) {
            transfer.requests.forEach((request) => request.abort())
        } else {
            transfer.resume?.()
        }
    }

    pauseOrResume = (file, isPaused) => {
        this.setPaused(file?.id ?? file, isPaused)
    }

    pauseAll = () => {
        this.transfers.forEach((transfer, fileId) => this.setPaused(fileId, true))
    }

    resumeAll = () => {
        this.transfers.forEach((transfer, fileId) => this.setPaused(fileId, false))
    }

    cancel = (file) => {
        const transfer = this.transfers.get(file.id)

        if (transfer) {
            transfer.isCancelled = true
            transfer.requests.forEach((request) => request.abort())
            transfer.resume?.()
            transfer.abort?.()

            return
        }

        if (file.progress.uploadStarted && !file.progress.uploadComplete) {
            this.opts.cancelUploadUsing(file.meta.fileKey)
        }
    }
}
