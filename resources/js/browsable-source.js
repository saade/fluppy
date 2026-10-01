const CONNECTING_WINDOW = 'popup,width=640,height=760'

// How long a closed window is given for its last word to arrive.
const GRACE = 1000

/**
 * Adds one of Uppy's own plugins for a cloud drive to Uppy, with Companion
 * taken out of it. The plugin keeps its icon and Uppy's whole file browser.
 * What the browser shows comes from the field, which asks the server, and
 * connecting an account is a window on the application's own address.
 */
export function useBrowsableSource(
    uppy,
    Plugin,
    id,
    { label, connectUrl },
    { list, disconnect, failedMessage },
) {
    const notConnected = () =>
        Object.assign(new Error('Authorization required'), { isAuthError: true })

    // Uppy's own provider does this as answers come in from Companion. It
    // is what the browser goes by to show the files or the button to
    // connect.
    const setConnected = (isConnected) =>
        uppy.getPlugin(id)?.setPluginState({ authenticated: isConnected })

    // The window says how connecting went on a channel that only pages of
    // this origin hear, since the provider's own pages may have cut what
    // ties the window to this one.
    const channel = new BroadcastChannel('fluppy')

    let connecting = null

    channel.addEventListener('message', ({ data }) => {
        if (data?.source !== id) {
            return
        }

        if (connecting) {
            return data.isConnected
                ? connecting.resolve()
                : connecting.reject(new Error(failedMessage))
        }

        // Connected from another field of the page, or after this one gave
        // up waiting for a window it took for closed.
        if (data.isConnected) {
            const plugin = uppy.getPlugin(id)

            setConnected(true)
            plugin?.view.openFolder(plugin.rootFolderId)
        }
    })

    const provider = {
        provider: id,
        name: label,

        // Steps Companion has and this has no use for.
        fetchPreAuthToken: async () => {},
        fileUrl: (path) => path,

        async list(path) {
            const listing = await list(id, path ?? null)

            if (listing?.authenticated === false) {
                setConnected(false)

                throw notConnected()
            }

            if (!listing || listing.error) {
                const message = listing?.error ?? failedMessage

                uppy.info(message, 'error', 5000)

                throw new Error(message)
            }

            setConnected(true)

            return listing
        },

        login({ signal } = {}) {
            // Opened here and now: a browser only lets a window open in
            // answer to a click.
            const opened = window.open(connectUrl, '_blank', CONNECTING_WINDOW)

            return new Promise((resolve, reject) => {
                let poll = null

                const settle = (settleWith) => (value) => {
                    clearInterval(poll)
                    signal?.removeEventListener('abort', cancel)
                    connecting = null
                    settleWith(value)
                }

                const cancel = () => {
                    opened?.close()
                    connecting?.reject(new Error(failedMessage))
                }

                connecting = { resolve: settle(resolve), reject: settle(reject) }

                if (!opened) {
                    return connecting.reject(new Error(failedMessage))
                }

                signal?.addEventListener('abort', cancel)

                poll = setInterval(() => {
                    if (opened.closed) {
                        clearInterval(poll)
                        setTimeout(
                            () => connecting?.reject(new Error(failedMessage)),
                            GRACE,
                        )
                    }
                }, 500)
            })
        },

        async logout() {
            await disconnect(id)

            return { ok: true, revoked: true }
        },
    }

    class BrowsableSource extends Plugin {
        constructor(uppy, opts) {
            super(uppy, opts)

            this.provider = provider
            this.title = label
        }

        install() {
            super.install()

            // Uppy would ask the provider to search. Without it, the box
            // above the files filters the ones that are listed.
            this.view.opts.supportsSearch = false
        }

        uninstall() {
            channel.close()

            super.uninstall()
        }
    }

    uppy.use(BrowsableSource, { id, companionUrl: window.location.origin })
}
