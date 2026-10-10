import { r as e, t } from "./fluppy-UIPlugin-Dz_uZBpD.js";
import { t as n } from "./fluppy-RequestClient-CHna867h.js";
import { r, t as i } from "./fluppy-GooglePickerView-BqF7C-t-.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/google-photos-picker",
	description: "The Google Photos Picker plugin for Uppy lets users import files from their Google Photos account",
	version: "2.0.0",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	},
	keywords: [
		"file uploader",
		"google photos",
		"google picker",
		"cloud storage",
		"uppy",
		"uppy-plugin"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	],
	exports: {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	},
	dependencies: { preact: "^10.29.2" },
	peerDependencies: { "@uppy/core": "^6.0.0" },
	devDependencies: {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}
}, s = { strings: { pluginNameGooglePhotosPicker: "Google Photos" } }, c = class c extends t {
	static VERSION = o.version;
	static requestClientId = c.name;
	type = "acquirer";
	icon = r;
	storage;
	defaultLocale = s;
	requestClientId = c.requestClientId;
	constructor(e, t) {
		super(e, t), this.id = this.opts.id || "GooglePhotosPicker", this.storage = this.opts.storage || a, this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameGooglePhotosPicker"), this.setPluginState({
			loading: !1,
			accessToken: void 0
		}), this.getPluginState = this.getPluginState.bind(this), this.setPluginState = this.setPluginState.bind(this);
		let r = new n(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionCookiesRule: this.opts.companionCookiesRule,
			companionKeysParams: this.opts.companionKeysParams
		});
		this.uppy.registerRequestClient(c.requestClientId, r);
	}
	install() {
		let { target: e } = this.opts;
		e && this.mount(e, this);
	}
	uninstall() {
		this.unmount();
	}
	render = () => e(i, {
		getPluginState: this.getPluginState,
		setPluginState: this.setPluginState,
		storage: this.storage,
		pickerType: "photos",
		uppy: this.uppy,
		i18n: this.i18n,
		clientId: this.opts.clientId,
		requestClientId: c.requestClientId,
		companionUrl: this.opts.companionUrl
	});
};
//#endregion
export { c as default };
