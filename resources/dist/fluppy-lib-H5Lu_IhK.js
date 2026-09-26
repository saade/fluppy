import { a as e, i as t, n, o as r, r as i, t as a } from "./fluppy-AuthError-BZ7Rk9VV.js";
import { n as o, t as s } from "./fluppy-getErrorMessage-e5OqMKex.js";
import { i as c, r as l, t as u } from "./fluppy-UIPlugin-ihypjxg2.js";
import { t as d } from "./fluppy-isRestrictionError-Dq8RAQXC.js";
//#region node_modules/@uppy/core/lib/utils/NetworkError.js
var f = class extends Error {
	isNetworkError;
	request;
	constructor(e, t = null) {
		super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t;
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/utils/fetchWithNetworkError.js
function p(...e) {
	return fetch(...e).catch((e) => {
		throw e.name === "AbortError" ? e : new f(e);
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getSocketHost.js
function m(e) {
	let t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?([^\n]+)/i.exec(e)?.[1];
	return `${/^http:\/\//i.test(e) ? "ws" : "wss"}://${t}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/UserFacingApiError.js
var h = class extends Error {
	name = "UserFacingApiError";
	code;
	constructor(e, t) {
		super(e), this.code = t;
	}
}, g = Object.prototype.toString, _ = (e) => g.call(e) === "[object Error]", v = /* @__PURE__ */ new Set([
	"network error",
	"NetworkError when attempting to fetch resource.",
	"The Internet connection appears to be offline.",
	"Network request failed",
	"fetch failed",
	"terminated",
	" A network error occurred.",
	"Network connection lost"
]);
function y(e) {
	if (!(e && _(e) && e.name === "TypeError" && typeof e.message == "string")) return !1;
	let { message: t, stack: n } = e;
	return t === "Load failed" || t.startsWith("Load failed (") && t.endsWith(")") ? n === void 0 || "__sentry_captured__" in e : t.startsWith("error sending request for url") || t === "Failed to fetch" || t.startsWith("Failed to fetch (") && t.endsWith(")") ? !0 : v.has(t);
}
//#endregion
//#region node_modules/p-retry/index.js
function b(e) {
	if (typeof e == "number") {
		if (e < 0) throw TypeError("Expected `retries` to be a non-negative number.");
		if (Number.isNaN(e)) throw TypeError("Expected `retries` to be a valid number or Infinity, got NaN.");
		if (Number.isFinite(e) && !Number.isInteger(e)) throw TypeError("Expected `retries` to be a non-negative integer or Infinity.");
	} else if (e !== void 0) throw TypeError("Expected `retries` to be a number or Infinity.");
}
function x(e, t, { min: n = 0, allowInfinity: r = !1 } = {}) {
	if (t !== void 0) {
		if (typeof t != "number" || Number.isNaN(t)) throw TypeError(`Expected \`${e}\` to be a number${r ? " or Infinity" : ""}.`);
		if (!r && !Number.isFinite(t)) throw TypeError(`Expected \`${e}\` to be a finite number.`);
		if (t < n) throw TypeError(`Expected \`${e}\` to be \u2265 ${n}.`);
	}
}
function S(e, t) {
	if (t !== void 0 && typeof t != "function") throw TypeError(`Expected \`${e}\` to be a function.`);
}
var C = class extends Error {
	constructor(e) {
		super(), e instanceof Error ? (this.originalError = e, {message: e} = e) : (this.originalError = Error(e), this.originalError.stack = this.stack), this.name = "AbortError", this.message = e;
	}
};
function w(e, t) {
	let n = Math.max(1, e + 1), r = t.randomize ? Math.random() + 1 : 1, i = Math.round(r * t.minTimeout * t.factor ** (n - 1));
	return i = Math.min(i, t.maxTimeout), i;
}
function T(e, t) {
	return Number.isFinite(t) ? t - (performance.now() - e) : t;
}
async function E(e, t) {
	e <= 0 || await new Promise((n, r) => {
		let i = () => {
			clearTimeout(a), t.signal?.removeEventListener("abort", i), r(t.signal.reason);
		}, a = setTimeout(() => {
			t.signal?.removeEventListener("abort", i), n();
		}, e);
		t.unref && a.unref?.(), t.signal?.addEventListener("abort", i, { once: !0 });
	});
}
async function D({ error: e, attemptNumber: t, retriesConsumed: n, startTime: r, options: i }) {
	let a = e instanceof Error ? e : /* @__PURE__ */ TypeError(`Non-error was thrown: "${e}". You should only throw errors.`);
	if (a instanceof C) throw a.originalError;
	let o = Number.isFinite(i.retries) ? Math.max(0, i.retries - n) : i.retries, s = i.maxRetryTime ?? Infinity, c = w(n, i);
	if (T(r, s) <= 0) {
		let e = Object.freeze({
			error: a,
			attemptNumber: t,
			retriesLeft: o,
			retriesConsumed: n,
			retryDelay: 0
		});
		throw await i.onFailedAttempt(e), a;
	}
	let l = Object.freeze({
		error: a,
		attemptNumber: t,
		retriesLeft: o,
		retriesConsumed: n,
		retryDelay: o > 0 ? c : 0
	}), u = await i.shouldConsumeRetry(l), d = u && o > 0 ? c : 0, f = Object.freeze({
		error: a,
		attemptNumber: t,
		retriesLeft: o,
		retriesConsumed: n,
		retryDelay: d
	});
	if (await i.onFailedAttempt(f), T(r, s) <= 0 || T(r, s) <= 0 || o <= 0 || a instanceof TypeError && !y(a) || !await i.shouldRetry(f)) throw a;
	let p = T(r, s);
	if (p <= 0) throw a;
	if (!u) return i.signal?.throwIfAborted(), !1;
	let m = Math.min(d, p);
	return i.signal?.throwIfAborted(), await E(m, i), i.signal?.throwIfAborted(), !0;
}
async function O(e, t = {}) {
	if (t = { ...t }, b(t.retries), Object.hasOwn(t, "forever")) throw Error("The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.");
	t.retries ??= 10, t.factor ??= 2, t.minTimeout ??= 1e3, t.maxTimeout ??= Infinity, t.maxRetryTime ??= Infinity, t.randomize ??= !1, t.onFailedAttempt ??= () => {}, t.shouldRetry ??= () => !0, t.shouldConsumeRetry ??= () => !0, S("onFailedAttempt", t.onFailedAttempt), S("shouldRetry", t.shouldRetry), S("shouldConsumeRetry", t.shouldConsumeRetry), x("factor", t.factor, {
		min: 0,
		allowInfinity: !1
	}), x("minTimeout", t.minTimeout, {
		min: 0,
		allowInfinity: !1
	}), x("maxTimeout", t.maxTimeout, {
		min: 0,
		allowInfinity: !0
	}), x("maxRetryTime", t.maxRetryTime, {
		min: 0,
		allowInfinity: !0
	}), t.factor > 0 || (t.factor = 1), t.signal?.throwIfAborted();
	let n = 0, r = 0, i = performance.now();
	for (; !Number.isFinite(t.retries) || r <= t.retries;) {
		n++;
		try {
			t.signal?.throwIfAborted();
			let r = await e(n);
			return t.signal?.throwIfAborted(), r;
		} catch (e) {
			await D({
				error: e,
				attemptNumber: n,
				retriesConsumed: r,
				startTime: i,
				options: t
			}) && r++;
		}
	}
	throw Error("Retry attempts exhausted without throwing an error.");
}
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/RequestClient.js
function k(e) {
	return e.replace(/\/$/, "");
}
var A = 10, j = 3e5, M = class extends Error {
	statusCode;
	constructor({ statusCode: e, message: t }) {
		super(t), this.name = "HttpError", this.statusCode = e;
	}
};
async function N(e) {
	if (e.status === 401) throw new a();
	if (e.ok) return e.status === 204 ? void 0 : e.json();
	let t = `Failed request with status: ${e.status}. ${e.statusText}`, n;
	try {
		n = await e.json();
		let r = n.message ?? n.code;
		r && (t = `${t} message: ${r}`), n.requestId && (t = `${t} request-Id: ${n.requestId}`);
	} catch (e) {
		throw Error(t, { cause: e });
	}
	if (e.status >= 400 && e.status <= 499) {
		let { message: e, code: t } = n;
		if (typeof t == "string") throw new h(typeof e == "string" ? e : t, t);
		if (typeof e == "string" && e) throw new h(e);
	}
	throw new M({
		statusCode: e.status,
		message: t
	});
}
function P(e, t, n) {
	let { progress: r, bytesUploaded: i, bytesTotal: a } = t;
	r && (e.uppy.log(`Upload progress: ${r}`), e.uppy.emit("upload-progress", n, {
		uploadStarted: n.progress.uploadStarted ?? 0,
		bytesUploaded: i,
		bytesTotal: a
	}));
}
var F = class {
	static VERSION = i.version;
	#e;
	uppy;
	opts;
	constructor(e, t) {
		this.uppy = e, this.opts = t, this.onReceiveResponse = this.onReceiveResponse.bind(this), this.#e = t.companionHeaders;
	}
	setCompanionHeaders(e) {
		this.#e = e;
	}
	[Symbol.for("uppy test: getCompanionHeaders")]() {
		return this.#e;
	}
	get hostname() {
		let { companion: e } = this.uppy.getState(), t = this.opts.companionUrl;
		return k(e?.[t] ? e[t] : t);
	}
	async headers(e = !1) {
		return {
			Accept: "application/json",
			...e ? void 0 : { "Content-Type": "application/json" },
			...this.#e
		};
	}
	onReceiveResponse(e) {
		let { headers: t } = e, n = this.uppy.getState().companion || {}, r = this.opts.companionUrl;
		t.has("i-am") && t.get("i-am") !== n[r] && this.uppy.setState({ companion: {
			...n,
			[r]: t.get("i-am")
		} });
	}
	#t(e) {
		return /^(https?:|)\/\//.test(e) ? e : `${this.hostname}/${e}`;
	}
	async request({ path: e, method: i = "GET", data: a, skipPostResponse: s, signal: c }) {
		try {
			let t = await this.headers(!a), n = await p(this.#t(e), {
				method: i,
				signal: c,
				headers: t,
				credentials: this.opts.companionCookiesRule || "same-origin",
				body: a ? JSON.stringify(a) : null
			});
			return s || this.onReceiveResponse(n), await N(n);
		} catch (a) {
			throw n(a) || t(a) || o(a).name === "UserFacingApiError" ? a : new r(`Could not ${i} ${this.#t(e)}`, { cause: a });
		}
	}
	async get(e, t) {
		return this.request({
			...t,
			path: e
		});
	}
	async post(e, t, n) {
		return this.request({
			...n,
			path: e,
			method: "POST",
			data: t
		});
	}
	async delete(e, t, n) {
		return this.request({
			...n,
			path: e,
			method: "DELETE",
			data: t
		});
	}
	async uploadRemoteFile(e, n, r) {
		try {
			let { signal: t, getQueue: i } = r || {}, a = i();
			return await O(async () => a.wrapPromiseFunction(async () => {
				let r = this.uppy.getFile(e.id);
				if (r == null) return;
				let i = r.serverToken;
				if (i != null) this.uppy.log(`Connecting to exiting websocket ${i}`);
				else {
					if (i = await this.#r({
						file: r,
						postBody: n,
						signal: t
					}), !this.uppy.getFile(e.id)) return;
					this.uppy.setFileState(e.id, { serverToken: i });
				}
				let a = this.uppy.getFile(e.id);
				if (a != null) return this.#i({
					file: a,
					signal: t
				});
			})().abortOn(t), {
				retries: A,
				signal: t,
				onFailedAttempt: ({ error: e }) => this.uppy.log(`Retrying upload due to: ${e.message}`, "warning")
			});
		} catch (n) {
			if (t(n)) return;
			throw this.uppy.emit("upload-error", e, o(n)), n;
		}
	}
	#n = async ({ file: e, postBody: t, signal: n }) => {
		if (e.remote?.url == null) throw Error("Cannot connect to an undefined URL");
		return (await this.post(e.remote.url, {
			...e.remote.body,
			...t
		}, { signal: n })).token;
	};
	#r = async ({ file: e, postBody: t, signal: r }) => {
		try {
			return await this.#n({
				file: e,
				postBody: t,
				signal: r
			});
		} catch (e) {
			if (n(e)) throw new C(e);
			if (!(e instanceof Error) || e.cause == null) throw e;
			let t = e.cause;
			throw t instanceof M && !(({ statusCode: e }) => [
				408,
				409,
				429,
				418,
				423
			].includes(e) || e >= 500 && e <= 599 && ![501, 505].includes(e))(t) ? new C(t) : t;
		}
	};
	async #i({ file: e, signal: t }) {
		let n, { capabilities: r } = this.uppy.getState();
		try {
			return await new Promise((i, a) => {
				let s = e.serverToken, c = m(e.remote.companionUrl), l, u, d, { isPaused: f } = e, p = (t, n) => {
					if (l == null || l.readyState !== l.OPEN) {
						this.uppy.log(`Cannot send "${t}" to socket ${e.id} because the socket state was ${String(l?.readyState)}`, "warning");
						return;
					}
					l.send(JSON.stringify({
						action: t,
						payload: n ?? {}
					}));
				};
				function h() {
					r.resumableUploads && p(f ? "pause" : "resume");
				}
				let g = async () => {
					u && u.abort(), u = new AbortController();
					let t = (t) => {
						this.uppy.setFileState(e.id, { serverToken: null }), u?.abort?.(), a(t);
					};
					function n() {
						clearTimeout(d), !f && (d = setTimeout(() => {
							t(/* @__PURE__ */ Error("Timeout waiting for message from Companion socket"));
						}, j));
					}
					try {
						await O(async () => new Promise((r, a) => {
							l = new WebSocket(`${c}/api/${s}`), n(), l.addEventListener("close", () => {
								l = void 0, a(/* @__PURE__ */ Error("Socket closed unexpectedly"));
							}), l.addEventListener("error", (e) => {
								this.uppy.log(`Companion socket error ${JSON.stringify(e)}, closing socket`, "warning"), l?.close();
							}), l.addEventListener("open", () => {
								h();
							}), l.addEventListener("message", (r) => {
								n();
								try {
									let { action: t, payload: n } = JSON.parse(r.data);
									switch (t) {
										case "progress":
											P(this, n, this.uppy.getFile(e.id));
											break;
										case "success": {
											let t = n.response?.responseText;
											this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
												uploadURL: n.url,
												status: n.response?.status ?? 200,
												body: t ? JSON.parse(t) : void 0
											}), u?.abort?.(), i();
											break;
										}
										case "error": {
											let { message: e } = n.error;
											throw Object.assign(Error(e), { cause: n.error });
										}
										default: this.uppy.log(`Companion socket unknown action ${t}`, "warning");
									}
								} catch (e) {
									t(o(e));
								}
							});
							let f = () => {
								this.uppy.log(`Closing socket ${e.id}`), clearTimeout(d), l && l.close(), l = void 0;
							};
							u.signal.addEventListener("abort", () => {
								f();
							});
						}), {
							retries: A,
							signal: u.signal,
							onFailedAttempt: () => {
								u.signal.aborted || this.uppy.log(`Retrying websocket ${e.id}`);
							}
						});
					} catch (e) {
						if (u.signal.aborted) return;
						t(o(e));
					}
				}, _ = (e) => {
					r.resumableUploads && (f = e, l && h());
				}, v = (t) => {
					r.individualCancellation && t.id === e.id && (p("cancel"), u?.abort?.(), this.uppy.log(`upload ${e.id} was removed`), i());
				}, y = () => {
					p("cancel"), u?.abort?.(), this.uppy.log(`upload ${e.id} was canceled`), i();
				}, b = (t, n) => {
					t?.id === e.id && _(n);
				}, x = () => _(!0), S = () => _(!1);
				this.uppy.on("file-removed", v), this.uppy.on("cancel-all", y), this.uppy.on("upload-pause", b), this.uppy.on("pause-all", x), this.uppy.on("resume-all", S), n = () => {
					this.uppy.off("file-removed", v), this.uppy.off("cancel-all", y), this.uppy.off("upload-pause", b), this.uppy.off("pause-all", x), this.uppy.off("resume-all", S);
				}, t.addEventListener("abort", () => {
					u?.abort();
				}), g();
			});
		} finally {
			n?.();
		}
	}
}, I = {
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
}, L = { strings: {
	pluginNameUrl: "Link",
	import: "Import",
	enterUrlToImport: "Enter URL to import a file",
	failedToFetch: "Companion failed to fetch this URL, please make sure it’s correct",
	enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
} }, R = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", z = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += R[Math.random() * 64 | 0];
	return t;
}, B = class extends c {
	form = document.createElement("form");
	input;
	constructor(e) {
		super(e), this.form.id = z();
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
		return l("div", {
			className: "uppy-Url",
			children: [l("input", {
				className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
				type: "text",
				"aria-label": e("enterUrlToImport"),
				placeholder: e("enterUrlToImport"),
				ref: (e) => {
					this.input = e;
				},
				"data-uppy-super-focusable": !0,
				form: this.form.id
			}), l("button", {
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
function V(t, n, r) {
	let i = e(t.items), a;
	switch (n) {
		case "paste":
			if (i.some((e) => e.kind === "file")) return;
			a = i.filter((e) => e.kind === "string" && e.type === "text/plain");
			break;
		case "drop":
			a = i.filter((e) => e.kind === "string" && e.type === "text/uri-list");
			break;
		default: throw Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${n}`);
	}
	a.forEach((e) => {
		e.getAsString((e) => r(e));
	});
}
//#endregion
//#region node_modules/@uppy/url/lib/Url.js
function H() {
	return l("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: l("path", {
			d: "M23.637 15.312l-2.474 2.464a3.582 3.582 0 01-.577.491c-.907.657-1.897.986-2.968.986a4.925 4.925 0 01-3.959-1.971c-.248-.329-.164-.902.165-1.149.33-.247.907-.164 1.155.164 1.072 1.478 3.133 1.724 4.618.656a.642.642 0 00.33-.328l2.473-2.463c1.238-1.313 1.238-3.366-.082-4.597a3.348 3.348 0 00-4.618 0l-1.402 1.395a.799.799 0 01-1.154 0 .79.79 0 010-1.15l1.402-1.394a4.843 4.843 0 016.843 0c2.062 1.805 2.144 5.007.248 6.896zm-8.081 5.664l-1.402 1.395a3.348 3.348 0 01-4.618 0c-1.319-1.23-1.319-3.365-.082-4.596l2.475-2.464.328-.328c.743-.492 1.567-.739 2.475-.657.906.165 1.648.574 2.143 1.314.248.329.825.411 1.155.165.33-.248.412-.822.165-1.15-.825-1.068-1.98-1.724-3.216-1.888-1.238-.247-2.556.082-3.628.902l-.495.493-2.474 2.464c-1.897 1.969-1.814 5.09.083 6.977.99.904 2.226 1.396 3.463 1.396s2.473-.492 3.463-1.395l1.402-1.396a.79.79 0 000-1.15c-.33-.328-.908-.41-1.237-.082z",
			fill: "#FF753E",
			"fill-rule": "nonzero"
		})
	});
}
function U(e) {
	return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e;
}
function W(t) {
	return e(t.dataTransfer.items).filter((e) => e.kind === "string" && e.type === "text/uri-list").length > 0;
}
function G(e) {
	return e?.startsWith("http://") || e?.startsWith("https://");
}
function K(e) {
	let { pathname: t } = new URL(e);
	return t.substring(t.lastIndexOf("/") + 1);
}
var q = class e extends u {
	static VERSION = I.version;
	static requestClientId = e.name;
	icon;
	hostname;
	client;
	canHandleRootDrop;
	constructor(t, n) {
		if (super(t, n), this.id = this.opts.id || "Url", this.type = "acquirer", this.icon = () => l(H, {}), this.defaultLocale = L, this.i18nInit(), this.title = this.i18n("pluginNameUrl"), this.hostname = this.opts.companionUrl, !this.hostname) throw Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
		this.client = new F(t, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionCookiesRule: this.opts.companionCookiesRule
		}), this.uppy.registerRequestClient(e.requestClientId, this.client);
	}
	getMeta = (e) => this.client.post("url/meta", { url: e });
	addFile = async (t, n) => {
		if (t.startsWith("blob")) return;
		let r = U(t);
		if (!G(r)) {
			this.uppy.log(`[URL] Incorrect URL entered: ${r}`), this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
			return;
		}
		this.uppy.log(`[URL] Adding file from dropped/pasted url: ${r}`);
		try {
			let t = await this.getMeta(r), i = {
				meta: n,
				source: this.id,
				name: t.name || K(r),
				type: t.type,
				data: { size: t.size },
				isRemote: !0,
				body: { url: r },
				remote: {
					companionUrl: this.opts.companionUrl,
					url: `${this.hostname}/url/get`,
					body: {
						fileId: r,
						url: r
					},
					requestClientId: e.requestClientId
				}
			};
			this.uppy.log("[Url] Adding remote file");
			try {
				return this.uppy.addFile(i);
			} catch (e) {
				d(e) || this.uppy.log(e);
				return;
			}
		} catch (e) {
			this.uppy.log(e), this.uppy.info({
				message: this.i18n("failedToFetch"),
				details: s(e)
			}, "error", 4e3);
			return;
		}
	};
	handleRootDrop = (e) => {
		V(e.dataTransfer, "drop", (e) => {
			this.addFile(e);
		});
	};
	handleRootPaste = (e) => {
		V(e.clipboardData, "paste", (e) => {
			this.addFile(e);
		});
	};
	render() {
		return l(B, {
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
q.prototype.canHandleRootDrop = W;
//#endregion
export { q as default };
