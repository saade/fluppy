import { BasePlugin } from '@uppy/core'

const CHUNKS_IN_PARALLEL = 3
const CHUNK_ATTEMPTS = 4

class Paused extends Error {}

class Cancelled extends Error {}

/**
 * Sends each file the way the field plans it: a small one through Livewire's
 * own upload, as Filament's upload field does, and a large one in chunks to
 * the package's route. Either way the file reaches the form's state as a
 * temporary upload.
 */
export default class LivewireUpload extends BasePlugin {
    // What is in flight for each file being sent in chunks, by file ID.
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

            if (plan.strategy === 'chunked') {
                await this.uploadInChunks(file, plan)
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

    uploadThroughLivewire(file) {
        return new Promise((resolve, reject) => {
            this.opts.uploadUsing(
                file.meta.fileKey,
                file.data,
                resolve,
                () => reject(new Error(this.opts.uploadFailedMessage)),
                (percentage) =>
                    this.reportProgress(file, (file.size * percentage) / 100),
            )
        })
    }

    async uploadInChunks(file, plan) {
        const transfer = {
            isPaused: false,
            isCancelled: false,
            requests: new Set(),
            resume: null,
        }

        this.transfers.set(file.id, transfer)

        try {
            let reference = plan.completed

            // Sending stops when the file is paused, and when the signed
            // address of the route expires on a long upload. Both continue
            // from a new plan, which says what has arrived.
            while (!reference) {
                try {
                    reference = await this.sendChunks(file, plan, transfer)
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

                    if (plan.strategy !== 'chunked') {
                        throw new Error(
                            plan.message ?? this.opts.uploadFailedMessage,
                        )
                    }

                    reference = plan.completed
                }
            }

            if (!(await this.opts.adoptUsing(file.meta.fileKey, reference))) {
                throw new Error(this.opts.uploadFailedMessage)
            }
        } finally {
            this.transfers.delete(file.id)
        }
    }

    async sendChunks(file, plan, transfer) {
        const received = new Set(plan.receivedChunks)
        const inFlight = new Map()
        const pending = []

        for (let index = 0; index < plan.totalChunks; index++) {
            if (!received.has(index)) {
                pending.push(index)
            }
        }

        const report = () => {
            const sent = [...received].reduce(
                (bytes, index) => bytes + this.chunkOf(file, plan, index).size,
                0,
            )

            this.reportProgress(
                file,
                sent + [...inFlight.values()].reduce((a, b) => a + b, 0),
            )
        }

        let reference = null
        let lastIndex = null

        const work = async () => {
            while (pending.length && !reference) {
                const index = pending.shift()

                lastIndex = index

                const response = await this.sendChunk(
                    file,
                    plan,
                    index,
                    transfer,
                    (loaded) => {
                        inFlight.set(index, loaded)
                        report()
                    },
                )

                inFlight.delete(index)
                received.add(index)
                report()

                if (response.complete) {
                    reference = response.reference
                }
            }
        }

        report()

        await Promise.all(Array.from({ length: CHUNKS_IN_PARALLEL }, work))

        // Every chunk arrived but none was answered with the file: another
        // request was assembling it. Asking again gets the answer.
        for (let attempt = 0; !reference && attempt < CHUNK_ATTEMPTS; attempt++) {
            await this.wait(1000 * (attempt + 1))

            const response = await this.sendChunk(
                file,
                plan,
                lastIndex ?? plan.totalChunks - 1,
                transfer,
                () => {},
            )

            reference = response.complete ? response.reference : null
        }

        if (!reference) {
            throw new Error(this.opts.uploadFailedMessage)
        }

        return reference
    }

    async sendChunk(file, plan, index, transfer, onProgress) {
        for (let attempt = 1; ; attempt++) {
            if (transfer.isCancelled) {
                throw new Cancelled()
            }

            if (transfer.isPaused) {
                throw new Paused()
            }

            try {
                return await this.request(file, plan, index, transfer, onProgress)
            } catch (error) {
                if (error instanceof Paused || error instanceof Cancelled) {
                    throw error
                }

                // What the server refuses once it refuses again, apart from
                // being asked to slow down.
                const isWorthRetrying =
                    !error.status || error.status === 429 || error.status >= 500

                if (!isWorthRetrying || attempt === CHUNK_ATTEMPTS) {
                    throw error
                }

                await this.wait(error.retryAfter ?? 1000 * 2 ** (attempt - 1))
            }
        }
    }

    request(file, plan, index, transfer, onProgress) {
        return new Promise((resolve, reject) => {
            const body = new FormData()

            body.append('capability', plan.capability)
            body.append('index', index)
            body.append('name', file.name)
            body.append('type', file.type ?? '')
            body.append('chunk', this.chunkOf(file, plan, index), file.name)

            const request = new XMLHttpRequest()

            transfer.requests.add(request)

            const fail = (error) => {
                transfer.requests.delete(request)
                reject(error)
            }

            request.open('POST', plan.url)
            request.setRequestHeader('Accept', 'application/json')
            request.setRequestHeader('X-CSRF-TOKEN', this.opts.csrfToken)
            request.responseType = 'json'

            request.upload.addEventListener('progress', (event) =>
                onProgress(event.loaded),
            )

            request.addEventListener('load', () => {
                if (request.status >= 200 && request.status < 300) {
                    transfer.requests.delete(request)

                    return resolve(request.response)
                }

                const error = new Error(
                    request.response?.message || this.opts.uploadFailedMessage,
                )

                error.status = request.status

                const retryAfter = Number(request.getResponseHeader('Retry-After'))

                if (retryAfter) {
                    error.retryAfter = retryAfter * 1000
                }

                fail(error)
            })

            request.addEventListener('error', () =>
                fail(new Error(this.opts.uploadFailedMessage)),
            )

            request.addEventListener('abort', () =>
                fail(transfer.isCancelled ? new Cancelled() : new Paused()),
            )

            request.send(body)
        })
    }

    chunkOf(file, plan, index) {
        return file.data.slice(
            index * plan.chunkSize,
            Math.min(file.size, (index + 1) * plan.chunkSize),
        )
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

            return
        }

        if (file.progress.uploadStarted && !file.progress.uploadComplete) {
            this.opts.cancelUploadUsing(file.meta.fileKey)
        }
    }
}
