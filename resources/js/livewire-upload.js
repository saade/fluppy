import { BasePlugin } from '@uppy/core'

/**
 * Sends each file through Livewire's own upload, the way Filament's upload
 * field does, so the file reaches the form's state as a temporary upload.
 */
export default class LivewireUpload extends BasePlugin {
    constructor(uppy, opts) {
        super(uppy, opts)

        this.id = 'LivewireUpload'
        this.type = 'uploader'
    }

    install() {
        this.uppy.addUploader(this.upload)
        this.uppy.on('file-removed', this.cancel)
    }

    uninstall() {
        this.uppy.removeUploader(this.upload)
        this.uppy.off('file-removed', this.cancel)
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

    uploadFile(file) {
        return new Promise((resolve) => {
            const uploadStarted = Date.now()

            this.opts.uploadUsing(
                file.meta.fileKey,
                file.data,
                () => {
                    this.uppy.emit('upload-success', this.uppy.getFile(file.id), {
                        status: 200,
                        body: {},
                    })

                    resolve()
                },
                () => {
                    this.uppy.emit(
                        'upload-error',
                        this.uppy.getFile(file.id),
                        new Error(this.opts.uploadFailedMessage),
                    )

                    resolve()
                },
                (percentage) => {
                    if (!this.uppy.getFile(file.id)) {
                        return
                    }

                    this.uppy.emit('upload-progress', this.uppy.getFile(file.id), {
                        uploadStarted,
                        bytesUploaded: (file.size * percentage) / 100,
                        bytesTotal: file.size,
                    })
                },
            )
        })
    }

    cancel = (file) => {
        if (file.progress.uploadStarted && !file.progress.uploadComplete) {
            this.opts.cancelUploadUsing(file.meta.fileKey)
        }
    }
}
