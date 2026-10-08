import { t as e } from "./fluppy-ProviderView-DVSZQmbQ.js";
import { r as t, t as n } from "./fluppy-UIPlugin-ihypjxg2.js";
import { n as r, t as i } from "./fluppy-Provider-CmieJZza.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/facebook",
	description: "Import files from Facebook, into Uppy.",
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
		"facebook"
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
}, s = { strings: { pluginNameFacebook: "Facebook" } }, c = class extends n {
	static VERSION = o.version;
	icon;
	provider;
	view;
	storage;
	files;
	rootFolderId = null;
	constructor(e, n) {
		super(e, n), this.id = this.opts.id || "Facebook", this.type = "acquirer", this.storage = this.opts.storage || a, this.files = [], this.icon = () => t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: t("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [t("path", {
					d: "M27 16c0-6.075-4.925-11-11-11S5 9.925 5 16c0 5.49 4.023 10.041 9.281 10.866V19.18h-2.793V16h2.793v-2.423c0-2.757 1.642-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.366 0-1.792.848-1.792 1.718V16h3.05l-.487 3.18h-2.563v7.686C22.977 26.041 27 21.49 27 16",
					fill: "#1777F2"
				}), t("path", {
					d: "M20.282 19.18L20.77 16h-3.051v-2.063c0-.87.426-1.718 1.792-1.718h1.387V9.512s-1.258-.215-2.462-.215c-2.513 0-4.155 1.523-4.155 4.28V16h-2.793v3.18h2.793v7.686a11.082 11.082 0 003.438 0V19.18h2.563",
					fill: "#FFFFFE"
				})]
			})
		}), this.opts.companionAllowedHosts = r(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new i(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionKeysParams: this.opts.companionKeysParams,
			companionCookiesRule: this.opts.companionCookiesRule,
			provider: "facebook",
			pluginId: this.id,
			supportsRefreshToken: !1
		}), this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameFacebook"), this.render = this.render.bind(this);
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
		let { partialTree: t, currentFolderId: n } = this.getPluginState();
		return t.filter((e) => e.type === "folder" && e.parentId === n).length === 0 ? this.view.render(e, {
			viewType: "grid",
			showFilter: !1,
			showTitles: !1
		}) : this.view.render(e);
	}
};
//#endregion
export { c as default };
