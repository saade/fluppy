import { t as e } from "./fluppy-ProviderView-DAG8U-25.js";
import { t } from "./fluppy-UIPlugin-Dz_uZBpD.js";
//#region resources/js/disk-plugin.js
var n = class extends t {
	constructor(e, t) {
		super(e, t), this.id = this.opts.id || "Disk", this.type = "acquirer", this.files = [], this.rootFolderId = null, this.render = this.render.bind(this);
	}
	install() {
		this.view = new e(this, {
			provider: this.provider,
			loadAllFiles: !0,
			virtualList: !0
		}), this.opts.target && this.mount(this.opts.target, this);
	}
	uninstall() {
		this.view.tearDown(), this.unmount();
	}
	render(e) {
		return this.view.render(e);
	}
};
//#endregion
export { n as default };
