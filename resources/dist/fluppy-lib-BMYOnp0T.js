import { t as e } from "./fluppy-RequestClient-Df9M7aiv.js";
import { i as t, r as n, t as r } from "./fluppy-UIPlugin-ihypjxg2.js";
import { t as i } from "./fluppy-toArray-C4ZyUyu-.js";
import { t as a } from "./fluppy-getErrorMessage-DxiQuxng.js";
import { t as o } from "./fluppy-isRestrictionError-Dq8RAQXC.js";
var s = {
	name: "@uppy/url",
	description: "The Url plugin lets users import files from the Internet. Paste any URL and it’ll be added!",
	version: "6.0.1",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		pretest: "yarn workspace @uppy/companion build",
		test: "vitest run --silent='passed-only'",
		"test:e2e": "vitest run --project browser"
	},
	keywords: [
		"file uploader",
		"url",
		"import from url",
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
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	},
	dependencies: {
		nanoid: "^6.0.1",
		preact: "^10.29.2"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" },
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@uppy/core": "^6.2.0",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	}
}, c = { strings: {
	pluginNameUrl: "Link",
	import: "Import",
	enterUrlToImport: "Enter URL to import a file",
	failedToFetch: "Companion failed to fetch this URL, please make sure it’s correct",
	enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
} }, l = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", u = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += l[Math.random() * 64 | 0];
	return t;
}, d = class extends t {
	form = document.createElement("form");
	input;
	constructor(e) {
		super(e), this.form.id = u();
	}
	componentDidMount() {
		this.input.value = "", this.form.addEventListener("submit", this.#e), document.body.appendChild(this.form);
	}
	componentWillUnmount() {
		this.form.removeEventListener("submit", this.#e), document.body.removeChild(this.form);
	}
	#e = (e) => {
		e.preventDefault();
		let { addFile: t } = this.props;
		t(this.input.value.trim());
	};
	render() {
		let { i18n: e } = this.props;
		return n("div", {
			className: "uppy-Url",
			children: [n("input", {
				className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
				type: "text",
				"aria-label": e("enterUrlToImport"),
				placeholder: e("enterUrlToImport"),
				ref: (e) => {
					this.input = e;
				},
				"data-uppy-super-focusable": !0,
				form: this.form.id
			}), n("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
				type: "submit",
				form: this.form.id,
				children: e("import")
			})]
		});
	}
};
//#endregion
//#region node_modules/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js
function f(e, t, n) {
	let r = i(e.items), a;
	switch (t) {
		case "paste":
			if (r.some((e) => e.kind === "file")) return;
			a = r.filter((e) => e.kind === "string" && e.type === "text/plain");
			break;
		case "drop":
			a = r.filter((e) => e.kind === "string" && e.type === "text/uri-list");
			break;
		default: throw Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${t}`);
	}
	a.forEach((e) => {
		e.getAsString((e) => n(e));
	});
}
//#endregion
//#region node_modules/@uppy/url/lib/Url.js
function p() {
	return n("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: n("path", {
			d: "M23.637 15.312l-2.474 2.464a3.582 3.582 0 01-.577.491c-.907.657-1.897.986-2.968.986a4.925 4.925 0 01-3.959-1.971c-.248-.329-.164-.902.165-1.149.33-.247.907-.164 1.155.164 1.072 1.478 3.133 1.724 4.618.656a.642.642 0 00.33-.328l2.473-2.463c1.238-1.313 1.238-3.366-.082-4.597a3.348 3.348 0 00-4.618 0l-1.402 1.395a.799.799 0 01-1.154 0 .79.79 0 010-1.15l1.402-1.394a4.843 4.843 0 016.843 0c2.062 1.805 2.144 5.007.248 6.896zm-8.081 5.664l-1.402 1.395a3.348 3.348 0 01-4.618 0c-1.319-1.23-1.319-3.365-.082-4.596l2.475-2.464.328-.328c.743-.492 1.567-.739 2.475-.657.906.165 1.648.574 2.143 1.314.248.329.825.411 1.155.165.33-.248.412-.822.165-1.15-.825-1.068-1.98-1.724-3.216-1.888-1.238-.247-2.556.082-3.628.902l-.495.493-2.474 2.464c-1.897 1.969-1.814 5.09.083 6.977.99.904 2.226 1.396 3.463 1.396s2.473-.492 3.463-1.395l1.402-1.396a.79.79 0 000-1.15c-.33-.328-.908-.41-1.237-.082z",
			fill: "#FF753E",
			"fill-rule": "nonzero"
		})
	});
}
function m(e) {
	return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e;
}
function h(e) {
	return i(e.dataTransfer.items).filter((e) => e.kind === "string" && e.type === "text/uri-list").length > 0;
}
function g(e) {
	return e?.startsWith("http://") || e?.startsWith("https://");
}
function _(e) {
	let { pathname: t } = new URL(e);
	return t.substring(t.lastIndexOf("/") + 1);
}
var v = class t extends r {
	static VERSION = s.version;
	static requestClientId = t.name;
	icon;
	hostname;
	client;
	canHandleRootDrop;
	constructor(r, i) {
		if (super(r, i), this.id = this.opts.id || "Url", this.type = "acquirer", this.icon = () => n(p, {}), this.defaultLocale = c, this.i18nInit(), this.title = this.i18n("pluginNameUrl"), this.hostname = this.opts.companionUrl, !this.hostname) throw Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
		this.client = new e(r, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionCookiesRule: this.opts.companionCookiesRule
		}), this.uppy.registerRequestClient(t.requestClientId, this.client);
	}
	getMeta = (e) => this.client.post("url/meta", { url: e });
	addFile = async (e, n) => {
		if (e.startsWith("blob")) return;
		let r = m(e);
		if (!g(r)) {
			this.uppy.log(`[URL] Incorrect URL entered: ${r}`), this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
			return;
		}
		this.uppy.log(`[URL] Adding file from dropped/pasted url: ${r}`);
		try {
			let e = await this.getMeta(r), i = {
				meta: n,
				source: this.id,
				name: e.name || _(r),
				type: e.type,
				data: { size: e.size },
				isRemote: !0,
				body: { url: r },
				remote: {
					companionUrl: this.opts.companionUrl,
					url: `${this.hostname}/url/get`,
					body: {
						fileId: r,
						url: r
					},
					requestClientId: t.requestClientId
				}
			};
			this.uppy.log("[Url] Adding remote file");
			try {
				return this.uppy.addFile(i);
			} catch (e) {
				o(e) || this.uppy.log(e);
				return;
			}
		} catch (e) {
			this.uppy.log(e), this.uppy.info({
				message: this.i18n("failedToFetch"),
				details: a(e)
			}, "error", 4e3);
			return;
		}
	};
	handleRootDrop = (e) => {
		f(e.dataTransfer, "drop", (e) => {
			this.addFile(e);
		});
	};
	handleRootPaste = (e) => {
		f(e.clipboardData, "paste", (e) => {
			this.addFile(e);
		});
	};
	render() {
		return n(d, {
			i18n: this.i18n,
			addFile: this.addFile
		});
	}
	install() {
		let { target: e } = this.opts;
		e && this.mount(e, this);
	}
	uninstall() {
		this.unmount();
	}
};
v.prototype.canHandleRootDrop = h;
//#endregion
export { v as default };
