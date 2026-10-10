import { h } from 'preact'

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
    { label, connectUrl, icon, isSearchable, views },
    { list, search, disconnect, failedMessage },
) {
    const recallView = () => {
        try {
            return localStorage.getItem(`fluppy:view:${id}`) === 'grid' ? 'grid' : 'list'
        } catch {
            return null
        }
    }

    const rememberView = (type) => {
        try {
            localStorage.setItem(`fluppy:view:${id}`, type)
        } catch {
            // Kept for as long as the page is open, then.
        }
    }

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

        // Only asked of a source the server says can be searched.
        async search(term, { path } = {}) {
            const listing = await search(id, term, path ?? null)

            if (!listing || listing.error) {
                const message = listing?.error ?? failedMessage

                uppy.info(message, 'error', 5000)

                throw new Error(message)
            }

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

            if (icon) {
                this.icon = () =>
                    h('span', {
                        class: 'fi-fluppy-source-icon',
                        dangerouslySetInnerHTML: { __html: icon },
                    })
            }
        }

        install() {
            super.install()

            // Uppy would ask every provider to search. Where the server
            // cannot, the box above the files filters the ones that are
            // listed.
            this.view.opts.supportsSearch = Boolean(isSearchable)

            // A source with nothing to connect has nobody to log out.
            this.view.opts.standalone = !connectUrl

            if (views) {
                this.showAs(recallView() ?? 'list')
            }
        }

        // Where the Dashboard puts the plugin, which it does after
        // `install()`: there is no element to listen on before.
        mount(target, plugin) {
            const element = super.mount(target, plugin)

            if (views) {
                element?.addEventListener('click', this.openGridFolder)
            }

            return element
        }

        uninstall() {
            channel.close()

            this.el?.removeEventListener('click', this.openGridFolder)

            super.uninstall()
        }

        showAs(type) {
            const other = type === 'grid' ? 'list' : 'grid'

            this.view.opts.viewType = type

            // Uppy's virtual list lays its items out one to a row.
            this.view.opts.virtualList = type !== 'grid'

            this.view.opts.toolbarActions = [
                {
                    id: 'fluppy-view',
                    label: views[other],
                    refresh: false,
                    run: () => {
                        rememberView(other)

                        this.showAs(other)

                        // Uppy only draws again when the state changes.
                        this.setPluginState({})

                        return false
                    },
                },
            ]
        }

        // Uppy's grid ticks a folder that is clicked, as it does a file,
        // and so has no way into one. Its box is still there to tick.
        openGridFolder = (event) => {
            if (this.view.opts.viewType !== 'grid') {
                return
            }

            const folder = event.target
                .closest?.('.uppy-ProviderBrowserItem-inner')
                ?.getAttribute('for')

            if (
                !folder ||
                uppy.getPlugin('Dashboard')?.getPluginState().activePickerPanel?.id !== id ||
                this.getPluginState().partialTree?.find((node) => node.id === folder)?.type !== 'folder'
            ) {
                return
            }

            event.preventDefault()

            this.view.openFolder(folder)
        }
    }

    uppy.use(BrowsableSource, { id, companionUrl: window.location.origin })
}
