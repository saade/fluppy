import { t as e } from "./fluppy-ProviderView-DVSZQmbQ.js";
import { r as t, t as n } from "./fluppy-UIPlugin-ihypjxg2.js";
import { n as r, t as i } from "./fluppy-Provider-CmieJZza.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/zoom",
	description: "Import files from zoom, into Uppy.",
	version: "5.0.0",
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
		"zoom"
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
	publishConfig: { access: "public" },
	devDependencies: {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}
}, s = { strings: { pluginNameZoom: "Zoom" } }, c = class extends n {
	static VERSION = o.version;
	icon;
	provider;
	view;
	storage;
	files;
	rootFolderId = null;
	constructor(e, n) {
		super(e, n), this.type = "acquirer", this.files = [], this.storage = this.opts.storage || a, this.id = this.opts.id || "Zoom", this.icon = () => t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: t("path", {
				d: "M24.5 11.125l-2.75 2.063c-.473.353-.75.91-.75 1.5v3.124c0 .59.277 1.147.75 1.5l2.75 2.063a.938.938 0 001.5-.75v-8.75a.938.938 0 00-1.5-.75zm-4.75 9.5c0 1.035-.84 1.875-1.875 1.875H9.75A3.75 3.75 0 016 18.75v-6.875C6 10.84 6.84 10 7.875 10H16a3.75 3.75 0 013.75 3.75v6.875z",
				fill: "#2E8CFF",
				"fill-rule": "evenodd"
			})
		}), this.opts.companionAllowedHosts = r(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new i(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionKeysParams: this.opts.companionKeysParams,
			companionCookiesRule: this.opts.companionCookiesRule,
			provider: "zoom",
			pluginId: this.id,
			supportsRefreshToken: !1
		}), this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameZoom"), this.render = this.render.bind(this);
	}
	install() {
		this.view = new e(this, { provider: this.provider });
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
