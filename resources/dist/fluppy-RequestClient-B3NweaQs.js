import { a as e, i as t, n, r, t as i } from "./fluppy-AuthError-CpV_e0tX.js";
import { n as a } from "./fluppy-toError-DlxtQOs3.js";
//#region node_modules/@uppy/core/lib/utils/NetworkError.js
var o = class extends Error {
	isNetworkError;
	request;
	constructor(e, t = null) {
		super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t;
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/utils/fetchWithNetworkError.js
function s(...e) {
	return fetch(...e).catch((e) => {
		throw e.name === "AbortError" ? e : new o(e);
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getSocketHost.js
function c(e) {
	let t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?([^\n]+)/i.exec(e)?.[1];
	return `${/^http:\/\//i.test(e) ? "ws" : "wss"}://${t}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/UserFacingApiError.js
var l = class extends Error {
	name = "UserFacingApiError";
	code;
	constructor(e, t) {
		super(e), this.code = t;
	}
}, u = Object.prototype.toString, d = (e) => u.call(e) === "[object Error]", f = /* @__PURE__ */ new Set([
	"network error",
	"NetworkError when attempting to fetch resource.",
	"The Internet connection appears to be offline.",
	"Network request failed",
	"fetch failed",
	"terminated",
	" A network error occurred.",
	"Network connection lost"
]);
function p(e) {
	if (!(e && d(e) && e.name === "TypeError" && typeof e.message == "string")) return !1;
	let { message: t, stack: n } = e;
	return t === "Load failed" || t.startsWith("Load failed (") && t.endsWith(")") ? n === void 0 || "__sentry_captured__" in e : t.startsWith("error sending request for url") || t === "Failed to fetch" || t.startsWith("Failed to fetch (") && t.endsWith(")") ? !0 : f.has(t);
}
//#endregion
//#region node_modules/p-retry/index.js
function m(e) {
	if (typeof e == "number") {
		if (e < 0) throw TypeError("Expected `retries` to be a non-negative number.");
		if (Number.isNaN(e)) throw TypeError("Expected `retries` to be a valid number or Infinity, got NaN.");
		if (Number.isFinite(e) && !Number.isInteger(e)) throw TypeError("Expected `retries` to be a non-negative integer or Infinity.");
	} else if (e !== void 0) throw TypeError("Expected `retries` to be a number or Infinity.");
}
function h(e, t, { min: n = 0, allowInfinity: r = !1 } = {}) {
	if (t !== void 0) {
		if (typeof t != "number" || Number.isNaN(t)) throw TypeError(`Expected \`${e}\` to be a number${r ? " or Infinity" : ""}.`);
		if (!r && !Number.isFinite(t)) throw TypeError(`Expected \`${e}\` to be a finite number.`);
		if (t < n) throw TypeError(`Expected \`${e}\` to be \u2265 ${n}.`);
	}
}
function g(e, t) {
	if (t !== void 0 && typeof t != "function") throw TypeError(`Expected \`${e}\` to be a function.`);
}
var _ = class extends Error {
	constructor(e) {
		super(), e instanceof Error ? (this.originalError = e, {message: e} = e) : (this.originalError = Error(e), this.originalError.stack = this.stack), this.name = "AbortError", this.message = e;
	}
};
function v(e, t) {
	let n = Math.max(1, e + 1), r = t.randomize ? Math.random() + 1 : 1, i = Math.round(r * t.minTimeout * t.factor ** (n - 1));
	return i = Math.min(i, t.maxTimeout), i;
}
function y(e, t) {
	return Number.isFinite(t) ? t - (performance.now() - e) : t;
}
async function b(e, t) {
	e <= 0 || await new Promise((n, r) => {
		let i = () => {
			clearTimeout(a), t.signal?.removeEventListener("abort", i), r(t.signal.reason);
		}, a = setTimeout(() => {
			t.signal?.removeEventListener("abort", i), n();
		}, e);
		t.unref && a.unref?.(), t.signal?.addEventListener("abort", i, { once: !0 });
	});
}
async function x({ error: e, attemptNumber: t, retriesConsumed: n, startTime: r, options: i }) {
	let a = e instanceof Error ? e : /* @__PURE__ */ TypeError(`Non-error was thrown: "${e}". You should only throw errors.`);
	if (a instanceof _) throw a.originalError;
	let o = Number.isFinite(i.retries) ? Math.max(0, i.retries - n) : i.retries, s = i.maxRetryTime ?? Infinity, c = v(n, i);
	if (y(r, s) <= 0) {
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
	if (await i.onFailedAttempt(f), y(r, s) <= 0 || y(r, s) <= 0 || o <= 0 || a instanceof TypeError && !p(a) || !await i.shouldRetry(f)) throw a;
	let m = y(r, s);
	if (m <= 0) throw a;
	if (!u) return i.signal?.throwIfAborted(), !1;
	let h = Math.min(d, m);
	return i.signal?.throwIfAborted(), await b(h, i), i.signal?.throwIfAborted(), !0;
}
async function S(e, t = {}) {
	if (t = { ...t }, m(t.retries), Object.hasOwn(t, "forever")) throw Error("The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.");
	t.retries ??= 10, t.factor ??= 2, t.minTimeout ??= 1e3, t.maxTimeout ??= Infinity, t.maxRetryTime ??= Infinity, t.randomize ??= !1, t.onFailedAttempt ??= () => {}, t.shouldRetry ??= () => !0, t.shouldConsumeRetry ??= () => !0, g("onFailedAttempt", t.onFailedAttempt), g("shouldRetry", t.shouldRetry), g("shouldConsumeRetry", t.shouldConsumeRetry), h("factor", t.factor, {
		min: 0,
		allowInfinity: !1
	}), h("minTimeout", t.minTimeout, {
		min: 0,
		allowInfinity: !1
	}), h("maxTimeout", t.maxTimeout, {
		min: 0,
		allowInfinity: !0
	}), h("maxRetryTime", t.maxRetryTime, {
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
			await x({
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
function C(e) {
	return e.replace(/\/$/, "");
}
var w = 10, T = 3e5, E = class extends Error {
	statusCode;
	constructor({ statusCode: e, message: t }) {
		super(t), this.name = "HttpError", this.statusCode = e;
	}
};
async function D(e) {
	if (e.status === 401) throw new i();
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
		if (typeof t == "string") throw new l(typeof e == "string" ? e : t, t);
		if (typeof e == "string" && e) throw new l(e);
	}
	throw new E({
		statusCode: e.status,
		message: t
	});
}
function O(e, t, n) {
	let { progress: r, bytesUploaded: i, bytesTotal: a } = t;
	r && (e.uppy.log(`Upload progress: ${r}`), e.uppy.emit("upload-progress", n, {
		uploadStarted: n.progress.uploadStarted ?? 0,
		bytesUploaded: i,
		bytesTotal: a
	}));
}
var k = class {
	static VERSION = r.version;
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
		return C(e?.[t] ? e[t] : t);
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
	async request({ path: r, method: i = "GET", data: o, skipPostResponse: c, signal: l }) {
		try {
			let e = await this.headers(!o), t = await s(this.#t(r), {
				method: i,
				signal: l,
				headers: e,
				credentials: this.opts.companionCookiesRule || "same-origin",
				body: o ? JSON.stringify(o) : null
			});
			return c || this.onReceiveResponse(t), await D(t);
		} catch (o) {
			throw n(o) || t(o) || a(o).name === "UserFacingApiError" ? o : new e(`Could not ${i} ${this.#t(r)}`, { cause: o });
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
			return await S(async () => a.wrapPromiseFunction(async () => {
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
				retries: w,
				signal: t,
				onFailedAttempt: ({ error: e }) => this.uppy.log(`Retrying upload due to: ${e.message}`, "warning")
			});
		} catch (n) {
			if (t(n)) return;
			throw this.uppy.emit("upload-error", e, a(n)), n;
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
			if (n(e)) throw new _(e);
			if (!(e instanceof Error) || e.cause == null) throw e;
			let t = e.cause;
			throw t instanceof E && !(({ statusCode: e }) => [
				408,
				409,
				429,
				418,
				423
			].includes(e) || e >= 500 && e <= 599 && ![501, 505].includes(e))(t) ? new _(t) : t;
		}
	};
	async #i({ file: e, signal: t }) {
		let n, { capabilities: r } = this.uppy.getState();
		try {
			return await new Promise((i, o) => {
				let s = e.serverToken, l = c(e.remote.companionUrl), u, d, f, { isPaused: p } = e, m = (t, n) => {
					if (u == null || u.readyState !== u.OPEN) {
						this.uppy.log(`Cannot send "${t}" to socket ${e.id} because the socket state was ${String(u?.readyState)}`, "warning");
						return;
					}
					u.send(JSON.stringify({
						action: t,
						payload: n ?? {}
					}));
				};
				function h() {
					r.resumableUploads && m(p ? "pause" : "resume");
				}
				let g = async () => {
					d && d.abort(), d = new AbortController();
					let t = (t) => {
						this.uppy.setFileState(e.id, { serverToken: null }), d?.abort?.(), o(t);
					};
					function n() {
						clearTimeout(f), !p && (f = setTimeout(() => {
							t(/* @__PURE__ */ Error("Timeout waiting for message from Companion socket"));
						}, T));
					}
					try {
						await S(async () => new Promise((r, o) => {
							u = new WebSocket(`${l}/api/${s}`), n(), u.addEventListener("close", () => {
								u = void 0, o(/* @__PURE__ */ Error("Socket closed unexpectedly"));
							}), u.addEventListener("error", (e) => {
								this.uppy.log(`Companion socket error ${JSON.stringify(e)}, closing socket`, "warning"), u?.close();
							}), u.addEventListener("open", () => {
								h();
							}), u.addEventListener("message", (r) => {
								n();
								try {
									let { action: t, payload: n } = JSON.parse(r.data);
									switch (t) {
										case "progress":
											O(this, n, this.uppy.getFile(e.id));
											break;
										case "success": {
											let t = n.response?.responseText;
											this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
												uploadURL: n.url,
												status: n.response?.status ?? 200,
												body: t ? JSON.parse(t) : void 0
											}), d?.abort?.(), i();
											break;
										}
										case "error": {
											let { message: e } = n.error;
											throw Object.assign(Error(e), { cause: n.error });
										}
										default: this.uppy.log(`Companion socket unknown action ${t}`, "warning");
									}
								} catch (e) {
									t(a(e));
								}
							});
							let c = () => {
								this.uppy.log(`Closing socket ${e.id}`), clearTimeout(f), u && u.close(), u = void 0;
							};
							d.signal.addEventListener("abort", () => {
								c();
							});
						}), {
							retries: w,
							signal: d.signal,
							onFailedAttempt: () => {
								d.signal.aborted || this.uppy.log(`Retrying websocket ${e.id}`);
							}
						});
					} catch (e) {
						if (d.signal.aborted) return;
						t(a(e));
					}
				}, _ = (e) => {
					r.resumableUploads && (p = e, u && h());
				}, v = (t) => {
					r.individualCancellation && t.id === e.id && (m("cancel"), d?.abort?.(), this.uppy.log(`upload ${e.id} was removed`), i());
				}, y = () => {
					m("cancel"), d?.abort?.(), this.uppy.log(`upload ${e.id} was canceled`), i();
				}, b = (t, n) => {
					t?.id === e.id && _(n);
				}, x = () => _(!0), C = () => _(!1);
				this.uppy.on("file-removed", v), this.uppy.on("cancel-all", y), this.uppy.on("upload-pause", b), this.uppy.on("pause-all", x), this.uppy.on("resume-all", C), n = () => {
					this.uppy.off("file-removed", v), this.uppy.off("cancel-all", y), this.uppy.off("upload-pause", b), this.uppy.off("pause-all", x), this.uppy.off("resume-all", C);
				}, t.addEventListener("abort", () => {
					d?.abort();
				}), g();
			});
		} finally {
			n?.();
		}
	}
};
//#endregion
export { c as n, k as t };
