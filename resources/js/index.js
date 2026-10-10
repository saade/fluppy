import { prettierBytes } from '@transloadit/prettier-bytes'
import Uppy, { UIPlugin } from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import { Component, h } from 'preact'
import LivewireUpload from './livewire-upload.js'
import { isEditable, useImageEditor } from './image-editor.js'
import { useItemActions } from './item-actions.js'
import { loadUppyLocale } from './locale.js'
import { useRemoteSources, useSources } from './sources.js'

// An extension is built apart from this file, and Uppy only works with one
// copy of itself and of Preact in the page. So what an extension needs of
// them is handed to it from here.
const modules = { Component, h, UIPlugin }

const plugins = {
    imageGenerator: () => import('@uppy/image-generator'),
}

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
    abortMultipartUploadUsing,
    acceptedFileTypes,
    adoptUploadUsing,
    callMethodUsing,
    cancelUploadUsing,
    completeMultipartUploadUsing,
    csrfToken,
    deleteUploadedFileUsing,
    describeRemoteFileUsing,
    disconnectRemoteSourceUsing,
    downloadLabel,
    editLabel,
    extensions,
    getUploadedFilesUsing,
    height,
    imageEditor,
    isChunked,
    isDeletable,
    isDisabled,
    isDownloadable,
    isModal,
    isMultiple,
    isOpenable,
    isPreviewable,
    isReorderable,
    listRemoteFilesUsing,
    locale,
    maxFiles,
    maxParallelUploads,
    maxSize,
    minSize,
    placeUploadedFileUsing,
    planRemoteUploadUsing,
    planUploadUsing,
    remoteSources,
    removeUploadedFileUsing,
    reorderUploadedFilesUsing,
    signUploadPartsUsing,
    sources,
    state,
    uploadFailedMessage,
    uploadingMessage,
    uploadUsing,
}) {
    // Kept out of the component's data: Alpine would wrap them in a proxy,
    // and neither Uppy's private methods nor a native object's can be called
    // through one.
    let uppy = null
    let reorderObserver = null
    let stopItemActions = null
    let modalContainer = null

    // Where each edited image goes once it is uploaded, by file ID.
    const placements = new Map()

    // Also kept out: Alpine returns a new bound function each time a method
    // is read from the data, so the listener could never be removed.
    let themeListener = null

    return {
        state,

        // Uppy reports a removed file the same way whether the user removed
        // it, the state was replaced or the instance is being torn down. Only
        // the first should reach the server.
        isRemovingSilently: false,

        // What the field shows of its files while the modal is closed.
        files: [],

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
                    target: this.getContainer(),
                    ...(isModal
                        ? { inline: false, closeModalOnClickOutside: true }
                        : { inline: true, width: '100%', height: height ?? 320 }),
                    disabled: isDisabled,
                    hideUploadButton: true,
                    hideCancelButton: true,
                    // "Done" would clear the field once its uploads finish.
                    doneButtonHandler: null,
                    showRemoveButtonAfterComplete: isDeletable && !isDisabled,
                    showLinkToFileUploadResult: isOpenable,
                    disableThumbnailGenerator: !isPreviewable,
                    // Uppy's own is JPEG, which has no transparency: what
                    // an image leaves empty comes out black.
                    thumbnailType: 'image/png',
                    proudlyDisplayPoweredByUppy: false,
                    theme: this.getTheme(),
                })
                .use(LivewireUpload, {
                    abortUsing: abortMultipartUploadUsing,
                    adoptUsing: adoptUploadUsing,
                    cancelUploadUsing,
                    completeUsing: completeMultipartUploadUsing,
                    signPartsUsing: signUploadPartsUsing,
                    csrfToken,
                    isChunked,
                    planRemoteUsing: planRemoteUploadUsing,
                    planUsing: planUploadUsing,
                    // The number FilePond uses when Filament's field sets none.
                    maxParallelUploads: maxParallelUploads ?? 2,
                    uploadFailedMessage,
                    uploadUsing,
                })

            if (!isDisabled) {
                await useSources(uppy, sources ?? [], { acceptedFileTypes })
                await useRemoteSources(uppy, remoteSources, {
                    describe: describeRemoteFileUsing,
                    disconnect: disconnectRemoteSourceUsing,
                    failedMessage: uploadFailedMessage,
                    list: listRemoteFilesUsing,
                })
            }

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

                // A file that finished uploading after the others were
                // reordered was added to the end of the state.
                if (isReorderable && !isDisabled) {
                    this.saveFileOrder()
                }
            })

            if (isReorderable && !isDisabled) {
                this.enableReordering()
            }

            if (!isDisabled) {
                for (const { script, options } of extensions ?? []) {
                    const { default: extend } = await import(
                        /* @vite-ignore */ script
                    )

                    await extend({
                        uppy,
                        options,
                        root: this.$el,
                        call: callMethodUsing,
                        modules,
                        plugins,
                    })
                }
            }

            if (imageEditor && !isDisabled) {
                await useImageEditor(uppy, imageEditor)

                uppy.on('file-editor:complete', (file) => this.replaceFile(file))

                uppy.on('upload-success', (file) => {
                    if (placements.has(file.id)) {
                        placeUploadedFileUsing(
                            file.meta.fileKey,
                            placements.get(file.id),
                        )

                        placements.delete(file.id)
                    }
                })
            }

            stopItemActions = useItemActions(
                uppy,
                this.getContainer(),
                (file) => [
                    ...(isEditable(uppy, file) && !isDisabled
                        ? [
                              {
                                  name: 'edit',
                                  label: editLabel,
                                  onClick: (fileId) => this.editFile(fileId),
                              },
                          ]
                        : []),
                    ...(file.meta.downloadUrl
                        ? [
                              {
                                  name: 'download',
                                  label: downloadLabel,
                                  href: file.meta.downloadUrl,
                              },
                          ]
                        : []),
                ],
            )

            if (isModal) {
                uppy.on('state-update', () => this.summarize())
            }

            themeListener = () =>
                uppy
                    .getPlugin('Dashboard')
                    .setOptions({ theme: this.getTheme() })

            window.addEventListener('theme-changed', themeListener)

            await this.syncFiles()

            this.$watch('state', () => this.syncFiles())
        },

        destroy() {
            window.removeEventListener('theme-changed', themeListener)
            reorderObserver?.disconnect()
            stopItemActions?.()

            this.isRemovingSilently = true
            uppy?.destroy()
            modalContainer?.remove()
        },

        getUppy() {
            return uppy
        },

        // Inline, the Dashboard is drawn inside the field. As a modal it is
        // drawn at the end of the page, over everything, in an element that
        // carries the field's class so the theme still styles it.
        getContainer() {
            if (!isModal) {
                return this.$refs.dashboard
            }

            if (!modalContainer) {
                modalContainer = document.createElement('div')
                modalContainer.className = 'fi-fluppy fi-fluppy-modal'

                if (isReorderable && !isDisabled) {
                    modalContainer.classList.add('fi-fluppy-reorderable')
                }

                document.body.append(modalContainer)
            }

            return modalContainer
        },

        openModal() {
            uppy.getPlugin('Dashboard').openModal()
        },

        removeFile(fileId) {
            uppy.removeFile(fileId)
        },

        // Kept as plain values: the summary is drawn by Alpine, which must
        // not be handed Uppy's own objects.
        summarize() {
            this.files = uppy.getFiles().map((file) => ({
                id: file.id,
                name: file.name,
                size: prettierBytes(file.size ?? 0),
                percentage: Math.round(file.progress.percentage ?? 0),
                isComplete: Boolean(file.progress.uploadComplete),
                error: file.error ?? null,
            }))
        },

        async editFile(fileId) {
            const file = uppy.getFile(fileId)

            // A stored file is only shown, by its details. To be edited it
            // has to be in the browser first.
            if (file.source === 'Fluppy' && file.data.size === 0) {
                try {
                    const response = await fetch(file.meta.url)

                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }

                    uppy.setFileState(fileId, { data: await response.blob() })
                } catch {
                    uppy.info(uploadFailedMessage, 'error')

                    return
                }
            }

            uppy.getPlugin('Dashboard').openFileEditor(uppy.getFile(fileId))
        },

        // The edited image is uploaded as a new file, in the place of the
        // one it was made from, which is removed as if by its remove button.
        replaceFile(file) {
            const position = Object.keys(uppy.getState().files).indexOf(file.id)

            uppy.removeFile(file.id)

            // A stored file can be known by a name without an extension, as
            // the media library's are, and the upload is named after it.
            const extension = file.type.split('/')[1].replace('jpeg', 'jpg')

            const fileId = uppy.addFile({
                name: /\.\w+$/.test(file.name)
                    ? file.name
                    : `${file.name}.${extension}`,
                type: file.type,
                data: file.data,
                source: 'ImageEditor',
            })

            const { files } = uppy.getState()
            const fileIds = Object.keys(files).filter((id) => id !== fileId)

            fileIds.splice(position, 0, fileId)

            uppy.setState({
                files: Object.fromEntries(fileIds.map((id) => [id, files[id]])),
            })

            // The upload lands at the end of the form's state. Once it is
            // there, it is put before the file that follows it here.
            const nextFileId = fileIds[position + 1]

            if (nextFileId) {
                placements.set(fileId, files[nextFileId].meta.fileKey)
            }
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
        showStoredFile(
            fileKey,
            { name, size, type, url, openableUrl, downloadableUrl },
        ) {
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
                        // Empty, but a real Blob: when a single image is
                        // left Uppy draws a large picture from its data,
                        // and anything else there throws.
                        data: new Blob([], { type: type ?? '' }),
                        meta: {
                            name,
                            type,
                            fileKey,
                            url,
                            downloadUrl: isDownloadable
                                ? (downloadableUrl ?? url)
                                : null,
                        },
                        source: 'Fluppy',
                        isRemote: false,
                        isGhost: false,
                        preview:
                            isPreviewable && type?.startsWith('image/')
                                ? url
                                : undefined,
                        uploadURL: openableUrl ?? url,
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

        // Uppy's Dashboard has no reordering. Its files are shown in the
        // order of their keys in Uppy's state, so a file dragged onto
        // another is moved there by rebuilding that object.
        enableReordering() {
            const dashboard = this.getContainer()
            const getItem = (event) =>
                event.target.closest?.('.uppy-Dashboard-Item')
            const getFileId = (item) => item.id.replace(/^uppy_/, '')

            let draggedFileId = null
            let dropTarget = null

            const markDropTarget = (item) => {
                dropTarget?.removeAttribute('data-fluppy-drop-target')
                dropTarget = item
                dropTarget?.setAttribute('data-fluppy-drop-target', '')
            }

            reorderObserver = new MutationObserver(() => {
                dashboard
                    .querySelectorAll('.uppy-Dashboard-Item:not([draggable])')
                    .forEach((item) => (item.draggable = true))
            })

            reorderObserver.observe(dashboard, {
                childList: true,
                subtree: true,
            })

            dashboard.addEventListener('dragstart', (event) => {
                const item = getItem(event)

                if (!item) {
                    return
                }

                draggedFileId = getFileId(item)
                event.dataTransfer.effectAllowed = 'move'
            })

            // Handled before Uppy sees them, which would otherwise treat the
            // drag as files being dropped onto the Dashboard.
            dashboard.addEventListener(
                'dragover',
                (event) => {
                    if (!draggedFileId) {
                        return
                    }

                    event.preventDefault()
                    event.stopPropagation()
                    event.dataTransfer.dropEffect = 'move'

                    const item = getItem(event)

                    markDropTarget(
                        item && getFileId(item) !== draggedFileId ? item : null,
                    )
                },
                true,
            )

            dashboard.addEventListener(
                'drop',
                (event) => {
                    if (!draggedFileId) {
                        return
                    }

                    event.preventDefault()
                    event.stopPropagation()

                    const item = getItem(event)

                    if (item) {
                        this.moveFile(draggedFileId, getFileId(item))
                    }
                },
                true,
            )

            dashboard.addEventListener('dragend', () => {
                draggedFileId = null
                markDropTarget(null)
            })
        },

        moveFile(fileId, targetFileId) {
            const { files } = uppy.getState()
            const fileIds = Object.keys(files)
            const from = fileIds.indexOf(fileId)
            const to = fileIds.indexOf(targetFileId)

            if (from === -1 || to === -1 || from === to) {
                return
            }

            fileIds.splice(to, 0, fileIds.splice(from, 1)[0])

            uppy.setState({
                files: Object.fromEntries(
                    fileIds.map((id) => [id, files[id]]),
                ),
            })

            this.saveFileOrder()
        },

        saveFileOrder() {
            const fileKeys = uppy.getFiles().map((file) => file.meta.fileKey)

            if (
                fileKeys.join() ===
                this.getFileKeysInState()
                    .filter((key) => fileKeys.includes(key))
                    .join()
            ) {
                return
            }

            reorderUploadedFilesUsing(fileKeys)
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
