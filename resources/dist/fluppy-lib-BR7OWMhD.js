import { t as e } from "./fluppy-ProviderView-DAG8U-25.js";
import { r as t, t as n } from "./fluppy-UIPlugin-Dz_uZBpD.js";
import { n as r, t as i } from "./fluppy-Provider-BJXhls7x.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/dropbox",
	description: "Import files from Dropbox, into Uppy.",
	version: "6.0.0",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"dropbox"
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
}, s = { strings: { pluginNameDropbox: "Dropbox" } }, c = class extends n {
	static VERSION = o.version;
	icon;
	provider;
	view;
	storage;
	files;
	rootFolderId = null;
	constructor(e, n) {
		super(e, n), this.id = this.opts.id || "Dropbox", this.type = "acquirer", this.storage = this.opts.storage || a, this.files = [], this.icon = () => t("svg", {
			className: "uppy-DashboardTab-iconDropbox",
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: t("path", {
				d: "M10.5 7.5L5 10.955l5.5 3.454 5.5-3.454 5.5 3.454 5.5-3.454L21.5 7.5 16 10.955zM10.5 21.319L5 17.864l5.5-3.455 5.5 3.455zM16 17.864l5.5-3.455 5.5 3.455-5.5 3.455zM16 25.925l-5.5-3.455 5.5-3.454 5.5 3.454z",
				fill: "currentcolor",
				fillRule: "nonzero"
			})
		}), this.opts.companionAllowedHosts = r(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new i(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionKeysParams: this.opts.companionKeysParams,
			companionCookiesRule: this.opts.companionCookiesRule,
			provider: "dropbox",
			pluginId: this.id,
			supportsRefreshToken: !0
		}), this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameDropbox"), this.render = this.render.bind(this);
	}
	install() {
		this.view = new e(this, {
			provider: this.provider,
			loadAllFiles: !0,
			virtualList: !0,
			supportsSearch: !0
		});
		let { target: t } = this.opts;
		t && this.mount(t, this);
	}
	uninstall() {
		this.view.tearDown(), this.unmount();
	}
	render(e) {
		return this.view.render(e);
	}
};
//#endregion
export { c as default };
