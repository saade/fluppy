import { UIPlugin } from '@uppy/core'
import { ProviderViews } from '@uppy/core/provider-views'

/**
 * What Uppy's plugins for a cloud drive are, without a drive: the file
 * browser, for a source that is not anybody's account. `useBrowsableSource`
 * gives it the provider that asks the field, and its icon.
 */
export default class DiskPlugin extends UIPlugin {
    constructor(uppy, opts) {
        super(uppy, opts)

        this.id = this.opts.id || 'Disk'
        this.type = 'acquirer'
        this.files = []
        this.rootFolderId = null

        this.render = this.render.bind(this)
    }

    install() {
        this.view = new ProviderViews(this, {
            provider: this.provider,
            loadAllFiles: true,
            virtualList: true,
        })

        if (this.opts.target) {
            this.mount(this.opts.target, this)
        }
    }

    uninstall() {
        this.view.tearDown()
        this.unmount()
    }

    render(state) {
        return this.view.render(state)
    }
}
