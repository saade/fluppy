import { t as e } from "./fluppy-RequestClient-B3NweaQs.js";
import { r as t, t as n } from "./fluppy-UIPlugin-ihypjxg2.js";
import { n as r, t as i } from "./fluppy-GooglePickerView-CznqOqVm.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/google-drive-picker",
	description: "The Google Drive Picker plugin for Uppy lets users import files from their Google Drive account",
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
		"google drive",
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
}, s = { strings: { pluginNameGoogleDrivePicker: "Google Drive" } }, c = class c extends n {
	static VERSION = o.version;
	static requestClientId = c.name;
	type = "acquirer";
	icon = r;
	storage;
	defaultLocale = s;
	requestClientId = c.requestClientId;
	constructor(t, n) {
		super(t, n), this.id = this.opts.id || "GoogleDrivePicker", this.storage = this.opts.storage || a, this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameGoogleDrivePicker"), this.setPluginState({
			loading: !1,
			accessToken: void 0
		}), this.getPluginState = this.getPluginState.bind(this), this.setPluginState = this.setPluginState.bind(this);
		let r = new e(t, {
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
	render = () => t(i, {
		getPluginState: this.getPluginState,
		setPluginState: this.setPluginState,
		storage: this.storage,
		pickerType: "drive",
		uppy: this.uppy,
		i18n: this.i18n,
		clientId: this.opts.clientId,
		apiKey: this.opts.apiKey,
		appId: this.opts.appId,
		requestClientId: c.requestClientId,
		companionUrl: this.opts.companionUrl
	});
};
//#endregion
export { c as default };
