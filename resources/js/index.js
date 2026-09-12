import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import LivewireUpload from './livewire-upload.js'
import { loadUppyLocale } from './locale.js'

// The same generator Filament's own upload field uses, which also works on
// pages served without HTTPS, where `crypto.randomUUID()` is not available.
function generateFileKey() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    )
}

export default function fluppy({
    acceptedFileTypes,
    cancelUploadUsing,
    deleteUploadedFileUsing,
    getUploadedFilesUsing,
    isDeletable,
    isDisabled,
    isMultiple,
    locale,
    maxFiles,
    maxParallelUploads,
    maxSize,
    minSize,
    removeUploadedFileUsing,
    state,
    uploadFailedMessage,
    uploadingMessage,
    uploadUsing,
}) {
    // Kept out of the component's data: Alpine would wrap it in a proxy, and
    // Uppy's private methods cannot be called through one.
    let uppy = null

    return {
        state,

        // Uppy reports a removed file the same way whether the user removed
        // it, the state was replaced or the instance is being torn down. Only
        // the first should reach the server.
        isRemovingSilently: false,

        async init() {
            const uppyLocale = await loadUppyLocale(locale)

            uppy = new Uppy({
                autoProceed: true,
                ...(uppyLocale ? { locale: uppyLocale } : {}),
                restrictions: {
                    allowedFileTypes: acceptedFileTypes?.length
                        ? acceptedFileTypes
                        : null,
                    maxFileSize: maxSize,
                    maxNumberOfFiles: isMultiple ? maxFiles : 1,
                    minFileSize: minSize,
                },
            })
                .use(Dashboard, {
                    target: this.$refs.dashboard,
                    inline: true,
                    width: '100%',
                    height: 320,
                    disabled: isDisabled,
                    hideUploadButton: true,
                    hideCancelButton: true,
                    // "Done" would clear the field once its uploads finish.
                    doneButtonHandler: null,
                    showRemoveButtonAfterComplete: isDeletable && !isDisabled,
                    proudlyDisplayPoweredByUppy: false,
                    theme: this.getTheme(),
                })
                .use(LivewireUpload, {
                    cancelUploadUsing,
                    // The number FilePond uses when Filament's field sets none.
                    maxParallelUploads: maxParallelUploads ?? 2,
                    uploadFailedMessage,
                    uploadUsing,
                })

            uppy.on('file-added', (file) => {
                uppy.setFileMeta(file.id, { fileKey: generateFileKey() })
            })

            uppy.on('file-removed', (file) => {
                if (!uppy.getFiles().some((shownFile) => shownFile.error)) {
                    uppy.setState({ error: null })
                }

                if (this.isRemovingSilently || !file.meta.fileKey) {
                    return
                }

                this.isStoredFile(file.meta.fileKey)
                    ? deleteUploadedFileUsing(file.meta.fileKey)
                    : removeUploadedFileUsing(file.meta.fileKey)
            })

            uppy.on('upload', () => {
                this.dispatchFormEvent('form-processing-started', {
                    message: uploadingMessage,
                })
            })

            uppy.on('complete', () => {
                this.dispatchFormEvent('form-processing-finished')
            })

            this.themeListener = () =>
                uppy
                    .getPlugin('Dashboard')
                    .setOptions({ theme: this.getTheme() })

            window.addEventListener('theme-changed', this.themeListener)

            await this.syncFiles()

            this.$watch('state', () => this.syncFiles())
        },

        destroy() {
            window.removeEventListener('theme-changed', this.themeListener)

            this.isRemovingSilently = true
            uppy?.destroy()
        },

        getUppy() {
            return uppy
        },

        getTheme() {
            return this.$store.theme === 'dark' ? 'dark' : 'light'
        },

        getFileKeysInState() {
            return Object.keys(this.state ?? {})
        },

        isStoredFile(fileKey) {
            const value = this.state?.[fileKey]

            return (
                typeof value === 'string' && !value.startsWith('livewire-file:')
            )
        },

        // A file that is still uploading is not in the form's state yet, so
        // only finished ones are dropped for being missing from it.
        async syncFiles() {
            const fileKeysInState = this.getFileKeysInState()

            const shownFiles = uppy.getFiles()

            this.isRemovingSilently = true

            shownFiles
                .filter(
                    (file) =>
                        file.progress.uploadComplete &&
                        !fileKeysInState.includes(file.meta.fileKey),
                )
                .forEach((file) => uppy.removeFile(file.id))

            this.isRemovingSilently = false

            const shownFileKeys = uppy
                .getFiles()
                .map((file) => file.meta.fileKey)

            if (fileKeysInState.every((key) => shownFileKeys.includes(key))) {
                return
            }

            const uploadedFiles = (await getUploadedFilesUsing()) ?? {}

            Object.entries(uploadedFiles)
                .filter(([fileKey, file]) => file && !shownFileKeys.includes(fileKey))
                .forEach(([fileKey, file]) => this.showStoredFile(fileKey, file))

            // Without this the Dashboard counts stored files as waiting to be
            // uploaded and titles itself "0 files selected".
            if (uppy.getFiles().every((file) => file.progress.uploadComplete)) {
                uppy.setState({ totalProgress: 100 })
            }
        },

        // Uppy has no way to add a file that is already uploaded, and adding
        // it as a new one would download and upload it again. Its entry is
        // written straight into Uppy's state, as a finished upload.
        showStoredFile(fileKey, { name, size, type, url }) {
            const id = `fluppy-${fileKey}`

            uppy.setState({
                files: {
                    ...uppy.getState().files,
                    [id]: {
                        id,
                        name,
                        extension: name.includes('.') ? name.split('.').pop() : '',
                        type,
                        size,
                        data: { size },
                        meta: { name, type, fileKey },
                        source: 'Fluppy',
                        isRemote: false,
                        isGhost: false,
                        preview: type?.startsWith('image/') ? url : undefined,
                        uploadURL: url,
                        progress: {
                            percentage: 100,
                            bytesUploaded: size,
                            bytesTotal: size,
                            uploadComplete: true,
                            uploadStarted: Date.now(),
                        },
                    },
                },
            })
        },

        dispatchFormEvent(name, detail = {}) {
            this.$el.closest('form')?.dispatchEvent(
                new CustomEvent(name, {
                    composed: true,
                    cancelable: true,
                    detail,
                }),
            )
        },
    }
}
