// Each is a chunk of its own, loaded only by a field that has it on.
const sources = {
    camera: () => import('@uppy/webcam'),
    microphone: () => import('@uppy/audio'),
    screenCapture: () => import('@uppy/screen-capture'),
}

const isOnly = (acceptedFileTypes, kind) =>
    Boolean(acceptedFileTypes?.length) &&
    acceptedFileTypes.every((type) => type.startsWith(`${kind}/`))

// Uppy's own plugin for each account a person connects and then browses, by
// the id its source is registered with on the server. They are all set up
// the same way.
const browsableSources = {
    box: () => import('@uppy/box'),
    dropbox: () => import('@uppy/dropbox'),
    facebook: () => import('@uppy/facebook'),
    onedrive: () => import('@uppy/onedrive'),
    zoom: () => import('@uppy/zoom'),
}

// A remote source's plugin only says which file: the server fetches it. How
// each of the others is set up to ask the field, rather than Uppy's
// Companion, is here.
const remoteSources = {
    url: async (uppy, { label }, { describe, failedMessage }) => {
        const { default: Url } = await import('@uppy/url')

        uppy.use(Url, {
            id: 'url',
            // Required by the plugin and never called.
            companionUrl: window.location.origin,
            locale: { strings: { pluginNameUrl: label } },
        })

        // The plugin's own asks Companion about the link, and of a link it
        // turns away only says that Companion failed. This one asks the
        // field, and shows the reason the field gives.
        uppy.getPlugin('url').addFile = async (link) => {
            if (link.startsWith('blob')) {
                return
            }

            const url = /^[a-z0-9]+:\/\//i.test(link) ? link : `https://${link}`
            const file = await describe('url', { url }).catch(() => null)

            if (!file || file.error) {
                uppy.info(file?.error ?? failedMessage, 'error', 5000)

                return
            }

            try {
                return uppy.addFile({
                    source: 'url',
                    name: file.name,
                    type: file.type,
                    data: { size: file.size },
                    isRemote: true,
                    remote: { body: { url } },
                })
            } catch {
                // Turned away by one of the field's restrictions, which
                // Uppy has already told the person about.
            }
        }
    },

    'google-drive': async (uppy, { label, clientId, apiKey, appId, exports }) => {
        const { default: GoogleDrivePicker } = await import(
            '@uppy/google-drive-picker'
        )

        useGooglePicker(uppy, GoogleDrivePicker, 'google-drive', {
            clientId,
            apiKey,
            appId,
            locale: { strings: { pluginNameGoogleDrivePicker: label } },
        })

        // A document made in Google's editors is picked as what it is in
        // Drive, and fetched as what it is exported to. Uppy holds a file to
        // the field's accepted types as it is added, so it is shown the
        // file the document is going to be.
        uppy.setOptions({
            onBeforeFileAdded: (file) => {
                // Not a shortcut: what it leads to is only known once the
                // server has followed it.
                const isDocument =
                    file.remote?.requestClientId === GoogleDrivePicker.requestClientId &&
                    file.type?.startsWith('application/vnd.google-apps.') &&
                    file.type !== 'application/vnd.google-apps.shortcut'

                // Left to Uppy when it has the file already: a changed file
                // is added without being checked for that.
                if (!isDocument || uppy.checkIfFileAlreadyExists(file.id)) {
                    return undefined
                }

                const [type, extension] = exports[file.type] ?? exports['*']
                const name = file.name.toLowerCase().endsWith(`.${extension}`)
                    ? file.name
                    : `${file.name}.${extension}`

                return {
                    ...file,
                    name,
                    type,
                    extension,
                    meta: { ...file.meta, name, type },
                }
            },
        })
    },

    'google-photos': async (uppy, { label, clientId }) => {
        const { default: GooglePhotosPicker } = await import(
            '@uppy/google-photos-picker'
        )

        // The server asks Google for an item at the address the picker
        // gave with it. What the item is called and what kind of file it
        // is, only the picker said, so that goes along too.
        useGooglePicker(
            uppy,
            GooglePhotosPicker,
            'google-photos',
            {
                clientId,
                locale: { strings: { pluginNameGooglePhotosPicker: label } },
            },
            (file) => ({ name: file.name, type: file.type }),
        )
    },
}

/**
 * Adds one of Uppy's plugins for a picker of Google's own, where the person
 * signs in to Google in the browser and the token they are given comes with
 * each item they pick.
 */
function useGooglePicker(uppy, Plugin, source, options, describe = () => ({})) {
    // Not given an id of its own: the picker's view only hears of its state
    // under the plugin's default one.
    uppy.use(Plugin, {
        companionUrl: window.location.origin,
        // The plugin keeps Google's access token in `localStorage` by
        // default, where it outlives the tab and the session.
        storage: {
            getItem: async (key) => sessionStorage.getItem(key),
            setItem: async (key, value) => sessionStorage.setItem(key, value),
            removeItem: async (key) => sessionStorage.removeItem(key),
        },
        ...options,
    })

    // A picked file says nothing of where it came from but the client it
    // was meant to be fetched through.
    uppy.on('file-added', (file) => {
        if (file.remote?.requestClientId !== Plugin.requestClientId) {
            return
        }

        uppy.setFileState(file.id, {
            source,
            remote: {
                ...file.remote,
                body: { ...file.remote.body, ...describe(file) },
            },
        })
    })
}

export async function useRemoteSources(uppy, enabled, context) {
    for (const [id, options] of Object.entries(enabled ?? {})) {
        if (id in browsableSources) {
            const [{ default: Plugin }, { useBrowsableSource }] = await Promise.all([
                browsableSources[id](),
                import('./browsable-source.js'),
            ])

            useBrowsableSource(uppy, Plugin, id, options, context)

            continue
        }

        await remoteSources[id]?.(uppy, options, context)
    }
}

/**
 * Adds to Uppy the places, other than the device's files, a file can come
 * from. The Dashboard shows each as a button of its own.
 */
export async function useSources(uppy, names, { acceptedFileTypes }) {
    for (const name of names.filter((name) => name in sources)) {
        const { default: Source } = await sources[name]()

        uppy.use(
            Source,
            // A field for images has no use for a video of the camera, nor
            // one for videos for a picture.
            name === 'camera' && isOnly(acceptedFileTypes, 'image')
                ? { modes: ['picture'] }
                : name === 'camera' && isOnly(acceptedFileTypes, 'video')
                  ? { modes: ['video-audio'] }
                  : {},
        )
    }
}
