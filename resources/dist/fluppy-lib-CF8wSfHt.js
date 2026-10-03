import { t as e } from "./fluppy-ProviderView-DVSZQmbQ.js";
import { r as t, t as n } from "./fluppy-UIPlugin-ihypjxg2.js";
import { n as r, t as i } from "./fluppy-Provider-CmieJZza.js";
import { t as a } from "./fluppy-tokenStorage-CoxIVt8_.js";
var o = {
	name: "@uppy/onedrive",
	description: "Import files from OneDrive, into Uppy.",
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
		"onedrive"
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
}, s = { strings: { pluginNameOneDrive: "OneDrive" } }, c = class extends n {
	static VERSION = o.version;
	icon;
	provider;
	view;
	storage;
	files;
	rootFolderId = null;
	constructor(e, n) {
		super(e, n), this.type = "acquirer", this.files = [], this.storage = this.opts.storage || a, this.id = this.opts.id || "OneDrive", this.icon = () => t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: t("g", {
				fill: "none",
				fillRule: "nonzero",
				children: [
					t("path", {
						d: "M13.39 12.888l4.618 2.747 2.752-1.15a4.478 4.478 0 012.073-.352 6.858 6.858 0 00-5.527-5.04 6.895 6.895 0 00-6.876 2.982l.07-.002a5.5 5.5 0 012.89.815z",
						fill: "#0364B8"
					}),
					t("path", {
						d: "M13.39 12.887v.001a5.5 5.5 0 00-2.89-.815l-.07.002a5.502 5.502 0 00-4.822 2.964 5.43 5.43 0 00.38 5.62l4.073-1.702 1.81-.757 4.032-1.685 2.105-.88-4.619-2.748z",
						fill: "#0078D4"
					}),
					t("path", {
						d: "M22.833 14.133a4.479 4.479 0 00-2.073.352l-2.752 1.15.798.475 2.616 1.556 1.141.68 3.902 2.321a4.413 4.413 0 00-.022-4.25 4.471 4.471 0 00-3.61-2.284z",
						fill: "#1490DF"
					}),
					t("path", {
						d: "M22.563 18.346l-1.141-.68-2.616-1.556-.798-.475-2.105.88L11.87 18.2l-1.81.757-4.073 1.702A5.503 5.503 0 0010.5 23h12.031a4.472 4.472 0 003.934-2.333l-3.902-2.321z",
						fill: "#28A8EA"
					})
				]
			})
		}), this.opts.companionAllowedHosts = r(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new i(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionKeysParams: this.opts.companionKeysParams,
			companionCookiesRule: this.opts.companionCookiesRule,
			provider: "onedrive",
			pluginId: this.id,
			supportsRefreshToken: !0
		}), this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameOneDrive"), this.render = this.render.bind(this);
	}
	install() {
		this.view = new e(this, {
			provider: this.provider,
			loadAllFiles: !0,
			virtualList: !0
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
