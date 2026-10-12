//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
//#endregion
//#region node_modules/@transloadit/prettier-bytes/dist/prettierBytes.js
function d(e, t) {
	if (typeof e != "number" || Number.isNaN(e)) throw TypeError(`Expected a number, got ${typeof e}`);
	let n = e < 0, r = Math.abs(e);
	if (n && (r = -r), r === 0) return "0 B";
	let i = t ? f.indexOf(t) : Math.min(Math.floor(Math.log(r) / Math.log(1024)), f.length - 1), a = Number(r / 1024 ** i), o = f[i];
	return i >= 3 ? a % 1 == 0 ? `${Math.round(a)} ${o}` : `${a.toFixed(2)} ${o}` : `${a >= 10 || a % 1 == 0 ? Math.round(a) : a.toFixed(1)} ${o}`;
}
var f, p = o((() => {
	f = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB",
		"PB",
		"EB",
		"ZB",
		"YB"
	];
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/canvasToBlob.js
function m(e, t, n) {
	return new Promise((r) => {
		e.toBlob(r, t, n);
	});
}
var h = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/dataURItoBlob.js
function g(e, t, n) {
	let r = _.exec(e), i = t.mimeType ?? r?.[1] ?? "plain/text", a;
	if (r?.[2] != null) {
		let e = atob(decodeURIComponent(r[3])), t = new Uint8Array(e.length);
		for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
		a = [t];
	} else r?.[3] != null && (a = [decodeURIComponent(r[3])]);
	return n ? new File(a, t.name || "", { type: i }) : new Blob(a, { type: i });
}
var _, v = o((() => {
	_ = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
})), y, b = o((() => {
	y = class extends Error {
		isNetworkError;
		constructor(e, t) {
			super(e), this.cause = t?.cause, this.isNetworkError = this.cause && Object.hasOwn(this.cause, "isNetworkError") ? this.cause.isNetworkError : !1;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/emaFilter.js
function x(e, t, n, r) {
	return n === 0 || e === t ? e : r === 0 ? t : e + (t - e) * 2 ** (-r / n);
}
var S = o((() => {})), C, w = o((() => {
	C = [
		"a[href]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"area[href]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"input:not([disabled]):not([inert]):not([aria-hidden])",
		"select:not([disabled]):not([inert]):not([aria-hidden])",
		"textarea:not([disabled]):not([inert]):not([aria-hidden])",
		"button:not([disabled]):not([inert]):not([aria-hidden])",
		"iframe:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"object:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"embed:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"[contenteditable]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
		"[tabindex]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])"
	];
})), T, E = o((() => {
	T = class extends Error {
		isNetworkError;
		request;
		constructor(e, t = null) {
			super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/toError.js
function D(e) {
	return e instanceof Error || typeof e == "object" && !!e && "message" in e && typeof e.message == "string";
}
function O(e) {
	return D(e) ? e : Error(String(e));
}
var k = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/fetchWithNetworkError.js
function A(...e) {
	return fetch(...e).catch((e) => {
		throw e.name === "AbortError" ? e : new T(e);
	});
}
var j = o((() => {
	E();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/fileFilters.js
function M(e) {
	return e.filter((e) => !P(e) && !F(e));
}
function N(e) {
	return e.filter((e) => !e.progress?.uploadStarted || !e.isRestored);
}
var P, F, ee = o((() => {
	P = (e) => "error" in e && !!e.error, F = (e) => e.progress.uploadComplete;
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isDOMElement.js
function te(e) {
	return typeof e != "object" || !e || !("nodeType" in e) ? !1 : e.nodeType === Node.ELEMENT_NODE;
}
var ne = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/findAllDOMElements.js
function re(e) {
	if (typeof e == "string") {
		let t = document.querySelectorAll(e);
		return t.length === 0 ? null : Array.from(t);
	}
	return typeof e == "object" && te(e) ? [e] : null;
}
var ie = o((() => {
	ne();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/findDOMElement.js
function ae(e, t = document) {
	return typeof e == "string" ? t.querySelector(e) : te(e) ? e : null;
}
var oe = o((() => {
	ne();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileNameAndExtension.js
function se(e) {
	let t = e.lastIndexOf(".");
	return t === -1 || t === e.length - 1 ? {
		name: e,
		extension: void 0
	} : {
		name: e.slice(0, t),
		extension: e.slice(t + 1)
	};
}
var ce = o((() => {})), I, le = o((() => {
	I = {
		__proto__: null,
		md: "text/markdown",
		markdown: "text/markdown",
		mp4: "video/mp4",
		mp3: "audio/mp3",
		svg: "image/svg+xml",
		jpg: "image/jpeg",
		png: "image/png",
		webp: "image/webp",
		gif: "image/gif",
		heic: "image/heic",
		heif: "image/heif",
		yaml: "text/yaml",
		yml: "text/yaml",
		csv: "text/csv",
		tsv: "text/tab-separated-values",
		tab: "text/tab-separated-values",
		avi: "video/x-msvideo",
		mks: "video/x-matroska",
		mkv: "video/x-matroska",
		mov: "video/quicktime",
		dicom: "application/dicom",
		doc: "application/msword",
		msg: "application/vnd.ms-outlook",
		docm: "application/vnd.ms-word.document.macroenabled.12",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		dot: "application/msword",
		dotm: "application/vnd.ms-word.template.macroenabled.12",
		dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		xla: "application/vnd.ms-excel",
		xlam: "application/vnd.ms-excel.addin.macroenabled.12",
		xlc: "application/vnd.ms-excel",
		xlf: "application/x-xliff+xml",
		xlm: "application/vnd.ms-excel",
		xls: "application/vnd.ms-excel",
		xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
		xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		xlt: "application/vnd.ms-excel",
		xltm: "application/vnd.ms-excel.template.macroenabled.12",
		xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		xlw: "application/vnd.ms-excel",
		txt: "text/plain",
		text: "text/plain",
		conf: "text/plain",
		log: "text/plain",
		pdf: "application/pdf",
		zip: "application/zip",
		"7z": "application/x-7z-compressed",
		rar: "application/x-rar-compressed",
		tar: "application/x-tar",
		gz: "application/gzip",
		dmg: "application/x-apple-diskimage"
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileType.js
function ue(e) {
	if (e.type) return e.type;
	let t = e.name ? se(e.name).extension?.toLowerCase() : null;
	return t && t in I ? I[t] : "application/octet-stream";
}
var de = o((() => {
	ce(), le();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/generateFileID.js
function fe(e) {
	return e.charCodeAt(0).toString(32);
}
function pe(e) {
	let t = "";
	return e.replace(/[^A-Z0-9]/gi, (e) => (t += `-${fe(e)}`, "/")) + t;
}
function me(e, t) {
	let n = t || "uppy";
	return typeof e.name == "string" && (n += `-${pe(e.name.toLowerCase())}`), e.type !== void 0 && (n += `-${e.type}`), e.meta && typeof e.meta.relativePath == "string" && (n += `-${pe(e.meta.relativePath.toLowerCase())}`), e.data?.size !== void 0 && (n += `-${e.data.size}`), e.data.lastModified !== void 0 && (n += `-${e.data.lastModified}`), n;
}
function he(e) {
	return !e.isRemote || !e.remote ? !1 : (/* @__PURE__ */ new Set([
		"box",
		"dropbox",
		"drive",
		"facebook",
		"unsplash"
	])).has(e.remote.provider);
}
function ge(e, t) {
	if (he(e)) return e.id;
	let n = ue(e);
	return me({
		...e,
		type: n
	}, t);
}
var _e = o((() => {
	de();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getAllowedMetaFields.js
function ve(e, t) {
	return e === !0 ? Object.keys(t) : Array.isArray(e) ? e : [];
}
var ye = o((() => {})), be, xe = o((() => {
	be = Array.from;
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/fallbackApi.js
function Se(e) {
	let t = be(e.files);
	return Promise.resolve(t);
}
var Ce = o((() => {
	xe();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
function we(e, t, n, { onSuccess: r }) {
	e.readEntries((i) => {
		let a = [...t, ...i];
		i.length ? queueMicrotask(() => {
			we(e, a, n, { onSuccess: r });
		}) : r(a);
	}, (e) => {
		n(e), r(t);
	});
}
var Te = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
function Ee(e, t) {
	return e == null ? e : {
		kind: e.isFile ? "file" : e.isDirectory ? "directory" : void 0,
		name: e.name,
		getFile() {
			return new Promise((t, n) => e.file(t, n));
		},
		async *values() {
			let n = e.createReader();
			yield* await new Promise((e) => {
				we(n, [], t, { onSuccess: (n) => e(n.map((e) => Ee(e, t))) });
			});
		},
		isSameEntry: void 0
	};
}
async function* De(e, t, n = void 0) {
	let r = () => `${t}/${e.name}`;
	if (e.kind === "file") {
		let i = await e.getFile();
		i == null ? n != null && (yield n) : (i.relativePath = t ? r() : null, yield i);
	} else if (e.kind === "directory") for await (let n of e.values()) yield* De(n, t ? r() : e.name);
	else n != null && (yield n);
}
async function* Oe(e, t) {
	let n = await Promise.all(Array.from(e.items, async (e) => {
		let n;
		return n ??= Ee(typeof e.getAsEntry == "function" ? e.getAsEntry() : e.webkitGetAsEntry(), t), {
			fileSystemHandle: n,
			lastResortFile: e.getAsFile()
		};
	}));
	for (let { lastResortFile: e, fileSystemHandle: r } of n) if (r != null) try {
		yield* De(r, "", e);
	} catch (n) {
		e == null ? t(n) : yield e;
	}
	else e != null && (yield e);
}
var ke = o((() => {
	Te();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/index.js
async function Ae(e, t) {
	let n = t?.logDropError ?? Function.prototype;
	try {
		let t = [];
		for await (let r of Oe(e, n)) t.push(r);
		return t;
	} catch {
		return Se(e);
	}
}
var je = o((() => {
	Ce(), ke();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getErrorMessage.js
function Me(e) {
	return D(e) ? e.message : String(e);
}
var Ne = o((() => {
	k();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileTypeExtension.js
function L(e) {
	return [e] = e.split(";", 1), Pe[e] || null;
}
var Pe, Fe = o((() => {
	Pe = {
		__proto__: null,
		"audio/mp3": "mp3",
		"audio/mp4": "mp4",
		"audio/ogg": "ogg",
		"audio/webm": "webm",
		"image/gif": "gif",
		"image/heic": "heic",
		"image/heif": "heif",
		"image/jpeg": "jpg",
		"image/webp": "webp",
		"image/png": "png",
		"image/svg+xml": "svg",
		"video/mp4": "mp4",
		"video/ogg": "ogv",
		"video/quicktime": "mov",
		"video/webm": "webm",
		"video/x-matroska": "mkv",
		"video/x-msvideo": "avi"
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getSocketHost.js
function Ie(e) {
	let t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?([^\n]+)/i.exec(e)?.[1];
	return `${/^http:\/\//i.test(e) ? "ws" : "wss"}://${t}`;
}
var Le = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTextDirection.js
function Re(e) {
	for (; e && !e.dir;) e = e.parentNode;
	return e?.dir;
}
var R = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTimeStamp.js
function ze(e) {
	return e < 10 ? `0${e}` : e.toString();
}
function Be() {
	let e = /* @__PURE__ */ new Date();
	return `${ze(e.getHours())}:${ze(e.getMinutes())}:${ze(e.getSeconds())}`;
}
var z = o((() => {})), B, Ve = o((() => {
	B = Object.hasOwn;
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isAbortError.js
function He(e) {
	return typeof e == "object" && !!e && "name" in e && e.name === "AbortError";
}
var Ue = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isDragDropSupported.js
function We() {
	if (typeof window > "u") return !1;
	let e = document.body;
	return !(e == null || window == null || !("draggable" in e) || !("ondragstart" in e) || !("ondrop" in e) || !("FormData" in window) || !("FileReader" in window));
}
var Ge = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isNetworkError.js
function V(e) {
	return e ? e.readyState === 4 && e.status === 0 : !1;
}
var Ke = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isObjectURL.js
function qe(e) {
	return e.startsWith("blob:");
}
var Je = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isPreviewSupported.js
function Ye(e) {
	return e ? /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(e) : !1;
}
var Xe = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/isRestrictionError.js
function Ze(e) {
	return e instanceof Error && "isRestriction" in e && e.isRestriction === !0;
}
var Qe = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/secondsToTime.js
function $e(e) {
	return {
		hours: Math.floor(e / 3600) % 24,
		minutes: Math.floor(e / 60) % 60,
		seconds: Math.floor(e % 60)
	};
}
var et = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/prettyETA.js
function tt(e) {
	let t = $e(e);
	return `${t.hours === 0 ? "" : `${t.hours}h`}${t.minutes === 0 ? "" : `${t.hours === 0 ? t.minutes : ` ${t.minutes.toString(10).padStart(2, "0")}`}m`}${t.hours === 0 ? `${t.minutes === 0 ? t.seconds : ` ${t.seconds.toString(10).padStart(2, "0")}`}s` : ""}`;
}
var nt = o((() => {
	et();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/RateLimitedQueue.js
function rt(e) {
	return Error("Cancelled", { cause: e });
}
function it(e) {
	if (e != null) {
		let t = () => this.abort(e.reason);
		e.addEventListener("abort", t, { once: !0 });
		let n = () => {
			e.removeEventListener("abort", t);
		};
		this.then?.(n, n);
	}
	return this;
}
var at, ot = o((() => {
	at = class {
		#e = 0;
		#t = [];
		#n = !1;
		#r;
		#i = 1;
		#a;
		#o;
		limit;
		constructor(e) {
			this.limit = typeof e != "number" || e === 0 ? Infinity : e;
		}
		#s(e) {
			this.#e += 1;
			let t = !1, n;
			try {
				n = e();
			} catch (e) {
				throw --this.#e, e;
			}
			return {
				abort: (e) => {
					t || (t = !0, --this.#e, n?.(e), this.#c());
				},
				done: () => {
					t || (t = !0, --this.#e, this.#c());
				}
			};
		}
		#c() {
			queueMicrotask(() => this.#l());
		}
		#l() {
			if (this.#n || this.#e >= this.limit || this.#t.length === 0) return;
			let e = this.#t.shift();
			if (e == null) throw Error("Invariant violation: next is null");
			let t = this.#s(e.fn);
			e.abort = t.abort, e.done = t.done;
		}
		#u(e, t) {
			let n = {
				fn: e,
				priority: t?.priority || 0,
				abort: () => {
					this.#d(n);
				},
				done: () => {
					throw Error("Cannot mark a queued request as done: this indicates a bug");
				}
			}, r = this.#t.findIndex((e) => n.priority > e.priority);
			return r === -1 ? this.#t.push(n) : this.#t.splice(r, 0, n), n;
		}
		#d(e) {
			let t = this.#t.indexOf(e);
			t !== -1 && this.#t.splice(t, 1);
		}
		run(e, t) {
			return !this.#n && this.#e < this.limit ? this.#s(e) : this.#u(e, t);
		}
		wrapSyncFunction(e, t) {
			return (...n) => {
				let r = this.run(() => (e(...n), queueMicrotask(() => r.done()), () => {}), t);
				return {
					abortOn: it,
					abort() {
						r.abort();
					}
				};
			};
		}
		wrapPromiseFunction(e, t) {
			return (...n) => {
				let r, i = new Promise((i, a) => {
					r = this.run(() => {
						let t, o;
						try {
							o = Promise.resolve(e(...n));
						} catch (e) {
							o = Promise.reject(e);
						}
						return o.then((e) => {
							t ? a(t) : (r.done(), i(e));
						}, (e) => {
							t ? a(t) : (r.done(), a(e));
						}), (e) => {
							t = rt(e);
						};
					}, t);
				});
				return i.abort = (e) => {
					r.abort(e);
				}, i.abortOn = it, i;
			};
		}
		resume() {
			this.#n = !1, clearTimeout(this.#r);
			for (let e = 0; e < this.limit; e++) this.#c();
		}
		#f = () => this.resume();
		pause(e = null) {
			this.#n = !0, clearTimeout(this.#r), e != null && (this.#r = setTimeout(this.#f, e));
		}
		rateLimit(e) {
			clearTimeout(this.#o), this.pause(e), this.limit > 1 && Number.isFinite(this.limit) && (this.#a = this.limit - 1, this.limit = this.#i, this.#o = setTimeout(this.#p, e));
		}
		#p = () => {
			if (this.#n) {
				this.#o = setTimeout(this.#p, 0);
				return;
			}
			this.#i = this.limit, this.limit = Math.ceil((this.#a + this.#i) / 2);
			for (let e = this.#i; e <= this.limit; e++) this.#c();
			this.#a - this.#i > 3 ? this.#o = setTimeout(this.#p, 2e3) : this.#i = Math.floor(this.#i / 2);
		};
		get isPaused() {
			return this.#n;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/remoteFileObjToLocal.js
function st(e) {
	return {
		...e,
		type: e.mimeType,
		extension: e.name ? se(e.name).extension : null
	};
}
var ct = o((() => {
	ce();
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/Translator.js
function lt(e, t, n) {
	let r = [];
	return e.forEach((e) => {
		if (typeof e != "string") {
			r.push(e);
			return;
		}
		t[Symbol.split](e).forEach((e, t, i) => {
			e !== "" && r.push(e), t < i.length - 1 && r.push(n);
		});
	}), r;
}
function ut(e, t) {
	let n = /\$/g, r = [e];
	if (t == null) return r;
	for (let e of Object.keys(t)) if (e !== "_") {
		let i = t[e];
		typeof i == "string" && (i = n[Symbol.replace](i, "$$$$")), r = lt(r, RegExp(`%\\{${e}\\}`, "g"), i);
	}
	return r;
}
var dt, ft, pt = o((() => {
	dt = (e) => {
		throw Error(`missing string: ${e}`);
	}, ft = class {
		locale;
		constructor(e, { onMissingKey: t = dt } = {}) {
			this.locale = {
				strings: {},
				pluralize(e) {
					return e === 1 ? 0 : 1;
				}
			}, Array.isArray(e) ? e.forEach(this.#t, this) : this.#t(e), this.#e = t;
		}
		#e;
		#t(e) {
			if (!e?.strings) return;
			let t = this.locale;
			Object.assign(this.locale, {
				strings: {
					...t.strings,
					...e.strings
				},
				pluralize: e.pluralize || t.pluralize
			});
		}
		translate(e, t) {
			return this.translateArray(e, t).join("");
		}
		translateArray(e, t) {
			let n = this.locale.strings[e];
			if (n ??= (this.#e(e), e), typeof n == "object") {
				if (t && t.smart_count !== void 0) {
					let e = this.locale.pluralize(t.smart_count);
					return ut(n[e], t);
				}
				throw Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
			}
			if (typeof n != "string") throw Error("string was not a string");
			return ut(n, t);
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/truncateString.js
function mt(e, t) {
	if (t === 0) return "";
	if (e.length <= t) return e;
	if (t <= 4) return `${e.slice(0, t - 1)}…`;
	let n = t - 3, r = Math.ceil(n / 2), i = Math.floor(n / 2);
	return e.slice(0, r) + ht + e.slice(-i);
}
var ht, gt = o((() => {
	ht = "...";
})), _t, vt = o((() => {
	_t = class extends Error {
		name = "UserFacingApiError";
		code;
		constructor(e, t) {
			super(e), this.code = t;
		}
	};
}));
//#endregion
//#region node_modules/preact/dist/preact.module.js
function yt(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function bt(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function xt(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? qt.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return St(e, o, r, i, null);
}
function St(e, t, n, r, i) {
	var a = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: i ?? ++Jt,
		__i: -1,
		__u: 0
	};
	return i == null && W.vnode != null && W.vnode(a), a;
}
function Ct() {
	return { current: null };
}
function H(e) {
	return e.children;
}
function U(e, t) {
	this.props = e, this.context = t;
}
function wt(e, t) {
	if (t == null) return e.__ ? wt(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? wt(e) : null;
}
function Tt(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = yt({}, t);
		a.__v = t.__v + 1, W.vnode && W.vnode(a), Lt(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? wt(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, zt(r, a, i), t.__e = t.__ = null, a.__e != n && Et(a);
	}
}
function Et(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), Et(e);
}
function Dt(e) {
	(!e.__d && (e.__d = !0) && Yt.push(e) && !Ot.__r++ || Xt != W.debounceRendering) && ((Xt = W.debounceRendering) || Zt)(Ot);
}
function Ot() {
	try {
		for (var e, t = 1; Yt.length;) Yt.length > t && Yt.sort(Qt), e = Yt.shift(), t = Yt.length, Tt(e);
	} finally {
		Yt.length = Ot.__r = 0;
	}
}
function kt(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || cn, v = t.length;
	for (c = At(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || sn, p.__i = d, g = Lt(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && Ht(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = jt(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function At(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = St(null, o, null, null, null) : un(o) ? o = e.__k[a] = St(H, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = St(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = Nt(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = wt(s)), Ut(s, s));
	return r;
}
function jt(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = jt(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = wt(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function Mt(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (un(e) ? e.some(function(e) {
		Mt(e, t);
	}) : t.push(e)), t;
}
function Nt(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function Pt(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || ln.test(t) ? n : n + "px";
}
function Ft(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || Pt(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || Pt(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(nn, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[tn] = r[tn] : (n[tn] = rn, e.addEventListener(t, a ? on : an, a)) : e.removeEventListener(t, a ? on : an, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function It(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[en] == null) t[en] = rn++;
			else if (t[en] < n[tn]) return;
			return n(W.event ? W.event(t) : t);
		}
	};
}
function Lt(e, t, n, r, i, a, o, s, c, l) {
	var u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = W.__b) && u(t);
	n: if (typeof E == "function") {
		d = o.length;
		try {
			if (v = t.props, y = E.prototype && E.prototype.render, b = (u = E.contextType) && r[u.__c], x = u ? b ? b.props.value : u.__ : r, n.__c ? _ = (f = t.__c = n.__c).__ = f.__E : (y ? t.__c = f = new E(v, x) : (t.__c = f = new U(v, x), f.constructor = E, f.render = Wt), b && b.sub(f), f.state || (f.state = {}), f.__n = r, p = f.__d = !0, f.__h = [], f._sb = []), y && f.__s == null && (f.__s = f.state), y && E.getDerivedStateFromProps != null && (f.__s == f.state && (f.__s = yt({}, f.__s)), yt(f.__s, E.getDerivedStateFromProps(v, f.__s))), m = f.props, h = f.state, f.__v = t, p) y && E.getDerivedStateFromProps == null && f.componentWillMount != null && f.componentWillMount(), y && f.componentDidMount != null && f.__h.push(f.componentDidMount);
			else {
				if (y && E.getDerivedStateFromProps == null && v !== m && f.componentWillReceiveProps != null && f.componentWillReceiveProps(v, x), t.__v == n.__v || !f.__e && f.shouldComponentUpdate != null && !1 === f.shouldComponentUpdate(v, f.__s, x)) {
					t.__v != n.__v && (f.props = v, f.state = f.__s, f.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), cn.push.apply(f.__h, f._sb), f._sb = [], f.__h.length && o.push(f), s = wt(n);
					break n;
				}
				f.componentWillUpdate != null && f.componentWillUpdate(v, f.__s, x), y && f.componentDidUpdate != null && f.__h.push(function() {
					f.componentDidUpdate(m, h, g);
				});
			}
			if (f.context = x, f.props = v, f.__P = e, f.__e = !1, S = W.__r, C = 0, y) f.state = f.__s, f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), cn.push.apply(f.__h, f._sb), f._sb = [];
			else do
				f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), f.state = f.__s;
			while (f.__d && ++C < 25);
			f.state = f.__s, f.getChildContext != null && (r = yt(yt({}, r), f.getChildContext())), y && !p && f.getSnapshotBeforeUpdate != null && (g = f.getSnapshotBeforeUpdate(m, h)), w = u != null && u.type === H && u.key == null ? Bt(u.props.children) : u, s = kt(e, un(w) ? w : [w], t, n, r, i, a, o, s, c, l), f.base = t.__e, t.__u &= -161, f.__h.length && o.push(f), _ && (f.__E = f.__ = null);
		} catch (e) {
			if (o.length = d, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (T = a.length; T--;) bt(a[T]);
			} else t.__e = n.__e;
			t.__k ??= n.__k || [], e.then || Rt(t), W.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = Vt(n.__e, t, n, r, i, a, o, c, l);
	return (u = W.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function Rt(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Rt));
}
function zt(e, t, n) {
	for (var r = 0; r < n.length; r++) Ht(n[r], n[++r], n[++r]);
	W.__c && W.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			W.__e(e, t.__v);
		}
	});
}
function Bt(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : un(e) ? e.map(Bt) : e.constructor === void 0 ? yt({}, e) : null;
}
function Vt(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h, g = n.props || sn, _ = t.props, v = t.type;
	if (v == "svg" ? i = "http://www.w3.org/2000/svg" : v == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i ||= "http://www.w3.org/1999/xhtml", a != null) {
		for (l = 0; l < a.length; l++) if ((p = a[l]) && "setAttribute" in p == !!v && (v ? p.localName == v : p.nodeType == 3)) {
			e = p, a[l] = null;
			break;
		}
	}
	if (e == null) {
		if (v == null) return document.createTextNode(_);
		e = document.createElementNS(i, v, _.is && _), s &&= (W.__m && W.__m(t, a), !1), a = null;
	}
	if (v == null) g === _ || s && e.data == _ || (e.data = _);
	else {
		if (a = v == "textarea" && _.defaultValue != null ? null : a && qt.call(e.childNodes), !s && a != null) for (g = {}, l = 0; l < e.attributes.length; l++) g[(p = e.attributes[l]).name] = p.value;
		for (l in g) p = g[l], l == "dangerouslySetInnerHTML" ? d = p : l == "children" || l in _ || l == "value" && "defaultValue" in _ || l == "checked" && "defaultChecked" in _ || Ft(e, l, null, p, i);
		for (l in _) p = _[l], l == "children" ? f = p : l == "dangerouslySetInnerHTML" ? u = p : l == "value" ? m = p : l == "checked" ? h = p : s && typeof p != "function" || g[l] === p || Ft(e, l, p, g[l], i);
		if (u) s || d && (u.__html == d.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
		else if (d && (e.innerHTML = ""), kt(t.type == "template" ? e.content : e, un(f) ? f : [f], t, n, r, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && wt(n, 0), s, c), a != null) for (l = a.length; l--;) bt(a[l]);
		s && v != "textarea" || (l = "value", v == "progress" && m == null ? e.removeAttribute("value") : m != null && (m !== e[l] || v == "progress" && !m || v == "option" && m != g[l]) && Ft(e, l, m, g[l], i), l = "checked", h != null && h != e[l] && Ft(e, l, h, g[l], i));
	}
	return e;
}
function Ht(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		W.__e(e, n);
	}
}
function Ut(e, t, n) {
	var r, i;
	if (W.unmount && W.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || Ht(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			W.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Ut(r[i], t, n || typeof e.type != "function");
	n || bt(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Wt(e, t, n) {
	return this.constructor(e, n);
}
function Gt(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), W.__ && W.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], Lt(t, e = (!r && n || t).__k = xt(H, null, [e]), i || sn, sn, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? qt.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), zt(a, e, o), e.props.children = null;
}
function Kt(e, t, n) {
	var r, i, a, o, s = yt({}, e.props);
	for (a in e.type && e.type.defaultProps && (o = e.type.defaultProps), t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : s[a] = t[a] === void 0 && o != null ? o[a] : t[a];
	return arguments.length > 2 && (s.children = arguments.length > 3 ? qt.call(arguments, 2) : n), St(e.type, s, r || e.key, i || e.ref, null);
}
var qt, W, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn = o((() => {
	sn = {}, cn = [], ln = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, un = Array.isArray, qt = cn.slice, W = { __e: function(e, t, n, r) {
		for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
			if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
		} catch (t) {
			e = t;
		}
		throw e;
	} }, Jt = 0, U.prototype.setState = function(e, t) {
		var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = yt({}, this.state);
		typeof e == "function" && (e = e(yt({}, n), this.props)), e && yt(n, e), e != null && this.__v && (t && this._sb.push(t), Dt(this));
	}, U.prototype.forceUpdate = function(e) {
		this.__v && (this.__e = !0, e && this.__h.push(e), Dt(this));
	}, U.prototype.render = H, Yt = [], Zt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Qt = function(e, t) {
		return e.__v.__b - t.__v.__b;
	}, Ot.__r = 0, $t = Math.random().toString(8), en = "__d" + $t, tn = "__a" + $t, nn = /(PointerCapture)$|Capture$/i, rn = 0, an = It(!1), on = It(!0);
}));
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
function G(e, t, n, r, i, a) {
	t ||= {};
	var o, s, c = t;
	if ("ref" in c) for (s in c = {}, t) s == "ref" ? o = t[s] : c[s] = t[s];
	var l = {
		type: e,
		props: c,
		key: n,
		ref: o,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --fn,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return W.vnode && W.vnode(l), l;
}
var fn, K = o((() => {
	dn(), fn = 0, Array.isArray;
}));
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
function pn(e, t) {
	Y.__h && Y.__h(J, e, An || t), An = 0;
	var n = J.__H || (J.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function mn(e) {
	return An = 1, hn(En, e);
}
function hn(e, t, n) {
	var r = pn(Dn++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : En(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = J, !J.__f)) {
		var i = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var i = !1, o = r.__c.props !== e;
			if (r.__c.__H.__.some(function(e) {
				if (e.__N) {
					i = !0;
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
				}
			}), a) {
				var s = a.call(this, e, t, n);
				return i ? s || o : s;
			}
			return !i || o;
		};
		J.__f = !0;
		var a = J.shouldComponentUpdate, o = J.componentWillUpdate;
		J.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, J.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function gn(e, t) {
	var n = pn(Dn++, 3);
	!Y.__s && Tn(n.__H, t) && (n.__ = e, n.u = t, J.__H.__h.push(n));
}
function _n(e, t) {
	var n = pn(Dn++, 4);
	!Y.__s && Tn(n.__H, t) && (n.__ = e, n.u = t, J.__h.push(n));
}
function q(e) {
	return An = 5, vn(function() {
		return { current: e };
	}, []);
}
function vn(e, t) {
	var n = pn(Dn++, 7);
	return Tn(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function yn(e, t) {
	return An = 8, vn(function() {
		return e;
	}, t);
}
function bn() {
	var e = pn(Dn++, 11);
	if (!e.__) {
		for (var t = J.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function xn() {
	for (var e; e = jn.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Cn), t.__h.some(wn), t.__h = [];
		} catch (n) {
			t.__h = [], Y.__e(n, e.__v);
		}
	}
}
function Sn(e) {
	var t, n = function() {
		clearTimeout(r), Rn && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Rn && (t = requestAnimationFrame(n));
}
function Cn(e) {
	var t = J, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), J = t;
}
function wn(e) {
	var t = J;
	e.__c = e.__(), J = t;
}
function Tn(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function En(e, t) {
	return typeof t == "function" ? t(e) : t;
}
var Dn, J, On, kn, An, jn, Y, Mn, Nn, Pn, Fn, In, Ln, Rn, zn = o((() => {
	dn(), An = 0, jn = [], Y = W, Mn = Y.__b, Nn = Y.__r, Pn = Y.diffed, Fn = Y.__c, In = Y.unmount, Ln = Y.__, Y.__b = function(e) {
		J = null, Mn && Mn(e);
	}, Y.__ = function(e, t) {
		e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ln && Ln(e, t);
	}, Y.__r = function(e) {
		Nn && Nn(e), Dn = 0;
		var t = (J = e.__c).__H;
		t && (On === J ? (t.__h = [], J.__h = [], t.__.some(function(e) {
			e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
		})) : (t.__h.some(Cn), t.__h.some(wn), t.__h = [], Dn = 0)), On = J;
	}, Y.diffed = function(e) {
		Pn && Pn(e);
		var t = e.__c;
		t && t.__H && (t.__H.__h.length && (jn.push(t) !== 1 && kn === Y.requestAnimationFrame || ((kn = Y.requestAnimationFrame) || Sn)(xn)), t.__H.__.some(function(e) {
			e.u &&= (e.__H = e.u, void 0);
		})), On = J = null;
	}, Y.__c = function(e, t) {
		t.some(function(e) {
			try {
				e.__h.some(Cn), e.__h = e.__h.filter(function(e) {
					return !e.__ || wn(e);
				});
			} catch (n) {
				t.some(function(e) {
					e.__h &&= [];
				}), t = [], Y.__e(n, e.__v);
			}
		}), Fn && Fn(e, t);
	}, Y.unmount = function(e) {
		In && In(e);
		var t, n = e.__c;
		n && n.__H && (n.__H.__.some(function(e) {
			try {
				Cn(e);
			} catch (e) {
				t = e;
			}
		}), n.__H = void 0, t && Y.__e(t, n.__v));
	}, Rn = typeof requestAnimationFrame == "function";
}));
//#endregion
//#region node_modules/@uppy/core/lib/utils/VirtualList.js
function Bn({ data: e, rowHeight: t, renderRow: n, overscanCount: r = 10, padding: i = 4, ...a }) {
	let o = q(null), [s, c] = mn(0), [l, u] = mn(0);
	gn(() => {
		function e() {
			o.current != null && l !== o.current.offsetHeight && u(o.current.offsetHeight);
		}
		return e(), window.addEventListener("resize", e), () => {
			window.removeEventListener("resize", e);
		};
	}, [l]);
	let d = yn(() => {
		o.current && c(o.current.scrollTop);
	}, []), f = Math.floor(s / t), p = Math.floor(l / t);
	r && (f = Math.max(0, f - f % r), p += r);
	let m = f + p + i, h = e.slice(f, m), g = {
		...Vn,
		height: e.length * t
	}, _ = {
		...Hn,
		top: f * t
	};
	return G("div", {
		onScroll: d,
		ref: o,
		...a,
		children: G("div", {
			role: "presentation",
			style: g,
			children: G("div", {
				role: "presentation",
				style: _,
				children: h.map(n)
			})
		})
	});
}
var Vn, Hn, Un = o((() => {
	K(), zn(), Vn = {
		position: "relative",
		width: "100%",
		minHeight: "100%"
	}, Hn = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		overflow: "visible"
	};
})), X = o((() => {
	h(), v(), b(), S(), w(), E(), k(), j(), ee(), ie(), oe(), _e(), ye(), je(), Ne(), ce(), de(), Fe(), Le(), R(), z(), Ve(), Ue(), ne(), Ge(), Ke(), Je(), Xe(), Qe(), le(), nt(), ot(), ct(), et(), pt(), xe(), gt(), vt(), Un();
})), Wn, Gn = o((() => {
	X(), Wn = class {
		uppy;
		opts;
		id;
		defaultLocale;
		i18n;
		i18nArray;
		type;
		VERSION;
		constructor(e, t) {
			this.uppy = e, this.opts = t ?? {};
		}
		getPluginState() {
			let { plugins: e } = this.uppy.getState();
			return e?.[this.id] || {};
		}
		setPluginState(e) {
			let { plugins: t } = this.uppy.getState();
			this.uppy.setState({ plugins: {
				...t,
				[this.id]: {
					...t[this.id],
					...e
				}
			} });
		}
		setOptions(e) {
			this.opts = {
				...this.opts,
				...e
			}, this.setPluginState(void 0), this.i18nInit();
		}
		i18nInit() {
			let e = new ft([
				this.defaultLocale,
				this.uppy.locale,
				this.opts.locale
			]);
			this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState(void 0);
		}
		addTarget(e) {
			throw Error("Extend the addTarget method to add your plugin to another plugin's target");
		}
		install() {}
		uninstall() {}
		update(e) {}
		afterUpdate() {}
	};
})), Kn, qn = o((() => {
	Kn = class {
		#e;
		#t = [];
		constructor(e) {
			this.#e = e;
		}
		on(e, t) {
			return this.#t.push([e, t]), this.#e.on(e, t);
		}
		remove() {
			for (let [e, t] of this.#t.splice(0)) this.#e.off(e, t);
		}
		onFilePause(e, t) {
			this.on("upload-pause", (n, r) => {
				e === n?.id && t(r);
			});
		}
		onFileRemove(e, t) {
			this.on("file-removed", (n) => {
				e === n.id && t(n.id);
			});
		}
		onPause(e, t) {
			this.on("upload-pause", (n, r) => {
				e === n?.id && t(r);
			});
		}
		onRetry(e, t) {
			this.on("upload-retry", (n) => {
				e === n?.id && t();
			});
		}
		onRetryAll(e, t) {
			this.on("retry-all", () => {
				this.#e.getFile(e) && t();
			});
		}
		onPauseAll(e, t) {
			this.on("pause-all", () => {
				this.#e.getFile(e) && t();
			});
		}
		onCancelAll(e, t) {
			this.on("cancel-all", (...n) => {
				this.#e.getFile(e) && t(...n);
			});
		}
		onResumeAll(e, t) {
			this.on("resume-all", () => {
				this.#e.getFile(e) && t();
			});
		}
	};
})), Jn, Yn, Xn = o((() => {
	X(), Jn = {
		debug: () => {},
		warn: () => {},
		error: (...e) => console.error(`[Uppy] [${Be()}]`, ...e)
	}, Yn = {
		debug: (...e) => console.debug(`[Uppy] [${Be()}]`, ...e),
		warn: (...e) => console.warn(`[Uppy] [${Be()}]`, ...e),
		error: (...e) => console.error(`[Uppy] [${Be()}]`, ...e)
	};
})), Zn = /* @__PURE__ */ s(((e, t) => {
	function n(e, t) {
		this.text = e ||= "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t);
	}
	n.prototype.match = function(e) {
		var t = !0, n = this.parts, r, i = n.length, a;
		if (typeof e == "string" || e instanceof String) {
			if (!this.hasWild && this.text != e) t = !1;
			else {
				for (a = (e || "").split(this.separator), r = 0; t && r < i; r++) if (n[r] === "*") continue;
				else t = r < a.length && n[r] === a[r];
				t &&= a;
			}
		} else if (typeof e.splice == "function") for (t = [], r = e.length; r--;) this.match(e[r]) && (t[t.length] = e[r]);
		else if (typeof e == "object") for (var o in t = {}, e) this.match(o) && (t[o] = e[o]);
		return t;
	}, t.exports = function(e, t, r) {
		var i = new n(e, r || /[\/\.]/);
		return t === void 0 ? i : i.match(t);
	};
})), Qn = /* @__PURE__ */ s(((e, t) => {
	var n = Zn(), r = /[\/\+\.]/;
	t.exports = function(e, t) {
		function i(t) {
			var i = n(t, e, r);
			return i && i.length >= 2;
		}
		return t ? i(t.split(";")[0]) : i;
	};
})), $n, er, tr, nr, rr = o((() => {
	p(), $n = /* @__PURE__ */ u(Qn(), 1), er = {
		maxFileSize: null,
		minFileSize: null,
		maxTotalFileSize: null,
		maxNumberOfFiles: null,
		minNumberOfFiles: null,
		allowedFileTypes: null,
		requiredMetaFields: []
	}, tr = class extends Error {
		isUserFacing;
		file;
		constructor(e, t) {
			super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
		}
		isRestriction = !0;
	}, nr = class {
		getI18n;
		getOpts;
		constructor(e, t) {
			this.getI18n = t, this.getOpts = () => {
				let t = e();
				if (t.restrictions?.allowedFileTypes != null && !Array.isArray(t.restrictions.allowedFileTypes)) throw TypeError("`restrictions.allowedFileTypes` must be an array");
				return t;
			};
		}
		validateAggregateRestrictions(e, t) {
			let { maxTotalFileSize: n, maxNumberOfFiles: r } = this.getOpts().restrictions;
			if (r && e.filter((e) => !e.isGhost).length + t.length > r) throw new tr(`${this.getI18n()("youCanOnlyUploadX", { smart_count: r })}`);
			if (n) {
				let r = [...e, ...t].reduce((e, t) => e + (t.size ?? 0), 0);
				if (r > n) throw new tr(this.getI18n()("aggregateExceedsSize", {
					sizeAllowed: d(n),
					size: d(r)
				}));
			}
		}
		validateSingleFile(e) {
			let { maxFileSize: t, minFileSize: n, allowedFileTypes: r } = this.getOpts().restrictions;
			if (r && !r.some((t) => t.includes("/") ? e.type ? (0, $n.default)(e.type.replace(/;.*?$/, ""), t) : !1 : t[0] === "." && e.extension ? e.extension.toLowerCase() === t.slice(1).toLowerCase() : !1)) {
				let t = r.join(", ");
				throw new tr(this.getI18n()("youCanOnlyUploadFileTypes", { types: t }), { file: e });
			}
			if (t && e.size != null && e.size > t) throw new tr(this.getI18n()("exceedsSize", {
				size: d(t),
				file: e.name ?? this.getI18n()("unnamed")
			}), { file: e });
			if (n && e.size != null && e.size < n) throw new tr(this.getI18n()("inferiorSize", { size: d(n) }), { file: e });
		}
		validate(e, t) {
			t.forEach((e) => {
				this.validateSingleFile(e);
			}), this.validateAggregateRestrictions(e, t);
		}
		validateMinNumberOfFiles(e) {
			let { minNumberOfFiles: t } = this.getOpts().restrictions;
			if (t && Object.keys(e).length < t) throw new tr(this.getI18n()("youHaveToAtLeastSelectX", { smart_count: t }));
		}
		getMissingRequiredMetaFields(e) {
			let t = new tr(this.getI18n()("missingRequiredMetaFieldOnFile", { fileName: e.name ?? this.getI18n()("unnamed") })), { requiredMetaFields: n } = this.getOpts().restrictions, r = [];
			for (let t of n) (!Object.hasOwn(e.meta, t) || e.meta[t] === "") && r.push(t);
			return {
				missingFields: r,
				error: t
			};
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/UIPlugin.js
function ir(e) {
	let t = null, n;
	return (...r) => (n = r, t ||= Promise.resolve().then(() => (t = null, e(...n))), t);
}
var ar, or = o((() => {
	dn(), Gn(), X(), ar = class e extends Wn {
		#e;
		isTargetDOMEl;
		el = null;
		parent;
		title;
		getTargetPlugin(t) {
			let n;
			if (typeof t?.addTarget == "function") n = t, n instanceof e || console.warn(Error("The provided plugin is not an instance of UIPlugin. This is an indication of a bug with the way Uppy is bundled.", { cause: {
				targetPlugin: n,
				UIPlugin: e
			} }));
			else if (typeof t == "function") {
				let e = t;
				this.uppy.iteratePlugins((t) => {
					t instanceof e && (n = t);
				});
			}
			return n;
		}
		mount(e, t) {
			let n = t.id, r = ae(e);
			if (r) {
				this.isTargetDOMEl = !0;
				let t = document.createElement("div");
				return t.classList.add("uppy-Root"), this.#e = ir((e) => {
					this.uppy.getPlugin(this.id) && (Gt(this.render(e, t), t), this.afterUpdate());
				}), this.uppy.log(`Installing ${n} to a DOM element '${e}'`), this.opts.replaceTargetContent && (r.innerHTML = ""), Gt(this.render(this.uppy.getState(), t), t), this.el = t, r.appendChild(t), t.dir = this.opts.direction || Re(t) || "ltr", this.onMount(), this.el;
			}
			let i = this.getTargetPlugin(e);
			if (i) return this.uppy.log(`Installing ${n} to ${i.id}`), this.parent = i, this.el = i.addTarget(t), this.onMount(), this.el;
			this.uppy.log(`Not installing ${n}`);
			let a = `Invalid target option given to ${n}.`;
			throw a += typeof e == "function" ? " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", Error(a);
		}
		render(e, t) {
			throw Error("Extend the render method to add your plugin to a DOM element");
		}
		update(e) {
			this.el != null && this.#e?.(e);
		}
		unmount() {
			this.isTargetDOMEl && this.el?.remove(), this.onUnmount();
		}
		onMount() {}
		onUnmount() {}
	};
})), sr = /* @__PURE__ */ s(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), cr = /* @__PURE__ */ s(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), lr = /* @__PURE__ */ s(((e, t) => {
	var n = cr(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), ur = /* @__PURE__ */ s(((e, t) => {
	var n = lr();
	t.exports = function() {
		return n.Date.now();
	};
})), dr = /* @__PURE__ */ s(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), fr = /* @__PURE__ */ s(((e, t) => {
	var n = dr(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), pr = /* @__PURE__ */ s(((e, t) => {
	t.exports = lr().Symbol;
})), mr = /* @__PURE__ */ s(((e, t) => {
	var n = pr(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
	function s(e) {
		var t = i.call(e, o), n = e[o];
		try {
			e[o] = void 0;
			var r = !0;
		} catch {}
		var s = a.call(e);
		return r && (t ? e[o] = n : delete e[o]), s;
	}
	t.exports = s;
})), hr = /* @__PURE__ */ s(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), gr = /* @__PURE__ */ s(((e, t) => {
	var n = pr(), r = mr(), i = hr(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), _r = /* @__PURE__ */ s(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), vr = /* @__PURE__ */ s(((e, t) => {
	var n = gr(), r = _r(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), yr = /* @__PURE__ */ s(((e, t) => {
	var n = fr(), r = sr(), i = vr(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
	function u(e) {
		if (typeof e == "number") return e;
		if (i(e)) return a;
		if (r(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = r(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = n(e);
		var u = s.test(e);
		return u || c.test(e) ? l(e.slice(2), u ? 2 : 8) : o.test(e) ? a : +e;
	}
	t.exports = u;
})), br = /* @__PURE__ */ s(((e, t) => {
	var n = sr(), r = ur(), i = yr(), a = "Expected a function", o = Math.max, s = Math.min;
	function c(e, t, c) {
		var l, u, d, f, p, m, h = 0, g = !1, _ = !1, v = !0;
		if (typeof e != "function") throw TypeError(a);
		t = i(t) || 0, n(c) && (g = !!c.leading, _ = "maxWait" in c, d = _ ? o(i(c.maxWait) || 0, t) : d, v = "trailing" in c ? !!c.trailing : v);
		function y(t) {
			var n = l, r = u;
			return l = u = void 0, h = t, f = e.apply(r, n), f;
		}
		function b(e) {
			return h = e, p = setTimeout(C, t), g ? y(e) : f;
		}
		function x(e) {
			var n = e - m, r = e - h, i = t - n;
			return _ ? s(i, d - r) : i;
		}
		function S(e) {
			var n = e - m, r = e - h;
			return m === void 0 || n >= t || n < 0 || _ && r >= d;
		}
		function C() {
			var e = r();
			if (S(e)) return w(e);
			p = setTimeout(C, x(e));
		}
		function w(e) {
			return p = void 0, v && l ? y(e) : (l = u = void 0, f);
		}
		function T() {
			p !== void 0 && clearTimeout(p), h = 0, l = m = u = p = void 0;
		}
		function E() {
			return p === void 0 ? f : w(r());
		}
		function D() {
			var e = r(), n = S(e);
			if (l = arguments, u = this, m = e, n) {
				if (p === void 0) return b(m);
				if (_) return clearTimeout(p), p = setTimeout(C, t), y(m);
			}
			return p === void 0 && (p = setTimeout(C, t)), f;
		}
		return D.cancel = T, D.flush = E, D;
	}
	t.exports = c;
})), xr = /* @__PURE__ */ s(((e, t) => {
	var n = br(), r = sr(), i = "Expected a function";
	function a(e, t, a) {
		var o = !0, s = !0;
		if (typeof e != "function") throw TypeError(i);
		return r(a) && (o = "leading" in a ? !!a.leading : o, s = "trailing" in a ? !!a.trailing : s), n(e, t, {
			leading: o,
			maxWait: t,
			trailing: s
		});
	}
	t.exports = a;
})), Sr = /* @__PURE__ */ s(((e, t) => {
	t.exports = function() {
		var e = {}, t = e._fns = {};
		e.emit = function(e, t, i, a, o, s, c) {
			var l = n(e);
			l.length && r(e, l, [
				t,
				i,
				a,
				o,
				s,
				c
			]);
		}, e.on = function(e, n) {
			t[e] || (t[e] = []), t[e].push(n);
		}, e.once = function(t, n) {
			function r() {
				n.apply(this, arguments), e.off(t, r);
			}
			this.on(t, r);
		}, e.off = function(e, t) {
			var n = [];
			if (e && t) for (var r = this._fns[e], i = 0, a = r ? r.length : 0; i < a; i++) r[i] !== t && n.push(r[i]);
			n.length ? this._fns[e] = n : delete this._fns[e];
		};
		function n(e) {
			for (var n = t[e] ? t[e] : [], r = e.indexOf(":"), i = r === -1 ? [e] : [e.substring(0, r), e.substring(r + 1)], a = Object.keys(t), o = 0, s = a.length; o < s; o++) {
				var c = a[o];
				if (c === "*" && (n = n.concat(t[c])), i.length === 2 && i[0] === c) {
					n = n.concat(t[c]);
					break;
				}
			}
			return n;
		}
		function r(e, t, n) {
			for (var r = 0, i = t.length; r < i && t[r]; r++) t[r].event = e, t[r].apply(t[r], n);
		}
		return e;
	};
})), Cr, wr = o((() => {
	Cr = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9";
})), Tr, Er = o((() => {
	wr(), Tr = (e = 21) => {
		let t = "", n = e | 0;
		for (; n-- > 0;) t += Cr[Math.random() * 64 | 0];
		return t;
	};
})), Dr, Or, kr, Ar, jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur = o((() => {
	Dr = "@uppy/core", Or = "Core module for the extensible JavaScript file upload widget with support for drag&drop, resumable uploads, previews, restrictions, file processing/encoding, remote providers like Dropbox, Google Drive, S3 and more :dog:", kr = "6.2.0", Ar = "dist/style.min.css", jr = "module", Mr = ["*.css"], Nr = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && sass --load-path=../../ src/provider-views/style.scss dist/provider-views.css && postcss dist/style.css -u cssnano -o dist/style.min.css && postcss dist/provider-views.css -u cssnano -o dist/provider-views.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}, Pr = [
		"file uploader",
		"uppy",
		"uppy-plugin"
	], Fr = "https://uppy.io", Ir = { url: "https://github.com/transloadit/uppy/issues" }, Lr = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Rr = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], zr = {
		".": "./lib/index.js",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.css": "./dist/style.css",
		"./css/style.scss": "./src/style.scss",
		"./store-default": "./lib/store/index.js",
		"./utils": "./lib/utils/index.js",
		"./utils/preact": "./lib/utils/preact/index.js",
		"./utils/preact/hooks": "./lib/utils/preact/hooks.js",
		"./companion-client": "./lib/companion-client/index.js",
		"./provider-views": "./lib/provider-views/index.js",
		"./provider-views/css/style.min.css": "./dist/provider-views.min.css",
		"./provider-views/css/style.css": "./dist/provider-views.css",
		"./provider-views/css/style.scss": "./src/provider-views/style.scss",
		"./package.json": "./package.json"
	}, Br = {
		"@transloadit/prettier-bytes": "^2.0.0",
		classnames: "^2.5.1",
		lodash: "^4.18.1",
		"mime-match": "^1.0.2",
		"namespace-emitter": "^2.0.1",
		nanoid: "^6.0.1",
		"p-queue": "^9.3.3",
		"p-retry": "^8.0.0",
		preact: "^10.29.2"
	}, Vr = {
		"@types/deep-freeze": "^0",
		"@types/gapi": "^0.0.47",
		"@types/google.accounts": "^0.0.18",
		"@types/google.picker": "^0.0.52",
		"@types/lodash": "^4.17.25",
		"@types/mime-match": "^1.0.0",
		"@types/namespace-emitter": "^2.0.0",
		"@types/node": "^22.20.1",
		"@uppy-dev/tsconfig": "^0.0.0",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		"deep-freeze": "^0.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vite: "^8.2.2",
		vitest: "^4.1.11"
	}, Hr = {
		name: Dr,
		description: Or,
		version: kr,
		license: "MIT",
		style: Ar,
		type: jr,
		sideEffects: Mr,
		scripts: Nr,
		keywords: Pr,
		homepage: Fr,
		bugs: Ir,
		repository: Lr,
		files: Rr,
		exports: zr,
		dependencies: Br,
		devDependencies: Vr
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/getFileName.js
function Wr(e, t) {
	return t.name ? t.name : e.split("/")[0] === "image" ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname";
}
var Gr = o((() => {})), Kr, qr = o((() => {
	Kr = { strings: {
		addBulkFilesFailed: {
			0: "Failed to add %{smart_count} file due to an internal error",
			1: "Failed to add %{smart_count} files due to internal errors"
		},
		youCanOnlyUploadX: {
			0: "You can only upload %{smart_count} file",
			1: "You can only upload %{smart_count} files"
		},
		youHaveToAtLeastSelectX: {
			0: "You have to select at least %{smart_count} file",
			1: "You have to select at least %{smart_count} files"
		},
		aggregateExceedsSize: "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
		exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
		missingRequiredMetaField: "Missing required meta fields",
		missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
		inferiorSize: "This file is smaller than the allowed size of %{size}",
		youCanOnlyUploadFileTypes: "You can only upload: %{types}",
		noMoreFilesAllowed: "Cannot add more files",
		noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
		companionError: "Connection with Companion failed",
		actionFailed: "The action failed",
		authAborted: "Authentication aborted",
		companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
		failedToUpload: "Failed to upload %{file}",
		noInternetConnection: "No Internet connection",
		connectedToInternet: "Connected to the Internet",
		noFilesFound: "You have no files or folders here",
		noSearchResults: "Unfortunately, there are no results for this search",
		selectX: {
			0: "Select %{smart_count}",
			1: "Select %{smart_count}"
		},
		allFilesFromFolderNamed: "All files from folder %{name}",
		openFolderNamed: "Open folder %{name}",
		openFileNamed: "Open %{name}",
		itemActionsNamed: "Actions for %{name}",
		itemsSelected: {
			0: "%{smart_count} selected",
			1: "%{smart_count} selected"
		},
		selectMultiple: "Select multiple",
		cancelSelection: "Cancel selection",
		close: "Close",
		detailSize: "Size",
		detailType: "Type",
		detailModified: "Modified",
		cancel: "Cancel",
		stopOperation: "Stop",
		dialogConfirm: "OK",
		logOut: "Log out",
		logIn: "Log in",
		pickFiles: "Pick files",
		pickPhotos: "Pick photos",
		filter: "Filter",
		resetFilter: "Reset filter",
		loading: "Loading...",
		loadedXFiles: "Loaded %{numFiles} files",
		authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
		authenticateWith: "Connect to %{pluginName}",
		signInWithGoogle: "Sign in with Google",
		searchImages: "Search for images",
		enterTextToSearch: "Enter text to search for images",
		search: "Search",
		resetSearch: "Reset search",
		emptyFolderAdded: "No files were added from empty folder",
		addedNumFiles: "Added %{numFiles} file(s)",
		folderAlreadyAdded: "The folder \"%{folder}\" was already added",
		folderAdded: {
			0: "Added %{smart_count} file from %{folder}",
			1: "Added %{smart_count} files from %{folder}"
		},
		additionalRestrictionsFailed: "%{count} additional restrictions were not fulfilled",
		unnamed: "Unnamed",
		pleaseWait: "Please wait",
		s3AlreadyExists: "A file or folder with that name already exists",
		s3Conflict: "The file changed while it was being moved. Refresh the folder and try again",
		s3DestinationMustBeFile: "The destination of a file must be a file path",
		s3FileTooLargeToMove: "Files larger than 5 GB cannot be moved or renamed here",
		s3FolderMoveNotSupported: "Folders have to be moved item by item",
		s3FolderIntoItself: "A folder cannot be moved into itself",
		s3FolderNotEmpty: "The folder is not empty",
		s3InvalidGrant: "Your access to this storage could not be verified",
		s3InvalidName: "That name is not allowed",
		s3NotConfigured: "This storage is not available",
		s3NotFound: "The file or folder no longer exists",
		s3OutsideAllowedFolder: "That path is outside the folder you have access to",
		s3ReadOnlySession: "Your session is read-only",
		s3RequestFailed: "The storage request failed",
		s3SelectedInOtherSession: "This file was selected in another storage session. Reconnect and select it again",
		webdavCannotConnect: "Cannot connect to server"
	} };
})), Jr, Yr = o((() => {
	Ur(), Jr = class {
		static VERSION = Hr.version;
		state = {};
		#e = /* @__PURE__ */ new Set();
		getState() {
			return this.state;
		}
		setState(e) {
			let t = { ...this.state }, n = {
				...this.state,
				...e
			};
			this.state = n, this.#t(t, n, e);
		}
		subscribe(e) {
			return this.#e.add(e), () => {
				this.#e.delete(e);
			};
		}
		#t(...e) {
			this.#e.forEach((t) => {
				t(...e);
			});
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/supportsUploadProgress.js
function Xr(e) {
	if (e == null && typeof navigator < "u" && (e = navigator.userAgent), !e) return !0;
	let t = /Edge\/(\d+\.\d+)/.exec(e);
	if (!t) return !0;
	let n = t[1].split(".", 2), r = parseInt(n[0], 10), i = parseInt(n[1], 10);
	return r < 15 || r === 15 && i < 15063 || r > 18 || r === 18 && i >= 18218;
}
var Zr = o((() => {})), Qr, $r, ei, ti, ni = o((() => {
	Qr = /* @__PURE__ */ u(xr(), 1), $r = /* @__PURE__ */ u(Sr(), 1), Er(), Ur(), Gr(), qr(), Xn(), rr(), Yr(), Zr(), X(), ei = {
		totalProgress: 0,
		allowNewUpload: !0,
		error: null,
		recoveredState: null
	}, ti = class e {
		static VERSION = Hr.version;
		#e = Object.create(null);
		#t;
		#n;
		#r = (0, $r.default)();
		#i = /* @__PURE__ */ new Set();
		#a = /* @__PURE__ */ new Set();
		#o = /* @__PURE__ */ new Set();
		defaultLocale;
		locale;
		opts;
		store;
		i18n;
		i18nArray;
		scheduledAutoProceed = null;
		wasOffline = !1;
		constructor(t) {
			this.defaultLocale = Kr;
			let n = {
				id: "uppy",
				autoProceed: !1,
				allowMultipleUploadBatches: !0,
				debug: !1,
				restrictions: er,
				meta: {},
				onBeforeFileAdded: (e, t) => !Object.hasOwn(t, e.id),
				onBeforeUpload: (e) => e,
				store: new Jr(),
				logger: Jn,
				infoTimeout: 5e3
			}, r = {
				...n,
				...t
			};
			this.opts = {
				...r,
				restrictions: {
					...n.restrictions,
					...t?.restrictions
				}
			}, t?.logger && t.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : t?.debug && (this.opts.logger = Yn), this.log(`Using Core v${e.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
				...ei,
				plugins: {},
				files: {},
				currentUploads: {},
				capabilities: {
					uploadProgress: Xr(),
					individualCancellation: !0,
					resumableUploads: !1
				},
				meta: { ...this.opts.meta },
				info: []
			}), this.#t = new nr(() => this.opts, () => this.i18n), this.#n = this.store.subscribe((e, t, n) => {
				this.emit("state-update", e, t, n), this.updateAll(t);
			}), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), this.#b();
		}
		emit(e, ...t) {
			this.#r.emit(e, ...t);
		}
		on(e, t) {
			return this.#r.on(e, t), this;
		}
		once(e, t) {
			return this.#r.once(e, t), this;
		}
		off(e, t) {
			return this.#r.off(e, t), this;
		}
		updateAll(e) {
			this.iteratePlugins((t) => {
				t.update(e);
			});
		}
		setState(e) {
			this.store.setState(e);
		}
		getState() {
			return this.store.getState();
		}
		patchFilesState(e) {
			let t = this.getState().files;
			this.setState({ files: {
				...t,
				...Object.fromEntries(Object.entries(e).map(([e, n]) => [e, {
					...t[e],
					...n
				}]))
			} });
		}
		setFileState(e, t) {
			if (!this.getState().files[e]) throw Error(`Can’t set state for ${e} (the file could have been removed)`);
			this.patchFilesState({ [e]: t });
		}
		i18nInit() {
			let e = new ft([this.defaultLocale, this.opts.locale], { onMissingKey: (e) => this.log(`Missing i18n string: ${e}`, "error") });
			this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.locale = e.locale;
		}
		setOptions(e) {
			this.opts = {
				...this.opts,
				...e,
				restrictions: {
					...this.opts.restrictions,
					...e?.restrictions
				}
			}, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((t) => {
				t.setOptions(e);
			}), this.setState(void 0);
		}
		resetProgress() {
			let e = {
				percentage: 0,
				bytesUploaded: !1,
				uploadComplete: !1,
				uploadStarted: null
			}, t = { ...this.getState().files }, n = Object.create(null);
			Object.keys(t).forEach((r) => {
				n[r] = {
					...t[r],
					progress: {
						...t[r].progress,
						...e
					},
					tus: void 0,
					transloadit: void 0,
					s3Multipart: void 0
				};
			}), this.setState({
				files: n,
				...ei
			});
		}
		clear() {
			let { capabilities: e, currentUploads: t } = this.getState();
			if (Object.keys(t).length > 0 && !e.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
			this.setState({
				...ei,
				files: {}
			});
		}
		addPreProcessor(e) {
			this.#i.add(e);
		}
		removePreProcessor(e) {
			return this.#i.delete(e);
		}
		addPostProcessor(e) {
			this.#o.add(e);
		}
		removePostProcessor(e) {
			return this.#o.delete(e);
		}
		addUploader(e) {
			this.#a.add(e);
		}
		removeUploader(e) {
			return this.#a.delete(e);
		}
		setMeta(e) {
			let t = {
				...this.getState().meta,
				...e
			}, n = { ...this.getState().files };
			Object.keys(n).forEach((t) => {
				n[t] = {
					...n[t],
					meta: {
						...n[t].meta,
						...e
					}
				};
			}), this.log("Adding metadata:"), this.log(e), this.setState({
				meta: t,
				files: n
			});
		}
		setFileMeta(e, t) {
			let n = { ...this.getState().files };
			if (!n[e]) {
				this.log(`Was trying to set metadata for a file that has been removed: ${e}`);
				return;
			}
			let r = {
				...n[e].meta,
				...t
			};
			n[e] = {
				...n[e],
				meta: r
			}, this.setState({ files: n });
		}
		getFile(e) {
			return this.getState().files[e];
		}
		getFiles() {
			let { files: e } = this.getState();
			return Object.values(e);
		}
		getFilesByIds(e) {
			return e.map((e) => this.getFile(e));
		}
		getObjectOfFilesPerState() {
			let { files: e, totalProgress: t, error: n } = this.getState(), r = Object.values(e), i = [], a = [], o = [], s = [], c = [], l = [], u = [], d = [], f = [];
			for (let e of r) {
				let { progress: t } = e;
				!t.uploadComplete && t.uploadStarted && (i.push(e), e.isPaused || d.push(e)), t.uploadStarted || a.push(e), (t.uploadStarted || t.preprocess || t.postprocess) && o.push(e), t.uploadStarted && s.push(e), e.isPaused && c.push(e), t.uploadComplete && l.push(e), e.error && u.push(e), (t.preprocess || t.postprocess) && f.push(e);
			}
			return {
				newFiles: a,
				startedFiles: o,
				uploadStartedFiles: s,
				pausedFiles: c,
				completeFiles: l,
				erroredFiles: u,
				inProgressFiles: i,
				inProgressNotPausedFiles: d,
				processingFiles: f,
				isUploadStarted: s.length > 0,
				isAllComplete: t === 100 && l.length === r.length && f.length === 0,
				isAllErrored: !!n && u.length === r.length,
				isAllPaused: i.length !== 0 && c.length === i.length,
				isUploadInProgress: i.length > 0,
				isSomeGhost: r.some((e) => e.isGhost)
			};
		}
		#s(e) {
			for (let t of e) t.isRestriction ? this.emit("restriction-failed", t.file, t) : this.emit("error", t, t.file), this.log(t, "warning");
			let t = e.filter((e) => e.isUserFacing), n = t.slice(0, 4), r = t.slice(4);
			n.forEach(({ message: e, details: t = "" }) => {
				this.info({
					message: e,
					details: t
				}, "error", this.opts.infoTimeout);
			}), r.length > 0 && this.info({ message: this.i18n("additionalRestrictionsFailed", { count: r.length }) });
		}
		validateRestrictions(e, t = this.getFiles()) {
			try {
				this.#t.validate(t, [e]);
			} catch (e) {
				return e;
			}
			return null;
		}
		validateSingleFile(e) {
			try {
				this.#t.validateSingleFile(e);
			} catch (e) {
				return Me(e);
			}
			return null;
		}
		validateAggregateRestrictions(e) {
			let t = this.getFiles();
			try {
				this.#t.validateAggregateRestrictions(t, e);
			} catch (e) {
				return Me(e);
			}
			return null;
		}
		#c(e) {
			let { missingFields: t, error: n } = this.#t.getMissingRequiredMetaFields(e);
			return t.length > 0 ? (this.setFileState(e.id, {
				missingRequiredMetaFields: t,
				error: n.message
			}), this.log(n.message), this.emit("restriction-failed", e, n), !1) : (t.length === 0 && e.missingRequiredMetaFields && this.setFileState(e.id, { missingRequiredMetaFields: [] }), !0);
		}
		#l(e) {
			let t = !0;
			for (let n of Object.values(e)) this.#c(n) || (t = !1);
			return t;
		}
		#u(e) {
			let { allowNewUpload: t } = this.getState();
			if (t === !1) {
				let t = new tr(this.i18n("noMoreFilesAllowed"), { file: e });
				throw this.#s([t]), t;
			}
		}
		checkIfFileAlreadyExists(e) {
			let { files: t } = this.getState();
			return !(!t[e] || t[e].isGhost);
		}
		#d(e) {
			let t = e instanceof File ? {
				name: e.name,
				type: e.type,
				size: e.size,
				data: e,
				meta: {},
				isRemote: !1,
				source: void 0,
				preview: void 0
			} : e, n = ue(t), r = Wr(n, t), i = se(r).extension, a = ge(t, this.getID()), o = {
				...t.meta,
				name: r,
				type: n
			}, s = Number.isFinite(t.data.size) ? t.data.size : null;
			return {
				source: t.source || "",
				id: a,
				name: r,
				extension: i || "",
				meta: {
					...this.getState().meta,
					...o
				},
				type: n,
				progress: {
					percentage: 0,
					bytesUploaded: !1,
					bytesTotal: s,
					uploadComplete: !1,
					uploadStarted: null
				},
				size: s,
				isGhost: !1,
				...t.isRemote ? {
					isRemote: !0,
					remote: t.remote,
					data: t.data
				} : {
					isRemote: !1,
					data: t.data
				},
				preview: t.preview
			};
		}
		#f() {
			this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
				this.scheduledAutoProceed = null, this.upload().catch((e) => {
					Ze(e) || this.log(e.stack || e.message || e);
				});
			}, 4));
		}
		#p(e) {
			let { files: t } = this.getState(), n = { ...t }, r = [], i = [];
			for (let a of e) try {
				let e = this.#d(a);
				this.#u(e);
				let i = t[e.id], o = i?.isGhost;
				if (o && !e.isRemote) {
					if (e.data == null) throw Error("File data is missing");
					e = {
						...i,
						isGhost: !1,
						data: e.data
					}, this.log(`Replaced the blob in the restored ghost file: ${e.name}, ${e.id}`);
				}
				let s = this.opts.onBeforeFileAdded(e, n);
				if (t = this.getState().files, n = {
					...t,
					...n
				}, !s && this.checkIfFileAlreadyExists(e.id)) throw new tr(this.i18n("noDuplicates", { fileName: e.name ?? this.i18n("unnamed") }), { file: e });
				if (s === !1 && !o) throw new tr("Cannot add the file because onBeforeFileAdded returned false.", {
					isUserFacing: !1,
					file: e
				});
				typeof s == "object" && s && (e = s), this.#t.validateSingleFile(e), n[e.id] = e, r.push(e);
			} catch (e) {
				i.push(e);
			}
			try {
				this.#t.validateAggregateRestrictions(Object.values(t), r);
			} catch (e) {
				return i.push(e), {
					nextFilesState: t,
					validFilesToAdd: [],
					errors: i
				};
			}
			return {
				nextFilesState: n,
				validFilesToAdd: r,
				errors: i
			};
		}
		addFile(e) {
			let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p([e]), i = r.filter((e) => e.isRestriction);
			if (this.#s(i), r.length > 0) throw r[0];
			this.setState({ files: t });
			let [a] = n;
			return this.emit("file-added", a), this.emit("files-added", n), this.log(`Added file: ${a.name}, ${a.id}, mime type: ${a.type}`), this.#f(), a.id;
		}
		addFiles(e) {
			let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p(e), i = r.filter((e) => e.isRestriction);
			this.#s(i);
			let a = r.filter((e) => !e.isRestriction);
			if (a.length > 0) {
				let e = "Multiple errors occurred while adding files:\n";
				if (a.forEach((t) => {
					e += `\n * ${t.message}`;
				}), this.info({
					message: this.i18n("addBulkFilesFailed", { smart_count: a.length }),
					details: e
				}, "error", this.opts.infoTimeout), typeof AggregateError == "function") throw AggregateError(a, e);
				{
					let t = Error(e);
					throw t.errors = a, t;
				}
			}
			this.setState({ files: t }), n.forEach((e) => {
				this.emit("file-added", e);
			}), this.emit("files-added", n), n.length > 5 ? this.log(`Added batch of ${n.length} files`) : Object.values(n).forEach((e) => {
				this.log(`Added file: ${e.name}\n id: ${e.id}\n type: ${e.type}`);
			}), n.length > 0 && this.#f();
		}
		removeFiles(e) {
			let { files: t, currentUploads: n } = this.getState(), r = { ...t }, i = { ...n }, a = Object.create(null);
			e.forEach((e) => {
				t[e] && (a[e] = t[e], delete r[e]);
			});
			function o(e) {
				return a[e] === void 0;
			}
			Object.keys(i).forEach((e) => {
				let t = n[e].fileIDs.filter(o);
				if (t.length === 0) {
					delete i[e];
					return;
				}
				let { capabilities: r } = this.getState();
				if (t.length !== n[e].fileIDs.length && !r.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
				i[e] = {
					...n[e],
					fileIDs: t
				};
			});
			let s = {
				currentUploads: i,
				files: r
			};
			Object.keys(r).length === 0 && (s.allowNewUpload = !0, s.error = null, s.recoveredState = null), this.setState(s), this.#v();
			let c = Object.keys(a);
			c.forEach((e) => {
				this.emit("file-removed", a[e]);
			}), c.length > 5 ? this.log(`Removed ${c.length} files`) : this.log(`Removed files: ${c.join(", ")}`);
		}
		removeFile(e) {
			this.removeFiles([e]);
		}
		pauseResume(e) {
			if (!this.getState().capabilities.resumableUploads || this.getFile(e).progress.uploadComplete) return;
			let t = this.getFile(e), n = !t.isPaused;
			return this.setFileState(e, { isPaused: n }), this.emit("upload-pause", t, n), n;
		}
		pauseAll() {
			let e = { ...this.getState().files };
			Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
				let n = {
					...e[t],
					isPaused: !0
				};
				e[t] = n;
			}), this.setState({ files: e }), this.emit("pause-all");
		}
		resumeAll() {
			let e = { ...this.getState().files };
			Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
				let n = {
					...e[t],
					isPaused: !1,
					error: null
				};
				e[t] = n;
			}), this.setState({ files: e }), this.emit("resume-all");
		}
		#m() {
			let { files: e } = this.getState();
			return Object.keys(e).filter((t) => {
				let n = e[t];
				return n.error && (!n.missingRequiredMetaFields || n.missingRequiredMetaFields.length === 0);
			});
		}
		async #h() {
			let e = this.#m(), t = { ...this.getState().files };
			if (e.forEach((e) => {
				t[e] = {
					...t[e],
					isPaused: !1,
					error: null
				};
			}), this.setState({
				files: t,
				error: null
			}), this.emit("retry-all", this.getFilesByIds(e)), e.length === 0) return {
				successful: [],
				failed: []
			};
			let n = this.#C(e, { forceAllowNewUpload: !0 });
			return this.#E(n);
		}
		async retryAll() {
			let e = await this.#h();
			return this.emit("complete", e), e;
		}
		cancelAll() {
			this.emit("cancel-all");
			let { files: e } = this.getState(), t = Object.keys(e);
			t.length && this.removeFiles(t), this.setState(ei);
		}
		retryUpload(e) {
			this.setFileState(e, {
				error: null,
				isPaused: !1
			}), this.emit("upload-retry", this.getFile(e));
			let t = this.#C([e], { forceAllowNewUpload: !0 });
			return this.#E(t);
		}
		logout() {
			this.iteratePlugins((e) => {
				e.provider?.logout?.();
			});
		}
		#g = (e, t) => {
			let n = e ? this.getFile(e.id) : void 0;
			if (e == null || !n) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			if (n.progress.percentage === 100) {
				this.log(`Not setting progress for a file that has been already uploaded: ${e.id}`);
				return;
			}
			let r = {
				bytesTotal: t.bytesTotal,
				percentage: t.bytesTotal != null && Number.isFinite(t.bytesTotal) && t.bytesTotal > 0 ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : void 0
			};
			n.progress.uploadStarted == null ? this.setFileState(e.id, { progress: {
				...n.progress,
				...r
			} }) : this.setFileState(e.id, { progress: {
				...n.progress,
				...r,
				bytesUploaded: t.bytesUploaded
			} }), this.#v();
		};
		#_() {
			let e = this.#y(), t = null;
			e != null && (t = Math.round(e * 100), t > 100 ? t = 100 : t < 0 && (t = 0)), this.emit("progress", t ?? 0), this.setState({ totalProgress: t ?? 0 });
		}
		#v = (0, Qr.default)(() => this.#_(), 500, {
			leading: !0,
			trailing: !0
		});
		[Symbol.for("uppy test: updateTotalProgress")]() {
			return this.#_();
		}
		#y() {
			let e = this.getFiles().filter((e) => e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess);
			if (e.length === 0) return 0;
			if (e.every((e) => e.progress.uploadComplete)) return 1;
			let t = (e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0, n = e.filter(t), r = e.filter((e) => !t(e));
			if (n.every((e) => e.progress.uploadComplete) && r.length > 0 && !r.every((e) => e.progress.uploadComplete)) return null;
			let i = n.reduce((e, t) => e + (t.progress.bytesTotal ?? 0), 0), a = n.reduce((e, t) => e + (t.progress.bytesUploaded || 0), 0);
			return i === 0 ? 0 : a / i;
		}
		#b() {
			let e = (e, t, n) => {
				let r = e.message || "Unknown error";
				e.details && (r += ` ${e.details}`), this.setState({ error: r }), t != null && t.id in this.getState().files && this.setFileState(t.id, {
					error: r,
					response: n
				});
			};
			this.on("error", e), this.on("upload-error", (t, n, r) => {
				if (e(n, t, r), typeof n == "object" && n.message) {
					this.log(n.message, "error");
					let e = Error(this.i18n("failedToUpload", { file: t?.name ?? "" }));
					e.isUserFacing = !0, e.details = n.message, n.details && (e.details += ` ${n.details}`), this.#s([e]);
				} else this.#s([n]);
			});
			let t = null;
			this.on("upload-stalled", (e, n) => {
				let { message: r } = e, i = n.map((e) => e.meta.name).join(", ");
				t ||= (this.info({
					message: r,
					details: i
				}, "warning", this.opts.infoTimeout), setTimeout(() => {
					t = null;
				}, this.opts.infoTimeout)), this.log(`${r} ${i}`.trim(), "warning");
			}), this.on("upload", () => {
				this.setState({ error: null });
			}), this.on("upload-start", (e) => {
				let t = e.filter((e) => {
					let t = e != null && this.getFile(e.id);
					return t || this.log(`Not setting progress for a file that has been removed: ${e?.id}`), t;
				}), n = Object.fromEntries(t.map((e) => [e.id, { progress: {
					uploadStarted: Date.now(),
					uploadComplete: !1,
					bytesUploaded: 0,
					bytesTotal: e.size
				} }]));
				this.patchFilesState(n);
			}), this.on("upload-progress", this.#g), this.on("upload-success", (e, t) => {
				if (e == null || !this.getFile(e.id)) {
					this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
					return;
				}
				let n = this.getFile(e.id).progress, r = this.#o.size > 0;
				this.setFileState(e.id, {
					progress: {
						...n,
						postprocess: r ? { mode: "indeterminate" } : void 0,
						uploadComplete: !0,
						...!r && { complete: !0 },
						percentage: 100,
						bytesUploaded: n.bytesTotal
					},
					response: t,
					uploadURL: t.uploadURL,
					isPaused: !1
				}), e.size ?? this.setFileState(e.id, { size: t.bytesUploaded || n.bytesTotal }), this.#v();
			}), this.on("preprocess-progress", (e, t) => {
				if (e == null || !this.getFile(e.id)) {
					this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
					return;
				}
				this.setFileState(e.id, { progress: {
					...this.getFile(e.id).progress,
					preprocess: t
				} });
			}), this.on("preprocess-complete", (e) => {
				if (e == null || !this.getFile(e.id)) {
					this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
					return;
				}
				let t = { ...this.getState().files };
				t[e.id] = {
					...t[e.id],
					progress: { ...t[e.id].progress }
				}, delete t[e.id].progress.preprocess, this.setState({ files: t });
			}), this.on("postprocess-progress", (e, t) => {
				if (e == null || !this.getFile(e.id)) {
					this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
					return;
				}
				this.setFileState(e.id, { progress: {
					...this.getState().files[e.id].progress,
					postprocess: t
				} });
			}), this.on("postprocess-complete", (e) => {
				let t = e && this.getFile(e.id);
				if (t == null) {
					this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
					return;
				}
				let { postprocess: n, ...r } = t.progress;
				this.patchFilesState({ [t.id]: { progress: {
					...r,
					complete: !0
				} } });
			}), this.on("restored", () => {
				this.#v();
			}), this.on("dashboard:file-edit-complete", (e) => {
				e && this.#c(e);
			}), typeof window < "u" && window.addEventListener && (window.addEventListener("online", this.#x), window.addEventListener("offline", this.#x), setTimeout(this.#x, 3e3));
		}
		updateOnlineStatus() {
			window.navigator.onLine ?? !0 ? (this.emit("is-online"), this.wasOffline &&= (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
		}
		#x = this.updateOnlineStatus.bind(this);
		getID() {
			return this.opts.id;
		}
		use(e, ...t) {
			if (typeof e != "function") throw TypeError(`Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`);
			let n = new e(this, ...t), r = n.id;
			if (!r) throw Error("Your plugin must have an id");
			if (!n.type) throw Error("Your plugin must have a type");
			let i = this.getPlugin(r);
			if (i) {
				let e = `Already found a plugin named '${i.id}'. Tried to use: '${r}'.\nUppy plugins must have unique \`id\` options.`;
				throw Error(e);
			}
			return e.VERSION && this.log(`Using ${r} v${e.VERSION}`), n.type in this.#e ? this.#e[n.type].push(n) : this.#e[n.type] = [n], n.install(), this.emit("plugin-added", n), this;
		}
		getPlugin(e) {
			for (let t of Object.values(this.#e)) {
				let n = t.find((t) => t.id === e);
				if (n != null) return n;
			}
		}
		[Symbol.for("uppy test: getPlugins")](e) {
			return this.#e[e];
		}
		iteratePlugins(e) {
			Object.values(this.#e).flat(1).forEach(e);
		}
		removePlugin(e) {
			this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
			let t = this.#e[e.type], n = t.findIndex((t) => t.id === e.id);
			n !== -1 && t.splice(n, 1);
			let r = { plugins: {
				...this.getState().plugins,
				[e.id]: void 0
			} };
			this.setState(r);
		}
		destroy() {
			this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll(), this.#n(), this.iteratePlugins((e) => {
				this.removePlugin(e);
			}), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", this.#x), window.removeEventListener("offline", this.#x));
		}
		hideInfo() {
			let { info: e } = this.getState();
			this.setState({ info: e.slice(1) }), this.emit("info-hidden");
		}
		info(e, t = "info", n = 3e3) {
			let r = typeof e == "object";
			this.setState({ info: [...this.getState().info, {
				type: t,
				message: r ? e.message : e,
				details: r ? e.details : null
			}] }), setTimeout(() => this.hideInfo(), n), this.emit("info-visible");
		}
		log(e, t) {
			let { logger: n } = this.opts;
			switch (t) {
				case "error":
					n.error(e);
					break;
				case "warning":
					n.warn(e);
					break;
				default: n.debug(e);
			}
		}
		#S = /* @__PURE__ */ new Map();
		registerRequestClient(e, t) {
			this.#S.set(e, t);
		}
		getRequestClientForFile(e) {
			if (!("remote" in e && e.remote)) throw Error(`Tried to get RequestClient for a non-remote file ${e.id}`);
			let t = this.#S.get(e.remote.requestClientId);
			if (t == null) throw Error(`requestClientId "${e.remote.requestClientId}" not registered for file "${e.id}"`);
			return t;
		}
		async restore(e) {
			this.log(`Core: Running restored upload "${e}"`);
			let t = await this.#E(e);
			return this.emit("complete", t), t;
		}
		#C(e, t = {}) {
			let { forceAllowNewUpload: n = !1 } = t, { allowNewUpload: r, currentUploads: i } = this.getState();
			if (!r && !n) throw Error("Cannot create a new upload: already uploading.");
			let a = Tr();
			return this.emit("upload", a, this.getFilesByIds(e)), this.setState({
				allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
				currentUploads: {
					...i,
					[a]: {
						fileIDs: e,
						step: 0,
						result: {}
					}
				}
			}), a;
		}
		[Symbol.for("uppy test: createUpload")](...e) {
			return this.#C(...e);
		}
		#w(e) {
			let { currentUploads: t } = this.getState();
			return t[e];
		}
		addResultData(e, t) {
			if (!this.#w(e)) {
				this.log(`Not setting result for an upload that has been removed: ${e}`);
				return;
			}
			let { currentUploads: n } = this.getState(), r = {
				...n[e],
				result: {
					...n[e].result,
					...t
				}
			};
			this.setState({ currentUploads: {
				...n,
				[e]: r
			} });
		}
		#T(e) {
			let { [e]: t, ...n } = this.getState().currentUploads;
			this.setState({ currentUploads: n });
		}
		async #E(e) {
			let t = () => {
				let { currentUploads: t } = this.getState();
				return t[e];
			}, n = t();
			if (!n) throw Error("Nonexistent upload");
			let r = [
				...this.#i,
				...this.#a,
				...this.#o
			];
			try {
				for (let i = n.step || 0; i < r.length; i++) {
					let a = r[i];
					this.setState({ currentUploads: {
						...this.getState().currentUploads,
						[e]: {
							...n,
							step: i
						}
					} });
					let { fileIDs: o } = n;
					if (await a(o, e), n = t(), !n) break;
				}
			} catch (t) {
				throw this.#T(e), t;
			}
			if (n) {
				n.fileIDs.forEach((e) => {
					let t = this.getFile(e);
					t?.progress.postprocess && this.emit("postprocess-complete", t);
				});
				let r = n.fileIDs.map((e) => this.getFile(e)), i = r.filter((e) => !e.error), a = r.filter((e) => e.error);
				this.addResultData(e, {
					successful: i,
					failed: a,
					uploadID: e
				}), n = t();
			}
			let i;
			return n && (i = n.result, this.#T(e)), i ??= (this.log(`Not setting result for an upload that has been removed: ${e}`), {
				successful: [],
				failed: [],
				uploadID: e
			}), i;
		}
		async upload() {
			this.#e.uploader?.length || this.log("No uploader type plugins are used", "warning");
			let { files: e } = this.getState();
			if (this.#m().length > 0) {
				let t = await this.#h();
				if (!(this.getFiles().filter((e) => e.progress.uploadStarted == null).length > 0)) return this.emit("complete", t), t;
				({files: e} = this.getState());
			}
			let t = this.opts.onBeforeUpload(e);
			if (t === !1) throw Error("Not starting the upload because onBeforeUpload returned false");
			t && typeof t == "object" && (e = t, this.setState({ files: e }));
			try {
				if (this.#t.validateMinNumberOfFiles(e), !this.#l(e)) throw new tr(this.i18n("missingRequiredMetaField"));
				let { currentUploads: t } = this.getState(), n = Object.values(t).flatMap((e) => e.fileIDs), r = Object.keys(e).filter((e) => {
					let t = this.getFile(e);
					return t && !t.progress.uploadStarted && !n.includes(e);
				}), i = this.#C(r), a = await this.#E(i);
				return this.emit("complete", a), a;
			} catch (e) {
				throw this.#s([O(e)]), e;
			}
		}
	};
})), Z = o((() => {
	Gn(), qn(), Xn(), rr(), or(), ni(), vt();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/useSearchForm.js
function ri(e) {
	let t = yn((t) => {
		t.preventDefault(), e();
	}, [e]), [n] = mn(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = Tr(), e;
	});
	return gn(() => (document.body.appendChild(n), n.addEventListener("submit", t), () => {
		n.removeEventListener("submit", t), n.remove();
	}), [n, t]), { formId: n.id };
}
var ii = o((() => {
	Er(), zn();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FilterInput.js
function ai({ value: e, onChange: t, onSubmit: n, inputLabel: r, i18n: i, disabled: a = !1 }) {
	let { formId: o } = ri(n);
	return G("section", {
		className: "uppy-ProviderBrowser-searchFilter",
		children: [
			G("input", {
				className: "uppy-u-reset uppy-ProviderBrowser-searchFilterInput",
				type: "search",
				"aria-label": r,
				placeholder: r,
				value: e,
				onInput: (e) => t(e.target.value),
				form: o,
				disabled: a,
				"data-uppy-super-focusable": !0
			}),
			G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				className: "uppy-c-icon uppy-ProviderBrowser-searchFilterIcon",
				width: "12",
				height: "12",
				viewBox: "0 0 12 12",
				children: G("path", { d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z" })
			}),
			e && G("button", {
				className: "uppy-u-reset uppy-ProviderBrowser-searchFilterReset",
				type: "button",
				"aria-label": i("resetFilter"),
				disabled: a,
				onClick: () => t(""),
				children: G("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					viewBox: "0 0 19 19",
					children: G("path", { d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z" })
				})
			})
		]
	});
}
var oi = o((() => {
	K(), ii();
}));
//#endregion
//#region node_modules/preact/compat/dist/compat.module.js
function si(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function ci(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function li(e, t) {
	var n = t(), r = mn({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return _n(function() {
		i.__ = n, i.u = t, ui(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), gn(function() {
		return ui(i) && a({ t: i }), e(function() {
			ui(i) && a({ t: i });
		});
	}, [e]), n;
}
function ui(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function di(e, t) {
	this.props = e, this.context = t;
}
function fi(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = si({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return fi(e, t, n);
	})), e;
}
function pi(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return pi(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function mi() {
	this.__u = 0, this.o = null, this.__b = null;
}
function hi(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function gi() {
	this.i = null, this.l = null;
}
var _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi = o((() => {
	dn(), zn(), zn(), (di.prototype = new U()).isPureReactComponent = !0, di.prototype.shouldComponentUpdate = function(e, t) {
		return ci(this.props, e) || ci(this.state, t);
	}, _i = W.__b, W.__b = function(e) {
		e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), _i && _i(e);
	}, typeof Symbol < "u" && Symbol.for, vi = W.__e, W.__e = function(e, t, n, r) {
		if (e.then) {
			for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
		}
		vi(e, t, n, r);
	}, yi = W.unmount, W.unmount = function(e) {
		var t = e.__c;
		t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), yi && yi(e);
	}, (mi.prototype = new U()).__c = function(e, t) {
		var n = t.__c, r = this;
		r.o ??= [], r.o.push(n);
		var i = hi(r.__v), a = !1, o = function() {
			a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
		};
		n.__R = o;
		var s = n.__P;
		n.__P = null;
		var c = function() {
			if (!--r.__u) {
				if (r.state.__a) {
					var e = r.state.__a;
					r.__v.__k[0] = pi(e, e.__c.__P, e.__c.__O);
				}
				var t;
				for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
			}
		};
		r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
	}, mi.prototype.componentWillUnmount = function() {
		this.o = [];
	}, mi.prototype.render = function(e, t) {
		if (this.__b) {
			if (this.__v.__k) {
				var n = document.createElement("div"), r = this.__v.__k[0].__c;
				this.__v.__k[0] = fi(this.__b, n, r.__O = r.__P);
			}
			this.__b = null;
		}
		var i = t.__a && xt(H, null, e.fallback);
		return i && (i.__u &= -33), [xt(H, null, t.__a ? null : e.children), i];
	}, bi = function(e, t, n) {
		if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
			for (; n.length > 3;) n.pop()();
			if (n[1] < n[0]) break;
			e.i = n = n[2];
		}
	}, (gi.prototype = new U()).__a = function(e) {
		var t = this, n = hi(t.__v), r = t.l.get(e);
		return r[0]++, function(i) {
			var a = function() {
				t.props.revealOrder ? (r.push(i), bi(t, e, r)) : i();
			};
			n ? n(a) : a();
		};
	}, gi.prototype.render = function(e) {
		this.i = null, this.l = /* @__PURE__ */ new Map();
		var t = Mt(e.children);
		e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
		for (var n = t.length; n--;) this.l.set(t[n], this.i = [
			1,
			0,
			this.i
		]);
		return e.children;
	}, gi.prototype.componentDidUpdate = gi.prototype.componentDidMount = function() {
		var e = this;
		this.l.forEach(function(t, n) {
			bi(e, n, t);
		});
	}, xi = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Si = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ci = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, wi = /[A-Z0-9]/g, Ti = typeof document < "u", Ei = function(e) {
		return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
	}, U.prototype.isReactComponent = !0, [
		"componentWillMount",
		"componentWillReceiveProps",
		"componentWillUpdate"
	].forEach(function(e) {
		Object.defineProperty(U.prototype, e, {
			configurable: !0,
			get: function() {
				return this["UNSAFE_" + e];
			},
			set: function(t) {
				Object.defineProperty(this, e, {
					configurable: !0,
					writable: !0,
					value: t
				});
			}
		});
	}), Di = W.event, W.event = function(e) {
		return Di && (e = Di(e)), e.persist = function() {}, e.isPropagationStopped = function() {
			return this.cancelBubble;
		}, e.isDefaultPrevented = function() {
			return this.defaultPrevented;
		}, e.nativeEvent = e;
	}, Oi = {
		configurable: !0,
		get: function() {
			return this.class;
		}
	}, ki = W.vnode, W.vnode = function(e) {
		typeof e.type == "string" && function(e) {
			var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
			for (var a in t) {
				var o = t[a];
				if (!(a === "value" && "defaultValue" in t && o == null || Ti && a === "children" && n === "noscript" || a === "class" || a === "className")) {
					var s = a.toLowerCase();
					a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Ei(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : Ci.test(a) && (a = s) : s = a = "oninput" : i && Si.test(a) ? a = a.replace(wi, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
				}
			}
			n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Mt(t.children).forEach(function(e) {
				e.props.selected = r.value.indexOf(e.props.value) != -1;
			})), r.defaultValue != null && (r.value = Mt(t.children).forEach(function(e) {
				e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
			}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Oi)) : t.className && (r.class = r.className = t.className), e.props = r;
		}(e), e.$$typeof = xi, ki && ki(e);
	}, Ai = W.__r, W.__r = function(e) {
		Ai && Ai(e), e.__c;
	}, ji = W.diffed, W.diffed = function(e) {
		ji && ji(e);
		var t = e.props, n = e.__e;
		n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/AuthError.js
function Ni(e) {
	return e instanceof Error && "isAuthError" in e && e.isAuthError === !0;
}
var Pi, Fi = o((() => {
	Pi = class extends Error {
		isAuthError;
		constructor() {
			super("Authorization required"), this.name = "AuthError", this.isAuthError = !0;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/getAllowedHosts.js
function Ii(e) {
	return e.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
function Li(e) {
	if (typeof e == "string") return new RegExp(e);
	if (e instanceof RegExp) return e;
}
function Ri(e, t) {
	if (e) {
		let t = (e) => {
			if (!(typeof e == "string" && Li(e)) && !(e instanceof RegExp)) throw TypeError("The option \"companionAllowedHosts\" must be one of string, Array, RegExp");
		};
		return Array.isArray(e) ? e.every(t) : t(e), e;
	}
	let n = t;
	return /^(?!https?:\/\/).*$/i.test(n) && (n = `https://${t.replace(/^\/\//, "")}`), n = new URL(n).origin, n = Ii(n), n;
}
var zi = o((() => {}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/googlePicker.js
async function Bi(e) {
	$i.has(e) || (await new Promise((t, n) => {
		let r = document.createElement("script");
		r.src = e, r.addEventListener("load", () => t()), r.addEventListener("error", (e) => n(e.error)), document.head.appendChild(r);
	}), $i.add(e));
}
async function Vi(e) {
	await Promise.all([Bi("https://accounts.google.com/gsi/client"), (async () => {
		await Bi("https://apis.google.com/js/api.js"), e === "drive" && !ea && (await new Promise((e) => gapi.load("client:picker", () => e())), await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"), ea = !0);
	})()]);
}
async function Hi(e, t) {
	return !!(await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${encodeURIComponent(e)}`, { signal: t })).ok;
}
async function Ui({ pickerType: e, clientId: t, accessToken: n }) {
	let r = await new Promise((r, i) => {
		let a = e === "drive" ? ["https://www.googleapis.com/auth/drive.file"] : ["https://www.googleapis.com/auth/photospicker.mediaitems.readonly"], o = google.accounts.oauth2.initTokenClient({
			client_id: t,
			scope: a.join(" "),
			callback: r,
			error_callback: i
		});
		n === null ? o.requestAccessToken({ prompt: "consent" }) : o.requestAccessToken({ prompt: "" });
	});
	if (r.error) throw Error(`OAuth2 error: ${r.error}`);
	return r.access_token;
}
async function Wi(e) {
	await new Promise((t) => google.accounts.oauth2.revoke(e, t));
}
async function Gi({ doc: e, token: t, signal: n }) {
	if (e.mimeType === "application/vnd.google-apps.shortcut") return e.shortcutDetails?.targetMimeType === "application/vnd.google-apps.folder" ? [] : [{
		platform: "drive",
		id: e.id,
		name: e.name,
		mimeType: e.mimeType
	}];
	if (e.mimeType !== "application/vnd.google-apps.folder") return [{
		platform: "drive",
		id: e.id,
		name: e.name,
		mimeType: e.mimeType
	}];
	let r = Qi(t), i = [], a;
	do {
		let o = new URLSearchParams({
			q: `'${e.id.replace(/'/g, "\\'")}' in parents and trashed = false`,
			fields: "nextPageToken, files(id, name, mimeType, shortcutDetails(targetMimeType))",
			includeItemsFromAllDrives: "true",
			supportsAllDrives: "true",
			pageSize: "1000",
			...a && { pageToken: a }
		}), s = await fetch(`https://www.googleapis.com/drive/v3/files?${o.toString()}`, {
			headers: r,
			signal: n
		});
		if (!s.ok) throw Error(`Failed to list folder contents for '${e.name}' (${e.id}): ${s.status} ${s.statusText}`);
		let c = await s.json();
		a = c.nextPageToken;
		for (let e of c.files) i.push(...await Gi({
			doc: e,
			token: t,
			signal: n
		}));
	} while (a);
	return i;
}
async function Ki({ token: e, apiKey: t, appId: n, onFilesPicked: r, signal: i, onLoadingChange: a, onError: o }) {
	if (!await Hi(e, i)) throw new ta();
	let s = new google.picker.PickerBuilder().enableFeature(google.picker.Feature.NAV_HIDDEN).enableFeature(google.picker.Feature.MULTISELECT_ENABLED).setDeveloperKey(t).setAppId(n).setOAuthToken(e).addView(new google.picker.DocsView(google.picker.ViewId.DOCS).setIncludeFolders(!0).setSelectFolderEnabled(!0).setMode(google.picker.DocsViewMode.LIST)).setCallback(async (t) => {
		if (t.action === google.picker.Action.PICKED) try {
			a(!0);
			let n = [];
			for (let r of t.docs ?? []) n.push(...await Gi({
				doc: r,
				token: e,
				signal: i
			}));
			r(n, e);
		} catch (e) {
			o(e);
		} finally {
			a(!1);
		}
	}).build();
	s.setVisible(!0), i?.addEventListener("abort", () => s.dispose());
}
async function qi({ token: e, pickingSession: t, onPickingSessionChange: n, signal: r }) {
	let i = Qi(e), a = t;
	if (a == null) {
		let e = await fetch("https://photospicker.googleapis.com/v1/sessions", {
			method: "post",
			headers: i,
			signal: r
		});
		if (e.status === 401 && (await e.json()).error?.status === "UNAUTHENTICATED") throw new ta();
		if (!e.ok) throw Error("Failed to create a session");
		a = await e.json(), n(a);
	}
	let o = window.open(a.pickerUri);
	r?.addEventListener("abort", () => o?.close());
}
async function Ji({ accessToken: e, pickingSession: t, signal: n }) {
	let r = Qi(e), i, a = [];
	do {
		let e = await fetch(`https://photospicker.googleapis.com/v1/mediaItems?${new URLSearchParams({
			sessionId: t.id,
			pageSize: "100",
			...i && { pageToken: i }
		}).toString()}`, {
			headers: r,
			signal: n
		});
		if (!e.ok) throw Error("Failed to get a media items");
		let { mediaItems: o, nextPageToken: s } = await e.json();
		i = s, a.push(...o);
	} while (i);
	return a = a.flatMap((e) => e.type === "PHOTO" || e.type === "VIDEO" && e.mediaFile.mediaFileMetadata.videoMetadata.processingStatus === "READY" ? [e] : []), a.map((e) => {
		let { id: t, type: n, mediaFile: { mimeType: r, filename: i, baseUrl: a } } = e;
		return {
			platform: "photos",
			id: t,
			mimeType: r,
			url: n === "VIDEO" ? `${a}=dv` : `${a}=d`,
			name: i,
			metadata: {
				googlePhotosFileType: e.type,
				createTime: e.createTime,
				width: e.mediaFile.mediaFileMetadata.width,
				height: e.mediaFile.mediaFileMetadata.height,
				...e.type === "PHOTO" && {
					cameraMake: e.mediaFile.mediaFileMetadata.photoMetadata?.cameraMake,
					cameraModel: e.mediaFile.mediaFileMetadata.photoMetadata?.cameraModel,
					focalLength: e.mediaFile.mediaFileMetadata.photoMetadata?.focalLength,
					apertureFNumber: e.mediaFile.mediaFileMetadata.photoMetadata?.apertureFNumber,
					isoEquivalent: e.mediaFile.mediaFileMetadata.photoMetadata?.isoEquivalent,
					exposureTime: e.mediaFile.mediaFileMetadata.photoMetadata?.exposureTime
				},
				...e.type === "VIDEO" && {
					cameraMake: e.mediaFile.mediaFileMetadata.videoMetadata.cameraMake,
					cameraModel: e.mediaFile.mediaFileMetadata.videoMetadata.cameraModel,
					fps: e.mediaFile.mediaFileMetadata.videoMetadata.fps,
					processingStatus: e.mediaFile.mediaFileMetadata.videoMetadata.processingStatus
				}
			}
		};
	});
}
async function Yi({ getPickingSession: e, getAccessToken: t, onPickingSessionClear: n, signal: r, onFilesPicked: i, onError: a }) {
	for (let o = 1;;) try {
		r.throwIfAborted();
		let a = e();
		o = a == null ? 1 : parseFloat(a.pollingConfig.pollInterval), await new Promise((e, t) => {
			setTimeout(() => {
				r.removeEventListener("abort", t), e();
			}, o * 1e3), r.addEventListener("abort", t, { once: !0 });
		});
		let s = t();
		if (a = e(), a != null && s != null) {
			let e = Qi(s), t = await fetch(`https://photospicker.googleapis.com/v1/sessions/${encodeURIComponent(a.id)}`, {
				headers: e,
				signal: r
			});
			if (!t.ok) throw Error("Failed to get session");
			if ((await t.json()).mediaItemsSet) {
				let e = await Ji({
					accessToken: s,
					pickingSession: a,
					signal: r
				});
				n(), i(e, s);
			}
			a.pollingConfig.timeoutIn === "0s" && n();
		}
	} catch (e) {
		if (e instanceof Error && e.name === "AbortError") return;
		a(e);
	}
}
function Xi({ uppy: e, getPluginState: t, setPluginState: n }) {
	return {
		getSnapshot: () => t(),
		setState: (e) => {
			n(typeof e == "function" ? e(t()) : e);
		},
		subscribe: (t) => {
			let n = (e, n, r) => {
				let i = r?.plugins?.GoogleDrivePicker ?? r?.plugins?.GooglePhotosPicker;
				i && t(i);
			};
			return e.on("state-update", n), () => e.off("state-update", n);
		}
	};
}
function Zi({ uppy: e, store: t, storage: n = ja, pickerType: r, companionUrl: i, requestClientId: a = r === "drive" ? "GoogleDrivePicker" : "GooglePhotosPicker", clientId: o, apiKey: s, appId: c }) {
	let l = `uppy:google-${r}-picker:accessToken`, u = new AbortController(), d, f, p = async (t, n) => {
		e.addFiles(t.map((e) => na({
			requestClientId: a,
			accessToken: n,
			companionUrl: i
		}, e)));
	};
	function m(e) {
		return t.setState((t) => ({
			...t,
			accessToken: e
		})), e == null ? n.removeItem(l) : n.setItem(l, e);
	}
	function h(e) {
		t.setState((t) => ({
			...t,
			loading: e
		}));
	}
	async function g() {
		d ??= (async () => {
			u = new AbortController(), m(await n.getItem(l)), u.signal.throwIfAborted(), r === "photos" && Yi({
				getPickingSession: () => f,
				getAccessToken: () => t.getSnapshot().accessToken,
				onPickingSessionClear: () => {
					f = void 0;
				},
				signal: u.signal,
				onFilesPicked: p,
				onError: (t) => e.log(t)
			});
		})(), await d;
	}
	async function _() {
		await g();
		let n = t.getSnapshot().accessToken, i = async (t) => {
			if (r === "drive") {
				if (s == null || c == null) throw TypeError("apiKey and appId are required for Google Drive picker");
				await Ki({
					token: t,
					apiKey: s,
					appId: c,
					onFilesPicked: p,
					signal: u.signal,
					onLoadingChange: (e) => h(e),
					onError: (t) => {
						e.log(t), e.info(e.i18n("failedToAddFiles"), "error");
					}
				});
			} else await qi({
				token: t,
				pickingSession: f,
				onPickingSessionChange: (e) => {
					f = e;
				},
				signal: u.signal
			});
		};
		h(!0);
		try {
			try {
				if (await Vi(r), n ??= await Ui({
					clientId: o,
					pickerType: r
				}), n == null) throw Error();
				await i(n), m(n);
			} catch (t) {
				if (t instanceof ta) e.log("Token is invalid or expired, reauthenticating"), n = await Ui({
					pickerType: r,
					accessToken: n,
					clientId: o
				}), await i(n), m(n);
				else throw t;
			}
		} catch (t) {
			t instanceof Error && "type" in t && t.type === "popup_closed" || (m(null), e.log(t));
		} finally {
			h(!1);
		}
	}
	async function v() {
		let { accessToken: e } = t.getSnapshot();
		e && (await Wi(e), m(null), f = void 0);
	}
	function y() {
		u.abort(), f = void 0, d = void 0, t.setState((e) => ({
			...e,
			accessToken: void 0,
			loading: !1
		}));
	}
	return {
		init: g,
		show: _,
		reset: y,
		logout: v
	};
}
var Qi, $i, ea, ta, na, ra = o((() => {
	Ia(), Qi = (e) => ({ authorization: `Bearer ${e}` }), $i = /* @__PURE__ */ new Set(), ea = !1, ta = class extends Error {
		constructor() {
			super("Invalid or expired token"), this.name = "InvalidTokenError";
		}
	}, na = ({ requestClientId: e, accessToken: t, companionUrl: n }, { id: r, mimeType: i, name: a, platform: o, ...s }) => ({
		name: a,
		type: i,
		data: { size: null },
		isRemote: !0,
		remote: {
			companionUrl: n,
			url: `${n}/google-picker/get`,
			body: {
				fileId: r,
				accessToken: t,
				platform: o,
				..."url" in s && { url: s.url }
			},
			requestClientId: e
		},
		..."metadata" in s && { meta: s.metadata }
	});
}));
//#endregion
//#region node_modules/is-network-error/index.js
function ia(e) {
	if (!(e && oa(e) && e.name === "TypeError" && typeof e.message == "string")) return !1;
	let { message: t, stack: n } = e;
	return t === "Load failed" || t.startsWith("Load failed (") && t.endsWith(")") ? n === void 0 || "__sentry_captured__" in e : t.startsWith("error sending request for url") || t === "Failed to fetch" || t.startsWith("Failed to fetch (") && t.endsWith(")") ? !0 : sa.has(t);
}
var aa, oa, sa, ca = o((() => {
	aa = Object.prototype.toString, oa = (e) => aa.call(e) === "[object Error]", sa = /* @__PURE__ */ new Set([
		"network error",
		"NetworkError when attempting to fetch resource.",
		"The Internet connection appears to be offline.",
		"Network request failed",
		"fetch failed",
		"terminated",
		" A network error occurred.",
		"Network connection lost"
	]);
}));
//#endregion
//#region node_modules/p-retry/index.js
function la(e) {
	if (typeof e == "number") {
		if (e < 0) throw TypeError("Expected `retries` to be a non-negative number.");
		if (Number.isNaN(e)) throw TypeError("Expected `retries` to be a valid number or Infinity, got NaN.");
		if (Number.isFinite(e) && !Number.isInteger(e)) throw TypeError("Expected `retries` to be a non-negative integer or Infinity.");
	} else if (e !== void 0) throw TypeError("Expected `retries` to be a number or Infinity.");
}
function ua(e, t, { min: n = 0, allowInfinity: r = !1 } = {}) {
	if (t !== void 0) {
		if (typeof t != "number" || Number.isNaN(t)) throw TypeError(`Expected \`${e}\` to be a number${r ? " or Infinity" : ""}.`);
		if (!r && !Number.isFinite(t)) throw TypeError(`Expected \`${e}\` to be a finite number.`);
		if (t < n) throw TypeError(`Expected \`${e}\` to be \u2265 ${n}.`);
	}
}
function da(e, t) {
	if (t !== void 0 && typeof t != "function") throw TypeError(`Expected \`${e}\` to be a function.`);
}
function fa(e, t) {
	let n = Math.max(1, e + 1), r = t.randomize ? Math.random() + 1 : 1, i = Math.round(r * t.minTimeout * t.factor ** (n - 1));
	return i = Math.min(i, t.maxTimeout), i;
}
function pa(e, t) {
	return Number.isFinite(t) ? t - (performance.now() - e) : t;
}
async function ma(e, t) {
	e <= 0 || await new Promise((n, r) => {
		let i = () => {
			clearTimeout(a), t.signal?.removeEventListener("abort", i), r(t.signal.reason);
		}, a = setTimeout(() => {
			t.signal?.removeEventListener("abort", i), n();
		}, e);
		t.unref && a.unref?.(), t.signal?.addEventListener("abort", i, { once: !0 });
	});
}
async function ha({ error: e, attemptNumber: t, retriesConsumed: n, startTime: r, options: i }) {
	let a = e instanceof Error ? e : /* @__PURE__ */ TypeError(`Non-error was thrown: "${e}". You should only throw errors.`);
	if (a instanceof _a) throw a.originalError;
	let o = Number.isFinite(i.retries) ? Math.max(0, i.retries - n) : i.retries, s = i.maxRetryTime ?? Infinity, c = fa(n, i);
	if (pa(r, s) <= 0) {
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
	if (await i.onFailedAttempt(f), pa(r, s) <= 0 || pa(r, s) <= 0 || o <= 0 || a instanceof TypeError && !ia(a) || !await i.shouldRetry(f)) throw a;
	let p = pa(r, s);
	if (p <= 0) throw a;
	if (!u) return i.signal?.throwIfAborted(), !1;
	let m = Math.min(d, p);
	return i.signal?.throwIfAborted(), await ma(m, i), i.signal?.throwIfAborted(), !0;
}
async function ga(e, t = {}) {
	if (t = { ...t }, la(t.retries), Object.hasOwn(t, "forever")) throw Error("The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead.");
	t.retries ??= 10, t.factor ??= 2, t.minTimeout ??= 1e3, t.maxTimeout ??= Infinity, t.maxRetryTime ??= Infinity, t.randomize ??= !1, t.onFailedAttempt ??= () => {}, t.shouldRetry ??= () => !0, t.shouldConsumeRetry ??= () => !0, da("onFailedAttempt", t.onFailedAttempt), da("shouldRetry", t.shouldRetry), da("shouldConsumeRetry", t.shouldConsumeRetry), ua("factor", t.factor, {
		min: 0,
		allowInfinity: !1
	}), ua("minTimeout", t.minTimeout, {
		min: 0,
		allowInfinity: !1
	}), ua("maxTimeout", t.maxTimeout, {
		min: 0,
		allowInfinity: !0
	}), ua("maxRetryTime", t.maxRetryTime, {
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
			await ha({
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
var _a, va = o((() => {
	ca(), _a = class extends Error {
		constructor(e) {
			super(), e instanceof Error ? (this.originalError = e, {message: e} = e) : (this.originalError = Error(e), this.originalError.stack = this.stack), this.name = "AbortError", this.message = e;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/RequestClient.js
function ya(e) {
	return e.replace(/\/$/, "");
}
async function ba(e) {
	if (e.status === 401) throw new Pi();
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
		if (typeof t == "string") throw new _t(typeof e == "string" ? e : t, t);
		if (typeof e == "string" && e) throw new _t(e);
	}
	throw new wa({
		statusCode: e.status,
		message: t
	});
}
function xa(e, t, n) {
	let { progress: r, bytesUploaded: i, bytesTotal: a } = t;
	r && (e.uppy.log(`Upload progress: ${r}`), e.uppy.emit("upload-progress", n, {
		uploadStarted: n.progress.uploadStarted ?? 0,
		bytesUploaded: i,
		bytesTotal: a
	}));
}
var Sa, Ca, wa, Ta, Ea = o((() => {
	va(), Ur(), X(), Fi(), Sa = 10, Ca = 3e5, wa = class extends Error {
		statusCode;
		constructor({ statusCode: e, message: t }) {
			super(t), this.name = "HttpError", this.statusCode = e;
		}
	}, Ta = class {
		static VERSION = Hr.version;
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
			return ya(e?.[t] ? e[t] : t);
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
		async request({ path: e, method: t = "GET", data: n, skipPostResponse: r, signal: i }) {
			try {
				let a = await this.headers(!n), o = await A(this.#t(e), {
					method: t,
					signal: i,
					headers: a,
					credentials: this.opts.companionCookiesRule || "same-origin",
					body: n ? JSON.stringify(n) : null
				});
				return r || this.onReceiveResponse(o), await ba(o);
			} catch (n) {
				throw Ni(n) || He(n) || O(n).name === "UserFacingApiError" ? n : new y(`Could not ${t} ${this.#t(e)}`, { cause: n });
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
		async uploadRemoteFile(e, t, n) {
			try {
				let { signal: r, getQueue: i } = n || {}, a = i();
				return await ga(async () => a.wrapPromiseFunction(async () => {
					let n = this.uppy.getFile(e.id);
					if (n == null) return;
					let i = n.serverToken;
					if (i != null) this.uppy.log(`Connecting to exiting websocket ${i}`);
					else {
						if (i = await this.#r({
							file: n,
							postBody: t,
							signal: r
						}), !this.uppy.getFile(e.id)) return;
						this.uppy.setFileState(e.id, { serverToken: i });
					}
					let a = this.uppy.getFile(e.id);
					if (a != null) return this.#i({
						file: a,
						signal: r
					});
				})().abortOn(r), {
					retries: Sa,
					signal: r,
					onFailedAttempt: ({ error: e }) => this.uppy.log(`Retrying upload due to: ${e.message}`, "warning")
				});
			} catch (t) {
				if (He(t)) return;
				throw this.uppy.emit("upload-error", e, O(t)), t;
			}
		}
		#n = async ({ file: e, postBody: t, signal: n }) => {
			if (e.remote?.url == null) throw Error("Cannot connect to an undefined URL");
			return (await this.post(e.remote.url, {
				...e.remote.body,
				...t
			}, { signal: n })).token;
		};
		#r = async ({ file: e, postBody: t, signal: n }) => {
			try {
				return await this.#n({
					file: e,
					postBody: t,
					signal: n
				});
			} catch (e) {
				if (Ni(e)) throw new _a(e);
				if (!(e instanceof Error) || e.cause == null) throw e;
				let t = e.cause;
				throw t instanceof wa && !(({ statusCode: e }) => [
					408,
					409,
					429,
					418,
					423
				].includes(e) || e >= 500 && e <= 599 && ![501, 505].includes(e))(t) ? new _a(t) : t;
			}
		};
		async #i({ file: e, signal: t }) {
			let n, { capabilities: r } = this.uppy.getState();
			try {
				return await new Promise((i, a) => {
					let o = e.serverToken, s = Ie(e.remote.companionUrl), c, l, u, { isPaused: d } = e, f = (t, n) => {
						if (c == null || c.readyState !== c.OPEN) {
							this.uppy.log(`Cannot send "${t}" to socket ${e.id} because the socket state was ${String(c?.readyState)}`, "warning");
							return;
						}
						c.send(JSON.stringify({
							action: t,
							payload: n ?? {}
						}));
					};
					function p() {
						r.resumableUploads && f(d ? "pause" : "resume");
					}
					let m = async () => {
						l && l.abort(), l = new AbortController();
						let t = (t) => {
							this.uppy.setFileState(e.id, { serverToken: null }), l?.abort?.(), a(t);
						};
						function n() {
							clearTimeout(u), !d && (u = setTimeout(() => {
								t(/* @__PURE__ */ Error("Timeout waiting for message from Companion socket"));
							}, Ca));
						}
						try {
							await ga(async () => new Promise((r, a) => {
								c = new WebSocket(`${s}/api/${o}`), n(), c.addEventListener("close", () => {
									c = void 0, a(/* @__PURE__ */ Error("Socket closed unexpectedly"));
								}), c.addEventListener("error", (e) => {
									this.uppy.log(`Companion socket error ${JSON.stringify(e)}, closing socket`, "warning"), c?.close();
								}), c.addEventListener("open", () => {
									p();
								}), c.addEventListener("message", (r) => {
									n();
									try {
										let { action: t, payload: n } = JSON.parse(r.data);
										switch (t) {
											case "progress":
												xa(this, n, this.uppy.getFile(e.id));
												break;
											case "success": {
												let t = n.response?.responseText;
												this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
													uploadURL: n.url,
													status: n.response?.status ?? 200,
													body: t ? JSON.parse(t) : void 0
												}), l?.abort?.(), i();
												break;
											}
											case "error": {
												let { message: e } = n.error;
												throw Object.assign(Error(e), { cause: n.error });
											}
											default: this.uppy.log(`Companion socket unknown action ${t}`, "warning");
										}
									} catch (e) {
										t(O(e));
									}
								});
								let d = () => {
									this.uppy.log(`Closing socket ${e.id}`), clearTimeout(u), c && c.close(), c = void 0;
								};
								l.signal.addEventListener("abort", () => {
									d();
								});
							}), {
								retries: Sa,
								signal: l.signal,
								onFailedAttempt: () => {
									l.signal.aborted || this.uppy.log(`Retrying websocket ${e.id}`);
								}
							});
						} catch (e) {
							if (l.signal.aborted) return;
							t(O(e));
						}
					}, h = (e) => {
						r.resumableUploads && (d = e, c && p());
					}, g = (t) => {
						r.individualCancellation && t.id === e.id && (f("cancel"), l?.abort?.(), this.uppy.log(`upload ${e.id} was removed`), i());
					}, _ = () => {
						f("cancel"), l?.abort?.(), this.uppy.log(`upload ${e.id} was canceled`), i();
					}, v = (t, n) => {
						t?.id === e.id && h(n);
					}, y = () => h(!0), b = () => h(!1);
					this.uppy.on("file-removed", g), this.uppy.on("cancel-all", _), this.uppy.on("upload-pause", v), this.uppy.on("pause-all", y), this.uppy.on("resume-all", b), n = () => {
						this.uppy.off("file-removed", g), this.uppy.off("cancel-all", _), this.uppy.off("upload-pause", v), this.uppy.off("pause-all", y), this.uppy.off("resume-all", b);
					}, t.addEventListener("abort", () => {
						l?.abort();
					}), m();
				});
			} finally {
				n?.();
			}
		}
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/Provider.js
function Da() {
	return location.origin;
}
var Oa, ka, Aa = o((() => {
	X(), Fi(), Ea(), Oa = (e) => e.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" "), ka = class extends Ta {
		#e;
		provider;
		id;
		name;
		pluginId;
		tokenKey;
		companionKeysParams;
		preAuthToken;
		supportsRefreshToken;
		constructor(e, t) {
			super(e, t), this.provider = t.provider, this.id = this.provider, this.name = t.name || Oa(this.id), this.pluginId = t.pluginId, this.tokenKey = `companion-${this.pluginId}-auth-token`, this.companionKeysParams = this.opts.companionKeysParams, this.preAuthToken = null, this.supportsRefreshToken = !!t.supportsRefreshToken;
		}
		async headers() {
			let [e, t] = await Promise.all([super.headers(), this.#t()]), n = {};
			return t && (n["uppy-auth-token"] = t), this.companionKeysParams && (n["uppy-credentials-params"] = btoa(JSON.stringify({ params: this.companionKeysParams }))), {
				...e,
				...n
			};
		}
		onReceiveResponse(e) {
			super.onReceiveResponse(e);
			let t = this.#n(), n = t.getPluginState().authenticated ? e.status !== 401 : e.status < 400;
			return t.setPluginState({ authenticated: n }), e;
		}
		async setAuthToken(e) {
			return this.#n().storage.setItem(this.tokenKey, e);
		}
		async #t() {
			return this.#n().storage.getItem(this.tokenKey);
		}
		async removeAuthToken() {
			return this.#n().storage.removeItem(this.tokenKey);
		}
		#n() {
			let e = this.uppy.getPlugin(this.pluginId);
			if (e == null) throw Error("Plugin was nullish");
			return e;
		}
		async ensurePreAuth() {
			if (this.companionKeysParams && !this.preAuthToken && (await this.fetchPreAuthToken(), !this.preAuthToken)) throw Error("Could not load authentication data required for third-party login. Please try again later.");
		}
		authQuery(e) {
			return {};
		}
		authUrl({ authFormData: e, query: t, authCallbackToken: n }) {
			let r = new URLSearchParams({
				...t,
				state: btoa(JSON.stringify({ origin: Da() })),
				...this.authQuery({ authFormData: e })
			});
			return this.preAuthToken && r.set("uppyPreAuthToken", this.preAuthToken), n && r.set("authCallbackToken", n), `${this.hostname}/${this.id}/connect?${r}`;
		}
		async loginSimpleAuth({ uppyVersions: e, authFormData: t, signal: n }) {
			let r = await this.post(`${this.id}/simple-auth`, { form: t }, {
				qs: { uppyVersions: e },
				signal: n
			});
			n.throwIfAborted(), await this.setAuthToken(r.uppyAuthToken), n.throwIfAborted();
		}
		async loginOAuth({ uppyVersions: e, authFormData: t, signal: n }) {
			await this.ensurePreAuth(), n.throwIfAborted();
			let r = crypto.randomUUID(), i = this.authUrl({
				query: { uppyVersions: e },
				authFormData: t,
				authCallbackToken: r
			}), a = window.open(i, "_blank"), o, s;
			try {
				let e = Ie(this.opts.companionUrl), t = await new Promise((t, i) => {
					s = new WebSocket(`${e}/api2/auth-callback/token/${r}`), s.addEventListener("close", () => {
						i(/* @__PURE__ */ Error("Socket closed"));
					}), s.addEventListener("error", (e) => {
						this.uppy.log(`Companion socket error ${JSON.stringify(e)}, closing socket`, "warning"), s?.close();
					}), s.addEventListener("message", (e) => {
						try {
							let { token: n, error: r } = JSON.parse(e.data);
							r ? i(/* @__PURE__ */ Error("Authentication reported error")) : n ? t(n) : i(/* @__PURE__ */ Error("Authentication did not return a token"));
						} catch (e) {
							i(e);
						}
					}), n.addEventListener("abort", () => i(/* @__PURE__ */ Error("Authentication was aborted"))), a && (o = window.setInterval(() => {
						a.closed && i(/* @__PURE__ */ Error("Auth window was closed by the user"));
					}, 500));
				});
				this.setAuthToken(t);
			} catch (e) {
				let t = this.uppy.i18n("authAborted");
				throw this.uppy.info({ message: t }, "warning", 5e3), this.uppy.log(`Authentication failed: ${Me(e)}`, "warning"), e;
			} finally {
				setTimeout(() => a?.close(), 1), this.uppy.log(`Closing auth callback socket ${r}`), s?.close(), clearInterval(o);
			}
		}
		async login({ uppyVersions: e = "", authFormData: t, signal: n }) {
			return this.loginOAuth({
				uppyVersions: e,
				authFormData: t,
				signal: n
			});
		}
		refreshTokenUrl() {
			return `${this.hostname}/${this.id}/refresh-token`;
		}
		fileUrl(e) {
			return `${this.hostname}/${this.id}/get/${e}`;
		}
		async request(...e) {
			await this.#e;
			try {
				return await super.request(...e);
			} catch (t) {
				if (!this.supportsRefreshToken) throw t;
				let n = await this.#t();
				if (!Ni(t) || !n) throw t;
				return this.#e ??= (async () => {
					try {
						this.uppy.log("[CompanionClient] Refreshing expired auth token");
						let e = await super.request({
							path: this.refreshTokenUrl(),
							method: "POST"
						});
						await this.setAuthToken(e.uppyAuthToken);
					} catch (e) {
						throw Ni(e) && await this.removeAuthToken(), t;
					} finally {
						this.#e = void 0;
					}
				})(), await this.#e, super.request(...e);
			}
		}
		async fetchPreAuthToken() {
			if (this.companionKeysParams) try {
				let e = await this.post(`${this.id}/preauth/`, { params: this.companionKeysParams });
				this.preAuthToken = e.token;
			} catch (e) {
				this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${e}`, "warning");
			}
		}
		list(e, t) {
			return this.get(`${this.id}/list/${e || ""}`, t);
		}
		search(e, t = {}) {
			let n = new URLSearchParams();
			n.set("q", e), t.path && n.set("path", t.path), t.cursor && n.set("cursor", t.cursor);
			let r = `${`${this.id}/search`}?${n.toString()}`;
			return this.get(r, t);
		}
		async logout(e) {
			let t = await this.get(`${this.id}/logout`, e);
			return await this.removeAuthToken(), t;
		}
		deleteItem(e, t) {
			return this.post(`${this.id}/mutate/delete`, { id: e }, t);
		}
		moveItem(e, t, n) {
			return this.post(`${this.id}/mutate/move`, {
				id: e,
				destination: t
			}, n);
		}
		createFolder(e, t, n) {
			return this.post(`${this.id}/mutate/create-folder`, {
				parentId: e,
				name: t
			}, n);
		}
	};
})), ja = /* @__PURE__ */ c({
	getItem: () => Na,
	removeItem: () => Pa,
	setItem: () => Ma
});
async function Ma(e, t) {
	localStorage.setItem(e, t);
}
async function Na(e) {
	return localStorage.getItem(e);
}
async function Pa(e) {
	localStorage.removeItem(e);
}
var Fa = o((() => {})), Ia = o((() => {
	Fi(), zi(), ra(), Aa(), Ea(), Fa();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/AuthView.js
function La() {
	return G("svg", {
		width: "26",
		height: "26",
		viewBox: "0 0 26 26",
		xmlns: "http://www.w3.org/2000/svg",
		children: G("g", {
			fill: "none",
			"fill-rule": "evenodd",
			children: [
				G("circle", {
					fill: "#FFF",
					cx: "13",
					cy: "13",
					r: "13"
				}),
				G("path", {
					d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
					fill: "#4285F4",
					"fill-rule": "nonzero"
				}),
				G("path", {
					d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
					fill: "#34A853",
					"fill-rule": "nonzero"
				}),
				G("path", {
					d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
					fill: "#FBBC05",
					"fill-rule": "nonzero"
				}),
				G("path", {
					d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
					fill: "#EA4335",
					"fill-rule": "nonzero"
				}),
				G("path", { d: "M4 4h18v18H4z" })
			]
		})
	});
}
function Ra({ pluginName: e, i18n: t, onAuth: n }) {
	let r = e === "Google Drive";
	return G("form", {
		onSubmit: yn((e) => {
			e.preventDefault(), n();
		}, [n]),
		children: r ? G("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
			"data-uppy-super-focusable": !0,
			children: [G(La, {}), t("signInWithGoogle")]
		}) : G("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
			"data-uppy-super-focusable": !0,
			children: t("authenticateWith", { pluginName: e })
		})
	});
}
function za({ loading: e, pluginName: t, pluginIcon: n, i18n: r, handleAuth: i, renderForm: a = Ba }) {
	return G("div", {
		className: "uppy-Provider-auth",
		children: [
			G("div", {
				className: "uppy-Provider-authIcon",
				children: n()
			}),
			G("div", {
				className: "uppy-Provider-authTitle",
				children: r("authenticateWithTitle", { pluginName: t })
			}),
			a({
				pluginName: t,
				i18n: r,
				loading: e,
				onAuth: i
			})
		]
	});
}
var Ba, Va = o((() => {
	K(), zn(), Ba = ({ pluginName: e, i18n: t, onAuth: n }) => G(Ra, {
		pluginName: e,
		i18n: t,
		onAuth: n
	});
})), Ha, Ua, Wa = o((() => {
	K(), Ha = () => G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "-7 -7 73 73",
		children: G("g", {
			fill: "none",
			"fill-rule": "evenodd",
			children: [G("path", { d: "M-3-3h64v64H-3z" }), G("g", {
				"fill-rule": "nonzero",
				children: [
					G("path", {
						fill: "#FBBC04",
						d: "M14.8 13.4c8.1 0 14.7 6.6 14.7 14.8v1.3H1.3c-.7 0-1.3-.6-1.3-1.3C0 20 6.6 13.4 14.8 13.4z"
					}),
					G("path", {
						fill: "#EA4335",
						d: "M45.6 14.8c0 8.1-6.6 14.7-14.8 14.7h-1.3V1.3c0-.7.6-1.3 1.3-1.3C39 0 45.6 6.6 45.6 14.8z"
					}),
					G("path", {
						fill: "#4285F4",
						d: "M44.3 45.6c-8.2 0-14.8-6.6-14.8-14.8v-1.3h28.2c.7 0 1.3.6 1.3 1.3 0 8.2-6.6 14.8-14.8 14.8z"
					}),
					G("path", {
						fill: "#34A853",
						d: "M13.4 44.3c0-8.2 6.6-14.8 14.8-14.8h1.3v28.2c0 .7-.6 1.3-1.3 1.3-8.2 0-14.8-6.6-14.8-14.8z"
					})
				]
			})]
		})
	}), Ua = () => G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: G("g", {
			fillRule: "nonzero",
			fill: "none",
			children: [
				G("path", {
					d: "M6.663 22.284l.97 1.62c.202.34.492.609.832.804l3.465-5.798H5c0 .378.1.755.302 1.096l1.361 2.278z",
					fill: "#0066DA"
				}),
				G("path", {
					d: "M16 12.09l-3.465-5.798c-.34.195-.63.463-.832.804l-6.4 10.718A2.15 2.15 0 005 18.91h6.93L16 12.09z",
					fill: "#00AC47"
				}),
				G("path", {
					d: "M23.535 24.708c.34-.195.63-.463.832-.804l.403-.67 1.928-3.228c.201-.34.302-.718.302-1.096h-6.93l1.474 2.802 1.991 2.996z",
					fill: "#EA4335"
				}),
				G("path", {
					d: "M16 12.09l3.465-5.798A2.274 2.274 0 0018.331 6h-4.662c-.403 0-.794.11-1.134.292L16 12.09z",
					fill: "#00832D"
				}),
				G("path", {
					d: "M20.07 18.91h-8.14l-3.465 5.798c.34.195.73.292 1.134.292h12.802c.403 0 .794-.11 1.134-.292L20.07 18.91z",
					fill: "#2684FC"
				}),
				G("path", {
					d: "M23.497 12.455l-3.2-5.359a2.252 2.252 0 00-.832-.804L16 12.09l4.07 6.82h6.917c0-.377-.1-.755-.302-1.096l-3.188-5.359z",
					fill: "#FFBA00"
				})
			]
		})
	});
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/GooglePicker/GooglePickerView.js
function Ga({ uppy: e, requestClientId: t, companionUrl: n, pickerType: r, clientId: i, apiKey: a, appId: o, storage: s, store: c }) {
	let { subscribe: l, getSnapshot: u } = c, { reset: d, init: f, ...p } = vn(() => Zi({
		uppy: e,
		requestClientId: t,
		companionUrl: n,
		pickerType: r,
		clientId: i,
		apiKey: a,
		appId: o,
		storage: s,
		store: c
	}), [
		e,
		t,
		i,
		n,
		r,
		a,
		o,
		s,
		c
	]);
	return gn(() => (f(), () => {
		d();
	}), [d, f]), {
		...li(l, u),
		...p
	};
}
function Ka({ getPluginState: e, setPluginState: t, uppy: n, i18n: r, clientId: i, pickerType: a, apiKey: o, appId: s, storage: c, requestClientId: l, companionUrl: u }) {
	let d = Ga({
		uppy: n,
		requestClientId: l,
		companionUrl: u,
		pickerType: a,
		clientId: i,
		apiKey: o,
		appId: s,
		storage: c,
		store: vn(() => Xi({
			uppy: n,
			getPluginState: e,
			setPluginState: t
		}), [
			n,
			e,
			t
		])
	}), f = q(!1);
	return gn(() => {
		d.accessToken === void 0 || f.current || (f.current = !0, d.show());
	}, [d.show, d.accessToken]), d.loading ? G("div", { children: [r("pleaseWait"), "..."] }) : d.accessToken == null ? G(za, {
		pluginName: r(a === "drive" ? "pluginNameGoogleDrivePicker" : "pluginNameGooglePhotosPicker"),
		pluginIcon: a === "drive" ? Ua : Ha,
		handleAuth: d.show,
		i18n: r,
		loading: d.loading
	}) : G("div", {
		style: { textAlign: "center" },
		children: [G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
			style: {
				display: "block",
				marginBottom: "1em"
			},
			disabled: d.loading,
			onClick: d.show,
			children: r(a === "drive" ? "pickFiles" : "pickPhotos")
		}), G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn",
			disabled: d.loading,
			onClick: d.logout,
			children: r("logOut")
		})]
	});
}
var qa = o((() => {
	K(), Mi(), zn(), Ia(), Va(), Wa();
})), Ja = /* @__PURE__ */ s(((e, t) => {
	(function() {
		var e = {}.hasOwnProperty;
		function n() {
			for (var e = "", t = 0; t < arguments.length; t++) {
				var n = arguments[t];
				n && (e = i(e, r(n)));
			}
			return e;
		}
		function r(t) {
			if (typeof t == "string" || typeof t == "number") return t;
			if (typeof t != "object") return "";
			if (Array.isArray(t)) return n.apply(null, t);
			if (t.toString !== Object.prototype.toString && !t.toString.toString().includes("[native code]")) return t.toString();
			var r = "";
			for (var a in t) e.call(t, a) && t[a] && (r = i(r, a));
			return r;
		}
		function i(e, t) {
			return t ? e ? e + " " + t : e + t : e;
		}
		t !== void 0 && t.exports ? (n.default = n, t.exports = n) : typeof define == "function" && typeof define.amd == "object" && define.amd ? define("classnames", [], function() {
			return n;
		}) : window.classNames = n;
	})();
}));
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/errorCodes.js
function Ya(e, t) {
	let { code: n } = t;
	return n && Object.hasOwn(Xa, n) ? e(Xa[n]) : n && t.message === n ? e("companionError") : t.message;
}
var Xa, Za = o((() => {
	Xa = {
		S3_ALREADY_EXISTS: "s3AlreadyExists",
		S3_CONFLICT: "s3Conflict",
		S3_DESTINATION_MUST_BE_FILE: "s3DestinationMustBeFile",
		S3_FILE_TOO_LARGE_TO_MOVE: "s3FileTooLargeToMove",
		S3_FOLDER_INTO_ITSELF: "s3FolderIntoItself",
		S3_FOLDER_MOVE_NOT_SUPPORTED: "s3FolderMoveNotSupported",
		S3_FOLDER_NOT_EMPTY: "s3FolderNotEmpty",
		S3_INVALID_GRANT: "s3InvalidGrant",
		S3_INVALID_NAME: "s3InvalidName",
		S3_NOT_CONFIGURED: "s3NotConfigured",
		S3_NOT_FOUND: "s3NotFound",
		S3_OUTSIDE_ALLOWED_FOLDER: "s3OutsideAllowedFolder",
		S3_READ_ONLY_SESSION: "s3ReadOnlySession",
		S3_REQUEST_FAILED: "s3RequestFailed",
		S3_SELECTED_IN_OTHER_SESSION: "s3SelectedInOtherSession",
		WEBDAV_CANNOT_CONNECT: "webdavCannotConnect"
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsMenu.js
function Qa(e, t) {
	return e.filter((e) => eo(e, t));
}
function $a({ file: e, actions: t, open: n, onToggle: r, i18n: i }) {
	return t.some((t) => eo(t, e)) ? G("div", {
		className: "uppy-ProviderBrowserItem-actions",
		children: G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsBtn",
			"aria-label": i("itemActionsNamed", { name: e.data.name ?? i("unnamed") }),
			"aria-haspopup": "menu",
			"aria-expanded": n,
			onClick: (e) => {
				e.stopPropagation(), e.preventDefault(), r(e.currentTarget);
			},
			children: G("svg", {
				"aria-hidden": "true",
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				focusable: "false",
				children: [
					G("circle", {
						cx: "3",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					G("circle", {
						cx: "8",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					G("circle", {
						cx: "13",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					})
				]
			})
		})
	}) : null;
}
var eo, to = o((() => {
	K(), eo = ({ appliesTo: e = "all" }, t) => e === "all" || e === (t.data.isFolder ? "folder" : "file");
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ModalDialog.js
function no(e) {
	e.key === "Escape" && e.stopPropagation();
}
function ro({ onDismiss: e, restoreFocus: t, children: n, ...r }) {
	let i = q(null), a = q(!1), o = q(t);
	return o.current = t, gn(() => {
		let e = i.current;
		if (!e) return;
		let t = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		return typeof e.showModal == "function" ? e.showModal() : (e.setAttribute("open", ""), e.querySelector("button")?.focus()), () => {
			e.open && typeof e.close == "function" && e.close();
			let { activeElement: n } = document;
			(n === document.body || e.contains(n)) && (t?.isConnected ? t : o.current?.(e))?.focus();
		};
	}, []), G("dialog", {
		...r,
		ref: i,
		onCancel: (t) => {
			t.preventDefault(), e();
		},
		onPointerDown: (e) => {
			a.current = io(e);
		},
		onClick: (t) => {
			a.current && io(t) && e(), a.current = !1;
		},
		onKeyDown: (t) => {
			t.key !== "Escape" || t.isComposing || (t.preventDefault(), t.stopPropagation(), e());
		},
		children: n
	});
}
var io, ao = o((() => {
	K(), zn(), io = (e) => {
		let t = e.currentTarget;
		if (e.target !== t) return !1;
		let n = t.getBoundingClientRect();
		return e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom;
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsPopover.js
function oo({ file: e, actions: t, anchor: n, containerRef: r, runAction: i, onClose: a, i18n: o }) {
	let s = q(null), [c, l] = mn(null), u = yn(() => {
		let e = s.current;
		if (!e) return;
		let t = n.getBoundingClientRect(), r = e.offsetHeight, i = t.bottom + co + r <= window.innerHeight ? t.bottom + co : Math.max(0, t.top - co - r);
		l(getComputedStyle(n).direction === "rtl" ? {
			top: i,
			left: Math.max(0, t.left)
		} : {
			top: i,
			right: Math.max(0, window.innerWidth - t.right)
		});
	}, [n]);
	_n(u, [u]), gn(() => {
		let e = s.current, t = r.current;
		if (!e) return;
		let n = (e) => {
			e.newState === "closed" && a();
		}, i = new AbortController(), { signal: o } = i;
		return e.addEventListener("toggle", n, { signal: o }), typeof e.showPopover == "function" && e.showPopover(), u(), window.addEventListener("scroll", (e) => {
			if (t && e.target instanceof Node && t.contains(e.target)) {
				a();
				return;
			}
			u();
		}, {
			capture: !0,
			signal: o
		}), window.addEventListener("resize", u, { signal: o }), e.querySelector("[role=\"menuitem\"]")?.focus({ preventScroll: !0 }), () => i.abort();
	}, [
		r,
		a,
		u
	]);
	let d = () => {
		a(), n.focus({ preventScroll: !0 });
	}, f = (e) => {
		let t = Array.from(s.current?.querySelectorAll("[role=\"menuitem\"]") ?? []), n = t.indexOf(document.activeElement), r = (n) => {
			e.preventDefault(), t[(n + t.length) % t.length]?.focus({ preventScroll: !0 });
		};
		switch (e.key) {
			case "Escape":
				no(e), typeof s.current?.hidePopover != "function" && d();
				break;
			case "ArrowDown":
				r(n + 1);
				break;
			case "ArrowUp":
				r(n - 1);
				break;
			case "Home":
				r(0);
				break;
			case "End":
				r(t.length - 1);
				break;
			case "Tab": a();
		}
	};
	return G("div", {
		ref: s,
		className: "uppy-ProviderBrowserItem-actionsMenu",
		popover: "auto",
		role: "menu",
		"aria-label": o("itemActionsNamed", { name: e.data.name ?? o("unnamed") }),
		style: c ? {
			top: `${c.top}px`,
			..."left" in c ? { left: `${c.left}px` } : { right: `${c.right}px` }
		} : { visibility: "hidden" },
		onKeyDown: f,
		children: t.map((t) => G("button", {
			type: "button",
			role: "menuitem",
			className: (0, so.default)("uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsMenuItem", t.danger && "uppy-ProviderBrowserItem-actionsMenuItem--danger"),
			onClick: (n) => {
				n.stopPropagation(), n.preventDefault(), d(), i(t, e);
			},
			children: t.label
		}, t.id))
	});
}
var so, co, lo = o((() => {
	K(), so = /* @__PURE__ */ u(Ja(), 1), zn(), ao(), co = 4;
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/useItemMenu.js
function uo(e) {
	let [t, n] = mn(null), r = t ? e.find(({ id: e }) => e === t.id) : void 0;
	return {
		open: t && r ? {
			item: r,
			anchor: t.anchor
		} : null,
		close: yn(() => n(null), []),
		toggle: yn((e, t) => n((n) => n?.id === e ? null : {
			id: e,
			anchor: t
		}), [])
	};
}
var fo = o((() => {
	zn();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemIcon.js
function po() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: 11,
		height: 14.5,
		viewBox: "0 0 44 58",
		children: G("path", { d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z" })
	});
}
function mo() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		style: {
			minWidth: 16,
			marginRight: 3
		},
		viewBox: "0 0 276.157 276.157",
		children: G("path", { d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z" })
	});
}
function ho() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		style: {
			width: 16,
			marginRight: 4
		},
		viewBox: "0 0 58 58",
		children: [G("path", { d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z" }), G("path", { d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z" })]
	});
}
function go({ itemIconString: e, alt: t = void 0 }) {
	if (e === null) return null;
	switch (e) {
		case "file": return G(po, {});
		case "folder": return G(mo, {});
		case "video": return G(ho, {});
		default: return G("img", {
			src: e,
			alt: t,
			referrerPolicy: "no-referrer",
			loading: "lazy",
			width: 16,
			height: 16
		});
	}
}
var _o = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/GridItem.js
function vo({ file: e, toggleCheckbox: t, className: n, isDisabled: r, restrictionError: i, showTitles: a, children: o = null, i18n: s, actionsMenu: c = null, selectable: l = !0, onFileClick: u }) {
	let d = e.data.name ?? s("unnamed"), f = G(H, { children: [
		G(go, { itemIconString: e.data.thumbnail || e.data.icon }),
		a && d,
		o
	] });
	return G("li", {
		className: n,
		title: r && i ? i : void 0,
		children: [
			l && G("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid",
				onChange: t,
				name: "listitem",
				id: e.id,
				checked: e.status === "checked",
				disabled: r,
				"data-uppy-super-focusable": !0
			}),
			!l && u && !e.data.isFolder ? G("button", {
				type: "button",
				"aria-label": s("openFileNamed", { name: d }),
				"data-uppy-item-id": e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				onClick: () => u(e),
				children: f
			}) : G("label", {
				htmlFor: l ? e.id : void 0,
				"aria-label": d,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: f
			}),
			c
		]
	});
}
var yo = o((() => {
	K(), _o();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ListItem.js
function bo({ file: e, openFolder: t, className: n, isDisabled: r, restrictionError: i, toggleCheckbox: a, showTitles: o, i18n: s, actionsMenu: c = null, selectable: l = !0, onFileClick: u }) {
	let d = G(H, { children: [G("div", {
		className: "uppy-ProviderBrowserItem-iconWrap",
		children: G(go, { itemIconString: e.data.icon })
	}), o && G("span", {
		className: "uppy-truncate-text",
		children: e.data.name ?? s("unnamed")
	})] });
	return G("li", {
		className: n,
		title: e.status !== "checked" && i ? i : void 0,
		children: [
			l && G("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox",
				onChange: a,
				name: "listitem",
				id: e.id,
				checked: e.status === "checked",
				"aria-label": e.data.isFolder ? s("allFilesFromFolderNamed", { name: e.data.name ?? s("unnamed") }) : null,
				disabled: r,
				"data-uppy-super-focusable": !0
			}),
			e.data.isFolder ? G("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				onClick: () => t(e.id),
				"aria-label": s("openFolderNamed", { name: e.data.name ?? s("unnamed") }),
				children: [G("div", {
					className: "uppy-ProviderBrowserItem-iconWrap",
					children: G(go, { itemIconString: e.data.icon })
				}), o && e.data.name ? G("span", {
					className: "uppy-truncate-text",
					children: e.data.name
				}) : s("unnamed")]
			}) : l ? G("label", {
				htmlFor: e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: d
			}) : G("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				onClick: () => u?.(e),
				"data-uppy-item-id": e.id,
				"aria-label": s("openFileNamed", { name: e.data.name ?? s("unnamed") }),
				children: d
			}),
			c
		]
	});
}
var xo = o((() => {
	K(), _o();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/index.js
function So(e) {
	let { viewType: t, toggleCheckbox: n, showTitles: r, i18n: i, openFolder: a, file: o, utmSource: s, actions: c = [], menuOpen: l = !1, toggleMenu: u, selectable: d = !0, onFileClick: f } = e, p = c.length > 0 && u ? G($a, {
		file: o,
		actions: c,
		open: l,
		onToggle: u,
		i18n: i
	}) : null, m = o.type === "folder" ? null : o.restrictionError, h = !!m && o.status !== "checked", g = {
		file: o,
		openFolder: a,
		toggleCheckbox: n,
		utmSource: s,
		i18n: i,
		viewType: t,
		showTitles: r,
		className: (0, Co.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": h }, { "uppy-ProviderBrowserItem--noPreview": o.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": o.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": o.status === "partial" }),
		isDisabled: h,
		restrictionError: m,
		actionsMenu: p,
		selectable: d,
		onFileClick: f
	};
	switch (t) {
		case "grid": return G(vo, { ...g });
		case "list": return G(bo, { ...g });
		case "unsplash": return G(vo, {
			...g,
			children: G("a", {
				href: `${o.data.author.url}?utm_source=${s}&utm_medium=referral`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "uppy-ProviderBrowserItem-author",
				tabIndex: -1,
				children: o.data.author.name
			})
		});
		default: throw Error(`There is no such type ${t}`);
	}
}
var Co, wo = o((() => {
	K(), Co = /* @__PURE__ */ u(Ja(), 1), yo(), to(), xo();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Browser.js
function To(e) {
	let { displayedPartialTree: t, viewType: n, toggleCheckbox: r, handleScroll: i, showTitles: a, i18n: o, isLoading: s, onCancelLoading: c, openFolder: l, noResultsLabel: u, virtualList: d, utmSource: f, actions: p = [], runAction: m, selectable: h = !0, onFileClick: g } = e, [_, v] = mn(!1), y = uo(t), b = q(null);
	gn(() => {
		let e = (e) => {
			e.key === "Shift" && v(!1);
		}, t = (e) => {
			e.key === "Shift" && v(!0);
		};
		return document.addEventListener("keyup", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("keyup", e), document.removeEventListener("keydown", t);
		};
	}, []);
	let x = q(null), S = !!(s && c);
	if (gn(() => {
		S && x.current?.focus();
	}, [S]), s) return G("div", {
		className: "uppy-Provider-loading",
		children: [G("span", {
			role: "status",
			children: typeof s == "string" ? s : o("loading")
		}), c && G("button", {
			ref: x,
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Provider-loadingCancel",
			onClick: c,
			children: o("stopOperation")
		})]
	});
	if (t.length === 0) return G("div", {
		className: "uppy-Provider-empty",
		children: u
	});
	let C = (e) => G(So, {
		viewType: n,
		toggleCheckbox: (t) => {
			t.stopPropagation(), t.preventDefault(), document.getSelection()?.removeAllRanges(), r(e, _);
		},
		showTitles: a,
		i18n: o,
		openFolder: l,
		file: e,
		utmSource: f,
		actions: p,
		menuOpen: y.open?.item.id === e.id,
		toggleMenu: m ? (t) => y.toggle(e.id, t) : void 0,
		selectable: h,
		onFileClick: g
	}, e.id), w = y.open && m ? G(oo, {
		file: y.open.item,
		actions: Qa(p, y.open.item),
		anchor: y.open.anchor,
		containerRef: b,
		runAction: m,
		onClose: y.close,
		i18n: o
	}, y.open.item.id) : null;
	return d ? G("div", {
		className: "uppy-ProviderBrowser-body",
		ref: b,
		children: [G(Bn, {
			className: "uppy-ProviderBrowser-list",
			data: t,
			renderRow: C,
			rowHeight: 35.5
		}), w]
	}) : G("div", {
		className: "uppy-ProviderBrowser-body",
		ref: b,
		children: [G("ul", {
			className: "uppy-ProviderBrowser-list",
			onScroll: i,
			tabIndex: -1,
			children: t.map(C)
		}), w]
	});
}
var Eo = o((() => {
	K(), zn(), X(), to(), lo(), fo(), wo();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/BulkActions.js
function Do({ selectedCount: e, bulkActions: t, runBulkAction: n, i18n: r }) {
	return e === 0 || t.length === 0 ? null : G("div", {
		className: "uppy-ProviderBrowser-footer",
		children: G("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [G("span", {
				className: "uppy-ProviderBrowser-footer-count",
				children: r("itemsSelected", { smart_count: e })
			}), t.map((e) => G("button", {
				type: "button",
				className: (0, Oo.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-ProviderDialog-confirm--danger": e.danger }),
				onClick: () => n(e),
				children: e.label
			}, e.id))]
		})
	});
}
var Oo, ko = o((() => {
	K(), Oo = /* @__PURE__ */ u(Ja(), 1);
})), Ao, jo = o((() => {
	Ao = (e) => e.filter((t) => t.type === "file" && t.status === "checked" || t.type === "folder" && t.status === "checked" && !e.some((e) => e.type !== "root" && e.parentId === t.id)).length;
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FooterActions.js
function Mo({ cancelSelection: e, donePicking: t, i18n: n, partialTree: r, validateAggregateRestrictions: i }) {
	let a = vn(() => i(r), [r, i]), o = vn(() => Ao(r), [r]);
	return o === 0 ? null : G("div", {
		className: "uppy-ProviderBrowser-footer",
		children: [G("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [G("button", {
				className: (0, No.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-c-btn--disabled": a }),
				disabled: !!a,
				onClick: t,
				type: "button",
				children: n("selectX", { smart_count: o })
			}), G("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
				onClick: e,
				type: "button",
				children: n("cancel")
			})]
		}), a && G("div", {
			className: "uppy-ProviderBrowser-footer-error",
			children: a
		})]
	});
}
var No, Po = o((() => {
	K(), No = /* @__PURE__ */ u(Ja(), 1), zn(), jo();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ItemDetailDialog.js
function Fo({ item: e, actions: t, runAction: n, getPreviewUrl: r, onClose: i, i18n: a }) {
	let [o, s] = mn(null), c = bn(), [l] = mn(e);
	gn(() => {
		if (!r || l.data.isFolder) return;
		let e = !1;
		return Promise.resolve().then(() => r(l)).then((t) => {
			e || s(t);
		}).catch(() => {}), () => {
			e = !0;
		};
	}, [r, l]);
	let u = e.data.name ?? a("unnamed"), f = Qa(t, e), p = e.type === "file" ? e.data : void 0, m = p?.size, h = p?.mimeType, g = p?.modifiedDate;
	return G(ro, {
		className: "uppy-ProviderDialog uppy-ItemDetail",
		"aria-labelledby": c,
		onDismiss: i,
		restoreFocus: (t) => {
			let n = t.closest(".uppy-ProviderBrowser");
			return n?.querySelector(`[data-uppy-item-id="${CSS.escape(e.id)}"]`) ?? n?.querySelector(".uppy-ProviderBrowser-list");
		},
		children: [
			G("header", {
				className: "uppy-ItemDetail-header",
				children: [G("h3", {
					id: c,
					className: "uppy-ItemDetail-name",
					children: u
				}), G("button", {
					type: "button",
					className: "uppy-u-reset uppy-c-btn uppy-ItemDetail-close",
					"aria-label": a("close"),
					onClick: i,
					children: G("svg", {
						"aria-hidden": "true",
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						children: G("path", {
							d: "M2 2l10 10M12 2L2 12",
							stroke: "currentColor",
							"stroke-width": "1.6",
							"stroke-linecap": "round"
						})
					})
				})]
			}),
			G("div", {
				className: "uppy-ItemDetail-body",
				children: [G("div", {
					className: "uppy-ItemDetail-preview",
					"data-testid": "file-detail-preview",
					children: o ? G("img", {
						src: o,
						alt: "",
						className: "uppy-ItemDetail-previewImage"
					}) : G("span", {
						className: "uppy-ItemDetail-previewIcon",
						"aria-hidden": "true",
						children: G(go, { itemIconString: e.data.icon })
					})
				}), G("dl", {
					className: "uppy-ItemDetail-facts",
					children: [
						typeof m == "number" ? G(H, { children: [G("dt", { children: a("detailSize") }), G("dd", { children: d(m) })] }) : null,
						h ? G(H, { children: [G("dt", { children: a("detailType") }), G("dd", { children: h })] }) : null,
						g ? G(H, { children: [G("dt", { children: a("detailModified") }), G("dd", { children: g })] }) : null
					]
				})]
			}),
			G("footer", {
				className: "uppy-ItemDetail-actions",
				children: f.map((t) => G("button", {
					type: "button",
					className: (0, Io.default)("uppy-u-reset uppy-c-btn uppy-ItemDetail-action", t.danger && "uppy-ItemDetail-action--danger"),
					onClick: () => {
						i(), n(t, e);
					},
					children: t.label
				}, t.id))
			})
		]
	});
}
var Io, Lo = o((() => {
	K(), p(), Io = /* @__PURE__ */ u(Ja(), 1), zn(), to(), _o(), ao();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderDialog.js
function Ro({ dialog: e, i18n: t, onConfirm: n, onCancel: r }) {
	let [i, a] = mn(e.kind === "prompt" ? e.defaultValue ?? "" : ""), o = q(null), s = q(null), c = q(null), l = bn(), u = e.kind === "prompt", d = e.kind === "confirm" && e.danger === !0;
	return gn(() => {
		(o.current ?? (d ? c : s).current)?.focus(), o.current?.select();
	}, [d]), G(ro, {
		className: "uppy-ProviderDialog",
		"aria-labelledby": l,
		onDismiss: r,
		children: G("form", {
			className: "uppy-ProviderDialog-form",
			onSubmit: (e) => {
				e.preventDefault(), n(u ? i : void 0);
			},
			children: [
				G("h3", {
					id: l,
					className: "uppy-ProviderDialog-title",
					children: e.title
				}),
				e.kind === "prompt" ? G("label", {
					className: "uppy-ProviderDialog-label",
					children: [e.label && G("span", {
						className: "uppy-ProviderDialog-labelText",
						children: e.label
					}), G("input", {
						ref: o,
						type: "text",
						className: "uppy-u-reset uppy-c-textInput uppy-ProviderDialog-input",
						value: i,
						onInput: (e) => a(e.target.value)
					})]
				}) : e.message && G("p", {
					className: "uppy-ProviderDialog-message",
					children: e.message
				}),
				G("div", {
					className: "uppy-ProviderDialog-actions",
					children: [G("button", {
						ref: c,
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
						onClick: r,
						children: t("cancel")
					}), G("button", {
						ref: s,
						type: "submit",
						className: (0, zo.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", d && "uppy-ProviderDialog-confirm--danger"),
						children: e.confirmLabel ?? t("dialogConfirm")
					})]
				})
			]
		})
	});
}
var zo, Bo = o((() => {
	K(), zo = /* @__PURE__ */ u(Ja(), 1), zn(), ao();
})), Vo, Ho = o((() => {
	Vo = class {
		#e;
		#t = null;
		#n = 0;
		get revision() {
			return this.#n;
		}
		constructor(e) {
			this.#e = e;
		}
		prompt(e) {
			return new Promise((t) => {
				this.#r({
					kind: "prompt",
					...e
				}, (e, n) => t(e ? n ?? "" : null));
			});
		}
		confirm(e) {
			return new Promise((t) => {
				this.#r({
					kind: "confirm",
					...e
				}, t);
			});
		}
		submit = (e) => this.#i(!0, e);
		cancel = () => this.#i(!1);
		#r(e, t) {
			this.cancel(), this.#n += 1, this.#t = t, this.#e.setPluginState({ dialog: e });
		}
		#i(e, t) {
			let n = this.#t;
			n && (this.#t = null, this.#e.setPluginState({ dialog: void 0 }), n(e, t));
		}
	};
})), Uo, Wo = o((() => {
	Uo = (e, t, n) => {
		let r = e.name || e.id;
		return {
			id: e.id,
			source: t.id,
			name: r,
			type: e.mimeType,
			isRemote: !0,
			data: e,
			preview: e.thumbnail || void 0,
			meta: {
				authorName: e.author?.name,
				authorUrl: e.author?.url,
				relativePath: e.relDirPath || null,
				absolutePath: e.absDirPath
			},
			body: { fileId: e.id },
			remote: {
				companionUrl: t.opts.companionUrl,
				url: `${n.fileUrl(e.requestPath)}`,
				body: { fileId: e.id },
				providerName: n.name,
				provider: n.provider,
				requestClientId: n.provider
			}
		};
	};
})), Go, Ko = o((() => {
	X(), Wo(), Go = (e, t, n) => {
		let r = e.map((e) => Uo(e, t, n)), i = [], a = [];
		r.forEach((e) => {
			t.uppy.checkIfFileAlreadyExists(ge(e, t.uppy.getID())) ? a.push(e) : i.push(e);
		}), i.length > 0 && t.uppy.info(t.uppy.i18n("addedNumFiles", { numFiles: i.length })), a.length > 0 && t.uppy.info(`Not adding ${a.length} files because they already exist`), t.uppy.addFiles(i);
	};
})), qo, Jo = o((() => {
	qo = (e, t, n, r) => {
		let i = t.findIndex((e) => e.id === r);
		if (i !== -1 && n) {
			let n = t.findIndex((t) => t.id === e);
			return t.slice(Math.min(i, n), Math.max(i, n) + 1).map((e) => e.id);
		}
		return [e];
	};
})), Yo, Xo = o((() => {
	Fi(), Za(), X(), Yo = (e) => (t) => {
		if (Ni(t)) return;
		let n = O(t);
		if (He(n)) {
			e.log("Aborting request", "warning");
			return;
		}
		e.log(n, "error"), n.name === "UserFacingApiError" && e.info({
			message: e.i18n("companionError"),
			details: Ya(e.i18n, n)
		}, "warning", 5e3);
	};
})), Zo, Qo = o((() => {
	Zo = (e, t) => {
		let n = e.find((e) => e.id === t), r = [];
		for (; r = [n, ...r], n.type !== "root";) {
			let t = n.parentId;
			n = e.find((e) => e.id === t);
		}
		return r;
	};
})), $o, es, ts = o((() => {
	$o = (e, t, n) => {
		let r = t === null ? "null" : t;
		if (n[r]) return n[r];
		let i = e.find((e) => e.id === t);
		if (i.type === "root") return [];
		let a = [...$o(e, i.parentId, n), i];
		return n[r] = a, a;
	}, es = (e) => {
		let t = Object.create(null);
		return e.filter((e) => e.type === "file" && e.status === "checked").map((n) => {
			let r = $o(e, n.id, t), i = r.findIndex((e) => e.type === "folder" && e.status === "checked"), a = r.slice(i), o = `/${r.map((e) => e.data.name).join("/")}`, s = a.length === 1 ? void 0 : a.map((e) => e.data.name).join("/");
			return {
				...n.data,
				absDirPath: o,
				relDirPath: s
			};
		});
	};
})), ns = /* @__PURE__ */ s(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})), rs, is = o((() => {
	rs = /* @__PURE__ */ u(ns(), 1);
}));
//#endregion
//#region node_modules/p-timeout/index.js
function as(e, t) {
	let { milliseconds: n, fallback: r, message: i, customTimers: a = {
		setTimeout,
		clearTimeout
	}, signal: o } = t, s, c, l = new Promise((t, l) => {
		if (typeof n != "number" || Math.sign(n) !== 1) throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${n}\``);
		if (o?.aborted) {
			l(ss(o)), e.then(t, l);
			return;
		}
		if (o && (c = () => {
			l(ss(o));
		}, o.addEventListener("abort", c, { once: !0 })), e.then(t, l), n === Infinity) return;
		let u = new os();
		s = a.setTimeout.call(void 0, () => {
			if (r) {
				try {
					t(r());
				} catch (e) {
					l(e);
				}
				return;
			}
			typeof e.cancel == "function" && e.cancel(), i === !1 ? t() : i instanceof Error ? l(i) : (u.message = i ?? `Promise timed out after ${n} milliseconds`, l(u));
		}, n);
	}).finally(() => {
		l.clear(), c && o && o.removeEventListener("abort", c);
	});
	return l.clear = () => {
		a.clearTimeout.call(void 0, s), s = void 0;
	}, l;
}
var os, ss, cs = o((() => {
	os = class e extends Error {
		name = "TimeoutError";
		constructor(t, n) {
			super(t, n), Error.captureStackTrace?.(this, e);
		}
	}, ss = (e) => e.reason ?? new DOMException("This operation was aborted.", "AbortError");
}));
//#endregion
//#region node_modules/p-queue/dist/lower-bound.js
function ls(e, t, n) {
	let r = 0, i = e.length;
	for (; i > 0;) {
		let a = Math.trunc(i / 2), o = r + a;
		n(e[o], t) <= 0 ? (r = ++o, i -= a + 1) : i = a;
	}
	return r;
}
var us = o((() => {})), ds, fs, ps = o((() => {
	us(), ds = 100, fs = class {
		#e = [];
		#t = 0;
		enqueue(e, t) {
			let { priority: n = 0, id: r } = t ?? {}, { size: i } = this, a = {
				priority: n,
				id: r,
				run: e
			};
			if (i === 0) {
				this.#e.length = 0, this.#t = 0, this.#e.push(a);
				return;
			}
			if (this.#e.at(-1).priority >= n) {
				this.#e.push(a);
				return;
			}
			this.#n();
			let o = ls(this.#e, a, (e, t) => t.priority - e.priority);
			this.#e.splice(o, 0, a);
		}
		setPriority(e, t) {
			let n = this.#e.findIndex((t, n) => n >= this.#t && t.id === e);
			if (n === -1) throw ReferenceError(`No promise function with the id "${e}" exists in the queue.`);
			let [r] = this.#e.splice(n, 1);
			this.enqueue(r.run, {
				priority: t,
				id: e
			});
		}
		remove(e) {
			let t = this.#e.findIndex((t, n) => n < this.#t ? !1 : typeof e == "string" ? t.id === e : t.run === e);
			t !== -1 && this.#e.splice(t, 1);
		}
		dequeue() {
			if (this.#t === this.#e.length) return;
			let e = this.#e[this.#t];
			return this.#t++, this.#t === this.#e.length ? (this.#e.length = 0, this.#t = 0) : this.#t > ds && this.#t > this.#e.length / 2 && this.#n(), e?.run;
		}
		filter(e) {
			let t = [];
			for (let n = this.#t; n < this.#e.length; n++) {
				let r = this.#e[n];
				r.priority === e.priority && t.push(r.run);
			}
			return t;
		}
		get size() {
			return this.#e.length - this.#t;
		}
		#n() {
			this.#t !== 0 && (this.#e.splice(0, this.#t), this.#t = 0);
		}
	};
})), ms, hs = o((() => {
	is(), cs(), ps(), ms = class extends rs.default {
		#e;
		#t;
		#n = 0;
		#r;
		#i = !1;
		#a = !1;
		#o;
		#s = 0;
		#c;
		#l;
		#u;
		#d = [];
		#f = 0;
		#p;
		#m;
		#h = 0;
		#g;
		#_;
		#v = 1n;
		#y = /* @__PURE__ */ new Map();
		#b = /* @__PURE__ */ new Set();
		timeout;
		constructor(e) {
			if (super(), e = {
				carryoverIntervalCount: !1,
				intervalCap: Infinity,
				interval: 0,
				concurrency: Infinity,
				autoStart: !0,
				queueClass: fs,
				strict: !1,
				...e
			}, !(typeof e.intervalCap == "number" && e.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${e.intervalCap?.toString() ?? ""}\` (${typeof e.intervalCap})`);
			if (e.interval === void 0 || !(Number.isFinite(e.interval) && e.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${e.interval?.toString() ?? ""}\` (${typeof e.interval})`);
			if (e.strict && e.interval === 0) throw TypeError("The `strict` option requires a non-zero `interval`");
			if (e.strict && e.intervalCap === Infinity) throw TypeError("The `strict` option requires a finite `intervalCap`");
			if (this.#e = e.carryoverIntervalCount ?? e.carryoverConcurrencyCount ?? !1, this.#t = e.intervalCap === Infinity || e.interval === 0, this.#r = e.intervalCap, this.#o = e.interval, this.#u = e.strict, this.#p = new e.queueClass(), this.#m = e.queueClass, this.concurrency = e.concurrency, e.timeout !== void 0 && !(Number.isFinite(e.timeout) && e.timeout > 0)) throw TypeError(`Expected \`timeout\` to be a positive finite number, got \`${e.timeout}\` (${typeof e.timeout})`);
			this.timeout = e.timeout, this.#_ = e.autoStart === !1, this.#R();
		}
		#x(e) {
			for (; this.#f < this.#d.length;) {
				let t = this.#d[this.#f];
				if (t !== void 0 && e - t >= this.#o) this.#f++;
				else break;
			}
			(this.#f > 100 && this.#f > this.#d.length / 2 || this.#f === this.#d.length) && (this.#d = this.#d.slice(this.#f), this.#f = 0);
		}
		#S(e) {
			this.#u ? this.#d.push(e) : this.#n++;
		}
		#C() {
			this.#u ? this.#d.length > this.#f && this.#d.pop() : this.#n > 0 && this.#n--;
		}
		#w() {
			return this.#d.length - this.#f;
		}
		get #T() {
			return this.#t ? !0 : this.#u ? this.#w() < this.#r : this.#n < this.#r;
		}
		get #E() {
			return this.#h < this.#g;
		}
		#D() {
			this.#h--, this.#h === 0 && this.emit("pendingZero"), this.#N(), this.emit("next");
		}
		#O() {
			this.#l = void 0, this.#F(), this.#P();
		}
		#k(e) {
			if (this.#u) {
				if (this.#x(e), this.#w() >= this.#r) {
					let t = this.#d[this.#f], n = this.#o - (e - t);
					return this.#A(n), !0;
				}
				return !1;
			}
			if (this.#c === void 0) {
				let t = this.#s - e;
				if (t < 0) this.#n = this.#e ? this.#h : 0;
				else return this.#A(t), !0;
			}
			return !1;
		}
		#A(e) {
			this.#l === void 0 && (this.#l = setTimeout(() => {
				this.#O();
			}, e));
		}
		#j() {
			this.#c &&= (clearInterval(this.#c), void 0);
		}
		#M() {
			this.#l &&= (clearTimeout(this.#l), void 0);
		}
		#N() {
			if (this.#p.size === 0) {
				if (this.#j(), this.emit("empty"), this.#h === 0) {
					if (this.#M(), this.#u && this.#f > 0) {
						let e = Date.now();
						this.#x(e);
					}
					this.emit("idle");
				}
				return !1;
			}
			let e = !1;
			if (!this.#_) {
				let t = Date.now(), n = !this.#k(t);
				if (this.#T && this.#E) {
					let r = this.#p.dequeue();
					this.#t || (this.#S(t), this.#z()), n && this.#P(), this.emit("active"), r(), e = !0;
				}
			}
			return e;
		}
		#P() {
			this.#t || this.#c !== void 0 || this.#u || (this.#c = setInterval(() => {
				this.#F();
			}, this.#o), this.#s = Date.now() + this.#o);
		}
		#F() {
			this.#u || (this.#c !== void 0 && (this.#n === 0 && this.#h === 0 ? this.#j() : this.#s = Date.now() + this.#o), this.#n = this.#e ? this.#h : 0), this.#I(), this.#z();
		}
		#I() {
			for (; this.#N(););
		}
		get concurrency() {
			return this.#g;
		}
		set concurrency(e) {
			if (!(typeof e == "number" && e >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`);
			this.#g = e, this.#I();
		}
		setPriority(e, t) {
			if (typeof t != "number" || !Number.isFinite(t)) throw TypeError(`Expected \`priority\` to be a finite number, got \`${t}\` (${typeof t})`);
			this.#p.setPriority(e, t);
		}
		async add(e, t = {}) {
			if (t = {
				timeout: this.timeout,
				...t,
				id: t.id ?? (this.#v++).toString()
			}, t.timeout !== void 0 && !(Number.isFinite(t.timeout) && t.timeout > 0)) throw TypeError(`Expected \`timeout\` to be a positive finite number, got \`${t.timeout}\` (${typeof t.timeout})`);
			return new Promise((n, r) => {
				let i = Symbol(`task-${t.id}`), a = () => void 0, o = async () => {
					a(), this.#h++, this.#y.set(i, {
						id: t.id,
						priority: t.priority ?? 0,
						startTime: Date.now(),
						timeout: t.timeout
					});
					let o;
					try {
						try {
							t.signal?.throwIfAborted();
						} catch (e) {
							throw this.#B(), this.#y.delete(i), e;
						}
						let r = e({ signal: t.signal });
						if (t.timeout !== void 0 && (r = as(Promise.resolve(r), {
							milliseconds: t.timeout,
							message: `Task timed out after ${t.timeout}ms (queue has ${this.#h} running, ${this.#p.size} waiting)`
						})), t.signal) {
							let { signal: e } = t;
							r = Promise.race([r, new Promise((t, n) => {
								o = () => {
									n(e.reason);
								}, e.addEventListener("abort", o, { once: !0 });
							})]);
						}
						let a = await r;
						n(a), this.emit("completed", a);
					} catch (e) {
						r(e), this.emit("error", e);
					} finally {
						o && t.signal?.removeEventListener("abort", o), this.#y.delete(i), queueMicrotask(() => {
							this.#D();
						});
					}
				};
				this.#p.enqueue(o, t);
				let s = () => {
					if (this.#p instanceof fs) {
						this.#p.remove(o);
						return;
					}
					this.#p.remove?.(t.id);
				};
				if (t.signal) {
					let { signal: e } = t, n = () => {
						a(), s(), r(e.reason), this.#N(), this.emit("next");
					};
					if (a = () => {
						e.removeEventListener("abort", n), this.#b.delete(a);
					}, e.aborted) {
						n();
						return;
					}
					e.addEventListener("abort", n, { once: !0 }), this.#b.add(a);
				}
				this.emit("add"), this.#N();
			});
		}
		async addAll(e, t) {
			return Promise.all(e.map(async (e) => this.add(e, t)));
		}
		start() {
			return this.#_ ? (this.#_ = !1, this.#I(), this) : this;
		}
		pause() {
			this.#_ = !0;
		}
		clear() {
			for (let e of this.#b) e();
			this.#p = new this.#m(), this.#j(), this.#V(), this.emit("empty"), this.#h === 0 && (this.#M(), this.emit("idle")), this.emit("next");
		}
		async onEmpty() {
			this.#p.size !== 0 && await this.#L("empty");
		}
		async onSizeLessThan(e) {
			this.#p.size < e || await this.#L(["next", "active"], () => this.#p.size < e);
		}
		async onIdle() {
			(this.#h !== 0 || this.#p.size !== 0) && await this.#L("idle");
		}
		async onPendingZero() {
			this.#h !== 0 && await this.#L("pendingZero");
		}
		async onRateLimit() {
			this.isRateLimited || await this.#L("rateLimit");
		}
		async onRateLimitCleared() {
			this.isRateLimited && await this.#L("rateLimitCleared");
		}
		onError() {
			return new Promise((e, t) => {
				let n = (e) => {
					this.off("error", n), t(e);
				};
				this.on("error", n);
			});
		}
		async #L(e, t) {
			let n = Array.isArray(e) ? e : [e];
			return new Promise((e) => {
				let r = () => {
					if (!t || t()) {
						for (let e of n) this.off(e, r);
						e();
					}
				};
				for (let e of n) this.on(e, r);
			});
		}
		get size() {
			return this.#p.size;
		}
		sizeBy(e) {
			return this.#p.filter(e).length;
		}
		get pending() {
			return this.#h;
		}
		get isPaused() {
			return this.#_;
		}
		#R() {
			this.#t || (this.on("add", () => {
				this.#p.size > 0 && this.#z();
			}), this.on("next", () => {
				this.#z();
			}));
		}
		#z() {
			this.#t || this.#a || (this.#a = !0, queueMicrotask(() => {
				this.#a = !1, this.#V();
			}));
		}
		#B() {
			this.#t || (this.#C(), this.#z());
		}
		#V() {
			let e = this.#i;
			if (this.#t || this.#p.size === 0) {
				e && (this.#i = !1, this.emit("rateLimitCleared"));
				return;
			}
			let t;
			if (this.#u) {
				let e = Date.now();
				this.#x(e), t = this.#w();
			} else t = this.#n;
			let n = t >= this.#r;
			n !== e && (this.#i = n, this.emit(n ? "rateLimit" : "rateLimitCleared"));
		}
		get isRateLimited() {
			return this.#i;
		}
		get isSaturated() {
			return this.#h === this.#g && this.#p.size > 0 || this.isRateLimited && this.#p.size > 0;
		}
		get runningTasks() {
			return [...this.#y.values()].map((e) => ({
				...e,
				timeoutRemaining: e.timeout ? Math.max(0, e.startTime + e.timeout - Date.now()) : void 0
			}));
		}
	};
})), gs, _s = o((() => {
	gs = (e) => e.map((e) => ({ ...e }));
})), vs, ys, bs = o((() => {
	hs(), _s(), vs = async (e, t, n, r, i) => {
		let a = [], o = n.cached ? n.nextPagePath : n.id;
		for (; o;) {
			let e = await r(o);
			a = a.concat(e.items), o = e.nextPagePath;
		}
		let s = a.filter((e) => e.isFolder === !0), c = a.filter((e) => e.isFolder === !1), l = s.map((e) => ({
			type: "folder",
			id: e.requestPath,
			cached: !1,
			nextPagePath: null,
			status: "checked",
			parentId: n.id,
			data: e
		})), u = c.map((e) => {
			let t = i(e);
			return {
				type: "file",
				id: e.requestPath,
				restrictionError: t,
				status: t ? "unchecked" : "checked",
				parentId: n.id,
				data: e
			};
		});
		n.cached = !0, n.nextPagePath = null, t.push(...u, ...l), l.forEach(async (n) => {
			e.add(() => vs(e, t, n, r, i));
		});
	}, ys = async (e, t, n, r) => {
		let i = new ms({ concurrency: 6 }), a = gs(e);
		return a.filter((e) => e.type === "folder" && e.status === "checked" && (e.cached === !1 || e.nextPagePath)).forEach((e) => {
			i.add(() => vs(i, a, e, t, n));
		}), i.on("completed", () => {
			let e = a.filter((e) => e.type === "file" && e.status === "checked").length;
			r(e);
		}), await i.onIdle(), a;
	};
})), xs, Ss = o((() => {
	xs = (e, t, n, r, i) => {
		let a = t.filter((t) => !e.find((e) => e.id === t.requestPath)), o = a.filter((e) => e.isFolder === !0), s = a.filter((e) => e.isFolder === !1), c = n.type === "folder" && n.status === "checked", l = o.map((e) => ({
			type: "folder",
			id: e.requestPath,
			cached: !1,
			nextPagePath: null,
			status: c ? "checked" : "unchecked",
			parentId: n.id,
			data: e
		})), u = s.map((e) => {
			let t = i(e);
			return {
				type: "file",
				id: e.requestPath,
				restrictionError: t,
				status: c && !t ? "checked" : "unchecked",
				parentId: n.id,
				data: e
			};
		}), d = {
			...n,
			cached: !0,
			nextPagePath: r
		};
		return [
			...e.map((e) => e.id === d.id ? d : e),
			...l,
			...u
		];
	};
})), Cs, ws = o((() => {
	Cs = (e, t, n, r, i) => {
		let a = e.find((e) => e.id === t), o = n.filter((e) => e.isFolder === !0), s = n.filter((e) => e.isFolder === !1), c = {
			...a,
			nextPagePath: r
		}, l = e.map((e) => e.id === c.id ? c : e), u = c.type === "folder" && c.status === "checked", d = o.map((e) => ({
			type: "folder",
			id: e.requestPath,
			cached: !1,
			nextPagePath: null,
			status: u ? "checked" : "unchecked",
			parentId: c.id,
			data: e
		})), f = s.map((e) => {
			let t = i(e);
			return {
				type: "file",
				id: e.requestPath,
				restrictionError: t,
				status: u && !t ? "checked" : "unchecked",
				parentId: c.id,
				data: e
			};
		});
		return [
			...l,
			...d,
			...f
		];
	};
})), Ts, Es, Ds, Os = o((() => {
	_s(), Ts = (e, t, n) => {
		e.filter((e) => e.type !== "root" && e.parentId === t).forEach((t) => {
			t.status = n && !(t.type === "file" && t.restrictionError) ? "checked" : "unchecked", Ts(e, t.id, n);
		});
	}, Es = (e, t) => {
		let n = e.find((e) => e.id === t);
		if (n.type === "root") return;
		let r = e.filter((e) => e.type !== "root" && e.parentId === n.id && !(e.type === "file" && e.restrictionError)), i = r.every((e) => e.status === "checked"), a = r.every((e) => e.status === "unchecked");
		n.status = i && n.cached ? "checked" : a ? "unchecked" : "partial", Es(e, n.parentId);
	}, Ds = (e, t) => {
		let n = gs(e), r = n.filter((e) => e.type !== "root" && t.includes(e.id));
		return r.forEach((e) => {
			let t = e.status === "checked" ? "unchecked" : "checked";
			e.status = e.type === "file" && e.restrictionError ? "unchecked" : t, Ts(n, e.id, e.status === "checked");
		}), Es(n, r[0].parentId), n;
	};
})), ks, As = o((() => {
	bs(), Ss(), ws(), Os(), ks = {
		afterOpenFolder: xs,
		afterScrollFolder: Cs,
		afterToggleCheckbox: Ds,
		afterFill: ys
	};
})), js, Ms = o((() => {
	js = (e) => {
		let { scrollHeight: t, scrollTop: n, offsetHeight: r } = e.target;
		return t - (n + r) < 50;
	};
})), Ns, Ps, Fs = o((() => {
	K(), Ns = /* @__PURE__ */ u(Ja(), 1), _o(), Ps = ({ i18n: e, item: t, toggleCheckbox: n, openFolder: r }) => {
		let i = "restrictionError" in t && t.restrictionError != null && t.status !== "checked";
		return G("li", {
			className: (0, Ns.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": i }, { "uppy-ProviderBrowserItem--noPreview": t.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": t.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": t.status === "partial" }),
			title: ("restrictionError" in t ? t.restrictionError : void 0) ?? void 0,
			children: [G("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox",
				onChange: () => n(t, !1),
				checked: t.status === "checked",
				"aria-label": t.data.name ?? e("unnamed"),
				disabled: i,
				"data-uppy-super-focusable": !0
			}), G("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				disabled: i,
				"aria-label": t.data.name,
				onClick: () => {
					t.data.isFolder && r(t.id);
				},
				children: [G("div", {
					className: "uppy-ProviderBrowserItem-iconWrap",
					children: G(go, { itemIconString: t.data.icon })
				}), t.data.name ?? e("unnamed")]
			})]
		});
	};
})), Is, Ls = o((() => {
	K(), Fs(), Is = ({ searchResults: e, toggleCheckbox: t, openFolder: n, i18n: r }) => e.length === 0 ? G("div", {
		className: "uppy-Provider-empty",
		children: r("noFilesFound")
	}) : G("div", {
		className: "uppy-ProviderBrowser-body",
		children: G("ul", {
			className: "uppy-ProviderBrowser-list",
			children: e.map((e) => G(Ps, {
				i18n: r,
				item: e,
				toggleCheckbox: t,
				openFolder: n
			}, e.id))
		})
	});
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Breadcrumbs.js
function Rs(e) {
	let { openFolder: t, title: n, breadcrumbsIcon: r, breadcrumbs: i, i18n: a, disabled: o = !1 } = e;
	return G("div", {
		className: "uppy-Provider-breadcrumbs",
		children: [G("div", {
			className: "uppy-Provider-breadcrumbsIcon",
			children: r
		}), i.map((e, r) => {
			let s = e.type === "root" ? n : e.data.name ?? a("unnamed"), c = i.length === r + 1;
			return G(H, { children: [G("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				onClick: c ? void 0 : () => t(e.id),
				"aria-current": c ? "page" : void 0,
				disabled: !c && o,
				title: s,
				children: s
			}), !c && G("span", {
				"aria-hidden": "true",
				className: "uppy-Provider-breadcrumbsSeparator",
				children: "/"
			})] }, e.id);
		})]
	});
}
var zs = o((() => {
	K(), dn();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/User.js
function Bs({ i18n: e, logout: t, username: n, disabled: r = !1 }) {
	return G(H, { children: [n && G("span", {
		className: "uppy-ProviderBrowser-user",
		children: n
	}, "username"), G("button", {
		type: "button",
		onClick: t,
		disabled: r,
		className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
		children: e("logOut")
	}, "logout")] });
}
var Vs = o((() => {
	K(), dn();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/Header.js
function Hs(e) {
	let t = e.toolbarActions ?? [], n = e.busy ?? !1;
	return G("div", {
		className: "uppy-ProviderBrowser-header",
		children: G("div", {
			className: (0, Us.default)("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple"),
			children: [
				e.showBreadcrumbs && G(Rs, {
					openFolder: e.openFolder,
					breadcrumbs: e.breadcrumbs,
					breadcrumbsIcon: e.pluginIcon?.(),
					title: e.title,
					i18n: e.i18n,
					disabled: n
				}),
				(t.length > 0 || e.selectionToggle) && G("div", {
					className: "uppy-ProviderBrowser-toolbar",
					children: [e.selectionToggle && G("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: e.selectionToggle.onToggle,
						disabled: n,
						children: e.selectionToggle.active ? e.i18n("cancelSelection") : e.i18n("selectMultiple")
					}), t.map((t) => G("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: () => e.runToolbarAction?.(t),
						disabled: n,
						children: t.label
					}, t.id))]
				}),
				!e.standalone && G(Bs, {
					logout: e.logout,
					username: e.username,
					i18n: e.i18n,
					disabled: n
				})
			]
		})
	});
}
var Us, Ws = o((() => {
	K(), Us = /* @__PURE__ */ u(Ja(), 1), zs(), Vs();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/ProviderView.js
function Gs() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "30",
		height: "30",
		viewBox: "0 0 30 30",
		children: G("path", { d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z" })
	});
}
function Ks(e, t) {
	let n = [t], r = e.get(t.parentId);
	for (; r && r.type !== "root";) n.push(r), r = e.get(r.parentId);
	return n;
}
var qs, Js, Ys, Xs, Zs = o((() => {
	K(), qs = /* @__PURE__ */ u(Ja(), 1), Js = /* @__PURE__ */ u(br(), 1), Ur(), Fi(), Za(), b(), X(), Eo(), ko(), oi(), Po(), Lo(), Bo(), Ho(), Ko(), Jo(), Xo(), Qo(), ts(), jo(), As(), Ms(), Va(), Ls(), Ws(), Ys = (e) => ({
		authenticated: void 0,
		partialTree: [{
			type: "root",
			id: e,
			cached: !1,
			nextPagePath: null
		}],
		currentFolderId: e,
		searchString: "",
		didFirstRender: !1,
		username: null,
		loading: !1,
		selectionActive: !1,
		detailItemId: void 0
	}), Xs = class e {
		static VERSION = Hr.version;
		static [Symbol.for("uppy test: searchDebounceMs")];
		plugin;
		provider;
		opts;
		isHandlingScroll = !1;
		previousCheckbox = null;
		#e;
		constructor(t, n) {
			this.plugin = t, this.provider = n.provider, this.#c = new Vo(t);
			let r = {
				viewType: "list",
				showTitles: !0,
				showFilter: !0,
				showBreadcrumbs: !0,
				loadAllFiles: !1,
				virtualList: !1
			};
			this.opts = {
				...r,
				...n
			}, this.openFolder = this.openFolder.bind(this), this.logout = this.logout.bind(this), this.handleAuth = this.handleAuth.bind(this), this.handleScroll = this.handleScroll.bind(this), this.resetPluginState = this.resetPluginState.bind(this), this.donePicking = this.donePicking.bind(this), this.render = this.render.bind(this), this.cancelSelection = this.cancelSelection.bind(this), this.toggleCheckbox = this.toggleCheckbox.bind(this), this.openSearchResultFolder = this.openSearchResultFolder.bind(this), this.clearSearchState = this.clearSearchState.bind(this), this.resetPluginState(), this.plugin.uppy.on("dashboard:close-panel", this.resetPluginState), this.plugin.uppy.registerRequestClient(this.provider.provider, this.provider);
			let i = e[Symbol.for("uppy test: searchDebounceMs")], a = i ?? 500, o = i === 0 ? {
				leading: !0,
				trailing: !0
			} : void 0;
			this.#e = (0, Js.default)(this.#f, a, o);
		}
		resetPluginState() {
			this.#s.clear(), this.#c.cancel(), this.plugin.setPluginState(Ys(this.plugin.rootFolderId));
		}
		refreshCurrentFolder = async (e = !1) => {
			let { partialTree: t, currentFolderId: n } = this.plugin.getPluginState();
			if (t == null || this.#i) return;
			let r = ++this.#o, i = t.flatMap((e) => e.type !== "root" && e.parentId === n && e.status === "checked" ? [e.id] : []), a = new Map(t.map((e) => [e.id, e])), o = (e) => Ks(a, e).some(({ parentId: e }) => e === n), s = new Set(Zo(t, n).map((e) => e.id)), c = t.filter((e) => e.type === "root" || !o(e)).filter((t) => !e || s.has(t.id)).map((t) => (e || t.id === n) && t.type !== "file" ? {
				...t,
				status: "unchecked",
				cached: !1,
				nextPagePath: null
			} : t);
			this.plugin.setPluginState({ partialTree: c }), await this.openFolder(n);
			let { partialTree: l, detailItemId: u } = this.plugin.getPluginState();
			if (l == null) return;
			let d = l.some((e) => e.id === n && e.type !== "file" && e.cached);
			r === this.#o && d && u && !l.some(({ id: e }) => e === u) && this.closeItemDetail();
			let f = i.filter((e) => l.some((t) => t.type !== "root" && t.id === e && t.status !== "checked"));
			f.length > 0 && this.plugin.setPluginState({ partialTree: ks.afterToggleCheckbox(l, f) });
		};
		runAction = (e, t) => this.#n(e, () => e.run({
			item: t,
			...this.#t()
		}));
		runToolbarAction = (e) => this.#n(e, () => e.run({
			currentFolderId: this.plugin.getPluginState().currentFolderId,
			...this.#t()
		}));
		#t = () => {
			let { uppy: e } = this.plugin;
			return {
				view: this,
				uppy: e,
				i18n: e.i18n
			};
		};
		async #n({ refresh: e }, t) {
			try {
				if (await t() === !1) return;
			} catch (e) {
				this.#r(e);
			}
			e !== !1 && await this.refreshCurrentFolder(!0);
		}
		#r(e) {
			let { uppy: t } = this.plugin;
			if (He(e)) {
				t.log("[ProviderView] action cancelled", "warning");
				return;
			}
			t.log(`[ProviderView] action failed: ${Me(e)}`, "error");
			let n = e instanceof Error && e.name === "UserFacingApiError" ? Ya(t.i18n, e) : e instanceof y || Ni(e) ? t.i18n("companionError") : t.i18n("actionFailed");
			t.info(n, "error", 5e3);
		}
		#i;
		async runWithProgress(e) {
			try {
				await this.#u(async (t) => {
					let n = this.#l;
					this.#i = () => n?.abort(), this.setLoading(!0), await e({
						signal: t,
						setProgress: (e) => this.setLoading(e)
					});
				});
			} finally {
				this.#i = void 0, this.setLoading(!1);
			}
		}
		toggleSelectionMode = () => {
			let { selectionActive: e } = this.plugin.getPluginState();
			e && this.cancelSelection(), this.plugin.setPluginState({ selectionActive: !e });
		};
		#a;
		#o = 0;
		openItemDetail = (e) => {
			this.#a = e, this.plugin.setPluginState({ detailItemId: e.id });
		};
		closeItemDetail = () => {
			this.plugin.setPluginState({ detailItemId: void 0 });
		};
		#s = /* @__PURE__ */ new Set();
		getBulkActionItems = () => {
			let { partialTree: e } = this.plugin.getPluginState(), t = new Map(e.map((e) => [e.id, e])), n = e.filter((e) => e.type !== "root" && e.status === "checked" && (e.type === "file" || Ks(t, e).some(({ id: e }) => this.#s.has(e)))), r = new Set(n.map((e) => e.id));
			return n.filter((e) => !Ks(t, e).slice(1).some(({ id: e }) => r.has(e)));
		};
		runBulkAction = (e) => this.#n(e, async () => {
			let t = this.getBulkActionItems();
			if (t.length === 0) return !1;
			let n = await e.run({
				items: t,
				...this.#t()
			});
			return n !== !1 && this.cancelSelection(), n;
		});
		#c;
		prompt(e) {
			return this.#c.prompt(e);
		}
		confirm(e) {
			return this.#c.confirm(e);
		}
		tearDown() {}
		setLoading(e) {
			this.plugin.setPluginState({ loading: e });
		}
		get isLoading() {
			return this.plugin.getPluginState().loading;
		}
		cancelSelection() {
			this.#s.clear();
			let { partialTree: e } = this.plugin.getPluginState(), t = e.map((e) => e.type === "root" ? e : {
				...e,
				status: "unchecked"
			});
			this.plugin.setPluginState({ partialTree: t });
		}
		clearSearchState() {
			this.plugin.setPluginState({ searchResults: void 0 });
		}
		#l;
		async #u(e) {
			this.#l?.abort();
			let t = new AbortController();
			this.#l = t;
			let n = () => {
				t.abort();
			};
			try {
				this.plugin.uppy.on("dashboard:close-panel", n), this.plugin.uppy.on("cancel-all", n), await e(t.signal);
			} finally {
				this.#l === t && (this.#l = void 0), this.plugin.uppy.off("dashboard:close-panel", n), this.plugin.uppy.off("cancel-all", n);
			}
		}
		#d() {
			this.#i === void 0 && this.setLoading(!1);
		}
		async #f() {
			let { partialTree: e, currentFolderId: t, searchString: n } = this.plugin.getPluginState(), r = e.find((e) => e.id === t);
			if (n.trim() === "") {
				this.#l?.abort(), this.clearSearchState();
				return;
			}
			this.setLoading(!0), await this.#u(async (e) => {
				let i = r.type === "root" ? void 0 : t, { items: a } = await this.provider.search(n, {
					signal: e,
					path: i
				}), { partialTree: o } = this.plugin.getPluginState(), s = [...o];
				for (let e of a) {
					let t = decodeURIComponent(e.requestPath).split("/").filter((e) => e.length > 0), n = this.plugin.rootFolderId, r;
					t.forEach((i, a, o) => {
						let c = t.slice(0, a + 1), l = encodeURIComponent(`/${c.join("/")}`), u = s.find((e) => e.id === l && e.type !== "root");
						if (u) {
							n = l, r = u.status === "checked";
							return;
						}
						let d = a === o.length - 1, f, p = r ? "checked" : "unchecked";
						if (d) {
							if (e.isFolder) f = {
								type: "folder",
								id: l,
								cached: !1,
								nextPagePath: null,
								status: p,
								parentId: n,
								data: e
							};
							else {
								let t = this.validateSingleFile(e);
								f = {
									type: "file",
									id: l,
									restrictionError: t,
									status: t ? "unchecked" : p,
									parentId: n,
									data: e
								};
							}
						} else f = {
							type: "folder",
							id: l,
							cached: !1,
							nextPagePath: null,
							status: p,
							parentId: n,
							data: {
								name: decodeURIComponent(i),
								icon: "folder",
								isFolder: !0
							}
						};
						s.push(f), n = l, r = p === "checked";
					});
				}
				this.plugin.setPluginState({
					partialTree: s,
					searchResults: a.map((e) => e.requestPath)
				});
			}).catch(Yo(this.plugin.uppy)), this.#d();
		}
		onSearchInput = (e) => {
			this.plugin.setPluginState({ searchString: e }), this.opts.supportsSearch && this.#e();
		};
		async openSearchResultFolder(e) {
			this.plugin.setPluginState({ searchString: "" }), await this.openFolder(e);
		}
		async openFolder(e) {
			this.clearSearchState(), this.previousCheckbox = null;
			let { partialTree: t } = this.plugin.getPluginState(), n = t.find((t) => t.id === e);
			if (n.cached) {
				this.plugin.setPluginState({
					currentFolderId: e,
					searchString: ""
				});
				return;
			}
			this.setLoading(!0), await this.#u(async (r) => {
				let i = e, a = [];
				do {
					let { username: e, nextPagePath: t, items: n } = await this.provider.list(i, { signal: r });
					this.plugin.setPluginState({ username: e }), i = t, a = a.concat(n), this.setLoading(this.plugin.uppy.i18n("loadedXFiles", { numFiles: a.length }));
				} while (this.opts.loadAllFiles && i);
				let o = ks.afterOpenFolder(t, a, n, i, this.validateSingleFile);
				this.plugin.setPluginState({
					partialTree: o,
					currentFolderId: e,
					searchString: ""
				});
			}).catch(Yo(this.plugin.uppy)), this.#d();
		}
		async logout() {
			this.#s.clear(), await this.#u(async (e) => {
				let t = await this.provider.logout({ signal: e });
				if (t.ok) {
					if (!t.revoked) {
						let e = this.plugin.uppy.i18n("companionUnauthorizeHint", {
							provider: this.plugin.title,
							url: t.manual_revoke_url
						});
						this.plugin.uppy.info(e, "info", 7e3);
					}
					this.plugin.setPluginState({
						...Ys(this.plugin.rootFolderId),
						authenticated: !1
					});
				}
			}).catch(Yo(this.plugin.uppy));
		}
		async handleAuth(e) {
			await this.#u(async (t) => {
				this.setLoading(!0), await this.provider.login({
					authFormData: e,
					signal: t
				}), this.plugin.setPluginState({ authenticated: !0 }), await Promise.all([this.provider.fetchPreAuthToken(), this.openFolder(this.plugin.rootFolderId)]);
			}).catch(Yo(this.plugin.uppy)), this.#d();
		}
		async handleScroll(e) {
			js(e) && await this.loadNextPage();
		}
		#p;
		loadNextPage() {
			return this.#p ||= this.#m().finally(() => {
				this.#p = void 0;
			}), this.#p;
		}
		async #m() {
			let { partialTree: e, currentFolderId: t } = this.plugin.getPluginState(), n = e.find((e) => e.id === t);
			if (n && n.type !== "file" && n.nextPagePath) {
				let e = n.nextPagePath, r = !1;
				return this.isHandlingScroll = !0, await this.#u(async (n) => {
					let { nextPagePath: i, items: a } = await this.provider.list(e, { signal: n }), o = this.plugin.getPluginState();
					if (n.aborted || o.currentFolderId !== t) return;
					let s = ks.afterScrollFolder(o.partialTree, t, a, i, this.validateSingleFile);
					this.plugin.setPluginState({ partialTree: s }), r = !0;
				}).catch(Yo(this.plugin.uppy)), this.isHandlingScroll = !1, r;
			}
			return !1;
		}
		validateSingleFile = (e) => {
			let t = st(e);
			return this.plugin.uppy.validateSingleFile(t);
		};
		async donePicking() {
			let { partialTree: e } = this.plugin.getPluginState();
			this.isLoading || (this.setLoading(!0), await this.#u(async (t) => {
				let n = await ks.afterFill(e, (e) => this.provider.list(e, { signal: t }), this.validateSingleFile, (e) => {
					this.setLoading(this.plugin.uppy.i18n("addedNumFiles", { numFiles: e }));
				});
				if (this.validateAggregateRestrictions(n)) {
					this.plugin.setPluginState({ partialTree: n });
					return;
				}
				let r = es(n);
				Go(r, this.plugin, this.provider), this.resetPluginState();
			}).catch(Yo(this.plugin.uppy)), this.#d());
		}
		toggleCheckbox(e, t) {
			let { partialTree: n } = this.plugin.getPluginState(), r = qo(e.id, this.getDisplayedPartialTree(), t, this.previousCheckbox), i = ks.afterToggleCheckbox(n, r), a = new Map(i.map((e) => [e.id, e.type === "root" ? void 0 : e.status]));
			for (let e of r) a.get(e) === "checked" && this.#s.add(e);
			for (let e of this.#s) {
				let t = a.get(e);
				(t === void 0 || t === "unchecked") && this.#s.delete(e);
			}
			this.plugin.setPluginState({ partialTree: i }), this.previousCheckbox = e.id;
		}
		getDisplayedPartialTree = () => {
			let { partialTree: e, currentFolderId: t, searchString: n } = this.plugin.getPluginState(), r = e.filter((e) => e.type !== "root" && e.parentId === t);
			return this.opts.supportsSearch || n.trim() === "" ? r : r.filter((e) => (e.data.name ?? this.plugin.uppy.i18n("unnamed")).toLowerCase().indexOf(n.trim().toLowerCase()) !== -1);
		};
		getBreadcrumbs = () => {
			let { partialTree: e, currentFolderId: t } = this.plugin.getPluginState();
			return Zo(e, t);
		};
		getSelectedAmount = () => {
			let { partialTree: e } = this.plugin.getPluginState();
			return Ao(e);
		};
		validateAggregateRestrictions = (e) => {
			let t = e.filter((e) => e.type === "file" && e.status === "checked").map((e) => e.data);
			return this.plugin.uppy.validateAggregateRestrictions(t);
		};
		#h() {
			let { i18n: e } = this.plugin.uppy, { searchResults: t, partialTree: n } = this.plugin.getPluginState(), r = /* @__PURE__ */ new Map();
			n.forEach((e) => {
				e.type !== "root" && r.set(e.id, e);
			});
			let i = t.map((e) => {
				let t = r.get(e);
				if (t == null) throw Error("Partial tree not complete");
				return t;
			});
			return G(Is, {
				searchResults: i,
				openFolder: this.openSearchResultFolder,
				toggleCheckbox: this.toggleCheckbox,
				i18n: e
			});
		}
		render(e, t = {}) {
			let { didFirstRender: n } = this.plugin.getPluginState(), { i18n: r } = this.plugin.uppy;
			n || (this.plugin.setPluginState({ didFirstRender: !0 }), this.provider.fetchPreAuthToken(), this.openFolder(this.plugin.rootFolderId));
			let i = {
				...this.opts,
				...t
			}, { authenticated: a, loading: o } = this.plugin.getPluginState(), s = this.plugin.icon || Gs;
			if (a === !1) return G(za, {
				pluginName: this.plugin.title,
				pluginIcon: s,
				handleAuth: this.handleAuth,
				i18n: this.plugin.uppy.i18n,
				renderForm: i.renderAuthForm,
				loading: o
			});
			let { partialTree: c, currentFolderId: l, username: u, searchString: d, searchResults: f, dialog: p, selectionActive: m = !1, detailItemId: h } = this.plugin.getPluginState(), g = this.getBreadcrumbs(), _ = i.mode === "manager", v = !_ || m, y = this.#i !== void 0, b = c.find(({ id: e }) => e === l), x = b?.type !== "file" && b?.cached === !0 && !c.some((e) => e.type !== "root" && e.parentId === l);
			h && (this.#a = c.find((e) => e.type !== "root" && e.id === h) ?? this.#a);
			let S = this.#a?.id === h ? this.#a : void 0;
			return G("div", {
				className: (0, qs.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${i.viewType}`),
				children: [
					G(Hs, {
						showBreadcrumbs: i.showBreadcrumbs,
						openFolder: this.openFolder,
						breadcrumbs: g,
						pluginIcon: s,
						title: this.plugin.title,
						logout: this.logout,
						username: u,
						i18n: r,
						toolbarActions: i.toolbarActions ?? [],
						runToolbarAction: this.runToolbarAction,
						standalone: i.standalone ?? !1,
						selectionToggle: _ && (i.bulkActions?.length ?? 0) > 0 && (m || !x) ? {
							active: m,
							onToggle: this.toggleSelectionMode
						} : void 0,
						busy: y
					}),
					i.showFilter && G(ai, {
						value: d,
						onChange: (e) => this.onSearchInput(e),
						onSubmit: () => {},
						inputLabel: r("filter"),
						i18n: r,
						disabled: y
					}),
					f ? this.#h() : G(To, {
						toggleCheckbox: this.toggleCheckbox,
						displayedPartialTree: this.getDisplayedPartialTree(),
						openFolder: this.openFolder,
						virtualList: i.virtualList,
						noResultsLabel: r("noFilesFound"),
						handleScroll: this.handleScroll,
						viewType: i.viewType,
						showTitles: i.showTitles,
						i18n: this.plugin.uppy.i18n,
						isLoading: o,
						onCancelLoading: this.#i,
						utmSource: "Companion",
						actions: i.actions ?? [],
						runAction: this.runAction,
						selectable: v,
						onFileClick: _ && !m ? this.openItemDetail : void 0
					}),
					y ? null : _ ? m && G(Do, {
						selectedCount: this.getBulkActionItems().length,
						bulkActions: i.bulkActions ?? [],
						runBulkAction: this.runBulkAction,
						i18n: r
					}) : G(Mo, {
						partialTree: c,
						donePicking: this.donePicking,
						cancelSelection: this.cancelSelection,
						i18n: r,
						validateAggregateRestrictions: this.validateAggregateRestrictions
					}),
					S && G(Fo, {
						item: S,
						actions: i.actions ?? [],
						runAction: this.runAction,
						getPreviewUrl: i.getPreviewUrl,
						onClose: this.closeItemDetail,
						i18n: r
					}, S.id),
					p && G(Ro, {
						dialog: p,
						i18n: r,
						onConfirm: this.#c.submit,
						onCancel: this.#c.cancel
					}, this.#c.revision)
				]
			});
		}
	};
})), Qs = o((() => {
	Zs();
}));
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/SearchView.js
function $s({ value: e, onChange: t, onSubmit: n, inputLabel: r, loading: i = !1, children: a }) {
	let { formId: o } = ri(n);
	return G("section", {
		className: "uppy-SearchProvider",
		children: [G("input", {
			className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
			type: "search",
			"aria-label": r,
			placeholder: r,
			value: e,
			onInput: (e) => t(e.target.value),
			form: o,
			disabled: i,
			"data-uppy-super-focusable": !0
		}), G("button", {
			disabled: i,
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
			type: "submit",
			form: o,
			children: a
		})]
	});
}
var ec = o((() => {
	K(), ii();
})), tc = o((() => {
	oi(), qa(), Wa(), Qs(), K(), Ur(), X(), Eo(), Po(), ec(), Ko(), Jo(), Xo(), ts(), As(), Ms(), ii();
}));
//#endregion
//#region node_modules/exifr/dist/mini.esm.mjs
function Q(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var nc = typeof self < "u" ? self : global, rc = typeof navigator < "u", ic = rc && typeof HTMLImageElement > "u", ac = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), oc = nc.Buffer, sc = !!oc, cc = (e) => e !== void 0;
function lc(e) {
	return e === void 0 || (e instanceof Map ? e.size === 0 : Object.values(e).filter(cc).length === 0);
}
function uc(e) {
	let t = Error(e);
	throw delete t.stack, t;
}
function dc(e) {
	let t = function(e) {
		let t = 0;
		return e.ifd0.enabled && (t += 1024), e.exif.enabled && (t += 2048), e.makerNote && (t += 2048), e.userComment && (t += 1024), e.gps.enabled && (t += 512), e.interop.enabled && (t += 100), e.ifd1.enabled && (t += 1024), t + 2048;
	}(e);
	return e.jfif.enabled && (t += 50), e.xmp.enabled && (t += 2e4), e.iptc.enabled && (t += 14e3), e.icc.enabled && (t += 6e3), t;
}
var fc = (e) => String.fromCharCode.apply(null, e), pc = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0, mc = class e {
	static from(t, n) {
		return t instanceof this && t.le === n ? t : new e(t, void 0, void 0, n);
	}
	constructor(t, n = 0, r, i) {
		if (typeof i == "boolean" && (this.le = i), Array.isArray(t) && (t = new Uint8Array(t)), t === 0) this.byteOffset = 0, this.byteLength = 0;
		else if (t instanceof ArrayBuffer) {
			r === void 0 && (r = t.byteLength - n);
			let e = new DataView(t, n, r);
			this._swapDataView(e);
		} else if (t instanceof Uint8Array || t instanceof DataView || t instanceof e) {
			r === void 0 && (r = t.byteLength - n), (n += t.byteOffset) + r > t.byteOffset + t.byteLength && uc("Creating view outside of available memory in ArrayBuffer");
			let e = new DataView(t.buffer, n, r);
			this._swapDataView(e);
		} else if (typeof t == "number") {
			let e = new DataView(new ArrayBuffer(t));
			this._swapDataView(e);
		} else uc("Invalid input argument for BufferView: " + t);
	}
	_swapArrayBuffer(e) {
		this._swapDataView(new DataView(e));
	}
	_swapBuffer(e) {
		this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength));
	}
	_swapDataView(e) {
		this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength;
	}
	_lengthToEnd(e) {
		return this.byteLength - e;
	}
	set(t, n, r = e) {
		return t instanceof DataView || t instanceof e ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array || uc("BufferView.set(): Invalid data argument."), this.toUint8().set(t, n), new r(this, n, t.byteLength);
	}
	subarray(t, n) {
		return n ||= this._lengthToEnd(t), new e(this, t, n);
	}
	toUint8() {
		return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
	}
	getUint8Array(e, t) {
		return new Uint8Array(this.buffer, this.byteOffset + e, t);
	}
	getString(e = 0, t = this.byteLength) {
		return n = this.getUint8Array(e, t), pc ? pc.decode(n) : sc ? Buffer.from(n).toString("utf8") : decodeURIComponent(escape(fc(n)));
		var n;
	}
	getLatin1String(e = 0, t = this.byteLength) {
		return fc(this.getUint8Array(e, t));
	}
	getUnicodeString(e = 0, t = this.byteLength) {
		let n = [];
		for (let r = 0; r < t && e + r < this.byteLength; r += 2) n.push(this.getUint16(e + r));
		return fc(n);
	}
	getInt8(e) {
		return this.dataView.getInt8(e);
	}
	getUint8(e) {
		return this.dataView.getUint8(e);
	}
	getInt16(e, t = this.le) {
		return this.dataView.getInt16(e, t);
	}
	getInt32(e, t = this.le) {
		return this.dataView.getInt32(e, t);
	}
	getUint16(e, t = this.le) {
		return this.dataView.getUint16(e, t);
	}
	getUint32(e, t = this.le) {
		return this.dataView.getUint32(e, t);
	}
	getFloat32(e, t = this.le) {
		return this.dataView.getFloat32(e, t);
	}
	getFloat64(e, t = this.le) {
		return this.dataView.getFloat64(e, t);
	}
	getFloat(e, t = this.le) {
		return this.dataView.getFloat32(e, t);
	}
	getDouble(e, t = this.le) {
		return this.dataView.getFloat64(e, t);
	}
	getUintBytes(e, t, n) {
		switch (t) {
			case 1: return this.getUint8(e, n);
			case 2: return this.getUint16(e, n);
			case 4: return this.getUint32(e, n);
			case 8: return this.getUint64 && this.getUint64(e, n);
		}
	}
	getUint(e, t, n) {
		switch (t) {
			case 8: return this.getUint8(e, n);
			case 16: return this.getUint16(e, n);
			case 32: return this.getUint32(e, n);
			case 64: return this.getUint64 && this.getUint64(e, n);
		}
	}
	toString(e) {
		return this.dataView.toString(e, this.constructor.name);
	}
	ensureChunk() {}
};
function hc(e, t) {
	uc(`${e} '${t}' was not loaded, try using full build of exifr.`);
}
var gc = class extends Map {
	constructor(e) {
		super(), this.kind = e;
	}
	get(e, t) {
		return this.has(e) || hc(this.kind, e), t && (e in t || function(e, t) {
			uc(`Unknown ${e} '${t}'.`);
		}(this.kind, e), t[e].enabled || hc(this.kind, e)), super.get(e);
	}
	keyList() {
		return Array.from(this.keys());
	}
}, _c = new gc("file parser"), vc = new gc("segment parser"), yc = new gc("file reader"), bc = nc.fetch;
function xc(e, t) {
	return (n = e).startsWith("data:") || n.length > 1e4 ? Cc(e, t, "base64") : ac && e.includes("://") ? Sc(e, t, "url", wc) : ac ? Cc(e, t, "fs") : rc ? Sc(e, t, "url", wc) : void uc("Invalid input argument");
	var n;
}
async function Sc(e, t, n, r) {
	return yc.has(n) ? Cc(e, t, n) : r ? async function(e, t) {
		return new mc(await t(e));
	}(e, r) : void uc(`Parser ${n} is not loaded`);
}
async function Cc(e, t, n) {
	let r = new (yc.get(n))(e, t);
	return await r.read(), r;
}
var wc = (e) => bc(e).then(((e) => e.arrayBuffer())), Tc = (e) => new Promise(((t, n) => {
	let r = new FileReader();
	r.onloadend = () => t(r.result || /* @__PURE__ */ new ArrayBuffer()), r.onerror = n, r.readAsArrayBuffer(e);
})), Ec = class extends Map {
	get tagKeys() {
		return this.allKeys ||= Array.from(this.keys()), this.allKeys;
	}
	get tagValues() {
		return this.allValues ||= Array.from(this.values()), this.allValues;
	}
};
function Dc(e, t, n) {
	let r = new Ec();
	for (let [e, t] of n) r.set(e, t);
	if (Array.isArray(t)) for (let n of t) e.set(n, r);
	else e.set(t, r);
	return r;
}
function Oc(e, t, n) {
	let r, i = e.get(t);
	for (r of n) i.set(r[0], r[1]);
}
var kc = /* @__PURE__ */ new Map(), Ac = /* @__PURE__ */ new Map(), jc = /* @__PURE__ */ new Map(), Mc = [
	"chunked",
	"firstChunkSize",
	"firstChunkSizeNode",
	"firstChunkSizeBrowser",
	"chunkSize",
	"chunkLimit"
], Nc = [
	"jfif",
	"xmp",
	"icc",
	"iptc",
	"ihdr"
], Pc = ["tiff", ...Nc], $ = [
	"ifd0",
	"ifd1",
	"exif",
	"gps",
	"interop"
], Fc = [...Pc, ...$], Ic = ["makerNote", "userComment"], Lc = [
	"translateKeys",
	"translateValues",
	"reviveValues",
	"multiSegment"
], Rc = [
	...Lc,
	"sanitize",
	"mergeOutput",
	"silentErrors"
], zc = class {
	get translate() {
		return this.translateKeys || this.translateValues || this.reviveValues;
	}
}, Bc = class extends zc {
	get needed() {
		return this.enabled || this.deps.size > 0;
	}
	constructor(e, t, n, r) {
		if (super(), Q(this, "enabled", !1), Q(this, "skip", /* @__PURE__ */ new Set()), Q(this, "pick", /* @__PURE__ */ new Set()), Q(this, "deps", /* @__PURE__ */ new Set()), Q(this, "translateKeys", !1), Q(this, "translateValues", !1), Q(this, "reviveValues", !1), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(r), this.canBeFiltered = $.includes(e), this.canBeFiltered && (this.dict = kc.get(e)), n !== void 0) {
			if (Array.isArray(n)) this.parse = this.enabled = !0, this.canBeFiltered && n.length > 0 && this.translateTagSet(n, this.pick);
			else if (typeof n == "object") {
				if (this.enabled = !0, this.parse = !1 !== n.parse, this.canBeFiltered) {
					let { pick: e, skip: t } = n;
					e && e.length > 0 && this.translateTagSet(e, this.pick), t && t.length > 0 && this.translateTagSet(t, this.skip);
				}
				this.applyInheritables(n);
			} else !0 === n || !1 === n ? this.parse = this.enabled = n : uc(`Invalid options argument: ${n}`);
		}
	}
	applyInheritables(e) {
		let t, n;
		for (t of Lc) n = e[t], n !== void 0 && (this[t] = n);
	}
	translateTagSet(e, t) {
		if (this.dict) {
			let n, r, { tagKeys: i, tagValues: a } = this.dict;
			for (n of e) typeof n == "string" ? (r = a.indexOf(n), r === -1 && (r = i.indexOf(Number(n))), r !== -1 && t.add(Number(i[r]))) : t.add(n);
		} else for (let n of e) t.add(n);
	}
	finalizeFilters() {
		!this.enabled && this.deps.size > 0 ? (this.enabled = !0, Kc(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && Kc(this.pick, this.deps);
	}
}, Vc = {
	jfif: !1,
	tiff: !0,
	xmp: !1,
	icc: !1,
	iptc: !1,
	ifd0: !0,
	ifd1: !1,
	exif: !0,
	gps: !0,
	interop: !1,
	ihdr: void 0,
	makerNote: !1,
	userComment: !1,
	multiSegment: !1,
	skip: [],
	pick: [],
	translateKeys: !0,
	translateValues: !0,
	reviveValues: !0,
	sanitize: !0,
	mergeOutput: !0,
	silentErrors: !0,
	chunked: !0,
	firstChunkSize: void 0,
	firstChunkSizeNode: 512,
	firstChunkSizeBrowser: 65536,
	chunkSize: 65536,
	chunkLimit: 5
}, Hc = /* @__PURE__ */ new Map(), Uc = class extends zc {
	static useCached(e) {
		let t = Hc.get(e);
		return t !== void 0 || (t = new this(e), Hc.set(e, t)), t;
	}
	constructor(e) {
		super(), !0 === e ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : uc(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = rc ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = !1), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
	}
	setupFromUndefined() {
		let e;
		for (e of Mc) this[e] = Vc[e];
		for (e of Rc) this[e] = Vc[e];
		for (e of Ic) this[e] = Vc[e];
		for (e of Fc) this[e] = new Bc(e, Vc[e], void 0, this);
	}
	setupFromTrue() {
		let e;
		for (e of Mc) this[e] = Vc[e];
		for (e of Rc) this[e] = Vc[e];
		for (e of Ic) this[e] = !0;
		for (e of Fc) this[e] = new Bc(e, !0, void 0, this);
	}
	setupFromArray(e) {
		let t;
		for (t of Mc) this[t] = Vc[t];
		for (t of Rc) this[t] = Vc[t];
		for (t of Ic) this[t] = Vc[t];
		for (t of Fc) this[t] = new Bc(t, !1, void 0, this);
		this.setupGlobalFilters(e, void 0, $);
	}
	setupFromObject(e) {
		let t;
		for (t of ($.ifd0 = $.ifd0 || $.image, $.ifd1 = $.ifd1 || $.thumbnail, Object.assign(this, e), Mc)) this[t] = Gc(e[t], Vc[t]);
		for (t of Rc) this[t] = Gc(e[t], Vc[t]);
		for (t of Ic) this[t] = Gc(e[t], Vc[t]);
		for (t of Pc) this[t] = new Bc(t, Vc[t], e[t], this);
		for (t of $) this[t] = new Bc(t, Vc[t], e[t], this.tiff);
		this.setupGlobalFilters(e.pick, e.skip, $, Fc), !0 === e.tiff ? this.batchEnableWithBool($, !0) : !1 === e.tiff ? this.batchEnableWithUserValue($, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, $) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, $);
	}
	batchEnableWithBool(e, t) {
		for (let n of e) this[n].enabled = t;
	}
	batchEnableWithUserValue(e, t) {
		for (let n of e) {
			let e = t[n];
			this[n].enabled = !1 !== e && e !== void 0;
		}
	}
	setupGlobalFilters(e, t, n, r = n) {
		if (e && e.length) {
			for (let e of r) this[e].enabled = !1;
			let t = Wc(e, n);
			for (let [e, n] of t) Kc(this[e].pick, n), this[e].enabled = !0;
		} else if (t && t.length) {
			let e = Wc(t, n);
			for (let [t, n] of e) Kc(this[t].skip, n);
		}
	}
	filterNestedSegmentTags() {
		let { ifd0: e, exif: t, xmp: n, iptc: r, icc: i } = this;
		this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), n.enabled || e.skip.add(700), r.enabled || e.skip.add(33723), i.enabled || e.skip.add(34675);
	}
	traverseTiffDependencyTree() {
		let { ifd0: e, exif: t, gps: n, interop: r } = this;
		r.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), n.needed && e.deps.add(34853), this.tiff.enabled = $.some(((e) => !0 === this[e].enabled)) || this.makerNote || this.userComment;
		for (let e of $) this[e].finalizeFilters();
	}
	get onlyTiff() {
		return !Nc.map(((e) => this[e].enabled)).some(((e) => !0 === e)) && this.tiff.enabled;
	}
	checkLoadedPlugins() {
		for (let e of Pc) this[e].enabled && !vc.has(e) && hc("segment parser", e);
	}
};
function Wc(e, t) {
	let n, r, i, a, o = [];
	for (i of t) {
		for (a of (n = kc.get(i), r = [], n)) (e.includes(a[0]) || e.includes(a[1])) && r.push(a[0]);
		r.length && o.push([i, r]);
	}
	return o;
}
function Gc(e, t) {
	return e === void 0 ? t === void 0 ? void 0 : t : e;
}
function Kc(e, t) {
	for (let n of t) e.add(n);
}
Q(Uc, "default", Vc);
var qc = class {
	constructor(e) {
		Q(this, "parsers", {}), Q(this, "output", {}), Q(this, "errors", []), Q(this, "pushToErrors", ((e) => this.errors.push(e))), this.options = Uc.useCached(e);
	}
	async read(e) {
		this.file = await function(e, t) {
			return typeof e == "string" ? xc(e, t) : rc && !ic && e instanceof HTMLImageElement ? xc(e.src, t) : e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof DataView ? new mc(e) : rc && e instanceof Blob ? Sc(e, t, "blob", Tc) : void uc("Invalid input argument");
		}(e, this.options);
	}
	setup() {
		if (this.fileParser) return;
		let { file: e } = this, t = e.getUint16(0);
		for (let [n, r] of _c) if (r.canHandle(e, t)) return this.fileParser = new r(this.options, this.file, this.parsers), e[n] = !0;
		this.file.close && this.file.close(), uc("Unknown file format");
	}
	async parse() {
		let { output: e, errors: t } = this;
		return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), lc(n = e) ? void 0 : n;
		var n;
	}
	async executeParsers() {
		let { output: e } = this;
		await this.fileParser.parse();
		let t = Object.values(this.parsers).map((async (t) => {
			let n = await t.parse();
			t.assignToOutput(e, n);
		}));
		this.options.silentErrors && (t = t.map(((e) => e.catch(this.pushToErrors)))), await Promise.all(t);
	}
	async extractThumbnail() {
		this.setup();
		let { options: e, file: t } = this, n = vc.get("tiff", e);
		var r;
		if (t.tiff ? r = {
			start: 0,
			type: "tiff"
		} : t.jpeg && (r = await this.fileParser.getOrFindSegment("tiff")), r === void 0) return;
		let i = await this.fileParser.ensureSegmentChunk(r), a = await (this.parsers.tiff = new n(i, e, t)).extractThumbnail();
		return t.close && t.close(), a;
	}
};
async function Jc(e, t) {
	let n = new qc(t);
	return await n.read(e), n.parse();
}
var Yc = Object.freeze({
	__proto__: null,
	parse: Jc,
	Exifr: qc,
	fileParsers: _c,
	segmentParsers: vc,
	fileReaders: yc,
	tagKeys: kc,
	tagValues: Ac,
	tagRevivers: jc,
	createDictionary: Dc,
	extendDictionary: Oc,
	fetchUrlAsArrayBuffer: wc,
	readBlobAsArrayBuffer: Tc,
	chunkedProps: Mc,
	otherSegments: Nc,
	segments: Pc,
	tiffBlocks: $,
	segmentsAndBlocks: Fc,
	tiffExtractables: Ic,
	inheritables: Lc,
	allFormatters: Rc,
	Options: Uc
}), Xc = class {
	static findPosition(e, t) {
		let n = e.getUint16(t + 2) + 2, r = typeof this.headerLength == "function" ? this.headerLength(e, t, n) : this.headerLength, i = t + r, a = n - r;
		return {
			offset: t,
			length: n,
			headerLength: r,
			start: i,
			size: a,
			end: i + a
		};
	}
	static parse(e, t = {}) {
		return new this(e, new Uc({ [this.type]: t }), e).parse();
	}
	normalizeInput(e) {
		return e instanceof mc ? e : new mc(e);
	}
	constructor(e, t = {}, n) {
		Q(this, "errors", []), Q(this, "raw", /* @__PURE__ */ new Map()), Q(this, "handleError", ((e) => {
			if (!this.options.silentErrors) throw e;
			this.errors.push(e.message);
		})), this.chunk = this.normalizeInput(e), this.file = n, this.type = this.constructor.type, this.globalOptions = this.options = t, this.localOptions = t[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
	}
	translate() {
		this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
	}
	get output() {
		return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
	}
	translateBlock(e, t) {
		let n = jc.get(t), r = Ac.get(t), i = kc.get(t), a = this.options[t], o = a.reviveValues && !!n, s = a.translateValues && !!r, c = a.translateKeys && !!i, l = {};
		for (let [t, a] of e) o && n.has(t) ? a = n.get(t)(a) : s && r.has(t) && (a = this.translateValue(a, r.get(t))), c && i.has(t) && (t = i.get(t) || t), l[t] = a;
		return l;
	}
	translateValue(e, t) {
		return t[e] || t.DEFAULT || e;
	}
	assignToOutput(e, t) {
		this.assignObjectToOutput(e, this.constructor.type, t);
	}
	assignObjectToOutput(e, t, n) {
		if (this.globalOptions.mergeOutput) return Object.assign(e, n);
		e[t] ? Object.assign(e[t], n) : e[t] = n;
	}
};
Q(Xc, "headerLength", 4), Q(Xc, "type", void 0), Q(Xc, "multiSegment", !1), Q(Xc, "canHandle", (() => !1));
function Zc(e) {
	return e === 192 || e === 194 || e === 196 || e === 219 || e === 221 || e === 218 || e === 254;
}
function Qc(e) {
	return e >= 224 && e <= 239;
}
function $c(e, t, n) {
	for (let [r, i] of vc) if (i.canHandle(e, t, n)) return r;
}
var el = class extends class {
	constructor(e, t, n) {
		Q(this, "errors", []), Q(this, "ensureSegmentChunk", (async (e) => {
			let t = e.start, n = e.size || 65536;
			if (this.file.chunked) {
				if (this.file.available(t, n)) e.chunk = this.file.subarray(t, n);
				else try {
					e.chunk = await this.file.readChunk(t, n);
				} catch (t) {
					uc(`Couldn't read segment: ${JSON.stringify(e)}. ${t.message}`);
				}
			} else this.file.byteLength > t + n ? e.chunk = this.file.subarray(t, n) : e.size === void 0 ? e.chunk = this.file.subarray(t) : uc("Segment unreachable: " + JSON.stringify(e));
			return e.chunk;
		})), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = n;
	}
	injectSegment(e, t) {
		this.options[e].enabled && this.createParser(e, t);
	}
	createParser(e, t) {
		let n = new (vc.get(e))(t, this.options, this.file);
		return this.parsers[e] = n;
	}
	createParsers(e) {
		for (let t of e) {
			let { type: e, chunk: n } = t, r = this.options[e];
			if (r && r.enabled) {
				let t = this.parsers[e];
				t && t.append || t || this.createParser(e, n);
			}
		}
	}
	async readSegments(e) {
		let t = e.map(this.ensureSegmentChunk);
		await Promise.all(t);
	}
} {
	constructor(...e) {
		super(...e), Q(this, "appSegments", []), Q(this, "jpegSegments", []), Q(this, "unknownSegments", []);
	}
	static canHandle(e, t) {
		return t === 65496;
	}
	async parse() {
		await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
	}
	setupSegmentFinderArgs(e) {
		!0 === e ? (this.findAll = !0, this.wanted = new Set(vc.keyList())) : (e = e === void 0 ? vc.keyList().filter(((e) => this.options[e].enabled)) : e.filter(((e) => this.options[e].enabled && vc.has(e))), this.findAll = !1, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = !1;
	}
	async findAppSegments(e = 0, t) {
		this.setupSegmentFinderArgs(t);
		let { file: n, findAll: r, wanted: i, remaining: a } = this;
		if (!r && this.file.chunked && (r = Array.from(i).some(((e) => {
			let t = vc.get(e), n = this.options[e];
			return t.multiSegment && n.multiSegment;
		})), r && await this.file.readWhole()), e = this.findAppSegmentsInRange(e, n.byteLength), !this.options.onlyTiff && n.chunked) {
			let t = !1;
			for (; a.size > 0 && !t && (n.canReadNextChunk || this.unfinishedMultiSegment);) {
				let { nextChunkOffset: r } = n, i = this.appSegments.some(((e) => !this.file.available(e.offset || e.start, e.length || e.size)));
				if (t = e > r && !i ? !await n.readNextChunk(e) : !await n.readNextChunk(r), (e = this.findAppSegmentsInRange(e, n.byteLength)) === void 0) return;
			}
		}
	}
	findAppSegmentsInRange(e, t) {
		t -= 2;
		let n, r, i, a, o, s, { file: c, findAll: l, wanted: u, remaining: d, options: f } = this;
		for (; e < t; e++) if (c.getUint8(e) === 255) {
			if (n = c.getUint8(e + 1), Qc(n)) {
				if (r = c.getUint16(e + 2), i = $c(c, e, r), i && u.has(i) && (a = vc.get(i), o = a.findPosition(c, e), s = f[i], o.type = i, this.appSegments.push(o), !l && (a.multiSegment && s.multiSegment ? (this.unfinishedMultiSegment = o.chunkNumber < o.chunkCount, this.unfinishedMultiSegment || d.delete(i)) : d.delete(i), d.size === 0))) break;
				f.recordUnknownSegments && (o = Xc.findPosition(c, e), o.marker = n, this.unknownSegments.push(o)), e += r + 1;
			} else if (Zc(n)) {
				if (r = c.getUint16(e + 2), n === 218 && !1 !== f.stopAfterSos) return;
				f.recordJpegSegments && this.jpegSegments.push({
					offset: e,
					length: r,
					marker: n
				}), e += r + 1;
			}
		}
		return e;
	}
	mergeMultiSegments() {
		if (!this.appSegments.some(((e) => e.multiSegment))) return;
		let e = function(e, t) {
			let n, r, i, a = /* @__PURE__ */ new Map();
			for (let o = 0; o < e.length; o++) n = e[o], r = n[t], a.has(r) ? i = a.get(r) : a.set(r, i = []), i.push(n);
			return Array.from(a);
		}(this.appSegments, "type");
		this.mergedAppSegments = e.map((([e, t]) => {
			let n = vc.get(e, this.options);
			return n.handleMultiSegments ? {
				type: e,
				chunk: n.handleMultiSegments(t)
			} : t[0];
		}));
	}
	getSegment(e) {
		return this.appSegments.find(((t) => t.type === e));
	}
	async getOrFindSegment(e) {
		let t = this.getSegment(e);
		return t === void 0 && (await this.findAppSegments(0, [e]), t = this.getSegment(e)), t;
	}
};
Q(el, "type", "jpeg"), _c.set("jpeg", el);
var tl = [
	void 0,
	1,
	1,
	2,
	4,
	8,
	1,
	1,
	2,
	4,
	8,
	4,
	8,
	4
], nl = class extends Xc {
	parseHeader() {
		var e = this.chunk.getUint16();
		e === 18761 ? this.le = !0 : e === 19789 && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0;
	}
	parseTags(e, t, n = /* @__PURE__ */ new Map()) {
		let { pick: r, skip: i } = this.options[t];
		r = new Set(r);
		let a = r.size > 0, o = i.size === 0, s = this.chunk.getUint16(e);
		e += 2;
		for (let c = 0; c < s; c++) {
			let s = this.chunk.getUint16(e);
			if (a) {
				if (r.has(s) && (n.set(s, this.parseTag(e, s, t)), r.delete(s), r.size === 0)) break;
			} else !o && i.has(s) || n.set(s, this.parseTag(e, s, t));
			e += 12;
		}
		return n;
	}
	parseTag(e, t, n) {
		let { chunk: r } = this, i = r.getUint16(e + 2), a = r.getUint32(e + 4), o = tl[i];
		if (o * a <= 4 ? e += 8 : e = r.getUint32(e + 8), (i < 1 || i > 13) && uc(`Invalid TIFF value type. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e}`), e > r.byteLength && uc(`Invalid TIFF value offset. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e} is outside of chunk size ${r.byteLength}`), i === 1) return r.getUint8Array(e, a);
		if (i === 2) return (s = function(e) {
			for (; e.endsWith("\0");) e = e.slice(0, -1);
			return e;
		}(s = r.getString(e, a)).trim()) === "" ? void 0 : s;
		var s;
		if (i === 7) return r.getUint8Array(e, a);
		if (a === 1) return this.parseTagValue(i, e);
		{
			let t = new (function(e) {
				switch (e) {
					case 1: return Uint8Array;
					case 3: return Uint16Array;
					case 4: return Uint32Array;
					case 5: return Array;
					case 6: return Int8Array;
					case 8: return Int16Array;
					case 9: return Int32Array;
					case 10: return Array;
					case 11: return Float32Array;
					case 12: return Float64Array;
					default: return Array;
				}
			}(i))(a), n = o;
			for (let r = 0; r < a; r++) t[r] = this.parseTagValue(i, e), e += n;
			return t;
		}
	}
	parseTagValue(e, t) {
		let { chunk: n } = this;
		switch (e) {
			case 1: return n.getUint8(t);
			case 3: return n.getUint16(t);
			case 4: return n.getUint32(t);
			case 5: return n.getUint32(t) / n.getUint32(t + 4);
			case 6: return n.getInt8(t);
			case 8: return n.getInt16(t);
			case 9: return n.getInt32(t);
			case 10: return n.getInt32(t) / n.getInt32(t + 4);
			case 11: return n.getFloat(t);
			case 12: return n.getDouble(t);
			case 13: return n.getUint32(t);
			default: uc(`Invalid tiff type ${e}`);
		}
	}
}, rl = class extends nl {
	static canHandle(e, t) {
		return e.getUint8(t + 1) === 225 && e.getUint32(t + 4) === 1165519206 && e.getUint16(t + 8) === 0;
	}
	async parse() {
		this.parseHeader();
		let { options: e } = this;
		return e.ifd0.enabled && await this.parseIfd0Block(), e.exif.enabled && await this.safeParse("parseExifBlock"), e.gps.enabled && await this.safeParse("parseGpsBlock"), e.interop.enabled && await this.safeParse("parseInteropBlock"), e.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
	}
	safeParse(e) {
		let t = this[e]();
		return t.catch !== void 0 && (t = t.catch(this.handleError)), t;
	}
	findIfd0Offset() {
		this.ifd0Offset === void 0 && (this.ifd0Offset = this.chunk.getUint32(4));
	}
	findIfd1Offset() {
		if (this.ifd1Offset === void 0) {
			this.findIfd0Offset();
			let e = this.chunk.getUint16(this.ifd0Offset), t = this.ifd0Offset + 2 + 12 * e;
			this.ifd1Offset = this.chunk.getUint32(t);
		}
	}
	parseBlock(e, t) {
		let n = /* @__PURE__ */ new Map();
		return this[t] = n, this.parseTags(e, t, n), n;
	}
	async parseIfd0Block() {
		if (this.ifd0) return;
		let { file: e } = this;
		this.findIfd0Offset(), this.ifd0Offset < 8 && uc("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && uc(`IFD0 offset points to outside of file.\nthis.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, dc(this.options));
		let t = this.parseBlock(this.ifd0Offset, "ifd0");
		return t.size === 0 ? void 0 : (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t);
	}
	async parseExifBlock() {
		if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
		this.file.tiff && await this.file.ensureChunk(this.exifOffset, dc(this.options));
		let e = this.parseBlock(this.exifOffset, "exif");
		return this.interopOffset ||= e.get(40965), this.makerNote = e.get(37500), this.userComment = e.get(37510), this.options.sanitize && (e.delete(40965), e.delete(37500), e.delete(37510)), this.unpack(e, 41728), this.unpack(e, 41729), e;
	}
	unpack(e, t) {
		let n = e.get(t);
		n && n.length === 1 && e.set(t, n[0]);
	}
	async parseGpsBlock() {
		if (this.gps || (this.ifd0 || await this.parseIfd0Block(), this.gpsOffset === void 0)) return;
		let e = this.parseBlock(this.gpsOffset, "gps");
		return e && e.has(2) && e.has(4) && (e.set("latitude", il(...e.get(2), e.get(1))), e.set("longitude", il(...e.get(4), e.get(3)))), e;
	}
	async parseInteropBlock() {
		if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), this.interopOffset !== void 0 || this.exif || await this.parseExifBlock(), this.interopOffset !== void 0)) return this.parseBlock(this.interopOffset, "interop");
	}
	async parseThumbnailBlock(e = !1) {
		if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = !0), this.ifd1;
	}
	async extractThumbnail() {
		if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(!0), this.ifd1 === void 0) return;
		let e = this.ifd1.get(513), t = this.ifd1.get(514);
		return this.chunk.getUint8Array(e, t);
	}
	get image() {
		return this.ifd0;
	}
	get thumbnail() {
		return this.ifd1;
	}
	createOutput() {
		let e, t, n, r = {};
		for (t of $) if (e = this[t], !lc(e)) {
			if (n = this.canTranslate ? this.translateBlock(e, t) : Object.fromEntries(e), this.options.mergeOutput) {
				if (t === "ifd1") continue;
				Object.assign(r, n);
			} else r[t] = n;
		}
		return this.makerNote && (r.makerNote = this.makerNote), this.userComment && (r.userComment = this.userComment), r;
	}
	assignToOutput(e, t) {
		if (this.globalOptions.mergeOutput) Object.assign(e, t);
		else for (let [n, r] of Object.entries(t)) this.assignObjectToOutput(e, n, r);
	}
};
function il(e, t, n, r) {
	var i = e + t / 60 + n / 3600;
	return r !== "S" && r !== "W" || (i *= -1), i;
}
Q(rl, "type", "tiff"), Q(rl, "headerLength", 10), vc.set("tiff", rl), Object.freeze({
	__proto__: null,
	default: Yc,
	Exifr: qc,
	fileParsers: _c,
	segmentParsers: vc,
	fileReaders: yc,
	tagKeys: kc,
	tagValues: Ac,
	tagRevivers: jc,
	createDictionary: Dc,
	extendDictionary: Oc,
	fetchUrlAsArrayBuffer: wc,
	readBlobAsArrayBuffer: Tc,
	chunkedProps: Mc,
	otherSegments: Nc,
	segments: Pc,
	tiffBlocks: $,
	segmentsAndBlocks: Fc,
	tiffExtractables: Ic,
	inheritables: Lc,
	allFormatters: Rc,
	Options: Uc,
	parse: Jc
});
var al = {
	ifd0: !1,
	ifd1: !1,
	exif: !1,
	gps: !1,
	interop: !1,
	sanitize: !1,
	reviveValues: !0,
	translateKeys: !1,
	translateValues: !1,
	mergeOutput: !1
};
Object.assign({}, al, {
	firstChunkSize: 4e4,
	gps: [
		1,
		2,
		3,
		4
	]
}), Object.assign({}, al, {
	tiff: !1,
	ifd1: !0,
	mergeOutput: !1
});
var ol = Object.assign({}, al, {
	firstChunkSize: 4e4,
	ifd0: [274]
});
async function sl(e) {
	let t = new qc(ol);
	await t.read(e);
	let n = await t.parse();
	if (n && n.ifd0) return n.ifd0[274];
}
var cl = Object.freeze({
	1: {
		dimensionSwapped: !1,
		scaleX: 1,
		scaleY: 1,
		deg: 0,
		rad: 0
	},
	2: {
		dimensionSwapped: !1,
		scaleX: -1,
		scaleY: 1,
		deg: 0,
		rad: 0
	},
	3: {
		dimensionSwapped: !1,
		scaleX: 1,
		scaleY: 1,
		deg: 180,
		rad: 180 * Math.PI / 180
	},
	4: {
		dimensionSwapped: !1,
		scaleX: -1,
		scaleY: 1,
		deg: 180,
		rad: 180 * Math.PI / 180
	},
	5: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: -1,
		deg: 90,
		rad: 90 * Math.PI / 180
	},
	6: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: 1,
		deg: 90,
		rad: 90 * Math.PI / 180
	},
	7: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: -1,
		deg: 270,
		rad: 270 * Math.PI / 180
	},
	8: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: 1,
		deg: 270,
		rad: 270 * Math.PI / 180
	}
}), ll = !0, ul = !0;
if (typeof navigator == "object") {
	let e = navigator.userAgent;
	if (e.includes("iPad") || e.includes("iPhone")) {
		let t = e.match(/OS (\d+)_(\d+)/);
		if (t) {
			let [, e, n] = t;
			ll = Number(e) + .1 * Number(n) < 13.4, ul = !1;
		}
	} else if (e.includes("OS X 10")) {
		let [, t] = e.match(/OS X 10[_.](\d+)/);
		ll = ul = Number(t) < 15;
	}
	if (e.includes("Chrome/")) {
		let [, t] = e.match(/Chrome\/(\d+)/);
		ll = ul = Number(t) < 81;
	} else if (e.includes("Firefox/")) {
		let [, t] = e.match(/Firefox\/(\d+)/);
		ll = ul = Number(t) < 77;
	}
}
async function dl(e) {
	let t = await sl(e);
	return Object.assign({
		canvas: ll,
		css: ul
	}, cl[t]);
}
var fl = class extends mc {
	constructor(...e) {
		super(...e), Q(this, "ranges", new pl()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
	}
	_tryExtend(e, t, n) {
		if (e === 0 && this.byteLength === 0 && n) {
			let e = new DataView(n.buffer || n, n.byteOffset, n.byteLength);
			this._swapDataView(e);
		} else {
			let n = e + t;
			if (n > this.byteLength) {
				let { dataView: e } = this._extend(n);
				this._swapDataView(e);
			}
		}
	}
	_extend(e) {
		let t;
		t = sc ? oc.allocUnsafe(e) : new Uint8Array(e);
		let n = new DataView(t.buffer, t.byteOffset, t.byteLength);
		return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), {
			uintView: t,
			dataView: n
		};
	}
	subarray(e, t, n = !1) {
		return t ||= this._lengthToEnd(e), n && this._tryExtend(e, t), this.ranges.add(e, t), super.subarray(e, t);
	}
	set(e, t, n = !1) {
		n && this._tryExtend(t, e.byteLength, e);
		let r = super.set(e, t);
		return this.ranges.add(t, r.byteLength), r;
	}
	async ensureChunk(e, t) {
		this.chunked && (this.ranges.available(e, t) || await this.readChunk(e, t));
	}
	available(e, t) {
		return this.ranges.available(e, t);
	}
}, pl = class {
	constructor() {
		Q(this, "list", []);
	}
	get length() {
		return this.list.length;
	}
	add(e, t, n = 0) {
		let r = e + t, i = this.list.filter(((t) => ml(e, t.offset, r) || ml(e, t.end, r)));
		if (i.length > 0) {
			e = Math.min(e, ...i.map(((e) => e.offset))), r = Math.max(r, ...i.map(((e) => e.end))), t = r - e;
			let n = i.shift();
			n.offset = e, n.length = t, n.end = r, this.list = this.list.filter(((e) => !i.includes(e)));
		} else this.list.push({
			offset: e,
			length: t,
			end: r
		});
	}
	available(e, t) {
		let n = e + t;
		return this.list.some(((t) => t.offset <= e && n <= t.end));
	}
};
function ml(e, t, n) {
	return e <= t && t <= n;
}
var hl = class extends fl {
	constructor(e, t) {
		super(0), Q(this, "chunksRead", 0), this.input = e, this.options = t;
	}
	async readWhole() {
		this.chunked = !1, await this.readChunk(this.nextChunkOffset);
	}
	async readChunked() {
		this.chunked = !0, await this.readChunk(0, this.options.firstChunkSize);
	}
	async readNextChunk(e = this.nextChunkOffset) {
		if (this.fullyRead) return this.chunksRead++, !1;
		let t = this.options.chunkSize, n = await this.readChunk(e, t);
		return !!n && n.byteLength === t;
	}
	async readChunk(e, t) {
		if (this.chunksRead++, (t = this.safeWrapAddress(e, t)) !== 0) return this._readChunk(e, t);
	}
	safeWrapAddress(e, t) {
		return this.size !== void 0 && e + t > this.size ? Math.max(0, this.size - e) : t;
	}
	get nextChunkOffset() {
		if (this.ranges.list.length !== 0) return this.ranges.list[0].length;
	}
	get canReadNextChunk() {
		return this.chunksRead < this.options.chunkLimit;
	}
	get fullyRead() {
		return this.size !== void 0 && this.nextChunkOffset === this.size;
	}
	read() {
		return this.options.chunked ? this.readChunked() : this.readWhole();
	}
	close() {}
};
yc.set("blob", class extends hl {
	async readWhole() {
		this.chunked = !1;
		let e = await Tc(this.input);
		this._swapArrayBuffer(e);
	}
	readChunked() {
		return this.chunked = !0, this.size = this.input.size, super.readChunked();
	}
	async _readChunk(e, t) {
		let n = t ? e + t : void 0, r = await Tc(this.input.slice(e, n));
		return this.set(r, e, !0);
	}
});
var gl = {
	name: "@uppy/thumbnail-generator",
	description: "Uppy plugin that generates small previews of images to show on your upload UI.",
	version: "6.0.1",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"thumbnail",
		"preview",
		"resize"
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
	dependencies: { exifr: "^7.1.3" },
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@vitest/browser-playwright": "^4.1.11",
		"namespace-emitter": "2.0.1",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" }
}, _l = { strings: { generatingThumbnails: "Generating thumbnails..." } };
Z(), X();
function vl(e, t, n) {
	try {
		e.getContext("2d").getImageData(0, 0, 1, 1);
	} catch (e) {
		if (typeof e == "object" && e && "code" in e && e.code === 18) return Promise.reject(/* @__PURE__ */ Error("cannot read image, probably an svg with external resources"));
	}
	return e.toBlob ? new Promise((r) => {
		e.toBlob(r, t, n);
	}).then((e) => {
		if (e === null) throw Error("cannot read image, probably an svg with external resources");
		return e;
	}) : Promise.resolve().then(() => g(e.toDataURL(t, n), {})).then((e) => {
		if (e === null) throw Error("could not extract blob, probably an old browser");
		return e;
	});
}
function yl(e, t) {
	let n = e.width, r = e.height;
	(t.deg === 90 || t.deg === 270) && (n = e.height, r = e.width);
	let i = document.createElement("canvas");
	i.width = n, i.height = r;
	let a = i.getContext("2d");
	return a.translate(n / 2, r / 2), t.canvas && (a.rotate(t.rad), a.scale(t.scaleX, t.scaleY)), a.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), i;
}
function bl(e) {
	let t = e.width / e.height, n = 5e6, r = 4096, i = Math.floor(Math.sqrt(n * t)), a = Math.floor(n / Math.sqrt(n * t));
	if (i > r && (i = r, a = Math.round(i / t)), a > r && (a = r, i = Math.round(t * a)), e.width > i) {
		let t = document.createElement("canvas");
		return t.width = i, t.height = a, t.getContext("2d").drawImage(e, 0, 0, i, a), t;
	}
	return e;
}
var xl = {
	thumbnailWidth: null,
	thumbnailHeight: null,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	lazy: !1
}, Sl = class extends ar {
	static VERSION = gl.version;
	queue;
	queueProcessing;
	defaultThumbnailDimension;
	thumbnailType;
	constructor(e, t) {
		if (super(e, {
			...xl,
			...t
		}), this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType, this.defaultLocale = _l, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) throw Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
	}
	createThumbnail(e, t, n) {
		if (e.data == null) throw Error("File data is empty");
		let r = URL.createObjectURL(e.data), i = new Promise((e, t) => {
			let n = new Image();
			n.src = r, n.addEventListener("load", () => {
				URL.revokeObjectURL(r), e(n);
			}), n.addEventListener("error", (e) => {
				URL.revokeObjectURL(r), t(e.error || /* @__PURE__ */ Error("Could not create thumbnail"));
			});
		}), a = dl(e.data).catch(() => 1);
		return Promise.all([i, a]).then(([e, r]) => {
			let i = this.getProportionalDimensions(e, t, n, r.deg), a = yl(e, r);
			return vl(this.resizeImage(a, i.width, i.height), this.thumbnailType, 80);
		}).then((e) => URL.createObjectURL(e));
	}
	getProportionalDimensions(e, t, n, r) {
		let i = e.width / e.height;
		if ((r === 90 || r === 270) && (i = e.height / e.width), t != null) {
			let n = t;
			return e.width < t && (n = e.width), {
				width: n,
				height: Math.round(n / i)
			};
		}
		if (n != null) {
			let t = n;
			return e.height < n && (t = e.height), {
				width: Math.round(t * i),
				height: t
			};
		}
		return {
			width: this.defaultThumbnailDimension,
			height: Math.round(this.defaultThumbnailDimension / i)
		};
	}
	resizeImage(e, t, n) {
		let r = bl(e), i = Math.ceil(Math.log2(r.width / t));
		i < 1 && (i = 1);
		let a = t * 2 ** (i - 1), o = n * 2 ** (i - 1);
		for (; i--;) {
			let e = document.createElement("canvas");
			e.width = a, e.height = o, e.getContext("2d").drawImage(r, 0, 0, a, o), r = e, a = Math.round(a / 2), o = Math.round(o / 2);
		}
		return r;
	}
	setPreviewURL(e, t) {
		this.uppy.setFileState(e, { preview: t });
	}
	addToQueue(e) {
		this.queue.push(e), this.queueProcessing === !1 && this.processQueue();
	}
	processQueue() {
		if (this.queueProcessing = !0, this.queue.length > 0) {
			let e = this.uppy.getFile(this.queue.shift());
			return e ? this.requestThumbnail(e).catch(() => {}).then(() => this.processQueue()) : (this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error"), Promise.resolve());
		}
		return this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated"), Promise.resolve();
	}
	requestThumbnail(e) {
		return Ye(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t) => {
			this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t);
		}).catch((t) => {
			this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t);
		}) : Promise.resolve();
	}
	onFileAdded = (e) => {
		!e.preview && e.data && Ye(e.type) && !e.isRemote && this.addToQueue(e.id);
	};
	onCancelRequest = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1);
	};
	onFileRemoved = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1), e.preview && qe(e.preview) && URL.revokeObjectURL(e.preview);
	};
	onRestored = () => {
		this.uppy.getFiles().filter((e) => e.isRestored).forEach((e) => {
			(!e.preview || qe(e.preview)) && this.addToQueue(e.id);
		});
	};
	onAllFilesRemoved = () => {
		this.queue = [];
	};
	waitUntilAllProcessed = (e) => {
		e.forEach((e) => {
			let t = this.uppy.getFile(e);
			this.uppy.emit("preprocess-progress", t, {
				mode: "indeterminate",
				message: this.i18n("generatingThumbnails")
			});
		});
		let t = () => {
			e.forEach((e) => {
				let t = this.uppy.getFile(e);
				this.uppy.emit("preprocess-complete", t);
			});
		};
		return new Promise((e) => {
			this.queueProcessing ? this.uppy.once("thumbnail:all-generated", () => {
				t(), e();
			}) : (t(), e());
		});
	};
	install() {
		this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed);
	}
	uninstall() {
		this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed);
	}
}, Cl = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", wl = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += Cl[Math.random() * 64 | 0];
	return t;
}, Tl = {
	name: "@uppy/dashboard",
	description: "Universal UI plugin for Uppy.",
	version: "6.0.1",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"dashboard",
		"ui"
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
		"@transloadit/prettier-bytes": "^2.0.0",
		"@uppy/thumbnail-generator": "^6.0.1",
		classnames: "^2.5.1",
		lodash: "^4.18.1",
		nanoid: "^6.0.1",
		preact: "^10.29.2",
		"shallow-equal": "^3.1.0"
	},
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@uppy/core": "^6.2.0",
		"@uppy/dropbox": "^6.0.0",
		"@uppy/google-drive": "^6.0.0",
		"@uppy/url": "^6.0.1",
		"@uppy/webcam": "^6.0.1",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" }
}, El = o((() => {
	dn();
}));
K(), El();
var Dl = class extends U {
	fileInput = null;
	folderInput = null;
	mobilePhotoFileInput = null;
	mobileVideoFileInput = null;
	triggerFileInputClick = () => {
		this.fileInput?.click();
	};
	triggerFolderInputClick = () => {
		this.folderInput?.click();
	};
	triggerVideoCameraInputClick = () => {
		this.mobileVideoFileInput?.click();
	};
	triggerPhotoCameraInputClick = () => {
		this.mobilePhotoFileInput?.click();
	};
	onFileInputChange = (e) => {
		this.props.handleInputChange(e), e.currentTarget.value = "";
	};
	renderHiddenInput = (e, t) => G("input", {
		className: "uppy-Dashboard-input",
		hidden: !0,
		"aria-hidden": "true",
		tabIndex: -1,
		webkitdirectory: e,
		type: "file",
		name: "files[]",
		multiple: this.props.maxNumberOfFiles !== 1,
		onChange: this.onFileInputChange,
		accept: this.props.allowedFileTypes?.join(", "),
		ref: t
	});
	renderHiddenCameraInput = (e, t, n) => {
		let r = {
			photo: "image/*",
			video: "video/*"
		}[e];
		return G("input", {
			className: "uppy-Dashboard-input",
			hidden: !0,
			"aria-hidden": "true",
			tabIndex: -1,
			type: "file",
			name: `camera-${e}`,
			onChange: this.onFileInputChange,
			capture: t === "" ? "environment" : t,
			accept: r,
			ref: n
		});
	};
	renderMyDeviceAcquirer = () => G("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MyDevice",
		children: G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.props.fileManagerSelectionType === "folders" ? this.triggerFolderInputClick : this.triggerFileInputClick,
			children: [G("div", {
				className: "uppy-DashboardTab-inner",
				children: G("svg", {
					className: "uppy-DashboardTab-iconMyDevice",
					"aria-hidden": "true",
					focusable: "false",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: G("path", {
						d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
						fill: "currentcolor",
						"fill-rule": "evenodd"
					})
				})
			}), G("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("myDevice")
			})]
		})
	});
	renderPhotoCamera = () => G("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobilePhotoCamera",
		children: G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerPhotoCameraInputClick,
			children: [G("div", {
				className: "uppy-DashboardTab-inner",
				children: G("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: G("path", {
						d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
						fill: "#02B383",
						"fill-rule": "nonzero"
					})
				})
			}), G("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("takePictureBtn")
			})]
		})
	});
	renderVideoCamera = () => G("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobileVideoCamera",
		children: G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerVideoCameraInputClick,
			children: [G("div", {
				className: "uppy-DashboardTab-inner",
				children: G("svg", {
					"aria-hidden": "true",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: G("path", {
						fill: "#FF675E",
						fillRule: "nonzero",
						d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
					})
				})
			}), G("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("recordVideoBtn")
			})]
		})
	});
	renderBrowseButton = (e, t) => {
		let n = this.props.acquirers.length;
		return G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
			onClick: t,
			"data-uppy-super-focusable": n === 0,
			children: e
		});
	};
	renderDropPasteBrowseTagline = (e) => {
		let t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick), n = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick), r = this.props.fileManagerSelectionType, i = r.charAt(0).toUpperCase() + r.slice(1);
		return G("div", {
			class: "uppy-Dashboard-AddFiles-title",
			children: this.props.disableLocalFiles ? this.props.i18n("importFiles") : e > 0 ? this.props.i18nArray(`dropPasteImport${i}`, {
				browseFiles: t,
				browseFolders: n,
				browse: t
			}) : this.props.i18nArray(`dropPaste${i}`, {
				browseFiles: t,
				browseFolders: n,
				browse: t
			})
		});
	};
	[Symbol.for("uppy test: disable unused locale key warning")]() {
		this.props.i18nArray("dropPasteBoth"), this.props.i18nArray("dropPasteFiles"), this.props.i18nArray("dropPasteFolders"), this.props.i18nArray("dropPasteImportBoth"), this.props.i18nArray("dropPasteImportFiles"), this.props.i18nArray("dropPasteImportFolders");
	}
	renderAcquirer = (e) => G("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": e.id,
		children: G("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-cy": e.id,
			"aria-controls": `uppy-DashboardContent-panel--${e.id}`,
			"aria-selected": this.props.activePickerPanel?.id === e.id,
			"data-uppy-super-focusable": !0,
			onClick: () => this.props.showPanel(e.id),
			children: [G("div", {
				className: "uppy-DashboardTab-inner",
				children: e.icon()
			}), G("div", {
				className: "uppy-DashboardTab-name",
				children: e.name
			})]
		})
	});
	renderSourcesList = (e, t) => {
		let { showNativePhotoCameraButton: n, showNativeVideoCameraButton: r } = this.props, i = [], a = "myDevice";
		t || i.push({
			key: a,
			elements: this.renderMyDeviceAcquirer()
		}), n && i.push({
			key: "nativePhotoCameraButton",
			elements: this.renderPhotoCamera()
		}), r && i.push({
			key: "nativePhotoCameraButton",
			elements: this.renderVideoCamera()
		}), i.push(...e.map((e) => ({
			key: e.id,
			elements: this.renderAcquirer(e)
		}))), i.length === 1 && i[0].key === a && (i = []);
		let o = [...i], s = o.splice(i.length - 2, i.length);
		return G(H, { children: [this.renderDropPasteBrowseTagline(i.length), G("div", {
			className: "uppy-Dashboard-AddFiles-list",
			role: "tablist",
			children: [o.map(({ key: e, elements: t }) => G(H, { children: t }, e)), G("span", {
				role: "presentation",
				style: { "white-space": "nowrap" },
				children: s.map(({ key: e, elements: t }) => G(H, { children: t }, e))
			})]
		})] });
	};
	renderPoweredByUppy() {
		let { i18nArray: e } = this.props;
		return G("a", {
			tabIndex: -1,
			href: "https://uppy.io",
			rel: "noreferrer noopener",
			target: "_blank",
			className: "uppy-Dashboard-poweredBy",
			children: e("poweredBy", { uppy: G("span", { children: [G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
				width: "11",
				height: "11",
				viewBox: "0 0 11 11",
				children: G("path", {
					d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
					fillRule: "evenodd"
				})
			}), G("span", {
				className: "uppy-Dashboard-poweredByUppy",
				children: "Uppy"
			})] }) })
		});
	}
	render() {
		let { showNativePhotoCameraButton: e, showNativeVideoCameraButton: t, nativeCameraFacingMode: n } = this.props;
		return G("div", {
			className: "uppy-Dashboard-AddFiles",
			children: [
				this.renderHiddenInput(!1, (e) => {
					this.fileInput = e;
				}),
				this.renderHiddenInput(!0, (e) => {
					this.folderInput = e;
				}),
				e && this.renderHiddenCameraInput("photo", n, (e) => {
					this.mobilePhotoFileInput = e;
				}),
				t && this.renderHiddenCameraInput("video", n, (e) => {
					this.mobileVideoFileInput = e;
				}),
				this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles),
				G("div", {
					className: "uppy-Dashboard-AddFiles-info",
					children: [this.props.note && G("div", {
						className: "uppy-Dashboard-note",
						children: this.props.note
					}), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()]
				})
			]
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/AddFilesPanel.js
K();
var Ol = /* @__PURE__ */ u(Ja(), 1), kl = (e) => G("div", {
	className: (0, Ol.default)("uppy-Dashboard-AddFilesPanel", e.className),
	"data-uppy-panelType": "AddFiles",
	"aria-hidden": !e.showAddFilesPanel,
	children: [G("div", {
		className: "uppy-DashboardContent-bar",
		children: [G("div", {
			className: "uppy-DashboardContent-title",
			role: "heading",
			"aria-level": 1,
			children: e.i18n("addingMoreFiles")
		}), G("button", {
			className: "uppy-DashboardContent-back",
			type: "button",
			onClick: () => e.toggleAddFilesPanel(!1),
			children: e.i18n("back")
		})]
	}), G(Dl, { ...e })]
});
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/EditorPanel.js
K();
function Al(e) {
	let t = e.fileCardFor ? e.files[e.fileCardFor] : void 0;
	return t ? G("div", {
		className: (0, Ol.default)("uppy-DashboardContent-panel", e.className),
		role: "tabpanel",
		"data-uppy-panelType": "FileEditor",
		id: "uppy-DashboardContent-panel--editor",
		children: [G("div", {
			className: "uppy-DashboardContent-bar",
			children: [
				G("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": 1,
					children: e.i18nArray("editing", { file: G("span", {
						className: "uppy-DashboardContent-titleFile",
						children: t.meta ? t.meta.name : t.name
					}) })
				}),
				G("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: () => {
						e.uppy.emit("file-editor:cancel", t), e.closeFileEditor();
					},
					children: e.i18n("cancel")
				}),
				G("button", {
					className: "uppy-DashboardContent-save",
					type: "button",
					onClick: e.saveFileEditor,
					children: e.i18n("save")
				})
			]
		}), G("div", {
			className: "uppy-DashboardContent-panelBody",
			children: e.editors.map((t) => e.uppy.getPlugin(t.id).render(e.state))
		})]
	}) : null;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/preact/hooks.js
var jl = o((() => {
	zn();
}));
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/getFileTypeIcon.js
K();
function Ml() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("g", {
			fill: "#686DE0",
			fillRule: "evenodd",
			children: [
				G("path", {
					d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
					fillRule: "nonzero"
				}),
				G("path", {
					d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
					fillRule: "nonzero"
				}),
				G("circle", {
					cx: "7.5",
					cy: "9.5",
					r: "1.5"
				})
			]
		})
	});
}
function Nl() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("path", {
			d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
			fill: "#049BCF",
			fillRule: "nonzero"
		})
	});
}
function Pl() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("path", {
			d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
			fill: "#19AF67",
			fillRule: "nonzero"
		})
	});
}
function Fl() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("path", {
			d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
			fill: "#E2514A",
			fillRule: "nonzero"
		})
	});
}
function Il() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("path", {
			d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
			fill: "#00C469",
			fillRule: "nonzero"
		})
	});
}
function Ll() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("g", {
			fill: "#A7AFB7",
			fillRule: "nonzero",
			children: [G("path", { d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z" }), G("path", { d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z" })]
		})
	});
}
function Rl() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: G("path", {
			d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
			fill: "#5A5E69",
			fillRule: "nonzero"
		})
	});
}
function zl(e) {
	let t = {
		color: "#838999",
		icon: Ll()
	};
	if (!e) return t;
	let n = e.split("/")[0], r = e.split("/")[1];
	return n === "text" ? {
		color: "#5a5e69",
		icon: Rl()
	} : n === "image" ? {
		color: "#686de0",
		icon: Ml()
	} : n === "audio" ? {
		color: "#068dbb",
		icon: Nl()
	} : n === "video" ? {
		color: "#19af67",
		icon: Pl()
	} : n === "application" && r === "pdf" ? {
		color: "#e25149",
		icon: Fl()
	} : n === "application" && [
		"zip",
		"x-7z-compressed",
		"x-zip-compressed",
		"x-rar-compressed",
		"x-tar",
		"x-gzip",
		"x-apple-diskimage"
	].indexOf(r) !== -1 ? {
		color: "#00C469",
		icon: Il()
	} : t;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/ignoreEvent.js
function Bl(e) {
	let { tagName: t } = e.target;
	if (t === "INPUT" || t === "TEXTAREA") {
		e.stopPropagation();
		return;
	}
	e.preventDefault(), e.stopPropagation();
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FilePreview.js
K();
function Vl(e) {
	let { file: t } = e;
	if (t.preview) return G("img", {
		draggable: !1,
		className: "uppy-Dashboard-Item-previewImg",
		alt: t.name,
		src: t.preview
	});
	let { color: n, icon: r } = zl(t.type);
	return G("div", {
		className: "uppy-Dashboard-Item-previewIconWrap",
		children: [G("span", {
			className: "uppy-Dashboard-Item-previewIcon",
			style: { color: n },
			children: r
		}), G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-Dashboard-Item-previewIconBg",
			width: "58",
			height: "76",
			viewBox: "0 0 58 76",
			children: G("rect", {
				fill: "#FFF",
				width: "58",
				height: "76",
				rx: "3",
				fillRule: "evenodd"
			})
		})]
	});
}
K(), El();
function Hl(e) {
	let { computedMetaFields: t, requiredMetaFields: n, updateMeta: r, form: i, formState: a } = e, o = { text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input" };
	return t.map((e) => {
		let t = `uppy-Dashboard-FileCard-input-${e.id}`, s = n.includes(e.id);
		return G("fieldset", {
			className: "uppy-Dashboard-FileCard-fieldset",
			children: [G("label", {
				className: "uppy-Dashboard-FileCard-label",
				htmlFor: t,
				children: e.name
			}), e.render === void 0 ? G("input", {
				className: o.text,
				id: t,
				form: i.id,
				type: e.type || "text",
				required: s,
				value: a[e.id],
				placeholder: e.placeholder,
				onInput: (t) => r(t.target.value, e.id),
				"data-uppy-super-focusable": !0
			}) : e.render({
				value: a[e.id],
				onChange: (t) => r(t, e.id),
				fieldCSSClasses: o,
				required: s,
				form: i.id
			}, xt)]
		}, e.id);
	});
}
K(), jl();
function Ul(e) {
	let { files: t, fileCardFor: n, toggleFileCard: r, saveFileCard: i, metaFields: a, requiredMetaFields: o, openFileEditor: s, i18n: c, i18nArray: l, className: u, canEditFile: d } = e, f = () => typeof a == "function" ? a(t[n]) : a, p = t[n], m = f() ?? [], h = d(p), g = {};
	m.forEach((e) => {
		g[e.id] = p.meta[e.id] ?? "";
	});
	let [_, v] = mn(g), y = yn((e) => {
		e.preventDefault(), i(_, n);
	}, [
		i,
		_,
		n
	]), b = (e, t) => {
		v({
			..._,
			[t]: e
		});
	}, x = () => {
		r(!1, n);
	}, [S] = mn(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = wl(), e;
	}), C = q(null);
	return gn(() => {
		let e = C.current?.getRootNode() ?? document;
		return e instanceof Document ? e.body.appendChild(S) : (e instanceof ShadowRoot, e.appendChild(S)), S.addEventListener("submit", y), () => {
			S.removeEventListener("submit", y), S.parentNode && S.parentNode.removeChild(S);
		};
	}, [S, y]), G("div", {
		className: (0, Ol.default)("uppy-Dashboard-FileCard", u),
		"data-uppy-panelType": "FileCard",
		onDragOver: Bl,
		onDragLeave: Bl,
		onDrop: Bl,
		onPaste: Bl,
		ref: C,
		children: [G("div", {
			className: "uppy-DashboardContent-bar",
			children: [G("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: l("editing", { file: G("span", {
					className: "uppy-DashboardContent-titleFile",
					children: p.meta ? p.meta.name : p.name
				}) })
			}), G("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				form: S.id,
				title: c("finishEditingFile"),
				onClick: x,
				children: c("cancel")
			})]
		}), G("div", {
			className: "uppy-Dashboard-FileCard-inner",
			children: [
				G("div", {
					className: "uppy-Dashboard-FileCard-preview",
					style: { backgroundColor: zl(p.type).color },
					children: [G(Vl, { file: p }), h && G("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
						onClick: (e) => {
							y(e), s(p);
						},
						children: c("editImage")
					})]
				}),
				G("div", {
					className: "uppy-Dashboard-FileCard-info",
					children: G(Hl, {
						computedMetaFields: m,
						requiredMetaFields: o,
						updateMeta: b,
						form: S,
						formState: _
					})
				}),
				G("div", {
					className: "uppy-Dashboard-FileCard-actions",
					children: [G("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
						type: "submit",
						form: S.id,
						children: c("saveChanges")
					}), G("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
						type: "button",
						onClick: x,
						form: S.id,
						children: c("cancel")
					})]
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/shallow-equal/dist/index.modern.mjs
function Wl(e, t) {
	if (e === t) return !0;
	if (!e || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t), i = n.length;
	if (r.length !== i) return !1;
	for (let r = 0; r < i; r++) {
		let i = n[r];
		if (e[i] !== t[i] || !Object.prototype.hasOwnProperty.call(t, i)) return !1;
	}
	return !0;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/copyToClipboard.js
function Gl(e, t = "Copy the URL below") {
	return new Promise((n) => {
		let r = document.createElement("textarea");
		r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "2em", r.style.height = "2em", r.style.padding = "0", r.style.border = "none", r.style.outline = "none", r.style.boxShadow = "none", r.style.background = "transparent", r.value = e, document.body.appendChild(r), r.select();
		let i = () => {
			document.body.removeChild(r), window.prompt(t, e), n();
		};
		try {
			if (!document.execCommand("copy")) return i();
			document.body.removeChild(r), n();
		} catch {
			return document.body.removeChild(r), i();
		}
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
K();
function Kl({ file: e, uploadInProgressOrComplete: t, metaFields: n, canEditFile: r, i18n: i, onClick: a }) {
	return !t && n && n.length > 0 || !t && r(e) ? G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
		type: "button",
		"aria-label": i("editFileWithFilename", { file: e.meta.name }),
		title: i("editFileWithFilename", { file: e.meta.name }),
		onClick: () => a(),
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 14",
			children: G("g", {
				fillRule: "evenodd",
				children: [
					G("path", {
						d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
						fillRule: "nonzero"
					}),
					G("rect", {
						x: "1",
						y: "12.293",
						width: "11",
						height: "1",
						rx: ".5"
					}),
					G("path", {
						fillRule: "nonzero",
						d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
					})
				]
			})
		})
	}) : null;
}
function ql({ i18n: e, onClick: t, file: n }) {
	return G("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
		type: "button",
		"aria-label": e("removeFile", { file: n.meta.name }),
		title: e("removeFile", { file: n.meta.name }),
		onClick: () => t(),
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "18",
			height: "18",
			viewBox: "0 0 18 18",
			children: [G("path", { d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z" }), G("path", {
				fill: "#FFF",
				d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
			})]
		})
	});
}
function Jl({ file: e, uppy: t, i18n: n }) {
	let r = (r) => {
		let { currentTarget: i } = r;
		Gl(e.uploadURL, n("copyLinkToClipboardFallback")).then(() => {
			t.log("Link copied to clipboard."), t.info(n("copyLinkToClipboardSuccess"), "info", 3e3);
		}).catch(t.log).then(() => i.focus({ preventScroll: !0 }));
	};
	return G("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
		type: "button",
		"aria-label": n("copyLink"),
		title: n("copyLink"),
		onClick: (e) => r(e),
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 12",
			children: G("path", { d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z" })
		})
	});
}
function Yl(e) {
	let { uppy: t, file: n, uploadInProgressOrComplete: r, canEditFile: i, metaFields: a, showLinkToFileUploadResult: o, showRemoveButton: s, i18n: c, toggleFileCard: l, openFileEditor: u } = e;
	return G("div", {
		className: "uppy-Dashboard-Item-actionWrapper",
		children: [
			G(Kl, {
				i18n: c,
				file: n,
				uploadInProgressOrComplete: r,
				canEditFile: i,
				metaFields: a,
				onClick: () => {
					a && a.length > 0 ? l(!0, n.id) : u(n);
				}
			}),
			o && n.uploadURL ? G(Jl, {
				file: n,
				uppy: t,
				i18n: c
			}) : null,
			s ? G(ql, {
				i18n: c,
				file: n,
				onClick: () => t.removeFile(n.id)
			}) : null
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
K();
function Xl(e, t, n) {
	return (typeof t == "function" ? t(n) : t)?.find((t) => t.id === e)?.name ?? e;
}
function Zl(e) {
	let { file: t, toggleFileCard: n, i18n: r, metaFields: i } = e, { missingRequiredMetaFields: a } = t;
	if (!a?.length) return null;
	let o = a.map((e) => Xl(e, i, t)).join(", ");
	return G("div", {
		className: "uppy-Dashboard-Item-errorMessage",
		children: [
			r("missingRequiredMetaFields", {
				smart_count: a.length,
				fields: o
			}),
			" ",
			G("button", {
				type: "button",
				class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
				onClick: () => n(!0, t.id),
				children: r("editFile")
			})
		]
	});
}
K(), p(), X();
var Ql = (e) => {
	let { author: t, name: n } = e.file.meta;
	function r() {
		return e.isSingleFile && e.containerHeight >= 350 ? 90 : e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : t ? 20 : 30;
	}
	return G("div", {
		className: "uppy-Dashboard-Item-name",
		title: n,
		children: mt(n, r())
	});
}, $l = (e) => {
	let { author: t } = e.file.meta, n = "remote" in e.file ? e.file.remote?.providerName : void 0;
	return t ? G("div", {
		className: "uppy-Dashboard-Item-author",
		children: [G("a", {
			href: `${t.url}?utm_source=Companion&utm_medium=referral`,
			target: "_blank",
			rel: "noopener noreferrer",
			children: mt(t.name, 13)
		}), n ? G(H, { children: [
			" · ",
			n,
			" · "
		] }) : null]
	}) : null;
}, eu = (e) => e.file.size && G("div", {
	className: "uppy-Dashboard-Item-statusSize",
	children: d(e.file.size)
}), tu = (e) => e.file.isGhost && G("span", { children: [" • ", G("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
	type: "button",
	onClick: () => e.toggleAddFilesPanel(!0),
	children: e.i18n("reSelect")
})] }), nu = ({ file: e, onClick: t }) => e.error ? G("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
	"aria-label": e.error,
	"data-microtip-position": "bottom",
	"data-microtip-size": "medium",
	onClick: t,
	type: "button",
	children: "?"
}) : null;
function ru(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, toggleAddFilesPanel: a, isSingleFile: o, containerHeight: s, containerWidth: c } = e;
	return G("div", {
		className: "uppy-Dashboard-Item-fileInfo",
		"data-uppy-file-source": t.source,
		children: [
			G("div", {
				className: "uppy-Dashboard-Item-fileName",
				children: [Ql({
					file: t,
					isSingleFile: o,
					containerHeight: s,
					containerWidth: c
				}), G(nu, {
					file: t,
					onClick: () => alert(t.error)
				})]
			}),
			G("div", {
				className: "uppy-Dashboard-Item-status",
				children: [
					$l({ file: t }),
					eu({ file: t }),
					tu({
						file: t,
						toggleAddFilesPanel: a,
						i18n: n
					})
				]
			}),
			G(Zl, {
				file: t,
				i18n: n,
				toggleFileCard: r,
				metaFields: i
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
K();
function iu(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, showLinkToFileUploadResult: a } = e;
	return G("div", {
		className: "uppy-Dashboard-Item-previewInnerWrap",
		style: { backgroundColor: t.preview ? "rgba(255, 255, 255, 0.5)" : zl(t.type).color },
		children: [
			a && t.uploadURL && G("a", {
				className: "uppy-Dashboard-Item-previewLink",
				href: t.uploadURL,
				rel: "noreferrer noopener",
				target: "_blank",
				"aria-label": t.meta.name,
				children: G("span", {
					hidden: !0,
					children: t.meta.name
				})
			}),
			G(Vl, { file: t }),
			G(Zl, {
				file: t,
				i18n: n,
				toggleFileCard: r,
				metaFields: i
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
K();
function au(e) {
	if (!e.isUploaded) {
		if (e.error && !e.hideRetryButton) {
			e.uppy.retryUpload(e.file.id);
			return;
		}
		e.resumableUploads && !e.hidePauseResumeButton ? e.uppy.pauseResume(e.file.id) : e.individualCancellation && !e.hideCancelButton && e.uppy.removeFile(e.file.id);
	}
}
function ou(e) {
	return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : "";
}
function su(e) {
	return G("div", {
		className: "uppy-Dashboard-Item-progress",
		children: G("button", {
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
			type: "button",
			"aria-label": ou(e),
			title: ou(e),
			onClick: () => au(e),
			children: e.children
		})
	});
}
function cu({ children: e }) {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "70",
		height: "70",
		viewBox: "0 0 36 36",
		className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle",
		children: e
	});
}
function lu({ progress: e }) {
	let t = 2 * Math.PI * 15;
	return G("g", { children: [G("circle", {
		className: "uppy-Dashboard-Item-progressIcon--bg",
		r: "15",
		cx: "18",
		cy: "18",
		"stroke-width": "2",
		fill: "none"
	}), G("circle", {
		className: "uppy-Dashboard-Item-progressIcon--progress",
		r: "15",
		cx: "18",
		cy: "18",
		transform: "rotate(-90, 18, 18)",
		fill: "none",
		"stroke-width": "2",
		"stroke-dasharray": t,
		"stroke-dashoffset": t - t / 100 * e
	})] });
}
function uu(e) {
	return !e.file.progress.uploadStarted || e.file.progress.percentage === void 0 ? null : e.isUploaded ? G("div", {
		className: "uppy-Dashboard-Item-progress",
		children: G("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: G(cu, { children: [G("circle", {
				r: "15",
				cx: "18",
				cy: "18",
				fill: "#1bb240"
			}), G("polygon", {
				className: "uppy-Dashboard-Item-progressIcon--check",
				transform: "translate(2, 3)",
				points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
			})] })
		})
	}) : e.recoveredState ? null : e.error && !e.hideRetryButton ? G(su, {
		...e,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
			width: "28",
			height: "31",
			viewBox: "0 0 16 19",
			children: [
				G("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }),
				G("path", { d: "M7.9 3H10v2H7.9z" }),
				G("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }),
				G("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })
			]
		})
	}) : e.resumableUploads && !e.hidePauseResumeButton ? G(su, {
		...e,
		children: G(cu, { children: [G(lu, { progress: e.file.progress.percentage }), e.file.isPaused ? G("polygon", {
			className: "uppy-Dashboard-Item-progressIcon--play",
			transform: "translate(3, 3)",
			points: "12 20 12 10 20 15"
		}) : G("g", {
			className: "uppy-Dashboard-Item-progressIcon--pause",
			transform: "translate(14.5, 13)",
			children: [G("rect", {
				x: "0",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			}), G("rect", {
				x: "5",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			})]
		})] })
	}) : !e.resumableUploads && e.individualCancellation && !e.hideCancelButton ? G(su, {
		...e,
		children: G(cu, { children: [G(lu, { progress: e.file.progress.percentage }), G("polygon", {
			className: "cancel",
			transform: "translate(2, 2)",
			points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
		})] })
	}) : G("div", {
		className: "uppy-Dashboard-Item-progress",
		children: G("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: G(cu, { children: G(lu, { progress: e.file.progress.percentage }) })
		})
	});
}
K(), El();
var du = class extends U {
	componentDidMount() {
		let { file: e } = this.props;
		e.preview || this.props.handleRequestThumbnail(e);
	}
	shouldComponentUpdate(e) {
		return !Wl(this.props, e);
	}
	componentDidUpdate() {
		let { file: e } = this.props;
		e.preview || this.props.handleRequestThumbnail(e);
	}
	componentWillUnmount() {
		let { file: e } = this.props;
		e.preview || this.props.handleCancelThumbnail(e);
	}
	render() {
		let { file: e } = this.props, t = e.progress.preprocess || e.progress.postprocess, n = !!e.progress.uploadComplete && !t && !e.error, r = !!e.progress.uploadStarted || !!t, i = e.progress.uploadStarted && !e.progress.uploadComplete || t, a = e.error || !1, { isGhost: o } = e, s = (this.props.individualCancellation || !i) && !n;
		return n && this.props.showRemoveButtonAfterComplete && (s = !0), G("div", {
			className: (0, Ol.default)({
				"uppy-Dashboard-Item": !0,
				"is-inprogress": i && !this.props.recoveredState,
				"is-processing": t,
				"is-complete": n,
				"is-error": !!a,
				"is-resumable": this.props.resumableUploads,
				"is-noIndividualCancellation": !this.props.individualCancellation,
				"is-ghost": o
			}),
			id: `uppy_${e.id}`,
			role: this.props.role,
			children: [G("div", {
				className: "uppy-Dashboard-Item-preview",
				children: [G(iu, {
					file: e,
					showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
					i18n: this.props.i18n,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields
				}), G(uu, {
					uppy: this.props.uppy,
					file: e,
					error: a,
					isUploaded: n,
					hideRetryButton: this.props.hideRetryButton,
					hideCancelButton: this.props.hideCancelButton,
					hidePauseResumeButton: this.props.hidePauseResumeButton,
					recoveredState: this.props.recoveredState,
					resumableUploads: this.props.resumableUploads,
					individualCancellation: this.props.individualCancellation,
					i18n: this.props.i18n
				})]
			}), G("div", {
				className: "uppy-Dashboard-Item-fileInfoAndButtons",
				children: [G(ru, {
					file: e,
					containerWidth: this.props.containerWidth,
					containerHeight: this.props.containerHeight,
					i18n: this.props.i18n,
					toggleAddFilesPanel: this.props.toggleAddFilesPanel,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields,
					isSingleFile: this.props.isSingleFile
				}), G(Yl, {
					file: e,
					metaFields: this.props.metaFields,
					showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
					showRemoveButton: s,
					canEditFile: this.props.canEditFile,
					uploadInProgressOrComplete: r,
					toggleFileCard: this.props.toggleFileCard,
					openFileEditor: this.props.openFileEditor,
					uppy: this.props.uppy,
					i18n: this.props.i18n
				})]
			})]
		});
	}
};
K(), X(), jl();
function fu(e, t) {
	let n = [], r = [];
	return e.forEach((e) => {
		r.length < t ? r.push(e) : (n.push(r), r = [e]);
	}), r.length && n.push(r), n;
}
function pu({ id: e, i18n: t, uppy: n, files: r, resumableUploads: i, hideRetryButton: a, hidePauseResumeButton: o, hideCancelButton: s, showLinkToFileUploadResult: c, showRemoveButtonAfterComplete: l, metaFields: u, isSingleFile: d, toggleFileCard: f, handleRequestThumbnail: p, handleCancelThumbnail: m, recoveredState: h, individualCancellation: g, itemsPerRow: _, openFileEditor: v, canEditFile: y, toggleAddFilesPanel: b, containerWidth: x, containerHeight: S }) {
	let C = _ === 1 ? 71 : 200, w = vn(() => {
		let e = (e, t) => Number(r[t].isGhost) - Number(r[e].isGhost), t = Object.keys(r);
		return h && t.sort(e), fu(t, _);
	}, [
		r,
		_,
		h
	]), T = (_) => G("div", {
		class: "uppy-Dashboard-filesInner",
		role: "presentation",
		children: _.map((_) => G(du, {
			uppy: n,
			id: e,
			i18n: t,
			resumableUploads: i,
			individualCancellation: g,
			hideRetryButton: a,
			hidePauseResumeButton: o,
			hideCancelButton: s,
			showLinkToFileUploadResult: c,
			showRemoveButtonAfterComplete: l,
			metaFields: u,
			recoveredState: h,
			isSingleFile: d,
			containerWidth: x,
			containerHeight: S,
			toggleFileCard: f,
			handleRequestThumbnail: p,
			handleCancelThumbnail: m,
			role: "listitem",
			openFileEditor: v,
			canEditFile: y,
			toggleAddFilesPanel: b,
			file: r[_]
		}, _))
	}, _[0]);
	return d ? G("div", {
		class: "uppy-Dashboard-files",
		children: T(w[0])
	}) : G(Bn, {
		class: "uppy-Dashboard-files",
		role: "list",
		data: w,
		renderRow: T,
		rowHeight: C
	});
}
K(), El();
var mu = 300, hu = class extends U {
	ref = Ct();
	componentWillEnter(e) {
		this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, mu);
	}
	componentWillLeave(e) {
		this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, mu);
	}
	render() {
		let { children: e } = this.props;
		return G("div", {
			className: "uppy-Informer-animated",
			ref: this.ref,
			children: e
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/TransitionGroup.js
El();
function gu(e, t) {
	return Object.assign(e, t);
}
function _u(e, t) {
	return e?.key ?? t;
}
function vu(e, t) {
	let n = e._ptgLinkedRefs ||= {};
	return n[t] || (n[t] = (n) => {
		e.refs[t] = n;
	});
}
function yu(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) if (e[n] != null) {
		let r = _u(e[n], n.toString(36));
		t[r] = e[n];
	}
	return t;
}
function bu(e, t) {
	e ||= {}, t ||= {};
	let n = (n) => Object.hasOwn(t, n) ? t[n] : e[n], r = {}, i = [];
	for (let n in e) Object.hasOwn(t, n) ? i.length && (r[n] = i, i = []) : i.push(n);
	let a = {};
	for (let e in t) {
		if (Object.hasOwn(r, e)) for (let t = 0; t < r[e].length; t++) {
			let i = r[e][t];
			a[r[e][t]] = n(i);
		}
		a[e] = n(e);
	}
	for (let e = 0; e < i.length; e++) a[i[e]] = n(i[e]);
	return a;
}
var xu = (e) => e, Su = class extends U {
	constructor(e, t) {
		super(e, t), this.refs = {}, this.state = { children: yu(Mt(Mt(this.props.children)) || []) }, this.performAppear = this.performAppear.bind(this), this.performEnter = this.performEnter.bind(this), this.performLeave = this.performLeave.bind(this);
	}
	componentWillMount() {
		this.currentlyTransitioningKeys = {}, this.keysToAbortLeave = [], this.keysToEnter = [], this.keysToLeave = [];
	}
	componentDidMount() {
		let e = this.state.children;
		for (let t in e) e[t] && this.performAppear(t);
	}
	componentWillReceiveProps(e) {
		let t = yu(Mt(e.children) || []), n = this.state.children;
		this.setState((e) => ({ children: bu(e.children, t) }));
		let r;
		for (r in t) if (Object.hasOwn(t, r)) {
			let e = n && Object.hasOwn(n, r);
			t[r] && e && this.currentlyTransitioningKeys[r] ? (this.keysToEnter.push(r), this.keysToAbortLeave.push(r)) : t[r] && !e && !this.currentlyTransitioningKeys[r] && this.keysToEnter.push(r);
		}
		for (r in n) if (Object.hasOwn(n, r)) {
			let e = t && Object.hasOwn(t, r);
			n[r] && !e && !this.currentlyTransitioningKeys[r] && this.keysToLeave.push(r);
		}
	}
	componentDidUpdate() {
		let { keysToEnter: e } = this;
		this.keysToEnter = [], e.forEach(this.performEnter);
		let { keysToLeave: t } = this;
		this.keysToLeave = [], t.forEach(this.performLeave);
	}
	_finishAbort(e) {
		let t = this.keysToAbortLeave.indexOf(e);
		t !== -1 && this.keysToAbortLeave.splice(t, 1);
	}
	performAppear(e) {
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e);
	}
	_handleDoneAppearing(e) {
		let t = this.refs[e];
		t?.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
		let n = yu(Mt(this.props.children) || []);
		(!n || !Object.hasOwn(n, e)) && this.performLeave(e);
	}
	performEnter(e) {
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e);
	}
	_handleDoneEntering(e) {
		let t = this.refs[e];
		t?.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
		let n = yu(Mt(this.props.children) || []);
		(!n || !Object.hasOwn(n, e)) && this.performLeave(e);
	}
	performLeave(e) {
		if (this.keysToAbortLeave.indexOf(e) !== -1) return;
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillLeave ? t.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e);
	}
	_handleDoneLeaving(e) {
		if (this.keysToAbortLeave.indexOf(e) !== -1) return;
		let t = this.refs[e];
		t?.componentDidLeave && t.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
		let n = yu(Mt(this.props.children) || []);
		if (n && Object.hasOwn(n, e)) this.performEnter(e);
		else {
			let t = gu({}, this.state.children);
			delete t[e], this.setState({ children: t });
		}
	}
	render({ childFactory: e, transitionLeave: t, transitionName: n, transitionAppear: r, transitionEnter: i, transitionLeaveTimeout: a, transitionEnterTimeout: o, transitionAppearTimeout: s, component: c, ...l }, { children: u }) {
		return xt(c, l, Object.entries(u).map(([t, n]) => {
			if (!n) return;
			let r = vu(this, t);
			return Kt(e(n), {
				ref: r,
				key: t
			});
		}).filter(Boolean));
	}
};
Su.defaultProps = {
	component: "span",
	childFactory: xu
}, K(), El();
var Cu = class extends U {
	render() {
		let { info: e } = this.props.uppy.getState();
		return G("div", {
			className: "uppy uppy-Informer",
			children: G(Su, { children: e.map((e) => G(hu, { children: G("p", {
				role: "alert",
				children: [
					e.message,
					" ",
					e.details && G("span", {
						"aria-label": e.details,
						"data-microtip-position": "top-left",
						"data-microtip-size": "medium",
						role: "tooltip",
						onClick: () => alert(`${e.message} \n\n ${e.details}`),
						children: "?"
					})
				]
			}) }, e.message)) })
		});
	}
};
K(), jl();
function wu({ activePickerPanel: e, className: t, hideAllPanels: n, i18n: r, state: i, uppy: a }) {
	let o = q(null), s = a.getPlugin(e.id), c = !!s?.opts.standalone, l = (e) => {
		let t = e.target;
		return !!s?.acceptsFileDrops && !!e.dataTransfer?.types.includes("Files") && t.closest("input, textarea, dialog") == null;
	}, u = (e) => {
		l(e) || (Bl(e), e.type === "dragover" && e.defaultPrevented && e.dataTransfer && (e.dataTransfer.dropEffect = "none"));
	};
	return G("div", {
		className: (0, Ol.default)("uppy-DashboardContent-panel", t),
		role: "tabpanel",
		"data-uppy-panelType": "PickerPanel",
		id: `uppy-DashboardContent-panel--${e.id}`,
		onDragOver: u,
		onDragLeave: u,
		onDrop: u,
		onPaste: Bl,
		children: [!c && G("div", {
			className: "uppy-DashboardContent-bar",
			children: [G("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: r("importFrom", { name: e.name })
			}), G("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: n,
				children: r("cancel")
			})]
		}), G("div", {
			ref: o,
			className: "uppy-DashboardContent-panelBody",
			children: s?.render(i, o.current)
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/PickerPanelTopBar.js
K();
var Tu = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete",
	STATE_PAUSED: "paused"
};
function Eu(e, t, n, r = {}) {
	if (e) return Tu.STATE_ERROR;
	if (t) return Tu.STATE_COMPLETE;
	if (n) return Tu.STATE_PAUSED;
	let i = Tu.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return Tu.STATE_UPLOADING;
		t.preprocess && (i = Tu.STATE_PREPROCESSING), t.postprocess && i !== Tu.STATE_PREPROCESSING && (i = Tu.STATE_POSTPROCESSING);
	}
	return i;
}
function Du({ files: e, i18n: t, isAllComplete: n, isAllErrored: r, isAllPaused: i, inProgressNotPausedFiles: a, newFiles: o, processingFiles: s }) {
	switch (Eu(r, n, i, e)) {
		case "uploading": return t("uploadingXFiles", { smart_count: a.length });
		case "preprocessing":
		case "postprocessing": return t("processingXFiles", { smart_count: s.length });
		case "paused": return t("uploadPaused");
		case "waiting": return t("xFilesSelected", { smart_count: o.length });
		case "complete": return t("uploadComplete");
		case "error": return t("error");
	}
}
function Ou(e) {
	let { i18n: t, isAllComplete: n, hideCancelButton: r, maxNumberOfFiles: i, toggleAddFilesPanel: a, totalFileCount: o, uppy: s } = e, { allowNewUpload: c } = e;
	return c && i && (c = o < i), G("div", {
		className: "uppy-DashboardContent-bar",
		children: [
			!n && !r ? G("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: () => s.cancelAll(),
				children: t("cancel")
			}) : G("div", {}),
			G("div", {
				className: "uppy-DashboardContent-title",
				children: G(Du, { ...e })
			}),
			c ? G("button", {
				className: "uppy-DashboardContent-addMore",
				type: "button",
				"aria-label": t("addMoreFiles"),
				title: t("addMoreFiles"),
				onClick: () => a(!0),
				children: [G("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					children: G("path", { d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z" })
				}), G("span", {
					className: "uppy-DashboardContent-addMoreCaption",
					children: t("addMore")
				})]
			}) : G("div", {})
		]
	});
}
El(), jl();
var ku = "uppy-transition-slideDownUp", Au = 250;
function ju({ children: e }) {
	let [t, n] = mn(null), [r, i] = mn(""), a = q(), o = q(), s = q(), c = yn(() => {
		i(`${ku}-enter`), cancelAnimationFrame(s.current), clearTimeout(o.current), o.current = void 0, s.current = requestAnimationFrame(() => {
			i(`${ku}-enter ${ku}-enter-active`), a.current = setTimeout(() => {
				i("");
			}, Au);
		});
	}, []), l = yn(() => {
		i(`${ku}-leave`), cancelAnimationFrame(s.current), clearTimeout(a.current), a.current = void 0, s.current = requestAnimationFrame(() => {
			i(`${ku}-leave ${ku}-leave-active`), o.current = setTimeout(() => {
				n(null), i("");
			}, Au);
		});
	}, []);
	return gn(() => {
		let r = Mt(e)[0];
		t !== r && (r && !t ? c() : t && !r && !o.current && l(), n(r));
	}, [
		e,
		t,
		c,
		l
	]), gn(() => () => {
		clearTimeout(a.current), clearTimeout(o.current), cancelAnimationFrame(s.current);
	}, []), t ? Kt(t, { className: (0, Ol.default)(r, t.props.className) }) : null;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBarStates.js
var Mu = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete"
};
K(), p(), X();
var Nu = "·", Pu = () => ` ${Nu} `;
function Fu(e) {
	let { newFiles: t, isUploadStarted: n, recoveredState: r, i18n: i, uploadState: a, isSomeGhost: o, startUpload: s } = e, c = (0, Ol.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", { "uppy-c-btn-primary": a === Mu.STATE_WAITING }, { "uppy-StatusBar-actionBtn--disabled": o }), l = i(t && n && !r ? "uploadXNewFiles" : "uploadXFiles", { smart_count: t });
	return G("button", {
		type: "button",
		className: c,
		"aria-label": i("uploadXFiles", { smart_count: t }),
		onClick: s,
		disabled: o,
		"data-uppy-super-focusable": !0,
		children: l
	});
}
function Iu(e) {
	let { i18n: t, uppy: n } = e;
	return G("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
		"aria-label": t("retryUpload"),
		onClick: () => n.retryAll().catch(() => {}),
		"data-uppy-super-focusable": !0,
		"data-cy": "retry",
		children: [G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "8",
			height: "10",
			viewBox: "0 0 8 10",
			children: G("path", { d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z" })
		}), t("retry")]
	});
}
function Lu(e) {
	let { i18n: t, uppy: n } = e;
	return G("button", {
		type: "button",
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		title: t("cancel"),
		"aria-label": t("cancel"),
		onClick: () => n.cancelAll(),
		"data-cy": "cancel",
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: G("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [G("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), G("path", {
					fill: "#FFF",
					d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
				})]
			})
		})
	});
}
function Ru(e) {
	let { isAllPaused: t, i18n: n, isAllComplete: r, resumableUploads: i, uppy: a } = e, o = n(t ? "resume" : "pause");
	function s() {
		if (!r) {
			if (!i) {
				a.cancelAll();
				return;
			}
			if (t) {
				a.resumeAll();
				return;
			}
			a.pauseAll();
		}
	}
	return G("button", {
		title: o,
		"aria-label": o,
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		type: "button",
		onClick: s,
		"data-cy": "togglePauseResume",
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: G("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [G("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), G("path", {
					fill: "#FFF",
					d: t ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
				})]
			})
		})
	});
}
function zu(e) {
	let { i18n: t, doneButtonHandler: n } = e;
	return G("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: t("done")
	});
}
function Bu() {
	return G("svg", {
		className: "uppy-StatusBar-spinner",
		"aria-hidden": "true",
		focusable: "false",
		width: "14",
		height: "14",
		children: G("path", {
			d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
			fillRule: "evenodd"
		})
	});
}
function Vu(e) {
	let { progress: t } = e, { value: n, mode: r, message: i } = t;
	return G("div", {
		className: "uppy-StatusBar-content",
		children: [
			G(Bu, {}),
			r === "determinate" ? `${Math.round(n * 100)}% · ` : "",
			i
		]
	});
}
function Hu(e) {
	let { numUploads: t, complete: n, totalUploadedSize: r, totalSize: i, totalETA: a, i18n: o } = e, s = t > 1, c = d(r);
	return G("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [s && o("filesUploadedOfTotal", {
			complete: n,
			smart_count: t
		}), G("span", {
			className: "uppy-StatusBar-additionalInfo",
			children: [
				s && Pu(),
				i == null ? o("dataUploadedOfUnknown", { complete: c }) : o("dataUploadedOfTotal", {
					complete: c,
					total: d(i)
				}),
				Pu(),
				a != null && o("xTimeLeft", { time: tt(a) })
			]
		})]
	});
}
function Uu(e) {
	let { i18n: t, complete: n, numUploads: r } = e;
	return G("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: t("filesUploadedOfTotal", {
			complete: n,
			smart_count: r
		})
	});
}
function Wu(e) {
	let { i18n: t, newFiles: n, startUpload: r } = e, i = (0, Ol.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
	return G("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [G("div", {
			className: "uppy-StatusBar-statusSecondaryHint",
			children: t("xMoreFilesAdded", { smart_count: n })
		}), G("button", {
			type: "button",
			className: i,
			"aria-label": t("uploadXFiles", { smart_count: n }),
			onClick: r,
			children: t("upload")
		})]
	});
}
function Gu(e) {
	let { i18n: t, supportsUploadProgress: n, totalProgress: r, hideProgressDetails: i, isUploadStarted: a, isAllComplete: o, isAllPaused: s, newFiles: c, numUploads: l, complete: u, totalUploadedSize: d, totalSize: f, totalETA: p, startUpload: m } = e, h = c && a;
	if (!a || o) return null;
	let g = t(s ? "paused" : "uploading");
	function _() {
		return !s && !h && !i ? n ? G(Hu, {
			numUploads: l,
			complete: u,
			totalUploadedSize: d,
			totalSize: f,
			totalETA: p,
			i18n: t
		}) : G(Uu, {
			i18n: t,
			complete: u,
			numUploads: l
		}) : null;
	}
	return G("div", {
		className: "uppy-StatusBar-content",
		title: g,
		children: [s ? null : G(Bu, {}), G("div", {
			className: "uppy-StatusBar-status",
			children: [
				G("div", {
					className: "uppy-StatusBar-statusPrimary",
					children: n && r !== 0 ? `${g}: ${r}%` : g
				}),
				_(),
				h ? G(Wu, {
					i18n: t,
					newFiles: c,
					startUpload: m
				}) : null
			]
		})]
	});
}
function Ku(e) {
	let { i18n: t } = e;
	return G("div", {
		className: "uppy-StatusBar-content",
		role: "status",
		title: t("complete"),
		children: G("div", {
			className: "uppy-StatusBar-status",
			children: G("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [G("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-StatusBar-statusIndicator uppy-c-icon",
					width: "15",
					height: "11",
					viewBox: "0 0 15 11",
					children: G("path", { d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z" })
				}), t("complete")]
			})
		})
	});
}
function qu(e) {
	let { error: t, i18n: n, complete: r, numUploads: i } = e;
	function a() {
		let e = `${n("uploadFailed")} \n\n ${t}`;
		alert(e);
	}
	return G("div", {
		className: "uppy-StatusBar-content",
		title: n("uploadFailed"),
		children: [G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-StatusBar-statusIndicator uppy-c-icon",
			width: "11",
			height: "11",
			viewBox: "0 0 11 11",
			children: G("path", { d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z" })
		}), G("div", {
			className: "uppy-StatusBar-status",
			children: [G("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [n("uploadFailed"), G("button", {
					className: "uppy-u-reset uppy-StatusBar-details",
					"aria-label": n("showErrorDetails"),
					"data-microtip-position": "top-right",
					"data-microtip-size": "medium",
					onClick: a,
					type: "button",
					children: "?"
				})]
			}), G(Uu, {
				i18n: n,
				complete: r,
				numUploads: i
			})]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/calculateProcessingProgress.js
function Ju(e) {
	let t = [], n = "indeterminate", r;
	for (let { progress: i } of Object.values(e)) {
		let { preprocess: e, postprocess: a } = i;
		r == null && (e || a) && ({mode: n, message: r} = e || a), e?.mode === "determinate" && t.push(e.value), a?.mode === "determinate" && t.push(a.value);
	}
	let i = t.reduce((e, n) => e + n / t.length, 0);
	return {
		mode: n,
		message: r,
		value: i
	};
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBarUI.js
K();
var { STATE_ERROR: Yu, STATE_WAITING: Xu, STATE_PREPROCESSING: Zu, STATE_UPLOADING: Qu, STATE_POSTPROCESSING: $u, STATE_COMPLETE: ed } = Mu;
function td({ newFiles: e, allowNewUpload: t, isUploadInProgress: n, isAllPaused: r, resumableUploads: i, error: a, hideUploadButton: o = void 0, hidePauseResumeButton: s = !1, hideCancelButton: c = !1, hideRetryButton: l = !1, recoveredState: u, uploadState: d, totalProgress: f, files: p, supportsUploadProgress: m, hideAfterFinish: h = !1, isSomeGhost: g, doneButtonHandler: _ = void 0, isUploadStarted: v, i18n: y, startUpload: b, uppy: x, isAllComplete: S, hideProgressDetails: C = void 0, numUploads: w, complete: T, totalSize: E, totalETA: D, totalUploadedSize: O }) {
	function k() {
		switch (d) {
			case $u:
			case Zu: {
				let e = Ju(p);
				return e.mode === "determinate" ? e.value * 100 : f;
			}
			case Yu: return null;
			case Qu: return m ? f : null;
			default: return f;
		}
	}
	function A() {
		switch (d) {
			case $u:
			case Zu: {
				let { mode: e } = Ju(p);
				return e === "indeterminate";
			}
			case Qu: return !m;
			default: return !1;
		}
	}
	let j = k(), M = j ?? 100, N = !a && e && (!n && !r || u) && t && !o, P = !c && d !== Xu && d !== ed, F = i && !s && d === Qu, ee = a && !S && !l, te = _ && d === ed, ne = (0, Ol.default)("uppy-StatusBar-progress", { "is-indeterminate": A() }), re = (0, Ol.default)("uppy-StatusBar", `is-${d}`, { "has-ghosts": g }), ie = (() => {
		switch (d) {
			case Zu:
			case $u: return G(Vu, { progress: Ju(p) });
			case ed: return G(Ku, { i18n: y });
			case Yu: return G(qu, {
				error: a,
				i18n: y,
				numUploads: w,
				complete: T
			});
			case Qu: return G(Gu, {
				i18n: y,
				supportsUploadProgress: m,
				totalProgress: f,
				hideProgressDetails: C,
				isUploadStarted: v,
				isAllComplete: S,
				isAllPaused: r,
				newFiles: e,
				numUploads: w,
				complete: T,
				totalUploadedSize: O,
				totalSize: E,
				totalETA: D,
				startUpload: b
			});
			default: return null;
		}
	})();
	return !(N || ee || F || P || te) && !ie || d === ed && h ? null : G("div", {
		className: re,
		children: [
			G("div", {
				className: ne,
				style: { width: `${M}%` },
				role: "progressbar",
				"aria-label": `${M}%`,
				"aria-valuetext": `${M}%`,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": j
			}),
			ie,
			G("div", {
				className: "uppy-StatusBar-actions",
				children: [
					N ? G(Fu, {
						newFiles: e,
						isUploadStarted: v,
						recoveredState: u,
						i18n: y,
						isSomeGhost: g,
						startUpload: b,
						uploadState: d
					}) : null,
					ee ? G(Iu, {
						i18n: y,
						uppy: x
					}) : null,
					F ? G(Ru, {
						isAllPaused: r,
						i18n: y,
						isAllComplete: S,
						resumableUploads: i,
						uppy: x
					}) : null,
					P ? G(Lu, {
						i18n: y,
						uppy: x
					}) : null,
					te ? G(zu, {
						i18n: y,
						doneButtonHandler: _
					}) : null
				]
			})
		]
	});
}
K(), X(), El();
var nd = 2e3, rd = 2e3;
function id(e, t, n, r) {
	if (e) return Mu.STATE_ERROR;
	if (t) return Mu.STATE_COMPLETE;
	if (n) return Mu.STATE_WAITING;
	let i = Mu.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return Mu.STATE_UPLOADING;
		t.preprocess && (i = Mu.STATE_PREPROCESSING), t.postprocess && i !== Mu.STATE_PREPROCESSING && (i = Mu.STATE_POSTPROCESSING);
	}
	return i;
}
var ad = class extends U {
	#e;
	#t;
	#n;
	#r;
	componentDidMount() {
		this.#e = performance.now(), this.#t = this.props.uppy.getFiles().reduce((e, t) => e + (t.progress.bytesUploaded || 0), 0), this.props.uppy.on("upload", this.#i);
	}
	componentWillUnmount() {
		this.props.uppy.off("upload", this.#i);
	}
	#i = () => {
		let { recoveredState: e } = this.props.uppy.getState();
		if (this.#n = null, this.#r = null, e) {
			this.#t = Object.values(e.files).reduce((e, { progress: t }) => e + (t.bytesUploaded || 0), 0);
			return;
		}
		this.#e = performance.now(), this.#t = 0;
	};
	#a(e) {
		if (e.total == null || e.total === 0) return null;
		let t = e.total - e.uploaded;
		if (t <= 0) return null;
		this.#e ??= performance.now();
		let n = performance.now() - this.#e;
		if (n === 0) return Math.round((this.#r ?? 0) / 100) / 10;
		if (this.#t == null) return this.#t = e.uploaded, null;
		let r = e.uploaded - this.#t;
		if (this.#t = e.uploaded, r <= 0) return Math.round((this.#r ?? 0) / 100) / 10;
		let i = r / n;
		if (!Number.isFinite(i) || i <= 0) return null;
		let a = this.#n == null ? i : x(i, this.#n, nd, n);
		if (!Number.isFinite(a) || a <= 0) return null;
		this.#n = a;
		let o = t / a;
		if (!Number.isFinite(o) || o < 0) return null;
		let s = Math.max((this.#r ?? 0) - n, 0), c = this.#r == null ? o : x(o, s, rd, n);
		return !Number.isFinite(c) || c < 0 ? null : (this.#r = c, this.#e = performance.now(), Math.round(c / 100) / 10);
	}
	startUpload = () => {
		let { recoveredState: e } = this.props.uppy.getState();
		e ? this.props.uppy.emit("restore-confirmed") : this.props.uppy.upload().catch((() => {}));
	};
	render() {
		let { capabilities: e, files: t, allowNewUpload: n, totalProgress: r, error: i, recoveredState: a } = this.props.uppy.getState(), { newFiles: o, startedFiles: s, completeFiles: c, isUploadStarted: l, isAllComplete: u, isAllPaused: d, isUploadInProgress: f, isSomeGhost: p } = this.props.uppy.getObjectOfFilesPerState(), m = a ? Object.values(t) : o, h = !!e.resumableUploads, g = e.uploadProgress !== !1, _ = null, v = 0;
		s.every((e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0) ? (_ = 0, s.forEach((e) => {
			_ += e.progress.bytesTotal || 0, v += e.progress.bytesUploaded || 0;
		})) : s.forEach((e) => {
			v += e.progress.bytesUploaded || 0;
		});
		let y = this.#a({
			uploaded: v,
			total: _
		});
		return G(td, {
			error: i,
			uploadState: id(i, u, a, t || {}),
			allowNewUpload: n,
			totalProgress: r,
			totalSize: _,
			totalUploadedSize: v,
			isAllComplete: u,
			isAllPaused: d,
			isUploadStarted: l,
			isUploadInProgress: f,
			isSomeGhost: p,
			recoveredState: a,
			complete: c.length,
			newFiles: m.length,
			numUploads: s.length,
			totalETA: y,
			files: t,
			i18n: this.props.i18n,
			uppy: this.props.uppy,
			startUpload: this.startUpload,
			doneButtonHandler: this.props.doneButtonHandler,
			resumableUploads: h,
			supportsUploadProgress: g,
			hideProgressDetails: this.props.hideProgressDetails,
			hideUploadButton: this.props.hideUploadButton,
			hideRetryButton: this.props.hideRetryButton,
			hidePauseResumeButton: this.props.hidePauseResumeButton,
			hideCancelButton: this.props.hideCancelButton,
			hideAfterFinish: this.props.hideAfterFinish
		});
	}
};
K(), X();
var od = 900, sd = 700, cd = 576, ld = 330;
function ud(e) {
	let { activePickerPanel: t, fileCardFor: n } = e, r = e.totalFileCount === 0, i = e.totalFileCount === 1, a = e.containerHeight > ld, o = (0, Ol.default)({
		"uppy-Dashboard": !0,
		"uppy-Dashboard--isDisabled": e.disabled,
		"uppy-Dashboard--animateOpenClose": e.animateOpenClose,
		"uppy-Dashboard--isClosing": e.isClosing,
		"uppy-Dashboard--isDraggingOver": e.isDraggingOver,
		"uppy-Dashboard--modal": !e.inline,
		"uppy-size--md": e.containerWidth > cd,
		"uppy-size--lg": e.containerWidth > sd,
		"uppy-size--xl": e.containerWidth > od,
		"uppy-size--height-md": e.containerHeight > ld,
		"uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel,
		"uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible,
		"uppy-Dashboard--singleFile": e.singleFileFullScreen && i && a
	}), s = 1;
	e.containerWidth > od ? s = 5 : e.containerWidth > sd ? s = 4 : e.containerWidth > cd && (s = 3);
	let c = e.showSelectedFiles && !r, l = e.recoveredState ? Object.keys(e.recoveredState.files).length : null, u = e.files ? Object.keys(e.files).filter((t) => e.files[t].isGhost).length : 0, d = () => u > 0 ? e.i18n("recoveredXFiles", { smart_count: u }) : e.i18n("recoveredAllFiles");
	return G("div", {
		className: o,
		"data-uppy-theme": e.theme,
		"data-uppy-num-acquirers": e.acquirers.length,
		"data-uppy-drag-drop-supported": !e.disableLocalFiles && We(),
		"aria-hidden": e.inline ? "false" : e.isHidden,
		"aria-disabled": e.disabled,
		"aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
		onPaste: e.handlePaste,
		onDragOver: e.handleDragOver,
		onDragLeave: e.handleDragLeave,
		onDrop: e.handleDrop,
		children: [G("div", {
			"aria-hidden": "true",
			className: "uppy-Dashboard-overlay",
			tabIndex: -1,
			onClick: e.handleClickOutside
		}), G("div", {
			className: "uppy-Dashboard-inner",
			role: e.inline ? void 0 : "dialog",
			style: {
				width: e.inline && e.width ? e.width : "",
				height: e.inline && e.height ? e.height : ""
			},
			children: [e.inline ? null : G("button", {
				className: "uppy-u-reset uppy-Dashboard-close",
				type: "button",
				"aria-label": e.i18n("closeModal"),
				title: e.i18n("closeModal"),
				onClick: e.closeModal,
				children: G("span", {
					"aria-hidden": "true",
					children: "×"
				})
			}), G("div", {
				className: "uppy-Dashboard-innerWrap",
				children: [
					G("div", {
						className: "uppy-Dashboard-dropFilesHereHint",
						children: e.i18n("dropHint")
					}),
					c && G(Ou, { ...e }),
					l != null && l > 0 && G("div", {
						className: "uppy-Dashboard-serviceMsg",
						children: [
							G("svg", {
								className: "uppy-Dashboard-serviceMsg-icon",
								"aria-hidden": "true",
								focusable: "false",
								width: "21",
								height: "16",
								viewBox: "0 0 24 19",
								children: G("g", {
									transform: "translate(0 -1)",
									fill: "none",
									fillRule: "evenodd",
									children: [
										G("path", {
											d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
											fill: "#FFD300"
										}),
										G("path", {
											fill: "#000",
											d: "M11 6h2l-.3 8h-1.4z"
										}),
										G("circle", {
											fill: "#000",
											cx: "12",
											cy: "17",
											r: "1"
										})
									]
								})
							}),
							G("strong", {
								className: "uppy-Dashboard-serviceMsg-title",
								children: e.i18n("sessionRestored")
							}),
							G("div", {
								className: "uppy-Dashboard-serviceMsg-text",
								children: d()
							})
						]
					}),
					c ? G(pu, {
						id: e.id,
						i18n: e.i18n,
						uppy: e.uppy,
						files: e.files,
						resumableUploads: e.resumableUploads,
						hideRetryButton: e.hideRetryButton,
						hidePauseResumeButton: e.hidePauseResumeButton,
						hideCancelButton: e.hideCancelButton,
						showLinkToFileUploadResult: e.showLinkToFileUploadResult,
						showRemoveButtonAfterComplete: e.showRemoveButtonAfterComplete,
						metaFields: e.metaFields,
						toggleFileCard: e.toggleFileCard,
						handleRequestThumbnail: e.handleRequestThumbnail,
						handleCancelThumbnail: e.handleCancelThumbnail,
						recoveredState: e.recoveredState,
						individualCancellation: e.individualCancellation,
						openFileEditor: e.openFileEditor,
						canEditFile: e.canEditFile,
						toggleAddFilesPanel: e.toggleAddFilesPanel,
						isSingleFile: i,
						itemsPerRow: s,
						containerWidth: e.containerWidth,
						containerHeight: e.containerHeight
					}) : G(Dl, {
						i18n: e.i18n,
						i18nArray: e.i18nArray,
						acquirers: e.acquirers,
						handleInputChange: e.handleInputChange,
						maxNumberOfFiles: e.maxNumberOfFiles,
						allowedFileTypes: e.allowedFileTypes,
						showNativePhotoCameraButton: e.showNativePhotoCameraButton,
						showNativeVideoCameraButton: e.showNativeVideoCameraButton,
						nativeCameraFacingMode: e.nativeCameraFacingMode,
						showPanel: e.showPanel,
						activePickerPanel: e.activePickerPanel,
						disableLocalFiles: e.disableLocalFiles,
						fileManagerSelectionType: e.fileManagerSelectionType,
						note: e.note,
						proudlyDisplayPoweredByUppy: e.proudlyDisplayPoweredByUppy
					}),
					G(ju, { children: e.showAddFilesPanel ? G(kl, { ...e }, "AddFiles") : null }),
					G(ju, { children: n ? G(Ul, {
						...e,
						fileCardFor: n
					}, "FileCard") : null }),
					G(ju, { children: t ? G(wu, {
						...e,
						activePickerPanel: t
					}, "Picker") : null }),
					G(ju, { children: e.showFileEditor ? G(Al, { ...e }, "Editor") : null }),
					G("div", {
						className: "uppy-Dashboard-progressindicators",
						children: [
							!e.disableInformer && G(Cu, { uppy: e.uppy }),
							!e.disableStatusBar && G(ad, {
								uppy: e.uppy,
								i18n: e.i18n,
								hideProgressDetails: e.hideProgressDetails,
								hideUploadButton: e.hideUploadButton,
								hideRetryButton: e.hideRetryButton,
								hidePauseResumeButton: e.hidePauseResumeButton,
								hideCancelButton: e.hideCancelButton,
								hideAfterFinish: e.hideProgressAfterFinish,
								doneButtonHandler: e.doneButtonHandler
							}),
							!e.disableInformer && G(Cu, { uppy: e.uppy }),
							e.progressindicators.map((t) => e.uppy.getPlugin(t.id).render(e.state))
						]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/locale.js
var dd = { strings: {
	closeModal: "Close Modal",
	addMoreFiles: "Add more files",
	addingMoreFiles: "Adding more files",
	importFrom: "Import from %{name}",
	dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
	dashboardTitle: "Uppy Dashboard",
	copyLinkToClipboardSuccess: "Link copied to clipboard.",
	copyLinkToClipboardFallback: "Copy the URL below",
	copyLink: "Copy link",
	back: "Back",
	removeFile: "Remove file",
	editFile: "Edit file",
	editImage: "Edit image",
	editing: "Editing %{file}",
	error: "Error",
	finishEditingFile: "Finish editing file",
	saveChanges: "Save changes",
	myDevice: "My Device",
	dropHint: "Drop your files here",
	uploadComplete: "Upload complete",
	uploadPaused: "Upload paused",
	resumeUpload: "Resume upload",
	pauseUpload: "Pause upload",
	retryUpload: "Retry upload",
	cancelUpload: "Cancel upload",
	xFilesSelected: {
		0: "%{smart_count} file selected",
		1: "%{smart_count} files selected"
	},
	uploadingXFiles: {
		0: "Uploading %{smart_count} file",
		1: "Uploading %{smart_count} files"
	},
	processingXFiles: {
		0: "Processing %{smart_count} file",
		1: "Processing %{smart_count} files"
	},
	poweredBy: "Powered by %{uppy}",
	addMore: "Add more",
	editFileWithFilename: "Edit file %{file}",
	save: "Save",
	cancel: "Cancel",
	dropPasteFiles: "Drop files here or %{browseFiles}",
	dropPasteFolders: "Drop files here or %{browseFolders}",
	dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
	dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
	dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
	dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
	importFiles: "Import files from:",
	browseFiles: "browse files",
	browseFolders: "browse folders",
	recoveredXFiles: {
		0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
		1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
	},
	recoveredAllFiles: "We restored all files. You can now resume the upload.",
	sessionRestored: "Session restored",
	reSelect: "Re-select",
	missingRequiredMetaFields: {
		0: "Missing required meta field: %{fields}.",
		1: "Missing required meta fields: %{fields}."
	},
	takePictureBtn: "Take Picture",
	recordVideoBtn: "Record Video",
	uploading: "Uploading",
	complete: "Complete",
	uploadFailed: "Upload failed",
	paused: "Paused",
	retry: "Retry",
	pause: "Pause",
	resume: "Resume",
	done: "Done",
	filesUploadedOfTotal: {
		0: "%{complete} of %{smart_count} file uploaded",
		1: "%{complete} of %{smart_count} files uploaded"
	},
	dataUploadedOfTotal: "%{complete} of %{total}",
	dataUploadedOfUnknown: "%{complete} of unknown",
	xTimeLeft: "%{time} left",
	uploadXFiles: {
		0: "Upload %{smart_count} file",
		1: "Upload %{smart_count} files"
	},
	uploadXNewFiles: {
		0: "Upload +%{smart_count} file",
		1: "Upload +%{smart_count} files"
	},
	upload: "Upload",
	xMoreFilesAdded: {
		0: "%{smart_count} more file added",
		1: "%{smart_count} more files added"
	},
	showErrorDetails: "Show error details"
} };
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
function fd(e, t) {
	if (t) {
		let n = e.querySelector(`[data-uppy-paneltype="${t}"]`);
		if (n) return n;
	}
	return e;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/createSuperFocus.js
X();
var pd = /* @__PURE__ */ u(br(), 1);
function md() {
	let e = !1;
	return (0, pd.default)((t, n) => {
		let r = fd(t, n), i = r.contains(document.activeElement);
		if (i && e) return;
		let a = r.querySelector("[data-uppy-super-focusable]");
		(!i || a) && (a ? (a.focus({ preventScroll: !0 }), e = !0) : (r.querySelector(C.join(","))?.focus({ preventScroll: !0 }), e = !1));
	}, 260);
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/trapFocus.js
X();
function hd(e, t) {
	let n = t[0];
	n && (n.focus(), e.preventDefault());
}
function gd(e, t) {
	let n = t[t.length - 1];
	n && (n.focus(), e.preventDefault());
}
function _d(e) {
	return e.contains(document.activeElement);
}
function vd(e, t, n) {
	let r = fd(n, t), i = be(r.querySelectorAll(C.join(","))), a = i.indexOf(document.activeElement);
	_d(r) ? e.shiftKey && a === 0 ? gd(e, i) : !e.shiftKey && a === i.length - 1 && hd(e, i) : hd(e, i);
}
function yd(e, t, n) {
	t === null || vd(e, t, n);
}
Z(), tc(), X();
var bd = 9, xd = 27;
function Sd() {
	let e = {};
	return e.promise = new Promise((t, n) => {
		e.resolve = t, e.reject = n;
	}), e;
}
var Cd = {
	target: "body",
	metaFields: [],
	thumbnailWidth: 280,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	defaultPickerIcon: Gs,
	showLinkToFileUploadResult: !1,
	hideProgressDetails: !1,
	hideUploadButton: !1,
	hideCancelButton: !1,
	hideRetryButton: !1,
	hidePauseResumeButton: !1,
	hideProgressAfterFinish: !1,
	note: null,
	singleFileFullScreen: !0,
	disableStatusBar: !1,
	disableInformer: !1,
	disableThumbnailGenerator: !1,
	fileManagerSelectionType: "files",
	proudlyDisplayPoweredByUppy: !0,
	showSelectedFiles: !0,
	showRemoveButtonAfterComplete: !1,
	showNativePhotoCameraButton: !1,
	showNativeVideoCameraButton: !1,
	theme: "light",
	autoOpen: null,
	disabled: !1,
	disableLocalFiles: !1,
	nativeCameraFacingMode: "",
	onDragLeave: () => {},
	onDragOver: () => {},
	onDrop: () => {},
	plugins: [],
	doneButtonHandler: void 0,
	onRequestCloseModal: null,
	inline: !1,
	animateOpenClose: !0,
	browserBackButtonClose: !1,
	closeAfterFinish: !1,
	closeModalOnClickOutside: !1,
	disablePageScrollWhenModalOpen: !0,
	trigger: null,
	width: 750,
	height: 550
}, wd = class extends ar {
	static VERSION = Tl.version;
	#e;
	modalName = `uppy-Dashboard-${wl()}`;
	superFocus = md();
	ifFocusedOnUppyRecently = !1;
	dashboardIsDisabled;
	savedActiveElement;
	resizeObserver;
	darkModeMediaQuery;
	makeDashboardInsidesVisibleAnywayTimeout;
	constructor(e, t) {
		let n = t?.autoOpen ?? null;
		super(e, {
			...Cd,
			...t,
			autoOpen: n
		}), this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.defaultLocale = dd, this.opts.doneButtonHandler === void 0 && (this.opts.doneButtonHandler = () => {
			this.uppy.clear(), this.requestCloseModal();
		}), this.opts.onRequestCloseModal ??= () => this.closeModal(), this.i18nInit();
	}
	removeTarget = (e) => {
		let t = this.getPluginState().targets.filter((t) => t.id !== e.id);
		this.setPluginState({ targets: t });
	};
	addTarget = (e) => {
		let t = e.id || e.constructor.name, n = e.title || t, r = e.type;
		if (r !== "acquirer" && r !== "progressindicator" && r !== "editor") return this.uppy.log("Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor", "error"), null;
		let i = {
			id: t,
			name: n,
			type: r
		}, a = this.getPluginState().targets.slice();
		return a.push(i), this.setPluginState({ targets: a }), this.el;
	};
	hideAllPanels = () => {
		let e = this.getPluginState(), t = {
			activePickerPanel: void 0,
			showAddFilesPanel: !1,
			activeOverlayType: null,
			fileCardFor: null,
			showFileEditor: !1
		};
		(e.activePickerPanel !== t.activePickerPanel || e.showAddFilesPanel !== t.showAddFilesPanel || e.showFileEditor !== t.showFileEditor || e.activeOverlayType !== t.activeOverlayType) && (this.setPluginState(t), this.uppy.emit("dashboard:close-panel", e.activePickerPanel?.id));
	};
	showPanel = (e) => {
		let { targets: t } = this.getPluginState(), n = t.find((t) => t.type === "acquirer" && t.id === e);
		this.setPluginState({
			activePickerPanel: n,
			activeOverlayType: "PickerPanel"
		}), this.uppy.emit("dashboard:show-panel", e);
	};
	canEditFile = (e) => {
		let { targets: t } = this.getPluginState();
		return this.#s(t).some((t) => this.uppy.getPlugin(t.id).canEditFile(e));
	};
	openFileEditor = (e) => {
		let { targets: t } = this.getPluginState(), n = this.#s(t);
		this.setPluginState({
			showFileEditor: !0,
			fileCardFor: e.id || null,
			activeOverlayType: "FileEditor"
		}), n.forEach((t) => {
			this.uppy.getPlugin(t.id).selectFile(e);
		});
	};
	closeFileEditor = () => {
		let { metaFields: e } = this.getPluginState();
		e && e.length > 0 ? this.setPluginState({
			showFileEditor: !1,
			activeOverlayType: "FileCard"
		}) : this.setPluginState({
			showFileEditor: !1,
			fileCardFor: null,
			activeOverlayType: "AddFiles"
		});
	};
	saveFileEditor = () => {
		let { targets: e } = this.getPluginState();
		this.#s(e).forEach((e) => {
			this.uppy.getPlugin(e.id).save();
		}), this.closeFileEditor();
	};
	openModal = () => {
		let { promise: e, resolve: t } = Sd();
		if (this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing) {
			let e = () => {
				this.setPluginState({ isHidden: !1 }), this.el.removeEventListener("animationend", e, !1), t();
			};
			this.el.addEventListener("animationend", e, !1);
		} else this.setPluginState({ isHidden: !1 }), t();
		return this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), e;
	};
	closeModal = (e) => {
		let t = e?.manualClose ?? !0, { isHidden: n, isClosing: r } = this.getPluginState();
		if (n || r) return;
		let { promise: i, resolve: a } = Sd();
		if (this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose) {
			this.setPluginState({ isClosing: !0 });
			let e = () => {
				this.setPluginState({
					isHidden: !0,
					isClosing: !1
				}), this.superFocus.cancel(), this.savedActiveElement.focus(), this.el.removeEventListener("animationend", e, !1), a();
			};
			this.el.addEventListener("animationend", e, !1);
		} else this.setPluginState({ isHidden: !0 }), this.superFocus.cancel(), this.savedActiveElement.focus(), a();
		return document.removeEventListener("keydown", this.handleKeyDownInModal), t && this.opts.browserBackButtonClose && history.state?.[this.modalName] && history.back(), this.uppy.emit("dashboard:modal-closed"), i;
	};
	isModalOpen = () => !this.getPluginState().isHidden || !1;
	requestCloseModal = () => this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal();
	setDarkModeCapability = (e) => {
		let { capabilities: t } = this.uppy.getState();
		this.uppy.setState({ capabilities: {
			...t,
			darkMode: e
		} });
	};
	handleSystemDarkModeChange = (e) => {
		let t = e.matches;
		this.uppy.log(`[Dashboard] Dark mode is ${t ? "on" : "off"}`), this.setDarkModeCapability(t);
	};
	toggleFileCard = (e, t) => {
		let n = this.uppy.getFile(t);
		e ? this.uppy.emit("dashboard:file-edit-start", n) : this.uppy.emit("dashboard:file-edit-complete", n), this.setPluginState({
			fileCardFor: e ? t : null,
			activeOverlayType: e ? "FileCard" : null
		});
	};
	toggleAddFilesPanel = (e) => {
		this.setPluginState({
			showAddFilesPanel: e,
			activeOverlayType: e ? "AddFiles" : null
		});
	};
	addFiles = (e) => {
		let t = e.map((e) => ({
			source: this.id,
			name: e.name,
			type: e.type,
			data: e,
			meta: { relativePath: e.relativePath || e.webkitRelativePath || null }
		}));
		try {
			this.uppy.addFiles(t);
		} catch (e) {
			this.uppy.log(e);
		}
	};
	startListeningToResize = () => {
		this.resizeObserver = new ResizeObserver((e) => {
			let { width: t, height: n } = e[0].contentRect;
			this.setPluginState({
				containerWidth: t,
				containerHeight: n,
				areInsidesReadyToBeVisible: !0
			});
		}), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
			let e = this.getPluginState(), t = !this.opts.inline && e.isHidden;
			!e.areInsidesReadyToBeVisible && !t && (this.uppy.log("[Dashboard] resize event didn’t fire on time: defaulted to mobile layout", "warning"), this.setPluginState({ areInsidesReadyToBeVisible: !0 }));
		}, 1e3);
	};
	stopListeningToResize = () => {
		this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
	};
	recordIfFocusedOnUppyRecently = (e) => {
		this.el.contains(e.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel());
	};
	disableInteractiveElements = (e) => {
		let t = this.#e ?? be(this.el.querySelectorAll([
			"a[href]",
			"input:not([disabled])",
			"select:not([disabled])",
			"textarea:not([disabled])",
			"button:not([disabled])",
			"[role=\"button\"]:not([disabled])"
		])).filter((e) => !e.classList.contains("uppy-Dashboard-close"));
		for (let n of t) n.tagName === "A" ? n.setAttribute("aria-disabled", e) : n.disabled = e;
		this.#e = e ? t : null, this.dashboardIsDisabled = e;
	};
	updateBrowserHistory = () => {
		history.state?.[this.modalName] || history.pushState({
			...history.state,
			[this.modalName]: !0
		}, ""), window.addEventListener("popstate", this.handlePopState, !1);
	};
	handlePopState = (e) => {
		this.isModalOpen() && !e.state?.[this.modalName] && this.closeModal({ manualClose: !1 }), !this.isModalOpen() && e.state?.[this.modalName] && history.back();
	};
	handleKeyDownInModal = (e) => {
		e.keyCode === xd && this.requestCloseModal(), e.keyCode === bd && vd(e, this.getPluginState().activeOverlayType, this.el);
	};
	handleClickOutside = () => {
		this.opts.closeModalOnClickOutside && this.requestCloseModal();
	};
	handlePaste = (e) => {
		this.uppy.iteratePlugins((t) => {
			t.type === "acquirer" && t.handleRootPaste?.(e);
		});
		let t = be(e.clipboardData.files);
		t.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(t));
	};
	handleInputChange = (e) => {
		e.preventDefault();
		let t = be(e.currentTarget.files || []);
		t.length > 0 && (this.uppy.log("[Dashboard] Files selected through input"), this.addFiles(t));
	};
	handleDragOver = (e) => {
		e.preventDefault(), e.stopPropagation();
		let t = () => {
			let t = !0;
			return this.uppy.iteratePlugins((n) => {
				n.canHandleRootDrop?.(e) && (t = !0);
			}), t;
		}, n = () => {
			let { types: t } = e.dataTransfer;
			return t.some((e) => e === "Files");
		}, r = t(), i = n();
		if (!r && !i || this.opts.disabled || this.opts.disableLocalFiles && (i || !r) || !this.uppy.getState().allowNewUpload) {
			e.dataTransfer.dropEffect = "none";
			return;
		}
		e.dataTransfer.dropEffect = "copy", this.setPluginState({ isDraggingOver: !0 }), this.opts.onDragOver(e);
	};
	handleDragLeave = (e) => {
		e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.opts.onDragLeave(e);
	};
	handleDrop = async (e) => {
		e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.uppy.iteratePlugins((t) => {
			t.type === "acquirer" && t.handleRootDrop?.(e);
		});
		let t = !1, n = (e) => {
			this.uppy.log(e, "error"), t ||= (this.uppy.info(e.message, "error"), !0);
		};
		this.uppy.log("[Dashboard] Processing dropped files");
		let r = await Ae(e.dataTransfer, { logDropError: n });
		r.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(r)), this.opts.onDrop(e);
	};
	handleRequestThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", e);
	};
	handleCancelThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", e);
	};
	handleKeyDownInInline = (e) => {
		e.keyCode === bd && yd(e, this.getPluginState().activeOverlayType, this.el);
	};
	handlePasteOnBody = (e) => {
		this.el.contains(document.activeElement) && this.handlePaste(e);
	};
	handleComplete = ({ failed: e }) => {
		this.opts.closeAfterFinish && !e?.length && this.requestCloseModal();
	};
	#t = () => {
		if (this.opts.disableThumbnailGenerator) return;
		let e = this.uppy.getFiles();
		if (e.length === 1) {
			let t = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
			t?.setOptions({ thumbnailWidth: 600 });
			let n = {
				...e[0],
				preview: void 0
			};
			t?.requestThumbnail(n).then(() => {
				t?.setOptions({ thumbnailWidth: this.opts.thumbnailWidth });
			});
		}
	};
	#n = (e) => {
		let t = e[0], { metaFields: n } = this.getPluginState(), r = n && n.length > 0, i = this.canEditFile(t);
		r && this.opts.autoOpen === "metaEditor" ? this.toggleFileCard(!0, t.id) : i && this.opts.autoOpen === "imageEditor" && this.openFileEditor(t);
	};
	initEvents = () => {
		if (this.opts.trigger && !this.opts.inline) {
			let e = re(this.opts.trigger);
			e ? e.forEach((e) => {
				e.addEventListener("click", this.openModal);
			}) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
		}
		this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-added", this.#u), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), this.uppy.on("files-added", this.#t), this.uppy.on("file-removed", this.#t), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.on("files-added", this.#n);
	};
	removeEvents = () => {
		let e = re(this.opts.trigger);
		!this.opts.inline && e && e.forEach((e) => {
			e.removeEventListener("click", this.openModal);
		}), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-added", this.#u), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), this.uppy.off("files-added", this.#t), this.uppy.off("file-removed", this.#t), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.off("files-added", this.#n);
	};
	superFocusOnEachUpdate = () => {
		let e = this.el.contains(document.activeElement), t = document.activeElement === document.body || document.activeElement === null, n = this.uppy.getState().info.length === 0, r = !this.opts.inline;
		n && (r || e || t && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel();
	};
	afterUpdate = () => {
		if (this.opts.disabled && !this.dashboardIsDisabled) {
			this.disableInteractiveElements(!0);
			return;
		}
		!this.opts.disabled && this.dashboardIsDisabled && this.disableInteractiveElements(!1), this.superFocusOnEachUpdate();
	};
	saveFileCard = (e, t) => {
		this.uppy.setFileMeta(t, e), this.toggleFileCard(!1, t);
	};
	#r = (e) => {
		let t = this.uppy.getPlugin(e.id);
		return {
			...e,
			icon: t.icon || this.opts.defaultPickerIcon,
			render: t.render
		};
	};
	#i = (e) => {
		let t = this.uppy.getPlugin(e.id);
		return typeof t.isSupported != "function" || t.isSupported();
	};
	#a = (e) => e.filter((e) => e.type === "acquirer" && this.#i(e)).map(this.#r);
	#o = (e) => e.filter((e) => e.type === "progressindicator").map(this.#r);
	#s = (e) => e.filter((e) => e.type === "editor").map(this.#r);
	render = (e) => {
		let t = this.getPluginState(), { files: n, capabilities: r, allowNewUpload: i } = e, { newFiles: a, uploadStartedFiles: o, completeFiles: s, erroredFiles: c, inProgressFiles: l, inProgressNotPausedFiles: u, processingFiles: d, isUploadStarted: f, isAllComplete: p, isAllPaused: m } = this.uppy.getObjectOfFilesPerState(), h = this.#a(t.targets), g = this.#o(t.targets), _ = this.#s(t.targets), v;
		return v = this.opts.theme === "auto" ? r.darkMode ? "dark" : "light" : this.opts.theme, [
			"files",
			"folders",
			"both"
		].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), ud({
			state: e,
			isHidden: t.isHidden,
			files: n,
			newFiles: a,
			uploadStartedFiles: o,
			completeFiles: s,
			erroredFiles: c,
			inProgressFiles: l,
			inProgressNotPausedFiles: u,
			processingFiles: d,
			isUploadStarted: f,
			isAllComplete: p,
			isAllPaused: m,
			totalFileCount: Object.keys(n).length,
			totalProgress: e.totalProgress,
			allowNewUpload: i,
			acquirers: h,
			theme: v,
			disabled: this.opts.disabled,
			disableLocalFiles: this.opts.disableLocalFiles,
			direction: this.opts.direction,
			activePickerPanel: t.activePickerPanel,
			showFileEditor: t.showFileEditor,
			saveFileEditor: this.saveFileEditor,
			closeFileEditor: this.closeFileEditor,
			disableInteractiveElements: this.disableInteractiveElements,
			animateOpenClose: this.opts.animateOpenClose,
			isClosing: t.isClosing,
			progressindicators: g,
			editors: _,
			autoProceed: this.uppy.opts.autoProceed,
			id: this.id,
			closeModal: this.requestCloseModal,
			handleClickOutside: this.handleClickOutside,
			handleInputChange: this.handleInputChange,
			handlePaste: this.handlePaste,
			inline: this.opts.inline,
			showPanel: this.showPanel,
			hideAllPanels: this.hideAllPanels,
			i18n: this.i18n,
			i18nArray: this.i18nArray,
			uppy: this.uppy,
			note: this.opts.note,
			recoveredState: e.recoveredState,
			metaFields: t.metaFields,
			resumableUploads: r.resumableUploads || !1,
			individualCancellation: r.individualCancellation,
			isMobileDevice: r.isMobileDevice,
			fileCardFor: t.fileCardFor,
			toggleFileCard: this.toggleFileCard,
			toggleAddFilesPanel: this.toggleAddFilesPanel,
			showAddFilesPanel: t.showAddFilesPanel,
			saveFileCard: this.saveFileCard,
			openFileEditor: this.openFileEditor,
			canEditFile: this.canEditFile,
			width: this.opts.width,
			height: this.opts.height,
			showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
			fileManagerSelectionType: this.opts.fileManagerSelectionType,
			proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
			showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
			containerWidth: t.containerWidth,
			containerHeight: t.containerHeight,
			areInsidesReadyToBeVisible: t.areInsidesReadyToBeVisible,
			parentElement: this.el,
			allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
			maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
			requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
			showSelectedFiles: this.opts.showSelectedFiles,
			showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
			showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
			nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
			singleFileFullScreen: this.opts.singleFileFullScreen,
			handleRequestThumbnail: this.handleRequestThumbnail,
			handleCancelThumbnail: this.handleCancelThumbnail,
			isDraggingOver: t.isDraggingOver,
			handleDragOver: this.handleDragOver,
			handleDragLeave: this.handleDragLeave,
			handleDrop: this.handleDrop,
			disableInformer: this.opts.disableInformer,
			disableStatusBar: this.opts.disableStatusBar,
			hideProgressDetails: this.opts.hideProgressDetails,
			hideUploadButton: this.opts.hideUploadButton,
			hideRetryButton: this.opts.hideRetryButton,
			hidePauseResumeButton: this.opts.hidePauseResumeButton,
			hideCancelButton: this.opts.hideCancelButton,
			hideProgressAfterFinish: this.opts.hideProgressAfterFinish,
			doneButtonHandler: this.opts.doneButtonHandler
		});
	};
	#c = () => {
		let { plugins: e } = this.opts;
		e.forEach((e) => {
			let t = this.uppy.getPlugin(e);
			t ? t.mount(this, t) : this.uppy.log(`[Uppy] Dashboard could not find plugin '${e}', make sure to uppy.use() the plugins you are specifying`, "warning");
		});
	};
	#l = () => {
		this.uppy.iteratePlugins(this.#u);
	};
	#u = (e) => {
		e && !e.opts?.target && ["acquirer", "editor"].includes(e.type) && (this.getPluginState().targets.some((t) => e.id === t.id) || e.mount(this, e));
	};
	#d() {
		let { thumbnailWidth: e, thumbnailHeight: t, thumbnailType: n, waitForThumbnailsBeforeUpload: r } = this.opts;
		return {
			thumbnailWidth: e,
			thumbnailHeight: t,
			thumbnailType: n,
			waitForThumbnailsBeforeUpload: r,
			lazy: !r
		};
	}
	setOptions(e) {
		super.setOptions(e), this.uppy.getPlugin(this.#f())?.setOptions(this.#d());
	}
	#f() {
		return `${this.id}:ThumbnailGenerator`;
	}
	install = () => {
		this.setPluginState({
			isHidden: !0,
			fileCardFor: null,
			activeOverlayType: null,
			showAddFilesPanel: !1,
			activePickerPanel: void 0,
			showFileEditor: !1,
			metaFields: this.opts.metaFields,
			targets: [],
			areInsidesReadyToBeVisible: !1,
			isDraggingOver: !1
		});
		let { inline: e, closeAfterFinish: t } = this.opts;
		if (e && t) throw Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
		let { allowMultipleUploads: n, allowMultipleUploadBatches: r } = this.uppy.opts;
		(n || r) && t && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
		let { target: i } = this.opts;
		i && this.mount(i, this), this.opts.disableThumbnailGenerator || this.uppy.use(Sl, {
			id: this.#f(),
			...this.#d()
		}), this.darkModeMediaQuery = typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
		let a = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : !1;
		this.uppy.log(`[Dashboard] Dark mode is ${a ? "on" : "off"}`), this.setDarkModeCapability(a), this.opts.theme === "auto" && this.darkModeMediaQuery?.addListener(this.handleSystemDarkModeChange), this.#c(), this.#l(), this.initEvents();
	};
	uninstall = () => {
		if (!this.opts.disableThumbnailGenerator) {
			let e = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
			e && this.uppy.removePlugin(e);
		}
		let { plugins: e } = this.opts;
		e.forEach((e) => {
			let t = this.uppy.getPlugin(e);
			t && t.unmount();
		}), this.opts.theme === "auto" && this.darkModeMediaQuery?.removeListener(this.handleSystemDarkModeChange), this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.unmount(), this.removeEvents();
	};
};
//#endregion
//#region resources/js/livewire-upload.js
Z();
var Td = 3, Ed = 4, Dd = class extends Error {}, Od = class extends Error {}, kd = class extends Wn {
	transfers = /* @__PURE__ */ new Map();
	constructor(e, t) {
		super(e, t), this.id = "LivewireUpload", this.type = "uploader";
	}
	install() {
		this.uppy.addUploader(this.upload), this.uppy.on("file-removed", this.cancel), this.uppy.on("upload-pause", this.pauseOrResume), this.uppy.on("pause-all", this.pauseAll), this.uppy.on("resume-all", this.resumeAll), this.opts.isChunked && this.uppy.setState({ capabilities: {
			...this.uppy.getState().capabilities,
			resumableUploads: !0
		} });
	}
	uninstall() {
		this.uppy.removeUploader(this.upload), this.uppy.off("file-removed", this.cancel), this.uppy.off("upload-pause", this.pauseOrResume), this.uppy.off("pause-all", this.pauseAll), this.uppy.off("resume-all", this.resumeAll);
	}
	upload = (e) => {
		let t = this.uppy.getFilesByIds(e);
		this.uppy.emit("upload-start", t);
		let n = [...t];
		return Promise.all(Array.from({ length: this.opts.maxParallelUploads }, async () => {
			for (; n.length;) await this.uploadFile(n.shift());
		}));
	};
	async uploadFile(e) {
		try {
			let t = await this.plan(e);
			if (!this.uppy.getFile(e.id)) return;
			if (t.strategy === "reject") throw Error(t.message);
			if (e.isRemote && this.showAsPlanned(e, t), this.isTransfer(t) ? await this.transfer(e, t) : await this.uploadThroughLivewire(e), !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
				status: 200,
				body: {}
			});
		} catch (t) {
			if (t instanceof Od || !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-error", this.uppy.getFile(e.id), t);
		}
	}
	plan(e) {
		return e.isRemote ? this.opts.planRemoteUsing(e.source, e.remote.body) : this.opts.planUsing({
			name: e.name,
			size: e.size,
			type: e.type ?? "",
			lastModified: e.data.lastModified ?? 0
		});
	}
	showAsPlanned(e, t) {
		let n = t.name ?? e.name, r = t.type ?? e.type;
		this.uppy.setFileState(e.id, {
			name: n,
			type: r,
			size: t.size ?? e.size,
			extension: n.includes(".") ? n.split(".").pop() : "",
			meta: {
				...this.uppy.getFile(e.id).meta,
				name: n,
				type: r
			}
		});
	}
	isTransfer(e) {
		return [
			"chunked",
			"s3",
			"remote"
		].includes(e.strategy);
	}
	uploadThroughLivewire(e) {
		return new Promise((t, n) => {
			this.opts.uploadUsing(e.meta.fileKey, e.data instanceof File && e.data.name === e.name ? e.data : new File([e.data], e.name, { type: e.type }), t, () => n(this.failure()), (t) => this.reportProgress(e, e.size * t / 100, e.size));
		});
	}
	async transfer(e, t) {
		let n = {
			isPaused: !1,
			isCancelled: !1,
			requests: /* @__PURE__ */ new Set(),
			resume: null,
			abort: null
		};
		this.transfers.set(e.id, n);
		try {
			let r = t.completed;
			for (; !r;) {
				let { capability: i } = t;
				n.abort = t.strategy === "s3" ? () => Promise.resolve().then(() => this.opts.abortUsing(i)).catch(() => {}) : null;
				try {
					r = await this.send(e, t, n);
				} catch (i) {
					if (!(i instanceof Dd) && i.status !== 401) throw i;
					for (; n.isPaused && !n.isCancelled;) await new Promise((e) => n.resume = e);
					if (n.isCancelled) throw new Od();
					if (t = await this.plan(e), !this.isTransfer(t)) throw this.failure(t.message);
					r = t.completed;
				}
			}
			if (!await this.opts.adoptUsing(e.meta.fileKey, r)) throw this.failure();
		} finally {
			this.transfers.delete(e.id);
		}
	}
	send(e, t, n) {
		return {
			chunked: () => this.sendChunks(e, t, n),
			s3: () => this.sendParts(e, t, n),
			remote: () => this.fetchWhole(e, t, n)
		}[t.strategy]();
	}
	async sendPieces(e, { missing: t, sizeOf: n, arrived: r, send: i, total: a }) {
		let o = /* @__PURE__ */ new Map(), s = [...t], c = () => this.reportProgress(e, [...r].reduce((e, t) => e + n(t), 0) + [...o.values()].reduce((e, t) => e + t, 0), a);
		c(), await Promise.all(Array.from({ length: Td }, async () => {
			for (; s.length;) {
				let e = s.shift(), t = await i(e, s, (t) => {
					o.set(e, t), c();
				});
				o.delete(e), r.add(e), c(), t && (s.length = 0);
			}
		}));
	}
	async sendChunks(e, t, n) {
		let r = t.size ?? e.size, i = new Set(t.receivedChunks), a = (e) => [e * t.chunkSize, Math.min(r, (e + 1) * t.chunkSize)], o = (r, i) => this.attempt(n, () => this.post(n, t, t.sealed ? { index: r } : {
			index: r,
			name: e.name,
			type: e.type ?? "",
			chunk: [e.data.slice(...a(r)), e.name]
		}, i)), s = null, c = t.totalChunks - 1;
		await this.sendPieces(e, {
			missing: this.range(0, t.totalChunks - 1).filter((e) => !i.has(e)),
			sizeOf: (e) => a(e)[1] - a(e)[0],
			arrived: i,
			total: r,
			send: async (e, t, n) => {
				c = e;
				let r = await o(e, n);
				return s = r?.complete ? r.reference : s, !!s;
			}
		});
		for (let e = 0; !s && e < Ed; e++) {
			await this.wait(1e3 * (e + 1));
			let t = await o(c, () => {});
			s = t?.complete ? t.reference : null;
		}
		if (!s) throw this.failure();
		return s;
	}
	async sendParts(e, t, n) {
		let r = t.size ?? e.size, i = new Set(t.uploadedParts), a = /* @__PURE__ */ new Map(), o = (e) => [(e - 1) * t.partSize, Math.min(r, e * t.partSize)], s = null, c = async (e, n) => {
			if (await s, a.has(e) || (s = this.opts.signPartsUsing(t.capability, [e, ...n.slice(0, 9)]).then((e) => Object.entries(e ?? {}).forEach(([e, t]) => a.set(Number(e), t))).finally(() => s = null), await s), !a.has(e)) throw this.failure();
			let r = a.get(e);
			return a.delete(e), r;
		};
		await this.sendPieces(e, {
			missing: this.range(1, t.totalParts).filter((e) => !i.has(e)),
			sizeOf: (e) => o(e)[1] - o(e)[0],
			arrived: i,
			total: r,
			send: async (r, i, a) => (await this.attempt(n, async () => t.sealed ? this.post(n, t, { part: r }, a) : this.request(n, {
				method: "PUT",
				url: await c(r, i),
				body: e.data.slice(...o(r)),
				onProgress: a
			}), { retryForbidden: !t.sealed }), !1)
		});
		let l = await this.opts.completeUsing(t.capability);
		if (!l) throw this.failure();
		return l;
	}
	async fetchWhole(e, t, n) {
		let r = await this.attempt(n, () => this.post(n, t, {}, () => {}));
		if (!r?.reference) throw this.failure();
		return this.uppy.getFile(e.id) && r.size && this.uppy.setFileState(e.id, { size: r.size }), r.reference;
	}
	post(e, t, n, r) {
		let i = new FormData();
		return Object.entries({
			capability: t.capability,
			sealed: t.sealed,
			...n
		}).filter(([, e]) => e != null).forEach(([e, t]) => Array.isArray(t) ? i.append(e, ...t) : i.append(e, t)), this.request(e, {
			method: "POST",
			url: t.url,
			headers: {
				Accept: "application/json",
				"X-CSRF-TOKEN": this.opts.csrfToken
			},
			body: i,
			onProgress: r
		});
	}
	async attempt(e, t, { retryForbidden: n = !1 } = {}) {
		for (let r = 1;; r++) {
			if (e.isCancelled) throw new Od();
			if (e.isPaused) throw new Dd();
			try {
				return await t();
			} catch (e) {
				if (e instanceof Dd || e instanceof Od || !(!e.status || n && e.status === 403 || e.status === 429 || e.status >= 500) || r === Ed) throw e;
				await this.wait(e.retryAfter ?? 1e3 * 2 ** (r - 1));
			}
		}
	}
	request(e, { method: t, url: n, headers: r = {}, body: i, onProgress: a }) {
		return new Promise((o, s) => {
			let c = new XMLHttpRequest();
			e.requests.add(c);
			let l = (t) => {
				e.requests.delete(c), s(t);
			};
			c.open(t, n), Object.entries(r).forEach(([e, t]) => c.setRequestHeader(e, t)), c.upload.addEventListener("progress", (e) => a(e.loaded)), c.addEventListener("load", () => {
				if (c.status >= 200 && c.status < 300) return e.requests.delete(c), o(this.json(c));
				let t = this.failure(this.json(c)?.message);
				t.status = c.status;
				let n = Number(c.getResponseHeader("Retry-After"));
				n && (t.retryAfter = n * 1e3), l(t);
			}), c.addEventListener("error", () => l(this.failure())), c.addEventListener("abort", () => l(e.isCancelled ? new Od() : new Dd())), c.send(i);
		});
	}
	json(e) {
		try {
			return JSON.parse(e.responseText);
		} catch {
			return null;
		}
	}
	failure(e) {
		return Error(e || this.opts.uploadFailedMessage);
	}
	range(e, t) {
		return Array.from({ length: t - e + 1 }, (t, n) => e + n);
	}
	reportProgress(e, t, n) {
		let r = this.uppy.getFile(e.id);
		r && n && this.uppy.emit("upload-progress", r, {
			uploadStarted: r.progress.uploadStarted ?? Date.now(),
			bytesUploaded: Math.min(t, n),
			bytesTotal: n
		});
	}
	wait(e) {
		return new Promise((t) => setTimeout(t, e));
	}
	setPaused(e, t) {
		let n = this.transfers.get(e);
		n && n.isPaused !== t && (n.isPaused = t, t ? n.requests.forEach((e) => e.abort()) : n.resume?.());
	}
	pauseOrResume = (e, t) => {
		this.setPaused(e?.id ?? e, t);
	};
	pauseAll = () => {
		this.transfers.forEach((e, t) => this.setPaused(t, !0));
	};
	resumeAll = () => {
		this.transfers.forEach((e, t) => this.setPaused(t, !1));
	};
	cancel = (e) => {
		let t = this.transfers.get(e.id);
		if (t) {
			t.isCancelled = !0, t.requests.forEach((e) => e.abort()), t.resume?.(), t.abort?.();
			return;
		}
		e.progress.uploadStarted && !e.progress.uploadComplete && this.opts.cancelUploadUsing(e.meta.fileKey);
	};
}, Ad = /* @__PURE__ */ s(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self, n.Cropper = r());
	})(e, (function() {
		function e(e, t) {
			(t == null || t > e.length) && (t = e.length);
			for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
			return r;
		}
		function t(t) {
			if (Array.isArray(t)) return e(t);
		}
		function n(e, t) {
			if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
		}
		function r(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, f(r.key), r);
			}
		}
		function i(e, t, n) {
			return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
		}
		function a(e, t, n) {
			return (t = f(t)) in e ? Object.defineProperty(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e;
		}
		function o(e) {
			if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
		}
		function s() {
			throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		function c(e, t) {
			var n = Object.keys(e);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(e);
				t && (r = r.filter(function(t) {
					return Object.getOwnPropertyDescriptor(e, t).enumerable;
				})), n.push.apply(n, r);
			}
			return n;
		}
		function l(e) {
			for (var t = 1; t < arguments.length; t++) {
				var n = arguments[t] == null ? {} : arguments[t];
				t % 2 ? c(Object(n), !0).forEach(function(t) {
					a(e, t, n[t]);
				}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function(t) {
					Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
				});
			}
			return e;
		}
		function u(e) {
			return t(e) || o(e) || m(e) || s();
		}
		function d(e, t) {
			if (typeof e != "object" || !e) return e;
			var n = e[Symbol.toPrimitive];
			if (n !== void 0) {
				var r = n.call(e, t || "default");
				if (typeof r != "object") return r;
				throw TypeError("@@toPrimitive must return a primitive value.");
			}
			return (t === "string" ? String : Number)(e);
		}
		function f(e) {
			var t = d(e, "string");
			return typeof t == "symbol" ? t : t + "";
		}
		function p(e) {
			"@babel/helpers - typeof";
			return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, p(e);
		}
		function m(t, n) {
			if (t) {
				if (typeof t == "string") return e(t, n);
				var r = {}.toString.call(t).slice(8, -1);
				return r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set" ? Array.from(t) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0;
			}
		}
		var h = typeof window < "u" && window.document !== void 0, g = h ? window : {}, _ = h && g.document.documentElement ? "ontouchstart" in g.document.documentElement : !1, v = h ? "PointerEvent" in g : !1, y = "cropper", b = "all", x = "crop", S = "move", C = "zoom", w = "e", T = "w", E = "s", D = "n", O = "ne", k = "nw", A = "se", j = "sw", M = `${y}-crop`, N = `${y}-disabled`, P = `${y}-hidden`, F = `${y}-hide`, ee = `${y}-invisible`, te = `${y}-modal`, ne = `${y}-move`, re = `${y}Action`, ie = `${y}Preview`, ae = "crop", oe = "move", se = "none", ce = "crop", I = "cropend", le = "cropmove", ue = "cropstart", de = "dblclick", fe = _ ? "touchstart" : "mousedown", pe = _ ? "touchmove" : "mousemove", me = _ ? "touchend touchcancel" : "mouseup", he = v ? "pointerdown" : fe, ge = v ? "pointermove" : pe, _e = v ? "pointerup pointercancel" : me, ve = "ready", ye = "resize", be = "wheel", xe = "zoom", Se = "image/jpeg", Ce = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/, we = /^data:/, Te = /^data:image\/jpeg;base64,/, Ee = /\s+/, De = /^(img|canvas)$/i, Oe = 200, ke = 100, Ae = {
			viewMode: 0,
			dragMode: ae,
			initialAspectRatio: NaN,
			aspectRatio: NaN,
			data: null,
			preview: "",
			responsive: !0,
			restore: !0,
			checkCrossOrigin: !0,
			checkOrientation: !0,
			modal: !0,
			guides: !0,
			center: !0,
			highlight: !0,
			background: !0,
			autoCrop: !0,
			autoCropArea: .8,
			movable: !0,
			rotatable: !0,
			scalable: !0,
			zoomable: !0,
			zoomOnTouch: !0,
			zoomOnWheel: !0,
			wheelZoomRatio: .1,
			cropBoxMovable: !0,
			cropBoxResizable: !0,
			toggleDragModeOnDblclick: !0,
			minCanvasWidth: 0,
			minCanvasHeight: 0,
			minCropBoxWidth: 0,
			minCropBoxHeight: 0,
			minContainerWidth: Oe,
			minContainerHeight: ke,
			ready: null,
			cropstart: null,
			cropmove: null,
			cropend: null,
			crop: null,
			zoom: null
		}, je = "<div class=\"cropper-container\" touch-action=\"none\"><div class=\"cropper-wrap-box\"><div class=\"cropper-canvas\"></div></div><div class=\"cropper-drag-box\"></div><div class=\"cropper-crop-box\"><span class=\"cropper-view-box\"></span><span class=\"cropper-dashed dashed-h\"></span><span class=\"cropper-dashed dashed-v\"></span><span class=\"cropper-center\"></span><span class=\"cropper-face\"></span><span class=\"cropper-line line-e\" data-cropper-action=\"e\"></span><span class=\"cropper-line line-n\" data-cropper-action=\"n\"></span><span class=\"cropper-line line-w\" data-cropper-action=\"w\"></span><span class=\"cropper-line line-s\" data-cropper-action=\"s\"></span><span class=\"cropper-point point-e\" data-cropper-action=\"e\"></span><span class=\"cropper-point point-n\" data-cropper-action=\"n\"></span><span class=\"cropper-point point-w\" data-cropper-action=\"w\"></span><span class=\"cropper-point point-s\" data-cropper-action=\"s\"></span><span class=\"cropper-point point-ne\" data-cropper-action=\"ne\"></span><span class=\"cropper-point point-nw\" data-cropper-action=\"nw\"></span><span class=\"cropper-point point-sw\" data-cropper-action=\"sw\"></span><span class=\"cropper-point point-se\" data-cropper-action=\"se\"></span></div></div>", Me = Number.isNaN || g.isNaN, Ne = Number.isFinite || g.isFinite;
		function L(e) {
			return typeof e == "number" && !Me(e);
		}
		var Pe = function(e) {
			return e > 0 && e < Infinity;
		};
		function Fe(e) {
			return e === void 0;
		}
		function Ie(e) {
			return p(e) === "object" && e !== null;
		}
		var Le = Object.prototype.hasOwnProperty;
		function Re(e) {
			if (!Ie(e)) return !1;
			try {
				var t = e.constructor, n = t.prototype;
				return t && n && Le.call(n, "isPrototypeOf");
			} catch {
				return !1;
			}
		}
		function R(e) {
			return typeof e == "function";
		}
		var ze = Array.prototype.slice;
		function Be(e) {
			return Array.from ? Array.from(e) : ze.call(e);
		}
		function z(e, t) {
			return e && R(t) && (Array.isArray(e) || L(e.length) ? Be(e).forEach(function(n, r) {
				t.call(e, n, r, e);
			}) : Ie(e) && Object.keys(e).forEach(function(n) {
				t.call(e, e[n], n, e);
			})), e;
		}
		var B = Object.assign || function(e) {
			var t = [...arguments].slice(1);
			return Ie(e) && t.length > 0 && t.forEach(function(t) {
				Ie(t) && Object.keys(t).forEach(function(n) {
					e[n] = t[n];
				});
			}), e;
		}, Ve = /\.\d*(?:0|9){12}\d*$/;
		function He(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
			return Ve.test(e) ? Math.round(e * t) / t : e;
		}
		var Ue = /^width|height|left|top|marginLeft|marginTop$/;
		function We(e, t) {
			var n = e.style;
			z(t, function(e, t) {
				Ue.test(t) && L(e) && (e = `${e}px`), n[t] = e;
			});
		}
		function Ge(e, t) {
			return e.classList ? e.classList.contains(t) : e.className.split(Ee).indexOf(t) > -1;
		}
		function V(e, t) {
			if (t) {
				if (L(e.length)) {
					z(e, function(e) {
						V(e, t);
					});
					return;
				}
				if (e.classList) {
					e.classList.add(t);
					return;
				}
				var n = e.className.trim();
				n ? n.indexOf(t) < 0 && (e.className = `${n} ${t}`) : e.className = t;
			}
		}
		function Ke(e, t) {
			if (t) {
				if (L(e.length)) {
					z(e, function(e) {
						Ke(e, t);
					});
					return;
				}
				if (e.classList) {
					e.classList.remove(t);
					return;
				}
				e.className.indexOf(t) >= 0 && (e.className = e.className.split(Ee).filter(function(e) {
					return e && e !== t;
				}).join(" "));
			}
		}
		function qe(e, t, n) {
			if (t) {
				if (L(e.length)) {
					z(e, function(e) {
						qe(e, t, n);
					});
					return;
				}
				n ? V(e, t) : Ke(e, t);
			}
		}
		var Je = /([a-z\d])([A-Z])/g;
		function Ye(e) {
			return typeof e == "string" ? e.replace(Je, "$1-$2").toLowerCase() : "";
		}
		function Xe(e, t) {
			return Ie(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute(`data-${Ye(t)}`);
		}
		function Ze(e, t, n) {
			Ie(n) ? e[t] = n : e.dataset ? e.dataset[t] = n : e.setAttribute(`data-${Ye(t)}`, n);
		}
		function Qe(e, t) {
			if (Ie(e[t])) try {
				delete e[t];
			} catch {
				e[t] = void 0;
			}
			else if (e.dataset) try {
				delete e.dataset[t];
			} catch {
				e.dataset[t] = void 0;
			}
			else e.removeAttribute(`data-${Ye(t)}`);
		}
		var $e = function() {
			var e = !1;
			if (h) {
				var t = !1, n = function() {}, r = Object.defineProperty({}, "once", {
					get: function() {
						return e = !0, t;
					},
					set: function(e) {
						t = e;
					}
				});
				g.addEventListener("test", n, r), g.removeEventListener("test", n, r);
			}
			return e;
		}();
		function et(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
			if (e && t && R(e.removeEventListener)) {
				var i = n;
				t.trim().split(Ee).forEach(function(t) {
					if (!$e) {
						var a = e.__cropperListeners__ || {};
						a[t] && a[t][n] && (i = a[t][n], delete a[t][n], Object.keys(a[t]).length === 0 && delete a[t], Object.keys(a).length === 0 && delete e.__cropperListeners__);
					}
					e.removeEventListener(t, i, r);
				});
			}
		}
		function tt(e, t, n) {
			var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
			if (e && t && R(e.addEventListener) && R(n)) {
				var i = n;
				t.trim().split(Ee).forEach(function(t) {
					if (r.once && !$e) {
						var a = e.__cropperListeners__ || {};
						i = function() {
							a[t] && a[t][n] && delete a[t][n], e.removeEventListener(t, i, r);
							var o = [...arguments];
							n.apply(e, o);
						}, a[t] || (a[t] = {}), a[t][n] && e.removeEventListener(t, a[t][n], r), a[t][n] = i, e.__cropperListeners__ = a;
					}
					e.addEventListener(t, i, r);
				});
			}
		}
		function nt(e, t, n) {
			if (!e || !t || !R(e.dispatchEvent)) return !1;
			var r;
			if (R(Event) && R(CustomEvent)) r = new CustomEvent(t, {
				detail: n,
				bubbles: !0,
				cancelable: !0
			});
			else if (Ie(document) && R(document.createEvent)) r = document.createEvent("CustomEvent"), r.initCustomEvent(t, !0, !0, n);
			else return !1;
			return e.dispatchEvent(r);
		}
		function rt(e) {
			if (!e || !R(e.getBoundingClientRect)) return {
				left: 0,
				top: 0
			};
			var t = e.getBoundingClientRect(), n = (document || {}).documentElement, r = n === void 0 ? {} : n, i = g.pageXOffset || 0, a = g.pageYOffset || 0;
			return {
				left: t.left + (i - (r.clientLeft || 0)),
				top: t.top + (a - (r.clientTop || 0))
			};
		}
		var it = g.location, at = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
		function ot(e) {
			var t = e.match(at);
			return t !== null && (t[1] !== it.protocol || t[2] !== it.hostname || t[3] !== it.port);
		}
		function st(e) {
			var t = e.indexOf("#"), n = t >= 0 ? e.slice(t) : "", r = t >= 0 ? e.slice(0, t) : e, i = `timestamp=${(/* @__PURE__ */ new Date()).getTime()}`;
			return `${r}${r.indexOf("?") === -1 ? "?" : "&"}${i}${n}`;
		}
		function ct(e) {
			var t = e.rotate, n = e.scaleX, r = e.scaleY, i = e.translateX, a = e.translateY, o = [];
			L(i) && i !== 0 && o.push(`translateX(${i}px)`), L(a) && a !== 0 && o.push(`translateY(${a}px)`), L(t) && t !== 0 && o.push(`rotate(${t}deg)`), L(n) && n !== 1 && o.push(`scaleX(${n})`), L(r) && r !== 1 && o.push(`scaleY(${r})`);
			var s = o.length ? o.join(" ") : "none";
			return {
				WebkitTransform: s,
				msTransform: s,
				transform: s
			};
		}
		function lt(e) {
			var t = l({}, e), n = 0;
			return z(e, function(e, r) {
				delete t[r], z(t, function(t) {
					var r = Math.abs(e.startX - t.startX), i = Math.abs(e.startY - t.startY), a = Math.abs(e.endX - t.endX), o = Math.abs(e.endY - t.endY), s = Math.sqrt(r * r + i * i), c = Math.sqrt(a * a + o * o);
					if (Ne(s) && Ne(c) && s !== 0 && c !== s) {
						var l = (c - s) / s;
						Ne(l) && Math.abs(l) > Math.abs(n) && (n = l);
					}
				});
			}), n;
		}
		function ut(e, t) {
			var n = e.pageX, r = e.pageY, i = {
				endX: n,
				endY: r
			};
			return t ? i : l({
				startX: n,
				startY: r
			}, i);
		}
		function dt(e) {
			var t = 0, n = 0, r = 0;
			return z(e, function(e) {
				var i = e.startX, a = e.startY;
				t += i, n += a, r += 1;
			}), t /= r, n /= r, {
				pageX: t,
				pageY: n
			};
		}
		function ft(e) {
			var t = e.aspectRatio, n = e.height, r = e.width, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", a = Pe(r), o = Pe(n);
			if (a && o) {
				var s = n * t;
				i === "contain" && s > r || i === "cover" && s < r ? n = r / t : r = n * t;
			} else a ? n = r / t : o && (r = n * t);
			return {
				width: r,
				height: n
			};
		}
		function pt(e) {
			var t = e.width, n = e.height, r = e.degree;
			if (r = Math.abs(r) % 180, r === 90) return {
				width: n,
				height: t
			};
			var i = r % 90 * Math.PI / 180, a = Math.sin(i), o = Math.cos(i), s = t * o + n * a, c = t * a + n * o;
			return r > 90 ? {
				width: c,
				height: s
			} : {
				width: s,
				height: c
			};
		}
		function mt(e, t, n, r) {
			var i = t.aspectRatio, a = t.naturalWidth, o = t.naturalHeight, s = t.rotate, c = s === void 0 ? 0 : s, l = t.scaleX, d = l === void 0 ? 1 : l, f = t.scaleY, p = f === void 0 ? 1 : f, m = n.aspectRatio, h = n.naturalWidth, g = n.naturalHeight, _ = r.fillColor, v = _ === void 0 ? "transparent" : _, y = r.imageSmoothingEnabled, b = y === void 0 || y, x = r.imageSmoothingQuality, S = x === void 0 ? "low" : x, C = r.maxWidth, w = C === void 0 ? Infinity : C, T = r.maxHeight, E = T === void 0 ? Infinity : T, D = r.minWidth, O = D === void 0 ? 0 : D, k = r.minHeight, A = k === void 0 ? 0 : k, j = document.createElement("canvas"), M = j.getContext("2d"), N = ft({
				aspectRatio: m,
				width: w,
				height: E
			}), P = ft({
				aspectRatio: m,
				width: O,
				height: A
			}, "cover"), F = Math.min(N.width, Math.max(P.width, h)), ee = Math.min(N.height, Math.max(P.height, g)), te = ft({
				aspectRatio: i,
				width: w,
				height: E
			}), ne = ft({
				aspectRatio: i,
				width: O,
				height: A
			}, "cover"), re = Math.min(te.width, Math.max(ne.width, a)), ie = Math.min(te.height, Math.max(ne.height, o)), ae = [
				-re / 2,
				-ie / 2,
				re,
				ie
			];
			return j.width = He(F), j.height = He(ee), M.fillStyle = v, M.fillRect(0, 0, F, ee), M.save(), M.translate(F / 2, ee / 2), M.rotate(c * Math.PI / 180), M.scale(d, p), M.imageSmoothingEnabled = b, M.imageSmoothingQuality = S, M.drawImage.apply(M, [e].concat(u(ae.map(function(e) {
				return Math.floor(He(e));
			})))), M.restore(), j;
		}
		var ht = String.fromCharCode;
		function gt(e, t, n) {
			var r = "";
			n += t;
			for (var i = t; i < n; i += 1) r += ht(e.getUint8(i));
			return r;
		}
		var _t = /^data:.*,/;
		function vt(e) {
			var t = e.replace(_t, ""), n = atob(t), r = new ArrayBuffer(n.length), i = new Uint8Array(r);
			return z(i, function(e, t) {
				i[t] = n.charCodeAt(t);
			}), r;
		}
		function yt(e, t) {
			for (var n = [], r = 8192, i = new Uint8Array(e); i.length > 0;) n.push(ht.apply(null, Be(i.subarray(0, r)))), i = i.subarray(r);
			return `data:${t};base64,${btoa(n.join(""))}`;
		}
		function bt(e) {
			var t = new DataView(e), n;
			try {
				var r, i, a;
				if (t.getUint8(0) === 255 && t.getUint8(1) === 216) for (var o = t.byteLength, s = 2; s + 1 < o;) {
					if (t.getUint8(s) === 255 && t.getUint8(s + 1) === 225) {
						i = s;
						break;
					}
					s += 1;
				}
				if (i) {
					var c = i + 4, l = i + 10;
					if (gt(t, c, 4) === "Exif") {
						var u = t.getUint16(l);
						if (r = u === 18761, (r || u === 19789) && t.getUint16(l + 2, r) === 42) {
							var d = t.getUint32(l + 4, r);
							d >= 8 && (a = l + d);
						}
					}
				}
				if (a) {
					for (var f = t.getUint16(a, r), p, m = 0; m < f; m += 1) if (p = a + m * 12 + 2, t.getUint16(p, r) === 274) {
						p += 8, n = t.getUint16(p, r), t.setUint16(p, 1, r);
						break;
					}
				}
			} catch {
				n = 1;
			}
			return n;
		}
		function xt(e) {
			var t = 0, n = 1, r = 1;
			switch (e) {
				case 2:
					n = -1;
					break;
				case 3:
					t = -180;
					break;
				case 4:
					r = -1;
					break;
				case 5:
					t = 90, r = -1;
					break;
				case 6:
					t = 90;
					break;
				case 7:
					t = 90, n = -1;
					break;
				case 8: t = -90;
			}
			return {
				rotate: t,
				scaleX: n,
				scaleY: r
			};
		}
		var St = {
			render: function() {
				this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
			},
			initContainer: function() {
				var e = this.element, t = this.options, n = this.container, r = this.cropper, i = Number(t.minContainerWidth), a = Number(t.minContainerHeight);
				V(r, P), Ke(e, P);
				var o = {
					width: Math.max(n.offsetWidth, i >= 0 ? i : Oe),
					height: Math.max(n.offsetHeight, a >= 0 ? a : ke)
				};
				this.containerData = o, We(r, {
					width: o.width,
					height: o.height
				}), V(e, P), Ke(r, P);
			},
			initCanvas: function() {
				var e = this.containerData, t = this.imageData, n = this.options.viewMode, r = Math.abs(t.rotate) % 180 == 90, i = r ? t.naturalHeight : t.naturalWidth, a = r ? t.naturalWidth : t.naturalHeight, o = i / a, s = e.width, c = e.height;
				e.height * o > e.width ? n === 3 ? s = e.height * o : c = e.width / o : n === 3 ? c = e.width / o : s = e.height * o;
				var l = {
					aspectRatio: o,
					naturalWidth: i,
					naturalHeight: a,
					width: s,
					height: c
				};
				this.canvasData = l, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), l.width = Math.min(Math.max(l.width, l.minWidth), l.maxWidth), l.height = Math.min(Math.max(l.height, l.minHeight), l.maxHeight), l.left = (e.width - l.width) / 2, l.top = (e.height - l.height) / 2, l.oldLeft = l.left, l.oldTop = l.top, this.initialCanvasData = B({}, l);
			},
			limitCanvas: function(e, t) {
				var n = this.options, r = this.containerData, i = this.canvasData, a = this.cropBoxData, o = n.viewMode, s = i.aspectRatio, c = this.cropped && a;
				if (e) {
					var l = Number(n.minCanvasWidth) || 0, u = Number(n.minCanvasHeight) || 0;
					o > 1 ? (l = Math.max(l, r.width), u = Math.max(u, r.height), o === 3 && (u * s > l ? l = u * s : u = l / s)) : o > 0 && (l ? l = Math.max(l, c ? a.width : 0) : u ? u = Math.max(u, c ? a.height : 0) : c && (l = a.width, u = a.height, u * s > l ? l = u * s : u = l / s));
					var d = ft({
						aspectRatio: s,
						width: l,
						height: u
					});
					l = d.width, u = d.height, i.minWidth = l, i.minHeight = u, i.maxWidth = Infinity, i.maxHeight = Infinity;
				}
				if (t) {
					if (o > +!c) {
						var f = r.width - i.width, p = r.height - i.height;
						i.minLeft = Math.min(0, f), i.minTop = Math.min(0, p), i.maxLeft = Math.max(0, f), i.maxTop = Math.max(0, p), c && this.limited && (i.minLeft = Math.min(a.left, a.left + (a.width - i.width)), i.minTop = Math.min(a.top, a.top + (a.height - i.height)), i.maxLeft = a.left, i.maxTop = a.top, o === 2 && (i.width >= r.width && (i.minLeft = Math.min(0, f), i.maxLeft = Math.max(0, f)), i.height >= r.height && (i.minTop = Math.min(0, p), i.maxTop = Math.max(0, p))));
					} else i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = r.width, i.maxTop = r.height;
				}
			},
			renderCanvas: function(e, t) {
				var n = this.canvasData, r = this.imageData;
				if (t) {
					var i = pt({
						width: r.naturalWidth * Math.abs(r.scaleX || 1),
						height: r.naturalHeight * Math.abs(r.scaleY || 1),
						degree: r.rotate || 0
					}), a = i.width, o = i.height, s = n.width * (a / n.naturalWidth), c = n.height * (o / n.naturalHeight);
					n.left -= (s - n.width) / 2, n.top -= (c - n.height) / 2, n.width = s, n.height = c, n.aspectRatio = a / o, n.naturalWidth = a, n.naturalHeight = o, this.limitCanvas(!0, !1);
				}
				(n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, We(this.canvas, B({
					width: n.width,
					height: n.height
				}, ct({
					translateX: n.left,
					translateY: n.top
				}))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
			},
			renderImage: function(e) {
				var t = this.canvasData, n = this.imageData, r = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
				B(n, {
					width: r,
					height: i,
					left: (t.width - r) / 2,
					top: (t.height - i) / 2
				}), We(this.image, B({
					width: n.width,
					height: n.height
				}, ct(B({
					translateX: n.left,
					translateY: n.top
				}, n)))), e && this.output();
			},
			initCropBox: function() {
				var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, r = Number(e.autoCropArea) || .8, i = {
					width: t.width,
					height: t.height
				};
				n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * r), i.height = Math.max(i.minHeight, i.height * r), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = B({}, i);
			},
			limitCropBox: function(e, t) {
				var n = this.options, r = this.containerData, i = this.canvasData, a = this.cropBoxData, o = this.limited, s = n.aspectRatio;
				if (e) {
					var c = Number(n.minCropBoxWidth) || 0, l = Number(n.minCropBoxHeight) || 0, u = o ? Math.min(r.width, i.width, i.width + i.left, r.width - i.left) : r.width, d = o ? Math.min(r.height, i.height, i.height + i.top, r.height - i.top) : r.height;
					c = Math.min(c, r.width), l = Math.min(l, r.height), s && (c && l ? l * s > c ? l = c / s : c = l * s : c ? l = c / s : l && (c = l * s), d * s > u ? d = u / s : u = d * s), a.minWidth = Math.min(c, u), a.minHeight = Math.min(l, d), a.maxWidth = u, a.maxHeight = d;
				}
				t && (o ? (a.minLeft = Math.max(0, i.left), a.minTop = Math.max(0, i.top), a.maxLeft = Math.min(r.width, i.left + i.width) - a.width, a.maxTop = Math.min(r.height, i.top + i.height) - a.height) : (a.minLeft = 0, a.minTop = 0, a.maxLeft = r.width - a.width, a.maxTop = r.height - a.height));
			},
			renderCropBox: function() {
				var e = this.options, t = this.containerData, n = this.cropBoxData;
				(n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && Ze(this.face, re, n.width >= t.width && n.height >= t.height ? S : b), We(this.cropBox, B({
					width: n.width,
					height: n.height
				}, ct({
					translateX: n.left,
					translateY: n.top
				}))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
			},
			output: function() {
				this.preview(), nt(this.element, ce, this.getData());
			}
		}, Ct = {
			initPreview: function() {
				var e = this.element, t = this.crossOrigin, n = this.options.preview, r = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", a = document.createElement("img");
				if (t && (a.crossOrigin = t), a.src = r, a.alt = i, this.viewBox.appendChild(a), this.viewBoxImage = a, n) {
					var o = n;
					typeof n == "string" ? o = e.ownerDocument.querySelectorAll(n) : n.querySelector && (o = [n]), this.previews = o, z(o, function(e) {
						var n = document.createElement("img");
						Ze(e, ie, {
							width: e.offsetWidth,
							height: e.offsetHeight,
							html: e.innerHTML
						}), t && (n.crossOrigin = t), n.src = r, n.alt = i, n.style.cssText = "display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;", e.innerHTML = "", e.appendChild(n);
					});
				}
			},
			resetPreview: function() {
				z(this.previews, function(e) {
					var t = Xe(e, ie);
					We(e, {
						width: t.width,
						height: t.height
					}), e.innerHTML = t.html, Qe(e, ie);
				});
			},
			preview: function() {
				var e = this.imageData, t = this.canvasData, n = this.cropBoxData, r = n.width, i = n.height, a = e.width, o = e.height, s = n.left - t.left - e.left, c = n.top - t.top - e.top;
				this.cropped && !this.disabled && (We(this.viewBoxImage, B({
					width: a,
					height: o
				}, ct(B({
					translateX: -s,
					translateY: -c
				}, e)))), z(this.previews, function(t) {
					var n = Xe(t, ie), l = n.width, u = n.height, d = l, f = u, p = 1;
					r && (p = l / r, f = i * p), i && f > u && (p = u / i, d = r * p, f = u), We(t, {
						width: d,
						height: f
					}), We(t.getElementsByTagName("img")[0], B({
						width: a * p,
						height: o * p
					}, ct(B({
						translateX: -s * p,
						translateY: -c * p
					}, e))));
				}));
			}
		}, H = {
			bind: function() {
				var e = this.element, t = this.options, n = this.cropper;
				R(t.cropstart) && tt(e, ue, t.cropstart), R(t.cropmove) && tt(e, le, t.cropmove), R(t.cropend) && tt(e, I, t.cropend), R(t.crop) && tt(e, ce, t.crop), R(t.zoom) && tt(e, xe, t.zoom), tt(n, he, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && tt(n, be, this.onWheel = this.wheel.bind(this), {
					passive: !1,
					capture: !0
				}), t.toggleDragModeOnDblclick && tt(n, de, this.onDblclick = this.dblclick.bind(this)), tt(e.ownerDocument, ge, this.onCropMove = this.cropMove.bind(this)), tt(e.ownerDocument, _e, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && tt(window, ye, this.onResize = this.resize.bind(this));
			},
			unbind: function() {
				var e = this.element, t = this.options, n = this.cropper;
				R(t.cropstart) && et(e, ue, t.cropstart), R(t.cropmove) && et(e, le, t.cropmove), R(t.cropend) && et(e, I, t.cropend), R(t.crop) && et(e, ce, t.crop), R(t.zoom) && et(e, xe, t.zoom), et(n, he, this.onCropStart), t.zoomable && t.zoomOnWheel && et(n, be, this.onWheel, {
					passive: !1,
					capture: !0
				}), t.toggleDragModeOnDblclick && et(n, de, this.onDblclick), et(e.ownerDocument, ge, this.onCropMove), et(e.ownerDocument, _e, this.onCropEnd), t.responsive && et(window, ye, this.onResize);
			}
		}, U = {
			resize: function() {
				if (!this.disabled) {
					var e = this.options, t = this.container, n = this.containerData, r = t.offsetWidth / n.width, i = t.offsetHeight / n.height, a = Math.abs(r - 1) > Math.abs(i - 1) ? r : i;
					if (a !== 1) {
						var o, s;
						e.restore && (o = this.getCanvasData(), s = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(z(o, function(e, t) {
							o[t] = e * a;
						})), this.setCropBoxData(z(s, function(e, t) {
							s[t] = e * a;
						})));
					}
				}
			},
			dblclick: function() {
				this.disabled || this.options.dragMode === se || this.setDragMode(Ge(this.dragBox, M) ? oe : ae);
			},
			wheel: function(e) {
				var t = this, n = Number(this.options.wheelZoomRatio) || .1, r = 1;
				this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
					t.wheeling = !1;
				}, 50), e.deltaY ? r = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? r = -e.wheelDelta / 120 : e.detail && (r = e.detail > 0 ? 1 : -1), this.zoom(-r * n, e)));
			},
			cropStart: function(e) {
				var t = e.buttons, n = e.button;
				if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (L(t) && t !== 1 || L(n) && n !== 0 || e.ctrlKey))) {
					var r = this.options, i = this.pointers, a;
					e.changedTouches ? z(e.changedTouches, function(e) {
						i[e.identifier] = ut(e);
					}) : i[e.pointerId || 0] = ut(e), a = Object.keys(i).length > 1 && r.zoomable && r.zoomOnTouch ? C : Xe(e.target, re), Ce.test(a) && nt(this.element, ue, {
						originalEvent: e,
						action: a
					}) !== !1 && (e.preventDefault(), this.action = a, this.cropping = !1, a === x && (this.cropping = !0, V(this.dragBox, te)));
				}
			},
			cropMove: function(e) {
				var t = this.action;
				if (!this.disabled && t) {
					var n = this.pointers;
					e.preventDefault(), nt(this.element, le, {
						originalEvent: e,
						action: t
					}) !== !1 && (e.changedTouches ? z(e.changedTouches, function(e) {
						B(n[e.identifier] || {}, ut(e, !0));
					}) : B(n[e.pointerId || 0] || {}, ut(e, !0)), this.change(e));
				}
			},
			cropEnd: function(e) {
				if (!this.disabled) {
					var t = this.action, n = this.pointers;
					e.changedTouches ? z(e.changedTouches, function(e) {
						delete n[e.identifier];
					}) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, qe(this.dragBox, te, this.cropped && this.options.modal)), nt(this.element, I, {
						originalEvent: e,
						action: t
					}));
				}
			}
		}, wt = { change: function(e) {
			var t = this.options, n = this.canvasData, r = this.containerData, i = this.cropBoxData, a = this.pointers, o = this.action, s = t.aspectRatio, c = i.left, l = i.top, u = i.width, d = i.height, f = c + u, p = l + d, m = 0, h = 0, g = r.width, _ = r.height, v = !0, y;
			!s && e.shiftKey && (s = u && d ? u / d : 1), this.limited && (m = i.minLeft, h = i.minTop, g = m + Math.min(r.width, n.width, n.left + n.width), _ = h + Math.min(r.height, n.height, n.top + n.height));
			var M = a[Object.keys(a)[0]], N = {
				x: M.endX - M.startX,
				y: M.endY - M.startY
			}, F = function(e) {
				switch (e) {
					case w:
						f + N.x > g && (N.x = g - f);
						break;
					case T:
						c + N.x < m && (N.x = m - c);
						break;
					case D:
						l + N.y < h && (N.y = h - l);
						break;
					case E: p + N.y > _ && (N.y = _ - p);
				}
			};
			switch (o) {
				case b:
					c += N.x, l += N.y;
					break;
				case w:
					if (N.x >= 0 && (f >= g || s && (l <= h || p >= _))) {
						v = !1;
						break;
					}
					F(w), u += N.x, u < 0 && (o = T, u = -u, c -= u), s && (d = u / s, l += (i.height - d) / 2);
					break;
				case D:
					if (N.y <= 0 && (l <= h || s && (c <= m || f >= g))) {
						v = !1;
						break;
					}
					F(D), d -= N.y, l += N.y, d < 0 && (o = E, d = -d, l -= d), s && (u = d * s, c += (i.width - u) / 2);
					break;
				case T:
					if (N.x <= 0 && (c <= m || s && (l <= h || p >= _))) {
						v = !1;
						break;
					}
					F(T), u -= N.x, c += N.x, u < 0 && (o = w, u = -u, c -= u), s && (d = u / s, l += (i.height - d) / 2);
					break;
				case E:
					if (N.y >= 0 && (p >= _ || s && (c <= m || f >= g))) {
						v = !1;
						break;
					}
					F(E), d += N.y, d < 0 && (o = D, d = -d, l -= d), s && (u = d * s, c += (i.width - u) / 2);
					break;
				case O:
					if (s) {
						if (N.y <= 0 && (l <= h || f >= g)) {
							v = !1;
							break;
						}
						F(D), d -= N.y, l += N.y, u = d * s;
					} else F(D), F(w), N.x >= 0 ? f < g ? u += N.x : N.y <= 0 && l <= h && (v = !1) : u += N.x, N.y <= 0 ? l > h && (d -= N.y, l += N.y) : (d -= N.y, l += N.y);
					u < 0 && d < 0 ? (o = j, d = -d, u = -u, l -= d, c -= u) : u < 0 ? (o = k, u = -u, c -= u) : d < 0 && (o = A, d = -d, l -= d);
					break;
				case k:
					if (s) {
						if (N.y <= 0 && (l <= h || c <= m)) {
							v = !1;
							break;
						}
						F(D), d -= N.y, l += N.y, u = d * s, c += i.width - u;
					} else F(D), F(T), N.x <= 0 ? c > m ? (u -= N.x, c += N.x) : N.y <= 0 && l <= h && (v = !1) : (u -= N.x, c += N.x), N.y <= 0 ? l > h && (d -= N.y, l += N.y) : (d -= N.y, l += N.y);
					u < 0 && d < 0 ? (o = A, d = -d, u = -u, l -= d, c -= u) : u < 0 ? (o = O, u = -u, c -= u) : d < 0 && (o = j, d = -d, l -= d);
					break;
				case j:
					if (s) {
						if (N.x <= 0 && (c <= m || p >= _)) {
							v = !1;
							break;
						}
						F(T), u -= N.x, c += N.x, d = u / s;
					} else F(E), F(T), N.x <= 0 ? c > m ? (u -= N.x, c += N.x) : N.y >= 0 && p >= _ && (v = !1) : (u -= N.x, c += N.x), N.y >= 0 ? p < _ && (d += N.y) : d += N.y;
					u < 0 && d < 0 ? (o = O, d = -d, u = -u, l -= d, c -= u) : u < 0 ? (o = A, u = -u, c -= u) : d < 0 && (o = k, d = -d, l -= d);
					break;
				case A:
					if (s) {
						if (N.x >= 0 && (f >= g || p >= _)) {
							v = !1;
							break;
						}
						F(w), u += N.x, d = u / s;
					} else F(E), F(w), N.x >= 0 ? f < g ? u += N.x : N.y >= 0 && p >= _ && (v = !1) : u += N.x, N.y >= 0 ? p < _ && (d += N.y) : d += N.y;
					u < 0 && d < 0 ? (o = k, d = -d, u = -u, l -= d, c -= u) : u < 0 ? (o = j, u = -u, c -= u) : d < 0 && (o = O, d = -d, l -= d);
					break;
				case S:
					this.move(N.x, N.y), v = !1;
					break;
				case C:
					this.zoom(lt(a), e), v = !1;
					break;
				case x:
					if (!N.x || !N.y) {
						v = !1;
						break;
					}
					y = rt(this.cropper), c = M.startX - y.left, l = M.startY - y.top, u = i.minWidth, d = i.minHeight, N.x > 0 ? o = N.y > 0 ? A : O : N.x < 0 && (c -= u, o = N.y > 0 ? j : k), N.y < 0 && (l -= d), this.cropped || (Ke(this.cropBox, P), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
			}
			v && (i.width = u, i.height = d, i.left = c, i.top = l, this.action = o, this.renderCropBox()), z(a, function(e) {
				e.startX = e.endX, e.startY = e.endY;
			});
		} }, Tt = {
			crop: function() {
				return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && V(this.dragBox, te), Ke(this.cropBox, P), this.setCropBoxData(this.initialCropBoxData)), this;
			},
			reset: function() {
				return this.ready && !this.disabled && (this.imageData = B({}, this.initialImageData), this.canvasData = B({}, this.initialCanvasData), this.cropBoxData = B({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
			},
			clear: function() {
				return this.cropped && !this.disabled && (B(this.cropBoxData, {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				}), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), Ke(this.dragBox, te), V(this.cropBox, P)), this;
			},
			replace: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
				return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, z(this.previews, function(t) {
					t.getElementsByTagName("img")[0].src = e;
				}))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
			},
			enable: function() {
				return this.ready && this.disabled && (this.disabled = !1, Ke(this.cropper, N)), this;
			},
			disable: function() {
				return this.ready && !this.disabled && (this.disabled = !0, V(this.cropper, N)), this;
			},
			destroy: function() {
				var e = this.element;
				return e[y] ? (e[y] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
			},
			move: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, r = n.left, i = n.top;
				return this.moveTo(Fe(e) ? e : r + Number(e), Fe(t) ? t : i + Number(t));
			},
			moveTo: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, r = !1;
				return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (L(e) && (n.left = e, r = !0), L(t) && (n.top = t, r = !0), r && this.renderCanvas(!0)), this;
			},
			zoom: function(e, t) {
				var n = this.canvasData;
				return e = Number(e), e = e < 0 ? 1 / (1 - e) : 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
			},
			zoomTo: function(e, t, n) {
				var r = this.options, i = this.canvasData, a = i.width, o = i.height, s = i.naturalWidth, c = i.naturalHeight;
				if (e = Number(e), e >= 0 && this.ready && !this.disabled && r.zoomable) {
					var l = s * e, u = c * e;
					if (nt(this.element, xe, {
						ratio: e,
						oldRatio: a / s,
						originalEvent: n
					}) === !1) return this;
					if (n) {
						var d = this.pointers, f = rt(this.cropper), p = d && Object.keys(d).length ? dt(d) : {
							pageX: n.pageX,
							pageY: n.pageY
						};
						i.left -= (l - a) * ((p.pageX - f.left - i.left) / a), i.top -= (u - o) * ((p.pageY - f.top - i.top) / o);
					} else Re(t) && L(t.x) && L(t.y) ? (i.left -= (l - a) * ((t.x - i.left) / a), i.top -= (u - o) * ((t.y - i.top) / o)) : (i.left -= (l - a) / 2, i.top -= (u - o) / 2);
					i.width = l, i.height = u, this.renderCanvas(!0);
				}
				return this;
			},
			rotate: function(e) {
				return this.rotateTo((this.imageData.rotate || 0) + Number(e));
			},
			rotateTo: function(e) {
				return e = Number(e), L(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
			},
			scaleX: function(e) {
				var t = this.imageData.scaleY;
				return this.scale(e, L(t) ? t : 1);
			},
			scaleY: function(e) {
				var t = this.imageData.scaleX;
				return this.scale(L(t) ? t : 1, e);
			},
			scale: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, r = !1;
				return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (L(e) && (n.scaleX = e, r = !0), L(t) && (n.scaleY = t, r = !0), r && this.renderCanvas(!0, !0)), this;
			},
			getData: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 && arguments[0], t = this.options, n = this.imageData, r = this.canvasData, i = this.cropBoxData, a;
				if (this.ready && this.cropped) {
					a = {
						x: i.left - r.left,
						y: i.top - r.top,
						width: i.width,
						height: i.height
					};
					var o = n.width / n.naturalWidth;
					if (z(a, function(e, t) {
						a[t] = e / o;
					}), e) {
						var s = Math.round(a.y + a.height), c = Math.round(a.x + a.width);
						a.x = Math.round(a.x), a.y = Math.round(a.y), a.width = c - a.x, a.height = s - a.y;
					}
				} else a = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
				return t.rotatable && (a.rotate = n.rotate || 0), t.scalable && (a.scaleX = n.scaleX || 1, a.scaleY = n.scaleY || 1), a;
			},
			setData: function(e) {
				var t = this.options, n = this.imageData, r = this.canvasData, i = {};
				if (this.ready && !this.disabled && Re(e)) {
					var a = !1;
					t.rotatable && L(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, a = !0), t.scalable && (L(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, a = !0), L(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, a = !0)), a && this.renderCanvas(!0, !0);
					var o = n.width / n.naturalWidth;
					L(e.x) && (i.left = e.x * o + r.left), L(e.y) && (i.top = e.y * o + r.top), L(e.width) && (i.width = e.width * o), L(e.height) && (i.height = e.height * o), this.setCropBoxData(i);
				}
				return this;
			},
			getContainerData: function() {
				return this.ready ? B({}, this.containerData) : {};
			},
			getImageData: function() {
				return this.sized ? B({}, this.imageData) : {};
			},
			getCanvasData: function() {
				var e = this.canvasData, t = {};
				return this.ready && z([
					"left",
					"top",
					"width",
					"height",
					"naturalWidth",
					"naturalHeight"
				], function(n) {
					t[n] = e[n];
				}), t;
			},
			setCanvasData: function(e) {
				var t = this.canvasData, n = t.aspectRatio;
				return this.ready && !this.disabled && Re(e) && (L(e.left) && (t.left = e.left), L(e.top) && (t.top = e.top), L(e.width) ? (t.width = e.width, t.height = e.width / n) : L(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
			},
			getCropBoxData: function() {
				var e = this.cropBoxData, t;
				return this.ready && this.cropped && (t = {
					left: e.left,
					top: e.top,
					width: e.width,
					height: e.height
				}), t || {};
			},
			setCropBoxData: function(e) {
				var t = this.cropBoxData, n = this.options.aspectRatio, r, i;
				return this.ready && this.cropped && !this.disabled && Re(e) && (L(e.left) && (t.left = e.left), L(e.top) && (t.top = e.top), L(e.width) && e.width !== t.width && (r = !0, t.width = e.width), L(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (r ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
			},
			getCroppedCanvas: function() {
				var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				if (!this.ready || !window.HTMLCanvasElement) return null;
				var t = this.canvasData, n = mt(this.image, this.imageData, t, e);
				if (!this.cropped) return n;
				var r = this.getData(e.rounded), i = r.x, a = r.y, o = r.width, s = r.height, c = n.width / Math.floor(t.naturalWidth);
				c !== 1 && (i *= c, a *= c, o *= c, s *= c);
				var l = o / s, d = ft({
					aspectRatio: l,
					width: e.maxWidth || Infinity,
					height: e.maxHeight || Infinity
				}), f = ft({
					aspectRatio: l,
					width: e.minWidth || 0,
					height: e.minHeight || 0
				}, "cover"), p = ft({
					aspectRatio: l,
					width: e.width || (c === 1 ? o : n.width),
					height: e.height || (c === 1 ? s : n.height)
				}), m = p.width, h = p.height;
				m = Math.min(d.width, Math.max(f.width, m)), h = Math.min(d.height, Math.max(f.height, h));
				var g = document.createElement("canvas"), _ = g.getContext("2d");
				g.width = He(m), g.height = He(h), _.fillStyle = e.fillColor || "transparent", _.fillRect(0, 0, m, h);
				var v = e.imageSmoothingEnabled, y = v === void 0 || v, b = e.imageSmoothingQuality;
				_.imageSmoothingEnabled = y, b && (_.imageSmoothingQuality = b);
				var x = n.width, S = n.height, C = i, w = a, T, E, D, O, k, A;
				C <= -o || C > x ? (C = 0, T = 0, D = 0, k = 0) : C <= 0 ? (D = -C, C = 0, T = Math.min(x, o + C), k = T) : C <= x && (D = 0, T = Math.min(o, x - C), k = T), T <= 0 || w <= -s || w > S ? (w = 0, E = 0, O = 0, A = 0) : w <= 0 ? (O = -w, w = 0, E = Math.min(S, s + w), A = E) : w <= S && (O = 0, E = Math.min(s, S - w), A = E);
				var j = [
					C,
					w,
					T,
					E
				];
				if (k > 0 && A > 0) {
					var M = m / o;
					j.push(D * M, O * M, k * M, A * M);
				}
				return _.drawImage.apply(_, [n].concat(u(j.map(function(e) {
					return Math.floor(He(e));
				})))), g;
			},
			setAspectRatio: function(e) {
				var t = this.options;
				return !this.disabled && !Fe(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
			},
			setDragMode: function(e) {
				var t = this.options, n = this.dragBox, r = this.face;
				if (this.ready && !this.disabled) {
					var i = e === ae, a = t.movable && e === oe;
					e = i || a ? e : se, t.dragMode = e, Ze(n, re, e), qe(n, M, i), qe(n, ne, a), t.cropBoxMovable || (Ze(r, re, e), qe(r, M, i), qe(r, ne, a));
				}
				return this;
			}
		}, Et = g.Cropper, Dt = /*#__PURE__*/ function() {
			function e(t) {
				var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				if (n(this, e), !t || !De.test(t.tagName)) throw Error("The first argument is required and must be an <img> or <canvas> element.");
				this.element = t, this.options = B({}, Ae, Re(r) && r), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
			}
			return i(e, [
				{
					key: "init",
					value: function() {
						var e = this.element, t = e.tagName.toLowerCase(), n;
						if (!e[y]) {
							if (e[y] = this, t === "img") {
								if (this.isImg = !0, n = e.getAttribute("src") || "", this.originalUrl = n, !n) return;
								n = e.src;
							} else t === "canvas" && window.HTMLCanvasElement && (n = e.toDataURL());
							this.load(n);
						}
					}
				},
				{
					key: "load",
					value: function(e) {
						var t = this;
						if (e) {
							this.url = e, this.imageData = {};
							var n = this.element, r = this.options;
							if (!r.rotatable && !r.scalable && (r.checkOrientation = !1), !r.checkOrientation || !window.ArrayBuffer) {
								this.clone();
								return;
							}
							if (we.test(e)) {
								Te.test(e) ? this.read(vt(e)) : this.clone();
								return;
							}
							var i = new XMLHttpRequest(), a = this.clone.bind(this);
							this.reloading = !0, this.xhr = i, i.onabort = a, i.onerror = a, i.ontimeout = a, i.onprogress = function() {
								i.getResponseHeader("content-type") !== Se && i.abort();
							}, i.onload = function() {
								t.read(i.response);
							}, i.onloadend = function() {
								t.reloading = !1, t.xhr = null;
							}, r.checkCrossOrigin && ot(e) && n.crossOrigin && (e = st(e)), i.open("GET", e, !0), i.responseType = "arraybuffer", i.withCredentials = n.crossOrigin === "use-credentials", i.send();
						}
					}
				},
				{
					key: "read",
					value: function(e) {
						var t = this.options, n = this.imageData, r = bt(e), i = 0, a = 1, o = 1;
						if (r > 1) {
							this.url = yt(e, Se);
							var s = xt(r);
							i = s.rotate, a = s.scaleX, o = s.scaleY;
						}
						t.rotatable && (n.rotate = i), t.scalable && (n.scaleX = a, n.scaleY = o), this.clone();
					}
				},
				{
					key: "clone",
					value: function() {
						var e = this.element, t = this.url, n = e.crossOrigin, r = t;
						this.options.checkCrossOrigin && ot(t) && (n ||= "anonymous", r = st(t)), this.crossOrigin = n, this.crossOriginUrl = r;
						var i = document.createElement("img");
						n && (i.crossOrigin = n), i.src = r || t, i.alt = e.alt || "The image to crop", this.image = i, i.onload = this.start.bind(this), i.onerror = this.stop.bind(this), V(i, F), e.parentNode.insertBefore(i, e.nextSibling);
					}
				},
				{
					key: "start",
					value: function() {
						var e = this, t = this.image;
						t.onload = null, t.onerror = null, this.sizing = !0;
						var n = g.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(g.navigator.userAgent), r = function(t, n) {
							B(e.imageData, {
								naturalWidth: t,
								naturalHeight: n,
								aspectRatio: t / n
							}), e.initialImageData = B({}, e.imageData), e.sizing = !1, e.sized = !0, e.build();
						};
						if (t.naturalWidth && !n) {
							r(t.naturalWidth, t.naturalHeight);
							return;
						}
						var i = document.createElement("img"), a = document.body || document.documentElement;
						this.sizingImage = i, i.onload = function() {
							r(i.width, i.height), n || a.removeChild(i);
						}, i.src = t.src, n || (i.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", a.appendChild(i));
					}
				},
				{
					key: "stop",
					value: function() {
						var e = this.image;
						e.onload = null, e.onerror = null, e.parentNode.removeChild(e), this.image = null;
					}
				},
				{
					key: "build",
					value: function() {
						if (this.sized && !this.ready) {
							var e = this.element, t = this.options, n = this.image, r = e.parentNode, i = document.createElement("div");
							i.innerHTML = je;
							var a = i.querySelector(`.${y}-container`), o = a.querySelector(`.${y}-canvas`), s = a.querySelector(`.${y}-drag-box`), c = a.querySelector(`.${y}-crop-box`), l = c.querySelector(`.${y}-face`);
							this.container = r, this.cropper = a, this.canvas = o, this.dragBox = s, this.cropBox = c, this.viewBox = a.querySelector(`.${y}-view-box`), this.face = l, o.appendChild(n), V(e, P), r.insertBefore(a, e.nextSibling), Ke(n, F), this.initPreview(), this.bind(), t.initialAspectRatio = Math.max(0, t.initialAspectRatio) || NaN, t.aspectRatio = Math.max(0, t.aspectRatio) || NaN, t.viewMode = Math.max(0, Math.min(3, Math.round(t.viewMode))) || 0, V(c, P), t.guides || V(c.getElementsByClassName(`${y}-dashed`), P), t.center || V(c.getElementsByClassName(`${y}-center`), P), t.background && V(a, `${y}-bg`), t.highlight || V(l, ee), t.cropBoxMovable && (V(l, ne), Ze(l, re, b)), t.cropBoxResizable || (V(c.getElementsByClassName(`${y}-line`), P), V(c.getElementsByClassName(`${y}-point`), P)), this.render(), this.ready = !0, this.setDragMode(t.dragMode), t.autoCrop && this.crop(), this.setData(t.data), R(t.ready) && tt(e, ve, t.ready, { once: !0 }), nt(e, ve);
						}
					}
				},
				{
					key: "unbuild",
					value: function() {
						if (this.ready) {
							this.ready = !1, this.unbind(), this.resetPreview();
							var e = this.cropper.parentNode;
							e && e.removeChild(this.cropper), Ke(this.element, P);
						}
					}
				},
				{
					key: "uncreate",
					value: function() {
						this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
					}
				}
			], [{
				key: "noConflict",
				value: function() {
					return window.Cropper = Et, e;
				}
			}, {
				key: "setDefaults",
				value: function(e) {
					B(Ae, Re(e) && e);
				}
			}]);
		}();
		return B(Dt.prototype, St, Ct, H, U, wt, Tt), Dt;
	}));
})), jd, Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd, Ud, Wd, Gd, Kd, qd, Jd, Yd = o((() => {
	jd = "@uppy/image-editor", Md = "Image editor and cropping UI", Nd = "5.0.0", Pd = "dist/style.min.css", Fd = "module", Id = ["*.css"], Ld = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build"
	}, Rd = [
		"file uploader",
		"upload",
		"uppy",
		"uppy-plugin",
		"image editor",
		"cropper",
		"crop",
		"rotate",
		"resize"
	], zd = "https://uppy.io", Bd = { url: "https://github.com/transloadit/uppy/issues" }, Vd = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Hd = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], Ud = {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	}, Wd = {
		cropperjs: "^1.6.2",
		preact: "^10.29.2"
	}, Gd = { "@uppy/core": "^6.0.0" }, Kd = { access: "public" }, qd = {
		cssnano: "^8.0.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3"
	}, Jd = {
		name: jd,
		description: Md,
		version: Nd,
		license: "MIT",
		style: Pd,
		type: Fd,
		sideEffects: Id,
		scripts: Ld,
		keywords: Rd,
		homepage: zd,
		bugs: Bd,
		repository: Vd,
		files: Hd,
		exports: Ud,
		dependencies: Wd,
		peerDependencies: Gd,
		publishConfig: Kd,
		devDependencies: qd
	};
})), Xd, Zd = o((() => {
	K(), El(), Xd = class extends U {
		imgElement;
		componentDidMount() {
			let { initCropper: e } = this.props;
			this.imgElement && e(this.imgElement);
		}
		onRotate90Deg = () => {
			this.props.rotateBy(-90);
		};
		onRotateGranular = (e) => {
			let t = Number(e.target.value);
			this.props.rotateGranular(t);
		};
		renderGranularRotate() {
			let { i18n: e } = this.props, { angleGranular: t } = this.props;
			return G("label", {
				role: "tooltip",
				"aria-label": `${t}º`,
				"data-microtip-position": "top",
				className: "uppy-ImageCropper-rangeWrapper",
				children: G("input", {
					className: "uppy-ImageCropper-range uppy-u-reset",
					type: "range",
					onInput: this.onRotateGranular,
					onChange: this.onRotateGranular,
					value: t,
					min: "-45",
					max: "45",
					"aria-label": e("rotate")
				})
			});
		}
		renderRevert() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("revert"),
				onClick: () => {
					this.props.reset();
				},
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), G("path", { d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" })]
				})
			});
		}
		renderRotate() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("rotate"),
				onClick: this.onRotate90Deg,
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", {
						d: "M0 0h24v24H0V0zm0 0h24v24H0V0z",
						fill: "none"
					}), G("path", { d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z" })]
				})
			});
		}
		renderFlip() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("flipHorizontal"),
				onClick: () => this.props.flipHorizontal(),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), G("path", { d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z" })]
				})
			});
		}
		renderZoomIn() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("zoomIn"),
				onClick: () => this.props.zoom(.1),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					height: "24",
					viewBox: "0 0 24 24",
					width: "24",
					children: [
						G("path", {
							d: "M0 0h24v24H0V0z",
							fill: "none"
						}),
						G("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
						G("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" })
					]
				})
			});
		}
		renderZoomOut() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("zoomOut"),
				onClick: () => this.props.zoom(-.1),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", {
						d: "M0 0h24v24H0V0z",
						fill: "none"
					}), G("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" })]
				})
			});
		}
		renderCropSquare() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("aspectRatioSquare"),
				onClick: () => this.props.setAspectRatio("1:1"),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), G("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })]
				})
			});
		}
		renderCropWidescreen() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				"aria-label": e("aspectRatioLandscape"),
				onClick: () => this.props.setAspectRatio("16:9"),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", { d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z" }), G("path", {
						fill: "none",
						d: "M0 0h24v24H0z"
					})]
				})
			});
		}
		renderCropWidescreenVertical() {
			let { i18n: e } = this.props;
			return G("button", {
				"data-microtip-position": "top",
				type: "button",
				"aria-label": e("aspectRatioPortrait"),
				className: "uppy-u-reset uppy-c-btn",
				onClick: () => this.props.setAspectRatio("9:16"),
				children: G("svg", {
					"aria-hidden": "true",
					className: "uppy-c-icon",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					children: [G("path", { d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z" }), G("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					})]
				})
			});
		}
		render() {
			let { currentImage: e, objectUrl: t, opts: n } = this.props, { actions: r } = n;
			return G("div", {
				className: "uppy-ImageCropper",
				children: [G("div", {
					className: "uppy-ImageCropper-container",
					children: G("img", {
						className: "uppy-ImageCropper-image",
						alt: e.name,
						src: t,
						ref: (e) => {
							this.imgElement = e;
						}
					})
				}), G("div", {
					className: "uppy-ImageCropper-controls",
					children: [
						r.revert && this.renderRevert(),
						r.rotate && this.renderRotate(),
						r.granularRotate && this.renderGranularRotate(),
						r.flip && this.renderFlip(),
						r.zoomIn && this.renderZoomIn(),
						r.zoomOut && this.renderZoomOut(),
						r.cropSquare && this.renderCropSquare(),
						r.cropWidescreen && this.renderCropWidescreen(),
						r.cropWidescreenVertical && this.renderCropWidescreenVertical()
					]
				})]
			});
		}
	};
})), Qd, $d = o((() => {
	Qd = { strings: {
		revert: "Reset",
		rotate: "Rotate 90°",
		zoomIn: "Zoom in",
		zoomOut: "Zoom out",
		flipHorizontal: "Flip horizontally",
		aspectRatioSquare: "Crop square",
		aspectRatioLandscape: "Crop landscape (16:9)",
		aspectRatioPortrait: "Crop portrait (9:16)"
	} };
}));
//#endregion
//#region node_modules/@uppy/image-editor/lib/utils/getCanvasDataThatFitsPerfectlyIntoContainer.js
function ef(e, t) {
	let n = e.width / t.width, r = e.height / t.height, i = Math.min(n, r), a = t.width * i, o = t.height * i;
	return {
		width: a,
		height: o,
		left: (e.width - a) / 2,
		top: (e.height - o) / 2
	};
}
var tf = o((() => {}));
//#endregion
//#region node_modules/@uppy/image-editor/lib/utils/getScaleFactorThatRemovesDarkCorners.js
function nf(e) {
	return Math.PI / 180 * e;
}
function rf(e, t, n) {
	let r = Math.abs(nf(n));
	return Math.max((Math.sin(r) * e + Math.cos(r) * t) / t, (Math.sin(r) * t + Math.cos(r) * e) / e);
}
var af = o((() => {}));
//#endregion
//#region node_modules/@uppy/image-editor/lib/utils/limitCropboxMovementOnMove.js
function of(e, t, n) {
	return t.left < e.left ? {
		left: e.left,
		width: n.width
	} : t.top < e.top ? {
		top: e.top,
		height: n.height
	} : t.left + t.width > e.left + e.width ? {
		left: e.left + e.width - n.width,
		width: n.width
	} : t.top + t.height > e.top + e.height ? {
		top: e.top + e.height - n.height,
		height: n.height
	} : null;
}
var sf = o((() => {}));
//#endregion
//#region node_modules/@uppy/image-editor/lib/utils/limitCropboxMovementOnResize.js
function cf(e, t, n) {
	return t.left < e.left ? {
		left: e.left,
		width: n.left + n.width - e.left
	} : t.top < e.top ? {
		top: e.top,
		height: n.top + n.height - e.top
	} : t.left + t.width > e.left + e.width ? {
		left: n.left,
		width: e.left + e.width - n.left
	} : t.top + t.height > e.top + e.height ? {
		top: n.top,
		height: e.top + e.height - n.top
	} : null;
}
var lf = o((() => {})), uf, df, ff, pf, mf, hf, gf = o((() => {
	K(), Z(), uf = /* @__PURE__ */ u(Ad(), 1), Yd(), Zd(), $d(), tf(), af(), sf(), lf(), df = {
		angle: 0,
		angleGranular: 0,
		isFlippedHorizontally: !1,
		aspectRatio: "free",
		cropperReady: !1
	}, ff = {
		viewMode: 0,
		background: !1,
		autoCropArea: 1,
		responsive: !0,
		minCropBoxWidth: 70,
		minCropBoxHeight: 70,
		croppedCanvasOptions: {},
		initialAspectRatio: 0
	}, pf = {
		revert: !0,
		rotate: !0,
		granularRotate: !0,
		flip: !0,
		zoomIn: !0,
		zoomOut: !0,
		cropSquare: !0,
		cropWidescreen: !0,
		cropWidescreenVertical: !0
	}, mf = {
		quality: .8,
		actions: pf,
		cropperOptions: ff
	}, hf = class extends ar {
		static VERSION = Jd.version;
		cropper = null;
		objectUrl = null;
		prevCropboxData = null;
		imgElement = null;
		cropstartHandler = null;
		cropendHandler = null;
		cropperReadyHandler = null;
		constructor(e, t) {
			super(e, {
				...mf,
				...t,
				actions: {
					...pf,
					...t?.actions
				},
				cropperOptions: {
					...ff,
					...t?.cropperOptions
				}
			}), this.id = this.opts.id || "ImageEditor", this.title = "Image Editor", this.type = "editor", this.defaultLocale = Qd, this.i18nInit();
		}
		canEditFile(e) {
			if (!e.type || e.isRemote) return !1;
			let t = e.type.split("/")[1];
			return !!/^(jpe?g|gif|png|bmp|webp)$/.test(t);
		}
		save = () => {
			let { currentImage: e } = this.getPluginState();
			if (!e || !this.cropper) return;
			let t = (t) => {
				if (!t) return;
				let n = e.id;
				if (!this.uppy.getFile(n)) return;
				this.uppy.setFileState(n, {
					data: new File([t], e.name ?? this.i18n("unnamed"), { type: t.type }),
					size: t.size,
					preview: void 0
				});
				let r = this.uppy.getFile(n);
				r && (this.uppy.emit("thumbnail:request", r), this.setPluginState({ currentImage: r }), this.uppy.emit("file-editor:complete", r));
			}, n = this.cropper.getCroppedCanvas({});
			n.width % 2 != 0 && this.cropper.setData({ width: n.width - 1 }), n.height % 2 != 0 && this.cropper.setData({ height: n.height - 1 }), this.cropper.getCroppedCanvas(this.opts.cropperOptions.croppedCanvasOptions).toBlob(t, e.type, this.opts.quality);
		};
		storeCropperInstance = (e) => {
			this.cropper = e;
		};
		selectFile = (e) => {
			this.start(e);
		};
		resetEditorState = (e = this.getPluginState().currentImage) => {
			this.setPluginState({
				currentImage: e,
				...df,
				cropperReady: !!this.cropper
			});
		};
		rotateBy = (e) => {
			if (!this.cropper) return;
			let { angle: t, angleGranular: n, isFlippedHorizontally: r } = this.getPluginState(), i = t - n + e;
			this.cropper.scale(r ? -1 : 1), this.cropper.rotateTo(i);
			let a = this.cropper.getCanvasData(), o = ef(this.cropper.getContainerData(), a);
			this.cropper.setCanvasData(o), this.cropper.setCropBoxData(o), this.setPluginState({
				angle: i,
				angleGranular: 0
			});
		};
		rotateGranular = (e) => {
			if (!this.cropper) return;
			let { angle: t, angleGranular: n, isFlippedHorizontally: r } = this.getPluginState(), i = t - n + e;
			this.cropper.rotateTo(i);
			let a = this.cropper.getImageData(), o = rf(a.naturalWidth, a.naturalHeight, e), s = r ? -o : o;
			this.cropper.scale(s, o), this.setPluginState({
				angle: i,
				angleGranular: e
			});
		};
		flipHorizontal = () => {
			if (!this.cropper) return;
			let { isFlippedHorizontally: e } = this.getPluginState();
			this.cropper.scaleX(-this.cropper.getData().scaleX || -1), this.setPluginState({ isFlippedHorizontally: !e });
		};
		zoom = (e) => {
			this.cropper && this.cropper.zoom(e);
		};
		setAspectRatio = (e) => {
			this.cropper && (this.cropper.setAspectRatio({
				free: 0,
				"1:1": 1,
				"16:9": 16 / 9,
				"9:16": 9 / 16
			}[e]), this.setPluginState({ aspectRatio: e }));
		};
		reset = () => {
			this.cropper && (this.cropper.reset(), this.cropper.setAspectRatio(this.opts.cropperOptions.initialAspectRatio || 0), this.resetEditorState());
		};
		start = (e) => {
			this.stop();
			let t = e.data;
			t instanceof Blob || (t = this.uppy.getFile(e.id)?.data), t instanceof Blob ? this.objectUrl = URL.createObjectURL(t) : console.warn("[Uppy ImageEditor] Cannot edit file: file.data is not a Blob.", "File:", e, "file.data:", e.data, "typeof file.data:", typeof e.data), this.uppy.emit("file-editor:start", e), this.resetEditorState(e);
		};
		stop = () => {
			this.destroyCropper(), this.objectUrl &&= (URL.revokeObjectURL(this.objectUrl), null), this.resetEditorState(null);
		};
		initCropper = (e) => {
			this.cropper || (this.imgElement = e, this.cropper = new uf.default(e, this.opts.cropperOptions), this.cropstartHandler = () => {
				this.cropper && (this.prevCropboxData = this.cropper.getCropBoxData());
			}, this.cropendHandler = ((e) => {
				if (!this.cropper || !this.prevCropboxData) return;
				let t = this.cropper.getCanvasData(), n = this.cropper.getCropBoxData();
				if (e.detail.action === "all") {
					let e = of(t, n, this.prevCropboxData);
					e && this.cropper.setCropBoxData(e);
				} else {
					let e = cf(t, n, this.prevCropboxData);
					e && this.cropper.setCropBoxData(e);
				}
			}), this.cropperReadyHandler = () => {
				this.setPluginState({ cropperReady: !0 });
			}, e.addEventListener("cropstart", this.cropstartHandler), e.addEventListener("cropend", this.cropendHandler), e.addEventListener("ready", this.cropperReadyHandler, { once: !0 }));
		};
		destroyCropper = () => {
			this.cropper && (this.setPluginState({ cropperReady: !1 }), this.cropstartHandler && this.imgElement && this.imgElement.removeEventListener("cropstart", this.cropstartHandler), this.cropendHandler && this.imgElement && this.imgElement.removeEventListener("cropend", this.cropendHandler), this.cropperReadyHandler && this.imgElement && this.imgElement.removeEventListener("ready", this.cropperReadyHandler), this.cropper.destroy(), this.cropper = null, this.imgElement = null, this.cropstartHandler = null, this.cropendHandler = null, this.cropperReadyHandler = null, this.prevCropboxData = null);
		};
		getObjectUrl = () => this.objectUrl;
		handleFileRemoved = (e) => {
			let { currentImage: t } = this.getPluginState();
			t && t.id === e.id && this.stop();
		};
		install() {
			this.resetEditorState(null), this.uppy.on("file-removed", this.handleFileRemoved);
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			let { currentImage: e } = this.getPluginState();
			if (e) {
				let t = this.uppy.getFile(e.id);
				this.uppy.emit("file-editor:cancel", t);
			}
			this.uppy.off("file-removed", this.handleFileRemoved), this.stop(), this.unmount();
		}
		render() {
			let { currentImage: e, angleGranular: t } = this.getPluginState();
			return e === null || e.isRemote ? null : G(Xd, {
				currentImage: e,
				objectUrl: this.objectUrl ?? "",
				initCropper: this.initCropper,
				save: this.save,
				opts: this.opts,
				i18n: this.i18n,
				angleGranular: t,
				rotateBy: this.rotateBy,
				rotateGranular: this.rotateGranular,
				flipHorizontal: this.flipHorizontal,
				zoom: this.zoom,
				setAspectRatio: this.setAspectRatio,
				reset: this.reset
			});
		}
	};
})), _f = /* @__PURE__ */ c({
	default: () => hf,
	getCanvasDataThatFitsPerfectlyIntoContainer: () => ef,
	getScaleFactorThatRemovesDarkCorners: () => rf,
	limitCropboxMovementOnMove: () => of,
	limitCropboxMovementOnResize: () => cf
}), vf = o((() => {
	gf(), tf(), af(), sf(), lf();
})), yf = (e, t) => Math.abs(e - t) < .01;
async function bf(e, { aspectRatios: t, fixedAspectRatio: n }) {
	let { default: r } = await Promise.resolve().then(() => (vf(), _f)), i = (e) => !n && (!t.length || t.some((t) => yf(t, e)));
	e.use(r, {
		actions: {
			cropSquare: i(1),
			cropWidescreen: i(16 / 9),
			cropWidescreenVertical: i(9 / 16)
		},
		cropperOptions: n ? { aspectRatio: n } : {}
	});
}
function xf(e, t) {
	return !!(t.progress.uploadComplete && e.getPlugin("ImageEditor")?.canEditFile(t));
}
//#endregion
//#region resources/js/item-actions.js
var Sf = {
	download: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z\"/><path d=\"M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z\"/></svg>",
	edit: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z\"/></svg>"
};
function Cf(e, t, n) {
	let r = () => {
		t.querySelectorAll(".uppy-Dashboard-Item").forEach((t) => {
			let r = e.getFile(t.id.replace(/^uppy_/, "")), a = t.querySelector(".uppy-Dashboard-Item-actionWrapper");
			if (!r || !a) return;
			let o = n(r), s = o.map(({ name: e, href: t }) => `${e}:${t ?? ""}`).join("|"), c = [...a.querySelectorAll("[data-fluppy-action]")];
			(a.dataset.fluppyActions !== s || c.length !== o.length) && (c.forEach((e) => e.remove()), a.dataset.fluppyActions = s, a.prepend(...o.map((e) => i(e, r))));
		});
	}, i = ({ name: e, label: t, href: n, onClick: r }, i) => {
		let a = document.createElement(n ? "a" : "button");
		return a.className = "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit", a.dataset.fluppyAction = e, a.title = t, a.setAttribute("aria-label", t), a.innerHTML = Sf[e], n ? (a.href = n, a.download = i.name, a.target = "_blank", a.rel = "noopener noreferrer") : (a.type = "button", a.addEventListener("click", () => r(i.id))), a;
	}, a = !1, o = () => {
		a || (a = !0, setTimeout(() => {
			a = !1, r();
		}));
	}, s = new MutationObserver(o);
	return s.observe(t, {
		childList: !0,
		subtree: !0
	}), e.on("state-update", o), () => s.disconnect();
}
//#endregion
//#region node_modules/@uppy/locales/lib/ar_SA.js
var wf = /* @__PURE__ */ c({ default: () => Tf }), Tf, Ef = o((() => {
	Tf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Tf.strings = {
		addMore: "أضف المزيد",
		addMoreFiles: "اضف المزيد من الملفات",
		addingMoreFiles: " اضافة المزيد من الملفات",
		allowAccessDescription: "ارجو السماح للموقع بالتقاط الصور والفديوهات.",
		allowAccessTitle: "ارجو السماح للكاميرا بالتقاط صورك",
		authenticateWith: "%{pluginName} الربط مع",
		authenticateWithTitle: "من اجل اختيار الملفات %{pluginName} الرجاء الربط مع ",
		back: "رجوع",
		browse: "تصفح",
		browseFiles: "تصفح",
		cancel: "الغاء",
		cancelUpload: "الغاء الدفع",
		closeModal: "اغلاق الشكل",
		companionError: "الربط مع Companion فشل",
		complete: " اكتمل ",
		connectedToInternet: "موصل بالانترنت",
		copyLink: "انسخ الرابط",
		copyLinkToClipboardFallback: "انسخ الرابط في الاسفل",
		copyLinkToClipboardSuccess: "تم نسخ الرابط",
		creatingAssembly: "تجهيز الرفع...",
		creatingAssemblyFailed: "Transloadit: لم يستطع التجميع",
		dashboardTitle: "رافع الملفات",
		dashboardWindowTitle: "نافذة رفع الملفات (ارجع للاغلاق)",
		dataUploadedOfTotal: "%{complete} من اصل %{total}",
		done: "انتهى",
		dropHereOr: "او  اسحب الملفات هنا %{browse}",
		dropHint: "او  اسحب الملفات هنا %{browse}",
		dropPasteBoth: "او  اسحب الملفات هنا %{browse}",
		dropPasteFiles: "او  اسحب الملفات هنا %{browse}",
		dropPasteFolders: "او  اسحب الملفات هنا %{browse}",
		dropPasteImportBoth: "او  اسحب الملفات هنا %{browse}",
		dropPasteImportFiles: "او  اسحب الملفات هنا %{browse}",
		dropPasteImportFolders: "او  اسحب الملفات هنا %{browse}",
		editFile: "تعديل الملف",
		editImage: "تعديل الصورة",
		editing: "جاري تعديل %{file}",
		emptyFolderAdded: "لا يوجد ملفات او مجلدات هنا",
		encoding: "التشفير...",
		enterCorrectUrl: "خطأ في الرابط: ارجو التأكد من ادخال رابط مباشر للملف",
		enterUrlToImport: "ادخل الرابط لاستيراد الملفات",
		exceedsSize: "الملف اكبر من الحجم المسموح %{size}",
		failedToFetch: "Companion فشل في جلب الرابط, ارجو التأكد من الرابط",
		failedToUpload: "فشل الرفع %{file}",
		fileSource: "مصدر الملف: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} من %{smart_count} تم رفع ملف",
			1: "%{complete} من %{smart_count} تم رفع ملفات"
		},
		filter: "تصفيه",
		finishEditingFile: "انهاء تعديل الملف",
		folderAdded: {
			0: "%{folder} ملف من %{smart_count} تم اضافة",
			1: "%{folder} ملفات من %{smart_count} تم اضافة"
		},
		import: "استيراد",
		importFrom: "استيراد من %{name}",
		loading: "جاري التحميل...",
		logOut: "تسجيل الخروج",
		myDevice: "جهازي",
		noFilesFound: "لا يوجد ملفات او مجلدات هنا",
		noInternetConnection: "لا يوجد اتصال بالانترنت",
		pause: "ايقاف",
		pauseUpload: "ايقاف الرفع",
		paused: "موقف",
		poweredBy: "مشغل ب",
		processingXFiles: {
			0: "ملف %{smart_count} جاري معالجة",
			1: "ملفات %{smart_count}  جاري معالجة"
		},
		removeFile: "امسح الملف",
		resetFilter: "اعادة ضبط التصفيه",
		resume: "استئناف",
		resumeUpload: "استئناف الرفع",
		retry: "اعادة المحاولة",
		retryUpload: "اعادة الرفع",
		saveChanges: "حفظ التغييرات",
		selectX: {
			0: "%{smart_count} اختر",
			1: "%{smart_count} اختر"
		},
		smile: "ابتسم!",
		startRecording: "بدء تسجيل الفيديو",
		stopRecording: "ايقاف تسجيل الفيديو",
		takePicture: "التقط صوره",
		timedOut: "رفع تأخر ب %{seconds} ثواني, الغاء الرفع.",
		upload: "رفع",
		uploadComplete: "الرفع اكتمل",
		uploadFailed: "الرفع فشل",
		uploadPaused: "الرفع موقف",
		uploadXFiles: {
			0: "رفع %{smart_count} ملف",
			1: "رفع %{smart_count} ملفات"
		},
		uploadXNewFiles: {
			0: "رفع +%{smart_count} ملف",
			1: "رفع +%{smart_count} ملفات"
		},
		uploading: "يتم الرفع",
		uploadingXFiles: {
			0: "يتم رفع %{smart_count} ملف",
			1: "يتم رفع %{smart_count} ملفات"
		},
		xFilesSelected: {
			0: "%{smart_count} ملف محددة",
			1: "%{smart_count} ملفات محددة"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ملف اضافي جديد",
			1: "%{smart_count} ملفات اضافيه جديده"
		},
		xTimeLeft: "%{time} متبقي",
		youCanOnlyUploadFileTypes: "تستطيع فقط رفع : %{types}",
		youCanOnlyUploadX: {
			0: "تستطيع فقط رفع %{smart_count} الملف",
			1: "تستطيع فقط رفع %{smart_count} ملفات"
		},
		youHaveToAtLeastSelectX: {
			0: "يجب ان تختار على الاقل  %{smart_count} ملف",
			1: "يجب ان تختار على الاقل  %{smart_count} ملفات"
		},
		selectFileNamed: "%{name} اختر الملف",
		unselectFileNamed: "%{name} إلغاء تحديد الملف",
		openFolderNamed: "%{name} افتح المجلد"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ar_SA = Tf);
})), Df = /* @__PURE__ */ c({ default: () => Of }), Of, kf = o((() => {
	Of = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Of.strings = {
		addBulkFilesFailed: {
			0: "Daxili xəta səbəbindən %{smart_count} fayl əlavə edilə bilmədi",
			1: "Daxili xətalar səbəbindən %{smart_count} fayl əlavə edilə bilmədi"
		},
		addedNumFiles: "%{numFiles} fayl əlavə edildi",
		addingMoreFiles: "Daha çox fayl əlavə edilir",
		additionalRestrictionsFailed: "%{count} əlavə məhdudiyyət yerinə yetirilmədi",
		addMore: "Daha çox əlavə et",
		addMoreFiles: "Daha çox fayl əlavə et",
		aggregateExceedsSize: "Siz %{size} həcmində fayl seçdiniz, lakin icazə verilən maksimum həcm: %{sizeAllowed}",
		allFilesFromFolderNamed: "%{name} qovluğundan bütün fayllar",
		allowAccessDescription: "Kameranızla foto çəkmək və ya video yazmaq üçün bu sayta kameraya giriş icazəsi verin.",
		allowAccessTitle: "Zəhmət olmasa kameranıza giriş icazəsi verin",
		allowAudioAccessDescription: "Səs yazmaq üçün bu sayta mikrofona giriş icazəsi verin.",
		allowAudioAccessTitle: "Zəhmət olmasa mikrofonunuza giriş icazəsi verin",
		aspectRatioLandscape: "Albom formatında kəs (16:9)",
		aspectRatioPortrait: "Portret formatında kəs (9:16)",
		aspectRatioSquare: "Kvadrat formatında kəs",
		authAborted: "Doğrulama ləğv edildi",
		authenticate: "Qoşul",
		authenticateWith: "%{pluginName}-a qoşul",
		authenticateWithTitle: "Faylları seçmək üçün %{pluginName} ilə doğrulama edin",
		back: "Geri",
		browse: "seçin",
		browseFiles: "faylları seçin",
		browseFolders: "qovluqları seçin",
		cancel: "Ləğv et",
		cancelUpload: "Yükləməni ləğv et",
		closeModal: "Pəncərəni bağla",
		companionError: "Companion ilə əlaqə uğursuz oldu",
		companionUnauthorizeHint: "%{provider} hesabınızın icazəsini ləğv etmək üçün %{url} ünvanına keçin",
		complete: "Tamamlandı",
		compressedX: "Şəkilləri sıxaraq %{size} qənaət edildi",
		compressingImages: "Şəkillər sıxılır...",
		connectedToInternet: "İnternetə qoşulub",
		copyLink: "Keçidi kopyala",
		copyLinkToClipboardFallback: "Aşağıdakı keçidi kopyalayın",
		copyLinkToClipboardSuccess: "Keçid mübadilə buferinə kopyalandı.",
		creatingAssembly: "Yükləmə hazırlanır...",
		creatingAssemblyFailed: "Transloadit: Assembly yaradıla bilmədi",
		dashboardTitle: "Uppy İdarə Paneli",
		dashboardWindowTitle: "Uppy İdarə Paneli Pəncərəsi (Bağlamaq üçün Escape düyməsini basın)",
		dataUploadedOfTotal: "%{complete} / %{total}",
		dataUploadedOfUnknown: "%{complete} / naməlum",
		discardMediaFile: "Mediadan imtina et",
		discardRecordedFile: "Yazılmış fayldan imtina et",
		done: "Hazırdır",
		dropHereOr: "Buraya buraxın və ya %{browse}",
		dropHint: "Fayllarınızı buraya buraxın",
		dropPasteBoth: "Faylları buraya buraxın, %{browseFiles} və ya %{browseFolders}",
		dropPasteFiles: "Faylları buraya buraxın və ya %{browseFiles}",
		dropPasteFolders: "Faylları buraya buraxın və ya %{browseFolders}",
		dropPasteImportBoth: "Faylları buraya buraxın, %{browseFiles}, %{browseFolders} və ya buradan idxal edin:",
		dropPasteImportFiles: "Faylları buraya buraxın, %{browseFiles} və ya buradan idxal edin:",
		dropPasteImportFolders: "Faylları buraya buraxın, %{browseFolders} və ya buradan idxal edin:",
		editFile: "Faylı redaktə et",
		editFileWithFilename: "%{file} faylını redaktə et",
		editImage: "Şəkli redaktə et",
		editing: "%{file} redaktə edilir",
		emptyFolderAdded: "Boş qovluqdan heç bir fayl əlavə edilmədi",
		encoding: "Kodlaşdırılır...",
		enterCorrectUrl: "Yanlış URL: Zəhmət olmasa, birbaşa fayl keçidi daxil etdiyinizə əmin olun",
		enterTextToSearch: "Şəkil axtarmaq üçün mətn daxil edin",
		enterUrlToImport: "Fayl idxal etmək üçün URL daxil edin",
		error: "Xəta",
		exceedsSize: "%{file} icazə verilən maksimum %{size} həcmini aşır",
		failedToAddFiles: "Fayllar əlavə edilmədi",
		failedToFetch: "Companion bu URL-i əldə edə bilmədi, zəhmət olmasa düzgün olduğuna əmin olun",
		failedToUpload: "%{file} yüklənmədi",
		filesUploadedOfTotal: {
			0: "%{complete} / %{smart_count} fayl yükləndi",
			1: "%{complete} / %{smart_count} fayl yükləndi"
		},
		filter: "Süzgəc",
		finishEditingFile: "Faylın redaktəsini bitir",
		flipHorizontal: "Üfüqi çevir",
		folderAdded: {
			0: "%{folder} qovluğundan %{smart_count} fayl əlavə edildi",
			1: "%{folder} qovluğundan %{smart_count} fayl əlavə edildi"
		},
		folderAlreadyAdded: "Qovluq \"%{folder}\" artıq əlavə edilib",
		generateImage: "Şəkil yarat",
		generateImagePlaceholder: "Dağ gölü üzərində sakit gün batımı, suda əks olunan şam ağacları",
		generating1: "AI düşünür...",
		generating2: "Piksellər emal edilir...",
		generating3: "Şəkillər yaradılır...",
		generating4: "AI işləyir...",
		generating5: "Sehr yaradılır...",
		generatingThumbnails: "Miniatürlər yaradılır...",
		import: "İdxal et",
		importFiles: "Faylları buradan idxal edin:",
		importFrom: "%{name}-dan idxal et",
		inferiorSize: "Bu fayl icazə verilən %{size} həcmindən kiçikdir",
		loadedXFiles: "%{numFiles} fayl yükləndi",
		loading: "Yüklənir...",
		logIn: "Daxil ol",
		logOut: "Çıxış et",
		micDisabled: "İstifadəçi mikrofona girişi rədd etdi",
		missingRequiredMetaField: "Tələb olunan meta sahələr çatışmır",
		missingRequiredMetaFieldOnFile: "%{fileName} faylında tələb olunan meta sahələr çatışmır",
		missingRequiredMetaFields: {
			0: "Tələb olunan meta sahə çatışmır: %{fields}.",
			1: "Tələb olunan meta sahələr çatışmır: %{fields}."
		},
		myDevice: "Mənim Cihazım",
		noAudioDescription: "Səs yazmaq üçün mikrofon və ya başqa audio giriş cihazı qoşun",
		noAudioTitle: "Mikrofon Əlçatan Deyil",
		noCameraDescription: "Foto çəkmək və ya video yazmaq üçün kamera qoşun",
		noCameraTitle: "Kamera Əlçatan Deyil",
		noDuplicates: "Təkrar fayl '%{fileName}' əlavə edilə bilməz, artıq mövcuddur",
		noFilesFound: "Burada heç bir fayl və ya qovluğunuz yoxdur",
		noInternetConnection: "İnternet bağlantısı yoxdur",
		noMoreFilesAllowed: "Daha çox fayl əlavə edilə bilməz",
		noSearchResults: "Təəssüf ki, bu axtarış üçün nəticə yoxdur",
		openFolderNamed: "%{name} qovluğunu aç",
		pause: "Fasilə ver",
		paused: "Fasilədədir",
		pauseUpload: "Yükləməyə fasilə ver",
		pickFiles: "Faylları seç",
		pickPhotos: "Fotoları seç",
		pleaseWait: "Zəhmət olmasa gözləyin",
		pluginNameAudio: "Səs",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Ekran yazısı",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Keçid",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "Fayl üçün WebDAV URL-i (məsələn, ownCloud və ya Nextcloud-dan)",
		poweredBy: "%{uppy} tərəfindən dəstəklənir",
		processingXFiles: {
			0: "%{smart_count} fayl emal edilir",
			1: "%{smart_count} fayl emal edilir"
		},
		recording: "Yazılır",
		recordingLength: "Yazının uzunluğu %{recording_length}",
		recordingStoppedMaxSize: "Fayl həcmi limiti aşacağı üçün yazı dayandırıldı",
		recordVideoBtn: "Video Yaz",
		recoveredAllFiles: "Bütün faylları bərpa etdik. İndi yükləməni davam etdirə bilərsiniz.",
		recoveredXFiles: {
			0: "%{smart_count} faylı tam bərpa edə bilmədik. Zəhmət olmasa onu yenidən seçib yükləməni davam etdirin.",
			1: "%{smart_count} faylı tam bərpa edə bilmədik. Zəhmət olmasa onları yenidən seçib yükləməni davam etdirin."
		},
		removeFile: "Faylı çıxar",
		reSelect: "Yenidən seç",
		resetFilter: "Süzgəci sıfırla",
		resetSearch: "Axtarışı sıfırla",
		resume: "Davam et",
		resumeUpload: "Yükləməni davam etdir",
		retry: "Yenidən cəhd et",
		retryUpload: "Yükləməni yenidən cəhd et",
		revert: "Sıfırla",
		rotate: "90° Döndər",
		save: "Yadda saxla",
		saveChanges: "Dəyişiklikləri yadda saxla",
		search: "Axtarış",
		searchImages: "Şəkillər axtar",
		selectX: {
			0: "%{smart_count} seç",
			1: "%{smart_count} seç"
		},
		sessionRestored: "Sessiya bərpa edildi",
		showErrorDetails: "Xəta təfərrüatlarını göstər",
		signInWithGoogle: "Google ilə daxil ol",
		smile: "Gülümsəyin!",
		startAudioRecording: "Səs yazısına başla",
		startCapturing: "Ekran yazısına başla",
		startRecording: "Video yazısına başla",
		stopAudioRecording: "Səs yazısını dayandır",
		stopCapturing: "Ekran yazısını dayandır",
		stopRecording: "Video yazısını dayandır",
		streamActive: "Yayım aktivdir",
		streamPassive: "Yayım passivdir",
		submitRecordedFile: "Yazılmış faylı göndər",
		takePicture: "Şəkil çək",
		takePictureBtn: "Şəkil Çək",
		takeScreenshot: "Ekran Görüntüsü Al",
		unnamed: "Adsız",
		upload: "Yüklə",
		uploadComplete: "Yükləmə tamamlandı",
		uploadFailed: "Yükləmə uğursuz oldu",
		uploading: "Yüklənir",
		uploadingXFiles: {
			0: "%{smart_count} fayl yüklənir",
			1: "%{smart_count} fayl yüklənir"
		},
		uploadPaused: "Yükləmə fasilədədir",
		uploadStalled: "Yükləmə %{seconds} saniyədir irəliləmir. Yenidən cəhd etmək istəyə bilərsiniz.",
		uploadXFiles: {
			0: "%{smart_count} faylı yüklə",
			1: "%{smart_count} faylı yüklə"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} faylı yüklə",
			1: "+%{smart_count} faylı yüklə"
		},
		xFilesSelected: {
			0: "%{smart_count} fayl seçildi",
			1: "%{smart_count} fayl seçildi"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fayl daha əlavə edildi",
			1: "%{smart_count} fayl daha əlavə edildi"
		},
		xTimeLeft: "%{time} qalıb",
		youCanOnlyUploadFileTypes: "Yalnız bunları yükləyə bilərsiniz: %{types}",
		youCanOnlyUploadX: {
			0: "Yalnız %{smart_count} fayl yükləyə bilərsiniz",
			1: "Yalnız %{smart_count} fayl yükləyə bilərsiniz"
		},
		youHaveToAtLeastSelectX: {
			0: "Ən azı %{smart_count} fayl seçməlisiniz",
			1: "Ən azı %{smart_count} fayl seçməlisiniz"
		},
		zoomIn: "Yaxınlaşdır",
		zoomOut: "Uzaqlaşdır"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.az_AZ = Of);
})), Af = /* @__PURE__ */ c({ default: () => jf }), jf, Mf = o((() => {
	jf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, jf.strings = {
		addBulkFilesFailed: {
			0: "Файлът %{smart_count} не може да бъде добавен поради вътрешна грешка",
			1: "Не могат да се добавят %{smart_count} файла поради вътрешни грешки"
		},
		addMore: "Добави повече",
		addMoreFiles: "Добави повече файлове",
		addingMoreFiles: "Добавяне на повече файлове",
		allowAccessDescription: "За да правите изображения или запишете видео с камерата моля, разшерете достъп до камерата за този сайт",
		allowAccessTitle: "Моля, разрешете достъп до камерата",
		authenticateWith: "Свържете се с %{pluginName}",
		authenticateWithTitle: "Моля, впишете се с %{pluginName}, за да изберете файлове",
		back: "Назад",
		browse: "преглед",
		browseFiles: "преглед",
		cancel: "Отказ",
		cancelUpload: "Отказване на качването",
		closeModal: "Затваряне на прозорец",
		companionError: "Неуспешна връзка с Companion",
		companionUnauthorizeHint: "За да се отпишете от акаута си в %{provider} посетете %{url}",
		complete: "Завършен",
		connectedToInternet: "Свързан с интернет",
		copyLink: "Копиране на линк",
		copyLinkToClipboardFallback: "Копиране на долния линк",
		copyLinkToClipboardSuccess: "Линкът е копиран",
		creatingAssembly: "Подготовка за качване...",
		creatingAssemblyFailed: "Transloadit: библиотеката не може да се създаде",
		dashboardTitle: "Качване на файлове",
		dashboardWindowTitle: "Прозорец за качване на файлове (Натиснете ESC за затваряне)",
		dataUploadedOfTotal: "%{complete} от %{total}",
		done: "Готово",
		dropHint: "Пуснете файловете си тук",
		dropPasteBoth: "Пуснете файловете си тук, поставете или %{browse}",
		dropPasteFiles: "Пуснете файловете си тук, поставете или %{browse}",
		dropPasteFolders: "Пуснете файловете си тук, поставете или %{browse}",
		dropPasteImportBoth: "Пуснете файловете си тук, поставете, %{browse} или импортирайте от:",
		dropPasteImportFiles: "Пуснете файловете си тук, поставете, %{browse} или импортирайте от:",
		dropPasteImportFolders: "Пуснете файловете си тук, поставете, %{browse} или импортирайте от:",
		editFile: "Редакция файл",
		editImage: "Редактиране на изображение",
		editing: "Редактиране %{file}",
		emptyFolderAdded: "Не са добавени файлове от празна директория",
		encoding: "Кодиране...",
		enterCorrectUrl: "Неправилен адрес: Моля, уверете се, че въвеждате директна връзка към файл",
		enterUrlToImport: "Въведете адрес за да импортиране файл",
		exceedsSize: "Размерът на файла надвишава максимално разрешения размер от %{size}",
		failedToFetch: "Companion не успя да достъпи този адрес, уверете се че е правилен",
		failedToUpload: "Грешка при качване на %{file}",
		fileSource: "Име на сорс файл: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} от %{smart_count} файл качен",
			1: "%{complete} от %{smart_count} файлове качени"
		},
		filter: "Филтър",
		finishEditingFile: "Край на редакцията на файла",
		folderAdded: {
			0: "Добавен %{smart_count} файл от %{folder}",
			1: "Добавени %{smart_count} файлове от %{folder}"
		},
		generatingThumbnails: "Генериране на миниатюри...",
		import: "Импортиране",
		importFrom: "Импортиране от %{name}",
		loading: "Зареждане...",
		logOut: "Изход",
		micDisabled: "Достъп до микрофонът е отказан от потребителя",
		myDevice: "Моето устройство",
		noDuplicates: "Файлът '%{fileName}' съществува. Не може да добавите дублиращи файлове",
		noFilesFound: "Тук нямате файлове или директории",
		noInternetConnection: "Няма връзка с интернет",
		noMoreFilesAllowed: "Не може да се добавят нови файлове: в процес на качване",
		openFolderNamed: "Отваряне на директория %{name}",
		pause: "Пауза",
		pauseUpload: "Паузиране на качването",
		paused: "Паузиран",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "Обработване %{smart_count} файл",
			1: "Обработване %{smart_count} файлове"
		},
		recording: "Записване",
		recordingLength: "Дължина на записа %{recording_length}",
		recordingStoppedMaxSize: "Записът е прекъснат, защото размерът на файла наближава максимално допустимия размер",
		removeFile: "Премахване на файл",
		resetFilter: "Изчистване на филтър",
		resume: "Възстановяване",
		resumeUpload: "Възстановяване на качването",
		retry: "Нов опит",
		retryUpload: "Нов опит за качване",
		saveChanges: "Запис на промените",
		selectFileNamed: "Изберете файл %{name}",
		selectX: {
			0: "Избран %{smart_count}",
			1: "Избрани %{smart_count}"
		},
		smile: "Усмивка! ;)",
		startCapturing: "Започване запис на екрана",
		startRecording: "Започване запис на видео",
		stopCapturing: "Спиране на запис на екрана",
		stopRecording: "Спиране на видео запис",
		streamActive: "Активен стрийм",
		streamPassive: "Пасивен стрийм",
		submitRecordedFile: "Подаване на записаното видео",
		takePicture: "Направа на снимка",
		timedOut: "Качването е в застой за %{seconds} секунди, прекъсване.",
		unselectFileNamed: "Размаркиране файл %{name}",
		upload: "Качване",
		uploadComplete: "Качването е успешно",
		uploadFailed: "Качването неуспешно",
		uploadPaused: "Качването е паузирано",
		uploadXFiles: {
			0: "Качване %{smart_count} файл",
			1: "качване %{smart_count} файлове"
		},
		uploadXNewFiles: {
			0: "Качване +%{smart_count} файл",
			1: "Качване +%{smart_count} файлове"
		},
		uploading: "Качване",
		uploadingXFiles: {
			0: "Качване %{smart_count} файл",
			1: "Качване %{smart_count} файлове"
		},
		xFilesSelected: {
			0: "%{smart_count} файл е избран",
			1: "%{smart_count} файлове са избрани"
		},
		xMoreFilesAdded: {
			0: "Още %{smart_count} файл е добавен",
			1: "Оше %{smart_count} файла са добавени"
		},
		xTimeLeft: "Остават %{time}",
		youCanOnlyUploadFileTypes: "Можете да качване само файлове: %{types}",
		youCanOnlyUploadX: {
			0: "Може да качвате само %{smart_count} файл",
			1: "Може да качвате само %{smart_count} файлове"
		},
		youHaveToAtLeastSelectX: {
			0: "Трябва да изберете поне %{smart_count} файл",
			1: "Трябва да изберете поне %{smart_count} файла"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.bg_BG = jf);
})), Nf = /* @__PURE__ */ c({ default: () => Pf }), Pf, Ff = o((() => {
	Pf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Pf.strings = {
		addBulkFilesFailed: {
			0: "No s'ha pogut afegir %{smart_count} arxiu a causa d'un error intern",
			1: "No s'han pogut afegir %{smart_count} arxius a causa d'errors interns"
		},
		addedNumFiles: "S'ha afegit %{numFiles} arxiu(s)",
		addingMoreFiles: "Afegint més arxius",
		additionalRestrictionsFailed: "No s'han complert %{count} restriccions addicionals",
		addMore: "Afegir més",
		addMoreFiles: "Afegir més arxius",
		allFilesFromFolderNamed: "Tots els arxius de la carpeta %{name}",
		allowAccessDescription: "Per prendre fotos o gravar vídeos amb la teva càmera, si us plau permet l'accés a la càmera per a aquest lloc.",
		allowAccessTitle: "Si us plau, permet l'accés a la teva càmera",
		allowAudioAccessDescription: "Per gravar àudio, si us plau permet l'accés al micròfon per a aquest lloc.",
		allowAudioAccessTitle: "Si us plau, permet l'accés al teu micròfon",
		aspectRatioLandscape: "Retallar horitzontal (16:9)",
		aspectRatioPortrait: "Retallar vertical (9:16)",
		aspectRatioSquare: "Retallar quadrat",
		authAborted: "Autenticació cancel·lada",
		authenticateWith: "Connecta amb %{pluginName}",
		authenticateWithTitle: "Si us plau, autentica't amb %{pluginName} per a seleccionar arxius",
		back: "Enrere",
		browse: "Navegar",
		browseFiles: "Navegar pels arxius",
		browseFolders: "Navegar per carpetes",
		cancel: "Cancel·lar",
		cancelUpload: "Cancel·lar pujada",
		closeModal: "Tanca finestra",
		companionError: "Error en la connexió amb Companion",
		companionUnauthorizeHint: "Per desautoritzar el teu compte de %{provider}, si us plau ves a %{url}",
		complete: "Completat",
		compressedX: "S'ha estalviat %{size} comprimint imatges",
		compressingImages: "Comprimint imatges...",
		connectedToInternet: "Connectat a Internet",
		copyLink: "Copia l'enllaç",
		copyLinkToClipboardFallback: "Copia la següent URL",
		copyLinkToClipboardSuccess: "Enllaç copiat al portapapers",
		creatingAssembly: "Preparant càrrega...",
		creatingAssemblyFailed: "No s'ha pogut crear un Assembly",
		dashboardTitle: "Carregador d'arxius",
		dashboardWindowTitle: "Finestra per a carregar arxius (Prem l'escape per tancar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		discardRecordedFile: "Descarta l'arxiu gravat",
		done: "Fet",
		dropHint: "Deixa els teus arxius aquí",
		dropPasteBoth: "Deixa arxius aquí, %{browseFiles} o %{browseFolders}",
		dropPasteFiles: "Deixa arxius aquí o %{browseFiles}",
		dropPasteFolders: "Deixa arxius aquí o %{browseFolders}",
		dropPasteImportBoth: "Deixa arxius aquí, %{browseFiles}, %{browseFolders} o importa des de:",
		dropPasteImportFiles: "Deixa arxius aquí, %{browseFiles} o importa des de:",
		dropPasteImportFolders: "Deixa arxius aquí, %{browseFolders} o importa des de:",
		editFile: "Edita l'arxiu",
		editImage: "Edita la imatge",
		editFileWithFilename: "Edita l'arxiu %{file}",
		editing: "Editant %{file}",
		emptyFolderAdded: "No s'han afegit arxius des de la carpeta buida",
		encoding: "Codificant...",
		enterCorrectUrl: "URL incorrecta: Si us plau, assegura't d'ingressar un enllaç directe a un arxiu",
		enterTextToSearch: "Ingresa text per buscar imatges",
		enterUrlToImport: "Ingresa la URL per importar un arxiu",
		error: "Error",
		exceedsSize: "%{file} excedeix la mida màxima permesa de %{size}",
		failedToFetch: "Companion no ha pogut recuperar aquesta URL, si us plau assegura't que sigui correcta",
		failedToUpload: "No s'ha pogut carregar %{file}",
		fileSource: "Font d'arxiu: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} arxiu pujat",
			1: "%{complete} de %{smart_count} arxius pujats"
		},
		filter: "Filtrar",
		finishEditingFile: "Finalitzar edició d'arxiu",
		flipHorizontal: "Girar horitzontalment",
		folderAdded: {
			0: "S'ha afegit %{smart_count} arxiu des de %{folder}",
			1: "S'han afegit %{smart_count} arxius des de %{folder}"
		},
		folderAlreadyAdded: "La carpeta \"%{folder}\" ja s'ha afegit",
		generatingThumbnails: "Generant miniatures...",
		import: "Importar",
		importFiles: "Importar arxius des de:",
		importFrom: "Importar des de %{name}",
		inferiorSize: "Aquest arxiu és més petit que la mida permesa de %{size}",
		loading: "Carregant...",
		logOut: "Tancar sessió",
		micDisabled: "L'accés al micròfon va ser denegat per l'usuari",
		missingRequiredMetaField: "Falten camps de metadades obligatoris",
		missingRequiredMetaFieldOnFile: "Falten camps de metadades obligatoris a %{fileName}",
		missingRequiredMetaFields: {
			0: "Falta el camp de metadades obligatori: %{fields}.",
			1: "Falten els camps de metadades obligatoris: %{fields}."
		},
		myDevice: "El meu dispositiu",
		noAudioDescription: "Per gravar àudio, si us plau connecta un micròfon o un altre dispositiu d'entrada d'àudio",
		noAudioTitle: "Micròfon no disponible",
		noCameraDescription: "Per prendre fotos o gravar vídeo, si us plau connecta un dispositiu de càmera",
		noCameraTitle: "Càmera no disponible",
		noDuplicates: "No es pot afegir l'arxiu duplicat '%{fileName}', ja existeix",
		noFilesFound: "No tens arxius o carpetes aquí",
		noInternetConnection: "Sense connexió a Internet",
		noMoreFilesAllowed: "No es poden afegir més arxius",
		noSearchResults: "Lamentablement, no hi ha resultats per a aquesta cerca",
		openFolderNamed: "Obrir carpeta %{name}",
		pause: "Pausar",
		paused: "En pausa",
		pauseUpload: "Pausar pujada",
		pluginNameAudio: "Àudio",
		pluginNameBox: "Box",
		pluginNameCamera: "Càmera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "Desenvolupat per %{uppy}",
		processingXFiles: {
			0: "Processant %{smart_count} arxiu",
			1: "Processant %{smart_count} arxius"
		},
		recording: "Enregistrament",
		recordingLength: "Durada de l'enregistrament %{recording_length}",
		recordingStoppedMaxSize: "L'enregistrament s'ha aturat perquè la mida de l'arxiu està a punt de superar el límit",
		recordVideoBtn: "Enregistrar vídeo",
		recoveredAllFiles: "S'han restaurat tots els arxius. Ara pots reprendre la pujada.",
		recoveredXFiles: {
			0: "No vam poder recuperar completament 1 arxiu. Si us plau, torna a seleccionar-lo i reprengues la pujada.",
			1: "No vam poder recuperar completament %{smart_count} arxius. Si us plau, torna a seleccionar-los i reprengues la pujada."
		},
		removeFile: "Eliminar arxiu",
		reSelect: "Tornar a seleccionar",
		resetFilter: "Restablir filtre",
		resetSearch: "Restablir cerca",
		resume: "Reprendre",
		resumeUpload: "Reprendre pujada",
		retry: "Tornar a intentar",
		retryUpload: "Tornar a intentar pujada",
		revert: "Revertir",
		rotate: "Rotar",
		save: "Desar",
		saveChanges: "Desar canvis",
		search: "Cercar",
		searchImages: "Cercar imatges",
		selectX: {
			0: "Seleccionar %{smart_count}",
			1: "Seleccionar %{smart_count}"
		},
		sessionRestored: "Sessió restaurada",
		showErrorDetails: "Mostrar detalls de l'error",
		signInWithGoogle: "Iniciar sessió amb Google",
		smile: "¡Somriu!",
		startAudioRecording: "Iniciar enregistrament d'àudio",
		startCapturing: "Iniciar captura de pantalla",
		startRecording: "Iniciar enregistrament de vídeo",
		stopAudioRecording: "Aturar enregistrament d'àudio",
		stopCapturing: "Aturar captura de pantalla",
		stopRecording: "Aturar enregistrament de vídeo",
		streamActive: "Transmissió activa",
		streamPassive: "Transmissió passiva",
		submitRecordedFile: "Enviar arxiu enregistrat",
		takePicture: "Fer una foto",
		takePictureBtn: "Capturar foto",
		timedOut: "La pujada s'ha aturat durant %{seconds} segons, avortant.",
		upload: "Pujar",
		uploadComplete: "Pujada completa",
		uploadFailed: "Error en la pujada",
		uploading: "Pujant",
		uploadingXFiles: {
			0: "Pujant %{smart_count} arxiu",
			1: "Pujant %{smart_count} arxius"
		},
		uploadPaused: "Pujada en pausa",
		uploadStalled: "La pujada no ha realitzat cap progrés durant %{seconds} segons. Pots intentar-ho de nou.",
		uploadXFiles: {
			0: "Pujar %{smart_count} arxiu",
			1: "Pujar %{smart_count} arxius"
		},
		uploadXNewFiles: {
			0: "Pujar +%{smart_count} arxiu",
			1: "Pujar +%{smart_count} arxius"
		},
		xFilesSelected: {
			0: "%{smart_count} arxiu seleccionat",
			1: "%{smart_count} arxius seleccionats"
		},
		xMoreFilesAdded: {
			0: "S'ha afegit %{smart_count} arxiu més",
			1: "S'han afegit %{smart_count} arxius més"
		},
		xTimeLeft: "%{time} restant",
		youCanOnlyUploadFileTypes: "Només pots pujar: %{types}",
		youCanOnlyUploadX: {
			0: "Només pots pujar %{smart_count} arxiu",
			1: "Només pots pujar %{smart_count} arxius"
		},
		youHaveToAtLeastSelectX: {
			0: "Has de seleccionar com a mínim %{smart_count} arxiu",
			1: "Has de seleccionar com a mínim %{smart_count} arxius"
		},
		zoomIn: "Apropar",
		zoomOut: "Allunyar",
		selectFileNamed: "Selecciona arxiu %{name}",
		unselectFileNamed: "Desselecciona arxiu %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ca_ES = Pf);
})), If = /* @__PURE__ */ c({ default: () => Lf }), Lf, Rf = o((() => {
	Lf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : e > 1 && e < 5 ? 1 : 2;
		}
	}, Lf.strings = {
		addBulkFilesFailed: {
			0: "Nepodařilo se přidat %{smart_count} soubor kvůli vnitřní chybě",
			1: "Nepodařilo se přidat %{smart_count} soubory kvůli vnitřní chybě",
			2: "Nepodařilo se přidat %{smart_count} souborů kvůli vnitřní chybě"
		},
		addedNumFiles: {
			0: "Přidán %{numFiles} soubor",
			1: "Přidány %{numFiles} soubory",
			2: "Přidáno %{numFiles} souborů"
		},
		addingMoreFiles: "Přidávání dalších souborů",
		additionalRestrictionsFailed: {
			0: "%{count} další omezení nebylo splněno",
			1: "%{count} další omezení nebyla splněna",
			2: "%{count} další omezení nebyly splněny"
		},
		addMore: "Přidat další",
		addMoreFiles: "Přidat další soubory",
		aggregateExceedsSize: "Vybrali jste %{size} souborů, ale maximální povolená velikost je %{sizeAllowed}",
		allFilesFromFolderNamed: "Všechny soubory ze složky %{name}",
		allowAccessDescription: "Pokud chcete pořizovat fotografie vaším zařízením, povolte prosím přístup ke kameře.",
		allowAccessTitle: "Povolte prosím přístup ke kameře.",
		allowAudioAccessDescription: "Chcete-li nahrávat zvuk, povolte pro tento web přístup k mikrofonu.",
		allowAudioAccessTitle: "Povolte přístup ke svému mikrofonu",
		aspectRatioLandscape: "Oříznout krajinně (16:9)",
		aspectRatioPortrait: "Oříznout portrétově (9:16)",
		aspectRatioSquare: "Oříznout čtvercově",
		authAborted: "Autentizace byla přerušena",
		authenticate: "Připojit",
		authenticateWith: "Připojit k %{pluginName}",
		authenticateWithTitle: "Prosím přihlaste se k %{pluginName} pro výběr souborů",
		back: "Zpět",
		browse: "procházet",
		browseFiles: "procházet soubory",
		browseFolders: "procházet složky",
		cancel: "Zrušit",
		cancelUpload: "Zrušit nahrávání",
		closeModal: "Zavřít dialog",
		companionError: "Spojení s modulem Companion se nezdařilo",
		companionUnauthorizeHint: "Chcete-li zrušit autorizaci k vašemu %{provider} účtu, přejděte prosím na %{url}",
		complete: "Hotovo",
		compressedX: {
			0: "Uložen %{size} komprimovaný obrázek",
			1: "Uloženy %{size} komprimované obrázky",
			2: "Uloženo %{size} komprimovaných obrázků"
		},
		compressingImages: "Komprese obrázků...",
		connectedToInternet: "Připojeno k internetu",
		copyLink: "Zkopírovat odkaz",
		copyLinkToClipboardFallback: "Zkopírujte odkaz níže",
		copyLinkToClipboardSuccess: "Odkaz zkopírován do schránky",
		creatingAssembly: "Nahrávání se připravuje...",
		creatingAssemblyFailed: "Transloadit: Nelze vytvořit Assembly",
		dashboardTitle: "Nahrát soubory",
		dashboardWindowTitle: "Okno pro nahrání souborů. (Stiskněte ESC pro zavření.)",
		dataUploadedOfTotal: "%{complete} z %{total}",
		dataUploadedOfUnknown: {
			0: "%{complete} neznámý",
			1: "%{complete} neznámý",
			2: "%{complete} neznámých"
		},
		discardMediaFile: "Zahodit mediální soubor",
		discardRecordedFile: "Zahodit nahraný soubor",
		done: "Dokončeno",
		dropHint: "Přetáhněte soubory sem",
		dropPasteBoth: "Přetáhněte soubory sem, %{browseFiles}, nebo %{browseFolders}",
		dropPasteFiles: "Přetáhněte soubory sem, nebo %{browseFiles}",
		dropPasteFolders: "Přetáhněte soubory sem, nebo %{browseFolders}",
		dropPasteImportBoth: "Přetáhněte soubory sem, %{browseFiles}, %{browseFolders}, nebo je importujte z:",
		dropPasteImportFiles: "Přetáhněte soubory sem, %{browseFiles}, nebo je importujte z:",
		dropPasteImportFolders: "Přetáhněte soubory sem, %{browseFolders}, nebo je importujte z:",
		editFile: "Upravit soubor",
		editFileWithFilename: "Upravit soubor %{file}",
		editImage: "Upravit obrázek",
		editing: "Upravujete %{file}",
		emptyFolderAdded: "Nebyly přidány žádné soubory, adresář je prázdný",
		encoding: "Převádění...",
		enterCorrectUrl: "Chybná URL: Ujistěte se, že vkládáte přímý odkaz na soubor",
		enterTextToSearch: "Vložte text pro vyhledání obrázků",
		enterUrlToImport: "Vložte URL pro import souboru",
		error: "Chyba",
		exceedsSize: "Tento soubor překračuje maximální povolenou velikost: %{size}",
		failedToFetch: "Modulu Companion se nepodařilo stáhnout soubor z této URL, zkontrolujte prosím, jestli je URL správná",
		failedToUpload: "Nepodařilo se nahrát soubor %{file}",
		fileSource: "Zdroj souboru: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} z %{smart_count} souboru nahráno",
			1: "%{complete} z %{smart_count} souborů nahráno",
			2: "%{complete} z %{smart_count} souborů nahráno"
		},
		filter: "Filtrovat",
		finishEditingFile: "Dokončit editaci souboru",
		flipHorizontal: "Překlopit vodorovně",
		folderAdded: {
			0: "Přidán %{smart_count} soubor z adresáře %{folder}",
			1: "Přidány %{smart_count} soubory z adresáře %{folder}",
			2: "Přidáno %{smart_count} souborů z adresáře %{folder}"
		},
		folderAlreadyAdded: "Složka \"%{folder}\" již byla přidána",
		generatingThumbnails: "Vytváří se miniatury...",
		import: "Importovat",
		importFiles: "Importovat soubory z:",
		importFrom: "Importovat z %{name}",
		inferiorSize: "Tento soubor je menší než povolená velikost %{size}",
		loadedXFiles: {
			0: "Načten %{numFiles} soubor",
			1: "Načteny %{smart_count} soubory",
			2: "Načteno %{smart_count} souborů"
		},
		loading: "Nahrávání...",
		logIn: "Přihlásit se",
		logOut: "Odhlásit",
		micDisabled: "Přístup k mikrofonu odepřen uživatelem",
		missingRequiredMetaField: "Chybí povinná meta pole",
		missingRequiredMetaFieldOnFile: "Chybí povinná meta pole v %{fileName}",
		missingRequiredMetaFields: {
			0: "Chybí povinné pole metadat: %{fields}.",
			1: "Chybí povinná pole metadat: %{fields}.",
			2: "Chybí povinná pole metadat: %{fields}."
		},
		myDevice: "Moje zařízení",
		noAudioDescription: "Chcete-li nahrávat zvuk, připojte mikrofon nebo jiné vstupní zvukové zařízení",
		noAudioTitle: "Mikrofon není k dispozici",
		noCameraDescription: "Chcete-li pořizovat snímky nebo nahrávat video, připojte kameru",
		noCameraTitle: "Kamera není k dispozici",
		noDuplicates: "Nelze znovu přidat stejný soubor '%{fileName}'",
		noFilesFound: "Nenalezeny žádné soubory ani adresáře",
		noInternetConnection: "Nepřipojeno k internetu",
		noMoreFilesAllowed: "Nelze přidat další soubory",
		noSearchResults: "Bohužel pro toto hledání nejsou žádné výsledky",
		openFolderNamed: "Otevřít adresář %{name}",
		pause: "Pozastavit",
		paused: "Pozastaveno",
		pauseUpload: "Pozastavit nahrávání",
		pickFiles: "Vyberte soubory",
		pickPhotos: "Vyberte fotografie",
		pleaseWait: "Prosím čekejte",
		pluginNameAudio: "Zvuk",
		pluginNameCamera: "Kamera",
		pluginNameScreenCapture: "Záznam obrazovky",
		pluginNameUrl: "Odkaz",
		pluginWebdavInputLabel: "WebDAV URL souboru (např. z ownCloudu nebo Nextcloudu)",
		poweredBy: "Vytvořeno pomocí %{uppy}",
		processingXFiles: {
			0: "Zpracování %{smart_count} souboru",
			1: "Zpracování %{smart_count} souborů",
			2: "Zpracování %{smart_count} souborů"
		},
		recording: "Záznam",
		recordingLength: "Délka nahrávky %{recording_length}",
		recordingStoppedMaxSize: "Nahrávání bylo zastaveno, protože velikost souboru brzy překročí limit",
		recordVideoBtn: "Záznam videa",
		recoveredAllFiles: "Obnovili jsme všechny soubory. Nyní můžete pokračovat v nahrávání.",
		recoveredXFiles: {
			0: "Nepodařilo se nám plně obnovit 1 soubor. Vyberte jej znovu a obnovte nahrávání.",
			1: "Nepodařilo se nám plně obnovit %{smart_count} soubory. Vyberte je znovu a obnovte nahrávání.",
			2: "Nepodařilo se nám plně obnovit %{smart_count} souborů. Vyberte je znovu a obnovte nahrávání."
		},
		removeFile: "Odebrat soubor",
		reSelect: "Re-výběr",
		resetFilter: "Reset filtru",
		resetSearch: "Resetovat vyhledávání",
		resume: "Pokřačovat",
		resumeUpload: "Pokračovat v nahrávání",
		retry: "Opakovat",
		retryUpload: "Opakovat nahrávání",
		revert: "Resetovat",
		rotate: "Otočit o 90°",
		save: "Uložit",
		saveChanges: "Uložit změny",
		search: "Vyhledat",
		searchImages: "Vyhledat obrázky",
		selectX: {
			0: "Vybrat %{smart_count}",
			1: "Vybrat %{smart_count}",
			2: "Vybrat %{smart_count}"
		},
		sessionRestored: "Relace obnovena",
		showErrorDetails: "Zobrazit podrobnosti o chybě",
		signInWithGoogle: "Přihlaste se pomocí Google",
		smile: "Úsměv prosím!",
		startAudioRecording: "Spustit nahrávání zvuku",
		startCapturing: "Spustit snímání obrazovky",
		startRecording: "Spustit nahrávání videa",
		stopAudioRecording: "Zastavit nahrávání zvuku",
		stopCapturing: "Zastavit snímání obrazovky",
		stopRecording: "Zastavit nahrávání videa",
		streamActive: "Stream je aktivní",
		streamPassive: "Stream je pasivní",
		submitRecordedFile: "Odeslat nahraný soubor",
		takePicture: "Pořídit fotografii",
		takePictureBtn: "Pořídit fotografii",
		takeScreenshot: "Pořídit snímek obrazovky",
		unselectFileNamed: "Zrušit výběr souboru %{name}",
		unnamed: "Nepojmenovaný",
		upload: "Nahrát",
		uploadComplete: "Nahrání dokončeno",
		uploadFailed: "Nahrání se nezdařilo",
		uploading: "Nahrávání",
		uploadingXFiles: {
			0: "Nahrávání %{smart_count} souboru",
			1: "Nahrávání %{smart_count} souborů",
			2: "Nahrávání %{smart_count} souborů"
		},
		uploadPaused: "Nahrání dokončeno",
		uploadStalled: "Nahrávání neproběhlo po dobu %{seconds} sekund. Možná to budete chtít zkusit znovu.",
		uploadXFiles: {
			0: "Nahrát %{smart_count} soubor",
			1: "Nahrát %{smart_count} soubory",
			2: "Nahrát %{smart_count} souborů"
		},
		uploadXNewFiles: {
			0: "Nahrát +%{smart_count} soubor",
			1: "Nahrát +%{smart_count} soubory",
			2: "Nahrát +%{smart_count} souborů"
		},
		xFilesSelected: {
			0: "%{smart_count} soubor vybrán",
			1: "%{smart_count} soubory vybrány",
			2: "%{smart_count} souborů vybráno"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} další soubor přidán",
			1: "%{smart_count} další soubory přidány",
			2: "%{smart_count} dalších souborů přidáno"
		},
		xTimeLeft: "%{time} zbývá",
		youCanOnlyUploadFileTypes: "Lze nahrát pouze následující typy souborů: %{types}",
		youCanOnlyUploadX: {
			0: "Lze nahrát pouze %{smart_count} soubor",
			1: "Lze nahrát pouze %{smart_count} soubory",
			2: "Lze nahrát pouze %{smart_count} souborů"
		},
		youHaveToAtLeastSelectX: {
			0: "Je třeba vybrat alespoň %{smart_count} soubor",
			1: "Je třeba vybrat alespoň %{smart_count} soubory",
			2: "Je třeba vybrat alespoň %{smart_count} souborů"
		},
		zoomIn: "Přiblížit",
		zoomOut: "Oddálit"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.cs_CZ = Lf);
})), zf = /* @__PURE__ */ c({ default: () => Bf }), Bf, Vf = o((() => {
	Bf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Bf.strings = {
		addMore: "Tilføj flere",
		addMoreFiles: "Tilføj flere filer",
		addingMoreFiles: "Tilføj flere filer",
		allowAccessDescription: "For at kunne tage billeder eller video med dit kamera, skal du tillade adgang til dit kamera for denne side.",
		allowAccessTitle: "Venligst giv adgang til dit kamera",
		authenticateWith: "Forbind til %{pluginName}",
		authenticateWithTitle: "Venligst autentificer med %{pluginName} for at vælge filer",
		back: "Tilbage",
		browse: "gennemse",
		browseFiles: "gennemse",
		cancel: "Annuller",
		cancelUpload: "Annuller upload",
		closeModal: "Luk Modal",
		companionError: "Forbindelse til Companion fejlede",
		complete: "Afsluttet",
		connectedToInternet: "Forbundet til internettet",
		copyLink: "Kopier link",
		copyLinkToClipboardFallback: "Kopier URLen forneden",
		copyLinkToClipboardSuccess: "Link kopieret til udklipsholderen",
		creatingAssembly: "Forbereder upload...",
		creatingAssemblyFailed: "Transloadit: Kunne ikke oprette Assembly",
		dashboardTitle: "Fil Uploader",
		dashboardWindowTitle: "Fil Uploader Vindue (Tryk escape for at lukke)",
		dataUploadedOfTotal: "%{complete} af %{total}",
		done: "Færdig",
		dropHint: "Træk dine filer her",
		dropPasteBoth: "Træk filer her, sæt ind eller %{browse}",
		dropPasteFiles: "Træk filer her, sæt ind eller %{browse}",
		dropPasteFolders: "Træk filer her, sæt ind eller %{browse}",
		dropPasteImportBoth: "Træk filer her, sæt ind, %{browse} eller importer fra",
		dropPasteImportFiles: "Træk filer her, sæt ind, %{browse} eller importer fra",
		dropPasteImportFolders: "Træk filer her, sæt ind, %{browse} eller importer fra",
		editFile: "Rediger fil",
		editImage: "Rediger billede",
		editing: "Redigerer %{file}",
		emptyFolderAdded: "Ingen filer blev tilføjet fra en tom mappe",
		encoding: "Encoding...",
		enterCorrectUrl: "Forkert URL: Venligst sørg for at du indtaster et direkte link til en fil",
		enterUrlToImport: "Indtast URL for at importerer en fil",
		exceedsSize: "Denne fil overskrider den maksimale tilladte størrelse af %{size}",
		failedToFetch: "Companion kunne ikke hente denne URL, venligst undersøg om denne er korrekt",
		failedToUpload: "Fejlede upload af %{file}",
		fileSource: "Fil kilde: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} af %{smart_count} filer uploaded",
			1: "%{complete} af %{smart_count} fil uploaded"
		},
		filter: "Filter",
		finishEditingFile: "Færddiggør redigering af fil",
		folderAdded: {
			0: "Tilføjet %{smart_count} filer fra %{folder}",
			1: "Tilføjet %{smart_count} fil fra %{folder}"
		},
		import: "Importer",
		importFrom: "Importer fra %{name}",
		loading: "Loading...",
		logOut: "Log ud",
		myDevice: "Min enhed",
		noFilesFound: "Du har ingen filer eller mapper her",
		noInternetConnection: "Ingen Internet forbindelse",
		openFolderNamed: "Åben mappe %{name}",
		pause: "Pause",
		pauseUpload: "Pause upload",
		paused: "Sat på pause",
		poweredBy: "Drevet af %{uppy}",
		processingXFiles: {
			0: "Behandler %{smart_count} filer",
			1: "Behandler %{smart_count} fil"
		},
		removeFile: "Fjern fil",
		resetFilter: "Nulstil filter",
		resume: "Genoptag",
		resumeUpload: "Genoptag upload",
		retry: "Forsøg igen",
		retryUpload: "Forsøg upload igen",
		saveChanges: "Gem ændringer",
		selectFileNamed: "Vælg fil %{name}",
		selectX: {
			0: "Vælg %{smart_count}",
			1: "Vælg %{smart_count}"
		},
		smile: "Smil!",
		startRecording: "Start video optagelse",
		stopRecording: "Stop video optagelse",
		takePicture: "Tag et billede",
		timedOut: "Upload gået i stå for %{seconds} sekunder, afbryder.",
		unselectFileNamed: "Afmarker filen %{name}",
		upload: "Upload",
		uploadComplete: "Upload færdig",
		uploadFailed: "Upload fejlede",
		uploadPaused: "Upload sat på pause",
		uploadXFiles: {
			0: "Upload %{smart_count} fil",
			1: "Upload %{smart_count} filer"
		},
		uploadXNewFiles: {
			0: "Upload +%{smart_count} fil",
			1: "Upload +%{smart_count} filer"
		},
		uploading: "Uploader",
		uploadingXFiles: {
			0: "Uploader %{smart_count} fil",
			1: "Uploader %{smart_count} filer"
		},
		xFilesSelected: {
			0: "%{smart_count} fil valgt",
			1: "%{smart_count} filer valgt"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} flere filer tilføjet",
			1: "%{smart_count} flere filer tilføjet"
		},
		xTimeLeft: "%{time} tilbage",
		youCanOnlyUploadFileTypes: "Du kan kun uploade: %{types}",
		youCanOnlyUploadX: {
			0: "Du kan kun uploade %{smart_count} fil",
			1: "Du kan kun uploade %{smart_count} filer"
		},
		youHaveToAtLeastSelectX: {
			0: "Du skal vælge mindst %{smart_count} fil",
			1: "Du skal vælge mindst %{smart_count} filer"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.da_DK = Bf);
})), Hf = /* @__PURE__ */ c({ default: () => Uf }), Uf, Wf = o((() => {
	Uf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Uf.strings = {
		addBulkFilesFailed: {
			0: "Das Hinzufügen einer Datei ist aufgrund eines internen Fehlers fehlgeschlagen",
			1: "Das Hinzufügen von %{smart_count} Dateien ist aufgrund eines internen Fehlers fehlgeschlagen"
		},
		addingMoreFiles: "Dateien hinzufügen",
		addMore: "Mehr hinzufügen",
		addMoreFiles: "Dateien hinzufügen",
		allFilesFromFolderNamed: "Alle Dateien vom Ordner %{name}",
		allowAccessDescription: "Um Bilder oder Videos mit Ihrer Kamera aufzunehmen, erlauben Sie dieser Website bitte den Zugriff auf Ihre Kamera.",
		allowAccessTitle: "Bitte erlauben Sie Zugriff auf Ihre Kamera",
		aspectRatioLandscape: "Zuschneiden auf Querformat (16:9)",
		aspectRatioPortrait: "Zuschneiden auf Hochformat (9:16)",
		aspectRatioSquare: "Zuschneiden auf Quadrat",
		authenticateWith: "Mit %{pluginName} verbinden",
		authenticateWithTitle: "Bitte authentifizieren Sie sich mit %{pluginName}, um Dateien auszuwählen",
		back: "Zurück",
		backToSearch: "Zurück zur Suche",
		browse: "durchsuchen",
		browseFiles: "Dateien durchsuchen",
		browseFolders: "Ordner durchsuchen",
		cancel: "Abbrechen",
		cancelUpload: "Hochladen abbrechen",
		closeModal: "Fenster schließen",
		companionError: "Verbindung zu Companion fehlgeschlagen",
		companionUnauthorizeHint: "Um die Autorisierung für Ihr %{provider} Konto aufzuheben, gehen Sie bitte zu %{url}",
		complete: "Fertig",
		connectedToInternet: "Mit dem Internet verbunden",
		copyLink: "Link kopieren",
		copyLinkToClipboardFallback: "Untenstehende URL kopieren",
		copyLinkToClipboardSuccess: "Link in die Zwischenablage kopiert",
		creatingAssembly: "Das Hochladen wird vorbereiten...",
		creatingAssemblyFailed: "Transloadit: Assembly konnte nicht erstellt werden",
		dashboardTitle: "Hochladen von Dateien",
		dashboardWindowTitle: "Hochladen von Dateien (ESC drücken zum Schließen)",
		dataUploadedOfTotal: "%{complete} von %{total}",
		discardRecordedFile: "Aufgenommene Datei verwerfen",
		done: "Abgeschlossen",
		dropHint: "Dateien hier ablegen",
		dropPasteBoth: "Dateien hier ablegen/einfügen, %{browseFiles} oder %{browseFolders}",
		dropPasteFiles: "Dateien hier ablegen/einfügen oder %{browseFiles}",
		dropPasteFolders: "Dateien hier ablegen/einfügen oder %{browseFolders}",
		dropPasteImportBoth: "Dateien hier ablegen/einfügen, %{browse} oder von folgenden Quellen importieren:",
		dropPasteImportFiles: "Dateien hier ablegen/einfügen, %{browseFiles} oder von folgenden Quellen importieren:",
		dropPasteImportFolders: "Dateien hier ablegen/einfügen, %{browseFolders} oder von folgenden Quellen importieren:",
		editFile: "Datei bearbeiten",
		editImage: "Bild bearbeiten",
		editFileWithFilename: "Datei %{file} bearbeiten",
		editing: "%{file} bearbeiten",
		emptyFolderAdded: "Keine Dateien hinzugefügt, da der Ordner leer war",
		encoding: "Kodieren...",
		enterCorrectUrl: "Falsche URL: Bitte stellen Sie sicher, dass Sie einen direkten Link zu einer Datei eingeben",
		enterTextToSearch: "Text zum Suchen von Bildern eingeben",
		enterUrlToImport: "URL zum Importieren einer Datei eingeben",
		exceedsSize: "Datei %{file} ist größer als die maximal erlaubte Dateigröße von %{size}",
		failedToFetch: "Companion konnte diese URL nicht verarbeiten - stellen Sie bitte sicher, dass sie korrekt ist",
		failedToUpload: "Fehler beim Hochladen der Datei %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} von %{smart_count} Datei hochgeladen",
			1: "%{complete} von %{smart_count} Dateien hochgeladen"
		},
		filter: "Filter",
		finishEditingFile: "Bearbeitung beenden",
		flipHorizontal: "Horizontal spiegeln",
		folderAdded: {
			0: "Eine Datei von %{folder} hinzugefügt",
			1: "%{smart_count} Dateien von %{folder} hinzugefügt"
		},
		folderAlreadyAdded: "Der Ordner \"%{folder}\" wurde bereits hinzugefügt",
		generatingThumbnails: "Erstellen von Miniaturansichten...",
		import: "Importieren",
		importFiles: "Importiere Dateien von:",
		importFrom: "Importieren von %{name}",
		inferiorSize: "Diese Datei ist kleiner als die minimal erlaubte Dateigröße von %{size}",
		loading: "Laden...",
		logOut: "Abmelden",
		micDisabled: "Zugriff auf Mikrofon von Benutzer abgelehnt",
		missingRequiredMetaField: "Fehlende erforderliche Meta-Felder",
		missingRequiredMetaFieldOnFile: "Fehlende erforderliche Meta-Felder in %{fileName}",
		missingRequiredMetaFields: {
			0: "Fehlendes erforderliches Meta-Feld: %{fields}.",
			1: "Fehlende erforderliche Meta-Felder: %{fields}."
		},
		myDevice: "Mein Gerät",
		noCameraDescription: "Bitte Kamera anschließen, um Bilder oder Videos aufzunehmen",
		noCameraTitle: "Kamera nicht verfügbar",
		noDuplicates: "Datei '%{fileName}' existiert bereits und kann nicht erneut hinzugefügt werden",
		noFilesFound: "Sie haben hier keine Dateien oder Ordner",
		noInternetConnection: "Keine Internetverbindung",
		noMoreFilesAllowed: "Während der Upload läuft, können keine weiteren Dateien hinzugefügt werden",
		openFolderNamed: "Ordner %{name} öffnen",
		pause: "Pausieren",
		paused: "Pausiert",
		pauseUpload: "Hochladen pausieren",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "Eine Datei verarbeiten",
			1: "%{smart_count} Dateien verarbeiten"
		},
		recording: "Aufnahme",
		recordingLength: "Aufnahmedauer %{recording_length}",
		recordingStoppedMaxSize: "Die Aufnahme wurde gestoppt, weil die Dateigröße das Limit überschritten hat",
		recordVideoBtn: "Video aufnehmen",
		recoveredAllFiles: "Wir haben alle Dateien wiederhergestellt. Sie können mit dem Hochladen fortfahren.",
		recoveredXFiles: {
			0: "Wir konnten eine Datei nicht vollständig wiederherstellen. Bitte wählen Sie sie erneut aus und fahren Sie dann mit dem Hochladen fort.",
			1: "Wir konnten %{smart_count} Dateien nicht vollständig wiederherstellen. Bitte wählen Sie sie erneut aus und fahren Sie dann mit dem Hochladen fort."
		},
		removeFile: "Datei entfernen",
		reSelect: "Erneut auswählen",
		resetFilter: "Filter zurücksetzen",
		resume: "Fortsetzen",
		resumeUpload: "Hochladen fortsetzen",
		retry: "Erneut versuchen",
		retryUpload: "Hochladen erneut versuchen",
		revert: "Rückgängig machen",
		rotate: "Drehen",
		save: "Speichern",
		saveChanges: "Änderungen speichern",
		searchImages: "Suche nach Bildern",
		selectX: {
			0: "Wählen Sie %{smart_count}",
			1: "Wählen Sie %{smart_count}"
		},
		sessionRestored: "",
		smile: "Bitte lächeln!",
		startCapturing: "Bildschirmaufnahme starten",
		startRecording: "Videoaufnahme starten",
		stopCapturing: "Bildschirmaufnahme stoppen",
		stopRecording: "Videoaufnahme stoppen",
		streamActive: "Stream aktiv",
		streamPassive: "Stream passiv",
		submitRecordedFile: "Aufgezeichnete Datei verwenden",
		takePicture: "Ein Foto aufnehmen",
		takePictureBtn: "Foto aufnehmen",
		timedOut: "Upload für %{seconds} Sekunden stehen geblieben, breche ab.",
		upload: "Hochladen",
		uploadComplete: "Hochladen abgeschlossen",
		uploadFailed: "Hochladen fehlgeschlagen",
		uploading: "Wird hochgeladen",
		uploadingXFiles: {
			0: "Eine Datei wird hochgeladen",
			1: "%{smart_count} Dateien werden hochgeladen"
		},
		uploadPaused: "Hochladen pausiert",
		uploadXFiles: {
			0: "Eine Datei hochladen",
			1: "%{smart_count} Dateien hochladen"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} Datei hochladen",
			1: "+%{smart_count} Dateien hochladen"
		},
		xFilesSelected: {
			0: "Eine Datei ausgewählt",
			1: "%{smart_count} Dateien ausgewählt"
		},
		xMoreFilesAdded: {
			0: "Eine weitere Datei hinzugefügt",
			1: "%{smart_count} weitere Dateien hinzugefügt"
		},
		xTimeLeft: "%{time} verbleibend",
		youCanOnlyUploadFileTypes: "Sie können nur folgende Dateitypen hochladen: %{types}",
		youCanOnlyUploadX: {
			0: "Sie können nur eine Datei hochladen",
			1: "Sie können nur %{smart_count} Dateien hochladen"
		},
		youHaveToAtLeastSelectX: {
			0: "Sie müssen mindestens eine Datei auswählen",
			1: "Sie müssen mindestens %{smart_count} Dateien auswählen"
		},
		zoomIn: "Vergrößern",
		zoomOut: "Verkleinern"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.de_DE = Uf);
})), Gf = /* @__PURE__ */ c({ default: () => Kf }), Kf, qf = o((() => {
	Kf = {
		strings: {},
		pluralize(e) {
			return +(e === 1);
		}
	}, Kf.strings = {
		addMore: "Προσθέστε περισσότερα",
		addMoreFiles: "Προσθέστε περισσότερα αρχεία",
		addingMoreFiles: "Προσθήκη αρχείων",
		allowAccessDescription: "Για να βγάλετε φωτογραφίες ή βίντεο με την κάμερά σας, παρακαλούμε επιτρέψτε την πρόσβαση στην κάμερά σας για αυτόν τον ιστότοπο.",
		allowAccessTitle: "Παρακαλούμε επιτρέψτε την πρόσβαση στην κάμερά σας",
		authenticateWith: "Σύνδεση με %{pluginName}",
		authenticateWithTitle: "Παρακαλούμε συνδεθείτε με %{pluginName} για να επιλέξετε αρχεία",
		back: "Πίσω",
		browse: "Περιήγηση",
		browseFiles: "Περιήγηση",
		cancel: "Άκυρο",
		cancelUpload: "Ακύρωση μεταφόρτωσης",
		closeModal: "Κλείσιμο παραθύρου",
		companionError: "Η σύνδεση με το Companion απέτυχε",
		complete: "Ολοκληρώθηκε",
		connectedToInternet: "Συνδεθήκατε στο Internet",
		copyLink: "Αντιγραφή συνδέσμου",
		copyLinkToClipboardFallback: "Αντιγραφή του παρακάτω συνδέσμου",
		copyLinkToClipboardSuccess: "Ο σύνδεσμος αντιγράφηκε",
		creatingAssembly: "Προετοιμασία μεταφόρτωσης...",
		creatingAssemblyFailed: "Transloadit: Σφάλμα κατά την προετοιμασία",
		dashboardTitle: "Μεταφόρτωση αρχείων",
		dashboardWindowTitle: "Παράθυρο μεταφόρτωσης αρχείων (Πατήστε escape για να κλείσει)",
		dataUploadedOfTotal: "%{complete} από %{total}",
		done: "Τέλος",
		dropHint: "Σύρετε τα αρχεία σας εδώ",
		dropPasteBoth: "Σύρετε τα αρχεία εδώ, κάντε επικόλληση ή %{browse}",
		dropPasteFiles: "Σύρετε τα αρχεία εδώ, κάντε επικόλληση ή %{browse}",
		dropPasteFolders: "Σύρετε τα αρχεία εδώ, κάντε επικόλληση ή %{browse}",
		dropPasteImportBoth: "Σύρετε αρχεία εδώ, κάντε επικόλληση, %{browse} ή εισαγωγή από",
		dropPasteImportFiles: "Σύρετε αρχεία εδώ, κάντε επικόλληση, %{browse} ή εισαγωγή από",
		dropPasteImportFolders: "Σύρετε αρχεία εδώ, κάντε επικόλληση, %{browse} ή εισαγωγή από",
		editFile: "Επεξεργασία αρχείου",
		editImage: "Επεξεργασία εικόνας",
		editing: "Γίνεται επεξεργασία %{file}",
		emptyFolderAdded: "Δεν προστέθηκαν αρχεία από τον άδειο φάκελο",
		encoding: "Γίνεται κωδικοποίηση...",
		enterCorrectUrl: "Λανθασμένο URL: Παρακαλούμε βεβαιωθείτε ότι εισάγετε έναν άμεσο σύνδεσμο προς κάποιο αρχείο",
		enterUrlToImport: "Εισάγετε URL για να γίνει εισαγωγή του αρχείου",
		exceedsSize: "Το αρχείο υπερβαίνει το μέγιστο επιτρεπτό όριο που είναι %{size}",
		failedToFetch: "Δεν ήταν δυνατή η λήψη από το URL, παρακαλούμε βεβαιωθείτε ότι είναι σωστό",
		failedToUpload: "Δεν ήταν δυνατή η μεταφόρτωση %{file}",
		fileSource: "Πηγή αρχείου: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} από %{smart_count} αρχεία ανέβηκαν",
			1: "%{complete} από %{smart_count} αρχείο ανέβηκε"
		},
		filter: "Φιλτράρισμα",
		finishEditingFile: "Ολοκλήρωση επεξεργασίας αρχείου",
		folderAdded: {
			0: "Προστέθηκαν %{smart_count} αρχεία από %{folder}",
			1: "Προστέθηκε %{smart_count} αρχείο από %{folder}"
		},
		import: "Εισαγωγή",
		importFrom: "Εισαγωγή από %{name}",
		loading: "Φορτώνει...",
		logOut: "Αποσύνδεση",
		myDevice: "Η συσκευή μου",
		noFilesFound: "Δεν υπάρχουν αρχεία ή φάκελοι εδώ",
		noInternetConnection: "Δεν υπάρχει σύνδεση στο Internet",
		openFolderNamed: "Άνοιγμα φακέλου %{name}",
		pause: "Παύση",
		pauseUpload: "Παύση μεταφόρτωσης",
		paused: "Έγινε παύση",
		poweredBy: "Με τη δύναμη τού %{uppy}",
		processingXFiles: {
			0: "Προετοιμασία %{smart_count} αρχείων",
			1: "Προετοιμασία %{smart_count} αρχείου"
		},
		removeFile: "Αφαίρεση αρχείου",
		resetFilter: "Επαναφορά φίλτρου",
		resume: "Συνέχεια",
		resumeUpload: "Συνέχεια μεταφόρτωσης",
		retry: "Προσπάθεια ξανά",
		retryUpload: "Προσπάθεια μεταφόρτωσης ξανά",
		saveChanges: "Αποθήκευση αλλαγών",
		selectFileNamed: "Επιλογή αρχείου %{name}",
		selectX: {
			0: "Επιλογή %{smart_count}",
			1: "Επιλογή %{smart_count}"
		},
		smile: "Χαμογελάστε!",
		startRecording: "Ξεκίνημα εγγραφής βίντεο",
		stopRecording: "Σταμάτημα εγγραφής βίντεο",
		takePicture: "Βγάλτε μια φωτογραφία",
		timedOut: "Η μεταφόρτωση σταμάτησε για %{seconds} δευτερόλεπτα, γίνεται ακύρωση.",
		unselectFileNamed: "Αποεπιλογή αρχείου %{name}",
		upload: "Μεταφόρτωση",
		uploadComplete: "Μεταφόρτωση ολοκληρώθηκε",
		uploadFailed: "Μεταφόρτωση απέτυχε",
		uploadPaused: "Μεταφόρτωση σε παύση",
		uploadXFiles: {
			0: "Μεταφόρτωση %{smart_count} αρχείων",
			1: "Μεταφόρτωση %{smart_count} αρχείου"
		},
		uploadXNewFiles: {
			0: "Μεταφόρτωση +%{smart_count} αρχείων",
			1: "Μεταφόρτωση +%{smart_count} αρχείου"
		},
		uploading: "Γίνεται μεταφόρτωση",
		uploadingXFiles: {
			0: "Μεταφορτώνονται %{smart_count} αρχεία",
			1: "Μεταφορτώνεται %{smart_count} αρχείο"
		},
		xFilesSelected: {
			0: "%{smart_count} επιλεγμένα αρχεία",
			1: "%{smart_count} επιλεγμένο αρχείο"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ακόμα αρχεία προστέθηκαν",
			1: "%{smart_count} ακόμα αρχείο προστέθηκε"
		},
		xTimeLeft: "%{time} απομένουν",
		youCanOnlyUploadFileTypes: "Μπορείτε να ανεβάσετε μόνο: %{types}",
		youCanOnlyUploadX: {
			0: "Μπορείτε να ανεβάσετε μόνο %{smart_count} αρχεία",
			1: "Μπορείτε να ανεβάσετε μόνο %{smart_count} αρχείο"
		},
		youHaveToAtLeastSelectX: {
			0: "Πρέπει να επιλέξετε τουλάχιστον %{smart_count} αρχεία",
			1: "Πρέπει να επιλέξετε τουλάχιστον %{smart_count} αρχείο"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.el_GR = Kf);
})), Jf = /* @__PURE__ */ c({ default: () => Yf }), Yf, Xf = o((() => {
	Yf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Yf.strings = {
		addBulkFilesFailed: {
			0: "No se pudo agregar %{smart_count} archivo debido a un error interno",
			1: "No se pudieron agregar %{smart_count} archivos debido a errores internos"
		},
		addedNumFiles: "Se agregó %{numFiles} archivo(s)",
		addingMoreFiles: "Agregando más archivos",
		additionalRestrictionsFailed: "No se cumplieron %{count} restricciones adicionales",
		addMore: "Agregar más",
		addMoreFiles: "Agregar más archivos",
		allFilesFromFolderNamed: "Todos los archivos de la carpeta %{name}",
		allowAccessDescription: "Para tomar fotos o grabar videos con tu cámara, por favor permite el acceso a la cámara para este sitio.",
		allowAccessTitle: "Por favor, permite el acceso a tu cámara",
		allowAudioAccessDescription: "Para grabar audio, por favor permite el acceso al micrófono para este sitio.",
		allowAudioAccessTitle: "Por favor, permite el acceso a tu micrófono",
		aspectRatioLandscape: "Recortar horizontal (16:9)",
		aspectRatioPortrait: "Recortar vertical (9:16)",
		aspectRatioSquare: "Recortar cuadrado",
		authAborted: "Autenticación cancelada",
		authenticateWith: "Conectar con %{pluginName}",
		authenticateWithTitle: "Por favor, autentícate con %{pluginName} para seleccionar archivos",
		back: "Atrás",
		browse: "Navegar",
		browseFiles: "Navegar por archivos",
		browseFolders: "Navegar por carpetas",
		cancel: "Cancelar",
		cancelUpload: "Cancelar subida",
		closeModal: "Cerrar ventana",
		companionError: "Error en la conexión con Companion",
		companionUnauthorizeHint: "Para desautorizar tu cuenta de %{provider}, por favor ve a %{url}",
		complete: "Completado",
		compressedX: "Se ahorró %{size} comprimiendo imágenes",
		compressingImages: "Comprimiendo imágenes...",
		connectedToInternet: "Conectado a Internet",
		copyLink: "Copiar enlace",
		copyLinkToClipboardFallback: "Copia la siguiente URL",
		copyLinkToClipboardSuccess: "Enlace copiado al portapapeles",
		creatingAssembly: "Preparando subida...",
		creatingAssemblyFailed: "No se pudo crear un Assembly",
		dashboardTitle: "Cargador de archivos",
		dashboardWindowTitle: "Ventana para cargar archivos (Presiona escape para cerrar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		discardRecordedFile: "Descartar archivo grabado",
		done: "Hecho",
		dropHint: "Suelta tus archivos aquí",
		dropPasteBoth: "Suelta archivos aquí, %{browseFiles} o %{browseFolders}",
		dropPasteFiles: "Suelta archivos aquí o %{browseFiles}",
		dropPasteFolders: "Suelta archivos aquí o %{browseFolders}",
		dropPasteImportBoth: "Suelta archivos aquí, %{browseFiles}, %{browseFolders} o importar desde:",
		dropPasteImportFiles: "Suelta archivos aquí, %{browseFiles} o importar desde:",
		dropPasteImportFolders: "Suelta archivos aquí, %{browseFolders} o importar desde:",
		editFile: "Editar archivo",
		editImage: "Editar imagen",
		editFileWithFilename: "Editar archivo %{file}",
		editing: "Editando %{file}",
		emptyFolderAdded: "No se agregaron archivos desde la carpeta vacía",
		encoding: "Codificando...",
		enterCorrectUrl: "URL incorrecta: Por favor, asegúrate de ingresar un enlace directo a un archivo",
		enterTextToSearch: "Ingresa texto para buscar imágenes",
		enterUrlToImport: "Ingresa la URL para importar un archivo",
		error: "Error",
		exceedsSize: "%{file} excede el tamaño máximo permitido de %{size}",
		failedToFetch: "Companion no pudo recuperar esta URL, por favor asegúrate de que sea correcta",
		failedToUpload: "No se pudo subir %{file}",
		fileSource: "Fuente de archivo: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} archivo subido",
			1: "%{complete} de %{smart_count} archivos subidos"
		},
		filter: "Filtrar",
		finishEditingFile: "Terminar edición de archivo",
		flipHorizontal: "Voltear horizontalmente",
		folderAdded: {
			0: "Se agregó %{smart_count} archivo desde %{folder}",
			1: "Se agregaron %{smart_count} archivos desde %{folder}"
		},
		folderAlreadyAdded: "La carpeta \"%{folder}\" ya fue agregada",
		generatingThumbnails: "Generando miniaturas...",
		import: "Importar",
		importFiles: "Importar archivos desde:",
		importFrom: "Importar desde %{name}",
		inferiorSize: "Este archivo es más pequeño que el tamaño permitido de %{size}",
		loading: "Cargando...",
		logOut: "Cerrar sesión",
		micDisabled: "El acceso al micrófono fue denegado por el usuario",
		missingRequiredMetaField: "Faltan campos de metadatos obligatorios",
		missingRequiredMetaFieldOnFile: "Faltan campos de metadatos obligatorios en %{fileName}",
		missingRequiredMetaFields: {
			0: "Falta el campo de metadatos obligatorio: %{fields}.",
			1: "Faltan los campos de metadatos obligatorios: %{fields}."
		},
		myDevice: "Mi dispositivo",
		noAudioDescription: "Para grabar audio, por favor conecta un micrófono u otro dispositivo de entrada de audio",
		noAudioTitle: "Micrófono no disponible",
		noCameraDescription: "Para tomar fotos o grabar video, por favor conecta un dispositivo de cámara",
		noCameraTitle: "Cámara no disponible",
		noDuplicates: "No se puede agregar el archivo duplicado '%{fileName}', ya existe",
		noFilesFound: "No tienes archivos o carpetas aquí",
		noInternetConnection: "Sin conexión a Internet",
		noMoreFilesAllowed: "No se pueden agregar más archivos",
		noSearchResults: "Lamentablemente, no hay resultados para esta búsqueda",
		openFolderNamed: "Abrir carpeta %{name}",
		pause: "Pausar",
		paused: "En pausa",
		pauseUpload: "Pausar subida",
		pluginNameAudio: "Audio",
		pluginNameBox: "Box",
		pluginNameCamera: "Cámara",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "Desarrollado por %{uppy}",
		processingXFiles: {
			0: "Procesando %{smart_count} archivo",
			1: "Procesando %{smart_count} archivos"
		},
		recording: "Grabando",
		recordingLength: "Duración de la grabación %{recording_length}",
		recordingStoppedMaxSize: "La grabación se detuvo porque el tamaño del archivo está a punto de exceder el límite",
		recordVideoBtn: "Grabar video",
		recoveredAllFiles: "Se restauraron todos los archivos. Ahora puedes reanudar la subida.",
		recoveredXFiles: {
			0: "No pudimos recuperar completamente 1 archivo. Por favor, vuelve a seleccionarlo y reanuda la subida.",
			1: "No pudimos recuperar completamente %{smart_count} archivos. Por favor, vuelve a seleccionarlos y reanuda la subida."
		},
		removeFile: "Eliminar archivo",
		reSelect: "Volver a seleccionar",
		resetFilter: "Restablecer filtro",
		resetSearch: "Restablecer búsqueda",
		resume: "Reanudar",
		resumeUpload: "Reanudar subida",
		retry: "Reintentar",
		retryUpload: "Reintentar subida",
		revert: "Revertir",
		rotate: "Rotar",
		save: "Guardar",
		saveChanges: "Guardar cambios",
		search: "Buscar",
		searchImages: "Buscar imágenes",
		selectX: {
			0: "Seleccionar %{smart_count}",
			1: "Seleccionar %{smart_count}"
		},
		sessionRestored: "Sesión restaurada",
		showErrorDetails: "Mostrar detalles del error",
		signInWithGoogle: "Iniciar sesión con Google",
		smile: "¡Sonríe!",
		startAudioRecording: "Iniciar grabación de audio",
		startCapturing: "Iniciar captura de pantalla",
		startRecording: "Iniciar grabación de video",
		stopAudioRecording: "Detener grabación de audio",
		stopCapturing: "Detener captura de pantalla",
		stopRecording: "Detener grabación de video",
		streamActive: "Transmisión activa",
		streamPassive: "Transmisión pasiva",
		submitRecordedFile: "Enviar archivo grabado",
		takePicture: "Tomar una foto",
		takePictureBtn: "Tomar foto",
		timedOut: "La subida se detuvo durante %{seconds} segundos, abortando.",
		upload: "Subir",
		uploadComplete: "Subida completa",
		uploadFailed: "Error en la subida",
		uploading: "Subiendo",
		uploadingXFiles: {
			0: "Subiendo %{smart_count} archivo",
			1: "Subiendo %{smart_count} archivos"
		},
		uploadPaused: "Subida en pausa",
		uploadStalled: "La subida no ha realizado ningún progreso durante %{seconds} segundos. Puedes intentarlo de nuevo.",
		uploadXFiles: {
			0: "Subir %{smart_count} archivo",
			1: "Subir %{smart_count} archivos"
		},
		uploadXNewFiles: {
			0: "Subir +%{smart_count} archivo",
			1: "Subir +%{smart_count} archivos"
		},
		xFilesSelected: {
			0: "%{smart_count} archivo seleccionado",
			1: "%{smart_count} archivos seleccionados"
		},
		xMoreFilesAdded: {
			0: "Se agregó %{smart_count} archivo más",
			1: "Se agregaron %{smart_count} archivos más"
		},
		xTimeLeft: "%{time} restante",
		youCanOnlyUploadFileTypes: "Solo puedes subir: %{types}",
		youCanOnlyUploadX: {
			0: "Solo puedes subir %{smart_count} archivo",
			1: "Solo puedes subir %{smart_count} archivos"
		},
		youHaveToAtLeastSelectX: {
			0: "Debes seleccionar al menos %{smart_count} archivo",
			1: "Debes seleccionar al menos %{smart_count} archivos"
		},
		zoomIn: "Acercar",
		zoomOut: "Alejar",
		selectFileNamed: "Seleccione archivo %{name}",
		unselectFileNamed: "Deseleccionar archivo %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.es_ES = Yf);
})), Zf = /* @__PURE__ */ c({ default: () => Qf }), Qf, $f = o((() => {
	Qf = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Qf.strings = {
		addBulkFilesFailed: {
			0: "Error al agregar %{smart_count} archivo debido a un error interno",
			1: "Error al agregar %{smart_count} archivos debido a errores internos"
		},
		addMore: "Agregar más",
		addMoreFiles: "Agregar más archivos",
		addingMoreFiles: "Agregando más archivos",
		allowAccessDescription: "Para tomar fotos o grabar video con su cámara, por favor permita el acceso a la cámara para este sitio.",
		allowAccessTitle: "Por favor permita el acceso a su cámara",
		aspectRatioLandscape: "Recortar horizontal (16:9)",
		aspectRatioPortrait: "Recortar vertical (9:16)",
		aspectRatioSquare: "Recortar cuadrado",
		authenticateWith: "Conectar a %{pluginName}",
		authenticateWithTitle: "Por favor autentíquese con %{pluginName} para seleccionar archivos",
		back: "Atrás",
		backToSearch: "Volver a buscar",
		browse: "explorar",
		browseFiles: "explorar archivos",
		browseFolders: "explorar carpetas",
		cancel: "Cancelar",
		cancelUpload: "Cancelar subida",
		closeModal: "Cerrar ventana emergente",
		companionError: "La conexión con Companion falló",
		companionUnauthorizeHint: "Para desautorizar su cuenta de %{provider}, por favor vaya a %{url}",
		complete: "Completo",
		connectedToInternet: "Conectado a Internet",
		copyLink: "Copiar enlace",
		copyLinkToClipboardFallback: "Copie la URL a continuación",
		copyLinkToClipboardSuccess: "Enlace copiado al portapapeles",
		creatingAssembly: "Preparando subida...",
		creatingAssemblyFailed: "Transloadit: No se pudo crear el ensamblado",
		dashboardTitle: "Cargador de archivos",
		dashboardWindowTitle: "Ventana de cargador de archivos (Presione escape para cerrar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		discardRecordedFile: "Descartar archivo grabado",
		done: "Hecho",
		dropHint: "Suelte sus archivos aquí",
		dropPasteBoth: "Suelte archivos aquí, %{browseFiles} o %{browseFolders}",
		dropPasteFiles: "Suelte archivos aquí o %{browseFiles}",
		dropPasteFolders: "Suelte archivos aquí o %{browseFolders}",
		dropPasteImportBoth: "Suelte archivos aquí, %{browseFiles}, %{browseFolders} o importar desde:",
		dropPasteImportFiles: "Suelte archivos aquí, %{browseFiles} o importar desde:",
		dropPasteImportFolders: "Suelte archivos aquí, %{browseFolders} o importar desde:",
		editFile: "Editar archivo",
		editImage: "Editar imagen",
		editing: "Editando %{file}",
		emptyFolderAdded: "No se agregaron archivos desde la carpeta vacía",
		encoding: "Codificando...",
		enterCorrectUrl: "URL incorrecta: Asegúrese de ingresar un enlace directo a un archivo",
		enterTextToSearch: "Ingrese texto para buscar imágenes",
		enterUrlToImport: "Ingrese URL para importar un archivo",
		exceedsSize: "%{file} excede el tamaño máximo permitido de",
		exceedsSize2: "%{backwardsCompat} %{size}",
		failedToFetch: "Companion no pudo obtener esta URL, asegúrese de que sea correcta",
		failedToUpload: "Error al subir %{file}",
		fileSource: "Fuente del archivo: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} archivo subido",
			1: "%{complete} de %{smart_count} archivos subidos"
		},
		filter: "Filtrar",
		finishEditingFile: "Terminar de editar archivo",
		flipHorizontal: "Voltear horizontalmente",
		folderAdded: {
			0: "Se agregó %{smart_count} archivo de %{folder}",
			1: "Se agregaron %{smart_count} archivos de %{folder}"
		},
		generatingThumbnails: "Generando miniaturas...",
		import: "Importar",
		importFiles: "Importar archivos desde:",
		importFrom: "Importar desde %{name}",
		inferiorSize: "Este archivo es más pequeño que el tamaño permitido de %{size}",
		loading: "Cargando...",
		logOut: "Cerrar sesión",
		micDisabled: "Acceso al micrófono denegado por el usuario",
		myDevice: "Mi dispositivo",
		noCameraDescription: "Para tomar fotos o grabar videos, conecte un dispositivo de cámara",
		noCameraTitle: "Cámara no disponible",
		noDuplicates: "No se puede agregar el archivo duplicado '%{fileName}', ya existe",
		noFilesFound: "No tiene archivos o carpetas aquí",
		noInternetConnection: "Sin conexión a Internet",
		noNewAlreadyUploading: "No se pueden agregar nuevos archivos: ya se están subiendo",
		openFolderNamed: "Abrir carpeta %{name}",
		pause: "Pausar",
		pauseUpload: "Pausar subida",
		paused: "En pausa",
		poweredBy: "Desarrollado por",
		poweredBy2: "%{backwardsCompat} %{uppy}",
		processingXFiles: {
			0: "Procesando %{smart_count} archivo",
			1: "Procesando %{smart_count} archivos"
		},
		reSelect: "Volver a seleccionar",
		recording: "Grabando",
		recordingLength: "Duración de la grabación %{recording_length}",
		recordingStoppedMaxSize: "La grabación se detuvo porque el tamaño del archivo está a punto de exceder el límite",
		recoveredAllFiles: "Restauramos todos los archivos. Ahora puede reanudar la subida.",
		recoveredXFiles: {
			0: "No pudimos recuperar completamente 1 archivo. Vuelva a seleccionarlo y reanude la subida.",
			1: "No pudimos recuperar completamente %{smart_count} archivos. Vuelva a seleccionarlos y reanude la subida."
		},
		removeFile: "Eliminar archivo",
		resetFilter: "Restablecer filtro",
		resume: "Reanudar",
		resumeUpload: "Reanudar subida",
		retry: "Reintentar",
		retryUpload: "Reintentar subida",
		revert: "Revertir",
		rotate: "Rotar",
		save: "Guardar",
		saveChanges: "Guardar cambios",
		searchImages: "Buscar imágenes",
		selectAllFilesFromFolderNamed: "Seleccionar todos los archivos de la carpeta %{name}",
		selectFileNamed: "Seleccionar archivo %{name}",
		selectX: {
			0: "Seleccionar %{smart_count}",
			1: "Seleccionar %{smart_count}"
		},
		sessionRestored: "Sesión restaurada",
		smile: "¡Sonríe!",
		startCapturing: "Comenzar captura de pantalla",
		startRecording: "Comenzar grabación de video",
		stopCapturing: "Detener captura de pantalla",
		stopRecording: "Detener grabación de video",
		streamActive: "Transmisión activa",
		streamPassive: "Transmisión pasiva",
		submitRecordedFile: "Enviar archivo grabado",
		takePicture: "Tomar una foto",
		timedOut: "Subida estancada durante %{seconds} segundos, abortando.",
		unselectAllFilesFromFolderNamed: "Deseleccionar todos los archivos de la carpeta %{name}",
		unselectFileNamed: "Deseleccionar archivo %{name}",
		upload: "Subir",
		uploadComplete: "Subida completa",
		uploadFailed: "Error en la subida",
		uploadPaused: "Subida pausada",
		uploadXFiles: {
			0: "Subir %{smart_count} archivo",
			1: "Subir %{smart_count} archivos"
		},
		uploadXNewFiles: {
			0: "Subir +%{smart_count} archivo",
			1: "Subir +%{smart_count} archivos"
		},
		uploading: "Subiendo",
		uploadingXFiles: {
			0: "Subiendo %{smart_count} archivo",
			1: "Subiendo %{smart_count} archivos"
		},
		xFilesSelected: {
			0: "%{smart_count} archivo seleccionado",
			1: "%{smart_count} archivos seleccionados"
		},
		xMoreFilesAdded: {
			0: "Se agregó %{smart_count} archivo más",
			1: "Se agregaron %{smart_count} archivos más"
		},
		xTimeLeft: "%{time} restante",
		youCanOnlyUploadFileTypes: "Solo puede subir: %{types}",
		youCanOnlyUploadX: {
			0: "Solo puede subir %{smart_count} archivo",
			1: "Solo puede subir %{smart_count} archivos"
		},
		youHaveToAtLeastSelectX: {
			0: "Debe seleccionar al menos %{smart_count} archivo",
			1: "Debe seleccionar al menos %{smart_count} archivos"
		},
		zoomIn: "Acercar",
		zoomOut: "Alejar"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.es_MX = Qf);
})), ep = /* @__PURE__ */ c({ default: () => tp }), tp, np = o((() => {
	tp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, tp.strings = {
		addBulkFilesFailed: {
			0: "افزودن %{smart_count} فایل به دلیل خطای داخلی با شکست مواجه شد",
			1: "افزودن %{smart_count} فایل به دلیل خطاهای داخلی با شکست مواجه شد"
		},
		addedNumFiles: "%{numFiles} فایل اضافه شد",
		addingMoreFiles: "درحال افزودن فایل‌ها",
		additionalRestrictionsFailed: "%{count} محدودیت اضافی رعایت نشد",
		addMore: "اضافه کردن بیشتر",
		addMoreFiles: "افزودن فایل‌های بیشتر",
		allFilesFromFolderNamed: "همه فایل‌ها از پوشه %{name}",
		allowAccessDescription: "برای گرفتن عکس یا ضبط ویدیو با دوربین خود، لطفاً اجازه دسترسی به دوربین را برای این سایت بدهید.",
		allowAccessTitle: "لطفا به دوربین اجازه‌ی دسترسی بدهید",
		allowAudioAccessDescription: "برای ضبط صدا، لطفاً اجازه دسترسی به میکروفون را برای این سایت بدهید.",
		allowAudioAccessTitle: "لطفا اجازه دسترسی به میکروفون خود را بدهید",
		aspectRatioLandscape: "برش منظره (16:9)",
		aspectRatioPortrait: "برش پرتره (9:16)",
		aspectRatioSquare: "برش مربعی",
		authAborted: "احراز هویت لغو شد",
		authenticateWith: "در حال اتصال به %{pluginName}",
		authenticateWithTitle: "احراز هویت %{pluginName} برای انتخاب فایل ضروریست!",
		back: "بازگشت",
		browse: "انتخاب کنید",
		browseFiles: "انتخاب فایل",
		browseFolders: "انتخاب فولدر",
		cancel: "انصراف",
		cancelUpload: "لغو بارگذاری",
		closeModal: "بستن پنجره",
		companionError: "اتصال با طرق مقابل با شکست روبرو شد",
		companionUnauthorizeHint: "برای قطع احراز هویت حساب %{provider}, لطفا به آدرس %{url} بروید",
		complete: "کامل شد",
		compressedX: "%{size} با فشرده‌سازی تصاویر ذخیره شد",
		compressingImages: "فشرده سازی تصاویر ...",
		connectedToInternet: "به اینترنت متصل شد",
		copyLink: "کپی پیوند",
		copyLinkToClipboardFallback: "پیوند زیر را کپی کنید",
		copyLinkToClipboardSuccess: "پیوند به حافظه‌ی موقت منتقل شد",
		creatingAssembly: "درحال آماده سازی برای بارگذاری",
		creatingAssemblyFailed: "Transloadit: اسمبلی ایجاد نشد",
		dashboardTitle: "بارگذاری فایل",
		dashboardWindowTitle: "پنجره بارگذاری فایل. برای لغو کلید esc را بفشارید",
		dataUploadedOfTotal: "%{complete} از %{total}",
		discardRecordedFile: "دورانداختن فایل ضبط شده",
		done: "انجام شد",
		dropHint: "فایل‌ها را بکشید و اینجا رها کنید",
		dropPasteBoth: "فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}",
		dropPasteFiles: "فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}",
		dropPasteFolders: "فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}",
		dropPasteImportBoth: "فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}",
		dropPasteImportFiles: "فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}",
		dropPasteImportFolders: "فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}",
		editFile: "ویرایش فایل",
		editImage: "ویرایش تصویر",
		editFileWithFilename: "ویرایش فایل %{file}",
		editing: "در حال ویرایش %{file}",
		emptyFolderAdded: "از پوشه‌ی خالی هیچ فایلی افزوده نشد",
		encoding: "رمزگذاری...",
		enterCorrectUrl: "آدرس نامعتبر. لطفا مطمئن شوید که آدرس مستقیم به یک فایل را انتخاب کرده‌اید.",
		enterTextToSearch: "متن را جهت جستجوی تصویر وارد کنید",
		enterUrlToImport: "آدرس فایل را برای بارگذاری بنویسید",
		error: "خطا",
		exceedsSize: "اندازه‌ی این فایل از حد مجاز بیشتر است! %{size}",
		failedToFetch: "Companion نتوانست این URL را واکشی کند، لطفاً مطمئن شوید که درست است",
		failedToUpload: "شکست در بارگذاری %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} از %{smart_count} فایل بارگذاری شد.",
			1: "%{complete} از %{smart_count} فایل بارگذاری شد."
		},
		filter: "پالایش",
		finishEditingFile: "اتمام ویرایش فایل",
		flipHorizontal: "چرخاندن کردن افقی",
		folderAdded: {
			0: "%{smart_count} فایل از %{folder} افزوده شد.",
			1: "%{smart_count} فایل از %{folder} افزوده شد."
		},
		folderAlreadyAdded: "پوشه \"%{folder}\" قبلاً اضافه شده است",
		generatingThumbnails: "تولید تصویر بندانگشتی...",
		import: "واردکردن",
		importFiles: "وارد کردن فایل‌ها از:",
		importFrom: "واردکردن از %{name}",
		inferiorSize: "این فایل کوچک‌تر از اندازه مجاز %{size} است",
		loadedXFiles: "%{numFiles} فایل بارگیری شد",
		loading: "درحال بارگذاری",
		logOut: "خروج",
		micDisabled: "عدم اجازه دسترسی توسط کاربر",
		missingRequiredMetaField: "فیلدهای متا لازم وجود ندارد",
		missingRequiredMetaFieldOnFile: "فیلدهای متا لازم در %{fileName} وجود ندارد",
		missingRequiredMetaFields: {
			0: "فیلد متا الزامی وجود ندارد: %{fields}.",
			1: "فیلدهای متا لازم وجود ندارد: %{fields}."
		},
		myDevice: "دستگاه من",
		noAudioDescription: "برای ضبط صدا، لطفاً یک میکروفون یا دستگاه ورودی صوتی دیگری را وصل کنید",
		noAudioTitle: "میکروفون در دسترس نیست",
		noCameraDescription: "جهت گرفتن عکس یا ضبط ویدیو لطفا یک دوربین متصل نمایید",
		noCameraTitle: "دوربین در دسترس نیست",
		noDuplicates: "نمی‌توان فایل تکراری بارگذاری کرد،'%{fileName}' قبلا بارگذاری شده است.",
		noFilesFound: "هیچ فایل یا پوشه‌ای اینجا ندارید",
		noInternetConnection: "عدم اتصال به اینترنت",
		noMoreFilesAllowed: "نمی توان فایل جدید بارگذاری کرد",
		noSearchResults: "متاسفانه هیچ نتیجه ای برای این جستجو وجود ندارد",
		openFolderNamed: "پوشه باز کنید %{name}",
		pause: "توقف",
		paused: "متوقف شده",
		pauseUpload: "توقف بارگذاری",
		pluginNameAudio: "صدا",
		pluginNameBox: "جعبه",
		pluginNameCamera: "دوربین",
		pluginNameDropbox: "دراپ باکس",
		pluginNameFacebook: "فیس بوک",
		pluginNameGoogleDrive: "درایو گوگل",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "بزرگ‌نمایی",
		poweredBy: "قدرت گرفته از %{uppy}",
		processingXFiles: {
			0: "درحال پردازش %{smart_count} فایل",
			1: "درحال پردازش %{smart_count} فایل"
		},
		recording: "درحال ضبط",
		recordingLength: "مدت ضبط شده %{recording_length}",
		recordingStoppedMaxSize: "ضبط به دلیل رسیدن اندازه فایل به حدود حداکثر اندازه مجاز متوقف شد",
		recordVideoBtn: "ضبط تصویر",
		recoveredAllFiles: "ما همه فایل‌ها را بازیابی کردیم. اکنون می توانید بارگذاری را از سر بگیرید.",
		recoveredXFiles: {
			0: "امکان بازیابی %{smart_count} فایل وجود ندارد. لطفا مجددا انتخابش کنید و بارگذاری را ازسر بگیرید.",
			1: "امکان بازیابی %{smart_count} فایل‌ها وجود ندارد. لطفا مجددا انتخابش کنید و بارگذاری را ازسر بگیرید."
		},
		removeFile: "حذف فایل",
		reSelect: "انتخاب مجدد",
		resetFilter: "بازنشانی فیلتر",
		resetSearch: "بازنشانی جستجو",
		resume: "ادامه",
		resumeUpload: "ادامه بارگذاری",
		retry: "تلاش دوباره",
		retryUpload: "تلاش دوباره بارگذاری",
		revert: "Revert",
		rotate: "چرخاندن",
		save: "ذخیره",
		saveChanges: "ذخیره‌ی تغییرات",
		search: "Search",
		searchImages: "جستجو برای تصاویر",
		selectX: {
			0: "را انتخاب کنید %{smart_count}",
			1: "را انتخاب کنید %{smart_count}"
		},
		sessionRestored: "نشست بازیابی شد",
		showErrorDetails: "نمایش جزئیات خطا",
		signInWithGoogle: "با گوگل وارد شوید",
		smile: "لبخند!",
		startAudioRecording: "شروع ضبط صدا",
		startCapturing: "ضبط صفحه نمایش آغاز شد",
		startRecording: "آغاز تصویربرداری",
		stopAudioRecording: "ضبط صدا را متوقف کنید",
		stopCapturing: "ضبط صفحه نمایش متوقف شد",
		stopRecording: "توقف تصویربرداری",
		streamActive: "جریان فعال",
		streamPassive: "جریان غیرفعال",
		submitRecordedFile: "ارسال فایل ضبط شده",
		takePicture: "عکس بگیرید",
		takePictureBtn: "عکس بگیر",
		timedOut: "بارگذاری به مدت %{seconds} ثانیه متوقف شد, درحال متوقف کردن.",
		upload: "بارگذاری",
		uploadComplete: "بارگذاری انجام شد",
		uploadFailed: "بارگذاری شکست خورد",
		uploading: "بارگذاری",
		uploadXFiles: {
			0: "بارگذاری %{smart_count} فایل",
			1: "بارگذاری %{smart_count} فایل"
		},
		uploadPaused: "بارگذاری متوقف شد",
		uploadStalled: "آپلود برای %{seconds} ثانیه هیچ پیشرفتی نداشته است. ممکن است بخواهید دوباره آن را امتحان کنید.",
		uploadXNewFiles: {
			0: "بارگذاری +%{smart_count} فایل",
			1: "بارگذاری +%{smart_count} فایل"
		},
		uploadingXFiles: {
			0: "بارگذاری %{smart_count} فایل",
			1: "بارگذاری %{smart_count} فایل"
		},
		xFilesSelected: {
			0: "%{smart_count} فایل انتخاب شده",
			1: "%{smart_count} فایل انتخاب شده"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} فایل دیگر افزوده شد",
			1: "%{smart_count} فایل دیگر افزوده شد"
		},
		xTimeLeft: "%{time} left",
		youCanOnlyUploadFileTypes: "فایل‌های قابل قبول: %{types}",
		youCanOnlyUploadX: {
			0: "فقط می‌توانید %{smart_count} فایل انتخاب کنید",
			1: "فقط می‌توانید %{smart_count} فایل انتخاب کنید"
		},
		youHaveToAtLeastSelectX: {
			0: "می‌بایست حداقل %{smart_count} فایل انتخاب کنید",
			1: "می‌بایست حداقل %{smart_count} فایل انتخاب کنید"
		},
		zoomIn: "بزرگ‌نمایی",
		zoomOut: "کوچک‌نمایی"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.fa_IR = tp);
})), rp = /* @__PURE__ */ c({ default: () => ip }), ip, ap = o((() => {
	ip = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, ip.strings = {
		addMore: "Lisää",
		addMoreFiles: "Lisää tiedostoja",
		addingMoreFiles: "Lisätään tiedostoja",
		allowAccessDescription: "Jotta voit lähettää kuvia tai videota kamerastasi, sinun tulee antaa tälle sivustolle oikeus käyttää kameraasi.",
		allowAccessTitle: "Salli kameran käyttö, kiitos",
		authenticateWith: "Mene %{pluginName}",
		authenticateWithTitle: "%{pluginName} vaadittu tunnistautumiseen, jotta voit valita tiedostoja",
		back: "Takaisin",
		browse: "selaa",
		browseFiles: "selaa",
		cancel: "Peruuta",
		cancelUpload: "Peruuta lähetys",
		closeModal: "Sulje ikkuna",
		companionError: "Yhdistäminen Companioniin epäonnistui",
		complete: "Valmis",
		connectedToInternet: "Yhdistetty Internettiin",
		copyLink: "Kopioi linkki",
		copyLinkToClipboardFallback: "Kopioi alla oleva linkki",
		copyLinkToClipboardSuccess: "Linkki kopioitu leikepöydälle",
		creatingAssembly: "Valmistellaan lähetystä...",
		creatingAssemblyFailed: "Transloadit: Assemblyn luonti epäonnistui",
		dashboardTitle: "Tiedoston Lataaja",
		dashboardWindowTitle: "Tiedoston latausikkuna (Paina Esc sulkeaksesi)",
		dataUploadedOfTotal: "%{complete} / %{total}",
		done: "Valmis",
		dropHint: "Raahaa tiedostot tähän",
		dropPasteBoth: "Raahaa tiedostot tähän, liitä tai %{browse}",
		dropPasteFiles: "Raahaa tiedostot tähän, liitä tai %{browse}",
		dropPasteFolders: "Raahaa tiedostot tähän, liitä tai %{browse}",
		dropPasteImportBoth: "Raahaa tiedostot tähän, liitä, %{browse} tai tuo",
		dropPasteImportFiles: "Raahaa tiedostot tähän, liitä, %{browse} tai tuo",
		dropPasteImportFolders: "Raahaa tiedostot tähän, liitä, %{browse} tai tuo",
		editFile: "Muokkaa tiedostoa",
		editImage: "Muokkaa kuvaa",
		editing: "Muokataan %{file}",
		emptyFolderAdded: "Ei lisätty tiedostoja tyhjästä kansiosta",
		encoding: "Koodataan...",
		enterCorrectUrl: "Epäkelpo osoite: Varmista, että osoite osoittaa suoraan tiedostoon",
		enterUrlToImport: "Anna osoite tuodaksesi tiedoston",
		exceedsSize: "Tiedoston koko ylittää sallitun maksimin %{size}",
		failedToFetch: "Companion ei voinut ladata tiedostoa osoitteesta, onko osoite varmasti oikea?",
		failedToUpload: "Ei voitu lähettää tiedostoa %{file}",
		fileSource: "Tiedoston lähde: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} / %{smart_count} tiedostosta lähetetty",
			1: "%{complete} / %{smart_count} tiedostoa lähetetty"
		},
		filter: "Suodata",
		finishEditingFile: "Lopeta tiedoston muokkaus",
		folderAdded: {
			0: "Lisätty %{smart_count} tiedosto kansiosta %{folder}",
			1: "Lisätty %{smart_count} tiedostoa kansiosta %{folder}"
		},
		import: "Tuo",
		importFrom: "Tuo %{name}",
		loading: "Ladataan...",
		logOut: "Kirjaudu ulos",
		myDevice: "Laitteeltani",
		noFilesFound: "Sinulla ei ole tiedostoja tai kansioita täällä",
		noInternetConnection: "Ei Internet-yhteyttä",
		openFolderNamed: "Avaa kansio %{name}",
		pause: "Keskeytä",
		pauseUpload: "Keskeytä lähetys",
		paused: "Keskeytetty",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "Käsitellään %{smart_count} tiedostoa",
			1: "Käsitellään %{smart_count} tiedostoa"
		},
		removeFile: "Poista tiedosto",
		resetFilter: "Resetoi suodatin",
		resume: "Jatka",
		resumeUpload: "Jatka lähetystä",
		retry: "Yritä uudelleen",
		retryUpload: "Yritä lähetystä uudelleen",
		saveChanges: "Tallenna muutokset",
		selectFileNamed: "Valitse tiedosto %{name}",
		selectX: {
			0: "Valitse %{smart_count}",
			1: "Valitse %{smart_count}"
		},
		smile: "Hymyile!",
		startRecording: "Aloita videon tallennus",
		stopRecording: "Lopeta videon tallennus",
		takePicture: "Ota kuva",
		timedOut: "Lähetys jumittunut %{seconds} sekunniksi, keskeytetään.",
		unselectFileNamed: "Poista valinta tiedostosta %{name}",
		upload: "Lähetä",
		uploadComplete: "Lähetys valmis",
		uploadFailed: "Lähetys epäonnistui",
		uploadPaused: "Lähetys keskeytetty",
		uploadXFiles: {
			0: "Lähetä %{smart_count} tiedosto",
			1: "Lähetä %{smart_count} tiedostoa"
		},
		uploadXNewFiles: {
			0: "Lähetä +%{smart_count} tiedosto",
			1: "Lähetä +%{smart_count} tiedostoa"
		},
		uploading: "Lähetetään",
		uploadingXFiles: {
			0: "Lähetetään %{smart_count} tiedosto",
			1: "Lähetetään %{smart_count} tiedostoa"
		},
		xFilesSelected: {
			0: "%{smart_count} tiedosto valittu",
			1: "%{smart_count} tiedostoa valittu"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} tiedosto added",
			1: "%{smart_count} tiedostoa added"
		},
		xTimeLeft: "%{time} jäljellä",
		youCanOnlyUploadFileTypes: "Sallitut tiedostomuodot: %{types}",
		youCanOnlyUploadX: {
			0: "Voit lähettää vain %{smart_count} tiedosto",
			1: "Voit lähettää vain %{smart_count} tiedostoa"
		},
		youHaveToAtLeastSelectX: {
			0: "Sinun pitää valita vähintään %{smart_count} tiedosto",
			1: "Sinun pitää valita vähintään %{smart_count} tiedostoa"
		},
		startCapturing: "Aloita tallennus",
		stopCapturing: "Lopeta tallennus",
		submitRecordedFile: "Hyväksy tallenne",
		streamActive: "Jako aktiivinen",
		streamPassive: "Jako passiivinen",
		micDisabled: "Käyttäjä on estänyt mikrofonin",
		recording: "Tallennetaan"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.fi_FI = ip);
})), op = /* @__PURE__ */ c({ default: () => sp }), sp, cp = o((() => {
	sp = {
		strings: {},
		pluralize(e) {
			return e <= 1 ? 0 : 1;
		}
	}, sp.strings = {
		addBulkFilesFailed: {
			0: "L’ajout de %{smart_count} fichier a échoué en raison d’une erreur interne",
			1: "L’ajout de %{smart_count} fichiers a échoué en raison d’erreurs internes"
		},
		addedNumFiles: "%{numFiles} fichier(s) ajouté(s)",
		addingMoreFiles: "Ajout de fichiers",
		additionalRestrictionsFailed: "%{count} restrictions supplémentaires n’ont pas été respectées",
		addMore: "Ajouter d’autres",
		addMoreFiles: "Ajouter d’autres fichiers",
		aggregateExceedsSize: "Vous avez sélectionné %{size} de fichiers, mais la taille maximale autorisée est %{sizeAllowed}",
		allFilesFromFolderNamed: "Tous les fichiers du dossier %{name}",
		allowAccessDescription: "Pour prendre des photos ou enregistrer une vidéo, veuillez autoriser l’accès à votre caméra pour ce site.",
		allowAccessTitle: "Veuillez autoriser l’accès à votre caméra",
		allowAudioAccessDescription: "Pour enregistrer de l’audio, veuillez autoriser l’accès au microphone pour ce site.",
		allowAudioAccessTitle: "Veuillez autoriser l’accès au microphone",
		aspectRatioLandscape: "Recadrer en paysage (16:9)",
		aspectRatioPortrait: "Recadrer en portrait (9:16)",
		aspectRatioSquare: "Recadrer pour obtenir une photo carrée",
		authAborted: "Authentification interrompue",
		authenticateWith: "Se connecter à %{pluginName}",
		authenticateWithTitle: "Veuillez vous authentifier avec %{pluginName} pour sélectionner les fichiers",
		back: "Retour",
		browse: "naviguer",
		browseFiles: "naviguer dans les fichiers",
		browseFolders: "naviguer dans les dossiers",
		cancel: "Annuler",
		cancelUpload: "Annuler le téléversement",
		closeModal: "Fermer la fenêtre",
		companionError: "Connexion à Companion a échoué",
		companionUnauthorizeHint: "Pour vous déconnecter de votre compte %{provider}, veuillez aller à %{url}",
		complete: "Terminé",
		compressedX: "%{size} économisé(s) par la compression",
		compressingImages: "Compression des images…",
		connectedToInternet: "Connecté à Internet",
		copyLink: "Copier le lien",
		copyLinkToClipboardFallback: "Copier le lien ci-dessous",
		copyLinkToClipboardSuccess: "Lien copié",
		creatingAssembly: "Préparation du téléversement…",
		creatingAssemblyFailed: "Transloadit: Impossible de créer Assembly",
		dashboardTitle: "Téléverseur de fichiers",
		dashboardWindowTitle: "Fenêtre de téléversement de fichiers (Appuyez sur Échap pour fermer)",
		dataUploadedOfTotal: "%{complete} sur %{total}",
		discardRecordedFile: "Supprimer le fichier enregistré",
		done: "Terminé",
		dropHint: "Déposez vos fichiers ici",
		dropPasteBoth: "Déposer les fichiers ici, coller ou %{browse}",
		dropPasteFiles: "Déposer les fichiers ici, coller ou %{browse}",
		dropPasteFolders: "Déposer les fichiers ici, coller ou %{browse}",
		dropPasteImportBoth: "Déposer les fichiers ici, coller, %{browse} ou importer de",
		dropPasteImportFiles: "Déposer les fichiers ici, coller, %{browse} ou importer de",
		dropPasteImportFolders: "Déposer les fichiers ici, coller, %{browse} ou importer de",
		editFile: "Modifier le fichier",
		editImage: "Modifier l’image",
		editFileWithFilename: "Modifier le fichier %{file}",
		editing: "Modification en cours de %{file}",
		emptyFolderAdded: "Aucun fichier n’a été ajouté depuis un dossier vide",
		encoding: "Traitement…",
		enterCorrectUrl: "Lien incorrect: Assurez-vous que vous entrez un lien direct vers le fichier",
		enterTextToSearch: "Entrez un texte pour rechercher des images",
		enterUrlToImport: "Entrez le lien pour importer un fichier",
		error: "Erreur",
		exceedsSize: "Le fichier %{file} dépasse la taille maximale autorisée de %{size}",
		failedToFetch: "Companion a échoué à récupérer ce lien, assurez-vous qu’il est correct",
		failedToUpload: "Le téléversement de %{file} a échoué",
		fileSource: "Fichier source: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} sur %{smart_count} fichier téléversé",
			1: "%{complete} sur %{smart_count} fichiers téléversés"
		},
		filter: "Filtrer",
		finishEditingFile: "Terminer l’édition du fichier",
		flipHorizontal: "Retourner horizontalement",
		folderAdded: {
			0: "%{smart_count} fichier ajouté de %{folder}",
			1: "%{smart_count} fichiers ajoutés de %{folder}"
		},
		folderAlreadyAdded: "Le dossier \"%{folder}\" a déjà été ajouté",
		generatingThumbnails: "Génération des vignettes…",
		import: "Importer",
		importFiles: "Importer des fichiers depuis :",
		importFrom: "Importer de %{name}",
		inferiorSize: "Ce fichier est plus petit que la taille autorisée de %{size}",
		loadedXFiles: "Chargé %{numFiles} fichiers",
		loading: "Chargement…",
		logOut: "Déconnexion",
		micDisabled: "Accès au micro refusé par l’utilisateur",
		missingRequiredMetaField: "Champ méta requis manquant",
		missingRequiredMetaFieldOnFile: "Champs méta requis manquants dans %{fileName}",
		missingRequiredMetaFields: {
			0: "Champ méta requis manquant : %{fields}.",
			1: "Champs méta requis manquants : %{fields}."
		},
		myDevice: "Mon Appareil",
		noAudioDescription: "Pour enregistrer de l’audio, veuillez connecter un microphone ou un autre appareil d’entrée audio",
		noAudioTitle: "Microphone non disponible",
		noCameraDescription: "Pour prendre des photos ou enregistrer une vidéo, veuillez connecter une caméra",
		noDuplicates: "Impossible d’ajouter le fichier \"%{fileName}\", il existe déjà",
		noFilesFound: "Vous n’avez aucun fichier ou dossier ici",
		noInternetConnection: "Pas de connexion à Internet",
		noMoreFilesAllowed: "Impossible d’ajouter de nouveaux fichiers: en cours de chargement ",
		noSearchResults: "Malheureusement, il n’y a aucun résultat pour cette recherche",
		openFolderNamed: "Ouvrir %{name}",
		pause: "Pause",
		pauseUpload: "Mettre en pause le téléversement",
		paused: "En pause",
		poweredBy: "Propulsé par %{uppy}",
		processingXFiles: {
			0: "Traitement de %{smart_count} fichier",
			1: "Traitement de %{smart_count} fichiers"
		},
		recording: "Enregistrement",
		recordingLength: "Durée d’enregistrement %{recording_length}",
		recordingStoppedMaxSize: "L’enregistrement s’est arrété car la taille du fichier dépasse la limite",
		recordVideoBtn: "Enregistrer une vidéo",
		recoveredAllFiles: "Nous avons restauré tous les fichiers. Vous pouvez maintenant reprendre le téléversement.",
		recoveredXFiles: {
			0: "Nous n’avons pas pu récupérer entièrement 1 fichier. Veuillez le resélectionner et reprendre le téléversement.",
			1: "Nous n’avons pas pu récupérer entièrement %{smart_count} fichiers. Veuillez les resélectionner et reprendre le téléversement."
		},
		removeFile: "Effacer le fichier %{file}",
		resetFilter: "Réinitialiser filtre",
		resume: "Reprendre",
		resumeUpload: "Reprendre le téléversement",
		retry: "Réessayer",
		retryUpload: "Réessayer le téléversement",
		reSelect: "Resélectionner",
		save: "Sauvegarder",
		saveChanges: "Sauvegarder les modifications",
		selectFileNamed: "Sélectionner le fichier %{name}",
		selectX: {
			0: "Sélectionner %{smart_count}",
			1: "Sélectionner %{smart_count}"
		},
		sessionRestored: "Session restaurée",
		signInWithGoogle: "Se connecter avec Google",
		smile: "Souriez !",
		startRecording: "Commencer l’enregistrement vidéo",
		stopRecording: "Arrêter l’enregistrement vidéo",
		streamActive: "Stream actif",
		streamPassive: "Stream passif",
		submitRecordedFile: "Envoyer la vidéo enregistrée",
		takePicture: "Prendre une photo",
		takePictureBtn: "Prendre une photo",
		timedOut: "Téléversement bloqué durant %{seconds} secondes, annulation.",
		unselectFileNamed: "Désélectionner le fichier %{name}",
		upload: "Téléverser",
		uploadComplete: "Téléversement terminé",
		uploadFailed: "Le téléversement a échoué",
		uploadPaused: "Téléversement mis en pause",
		uploadStalled: "Téléversement bloqué depuis %{seconds} secondes. Il est peut-être nécessaire de recommencer l’opération.",
		uploadXFiles: {
			0: "Téléverser %{smart_count} fichier",
			1: "Téléverser %{smart_count} fichiers"
		},
		uploadXNewFiles: {
			0: "Téléverser +%{smart_count} fichier",
			1: "Téléverser +%{smart_count} fichiers"
		},
		uploading: "Téléversement en cours",
		uploadingXFiles: {
			0: "Téléversement de %{smart_count} fichier",
			1: "Téléversement de %{smart_count} fichiers"
		},
		xFilesSelected: {
			0: "%{smart_count} fichier sélectionné",
			1: "%{smart_count} fichiers sélectionnés"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} autre fichier ajouté",
			1: "%{smart_count} autres fichiers ajoutés"
		},
		xTimeLeft: "%{time} restantes",
		youCanOnlyUploadFileTypes: "Vous pouvez seulement téléverser: %{types}",
		youCanOnlyUploadX: {
			0: "Vous pouvez seulement téléverser %{smart_count} fichier",
			1: "Vous pouvez seulement téléverser %{smart_count} fichiers"
		},
		youHaveToAtLeastSelectX: {
			0: "Vous devez sélectionner au moins %{smart_count} fichier",
			1: "Vous devez sélectionner au moins %{smart_count} fichiers"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.fr_FR = sp);
})), lp = /* @__PURE__ */ c({ default: () => up }), up, dp = o((() => {
	up = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, up.strings = {
		addMore: "Engadir máis",
		addMoreFiles: "Engadir máis arquivos",
		addingMoreFiles: "Engadir máis arquivos",
		allowAccessDescription: "Para tomar fotos ou grabar video coa túa cámara, por favor permite a este sitio o acceso á cámara.",
		allowAccessTitle: "Por favor permite o acceso á tua cámara",
		authenticateWith: "Conectar a %{pluginName}",
		authenticateWithTitle: "Por favor autentícate con %{pluginName} para seleccionar arquivos",
		back: "Atrás",
		browse: "navegar",
		browseFiles: "navegar",
		cancel: "Cancelar",
		cancelUpload: "Cancelar subida",
		closeModal: "Pechar xanela flotante",
		companionError: "Conexión con Companion fallou",
		complete: "Completado",
		connectedToInternet: "Conectado a Internet",
		copyLink: "Copiar enlace",
		copyLinkToClipboardFallback: "Copia a siguiente URL",
		copyLinkToClipboardSuccess: "Enlace copiado ao portapapeis",
		creatingAssembly: "Preparando subida...",
		creatingAssemblyFailed: "Transloadit: Non se puido crear un Assembly",
		dashboardTitle: "Cargador de arquivos",
		dashboardWindowTitle: "Xanela para cargar arquivos (Presiona escape para cerrar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		done: "Feito",
		dropHint: "Solta os teus arqivos aquí",
		dropPasteBoth: "Soltar arquivos aquí, pegar ou %{browse}",
		dropPasteFiles: "Soltar arquivos aquí, pegar ou %{browse}",
		dropPasteFolders: "Soltar arquivos aquí, pegar ou %{browse}",
		dropPasteImportBoth: "Soltar arquivos aquí, pegar, %{browse} ou importar dende",
		dropPasteImportFiles: "Soltar arquivos aquí, pegar, %{browse} ou importar dende",
		dropPasteImportFolders: "Soltar arquivos aquí, pegar, %{browse} ou importar dende",
		editFile: "Editar arquivo",
		editImage: "Editar imaxe",
		editing: "Editando %{file}",
		emptyFolderAdded: "Ningún arquivo foi agregado dende o cartafol vacía",
		encoding: "Codificando...",
		enterCorrectUrl: "URL incorrecta: Por favor asegúrate que estás ingresando un enlace a un arquivo",
		enterUrlToImport: "Ingresa unha URL para importar un arquivo",
		exceedsSize: "Este arquivo excede el tamaño máximo de %{size}",
		failedToFetch: "Companion non puido recuperar esta URL, por favor asegúrate que sexa correcta",
		failedToUpload: "Error ao subir %{file}",
		fileSource: "Fonte de arquivo: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} arquivo subido",
			1: "%{complete} de %{smart_count} arquivos subidos"
		},
		filter: "Filtrar",
		finishEditingFile: "Rematar edición de arquivo",
		folderAdded: {
			0: "Engadido %{smart_count} arquivo dende %{folder}",
			1: "Engadidos %{smart_count} arquivos dende %{folder}"
		},
		import: "Importar",
		importFrom: "Importar dende %{name}",
		loading: "Cargando...",
		logOut: "Pechar sesión",
		myDevice: "O meu Dispositivo",
		noFilesFound: "Non existen arquivos ou cartafol aquí",
		noInternetConnection: "Sin conexión a Internet",
		pause: "Pausar",
		pauseUpload: "Pausar subida",
		paused: "En pausa",
		poweredBy: "Soportado por %{uppy}",
		processingXFiles: {
			0: "Procesando %{smart_count} arquivo",
			1: "Procesando %{smart_count} arquivos"
		},
		removeFile: "Eliminar arquivo",
		resetFilter: "Limpar filtro",
		resume: "Reanudar",
		resumeUpload: "Reanudar subida",
		retry: "Intentar novamente",
		retryUpload: "Intentar subida novamente",
		saveChanges: "Gardar cambios",
		selectX: {
			0: "Seleccionar %{smart_count}",
			1: "Seleccionar %{smart_count}"
		},
		smile: "Sorrí!",
		startRecording: "Comezar a grabación de vídeo",
		stopRecording: "Deter a grabación de vídeo",
		takePicture: "Tomar unha foto",
		timedOut: "Subida estancada por %{seconds} segundos, anulando.",
		upload: "Subir",
		uploadComplete: "Subida rematada",
		uploadFailed: "A subida fallou",
		uploadPaused: "Subida pausada",
		uploadXFiles: {
			0: "Subir %{smart_count} arquivo",
			1: "Subir %{smart_count} arquivos"
		},
		uploadXNewFiles: {
			0: "Subir +%{smart_count} arquivo",
			1: "Subir +%{smart_count} arquivos"
		},
		uploading: "Subindo",
		uploadingXFiles: {
			0: "Subindo %{smart_count} arquivo",
			1: "Subindo %{smart_count} arquivos"
		},
		xFilesSelected: {
			0: "%{smart_count} arquivo seleccionado",
			1: "%{smart_count} arquivos seleccionados"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} arquivo máis engadido",
			1: "%{smart_count} arquivos máis engadidos"
		},
		xTimeLeft: "%{time} restantes",
		youCanOnlyUploadFileTypes: "Soamente podes subir: %{types}",
		youCanOnlyUploadX: {
			0: "Soamente podes subir %{smart_count} arquivo",
			1: "Soamente podes subir %{smart_count} arquivos"
		},
		youHaveToAtLeastSelectX: {
			0: "Tes que seleccionar polo menos %{smart_count} arquivo",
			1: "Tes que seleccionar polo menos %{smart_count} arquivos"
		},
		selectFileNamed: "Seleccione arquivo %{name}",
		unselectFileNamed: "Deseleccionar arquivo %{name}",
		openFolderNamed: "Cartafol aberto %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.gl_ES = up);
})), fp = /* @__PURE__ */ c({ default: () => pp }), pp, mp = o((() => {
	pp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, pp.strings = {
		addMore: "הוסף עוד",
		addMoreFiles: "הוסף עוד קבצים",
		addingMoreFiles: "מוסיף עוד קבצים",
		allowAccessDescription: "על מנת לצלם תמונה או להקליט ווידאו עם המצלמה, בבקשה אפשר גישה למצלמה באתר זה.",
		allowAccessTitle: "אנא אפשר גישה למצלמה",
		authenticateWith: "התחבר ל %{pluginName}",
		authenticateWithTitle: "אנא בצע הזדהות עם %{pluginName} על מנת לבחור קבצים",
		back: "חזרה",
		browse: "בחר",
		browseFiles: "בחר",
		cancel: "ביטול",
		cancelUpload: "בטל העלאה",
		closeModal: "חלון",
		companionError: "הזדהות מול השירות נכשלה",
		companionUnauthorizeHint: "על מנת לבטל הזדהות חשבון %{provider}, אנא גלוש ל %{url}",
		complete: "הסתיים",
		connectedToInternet: "מחובר לאינטרנט",
		copyLink: "העתק קישור",
		copyLinkToClipboardFallback: "העתק את הקישור הבא",
		copyLinkToClipboardSuccess: "הקישור הועתק",
		creatingAssembly: "מכין העלאה..",
		creatingAssemblyFailed: "Transloadit: יצירת המידע נכשל",
		dashboardTitle: "העלאת קבצים",
		dashboardWindowTitle: "חלון העלאת קבצים (לחץ escape לסגירה)",
		dataUploadedOfTotal: "%{complete} מתוך %{total}",
		done: "סיים",
		dropHint: "גרור קבצים לכאן",
		dropPasteBoth: "גרור לכאן קבצים, הדבק או %{browse}",
		dropPasteFiles: "גרור לכאן קבצים, הדבק או %{browse}",
		dropPasteFolders: "גרור לכאן קבצים, הדבק או %{browse}",
		dropPasteImportBoth: "גרור לכאן קבצים, הדבק, %{browse} או ייבא מ",
		dropPasteImportFiles: "גרור לכאן קבצים, הדבק, %{browse} או ייבא מ",
		dropPasteImportFolders: "גרור לכאן קבצים, הדבק, %{browse} או ייבא מ",
		editFile: "ערוך קובץ",
		editImage: "ערוך תמונה",
		editing: "מעדכן %{file}",
		emptyFolderAdded: "לא נוספו קבצים מהתיקיה הריקה",
		encoding: "מקודד...",
		enterCorrectUrl: "כתובת לא חוקית: אנא וודא שהכתובת ישירה לקובץ",
		enterUrlToImport: "הזן כתובת לייבוא קבוץ",
		exceedsSize: "קובץ זה גדול מהגודל המקסימאלי המותר %{size}",
		failedToFetch: "השירות נכשל לטפל בכתובת זו, אנא וודא שהיא נכונה",
		failedToUpload: "העלאת הקובץ %{file} נכשלה",
		fileSource: "קובץ מקור: %{name}",
		filesUploadedOfTotal: {
			0: "קובץ %{complete} מתוך %{smart_count} הועלה",
			1: "%{complete} מתוך %{smart_count} קבצים הועלו"
		},
		filter: "סינון",
		finishEditingFile: "סיים לעדכן את הקובץ",
		folderAdded: {
			0: "נוסף קובץ %{smart_count} מ %{folder}",
			1: "נוספו %{smart_count} קבצים מ %{folder}"
		},
		generatingThumbnails: "יוצר תמונות ממוזערות...",
		import: "ייבוא",
		importFrom: "ייבוא מ %{name}",
		loading: "טוען...",
		logOut: "התנתק",
		myDevice: "המכשיר שלי",
		noFilesFound: "אין כאן קבצים או תיקיות",
		noInternetConnection: "אין חיבור לאינטרנט",
		openFolderNamed: "פתח קובץ %{name}",
		pause: "השהה",
		pauseUpload: "השהה העלאה",
		paused: "מושהה",
		poweredBy: "בחסות %{uppy}",
		processingXFiles: {
			0: "מעבד קובץ %{smart_count}",
			1: "מעבד %{smart_count} קבצים"
		},
		removeFile: "מחק קובץ",
		resetFilter: "אפס סינון",
		resume: "המשך",
		resumeUpload: "המשך העלאה",
		retry: "נסה שוב",
		retryUpload: "נסה להעלות שוב",
		saveChanges: "שמור שינויים",
		selectFileNamed: "בחר את הקובץ %{name}",
		selectX: {
			0: "בחר %{smart_count}",
			1: "בחר %{smart_count}"
		},
		smile: "Smile!",
		startRecording: "מתחיל הסרטת ווידאו",
		stopRecording: "עצור הסרטת ווידאו",
		takePicture: "צלם תמונה",
		timedOut: "העלאה נתקעה %{seconds} שניות, מבטל.",
		unselectFileNamed: "בטל בחירת הקובץ %{name}",
		upload: "מעלה",
		uploadComplete: "העלאה הסתיימה",
		uploadFailed: "העלאה נכשלה",
		uploadPaused: "העלאה מושהת",
		uploadXFiles: {
			0: "העלה קובץ %{smart_count}",
			1: "העלה %{smart_count} קבצים"
		},
		uploadXNewFiles: {
			0: "העלה קובץ +%{smart_count}",
			1: "העלה +%{smart_count} קבצים"
		},
		uploading: "Uploading",
		uploadingXFiles: {
			0: "מעלה קובץ %{smart_count}",
			1: "מעלה %{smart_count} קבצים"
		},
		xFilesSelected: {
			0: "קובץ %{smart_count} נבחר",
			1: "%{smart_count} קבצים נבחרו"
		},
		xMoreFilesAdded: {
			0: "עוד %{smart_count} קובץ נוסף",
			1: "עוד %{smart_count} קבצים נוספו"
		},
		xTimeLeft: "%{time} left",
		youCanOnlyUploadFileTypes: "You can only upload: %{types}",
		youCanOnlyUploadX: {
			0: "ניתן העלות רק קובץ %{smart_count}",
			1: "ניתן להעלות רק %{smart_count} קבצים"
		},
		youHaveToAtLeastSelectX: {
			0: "עליך לבחור לפחות בקובץ %{smart_count}",
			1: "עליך לבחור לפחות ב %{smart_count} קבצים"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.he_IL = pp);
})), hp = /* @__PURE__ */ c({ default: () => gp }), gp, _p = o((() => {
	gp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, gp.strings = {
		addBulkFilesFailed: {
			0: "आंतरिक त्रुटि के कारण %{smart_count} फ़ाइल जोड़ने में विफल",
			1: "आंतरिक त्रुटियों के कारण %{smart_count} फ़ाइलें जोड़ने में विफल"
		},
		addMore: "और जोड़ें",
		addMoreFiles: "और अधिक फ़ाइलें जोड़ें",
		addingMoreFiles: "और अधिक फ़ाइलें जोड़ रहे हैं",
		allowAccessDescription: "अपने कैमरे से फ़ोटो लेने या वीडियो रिकॉर्ड करने के लिए, कृपया इस साइट के लिए कैमरा पहुंच की अनुमति दें।",
		allowAccessTitle: "कृपया अपने कैमरे तक पहुंचने की अनुमति दें",
		aspectRatioLandscape: "लैंडस्केप क्रॉप करें (16:9)",
		aspectRatioPortrait: "पोर्ट्रेट क्रॉप करें (9:16)",
		aspectRatioSquare: "वर्ग क्रॉप करें",
		authenticateWith: "%{pluginName} से कनेक्ट करें",
		authenticateWithTitle: "%{pluginName} के साथ सत्यापित करें ताकि फ़ाइलें चुन सकें",
		back: "वापस",
		backToSearch: "खोज पर वापस जाएं",
		browse: "ब्राउज़ करें",
		browseFiles: "फ़ाइलें ब्राउज़ करें",
		browseFolders: "फ़ोल्डर ब्राउज़ करें",
		cancel: "रद्द करें",
		cancelUpload: "अपलोड रद्द करें",
		closeModal: "मोडल बंद करें",
		companionError: "कंपैनियन के साथ कनेक्शन विफल",
		companionUnauthorizeHint: "अपने %{provider} खाते को अनधिकृत करने के लिए, कृपया %{url} पर जाएँ",
		complete: "पूरा हो गया",
		connectedToInternet: "इंटरनेट से जुड़ा हुआ",
		copyLink: "लिंक कॉपी करें",
		copyLinkToClipboardFallback: "नीचे दिए गए URL को कॉपी करें",
		copyLinkToClipboardSuccess: "लिंक क्लिपबोर्ड पर कॉपी किया गया",
		creatingAssembly: "अपलोड की तैयारी...",
		creatingAssemblyFailed: "Transloadit: असेंबली बना नहीं सका",
		dashboardTitle: "फ़ाइल अपलोडर",
		dashboardWindowTitle: "फ़ाइल अपलोडर विंडो (बंद करने के लिए एस्केप दबाएं)",
		dataUploadedOfTotal: "%{complete} का %{total}",
		discardRecordedFile: "रिकॉर्डेड फ़ाइल को छोड़ें",
		done: "हो गया",
		dropHint: "यहाँ अपनी फ़ाइलें ड्रॉप करें",
		dropPasteBoth: "यहाँ फ़ाइलें ड्रॉप करें, %{browseFiles} या %{browseFolders}",
		dropPasteFiles: "यहाँ फ़ाइलें ड्रॉप करें या %{browseFiles}",
		dropPasteFolders: "यहाँ फ़ाइलें ड्रॉप करें या %{browseFolders}",
		dropPasteImportBoth: "यहां फ़ाइलें ड्रॉप करें, %{browseFiles}, %{browseFolders} या इससे आयात करें:",
		dropPasteImportFiles: "यहां फ़ाइलें ड्रॉप करें, %{browseFiles} या इससे आयात करें:",
		dropPasteImportFolders: "यहां फ़ाइलें ड्रॉप करें, %{browseFolders} या इससे आयात करें:",
		editFile: "फ़ाइल संपादित करें",
		editImage: "छवि संपादित करें",
		editing: "संपादन %{file}",
		emptyFolderAdded: "खाली फ़ोल्डर से कोई फ़ाइलें नहीं जोड़ी गईं",
		encoding: "एन्कोडिंग...",
		enterCorrectUrl: "गलत यूआरएल: कृपया सुनिश्चित करें कि आप एक फ़ाइल के सीधे लिंक दर्ज कर रहे हैं",
		enterTextToSearch: "छवियाँ खोजने के लिए टेक्स्ट दर्ज करें",
		enterUrlToImport: "फ़ाइल आयात करने के लिए यूआरएल दर्ज करें",
		exceedsSize: "%{file} की अधिकतम अनुमति देने वाले आकार को पार करता है",
		exceedsSize2: "%{backwardsCompat} %{size}",
		failedToFetch: "Companion इस URL को लाने में विफल रहा, कृपया सुनिश्चित करें कि यह सही है",
		failedToUpload: "%{file} अपलोड करने में विफल रहा",
		fileSource: "फ़ाइल स्रोत: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} का %{smart_count} फ़ाइल अपलोड किया गया",
			1: "%{complete} के %{smart_count} फ़ाइलें अपलोड की गईं"
		},
		filter: "फ़िल्टर",
		finishEditingFile: "फ़ाइल संपादित करना समाप्त करें",
		flipHorizontal: "क्षैतिज पलटें",
		folderAdded: {
			0: "%{folder} से %{smart_count} फ़ाइल जोड़ी गई",
			1: "%{folder} से %{smart_count} फ़ाइलें जोड़ी गई"
		},
		generatingThumbnails: "थंबनेल उत्पन्न कर रहा है...",
		import: "आयात",
		importFiles: "फ़ाइलों को इम्पोर्ट करें:",
		importFrom: "%{name} से आयात करें",
		inferiorSize: "इस फ़ाइल का आकार %{size} से छोटा है",
		loading: "लोड हो रहा है...",
		logOut: "लॉग आउट",
		micDisabled: "उपयोगकर्ता द्वारा माइक्रोफ़ोन पहुंच नहीं हो सका",
		myDevice: "मेरी उपकरण",
		noCameraDescription: "तस्वीरें लेने या वीडियो रिकॉर्ड करने के लिए, कृपया कैमरा डिवाइस कनेक्ट करें",
		noCameraTitle: "कैमरा उपलब्ध नहीं है",
		noDuplicates: "डुप्लिकेट फ़ाइल '%{fileName}' नहीं जोड़ सकते, यह पहले से मौजूद है",
		noFilesFound: "यहां आपके पास कोई फ़ाइल या फ़ोल्डर नहीं है",
		noInternetConnection: "इंटरनेट कनेक्शन नहीं",
		noNewAlreadyUploading: "नई फ़ाइलें नहीं जोड़ सकते: पहले से अपलोड कर रहे हैं",
		openFolderNamed: "फ़ोल्डर %{name} खोलें",
		pause: "रोकें",
		pauseUpload: "अपलोड रोकें",
		paused: "रोका हुआ",
		poweredBy: "प्रायोजित द्वारा",
		poweredBy2: "%{backwardsCompat} %{uppy}",
		processingXFiles: {
			0: "%{smart_count} फ़ाइल को प्रोसेस कर रहा है",
			1: "%{smart_count} फ़ाइलें प्रोसेस कर रहा है"
		},
		reSelect: "पुनः-चुनें",
		recording: "रिकॉर्डिंग",
		recordingLength: "रिकॉर्डिंग की लंबाई %{recording_length}",
		recordingStoppedMaxSize: "रिकॉर्डिंग रोक दी गई क्योंकि फ़ाइल का आकार सीमा को पार करने वाला है",
		recoveredAllFiles: "हमने सभी फ़ाइलों को पुनर्स्थापित कर दिया है। अब आप अपलोड को फिर से शुरू कर सकते हैं।",
		recoveredXFiles: {
			0: "हम 1 फ़ाइल को पूरी तरह से वसूल नहीं कर सके। कृपया इसे फिर से चुनें और अपलोड जारी रखें।",
			1: "हम %{smart_count} फ़ाइलों को पूरी तरह से वसूल नहीं कर सके। कृपया उन्हें फिर से चुनें और अपलोड जारी रखें।"
		},
		removeFile: "फ़ाइल हटाएँ",
		resetFilter: "फ़िल्टर रीसेट करें",
		resume: "जारी रखें",
		resumeUpload: "अपलोड जारी रखें",
		retry: "पुनः प्रयास करें",
		retryUpload: "अपलोड पुनः प्रयास करें",
		revert: "वापस लें",
		rotate: "घुमाएँ",
		save: "सहेजें",
		saveChanges: "परिवर्तन सहेजें",
		searchImages: "चित्रों के लिए खोजें",
		selectAllFilesFromFolderNamed: "फ़ोल्डर %{name} से सभी फ़ाइलें चुनें",
		selectFileNamed: "फ़ाइल %{name} चुनें",
		selectX: {
			0: "%{smart_count} चुनें",
			1: "%{smart_count} चुनें"
		},
		sessionRestored: "सत्र बहाल",
		smile: "मुस्कराइए!",
		startCapturing: "स्क्रीन कैप्चर शुरू करें",
		startRecording: "वीडियो रिकॉर्डिंग शुरू करें",
		stopCapturing: "स्क्रीन कैप्चर बंद करें",
		stopRecording: "वीडियो रिकॉर्डिंग रोकें",
		streamActive: "स्ट्रीम सक्रिय",
		streamPassive: "स्ट्रीम निष्क्रिय",
		submitRecordedFile: "रिकॉर्ड की गई फ़ाइल सबमिट करें",
		takePicture: "एक तस्वीर लें",
		timedOut: "अपलोड %{seconds} सेकंड के लिए अवरुद्ध हुआ, निरस्त कर रहा है।",
		unselectAllFilesFromFolderNamed: "फ़ोल्डर %{name} से सभी फ़ाइलों को अचयनित करें",
		unselectFileNamed: "फ़ाइल %{name} को अचयनित करें",
		upload: "अपलोड",
		uploadComplete: "अपलोड पूरा हुआ",
		uploadFailed: "अपलोड विफल",
		uploadPaused: "अपलोड रुका हुआ",
		uploadXFiles: {
			0: "%{smart_count} फ़ाइल अपलोड करें",
			1: "%{smart_count} फ़ाइलें अपलोड करें"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} फ़ाइल अपलोड करें",
			1: "+%{smart_count} फ़ाइलें अपलोड करें"
		},
		uploading: "अपलोड हो रहा है",
		uploadingXFiles: {
			0: "%{smart_count} फ़ाइल अपलोड हो रही है",
			1: "%{smart_count} फ़ाइलें अपलोड कर रहे हैं"
		},
		xFilesSelected: {
			0: "%{smart_count} फ़ाइल चयनित",
			1: "%{smart_count} फ़ाइलें चयनित"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} और फ़ाइल जोड़ी गई",
			1: "%{smart_count} और फ़ाइलें जोड़ी गई"
		},
		xTimeLeft: "%{time} शेष",
		youCanOnlyUploadFileTypes: "आप केवल %{types} अपलोड कर सकते हैं",
		youCanOnlyUploadX: {
			0: "आप केवल %{smart_count} फ़ाइल अपलोड कर सकते हैं",
			1: "आप केवल %{smart_count} फ़ाइलें अपलोड कर सकते हैं"
		},
		youHaveToAtLeastSelectX: {
			0: "आपको कम से कम %{smart_count} फ़ाइल का चयन करना होगा",
			1: "आपको कम से कम %{smart_count} फ़ाइलें चुननी होंगी"
		},
		zoomIn: "ज़ूम इन",
		zoomOut: "ज़ूम आउट"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.hi_IN = gp);
})), vp = /* @__PURE__ */ c({ default: () => yp }), yp, bp = o((() => {
	yp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, yp.strings = {
		addMore: "Dodaj još",
		addMoreFiles: "Dodaj još datoteka",
		addingMoreFiles: "Dodavanje datoteka",
		allowAccessDescription: "Molimo Vas, dozvolite pristup Vašoj kameri kako biste je mogli koristiti za snimanje fotografija i video zapisa.",
		allowAccessTitle: "Molimo Vas dozvolite pristup Vašoj kameri",
		authenticateWith: "Poveži se putem %{pluginName}",
		authenticateWithTitle: "Molimo Vas da se prijavite putem %{pluginName} kako biste preuzeli datoteke",
		back: "Natrag",
		browse: "pretraži",
		browseFiles: "pretraži",
		cancel: "Otkaži",
		cancelUpload: "Otkaži prijenos",
		closeModal: "Zatvori",
		companionError: "Neuspješno povezivanje s Companion-om",
		complete: "Prijenos uspješan",
		connectedToInternet: "Povezan s internetom",
		copyLink: "Kopiraj link",
		copyLinkToClipboardFallback: "Kopiraj donji URL",
		copyLinkToClipboardSuccess: "Link je kopiran u međuspremnik",
		creatingAssembly: "Pripremanje prijenosa...",
		creatingAssemblyFailed: "Transloadit: nemoguće kreirati Assembly",
		dashboardTitle: "Prijenos datoteka",
		dashboardWindowTitle: "Prozor za prijenos datoteka (pritisnite ESC za izlaz)",
		dataUploadedOfTotal: "%{complete} od %{total}",
		done: "Završeno",
		dropHint: "Ispusti datoteke ovdje",
		dropPasteBoth: "Ispusti datoteke ovdje, zalijepi ili %{browse}",
		dropPasteFiles: "Ispusti datoteke ovdje, zalijepi ili %{browse}",
		dropPasteFolders: "Ispusti datoteke ovdje, zalijepi ili %{browse}",
		dropPasteImportBoth: "Ispusti datoteke ovdje, zalijepi (eng. \"paste\"), %{browse} ili preuzmi s",
		dropPasteImportFiles: "Ispusti datoteke ovdje, zalijepi (eng. \"paste\"), %{browse} ili preuzmi s",
		dropPasteImportFolders: "Ispusti datoteke ovdje, zalijepi (eng. \"paste\"), %{browse} ili preuzmi s",
		editFile: "Izmijeni datoteku",
		editImage: "Uredi sliku",
		editing: "Uredi %{file}",
		emptyFolderAdded: "Ni jedna datoteka nije dodana iz prazne mape",
		encoding: "Enkodiranje...",
		enterCorrectUrl: "Pogrešan URL: unesite točnu putanju do datoteke",
		enterUrlToImport: "Unesite URL do datoteke",
		exceedsSize: "Ova datoteka premašuje najveću dozvoljenu veličinu od %{size}",
		failedToFetch: "Companion nije uspio dohvatiti traženi URL, provjerite ispravnost adrese",
		failedToUpload: "Broj neuspješno prenesenih datoteka: %{file}",
		fileSource: "Datoteka: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete}. Ukupno prenesenih datoteka: %{smart_count}",
			1: "%{complete}. Ukupno prenesenih datoteka: %{smart_count}"
		},
		filter: "Filtriraj",
		finishEditingFile: "Završi uređivanje datoteke",
		folderAdded: {
			0: "Broj datoteka preuzetih iz %{folder}: %{smart_count}",
			1: "Broj datoteka preuzetih iz %{folder}: %{smart_count}"
		},
		import: "Preuzmi",
		importFrom: "Preuzmi s %{name}",
		loading: "Učitavam...",
		logOut: "Odjava",
		myDevice: "Moj uređaj",
		noFilesFound: "Ovdje nema mapa ili datoteka",
		noInternetConnection: "Nemoguće uspostaviti vezu s internetom",
		pause: "Zaustavi privremeno",
		pauseUpload: "Privremeno zaustavi prijenos",
		paused: "Privremeno zaustavljeno",
		poweredBy: "Podržano od strane %{uppy}",
		processingXFiles: {
			0: "Obrada datoteke",
			1: "Broj datoteka koje se obrađuju: %{smart_count}"
		},
		removeFile: "Ukloni datoteku",
		resetFilter: "Izbriši filter",
		resume: "Nastavi",
		resumeUpload: "Nastavi prijenos",
		retry: "Pokušaj ponovo",
		retryUpload: "Ponovno pokušaj prenijeti datoteku",
		save: "Spremi",
		saveChanges: "Spremi promjene",
		selectX: {
			0: "Izaberi datoteku",
			1: "Izaberi %{smart_count}"
		},
		smile: "Osmijeh!",
		startRecording: "Započni snimanje video zapisa",
		stopRecording: "Zaustavi snimanje video zapisa",
		takePicture: "Snimi fotografiju",
		timedOut: "Prekidamo prijenos radi poteškoća. Broj sekundi zastoja: %{seconds}.",
		upload: "Prenesi",
		uploadComplete: "Prijenos uspio",
		uploadFailed: "Prijenos nije uspio",
		uploadPaused: "Prijenos je privremeno zaustavljen",
		uploadXFiles: {
			0: "Prenesi datoteku",
			1: "Prenesi datoteke. Ukupno: %{smart_count}"
		},
		uploadXNewFiles: {
			0: "Prenesi +%{smart_count} datoteku",
			1: "Prenesi datoteke. Ukupno: +%{smart_count}"
		},
		uploading: "Datoteka se prenosi",
		uploadingXFiles: {
			0: "Broj datoteka koje se trenutno prenose: %{smart_count}",
			1: "Broj datoteka koje se trenutno prenose: %{smart_count}"
		},
		xFilesSelected: {
			0: "Broj datoteka za prijenos: %{smart_count}",
			1: "Broj datoteka za prijenos: %{smart_count}"
		},
		xMoreFilesAdded: {
			0: "Broj dodatih datoteka: %{smart_count}",
			1: "Broj dodatih datoteka: %{smart_count}"
		},
		xTimeLeft: "Preostalo vrijeme %{time} ",
		youCanOnlyUploadFileTypes: "Moguće je prenijeti samo: %{types}",
		youCanOnlyUploadX: {
			0: "Dozvoljeni broj datoteka za prijenos: %{smart_count}",
			1: "Dozvoljeni broj datoteka za prijenos: %{smart_count}"
		},
		youHaveToAtLeastSelectX: {
			0: "Izaberite bar jednu datoteku",
			1: "Izaberite datoteke. Najmanje: %{smart_count}"
		},
		selectFileNamed: "Izaberite datoteku %{name}",
		unselectFileNamed: "Isključite datoteku %{name}",
		openFolderNamed: "Otvori mapu %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.hr_HR = yp);
})), xp = /* @__PURE__ */ c({ default: () => Sp }), Sp, Cp = o((() => {
	Sp = {
		strings: {},
		pluralize() {
			return 0;
		}
	}, Sp.strings = {
		addMore: "Adj hozzá többet",
		addMoreFiles: "További fájlok hozzáadása",
		addingMoreFiles: "További fájlok hozzáadása",
		allowAccessDescription: "A képek vagy videó felvételéhez, kérjük engedélyezze a kamera használatát ezen az oldalon.",
		allowAccessTitle: "Engedélyezze a kamera használatát",
		authenticateWith: "Kapcsolódás a %{pluginName}-val",
		authenticateWithTitle: "Kérjük lépjen be a %{pluginName}-ba a fájlok kiválasztásához",
		back: "Vissza",
		browse: "válasszon",
		browseFiles: "válasszon",
		browseFolders: "válasszon mappát",
		cancel: "Mégse",
		cancelUpload: "Feltöltés megszakítása",
		closeModal: "Ablak bezárása",
		companionError: "A Companion-hoz történő kapcsolódás nem sikerült",
		complete: "Kész",
		connectedToInternet: "Kapcsolódott az internethez",
		copyLink: "Link másolása",
		copyLinkToClipboardFallback: "Másolja ki az alábbi URL-t",
		copyLinkToClipboardSuccess: "Link a vágólapra másolva",
		creatingAssembly: "Feltöltés előkészítése...",
		creatingAssemblyFailed: "Transloadit: Nem sikerült létrehozni az Assembly-t",
		dashboardTitle: "Fájlfeltöltő",
		dashboardWindowTitle: "Fájlfeltöltő ablak (Escape a bezáráshoz)",
		dataUploadedOfTotal: "%{complete} / %{total}",
		done: "Kész",
		dropHint: "Húzza ide a fájlokat",
		dropPasteBoth: "Húzza ide a fájlokat vagy %{browse}",
		dropPasteFiles: "Húzza ide a fájlokat vagy %{browse}",
		dropPasteFolders: "Húzza ide a fájlokat vagy %{browseFolders}",
		dropPasteImportBoth: "Húzza ide a fájlokat, %{browse} vagy importáljon:",
		dropPasteImportFiles: "Húzza ide a fájlokat, %{browse} vagy importáljon:",
		dropPasteImportFolders: "Húzza ide a fájlokat, %{browseFolders} vagy importáljon:",
		editFile: "Fájl szerkesztése",
		editImage: "Kép szerkesztése",
		editing: "%{file} szerkesztése",
		emptyFolderAdded: "Az üres mappából nem kerültek fájlok hozzáadásra",
		encoding: "Kódolás...",
		enterCorrectUrl: "Érvénytelen URL: Bizonyosodjon meg róla, hogy egy fájlra mutató közvetlen linket ír be",
		enterUrlToImport: "Adjon meg egy URL-t a fájl importálásához",
		exceedsSize: "Ez a fájl meghaladja a maximális megengedett méretet %{size}",
		failedToFetch: "A Companion-nak nem sikerült az URL letöltése, győzödjön meg az URL helyességéről",
		failedToUpload: "%{file}-t nem sikerült feltölteni",
		fileSource: "Fájl forrása: %{name}",
		filesUploadedOfTotal: "A %{smart_count}-ból %{complete} fájl feltöltve",
		filter: "Szűrő",
		finishEditingFile: "Fájl szerkesztésének befejezése",
		folderAdded: "A %{folder}-ból %{smart_count} fájl hozzáadva",
		import: "Importálás",
		importFrom: "Importálás innen: %{name}",
		loading: "Töltés...",
		logOut: "Kijelentkezés",
		myDevice: "Eszközöm",
		noFilesFound: "Nem találhatóak fájlok vagy könyvtárak",
		noInternetConnection: "Nincsen Internetkapcsolat",
		pause: "Szünet",
		pauseUpload: "Feltöltés szüneteltetése",
		paused: "Szüneteltetve",
		poweredBy: "Meghajtja az %{uppy}",
		processingXFiles: "%{smart_count} fájl feldolgozása",
		removeFile: "Fájl törlése",
		resetFilter: "Szűrő visszaállítása",
		resume: "Folytatás",
		resumeUpload: "Feltöltés folytatása",
		retry: "Újra",
		retryUpload: "Próbálja újra a feltöltést",
		saveChanges: "Változtatások mentése",
		selectX: "Válassza az %{smart_count} lehetőséget",
		smile: "Csíííz!",
		startRecording: "Videófeltével indul",
		stopRecording: "Videófelvétel megáll",
		takePicture: "Fénykép",
		timedOut: "A feltöltés elakadt %{seconds} másodpercig, a feltöltés leáll.",
		upload: "Feltöltés",
		uploadComplete: "A feltöltés kész",
		uploadFailed: "Sikertelen feltöltés",
		uploadPaused: "Szüneteltetett feltöltés",
		uploadXFiles: "%{smart_count} fájl feltöltése",
		uploadXNewFiles: "+%{smart_count} fájl feltöltése",
		uploading: "Feltölés",
		uploadingXFiles: "+%{smart_count} fájl feltöltése",
		xFilesSelected: "%{smart_count} fájl kiválasztva",
		xMoreFilesAdded: "további %{smart_count} fájl hozzáadva",
		xTimeLeft: "%{time} van hátra",
		youCanOnlyUploadFileTypes: "Feltölthető formátumok: %{types}",
		youCanOnlyUploadX: "Csak %{smart_count} fájl tölthető fel",
		youHaveToAtLeastSelectX: "Legalább %{smart_count} fájlt ki kell választania",
		selectFileNamed: "Válaszd ki a fájlt %{name}",
		unselectFileNamed: "A fájl törlése %{name}",
		openFolderNamed: "Nyitott mappa %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.hu_HU = Sp);
})), wp = /* @__PURE__ */ c({ default: () => Tp }), Tp, Ep = o((() => {
	Tp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Tp.strings = {
		addMore: "Tambahkan lebih banyak",
		addMoreFiles: "Tambahkan lebih banyak berkas",
		addingMoreFiles: "Menambahkan lebih banyak berkas",
		allowAccessDescription: "Untuk mengambil gambar atau merekam video menggunakan kamera Anda, mohon izinkan akses kamera untuk situs ini.",
		allowAccessTitle: "Mohon izinkan akses ke kamera Anda.",
		authenticateWith: "Menghubungkan ke %{pluginName}",
		authenticateWithTitle: "Silahkan mengotentifikasi menggunakan %{pluginName} untuk memilih berkas",
		back: "Kembali",
		browse: "Telusuri",
		browseFiles: "Telusuri",
		cancel: "Batal",
		cancelUpload: "Batalkan pengungahan",
		closeModal: "Tutup Modal",
		companionError: "Koneksi ke Companion gagal",
		complete: "Komplit",
		connectedToInternet: "Terhubung ke Internet",
		copyLink: "Salin tautan",
		copyLinkToClipboardFallback: "Salin URL di bawah ini",
		copyLinkToClipboardSuccess: "Tautan berhasil disalin ke Clipboard",
		creatingAssembly: "Menyiapkan unggahan...",
		creatingAssemblyFailed: "Transloadit: Tidak dapat membuat Assembly",
		dashboardTitle: "Pengunggah Berkas",
		dashboardWindowTitle: "Jendela Pengunggah Berkas (Tekan escape untuk menutup)",
		dataUploadedOfTotal: "%{complete} dari %{total}",
		done: "Selesai",
		dropHint: "Letakkan berkas Anda di sini",
		dropPasteBoth: "Letakkan berkas di sini, tempelkan atau %{browse}",
		dropPasteFiles: "Letakkan berkas di sini, tempelkan atau %{browse}",
		dropPasteFolders: "Letakkan berkas di sini, tempelkan atau %{browse}",
		dropPasteImportBoth: "Letakkan berkas, tempelkan, %{browse} atau impor dari",
		dropPasteImportFiles: "Letakkan berkas, tempelkan, %{browse} atau impor dari",
		dropPasteImportFolders: "Letakkan berkas, tempelkan, %{browse} atau impor dari",
		editFile: "Ubah berkas",
		editImage: "Edit gambar",
		editing: "Mengubah %{file}",
		emptyFolderAdded: "Tidak ada berkas yang ditambahkan dari direktori kosong",
		encoding: "Pengkodean...",
		enterCorrectUrl: "URL salah: Mohon pastikan Anda memasukkan tautan langsung ke berkas",
		enterUrlToImport: "Masukkan URL untuk mengimpor berkas",
		exceedsSize: "Berkas ini melebihi ukuran maksimum yang dibolehkan %{size}",
		failedToFetch: "Companion gagal mengambil URL ini, pastikan sudah benar",
		failedToUpload: "Gagal mengunggah %{file}",
		fileSource: "Sumber berkas: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} dari %{smart_count} berkas terunggah",
			1: "%{complete} dari %{smart_count} berkas terunggah"
		},
		filter: "Penyaring",
		finishEditingFile: "Selesai mengubah berkas",
		folderAdded: {
			0: "Menambahkan %{smart_count} berkas dari %{folder}",
			1: "Menambahkan %{smart_count} berkas dari %{folder}"
		},
		import: "Impor",
		importFrom: "Impor dari %{name}",
		loading: "Memuat...",
		logOut: "Keluar",
		myDevice: "Perangkat Saya",
		noFilesFound: "Anda tidak memiliki berkas atau direktori di sini",
		noInternetConnection: "Tidak ada koneksi Internet",
		openFolderNamed: "Buka direktori %{name}",
		pause: "Tunda",
		pauseUpload: "Tunda pengungahan",
		paused: "Ditunda",
		poweredBy: "Didukung oleh %{uppy}",
		processingXFiles: {
			0: "Pemrosesan %{smart_count} berkas",
			1: "Pemrosesan %{smart_count} berkas"
		},
		removeFile: "Hapus berkas",
		resetFilter: "Setel ulang penyaring",
		resume: "Lanjutkan",
		resumeUpload: "Lanjutkan pengungahan",
		retry: "Ulangi",
		retryUpload: "Ulangi pengungahan",
		saveChanges: "Simpan perubahan",
		selectFileNamed: "Pilih berkas %{name}",
		selectX: {
			0: "Pilih %{smart_count}",
			1: "Pilih %{smart_count}"
		},
		smile: "Senyum!",
		startRecording: "Memulai perekaman video",
		stopRecording: "Menghentikan perekaman video",
		takePicture: "Mengambil gambar",
		timedOut: "Pengunggahan terhenti untuk %{seconds} detik, membatalkan.",
		unselectFileNamed: "Batalkan pemilihan berkas %{name}",
		upload: "Unggah",
		uploadComplete: "Pengunggahan selesai",
		uploadFailed: "Pengunggahan gagal",
		uploadPaused: "Pengunggahan ditunda",
		uploadXFiles: {
			0: "Unggah %{smart_count} berkas",
			1: "Unggah %{smart_count} berkas"
		},
		uploadXNewFiles: {
			0: "Mengunggah +%{smart_count} berkas baru",
			1: "Mengunggah +%{smart_count} berkas baru"
		},
		uploading: "Mengunggah",
		uploadingXFiles: {
			0: "Mengunggah %{smart_count} berkas",
			1: "Mengunggah %{smart_count} berkas"
		},
		xFilesSelected: {
			0: "%{smart_count} berkas terpilih",
			1: "%{smart_count} berkas terpilih"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} berkas lagi ditambahkan",
			1: "%{smart_count} berkas lagi ditambahkan"
		},
		xTimeLeft: "Tersisa %{time}",
		youCanOnlyUploadFileTypes: "Anda hanya dapat menggunggah: %{types}",
		youCanOnlyUploadX: {
			0: "Anda hanya dapat mengunggah %{smart_count} berkas",
			1: "Anda hanya dapat mengunggah %{smart_count} berkas"
		},
		youHaveToAtLeastSelectX: {
			0: "Anda harus memilih minimal %{smart_count} berkas",
			1: "Anda harus memilih minimal %{smart_count} berkas"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.id_ID = Tp);
})), Dp = /* @__PURE__ */ c({ default: () => Op }), Op, kp = o((() => {
	Op = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Op.strings = {
		addMore: "Bæta við",
		addMoreFiles: "Bæta við fleiri skrám",
		addingMoreFiles: "Bæti við fleiri skrám",
		allowAccessDescription: "Vinsamlegast gefðu aðgang að myndavélinni þinni, til þess að taka myndir eða taka upp myndband með myndavélinni þinni.",
		allowAccessTitle: "Vinsamlegast gefðu aðgang að myndavélinni þinni.",
		authenticateWith: "Tengjast %{pluginName}",
		authenticateWithTitle: "Vinsamlegast auðkenndu %{pluginName} til þess að velja skrár",
		back: "Til baka",
		browse: "skoða",
		browseFiles: "skoða",
		cancel: "Hætta við",
		cancelUpload: "Hætta við að hlaða upp",
		closeModal: "Loka glugga",
		companionError: "Tengin mistókst",
		companionUnauthorizeHint: "Til þess að leyfa aðgang að %{provider}, vinsamlegast smelltu hér: %{url}",
		complete: "Lokið",
		connectedToInternet: "Tengdur við internet",
		copyLink: "Afrita hlekk",
		copyLinkToClipboardFallback: "Afrita hlekk",
		copyLinkToClipboardSuccess: "Hlekkur hefur verið afritaður",
		creatingAssembly: "Undirbý að hlaða upp...",
		creatingAssemblyFailed: "Transloadit: Tókst ekki að búa til samsetningu",
		dashboardTitle: "Hlaða upp skrám",
		dashboardWindowTitle: "Upphleðslugluggi (Smelltu á ESC til að loka)",
		dataUploadedOfTotal: "%{complete} af %{total}",
		done: "Búið",
		dropHint: "Dragðu skrárnar þínar hingað",
		dropPasteBoth: "Slepptu skrám hérna, límdu (paste) eða %{browse}",
		dropPasteFiles: "Slepptu skrám hérna, límdu (paste) eða %{browse}",
		dropPasteFolders: "Slepptu skrám hérna, límdu (paste) eða %{browse}",
		dropPasteImportBoth: "Slepptu skrám hérna, límdu (paste), %{browse} eða bættu við frá",
		dropPasteImportFiles: "Slepptu skrám hérna, límdu (paste), %{browse} eða bættu við frá",
		dropPasteImportFolders: "Slepptu skrám hérna, límdu (paste), %{browse} eða bættu við frá",
		editFile: "Breyta skrá",
		editImage: "Breyta mynd",
		editing: "Breyti %{file}",
		emptyFolderAdded: "Engum skrám var bætt við frá tómri möppu",
		encoding: "Dulkóða...",
		enterCorrectUrl: "Röng slóð: Vinsamlegast passaðu að þú sért að bæta við hlekk sem vísar beint á skrá",
		enterUrlToImport: "Settu inn hlekk til að bæta við skrá",
		exceedsSize: "Þessi skrá er stærri en hún má vera  %{size}",
		failedToFetch: "Það tókst ekki að sækja þennan hlekk, vinsamlegast passaðu að hann sé réttur",
		failedToUpload: "Mistókst að upphala %{file}",
		fileSource: "Uppruni skráar: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} af %{smart_count} skrá upphalað",
			1: "%{complete} af %{smart_count} skrám upphalað"
		},
		filter: "Sía",
		finishEditingFile: "Klára að breyta skrá",
		folderAdded: {
			0: "Bætt við %{smart_count} skrá frá %{folder}",
			1: "Bætt við %{smart_count} skrám frá %{folder}"
		},
		generatingThumbnails: "Bý til smámynd ...",
		import: "Flytja inn",
		importFrom: "Flytja inn frá %{name}",
		loading: "Hleð...",
		logOut: "Skrá út",
		myDevice: "Mitt tæki",
		noFilesFound: "Þú átt engar skrár eða möppur hér",
		noInternetConnection: "Engin nettenging",
		openFolderNamed: "Opna möppu %{name}",
		pause: "Gera hlé",
		pauseUpload: "Gera hlé á upphölun",
		paused: "Hlé í gangi",
		poweredBy: "Knúið af %{uppy}",
		processingXFiles: {
			0: "Vinn %{smart_count} skrá",
			1: "Vinn %{smart_count} skrár"
		},
		removeFile: "Fjarlægja skrá",
		resetFilter: "Endurstilla síu",
		resume: "Halda áfram",
		resumeUpload: "Halda áfram með upphölun",
		retry: "Reyna aftur",
		retryUpload: "Reyna upphölun aftur",
		saveChanges: "Vista breytingar",
		selectFileNamed: "Velja skrá %{name}",
		selectX: {
			0: "Velja %{smart_count}",
			1: "Velja %{smart_count}"
		},
		smile: "Brostu!",
		startRecording: "Byrja myndbandsupptöku",
		stopRecording: "Stöðva myndbandsupptöku",
		takePicture: "Taka mynd",
		timedOut: "Upphölun tafin um %{seconds} sekúndur, hætti við.",
		unselectFileNamed: "Afvelja skrá %{name}",
		upload: "Upphala",
		uploadComplete: "Upphölun lokið",
		uploadFailed: "Upphölun mistókst",
		uploadPaused: "Upphölun stöðvuð",
		uploadXFiles: {
			0: "Upphala %{smart_count} skrá",
			1: "Upphala %{smart_count} skrám"
		},
		uploadXNewFiles: {
			0: "Upphala +%{smart_count} skrá",
			1: "Upphala +%{smart_count} skrám"
		},
		uploading: "Upphala",
		uploadingXFiles: {
			0: "Upphala %{smart_count} skrá",
			1: "Upphala %{smart_count} skrám"
		},
		xFilesSelected: {
			0: "%{smart_count} skrá valin",
			1: "%{smart_count} skrár valdar"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fleiri skrá bætt við",
			1: "%{smart_count} fleiri skrám bætt við"
		},
		xTimeLeft: "%{time} eftir",
		youCanOnlyUploadFileTypes: "Þú getur aðeins upphalað: %{types}",
		youCanOnlyUploadX: {
			0: "Þú getur aðeins upphalað %{smart_count} skrá",
			1: "Þú getur aðeins upphalað %{smart_count} skrám"
		},
		youHaveToAtLeastSelectX: {
			0: "Þú verður að velja lágmark %{smart_count} skrá",
			1: "Þú verður að velja lágmark %{smart_count} skrár"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.is_IS = Op);
})), Ap = /* @__PURE__ */ c({ default: () => jp }), jp, Mp = o((() => {
	jp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, jp.strings = {
		addMoreFiles: "Aggiungi più file",
		addingMoreFiles: "Sto aggiungendo altri file",
		allowAccessDescription: "Per acquisire foto o video con la tua fotocamera, abilitane l'accesso da questo sito.",
		allowAccessTitle: "Abilita l'accesso alla fotocamera",
		authenticateWith: "Connetti a %{pluginName}",
		authenticateWithTitle: "Autenticati con %{pluginName} per selezionare i file",
		back: "Indietro",
		addMore: "Aggiungi più",
		browse: "sfoglia",
		browseFiles: "sfoglia",
		cancel: "Annulla",
		cancelUpload: "Annulla upload",
		closeModal: "Chiudi modale",
		companionError: "Connessione con Companion fallita",
		complete: "Completato",
		connectedToInternet: "Connesso a internet",
		copyLink: "Copia link",
		copyLinkToClipboardFallback: "Copia l'URL sottostante",
		copyLinkToClipboardSuccess: "Link copiato",
		creatingAssembly: "Upload in preparazione...",
		creatingAssemblyFailed: "Transloadit: Non ho potuto creare l'Assembly",
		dashboardTitle: "File Uploader",
		dashboardWindowTitle: "File Uploader (Premi Esc per chiudere)",
		dataUploadedOfTotal: "%{complete} di %{total}",
		done: "Fatto",
		dropHint: "Trascina i file qui",
		dropPasteBoth: "Trascina i file qui, incolla o %{browse}",
		dropPasteFiles: "Trascina i file qui, incolla o %{browse}",
		dropPasteFolders: "Trascina i file qui, incolla o %{browse}",
		dropPasteImportBoth: "Trascina i file qui, incolla, %{browse} o importa da",
		dropPasteImportFiles: "Trascina i file qui, incolla, %{browse} o importa da",
		dropPasteImportFolders: "Trascina i file qui, incolla, %{browse} o importa da",
		editFile: "Modifica file",
		editImage: "Modifica immagine",
		editing: "Modifica %{file}",
		emptyFolderAdded: "Nessun file aggiunto dalla cartella vuota",
		encoding: "Encoding...",
		enterCorrectUrl: "URL non corretta: assicurati che sia un link diretto ad un file",
		enterUrlToImport: "Immetti l'URL per importare un file",
		exceedsSize: "Questo file supera la dimensione massima di %{size}",
		failedToFetch: "Impossibile verificare questa URL, assicurati che sia corretta",
		failedToUpload: "Upload del file %{file} non riuscito",
		fileSource: "Sorgente file: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} di %{smart_count} file caricato",
			1: "%{complete} di %{smart_count} file caricati"
		},
		filter: "Filter",
		finishEditingFile: "Finish editing file",
		folderAdded: {
			0: "Aggiunto %{smart_count} file da %{folder}",
			1: "Aggiunti %{smart_count} file da %{folder}"
		},
		import: "Importa",
		importFrom: "Importa da %{name}",
		loading: "Caricamento...",
		logOut: "Logout",
		myDevice: "Il mio computer",
		noFilesFound: "Non hai file o cartelle qui",
		noInternetConnection: "Nessuna connessione a internet",
		pause: "Pausa",
		pauseUpload: "Pausa upload",
		paused: "In pausa",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "Sto processando %{smart_count} file",
			1: "Sto processando %{smart_count} file"
		},
		removeFile: "Rimuovi il file",
		resetFilter: "Ripristina filtro",
		resume: "Riprendi",
		resumeUpload: "Riprendi l'upload",
		retry: "Riprova",
		retryUpload: "Riprova l'upload",
		save: "Salva",
		saveChanges: "Salva le modifiche",
		selectX: {
			0: "Seleziona %{smart_count}",
			1: "Seleziona %{smart_count}"
		},
		smile: "Sorridi!",
		startRecording: "Inizia la registrazione del video",
		stopRecording: "Interrompi la registrazione del video",
		takePicture: "Scatta una foto",
		timedOut: "Upload fermo da %{seconds} secondi, sto annullando.",
		upload: "Upload",
		uploadComplete: "Upload completato",
		uploadFailed: "Upload non riuscito",
		uploadPaused: "Upload in pausa",
		uploadXFiles: {
			0: "Upload di %{smart_count} file",
			1: "Upload di %{smart_count} file"
		},
		uploadXNewFiles: {
			0: "Upload +%{smart_count} file",
			1: "Upload +%{smart_count} file"
		},
		uploading: "In caricamento",
		uploadingXFiles: {
			0: "Caricando %{smart_count} file",
			1: "Caricando %{smart_count} file"
		},
		xFilesSelected: {
			0: "%{smart_count} file selezionato",
			1: "%{smart_count} file selezionati"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} alto file aggiunto",
			1: "%{smart_count} altri file aggiunti"
		},
		xTimeLeft: "%{time} rimasto",
		youCanOnlyUploadFileTypes: "Puoi caricare solamente: %{types}",
		youCanOnlyUploadX: {
			0: "Puoi caricare %{smart_count} solo file",
			1: "Puoi caricare solo %{smart_count} file"
		},
		youHaveToAtLeastSelectX: {
			0: "Devi selezionare almeno %{smart_count} file",
			1: "Devi selezionare almeno %{smart_count} file"
		},
		selectFileNamed: "Seleziona il file %{name}",
		unselectFileNamed: "Deseleziona il file %{name}",
		openFolderNamed: "Cartella aperta %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.it_IT = jp);
})), Np = /* @__PURE__ */ c({ default: () => Pp }), Pp, Fp = o((() => {
	Pp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Pp.strings = {
		addMore: "さらに追加",
		addMoreFiles: "ファイルを追加",
		addingMoreFiles: "ファイルを追加しています",
		allowAccessDescription: "カメラやビデオの機能を使用するには、カメラへのアクセスを許可してください。",
		allowAccessTitle: "カメラへのアクセスを許可してください",
		authenticateWith: "%{pluginName}に接続します",
		authenticateWithTitle: "ファイルを選択するには%{pluginName}で認証してください",
		back: "戻る",
		browse: "参照",
		browseFiles: "参照",
		cancel: "キャンセル",
		cancelUpload: "アップロードをキャンセル",
		closeModal: "モーダルを閉じる",
		companionError: "Companionとの接続に失敗しました",
		complete: "完了しました",
		compressingImages: "画像を圧縮中...",
		compressedX: "画像圧縮により%{size}を節約しました",
		connectedToInternet: "インターネットに接続しました",
		copyLink: "リンクをコピー",
		copyLinkToClipboardFallback: "以下のURLをコピー",
		copyLinkToClipboardSuccess: "リンクをクリップボードにコピーしました",
		creatingAssembly: "アップロードの準備をしています...",
		creatingAssemblyFailed: "Transloadit: アセンブリを作成できませんでした",
		dashboardTitle: "ファイルアップローダー",
		dashboardWindowTitle: "ファイルアップローダーウィンドウ（閉じるにはEscapeキーを押してください）",
		dataUploadedOfTotal: "%{total} %{complete}",
		done: "完了しました",
		dropHint: "ここにファイルをドロップしてください",
		dropPasteBoth: "ここにファイルをドロップするか、貼り付けるか、%{browse}してください",
		dropPasteFiles: "ここにファイルをドロップするか、貼り付けるか、%{browse}してください",
		dropPasteFolders: "ここにファイルをドロップするか、貼り付けるか、%{browse}してください",
		dropPasteImportBoth: "ここにファイルをドロップするか、貼り付けるか、%{browse}するか、以下からインポートしてください",
		dropPasteImportFiles: "ここにファイルをドロップするか、貼り付けるか、%{browse}するか、以下からインポートしてください",
		dropPasteImportFolders: "ここにファイルをドロップするか、貼り付けるか、%{browse}するか、以下からインポートしてください",
		editFile: "ファイルを編集",
		editImage: "画像を編集",
		editing: "%{file}を編集しています",
		emptyFolderAdded: "フォルダが空なためファイルが追加されませんでした",
		encoding: "エンコードしています...",
		enterCorrectUrl: "不正なURL: ファイルへの直接リンクが入力されていることを確認してください",
		enterUrlToImport: "ファイルをインポートするためのURLを入力してください",
		exceedsSize: "ファイルサイズが大きすぎます %{size}",
		failedToFetch: "CompanionがURLを取得できませんでした。URLが正しいか確認してください",
		failedToUpload: "%{file}のアップロードに失敗しました",
		fileSource: "元ファイル：%{name}",
		filesUploadedOfTotal: {
			0: "%{smart_count} 個のファイルのアップロードが%{complete}",
			1: "%{smart_count} 個のファイルのアップロードが%{complete}"
		},
		filter: "フィルタ",
		finishEditingFile: "ファイルの編集を終了",
		folderAdded: {
			0: "%{folder} から%{smart_count} 個のファイルを追加しました",
			1: "%{folder} から%{smart_count} 個のファイルを追加しました"
		},
		import: "インポート",
		importFrom: "%{name}からインポート",
		loading: "ロード中...",
		logOut: "ログアウト",
		myDevice: "マイデバイス",
		noFilesFound: "ファイルやフォルダがありません",
		noInternetConnection: "インターネット接続がありません",
		pause: "一時停止",
		pauseUpload: "アップロードを一時停止",
		paused: "停止中",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "%{smart_count} ファイル処理中",
			1: "%{smart_count} ファイル処理中"
		},
		removeFile: "ファイルを消す",
		resetFilter: "フィルタをリセット",
		resume: "再開",
		resumeUpload: "アップロードを再開",
		retry: "リトライ",
		retryUpload: "アップロードをリトライ",
		saveChanges: "変更を保存",
		selectX: {
			0: "%{smart_count} を選択",
			1: "%{smart_count} を選択"
		},
		smile: "スマイル〜！",
		startRecording: "録画開始",
		stopRecording: "録画停止",
		takePicture: "写真を撮る",
		timedOut: "アップロードが %{seconds} 秒間止まった為中断しました",
		upload: "アップロード",
		uploadComplete: "アップロード完了",
		uploadFailed: "アップロード失敗",
		uploadPaused: "アップロード一時停止",
		uploadXFiles: {
			0: "%{smart_count} ファイルをアップロード",
			1: "%{smart_count} ファイルをアップロード"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} ファイルをアップロード",
			1: "+%{smart_count} ファイルをアップロード"
		},
		uploading: "アップロード中",
		uploadingXFiles: {
			0: "%{smart_count} ファイルアップロード中",
			1: "%{smart_count} ファイルアップロード中"
		},
		xFilesSelected: {
			0: "%{smart_count} ファイルを選択",
			1: "%{smart_count} ファイルを選択"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ファイルを追加",
			1: "%{smart_count} ファイルを追加"
		},
		xTimeLeft: "残り %{time}",
		youCanOnlyUploadFileTypes: "許可されているファイル形式は次の物です: %{types}",
		youCanOnlyUploadX: {
			0: "%{smart_count} ファイル数のみアップロード可能です",
			1: "%{smart_count} ファイル数のみアップロード可能です"
		},
		youHaveToAtLeastSelectX: {
			0: "最低でも %{smart_count} ファイル選択してください",
			1: "最低でも %{smart_count} ファイル選択してください"
		},
		selectFileNamed: "ファイルを選ぶ %{name}",
		unselectFileNamed: "ファイルの選択を解除 %{name}",
		openFolderNamed: "開いたフォルダ %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ja_JP = Pp);
})), Ip = /* @__PURE__ */ c({ default: () => Lp }), Lp, Rp = o((() => {
	Lp = {
		strings: {},
		pluralize() {
			return 0;
		}
	}, Lp.strings = {
		addMore: "파일 추가",
		addMoreFiles: "파일 추가",
		addingMoreFiles: "파일 추가 중",
		allowAccessDescription: "카메라를 이용해 사진이나 영상을 찍기 위해서 이 사이트의 카메라 접근 권한을 허용해 주세요.",
		allowAccessTitle: "카메라 사용 권한을 허용해 주세요.",
		authenticateWith: "%{pluginName} 연결",
		authenticateWithTitle: "파일을 선택하기 위해 %{pluginName}에 연결해 주세요.",
		back: "뒤로",
		browse: "선택",
		browseFiles: "파일 선택",
		browseFolders: "폴더 선택",
		cancel: "취소",
		cancelUpload: "업로드 취소",
		closeModal: "창 닫기",
		companionError: "연결 실패",
		companionUnauthorizeHint: "%{provider} 연결 해제를 원하시면 %{url}에 방문하세요",
		complete: "완료",
		connectedToInternet: "인터넷에 연결됨",
		copyLink: "링크 복사",
		copyLinkToClipboardFallback: "아래 URL을 복사하세요",
		copyLinkToClipboardSuccess: "링크가 클립보드에 저장됨",
		creatingAssembly: "업로드 준비 중...",
		creatingAssemblyFailed: "Transloadit: 업로드를 생성할 수 없음",
		dashboardTitle: "파일 업로더",
		dashboardWindowTitle: "파일 업로더 창 (ESC를 누르면 닫힙니다.)",
		dataUploadedOfTotal: "%{complete} / %{total}",
		done: "완료",
		dropHint: "여기에 파일을 드래그 앤 드롭 해주세요.",
		dropPasteBoth: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFiles}, %{browseFolders}",
		dropPasteFiles: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFiles}",
		dropPasteFolders: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFolders}",
		dropPasteImportBoth: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFiles}, %{browseFolders}, 이 경로에서 입수 :",
		dropPasteImportFiles: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFiles}, 이 경로에서 입수 :",
		dropPasteImportFolders: "여기에 파일을 드래그 앤 드롭 하거나, %{browseFolders}, 이 경로에서 입수 :",
		editFile: "파일 수정",
		editImage: "이미지 수정",
		editing: "%{file} 수정 중",
		emptyFolderAdded: "빈 폴더입니다.",
		encoding: "인코딩 중...",
		enterCorrectUrl: "옳지 않은 URL: 파일 주소를 확인해 주세요.",
		enterUrlToImport: "파일 URL을 입력해 주세요.",
		exceedsSize: "업로드 허용 용량 초과 %{size}",
		failedToFetch: "URL 가져오기 실패. 주소를 확인해 주세요.",
		failedToUpload: "%{file} 업로드 실패",
		fileSource: "파일 소스: %{name}",
		filesUploadedOfTotal: "%{complete} / %{smart_count} 완료됨",
		filter: "필터",
		finishEditingFile: "파일 수정을 완료하세요.",
		folderAdded: "%{folder}에서 파일 %{smart_count}개 추가",
		generatingThumbnails: "썸네일 생성 중...",
		import: "가져오기",
		importFrom: "%{name}에서 가져오기",
		loading: "불러오는 중...",
		logOut: "로그아웃",
		myDevice: "내 기기",
		noFilesFound: "파일이나 폴더가 없음",
		noInternetConnection: "인터넷 연결 안 됨",
		openFolderNamed: "%{name} 폴더 열기",
		pause: "일시정지",
		pauseUpload: "업로드 일시정지",
		paused: "일시정지 됨",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: "%{smart_count}개의 파일 처리 중",
		removeFile: "파일 제거",
		resetFilter: "필터 초기화",
		resume: "재개",
		resumeUpload: "업로드 재개",
		retry: "재시도",
		retryUpload: "업로드 재시도",
		saveChanges: "변경사항 저장",
		selectFileNamed: "%{name} 파일 선택",
		selectX: "%{smart_count}개 선택",
		smile: "Smile!",
		startRecording: "비디오 녹화 시작",
		stopRecording: "비디오 녹화 정지",
		takePicture: "사진 촬영",
		timedOut: "%{seconds}초 동안 업로드 정지되어 업로드를 취소합니다.",
		unselectFileNamed: "%{name} 파일 선택 해제",
		upload: "업로드",
		uploadComplete: "업로드 완료",
		uploadFailed: "업로드 실패",
		uploadPaused: "업로드 정지됨",
		uploadXFiles: "%{smart_count}개의 파일 업로드",
		uploadXNewFiles: "+%{smart_count}개의 파일 업로드",
		uploading: "업로드 중",
		uploadingXFiles: "%{smart_count}개의 파일 업로드 중",
		xFilesSelected: "%{smart_count}개의 파일 선택됨",
		xMoreFilesAdded: "%{smart_count}개의 파일이 더 추가 됨",
		xTimeLeft: "%{time} 남음",
		youCanOnlyUploadFileTypes: "업로드 가능 형식: %{types}",
		youCanOnlyUploadX: "%{smart_count}개의 파일만 업로드할 수 있습니다",
		youHaveToAtLeastSelectX: "최소 %{smart_count}개의 파일을 선택해야 합니다"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ko_KR = Lp);
})), zp = /* @__PURE__ */ c({ default: () => Bp }), Bp, Vp = o((() => {
	Bp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Bp.strings = {
		addBulkFilesFailed: {
			0: "Алдаа гарсны улмаас %{smart_count} файл нэмж чадсангүй",
			1: "Алдаа гарсны улмаас %{smart_count} файл нэмж чадсангүй"
		},
		addedNumFiles: "%{numFiles} файл нэмэгдсэн",
		addingMoreFiles: "Файл нэмж байна",
		additionalRestrictionsFailed: "%{count} шаардлага хангагдаагүй байна",
		addMore: "Нэмэх",
		addMoreFiles: "Файл нэмэх",
		aggregateExceedsSize: "Оруулж болох файлын дээд хэмжээ %{sizeAllowed} ба таны сонгосон файлын хэмжээ %{size} буюу дээд хэмжээнээс хэтэрсэн байна.",
		allFilesFromFolderNamed: "%{name} хавтасны бүх файлууд",
		allowAccessDescription: "Камераар зураг авах эсвэл бичлэг хийхийн тулд таны төхөөрөмжийн камерт хандах эрхийг зөвшөөрнө үү.",
		allowAccessTitle: "Камерт хандах эрхийг зөвшөөрнө үү",
		allowAudioAccessDescription: "Аудио бичлэг хийхийн тулд микрофонд хандах эрхийг зөвшөөрнө үү.",
		allowAudioAccessTitle: "Микрофонд хандах эрхийг зөвшөөрнө үү",
		aspectRatioLandscape: "Өргөн тайралт (16:9)",
		aspectRatioPortrait: "Босоо тайралт (9:16)",
		aspectRatioSquare: "Дөрвөлжин тайралт",
		authAborted: "Нэвтрэлт цуцлагдсан",
		authenticate: "Холбогдох",
		authenticateWith: "%{pluginName} үйлчилгээтэй холбогдох",
		authenticateWithTitle: "%{pluginName} үйлчилгээрүү нэвтрэн оруулах файлаа сонгоно уу",
		back: "Буцах",
		browse: "сонгох",
		browseFiles: "файл сонгох",
		browseFolders: "хавтас сонгох",
		cancel: "Цуцлах",
		cancelUpload: "Хуулахыг болиулах",
		closeModal: "Модал хаах",
		companionError: "Холболт амжилтгүй боллоо",
		companionUnauthorizeHint: "%{url} хаягруу орон %{provider} аккаунтаа салгаарай",
		complete: "Дууссан",
		compressedX: "Зургийг шахаад %{size} хэмнэсэн",
		compressingImages: "Зургийг шахаж байна...",
		connectedToInternet: "Интернэтэд холбогдсон",
		copyLink: "Холбоос хуулах",
		copyLinkToClipboardFallback: "Доор байгаа URL-ийг хуулах",
		copyLinkToClipboardSuccess: "Холбоос буферт хуулагдсан.",
		creatingAssembly: "Хуулахад бэлдэж байна...",
		creatingAssemblyFailed: "Transloadit: Хуулах зааварчилгаа үүсгэж чадсангүй",
		dashboardTitle: "Uppy Самбар",
		dashboardWindowTitle: "Uppy Цонх (escape товчоор хаана)",
		dataUploadedOfTotal: "%{total}-н %{complete}",
		dataUploadedOfUnknown: "%{complete}",
		discardMediaFile: "Медиаг хаях",
		discardRecordedFile: "Бичсэн файлыг хаях",
		done: "Гүйцсэн",
		dropHereOr: "%{browse} эсвэл энд наах",
		dropHint: "Файлуудаа энд буулгана уу",
		dropPasteBoth: "%{browseFiles}, %{browseFolders} эсвэл энд наах",
		dropPasteFiles: "%{browseFiles} эсвэл энд наах",
		dropPasteFolders: "%{browseFolders} эсвэл энд наах",
		dropPasteImportBoth: "%{browseFiles}, %{browseFolders}, энд наах эсвэл:",
		dropPasteImportFiles: "%{browseFiles}, энд наах эсвэл:",
		dropPasteImportFolders: "%{browseFolders}, энд наах эсвэл:",
		editFile: "Файл засварлах",
		editFileWithFilename: "Файл засварлах %{file}",
		editImage: "Зураг засварлах",
		editing: "%{file}-г засварлаж байна",
		emptyFolderAdded: "Хоосон хавтас байна",
		encoding: "Энкод хийгдэж байна...",
		enterCorrectUrl: "Алдаатай URL: Файлыг заасан шууд холбоос оруулна",
		enterTextToSearch: "Хайлт хийх текстээ оруулна уу",
		enterUrlToImport: "Файл импортлох URL",
		error: "Алдаа",
		exceedsSize: "Зөвшөөрөгдсөн дээд хэмжээ %{size} ба %{file} хэтэрсэн байна",
		failedToFetch: "URL хаягийг боловсруулж чадсангүй, оруулсан хаяг зөв эсэхийг шалгана уу",
		failedToUpload: "%{file}-г хуулж чадсангүй",
		filesUploadedOfTotal: {
			0: "%{smart_count} файлаас %{complete} хуулагдсан",
			1: "%{smart_count} файлаас %{complete} хуулагдсан"
		},
		filter: "Шүүлтүүр",
		finishEditingFile: "Дуусгах",
		flipHorizontal: "Хөндлөнгөөр эргүүлэх",
		folderAdded: {
			0: "%{folder} хавтаснаас %{smart_count} файл нэмэгдсэн",
			1: "%{folder} хавтаснаас %{smart_count} файл нэмэгдсэн"
		},
		folderAlreadyAdded: "\"%{folder}\" хавтсыг аль хэдий нь оруулсан байна",
		generatingThumbnails: "thumbnails үүсгэж байна...",
		import: "Импорт",
		importFiles: "Файл импортлох:",
		importFrom: "%{name}-с импортлох",
		inferiorSize: "Энэ файл зөвшөөрөгдсөн хэмжээнээс(%{size}) жижиг байна",
		loadedXFiles: "%{numFiles} файл ачаалсан",
		loading: "Ачаалж байна...",
		logIn: "Нэвтрэх",
		logOut: "Гарах",
		micDisabled: "Микрофонд хандах эрхийг хэрэглэгч түдгэлзүүлсэн",
		missingRequiredMetaField: "Шаардлагатай мета мэдээлэл байхгүй байна",
		missingRequiredMetaFieldOnFile: "Шаардлагатай мета мэдээлэл %{fileName} файлд алга",
		missingRequiredMetaFields: {
			0: "Дутуу мета мэдээлэл: %{fields}.",
			1: "Дутуу мета мэдээлэл: %{fields}."
		},
		myDevice: "Миний төхөөрөмж",
		noAudioDescription: "Аудио бичлэг хийхийн тулд микрофон эсвэл ямар нэг аудио оролтын төхөөрөмж холбоно уу",
		noAudioTitle: "Микрофон ашиглах боломжгүй",
		noCameraDescription: "Зураг авах эсвэл видео бичлэг хийхийн тулд камер холбоно уу",
		noCameraTitle: "Камер ашиглах боломжгүй",
		noDuplicates: "'%{fileName}' файлыг давхардуулах боломжгүй",
		noFilesFound: "Энд ямар ч файл эсвэл хавтас алга",
		noInternetConnection: "Интернэтэд холбогдоогүй байна",
		noMoreFilesAllowed: "Файл нэмэх боломжгүй",
		noSearchResults: "Харамсалтай нь хайлтын үр дүн 0",
		openFolderNamed: "%{name} хавтсыг нээх",
		pause: "Зогсоох",
		paused: "Зогсоосон",
		pauseUpload: "Хуулахыг зогсоох",
		pickFiles: "Файл сонгох",
		pickPhotos: "Фото сонгох",
		pleaseWait: "Түр хүлээнэ үү",
		pluginNameAudio: "Аудио",
		pluginNameBox: "Box",
		pluginNameCamera: "Камер",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Дэлгэцийн бичлэг",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Холбоос",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "Файлын WebDAV URL (жишээлбэл ownCloud эсвэл Nextcloud)",
		poweredBy: "%{uppy} ашиглан бүтээв",
		processingXFiles: {
			0: "%{smart_count} файл боловсруулж байна",
			1: "%{smart_count} файл боловсруулж байна"
		},
		recording: "Бичиж байна",
		recordingLength: "Бичлэгийн урт %{recording_length}",
		recordingStoppedMaxSize: "Файлын хэмжээ зөвшөөрөгдсөн дээд хязгаарт хүрсэн тул бичлэгийг зогсоосон",
		recordVideoBtn: "Видео Бичлэг",
		recoveredAllFiles: "Бүх файлыг сэргээсэн. Хуулах процессыг үргэлжлүүлж болно.",
		recoveredXFiles: {
			0: "1 файлыг сэргээж чадсангүй. Дахин сонгоод хуулах процессыг үргэлжлүүлнэ үү.",
			1: "%{smart_count} файлыг сэргээж чадсангүй. Дахин сонгоод хуулах процессыг үргэлжлүүлнэ үү."
		},
		removeFile: "Файл устгах",
		reSelect: "Дахин сонгох",
		resetFilter: "Шүүлтүүр цэвэрлэх",
		resetSearch: "Хайлт цэвэрлэх",
		resume: "Үргэлжлүүлэх",
		resumeUpload: "Үргэлжлүүлэн хуулах",
		retry: "Дахин оролдох",
		retryUpload: "Дахин оролдох",
		revert: "Буцаах",
		rotate: "90° эргүүлэх",
		save: "Хадгалах",
		saveChanges: "Хадгалах",
		search: "Хайлт",
		searchImages: "Зураг хайх",
		selectX: {
			0: "Сонгосон %{smart_count}",
			1: "Сонгосон %{smart_count}"
		},
		sessionRestored: "Session сэргээгдсэн",
		showErrorDetails: "Алдааны мэдээллийг харуулах",
		signInWithGoogle: "Google-ээр нэвтрэх",
		smile: "Инээгээрэй!",
		startAudioRecording: "Аудио бичлэгийг эхлүүлэх",
		startCapturing: "Дэлгэцийн бичлэгийг эхлүүлэх",
		startRecording: "Видео бичлэгийг эхлүүлэх",
		stopAudioRecording: "Аудио бичлэгийг зогсоох",
		stopCapturing: "Дэлгэцийн бичлэгийг зогсоох",
		stopRecording: "Видео бичлэгийг зогсоох",
		streamActive: "Актив урсгал",
		streamPassive: "Пассив урсгал",
		submitRecordedFile: "Бичсэн файлыг оруулах",
		takePicture: "Зураг авах",
		takePictureBtn: "Зураг авах",
		takeScreenshot: "Дэлгэцийн зураг авах",
		unnamed: "Нэргүй",
		upload: "Хуулах",
		uploadComplete: "Хуулж дууссан",
		uploadFailed: "Хуулалт амжилтгүй",
		uploading: "Хуулж байна",
		uploadingXFiles: {
			0: "%{smart_count} файл хуулж байна",
			1: "%{smart_count} файл хуулж байна"
		},
		uploadPaused: "Зогсоосон",
		uploadStalled: "Хуулах процесс %{seconds} секундын турш ямар ахицгүй байна. Дахин хуулсан нь дээр байх.",
		uploadXFiles: {
			0: "%{smart_count} файл хуулах",
			1: "%{smart_count} файл хуулах"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} файл хуулах",
			1: "+%{smart_count} файл хуулах"
		},
		xFilesSelected: {
			0: "%{smart_count} файл сонгосон байна",
			1: "%{smart_count} файл сонгосон байна"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} файл нэмэгдсэн",
			1: "%{smart_count} файл нэмэгдсэн"
		},
		xTimeLeft: "%{time} үлдсэн",
		youCanOnlyUploadFileTypes: "Зөвшөөрөгдсөн файлын төрөл: %{types}",
		youCanOnlyUploadX: {
			0: "Та %{smart_count} файл хуулах боломжтой",
			1: "Та %{smart_count} файл хуулах боломжтой"
		},
		youHaveToAtLeastSelectX: {
			0: "Багадаа %{smart_count} файл сонгох ёстой",
			1: "Багадаа %{smart_count} файл сонгох ёстой"
		},
		zoomIn: "Ойртуулах",
		zoomOut: "Холдуулах"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.mn_MN = Bp);
})), Hp = /* @__PURE__ */ c({ default: () => Up }), Up, Wp = o((() => {
	Up = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Up.strings = {
		addBulkFilesFailed: {
			0: "Gagal untuk menambah %{smart_count} fail kerana ralat dalaman",
			1: "Gagal untuk menambah %{smart_count} fail kerana ralat dalaman"
		},
		addedNumFiles: "%{numFiles} fail berhasil ditambah",
		addingMoreFiles: "Menambah lebih banyak fail",
		additionalRestrictionsFailed: "%{count} sekatan tambahan tidak dipenuhi",
		addMore: "Tambah lagi",
		addMoreFiles: "Tambah lebih banyak fail",
		aggregateExceedsSize: "Anda memilih %{size} fail, tetapi saiz maksimum yang dibenarkan adalah %{sizeAllowed}",
		allFilesFromFolderNamed: "Semua fail daripada folder %{name}",
		allowAccessDescription: "Untuk mengambil gambar atau merakam video menggunakan kamera anda, sila benarkan akses kamera untuk laman ini.",
		allowAccessTitle: "Sila benarkan akses ke kamera anda",
		allowAudioAccessDescription: "Untuk merakam audio, sila benarkan akses mikrofon untuk laman ini.",
		allowAudioAccessTitle: "Sila benarkan akses ke mikrofon anda",
		aspectRatioLandscape: "Pangkas landskap (16:9)",
		aspectRatioPortrait: "Pangkas potret (9:16)",
		aspectRatioSquare: "Pangkas segi empat",
		authAborted: "Pengesahan dibatalkan",
		authenticateWith: "Sambung ke %{pluginName}",
		authenticateWithTitle: "Sila sahkan dengan %{pluginName} untuk memilih fail",
		back: "Kembali",
		browse: "semak imbas",
		browseFiles: "semak imbas fail",
		browseFolders: "semak imbas folder",
		cancel: "Batal",
		cancelUpload: "Batal muat naik",
		closeModal: "Tutup Modal",
		companionError: "Sambungan ke Companion gagal",
		companionUnauthorizeHint: "Untuk tidak membenarkan akaun %{provider} anda, sila pergi ke %{url}",
		complete: "Selesai",
		compressedX: "%{size} tersimpan dengan memampatkan gambar",
		compressingImages: "Mampatkan gambar...",
		connectedToInternet: "Terhubung ke Internet",
		copyLink: "Salin pautan",
		copyLinkToClipboardFallback: "Salin URL di bawah",
		copyLinkToClipboardSuccess: "Pautan disalin ke papan keratan.",
		creatingAssembly: "Menyediakan muat naik...",
		creatingAssemblyFailed: "Transloadit: Tidak dapat membuat Perhimpunan",
		dashboardTitle: "Papan Pemuka Uppy",
		dashboardWindowTitle: "Tetingkap Papan Pemuka Uppy (Tekan escape untuk menutup)",
		dataUploadedOfTotal: "%{complete} dari %{total}",
		discardRecordedFile: "Buang fail yang dirakam",
		done: "Selesai",
		dropHint: "Letakkan fail anda di sini",
		dropPasteBoth: "Letakkan fail di sini, %{browseFiles} atau %{browseFolders}",
		dropPasteFiles: "Letakkan fail di sini atau %{browseFiles}",
		dropPasteFolders: "Letakkan folder di sini atau %{browseFolders}",
		dropPasteImportBoth: "Letakkan folder di sini, %{browseFiles}, %{browseFolders} atau import daripada:",
		dropPasteImportFiles: "Letakkan fail di sini, %{browseFiles} atau import daripada:",
		dropPasteImportFolders: "Letakkan fail di sini, %{browseFolders} atau import daripada:",
		editFile: "Edit fail",
		editFileWithFilename: "Edit fail %{file}",
		editImage: "Edit gambar",
		editing: "Mengedit %{file}",
		emptyFolderAdded: "Tiada fail yang ditambah daripada folder kosong",
		encoding: "Pengekodan...",
		enterCorrectUrl: "URL salah: Sila pastikan anda memasukkan pautan terus ke fail",
		enterTextToSearch: "Masukkan teks untuk mencari imej",
		enterUrlToImport: "Masukkan URL untuk mengimport fail",
		error: "Ralat",
		exceedsSize: "%{file} melebihi saiz maksimum yang dibenarkan iaitu %{size}",
		failedToFetch: "Companion gagal mengambil URL ini, sila pastikan URL betul",
		failedToUpload: "Gagal memuat naik %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} dari %{smart_count} fail dimuat naik",
			1: "%{complete} dari %{smart_count} fail dimuat naik"
		},
		filter: "Tapis",
		finishEditingFile: "Selesai mengedit fail",
		flipHorizontal: "Flip mendatar",
		folderAdded: {
			0: "%{smart_count} fail ditambah dari %{folder}",
			1: "%{smart_count} fail ditambah dari %{folder}"
		},
		folderAlreadyAdded: "Folder \"%{folder}\" telah pun ditambah",
		generatingThumbnails: "Menjana lakaran kecil...",
		import: "Import",
		importFiles: "Import fail dari:",
		importFrom: "Import dari %{name}",
		inferiorSize: "Fail ini lebih kecil daripada saiz yang dibenarkan iaitu %{size}",
		loadedXFiles: "%{numFiles} fail telah dimuatkan",
		loading: "Memuatkan...",
		logOut: "Log keluar",
		micDisabled: "Akses mikrofon dinafikan oleh pengguna",
		missingRequiredMetaField: "Medan meta yang diperlukan tiada",
		missingRequiredMetaFieldOnFile: "Tiada medan meta yang diperlukan dalam %{fileName}",
		missingRequiredMetaFields: {
			0: "Medan meta yang diperlukan tiada: %{fields}.",
			1: "Medan meta yang diperlukan tiada: %{fields}."
		},
		myDevice: "Peranti Saya",
		noAudioDescription: "Untuk merakam audio, sila sambungkan mikrofon atau peranti input audio lain",
		noAudioTitle: "Microphone Not Available",
		noCameraDescription: "Untuk mengambil gambar atau merakam video, sila sambungkan peranti kamera",
		noCameraTitle: "Kamera Tidak Tersedia",
		noDuplicates: "Tidak boleh menambah fail pendua '%{fileName}', ia sudah wujud",
		noFilesFound: "Anda tidak mempunyai fail atau folder di sini",
		noInternetConnection: "Tiada sambungan Internet",
		noMoreFilesAllowed: "Tidak boleh menambah lebih banyak fail",
		noSearchResults: "Malangnya, tiada hasil untuk carian ini",
		openFolderNamed: "Buka folder %{name}",
		pause: "Jeda",
		paused: "Dijeda",
		pauseUpload: "Jeda muat naik",
		pluginNameAudio: "Audio",
		pluginNameBox: "Kotak",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Screencast",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Link",
		pluginNameZoom: "Zoom",
		poweredBy: "Dikuasakan oleh %{uppy}",
		processingXFiles: {
			0: "Memproses %{smart_count} fail",
			1: "Memproses %{smart_count} fail"
		},
		recording: "Merakam",
		recordingLength: "Panjang rakaman %{recording_length}",
		recordingStoppedMaxSize: "Rakaman dihentikan kerana saiz fail hampir melebihi had",
		recordVideoBtn: "Rakam Video",
		recoveredAllFiles: "Kami memulihkan semua fail. Anda kini boleh menyambung semula muat naik.",
		recoveredXFiles: {
			0: "Kami tidak dapat memulihkan 1 fail sepenuhnya. Sila pilih semula dan sambung muat naik.",
			1: "Kami tidak dapat memulihkan %{smart_count} fail sepenuhnya. Sila pilih semula dan sambung muat naik."
		},
		removeFile: "Buang fail",
		reSelect: "Pilih semula",
		resetFilter: "Tetap semua tapisan",
		resetSearch: "Tetap semua carian",
		resume: "Sambung semula",
		resumeUpload: "Sambung semula muat naik",
		retry: "Cuba semula",
		retryUpload: "Cuba semula muat naik",
		revert: "Tetap semula",
		rotate: "Putar 90°",
		save: "Simpan",
		saveChanges: "Simpan perubahan",
		search: "Carian",
		searchImages: "Cari gambar",
		selectX: {
			0: "Pilih %{smart_count}",
			1: "Pilih %{smart_count}"
		},
		sessionRestored: "Sesi dipulihkan",
		showErrorDetails: "Tunjukkan butiran ralat",
		signInWithGoogle: "Log masuk dengan Google",
		smile: "Senyum!",
		startAudioRecording: "Mulakan rakaman audio",
		startCapturing: "Mulakan tangkapan skrin",
		startRecording: "Mulakan rakaman video",
		stopAudioRecording: "Hentikan rakaman audio",
		stopCapturing: "Hentikan tangkapan skrin",
		stopRecording: "Hentikan rakaman video",
		streamActive: "Strim aktif",
		streamPassive: "Strim pasif",
		submitRecordedFile: "Serahkan fail yang direkodkan",
		takePicture: "Ambil gambar",
		takePictureBtn: "Ambil Gambar",
		unnamed: "Tidak bernama",
		upload: "Muat naik",
		uploadComplete: "Muat naik selesai",
		uploadFailed: "Muat naik gagal",
		uploading: "Memuat naik",
		uploadingXFiles: {
			0: "Muat naik %{smart_count} fail",
			1: "Muat naik %{smart_count} fail"
		},
		uploadPaused: "Muat naik dijeda",
		uploadStalled: "Muat naik tidak membuat sebarang kemajuan selama %{seconds} saat. Anda mungkin mahu mencubanya semula.",
		uploadXFiles: {
			0: "Muat naik %{smart_count} fail",
			1: "Muat naik %{smart_count} fail"
		},
		uploadXNewFiles: {
			0: "Muat naik +%{smart_count} fail",
			1: "Muat naik +%{smart_count} fail"
		},
		xFilesSelected: {
			0: "%{smart_count} fail dipilih",
			1: "%{smart_count} fail dipilih"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} lagi fail ditambah",
			1: "%{smart_count} lagi fail ditambah"
		},
		xTimeLeft: "%{time} lagi tinggal",
		youCanOnlyUploadFileTypes: "Anda hanya boleh muat naik: %{types}",
		youCanOnlyUploadX: {
			0: "Anda hanya boleh muat naik %{smart_count} fail",
			1: "Anda hanya boleh muat naik %{smart_count} fail"
		},
		youHaveToAtLeastSelectX: {
			0: "Anda perlu memilih sekurang-kurangnya %{smart_count} fail",
			1: "Anda perlu memilih sekurang-kurangnya %{smart_count} fail"
		},
		zoomIn: "Zum masuk",
		zoomOut: "Zum keluar"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ms_MY = Up);
})), Gp = /* @__PURE__ */ c({ default: () => Kp }), Kp, qp = o((() => {
	Kp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Kp.strings = {
		addBulkFilesFailed: {
			0: "Kunne ikke legge til %{smart_count} fil på grunn av en intern feil",
			1: "Kunne ikke legge til %{smart_count} filer på grunn av interne feil"
		},
		addedNumFiles: "La til %{numFiles} fil(er)",
		addingMoreFiles: "Legger til flere filer",
		additionalRestrictionsFailed: "%{count} ekstra restriksjoner ble ikke oppfylt",
		addMore: "Legg til",
		addMoreFiles: "Legg til filer",
		aggregateExceedsSize: "Du valgte %{size} med filer, men maksimal tillatt størrelse er %{sizeAllowed}",
		allFilesFromFolderNamed: "Alle filer fra mappen %{name}",
		allowAccessDescription: "For å kunne ta bilder eller spille inn video må du gi siden tilgang til å bruke ditt kamera.",
		allowAccessTitle: "Vennligst gi tilgang til ditt kamera",
		allowAudioAccessDescription: "For å kunne ta opp lyd må du gi siden tilgang til mikrofonen.",
		allowAudioAccessTitle: "Vennligst gi tilgang til mikrofonen din",
		aspectRatioLandscape: "Beskjær landskap (16:9)",
		aspectRatioPortrait: "Beskjær portrett (9:16)",
		aspectRatioSquare: "Beskjær kvadrat",
		authAborted: "Autentisering avbrutt",
		authenticate: "Koble til",
		authenticateWith: "Koble til %{pluginName}",
		authenticateWithTitle: "Koble til %{pluginName} for å velge filer",
		back: "Tilbake",
		browse: "velg",
		browseFiles: "velg filer",
		browseFolders: "velg mapper",
		cancel: "Avbryt",
		cancelUpload: "Avbryt opplasting",
		closeModal: "Lukk vindu",
		companionError: "Kobling til Companion feilet",
		companionUnauthorizeHint: "For å logge ut av din %{provider}-konto, gå til %{url}",
		complete: "Fullført",
		compressedX: "Sparte %{size} ved å komprimere bilder",
		compressingImages: "Komprimerer bilder...",
		connectedToInternet: "Koblet til internett",
		copyLink: "Kopier lenke",
		copyLinkToClipboardFallback: "Kopier URL under",
		copyLinkToClipboardSuccess: "Lenke kopiert",
		creatingAssembly: "Forbereder opplasting...",
		creatingAssemblyFailed: "Transloadit: Kunne ikke opprette Assembly",
		dashboardTitle: "Filopplaster",
		dashboardWindowTitle: "Opplastingsvindu (Trykk Esc-knappen for å lukke)",
		dataUploadedOfTotal: "%{complete} av %{total}",
		dataUploadedOfUnknown: "%{complete} av ukjent",
		discardMediaFile: "Forkast media",
		discardRecordedFile: "Forkast opptak",
		done: "Ferdig",
		dropHereOr: "Slipp filer her eller %{browse}",
		dropHint: "Dra filer hit",
		dropPasteBoth: "Dra filer hit, %{browseFiles} eller %{browseFolders}",
		dropPasteFiles: "Dra filer hit eller %{browseFiles}",
		dropPasteFolders: "Dra filer hit eller %{browseFolders}",
		dropPasteImportBoth: "Dra filer hit, %{browseFiles}, %{browseFolders} eller importer fra:",
		dropPasteImportFiles: "Dra filer hit, %{browseFiles} eller importer fra:",
		dropPasteImportFolders: "Dra filer hit, %{browseFolders} eller importer fra:",
		editFile: "Rediger fil",
		editFileWithFilename: "Rediger fil %{file}",
		editImage: "Rediger bilde",
		editing: "Redigerer %{file}",
		emptyFolderAdded: "Ingen filer ble lagt til fra tom mappe",
		encoding: "Koder...",
		enterCorrectUrl: "Ugyldig URL: Kontroller at adressen du angir er en direkte lenke til ei fil",
		enterTextToSearch: "Skriv tekst for å søke etter bilder",
		enterUrlToImport: "Angi URL for å importere fil",
		error: "Feil",
		exceedsSize: "%{file} er større enn maksimal tillatt størrelse på %{size}",
		failedToAddFiles: "Kunne ikke legge til filer",
		failedToFetch: "Companion kunne ikke hente denne URLen, kontroller at den er riktig",
		failedToUpload: "Opplasting feilet for %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} av %{smart_count} fil opplastet",
			1: "%{complete} av %{smart_count} filer opplastet"
		},
		filter: "Filtrer",
		finishEditingFile: "Avslutt redigering av fil",
		flipHorizontal: "Snu horisontalt",
		folderAdded: {
			0: "La til %{smart_count} fil fra %{folder}",
			1: "La til %{smart_count} filer fra %{folder}"
		},
		folderAlreadyAdded: "Mappen \"%{folder}\" er allerede lagt til",
		generateImage: "Generer bilde",
		generateImagePlaceholder: "En fredfull solnedgang over et fjellvann, med furutrær som speiler seg i vannet",
		generating1: "KI tenker...",
		generating2: "Knaser piksler...",
		generating3: "Tilkaller bilder...",
		generating4: "KI jobber...",
		generating5: "Skaper magi...",
		generatingThumbnails: "Genererer miniatyrbilde...",
		import: "Importer",
		importFiles: "Importer filer fra:",
		importFrom: "Importer fra %{name}",
		inferiorSize: "Fila er mindre enn tillatt størrelse på %{size}",
		loadedXFiles: "Lastet inn %{numFiles} filer",
		loading: "Laster...",
		logIn: "Logg inn",
		logOut: "Logg ut",
		micDisabled: "Mikrofontilgang nektet av bruker",
		missingRequiredMetaField: "Mangler påkrevde metafelter",
		missingRequiredMetaFieldOnFile: "Mangler påkrevde metafelter i %{fileName}",
		missingRequiredMetaFields: {
			0: "Mangler påkrevd metafelt: %{fields}.",
			1: "Mangler påkrevde metafelter: %{fields}."
		},
		myDevice: "Min Enhet",
		noAudioDescription: "For å kunne ta opp lyd må du koble til en mikrofon eller en annen lydinngangsenhet",
		noAudioTitle: "Mikrofon ikke tilgjengelig",
		noCameraDescription: "Koble til kamera for å ta bilder eller ta opp video",
		noCameraTitle: "Kamera ikke tilgjengelig",
		noDuplicates: "Kan ikke legge til '%{fileName}', da den allerede eksisterer",
		noFilesFound: "Du har ingen filer eller mapper her",
		noInternetConnection: "Ingen internettilgang",
		noMoreFilesAllowed: "Kan ikke legge til nye filer",
		noSearchResults: "Dessverre er det ingen resultater for dette søket",
		openFolderNamed: "Åpne mappe %{name}",
		pause: "Pause",
		paused: "Midlertidig stoppet",
		pauseUpload: "Stopp opplasting midlertidig",
		pickFiles: "Velg filer",
		pickPhotos: "Velg bilder",
		pleaseWait: "Vennligst vent",
		pluginNameAudio: "Lyd",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Skjermopptak",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Lenke",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "WebDAV-URL for en fil (f.eks. fra ownCloud eller Nextcloud)",
		poweredBy: "Drevet av %{uppy}",
		processingXFiles: {
			0: "Prosesserer %{smart_count} fil",
			1: "Prosesserer %{smart_count} filer"
		},
		recording: "Opptak pågår",
		recordingLength: "Lengde på opptak: %{recording_length}",
		recordingStoppedMaxSize: "Opptak stoppet fordi fila er i ferd med å overskride tillatt størrelse",
		recordVideoBtn: "Ta opp video",
		recoveredAllFiles: "Vi gjenopprettet alle filer. Du kan nå fortsette opplastingen.",
		recoveredXFiles: {
			0: "Vi kunne ikke gjenopprette 1 fil helt. Velg den på nytt og fortsett opplastingen.",
			1: "Vi kunne ikke gjenopprette %{smart_count} filer helt. Velg dem på nytt og fortsett opplastingen."
		},
		removeFile: "Fjern fil",
		reSelect: "Velg på nytt",
		resetFilter: "Nullstill filter",
		resetSearch: "Nullstill søk",
		resume: "Fortsett",
		resumeUpload: "Fortsett opplasting",
		retry: "Prøv igjen",
		retryUpload: "Prøv igjen",
		revert: "Tilbakestill",
		rotate: "Roter 90°",
		save: "Lagre",
		saveChanges: "Lagre endringer",
		search: "Søk",
		searchImages: "Søk etter bilder",
		selectX: {
			0: "Velg %{smart_count}",
			1: "Velg %{smart_count}"
		},
		sessionRestored: "Økt gjenopprettet",
		showErrorDetails: "Vis feildetaljer",
		signInWithGoogle: "Logg inn med Google",
		smile: "Smil!",
		startAudioRecording: "Start lydopptak",
		startCapturing: "Start skjermopptak",
		startRecording: "Start videoopptak",
		stopAudioRecording: "Stopp lydopptak",
		stopCapturing: "Stopp skjermopptak",
		stopRecording: "Stopp videoopptak",
		streamActive: "Strøm aktiv",
		streamPassive: "Strøm passiv",
		submitRecordedFile: "Send inn opptak",
		takePicture: "Ta bilde",
		takePictureBtn: "Ta bilde",
		takeScreenshot: "Ta skjermbilde",
		unnamed: "Uten navn",
		upload: "Last opp",
		uploadComplete: "Opplasting ferdig",
		uploadFailed: "Opplasting feilet",
		uploading: "Laster opp",
		uploadingXFiles: {
			0: "Laster opp %{smart_count} fil",
			1: "Laster opp %{smart_count} filer"
		},
		uploadPaused: "Opplasting midlertidig stoppet",
		uploadStalled: "Opplastingen har ikke gjort fremgang på %{seconds} sekunder. Du kan prøve på nytt.",
		uploadXFiles: {
			0: "Last opp %{smart_count} fil",
			1: "Last opp %{smart_count} filer"
		},
		uploadXNewFiles: {
			0: "Last opp +%{smart_count} fil",
			1: "Last opp +%{smart_count} filer"
		},
		xFilesSelected: {
			0: "%{smart_count} fil valgt",
			1: "%{smart_count} filer valgt"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fil lagt til",
			1: "%{smart_count} filer lagt til"
		},
		xTimeLeft: "%{time} igjen",
		youCanOnlyUploadFileTypes: "Du kan bare laste opp: %{types}",
		youCanOnlyUploadX: {
			0: "Du kan bare laste opp %{smart_count} fil",
			1: "Du kan bare laste opp %{smart_count} filer"
		},
		youHaveToAtLeastSelectX: {
			0: "Du må velge minst %{smart_count} fil",
			1: "Du må velge minst %{smart_count} filer"
		},
		zoomIn: "Zoom inn",
		zoomOut: "Zoom ut"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.nb_NO = Kp);
})), Jp = /* @__PURE__ */ c({ default: () => Yp }), Yp, Xp = o((() => {
	Yp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Yp.strings = {
		addBulkFilesFailed: {
			0: "Toevoegen van %{smart_count} bestand mislukt door een interne fout",
			1: "Toevoegen van %{smart_count} bestanden mislukt door interne fouten"
		},
		addedNumFiles: "%{numFiles} bestand(en) toegevoegd",
		addingMoreFiles: "Bezig met extra bestanden toe te voegen",
		additionalRestrictionsFailed: "Er werd niet voldaan aan %{count} additionele restricties",
		addMore: "Meer toevoegen",
		addMoreFiles: "Meer bestanden toevoegen",
		aggregateExceedsSize: "Je selecteerde %{size} aan bestanden, maar maximaal %{sizeAllowed} is toegestaan",
		allFilesFromFolderNamed: "Alle bestanden uit de map %{name}",
		allowAccessDescription: "Geef deze site toegang tot je camera om foto's of videobeelden te kunnen maken.",
		allowAccessTitle: "Geef toegang tot je camera",
		allowAudioAccessDescription: "Geef deze site toegang tot je microfoon om geluidsopnames te maken.",
		allowAudioAccessTitle: "Geef toegang tot je microfoon",
		aspectRatioLandscape: "Landschap knippen (16:9)",
		aspectRatioPortrait: "Portret knippen (9:16)",
		aspectRatioSquare: "Vierkant knippen",
		authAborted: "Authenticatie geannuleerd",
		authenticate: "Verbinden",
		authenticateWith: "Verbinden met %{pluginName}",
		authenticateWithTitle: "Verbind met %{pluginName} om bestanden te selecteren",
		back: "Terug",
		browse: "blader",
		browseFiles: "blader naar bestanden",
		browseFolders: "blader naar mappen",
		cancel: "Annuleer",
		cancelUpload: "Annuleer upload",
		closeModal: "Sluit venster",
		companionError: "Verbinding met Companion mislukt",
		companionUnauthorizeHint: "Om toegang te ontnemen voor je %{provider} account, ga naar %{url}",
		complete: "Voltooid",
		compressedX: "%{size} bespaard door afbeeldingen te comprimeren",
		compressingImages: "Afbeeldingen aan het comprimeren...",
		connectedToInternet: "Verbonden met het internet",
		copyLink: "Kopieer link",
		copyLinkToClipboardFallback: "Kopieer de onderstaande URL",
		copyLinkToClipboardSuccess: "Link naar klembord gekopieerd",
		creatingAssembly: "Upload voorbereiden...",
		creatingAssemblyFailed: "Transloadit: Kon Assembly niet aanmaken",
		dashboardTitle: "Uppy Dashboard",
		dashboardWindowTitle: "Uppy Dashboard Venster (Druk escape om te sluiten)",
		dataUploadedOfTotal: "%{complete} van %{total}",
		dataUploadedOfUnknown: "%{complete} van onbekend",
		discardMediaFile: "Verwijder Media",
		discardRecordedFile: "Verwijder opgenomen bestand",
		done: "Klaar",
		dropHereOr: "Sleep bestanden hier heen of %{browse}",
		dropHint: "Sleep bestanden hier heen",
		dropPasteBoth: "Sleep bestanden hier heen, %{browseFiles} of %{browseFolders}",
		dropPasteFiles: "Sleep bestanden hier heen of %{browseFiles}",
		dropPasteFolders: "Sleep bestanden hier heen of %{browseFolders}",
		dropPasteImportBoth: "Sleep bestanden hier heen, %{browseFiles}, %{browseFolders} of importeer vanuit:",
		dropPasteImportFiles: "Sleep bestanden hier heen, %{browseFiles} of importeer vanuit:",
		dropPasteImportFolders: "Sleep bestanden hier heen, %{browseFolders} of importeer vanuit:",
		editFile: "Bestand wijzigen",
		editFileWithFilename: "Wijzig bestand %{file}",
		editImage: "Afbeelding wijzigen",
		editing: "Bezig %{file} te wijzigen",
		emptyFolderAdded: "Er werden geen bestanden toegevoegd uit de lege map",
		encoding: "Encoderen...",
		enterCorrectUrl: "Ongeldige URL: Zorg dat je een directe link naar een bestand invoert",
		enterTextToSearch: "Type hier om te zoeken naar afbeeldingen",
		enterUrlToImport: "Voer een URL in om een bestand te importeren",
		error: "Fout",
		exceedsSize: "%{file} overschrijdt de maximaal toegelaten bestandsgrootte van %{size}",
		failedToFetch: "Companion kan deze URL niet laden, controleer of de URL correct is",
		failedToUpload: "Kon %{file} niet uploaden",
		filesUploadedOfTotal: {
			0: "%{complete} van %{smart_count} bestand geüpload",
			1: "%{complete} van %{smart_count} bestanden geüpload"
		},
		filter: "Filter",
		finishEditingFile: "Klaar met bestand te wijzigen",
		flipHorizontal: "Horizontaal spiegelen",
		folderAdded: {
			0: "%{smart_count} bestand toegevoegd uit %{folder}",
			1: "%{smart_count} bestanden toegevoegd uit %{folder}"
		},
		folderAlreadyAdded: "De map \"%{folder}\" werd reeds toegevoegd",
		generatingThumbnails: "Thumbnails genereren...",
		import: "Importeer",
		importFiles: "Bestanden importeren van:",
		importFrom: "Bestanden importeren vanuit %{name}",
		inferiorSize: "Dit bestand is kleiner dan de minimum grootte van %{size}",
		loadedXFiles: "%{numFiles} bestanden geladen",
		loading: "Bezig met laden...",
		logIn: "Inloggen",
		logOut: "Uitloggen",
		micDisabled: "Microfoon toegang geweigerd door gebruiker",
		missingRequiredMetaField: "Vereiste metadata ontbreekt",
		missingRequiredMetaFieldOnFile: "Vereiste metadata ontbreekt in %{fileName}",
		missingRequiredMetaFields: {
			0: "Ontbrekende metadata: %{fields}.",
			1: "Ontbrekende metadata: %{fields}."
		},
		myDevice: "Mijn apparaat",
		noAudioDescription: "Sluit een microfoon of andere geluidsinput aan om een geluidsopname te maken",
		noAudioTitle: "Microfoon niet beschikbaar",
		noCameraDescription: "Sluit een camera aan om foto's of videobeelden te maken",
		noCameraTitle: "Camera niet beschikbaar",
		noDuplicates: "Kan het dubbele bestand '%{fileName}' niet toevoegen, het bestaat al",
		noFilesFound: "Geen bestanden of mappen gevonden",
		noInternetConnection: "Geen verbinding met het internet",
		noMoreFilesAllowed: "Meer bestanden kunnen niet toegevoegd worden",
		noSearchResults: "Deze zoekopdracht leverde helaas geen resultaten op",
		openFolderNamed: "Open map %{name}",
		pause: "Pauze",
		paused: "Gepauzeerd",
		pauseUpload: "Upload pauzeren",
		pickFiles: "Selecteer bestanden",
		pickPhotos: "Selecteer foto's",
		pleaseWait: "Gelieve te wachten",
		pluginNameAudio: "Audio",
		pluginNameBox: "Box",
		pluginNameCamera: "Camera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Screencast",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Link",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "WebDAV URL naar een bestand (bijv. van ownCloud of Nextcloud)",
		poweredBy: "Mogelijk gemaakt door %{uppy}",
		processingXFiles: {
			0: "Bezig met verwerken van %{smart_count} bestand",
			1: "Bezig met verwerken van %{smart_count} bestanden"
		},
		recording: "Aan het opnemen",
		recordingLength: "Opnameduur %{recording_length}",
		recordingStoppedMaxSize: "Opname gestopt omdat de bestandsgrootte de limiet bijna overschrijdt",
		recordVideoBtn: "Video opnemen",
		recoveredAllFiles: "We hebben alle bestanden hersteld. Je kan de upload nu hervatten.",
		recoveredXFiles: {
			0: "We konden 1 bestand niet herstellen. Kies het bestand opnieuw en hervat de upload.",
			1: "We konden %{smart_count} bestanden niet herstellen. Kies de bestanden opnieuw en hervat de upload."
		},
		removeFile: "Verwijder bestand",
		reSelect: "Opnieuw selecteren",
		resetFilter: "Filter resetten",
		resetSearch: "Zoeken resetten",
		resume: "Hervatten",
		resumeUpload: "Upload hervatten",
		retry: "Opnieuw proberen",
		retryUpload: "Upload opnieuw proberen",
		revert: "Terugdraaien",
		rotate: "Draai 90°",
		save: "Opslaan",
		saveChanges: "Wijzigingen opslaan",
		search: "Zoeken",
		searchImages: "Foto's zoeken",
		selectX: {
			0: "Selecteer %{smart_count}",
			1: "Selecteer %{smart_count}"
		},
		sessionRestored: "Sessie hersteld",
		showErrorDetails: "Toon foutdetails",
		signInWithGoogle: "Inloggen met Google",
		smile: "Lachen!",
		startAudioRecording: "Start audio-opname",
		startCapturing: "Start scherm-opname",
		startRecording: "Start video-opname",
		stopAudioRecording: "Stop audio-opname",
		stopCapturing: "Stop scherm-opname",
		stopRecording: "Stop video-opname",
		streamActive: "Stream actief",
		streamPassive: "Stream passief",
		submitRecordedFile: "Stuur opgenomen bestand",
		takePicture: "Neem een foto",
		takePictureBtn: "Foto nemen",
		takeScreenshot: "Screenshot maken",
		unnamed: "Onbekend",
		upload: "Upload",
		uploadComplete: "Upload voltooid",
		uploadFailed: "Upload mislukt",
		uploading: "Aan het uploaden",
		uploadingXFiles: {
			0: "%{smart_count} bestand aan het uploaden",
			1: "%{smart_count} bestanden aan het uploaden"
		},
		uploadPaused: "Upload gepauzeerd",
		uploadStalled: "Upload maakte geen vordering gedurende %{seconds} seconden. Probeer opnieuw.",
		uploadXFiles: {
			0: "Upload %{smart_count} bestand",
			1: "Upload %{smart_count} bestanden"
		},
		uploadXNewFiles: {
			0: "Upload +%{smart_count} bestand",
			1: "Upload +%{smart_count} bestanden"
		},
		xFilesSelected: {
			0: "%{smart_count} bestand geselecteerd",
			1: "%{smart_count} bestanden geselecteerd"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} extra bestand toegevoegd",
			1: "%{smart_count} extra bestanden toegevoegd"
		},
		xTimeLeft: "%{time} resterend",
		youCanOnlyUploadFileTypes: "Je kan enkel volgende types uploaden: %{types}",
		youCanOnlyUploadX: {
			0: "Je kan slechts %{smart_count} bestand uploaden",
			1: "Je kan slechts %{smart_count} bestanden uploaden"
		},
		youHaveToAtLeastSelectX: {
			0: "Je moet minstens %{smart_count} bestand selecteren",
			1: "Je moet minstens %{smart_count} bestanden selecteren"
		},
		zoomIn: "Zoom in",
		zoomOut: "Zoom uit"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.nl_NL = Yp);
})), Zp = /* @__PURE__ */ c({ default: () => Qp }), Qp, $p = o((() => {
	Qp = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Qp.strings = {
		addBulkFilesFailed: {
			0: "Kunne ikkje leggje til %{smart_count} fil på grunn av ein intern feil",
			1: "Kunne ikkje leggje til %{smart_count} filer på grunn av interne feil"
		},
		addedNumFiles: "La til %{numFiles} fil(er)",
		addingMoreFiles: "Legg til fleire filer",
		additionalRestrictionsFailed: "%{count} ekstra restriksjonar blei ikkje oppfylte",
		addMore: "Legg til",
		addMoreFiles: "Legg til filer",
		aggregateExceedsSize: "Du valde %{size} med filer, men største tillatne storleik er %{sizeAllowed}",
		allFilesFromFolderNamed: "Alle filer frå mappa %{name}",
		allowAccessDescription: "For å kunne ta bilete eller spele inn video må du gje sida tilgang til å bruke kameraet ditt.",
		allowAccessTitle: "Gje tilgang til kameraet ditt",
		allowAudioAccessDescription: "For å kunne ta opp lyd må du gje sida tilgang til mikrofonen.",
		allowAudioAccessTitle: "Gje tilgang til mikrofonen din",
		aspectRatioLandscape: "Skjer til landskap (16:9)",
		aspectRatioPortrait: "Skjer til portrett (9:16)",
		aspectRatioSquare: "Skjer til kvadrat",
		authAborted: "Autentisering avbroten",
		authenticate: "Kople til",
		authenticateWith: "Kople til %{pluginName}",
		authenticateWithTitle: "Kople til %{pluginName} for å velje filer",
		back: "Tilbake",
		browse: "vel",
		browseFiles: "vel filer",
		browseFolders: "vel mapper",
		cancel: "Avbryt",
		cancelUpload: "Avbryt opplasting",
		closeModal: "Lukk vindauge",
		companionError: "Tilkopling til Companion feila",
		companionUnauthorizeHint: "For å logge ut av %{provider}-kontoen din, gå til %{url}",
		complete: "Fullført",
		compressedX: "Sparte %{size} ved å komprimere bilete",
		compressingImages: "Komprimerer bilete...",
		connectedToInternet: "Kopla til internett",
		copyLink: "Kopier lenke",
		copyLinkToClipboardFallback: "Kopier URL under",
		copyLinkToClipboardSuccess: "Lenke kopiert",
		creatingAssembly: "Førebur opplasting...",
		creatingAssemblyFailed: "Transloadit: Kunne ikkje opprette Assembly",
		dashboardTitle: "Filopplastar",
		dashboardWindowTitle: "Opplastingsvindauge (Trykk Esc-knappen for å lukke)",
		dataUploadedOfTotal: "%{complete} av %{total}",
		dataUploadedOfUnknown: "%{complete} av ukjend",
		discardMediaFile: "Forkast media",
		discardRecordedFile: "Forkast opptak",
		done: "Ferdig",
		dropHereOr: "Slepp filer her eller %{browse}",
		dropHint: "Dra filer hit",
		dropPasteBoth: "Dra filer hit, %{browseFiles} eller %{browseFolders}",
		dropPasteFiles: "Dra filer hit eller %{browseFiles}",
		dropPasteFolders: "Dra filer hit eller %{browseFolders}",
		dropPasteImportBoth: "Dra filer hit, %{browseFiles}, %{browseFolders} eller importer frå:",
		dropPasteImportFiles: "Dra filer hit, %{browseFiles} eller importer frå:",
		dropPasteImportFolders: "Dra filer hit, %{browseFolders} eller importer frå:",
		editFile: "Rediger fil",
		editFileWithFilename: "Rediger fil %{file}",
		editImage: "Rediger bilete",
		editing: "Redigerer %{file}",
		emptyFolderAdded: "Ingen filer blei lagde til frå tom mappe",
		encoding: "Kodar...",
		enterCorrectUrl: "Ugyldig URL: Kontroller at adressa du oppgir er ei direkte lenke til ei fil",
		enterTextToSearch: "Skriv tekst for å søke etter bilete",
		enterUrlToImport: "Oppgi URL for å importere fil",
		error: "Feil",
		exceedsSize: "%{file} er større enn maksimal tillaten storleik på %{size}",
		failedToAddFiles: "Kunne ikkje leggje til filer",
		failedToFetch: "Companion kunne ikkje hente denne URL-en, kontroller at han er rett",
		failedToUpload: "Opplasting feila for %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} av %{smart_count} fil opplasta",
			1: "%{complete} av %{smart_count} filer opplasta"
		},
		filter: "Filtrer",
		finishEditingFile: "Avslutt redigering av fil",
		flipHorizontal: "Snu horisontalt",
		folderAdded: {
			0: "La til %{smart_count} fil frå %{folder}",
			1: "La til %{smart_count} filer frå %{folder}"
		},
		folderAlreadyAdded: "Mappa \"%{folder}\" er allereie lagd til",
		generateImage: "Generer bilete",
		generateImagePlaceholder: "Ein fredfull solnedgang over eit fjellvatn, med furutre som speglar seg i vatnet",
		generating1: "KI tenkjer...",
		generating2: "Knasar pikslar...",
		generating3: "Tilkallar bilete...",
		generating4: "KI jobbar...",
		generating5: "Skapar magi...",
		generatingThumbnails: "Genererer miniatyrbilete...",
		import: "Importer",
		importFiles: "Importer filer frå:",
		importFrom: "Importer frå %{name}",
		inferiorSize: "Fila er mindre enn tillaten storleik på %{size}",
		loadedXFiles: "Lasta inn %{numFiles} filer",
		loading: "Lastar...",
		logIn: "Logg inn",
		logOut: "Logg ut",
		micDisabled: "Mikrofontilgang nekta av brukar",
		missingRequiredMetaField: "Manglar påkravde metafelt",
		missingRequiredMetaFieldOnFile: "Manglar påkravde metafelt i %{fileName}",
		missingRequiredMetaFields: {
			0: "Manglar påkravd metafelt: %{fields}.",
			1: "Manglar påkravde metafelt: %{fields}."
		},
		myDevice: "Eininga mi",
		noAudioDescription: "For å kunne ta opp lyd må du kople til ein mikrofon eller ei anna lydinngangseining",
		noAudioTitle: "Mikrofon ikkje tilgjengeleg",
		noCameraDescription: "Kople til kamera for å ta bilete eller ta opp video",
		noCameraTitle: "Kamera ikkje tilgjengeleg",
		noDuplicates: "Kan ikkje leggje til '%{fileName}', ho finst allereie",
		noFilesFound: "Du har ingen filer eller mapper her",
		noInternetConnection: "Ingen internettilgang",
		noMoreFilesAllowed: "Kan ikkje leggje til nye filer",
		noSearchResults: "Diverre er det ingen resultat for dette søket",
		openFolderNamed: "Opne mappe %{name}",
		pause: "Pause",
		paused: "Mellombels stoppa",
		pauseUpload: "Stopp opplasting mellombels",
		pickFiles: "Vel filer",
		pickPhotos: "Vel bilete",
		pleaseWait: "Vent litt",
		pluginNameAudio: "Lyd",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Skjermopptak",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Lenke",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "WebDAV-URL for ei fil (f.eks. frå ownCloud eller Nextcloud)",
		poweredBy: "Driven av %{uppy}",
		processingXFiles: {
			0: "Prosesserer %{smart_count} fil",
			1: "Prosesserer %{smart_count} filer"
		},
		recording: "Opptak pågår",
		recordingLength: "Lengde på opptak: %{recording_length}",
		recordingStoppedMaxSize: "Opptak stoppa fordi fila er i ferd med å overskride tillaten storleik",
		recordVideoBtn: "Ta opp video",
		recoveredAllFiles: "Vi gjenoppretta alle filer. Du kan no halde fram med opplastinga.",
		recoveredXFiles: {
			0: "Vi kunne ikkje gjenopprette 1 fil heilt. Vel han på nytt og hald fram med opplastinga.",
			1: "Vi kunne ikkje gjenopprette %{smart_count} filer heilt. Vel dei på nytt og hald fram med opplastinga."
		},
		removeFile: "Fjern fil",
		reSelect: "Vel på nytt",
		resetFilter: "Nullstill filter",
		resetSearch: "Nullstill søk",
		resume: "Hald fram",
		resumeUpload: "Hald fram med opplasting",
		retry: "Prøv igjen",
		retryUpload: "Prøv igjen",
		revert: "Tilbakestill",
		rotate: "Roter 90°",
		save: "Lagre",
		saveChanges: "Lagre endringar",
		search: "Søk",
		searchImages: "Søk etter bilete",
		selectX: {
			0: "Vel %{smart_count}",
			1: "Vel %{smart_count}"
		},
		sessionRestored: "Økt gjenoppretta",
		showErrorDetails: "Vis feildetaljar",
		signInWithGoogle: "Logg inn med Google",
		smile: "Smil!",
		startAudioRecording: "Start lydopptak",
		startCapturing: "Start skjermopptak",
		startRecording: "Start videoopptak",
		stopAudioRecording: "Stopp lydopptak",
		stopCapturing: "Stopp skjermopptak",
		stopRecording: "Stopp videoopptak",
		streamActive: "Strøm aktiv",
		streamPassive: "Strøm passiv",
		submitRecordedFile: "Send inn opptak",
		takePicture: "Ta bilete",
		takePictureBtn: "Ta bilete",
		takeScreenshot: "Ta skjermbilete",
		unnamed: "Utan namn",
		upload: "Last opp",
		uploadComplete: "Opplasting ferdig",
		uploadFailed: "Opplasting feila",
		uploading: "Lastar opp",
		uploadingXFiles: {
			0: "Lastar opp %{smart_count} fil",
			1: "Lastar opp %{smart_count} filer"
		},
		uploadPaused: "Opplasting mellombels stoppa",
		uploadStalled: "Opplastinga har ikkje gjort framgang på %{seconds} sekund. Du kan prøve på nytt.",
		uploadXFiles: {
			0: "Last opp %{smart_count} fil",
			1: "Last opp %{smart_count} filer"
		},
		uploadXNewFiles: {
			0: "Last opp +%{smart_count} fil",
			1: "Last opp +%{smart_count} filer"
		},
		xFilesSelected: {
			0: "%{smart_count} fil vald",
			1: "%{smart_count} filer valde"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fil lagd til",
			1: "%{smart_count} filer lagde til"
		},
		xTimeLeft: "%{time} igjen",
		youCanOnlyUploadFileTypes: "Du kan berre laste opp: %{types}",
		youCanOnlyUploadX: {
			0: "Du kan berre laste opp %{smart_count} fil",
			1: "Du kan berre laste opp %{smart_count} filer"
		},
		youHaveToAtLeastSelectX: {
			0: "Du må velje minst %{smart_count} fil",
			1: "Du må velje minst %{smart_count} filer"
		},
		zoomIn: "Zoom inn",
		zoomOut: "Zoom ut"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.nn_NO = Qp);
})), em = /* @__PURE__ */ c({ default: () => tm }), tm, nm = o((() => {
	tm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, tm.strings = {
		addBulkFilesFailed: {
			0: "Dodawanie %{smart_count} pliku nie powiodło się z powodu błędu",
			1: "Dodawanie %{smart_count} plików nie powiodło się z powodu błędów"
		},
		addedNumFiles: "Dodano %{numFiles} plik(i)",
		addingMoreFiles: "Dodawanie kolejnych plików",
		additionalRestrictionsFailed: "%{count} dodatkowe ograniczenia nie zostały spełnione",
		addMore: "Dodaj więcej",
		addMoreFiles: "Dodaj więcej plików",
		aggregateExceedsSize: "Wybrałeś pliki o łącznym rozmiarze %{size}, ale maksymalny dozwolony rozmiar to %{sizeAllowed}",
		allFilesFromFolderNamed: "Wszystkie pliki z folderu %{name}",
		allowAccessDescription: "Aby zrobić zdjęcie lub nagrać filmik z użyciem wbudowanego aparatu, zezwól stronie na dostęp do aparatu",
		allowAccessTitle: "Zezwól na dostęp do aparatu",
		allowAudioAccessDescription: "Aby nagrać dźwięk, zezwól stronie na dostęp do mikrofonu.",
		allowAudioAccessTitle: "Zezwól na dostęp do mikrofonu",
		aspectRatioLandscape: "Przytnij krajobraz (16:9)",
		aspectRatioPortrait: "Przytnij portret (9:16)",
		aspectRatioSquare: "Przytnij kwadrat",
		authAborted: "Uwierzytelnianie przerwane",
		authenticate: "Połącz",
		authenticateWith: "Połącz z %{pluginName}",
		authenticateWithTitle: "Zaloguj się do %{pluginName} aby wybrać pliki",
		back: "Wstecz",
		browse: "Wybierz",
		browseFiles: "Przeglądaj pliki",
		browseFolders: "Przeglądaj foldery",
		cancel: "Anuluj",
		cancelUpload: "Anuluj przesyłanie",
		closeModal: "Zamknij",
		companionError: "Połączenie z serwisem nie powiodło się",
		companionUnauthorizeHint: "Aby wylogować się z konta %{provider}, przejdź pod adres %{url}",
		complete: "Ukończono",
		compressedX: "Zapisano %{size} poprzez kompresję obrazów",
		compressingImages: "Kompresowanie obrazów...",
		connectedToInternet: "Połączono z Internetem",
		copyLink: "Skopiuj link",
		copyLinkToClipboardFallback: "Skopiuj poniższy adres URL",
		copyLinkToClipboardSuccess: "Link skopiowany do schowka",
		creatingAssembly: "Przygotowywanie wysyłania...",
		creatingAssemblyFailed: "Transloadit: Niepowodzenie przy tworzeniu zbioru",
		dashboardTitle: "Przesyłanie plików",
		dashboardWindowTitle: "Okno przesyłania plików (Naciśnij ESC aby zamknąć)",
		dataUploadedOfTotal: "Przesłano %{complete} z %{total}",
		dataUploadedOfUnknown: "%{complete} z nieznanego",
		discardMediaFile: "Odrzuć plik multimedialny",
		discardRecordedFile: "Odrzuć nagrany plik",
		done: "Ukończono",
		dropHereOr: "Upuść tutaj lub %{browse}",
		dropHint: "Upuść swoje pliki tutaj",
		dropPasteBoth: "Upuść pliki tutaj, wklej, albo %{browse}",
		dropPasteFiles: "Upuść pliki tutaj, wklej, albo %{browse}",
		dropPasteFolders: "Upuść foldery tutaj, wklej, albo %{browse}",
		dropPasteImportBoth: "Upuść pliki tutaj, wklej, %{browse} albo zaimportuj z",
		dropPasteImportFiles: "Upuść pliki tutaj, wklej, %{browse} albo zaimportuj z",
		dropPasteImportFolders: "Upuść foldery tutaj, wklej, %{browse} albo zaimportuj z",
		editFile: "Edytuj plik",
		editFileWithFilename: "Edytuj plik %{file}",
		editImage: "Edytuj obraz",
		editing: "Edycja %{file}",
		emptyFolderAdded: "Z pustego folderu nie zostały dodane żadne pliki",
		encoding: "Transkodowanie...",
		enterCorrectUrl: "Niepoprawny URL: Upewnij się, że wprowadzasz bezpośredni adres pliku",
		enterTextToSearch: "Wpisz tekst, aby wyszukać obrazy",
		enterUrlToImport: "Wprowadź URL, aby zaimportować plik",
		error: "Błąd",
		exceedsSize: "%{file} ma rozmiar większy od dozwolonego %{size}",
		failedToFetch: "Serwis nie mógł przetworzyć podanego linku, zweryfikuj jego poprawność",
		failedToUpload: "Przesyłanie %{file} nie powiodło się",
		filesUploadedOfTotal: {
			0: "wysłano %{complete} z %{smart_count} pliku",
			1: "wysłano %{complete} z %{smart_count} plików"
		},
		filter: "Filtr",
		finishEditingFile: "Zakończ edycję",
		flipHorizontal: "Obróć poziomo",
		folderAdded: {
			0: "Dodano %{smart_count} plik z folderu %{folder}",
			1: "Dodano %{smart_count} plików z folderu %{folder}"
		},
		folderAlreadyAdded: "Folder \"%{folder}\" został już dodany",
		generatingThumbnails: "Generowanie miniaturek...",
		import: "Importuj",
		importFiles: "Importuj pliki z:",
		importFrom: "Importuj z %{name}",
		inferiorSize: "Ten plik jest mniejszy niż dozwolony rozmiar %{size}",
		loadedXFiles: "Załadowano %{numFiles} plików",
		loading: "Ładowanie...",
		logIn: "Zaloguj się",
		logOut: "Wyloguj",
		micDisabled: "Dostęp do mikrofonu odmówiony przez użytkownika",
		missingRequiredMetaField: "Brak niezbędnych pól metadanych",
		missingRequiredMetaFieldOnFile: "Brak wymaganych pól metadanych w %{fileName}",
		missingRequiredMetaFields: {
			0: "Brak wymaganego pola metadanych: %{fields}.",
			1: "Brak wymaganych pól metadanych: %{fields}."
		},
		myDevice: "Moje urządzenie",
		noAudioDescription: "Aby nagrać dźwięk, podłącz mikrofon lub inne urządzenie wejściowe audio",
		noAudioTitle: "Mikrofon niedostępny",
		noCameraDescription: "Aby zrobić zdjęcia lub nagrać wideo, podłącz urządzenie kamery",
		noCameraTitle: "Kamera niedostępna",
		noDuplicates: "Nie można dodać i zduplikować pliku '%{fileName}', już istnieje",
		noFilesFound: "Nie znaleziono plików",
		noInternetConnection: "Brak połączenia z Internetem",
		noMoreFilesAllowed: "Nie można dodać nowych plików: trwa przesyłanie",
		noSearchResults: "Niestety, brak wyników dla tego wyszukiwania",
		openFolderNamed: "Otwórz folder %{name}",
		pause: "Wstrzymaj",
		paused: "Wstrzymano",
		pauseUpload: "Wstrzymaj przesyłanie",
		pickFiles: "Wybierz pliki",
		pickPhotos: "Wybierz zdjęcia",
		pleaseWait: "Proszę czekać",
		pluginNameAudio: "Audio",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Zrzut ekranu",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Link",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "URL WebDAV dla pliku (np. z ownCloud lub Nextcloud)",
		poweredBy: "Dostarczane przez %{uppy}",
		processingXFiles: {
			0: "Przetwarzanie %{smart_count} pliku",
			1: "Przetwarzanie %{smart_count} plików"
		},
		recording: "Nagrywanie",
		recordingLength: "Długość nagrania %{recording_length}",
		recordingStoppedMaxSize: "Nagrywanie zatrzymane, ponieważ rozmiar pliku zbliża się do limitu",
		recordVideoBtn: "Nagrywaj wideo",
		recoveredAllFiles: "Przywróciliśmy wszystkie pliki. Możesz teraz wznowić przesyłanie.",
		recoveredXFiles: {
			0: "Nie udało się w pełni przywrócić 1 pliku. Proszę wybrać go ponownie i wznowić przesyłanie.",
			1: "Nie udało się w pełni przywrócić %{smart_count} plików. Proszę wybrać je ponownie i wznowić przesyłanie."
		},
		removeFile: "Usuń plik",
		reSelect: "Wybierz ponownie",
		resetFilter: "Zresetuj filtr",
		resetSearch: "Zresetuj wyszukiwanie",
		resume: "Wznów",
		resumeUpload: "Wznów przesyłanie",
		retry: "Ponów próbę",
		retryUpload: "Ponów przesyłanie",
		revert: "Resetuj",
		rotate: "Obróć 90°",
		save: "Zapisz",
		saveChanges: "Zapisz zmiany",
		search: "Szukaj",
		searchImages: "Szukaj obrazów",
		selectX: {
			0: "Wybierz %{smart_count}",
			1: "Wybierz %{smart_count}"
		},
		sessionRestored: "Sesja przywrócona",
		showErrorDetails: "Pokaż szczegóły błędu",
		signInWithGoogle: "Zaloguj się przez Google",
		smile: "Uśmiech!",
		startAudioRecording: "Rozpocznij nagrywanie dźwięku",
		startCapturing: "Rozpocznij rejestrowanie ekranu",
		startRecording: "Rozpocznij nagrywanie wideo",
		stopAudioRecording: "Zatrzymaj nagrywanie dźwięku",
		stopCapturing: "Zatrzymaj rejestrowanie ekranu",
		stopRecording: "Zatrzymaj nagrywanie wideo",
		streamActive: "Strumień aktywny",
		streamPassive: "Strumień pasywny",
		submitRecordedFile: "Prześlij nagrany plik",
		takePicture: "Zrób zdjęcie",
		takePictureBtn: "Zrób zdjęcie",
		takeScreenshot: "Zrób zrzut ekranu",
		unnamed: "Bez nazwy",
		upload: "Przesyłanie",
		uploadComplete: "Przesyłanie ukończone",
		uploadFailed: "Przesyłanie nie powiodło się",
		uploading: "Przesyłanie",
		uploadingXFiles: {
			0: "Przesyłanie %{smart_count} pliku",
			1: "Przesyłanie %{smart_count} plików"
		},
		uploadPaused: "Przesyłanie wstrzymane",
		uploadStalled: "Przesyłanie zatrzymane na %{seconds} sekund. Spróbuj ponownie.",
		uploadXFiles: {
			0: "Prześlij %{smart_count} plik",
			1: "Prześlij %{smart_count} plików"
		},
		uploadXNewFiles: {
			0: "Prześlij +%{smart_count} plik",
			1: "Prześlij +%{smart_count} plików"
		},
		xFilesSelected: {
			0: "%{smart_count} plik zaznaczony",
			1: "%{smart_count} plików zaznaczonych"
		},
		xMoreFilesAdded: {
			0: "dodano %{smart_count} plik więcej",
			1: "dodano %{smart_count} plików więcej"
		},
		xTimeLeft: "%{time} zostało",
		youCanOnlyUploadFileTypes: "Możesz przesłać tylko: %{types}",
		youCanOnlyUploadX: {
			0: "Możesz wgrać tylko %{smart_count} plik",
			1: "Możesz wgrać tylko %{smart_count} plików"
		},
		youHaveToAtLeastSelectX: {
			0: "Musisz wybrać przynajmniej %{smart_count} plik",
			1: "Musisz wybrać przynajmniej %{smart_count} plików"
		},
		zoomIn: "Powiększ",
		zoomOut: "Pomniejsz"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.pl_PL = tm);
})), rm = /* @__PURE__ */ c({ default: () => im }), im, am = o((() => {
	im = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, im.strings = {
		addBulkFilesFailed: {
			0: "Falha ao adicionar %{smart_count} arquivo devido a um erro interno",
			1: "Falha ao adicionar %{smart_count} arquivos devido a erros internos"
		},
		addedNumFiles: "%{numFiles} arquivo(s) adicionado(s)",
		addingMoreFiles: "Adicionando mais arquivos",
		additionalRestrictionsFailed: "%{count} restrições adicionais não foram cumpridas",
		addMore: "Adicionar mais",
		addMoreFiles: "Adicionar mais arquivos",
		aggregateExceedsSize: "Você selecionou %{size} de arquivos, mas o tamanho máximo permitido é %{sizeAllowed}",
		allFilesFromFolderNamed: "Todos os arquivos da pasta %{name}",
		allowAccessDescription: "Para poder tirar fotos e gravar vídeos com sua câmera, por favor permita o acesso a câmera para esse site.",
		allowAccessTitle: "Por favor, permita o acesso à sua câmera",
		allowAudioAccessDescription: "Para poder gravar áudio, por favor permita o acesso ao microfone para esse site.",
		allowAudioAccessTitle: "Por favor, permita o acesso ao microfone",
		aspectRatioLandscape: "Recortar paisagem (16:9)",
		aspectRatioPortrait: "Recortar retrato (9:16)",
		aspectRatioSquare: "Recortar quadrado",
		authAborted: "Autenticação cancelada",
		authenticate: "Conectar",
		authenticateWith: "Conectar com %{pluginName}",
		authenticateWithTitle: "Por favor conecte com %{pluginName} para selecionar arquivos",
		back: "Voltar",
		browse: "navegar",
		browseFiles: "selecionar arquivos",
		browseFolders: "selecionar pastas",
		cancel: "Cancelar",
		cancelUpload: "Cancelar envio",
		closeModal: "Fechar Janela",
		companionError: "Conexão com serviço falhou",
		companionUnauthorizeHint: "Para desautorizar sua conta %{provider}, por favor vá para %{url}",
		complete: "Concluir",
		compressedX: "%{size} salvos ao comprimir imagens",
		compressingImages: "Comprimindo imagens...",
		connectedToInternet: "Conectado à internet",
		copyLink: "Copiar link",
		copyLinkToClipboardFallback: "Copiar URL abaixo",
		copyLinkToClipboardSuccess: "Link copiado para a área de transferência",
		creatingAssembly: "Preparando envio de arquivos...",
		creatingAssemblyFailed: "Transloadit: Não foi possível criar o Assembly",
		dashboardTitle: "Painel de Envio",
		dashboardWindowTitle: "Painel de envio de arquivos (pressione Esc para fechar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		dataUploadedOfUnknown: "%{complete} de total desconhecido",
		discardMediaFile: "Descartar mídia",
		discardRecordedFile: "Descartar gravação",
		done: "Concluído",
		dropHint: "Solte ou cole seus arquivos aqui",
		dropPasteBoth: "Solte ou cole arquivos aqui, %{browseFiles} ou %{browseFolders}",
		dropPasteFiles: "Solte ou cole arquivos aqui ou %{browseFiles}",
		dropPasteFolders: "Solte ou cole arquivos aqui ou %{browseFolders}",
		dropPasteImportBoth: "Solte ou cole arquivos aqui, %{browseFiles}, %{browseFolders} ou importe de:",
		dropPasteImportFiles: "Solte ou cole arquivos aqui ou %{browseFiles} ou importe de:",
		dropPasteImportFolders: "Solte ou cole arquivos aqui ou %{browseFolders} ou importe de:",
		editFile: "Editar arquivo",
		editFileWithFilename: "Editar arquivo %{file}",
		editImage: "Editar imagem",
		editing: "Editando %{file}",
		emptyFolderAdded: "Nenhum arquivo foi adicionado da pasta vazia",
		encoding: "Codificando...",
		enterCorrectUrl: "URL incorreta: Por favor, certifique-se de que você inseriu um link direto para um arquivo",
		enterTextToSearch: "Digite texto para buscar imagens",
		enterUrlToImport: "Insira a URL para importar um arquivo",
		error: "Erro",
		exceedsSize: "%{file} excede o tamanho máximo permitido de %{size}",
		failedToFetch: "Falha ao buscar esta URL. Verifique se ela está correta.",
		failedToUpload: "Falha ao enviar %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} arquivo enviado",
			1: "%{complete} de %{smart_count} arquivos enviados"
		},
		filter: "Filtrar",
		finishEditingFile: "Finalizar edição de arquivo",
		flipHorizontal: "Inverter",
		folderAdded: {
			0: "Adicionado %{smart_count} arquivo de %{folder}",
			1: "Adicionado %{smart_count} arquivos de %{folder}"
		},
		folderAlreadyAdded: "A pasta \"%{folder}\" já foi adicionada",
		generatingThumbnails: "Gerando thumbnails...",
		import: "Importar",
		importFiles: "Importar arquivos de:",
		importFrom: "Importar de %{name}",
		inferiorSize: "Este arquivo é menor que o tamanho máximo permitido de %{size}",
		loadedXFiles: "%{numFiles} arquivo(s) carregado(s)",
		loading: "Carregando...",
		logIn: "Entrar",
		logOut: "Sair",
		micDisabled: "Acesso ao microfone negado pelo usuário",
		missingRequiredMetaField: "Campos meta obrigatórios faltando",
		missingRequiredMetaFieldOnFile: "Campos meta obrigatórios faltando em %{fileName}",
		missingRequiredMetaFields: {
			0: "Campo meta obrigatório faltando: %{fields}.",
			1: "Campos meta obrigatórios faltando: %{fields}."
		},
		myDevice: "Meu dispositivo",
		noAudioDescription: "Para gravar áudio, por favor conecte um microfone ou outro dispositivo de entrada de áudio",
		noAudioTitle: "Nenhum microfone disponível",
		noCameraDescription: "Para tirar fotos ou gravar vídeos, por favor conecte uma câmera",
		noCameraTitle: "Nenhuma câmera disponível",
		noDuplicates: "Não é possível adicionar o arquivo '%{fileName}', ele já foi adicionado",
		noFilesFound: "Você não possui arquivos ou pastas aqui",
		noInternetConnection: "Sem conexão com a internet",
		noMoreFilesAllowed: "Não é possível adicionar mais arquivos",
		noSearchResults: "Infelizmente, não há resultados para esta busca",
		openFolderNamed: "Abrir pasta %{name}",
		pause: "Pausar",
		paused: "Pausado",
		pauseUpload: "Pausar envio de arquivos",
		pickFiles: "Selecionar arquivos",
		pickPhotos: "Selecionar fotos",
		pleaseWait: "Por favor aguarde",
		pluginNameAudio: "Áudio",
		pluginNameBox: "Box",
		pluginNameCamera: "Câmera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Photos",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Screencast",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Link",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "URL WebDAV para um arquivo (exemplo: ownCloud ou Nextcloud)",
		poweredBy: "Desenvolvido por %{uppy}",
		processingXFiles: {
			0: "Processando %{smart_count} arquivo",
			1: "Processando %{smart_count} arquivos"
		},
		recording: "Gravando",
		recordingLength: "Duração da gravação %{recording_length}",
		recordingStoppedMaxSize: "Gravação parada porque o tamanho do arquivo está prestes a exceder o limite",
		recordVideoBtn: "Gravar vídeo",
		recoveredAllFiles: "Todos os arquivos foram restaurados. Você pode retomar o envio.",
		recoveredXFiles: {
			0: "Não foi possível restaurar 1 arquivo. Por favor, selecione-o novamente e retome o envio.",
			1: "Não foi possível restaurar %{smart_count} arquivos. Por favor, selecione-os novamente e retome o envio."
		},
		removeFile: "Remover arquivo",
		reSelect: "Re-selecionar",
		resetFilter: "Restaurar filtro",
		resetSearch: "Restaurar busca",
		resume: "Retomar",
		resumeUpload: "Retomar envio de arquivos",
		retry: "Tentar novamente",
		retryUpload: "Tentar enviar novamente",
		revert: "Reverter",
		rotate: "Girar",
		save: "Salvar",
		saveChanges: "Salvar alterações",
		search: "Buscar",
		searchImages: "Buscar por imagens",
		selectX: {
			0: "Selecionar %{smart_count}",
			1: "Selecionar %{smart_count}"
		},
		sessionRestored: "Sessão restaurada",
		showErrorDetails: "Mostrar detalhes do erro",
		signInWithGoogle: "Entrar com Google",
		smile: "Sorria!",
		startAudioRecording: "Iniciar gravação de áudio",
		startCapturing: "Iniciar captura de tela",
		startRecording: "Começar gravação de vídeo",
		stopAudioRecording: "Parar gravação de áudio",
		stopCapturing: "Parar captura de tela",
		stopRecording: "Parar gravação de vídeo",
		streamActive: "Stream ativo",
		streamPassive: "Stream inativo",
		submitRecordedFile: "Enviar arquivo gravado",
		takePicture: "Tirar uma foto",
		takePictureBtn: "Tirar foto",
		takeScreenshot: "Tirar screenshot",
		unnamed: "Sem nome",
		upload: "Enviar arquivos",
		uploadComplete: "Envio de arquivos finalizado",
		uploadFailed: "Envio de arquivos falhou",
		uploading: "Enviando",
		uploadingXFiles: {
			0: "Enviando %{smart_count} arquivo",
			1: "Enviando %{smart_count} arquivos"
		},
		uploadPaused: "Envio de arquivos pausado",
		uploadStalled: "Envio não fez nenhum progresso por %{seconds} segundos. Você pode tentar novamente.",
		uploadXFiles: {
			0: "Enviar %{smart_count} arquivo",
			1: "Enviar %{smart_count} arquivos"
		},
		uploadXNewFiles: {
			0: "Enviar +%{smart_count} arquivo",
			1: "Enviar +%{smart_count} arquivos"
		},
		xFilesSelected: {
			0: "%{smart_count} arquivo selecionado",
			1: "%{smart_count} arquivos selecionados"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} arquivo adicionado",
			1: "%{smart_count} arquivos adicionados"
		},
		xTimeLeft: "%{time} restantes",
		youCanOnlyUploadFileTypes: "Você pode enviar apenas arquivos: %{types}",
		youCanOnlyUploadX: {
			0: "Você pode enviar apenas %{smart_count} arquivo",
			1: "Você pode enviar apenas %{smart_count} arquivos"
		},
		youHaveToAtLeastSelectX: {
			0: "Você precisa selecionar pelo menos %{smart_count} arquivo",
			1: "Você precisa selecionar pelo menos %{smart_count} arquivos"
		},
		zoomIn: "Aumentar o zoom",
		zoomOut: "Diminuir o zoom"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.pt_BR = im);
})), om = /* @__PURE__ */ c({ default: () => sm }), sm, cm = o((() => {
	sm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, sm.strings = {
		addMore: "Adicionar mais",
		addMoreFiles: "Adicionar mais ficheiros",
		addingMoreFiles: "A adicionar mais ficheiros",
		allowAccessDescription: "Para poder tirar fotos e gravar vídeos com a sua câmera, por favor permita que este site a acesse.",
		allowAccessTitle: "Por favor permita o acesso à sua câmera",
		authenticateWith: "Ligar a %{pluginName}",
		authenticateWithTitle: "Por favor ligue-se a %{pluginName} para selecionar ficheiros",
		back: "Voltar",
		browse: "procure",
		browseFiles: "procure",
		cancel: "Cancelar",
		cancelUpload: "Cancelar envio de ficheiros",
		closeModal: "Fechar Modal",
		companionError: "Falha na conexão com serviço",
		complete: "Concluído",
		connectedToInternet: "Ligado à internet",
		copyLink: "Copiar link",
		copyLinkToClipboardFallback: "Copiar URL abaixo",
		copyLinkToClipboardSuccess: "Link copiado para a área de transferência",
		creatingAssembly: "A preparar o envio de ficheiros...",
		creatingAssemblyFailed: "Transloadit: Não foi possível criar o Assembly",
		dashboardTitle: "Envio de ficheiros",
		dashboardWindowTitle: "Janela para envio de ficheiros (Pressione esc para fechar)",
		dataUploadedOfTotal: "%{complete} de %{total}",
		done: "Concluir",
		dropHint: "Pode simplesmente arrastar os seus ficheiros para aqui",
		dropPasteBoth: "Arraste ficheiros, cole ou %{browse}",
		dropPasteFiles: "Arraste ficheiros, cole ou %{browse}",
		dropPasteFolders: "Arraste ficheiros, cole ou %{browse}",
		dropPasteImportBoth: "Arraste ficheiros, cole, %{browse} ou importe de",
		dropPasteImportFiles: "Arraste ficheiros, cole, %{browse} ou importe de",
		dropPasteImportFolders: "Arraste ficheiros, cole, %{browse} ou importe de",
		editFile: "Editar ficheiro",
		editImage: "Editar imagem",
		editing: "A editar %{file}",
		emptyFolderAdded: "A pasta está vazia e nenhum ficheiro foi adicionado.",
		encoding: "A codificar...",
		enterCorrectUrl: "URL incorrecto: Por favor garanta que inseriu um link direto para um ficheiro",
		enterUrlToImport: "Coloque o URL para importar um ficheiro",
		exceedsSize: "Este ficheiro excedeu o tamanho máximo permitido %{size}",
		failedToFetch: "Serviço falhou ao fazer fetch deste URL. Por favor garante que o URL está correto",
		failedToUpload: "Falha ao enviar %{file}",
		fileSource: "Origem do ficheiro: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} de %{smart_count} ficheiro enviado",
			1: "%{complete} de %{smart_count} ficheiros enviados"
		},
		filter: "Filtrar",
		finishEditingFile: "Concluir edição de ficheiro",
		folderAdded: {
			0: "Adicionado %{smart_count} ficheiro de %{folder}",
			1: "Adicionado %{smart_count} ficheiros de %{folder}"
		},
		import: "Importar",
		importFrom: "Importar de %{name}",
		loading: "A carregar...",
		logOut: "Sair",
		myDevice: "O meu dispositivo",
		noFilesFound: "Não possui ficheiros ou pastas aqui",
		noInternetConnection: "Sem ligação à internet",
		pause: "Pausar",
		pauseUpload: "Pausar envio de ficheiros",
		paused: "Pausado",
		poweredBy: "Desenvolvido por %{uppy}",
		processingXFiles: {
			0: "A processar %{smart_count} ficheiro",
			1: "A processar %{smart_count} ficheiros"
		},
		removeFile: "Remover ficheiro",
		resetFilter: "Limpar filtro",
		resume: "Retomar",
		resumeUpload: "Retomar envio de ficheiros",
		retry: "Tentar novamente",
		retryUpload: "Tentar enviar novamente",
		saveChanges: "Salvar alterações",
		selectX: {
			0: "Selecionar %{smart_count}",
			1: "Selecionar %{smart_count}"
		},
		smile: "Sorria!",
		startRecording: "Começar gravação de vídeo",
		stopRecording: "Parar gravação de vídeo",
		takePicture: "Tirar uma foto",
		timedOut: "Envio de ficheiros parado há %{seconds} segundos, a abortar.",
		upload: "Enviar ficheiros",
		uploadComplete: "Envio de ficheiros finalizado",
		uploadFailed: "Envio de ficheiros falhou",
		uploadPaused: "Envio de ficheiros pausado",
		uploadXFiles: {
			0: "Enviar %{smart_count} ficheiro",
			1: "Enviar %{smart_count} ficheiros"
		},
		uploadXNewFiles: {
			0: "Enviar +%{smart_count} ficheiro",
			1: "Enviar +%{smart_count} ficheiros"
		},
		uploading: "A enviar",
		uploadingXFiles: {
			0: "A enviar %{smart_count} ficheiro",
			1: "A enviar %{smart_count} ficheiros"
		},
		xFilesSelected: {
			0: "%{smart_count} ficheiro selecionado",
			1: "%{smart_count} ficheiros selecionados"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ficheiro adicionados",
			1: "%{smart_count} ficheiros adicionados"
		},
		xTimeLeft: "%{time} restantes",
		youCanOnlyUploadFileTypes: "Só pode enviar ficheiros: %{types}",
		youCanOnlyUploadX: {
			0: "Só pode enviar %{smart_count} ficheiro",
			1: "Só pode enviar %{smart_count} ficheiros"
		},
		youHaveToAtLeastSelectX: {
			0: "Precisa de selecionar pelo menos %{smart_count} ficheiro",
			1: "Precisa de selecionar pelo menos %{smart_count} ficheiros"
		},
		selectFileNamed: "Selecione o ficheiro %{name}",
		unselectFileNamed: "Deselecionar ficheiro %{name}",
		openFolderNamed: "Pasta aberta %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.pt_PT = sm);
})), lm = /* @__PURE__ */ c({ default: () => um }), um, dm = o((() => {
	um = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, um.strings = {
		addBulkFilesFailed: {
			0: "Nu s-a adăugat %{smart_count} fișier datorită unei erori interne",
			1: "Nu s-au adăugat %{smart_count} fișiere datorită unei erori interne"
		},
		addMore: "Adaugă mai multe",
		addMoreFiles: "Adaugă mai multe fișiere",
		addingMoreFiles: "Se adaugă mai multe fișiere",
		allowAccessDescription: "Pentru a face poze sau înregistra video trebuie să permiți accesul la cameră.",
		allowAccessTitle: "Vă rugăm permiteți accesul la cameră",
		authenticateWith: "Conectați-vă cu %{pluginName}",
		authenticateWithTitle: "Vă rugăm conectați-vă cu %{pluginName} pentru a selecta fișiere",
		back: "Înapoi",
		browse: "rasfoiește",
		browseFiles: "rasfoiește",
		cancel: "Anulare",
		cancelUpload: "Anulează încărcarea",
		closeModal: "Închide fereastra",
		companionError: "Conexiunea către Companion nu a reuși",
		companionUnauthorizeHint: "Pentru a autoriza contul %{provider}, navigați către %{url}",
		complete: "Complet",
		connectedToInternet: "Conectat la Internet",
		copyLink: "Copiază link",
		copyLinkToClipboardFallback: "Copiază URL-ul de mai jos",
		copyLinkToClipboardSuccess: "Link-ul copiat în clipboard",
		creatingAssembly: "Se pregătește încărcarea...",
		creatingAssemblyFailed: "Transloadit: Nu se poate crea un Assembly",
		dashboardTitle: "Încărcare fișier",
		dashboardWindowTitle: "Fereastră încărcare fișier (Apasă tasta escape pentru a închide)",
		dataUploadedOfTotal: "%{complete} din %{total}",
		done: "Finalizat",
		dropHint: "Trage fișierele tale aici",
		dropPasteBoth: "Trage fișierele aici, copy/paste sau %{browse}",
		dropPasteFiles: "Trage fișierele aici, copy/paste sau %{browse}",
		dropPasteFolders: "Trage fișierele aici, copy/paste sau %{browse}",
		dropPasteImportBoth: "Trage fișierele aici, copy/paste, %{browse} sau importă din:",
		dropPasteImportFiles: "Trage fișierele aici, copy/paste, %{browse} sau importă din:",
		dropPasteImportFolders: "Trage fișierele aici, copy/paste, %{browse} sau importă din:",
		editFile: "Editează fișier",
		editImage: "Editează imagine",
		editing: "Se editează %{file}",
		emptyFolderAdded: "Nu s-au adăugat fișiere, directorul este gol",
		encoding: "Encodare...",
		enterCorrectUrl: "URL incorect: Introduceți un link direct către fișier",
		enterUrlToImport: "Introduceți URL pentru a importa fișierul",
		exceedsSize: "Fișierul depășește dimensiunea maximă permisă de %{size}",
		failedToFetch: "Companion-ul nu a putut procesa URL-ul, asigură-te că e corect introdus",
		failedToUpload: "%{file} nu a putut fi încărcat",
		fileSource: "Sursă fișier: %{name}",
		filesUploadedOfTotal: {
			0: "Fișier importat %{complete} din %{smart_count}",
			1: "Fișiere importate %{complete} din %{smart_count}"
		},
		filter: "Filtrează",
		finishEditingFile: "Finalizează editarea fișierului",
		folderAdded: {
			0: "S-a adăugat %{smart_count} fișier din %{folder}",
			1: "S-au adăugat %{smart_count} fișiere din %{folder}"
		},
		generatingThumbnails: "Se generează pictogramele...",
		import: "Importă",
		importFrom: "Importă din %{name}",
		loading: "Încărcare...",
		logOut: "Delogare",
		myDevice: "Dispozitivul meu",
		noDuplicates: "Nu se poate adăuga fișierul '%{fileName}', acesta există deja",
		noFilesFound: "Nu sunt fișiere sau directoare aici",
		noInternetConnection: "Fără conexiune la internet",
		noMoreFilesAllowed: "Nu se pot adăuga fișiere noi: încărcare în curs",
		openFolderNamed: "Deschide director %{name}",
		pause: "Întrerupe",
		pauseUpload: "Întrerupe încărcarea",
		paused: "Întrerupt",
		poweredBy: "Susținut de %{uppy}",
		processingXFiles: {
			0: "Se procesează %{smart_count} fișier",
			1: "Se procesează %{smart_count} fișiere"
		},
		recordingLength: "Durată înregistrare %{recording_length}",
		recordingStoppedMaxSize: "Înregistrarea a fost oprită pentru că a depășit dimensiunea maximă permisă",
		removeFile: "Elimină fișier",
		resetFilter: "Resetează filtre",
		resume: "Reia",
		resumeUpload: "Reia încărcarea",
		retry: "Reîncercare",
		retryUpload: "Reîncearcă încărcarea",
		saveChanges: "Salvează modificări",
		selectFileNamed: "Selectează fișier %{name}",
		selectX: {
			0: "Selectează %{smart_count}",
			1: "Selectează %{smart_count}"
		},
		smile: "Zâmbește!",
		startRecording: "Pornește înregistrarea video",
		stopRecording: "Oprește înregistrarea video",
		takePicture: "Fă o poză",
		timedOut: "Încărcarea blocată pentru %{seconds} secunde, se anulează.",
		unselectFileNamed: "Deselectează fișier %{name}",
		upload: "Încarcă",
		uploadComplete: "Încărcare finalizată",
		uploadFailed: "Probleme la încărcare",
		uploadPaused: "Încărcare întreruptă",
		uploadXFiles: {
			0: "Încarcă %{smart_count} fișier",
			1: "Încarcă %{smart_count} fișiere"
		},
		uploadXNewFiles: {
			0: "Încarcă +%{smart_count} fișier",
			1: "Încarcă +%{smart_count} fișiere"
		},
		uploading: "Încărcare",
		uploadingXFiles: {
			0: "Se încarcă %{smart_count} fișier",
			1: "Se încarcă %{smart_count} fișiere"
		},
		xFilesSelected: {
			0: "%{smart_count} fișier selectat",
			1: "%{smart_count} fișiere selectate"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fișier adăugat",
			1: "%{smart_count} fișiere adăugate"
		},
		xTimeLeft: "%{time} rămas(e)",
		youCanOnlyUploadFileTypes: "Poți încărca doar: %{types}",
		youCanOnlyUploadX: {
			0: "Poți încărca doar %{smart_count} fișier",
			1: "Poți încărca doar %{smart_count} fișiere"
		},
		youHaveToAtLeastSelectX: {
			0: "Selectează cel puțin %{smart_count} fișier",
			1: "Selectează cel puțin %{smart_count} fișiere"
		}
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ro_RO = um);
})), fm = /* @__PURE__ */ c({ default: () => pm }), pm, mm = o((() => {
	pm = {
		strings: {},
		pluralize(e) {
			return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		}
	}, pm.strings = {
		addBulkFilesFailed: {
			0: "Не удалось добавить %{smart_count} файл из-за внутренней ошибки",
			1: "Не удалось добавить %{smart_count} файла из-за внутренней ошибки",
			2: "Не удалось добавить %{smart_count} файлов из-за внутренней ошибки"
		},
		addedNumFiles: {
			0: "Добавлен %{numFiles} файл",
			1: "Добавлено %{numFiles} файла",
			2: "Добавлено %{numFiles} файлов"
		},
		addingMoreFiles: "Добавление дополнительных файлов",
		additionalRestrictionsFailed: {
			0: "%{count} дополнительное ограничение не было удовлетворено",
			1: "%{count} дополнительных ограничения не были удовлетворены",
			2: "%{count} дополнительных ограничений не были удовлетворены"
		},
		addMore: "Добавить еще",
		addMoreFiles: "Добавить еще файлы",
		allFilesFromFolderNamed: "Все файлы из папки %{name}",
		allowAccessDescription: "Чтобы сделать фото или записать видео, пожалуйста, разрешите доступ к камере для этого сайта",
		allowAccessTitle: "Пожалуйста, разрешите доступ к вашей камере",
		allowAudioAccessDescription: "Чтобы записать аудио, пожалуйста, разрешите доступ к микрофону для этого сайта",
		allowAudioAccessTitle: "Пожалуйста, разрешите доступ к вашему микрофону",
		aspectRatioLandscape: "Обрезать альбомный формат (16:9)",
		aspectRatioPortrait: "Обрезать портрет (9:16)",
		aspectRatioSquare: "Обрезать квадрат",
		authAborted: "Аутентификация прервана",
		authenticateWith: "Подключиться к %{pluginName}",
		authenticateWithTitle: "Пожалуйста, авторизуйтесь в %{pluginName}, чтобы выбрать файлы",
		back: "Назад",
		browse: "выберите",
		browseFiles: "выберите файлы",
		cancel: "Отменить",
		cancelUpload: "Отменить загрузку",
		closeModal: "Закрыть окно",
		companionError: "Не удалось подключиться к Companion",
		companionUnauthorizeHint: "Чтобы выйти из вашего аккаунта %{provider}, пожалуйста, перейдите по ссылке %{url}",
		complete: "Готово",
		compressedX: "Сохранено %{size} благодаря сжатию изображений",
		compressingImages: "Сжатие изображений...",
		connectedToInternet: "Подключено к интернету",
		copyLink: "Скопировать ссылку",
		copyLinkToClipboardFallback: "Скопируйте ссылку",
		copyLinkToClipboardSuccess: "Ссылка скопирована в буфер обмена",
		creatingAssembly: "Подготовка загрузки...",
		creatingAssemblyFailed: "Transloadit: не удалось создать Assembly",
		dashboardTitle: "Загрузчик файлов",
		dashboardWindowTitle: "Окно загрузчика файлов (нажмите escape, чтобы закрыть)",
		dataUploadedOfTotal: "%{complete} из %{total}",
		discardRecordedFile: "Удалить записанный файл",
		done: "Готово",
		dropHint: "Перетащите файлы сюда",
		dropPasteBoth: "Перетащите файлы, вставьте или %{browse}",
		dropPasteFiles: "Перетащите файлы, вставьте или %{browse}",
		dropPasteFolders: "Перетащите файлы, вставьте или %{browse}",
		dropPasteImportBoth: "Перетащите файлы, вставьте, %{browse} или импортируйте из:",
		dropPasteImportFiles: "Перетащите файлы, вставьте, %{browse} или импортируйте из:",
		dropPasteImportFolders: "Перетащите файлы, вставьте, %{browse} или импортируйте из:",
		editFile: "Редактировать файл",
		editImage: "Редактировать изображение",
		editFileWithFilename: "Редактировать файл %{file}",
		editing: "Редактируется %{file}",
		emptyFolderAdded: "Файлы не были добавлены — папка пуста",
		encoding: "Обработка...",
		enterCorrectUrl: "Неправильный адрес: пожалуйста, убедитесь что вы используете прямую ссылку на файл",
		enterTextToSearch: "Введите текст для поиска изображений",
		enterUrlToImport: "Введите адрес, чтобы импортировать файл",
		error: "Ошибка",
		exceedsSize: "Этот файл больше максимально разрешенного размера в %{size}",
		failedToFetch: "Companion не смог загрузить файл по ссылке, пожалуйста, убедитесь, что адрес верный",
		failedToUpload: "Ошибка загрузки %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} из %{smart_count} файла загружено",
			1: "%{complete} из %{smart_count} файлов загружено",
			2: "%{complete} из %{smart_count} файлов загружено"
		},
		filter: "Фильтр",
		finishEditingFile: "Закончить редактирование файла",
		flipHorizontal: "Повернуть горизонтально",
		folderAdded: {
			0: "Добавлен %{smart_count} файл из %{folder}",
			1: "Добавлено %{smart_count} файла из %{folder}",
			2: "Добавлено %{smart_count} файлов из %{folder}"
		},
		folderAlreadyAdded: "Папка \"%{folder}\" уже была добавлена",
		generatingThumbnails: "Создание превью изображений...",
		import: "Импортировать",
		importFiles: "Импортировать файлы из:",
		importFrom: "Импортировать из %{name}",
		inferiorSize: "Этот файл меньше минимального размера %{size}",
		loadedXFiles: {
			0: "Загружен %{numFiles} файл",
			1: "Загружено %{numFiles} файла",
			2: "Загружено %{numFiles} файлов"
		},
		loading: "Загрузка...",
		logOut: "Выйти",
		micDisabled: "Пользователь ограничил доступ к микрофону",
		missingRequiredMetaField: "Отсутствуют обязательные meta поля",
		missingRequiredMetaFieldOnFile: "В файле %{fileName} отсутствуют обязательные meta поля",
		missingRequiredMetaFields: {
			0: "Отсутствует обязательное meta поле: %{fields}.",
			1: "Отсутствуют обязательные meta поля: %{fields}.",
			2: "Отсутствуют обязательные meta поля: %{fields}."
		},
		myDevice: "Мое устройство",
		noAudioDescription: "Пожалуйста, подключите микрофон или другое аудиоустройство, чтобы записывать аудио",
		noAudioTitle: "Микрофон недоступен",
		noCameraDescription: "Пожалуйста, подключите камеру, чтобы сделать фото или записать видео",
		noCameraTitle: "Камера недоступна",
		noDuplicates: "Нельзя добавить '%{fileName}', файл уже добавлен",
		noFilesFound: "Здесь нет файлов или папок",
		noInternetConnection: "Нет подключения к интернету",
		noMoreFilesAllowed: "Нельзя добавить больше файлов",
		noSearchResults: "К сожалению, нет результатов для поискового запроса",
		openFolderNamed: "Открыть папку %{name}",
		pause: "Поставить на паузу",
		paused: "На паузе",
		pauseUpload: "Поставить загрузку на паузу",
		poweredBy: "Работает на %{uppy}",
		processingXFiles: {
			0: "Обрабатывается %{smart_count} файл",
			1: "Обрабатываются %{smart_count} файла",
			2: "Обрабатываются %{smart_count} файлов"
		},
		recording: "Идет запись",
		recordingLength: "Длительность записи %{recording_length}",
		recordingStoppedMaxSize: "Запись остановлена из-за того, что файл достиг максимального размера",
		recordVideoBtn: "Записать видео",
		recoveredAllFiles: "Все файлы восстановлены. Вы можете продолжить загрузку.",
		recoveredXFiles: {
			0: "Не удалось восстановить %{smart_count} файл. Пожалуйста, выберите его заново и продолжите загрузку.",
			1: "Не удалось восстановить %{smart_count} файла. Пожалуйста, выберите их заново и продолжите загрузку.",
			2: "Не удалось восстановить %{smart_count} файлов. Пожалуйста, выберите их заново и продолжите загрузку."
		},
		removeFile: "Удалить файл",
		reSelect: "Выбрать заново",
		resetFilter: "Сбросить фильтр",
		resetSearch: "Сбросить поиск",
		resume: "Продолжить",
		resumeUpload: "Продолжить загрузку",
		retry: "Повторить попытку",
		retryUpload: "Повторить попытку загрузки",
		revert: "Отменить изменения",
		rotate: "Повернуть",
		save: "Сохранить",
		saveChanges: "Сохранить изменения",
		search: "Поиск",
		searchImages: "Поиск изображений",
		selectX: {
			0: "Выбрать %{smart_count}",
			1: "Выбрать %{smart_count}",
			2: "Выбрать %{smart_count}"
		},
		sessionRestored: "Сессия восстановлена",
		showErrorDetails: "Показать детали ошибки",
		signInWithGoogle: "Войти с Google",
		smile: "Улыбнитесь!",
		startAudioRecording: "Начать запись аудио",
		startCapturing: "Начать запись экрана",
		startRecording: "Начать запись видео",
		stopAudioRecording: "Остановить запись аудио",
		stopCapturing: "Остановить запись экрана",
		stopRecording: "Закончить запись видео",
		streamActive: "Активный поток",
		streamPassive: "Пассивный поток",
		submitRecordedFile: "Отправить записанный файл",
		takePicture: "Сделать фотографию",
		takePictureBtn: "Сделать фотографию",
		timedOut: "Загрузка остановилась на %{seconds} секунд, отмена",
		upload: "Загрузить",
		uploadComplete: "Загрузка завершена",
		uploadFailed: "Загрузка не удалась",
		uploadPaused: "Загрузка на паузе",
		uploadStalled: {
			0: "Прошла %{seconds} секунда без прогресса в загрузке. Возможно, вы хотите перезапустить ее.",
			1: "Прошло %{seconds} секунды без прогресса в загрузке. Возможно, вы хотите перезапустить ее.",
			2: "Прошло %{seconds} секунд без прогресса в загрузке. Возможно, вы хотите перезапустить ее."
		},
		uploadXFiles: {
			0: "Загрузить %{smart_count} файл",
			1: "Загрузить %{smart_count} файла",
			2: "Загрузить %{smart_count} файлов"
		},
		uploadXNewFiles: {
			0: "Загрузить +%{smart_count} файл",
			1: "Загрузить +%{smart_count} файла",
			2: "Загрузить +%{smart_count} файлов"
		},
		uploading: "Загрузка",
		uploadingXFiles: {
			0: "Загружается %{smart_count} файл",
			1: "Загружается %{smart_count} файла",
			2: "Загружается %{smart_count} файлов"
		},
		xFilesSelected: {
			0: "%{smart_count} файл выбран",
			1: "%{smart_count} файла выбрано",
			2: "%{smart_count} файлов выбрано"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} дополнительный файл добавлен",
			1: "%{smart_count} дополнительных файла добавлено",
			2: "%{smart_count} дополнительных файлов добавлено"
		},
		xTimeLeft: "осталось %{time}",
		youCanOnlyUploadFileTypes: "Вы можете загрузить только: %{types}",
		youCanOnlyUploadX: {
			0: "Вы можете загрузить только %{smart_count} файл",
			1: "Вы можете загрузить только %{smart_count} файла",
			2: "Вы можете загрузить только %{smart_count} файлов"
		},
		youHaveToAtLeastSelectX: {
			0: "Вы должны выбрать хотя бы %{smart_count} файл",
			1: "Вы должны выбрать хотя бы %{smart_count} файла",
			2: "Вы должны выбрать хотя бы %{smart_count} файлов"
		},
		zoomIn: "Приблизить",
		zoomOut: "Отдалить"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.ru_RU = pm);
})), hm = /* @__PURE__ */ c({ default: () => gm }), gm, _m = o((() => {
	gm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, gm.strings = {
		addBulkFilesFailed: {
			0: "Súbor %{smart_count} sa nepodarilo pridať z dôvodu vnútornej chyby",
			1: "Nepodarilo sa pridať %{smart_count} súbory z dôvodu vnútorných chýb"
		},
		addMore: "Pridať ďalšie",
		addMoreFiles: "Pridať ďalšie súbory",
		addingMoreFiles: "Pridávajú sa ďalšie súbory",
		allowAccessDescription: "Pokiaľ chcete urobiť fotografiu alebo nahrať video vaším zariadením, povoľte prosím prístup ku kamere.",
		allowAccessTitle: "Povoľte prístup ku kamere",
		aspectRatioLandscape: "Orezať na šírku (16:9)",
		aspectRatioPortrait: "Orezať na výšku (9:16)",
		aspectRatioSquare: "Orezať do štvorca",
		authenticateWith: "Pripojiť k %{pluginName}",
		authenticateWithTitle: "Prosím príhláste sa k %{pluginName} pre výber súborov",
		back: "Späť",
		backToSearch: "Späť na vyhľadávanie",
		browse: "vyberte",
		browseFiles: "vyberte",
		cancel: "Zrušiť",
		cancelUpload: "Zrušiť nahrávanie",
		closeModal: "Zavrieť okno",
		companionError: "Spojenie s modulom Companion sa nepodarilo",
		companionUnauthorizeHint: "Pokiaľ nechcete povoliť prístup k účtu %{provider}, prosím prejdite na túto adresu %{url}",
		complete: "Hotovo",
		connectedToInternet: "Pripojené k internetu",
		copyLink: "Kopírovať odkaz",
		copyLinkToClipboardFallback: "Skopírujte odkaz nižšie",
		copyLinkToClipboardSuccess: "Odkaz bol skopírovaný do schránky",
		creatingAssembly: "Pripravuje sa nahrávanie...",
		creatingAssemblyFailed: "Transloadit: Nepodarilo sa vytvoriť Assembly",
		dashboardTitle: "Nahrať súbory",
		dashboardWindowTitle: "Okno na nahrávanie súborov. (Stlačením ESC ho zavriete)",
		dataUploadedOfTotal: "%{complete} z %{total}",
		done: "Dokončené",
		dropHint: "Presuňte sem súbory",
		dropPasteBoth: "Presuňte sem súbory alebo %{browse}",
		dropPasteFiles: "Presuňte sem súbory alebo %{browse}",
		dropPasteFolders: "Presuňte sem súbory alebo %{browse}",
		dropPasteImportBoth: "Presuňte sem, %{browse} alebo importujte súbory:",
		dropPasteImportFiles: "Presuňte sem, %{browse} alebo importujte súbory:",
		dropPasteImportFolders: "Presuňte sem, %{browse} alebo importujte súbory:",
		editFile: "Upraviť súbor",
		editImage: "Upraviť obrázok",
		editing: "Úprava %{file}",
		emptyFolderAdded: "Neboli pridané žiadne súbory, pretože adresár je prázdny.",
		encoding: "Konvertovanie...",
		enterCorrectUrl: "Nesprávna adresa URL: Uistite sa, že zadávate priamy odkaz na súbor",
		enterTextToSearch: "Zadajte text pre vyhľadanie obrázkov",
		enterUrlToImport: "Ak chcete importovať súbor, zadajte adresu URL",
		exceedsSize: "Tento súbor presahuje maximálnu povolenú veľkosť súboru %{size}",
		failedToFetch: "Nepodarilo sa načítať túto webovú adresu. Skontrolujte, či je správna",
		failedToUpload: "Nepodarilo sa nahrať súbor %{file}",
		fileSource: "Zdroj súboru: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} z %{smart_count} nahraných súborov",
			1: "%{complete} z %{smart_count} nahraných súborov"
		},
		filter: "Filtrovať",
		finishEditingFile: "Dokončiť úpravu súborov",
		flipHorizontal: "Otočiť horizontálne",
		folderAdded: {
			0: "Pridaný %{smart_count} súbor zo zložky %{folder}",
			1: "Pridané %{smart_count} súbory zo zložky %{folder}"
		},
		generatingThumbnails: "Vytváram miniatury...",
		import: "Importovať",
		importFrom: "Import z %{name}",
		inferiorSize: "Tento súbor je menší ako povolená veľkosť súboru %{size}",
		loading: "Nahrávanie...",
		logOut: "Odhlásiť",
		micDisabled: "Užívateľ odmietol prístup k mikrofónu",
		myDevice: "Moje zariadenie",
		noCameraDescription: "Ak chcete urobiť fotku alebo nahrať video, zapnite kameru",
		noCameraTitle: "Kamera nie je k dispozícii",
		noDuplicates: "Nemôžete pridať duplikátny súbor '%{fileName}', ktorý už existuje",
		noFilesFound: "Nemáte pridané žiadne súbory ani zložky",
		noInternetConnection: "Žiadne internetové pripojenie",
		noMoreFilesAllowed: "Počas nahrávania nemôžete pridať ďalšie súbory",
		openFolderNamed: "Otvoriť zložku %{name}",
		pause: "Pozastaviť",
		pauseUpload: "Pozastaviť nahrávanie",
		paused: "Pozastavené",
		poweredBy: "Vytvorené pomocou %{uppy}",
		processingXFiles: {
			0: "Spracovanie %{smart_count} súboru",
			1: "Spracovanie %{smart_count} súborov"
		},
		recording: "Nahrávanie",
		recordingLength: "Dĺžka záznamu %{recording_length}",
		recordingStoppedMaxSize: "Nahrávanie sa zastavilo, pretože veľkosť súboru sa chystá prekročiť limit",
		removeFile: "Odstrániť súbor",
		resetFilter: "Zrušiť filter",
		resume: "Pokračovať",
		resumeUpload: "Pokračovať v nahrávaní",
		retry: "Opakovať",
		retryUpload: "Opakovať nahrávanie",
		revert: "Vrátiť späť",
		rotate: "Otočiť",
		save: "Uložiť",
		saveChanges: "Uložiť zmeny",
		searchImages: "Vyhľadajte obrázky",
		selectFileNamed: "Vybrať súbor %{name}",
		selectX: {
			0: "Vybrať %{smart_count}",
			1: "Vybrať %{smart_count}"
		},
		smile: "Úsmev prosím!",
		startCapturing: "Spustiť snímanie obrazovky",
		startRecording: "Spustiť nahrávanie videa",
		stopCapturing: "Zastaviť snímanie obrazovky",
		stopRecording: "Zastaviť nahrávanie videa",
		streamActive: "Stream je aktívny",
		streamPassive: "Stream nieje aktívny",
		submitRecordedFile: "Odoslať nahraté video",
		takePicture: "Urobiť fotku",
		timedOut: "Nahrávanie bolo prerušené na %{seconds}, prerušuje sa.",
		unselectFileNamed: "Zrušiť výber súboru %{name}",
		upload: "Nahrať",
		uploadComplete: "Nahrávanie dokončené",
		uploadFailed: "Nahrávanie sa nepodarilo",
		uploadPaused: "Nahrávanie pozastavené",
		uploadXFiles: {
			0: "Nahrať %{smart_count} súbor",
			1: "Nahrať %{smart_count} súbory"
		},
		uploadXNewFiles: {
			0: "Nahrať +%{smart_count} súbor",
			1: "Nahrať +%{smart_count} súbory"
		},
		uploading: "Nahrávanie",
		uploadingXFiles: {
			0: "Nahrávám %{smart_count} súbor",
			1: "Nahrávám %{smart_count} súbory"
		},
		xFilesSelected: {
			0: "%{smart_count} vybratý súbor",
			1: "%{smart_count} vybrané súbory"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ďalší pridaný súbor",
			1: "%{smart_count} ďalšie pridané súbory"
		},
		xTimeLeft: "%{time} zostáva",
		youCanOnlyUploadFileTypes: "Môžete nahrať iba tieto typy súborov: %{types}",
		youCanOnlyUploadX: {
			0: "Môžete nahrať iba %{smart_count} súbor",
			1: "Môžete nahrať iba %{smart_count} súbory"
		},
		youHaveToAtLeastSelectX: {
			0: "Musíte vybrať aspoň %{smart_count} súbor",
			1: "Musíte vybrať aspoň %{smart_count} súbory"
		},
		zoomIn: "Priblížiť",
		zoomOut: "Oddialiť"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.sk_SK = gm);
})), vm = /* @__PURE__ */ c({ default: () => ym }), ym, bm = o((() => {
	ym = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, ym.strings = {
		addMore: "Додај још",
		addMoreFiles: "Додај још датотека",
		addingMoreFiles: "Додавање датотека",
		allowAccessDescription: "Молимо Вас, дозволите приступ Вашој камери, како бисте могли да је користите за снимање фотографија и видео записа.",
		allowAccessTitle: "Молимо Вас, дозволите приступ Вашој камери",
		authenticateWith: "Повежи се путем %{pluginName}",
		authenticateWithTitle: "Молимо Вас да се пријавите путем %{pluginName} како бисте преузели датотеке",
		back: "Назад",
		browse: "потражи",
		browseFiles: "потражи",
		cancel: "Откажи",
		cancelUpload: "Откажи отпремање",
		closeModal: "Затвори",
		companionError: "Неуспело повезивање са Companion",
		complete: "Отпремљено",
		connectedToInternet: "Повезан на интернет",
		copyLink: "Састави линк",
		copyLinkToClipboardFallback: "Копирај (сачувај) доњи URL",
		copyLinkToClipboardSuccess: "Линк је копиран у клипборд",
		creatingAssembly: "Припремање отпремања...",
		creatingAssemblyFailed: "Transloadit: не могу да направим Assembly",
		dashboardTitle: "Отпремање датотека",
		dashboardWindowTitle: "Прозор за отпремање датотека (притирните ESC за излаз)",
		dataUploadedOfTotal: "%{complete} од %{total}",
		done: "Завршено",
		dropHint: "Спусти датотеке овде",
		dropPasteBoth: "Спусти датотеке овде, уметни или %{browse}",
		dropPasteFiles: "Спусти датотеке овде, уметни или %{browse}",
		dropPasteFolders: "Спусти датотеке овде, уметни или %{browse}",
		dropPasteImportBoth: "Спусти датотеке овде, уметни (енг. \"paste\"), %{browse} или преузми са",
		dropPasteImportFiles: "Спусти датотеке овде, уметни (енг. \"paste\"), %{browse} или преузми са",
		dropPasteImportFolders: "Спусти датотеке овде, уметни (енг. \"paste\"), %{browse} или преузми са",
		editFile: "Измени датотеку",
		editImage: "Уреди слику",
		editing: "Мењање  %{file}",
		emptyFolderAdded: "Ни једна датотека није додата из празног фолдера",
		encoding: "Шифровање...",
		enterCorrectUrl: "Погрешан URL: унесите тачну путању до датотеке",
		enterUrlToImport: "Унесите URL (путању) до датотеке",
		exceedsSize: "Ова датотека премашује највећу дозвољену величину од %{size}",
		failedToFetch: "Companion није успео да допре до дате адресе (URL), проверите исправност адресе",
		failedToUpload: "Број неуспело отпремљених датотека: %{file}",
		fileSource: "Датотека: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete}. Укупно отремљених датотека: %{smart_count}",
			1: "%{complete}. Укупно отремљених датотека: %{smart_count}"
		},
		filter: "Филтер",
		finishEditingFile: "Заврши мењање фајла",
		folderAdded: {
			0: "Број датотека преузетих из %{folder}: %{smart_count}",
			1: "Број датотека преузетих из %{folder}: %{smart_count}"
		},
		import: "Преузми",
		importFrom: "Преузми са %{name}",
		loading: "Учитавам...",
		logOut: "Одјава",
		myDevice: "Мој рачунар или мобилни уређај",
		noFilesFound: "Овде нема фолдера или датотека",
		noInternetConnection: "Нема везе са интернетом",
		pause: "Заустави привремено",
		pauseUpload: "Привремено заустави отпремање",
		paused: "Привремено заустављено",
		poweredBy: "Отпремање покреће %{uppy}",
		processingXFiles: {
			0: "Обрада датотеке",
			1: "Број датотека које се обрађују: %{smart_count}"
		},
		removeFile: "Уклони дадотеку",
		resetFilter: "Избриши филтер",
		resume: "Настави",
		resumeUpload: "Настави отпремање",
		retry: "Покушај поново",
		retryUpload: "Покушај поново да отпремиш",
		saveChanges: "Сачувај измене",
		selectX: {
			0: "Изабери датотеку",
			1: "Изабери %{smart_count}"
		},
		smile: "Осмех!",
		startRecording: "Започни снимање видео записа",
		stopRecording: "Заустави снимање видео записа",
		takePicture: "Сними фотографију",
		timedOut: "Прекидамо отпремање јер је застало. Број секунди застоја: %{seconds}.",
		upload: "Отпреми",
		uploadComplete: "Отпремање је завршено у целости",
		uploadFailed: "Отпремање није успело",
		uploadPaused: "Отпремање је привремено заустављено",
		uploadXFiles: {
			0: "Отпреми датотеку",
			1: "Отпреми датотеке. Укупно: %{smart_count}"
		},
		uploadXNewFiles: {
			0: "Отпреми +%{smart_count} datoteku",
			1: "Отпреми датотеке. Укупно: +%{smart_count}"
		},
		uploading: "Отпремање",
		uploadingXFiles: {
			0: "Број датотека које се тренутно отпремају: %{smart_count}",
			1: "Број датотека које се тренутно отпремају: %{smart_count}"
		},
		xFilesSelected: {
			0: "Број датотека за отпремање: %{smart_count}",
			1: "Број датотека за отпремање: %{smart_count}"
		},
		xMoreFilesAdded: {
			0: "Број додатих датотека: %{smart_count}",
			1: "Број додатих датотека: %{smart_count}"
		},
		xTimeLeft: "Преостало време %{time} ",
		youCanOnlyUploadFileTypes: "Можете да отпремите само: %{types}",
		youCanOnlyUploadX: {
			0: "Дозвољени број датотека за отпремање: %{smart_count}",
			1: "Дозвољени број датотека за отпремање: %{smart_count}"
		},
		youHaveToAtLeastSelectX: {
			0: "Изаберите бар једну датотеку",
			1: "Изаберите датотеке. Најмање: %{smart_count}"
		},
		selectFileNamed: "Изаберите фајл %{name}",
		unselectFileNamed: "Искључите фајл %{name}",
		openFolderNamed: "Отвори фолдер %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.sr_RS_Cyrillic = ym);
})), xm = /* @__PURE__ */ c({ default: () => Sm }), Sm, Cm = o((() => {
	Sm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Sm.strings = {
		addMore: "Dodaj još",
		addMoreFiles: "Dodaj još datoteka",
		addingMoreFiles: "Dodavanje datoteka",
		allowAccessDescription: "Molimo Vas, dozvolite pristup Vašoj kameri, kako biste mogli da je koristite za snimanje fotografija i video zapisa.",
		allowAccessTitle: "Molimo Vas, dozvolite pristup Vašoj kameri",
		authenticateWith: "Poveži se putem %{pluginName}",
		authenticateWithTitle: "Molimo Vas da se prijavite putem %{pluginName} kako biste preuzeli datoteke",
		back: "Nazad",
		browse: "potraži",
		browseFiles: "potraži",
		cancel: "Otkaži",
		cancelUpload: "Otkaži otpremanje",
		closeModal: "Zatvori",
		companionError: "Neuspelo povezivanje sa Companion",
		complete: "Otpremljeno",
		connectedToInternet: "Povezan na internet",
		copyLink: "Sastavi link",
		copyLinkToClipboardFallback: "Kopiraj (sačuvaj) donji URL",
		copyLinkToClipboardSuccess: "Link je kopiran u klipbord",
		creatingAssembly: "Pripremanje otpremanja...",
		creatingAssemblyFailed: "Transloadit: ne mogu da napravim Assembly",
		dashboardTitle: "Otpremanje datoteka",
		dashboardWindowTitle: "Prozor za otpremanje datoteka (pritirnite ESC za izlaz)",
		dataUploadedOfTotal: "%{complete} od %{total}",
		done: "Završeno",
		dropHint: "Spusti datoteke ovde",
		dropPasteBoth: "Spusti datoteke ovde, umetni ili %{browse}",
		dropPasteFiles: "Spusti datoteke ovde, umetni ili %{browse}",
		dropPasteFolders: "Spusti datoteke ovde, umetni ili %{browse}",
		dropPasteImportBoth: "Spusti datoteke ovde, umetni (eng. \"paste\"), %{browse} ili preuzmi sa",
		dropPasteImportFiles: "Spusti datoteke ovde, umetni (eng. \"paste\"), %{browse} ili preuzmi sa",
		dropPasteImportFolders: "Spusti datoteke ovde, umetni (eng. \"paste\"), %{browse} ili preuzmi sa",
		editFile: "Izmeni datoteku",
		editImage: "Uredi sliku",
		editing: "Menjanje %{file}",
		emptyFolderAdded: "Ni jedna datoteka nije dodata iz praznog foldera",
		encoding: "Šifrovanje...",
		enterCorrectUrl: "Pogrešan URL: unesite tačnu putanju do datoteke",
		enterUrlToImport: "Unesite URL (putanju) do datoteke",
		exceedsSize: "Ova datoteka premašuje najveću dozvoljenu veličinu od %{size}",
		failedToFetch: "Companion nije uspeo da dopre do date adrese (URL), proverite ispravnost adrese",
		failedToUpload: "Broj neuspelo otpremljenih datoteka: %{file}",
		fileSource: "Datoteka: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete}. Ukupno otremljenih datoteka: %{smart_count}",
			1: "%{complete}. Ukupno otremljenih datoteka: %{smart_count}"
		},
		filter: "Filter",
		finishEditingFile: "Završi menjanje fajla",
		folderAdded: {
			0: "Broj datoteka preuzetih iz %{folder}: %{smart_count}",
			1: "Broj datoteka preuzetih iz %{folder}: %{smart_count}"
		},
		import: "Preuzmi",
		importFrom: "Preuzmi sa %{name}",
		loading: "Učitavam...",
		logOut: "Odjava",
		myDevice: "Moj računar ili mobilni uređaj",
		noFilesFound: "Ovde nema foldera ili datoteka",
		noInternetConnection: "Nema veze sa internetom",
		pause: "Zaustavi privremeno",
		pauseUpload: "Privremeno zaustavi otpremanje",
		paused: "Privremeno zaustavljeno",
		poweredBy: "Otpremanje pokreće %{uppy}",
		processingXFiles: {
			0: "Obrada datoteke",
			1: "Broj datoteka koje se obrađuju: %{smart_count}"
		},
		removeFile: "Ukloni dadoteku",
		resetFilter: "Izbriši filter",
		resume: "Nastavi",
		resumeUpload: "Nastavi otpremanje",
		retry: "Pokušaj ponovo",
		retryUpload: "Pokušaj ponovo da otpremiš",
		saveChanges: "Sačuvaj izmene",
		selectX: {
			0: "Izaberi datoteku",
			1: "Izaberi %{smart_count}"
		},
		smile: "Osmeh!",
		startRecording: "Započni snimanje video zapisa",
		stopRecording: "Zaustavi snimanje video zapisa",
		takePicture: "Snimi fotografiju",
		timedOut: "Prekidamo otpremanje jer je zastalo. Broj sekundi zastoja: %{seconds}.",
		upload: "Otpremi",
		uploadComplete: "Otpremanje je završeno u celosti",
		uploadFailed: "Otpremanje nije uspelo",
		uploadPaused: "Otpremanje je privremeno zaustavljeno",
		uploadXFiles: {
			0: "Otpremi datoteku",
			1: "Otpremi datoteke. Ukupno: %{smart_count}"
		},
		uploadXNewFiles: {
			0: "Otpremi +%{smart_count} datoteku",
			1: "Otpremi datoteke. Ukupno: +%{smart_count}"
		},
		uploading: "Otpremanje",
		uploadingXFiles: {
			0: "Broj datoteka koje se trenutno otpremaju: %{smart_count}",
			1: "Broj datoteka koje se trenutno otpremaju: %{smart_count}"
		},
		xFilesSelected: {
			0: "Broj datoteka za otpremanje: %{smart_count}",
			1: "Broj datoteka za otpremanje: %{smart_count}"
		},
		xMoreFilesAdded: {
			0: "Broj dodatih datoteka: %{smart_count}",
			1: "Broj dodatih datoteka: %{smart_count}"
		},
		xTimeLeft: "Preostalo vreme %{time} ",
		youCanOnlyUploadFileTypes: "Možete da otpremite samo: %{types}",
		youCanOnlyUploadX: {
			0: "Dozvoljeni broj datoteka za otpremanje: %{smart_count}",
			1: "Dozvoljeni broj datoteka za otpremanje: %{smart_count}"
		},
		youHaveToAtLeastSelectX: {
			0: "Izaberite bar jednu datoteku",
			1: "Izaberite datoteke. Najmanje: %{smart_count}"
		},
		selectFileNamed: "Izaberite fajl %{name}",
		unselectFileNamed: "Isključite fajl %{name}",
		openFolderNamed: "Otvori folder %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.sr_RS_Latin = Sm);
})), wm = /* @__PURE__ */ c({ default: () => Tm }), Tm, Em = o((() => {
	Tm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Tm.strings = {
		addBulkFilesFailed: {
			0: "Kunde inte lägga till %{smart_count} fil på grund av ett internt fel",
			1: "Kunde inte lägga till %{smart_count} filer på grund av interna fel"
		},
		addedNumFiles: "Lade till %{numFiles} fil(er)",
		addingMoreFiles: "Lägger till fler filer",
		additionalRestrictionsFailed: "%{count} ytterligare begränsningar uppfylldes inte",
		addMore: "Lägg till",
		addMoreFiles: "Lägg till filer",
		aggregateExceedsSize: "Du valde %{size} filer, men maximal tillåten storlek är %{sizeAllowed}",
		allFilesFromFolderNamed: "Alla filer från mappen %{name}",
		allowAccessDescription: "För att kunna ta bilder eller spela in video behöver du ge sidan behörighet att använda din kamera.",
		allowAccessTitle: "Tillåt användning av kameran",
		allowAudioAccessDescription: "För att spela in ljud måste du tillåta mikrofonbehörighet för denna sida.",
		allowAudioAccessTitle: "Tillåt åtkomst till mikrofonen",
		aspectRatioLandscape: "Beskär liggande (16:9)",
		aspectRatioPortrait: "Beskär stående (9:16)",
		aspectRatioSquare: "Beskär fyrkant",
		authAborted: "Autentisering avbröts",
		authenticate: "Anslut",
		authenticateWith: "Anslut till %{pluginName}",
		authenticateWithTitle: "Anslut till %{pluginName} för att välja filer",
		back: "Tillbaka",
		browse: "bläddra",
		browseFiles: "bläddra",
		browseFolders: "bläddra mappar",
		cancel: "Avbryt",
		cancelUpload: "Avbryt uppladdning",
		closeModal: "Stäng fönster",
		companionError: "Anslutning till Companion misslyckades",
		companionUnauthorizeHint: "För att koppla bort ditt %{provider}-konto, gå till %{url}",
		complete: "Klart",
		compressedX: "Sparade %{size} genom att komprimera bilder",
		compressingImages: "Komprimerar bilder...",
		connectedToInternet: "Ansluten till internet",
		copyLink: "Kopiera länk",
		copyLinkToClipboardFallback: "Kopiera länken nedanför",
		copyLinkToClipboardSuccess: "Länken kopierad till urklipp",
		creatingAssembly: "Förbereder uppladdning...",
		creatingAssemblyFailed: "Transloadit: Kunde inte skapa Assembly",
		dashboardTitle: "Filuppladdare",
		dashboardWindowTitle: "Uppladdningsfönster (Tryck på Esc-tangenten för att stänga)",
		dataUploadedOfTotal: "%{complete} av %{total}",
		dataUploadedOfUnknown: "%{complete} av okänd storlek",
		discardMediaFile: "Kasta mediafil",
		discardRecordedFile: "Kasta inspelad fil",
		done: "Klart",
		dropHint: "Släpp dina filer här",
		dropPasteBoth: "Släpp filer här, %{browseFiles} eller %{browseFolders}",
		dropPasteFiles: "Släpp filer här eller %{browseFiles}",
		dropPasteFolders: "Släpp filer här eller %{browseFolders}",
		dropPasteImportBoth: "Släpp filer här, %{browseFiles}, %{browseFolders} eller importera från:",
		dropPasteImportFiles: "Släpp filer här, %{browseFiles} eller importera från:",
		dropPasteImportFolders: "Släpp filer här, %{browseFolders} eller importera från:",
		editFile: "Redigera fil",
		editFileWithFilename: "Redigera fil %{file}",
		editImage: "Redigera bild",
		editing: "Redigerar %{file}",
		emptyFolderAdded: "Inga filer lades till från en tom mapp",
		encoding: "Kodar...",
		enterCorrectUrl: "Ogiltig URL: Kontrollera att adressen du anger är en direktlänk till en fil.",
		enterUrlToImport: "Ange URL för att importera en fil",
		error: "Fel",
		exceedsSize: "%{file} överskrider maximal tillåten storlek på %{size}",
		failedToFetch: "Companion kunde inte ladda ner filen, kontrollera att adressen är korrekt",
		failedToUpload: "Kunde inte ladda upp %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} av %{smart_count} fil uppladdad",
			1: "%{complete} av %{smart_count} filer uppladdade"
		},
		filter: "Filtrera",
		finishEditingFile: "Avsluta redigering av filen",
		flipHorizontal: "Vänd horisontellt",
		folderAdded: {
			0: "La till %{smart_count} fil från %{folder}",
			1: "La till %{smart_count} filer från %{folder}"
		},
		folderAlreadyAdded: "Mappen \"%{folder}\" har redan lagts till",
		generatingThumbnails: "Genererar miniatyrer...",
		import: "Importera",
		importFiles: "Importera filer från:",
		importFrom: "Importera från %{name}",
		inferiorSize: "Filen är mindre än tillåten storlek på %{size}",
		loadedXFiles: "Laddade %{numFiles} filer",
		loading: "Laddar...",
		logIn: "Logga in",
		logOut: "Logga ut",
		micDisabled: "Mikrofonåtkomst nekad av användaren",
		missingRequiredMetaField: "Obligatoriskt metadatfält saknas",
		missingRequiredMetaFieldOnFile: "Obligatoriskt metadatfält saknas i %{fileName}",
		missingRequiredMetaFields: {
			0: "Obligatoriskt metadatfält saknas: %{fields}.",
			1: "Obligatoriska metadatfält saknas: %{fields}."
		},
		myDevice: "Min enhet",
		noAudioDescription: "Anslut en mikrofon eller annan ljudenhet för att spela in ljud",
		noAudioTitle: "Mikrofon ej tillgänglig",
		noCameraDescription: "Anslut en kamera för att ta bilder eller spela in video",
		noCameraTitle: "Kamera ej tillgänglig",
		noDuplicates: "Kan inte lägga till den dubblerade filen '%{fileName}', den finns redan",
		noFilesFound: "Du har inga filer eller mappar här",
		noInternetConnection: "Ingen internetuppkoppling",
		noMoreFilesAllowed: "Kan inte lägga till fler filer",
		noSearchResults: "Inga resultat hittades för denna sökning",
		openFolderNamed: "Öppna mappen %{name}",
		pause: "Pausa",
		paused: "Pausad",
		pauseUpload: "Pausa uppladdning",
		pickFiles: "Välj filer",
		pickPhotos: "Välj bilder",
		pleaseWait: "Vänta...",
		pluginNameAudio: "Ljud",
		pluginNameBox: "Box",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameGoogleDrivePicker: "Google Drive",
		pluginNameGooglePhotosPicker: "Google Foton",
		pluginNameOneDrive: "OneDrive",
		pluginNameScreenCapture: "Skärminspelning",
		pluginNameUnsplash: "Unsplash",
		pluginNameUrl: "Länk",
		pluginNameWebdav: "WebDAV",
		pluginNameZoom: "Zoom",
		pluginWebdavInputLabel: "WebDAV URL för en fil (t.ex. från ownCloud eller Nextcloud)",
		poweredBy: "Drivs av %{uppy}",
		processingXFiles: {
			0: "Processerar %{smart_count} fil",
			1: "Processerar %{smart_count} filer"
		},
		recording: "Spelar in",
		recordingLength: "Inspelningens längd %{recording_length}",
		recordingStoppedMaxSize: "Inspelningen stoppades eftersom filstorleken snart överskrider gränsen",
		recordVideoBtn: "Spela in video",
		recoveredAllFiles: "Vi återställde alla filer. Du kan nu återuppta uppladdningen.",
		recoveredXFiles: {
			0: "Vi kunde inte helt återställa 1 fil. Välj om den och återuppta uppladdningen.",
			1: "Vi kunde inte helt återställa %{smart_count} filer. Välj om dem och återuppta uppladdningen."
		},
		removeFile: "Ta bort fil",
		reSelect: "Välj om",
		resetFilter: "Nollställ filter",
		resetSearch: "Nollställ sökning",
		resume: "Återuppta",
		resumeUpload: "Återuppta uppladdning",
		retry: "Försök igen",
		retryUpload: "Försök igen",
		revert: "Återställ",
		rotate: "Rotera 90°",
		save: "Spara",
		saveChanges: "Spara ändringar",
		search: "Sök",
		searchImages: "Sök efter bilder",
		selectX: {
			0: "Välj %{smart_count}",
			1: "Välj %{smart_count}"
		},
		sessionRestored: "Sessionen återställd",
		showErrorDetails: "Visa felinformation",
		signInWithGoogle: "Logga in med Google",
		smile: "Säg omelett!",
		startAudioRecording: "Starta ljudinspelning",
		startCapturing: "Starta skärminspelning",
		startRecording: "Starta inspelning",
		stopAudioRecording: "Stoppa ljudinspelning",
		stopCapturing: "Stoppa skärminspelning",
		stopRecording: "Avbryt inspelning",
		streamActive: "Ström aktiv",
		streamPassive: "Ström passiv",
		submitRecordedFile: "Skicka inspelad fil",
		takePicture: "Ta en bild",
		takePictureBtn: "Ta bild",
		takeScreenshot: "Ta skärmdump",
		unnamed: "Namnlös",
		upload: "Ladda upp",
		uploadComplete: "Uppladdning slutförd",
		uploadFailed: "Uppladdning misslyckad",
		uploading: "Laddar upp",
		uploadingXFiles: {
			0: "Laddar upp %{smart_count} fil",
			1: "Laddar upp %{smart_count} filer"
		},
		uploadPaused: "Uppladdning pausad",
		uploadStalled: "Uppladdningen har stått still i %{seconds} sekunder. Du kanske vill försöka igen.",
		uploadXFiles: {
			0: "Ladda upp %{smart_count} fil",
			1: "Ladda upp %{smart_count} filer"
		},
		uploadXNewFiles: {
			0: "Ladda upp +%{smart_count} fil",
			1: "Ladda upp +%{smart_count} filer"
		},
		xFilesSelected: {
			0: "%{smart_count} fil vald",
			1: "%{smart_count} filer valda"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} fil tillagd",
			1: "%{smart_count} filer tillagda"
		},
		xTimeLeft: "%{time} återstår",
		youCanOnlyUploadFileTypes: "Du kan endast ladda upp: %{types}",
		youCanOnlyUploadX: {
			0: "Du kan endast ladda upp %{smart_count} fil",
			1: "Du kan endast ladda upp %{smart_count} filer"
		},
		youHaveToAtLeastSelectX: {
			0: "Du måste välja minst %{smart_count} fil",
			1: "Du måste välja minst %{smart_count} filer"
		},
		zoomIn: "Zooma in",
		zoomOut: "Zooma ut"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.sv_SE = Tm);
})), Dm = /* @__PURE__ */ c({ default: () => Om }), Om, km = o((() => {
	Om = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Om.strings = {
		addBulkFilesFailed: {
			0: "ไม่สามารถเพิ่ม %{smart_count} ไฟล์ เนื่องจากข้อผิดพลาดภายใน",
			1: "ไม่สามารถเพิ่ม %{smart_count} ไฟล์ เนื่องจากข้อผิดพลาดภายใน"
		},
		addMore: "เพิ่ม",
		addMoreFiles: "เพิ่มไฟล์",
		addingMoreFiles: "กำลังเพิ่มไฟล์",
		allowAccessDescription: "ในการถ่ายภาพหรือบันทึกวิดีโอด้วยกล้องของคุณ โปรดอนุญาตการเข้าถึงกล้อง",
		allowAccessTitle: "กรุณากดปุ่มยอมรับเพื่อใช้งานกล้อง",
		aspectRatioLandscape: "ครอบตัดภาพทิวทัศน์ (16:9)",
		aspectRatioPortrait: "ครอบตัดภาพบุคคล (9:16)",
		aspectRatioSquare: "ครอบตัดสี่เหลี่ยม",
		authenticateWith: "เชื่อมต่อกับ %{pluginName}",
		authenticateWithTitle: "กรุณาเข้าใช้งานกับ %{pluginName} เพื่อเลือกไฟล์",
		back: "ย้อนกลับ",
		browse: "เรียกดู",
		browseFiles: "เรียกดู",
		browseFolders: "เรียกดูทั้งโฟลเดอร์",
		cancel: "ยกเลิก",
		cancelUpload: "ยกเลิกการอัปโหลด",
		closeModal: "ปิดหน้าต่างนี้",
		companionError: "การเชื่อมต่อกับ Companion ล้มเหลว",
		companionUnauthorizeHint: "หากคุณต้องการลงชื่อออกจาก %{provider}, กรุณาไปที่ %{url}",
		complete: "สำเร็จ",
		connectedToInternet: "เชื่อมต่อกับอินเทอร์เน็ตสำเร็จ",
		copyLink: "คัดลอกลิงค์",
		copyLinkToClipboardFallback: "คัดลอก URL ด้านล่าง",
		copyLinkToClipboardSuccess: "ลิงก์ถูกคัดลอกไปยังคลิปบอร์ด",
		creatingAssembly: "กำลังเตรียมอัพโหลด...",
		creatingAssemblyFailed: "Transloadit: ไม่สามารถสร้าง Assembly",
		dashboardTitle: "ตัวอัพโหลดไฟล์",
		dashboardWindowTitle: "หน้าต่างอัพโหลดไฟล์ (กด escape เพื่อปิด)",
		dataUploadedOfTotal: "%{complete} จาก %{total}",
		done: "เสร็จสิ้น",
		dropHint: "ลากไฟล์มาวางที่นี่",
		dropPasteBoth: "ลากไฟล์มาวางที่นี่ หรือเลือก %{browse}",
		dropPasteFiles: "ลากไฟล์มาวางที่นี่ หรือเลือก %{browse}",
		dropPasteFolders: "ลากไฟล์มาวางที่นี่ หรือเลือก %{browse}",
		dropPasteImportBoth: "ลากไฟล์มาวางที่นี่ หรือ %{browse} หรือ เปิดกล้อง",
		dropPasteImportFiles: "ลากไฟล์มาวางที่นี่ หรือ %{browse} หรือ เปิดกล้อง",
		dropPasteImportFolders: "ลากไฟล์มาวางที่นี่ หรือ %{browse} หรือ เปิดกล้อง",
		editFile: "แก้ไขไฟล์",
		editImage: "แก้ไขภาพ",
		editing: "กำลังแก้ไข %{file}",
		emptyFolderAdded: "ไม่สามารถเพิ่มไฟล์จากโฟลเดอร์ว่าง",
		encoding: "กำลังเข้ารหัส...",
		enterCorrectUrl: "URL ไม่ถูกต้อง: โปรดตรวจสอบให้แน่ใจว่าคุณป้อน direct link",
		enterUrlToImport: "ป้อน URL เพื่อนำเข้าไฟล์",
		exceedsSize: "ไฟล์นี้มีขนาดเกินขนาดสูงสุดที่อนุญาต %{size}",
		failedToFetch: "Companion ไม่สามารถเรียก URL นี้ได้, กรุณาตรวจสอบว่า URL ถูกต้อง",
		failedToUpload: "ไม่สามารถอัปโหลด %{file}",
		fileSource: "ตำแหน่งของไฟล์: %{name}",
		filesUploadedOfTotal: {
			0: "อัพโหลดสำเร็จ %{complete} จากทั้งหมด %{smart_count} ไฟล์",
			1: "อัพโหลดสำเร็จ %{complete} จากทั้งหมด %{smart_count} ไฟล์"
		},
		filter: "ตัวกรอง",
		finishEditingFile: "แก้ไขไฟล์สำเร็จ",
		flipHorizontal: "กลับตามแนวนอน",
		folderAdded: {
			0: "เพิ่ม %{smart_count} ไฟล์จาก %{folder}",
			1: "เพิ่ม %{smart_count} ไฟล์จาก %{folder}"
		},
		generatingThumbnails: "กำลังสร้างภาพขนาดย่อ...",
		import: "นำเข้า",
		importFrom: "นำเข้าจาก %{name}",
		inferiorSize: "ไฟล์นี้มีขนาดเล็กกว่าขนาดไฟล์ที่กำหนด %{size}",
		loading: "กำลังโหลด...",
		logOut: "ออกจากระบบ",
		micDisabled: "ไมโครโฟนถูกปิดโดยผู้ใช้",
		myDevice: "ภาพในเครื่อง",
		noCameraDescription: "ในการถ่ายภาพหรือบันทึกวิดีโอโปรดเชื่อมต่ออุปกรณ์กล้อง",
		noCameraTitle: "กล้องไม่พร้อมใช้งาน",
		noDuplicates: "ไม่สามารถเพิ่มไฟล์ซ้ำได้ ไฟล์ '%{fileName}', มีอยู่แล้ว",
		noFilesFound: "คุณไม่มีไฟล์หรือโฟลเดอร์ที่นี่",
		noInternetConnection: "ไม่มีการเชื่อมต่ออินเทอร์เน็ต",
		noMoreFilesAllowed: "ไม่สามารถเพิ่มไฟล์ใหม่: กำลังอยู่ระหว่างอัพโหลด",
		openFolderNamed: "เปิดโฟลเดอร์ %{name}",
		pause: "หยุดชั่วคราว",
		pauseUpload: "หยุดการอัปโหลดชั่วคราว",
		paused: "หยุดชั่วคราว",
		poweredBy: "ขับเคลื่อนโดย %{uppy}",
		processingXFiles: {
			0: "กำลังประมวลผล %{smart_count} ไฟล์",
			1: "กำลังประมวลผล %{smart_count} ไฟล์"
		},
		recording: "กำลังบันทึก",
		recordingLength: "ความยาว %{recording_length}",
		recordingStoppedMaxSize: "หยุดการบันทึกเนื่องจากขนาดไฟล์กำลังเกินขีดจำกัด",
		removeFile: "ลบไฟล์",
		resetFilter: "รีเซ็ตตัวกรอง",
		resume: "ทำต่อ",
		resumeUpload: "ทำการอัปโหลดต่อ",
		retry: "ลองใหม่อีกครั้ง",
		retryUpload: "ลองอัพโหลดใหม่",
		revert: "เปลี่ยนกลับ",
		rotate: "หมุน",
		save: "บันทึก",
		saveChanges: "บันทึกการแก้ไข",
		selectFileNamed: "เลือกไฟล์ %{name}",
		selectX: {
			0: "เลือก %{smart_count}",
			1: "เลือก %{smart_count}"
		},
		smile: "ยิ้ม!",
		startCapturing: "เริ่มการจับภาพหน้าจอ",
		startRecording: "เริ่มการบันทึกวิดีโอ",
		stopCapturing: "หยุดการจับภาพหน้าจอ",
		stopRecording: "หยุดการบันทึกวิดีโอ",
		streamActive: "สตรีมทำงานอยู่",
		streamPassive: "สตรีมแบบพาสซีฟ",
		submitRecordedFile: "ส่งวิดีโอที่ถ่าย",
		takePicture: "ถ่ายภาพ",
		timedOut: "ยกเลิก, ไม่สามารถอัพโหลดไฟล์ได้เป็นเวลา %{seconds} วินาที",
		unselectFileNamed: "ยกเลิกการเลือกไฟล์ %{name}",
		upload: "อัพโหลด",
		uploadComplete: "อัพโหลดไฟล์สำเร็จ",
		uploadFailed: "อัปโหลดไฟล์ไม่สำเร็จ",
		uploadPaused: "หยุดอัปโหลดไฟล์ชั่วคราว",
		uploadXFiles: {
			0: "กำลังอัพโหลด %{smart_count} ไฟล์",
			1: "กำลังอัพโหลด %{smart_count} ไฟล์"
		},
		uploadXNewFiles: {
			0: "กำลังอัพโหลด +%{smart_count} ไฟล์",
			1: "กำลังอัพโหลด +%{smart_count} ไฟล์"
		},
		uploading: "Uploading",
		uploadingXFiles: {
			0: "กำลังอัพโหลด %{smart_count} ไฟล์",
			1: "กำลังอัพโหลด %{smart_count} ไฟล์"
		},
		xFilesSelected: {
			0: "%{smart_count} ไฟล์ถูกเลือก",
			1: "%{smart_count} ไฟล์ถูกเลือก"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} ไฟล์ที่สามารถเพิ่มได้",
			1: "%{smart_count} ไฟล์ที่สามารถเพิ่มได้"
		},
		xTimeLeft: "เหลืออีก %{time}",
		youCanOnlyUploadFileTypes: "คุณสามารถอัพโหลดได้แค่: %{types}",
		youCanOnlyUploadX: {
			0: "คุณสามารถอัพโหลดได้แค่ %{smart_count} ไฟล์",
			1: "คุณสามารถอัพโหลดได้แค่ %{smart_count} ไฟล์"
		},
		youHaveToAtLeastSelectX: {
			0: "คุณต้องเลือกอย่างน้อย %{smart_count} ไฟล์",
			1: "คุณต้องเลือกอย่างน้อย %{smart_count} ไฟล์"
		},
		zoomIn: "ซูมเข้า",
		zoomOut: "ซูมออก"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.th_TH = Om);
})), Am = /* @__PURE__ */ c({ default: () => jm }), jm, Mm = o((() => {
	jm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, jm.strings = {
		addMore: "Daha ekle",
		addMoreFiles: "Daha fazla dosya ekle",
		addingMoreFiles: "Daha fazla dosya ekleniyor",
		allowAccessDescription: "Kameranızla fotoğraf çekmek veya video kaydetmek için lütfen erişim izni verin.",
		allowAccessTitle: "Lütfen kameranıza erişim izni verin",
		authenticateWith: "%{pluginName} ile bağlan",
		authenticateWithTitle: "Lütfen dosyaları seçmek için %{pluginName} ile bağlanın",
		back: "Geri",
		browse: "gözat",
		browseFiles: "gözat",
		cancel: "İptal",
		cancelUpload: "Yüklemeyi İptal Et",
		closeModal: "Kapat",
		companionError: "Bağlantı başarısız",
		complete: "Yüklendi",
		connectedToInternet: "İnternete bağlanıldı",
		copyLink: "Linki kopyala",
		copyLinkToClipboardFallback: "Aşağıdaki linki kopyala",
		copyLinkToClipboardSuccess: "Link panoya kopyalandı",
		creatingAssembly: "Yüklemeye hazırlanıyor...",
		creatingAssemblyFailed: "Transloadit: Yükleme oluşturulamadı",
		dashboardTitle: "Dosya Yükle",
		dashboardWindowTitle: "Dosya Yükle (Kapatmak için Esc)",
		dataUploadedOfTotal: "%{complete} / %{total}",
		done: "Bitti",
		dropHint: "Buraya sürükleyip bırakın",
		dropPasteBoth: "Sürükleyip bırak, yapıştır veya %{browse}",
		dropPasteFiles: "Sürükleyip bırak, yapıştır veya %{browse}",
		dropPasteFolders: "Sürükleyip bırak, yapıştır veya %{browse}",
		dropPasteImportBoth: "Sürükleyip bırak, yapıştır, %{browse} veya içeri aktar",
		dropPasteImportFiles: "Sürükleyip bırak, yapıştır, %{browse} veya içeri aktar",
		dropPasteImportFolders: "Sürükleyip bırak, yapıştır, %{browse} veya içeri aktar",
		editFile: "Dosyayı düzenle",
		editImage: "Resmi Düzenle",
		editing: "%{file} düzenleniyor",
		emptyFolderAdded: "Klasör boş",
		encoding: "Çözümleniyor...",
		enterCorrectUrl: "Hatalı URL: Lütfen bir dosyaya doğrudan bağlantı girdiğinizden emin olun.",
		enterUrlToImport: "Dosya URL’sini buraya yapıştırın",
		exceedsSize: "Bu dosya izin verilen maksimum boyutu aşıyor %{size}",
		failedToFetch: "Bu URL’den alınamadı, lütfen doğru olduğundan emin olun",
		failedToUpload: "%{file} dosyası yüklenemedi",
		fileSource: "Dosya kaynağı: %{name}",
		filesUploadedOfTotal: {
			0: "%{complete} / %{smart_count} dosya yüklendi",
			1: "%{complete} / %{smart_count} dosya yüklendi"
		},
		filter: "Filtre",
		finishEditingFile: "Düzenlemeyi bitir",
		folderAdded: {
			0: "%{folder} klasöründen %{smart_count} dosya eklendi",
			1: "%{folder} klasöründen %{smart_count} dosya eklendi"
		},
		import: "Ekle",
		importFrom: "%{name} Ekle",
		loading: "Yükleniyor...",
		logOut: "Çıkış",
		myDevice: "Dosyalarım",
		noFilesFound: "Dosya veya klasör bulunamadı",
		noInternetConnection: "İnternet bağlantınız yok",
		pause: "Durdur",
		pauseUpload: "Yükleme Durdu",
		paused: "Durdu",
		poweredBy: "Powered by %{uppy}",
		processingXFiles: {
			0: "%{smart_count} dosya işleniyor",
			1: "%{smart_count} dosya işleniyor"
		},
		removeFile: "Dosyayı kaldır",
		resetFilter: "Filtreyi temizle",
		resume: "Devam Et",
		resumeUpload: "Yüklemeye devam et",
		retry: "Tekrar",
		retryUpload: "Tekrar yükle",
		saveChanges: "Değişiklikleri kaydet",
		selectX: {
			0: "%{smart_count} seç",
			1: "%{smart_count} seç"
		},
		smile: "Gülümse!",
		startRecording: "Video kaydına başla",
		stopRecording: "Video kaydını durdur",
		takePicture: "Fotoğraf çek",
		timedOut: "Yükleme işlemi %{seconds} saniyeden fazla sürdüğü için iptal edildi.",
		upload: "Yükle",
		uploadComplete: "Yükleme tamamlandı",
		uploadFailed: "Yükleme başarısız",
		uploadPaused: "Yükleme durduruldu",
		uploadXFiles: {
			0: "%{smart_count} dosyayı yükle",
			1: "%{smart_count} dosyayı yükle"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} dosyayı yükle",
			1: "+%{smart_count} dosyayı yükle"
		},
		uploading: "Yükleniyor",
		uploadingXFiles: {
			0: "%{smart_count} dosya yükleniyor",
			1: "%{smart_count} dosya yükleniyor"
		},
		xFilesSelected: {
			0: "%{smart_count} dosya seçildi",
			1: "%{smart_count} dosya seçildi"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} dosya daha eklendi",
			1: "%{smart_count} dosya daha eklendi"
		},
		xTimeLeft: "kalan süre %{time}",
		youCanOnlyUploadFileTypes: "Sadece %{types} yükleyebilirsiniz",
		youCanOnlyUploadX: {
			0: "Sadece %{smart_count} dosya yükleyebilirsiniz",
			1: "Sadece %{smart_count} dosya yükleyebilirsiniz"
		},
		youHaveToAtLeastSelectX: {
			0: "En az %{smart_count} dosya seçmelisin",
			1: "En az %{smart_count} dosya seçmelisin"
		},
		selectFileNamed: "Dosya Seç %{name}",
		unselectFileNamed: "Dosya seçimini kaldır %{name}",
		openFolderNamed: "Açık dosya %{name}"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.tr_TR = jm);
})), Nm = /* @__PURE__ */ c({ default: () => Pm }), Pm, Fm = o((() => {
	Pm = {
		strings: {},
		pluralize(e) {
			return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		}
	}, Pm.strings = {
		addBulkFilesFailed: {
			0: "Не вдалося додати файл %{smart_count} через внутрішню помилку",
			1: "Не вдалося додати %{smart_count} файли через внутрішні помилки",
			2: "Не вдалося додати %{smart_count} файлів через внутрішні помилки"
		},
		addingMoreFiles: "Додавання додаткових файлів",
		addMore: "Додати ще",
		addMoreFiles: "Додати ще файли",
		allFilesFromFolderNamed: "Всі файли з папки %{name}",
		allowAccessDescription: "Щоб зробити фото або відео, будь ласка, дозвольте доступ до камери для цього сайту",
		allowAccessTitle: "Будь ласка, дозвольте доступ до вашої камери",
		allowAudioAccessDescription: "Для запису звуку, будь ласка, надайте доступ до мікрофону для цього сайту.",
		allowAudioAccessTitle: "Дозвольте доступ до мікрофону",
		aspectRatioLandscape: "Обрізати альбомний режим (16:9)",
		aspectRatioPortrait: "Обрізати портрет (9:16)",
		aspectRatioSquare: "Обрізати квадрат",
		authAborted: "Автентифікація перервана",
		authenticateWith: "Під'єднатися до %{pluginName}",
		authenticateWithTitle: "Будь ласка, авторизуйтесь у %{pluginName}, щоб обрати файли",
		back: "Назад",
		browse: "оберіть",
		browseFiles: "оберіть",
		browseFolders: "огляд тек",
		cancel: "Скасувати",
		cancelUpload: "Скасувати завантаження",
		closeModal: "Закрити вікно",
		companionError: "Не вдалося під'єднатися до Companion",
		companionUnauthorizeHint: "Щоб скасувати авторизацію вашого облікового запису %{provider}, перейдіть на %{url}",
		complete: "Готово",
		compressedX: "Збережено %{size} шляхом стискання зображень",
		compressingImages: "Стиснення зображень...",
		connectedToInternet: "Під'єднано до інтернету",
		copyLink: "Копіювати посилання",
		copyLinkToClipboardFallback: "Скопіюйте посилання",
		copyLinkToClipboardSuccess: "Посилання скопійована в буфер обміну",
		creatingAssembly: "Підготовка до завантаження...",
		creatingAssemblyFailed: "Transloadit: не вдалося згенерувати Assembly",
		dashboardTitle: "Завантажувач файлів",
		dashboardWindowTitle: "Вікно завантажувача файлів (натисніть escape, щоб закрити)",
		dataUploadedOfTotal: "%{complete} із %{total}",
		discardRecordedFile: "Відкинути записаний файл",
		done: "Готово",
		dropHint: "Перетягніть файли сюди",
		dropPasteBoth: "Перетягніть файли, вставте або %{browse}",
		dropPasteFiles: "Перетягніть файли, вставте або %{browse}",
		dropPasteFolders: "Перетягніть файли, вставте або %{browse}",
		dropPasteImportBoth: "Перетягніть файли, вставте, %{browse} або імпортуйте з:",
		dropPasteImportFiles: "Перетягніть файли, вставте, %{browse} або імпортуйте з:",
		dropPasteImportFolders: "Перетягніть файли, вставте, %{browse} або імпортуйте з:",
		editFile: "Редагувати файл",
		editImage: "Редагувати зображення",
		editFileWithFilename: "Редагувати файл %{file}",
		editing: "Редагується %{file}",
		emptyFolderAdded: "Файли не додано — тека порожня",
		encoding: "Обробка...",
		enterCorrectUrl: "Невірна адреса: будь ласка, переконайтеся що ви використовуєте пряме посилання на файл",
		enterTextToSearch: "Введіть текст для пошуку зображень",
		enterUrlToImport: "Введіть адресу, щоб імпортувати файл",
		exceedsSize: "Цей файл більше максимально дозволеного розміру в %{size}",
		failedToFetch: "Companion не зміг завантажити файл за посиланням, будь ласка, переконайтеся, що адреса вірна",
		failedToUpload: "Помилка завантаження %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} із %{smart_count} файл завантажено",
			1: "%{complete} із %{smart_count} файлів завантажено",
			2: "%{complete} із %{smart_count} файлів завантажено"
		},
		filter: "Фільтр",
		finishEditingFile: "Завершити редагування файлу",
		flipHorizontal: "Віддзеркалити горизонтально",
		folderAdded: {
			0: "Додано %{smart_count} файл із %{folder}",
			1: "Додано %{smart_count} файли із %{folder}",
			2: "Додано %{smart_count} файлів із %{folder}"
		},
		folderAlreadyAdded: "Папка \"%{folder}\" вже додана",
		generatingThumbnails: "Створення мініатюр...",
		import: "Імпортувати",
		importFiles: "Імпортувати файли з:",
		importFrom: "Імпортувати з %{name}",
		inferiorSize: "Цей файл менший за дозволений розмір %{size}",
		loading: "Завантаження...",
		logOut: "Вийти",
		micDisabled: "Доступ до мікрофона заборонений користувачем",
		missingRequiredMetaField: "Відсутні обов'язкові поля meta",
		missingRequiredMetaFieldOnFile: "У %{fileName} відсутні обов'язкові поля meta",
		missingRequiredMetaFields: {
			0: "Відсутнє обов'язкове поле meta: %{fields}.",
			1: "Відсутні обов'язкові поля meta: %{fields}.",
			2: "Відсутні обов'язкові поля meta: %{fields}."
		},
		myDevice: "Мій пристрій",
		noAudioDescription: "Для запису аудіо, підключіть мікрофон або інший пристрій введення звуку",
		noAudioTitle: "Мікрофон недоступний",
		noCameraDescription: "Для того, щоб робити зображення чи запис відео, будь ласка, підключіть пристрій камери",
		noCameraTitle: "Камера недоступна",
		noDuplicates: "Не вдається додати дублікат файлу '%{fileName}, він уже існує",
		noFilesFound: "Тут відсутні файли або теки",
		noInternetConnection: "Відсутнє підключення до мережі Інтернет",
		noMoreFilesAllowed: "Не вдалося додати більше файлів",
		openFolderNamed: "Відкрити теку %{name}",
		pause: "Поставити на паузу",
		paused: "На паузі",
		pauseUpload: "Поставити завантаження на паузу",
		pluginNameAudio: "Звук",
		pluginNameBox: "Box",
		pluginNameCamera: "Камера",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "Працює на %{uppy}",
		processingXFiles: {
			0: "Обробляється %{smart_count} файл",
			1: "Обробляється %{smart_count} файли",
			2: "Обробляється %{smart_count} файлів"
		},
		recording: "Запис",
		recordingLength: "Тривалість запису %{recording_length}",
		recordingStoppedMaxSize: "Запис зупинено, оскільки розмір файлу перевищить ліміт",
		recordVideoBtn: "Записати Відео",
		recoveredAllFiles: "Ми відновили всі файли. Ви можете продовжити завантаження.",
		recoveredXFiles: {
			0: "Ми не змогли повністю відновити 1 файл. Будь ласка, повторно виберіть його і відновіть завантаження.",
			1: "Ми не змогли повністю відновити %{smart_count} файли. Будь ласка, повторно виберіть їх і відновіть завантаження.",
			2: "Ми не змогли повністю відновити %{smart_count} файлів. Будь ласка, повторно виберіть їх і відновіть завантаження."
		},
		removeFile: "Знищити файл",
		reSelect: "Обрати повторно",
		resetFilter: "Скинути фільтр",
		resume: "Продовжити",
		resumeUpload: "Продовжити завантаження",
		retry: "Спробувати знову",
		retryUpload: "Повторити спробу завантаження",
		revert: "Скасувати зміни",
		rotate: "Повернути",
		save: "Зберегти",
		saveChanges: "Зберегти зміни",
		search: "Пошук",
		searchImages: "Пошук зображень",
		selectX: {
			0: "Обрати %{smart_count}",
			1: "Обрати %{smart_count}",
			2: "Обрати %{smart_count}"
		},
		sessionRestored: "Сеанс відновлено",
		showErrorDetails: "Показати деталі помилки",
		signInWithGoogle: "Увійти за допомогою Google",
		smile: "Посміхніться!",
		startAudioRecording: "Почати запис аудіо",
		startCapturing: "Почати захоплення екрана",
		startRecording: "Почати запис відео",
		stopAudioRecording: "Зупинити запис аудіо",
		stopCapturing: "Зупинити захоплення екрана",
		stopRecording: "Закінчити запис відео",
		streamActive: "Потік активний",
		streamPassive: "Потік пасивний",
		submitRecordedFile: "Надіслати записаний файл",
		takePicture: "Зробити фотографію",
		takePictureBtn: "Зробити знімок",
		timedOut: "Завантаження зупинилося на %{seconds} сек., скасування",
		upload: "Завантажити",
		uploadComplete: "Завантаження завершено",
		uploadFailed: "Завантаження не вдале",
		uploading: "Завантаження",
		uploadingXFiles: {
			0: "Завантажується %{smart_count} файл",
			1: "Завантажується %{smart_count} файли",
			2: "Завантажується %{smart_count} файлів"
		},
		uploadPaused: "Завантаження на паузі",
		uploadXFiles: {
			0: "Завантажити %{smart_count} файл",
			1: "Завантажити %{smart_count} файли",
			2: "Завантажити %{smart_count} файлів"
		},
		uploadXNewFiles: {
			0: "Завантажити +%{smart_count} файл",
			1: "Завантажити +%{smart_count} файли",
			2: "Завантажити +%{smart_count} файлів"
		},
		xFilesSelected: {
			0: "%{smart_count} файл обрано",
			1: "%{smart_count} файли обрано",
			2: "%{smart_count} файлів обрано"
		},
		xMoreFilesAdded: {
			0: "%{smart_count} додатковий файл додано",
			1: "%{smart_count} додаткові файли додано",
			2: "%{smart_count} додаткових файлів додано"
		},
		xTimeLeft: "залишилося %{time}",
		youCanOnlyUploadFileTypes: "Ви можете завантажити тільки: %{types}",
		youCanOnlyUploadX: {
			0: "Ви можете завантажити тільки %{smart_count} файл",
			1: "Ви можете завантажити тільки %{smart_count} файли",
			2: "Ви можете завантажити тільки %{smart_count} файлів"
		},
		youHaveToAtLeastSelectX: {
			0: "Ви повинні обрати хоча б %{smart_count} файл",
			1: "Ви повинні обрати хоча б %{smart_count} файли",
			2: "Ви повинні обрати хоча б %{smart_count} файлів"
		},
		zoomIn: "Збільшити",
		zoomOut: "Зменшити"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.uk_UA = Pm);
})), Im = /* @__PURE__ */ c({ default: () => Lm }), Lm, Rm = o((() => {
	Lm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Lm.strings = {
		addBulkFilesFailed: {
			0: "Ichki xatolik tufayli %{smart_count} faylni qo‘shib bo‘lmadi",
			1: "Ichki xatolar tufayli %{smart_count} ta fayl qo‘shib bo‘lmadi"
		},
		addingMoreFiles: "Ko'proq fayllar qo'shilmoqda",
		addMore: "Yana qoʻshing",
		addMoreFiles: "Ko'proq fayllar qo'shing",
		allFilesFromFolderNamed: "%{name} jildidagi barcha fayllar",
		allowAccessDescription: "Kamerangiz bilan suratga olish yoki video yozib olish uchun ushbu sayt uchun kameradan foydalanishga ruxsat bering.",
		allowAccessTitle: "Iltimos, kamerangizga kirishga ruxsat bering",
		allowAudioAccessDescription: "Audio yozib olish uchun ushbu sayt uchun mikrofondan foydalanishga ruxsat bering.",
		allowAudioAccessTitle: "Mikrofonga kirishga ruxsat bering",
		aspectRatioLandscape: "Landshaft kesish (16:9)",
		aspectRatioPortrait: "Portretni kesish (9:16)",
		aspectRatioSquare: "Kvadrat kesish",
		authAborted: "Autentifikatsiya bekor qilindi",
		authenticateWith: "%{pluginName} ga ulaning",
		authenticateWithTitle: "Fayllarni tanlash uchun %{pluginName} bilan autentifikatsiya qiling",
		back: "Orqaga",
		browse: "ko'rib chiqish",
		browseFiles: "fayllarni ko'rib chiqish",
		browseFolders: "papkalarni ko'rib chiqish",
		cancel: "Bekor qilish",
		cancelUpload: "Yuklashni bekor qilish",
		closeModal: "Modalni yoping",
		companionError: "Companiya bilan ulanish amalga oshmadi",
		companionUnauthorizeHint: "%{provider} hisobingizga ruxsat berish uchun %{url} sahifasiga o‘ting.",
		complete: "Bajarildi",
		compressedX: "Rasmlarni siqish orqali %{size} saqlangan",
		compressingImages: "Tasvirlar siqilmoqda...",
		connectedToInternet: "Internetga ulangan",
		copyLink: "Havolani nusxalash",
		copyLinkToClipboardFallback: "Quyidagi URL manzilidan nusxa oling",
		copyLinkToClipboardSuccess: "Havola vaqtinchalik xotiraga nusxalandi.",
		creatingAssembly: "Yuklash tayyorlanmoqda...",
		creatingAssemblyFailed: "Transloadit: Assambleyani yaratib bo'lmadi",
		dashboardTitle: "Uppy boshqaruv paneli",
		dashboardWindowTitle: "Uppy asboblar paneli oynasi (yopish uchun escape tugmasini bosing)",
		dataUploadedOfTotal: "%{total} dan %{complete}",
		discardRecordedFile: "Yozib olingan faylni olib tashlang",
		done: "Bajarildi",
		dropHint: "Fayllaringizni shu yerga tashlang",
		dropPasteBoth: "Fayllarni bu yerga, %{browseFiles} yoki %{browseFolders} qoldiring.",
		dropPasteFiles: "Fayllarni bu yerga qo'ying yoki %{browseFiles}",
		dropPasteFolders: "Fayllarni shu yerga yoki %{browseFolders} qoldiring",
		dropPasteImportBoth: "Fayllarni bu yerga tashlang, %{browseFiles}, %{browseFolders} yoki import qiling:",
		dropPasteImportFiles: "Fayllarni bu yerga tashlang, %{browseFiles} yoki import qiling:",
		dropPasteImportFolders: "Fayllarni bu yerga tashlang, %{browseFolders} yoki import qiling:",
		editFile: "Faylni tahrirlash",
		editImage: "Rasmni tahrirlash",
		editFileWithFilename: "%{file} faylini tahrirlash",
		editing: "%{file} tahrirlanmoqda",
		emptyFolderAdded: "Bo'sh jilddan hech qanday fayl qo'shilmadi",
		encoding: "Kodlanmoqda...",
		enterCorrectUrl: "Noto'g'ri URL: faylga to'g'ridan-to'g'ri havolani kiritayotganingizga ishonch hosil qiling",
		enterTextToSearch: "Rasmlarni qidirish uchun matnni kiriting",
		enterUrlToImport: "Faylni import qilish uchun URL manzilini kiriting",
		exceedsSize: "%{file} maksimal ruxsat etilgan %{size} hajmidan oshib ketdi",
		failedToFetch: "Companion bu URL manzilni ololmadi, uning to‘g‘riligiga ishonch hosil qiling",
		failedToUpload: "%{file} yuklanmadi",
		filesUploadedOfTotal: {
			0: "%{smart_count} fayldan %{complete} ta fayl yuklandi",
			1: "%{complete} of %{smart_count} ta fayl yuklangan"
		},
		filter: "Filtr",
		finishEditingFile: "Faylni tahrirlashni tugating",
		flipHorizontal: "Gorizontal aylantiring",
		folderAdded: {
			0: "%{folder} dan %{smart_count} fayl qo‘shildi",
			1: "%{folder} dan %{smart_count} ta fayl qo‘shildi"
		},
		folderAlreadyAdded: "“%{folder}” jild allaqachon qo‘shilgan",
		generatingThumbnails: "Eskiz yaratilmoqda...",
		import: "Import",
		importFiles: "Fayllarni import qiling:",
		importFrom: "%{name} dan import qilish",
		inferiorSize: "Bu fayl ruxsat etilgan %{size} hajmidan kichikroq",
		loading: "Yuklanmoqda...",
		logOut: "Chiqish",
		micDisabled: "Mikrofonga kirish foydalanuvchi tomonidan rad etilgan",
		missingRequiredMetaField: "Majburiy meta-maydonlar yetishmayapti",
		missingRequiredMetaFieldOnFile: "%{fileName} faylida zarur meta-maydonlar yetishmayapti",
		missingRequiredMetaFields: {
			0: "Kerakli meta-maydon yetishmayapti: %{fields}.",
			1: "Kerakli meta-maydonlar etishmayapti: %{fields}."
		},
		myDevice: "Mening qurilmam",
		noAudioDescription: "Ovoz yozish uchun mikrofon yoki boshqa audio kiritish qurilmasini ulang",
		noAudioTitle: "Mikrofon mavjud emas",
		noCameraDescription: "Rasmga olish yoki video yozib olish uchun kamera qurilmasini ulang",
		noCameraTitle: "Kamera mavjud emas",
		noDuplicates: "Ikki nusxadagi “%{fileName}” faylini qo‘shib bo‘lmadi, u allaqachon mavjud",
		noFilesFound: "Bu yerda sizda hech qanday fayl yoki papka yoʻq",
		noInternetConnection: "Internet aloqasi yo'q",
		noMoreFilesAllowed: "Boshqa fayllar qo‘shib bo‘lmaydi",
		openFolderNamed: "%{name} jildini ochish",
		pause: "Pauza",
		paused: "Pauza qilingan",
		pauseUpload: "Yuklashni toʻxtatib turish",
		pluginNameAudio: "Audio",
		pluginNameBox: "Quti",
		pluginNameCamera: "Kamera",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "%{uppy} tomonidan quvvatlanadi",
		processingXFiles: {
			0: "%{smart_count} faylga ishlov berilmoqda",
			1: "%{smart_count} faylga ishlov berilmoqda"
		},
		recording: "Yozib olish",
		recordingLength: "Yozib olish uzunligi %{recording_length}",
		recordingStoppedMaxSize: "Fayl hajmi chegaradan oshib ketayotgani uchun yozib olish to‘xtatildi",
		recordVideoBtn: "Video yozib olish",
		recoveredAllFiles: "Biz barcha fayllarni tikladik. Endi siz yuklashni davom ettirishingiz mumkin.",
		recoveredXFiles: {
			0: "1 ta faylni toʻliq tiklay olmadik. Iltimos, uni qayta tanlang va yuklashni davom ettiring.",
			1: "%{smart_count} ta faylni toʻliq tiklay olmadik. Iltimos, ularni qayta tanlang va yuklashni davom ettiring."
		},
		removeFile: "Faylni o'chirish",
		reSelect: "Qayta tanlang",
		resetFilter: "Filtrni tiklash",
		resume: "Rezyume",
		resumeUpload: "Yuklashni davom ettiring",
		retry: "Qayta urinish",
		retryUpload: "Qayta yuklash",
		revert: "Orqaga qaytarish",
		rotate: "Aylantirish",
		save: "Saqlash",
		saveChanges: "O'zgarishlarni saqlang",
		search: "Qidirmoq",
		searchImages: "Tasvirlarni qidirish",
		selectX: {
			0: "%{smart_count} ni tanlang",
			1: "%{smart_count} ni tanlang"
		},
		sessionRestored: "Seans tiklandi",
		showErrorDetails: "Xato tafsilotlarini ko'rsatish",
		signInWithGoogle: "Google bilan kiring",
		smile: "Tabassum!",
		startAudioRecording: "Ovoz yozishni boshlang",
		startCapturing: "Ekranni suratga olishni boshlang",
		startRecording: "Video yozishni boshlang",
		stopAudioRecording: "Ovoz yozishni to'xtating",
		stopCapturing: "Ekranni suratga olishni to'xtating",
		stopRecording: "Video yozishni to'xtating",
		streamActive: "Oqim faol",
		streamPassive: "Oqim passiv",
		submitRecordedFile: "Yozib olingan faylni yuboring",
		takePicture: "Rasmga oling",
		takePictureBtn: "Rasmga olish",
		timedOut: "Yuklash %{seconds} soniya to‘xtab qoldi, to‘xtatilmoqda.",
		upload: "Yuklash",
		uploadComplete: "Yuklash tugallandi",
		uploadFailed: "Yuklab bo‘lmadi",
		uploading: "Yuklanmoqda",
		uploadingXFiles: {
			0: "%{smart_count} fayl yuklanmoqda",
			1: "%{smart_count} ta fayl yuklanmoqda"
		},
		uploadPaused: "Yuklash to'xtatildi",
		uploadXFiles: {
			0: "%{smart_count} faylni yuklang",
			1: "%{smart_count} faylni yuklang"
		},
		uploadXNewFiles: {
			0: "+%{smart_count} faylni yuklang",
			1: "+%{smart_count} ta fayl yuklang"
		},
		xFilesSelected: {
			0: "%{smart_count} fayl tanlandi",
			1: "%{smart_count} ta fayl tanlandi"
		},
		xMoreFilesAdded: {
			0: "Yana %{smart_count} ta fayl qo‘shildi",
			1: "Yana %{smart_count} ta fayl qo‘shildi"
		},
		xTimeLeft: "%{time} chap",
		youCanOnlyUploadFileTypes: "Siz faqat yuklashingiz mumkin: %{types}",
		youCanOnlyUploadX: {
			0: "Siz faqat %{smart_count} faylni yuklashingiz mumkin",
			1: "Siz faqat %{smart_count} ta faylni yuklashingiz mumkin"
		},
		youHaveToAtLeastSelectX: {
			0: "Siz kamida %{smart_count} faylni tanlashingiz kerak",
			1: "Kamida %{smart_count} ta faylni tanlashingiz kerak"
		},
		zoomIn: "Kattalashtirish",
		zoomOut: "Kichraytirish"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.uz_UZ = Lm);
})), zm = /* @__PURE__ */ c({ default: () => Bm }), Bm, Vm = o((() => {
	Bm = {
		strings: {},
		pluralize(e) {
			return e === 1 ? 0 : 1;
		}
	}, Bm.strings = {
		addBulkFilesFailed: {
			0: "Không thể thêm %{smart_count} tệp do lỗi nội bộ",
			1: "Không thể thêm %{smart_count} tệp do lỗi nội bộ"
		},
		addedNumFiles: "Đã thêm %{numFiles} tệp",
		addingMoreFiles: "Đang thêm tệp",
		additionalRestrictionsFailed: "%{count} ràng buộc bổ sung không được đáp ứng",
		addMore: "Thêm",
		addMoreFiles: "Thêm tệp",
		allFilesFromFolderNamed: "Tất cả tệp từ thư mục %{name}",
		allowAccessDescription: "Để chụp ảnh hoặc quay video bằng máy ảnh của bạn, vui lòng cho phép truy cập máy ảnh cho trang web này.",
		allowAccessTitle: "Vui lòng cho phép truy cập máy ảnh của bạn",
		allowAudioAccessDescription: "Để ghi âm, vui lòng cho phép truy cập microphone cho trang web này.",
		allowAudioAccessTitle: "Vui lòng cho phép truy cập microphone của bạn",
		aspectRatioLandscape: "Cắt ảnh ngang (16:9)",
		aspectRatioPortrait: "Cắt ảnh dọc (9:16)",
		aspectRatioSquare: "Cắt ảnh vuông",
		authAborted: "Xác thực đã bị hủy",
		authenticateWith: "Kết nối với %{pluginName}",
		authenticateWithTitle: "Vui lòng xác thực với %{pluginName} để chọn tệp",
		back: "Quay lại",
		browse: "Duyệt",
		browseFiles: "Duyệt tệp",
		browseFolders: "Duyệt thư mục",
		cancel: "Hủy",
		cancelUpload: "Hủy tải lên",
		closeModal: "Đóng cửa sổ",
		companionError: "Kết nối thất bại",
		companionUnauthorizeHint: "Để hủy ủy quyền tài khoản %{provider} của bạn, vui lòng truy cập %{url}",
		complete: "Hoàn thành",
		compressedX: "Tiết kiệm %{size} bằng cách nén ảnh",
		compressingImages: "Đang nén ảnh...",
		connectedToInternet: "Đã kết nối với Internet",
		copyLink: "Sao chép liên kết",
		copyLinkToClipboardFallback: "Sao chép URL bên dưới",
		copyLinkToClipboardSuccess: "Liên kết đã được sao chép vào clipboard.",
		creatingAssembly: "Đang chuẩn bị tải lên...",
		creatingAssemblyFailed: "Transloadit: Không thể tạo Assembly",
		dashboardTitle: "Bảng điều khiển Uppy",
		dashboardWindowTitle: "Cửa sổ Bảng điều khiển Uppy (Nhấn Esc để đóng)",
		dataUploadedOfTotal: "%{complete} trên %{total}",
		discardRecordedFile: "Hủy tệp đã ghi âm",
		done: "Hoàn tất",
		dropHint: "Kéo và thả tệp của bạn vào đây",
		dropPasteBoth: "Kéo và thả tệp vào đây, %{browseFiles} hoặc %{browseFolders}",
		dropPasteFiles: "Kéo và thả tệp vào đây hoặc %{browseFiles}",
		dropPasteFolders: "Kéo và thả tệp vào đây hoặc %{browseFolders}",
		dropPasteImportBoth: "Kéo và thả tệp vào đây, %{browseFiles}, %{browseFolders} hoặc nhập từ:",
		dropPasteImportFiles: "Kéo và thả tệp vào đây, %{browseFiles} hoặc nhập từ:",
		dropPasteImportFolders: "Kéo và thả tệp vào đây, %{browseFolders} hoặc nhập từ:",
		editFile: "Chỉnh sửa tệp",
		editImage: "Chỉnh sửa ảnh",
		editFileWithFilename: "Chỉnh sửa tệp %{file}",
		editing: "Đang chỉnh sửa %{file}",
		emptyFolderAdded: "Không có tệp nào được thêm từ thư mục trống",
		encoding: "Đang mã hóa...",
		enterCorrectUrl: "URL không chính xác: Vui lòng đảm bảo bạn nhập một liên kết trực tiếp đến tệp",
		enterTextToSearch: "Nhập văn bản để tìm kiếm ảnh",
		enterUrlToImport: "Nhập URL để nhập tệp",
		error: "Lỗi",
		exceedsSize: "%{file} vượt quá kích thước tối đa cho phép là %{size}",
		failedToFetch: "Companion không thể truy xuất URL này, vui lòng đảm bảo nó chính xác",
		failedToUpload: "Không thể tải lên %{file}",
		filesUploadedOfTotal: {
			0: "%{complete} trong số %{smart_count} tệp tin đã được tải lên",
			1: "%{complete} trong số %{smart_count} tệp tin đã được tải lên"
		},
		filter: "Bộ lọc",
		finishEditingFile: "Hoàn thành chỉnh sửa tệp",
		flipHorizontal: "Lật ngang",
		folderAdded: {
			0: "Đã thêm %{smart_count} tệp từ %{folder}",
			1: "Đã thêm %{smart_count} tệp từ %{folder}"
		},
		folderAlreadyAdded: "Thư mục \"%{folder}\" đã được thêm trước đó",
		generatingThumbnails: "Đang tạo hình thu nhỏ...",
		import: "Nhập",
		importFiles: "Nhập tệp từ:",
		importFrom: "Nhập từ %{name}",
		inferiorSize: "Tệp này nhỏ hơn kích thước tối đa cho phép là %{size}",
		loadedXFiles: "Đã tải %{numFiles} tệp",
		loading: "Đang tải...",
		logOut: "Đăng xuất",
		micDisabled: "Người dùng đã từ chối truy cập microphone",
		missingRequiredMetaField: "Thiếu trường meta bắt buộc",
		missingRequiredMetaFieldOnFile: "Thiếu trường meta bắt buộc trong %{fileName}",
		missingRequiredMetaFields: {
			0: "Thiếu trường meta bắt buộc: %{fields}.",
			1: "Thiếu trường meta bắt buộc: %{fields}."
		},
		myDevice: "Thiết bị của tôi",
		noAudioDescription: "Để ghi âm, vui lòng kết nối microphone hoặc thiết bị âm thanh khác",
		noAudioTitle: "Microphone không khả dụng",
		noCameraDescription: "Để chụp ảnh hoặc quay video, vui lòng kết nối thiết bị máy ảnh",
		noCameraTitle: "Máy ảnh không khả dụng",
		noDuplicates: "Không thể thêm tệp trùng lặp '%{fileName}', nó đã tồn tại",
		noFilesFound: "Bạn không có tệp hoặc thư mục nào ở đây",
		noInternetConnection: "Không có kết nối Internet",
		noMoreFilesAllowed: "Không thể thêm tệp nữa",
		noSearchResults: "Rất tiếc, không có kết quả cho tìm kiếm này",
		openFolderNamed: "Mở thư mục %{name}",
		pause: "Tạm dừng",
		paused: "Đã tạm dừng",
		pauseUpload: "Tạm dừng tải lên",
		pluginNameAudio: "Âm thanh",
		pluginNameBox: "Box",
		pluginNameCamera: "Máy ảnh",
		pluginNameDropbox: "Dropbox",
		pluginNameFacebook: "Facebook",
		pluginNameGoogleDrive: "Google Drive",
		pluginNameOneDrive: "OneDrive",
		pluginNameZoom: "Zoom",
		poweredBy: "Được cung cấp bởi %{uppy}",
		processingXFiles: {
			0: "Đang xử lý %{smart_count} tệp",
			1: "Đang xử lý %{smart_count} tệp"
		},
		recording: "Đang ghi âm",
		recordingLength: "Thời lượng ghi âm %{recording_length}",
		recordingStoppedMaxSize: "Ghi âm đã dừng vì kích thước tệp sắp vượt quá giới hạn",
		recordVideoBtn: "Quay video",
		recoveredAllFiles: "Chúng tôi đã khôi phục tất cả các tệp. Bạn có thể tiếp tục tải lên.",
		recoveredXFiles: {
			0: "Chúng tôi không thể khôi phục hoàn toàn 1 tệp. Vui lòng chọn lại nó và tiếp tục tải lên.",
			1: "Chúng tôi không thể khôi phục hoàn toàn %{smart_count} tệp. Vui lòng chọn lại chúng và tiếp tục tải lên."
		},
		removeFile: "Xóa tệp",
		reSelect: "Chọn lại",
		resetFilter: "Đặt lại bộ lọc",
		resetSearch: "Đặt lại tìm kiếm",
		resume: "Tiếp tục",
		resumeUpload: "Tiếp tục tải lên",
		retry: "Thử lại",
		retryUpload: "Thử lại tải lên",
		revert: "Phục hồi",
		rotate: "Xoay",
		save: "Lưu",
		saveChanges: "Lưu thay đổi",
		search: "Tìm kiếm",
		searchImages: "Tìm kiếm ảnh",
		selectX: {
			0: "Chọn %{smart_count}",
			1: "Chọn %{smart_count}"
		},
		sessionRestored: "Khôi phục phiên",
		showErrorDetails: "Hiển thị chi tiết lỗi",
		signInWithGoogle: "Đăng nhập bằng Google",
		smile: "Cười!",
		startAudioRecording: "Bắt đầu ghi âm âm thanh",
		startCapturing: "Bắt đầu chụp màn hình",
		startRecording: "Bắt đầu ghi âm video",
		stopAudioRecording: "Dừng ghi âm âm thanh",
		stopCapturing: "Dừng chụp màn hình",
		stopRecording: "Dừng ghi âm video",
		streamActive: "Luồng hoạt động",
		streamPassive: "Luồng chờ",
		submitRecordedFile: "Gửi tệp đã ghi âm",
		takePicture: "Chụp ảnh",
		takePictureBtn: "Chụp ảnh",
		timedOut: "Tải lên bị trì hoãn trong %{seconds} giây, đang hủy bỏ.",
		upload: "Tải lên",
		uploadComplete: "Tải lên hoàn tất",
		uploadFailed: "Tải lên thất bại",
		uploading: "Đang tải lên",
		uploadingXFiles: {
			0: "Đang tải lên %{smart_count} tệp",
			1: "Đang tải lên %{smart_count} tệp"
		},
		uploadPaused: "Tải lên đã tạm dừng",
		uploadStalled: "Tải lên không tiến triển trong %{seconds} giây. Bạn có thể thử lại.",
		uploadXFiles: {
			0: "Tải lên %{smart_count} tệp",
			1: "Tải lên %{smart_count} tệp"
		},
		uploadXNewFiles: {
			0: "Tải lên +%{smart_count} tệp",
			1: "Tải lên +%{smart_count} tệp"
		},
		xFilesSelected: {
			0: "Đã chọn %{smart_count} tệp",
			1: "Đã chọn %{smart_count} tệp"
		},
		xMoreFilesAdded: {
			0: "Thêm %{smart_count} tệp",
			1: "Thêm %{smart_count} tệp"
		},
		xTimeLeft: "Còn lại %{time}",
		youCanOnlyUploadFileTypes: "Bạn chỉ có thể tải lên: %{types}",
		youCanOnlyUploadX: {
			0: "Bạn chỉ có thể tải lên %{smart_count} tệp",
			1: "Bạn chỉ có thể tải lên %{smart_count} tệp"
		},
		youHaveToAtLeastSelectX: {
			0: "Bạn phải chọn ít nhất %{smart_count} tệp",
			1: "Bạn phải chọn ít nhất %{smart_count} tệp"
		},
		zoomIn: "Phóng to",
		zoomOut: "Thu nhỏ"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.vi_VN = Bm);
})), Hm = /* @__PURE__ */ c({ default: () => Um }), Um, Wm = o((() => {
	Um = {
		strings: {},
		pluralize() {
			return 0;
		}
	}, Um.strings = {
		addBulkFilesFailed: "内部错误导致添加 %{smart_count} 个文件失败",
		addedNumFiles: "已添加 %{numFiles} 个文件",
		addingMoreFiles: "添加更多文件",
		additionalRestrictionsFailed: "有 %{count} 个附加限制未满足",
		addMore: "添加更多文件",
		addMoreFiles: "添加更多文件",
		aggregateExceedsSize: "您选择了 %{size} 的文件，但最大允许大小为 %{sizeAllowed}",
		allFilesFromFolderNamed: "来自文件夹 %{name} 的所有文件",
		allowAccessDescription: "为了通过您的相机进行拍照或录像，请给网站相机的访问权限",
		allowAccessTitle: "请允许对相机的访问权限",
		allowAudioAccessDescription: "为了录制音频，请允许网站访问麦克风",
		allowAudioAccessTitle: "请允许访问麦克风",
		aspectRatioLandscape: "裁剪为横向（16:9）",
		aspectRatioPortrait: "裁剪为纵向（9:16）",
		aspectRatioSquare: "裁剪为正方形",
		authAborted: "认证已中止",
		authenticate: "连接",
		authenticateWith: "连接到 %{pluginName}",
		authenticateWithTitle: "请使用 %{pluginName} 进行认证以选择文件",
		back: "返回",
		browse: "浏览",
		browseFiles: "浏览文件",
		browseFolders: "浏览文件夹",
		cancel: "取消",
		cancelUpload: "取消上传",
		closeModal: "关闭窗口",
		companionError: "和 Companion 连接失败了",
		companionUnauthorizeHint: "请访问 %{url} 以认证您的 %{provider} 账户",
		complete: "上传完毕",
		compressedX: "通过压缩图片节省了 %{size}",
		compressingImages: "正在压缩图片…",
		connectedToInternet: "连接至网络",
		copyLink: "复制链接",
		copyLinkToClipboardFallback: "复制以下网址",
		copyLinkToClipboardSuccess: "链接已复制到剪贴板",
		creatingAssembly: "正在准备上传…",
		creatingAssemblyFailed: "Transloadit：无法创建程序集",
		dashboardTitle: "文件上传工具",
		dashboardWindowTitle: "文件上传工具窗口（按 Escape 键关闭）",
		dataUploadedOfTotal: "%{complete} / %{total}",
		dataUploadedOfUnknown: "%{complete} / 未知大小",
		discardMediaFile: "丢弃媒体文件",
		discardRecordedFile: "丢弃录制的文件",
		done: "完成",
		dropHereOr: "将文件拖拽到这里或者%{browse}",
		dropHint: "拖拽文件到这里",
		dropPasteBoth: "将文件拖拽到这里，%{browseFiles}或%{browseFolders}",
		dropPasteFiles: "将文件拖拽到这里或%{browseFiles}",
		dropPasteFolders: "将文件拖拽到这里或%{browseFolders}",
		dropPasteImportBoth: "将文件拖拽到这里，%{browseFiles}、%{browseFolders}或从以下位置导入：",
		dropPasteImportFiles: "将文件拖拽到这里，%{browseFiles}或从以下位置导入：",
		dropPasteImportFolders: "将文件拖拽到这里，%{browseFolders}或从以下位置导入：",
		editFile: "编辑文件",
		editFileWithFilename: "编辑文件 %{file}",
		editImage: "编辑图片",
		editing: "正在编辑 %{file}",
		emptyFolderAdded: "无法从空文件夹添加文件",
		encoding: "正在编码…",
		enterCorrectUrl: "错误链接：请确认您输入的是文件的直接链接",
		enterTextToSearch: "输入文字以搜索图片",
		enterUrlToImport: "输入链接以导入文件",
		error: "错误",
		exceedsSize: "%{file} 超过了最大允许大小 %{size}",
		failedToFetch: "Companion 无法抓取此链接，请确保它是正确的",
		failedToUpload: "上传 %{file} 失败",
		filesUploadedOfTotal: "已上传 %{smart_count} 个文件中的 %{complete} 个",
		filter: "筛选器",
		finishEditingFile: "完成文件编辑",
		flipHorizontal: "水平翻转",
		folderAdded: "从 %{folder} 添加了 %{smart_count} 个文件",
		folderAlreadyAdded: "文件夹\"%{folder}\"已经被添加过了",
		generatingThumbnails: "正在生成缩略图…",
		import: "导入",
		importFiles: "从以下位置导入文件：",
		importFrom: "从 %{name} 导入",
		inferiorSize: "此文件小于最小允许大小 %{size}",
		loadedXFiles: "已加载 %{numFiles} 个文件",
		loading: "正在载入…",
		logIn: "登录",
		logOut: "登出",
		micDisabled: "麦克风的权限访问被用户拒绝",
		missingRequiredMetaField: "缺少必需的元数据字段",
		missingRequiredMetaFieldOnFile: "%{fileName} 中缺少必需的元数据字段",
		missingRequiredMetaFields: "缺少必需的元数据字段：%{fields}",
		myDevice: "我的设备",
		noAudioDescription: "为了录制音频，请连接麦克风或其他音频输入设备",
		noAudioTitle: "麦克风不可用",
		noCameraDescription: "为了拍摄照片或录制视频，请连接一个摄像设备",
		noCameraTitle: "摄像头不可用",
		noDuplicates: "无法添加重复文件\"%{fileName}\"，该文件已存在",
		noFilesFound: "这里空空如也",
		noInternetConnection: "无法连接到网络",
		noMoreFilesAllowed: "无法添加更多文件",
		noSearchResults: "很抱歉，没有找到相关搜索结果",
		openFolderNamed: "打开文件夹 %{name}",
		pause: "暂停",
		paused: "已暂停",
		pauseUpload: "暂停上传",
		pickFiles: "选择文件",
		pickPhotos: "选择照片",
		pleaseWait: "请稍候",
		pluginNameAudio: "音频",
		pluginNameCamera: "相机",
		pluginNameScreenCapture: "屏幕录制",
		pluginNameUrl: "链接",
		pluginWebdavInputLabel: "WebDAV 文件 URL（例如来自 ownCloud 或 Nextcloud）",
		poweredBy: "强力驱动于 %{uppy}",
		processingXFiles: "正在处理 %{smart_count} 个文件",
		recording: "正在录制",
		recordingLength: "录制时长 %{recording_length}",
		recordingStoppedMaxSize: "录制已停止，文件大小即将超过限制",
		recordVideoBtn: "录制视频",
		recoveredAllFiles: "我们已恢复所有文件。您现在可以继续上传。",
		recoveredXFiles: "我们无法完全恢复 %{smart_count} 个文件。请重新选择它们并继续上传。",
		removeFile: "删除文件",
		reSelect: "重新选择",
		resetFilter: "重置筛选器",
		resetSearch: "重置搜索",
		resume: "恢复",
		resumeUpload: "恢复上传",
		retry: "重试",
		retryUpload: "重试上传",
		revert: "重置",
		rotate: "旋转 90°",
		save: "保存",
		saveChanges: "保存变更",
		search: "搜索",
		searchImages: "搜索图片",
		selectX: "选择 %{smart_count}",
		sessionRestored: "会话已恢复",
		showErrorDetails: "显示错误详情",
		signInWithGoogle: "使用 Google 登录",
		smile: "笑一笑！",
		startAudioRecording: "开始音频录制",
		startCapturing: "开始屏幕录制",
		startRecording: "开始视频录制",
		stopAudioRecording: "停止音频录制",
		stopCapturing: "停止屏幕录制",
		stopRecording: "停止视频录制",
		streamActive: "视频流已激活",
		streamPassive: "视频流未激活",
		submitRecordedFile: "提交录制的文件",
		takePicture: "拍照",
		takePictureBtn: "拍照",
		takeScreenshot: "截屏",
		unnamed: "未命名",
		upload: "上传",
		uploadComplete: "上传完成",
		uploadFailed: "上传失败",
		uploading: "正在上传",
		uploadingXFiles: "正在上传 %{smart_count} 个文件",
		uploadPaused: "上传已暂停",
		uploadStalled: "上传已 %{seconds} 秒没有进度。您可能需要重试。",
		uploadXFiles: "上传 %{smart_count} 个文件",
		uploadXNewFiles: "上传 +%{smart_count} 个文件",
		xFilesSelected: "已选择 %{smart_count} 个文件",
		xMoreFilesAdded: "又添加了 %{smart_count} 个文件",
		xTimeLeft: "剩余 %{time}",
		youCanOnlyUploadFileTypes: "您只能上传：%{types}",
		youCanOnlyUploadX: "您只能上传 %{smart_count} 个文件",
		youHaveToAtLeastSelectX: "您至少要选择 %{smart_count} 个文件",
		zoomIn: "放大",
		zoomOut: "缩小"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.zh_CN = Um);
})), Gm = /* @__PURE__ */ c({ default: () => Km }), Km, qm = o((() => {
	Km = {
		strings: {},
		pluralize() {
			return 0;
		}
	}, Km.strings = {
		addBulkFilesFailed: "因伺服器錯誤，無法新增 %{smart_count} 個檔案",
		addedNumFiles: "已新增 %{numFiles} 個檔案",
		addingMoreFiles: "正在新增更多檔案",
		additionalRestrictionsFailed: "尚未滿足 %{count} 個額外限制",
		addMore: "新增更多",
		addMoreFiles: "新增更多檔案",
		aggregateExceedsSize: "您選擇了 %{size} 的檔案，但最大允許大小為 %{sizeAllowed}",
		allFilesFromFolderNamed: "資料夾 %{name} 中的所有檔案",
		allowAccessDescription: "請允許本網站存取相機以拍照或錄影。",
		allowAccessTitle: "請允許對相機的存取權限",
		allowAudioAccessDescription: "請允許本網站存取麥克風以錄製音訊。",
		allowAudioAccessTitle: "請允許對麥克風的存取權限",
		aspectRatioLandscape: "裁切成橫向 (16:9)",
		aspectRatioPortrait: "裁切成直向 (9:16)",
		aspectRatioSquare: "裁切成方形",
		authAborted: "驗證已中止",
		authenticate: "連接",
		authenticateWith: "連接到 %{pluginName}",
		authenticateWithTitle: "請使用 %{pluginName} 進行身份驗證以選擇檔案",
		back: "返回",
		browse: "瀏覽",
		browseFiles: "瀏覽檔案",
		browseFolders: "瀏覽資料夾",
		cancel: "取消",
		cancelUpload: "取消上傳",
		closeModal: "關閉視窗",
		companionError: "與 Companion 的連接失敗",
		companionUnauthorizeHint: "若要取消 %{provider} 帳號認證，請前往 %{url}",
		complete: "完成",
		compressedX: "圖片壓縮後，省下了 %{size}",
		compressingImages: "正在壓縮圖片...",
		connectedToInternet: "連線至網路",
		copyLink: "複製連結",
		copyLinkToClipboardFallback: "複製以下網址",
		copyLinkToClipboardSuccess: "連結已複製到剪貼簿",
		creatingAssembly: "正在準備上傳...",
		creatingAssemblyFailed: "Transloadit：無法建立程序集",
		dashboardTitle: "Uppy 儀表板",
		dashboardWindowTitle: "Uppy 儀表板視窗（按下 Esc 以關閉）",
		dataUploadedOfTotal: "%{complete}/%{total}",
		dataUploadedOfUnknown: "%{complete} / 未知大小",
		discardMediaFile: "捨棄媒體檔案",
		discardRecordedFile: "捨棄錄影檔",
		done: "完成",
		dropHereOr: "將檔案拖曳到這裡或者%{browse}",
		dropHint: "將檔案拖曳至此處",
		dropPasteBoth: "將檔案拖曳至此處、%{browseFiles}，或%{browseFolders}",
		dropPasteFiles: "將檔案拖曳至此處，或%{browseFiles}",
		dropPasteFolders: "將檔案拖曳至此處，或%{browseFolders}",
		dropPasteImportBoth: "將檔案拖曳至此處、%{browseFiles}，或匯入",
		dropPasteImportFiles: "將檔案拖曳至此處、%{browseFiles}，或匯入",
		dropPasteImportFolders: "將檔案拖曳至此處、%{browseFolders}，或匯入",
		editFile: "編輯檔案",
		editImage: "編輯圖片",
		editFileWithFilename: "編輯檔案 %{file}",
		editing: "編輯 %{file}",
		emptyFolderAdded: "未從空資料夾新增任何檔案",
		encoding: "編碼中...",
		enterCorrectUrl: "錯誤連結：請確認您輸入的是檔案連結",
		enterTextToSearch: "輸入文字以搜尋圖片",
		enterUrlToImport: "輸入連結以匯入檔案",
		error: "錯誤",
		exceedsSize: "此檔案大小超出允許的最大值 %{size}",
		failedToFetch: "Companion 無法抓取此連結，請確認它是正確的",
		failedToUpload: "%{file} 上傳失敗",
		filesUploadedOfTotal: "已上傳 %{complete} 個檔案中的 %{smart_count} 個檔案",
		filter: "篩選器",
		finishEditingFile: "完成檔案編輯",
		flipHorizontal: "水平翻轉",
		folderAdded: "從 %{folder} 新增了 %{smart_count} 個檔案",
		folderAlreadyAdded: "資料夾 \"%{folder}\" 已新增",
		generatingThumbnails: "正在產生縮圖...",
		import: "匯入",
		importFiles: "檔案匯入來源：",
		importFrom: "從 %{name} 匯入",
		inferiorSize: "此檔案小於允許的大小：%{size}",
		loadedXFiles: "已載入 %{numFiles} 個檔案",
		loading: "正在載入...",
		logIn: "登入",
		logOut: "登出",
		micDisabled: "使用者拒絕麥克風存取權限",
		missingRequiredMetaField: "遺漏中繼資料必要欄位",
		missingRequiredMetaFieldOnFile: "%{fileName} 遺漏中繼資料必要欄位",
		missingRequiredMetaFields: "遺漏中繼資料必要欄位：%{fields}。",
		myDevice: "我的裝置",
		noAudioDescription: "請連接麥克風或其他音訊輸入裝置以錄製音訊",
		noAudioTitle: "無法使用麥克風",
		noCameraDescription: "請連接相機以拍照或錄影",
		noCameraTitle: "無法使用相機",
		noDuplicates: "無法新增重複檔案，'%{fileName}' 已存在",
		noFilesFound: "這裡空空如也",
		noInternetConnection: "無網路連線",
		noMoreFilesAllowed: "無法新增更多檔案",
		noSearchResults: "抱歉，找不到符合此搜尋條件的結果",
		openFolderNamed: "開啟資料夾 %{name}",
		pause: "暫停",
		paused: "已暫停",
		pauseUpload: "暫停上傳",
		pickFiles: "選擇檔案",
		pickPhotos: "選擇照片",
		pleaseWait: "請稍候",
		pluginNameAudio: "音訊",
		pluginNameCamera: "相機",
		pluginNameScreenCapture: "螢幕錄製",
		pluginNameUrl: "連結",
		pluginWebdavInputLabel: "WebDAV 檔案 URL（例如來自 ownCloud 或 Nextcloud）",
		poweredBy: "技術提供者 %{uppy}",
		processingXFiles: "正在處理 %{smart_count} 個檔案",
		recording: "正在錄製",
		recordingLength: "錄製時長 %{recording_length}",
		recordingStoppedMaxSize: "因檔案大小即將超出限制而停止錄製",
		recordVideoBtn: "錄影",
		recoveredAllFiles: "我們還原了所有檔案。您現在可以繼續上傳了。",
		recoveredXFiles: "我們無法完全復原 %{smart_count} 個檔案。請重新選擇檔案並繼續上傳。",
		removeFile: "移除檔案",
		reSelect: "重新選擇",
		resetFilter: "重設篩選器",
		resetSearch: "重設搜尋",
		resume: "繼續",
		resumeUpload: "繼續上傳",
		retry: "重試",
		retryUpload: "重試上傳",
		revert: "還原",
		rotate: "旋轉",
		save: "儲存",
		saveChanges: "儲存變更",
		search: "搜尋",
		searchImages: "搜尋圖片",
		selectX: "選擇 %{smart_count}",
		sessionRestored: "已復原工作階段",
		showErrorDetails: "顯示錯誤詳細資訊",
		signInWithGoogle: "透過 Google 登入",
		smile: "請微笑！",
		startAudioRecording: "開始錄音",
		startCapturing: "開始畫面擷取",
		startRecording: "開始錄影",
		stopAudioRecording: "停止錄音",
		stopCapturing: "停止畫面擷取",
		stopRecording: "停止錄影",
		streamActive: "主動串流",
		streamPassive: "被動串流",
		submitRecordedFile: "提交錄影檔",
		takePicture: "拍照",
		takePictureBtn: "拍照",
		takeScreenshot: "螢幕截圖",
		timedOut: "上傳已停滯 %{seconds} 秒，正在中止上傳。",
		unnamed: "未命名",
		upload: "上傳",
		uploadComplete: "上傳完成",
		uploadFailed: "上傳失敗",
		uploading: "正在上傳",
		uploadingXFiles: "正在上傳 %{smart_count} 個檔案",
		uploadPaused: "暫停上傳",
		uploadStalled: "上傳已停滯 %{seconds} 秒。請考慮重試。",
		uploadXFiles: "上傳 %{smart_count} 個檔案",
		uploadXNewFiles: "上傳 +%{smart_count} 個檔案",
		xFilesSelected: "已選擇 %{smart_count} 個檔案",
		xMoreFilesAdded: "又新增 %{smart_count} 個檔案",
		xTimeLeft: "還剩下 %{time}",
		youCanOnlyUploadFileTypes: "您只能上傳這些檔案類型：%{types}",
		youCanOnlyUploadX: "您只能上傳 %{smart_count} 個檔案",
		youHaveToAtLeastSelectX: "您至少要選擇 %{smart_count} 個檔案",
		zoomIn: "放大",
		zoomOut: "縮小"
	}, typeof Uppy < "u" && (globalThis.Uppy.locales.zh_TW = Km);
})), Jm = Object.fromEntries(Object.entries(/* #__PURE__ */ Object.assign({
	"../../node_modules/@uppy/locales/lib/ar_SA.js": () => Promise.resolve().then(() => (Ef(), wf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/az_AZ.js": () => Promise.resolve().then(() => (kf(), Df)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/bg_BG.js": () => Promise.resolve().then(() => (Mf(), Af)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ca_ES.js": () => Promise.resolve().then(() => (Ff(), Nf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/cs_CZ.js": () => Promise.resolve().then(() => (Rf(), If)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/da_DK.js": () => Promise.resolve().then(() => (Vf(), zf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/de_DE.js": () => Promise.resolve().then(() => (Wf(), Hf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/el_GR.js": () => Promise.resolve().then(() => (qf(), Gf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_ES.js": () => Promise.resolve().then(() => (Xf(), Jf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_MX.js": () => Promise.resolve().then(() => ($f(), Zf)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fa_IR.js": () => Promise.resolve().then(() => (np(), ep)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fi_FI.js": () => Promise.resolve().then(() => (ap(), rp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fr_FR.js": () => Promise.resolve().then(() => (cp(), op)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/gl_ES.js": () => Promise.resolve().then(() => (dp(), lp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/he_IL.js": () => Promise.resolve().then(() => (mp(), fp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hi_IN.js": () => Promise.resolve().then(() => (_p(), hp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hr_HR.js": () => Promise.resolve().then(() => (bp(), vp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hu_HU.js": () => Promise.resolve().then(() => (Cp(), xp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/id_ID.js": () => Promise.resolve().then(() => (Ep(), wp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/is_IS.js": () => Promise.resolve().then(() => (kp(), Dp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/it_IT.js": () => Promise.resolve().then(() => (Mp(), Ap)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ja_JP.js": () => Promise.resolve().then(() => (Fp(), Np)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ko_KR.js": () => Promise.resolve().then(() => (Rp(), Ip)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/mn_MN.js": () => Promise.resolve().then(() => (Vp(), zp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ms_MY.js": () => Promise.resolve().then(() => (Wp(), Hp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nb_NO.js": () => Promise.resolve().then(() => (qp(), Gp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nl_NL.js": () => Promise.resolve().then(() => (Xp(), Jp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nn_NO.js": () => Promise.resolve().then(() => ($p(), Zp)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pl_PL.js": () => Promise.resolve().then(() => (nm(), em)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_BR.js": () => Promise.resolve().then(() => (am(), rm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_PT.js": () => Promise.resolve().then(() => (cm(), om)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ro_RO.js": () => Promise.resolve().then(() => (dm(), lm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ru_RU.js": () => Promise.resolve().then(() => (mm(), fm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sk_SK.js": () => Promise.resolve().then(() => (_m(), hm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Cyrillic.js": () => Promise.resolve().then(() => (bm(), vm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Latin.js": () => Promise.resolve().then(() => (Cm(), xm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sv_SE.js": () => Promise.resolve().then(() => (Em(), wm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/th_TH.js": () => Promise.resolve().then(() => (km(), Dm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/tr_TR.js": () => Promise.resolve().then(() => (Mm(), Am)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uk_UA.js": () => Promise.resolve().then(() => (Fm(), Nm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uz_UZ.js": () => Promise.resolve().then(() => (Rm(), Im)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/vi_VN.js": () => Promise.resolve().then(() => (Vm(), zm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_CN.js": () => Promise.resolve().then(() => (Wm(), Hm)).then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_TW.js": () => Promise.resolve().then(() => (qm(), Gm)).then((e) => e.default)
})).map(([e, t]) => [e.split("/").pop().slice(0, -3), t]));
function Ym(e) {
	let [t, ...n] = String(e ?? "").toLowerCase().replace(/-/g, "_").split("_"), r = Object.keys(Jm).filter((e) => e.toLowerCase().startsWith(`${t}_`));
	return r.find((e) => n.some((t) => e.toLowerCase().includes(`_${t.slice(0, 3)}`))) ?? r[0] ?? null;
}
async function Xm(e) {
	let t = Ym(e);
	return t ? await Jm[t]() : null;
}
//#endregion
//#region node_modules/is-mobile/index.js
var Zm = /* @__PURE__ */ s(((e, t) => {
	t.exports = a, t.exports.isMobile = a, t.exports.default = a;
	var n = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|redmi|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, r = /CrOS/, i = /android|ipad|playbook|silk/i;
	function a(e) {
		e ||= {};
		let t = e.ua;
		if (!t && typeof navigator < "u" && (t = navigator.userAgent), t && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string") return !1;
		let a = n.test(t) && !r.test(t) || !!e.tablet && i.test(t);
		return !a && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.indexOf("Macintosh") !== -1 && t.indexOf("Safari") !== -1 && (a = !0), a;
	}
})), Qm, $m, eh, th, nh, rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh = o((() => {
	Qm = "@uppy/webcam", $m = "Uppy plugin that takes photos or records videos using the device's camera.", eh = "6.0.1", th = "dist/style.min.css", nh = "module", rh = ["*.css"], ih = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}, ah = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"webcam",
		"picture",
		"photo",
		"video",
		"record",
		"mediarecorder"
	], oh = "https://uppy.io", sh = { url: "https://github.com/transloadit/uppy/issues" }, ch = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, lh = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], uh = {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	}, dh = {
		"is-mobile": "^5.0.0",
		preact: "^10.29.2"
	}, fh = {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	}, ph = { "@uppy/core": "^6.2.0" }, mh = {
		name: Qm,
		description: $m,
		version: eh,
		license: "MIT",
		style: th,
		type: nh,
		sideEffects: rh,
		scripts: ih,
		keywords: ah,
		homepage: oh,
		bugs: sh,
		repository: ch,
		files: lh,
		exports: uh,
		dependencies: dh,
		devDependencies: fh,
		peerDependencies: ph
	};
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/CameraIcon.js
function gh() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		fill: "#0097DC",
		width: "66",
		height: "55",
		viewBox: "0 0 66 55",
		children: G("path", {
			d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
			fillRule: "evenodd"
		})
	});
}
var _h = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/DiscardButton.js
function vh({ onDiscard: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
		type: "button",
		title: t("discardRecordedFile"),
		"aria-label": t("discardRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 13 13",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: G("g", {
				fill: "#FFF",
				fillRule: "evenodd",
				children: [G("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), G("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })]
			})
		})
	});
}
var yh = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/RecordButton.js
function bh({ recording: e, onStartRecording: t, onStopRecording: n, i18n: r }) {
	return e ? G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
		type: "button",
		title: r("stopRecording"),
		"aria-label": r("stopRecording"),
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: G("rect", {
				x: "15",
				y: "15",
				width: "70",
				height: "70"
			})
		})
	}) : G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
		type: "button",
		title: r("startRecording"),
		"aria-label": r("startRecording"),
		onClick: t,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: G("circle", {
				cx: "50",
				cy: "50",
				r: "40"
			})
		})
	});
}
var xh = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/formatSeconds.js
function Sh(e) {
	return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
}
var Ch = o((() => {}));
//#endregion
//#region node_modules/@uppy/webcam/lib/RecordingLength.js
function wh({ recordingLengthSeconds: e }) {
	return G("span", { children: Sh(e) });
}
var Th = o((() => {
	K(), Ch();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/SnapshotButton.js
function Eh({ onSnapshot: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
		type: "button",
		title: t("takePicture"),
		"aria-label": t("takePicture"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: gh()
	});
}
var Dh = o((() => {
	K(), _h();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/SubmitButton.js
function Oh({ onSubmit: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
		type: "button",
		title: t("submitRecordedFile"),
		"aria-label": t("submitRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			width: "12",
			height: "9",
			viewBox: "0 0 12 9",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: G("path", {
				fill: "#fff",
				fillRule: "nonzero",
				d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
			})
		})
	});
}
var kh = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/VideoSourceSelect.js
function Ah({ currentDeviceId: e, videoSources: t, onChangeVideoSource: n }) {
	return G("div", {
		className: "uppy-Webcam-videoSource",
		children: G("select", {
			className: "uppy-u-reset uppy-Webcam-videoSource-select",
			onChange: (e) => {
				n(e.target.value);
			},
			children: t.map((t) => G("option", {
				value: t.deviceId,
				selected: t.deviceId === e,
				children: t.label
			}, t.deviceId))
		})
	});
}
var jh = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/CameraScreen.js
function Mh(e, t) {
	return e.includes(t);
}
var Nh, Ph = o((() => {
	K(), El(), yh(), xh(), Th(), Dh(), kh(), jh(), Nh = class extends U {
		videoElement;
		refs;
		componentDidMount() {
			let { onFocus: e } = this.props;
			e();
		}
		componentWillUnmount() {
			let { onStop: e } = this.props;
			e();
		}
		render() {
			let { src: e, recordedVideo: t, capturedSnapshot: n, recording: r, modes: i, supportsRecording: a, videoSources: o, showVideoSourceDropdown: s, showRecordingLength: c, onSubmit: l, i18n: u, mirror: d, onSnapshot: f, onStartRecording: p, onStopRecording: m, onDiscardRecordedMedia: h, recordingLengthSeconds: g } = this.props, _ = !!t, v = !!n, y = _ || v, b = !y && a && (Mh(i, "video-only") || Mh(i, "audio-only") || Mh(i, "video-audio")), x = !y && Mh(i, "picture"), S = a && c && !_, C = s && o && o.length > 1, w = { playsInline: !0 };
			return t ? (w.muted = !1, w.controls = !0, w.src = t, this.videoElement && (this.videoElement.srcObject = null)) : (w.muted = !0, w.autoPlay = !0, w.srcObject = e), G("div", {
				className: "uppy uppy-Webcam-container",
				children: [G("div", {
					className: "uppy-Webcam-videoContainer",
					children: n && !r && !t ? G("div", {
						className: "uppy-Webcam-imageContainer",
						children: G("img", {
							src: n,
							className: "uppy-Webcam-video",
							alt: "capturedSnapshot"
						})
					}) : G("video", {
						ref: (e) => {
							this.videoElement = e;
						},
						className: `uppy-Webcam-video  ${d ? "uppy-Webcam-video--mirrored" : ""}`,
						...w
					})
				}), G("div", {
					className: "uppy-Webcam-footer",
					children: [
						G("div", {
							className: "uppy-Webcam-videoSourceContainer",
							children: C ? Ah(this.props) : null
						}),
						G("div", {
							className: "uppy-Webcam-buttonContainer",
							children: [
								x && G(Eh, {
									onSnapshot: f,
									i18n: u
								}),
								b && G(bh, {
									recording: r,
									onStartRecording: p,
									onStopRecording: m,
									i18n: u
								}),
								(_ || v) && G(Oh, {
									onSubmit: l,
									i18n: u
								}),
								(_ || v) && G(vh, {
									onDiscard: h,
									i18n: u
								})
							]
						}),
						G("div", {
							className: "uppy-Webcam-recordingLength",
							children: S && G(wh, { recordingLengthSeconds: g })
						})
					]
				})]
			});
		}
	};
})), Fh, Ih = o((() => {
	Fh = { strings: {
		pluginNameCamera: "Camera",
		noCameraTitle: "Camera Not Available",
		noCameraDescription: "In order to take pictures or record video, please connect a camera device",
		recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
		submitRecordedFile: "Submit recorded file",
		discardRecordedFile: "Discard recorded file",
		smile: "Smile!",
		takePicture: "Take a picture",
		startRecording: "Begin video recording",
		stopRecording: "Stop video recording",
		recordingLength: "Recording length %{recording_length}",
		allowAccessTitle: "Please allow access to your camera",
		allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
	} };
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/PermissionsScreen.js
function Lh({ icon: e, i18n: t, hasCamera: n }) {
	return G("div", {
		className: "uppy-Webcam-permissons",
		children: [
			G("div", {
				className: "uppy-Webcam-permissonsIcon",
				children: e()
			}),
			G("div", {
				className: "uppy-Webcam-title",
				children: t(n ? "allowAccessTitle" : "noCameraTitle")
			}),
			G("p", { children: t(n ? "allowAccessDescription" : "noCameraDescription") })
		]
	});
}
var Rh = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/webcam/lib/supportsMediaRecorder.js
function zh() {
	return typeof MediaRecorder == "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start == "function";
}
var Bh = o((() => {}));
//#endregion
//#region node_modules/@uppy/webcam/lib/Webcam.js
function Vh(e) {
	return e[0] === "." ? I[e.slice(1)] : e;
}
function Hh(e) {
	return /^video\/[^*]+$/.test(e);
}
function Uh(e) {
	return /^image\/[^*]+$/.test(e);
}
function Wh() {
	return navigator.mediaDevices;
}
function Gh(e, t) {
	return e.includes(t);
}
var Kh, qh, Jh, Yh = o((() => {
	K(), Z(), X(), Kh = Zm(), hh(), _h(), Ph(), Ih(), Rh(), Bh(), qh = {
		onBeforeSnapshot: () => Promise.resolve(),
		countdown: !1,
		modes: [
			"video-audio",
			"video-only",
			"audio-only",
			"picture"
		],
		mirror: !0,
		showVideoSourceDropdown: !1,
		preferredImageMimeType: null,
		preferredVideoMimeType: null,
		showRecordingLength: !1,
		mobileNativeCamera: (0, Kh.isMobile)({ tablet: !0 })
	}, Jh = class extends ar {
		static VERSION = mh.version;
		#e;
		mediaDevices;
		supportsUserMedia;
		capturedMediaFile;
		icon;
		webcamActive;
		stream = null;
		recorder = null;
		recordingChunks = null;
		recordingLengthTimer;
		captureInProgress = !1;
		constructor(e, t) {
			super(e, {
				...qh,
				...t
			}), this.mediaDevices = Wh(), this.supportsUserMedia = !!this.mediaDevices, this.id = this.opts.id || "Webcam", this.type = "acquirer", this.capturedMediaFile = null, this.icon = () => G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("path", {
					d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
					fill: "#02B383",
					fillRule: "nonzero"
				})
			}), this.defaultLocale = Fh, this.i18nInit(), this.title = this.i18n("pluginNameCamera"), this.#e = this.opts.mirror, this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.takeSnapshot = this.takeSnapshot.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.discardRecordedMedia = this.discardRecordedMedia.bind(this), this.submit = this.submit.bind(this), this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this), this.focus = this.focus.bind(this), this.changeVideoSource = this.changeVideoSource.bind(this), this.webcamActive = !1, this.opts.countdown && (this.opts.onBeforeSnapshot = this.oneTwoThreeSmile), this.setPluginState({
				hasCamera: !1,
				cameraReady: !1,
				cameraError: null,
				recordingLengthSeconds: 0,
				videoSources: [],
				currentDeviceId: null,
				capturedSnapshot: null
			});
		}
		getStatus() {
			let { recordedVideo: e, capturedSnapshot: t, isRecording: n, cameraReady: r, cameraError: i } = this.getPluginState();
			return n ? "recording" : e != null || t != null ? "captured" : r ? "ready" : i ? "error" : "init";
		}
		setOptions(e) {
			super.setOptions({
				...e,
				videoConstraints: {
					...this.opts.videoConstraints,
					...e?.videoConstraints
				}
			});
		}
		hasCameraCheck() {
			return this.mediaDevices ? this.mediaDevices.enumerateDevices().then((e) => e.some((e) => e.kind === "videoinput")) : Promise.resolve(!1);
		}
		isAudioOnly() {
			return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
		}
		getConstraints(e = null) {
			let t = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1, n = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1), r = {
				...this.opts.videoConstraints || {},
				...e != null && { deviceId: e }
			};
			return {
				audio: t,
				video: n ? r : !1
			};
		}
		start(e = null) {
			if (!this.supportsUserMedia) return Promise.reject(/* @__PURE__ */ Error("Webcam access not supported"));
			this.webcamActive = !0, this.opts.mirror && (this.#e = !0);
			let t = this.getConstraints(e?.deviceId);
			return this.hasCameraCheck().then((n) => (this.setPluginState({ hasCamera: n }), this.mediaDevices.getUserMedia(t).then((t) => {
				this.stream = t;
				let n = null, r = this.isAudioOnly() ? t.getAudioTracks() : t.getVideoTracks();
				e?.deviceId ? r.forEach((t) => {
					t.getSettings().deviceId === e.deviceId && (n = t.getSettings().deviceId);
				}) : n = r[0].getSettings().deviceId, this.updateVideoSources(), this.setPluginState({
					currentDeviceId: n,
					cameraReady: !0
				});
			}).catch((e) => {
				this.setPluginState({
					cameraReady: !1,
					cameraError: e
				}), this.uppy.info(Me(e), "error");
			})));
		}
		getMediaRecorderOptions() {
			let e = {};
			if (MediaRecorder.isTypeSupported) {
				let { restrictions: t } = this.uppy.opts, n = [];
				this.opts.preferredVideoMimeType ? n = [this.opts.preferredVideoMimeType] : t.allowedFileTypes && (n = t.allowedFileTypes.map(Vh).filter(Hh));
				let r = n.filter((e) => MediaRecorder.isTypeSupported(e) && L(e));
				r.length > 0 && (e.mimeType = r[0]);
			}
			return e;
		}
		startRecording() {
			this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions()), this.recordingChunks = [];
			let e = !1;
			this.recorder.addEventListener("dataavailable", (t) => {
				this.recordingChunks.push(t.data);
				let { restrictions: n } = this.uppy.opts;
				if (this.recordingChunks.length > 1 && n.maxFileSize != null && !e) {
					let t = this.recordingChunks.reduce((e, t) => e + t.size, 0), r = (t - this.recordingChunks[0].size) / (this.recordingChunks.length - 1) * 3;
					t > Math.max(0, n.maxFileSize - r) && (e = !0, this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3), this.stopRecording());
				}
			}), this.recorder.start(500), this.opts.showRecordingLength && (this.recordingLengthTimer = setInterval(() => {
				let e = this.getPluginState().recordingLengthSeconds;
				this.setPluginState({ recordingLengthSeconds: e + 1 });
			}, 1e3)), this.setPluginState({ isRecording: !0 });
		}
		stopRecording() {
			return new Promise((e) => {
				this.recorder.addEventListener("stop", () => {
					e();
				}), this.recorder.stop(), this.opts.showRecordingLength && (clearInterval(this.recordingLengthTimer), this.setPluginState({ recordingLengthSeconds: 0 }));
			}).then(() => (this.setPluginState({ isRecording: !1 }), this.getVideo())).then((e) => {
				try {
					this.capturedMediaFile = e, this.setPluginState({ recordedVideo: URL.createObjectURL(e.data) }), this.#e = !1;
				} catch (e) {
					Ze(e) || this.uppy.log(e);
				}
			}).then(() => {
				this.recordingChunks = null, this.recorder = null;
			}, (e) => {
				throw this.recordingChunks = null, this.recorder = null, e;
			});
		}
		discardRecordedMedia() {
			let { recordedVideo: e, capturedSnapshot: t } = this.getPluginState();
			e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.setPluginState({
				recordedVideo: null,
				capturedSnapshot: null
			}), this.opts.mirror && (this.#e = !0), this.capturedMediaFile = null;
		}
		submit() {
			try {
				this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile);
			} catch (e) {
				Ze(e) || this.uppy.log(e, "error");
			}
		}
		async stop() {
			if (this.stream) {
				let e = this.stream.getAudioTracks(), t = this.stream.getVideoTracks();
				e.concat(t).forEach((e) => {
					e.stop();
				});
			}
			this.recorder && await new Promise((e) => {
				this.recorder.addEventListener("stop", e, { once: !0 }), this.recorder.stop(), this.opts.showRecordingLength && clearInterval(this.recordingLengthTimer);
			}), this.recordingChunks = null, this.recorder = null, this.webcamActive = !1, this.stream = null, this.setPluginState({
				recordedVideo: null,
				capturedSnapshot: null,
				isRecording: !1,
				recordingLengthSeconds: 0
			});
		}
		getVideoElement() {
			return this.el.querySelector(".uppy-Webcam-video");
		}
		oneTwoThreeSmile() {
			return new Promise((e, t) => {
				let n = this.opts.countdown, r = setInterval(() => {
					if (!this.webcamActive) return clearInterval(r), this.captureInProgress = !1, t(/* @__PURE__ */ Error("Webcam is not active"));
					n ? (this.uppy.info(`${n}...`, "warning", 800), n--) : (clearInterval(r), this.uppy.info(this.i18n("smile"), "success", 1500), setTimeout(() => e(), 1500));
				}, 1e3);
			});
		}
		async takeSnapshot() {
			if (!this.captureInProgress) {
				this.captureInProgress = !0;
				try {
					await this.opts.onBeforeSnapshot();
				} catch (e) {
					let t = Me(e);
					throw this.uppy.info(t, "error", 5e3), Error(`onBeforeSnapshot: ${t}`);
				}
				try {
					let e = await this.getImage();
					if (this.capturedMediaFile = e, e.data == null) throw Error("File data is empty");
					let t = URL.createObjectURL(e.data);
					this.setPluginState({ capturedSnapshot: t }), this.captureInProgress = !1;
				} catch (e) {
					this.captureInProgress = !1, Ze(e) || this.uppy.log(e);
				}
			}
		}
		async getImage() {
			let e = this.getVideoElement();
			if (!e) return Promise.reject(/* @__PURE__ */ Error("No video element found, likely due to the Webcam tab being closed."));
			let t = e.videoWidth, n = e.videoHeight, r = document.createElement("canvas");
			r.width = t, r.height = n, r.getContext("2d").drawImage(e, 0, 0);
			let { restrictions: i } = this.uppy.opts, a = [];
			this.opts.preferredImageMimeType ? a = [this.opts.preferredImageMimeType] : i.allowedFileTypes && (a = i.allowedFileTypes.map(Vh).filter(Uh));
			let o = a[0] || "image/jpeg", s = L(o) || "jpg", c = `cam-${Date.now()}.${s}`;
			return m(r, o).then((e) => ({
				source: this.id,
				name: c,
				data: new Blob([e], { type: o }),
				type: o
			}));
		}
		getVideo() {
			let e = this.recordingChunks.find((e) => e.type?.length > 0).type, t = L(e);
			if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
			let n = `webcam-${Date.now()}.${t}`, r = new Blob(this.recordingChunks, { type: e }), i = {
				source: this.id,
				name: n,
				data: new Blob([r], { type: e }),
				type: e
			};
			return Promise.resolve(i);
		}
		focus() {
			this.opts.countdown && setTimeout(() => {
				this.uppy.info(this.i18n("smile"), "success", 1500);
			}, 1e3);
		}
		changeVideoSource(e) {
			this.stop(), this.start({ deviceId: e });
		}
		updateVideoSources() {
			this.mediaDevices.enumerateDevices().then((e) => {
				this.setPluginState({ videoSources: e.filter((e) => e.kind === "videoinput") });
			});
		}
		render() {
			this.webcamActive || this.start();
			let e = this.getPluginState();
			return !e.cameraReady || !e.hasCamera ? G(Lh, {
				icon: gh,
				i18n: this.i18n,
				hasCamera: e.hasCamera
			}) : G(Nh, {
				...e,
				onChangeVideoSource: this.changeVideoSource,
				onSnapshot: this.takeSnapshot,
				onStartRecording: this.startRecording,
				onStopRecording: this.stopRecording,
				onDiscardRecordedMedia: this.discardRecordedMedia,
				onSubmit: this.submit,
				onFocus: this.focus,
				onStop: this.stop,
				i18n: this.i18n,
				modes: this.opts.modes,
				showRecordingLength: this.opts.showRecordingLength,
				showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
				supportsRecording: zh(),
				recording: e.isRecording,
				mirror: this.#e,
				src: this.stream
			});
		}
		install() {
			let { mobileNativeCamera: e, modes: t, videoConstraints: n } = this.opts, { target: r } = this.opts;
			if (e && r) {
				this.getTargetPlugin(r)?.setOptions({
					showNativeVideoCameraButton: Gh(t, "video-only") || Gh(t, "video-audio"),
					showNativePhotoCameraButton: Gh(t, "picture"),
					nativeCameraFacingMode: n?.facingMode
				});
				return;
			}
			this.setPluginState({
				cameraReady: !1,
				recordingLengthSeconds: 0
			}), r && this.mount(r, this), this.mediaDevices && (this.updateVideoSources(), this.mediaDevices.ondevicechange = () => {
				if (this.updateVideoSources(), this.stream) {
					let e = !0, { videoSources: t, currentDeviceId: n } = this.getPluginState();
					t.forEach((t) => {
						n === t.deviceId && (e = !1);
					}), e && (this.stop(), this.start());
				}
			});
		}
		uninstall() {
			this.stop(), this.unmount();
		}
		onUnmount() {
			this.stop();
		}
	};
})), Xh = /* @__PURE__ */ c({
	default: () => Jh,
	defaultOptions: () => qh
}), Zh = o((() => {
	Yh();
})), Qh, $h, eg, tg, ng, rg, ig, ag, og, sg, cg, lg, ug, dg, fg, pg, mg, hg, gg = o((() => {
	Qh = "@uppy/audio", $h = "Uppy plugin that records audio using the device’s microphone.", eg = "4.0.1", tg = "dist/style.min.css", ng = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"audio",
		"microphone",
		"sound",
		"record",
		"mediarecorder"
	], rg = "module", ig = ["*.css"], ag = "https://uppy.io", og = { url: "https://github.com/transloadit/uppy/issues" }, sg = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, cg = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], lg = {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	}, ug = { preact: "^10.29.2" }, dg = {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	}, fg = { "@uppy/core": "^6.2.0" }, pg = { access: "public" }, mg = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}, hg = {
		name: Qh,
		description: $h,
		version: eg,
		license: "MIT",
		style: tg,
		keywords: ng,
		type: rg,
		sideEffects: ig,
		homepage: ag,
		bugs: og,
		repository: sg,
		files: cg,
		exports: lg,
		dependencies: ug,
		devDependencies: dg,
		peerDependencies: fg,
		publishConfig: pg,
		scripts: mg
	};
})), _g, vg = o((() => {
	_g = { strings: {
		pluginNameAudio: "Audio",
		startAudioRecording: "Begin audio recording",
		stopAudioRecording: "Stop audio recording",
		allowAudioAccessTitle: "Please allow access to your microphone",
		allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
		noAudioTitle: "Microphone Not Available",
		noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
		recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
		recordingLength: "Recording length %{recording_length}",
		submitRecordedFile: "Submit recorded file",
		discardRecordedFile: "Discard recorded file"
	} };
})), yg, bg = o((() => {
	K(), yg = (e) => {
		let { icon: t, hasAudio: n, i18n: r } = e;
		return G("div", {
			className: "uppy-Audio-permissons",
			children: [
				G("div", {
					className: "uppy-Audio-permissonsIcon",
					children: t()
				}),
				G("div", {
					className: "uppy-Audio-title",
					children: r(n ? "allowAudioAccessTitle" : "noAudioTitle")
				}),
				G("p", { children: r(n ? "allowAudioAccessDescription" : "noAudioDescription") })
			]
		});
	};
})), xg, Sg = o((() => {
	K(), xg = ({ currentDeviceId: e, audioSources: t, onChangeSource: n }) => G("div", {
		className: "uppy-Audio-videoSource",
		children: G("select", {
			className: "uppy-u-reset uppy-Audio-audioSource-select",
			onChange: (e) => {
				n(e.target.value);
			},
			children: t.map((t) => G("option", {
				value: t.deviceId,
				selected: t.deviceId === e,
				children: t.label
			}, t.deviceId))
		})
	});
}));
//#endregion
//#region node_modules/@uppy/audio/lib/audio-oscilloscope/index.js
function Cg(e) {
	return typeof e == "function";
}
function wg(e) {
	return Cg(e) ? e() : e;
}
var Tg, Eg = o((() => {
	Tg = class {
		canvas;
		canvasContext;
		width;
		height;
		analyser;
		bufferLength;
		dataArray;
		onDrawFrame;
		streamSource;
		audioContext;
		source;
		constructor(e, t = {}) {
			let n = t.canvas || {}, r = t.canvasContext || {};
			this.analyser = null, this.bufferLength = 0, this.canvas = e, this.width = wg(n.width) || this.canvas.width, this.height = wg(n.height) || this.canvas.height, this.canvas.width = this.width, this.canvas.height = this.height, this.canvasContext = this.canvas.getContext("2d"), this.canvasContext.fillStyle = wg(r.fillStyle) || "rgb(255, 255, 255)", this.canvasContext.strokeStyle = wg(r.strokeStyle) || "rgb(0, 0, 0)", this.canvasContext.lineWidth = wg(r.lineWidth) || 1, this.onDrawFrame = Cg(t.onDrawFrame) ? t.onDrawFrame : () => {};
		}
		addSource(e) {
			this.streamSource = e, this.audioContext = this.streamSource.context, this.analyser = this.audioContext.createAnalyser(), this.analyser.fftSize = 2048, this.bufferLength = this.analyser.frequencyBinCount, this.source = this.audioContext.createBufferSource(), this.dataArray = new Uint8Array(this.bufferLength), this.analyser.getByteTimeDomainData(this.dataArray), this.streamSource.connect(this.analyser);
		}
		draw() {
			let { analyser: e, dataArray: t, bufferLength: n } = this, r = this.canvasContext, i = this.width, a = this.height;
			e && e.getByteTimeDomainData(t), r.fillRect(0, 0, i, a), r.beginPath();
			let o = i * 1 / n, s = 0;
			n || r.moveTo(0, this.height / 2);
			for (let e = 0; e < n; e++) {
				let n = t[e] / 128 * (a / 2);
				e === 0 ? r.moveTo(s, n) : r.lineTo(s, n), s += o;
			}
			r.lineTo(i, a / 2), r.stroke(), this.onDrawFrame(this), requestAnimationFrame(this.#e);
		}
		#e = () => this.draw();
	};
}));
//#endregion
//#region node_modules/@uppy/audio/lib/DiscardButton.js
function Dg({ onDiscard: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: t("discardRecordedFile"),
		"aria-label": t("discardRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 13 13",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			className: "uppy-c-icon",
			children: G("g", {
				fill: "#FFF",
				fillRule: "evenodd",
				children: [G("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), G("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })]
			})
		})
	});
}
var Og = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/audio/lib/RecordButton.js
function kg({ recording: e, onStartRecording: t, onStopRecording: n, i18n: r }) {
	return e ? G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: r("stopAudioRecording"),
		"aria-label": r("stopAudioRecording"),
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: G("rect", {
				x: "15",
				y: "15",
				width: "70",
				height: "70"
			})
		})
	}) : G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: r("startAudioRecording"),
		"aria-label": r("startAudioRecording"),
		onClick: t,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14px",
			height: "20px",
			viewBox: "0 0 14 20",
			children: G("path", {
				d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z",
				fill: "#FFF",
				"fill-rule": "nonzero"
			})
		})
	});
}
var Ag = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/audio/lib/formatSeconds.js
function jg(e) {
	return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
}
var Mg = o((() => {}));
//#endregion
//#region node_modules/@uppy/audio/lib/RecordingLength.js
function Ng({ recordingLengthSeconds: e }) {
	return G("span", { children: jg(e) });
}
var Pg = o((() => {
	K(), Mg();
}));
//#endregion
//#region node_modules/@uppy/audio/lib/SubmitButton.js
function Fg({ onSubmit: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit",
		type: "button",
		title: t("submitRecordedFile"),
		"aria-label": t("submitRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			width: "12",
			height: "9",
			viewBox: "0 0 12 9",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: G("path", {
				fill: "#fff",
				fillRule: "nonzero",
				d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
			})
		})
	});
}
var Ig = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/audio/lib/RecordingScreen.js
function Lg(e) {
	let { stream: t, recordedAudio: n, onStop: r, recording: i, supportsRecording: a, audioSources: o, showAudioSourceDropdown: s, onSubmit: c, i18n: l, onStartRecording: u, onStopRecording: d, onDiscardRecordedAudio: f, recordingLengthSeconds: p } = e, m = q(null), h = q();
	gn(() => () => {
		h.current = null, r();
	}, [r]), gn(() => {
		if (!n && (h.current = new Tg(m.current, {
			canvas: {
				width: 600,
				height: 600
			},
			canvasContext: {
				lineWidth: 2,
				fillStyle: "rgb(0,0,0)",
				strokeStyle: "green"
			}
		}), h.current.draw(), t)) {
			let e = new AudioContext().createMediaStreamSource(t);
			h.current.addSource(e);
		}
	}, [n, t]);
	let g = n != null, _ = !g && a, v = s && !g && o && o.length > 1;
	return G("div", {
		className: "uppy-Audio-container",
		children: [G("div", {
			className: "uppy-Audio-audioContainer",
			children: g ? G("audio", {
				className: "uppy-Audio-player",
				controls: !0,
				src: n
			}) : G("canvas", {
				ref: m,
				className: "uppy-Audio-canvas"
			})
		}), G("div", {
			className: "uppy-Audio-footer",
			children: [
				G("div", {
					className: "uppy-Audio-audioSourceContainer",
					children: v ? xg(e) : null
				}),
				G("div", {
					className: "uppy-Audio-buttonContainer",
					children: [
						_ && G(kg, {
							recording: i,
							onStartRecording: u,
							onStopRecording: d,
							i18n: l
						}),
						g && G(Fg, {
							onSubmit: c,
							i18n: l
						}),
						g && G(Dg, {
							onDiscard: f,
							i18n: l
						})
					]
				}),
				G("div", {
					className: "uppy-Audio-recordingLength",
					children: !g && G(Ng, { recordingLengthSeconds: p })
				})
			]
		})]
	});
}
var Rg = o((() => {
	K(), jl(), Sg(), Eg(), Og(), Ag(), Pg(), Ig();
}));
//#endregion
//#region node_modules/@uppy/audio/lib/supportsMediaRecorder.js
function zg() {
	return typeof MediaRecorder == "function" && typeof MediaRecorder.prototype?.start == "function";
}
var Bg = o((() => {})), Vg, Hg = o((() => {
	K(), Z(), X(), gg(), vg(), bg(), Rg(), Bg(), Vg = class extends ar {
		static VERSION = hg.version;
		#e;
		icon;
		#t = null;
		#n = !1;
		#r = null;
		#i = null;
		#a = null;
		#o;
		#s;
		constructor(e, t) {
			super(e, t), this.#o = navigator.mediaDevices, this.#s = this.#o != null, this.id = this.opts.id || "Audio", this.type = "acquirer", this.icon = () => G("svg", {
				className: "uppy-DashboardTab-iconAudio",
				"aria-hidden": "true",
				focusable: "false",
				width: "32px",
				height: "32px",
				viewBox: "0 0 32 32",
				children: G("path", {
					d: "M21.143 12.297c.473 0 .857.383.857.857v2.572c0 3.016-2.24 5.513-5.143 5.931v2.64h2.572a.857.857 0 110 1.714H12.57a.857.857 0 110-1.714h2.572v-2.64C12.24 21.24 10 18.742 10 15.726v-2.572a.857.857 0 111.714 0v2.572A4.29 4.29 0 0016 20.01a4.29 4.29 0 004.286-4.285v-2.572c0-.474.384-.857.857-.857zM16 6.5a3 3 0 013 3v6a3 3 0 01-6 0v-6a3 3 0 013-3z",
					fill: "currentcolor",
					"fill-rule": "nonzero"
				})
			}), this.defaultLocale = _g, this.opts = { ...t }, this.i18nInit(), this.title = this.i18n("pluginNameAudio"), this.setPluginState({
				hasAudio: !1,
				audioReady: !1,
				cameraError: null,
				recordingLengthSeconds: 0,
				audioSources: [],
				currentDeviceId: null
			});
		}
		#c() {
			return this.#o ? this.#o.enumerateDevices().then((e) => e.some((e) => e.kind === "audioinput")) : Promise.resolve(!1);
		}
		#l = (e) => this.#s ? (this.#n = !0, this.#c().then((t) => (this.setPluginState({ hasAudio: t }), this.#o.getUserMedia({ audio: !0 }).then((t) => {
			this.#t = t;
			let n = null, r = t.getAudioTracks();
			n = e?.deviceId ? r.findLast((t) => t.getSettings().deviceId === e.deviceId) : r[0].getSettings().deviceId, this.#_(), this.setPluginState({
				currentDeviceId: n,
				audioReady: !0
			});
		}).catch((e) => {
			this.setPluginState({
				audioReady: !1,
				cameraError: e
			}), this.uppy.info(Me(e), "error");
		})))) : Promise.reject(/* @__PURE__ */ Error("Microphone access not supported"));
		#u = () => {
			this.#i = new MediaRecorder(this.#t), this.#r = [];
			let e = !1;
			this.#i.addEventListener("dataavailable", (t) => {
				this.#r.push(t.data);
				let { restrictions: n } = this.uppy.opts;
				if (this.#r.length > 1 && n.maxFileSize != null && !e) {
					let t = this.#r.reduce((e, t) => e + t.size, 0), r = (t - this.#r[0].size) / (this.#r.length - 1) * 3;
					t > Math.max(0, n.maxFileSize - r) && (e = !0, this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3), this.#d());
				}
			}), this.#i.start(500), this.#e = setInterval(() => {
				let e = this.getPluginState().recordingLengthSeconds;
				this.setPluginState({ recordingLengthSeconds: e + 1 });
			}, 1e3), this.setPluginState({ isRecording: !0 });
		};
		#d = () => new Promise((e) => {
			this.#i.addEventListener("stop", () => {
				e();
			}), this.#i.stop(), clearInterval(this.#e), this.setPluginState({ recordingLengthSeconds: 0 });
		}).then(() => (this.setPluginState({ isRecording: !1 }), this.#h())).then((e) => {
			try {
				this.#a = e, this.setPluginState({ recordedAudio: URL.createObjectURL(e.data) });
			} catch (e) {
				Ze(e) || this.uppy.log(e);
			}
		}).then(() => {
			this.#r = null, this.#i = null;
		}, (e) => {
			throw this.#r = null, this.#i = null, e;
		});
		#f = () => {
			this.setPluginState({ recordedAudio: null }), this.#a = null;
		};
		#p = () => {
			try {
				this.#a && this.uppy.addFile(this.#a);
			} catch (e) {
				Ze(e) || this.uppy.log(e, "warning");
			}
		};
		#m = async () => {
			this.#t && this.#t.getAudioTracks().forEach((e) => {
				e.stop();
			}), this.#i && await new Promise((e) => {
				this.#i.addEventListener("stop", e, { once: !0 }), this.#i.stop(), clearInterval(this.#e);
			}), this.#r = null, this.#i = null, this.#n = !1, this.#t = null, this.setPluginState({
				recordedAudio: null,
				isRecording: !1,
				recordingLengthSeconds: 0
			});
		};
		#h() {
			let e = this.#r.find((e) => e.type?.length > 0).type, t = L(e);
			if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
			let n = `audio-${Date.now()}.${t}`, r = new Blob(this.#r, { type: e }), i = {
				source: this.id,
				name: n,
				data: new Blob([r], { type: e }),
				type: e
			};
			return Promise.resolve(i);
		}
		#g = (e) => {
			this.#m(), this.#l({ deviceId: e });
		};
		#_ = () => {
			this.#o.enumerateDevices().then((e) => {
				this.setPluginState({ audioSources: e.filter((e) => e.kind === "audioinput") });
			});
		};
		render() {
			this.#n || this.#l();
			let e = this.getPluginState();
			return !e.audioReady || !e.hasAudio ? G(yg, {
				icon: this.icon,
				i18n: this.i18n,
				hasAudio: e.hasAudio
			}) : G(Lg, {
				...e,
				onChangeSource: this.#g,
				onStartRecording: this.#u,
				onStopRecording: this.#d,
				onDiscardRecordedAudio: this.#f,
				onSubmit: this.#p,
				onStop: this.#m,
				i18n: this.i18n,
				showAudioSourceDropdown: this.opts.showAudioSourceDropdown,
				supportsRecording: zg(),
				recording: e.isRecording,
				stream: this.#t
			});
		}
		install() {
			this.setPluginState({
				audioReady: !1,
				recordingLengthSeconds: 0
			});
			let { target: e } = this.opts;
			e && this.mount(e, this), this.#o && (this.#_(), this.#o.ondevicechange = () => {
				if (this.#_(), this.#t) {
					let e = !0, { audioSources: t, currentDeviceId: n } = this.getPluginState();
					t.forEach((t) => {
						n === t.deviceId && (e = !1);
					}), e && (this.#m(), this.#l());
				}
			});
		}
		uninstall() {
			this.#t && this.#m(), this.unmount();
		}
	};
})), Ug = /* @__PURE__ */ c({ default: () => Vg }), Wg = o((() => {
	Hg();
})), Gg, Kg, qg, Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_, c_, l_ = o((() => {
	Gg = "@uppy/screen-capture", Kg = "Uppy plugin that captures video from display or application.", qg = "6.0.1", Jg = "dist/style.min.css", Yg = "module", Xg = ["*.css"], Zg = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build"
	}, Qg = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"screen capture",
		"video",
		"record",
		"mediarecorder"
	], $g = "https://uppy.io", e_ = { url: "https://github.com/transloadit/uppy/issues" }, t_ = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, n_ = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], r_ = {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	}, i_ = { preact: "^10.29.2" }, a_ = { "@uppy/core": "^6.2.0" }, o_ = { access: "public" }, s_ = {
		"@uppy-dev/tsconfig": "^0.0.0",
		cssnano: "^8.0.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3"
	}, c_ = {
		name: Gg,
		description: Kg,
		version: qg,
		license: "MIT",
		style: Jg,
		type: Yg,
		sideEffects: Xg,
		scripts: Zg,
		keywords: Qg,
		homepage: $g,
		bugs: e_,
		repository: t_,
		files: n_,
		exports: r_,
		dependencies: i_,
		peerDependencies: a_,
		publishConfig: o_,
		devDependencies: s_
	};
})), u_, d_ = o((() => {
	u_ = { strings: {
		pluginNameScreenCapture: "Screencast",
		startCapturing: "Begin screen capturing",
		stopCapturing: "Stop screen capturing",
		submitRecordedFile: "Submit recorded file",
		streamActive: "Stream active",
		streamPassive: "Stream passive",
		micDisabled: "Microphone access denied by user",
		recording: "Recording",
		takeScreenshot: "Take Screenshot",
		discardMediaFile: "Discard Media"
	} };
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/DiscardButton.js
function f_({ onDiscard: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--discard",
		type: "button",
		title: t("discardMediaFile"),
		"aria-label": t("discardMediaFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			children: [G("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), G("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})]
		})
	});
}
var p_ = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/RecordButton.js
function m_({ recording: e, onStartRecording: t, onStopRecording: n, i18n: r }) {
	return e ? G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
		type: "button",
		title: r("stopCapturing"),
		"aria-label": r("stopCapturing"),
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: G("rect", {
				x: "15",
				y: "15",
				width: "70",
				height: "70"
			})
		})
	}) : G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
		type: "button",
		title: r("startCapturing"),
		"aria-label": r("startCapturing"),
		onClick: t,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			children: G("path", { d: "M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" })
		})
	});
}
var h_ = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenshotButton.js
function g_({ onScreenshot: e, i18n: t }) {
	return G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--screenshot",
		type: "button",
		title: t("takeScreenshot"),
		"aria-label": t("takeScreenshot"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			children: [G("path", { d: "M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" }), G("path", {
				"fill-rule": "evenodd",
				d: "M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
				"clip-rule": "evenodd"
			})]
		})
	});
}
var __ = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/StopWatch.js
function v_(e) {
	return (e - (e %= 60)) / 60 + (e > 9 ? ":" : ":0") + e;
}
var y_, b_ = o((() => {
	K(), El(), y_ = class extends U {
		wrapperStyle = {
			width: "100%",
			height: "100%",
			display: "flex"
		};
		overlayStyle = {
			position: "absolute",
			width: "100%",
			height: "100%",
			background: "black",
			opacity: .7
		};
		infoContainerStyle = {
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "auto",
			marginBottom: "auto",
			zIndex: 1,
			color: "white"
		};
		infotextStyle = {
			marginLeft: "auto",
			marginRight: "auto",
			marginBottom: "1rem",
			fontSize: "1.5rem"
		};
		timeStyle = {
			display: "block",
			fontWeight: "bold",
			marginLeft: "auto",
			marginRight: "auto",
			fontSize: "3rem",
			fontFamily: "Courier New"
		};
		timerRunning = !1;
		timer;
		constructor(e) {
			super(e), this.state = { elapsedTime: 0 };
		}
		startTimer() {
			this.timerTick(), this.timerRunning = !0;
		}
		resetTimer() {
			clearTimeout(this.timer), this.setState({ elapsedTime: 0 }), this.timerRunning = !1;
		}
		timerTick() {
			this.timer = setTimeout(() => {
				this.setState((e) => ({ elapsedTime: e.elapsedTime + 1 })), this.timerTick();
			}, 1e3);
		}
		render() {
			let { recording: e, i18n: t } = { ...this.props }, { elapsedTime: n } = this.state, r = v_(n);
			return e && !this.timerRunning && this.startTimer(), !e && this.timerRunning && this.resetTimer(), e ? G("div", {
				style: this.wrapperStyle,
				children: [G("div", { style: this.overlayStyle }), G("div", {
					style: this.infoContainerStyle,
					children: [G("div", {
						style: this.infotextStyle,
						children: t("recording")
					}), G("div", {
						style: this.timeStyle,
						children: r
					})]
				})]
			}) : null;
		}
	};
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/StreamStatus.js
function x_({ streamActive: e, i18n: t }) {
	return e ? G("div", {
		title: t("streamActive"),
		className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive",
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: [
				G("path", {
					d: "M0 0h24v24H0z",
					opacity: ".1",
					fill: "none"
				}),
				G("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				G("path", { d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })
			]
		})
	}) : G("div", {
		title: t("streamPassive"),
		className: "uppy-ScreenCapture-icon--stream",
		children: G("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: [
				G("path", {
					d: "M0 0h24v24H0z",
					opacity: ".1",
					fill: "none"
				}),
				G("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				G("path", { d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z" })
			]
		})
	});
}
var S_ = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/SubmitButton.js
function C_({ recording: e, recordedVideo: t, onSubmit: n, capturedScreenshotUrl: r, i18n: i }) {
	return (t || r) && !e ? G("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
		type: "button",
		title: i("submitRecordedFile"),
		"aria-label": i("submitRecordedFile"),
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: G("svg", {
			width: "12",
			height: "9",
			viewBox: "0 0 12 9",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: G("path", {
				fill: "#fff",
				fillRule: "nonzero",
				d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
			})
		})
	}) : null;
}
var w_ = o((() => {
	K();
})), T_, E_ = o((() => {
	K(), El(), p_(), h_(), __(), b_(), S_(), w_(), T_ = class extends U {
		videoElement = null;
		componentWillUnmount() {
			let { onStop: e } = this.props;
			e();
		}
		render() {
			let { recording: e, stream: t, recordedVideo: n, enableScreenshots: r, capturedScreenshotUrl: i } = this.props, a = { playsinline: !0 };
			return (e || !n && !e) && (a.muted = !0, a.autoplay = !0, a.srcObject = t), n && !e && (a.muted = !1, a.controls = !0, a.src = n, this.videoElement && (this.videoElement.srcObject = null)), G("div", {
				className: "uppy uppy-ScreenCapture-container",
				children: [G("div", {
					className: "uppy-ScreenCapture-mediaContainer",
					children: [
						G(x_, { ...this.props }),
						i && !e && !n ? G("div", {
							className: "uppy-ScreenCapture-imageContainer",
							children: G("img", {
								src: i,
								className: "uppy-ScreenCapture-media",
								alt: "screenshotPreview"
							})
						}) : G("video", {
							ref: (e) => {
								this.videoElement = e;
							},
							className: "uppy-ScreenCapture-media",
							...a
						}),
						G("div", { children: G(y_, { ...this.props }) })
					]
				}), G("div", {
					className: "uppy-ScreenCapture-buttonContainer",
					children: n || i ? G(H, { children: [G(C_, { ...this.props }), G(f_, { ...this.props })] }) : G(H, { children: [r && !e && G(g_, { ...this.props }), G(m_, { ...this.props })] })
				})]
			});
		}
	};
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenRecIcon.js
function D_() {
	return G("svg", {
		className: "uppy-DashboardTab-iconScreenRec",
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: G("g", {
			fill: "currentcolor",
			fillRule: "evenodd",
			children: [G("path", { d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z" }), G("circle", {
				cx: "16",
				cy: "16",
				r: "2"
			})]
		})
	});
}
var O_ = o((() => {
	K();
}));
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenCapture.js
function k_() {
	return window.MediaRecorder && navigator.mediaDevices?.getDisplayMedia;
}
function A_() {
	return window.MediaRecorder && navigator.mediaDevices;
}
var j_, M_, N_, P_ = o((() => {
	K(), Z(), X(), l_(), d_(), E_(), O_(), j_ = [
		"image/png",
		"image/jpeg",
		"image/webp"
	], M_ = {
		displayMediaConstraints: { video: {
			width: 1280,
			height: 720,
			frameRate: {
				ideal: 3,
				max: 5
			},
			cursor: "motion",
			displaySurface: "monitor"
		} },
		userMediaConstraints: { audio: !0 },
		preferredVideoMimeType: "video/webm",
		preferredImageMimeType: "image/png",
		enableScreenshots: !0
	}, N_ = class extends ar {
		static VERSION = c_.version;
		mediaDevices;
		protocol;
		icon;
		streamInterrupted;
		captureActive;
		capturedMediaFile;
		videoStream = null;
		audioStream = null;
		userDenied = !1;
		recorder = null;
		outputStream = null;
		recordingChunks = null;
		constructor(e, t) {
			super(e, {
				...M_,
				...t
			}), this.mediaDevices = A_(), this.protocol = location.protocol === "https:" ? "https" : "http", this.id = this.opts.id || "ScreenCapture", this.type = "acquirer", this.icon = D_, this.defaultLocale = u_, this.i18nInit(), this.title = this.i18n("pluginNameScreenCapture"), this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.submit = this.submit.bind(this), this.streamInterrupted = this.streamInactivated.bind(this), this.captureScreenshot = this.captureScreenshot.bind(this), this.discardRecordedMedia = this.discardRecordedMedia.bind(this), this.captureActive = !1, this.capturedMediaFile = null, this.setPluginState({
				streamActive: !1,
				audioStreamActive: !1,
				recording: !1,
				recordedVideo: null,
				screenRecError: null,
				capturedScreenshotUrl: null,
				status: "init"
			});
		}
		install() {
			if (!k_()) return this.uppy.log("Screen recorder access is not supported", "warning"), null;
			this.setPluginState({
				streamActive: !1,
				audioStreamActive: !1,
				status: "init"
			});
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.videoStream && this.stop(), this.unmount();
		}
		start() {
			return this.mediaDevices ? (this.captureActive = !0, this.selectAudioStreamSource(), this.selectVideoStreamSource().then((e) => {
				e === !1 && this.parent?.hideAllPanels && (this.parent.hideAllPanels(), this.captureActive = !1);
			})) : Promise.reject(/* @__PURE__ */ Error("Screen recorder access not supported"));
		}
		selectVideoStreamSource() {
			return this.videoStream ? new Promise((e) => e(this.videoStream)) : this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((e) => (this.videoStream = e, this.videoStream.addEventListener("inactive", () => {
				this.streamInactivated();
			}), this.setPluginState({
				streamActive: !0,
				status: "ready",
				screenRecError: null
			}), e)).catch((e) => (this.setPluginState({
				screenRecError: e,
				status: "error"
			}), this.userDenied = !0, setTimeout(() => {
				this.userDenied = !1;
			}, 1e3), !1));
		}
		selectAudioStreamSource() {
			return this.audioStream ? new Promise((e) => e(this.audioStream)) : this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((e) => (this.audioStream = e, this.setPluginState({ audioStreamActive: !0 }), e)).catch((e) => (e.name === "NotAllowedError" && (this.uppy.info(this.i18n("micDisabled"), "error", 5e3), this.uppy.log(this.i18n("micDisabled"), "warning")), !1));
		}
		startRecording() {
			let e = {};
			this.capturedMediaFile = null, this.recordingChunks = [];
			let { preferredVideoMimeType: t } = this.opts;
			this.selectVideoStreamSource().then((n) => {
				if (n === !1) throw Error("No video stream available");
				t && MediaRecorder.isTypeSupported(t) && L(t) && (e.mimeType = t);
				let r = [n.getVideoTracks()[0]];
				this.audioStream && r.push(this.audioStream.getAudioTracks()[0]), this.outputStream = new MediaStream(r), this.recorder = new MediaRecorder(this.outputStream, e), this.recorder.addEventListener("dataavailable", (e) => {
					this.recordingChunks.push(e.data);
				}), this.recorder.start(), this.setPluginState({
					recording: !0,
					status: "recording"
				});
			}).catch((e) => {
				this.uppy.log(e, "error"), this.setPluginState({
					screenRecError: e,
					status: "error"
				});
			});
		}
		streamInactivated() {
			let { recordedVideo: e, recording: t } = { ...this.getPluginState() };
			!e && !t ? (this.parent?.hideAllPanels && this.parent.hideAllPanels(), this.setPluginState({ status: "init" })) : t && (this.uppy.log("Capture stream inactive — stop recording"), this.stopRecording()), this.videoStream = null, this.audioStream = null, this.setPluginState({
				streamActive: !1,
				audioStreamActive: !1
			});
		}
		stopRecording() {
			return new Promise((e) => {
				this.recorder.addEventListener("stop", () => {
					e();
				}), this.recorder.stop();
			}).then(() => (this.setPluginState({ recording: !1 }), this.getVideo())).then((e) => {
				this.capturedMediaFile = e, this.setPluginState({
					recordedVideo: URL.createObjectURL(e.data),
					status: "captured"
				});
			}).then(() => {
				this.recordingChunks = null, this.recorder = null;
			}, (e) => {
				throw this.recordingChunks = null, this.recorder = null, e;
			});
		}
		discardRecordedMedia() {
			let { capturedScreenshotUrl: e, recordedVideo: t } = this.getPluginState();
			e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.capturedMediaFile = null, this.setPluginState({
				recordedVideo: null,
				capturedScreenshotUrl: null,
				status: this.getPluginState().streamActive ? "ready" : "init"
			});
		}
		submit() {
			try {
				this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile);
			} catch (e) {
				Ze(e) || this.uppy.log(e, "warning");
			}
		}
		stop() {
			this.videoStream &&= (this.videoStream.getVideoTracks().forEach((e) => {
				e.stop();
			}), this.videoStream.getAudioTracks().forEach((e) => {
				e.stop();
			}), null), this.audioStream &&= (this.audioStream.getAudioTracks().forEach((e) => {
				e.stop();
			}), this.audioStream.getVideoTracks().forEach((e) => {
				e.stop();
			}), null), this.outputStream &&= (this.outputStream.getAudioTracks().forEach((e) => {
				e.stop();
			}), this.outputStream.getVideoTracks().forEach((e) => {
				e.stop();
			}), null);
			let { capturedScreenshotUrl: e, recordedVideo: t } = this.getPluginState();
			e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.setPluginState({
				recording: !1,
				streamActive: !1,
				audioStreamActive: !1,
				recordedVideo: null,
				capturedScreenshotUrl: null,
				status: "init"
			}), this.captureActive = !1;
		}
		getVideo() {
			let e = this.recordingChunks[0].type, t = L(e);
			if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
			let n = `screencap-${Date.now()}.${t}`, r = new Blob(this.recordingChunks, { type: e }), i = {
				source: this.id,
				name: n,
				data: new Blob([r], { type: e }),
				type: e
			};
			return Promise.resolve(i);
		}
		async captureScreenshot() {
			if (!this.mediaDevices?.getDisplayMedia) throw Error("Screen capture is not supported");
			try {
				let e = this.videoStream;
				if (!e) {
					let t = await this.selectVideoStreamSource();
					if (!t) throw Error("Failed to get screen capture stream");
					e = t;
				}
				let t = document.createElement("video");
				t.srcObject = e, await new Promise((e) => {
					t.onloadedmetadata = () => {
						t.play(), e(null);
					};
				});
				let n = document.createElement("canvas");
				n.width = t.videoWidth, n.height = t.videoHeight;
				let r = n.getContext("2d");
				if (!r) throw Error("Failed to get canvas context");
				r.drawImage(t, 0, 0, n.width, n.height);
				let i = this.opts.preferredImageMimeType;
				return (!i || !j_.includes(i)) && (this.uppy.log(`Unsupported image type "${i}", falling back to image/png`, "warning"), i = "image/png"), new Promise((e, r) => {
					n.toBlob((a) => {
						if (!a) {
							r(/* @__PURE__ */ Error("Failed to create screenshot blob"));
							return;
						}
						let o = L(i) || "png", s = {
							source: this.id,
							name: `Screenshot ${(/* @__PURE__ */ new Date()).toISOString()}.${o}`,
							type: i,
							data: a
						};
						try {
							this.capturedMediaFile = s;
							let t = URL.createObjectURL(a);
							this.setPluginState({
								capturedScreenshotUrl: t,
								status: "captured"
							}), e();
						} catch (e) {
							this.getPluginState().capturedScreenshotUrl && this.setPluginState({ capturedScreenshotUrl: null }), Ze(e) || this.uppy.log(e, "error"), r(e);
						} finally {
							t.srcObject = null, n.remove(), t.remove();
						}
					}, i, 1);
				});
			} catch (e) {
				throw this.uppy.log(e, "error"), e;
			}
		}
		render() {
			let e = this.getPluginState();
			return !e.streamActive && !this.captureActive && !this.userDenied && this.start(), G(T_, {
				...e,
				onStartRecording: this.startRecording,
				onStopRecording: this.stopRecording,
				enableScreenshots: this.opts.enableScreenshots,
				onScreenshot: this.captureScreenshot,
				onStop: this.stop,
				onSubmit: this.submit,
				i18n: this.i18n,
				stream: this.videoStream,
				onDiscard: this.discardRecordedMedia
			});
		}
	};
})), F_ = /* @__PURE__ */ c({ default: () => N_ }), I_ = o((() => {
	P_();
})), L_ = /* @__PURE__ */ c({ default: () => R_ }), R_, z_ = o((() => {
	Z(), tc(), R_ = class extends ar {
		constructor(e, t) {
			super(e, t), this.id = this.opts.id || "Disk", this.type = "acquirer", this.files = [], this.rootFolderId = null, this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, {
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
})), B_, V_, H_, U_, W_, G_, K_, q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv = o((() => {
	B_ = "@uppy/box", V_ = "Import files from Box, into Uppy.", H_ = "5.0.0", U_ = "module", W_ = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, G_ = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"box"
	], K_ = "https://uppy.io", q_ = { url: "https://github.com/transloadit/uppy/issues" }, J_ = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Y_ = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], X_ = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, Z_ = { preact: "^10.29.2" }, Q_ = { "@uppy/core": "^6.0.0" }, $_ = { access: "public" }, ev = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, tv = {
		name: B_,
		description: V_,
		version: H_,
		license: "MIT",
		type: U_,
		sideEffects: !1,
		scripts: W_,
		keywords: G_,
		homepage: K_,
		bugs: q_,
		repository: J_,
		files: Y_,
		exports: X_,
		dependencies: Z_,
		peerDependencies: Q_,
		publishConfig: $_,
		devDependencies: ev
	};
})), rv, iv = o((() => {
	rv = { strings: { pluginNameBox: "Box" } };
})), av, ov = o((() => {
	K(), Z(), Ia(), tc(), nv(), iv(), av = class extends ar {
		static VERSION = tv.version;
		icon;
		provider;
		view;
		storage;
		files;
		rootFolderId = null;
		constructor(e, t) {
			super(e, t), this.id = this.opts.id || "Box", this.type = "acquirer", this.storage = this.opts.storage || ja, this.files = [], this.icon = () => G("svg", {
				className: "uppy-DashboardTab-iconBox",
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("g", {
					fill: "currentcolor",
					fillRule: "nonzero",
					children: [G("path", { d: "m16.4 13.5c-1.6 0-3 0.9-3.7 2.2-0.7-1.3-2.1-2.2-3.7-2.2-1 0-1.8 0.3-2.5 0.8v-3.6c-0.1-0.3-0.5-0.7-1-0.7s-0.8 0.4-0.8 0.8v7c0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-0.9 3.7-2.2 0.7 1.3 2.1 2.2 3.7 2.2 2.3 0 4.2-1.9 4.2-4.2 0.1-2.4-1.8-4.3-4.1-4.3m-7.5 6.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5m7.5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5" }), G("path", { d: "m27.2 20.6l-2.3-2.8 2.3-2.8c0.3-0.4 0.2-0.9-0.2-1.2s-1-0.2-1.3 0.2l-2 2.4-2-2.4c-0.3-0.4-0.9-0.4-1.3-0.2-0.4 0.3-0.5 0.8-0.2 1.2l2.3 2.8-2.3 2.8c-0.3 0.4-0.2 0.9 0.2 1.2s1 0.2 1.3-0.2l2-2.4 2 2.4c0.3 0.4 0.9 0.4 1.3 0.2 0.4-0.3 0.4-0.8 0.2-1.2" })]
				})
			}), this.opts.companionAllowedHosts = Ri(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new ka(e, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionKeysParams: this.opts.companionKeysParams,
				companionCookiesRule: this.opts.companionCookiesRule,
				provider: "box",
				pluginId: this.id,
				supportsRefreshToken: !1
			}), this.defaultLocale = rv, this.i18nInit(), this.title = this.i18n("pluginNameBox"), this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, {
				provider: this.provider,
				loadAllFiles: !0,
				virtualList: !0
			});
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.view.tearDown(), this.unmount();
		}
		render(e) {
			return this.view.render(e);
		}
	};
})), sv = /* @__PURE__ */ c({ default: () => av }), cv = o((() => {
	ov();
})), lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv = o((() => {
	lv = "@uppy/dropbox", uv = "Import files from Dropbox, into Uppy.", dv = "6.0.0", fv = "module", pv = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, mv = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"dropbox"
	], hv = "https://uppy.io", gv = { url: "https://github.com/transloadit/uppy/issues" }, _v = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, vv = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], yv = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, bv = { preact: "^10.29.2" }, xv = { "@uppy/core": "^6.0.0" }, Sv = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, Cv = {
		name: lv,
		description: uv,
		version: dv,
		license: "MIT",
		type: fv,
		sideEffects: !1,
		scripts: pv,
		keywords: mv,
		homepage: hv,
		bugs: gv,
		repository: _v,
		files: vv,
		exports: yv,
		dependencies: bv,
		peerDependencies: xv,
		devDependencies: Sv
	};
})), Tv, Ev = o((() => {
	Tv = { strings: { pluginNameDropbox: "Dropbox" } };
})), Dv, Ov = o((() => {
	K(), Z(), Ia(), tc(), wv(), Ev(), Dv = class extends ar {
		static VERSION = Cv.version;
		icon;
		provider;
		view;
		storage;
		files;
		rootFolderId = null;
		constructor(e, t) {
			super(e, t), this.id = this.opts.id || "Dropbox", this.type = "acquirer", this.storage = this.opts.storage || ja, this.files = [], this.icon = () => G("svg", {
				className: "uppy-DashboardTab-iconDropbox",
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("path", {
					d: "M10.5 7.5L5 10.955l5.5 3.454 5.5-3.454 5.5 3.454 5.5-3.454L21.5 7.5 16 10.955zM10.5 21.319L5 17.864l5.5-3.455 5.5 3.455zM16 17.864l5.5-3.455 5.5 3.455-5.5 3.455zM16 25.925l-5.5-3.455 5.5-3.454 5.5 3.454z",
					fill: "currentcolor",
					fillRule: "nonzero"
				})
			}), this.opts.companionAllowedHosts = Ri(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new ka(e, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionKeysParams: this.opts.companionKeysParams,
				companionCookiesRule: this.opts.companionCookiesRule,
				provider: "dropbox",
				pluginId: this.id,
				supportsRefreshToken: !0
			}), this.defaultLocale = Tv, this.i18nInit(), this.title = this.i18n("pluginNameDropbox"), this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, {
				provider: this.provider,
				loadAllFiles: !0,
				virtualList: !0,
				supportsSearch: !0
			});
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.view.tearDown(), this.unmount();
		}
		render(e) {
			return this.view.render(e);
		}
	};
})), kv = /* @__PURE__ */ c({ default: () => Dv }), Av = o((() => {
	Ov();
})), jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv, Kv = o((() => {
	jv = "@uppy/facebook", Mv = "Import files from Facebook, into Uppy.", Nv = "6.0.0", Pv = "module", Fv = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, Iv = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"facebook"
	], Lv = "https://uppy.io", Rv = { url: "https://github.com/transloadit/uppy/issues" }, zv = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Bv = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], Vv = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, Hv = { preact: "^10.29.2" }, Uv = { "@uppy/core": "^6.0.0" }, Wv = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, Gv = {
		name: jv,
		description: Mv,
		version: Nv,
		license: "MIT",
		type: Pv,
		sideEffects: !1,
		scripts: Fv,
		keywords: Iv,
		homepage: Lv,
		bugs: Rv,
		repository: zv,
		files: Bv,
		exports: Vv,
		dependencies: Hv,
		peerDependencies: Uv,
		devDependencies: Wv
	};
})), qv, Jv = o((() => {
	qv = { strings: { pluginNameFacebook: "Facebook" } };
})), Yv, Xv = o((() => {
	K(), Z(), Ia(), tc(), Kv(), Jv(), Yv = class extends ar {
		static VERSION = Gv.version;
		icon;
		provider;
		view;
		storage;
		files;
		rootFolderId = null;
		constructor(e, t) {
			super(e, t), this.id = this.opts.id || "Facebook", this.type = "acquirer", this.storage = this.opts.storage || ja, this.files = [], this.icon = () => G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("g", {
					fill: "none",
					fillRule: "evenodd",
					children: [G("path", {
						d: "M27 16c0-6.075-4.925-11-11-11S5 9.925 5 16c0 5.49 4.023 10.041 9.281 10.866V19.18h-2.793V16h2.793v-2.423c0-2.757 1.642-4.28 4.155-4.28 1.204 0 2.462.215 2.462.215v2.707h-1.387c-1.366 0-1.792.848-1.792 1.718V16h3.05l-.487 3.18h-2.563v7.686C22.977 26.041 27 21.49 27 16",
						fill: "#1777F2"
					}), G("path", {
						d: "M20.282 19.18L20.77 16h-3.051v-2.063c0-.87.426-1.718 1.792-1.718h1.387V9.512s-1.258-.215-2.462-.215c-2.513 0-4.155 1.523-4.155 4.28V16h-2.793v3.18h2.793v7.686a11.082 11.082 0 003.438 0V19.18h2.563",
						fill: "#FFFFFE"
					})]
				})
			}), this.opts.companionAllowedHosts = Ri(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new ka(e, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionKeysParams: this.opts.companionKeysParams,
				companionCookiesRule: this.opts.companionCookiesRule,
				provider: "facebook",
				pluginId: this.id,
				supportsRefreshToken: !1
			}), this.defaultLocale = qv, this.i18nInit(), this.title = this.i18n("pluginNameFacebook"), this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, { provider: this.provider });
			let { target: e } = this.opts;
			e && this.mount(e, this);
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
})), Zv = /* @__PURE__ */ c({ default: () => Yv }), Qv = o((() => {
	Xv();
})), $v, ey, ty, ny, ry, iy, ay, oy, sy, cy, ly, uy, dy, fy, py, my = o((() => {
	$v = "@uppy/onedrive", ey = "Import files from OneDrive, into Uppy.", ty = "6.0.0", ny = "module", ry = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, iy = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"onedrive"
	], ay = "https://uppy.io", oy = { url: "https://github.com/transloadit/uppy/issues" }, sy = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, cy = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], ly = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, uy = { preact: "^10.29.2" }, dy = { "@uppy/core": "^6.0.0" }, fy = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, py = {
		name: $v,
		description: ey,
		version: ty,
		license: "MIT",
		type: ny,
		sideEffects: !1,
		scripts: ry,
		keywords: iy,
		homepage: ay,
		bugs: oy,
		repository: sy,
		files: cy,
		exports: ly,
		dependencies: uy,
		peerDependencies: dy,
		devDependencies: fy
	};
})), hy, gy = o((() => {
	hy = { strings: { pluginNameOneDrive: "OneDrive" } };
})), _y, vy = o((() => {
	K(), Z(), Ia(), tc(), my(), gy(), _y = class extends ar {
		static VERSION = py.version;
		icon;
		provider;
		view;
		storage;
		files;
		rootFolderId = null;
		constructor(e, t) {
			super(e, t), this.type = "acquirer", this.files = [], this.storage = this.opts.storage || ja, this.id = this.opts.id || "OneDrive", this.icon = () => G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("g", {
					fill: "none",
					fillRule: "nonzero",
					children: [
						G("path", {
							d: "M13.39 12.888l4.618 2.747 2.752-1.15a4.478 4.478 0 012.073-.352 6.858 6.858 0 00-5.527-5.04 6.895 6.895 0 00-6.876 2.982l.07-.002a5.5 5.5 0 012.89.815z",
							fill: "#0364B8"
						}),
						G("path", {
							d: "M13.39 12.887v.001a5.5 5.5 0 00-2.89-.815l-.07.002a5.502 5.502 0 00-4.822 2.964 5.43 5.43 0 00.38 5.62l4.073-1.702 1.81-.757 4.032-1.685 2.105-.88-4.619-2.748z",
							fill: "#0078D4"
						}),
						G("path", {
							d: "M22.833 14.133a4.479 4.479 0 00-2.073.352l-2.752 1.15.798.475 2.616 1.556 1.141.68 3.902 2.321a4.413 4.413 0 00-.022-4.25 4.471 4.471 0 00-3.61-2.284z",
							fill: "#1490DF"
						}),
						G("path", {
							d: "M22.563 18.346l-1.141-.68-2.616-1.556-.798-.475-2.105.88L11.87 18.2l-1.81.757-4.073 1.702A5.503 5.503 0 0010.5 23h12.031a4.472 4.472 0 003.934-2.333l-3.902-2.321z",
							fill: "#28A8EA"
						})
					]
				})
			}), this.opts.companionAllowedHosts = Ri(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new ka(e, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionKeysParams: this.opts.companionKeysParams,
				companionCookiesRule: this.opts.companionCookiesRule,
				provider: "onedrive",
				pluginId: this.id,
				supportsRefreshToken: !0
			}), this.defaultLocale = hy, this.i18nInit(), this.title = this.i18n("pluginNameOneDrive"), this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, {
				provider: this.provider,
				loadAllFiles: !0,
				virtualList: !0
			});
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.view.tearDown(), this.unmount();
		}
		render(e) {
			return this.view.render(e);
		}
	};
})), yy = /* @__PURE__ */ c({ default: () => _y }), by = o((() => {
	vy();
})), xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy, Iy, Ly = o((() => {
	xy = "@uppy/zoom", Sy = "Import files from zoom, into Uppy.", Cy = "5.0.0", wy = "module", Ty = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, Ey = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"zoom"
	], Dy = "https://uppy.io", Oy = { url: "https://github.com/transloadit/uppy/issues" }, ky = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Ay = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], jy = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, My = { preact: "^10.29.2" }, Ny = { "@uppy/core": "^6.0.0" }, Py = { access: "public" }, Fy = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, Iy = {
		name: xy,
		description: Sy,
		version: Cy,
		license: "MIT",
		type: wy,
		sideEffects: !1,
		scripts: Ty,
		keywords: Ey,
		homepage: Dy,
		bugs: Oy,
		repository: ky,
		files: Ay,
		exports: jy,
		dependencies: My,
		peerDependencies: Ny,
		publishConfig: Py,
		devDependencies: Fy
	};
})), Ry, zy = o((() => {
	Ry = { strings: { pluginNameZoom: "Zoom" } };
})), By, Vy = o((() => {
	K(), Z(), Ia(), tc(), Ly(), zy(), By = class extends ar {
		static VERSION = Iy.version;
		icon;
		provider;
		view;
		storage;
		files;
		rootFolderId = null;
		constructor(e, t) {
			super(e, t), this.type = "acquirer", this.files = [], this.storage = this.opts.storage || ja, this.id = this.opts.id || "Zoom", this.icon = () => G("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32",
				children: G("path", {
					d: "M24.5 11.125l-2.75 2.063c-.473.353-.75.91-.75 1.5v3.124c0 .59.277 1.147.75 1.5l2.75 2.063a.938.938 0 001.5-.75v-8.75a.938.938 0 00-1.5-.75zm-4.75 9.5c0 1.035-.84 1.875-1.875 1.875H9.75A3.75 3.75 0 016 18.75v-6.875C6 10.84 6.84 10 7.875 10H16a3.75 3.75 0 013.75 3.75v6.875z",
					fill: "#2E8CFF",
					"fill-rule": "evenodd"
				})
			}), this.opts.companionAllowedHosts = Ri(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new ka(e, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionKeysParams: this.opts.companionKeysParams,
				companionCookiesRule: this.opts.companionCookiesRule,
				provider: "zoom",
				pluginId: this.id,
				supportsRefreshToken: !1
			}), this.defaultLocale = Ry, this.i18nInit(), this.title = this.i18n("pluginNameZoom"), this.render = this.render.bind(this);
		}
		install() {
			this.view = new Xs(this, { provider: this.provider });
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.view.tearDown(), this.unmount();
		}
		render(e) {
			return this.view.render(e);
		}
	};
})), Hy = /* @__PURE__ */ c({ default: () => By }), Uy = o((() => {
	Vy();
})), Wy, Gy, Ky, qy, Jy, Yy, Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb = o((() => {
	Wy = "@uppy/url", Gy = "The Url plugin lets users import files from the Internet. Paste any URL and it’ll be added!", Ky = "6.0.1", qy = "dist/style.min.css", Jy = "module", Yy = ["*.css"], Xy = {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		pretest: "yarn workspace @uppy/companion build",
		test: "vitest run --silent='passed-only'",
		"test:e2e": "vitest run --project browser"
	}, Zy = [
		"file uploader",
		"url",
		"import from url",
		"uppy",
		"uppy-plugin"
	], Qy = "https://uppy.io", $y = { url: "https://github.com/transloadit/uppy/issues" }, eb = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, tb = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], nb = {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	}, rb = {
		nanoid: "^6.0.1",
		preact: "^10.29.2"
	}, ib = { "@uppy/core": "^6.2.0" }, ab = {
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
	}, ob = {
		name: Wy,
		description: Gy,
		version: Ky,
		license: "MIT",
		style: qy,
		type: Jy,
		sideEffects: Yy,
		scripts: Xy,
		keywords: Zy,
		homepage: Qy,
		bugs: $y,
		repository: eb,
		files: tb,
		exports: nb,
		dependencies: rb,
		peerDependencies: ib,
		devDependencies: ab
	};
})), cb, lb = o((() => {
	cb = { strings: {
		pluginNameUrl: "Link",
		import: "Import",
		enterUrlToImport: "Enter URL to import a file",
		failedToFetch: "Companion failed to fetch this URL, please make sure it’s correct",
		enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
	} };
})), ub, db = o((() => {
	ub = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
})), fb, pb = o((() => {
	db(), fb = (e = 21) => {
		let t = "", n = e | 0;
		for (; n-- > 0;) t += ub[Math.random() * 64 | 0];
		return t;
	};
})), mb, hb = o((() => {
	K(), El(), pb(), mb = class extends U {
		form = document.createElement("form");
		input;
		constructor(e) {
			super(e), this.form.id = fb();
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
			return G("div", {
				className: "uppy-Url",
				children: [G("input", {
					className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
					type: "text",
					"aria-label": e("enterUrlToImport"),
					placeholder: e("enterUrlToImport"),
					ref: (e) => {
						this.input = e;
					},
					"data-uppy-super-focusable": !0,
					form: this.form.id
				}), G("button", {
					className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
					type: "submit",
					form: this.form.id,
					children: e("import")
				})]
			});
		}
	};
}));
//#endregion
//#region node_modules/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js
function gb(e, t, n) {
	let r = be(e.items), i;
	switch (t) {
		case "paste":
			if (r.some((e) => e.kind === "file")) return;
			i = r.filter((e) => e.kind === "string" && e.type === "text/plain");
			break;
		case "drop":
			i = r.filter((e) => e.kind === "string" && e.type === "text/uri-list");
			break;
		default: throw Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${t}`);
	}
	i.forEach((e) => {
		e.getAsString((e) => n(e));
	});
}
var _b = o((() => {
	X();
}));
//#endregion
//#region node_modules/@uppy/url/lib/Url.js
function vb() {
	return G("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: G("path", {
			d: "M23.637 15.312l-2.474 2.464a3.582 3.582 0 01-.577.491c-.907.657-1.897.986-2.968.986a4.925 4.925 0 01-3.959-1.971c-.248-.329-.164-.902.165-1.149.33-.247.907-.164 1.155.164 1.072 1.478 3.133 1.724 4.618.656a.642.642 0 00.33-.328l2.473-2.463c1.238-1.313 1.238-3.366-.082-4.597a3.348 3.348 0 00-4.618 0l-1.402 1.395a.799.799 0 01-1.154 0 .79.79 0 010-1.15l1.402-1.394a4.843 4.843 0 016.843 0c2.062 1.805 2.144 5.007.248 6.896zm-8.081 5.664l-1.402 1.395a3.348 3.348 0 01-4.618 0c-1.319-1.23-1.319-3.365-.082-4.596l2.475-2.464.328-.328c.743-.492 1.567-.739 2.475-.657.906.165 1.648.574 2.143 1.314.248.329.825.411 1.155.165.33-.248.412-.822.165-1.15-.825-1.068-1.98-1.724-3.216-1.888-1.238-.247-2.556.082-3.628.902l-.495.493-2.474 2.464c-1.897 1.969-1.814 5.09.083 6.977.99.904 2.226 1.396 3.463 1.396s2.473-.492 3.463-1.395l1.402-1.396a.79.79 0 000-1.15c-.33-.328-.908-.41-1.237-.082z",
			fill: "#FF753E",
			"fill-rule": "nonzero"
		})
	});
}
function yb(e) {
	return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e;
}
function bb(e) {
	return be(e.dataTransfer.items).filter((e) => e.kind === "string" && e.type === "text/uri-list").length > 0;
}
function xb(e) {
	return e?.startsWith("http://") || e?.startsWith("https://");
}
function Sb(e) {
	let { pathname: t } = new URL(e);
	return t.substring(t.lastIndexOf("/") + 1);
}
var Cb, wb = o((() => {
	K(), Z(), Ia(), X(), sb(), lb(), hb(), _b(), Cb = class e extends ar {
		static VERSION = ob.version;
		static requestClientId = e.name;
		icon;
		hostname;
		client;
		canHandleRootDrop;
		constructor(t, n) {
			if (super(t, n), this.id = this.opts.id || "Url", this.type = "acquirer", this.icon = () => G(vb, {}), this.defaultLocale = cb, this.i18nInit(), this.title = this.i18n("pluginNameUrl"), this.hostname = this.opts.companionUrl, !this.hostname) throw Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
			this.client = new Ta(t, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionCookiesRule: this.opts.companionCookiesRule
			}), this.uppy.registerRequestClient(e.requestClientId, this.client);
		}
		getMeta = (e) => this.client.post("url/meta", { url: e });
		addFile = async (t, n) => {
			if (t.startsWith("blob")) return;
			let r = yb(t);
			if (!xb(r)) {
				this.uppy.log(`[URL] Incorrect URL entered: ${r}`), this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
				return;
			}
			this.uppy.log(`[URL] Adding file from dropped/pasted url: ${r}`);
			try {
				let t = await this.getMeta(r), i = {
					meta: n,
					source: this.id,
					name: t.name || Sb(r),
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
					Ze(e) || this.uppy.log(e);
					return;
				}
			} catch (e) {
				this.uppy.log(e), this.uppy.info({
					message: this.i18n("failedToFetch"),
					details: Me(e)
				}, "error", 4e3);
				return;
			}
		};
		handleRootDrop = (e) => {
			gb(e.dataTransfer, "drop", (e) => {
				this.addFile(e);
			});
		};
		handleRootPaste = (e) => {
			gb(e.clipboardData, "paste", (e) => {
				this.addFile(e);
			});
		};
		render() {
			return G(mb, {
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
	}, Cb.prototype.canHandleRootDrop = bb;
})), Tb = /* @__PURE__ */ c({ default: () => Cb }), Eb = o((() => {
	wb();
})), Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb, Rb, zb, Bb, Vb, Hb = o((() => {
	Db = "@uppy/google-drive-picker", Ob = "The Google Drive Picker plugin for Uppy lets users import files from their Google Drive account", kb = "2.0.0", Ab = "module", jb = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, Mb = [
		"file uploader",
		"google drive",
		"google picker",
		"cloud storage",
		"uppy",
		"uppy-plugin"
	], Nb = "https://uppy.io", Pb = { url: "https://github.com/transloadit/uppy/issues" }, Fb = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, Ib = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], Lb = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, Rb = { preact: "^10.29.2" }, zb = { "@uppy/core": "^6.0.0" }, Bb = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, Vb = {
		name: Db,
		description: Ob,
		version: kb,
		license: "MIT",
		type: Ab,
		sideEffects: !1,
		scripts: jb,
		keywords: Mb,
		homepage: Nb,
		bugs: Pb,
		repository: Fb,
		files: Ib,
		exports: Lb,
		dependencies: Rb,
		peerDependencies: zb,
		devDependencies: Bb
	};
})), Ub, Wb = o((() => {
	Ub = { strings: { pluginNameGoogleDrivePicker: "Google Drive" } };
})), Gb, Kb = o((() => {
	K(), Z(), Ia(), tc(), Hb(), Wb(), Gb = class e extends ar {
		static VERSION = Vb.version;
		static requestClientId = e.name;
		type = "acquirer";
		icon = Ua;
		storage;
		defaultLocale = Ub;
		requestClientId = e.requestClientId;
		constructor(t, n) {
			super(t, n), this.id = this.opts.id || "GoogleDrivePicker", this.storage = this.opts.storage || ja, this.defaultLocale = Ub, this.i18nInit(), this.title = this.i18n("pluginNameGoogleDrivePicker"), this.setPluginState({
				loading: !1,
				accessToken: void 0
			}), this.getPluginState = this.getPluginState.bind(this), this.setPluginState = this.setPluginState.bind(this);
			let r = new Ta(t, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionCookiesRule: this.opts.companionCookiesRule,
				companionKeysParams: this.opts.companionKeysParams
			});
			this.uppy.registerRequestClient(e.requestClientId, r);
		}
		install() {
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.unmount();
		}
		render = () => G(Ka, {
			getPluginState: this.getPluginState,
			setPluginState: this.setPluginState,
			storage: this.storage,
			pickerType: "drive",
			uppy: this.uppy,
			i18n: this.i18n,
			clientId: this.opts.clientId,
			apiKey: this.opts.apiKey,
			appId: this.opts.appId,
			requestClientId: e.requestClientId,
			companionUrl: this.opts.companionUrl
		});
	};
})), qb = /* @__PURE__ */ c({ default: () => Gb }), Jb = o((() => {
	Kb();
})), Yb, Xb, Zb, Qb, $b, ex, tx, nx, rx, ix, ax, ox, sx, cx, lx, ux = o((() => {
	Yb = "@uppy/google-photos-picker", Xb = "The Google Photos Picker plugin for Uppy lets users import files from their Google Photos account", Zb = "2.0.0", Qb = "module", $b = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	}, ex = [
		"file uploader",
		"google photos",
		"google picker",
		"cloud storage",
		"uppy",
		"uppy-plugin"
	], tx = "https://uppy.io", nx = { url: "https://github.com/transloadit/uppy/issues" }, rx = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, ix = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], ax = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, ox = { preact: "^10.29.2" }, sx = { "@uppy/core": "^6.0.0" }, cx = {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}, lx = {
		name: Yb,
		description: Xb,
		version: Zb,
		license: "MIT",
		type: Qb,
		sideEffects: !1,
		scripts: $b,
		keywords: ex,
		homepage: tx,
		bugs: nx,
		repository: rx,
		files: ix,
		exports: ax,
		dependencies: ox,
		peerDependencies: sx,
		devDependencies: cx
	};
})), dx, fx = o((() => {
	dx = { strings: { pluginNameGooglePhotosPicker: "Google Photos" } };
})), px, mx = o((() => {
	K(), Z(), Ia(), tc(), ux(), fx(), px = class e extends ar {
		static VERSION = lx.version;
		static requestClientId = e.name;
		type = "acquirer";
		icon = Ha;
		storage;
		defaultLocale = dx;
		requestClientId = e.requestClientId;
		constructor(t, n) {
			super(t, n), this.id = this.opts.id || "GooglePhotosPicker", this.storage = this.opts.storage || ja, this.defaultLocale = dx, this.i18nInit(), this.title = this.i18n("pluginNameGooglePhotosPicker"), this.setPluginState({
				loading: !1,
				accessToken: void 0
			}), this.getPluginState = this.getPluginState.bind(this), this.setPluginState = this.setPluginState.bind(this);
			let r = new Ta(t, {
				companionUrl: this.opts.companionUrl,
				companionHeaders: this.opts.companionHeaders,
				companionCookiesRule: this.opts.companionCookiesRule,
				companionKeysParams: this.opts.companionKeysParams
			});
			this.uppy.registerRequestClient(e.requestClientId, r);
		}
		install() {
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.unmount();
		}
		render = () => G(Ka, {
			getPluginState: this.getPluginState,
			setPluginState: this.setPluginState,
			storage: this.storage,
			pickerType: "photos",
			uppy: this.uppy,
			i18n: this.i18n,
			clientId: this.opts.clientId,
			requestClientId: e.requestClientId,
			companionUrl: this.opts.companionUrl
		});
	};
})), hx = /* @__PURE__ */ c({ default: () => px }), gx = o((() => {
	mx();
})), _x = /* @__PURE__ */ c({ useBrowsableSource: () => vx });
function vx(e, t, n, { label: r, connectUrl: i, icon: a, isSearchable: o, views: s }, { list: c, search: l, disconnect: u, failedMessage: d }) {
	let f = () => {
		try {
			return localStorage.getItem(`fluppy:view:${n}`) === "grid" ? "grid" : "list";
		} catch {
			return null;
		}
	}, p = (e) => {
		try {
			localStorage.setItem(`fluppy:view:${n}`, e);
		} catch {}
	}, m = () => Object.assign(/* @__PURE__ */ Error("Authorization required"), { isAuthError: !0 }), h = (t) => e.getPlugin(n)?.setPluginState({ authenticated: t }), g = new BroadcastChannel("fluppy"), _ = null;
	g.addEventListener("message", ({ data: t }) => {
		if (t?.source === n) {
			if (_) return t.isConnected ? _.resolve() : _.reject(Error(d));
			if (t.isConnected) {
				let t = e.getPlugin(n);
				h(!0), t?.view.openFolder(t.rootFolderId);
			}
		}
	});
	let v = {
		provider: n,
		name: r,
		fetchPreAuthToken: async () => {},
		fileUrl: (e) => e,
		async list(t) {
			let r = await c(n, t ?? null);
			if (r?.authenticated === !1) throw h(!1), m();
			if (!r || r.error) {
				let t = r?.error ?? d;
				throw e.info(t, "error", 5e3), Error(t);
			}
			return h(!0), r;
		},
		async search(t, { path: r } = {}) {
			let i = await l(n, t, r ?? null);
			if (!i || i.error) {
				let t = i?.error ?? d;
				throw e.info(t, "error", 5e3), Error(t);
			}
			return i;
		},
		login({ signal: e } = {}) {
			let t = window.open(i, "_blank", yx);
			return new Promise((n, r) => {
				let i = null, a = (t) => (n) => {
					clearInterval(i), e?.removeEventListener("abort", o), _ = null, t(n);
				}, o = () => {
					t?.close(), _?.reject(Error(d));
				};
				if (_ = {
					resolve: a(n),
					reject: a(r)
				}, !t) return _.reject(Error(d));
				e?.addEventListener("abort", o), i = setInterval(() => {
					t.closed && (clearInterval(i), setTimeout(() => _?.reject(Error(d)), bx));
				}, 500);
			});
		},
		async logout() {
			return await u(n), {
				ok: !0,
				revoked: !0
			};
		}
	};
	class y extends t {
		constructor(e, t) {
			super(e, t), this.provider = v, this.title = r, a && (this.icon = () => xt("span", {
				class: "fi-fluppy-source-icon",
				dangerouslySetInnerHTML: { __html: a }
			}));
		}
		install() {
			super.install(), this.view.opts.supportsSearch = !!o, this.view.opts.standalone = !i, s && this.showAs(f() ?? "list");
		}
		mount(e, t) {
			let n = super.mount(e, t);
			return s && n?.addEventListener("click", this.openGridFolder), n;
		}
		uninstall() {
			g.close(), this.el?.removeEventListener("click", this.openGridFolder), super.uninstall();
		}
		showAs(e) {
			let t = e === "grid" ? "list" : "grid";
			this.view.opts.viewType = e, this.view.opts.virtualList = e !== "grid", this.view.opts.toolbarActions = [{
				id: "fluppy-view",
				label: s[t],
				refresh: !1,
				run: () => (p(t), this.showAs(t), this.setPluginState({}), !1)
			}];
		}
		openGridFolder = (t) => {
			if (this.view.opts.viewType !== "grid") return;
			let r = t.target.closest?.(".uppy-ProviderBrowserItem-inner")?.getAttribute("for");
			r && e.getPlugin("Dashboard")?.getPluginState().activePickerPanel?.id === n && this.getPluginState().partialTree?.find((e) => e.id === r)?.type === "folder" && (t.preventDefault(), this.view.openFolder(r));
		};
	}
	e.use(y, {
		id: n,
		companionUrl: window.location.origin
	});
}
var yx, bx, xx = o((() => {
	dn(), yx = "popup,width=640,height=760", bx = 1e3;
})), Sx = {
	camera: () => Promise.resolve().then(() => (Zh(), Xh)),
	microphone: () => Promise.resolve().then(() => (Wg(), Ug)),
	screenCapture: () => Promise.resolve().then(() => (I_(), F_))
}, Cx = (e, t) => !!e?.length && e.every((e) => e.startsWith(`${t}/`)), wx = {
	disk: () => Promise.resolve().then(() => (z_(), L_)),
	box: () => Promise.resolve().then(() => (cv(), sv)),
	dropbox: () => Promise.resolve().then(() => (Av(), kv)),
	facebook: () => Promise.resolve().then(() => (Qv(), Zv)),
	onedrive: () => Promise.resolve().then(() => (by(), yy)),
	zoom: () => Promise.resolve().then(() => (Uy(), Hy))
}, Tx = {
	url: async (e, { label: t }, { describe: n, failedMessage: r }) => {
		let { default: i } = await Promise.resolve().then(() => (Eb(), Tb));
		e.use(i, {
			id: "url",
			companionUrl: window.location.origin,
			locale: { strings: { pluginNameUrl: t } }
		}), e.getPlugin("url").addFile = async (t) => {
			if (t.startsWith("blob")) return;
			let i = /^[a-z0-9]+:\/\//i.test(t) ? t : `https://${t}`, a = await n("url", { url: i }).catch(() => null);
			if (!a || a.error) {
				e.info(a?.error ?? r, "error", 5e3);
				return;
			}
			try {
				return e.addFile({
					source: "url",
					name: a.name,
					type: a.type,
					data: { size: a.size },
					isRemote: !0,
					remote: { body: { url: i } }
				});
			} catch {}
		};
	},
	"google-drive": async (e, { label: t, clientId: n, apiKey: r, appId: i, exports: a }) => {
		let { default: o } = await Promise.resolve().then(() => (Jb(), qb));
		Ex(e, o, "google-drive", {
			clientId: n,
			apiKey: r,
			appId: i,
			locale: { strings: { pluginNameGoogleDrivePicker: t } }
		}), e.setOptions({ onBeforeFileAdded: (t) => {
			if (!(t.remote?.requestClientId === o.requestClientId && t.type?.startsWith("application/vnd.google-apps.") && t.type !== "application/vnd.google-apps.shortcut") || e.checkIfFileAlreadyExists(t.id)) return;
			let [n, r] = a[t.type] ?? a["*"], i = t.name.toLowerCase().endsWith(`.${r}`) ? t.name : `${t.name}.${r}`;
			return {
				...t,
				name: i,
				type: n,
				extension: r,
				meta: {
					...t.meta,
					name: i,
					type: n
				}
			};
		} });
	},
	"google-photos": async (e, { label: t, clientId: n }) => {
		let { default: r } = await Promise.resolve().then(() => (gx(), hx));
		Ex(e, r, "google-photos", {
			clientId: n,
			locale: { strings: { pluginNameGooglePhotosPicker: t } }
		}, (e) => ({
			name: e.name,
			type: e.type
		}));
	}
};
function Ex(e, t, n, r, i = () => ({})) {
	e.use(t, {
		companionUrl: window.location.origin,
		storage: {
			getItem: async (e) => sessionStorage.getItem(e),
			setItem: async (e, t) => sessionStorage.setItem(e, t),
			removeItem: async (e) => sessionStorage.removeItem(e)
		},
		...r
	}), e.on("file-added", (r) => {
		r.remote?.requestClientId === t.requestClientId && e.setFileState(r.id, {
			source: n,
			remote: {
				...r.remote,
				body: {
					...r.remote.body,
					...i(r)
				}
			}
		});
	});
}
async function Dx(e, t, n) {
	for (let [r, i] of Object.entries(t ?? {})) {
		if (r in wx) {
			let [{ default: t }, { useBrowsableSource: a }] = await Promise.all([wx[r](), Promise.resolve().then(() => (xx(), _x))]);
			a(e, t, r, i, n);
			continue;
		}
		await Tx[r]?.(e, i, n);
	}
}
async function Ox(e, t, { acceptedFileTypes: n }) {
	for (let r of t.filter((e) => e in Sx)) {
		let { default: t } = await Sx[r]();
		e.use(t, r === "camera" && Cx(n, "image") ? { modes: ["picture"] } : r === "camera" && Cx(n, "video") ? { modes: ["video-audio"] } : {});
	}
}
//#endregion
//#region node_modules/tus-js-client/lib.esm/error.js
function kx(e) {
	"@babel/helpers - typeof";
	return kx = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, kx(e);
}
function Ax(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Mx(r.key), r);
	}
}
function jx(e, t, n) {
	return t && Ax(e.prototype, t), n && Ax(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Mx(e) {
	var t = Nx(e, "string");
	return kx(t) == "symbol" ? t : t + "";
}
function Nx(e, t) {
	if (kx(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (kx(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Px(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Fx(e, t, n) {
	return t = Wx(t), Ix(e, Vx() ? Reflect.construct(t, n || [], Wx(e).constructor) : t.apply(e, n));
}
function Ix(e, t) {
	if (t && (kx(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return Lx(e);
}
function Lx(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Rx(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Ux(e, t);
}
function zx(e) {
	var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
	return zx = function(e) {
		if (e === null || !Hx(e)) return e;
		if (typeof e != "function") throw TypeError("Super expression must either be null or a function");
		if (t !== void 0) {
			if (t.has(e)) return t.get(e);
			t.set(e, n);
		}
		function n() {
			return Bx(e, arguments, Wx(this).constructor);
		}
		return n.prototype = Object.create(e.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), Ux(n, e);
	}, zx(e);
}
function Bx(e, t, n) {
	if (Vx()) return Reflect.construct.apply(null, arguments);
	var r = [null];
	r.push.apply(r, t);
	var i = new (e.bind.apply(e, r))();
	return n && Ux(i, n.prototype), i;
}
function Vx() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (Vx = function() {
		return !!e;
	})();
}
function Hx(e) {
	try {
		return Function.toString.call(e).indexOf("[native code]") !== -1;
	} catch {
		return typeof e == "function";
	}
}
function Ux(e, t) {
	return Ux = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Ux(e, t);
}
function Wx(e) {
	return Wx = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, Wx(e);
}
var Gx, Kx = o((() => {
	Gx = /*#__PURE__*/ function(e) {
		function t(e) {
			var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
			if (Px(this, t), n = Fx(this, t, [e]), n.originalRequest = i, n.originalResponse = a, n.causingError = r, r != null && (e += `, caused by ${r.toString()}`), i != null) {
				var o = i.getHeader("X-Request-ID") || "n/a", s = i.getMethod(), c = i.getURL(), l = a ? a.getStatus() : "n/a", u = a ? a.getBody() || "" : "n/a";
				e += `, originated from request (method: ${s}, url: ${c}, response code: ${l}, response text: ${u}, request id: ${o})`;
			}
			return n.message = e, n;
		}
		return Rx(t, e), jx(t);
	}(/*#__PURE__*/ zx(Error));
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/logger.js
function qx(e) {
	Jx && console.log(e);
}
var Jx, Yx = o((() => {
	Jx = !1;
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/noopUrlStorage.js
function Xx(e) {
	"@babel/helpers - typeof";
	return Xx = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Xx(e);
}
function Zx(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Qx(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, eS(r.key), r);
	}
}
function $x(e, t, n) {
	return t && Qx(e.prototype, t), n && Qx(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function eS(e) {
	var t = tS(e, "string");
	return Xx(t) == "symbol" ? t : t + "";
}
function tS(e, t) {
	if (Xx(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Xx(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var nS, rS = o((() => {
	nS = /*#__PURE__*/ function() {
		function e() {
			Zx(this, e);
		}
		return $x(e, [
			{
				key: "listAllUploads",
				value: function() {
					return Promise.resolve([]);
				}
			},
			{
				key: "findUploadsByFingerprint",
				value: function(e) {
					return Promise.resolve([]);
				}
			},
			{
				key: "removeUpload",
				value: function(e) {
					return Promise.resolve();
				}
			},
			{
				key: "addUpload",
				value: function(e, t) {
					return Promise.resolve(null);
				}
			}
		]);
	}();
})), iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS, jS, MS, NS, PS, FS, IS, LS, RS, zS, BS, VS = o((() => {
	iS = "3.9.4", aS = iS, oS = typeof TextDecoder == "function" ? new TextDecoder("utf-8", { ignoreBOM: !0 }) : void 0, sS = typeof TextEncoder == "function" ? new TextEncoder() : void 0, cS = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="), lS = ((e) => {
		let t = {};
		return e.forEach((e, n) => t[e] = n), t;
	})(cS), uS = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, dS = String.fromCharCode.bind(String), fS = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : (e) => new Uint8Array(Array.prototype.slice.call(e, 0)), pS = (e) => e.replace(/=/g, "").replace(/[+\/]/g, (e) => e == "+" ? "-" : "_"), mS = (e) => e.replace(/[^A-Za-z0-9\+\/]/g, ""), hS = (e) => {
		let t, n, r, i, a = "", o = e.length % 3;
		for (let o = 0; o < e.length;) {
			if ((n = e.charCodeAt(o++)) > 255 || (r = e.charCodeAt(o++)) > 255 || (i = e.charCodeAt(o++)) > 255) throw TypeError("invalid character found");
			t = n << 16 | r << 8 | i, a += cS[t >> 18 & 63] + cS[t >> 12 & 63] + cS[t >> 6 & 63] + cS[t & 63];
		}
		return o ? a.slice(0, o - 3) + "===".substring(o) : a;
	}, gS = typeof btoa == "function" ? (e) => btoa(e) : hS, _S = typeof Uint8Array.prototype.toBase64 == "function" ? (e) => e.toBase64() : (e) => {
		let t = 4096, n = [];
		for (let r = 0, i = e.length; r < i; r += t) n.push(dS.apply(null, e.subarray(r, r + t)));
		return gS(n.join(""));
	}, vS = (e, t = !1) => t ? pS(_S(e)) : _S(e), yS = (e) => {
		if (e.length < 2) {
			var t = e.charCodeAt(0);
			return t < 128 ? e : t < 2048 ? dS(192 | t >>> 6) + dS(128 | t & 63) : dS(224 | t >>> 12 & 15) + dS(128 | t >>> 6 & 63) + dS(128 | t & 63);
		}
		var t = 65536 + (e.charCodeAt(0) - 55296) * 1024 + (e.charCodeAt(1) - 56320);
		return dS(240 | t >>> 18 & 7) + dS(128 | t >>> 12 & 63) + dS(128 | t >>> 6 & 63) + dS(128 | t & 63);
	}, bS = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/g, xS = (e) => e.replace(bS, yS), SS = sS ? (e) => _S(sS.encode(e)) : (e) => gS(xS(e)), CS = (e, t = !1) => t ? pS(SS(e)) : SS(e), wS = (e) => CS(e, !0), TS = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, ES = (e) => {
		switch (e.length) {
			case 4:
				var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
				return dS((t >>> 10) + 55296) + dS((t & 1023) + 56320);
			case 3: return dS((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
			default: return dS((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
		}
	}, DS = (e) => e.replace(TS, ES), OS = (e) => {
		if (e = e.replace(/\s+/g, ""), !uS.test(e)) throw TypeError("malformed base64.");
		e += "==".slice(2 - (e.length & 3));
		let t, n, r, i = [];
		for (let a = 0; a < e.length;) t = lS[e.charAt(a++)] << 18 | lS[e.charAt(a++)] << 12 | (n = lS[e.charAt(a++)]) << 6 | (r = lS[e.charAt(a++)]), n === 64 ? i.push(dS(t >> 16 & 255)) : r === 64 ? i.push(dS(t >> 16 & 255, t >> 8 & 255)) : i.push(dS(t >> 16 & 255, t >> 8 & 255, t & 255));
		return i.join("");
	}, kS = typeof atob == "function" ? (e) => atob(mS(e)) : OS, AS = typeof Uint8Array.fromBase64 == "function" ? (e) => Uint8Array.fromBase64(e) : (e) => fS(kS(e).split("").map((e) => e.charCodeAt(0))), jS = (e) => AS(NS(e)), MS = oS ? (e) => oS.decode(AS(e)) : (e) => DS(kS(e)), NS = (e) => mS(e.replace(/[-_]/g, (e) => e == "-" ? "+" : "/")), PS = (e) => MS(NS(e)), FS = (e) => {
		if (typeof e != "string") return !1;
		let t = e.replace(/\s+/g, "").replace(/={0,2}$/, "");
		return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t);
	}, IS = (e) => ({
		value: e,
		enumerable: !1,
		writable: !0,
		configurable: !0
	}), LS = function() {
		let e = (e, t) => Object.defineProperty(String.prototype, e, IS(t));
		e("fromBase64", function() {
			return PS(this);
		}), e("toBase64", function(e) {
			return CS(this, e);
		}), e("toBase64URI", function() {
			return CS(this, !0);
		}), e("toBase64URL", function() {
			return CS(this, !0);
		}), e("toUint8Array", function() {
			return jS(this);
		});
	}, RS = function() {
		let e = (e, t) => Object.defineProperty(Uint8Array.prototype, e, IS(t));
		e("toBase64", function(e) {
			return vS(this, e);
		}), e("toBase64URI", function() {
			return vS(this, !0);
		}), e("toBase64URL", function() {
			return vS(this, !0);
		});
	}, zS = () => {
		LS(), RS();
	}, BS = {
		version: iS,
		VERSION: aS,
		atob: kS,
		atobPolyfill: OS,
		btoa: gS,
		btoaPolyfill: hS,
		fromBase64: PS,
		toBase64: CS,
		encode: CS,
		encodeURI: wS,
		encodeURL: wS,
		utob: xS,
		btou: DS,
		decode: PS,
		isValid: FS,
		fromUint8Array: vS,
		toUint8Array: jS,
		extendString: LS,
		extendUint8Array: RS,
		extendBuiltins: zS
	};
})), HS = /* @__PURE__ */ s(((e, t) => {
	t.exports = function(e, t) {
		if (t = t.split(":")[0], e = +e, !e) return !1;
		switch (t) {
			case "http":
			case "ws": return e !== 80;
			case "https":
			case "wss": return e !== 443;
			case "ftp": return e !== 21;
			case "gopher": return e !== 70;
			case "file": return !1;
		}
		return e !== 0;
	};
})), US = /* @__PURE__ */ s(((e) => {
	var t = Object.prototype.hasOwnProperty, n;
	function r(e) {
		try {
			return decodeURIComponent(e.replace(/\+/g, " "));
		} catch {
			return null;
		}
	}
	function i(e) {
		try {
			return encodeURIComponent(e);
		} catch {
			return null;
		}
	}
	function a(e) {
		for (var t = /([^=?#&]+)=?([^&]*)/g, n = {}, i; i = t.exec(e);) {
			var a = r(i[1]), o = r(i[2]);
			a === null || o === null || a in n || (n[a] = o);
		}
		return n;
	}
	function o(e, r) {
		r ||= "";
		var a = [], o, s;
		for (s in typeof r != "string" && (r = "?"), e) if (t.call(e, s)) {
			if (o = e[s], !o && (o === null || o === n || isNaN(o)) && (o = ""), s = i(s), o = i(o), s === null || o === null) continue;
			a.push(s + "=" + o);
		}
		return a.length ? r + a.join("&") : "";
	}
	e.stringify = o, e.parse = a;
})), WS = /* @__PURE__ */ s(((e, t) => {
	var n = HS(), r = US(), i = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, a = /[\n\r\t]/g, o = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, s = /:\d+$/, c = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, l = /^[a-zA-Z]:/;
	function u(e) {
		return (e || "").toString().replace(i, "");
	}
	var d = [
		["#", "hash"],
		["?", "query"],
		function(e, t) {
			return m(t.protocol) ? e.replace(/\\/g, "/") : e;
		},
		["/", "pathname"],
		[
			"@",
			"auth",
			1
		],
		[
			NaN,
			"host",
			void 0,
			1,
			1
		],
		[
			/:(\d*)$/,
			"port",
			void 0,
			1
		],
		[
			NaN,
			"hostname",
			void 0,
			1,
			1
		]
	], f = {
		hash: 1,
		query: 1
	};
	function p(e) {
		var t = (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}).location || {};
		e ||= t;
		var n = {}, r = typeof e, i;
		if (e.protocol === "blob:") n = new _(unescape(e.pathname), {});
		else if (r === "string") for (i in n = new _(e, {}), f) delete n[i];
		else if (r === "object") {
			for (i in e) i in f || (n[i] = e[i]);
			n.slashes === void 0 && (n.slashes = o.test(e.href));
		}
		return n;
	}
	function m(e) {
		return e === "file:" || e === "ftp:" || e === "http:" || e === "https:" || e === "ws:" || e === "wss:";
	}
	function h(e, t) {
		e = u(e), e = e.replace(a, ""), t ||= {};
		var n = c.exec(e), r = n[1] ? n[1].toLowerCase() : "", i = !!n[2], o = !!n[3], s = 0, l;
		return i ? o ? (l = n[2] + n[3] + n[4], s = n[2].length + n[3].length) : (l = n[2] + n[4], s = n[2].length) : o ? (l = n[3] + n[4], s = n[3].length) : l = n[4], r === "file:" ? s >= 2 && (l = l.slice(2)) : m(r) ? l = n[4] : r ? i && (l = l.slice(2)) : s >= 2 && m(t.protocol) && (l = n[4]), {
			protocol: r,
			slashes: i || m(r),
			slashesCount: s,
			rest: l
		};
	}
	function g(e, t) {
		if (e === "") return t;
		for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, i = n[r - 1], a = !1, o = 0; r--;) n[r] === "." ? n.splice(r, 1) : n[r] === ".." ? (n.splice(r, 1), o++) : o && (r === 0 && (a = !0), n.splice(r, 1), o--);
		return a && n.unshift(""), (i === "." || i === "..") && n.push(""), n.join("/");
	}
	function _(e, t, i) {
		if (e = u(e), e = e.replace(a, ""), !(this instanceof _)) return new _(e, t, i);
		var o, s, c, f, v, y, b = d.slice(), x = typeof t, S = this, C = 0;
		for (x !== "object" && x !== "string" && (i = t, t = null), i && typeof i != "function" && (i = r.parse), t = p(t), s = h(e || "", t), o = !s.protocol && !s.slashes, S.slashes = s.slashes || o && t.slashes, S.protocol = s.protocol || t.protocol || "", e = s.rest, (s.protocol === "file:" && (s.slashesCount !== 2 || l.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !m(S.protocol))) && (b[3] = [/(.*)/, "pathname"]); C < b.length; C++) {
			if (f = b[C], typeof f == "function") {
				e = f(e, S);
				continue;
			}
			c = f[0], y = f[1], c === c ? typeof c == "string" ? (v = c === "@" ? e.lastIndexOf(c) : e.indexOf(c), ~v && (typeof f[2] == "number" ? (S[y] = e.slice(0, v), e = e.slice(v + f[2])) : (S[y] = e.slice(v), e = e.slice(0, v)))) : (v = c.exec(e)) && (S[y] = v[1], e = e.slice(0, v.index)) : S[y] = e, S[y] = S[y] || o && f[3] && t[y] || "", f[4] && (S[y] = S[y].toLowerCase());
		}
		i && (S.query = i(S.query)), o && t.slashes && S.pathname.charAt(0) !== "/" && (S.pathname !== "" || t.pathname !== "") && (S.pathname = g(S.pathname, t.pathname)), S.pathname.charAt(0) !== "/" && m(S.protocol) && (S.pathname = "/" + S.pathname), n(S.port, S.protocol) || (S.host = S.hostname, S.port = ""), S.username = S.password = "", S.auth &&= (v = S.auth.indexOf(":"), ~v ? (S.username = S.auth.slice(0, v), S.username = encodeURIComponent(decodeURIComponent(S.username)), S.password = S.auth.slice(v + 1), S.password = encodeURIComponent(decodeURIComponent(S.password))) : S.username = encodeURIComponent(decodeURIComponent(S.auth)), S.password ? S.username + ":" + S.password : S.username), S.origin = S.protocol !== "file:" && m(S.protocol) && S.host ? S.protocol + "//" + S.host : "null", S.href = S.toString();
	}
	function v(e, t, i) {
		var a = this;
		switch (e) {
			case "query":
				typeof t == "string" && t.length && (t = (i || r.parse)(t)), a[e] = t;
				break;
			case "port":
				a[e] = t, n(t, a.protocol) ? t && (a.host = a.hostname + ":" + t) : (a.host = a.hostname, a[e] = "");
				break;
			case "hostname":
				a[e] = t, a.port && (t += ":" + a.port), a.host = t;
				break;
			case "host":
				a[e] = t, s.test(t) ? (t = t.split(":"), a.port = t.pop(), a.hostname = t.join(":")) : (a.hostname = t, a.port = "");
				break;
			case "protocol":
				a.protocol = t.toLowerCase(), a.slashes = !i;
				break;
			case "pathname":
			case "hash":
				if (t) {
					var o = e === "pathname" ? "/" : "#";
					a[e] = t.charAt(0) === o ? t : o + t;
				} else a[e] = t;
				break;
			case "username":
			case "password":
				a[e] = encodeURIComponent(t);
				break;
			case "auth":
				var c = t.indexOf(":");
				~c ? (a.username = t.slice(0, c), a.username = encodeURIComponent(decodeURIComponent(a.username)), a.password = t.slice(c + 1), a.password = encodeURIComponent(decodeURIComponent(a.password))) : a.username = encodeURIComponent(decodeURIComponent(t));
		}
		for (var l = 0; l < d.length; l++) {
			var u = d[l];
			u[4] && (a[u[1]] = a[u[1]].toLowerCase());
		}
		return a.auth = a.password ? a.username + ":" + a.password : a.username, a.origin = a.protocol !== "file:" && m(a.protocol) && a.host ? a.protocol + "//" + a.host : "null", a.href = a.toString(), a;
	}
	function y(e) {
		(!e || typeof e != "function") && (e = r.stringify);
		var t, n = this, i = n.host, a = n.protocol;
		a && a.charAt(a.length - 1) !== ":" && (a += ":");
		var o = a + (n.protocol && n.slashes || m(n.protocol) ? "//" : "");
		return n.username ? (o += n.username, n.password && (o += ":" + n.password), o += "@") : n.password ? (o += ":" + n.password, o += "@") : n.protocol !== "file:" && m(n.protocol) && !i && n.pathname !== "/" && (o += "@"), (i[i.length - 1] === ":" || s.test(n.hostname) && !n.port) && (i += ":"), o += i + n.pathname, t = typeof n.query == "object" ? e(n.query) : n.query, t && (o += t.charAt(0) === "?" ? t : "?" + t), n.hash && (o += n.hash), o;
	}
	_.prototype = {
		set: v,
		toString: y
	}, _.extractProtocol = h, _.location = p, _.trimLeft = u, _.qs = r, t.exports = _;
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/uuid.js
function GS() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
		var t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
var KS = o((() => {}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/upload.js
function qS() {
	qS = function() {
		return t;
	};
	var e, t = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(e, t, n) {
		e[t] = n.value;
	}, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
	function l(e, t, n) {
		return Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}), e[t];
	}
	try {
		l({}, "");
	} catch {
		l = function(e, t, n) {
			return e[t] = n;
		};
	}
	function u(e, t, n, r) {
		var a = t && t.prototype instanceof _ ? t : _, o = Object.create(a.prototype);
		return i(o, "_invoke", { value: E(e, n, new A(r || [])) }), o;
	}
	function d(e, t, n) {
		try {
			return {
				type: "normal",
				arg: e.call(t, n)
			};
		} catch (e) {
			return {
				type: "throw",
				arg: e
			};
		}
	}
	t.wrap = u;
	var f = "suspendedStart", p = "suspendedYield", m = "executing", h = "completed", g = {};
	function _() {}
	function v() {}
	function y() {}
	var b = {};
	l(b, o, function() {
		return this;
	});
	var x = Object.getPrototypeOf, S = x && x(x(j([])));
	S && S !== n && r.call(S, o) && (b = S);
	var C = y.prototype = _.prototype = Object.create(b);
	function w(e) {
		[
			"next",
			"throw",
			"return"
		].forEach(function(t) {
			l(e, t, function(e) {
				return this._invoke(t, e);
			});
		});
	}
	function T(e, t) {
		function n(i, a, o, s) {
			var c = d(e[i], e, a);
			if (c.type !== "throw") {
				var l = c.arg, u = l.value;
				return u && eC(u) == "object" && r.call(u, "__await") ? t.resolve(u.__await).then(function(e) {
					n("next", e, o, s);
				}, function(e) {
					n("throw", e, o, s);
				}) : t.resolve(u).then(function(e) {
					l.value = e, o(l);
				}, function(e) {
					return n("throw", e, o, s);
				});
			}
			s(c.arg);
		}
		var a;
		i(this, "_invoke", { value: function(e, r) {
			function i() {
				return new t(function(t, i) {
					n(e, r, t, i);
				});
			}
			return a = a ? a.then(i, i) : i();
		} });
	}
	function E(t, n, r) {
		var i = f;
		return function(a, o) {
			if (i === m) throw Error("Generator is already running");
			if (i === h) {
				if (a === "throw") throw o;
				return {
					value: e,
					done: !0
				};
			}
			for (r.method = a, r.arg = o;;) {
				var s = r.delegate;
				if (s) {
					var c = D(s, r);
					if (c) {
						if (c === g) continue;
						return c;
					}
				}
				if (r.method === "next") r.sent = r._sent = r.arg;
				else if (r.method === "throw") {
					if (i === f) throw i = h, r.arg;
					r.dispatchException(r.arg);
				} else r.method === "return" && r.abrupt("return", r.arg);
				i = m;
				var l = d(t, n, r);
				if (l.type === "normal") {
					if (i = r.done ? h : p, l.arg === g) continue;
					return {
						value: l.arg,
						done: r.done
					};
				}
				l.type === "throw" && (i = h, r.method = "throw", r.arg = l.arg);
			}
		};
	}
	function D(t, n) {
		var r = n.method, i = t.iterator[r];
		if (i === e) return n.delegate = null, r === "throw" && t.iterator.return && (n.method = "return", n.arg = e, D(t, n), n.method === "throw") || r !== "return" && (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("The iterator does not provide a '" + r + "' method")), g;
		var a = d(i, t.iterator, n.arg);
		if (a.type === "throw") return n.method = "throw", n.arg = a.arg, n.delegate = null, g;
		var o = a.arg;
		return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, n.method !== "return" && (n.method = "next", n.arg = e), n.delegate = null, g) : o : (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("iterator result is not an object"), n.delegate = null, g);
	}
	function O(e) {
		var t = { tryLoc: e[0] };
		1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
	}
	function k(e) {
		var t = e.completion || {};
		t.type = "normal", delete t.arg, e.completion = t;
	}
	function A(e) {
		this.tryEntries = [{ tryLoc: "root" }], e.forEach(O, this), this.reset(!0);
	}
	function j(t) {
		if (t || t === "") {
			var n = t[o];
			if (n) return n.call(t);
			if (typeof t.next == "function") return t;
			if (!isNaN(t.length)) {
				var i = -1, a = function n() {
					for (; ++i < t.length;) if (r.call(t, i)) return n.value = t[i], n.done = !1, n;
					return n.value = e, n.done = !0, n;
				};
				return a.next = a;
			}
		}
		throw TypeError(eC(t) + " is not iterable");
	}
	return v.prototype = y, i(C, "constructor", {
		value: y,
		configurable: !0
	}), i(y, "constructor", {
		value: v,
		configurable: !0
	}), v.displayName = l(y, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
		var t = typeof e == "function" && e.constructor;
		return !!t && (t === v || (t.displayName || t.name) === "GeneratorFunction");
	}, t.mark = function(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, l(e, c, "GeneratorFunction")), e.prototype = Object.create(C), e;
	}, t.awrap = function(e) {
		return { __await: e };
	}, w(T.prototype), l(T.prototype, s, function() {
		return this;
	}), t.AsyncIterator = T, t.async = function(e, n, r, i, a) {
		a === void 0 && (a = Promise);
		var o = new T(u(e, n, r, i), a);
		return t.isGeneratorFunction(n) ? o : o.next().then(function(e) {
			return e.done ? e.value : o.next();
		});
	}, w(C), l(C, c, "Generator"), l(C, o, function() {
		return this;
	}), l(C, "toString", function() {
		return "[object Generator]";
	}), t.keys = function(e) {
		var t = Object(e), n = [];
		for (var r in t) n.push(r);
		return n.reverse(), function e() {
			for (; n.length;) {
				var r = n.pop();
				if (r in t) return e.value = r, e.done = !1, e;
			}
			return e.done = !0, e;
		};
	}, t.values = j, A.prototype = {
		constructor: A,
		reset: function(t) {
			if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(k), !t) for (var n in this) n.charAt(0) === "t" && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
		},
		stop: function() {
			this.done = !0;
			var e = this.tryEntries[0].completion;
			if (e.type === "throw") throw e.arg;
			return this.rval;
		},
		dispatchException: function(t) {
			if (this.done) throw t;
			var n = this;
			function i(r, i) {
				return s.type = "throw", s.arg = t, n.next = r, i && (n.method = "next", n.arg = e), !!i;
			}
			for (var a = this.tryEntries.length - 1; a >= 0; --a) {
				var o = this.tryEntries[a], s = o.completion;
				if (o.tryLoc === "root") return i("end");
				if (o.tryLoc <= this.prev) {
					var c = r.call(o, "catchLoc"), l = r.call(o, "finallyLoc");
					if (c && l) {
						if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
						if (this.prev < o.finallyLoc) return i(o.finallyLoc);
					} else if (c) {
						if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
					} else {
						if (!l) throw Error("try statement without catch or finally");
						if (this.prev < o.finallyLoc) return i(o.finallyLoc);
					}
				}
			}
		},
		abrupt: function(e, t) {
			for (var n = this.tryEntries.length - 1; n >= 0; --n) {
				var i = this.tryEntries[n];
				if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
					var a = i;
					break;
				}
			}
			a && (e === "break" || e === "continue") && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
			var o = a ? a.completion : {};
			return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, g) : this.complete(o);
		},
		complete: function(e, t) {
			if (e.type === "throw") throw e.arg;
			return e.type === "break" || e.type === "continue" ? this.next = e.arg : e.type === "return" ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : e.type === "normal" && t && (this.next = t), g;
		},
		finish: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), g;
			}
		},
		catch: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.tryLoc === e) {
					var r = n.completion;
					if (r.type === "throw") {
						var i = r.arg;
						k(n);
					}
					return i;
				}
			}
			throw Error("illegal catch attempt");
		},
		delegateYield: function(t, n, r) {
			return this.delegate = {
				iterator: j(t),
				resultName: n,
				nextLoc: r
			}, this.method === "next" && (this.arg = e), g;
		}
	}, t;
}
function JS(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function YS(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, i) {
			var a = e.apply(t, n);
			function o(e) {
				JS(a, r, i, o, s, "next", e);
			}
			function s(e) {
				JS(a, r, i, o, s, "throw", e);
			}
			o(void 0);
		});
	};
}
function XS(e, t) {
	return $S(e) || QS(e, t) || nC(e, t) || ZS();
}
function ZS() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function QS(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function $S(e) {
	if (Array.isArray(e)) return e;
}
function eC(e) {
	"@babel/helpers - typeof";
	return eC = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, eC(e);
}
function tC(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = nC(e)) || t && e && typeof e.length == "number") {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a = !0, o = !1, s;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return a = e.done, e;
		},
		e: function(e) {
			o = !0, s = e;
		},
		f: function() {
			try {
				!a && n.return != null && n.return();
			} finally {
				if (o) throw s;
			}
		}
	};
}
function nC(e, t) {
	if (e) {
		if (typeof e == "string") return rC(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return rC(e, t);
	}
}
function rC(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function iC(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function aC(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? iC(Object(n), !0).forEach(function(t) {
			oC(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : iC(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function oC(e, t, n) {
	return t = uC(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function sC(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function cC(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, uC(r.key), r);
	}
}
function lC(e, t, n) {
	return t && cC(e.prototype, t), n && cC(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function uC(e) {
	var t = dC(e, "string");
	return eC(t) == "symbol" ? t : t + "";
}
function dC(e, t) {
	if (eC(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (eC(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function fC(e) {
	return Object.entries(e).map(function(e) {
		var t = XS(e, 2), n = t[0], r = t[1];
		return `${n} ${BS.encode(String(r))}`;
	}).join(",");
}
function pC(e, t) {
	return e >= t && e < t + 100;
}
function mC(e, t, n) {
	var r = n.httpStack.createRequest(e, t);
	n.protocol === wC ? r.setHeader("Upload-Draft-Interop-Version", "5") : n.protocol === TC ? r.setHeader("Upload-Draft-Interop-Version", "6") : r.setHeader("Tus-Resumable", "1.0.0");
	for (var i = n.headers || {}, a = 0, o = Object.entries(i); a < o.length; a++) {
		var s = XS(o[a], 2), c = s[0], l = s[1];
		r.setHeader(c, l);
	}
	if (n.addRequestId) {
		var u = GS();
		r.setHeader("X-Request-ID", u);
	}
	return r;
}
function hC(e, t, n) {
	return gC.apply(this, arguments);
}
function gC() {
	return gC = YS(/*#__PURE__*/ qS().mark(function e(t, n, r) {
		var i;
		return qS().wrap(function(e) {
			for (;;) switch (e.prev = e.next) {
				case 0:
					if (typeof r.onBeforeRequest != "function") {
						e.next = 3;
						break;
					}
					return e.next = 3, r.onBeforeRequest(t);
				case 3: return e.next = 5, t.send(n);
				case 5:
					if (i = e.sent, typeof r.onAfterResponse != "function") {
						e.next = 9;
						break;
					}
					return e.next = 9, r.onAfterResponse(t, i);
				case 9: return e.abrupt("return", i);
				case 10:
				case "end": return e.stop();
			}
		}, e);
	})), gC.apply(this, arguments);
}
function _C() {
	var e = !0;
	return typeof navigator < "u" && navigator.onLine === !1 && (e = !1), e;
}
function vC(e, t, n) {
	return n.retryDelays == null || t >= n.retryDelays.length || e.originalRequest == null ? !1 : n && typeof n.onShouldRetry == "function" ? n.onShouldRetry(e, t, n) : yC(e);
}
function yC(e) {
	var t = e.originalResponse ? e.originalResponse.getStatus() : 0;
	return (!pC(t, 400) || t === 409 || t === 423) && _C();
}
function bC(e, t) {
	return new SC.default(t, e).toString();
}
function xC(e, t) {
	for (var n = Math.floor(e / t), r = [], i = 0; i < t; i++) r.push({
		start: n * i,
		end: n * (i + 1)
	});
	return r[t - 1].end = e, r;
}
var SC, CC, wC, TC, EC, DC, OC = o((() => {
	VS(), SC = /* @__PURE__ */ u(WS()), Kx(), Yx(), KS(), CC = "tus-v1", wC = "ietf-draft-03", TC = "ietf-draft-05", EC = {
		endpoint: null,
		uploadUrl: null,
		metadata: {},
		metadataForPartialUploads: {},
		fingerprint: null,
		uploadSize: null,
		onProgress: null,
		onChunkComplete: null,
		onSuccess: null,
		onError: null,
		onUploadUrlAvailable: null,
		overridePatchMethod: !1,
		headers: {},
		addRequestId: !1,
		onBeforeRequest: null,
		onAfterResponse: null,
		onShouldRetry: yC,
		chunkSize: Infinity,
		retryDelays: [
			0,
			1e3,
			3e3,
			5e3
		],
		parallelUploads: 1,
		parallelUploadBoundaries: null,
		storeFingerprintForResuming: !0,
		removeFingerprintOnSuccess: !1,
		uploadLengthDeferred: !1,
		uploadDataDuringCreation: !1,
		urlStorage: null,
		fileReader: null,
		httpStack: null,
		protocol: CC
	}, DC = /*#__PURE__*/ function() {
		function e(t, n) {
			sC(this, e), "resume" in n && console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead."), this.options = n, this.options.chunkSize = Number(this.options.chunkSize), this._urlStorage = this.options.urlStorage, this.file = t, this.url = null, this._req = null, this._fingerprint = null, this._urlStorageKey = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0, this._parallelUploads = null, this._parallelUploadUrls = null;
		}
		return lC(e, [
			{
				key: "findPreviousUploads",
				value: function() {
					var e = this;
					return this.options.fingerprint(this.file, this.options).then(function(t) {
						return e._urlStorage.findUploadsByFingerprint(t);
					});
				}
			},
			{
				key: "resumeFromPreviousUpload",
				value: function(e) {
					this.url = e.uploadUrl || null, this._parallelUploadUrls = e.parallelUploadUrls || null, this._urlStorageKey = e.urlStorageKey;
				}
			},
			{
				key: "start",
				value: function() {
					var e = this, t = this.file;
					if (!t) {
						this._emitError(/* @__PURE__ */ Error("tus: no file or stream to upload provided"));
						return;
					}
					if (![
						CC,
						wC,
						TC
					].includes(this.options.protocol)) {
						this._emitError(/* @__PURE__ */ Error(`tus: unsupported protocol ${this.options.protocol}`));
						return;
					}
					if (!this.options.endpoint && !this.options.uploadUrl && !this.url) {
						this._emitError(/* @__PURE__ */ Error("tus: neither an endpoint or an upload URL is provided"));
						return;
					}
					var n = this.options.retryDelays;
					if (n != null && Object.prototype.toString.call(n) !== "[object Array]") {
						this._emitError(/* @__PURE__ */ Error("tus: the `retryDelays` option must either be an array or null"));
						return;
					}
					if (this.options.parallelUploads > 1) for (var r = 0, i = [
						"uploadUrl",
						"uploadSize",
						"uploadLengthDeferred"
					]; r < i.length; r++) {
						var a = i[r];
						if (this.options[a]) {
							this._emitError(/* @__PURE__ */ Error(`tus: cannot use the ${a} option when parallelUploads is enabled`));
							return;
						}
					}
					if (this.options.parallelUploadBoundaries) {
						if (this.options.parallelUploads <= 1) {
							this._emitError(/* @__PURE__ */ Error("tus: cannot use the `parallelUploadBoundaries` option when `parallelUploads` is disabled"));
							return;
						}
						if (this.options.parallelUploads !== this.options.parallelUploadBoundaries.length) {
							this._emitError(/* @__PURE__ */ Error("tus: the `parallelUploadBoundaries` must have the same length as the value of `parallelUploads`"));
							return;
						}
					}
					this.options.fingerprint(t, this.options).then(function(n) {
						return qx(n == null ? "No fingerprint was calculated meaning that the upload cannot be stored in the URL storage." : `Calculated fingerprint: ${n}`), e._fingerprint = n, e._source ? e._source : e.options.fileReader.openFile(t, e.options.chunkSize);
					}).then(function(t) {
						if (e._source = t, e.options.uploadLengthDeferred) e._size = null;
						else if (e.options.uploadSize != null) {
							if (e._size = Number(e.options.uploadSize), Number.isNaN(e._size)) {
								e._emitError(/* @__PURE__ */ Error("tus: cannot convert `uploadSize` option into a number"));
								return;
							}
						} else if (e._size = e._source.size, e._size == null) {
							e._emitError(/* @__PURE__ */ Error("tus: cannot automatically derive upload's size from input. Specify it manually using the `uploadSize` option or use the `uploadLengthDeferred` option"));
							return;
						}
						e.options.parallelUploads > 1 || e._parallelUploadUrls != null ? e._startParallelUpload() : e._startSingleUpload();
					}).catch(function(t) {
						e._emitError(t);
					});
				}
			},
			{
				key: "_startParallelUpload",
				value: function() {
					var t = this, n = this._size, r = 0;
					this._parallelUploads = [];
					var i = this._parallelUploadUrls == null ? this.options.parallelUploads : this._parallelUploadUrls.length, a = this.options.parallelUploadBoundaries ?? xC(this._source.size, i);
					this._parallelUploadUrls && a.forEach(function(e, n) {
						e.uploadUrl = t._parallelUploadUrls[n] || null;
					}), this._parallelUploadUrls = Array(a.length);
					var o = a.map(function(i, o) {
						var s = 0;
						return t._source.slice(i.start, i.end).then(function(c) {
							var l = c.value;
							return new Promise(function(c, u) {
								var d = new e(l, aC(aC({}, t.options), {}, {
									uploadUrl: i.uploadUrl || null,
									storeFingerprintForResuming: !1,
									removeFingerprintOnSuccess: !1,
									parallelUploads: 1,
									parallelUploadBoundaries: null,
									metadata: t.options.metadataForPartialUploads,
									headers: aC(aC({}, t.options.headers), {}, { "Upload-Concat": "partial" }),
									onSuccess: c,
									onError: u,
									onProgress: function(e) {
										r = r - s + e, s = e, t._emitProgress(r, n);
									},
									onUploadUrlAvailable: function() {
										t._parallelUploadUrls[o] = d.url, t._parallelUploadUrls.filter(function(e) {
											return !!e;
										}).length === a.length && t._saveUploadInUrlStorage();
									}
								}));
								d.start(), t._parallelUploads.push(d);
							});
						});
					}), s;
					Promise.all(o).then(function() {
						s = t._openRequest("POST", t.options.endpoint), s.setHeader("Upload-Concat", `final;${t._parallelUploadUrls.join(" ")}`);
						var e = fC(t.options.metadata);
						return e !== "" && s.setHeader("Upload-Metadata", e), t._sendRequest(s, null);
					}).then(function(e) {
						if (!pC(e.getStatus(), 200)) {
							t._emitHttpError(s, e, "tus: unexpected response while creating upload");
							return;
						}
						var n = e.getHeader("Location");
						if (n == null) {
							t._emitHttpError(s, e, "tus: invalid or missing Location header");
							return;
						}
						t.url = bC(t.options.endpoint, n), qx(`Created upload at ${t.url}`), t._emitSuccess(e);
					}).catch(function(e) {
						t._emitError(e);
					});
				}
			},
			{
				key: "_startSingleUpload",
				value: function() {
					if (this._aborted = !1, this.url != null) {
						qx(`Resuming upload from previous URL: ${this.url}`), this._resumeUpload();
						return;
					}
					if (this.options.uploadUrl != null) {
						qx(`Resuming upload from provided URL: ${this.options.uploadUrl}`), this.url = this.options.uploadUrl, this._resumeUpload();
						return;
					}
					qx("Creating a new upload"), this._createUpload();
				}
			},
			{
				key: "abort",
				value: function(t) {
					var n = this;
					if (this._parallelUploads != null) {
						var r = tC(this._parallelUploads), i;
						try {
							for (r.s(); !(i = r.n()).done;) i.value.abort(t);
						} catch (e) {
							r.e(e);
						} finally {
							r.f();
						}
					}
					return this._req !== null && this._req.abort(), this._aborted = !0, this._retryTimeout != null && (clearTimeout(this._retryTimeout), this._retryTimeout = null), !t || this.url == null ? Promise.resolve() : e.terminate(this.url, this.options).then(function() {
						return n._removeFromUrlStorage();
					});
				}
			},
			{
				key: "_emitHttpError",
				value: function(e, t, n, r) {
					this._emitError(new Gx(n, r, e, t));
				}
			},
			{
				key: "_emitError",
				value: function(e) {
					var t = this;
					if (!this._aborted) {
						if (this.options.retryDelays != null && (this._offset != null && this._offset > this._offsetBeforeRetry && (this._retryAttempt = 0), vC(e, this._retryAttempt, this.options))) {
							var n = this.options.retryDelays[this._retryAttempt++];
							this._offsetBeforeRetry = this._offset, this._retryTimeout = setTimeout(function() {
								t.start();
							}, n);
							return;
						}
						if (typeof this.options.onError == "function") this.options.onError(e);
						else throw e;
					}
				}
			},
			{
				key: "_emitSuccess",
				value: function(e) {
					this.options.removeFingerprintOnSuccess && this._removeFromUrlStorage(), typeof this.options.onSuccess == "function" && this.options.onSuccess({ lastResponse: e });
				}
			},
			{
				key: "_emitProgress",
				value: function(e, t) {
					typeof this.options.onProgress == "function" && this.options.onProgress(e, t);
				}
			},
			{
				key: "_emitChunkComplete",
				value: function(e, t, n) {
					typeof this.options.onChunkComplete == "function" && this.options.onChunkComplete(e, t, n);
				}
			},
			{
				key: "_createUpload",
				value: function() {
					var e = this;
					if (!this.options.endpoint) {
						this._emitError(/* @__PURE__ */ Error("tus: unable to create upload because no endpoint is provided"));
						return;
					}
					var t = this._openRequest("POST", this.options.endpoint);
					this.options.uploadLengthDeferred ? t.setHeader("Upload-Defer-Length", "1") : t.setHeader("Upload-Length", `${this._size}`);
					var n = fC(this.options.metadata);
					n !== "" && t.setHeader("Upload-Metadata", n);
					var r;
					this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred ? (this._offset = 0, r = this._addChunkToRequest(t)) : ((this.options.protocol === wC || this.options.protocol === TC) && t.setHeader("Upload-Complete", "?0"), r = this._sendRequest(t, null)), r.then(function(n) {
						if (!pC(n.getStatus(), 200)) {
							e._emitHttpError(t, n, "tus: unexpected response while creating upload");
							return;
						}
						var r = n.getHeader("Location");
						if (r == null) {
							e._emitHttpError(t, n, "tus: invalid or missing Location header");
							return;
						}
						if (e.url = bC(e.options.endpoint, r), qx(`Created upload at ${e.url}`), typeof e.options.onUploadUrlAvailable == "function" && e.options.onUploadUrlAvailable(), e._size === 0) {
							e._emitSuccess(n), e._source.close();
							return;
						}
						e._saveUploadInUrlStorage().then(function() {
							e.options.uploadDataDuringCreation ? e._handleUploadResponse(t, n) : (e._offset = 0, e._performUpload());
						});
					}).catch(function(n) {
						e._emitHttpError(t, null, "tus: failed to create upload", n);
					});
				}
			},
			{
				key: "_resumeUpload",
				value: function() {
					var e = this, t = this._openRequest("HEAD", this.url);
					this._sendRequest(t, null).then(function(n) {
						var r = n.getStatus();
						if (!pC(r, 200)) {
							if (r === 423) {
								e._emitHttpError(t, n, "tus: upload is currently locked; retry later");
								return;
							}
							if (pC(r, 400) && e._removeFromUrlStorage(), !e.options.endpoint) {
								e._emitHttpError(t, n, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
								return;
							}
							e.url = null, e._createUpload();
							return;
						}
						var i = Number.parseInt(n.getHeader("Upload-Offset"), 10);
						if (Number.isNaN(i)) {
							e._emitHttpError(t, n, "tus: invalid or missing offset value");
							return;
						}
						var a = Number.parseInt(n.getHeader("Upload-Length"), 10);
						if (Number.isNaN(a) && !e.options.uploadLengthDeferred && e.options.protocol === CC) {
							e._emitHttpError(t, n, "tus: invalid or missing length value");
							return;
						}
						typeof e.options.onUploadUrlAvailable == "function" && e.options.onUploadUrlAvailable(), e._saveUploadInUrlStorage().then(function() {
							if (i === a) {
								e._emitProgress(a, a), e._emitSuccess(n);
								return;
							}
							e._offset = i, e._performUpload();
						});
					}).catch(function(n) {
						e._emitHttpError(t, null, "tus: failed to resume upload", n);
					});
				}
			},
			{
				key: "_performUpload",
				value: function() {
					var e = this;
					if (!this._aborted) {
						var t;
						this.options.overridePatchMethod ? (t = this._openRequest("POST", this.url), t.setHeader("X-HTTP-Method-Override", "PATCH")) : t = this._openRequest("PATCH", this.url), t.setHeader("Upload-Offset", `${this._offset}`), this._addChunkToRequest(t).then(function(n) {
							if (!pC(n.getStatus(), 200)) {
								e._emitHttpError(t, n, "tus: unexpected response while uploading chunk");
								return;
							}
							e._handleUploadResponse(t, n);
						}).catch(function(n) {
							e._aborted || e._emitHttpError(t, null, `tus: failed to upload chunk at offset ${e._offset}`, n);
						});
					}
				}
			},
			{
				key: "_addChunkToRequest",
				value: function(e) {
					var t = this, n = this._offset, r = this._offset + this.options.chunkSize;
					return e.setProgressHandler(function(e) {
						t._emitProgress(n + e, t._size);
					}), this.options.protocol === CC ? e.setHeader("Content-Type", "application/offset+octet-stream") : this.options.protocol === TC && e.setHeader("Content-Type", "application/partial-upload"), (r === Infinity || r > this._size) && !this.options.uploadLengthDeferred && (r = this._size), this._source.slice(n, r).then(function(n) {
						var r = n.value, i = n.done, a = r != null && r.size ? r.size : 0;
						t.options.uploadLengthDeferred && i && (t._size = t._offset + a, e.setHeader("Upload-Length", `${t._size}`));
						var o = t._offset + a;
						return !t.options.uploadLengthDeferred && i && o !== t._size ? Promise.reject(/* @__PURE__ */ Error(`upload was configured with a size of ${t._size} bytes, but the source is done after ${o} bytes`)) : r === null ? t._sendRequest(e) : ((t.options.protocol === wC || t.options.protocol === TC) && e.setHeader("Upload-Complete", i ? "?1" : "?0"), t._emitProgress(t._offset, t._size), t._sendRequest(e, r));
					});
				}
			},
			{
				key: "_handleUploadResponse",
				value: function(e, t) {
					var n = Number.parseInt(t.getHeader("Upload-Offset"), 10);
					if (Number.isNaN(n)) {
						this._emitHttpError(e, t, "tus: invalid or missing offset value");
						return;
					}
					if (this._emitProgress(n, this._size), this._emitChunkComplete(n - this._offset, n, this._size), this._offset = n, n === this._size) {
						this._emitSuccess(t), this._source.close();
						return;
					}
					this._performUpload();
				}
			},
			{
				key: "_openRequest",
				value: function(e, t) {
					var n = mC(e, t, this.options);
					return this._req = n, n;
				}
			},
			{
				key: "_removeFromUrlStorage",
				value: function() {
					var e = this;
					this._urlStorageKey &&= (this._urlStorage.removeUpload(this._urlStorageKey).catch(function(t) {
						e._emitError(t);
					}), null);
				}
			},
			{
				key: "_saveUploadInUrlStorage",
				value: function() {
					var e = this;
					if (!this.options.storeFingerprintForResuming || !this._fingerprint || this._urlStorageKey !== null) return Promise.resolve();
					var t = {
						size: this._size,
						metadata: this.options.metadata,
						creationTime: (/* @__PURE__ */ new Date()).toString()
					};
					return this._parallelUploads ? t.parallelUploadUrls = this._parallelUploadUrls : t.uploadUrl = this.url, this._urlStorage.addUpload(this._fingerprint, t).then(function(t) {
						e._urlStorageKey = t;
					});
				}
			},
			{
				key: "_sendRequest",
				value: function(e) {
					return hC(e, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, this.options);
				}
			}
		], [{
			key: "terminate",
			value: function(t) {
				var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = mC("DELETE", t, n);
				return hC(r, null, n).then(function(e) {
					if (e.getStatus() !== 204) throw new Gx("tus: unexpected response while terminating upload", null, r, e);
				}).catch(function(i) {
					if (i instanceof Gx || (i = new Gx("tus: failed to terminate upload", i, r, null)), !vC(i, 0, n)) throw i;
					var a = n.retryDelays[0], o = n.retryDelays.slice(1), s = aC(aC({}, n), {}, { retryDelays: o });
					return new Promise(function(e) {
						return setTimeout(e, a);
					}).then(function() {
						return e.terminate(t, s);
					});
				});
			}
		}]);
	}(), DC.defaultOptions = EC;
})), kC, AC = o((() => {
	kC = function() {
		return typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
	};
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
function jC(e) {
	return new Promise(function(t, n) {
		var r = new XMLHttpRequest();
		r.responseType = "blob", r.onload = function() {
			var e = r.response;
			t(e);
		}, r.onerror = function(e) {
			n(e);
		}, r.open("GET", e), r.send();
	});
}
var MC = o((() => {})), NC, PC = o((() => {
	NC = function() {
		return typeof window < "u" && (window.PhoneGap !== void 0 || window.Cordova !== void 0 || window.cordova !== void 0);
	};
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
function FC(e) {
	return new Promise(function(t, n) {
		var r = new FileReader();
		r.onload = function() {
			t({ value: new Uint8Array(r.result) });
		}, r.onerror = function(e) {
			n(e);
		}, r.readAsArrayBuffer(e);
	});
}
var IC = o((() => {}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
function LC(e) {
	"@babel/helpers - typeof";
	return LC = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, LC(e);
}
function RC(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function zC(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, VC(r.key), r);
	}
}
function BC(e, t, n) {
	return t && zC(e.prototype, t), n && zC(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function VC(e) {
	var t = HC(e, "string");
	return LC(t) == "symbol" ? t : t + "";
}
function HC(e, t) {
	if (LC(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (LC(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var UC, WC = o((() => {
	PC(), IC(), UC = /*#__PURE__*/ function() {
		function e(t) {
			RC(this, e), this._file = t, this.size = t.size;
		}
		return BC(e, [{
			key: "slice",
			value: function(e, t) {
				if (NC()) return FC(this._file.slice(e, t));
				var n = this._file.slice(e, t), r = t >= this.size;
				return Promise.resolve({
					value: n,
					done: r
				});
			}
		}, {
			key: "close",
			value: function() {}
		}]);
	}();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
function GC(e) {
	"@babel/helpers - typeof";
	return GC = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, GC(e);
}
function KC(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function qC(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, YC(r.key), r);
	}
}
function JC(e, t, n) {
	return t && qC(e.prototype, t), n && qC(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function YC(e) {
	var t = XC(e, "string");
	return GC(t) == "symbol" ? t : t + "";
}
function XC(e, t) {
	if (GC(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (GC(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ZC(e) {
	return e === void 0 ? 0 : e.size === void 0 ? e.length : e.size;
}
function QC(e, t) {
	if (e.concat) return e.concat(t);
	if (e instanceof Blob) return new Blob([e, t], { type: e.type });
	if (e.set) {
		var n = new e.constructor(e.length + t.length);
		return n.set(e), n.set(t, e.length), n;
	}
	throw Error("Unknown data type");
}
var $C, ew = o((() => {
	$C = /*#__PURE__*/ function() {
		function e(t) {
			KC(this, e), this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1;
		}
		return JC(e, [
			{
				key: "slice",
				value: function(e, t) {
					return e < this._bufferOffset ? Promise.reject(/* @__PURE__ */ Error("Requested data is before the reader's current offset")) : this._readUntilEnoughDataOrDone(e, t);
				}
			},
			{
				key: "_readUntilEnoughDataOrDone",
				value: function(e, t) {
					var n = this, r = t <= this._bufferOffset + ZC(this._buffer);
					if (this._done || r) {
						var i = this._getDataFromBuffer(e, t), a = i == null && this._done;
						return Promise.resolve({
							value: i,
							done: a
						});
					}
					return this._reader.read().then(function(r) {
						var i = r.value;
						return r.done ? n._done = !0 : n._buffer = n._buffer === void 0 ? i : QC(n._buffer, i), n._readUntilEnoughDataOrDone(e, t);
					});
				}
			},
			{
				key: "_getDataFromBuffer",
				value: function(e, t) {
					e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
					var n = ZC(this._buffer) === 0;
					return this._done && n ? null : this._buffer.slice(0, t - e);
				}
			},
			{
				key: "close",
				value: function() {
					this._reader.cancel && this._reader.cancel();
				}
			}
		]);
	}();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/fileReader.js
function tw(e) {
	"@babel/helpers - typeof";
	return tw = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, tw(e);
}
function nw() {
	nw = function() {
		return t;
	};
	var e, t = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(e, t, n) {
		e[t] = n.value;
	}, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
	function l(e, t, n) {
		return Object.defineProperty(e, t, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}), e[t];
	}
	try {
		l({}, "");
	} catch {
		l = function(e, t, n) {
			return e[t] = n;
		};
	}
	function u(e, t, n, r) {
		var a = t && t.prototype instanceof _ ? t : _, o = Object.create(a.prototype);
		return i(o, "_invoke", { value: E(e, n, new A(r || [])) }), o;
	}
	function d(e, t, n) {
		try {
			return {
				type: "normal",
				arg: e.call(t, n)
			};
		} catch (e) {
			return {
				type: "throw",
				arg: e
			};
		}
	}
	t.wrap = u;
	var f = "suspendedStart", p = "suspendedYield", m = "executing", h = "completed", g = {};
	function _() {}
	function v() {}
	function y() {}
	var b = {};
	l(b, o, function() {
		return this;
	});
	var x = Object.getPrototypeOf, S = x && x(x(j([])));
	S && S !== n && r.call(S, o) && (b = S);
	var C = y.prototype = _.prototype = Object.create(b);
	function w(e) {
		[
			"next",
			"throw",
			"return"
		].forEach(function(t) {
			l(e, t, function(e) {
				return this._invoke(t, e);
			});
		});
	}
	function T(e, t) {
		function n(i, a, o, s) {
			var c = d(e[i], e, a);
			if (c.type !== "throw") {
				var l = c.arg, u = l.value;
				return u && tw(u) == "object" && r.call(u, "__await") ? t.resolve(u.__await).then(function(e) {
					n("next", e, o, s);
				}, function(e) {
					n("throw", e, o, s);
				}) : t.resolve(u).then(function(e) {
					l.value = e, o(l);
				}, function(e) {
					return n("throw", e, o, s);
				});
			}
			s(c.arg);
		}
		var a;
		i(this, "_invoke", { value: function(e, r) {
			function i() {
				return new t(function(t, i) {
					n(e, r, t, i);
				});
			}
			return a = a ? a.then(i, i) : i();
		} });
	}
	function E(t, n, r) {
		var i = f;
		return function(a, o) {
			if (i === m) throw Error("Generator is already running");
			if (i === h) {
				if (a === "throw") throw o;
				return {
					value: e,
					done: !0
				};
			}
			for (r.method = a, r.arg = o;;) {
				var s = r.delegate;
				if (s) {
					var c = D(s, r);
					if (c) {
						if (c === g) continue;
						return c;
					}
				}
				if (r.method === "next") r.sent = r._sent = r.arg;
				else if (r.method === "throw") {
					if (i === f) throw i = h, r.arg;
					r.dispatchException(r.arg);
				} else r.method === "return" && r.abrupt("return", r.arg);
				i = m;
				var l = d(t, n, r);
				if (l.type === "normal") {
					if (i = r.done ? h : p, l.arg === g) continue;
					return {
						value: l.arg,
						done: r.done
					};
				}
				l.type === "throw" && (i = h, r.method = "throw", r.arg = l.arg);
			}
		};
	}
	function D(t, n) {
		var r = n.method, i = t.iterator[r];
		if (i === e) return n.delegate = null, r === "throw" && t.iterator.return && (n.method = "return", n.arg = e, D(t, n), n.method === "throw") || r !== "return" && (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("The iterator does not provide a '" + r + "' method")), g;
		var a = d(i, t.iterator, n.arg);
		if (a.type === "throw") return n.method = "throw", n.arg = a.arg, n.delegate = null, g;
		var o = a.arg;
		return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, n.method !== "return" && (n.method = "next", n.arg = e), n.delegate = null, g) : o : (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("iterator result is not an object"), n.delegate = null, g);
	}
	function O(e) {
		var t = { tryLoc: e[0] };
		1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
	}
	function k(e) {
		var t = e.completion || {};
		t.type = "normal", delete t.arg, e.completion = t;
	}
	function A(e) {
		this.tryEntries = [{ tryLoc: "root" }], e.forEach(O, this), this.reset(!0);
	}
	function j(t) {
		if (t || t === "") {
			var n = t[o];
			if (n) return n.call(t);
			if (typeof t.next == "function") return t;
			if (!isNaN(t.length)) {
				var i = -1, a = function n() {
					for (; ++i < t.length;) if (r.call(t, i)) return n.value = t[i], n.done = !1, n;
					return n.value = e, n.done = !0, n;
				};
				return a.next = a;
			}
		}
		throw TypeError(tw(t) + " is not iterable");
	}
	return v.prototype = y, i(C, "constructor", {
		value: y,
		configurable: !0
	}), i(y, "constructor", {
		value: v,
		configurable: !0
	}), v.displayName = l(y, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
		var t = typeof e == "function" && e.constructor;
		return !!t && (t === v || (t.displayName || t.name) === "GeneratorFunction");
	}, t.mark = function(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, l(e, c, "GeneratorFunction")), e.prototype = Object.create(C), e;
	}, t.awrap = function(e) {
		return { __await: e };
	}, w(T.prototype), l(T.prototype, s, function() {
		return this;
	}), t.AsyncIterator = T, t.async = function(e, n, r, i, a) {
		a === void 0 && (a = Promise);
		var o = new T(u(e, n, r, i), a);
		return t.isGeneratorFunction(n) ? o : o.next().then(function(e) {
			return e.done ? e.value : o.next();
		});
	}, w(C), l(C, c, "Generator"), l(C, o, function() {
		return this;
	}), l(C, "toString", function() {
		return "[object Generator]";
	}), t.keys = function(e) {
		var t = Object(e), n = [];
		for (var r in t) n.push(r);
		return n.reverse(), function e() {
			for (; n.length;) {
				var r = n.pop();
				if (r in t) return e.value = r, e.done = !1, e;
			}
			return e.done = !0, e;
		};
	}, t.values = j, A.prototype = {
		constructor: A,
		reset: function(t) {
			if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(k), !t) for (var n in this) n.charAt(0) === "t" && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
		},
		stop: function() {
			this.done = !0;
			var e = this.tryEntries[0].completion;
			if (e.type === "throw") throw e.arg;
			return this.rval;
		},
		dispatchException: function(t) {
			if (this.done) throw t;
			var n = this;
			function i(r, i) {
				return s.type = "throw", s.arg = t, n.next = r, i && (n.method = "next", n.arg = e), !!i;
			}
			for (var a = this.tryEntries.length - 1; a >= 0; --a) {
				var o = this.tryEntries[a], s = o.completion;
				if (o.tryLoc === "root") return i("end");
				if (o.tryLoc <= this.prev) {
					var c = r.call(o, "catchLoc"), l = r.call(o, "finallyLoc");
					if (c && l) {
						if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
						if (this.prev < o.finallyLoc) return i(o.finallyLoc);
					} else if (c) {
						if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
					} else {
						if (!l) throw Error("try statement without catch or finally");
						if (this.prev < o.finallyLoc) return i(o.finallyLoc);
					}
				}
			}
		},
		abrupt: function(e, t) {
			for (var n = this.tryEntries.length - 1; n >= 0; --n) {
				var i = this.tryEntries[n];
				if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
					var a = i;
					break;
				}
			}
			a && (e === "break" || e === "continue") && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
			var o = a ? a.completion : {};
			return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, g) : this.complete(o);
		},
		complete: function(e, t) {
			if (e.type === "throw") throw e.arg;
			return e.type === "break" || e.type === "continue" ? this.next = e.arg : e.type === "return" ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : e.type === "normal" && t && (this.next = t), g;
		},
		finish: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), g;
			}
		},
		catch: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.tryLoc === e) {
					var r = n.completion;
					if (r.type === "throw") {
						var i = r.arg;
						k(n);
					}
					return i;
				}
			}
			throw Error("illegal catch attempt");
		},
		delegateYield: function(t, n, r) {
			return this.delegate = {
				iterator: j(t),
				resultName: n,
				nextLoc: r
			}, this.method === "next" && (this.arg = e), g;
		}
	}, t;
}
function rw(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function iw(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, i) {
			var a = e.apply(t, n);
			function o(e) {
				rw(a, r, i, o, s, "next", e);
			}
			function s(e) {
				rw(a, r, i, o, s, "throw", e);
			}
			o(void 0);
		});
	};
}
function aw(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ow(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, cw(r.key), r);
	}
}
function sw(e, t, n) {
	return t && ow(e.prototype, t), n && ow(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function cw(e) {
	var t = lw(e, "string");
	return tw(t) == "symbol" ? t : t + "";
}
function lw(e, t) {
	if (tw(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (tw(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var uw, dw = o((() => {
	AC(), MC(), WC(), ew(), uw = /*#__PURE__*/ function() {
		function e() {
			aw(this, e);
		}
		return sw(e, [{
			key: "openFile",
			value: function() {
				var e = iw(/*#__PURE__*/ nw().mark(function e(t, n) {
					var r;
					return nw().wrap(function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								if (!(kC() && t && t.uri !== void 0)) {
									e.next = 11;
									break;
								}
								return e.prev = 1, e.next = 4, jC(t.uri);
							case 4: return r = e.sent, e.abrupt("return", new UC(r));
							case 8: throw e.prev = 8, e.t0 = e.catch(1), Error(`tus: cannot fetch \`file.uri\` as Blob, make sure the uri is correct and accessible. ${e.t0}`);
							case 11:
								if (typeof t.slice != "function" || t.size === void 0) {
									e.next = 13;
									break;
								}
								return e.abrupt("return", Promise.resolve(new UC(t)));
							case 13:
								if (typeof t.read != "function") {
									e.next = 18;
									break;
								}
								if (n = Number(n), Number.isFinite(n)) {
									e.next = 17;
									break;
								}
								return e.abrupt("return", Promise.reject(/* @__PURE__ */ Error("cannot create source for stream without a finite value for the `chunkSize` option")));
							case 17: return e.abrupt("return", Promise.resolve(new $C(t, n)));
							case 18: return e.abrupt("return", Promise.reject(/* @__PURE__ */ Error("source object may only be an instance of File, Blob, or Reader in this environment")));
							case 19:
							case "end": return e.stop();
						}
					}, e, null, [[1, 8]]);
				}));
				function t(t, n) {
					return e.apply(this, arguments);
				}
				return t;
			}()
		}]);
	}();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/fileSignature.js
function fw(e, t) {
	return kC() ? Promise.resolve(pw(e, t)) : Promise.resolve([
		"tus-br",
		e.name,
		e.type,
		e.size,
		e.lastModified,
		t.endpoint
	].join("-"));
}
function pw(e, t) {
	var n = e.exif ? mw(JSON.stringify(e.exif)) : "noexif";
	return [
		"tus-rn",
		e.name || "noname",
		e.size || "nosize",
		n,
		t.endpoint
	].join("/");
}
function mw(e) {
	var t = 0;
	if (e.length === 0) return t;
	for (var n = 0; n < e.length; n++) {
		var r = e.charCodeAt(n);
		t = (t << 5) - t + r, t &= t;
	}
	return t;
}
var hw = o((() => {
	AC();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/httpStack.js
function gw(e) {
	"@babel/helpers - typeof";
	return gw = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, gw(e);
}
function _w(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function vw(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, bw(r.key), r);
	}
}
function yw(e, t, n) {
	return t && vw(e.prototype, t), n && vw(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function bw(e) {
	var t = xw(e, "string");
	return gw(t) == "symbol" ? t : t + "";
}
function xw(e, t) {
	if (gw(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (gw(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Sw, Cw, ww, Tw = o((() => {
	Sw = /*#__PURE__*/ function() {
		function e() {
			_w(this, e);
		}
		return yw(e, [{
			key: "createRequest",
			value: function(e, t) {
				return new Cw(e, t);
			}
		}, {
			key: "getName",
			value: function() {
				return "XHRHttpStack";
			}
		}]);
	}(), Cw = /*#__PURE__*/ function() {
		function e(t, n) {
			_w(this, e), this._xhr = new XMLHttpRequest(), this._xhr.open(t, n, !0), this._method = t, this._url = n, this._headers = {};
		}
		return yw(e, [
			{
				key: "getMethod",
				value: function() {
					return this._method;
				}
			},
			{
				key: "getURL",
				value: function() {
					return this._url;
				}
			},
			{
				key: "setHeader",
				value: function(e, t) {
					this._xhr.setRequestHeader(e, t), this._headers[e] = t;
				}
			},
			{
				key: "getHeader",
				value: function(e) {
					return this._headers[e];
				}
			},
			{
				key: "setProgressHandler",
				value: function(e) {
					"upload" in this._xhr && (this._xhr.upload.onprogress = function(t) {
						t.lengthComputable && e(t.loaded);
					});
				}
			},
			{
				key: "send",
				value: function() {
					var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
					return new Promise(function(n, r) {
						e._xhr.onload = function() {
							n(new ww(e._xhr));
						}, e._xhr.onerror = function(e) {
							r(e);
						}, e._xhr.send(t);
					});
				}
			},
			{
				key: "abort",
				value: function() {
					return this._xhr.abort(), Promise.resolve();
				}
			},
			{
				key: "getUnderlyingObject",
				value: function() {
					return this._xhr;
				}
			}
		]);
	}(), ww = /*#__PURE__*/ function() {
		function e(t) {
			_w(this, e), this._xhr = t;
		}
		return yw(e, [
			{
				key: "getStatus",
				value: function() {
					return this._xhr.status;
				}
			},
			{
				key: "getHeader",
				value: function(e) {
					return this._xhr.getResponseHeader(e);
				}
			},
			{
				key: "getBody",
				value: function() {
					return this._xhr.responseText;
				}
			},
			{
				key: "getUnderlyingObject",
				value: function() {
					return this._xhr;
				}
			}
		]);
	}();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/urlStorage.js
function Ew(e) {
	"@babel/helpers - typeof";
	return Ew = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Ew(e);
}
function Dw(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Ow(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Aw(r.key), r);
	}
}
function kw(e, t, n) {
	return t && Ow(e.prototype, t), n && Ow(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Aw(e) {
	var t = jw(e, "string");
	return Ew(t) == "symbol" ? t : t + "";
}
function jw(e, t) {
	if (Ew(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Ew(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Mw, Nw, Pw, Fw, Iw, Lw = o((() => {
	Mw = !1;
	try {
		Mw = "localStorage" in window, Nw = "tusSupport", Pw = localStorage.getItem(Nw), localStorage.setItem(Nw, Pw), Pw === null && localStorage.removeItem(Nw);
	} catch (e) {
		if (e.code === e.SECURITY_ERR || e.code === e.QUOTA_EXCEEDED_ERR) Mw = !1;
		else throw e;
	}
	Fw = Mw, Iw = /*#__PURE__*/ function() {
		function e() {
			Dw(this, e);
		}
		return kw(e, [
			{
				key: "findAllUploads",
				value: function() {
					var e = this._findEntries("tus::");
					return Promise.resolve(e);
				}
			},
			{
				key: "findUploadsByFingerprint",
				value: function(e) {
					var t = this._findEntries(`tus::${e}::`);
					return Promise.resolve(t);
				}
			},
			{
				key: "removeUpload",
				value: function(e) {
					return localStorage.removeItem(e), Promise.resolve();
				}
			},
			{
				key: "addUpload",
				value: function(e, t) {
					var n = `tus::${e}::${Math.round(Math.random() * 0xe8d4a51000)}`;
					return localStorage.setItem(n, JSON.stringify(t)), Promise.resolve(n);
				}
			},
			{
				key: "_findEntries",
				value: function(e) {
					for (var t = [], n = 0; n < localStorage.length; n++) {
						var r = localStorage.key(n);
						if (r.indexOf(e) === 0) try {
							var i = JSON.parse(localStorage.getItem(r));
							i.urlStorageKey = r, t.push(i);
						} catch {}
					}
					return t;
				}
			}
		]);
	}();
}));
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/index.js
function Rw(e) {
	"@babel/helpers - typeof";
	return Rw = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Rw(e);
}
function zw(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Bw(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Qw(r.key), r);
	}
}
function Vw(e, t, n) {
	return t && Bw(e.prototype, t), n && Bw(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Hw(e, t, n) {
	return t = Kw(t), Uw(e, Gw() ? Reflect.construct(t, n || [], Kw(e).constructor) : t.apply(e, n));
}
function Uw(e, t) {
	if (t && (Rw(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return Ww(e);
}
function Ww(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function Gw() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (Gw = function() {
		return !!e;
	})();
}
function Kw(e) {
	return Kw = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, Kw(e);
}
function qw(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && Jw(e, t);
}
function Jw(e, t) {
	return Jw = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Jw(e, t);
}
function Yw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Xw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yw(Object(n), !0).forEach(function(t) {
			Zw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Zw(e, t, n) {
	return t = Qw(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Qw(e) {
	var t = $w(e, "string");
	return Rw(t) == "symbol" ? t : t + "";
}
function $w(e, t) {
	if (Rw(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Rw(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var eT, tT, nT = o((() => {
	rS(), OC(), dw(), hw(), Tw(), Lw(), eT = Xw(Xw({}, DC.defaultOptions), {}, {
		httpStack: new Sw(),
		fileReader: new uw(),
		urlStorage: Fw ? new Iw() : new nS(),
		fingerprint: fw
	}), tT = /*#__PURE__*/ function(e) {
		function t() {
			var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			return zw(this, t), n = Xw(Xw({}, eT), n), Hw(this, t, [e, n]);
		}
		return qw(t, e), Vw(t, null, [{
			key: "terminate",
			value: function(e) {
				var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				return t = Xw(Xw({}, eT), t), DC.terminate(e, t);
			}
		}]);
	}(DC), typeof XMLHttpRequest == "function" && typeof Blob == "function" && Blob.prototype.slice;
})), rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, vT = o((() => {
	rT = "@uppy/tus", iT = "Resumable uploads for Uppy using Tus.io", aT = "6.0.0", oT = "module", sT = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}, cT = [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"upload",
		"resumable",
		"tus"
	], lT = "https://uppy.io", uT = { url: "https://github.com/transloadit/uppy/issues" }, dT = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, fT = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], pT = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, mT = { "tus-js-client": "^4.3.1" }, hT = {
		"@uppy/core": "^6.0.0",
		"@vitest/browser-playwright": "^4.1.6",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.6"
	}, gT = { "@uppy/core": "^6.0.0" }, _T = {
		name: rT,
		description: iT,
		version: aT,
		license: "MIT",
		type: oT,
		sideEffects: !1,
		scripts: sT,
		keywords: cT,
		homepage: lT,
		bugs: uT,
		repository: dT,
		files: fT,
		exports: pT,
		dependencies: mT,
		devDependencies: hT,
		peerDependencies: gT
	};
}));
//#endregion
//#region node_modules/@uppy/tus/lib/getFingerprint.js
function yT() {
	return typeof window < "u" && (window.PhoneGap !== void 0 || window.Cordova !== void 0 || window.cordova !== void 0);
}
function bT() {
	return typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
}
function xT(e) {
	return (t, n) => {
		if (yT() || bT()) return eT.fingerprint(t, n);
		let r = [
			"tus",
			e.id,
			n.endpoint
		].join("-");
		return Promise.resolve(r);
	};
}
var ST = o((() => {
	nT();
})), CT, wT, TT, ET = o((() => {
	Z(), X(), nT(), vT(), ST(), CT = {
		endpoint: "",
		uploadUrl: null,
		metadata: {},
		uploadSize: null,
		onProgress: null,
		onChunkComplete: null,
		onSuccess: null,
		onError: null,
		overridePatchMethod: !1,
		headers: {},
		addRequestId: !1,
		chunkSize: Infinity,
		retryDelays: [
			100,
			1e3,
			3e3,
			5e3
		],
		parallelUploads: 1,
		removeFingerprintOnSuccess: !1,
		uploadLengthDeferred: !1,
		uploadDataDuringCreation: !1
	}, wT = {
		limit: 20,
		retryDelays: CT.retryDelays,
		withCredentials: !1,
		allowedMetaFields: !0
	}, TT = class extends Wn {
		static VERSION = _T.version;
		#e;
		requests;
		uploaders;
		uploaderEvents;
		constructor(e, t) {
			if (super(e, {
				...wT,
				...t
			}), this.type = "uploader", this.id = this.opts.id || "Tus", t?.allowedMetaFields === void 0 && "metaFields" in this.opts) throw Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
			if ("autoRetry" in t) throw Error("The `autoRetry` option was deprecated and has been removed.");
			this.requests = this.opts.rateLimitedQueue ?? new at(this.opts.limit), this.#e = this.opts.retryDelays?.values(), this.uploaders = Object.create(null), this.uploaderEvents = Object.create(null);
		}
		#t(e, t) {
			this.uploaders[e]?.abort(t);
		}
		#n(e) {
			this.uploaders[e] && (this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null);
		}
		async #r(e) {
			this.#t(e.id), this.#n(e.id);
			let t;
			return new Promise((n, r) => {
				let i, a, o, s = {
					...this.opts,
					...e.tus || {}
				};
				typeof s.headers == "function" && (s.headers = s.headers(e));
				let { onShouldRetry: c, onBeforeRequest: l, ...u } = s, d = {
					...CT,
					...u
				};
				d.fingerprint = xT(e), d.onBeforeRequest = async (t) => {
					let n = t.getUnderlyingObject();
					n && (n.withCredentials = !!s.withCredentials);
					let r;
					if (typeof l == "function" && (r = l(t, e)), B(i, "shouldBeRequeued")) {
						if (!i.shouldBeRequeued) return Promise.reject();
						let t, n = new Promise((e) => {
							t = e;
						});
						i = this.requests.run(() => (e.isPaused && i.abort(), t(), () => {})), await Promise.all([n, r]);
						return;
					}
					return r;
				}, d.onError = (n) => {
					this.uppy.log(n);
					let a = n.originalResponse;
					a != null && (t = {
						status: a.getStatus(),
						body: { xhr: a.getUnderlyingObject() }
					});
					let o = n.originalRequest == null ? null : n.originalRequest.getUnderlyingObject();
					V(o) && (n = new T(n, o)), this.#n(e.id), i?.abort(), typeof s.onError == "function" && s.onError(n), r(n);
				}, d.onProgress = (t, n) => {
					this.onReceiveUploadUrl(e, o.url), typeof s.onProgress == "function" && s.onProgress(t, n);
					let r = this.uppy.getFile(e.id);
					this.uppy.emit("upload-progress", r, {
						uploadStarted: r.progress.uploadStarted ?? 0,
						bytesUploaded: t,
						bytesTotal: n
					});
				}, d.onSuccess = (t) => {
					let r = {
						uploadURL: o.url ?? void 0,
						status: 200,
						body: { xhr: t.lastResponse.getUnderlyingObject() }
					};
					this.uppy.emit("upload-success", this.uppy.getFile(e.id), r), this.#t(e.id), this.#n(e.id), i.done(), o.url && this.uppy.log(`Download ${o.url}`), typeof s.onSuccess == "function" && s.onSuccess(t), n(o);
				};
				let f = (e) => {
					let t = e?.originalResponse?.getStatus();
					if (t === 429) {
						if (!this.requests.isPaused) {
							let e = this.#e?.next();
							if (e == null || e.done) return !1;
							this.requests.rateLimit(e.value);
						}
					} else if (t != null && t >= 400 && t < 500 && t !== 409 && t !== 423) return !1;
					else typeof navigator < "u" && navigator.onLine === !1 && (this.requests.isPaused || (this.requests.pause(), window.addEventListener("online", () => {
						this.requests.resume();
					}, { once: !0 })));
					return i.abort(), i = {
						shouldBeRequeued: !0,
						abort() {
							this.shouldBeRequeued = !1;
						},
						done() {
							throw Error("Cannot mark a queued request as done: this indicates a bug");
						},
						fn() {
							throw Error("Cannot run a queued request: this indicates a bug");
						}
					}, !0;
				};
				d.onShouldRetry = c == null ? f : (e, t) => c(e, t, s, f);
				let p = (e, t, n) => {
					B(e, t) && !B(e, n) && (e[n] = e[t]);
				}, m = {};
				if (ve(s.allowedMetaFields, e.meta).forEach((t) => {
					m[t] = String(e.meta[t]);
				}), p(m, "type", "filetype"), p(m, "name", "filename"), d.metadata = m, e.data == null) throw Error("File data is empty");
				o = new tT(e.data, d), this.uploaders[e.id] = o;
				let h = new Kn(this.uppy);
				this.uploaderEvents[e.id] = h, a = () => (e.isPaused || o.start(), () => {}), o.findPreviousUploads().then((t) => {
					let n = t[0];
					n && (this.uppy.log(`[Tus] Resuming upload of ${e.id} started at ${n.creationTime}`), o.resumeFromPreviousUpload(n)), i = this.requests.run(a);
				}), h.onFileRemove(e.id, (t) => {
					i.abort(), this.#t(e.id, !!o.url), this.#n(e.id), n(`upload ${t} was removed`);
				}), h.onPause(e.id, (e) => {
					i.abort(), e ? o.abort() : i = this.requests.run(a);
				}), h.onPauseAll(e.id, () => {
					i.abort(), o.abort();
				}), h.onCancelAll(e.id, () => {
					i.abort(), this.#t(e.id, !!o.url), this.#n(e.id), n(`upload ${e.id} was canceled`);
				}), h.onResumeAll(e.id, () => {
					i.abort(), e.error && o.abort(), i = this.requests.run(a);
				});
			}).catch((n) => {
				throw this.uppy.emit("upload-error", e, n, t), n;
			});
		}
		onReceiveUploadUrl(e, t) {
			let n = this.uppy.getFile(e.id);
			n && (!n.tus || n.tus.uploadUrl !== t) && (this.uppy.log("[Tus] Storing upload url"), this.uppy.setFileState(n.id, { tus: {
				...n.tus,
				uploadUrl: t
			} }));
		}
		#i(e) {
			let t = { ...this.opts };
			return e.tus && Object.assign(t, e.tus), typeof t.headers == "function" && (t.headers = t.headers(e)), {
				..."remote" in e && e.remote.body,
				endpoint: t.endpoint,
				uploadUrl: t.uploadUrl,
				protocol: "tus",
				size: e.data.size,
				headers: t.headers,
				metadata: e.meta
			};
		}
		async #a(e) {
			let t = M(e), n = N(t);
			this.uppy.emit("upload-start", n), await Promise.allSettled(t.map((e) => {
				if (e.isRemote) {
					let t = () => this.requests, n = new AbortController(), r = (t) => {
						t.id === e.id && n.abort();
					};
					this.uppy.on("file-removed", r);
					let i = this.uppy.getRequestClientForFile(e).uploadRemoteFile(e, this.#i(e), {
						signal: n.signal,
						getQueue: t
					});
					return this.requests.wrapSyncFunction(() => {
						this.uppy.off("file-removed", r);
					}, { priority: -1 })(), i;
				}
				return this.#r(e);
			}));
		}
		#o = async (e) => {
			if (e.length === 0) {
				this.uppy.log("[Tus] No files to upload");
				return;
			}
			this.opts.limit === 0 && this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning"), this.uppy.log("[Tus] Uploading...");
			let t = this.uppy.getFilesByIds(e);
			await this.#a(t);
		};
		install() {
			this.uppy.setState({ capabilities: {
				...this.uppy.getState().capabilities,
				resumableUploads: !0
			} }), this.uppy.addUploader(this.#o);
		}
		uninstall() {
			this.uppy.setState({ capabilities: {
				...this.uppy.getState().capabilities,
				resumableUploads: !1
			} }), this.uppy.removeUploader(this.#o);
		}
	};
})), DT, OT, kT, AT, jT, MT, NT, PT, FT, IT, LT, RT, zT, BT, VT, HT = o((() => {
	DT = "@uppy/transloadit", OT = "The Transloadit plugin can be used to upload files to Transloadit for all kinds of processing, such as transcoding video, resizing images, zipping/unzipping, and more", kT = "6.0.1", AT = "module", jT = {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}, MT = [
		"file uploader",
		"transloadit",
		"file encoding",
		"encoding",
		"file processing",
		"video encoding",
		"crop",
		"resize",
		"watermark",
		"uppy",
		"uppy-plugin"
	], NT = "https://uppy.io", PT = { url: "https://github.com/transloadit/uppy/issues" }, FT = {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	}, IT = [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	], LT = {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	}, RT = {
		"@transloadit/types": "^4.4.0",
		"@uppy/tus": "^6.0.0",
		"component-emitter": "^2.0.0"
	}, zT = { "@uppy/core": "^6.2.0" }, BT = {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@uppy/core": "^6.2.0",
		"@vitest/browser-playwright": "^4.1.11",
		msw: "^2.15.0",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	}, VT = {
		name: DT,
		description: OT,
		version: kT,
		license: "MIT",
		type: AT,
		sideEffects: !1,
		scripts: jT,
		keywords: MT,
		homepage: NT,
		bugs: PT,
		repository: FT,
		files: IT,
		exports: LT,
		dependencies: RT,
		peerDependencies: zT,
		devDependencies: BT
	};
})), UT = /* @__PURE__ */ s(((e, t) => {
	function n(e) {
		if (e) return r(e);
		this._callbacks = /* @__PURE__ */ new Map();
	}
	function r(e) {
		return Object.assign(e, n.prototype), e._callbacks = /* @__PURE__ */ new Map(), e;
	}
	n.prototype.on = function(e, t) {
		let n = this._callbacks.get(e) ?? [];
		return n.push(t), this._callbacks.set(e, n), this;
	}, n.prototype.once = function(e, t) {
		let n = (...r) => {
			this.off(e, n), t.apply(this, r);
		};
		return n.fn = t, this.on(e, n), this;
	}, n.prototype.off = function(e, t) {
		if (e === void 0 && t === void 0) return this._callbacks.clear(), this;
		if (t === void 0) return this._callbacks.delete(e), this;
		let n = this._callbacks.get(e);
		if (n) {
			for (let [e, r] of n.entries()) if (r === t || r.fn === t) {
				n.splice(e, 1);
				break;
			}
			n.length === 0 ? this._callbacks.delete(e) : this._callbacks.set(e, n);
		}
		return this;
	}, n.prototype.emit = function(e, ...t) {
		let n = this._callbacks.get(e);
		if (n) {
			let e = [...n];
			for (let n of e) n.apply(this, t);
		}
		return this;
	}, n.prototype.listeners = function(e) {
		return this._callbacks.get(e) ?? [];
	}, n.prototype.listenerCount = function(e) {
		if (e) return this.listeners(e).length;
		let t = 0;
		for (let e of this._callbacks.values()) t += e.length;
		return t;
	}, n.prototype.hasListeners = function(e) {
		return this.listenerCount(e) > 0;
	}, n.prototype.addEventListener = n.prototype.on, n.prototype.removeListener = n.prototype.off, n.prototype.removeEventListener = n.prototype.off, n.prototype.removeAllListeners = n.prototype.off, t !== void 0 && (t.exports = n);
}));
//#endregion
//#region node_modules/@uppy/transloadit/lib/Assembly.js
function WT(e, t) {
	return typeof e == "string" && YT.indexOf(e) >= YT.indexOf(t);
}
var GT, KT, qT, JT, YT, XT, ZT = o((() => {
	X(), GT = /* @__PURE__ */ u(UT(), 1), _E(), KT = "ASSEMBLY_UPLOADING", qT = "ASSEMBLY_EXECUTING", JT = "ASSEMBLY_COMPLETED", YT = [
		KT,
		qT,
		JT
	], XT = class extends GT.default {
		#e;
		#t;
		#n = !1;
		#r = null;
		#i;
		pollInterval;
		closed;
		constructor(e, t) {
			super(), this.#i = e, this.pollInterval = null, this.closed = !1, this.#e = t, this.#t = t.wrapPromiseFunction(A);
		}
		connect() {
			this.#o(), this.#c();
		}
		#a() {
			this.emit("finished"), this.close();
		}
		get status() {
			return this.#i;
		}
		set status(e) {
			this.#i = e, this.emit("status", e);
		}
		#o() {
			this.#r = new EventSource(`${this.status.websocket_url}?assembly=${this.status.assembly_id}`), this.#r.addEventListener("open", () => {
				clearInterval(this.pollInterval), this.pollInterval = null;
			}), this.#r.addEventListener("message", (e) => {
				e.data === "assembly_finished" && this.#a(), e.data === "assembly_uploading_finished" && this.emit("executing"), e.data === "assembly_upload_meta_data_extracted" && (this.emit("metadata"), this.#l({ diff: !1 }));
			}), this.#r.addEventListener("assembly_upload_finished", (e) => {
				let t = JSON.parse(e.data);
				this.status = {
					...this.status,
					uploads: [...this.status.uploads ?? [], t]
				}, this.emit("upload", t);
			}), this.#r.addEventListener("assembly_result_finished", (e) => {
				let [t, n] = JSON.parse(e.data);
				this.status = {
					...this.status,
					results: {
						...this.status.results,
						[t]: [...this.status.results?.[t] ?? [], n]
					}
				}, this.emit("result", t, n);
			}), this.#r.addEventListener("assembly_execution_progress", (e) => {
				let t = JSON.parse(e.data);
				typeof t.progress_combined == "number" && (this.status = {
					...this.status,
					progress_combined: t.progress_combined
				}), this.emit("execution-progress", t);
			}), this.#r.addEventListener("assembly_error", (e) => {
				try {
					this.#s(JSON.parse(e.data));
				} catch {
					this.#s(Error(e.data));
				}
				this.#l({ diff: !1 });
			});
		}
		#s(e) {
			this.emit("error", Object.assign(Error(e.message), e)), this.close();
		}
		#c() {
			this.pollInterval = setInterval(() => {
				this.#l();
			}, 2e3);
		}
		async #l({ diff: e = !0 } = {}) {
			if (!(this.closed || this.#e.isPaused || this.#n)) try {
				this.#n = !0;
				let t = dE(this.status), n = await this.#t(t);
				if (this.#n = !1, this.closed) return;
				if (n.status === 429) {
					this.#e.rateLimit(2e3);
					return;
				}
				if (!n.ok) {
					this.#s(new T(n.statusText));
					return;
				}
				let r = await n.json();
				if (this.closed) return;
				e ? this.updateStatus(r) : this.status = r;
			} catch (e) {
				this.#s(O(e));
			}
		}
		update() {
			return this.#l({ diff: !0 });
		}
		updateStatus(e) {
			this.#u(this.status, e), this.status = e;
		}
		#u(e, t) {
			let n = e.ok, r = t.ok;
			if (t.error && !e.error) return this.#s(t);
			let i = WT(r, qT) && !WT(n, qT);
			i && this.emit("executing");
			let a = e.uploads, o = t.uploads;
			o != null && a != null && Object.keys(o).filter((e) => !Object.hasOwn(a, e)).forEach((e) => {
				this.emit("upload", o[e]);
			}), i && this.emit("metadata");
			let s = t.results, c = e.results;
			s != null && c != null && Object.keys(s).forEach((e) => {
				let t = s[e] ?? [], n = c[e] ?? [];
				t.filter((e) => !n?.some((t) => t.id === e.id)).forEach((t) => {
					this.emit("result", e, t);
				});
			}), WT(r, JT) && !WT(n, JT) && this.emit("finished");
		}
		close() {
			this.closed = !0, this.#r &&= (this.#r.close(), null), clearInterval(this.pollInterval), this.pollInterval = null;
		}
	};
})), QT, $T, eE = o((() => {
	QT = /* @__PURE__ */ u(UT(), 1), $T = class extends QT.default {
		#e;
		#t;
		promise;
		#n;
		#r;
		constructor(e, t) {
			super(), this.#r = e, this.#e = t, this.#t = t.length, this.promise = new Promise((e) => {
				this.#n = e;
			}), this.#d();
		}
		#i(e) {
			return this.#e.indexOf(e) !== -1;
		}
		#a = (e) => {
			let t = e.assembly_id;
			t != null && this.#i(t) && (this.#r.log(`[Transloadit] AssemblyWatcher: Got Assembly finish ${t}`), this.emit("assembly-complete", t), this.#l());
		};
		#o = (e) => {
			let t = e.assembly_id;
			t != null && this.#i(t) && this.#l();
		};
		#s = (e, t) => {
			let n = e.assembly_id;
			n != null && this.#i(n) && (this.#r.log(`[Transloadit] AssemblyWatcher: Got Assembly error ${n}`), this.#r.log(t), this.emit("assembly-error", n, t), this.#l());
		};
		#c = (e, t, n) => {
			let r = e.assembly_id;
			r != null && this.#i(r) && this.#s(e, n);
		};
		#l() {
			--this.#t, this.#t === 0 && (this.#u(), this.#n());
		}
		#u() {
			this.#r.off("transloadit:complete", this.#a), this.#r.off("transloadit:assembly-cancel", this.#o), this.#r.off("transloadit:assembly-error", this.#s), this.#r.off("transloadit:import-error", this.#c);
		}
		#d() {
			this.#r.on("transloadit:complete", this.#a), this.#r.on("transloadit:assembly-cancel", this.#o), this.#r.on("transloadit:assembly-error", this.#s), this.#r.on("transloadit:import-error", this.#c);
		}
	};
})), tE, nE, rE, iE = o((() => {
	X(), _E(), tE = "/assemblies", nE = class extends Error {
		details;
		assembly;
		constructor(e, t, n) {
			super(e), this.details = t, this.assembly = n;
		}
	}, rE = class {
		#e = {};
		#t;
		opts;
		constructor(e) {
			this.opts = e, this.opts.client != null && (this.#e["Transloadit-Client"] = this.opts.client), this.#t = this.opts.rateLimitedQueue.wrapPromiseFunction(A);
		}
		async #n(...e) {
			let t = await this.#t(...e);
			if (t.status === 429) return this.opts.rateLimitedQueue.rateLimit(2e3), this.#n(...e);
			if (!t.ok) {
				let n = Error(t.statusText);
				return n.statusCode = t.status, `${e[0]}`.endsWith(tE) ? t.json().then((e) => {
					if (!e.error) throw n;
					let t = new nE(e.error, e.message, e);
					throw e.assembly_id && (t.details += ` Assembly ID: ${e.assembly_id}`), t;
				}, (e) => {
					throw e.cause = n, e;
				}) : Promise.reject(n);
			}
			return t.json();
		}
		async createAssembly({ params: e, fields: t, signature: n, expectedFiles: r }) {
			let i = new FormData();
			i.append("params", typeof e == "string" ? e : JSON.stringify(e)), n && i.append("signature", n), Object.keys(t).forEach((e) => {
				i.append(e, String(t[e]));
			}), i.append("num_expected_upload_files", String(r));
			let a = new URL(tE, `${this.opts.service}`).href;
			return this.#n(a, {
				method: "POST",
				headers: this.#e,
				body: i
			}).catch((e) => this.#r(e, {
				url: a,
				type: "API_ERROR"
			}));
		}
		async reserveFile(e, t) {
			let n = encodeURIComponent(t.size), r = `${dE(e)}/reserve_file?size=${n}`;
			return this.#n(r, {
				method: "POST",
				headers: this.#e
			}).catch((n) => this.#r(n, {
				assembly: e,
				file: t,
				url: r,
				type: "API_ERROR"
			}));
		}
		async addFile(e, t) {
			if (!t.uploadURL) return Promise.reject(/* @__PURE__ */ Error("File does not have an `uploadURL`."));
			let n = encodeURIComponent(t.size), r = encodeURIComponent(t.uploadURL), i = `size=${n}&filename=${encodeURIComponent(t.name ?? "Unnamed")}&fieldname=file&s3Url=${r}`, a = `${dE(e)}/add_file?${i}`;
			return this.#n(a, {
				method: "POST",
				headers: this.#e
			}).catch((n) => this.#r(n, {
				assembly: e,
				file: t,
				url: a,
				type: "API_ERROR"
			}));
		}
		async cancelAssembly(e) {
			let t = dE(e);
			await this.#t(t, {
				method: "DELETE",
				headers: this.#e
			}).catch((e) => this.#r(e, {
				url: t,
				type: "API_ERROR"
			}));
		}
		async getAssemblyStatus(e) {
			return this.#n(e, { headers: this.#e }).catch((t) => this.#r(t, {
				url: e,
				type: "STATUS_ERROR"
			}));
		}
		async submitError(e, { endpoint: t, instance: n, assembly: r } = {}) {
			let i = e.details ? `${e.message} (${e.details})` : e.message;
			return this.#n("https://transloaditstatus.com/client_error", {
				method: "POST",
				body: JSON.stringify({
					endpoint: t,
					instance: n,
					assembly_id: r,
					agent: typeof navigator < "u" ? navigator.userAgent : "",
					client: this.opts.client,
					error: i
				})
			});
		}
		#r = (e, t) => {
			if (this.opts.errorReporting === !1) throw e;
			let n = { type: t.type };
			throw t.assembly && (n.assembly = t.assembly.assembly_id, n.instance = t.assembly.instance), t.url && (n.endpoint = t.url), this.submitError(e, n).catch(() => {}), e;
		};
	};
})), aE, oE = o((() => {
	aE = { strings: {
		creatingAssembly: "Preparing upload...",
		creatingAssemblyFailed: "Transloadit: Could not create Assembly",
		encoding: "Encoding..."
	} };
}));
//#endregion
//#region node_modules/@uppy/transloadit/lib/index.js
function sE(e) {
	if (e == null) throw Error("Transloadit: The `params` option is required.");
	let t;
	if (typeof e == "string") try {
		t = JSON.parse(e);
	} catch (e) {
		throw new y("Transloadit: The `params` option is a malformed JSON string.", { cause: e });
	}
	else t = e;
	if (!t.auth?.key) throw Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/c/template-credentials");
}
function cE(e) {
	if (!e.assembly_id) throw console.warn("Assembly status is missing `assembly_id`.", e), Error("Transloadit: Assembly status is missing `assembly_id`.");
	return e.assembly_id;
}
function lE(e, ...t) {
	for (let e of t) if (typeof e == "string" && e.length > 0) return e;
	throw Error(`Transloadit: Assembly status is missing ${e}.`);
}
function uE(e) {
	return lE("`assembly_url`", e.assembly_url, e.assembly_ssl_url);
}
function dE(e) {
	return lE("`assembly_ssl_url`", e.assembly_ssl_url, e.assembly_url);
}
var fE, pE, mE, hE, gE, _E = o((() => {
	Z(), X(), ET(), HT(), ZT(), eE(), iE(), oE(), fE = {
		service: "https://api2.transloadit.com",
		errorReporting: !0,
		waitForEncoding: !1,
		waitForMetadata: !1,
		alwaysRunAssembly: !1,
		importFromUploadURLs: !1,
		limit: 20,
		retryDelays: [
			7e3,
			1e4,
			15e3,
			2e4
		],
		clientName: null
	}, pE = (e) => (t) => {
		let n = new y("Failed to send error to the client", { cause: t });
		console.error(n, e);
	}, mE = "https://api2.transloadit.com/companion", hE = /\.transloadit\.com$/, gE = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/, class extends Wn {
		static VERSION = VT.version;
		static COMPANION_URL = mE;
		static COMPANION_ALLOWED_HOSTS = hE;
		#e;
		client;
		#t;
		#n;
		completedFiles;
		restored = null;
		constructor(e, t) {
			super(e, {
				...fE,
				...t
			}), this.type = "uploader", this.id = this.opts.id || "Transloadit", this.defaultLocale = aE, this.#e = new at(this.opts.limit), this.i18nInit(), this.client = new rE({
				service: this.opts.service,
				client: this.#r(),
				errorReporting: this.opts.errorReporting,
				rateLimitedQueue: this.#e
			}), this.completedFiles = Object.create(null);
		}
		#r() {
			let e = [
				`uppy-core:${this.uppy.constructor.VERSION}`,
				`uppy-transloadit:${this.constructor.VERSION}`,
				`uppy-tus:${TT.VERSION}`
			], t = (t, n) => {
				let r = this.uppy.getPlugin(t);
				r && e.push(`${n}:${r.constructor.VERSION}`);
			};
			return this.opts.importFromUploadURLs && (t("XHRUpload", "uppy-xhr-upload"), t("AwsS3", "uppy-aws-s3"), t("AwsS3Multipart", "uppy-aws-s3-multipart")), t("Dropbox", "uppy-dropbox"), t("Box", "uppy-box"), t("Facebook", "uppy-facebook"), t("GoogleDrive", "uppy-google-drive"), t("GoogleDrivePicker", "uppy-google-drive-picker"), t("GooglePhotosPicker", "uppy-google-photos-picker"), t("OneDrive", "uppy-onedrive"), t("Zoom", "uppy-zoom"), t("Url", "uppy-url"), this.opts.clientName != null && e.push(this.opts.clientName), e.join(",");
		}
		#i(e, t) {
			let n = uE(t), r = lE("`tus_url`", t.tus_url), i = cE(t), a = {
				...e.meta,
				assembly_url: n,
				filename: e.name,
				fieldname: "file"
			}, o = {
				...e.tus,
				endpoint: r,
				addRequestId: !0
			}, s;
			if ("remote" in e && e.remote && ({remote: s} = e, t.companion_url && gE.test(e.remote.companionUrl))) {
				let n = t.companion_url.replace(/\/$/, ""), r = e.remote.url.replace(e.remote.companionUrl, "").replace(/^\//, "");
				s = {
					...e.remote,
					companionUrl: n,
					url: `${n}/${r}`
				};
			}
			let c = {
				...e,
				transloadit: { assembly: i }
			};
			return this.opts.importFromUploadURLs || Object.assign(c, {
				meta: a,
				tus: o,
				remote: s
			}), c;
		}
		async #a(e, t) {
			this.uppy.log("[Transloadit] Create Assembly");
			try {
				let n = await this.client.createAssembly({
					...t,
					expectedFiles: e.length
				}), r = this.uppy.getFiles().filter(({ id: t }) => e.includes(t));
				if (r.length === 0 && e.length !== 0) return await this.client.cancelAssembly(n), null;
				let i = new XT(n, this.#e), { status: a } = i, o = cE(a), s = {};
				return r.forEach((e) => {
					s[e.id] = this.#i(e, a);
				}), this.uppy.setState({ files: {
					...this.uppy.getState().files,
					...s
				} }), this.uppy.emit("transloadit:assembly-created", a, e), this.uppy.log(`[Transloadit] Created Assembly ${o}`), i;
			} catch (e) {
				let t = O(e), n = new y(`${this.i18n("creatingAssemblyFailed")}: ${t.message}`, { cause: t });
				throw "details" in t && (n.details = t.details), "assembly" in t && (n.assembly = t.assembly), n;
			}
		}
		#o(e) {
			let t = Array.isArray(e) ? e : [e], n = new $T(this.uppy, t);
			n.on("assembly-complete", (e) => {
				this.getAssemblyFiles(e).forEach((e) => {
					this.completedFiles[e.id] = !0, this.uppy.emit("postprocess-complete", e);
				});
			}), n.on("assembly-error", (e, t) => {
				let n = this.getAssemblyFiles(e);
				n.forEach((e) => {
					this.uppy.emit("upload-error", e, t), this.uppy.emit("postprocess-complete", e);
				});
				let r = { ...this.uppy.getState().files };
				n.forEach((e) => {
					delete r[e.id].tus;
				}), this.uppy.setState({ files: r }), this.uppy.emit("error", t);
			}), this.#n = n;
		}
		#s() {
			return this.opts.waitForEncoding || this.opts.waitForMetadata;
		}
		#c(e, t) {
			return Promise.all(t.map((t) => {
				let n = this.uppy.getFile(t);
				return this.client.reserveFile(e.status, n);
			}));
		}
		#l = (e) => {
			e != null && this.setPluginState({ lastAssemblyStatus: e }), this.setPluginState({ assemblyStatus: e }), this.uppy.emit("restore:plugin-data-changed", { [this.id]: e ? { assemblyResponse: e } : void 0 });
		};
		get assembly() {
			return this.#t;
		}
		set assembly(e) {
			!e && this.assembly && this.assembly.off("status", this.#l), this.#t = e, this.#l(e?.status), e && e.on("status", this.#l);
		}
		#u = (e) => {
			let t = this.uppy.getFile(e.id);
			if (!t?.transloadit?.assembly) return;
			let { status: n } = this.assembly;
			this.client.addFile(n, t).catch((e) => {
				this.uppy.log(e), this.uppy.emit("transloadit:import-error", n, t.id, e);
			});
		};
		#d(e) {
			let t = this.uppy.getFiles();
			for (let n = 0; n < t.length; n++) {
				let r = t[n];
				if (r.uploadURL === e.tus_upload_url || r.tus && r.tus.uploadUrl === e.tus_upload_url || !e.is_tus_file && r.name === e.name && r.size === e.size) return r;
			}
		}
		#f(e, t) {
			let n = this.getPluginState(), r = this.#d(t);
			if (!r) {
				this.uppy.log("[Transloadit] Couldn’t find the file, it was likely removed in the process");
				return;
			}
			this.setPluginState({ files: {
				...n.files,
				[t.id]: {
					assembly: e,
					id: r.id,
					uploadedFile: t
				}
			} }), this.uppy.emit("transloadit:upload", t, this.getAssembly());
		}
		#p(e, t, n) {
			let r = this.getPluginState();
			if (!("id" in n)) {
				console.warn("Result has no id", n);
				return;
			}
			if (typeof n.id != "string") {
				console.warn("Result has no id of type string", n);
				return;
			}
			let i = {
				result: n,
				stepName: t,
				id: n.id,
				assembly: e
			};
			this.setPluginState({ results: [...r.results, i] }), this.uppy.emit("transloadit:result", t, i.result, this.getAssembly());
		}
		#m(e) {
			let t = dE(e.status);
			this.client.getAssemblyStatus(t).then((t) => {
				e.status = t, this.uppy.emit("transloadit:complete", t);
			});
		}
		async #h(e) {
			await this.client.cancelAssembly(e);
			let t = this.assembly?.status ?? e;
			this.uppy.emit("transloadit:assembly-cancelled", t), this.assembly = void 0;
		}
		#g = async () => {
			if (this.assembly) try {
				await this.#h(this.assembly.status);
			} catch (e) {
				this.uppy.log(e);
			}
			this.uppy.setState({ allowNewUpload: !0 });
		};
		#_ = (e) => {
			let t = (e?.[this.id] ? e[this.id] : {}).assemblyResponse;
			if (!t) return;
			let n = () => {
				let e = {}, n = [], r = cE(t);
				t.uploads?.forEach((t) => {
					let n = this.#d(t);
					e[t.id] = {
						id: n.id,
						assembly: r,
						uploadedFile: t
					};
				});
				let i = this.getPluginState(), a = t.results ?? {};
				Object.keys(a).forEach((e) => {
					let t = a[e] ?? [];
					for (let a of t) {
						if (!("id" in a)) {
							console.warn("Result has no id", a);
							continue;
						}
						if (typeof a.id != "string") {
							console.warn("Result has no id of type string", a);
							continue;
						}
						if (!("original_id" in a)) {
							console.warn("Result has no original_id", a);
							continue;
						}
						if (typeof a.original_id != "string") {
							console.warn("Result has no original_id of type string", a);
							continue;
						}
						let t = i.files[a.original_id];
						n.push({
							id: a.id,
							result: {
								...a,
								localId: t ? t.id : null
							},
							stepName: e,
							assembly: r
						});
					}
				});
				let o = new XT(t, this.#e);
				return o.status = t, this.assembly = o, this.setPluginState({
					files: e,
					results: n
				}), e;
			}, r = (e) => {
				this.#o(cE(t)), this.#v(this.assembly, e);
			}, i = () => this.assembly?.update();
			this.restored = (async () => {
				let e = n();
				r(Object.keys(e)), await i(), this.restored = null;
			})(), this.restored.catch((e) => {
				this.uppy.log("Failed to restore", e);
			});
		};
		#v(e, t) {
			let { status: n } = e, r = cE(n);
			return e.on("upload", (e) => {
				this.#f(r, e);
			}), e.on("error", (t) => {
				t.assembly = e.status, this.uppy.emit("transloadit:assembly-error", e.status, t);
			}), e.on("executing", () => {
				this.uppy.emit("transloadit:assembly-executing", e.status);
			}), e.on("execution-progress", (e) => {
				if (this.uppy.emit("transloadit:execution-progress", e), e.progress_combined != null) for (let n of this.uppy.getFilesByIds(t)) this.uppy.emit("postprocess-progress", n, {
					mode: "determinate",
					value: e.progress_combined / 100,
					message: this.i18n("encoding")
				});
			}), this.opts.waitForEncoding && e.on("result", (e, t) => {
				this.#p(r, e, t);
			}), this.opts.waitForEncoding ? e.on("finished", () => {
				this.#m(e);
			}) : this.opts.waitForMetadata && e.on("metadata", () => {
				this.#m(e);
			}), e.ok === "ASSEMBLY_COMPLETE" || e.connect(), e;
		}
		#y = async (e) => {
			this.uppy.setState({ allowNewUpload: !1 });
			let t = typeof this.opts.assemblyOptions == "function" ? await this.opts.assemblyOptions() : this.opts.assemblyOptions;
			t.fields = { ...t.fields ?? {} }, sE(t.params);
			try {
				let n = this.assembly ?? await this.#a(e, t);
				if (n == null) throw Error("All files were canceled after assembly was created");
				this.opts.importFromUploadURLs && await this.#c(n, e), e.forEach((e) => {
					let t = this.uppy.getFile(e);
					this.uppy.emit("preprocess-complete", t);
				}), this.#o(cE(n.status)), this.assembly = n, this.#v(n, e);
			} catch (t) {
				throw e.forEach((e) => {
					let n = this.uppy.getFile(e);
					this.uppy.emit("preprocess-complete", n), this.uppy.emit("upload-error", n, O(t));
				}), this.uppy.setState({ allowNewUpload: !0 }), t;
			}
		};
		#b = async (e, t) => {
			try {
				await this.restored;
				let n = e.map((e) => this.uppy.getFile(e)).filter((e) => !e.error), r = this.assembly ? cE(this.assembly.status) : void 0, i = () => {
					this.assembly?.close();
				};
				if (!this.#s()) {
					i();
					let e = this.assembly?.status;
					e != null && this.uppy.addResultData(t, { transloadit: [e] });
					return;
				}
				if (!r) {
					this.uppy.addResultData(t, { transloadit: [] });
					return;
				}
				n.filter((e) => !Object.hasOwn(this.completedFiles, e.id)).forEach((e) => {
					this.uppy.emit("postprocess-progress", e, {
						mode: "indeterminate",
						message: this.i18n("encoding")
					});
				}), await this.#n.promise, i();
				let a = this.assembly?.status;
				a != null && this.uppy.addResultData(t, { transloadit: [a] });
			} finally {
				this.assembly = void 0, this.uppy.setState({ allowNewUpload: !0 });
			}
		};
		#x = () => {
			this.assembly?.close();
		};
		#S = (e) => {
			this.#x(), this.assembly = void 0, this.client.submitError(e).catch(pE(e)), this.uppy.setState({ allowNewUpload: !0 });
		};
		#C = (e, t) => {
			if (this.#x(), t?.message?.startsWith("tus: ")) {
				let e = t.originalRequest?.getUnderlyingObject()?.responseURL;
				this.client.submitError(t, { endpoint: e }).catch(pE(t));
			}
		};
		install() {
			this.uppy.addPreProcessor(this.#y), this.uppy.addPostProcessor(this.#b), this.uppy.on("error", this.#S), this.uppy.on("cancel-all", this.#g), this.uppy.on("upload-error", this.#C), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", this.#u) : this.uppy.use(TT, {
				storeFingerprintForResuming: !1,
				allowedMetaFields: !0,
				limit: this.opts.limit,
				rateLimitedQueue: this.#e,
				retryDelays: this.opts.retryDelays
			}), this.uppy.on("restored", this.#_), this.setPluginState({
				assemblyStatus: void 0,
				lastAssemblyStatus: void 0,
				files: {},
				results: []
			});
			let { capabilities: e } = this.uppy.getState();
			this.uppy.setState({ capabilities: {
				...e,
				individualCancellation: !1
			} });
		}
		uninstall() {
			this.uppy.removePreProcessor(this.#y), this.uppy.removePostProcessor(this.#b), this.uppy.off("error", this.#S), this.uppy.off("cancel-all", this.#g), this.opts.importFromUploadURLs && this.uppy.off("upload-success", this.#u);
			let { capabilities: e } = this.uppy.getState();
			this.uppy.setState({ capabilities: {
				...e,
				individualCancellation: !0
			} });
		}
		getAssembly() {
			return this.assembly?.status;
		}
		getAssemblyFiles(e) {
			return this.uppy.getFiles().filter((t) => t?.transloadit?.assembly === e);
		}
	};
})), vE, yE = o((() => {
	vE = { strings: {
		generateImage: "Generate image",
		generateImagePlaceholder: "A serene sunset over a mountain lake, with pine trees reflecting in the water",
		generating1: "AI is thinking...",
		generating2: "Crunching pixels...",
		generating3: "Summoning images...",
		generating4: "AI is working...",
		generating5: "Creating magic..."
	} };
})), bE = /* @__PURE__ */ c({ default: () => CE }), xE, SE, CE, wE = o((() => {
	K(), Z(), tc(), X(), _E(), yE(), xE = {
		prompt: "",
		results: [],
		checkedResultIds: /* @__PURE__ */ new Set(),
		loading: !1,
		loadingMessageIndex: 0,
		firstRun: !0
	}, SE = [
		"generating1",
		"generating2",
		"generating3",
		"generating4",
		"generating5"
	], CE = class extends ar {
		loadingInterval = null;
		rateLimitedQueue;
		client;
		assembly = null;
		icon;
		constructor(e, t) {
			super(e, t), this.id = this.opts.id || "ImageGenerator", this.title = "AI image", this.type = "acquirer", this.defaultLocale = vE, this.rateLimitedQueue = new at(10), this.client = new rE({
				service: "https://api2.transloadit.com",
				rateLimitedQueue: this.rateLimitedQueue,
				errorReporting: !0
			}), this.setPluginState(xE), this.i18nInit(), this.icon = () => G("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				xmlnsXlink: "http://www.w3.org/1999/xlink",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				children: [
					G("title", { children: "ai-image-generator" }),
					G("defs", { children: G("circle", {
						id: "uppyImageGeneratorCircle",
						cx: "12",
						cy: "12",
						r: "12"
					}) }),
					G("g", {
						fill: "none",
						fillRule: "evenodd",
						children: [
							G("mask", {
								id: "uppyImageGeneratorMask",
								fill: "#fff",
								children: G("use", { xlinkHref: "#uppyImageGeneratorCircle" })
							}),
							G("use", {
								xlinkHref: "#uppyImageGeneratorCircle",
								fill: "#004b9d"
							}),
							G("path", {
								fill: "#fff",
								d: "m21.98 15.453 2.793.254a.295.295 0 0 1 0 .586l-2.794.254a6 6 0 0 0-5.432 5.432l-.254 2.794a.295.295 0 0 1-.586 0l-.254-2.794a6 6 0 0 0-5.432-5.432l-2.794-.254a.295.295 0 0 1 0-.586l2.794-.254a6 6 0 0 0 5.432-5.432l.254-2.794a.295.295 0 0 1 .586 0l.254 2.794a6 6 0 0 0 5.432 5.432",
								mask: "url(#uppyImageGeneratorMask)"
							}),
							G("path", {
								fill: "#fff",
								d: "m10.74 7.75 1.434.13a.121.121 0 0 1 0 .24l-1.433.13a2.75 2.75 0 0 0-2.49 2.49l-.13 1.434a.121.121 0 0 1-.242 0l-.13-1.433a2.75 2.75 0 0 0-2.49-2.49l-1.433-.13a.121.121 0 0 1 0-.242l1.433-.13a2.75 2.75 0 0 0 2.49-2.49l.13-1.433a.121.121 0 0 1 .242 0l.13 1.433a2.75 2.75 0 0 0 2.49 2.49",
								mask: "url(#uppyImageGeneratorMask)"
							})
						]
					})
				]
			});
		}
		install() {
			let { target: e } = this.opts;
			e && this.mount(e, this);
		}
		uninstall() {
			this.clearLoadingInterval(), this.closeAssembly(!0), this.unmount();
		}
		closeAssembly(e = !1) {
			if (this.assembly) {
				let { status: t } = this.assembly;
				this.assembly.close(), this.assembly = null, e && t && this.client.cancelAssembly(t).catch(() => {});
			}
		}
		clearLoadingInterval() {
			this.loadingInterval &&= (clearInterval(this.loadingInterval), null);
		}
		startLoadingAnimation() {
			this.clearLoadingInterval(), this.loadingInterval = setInterval(() => {
				let { loadingMessageIndex: e } = this.getPluginState(), t = (e + 1) % SE.length;
				this.setPluginState({ loadingMessageIndex: t });
			}, 4e3);
		}
		generate = async () => {
			let { loading: e, prompt: t } = this.getPluginState();
			if (e || t.trim() === "") return;
			let { promise: n, resolve: r, reject: i } = Promise.withResolvers(), a = !1, o = () => {
				a = !0, r();
			};
			this.uppy.once("dashboard:close-panel", o);
			try {
				this.setPluginState({
					loading: !0,
					results: [],
					checkedResultIds: /* @__PURE__ */ new Set(),
					loadingMessageIndex: 0
				}), this.startLoadingAnimation();
				let e = await this.opts.assemblyOptions(this.getPluginState().prompt), t = await this.client.createAssembly({
					params: e.params,
					fields: e.fields ?? {},
					signature: e.signature,
					expectedFiles: 0
				}), a = new XT(t, this.rateLimitedQueue);
				this.assembly = a, a.on("result", (e, t) => {
					let { results: n } = this.getPluginState();
					this.setPluginState({
						results: [...n, t],
						firstRun: !1
					});
				}), a.on("error", i), a.on("finished", r), a.connect(), await n;
			} catch (e) {
				throw this.client.submitError(e).catch(() => {}), this.uppy.info("Image could not be generated", "error"), e;
			} finally {
				this.uppy.off("dashboard:close-panel", o), this.clearLoadingInterval(), this.closeAssembly(!0), this.setPluginState(a ? xE : { loading: !1 });
			}
		};
		onCheckboxChange = (e, t) => {
			t && (t.stopPropagation(), t.preventDefault(), document.getSelection()?.removeAllRanges());
			let { checkedResultIds: n } = this.getPluginState();
			n.has(e.id) ? n.delete(e.id) : n.add(e.id), this.setPluginState({ checkedResultIds: n });
		};
		cancelSelection = () => {
			this.setPluginState({ checkedResultIds: /* @__PURE__ */ new Set() });
		};
		donePicking = async () => {
			let { checkedResultIds: e, results: t } = this.getPluginState(), n = t.filter((t) => e.has(t.id)).map(async (e) => {
				let t = await (await fetch(e.ssl_url)).blob();
				return {
					name: `ai-image-${e.id}`,
					type: e.mime ?? void 0,
					source: "Transloadit",
					data: t
				};
			}), r = await Promise.all(n);
			this.uppy.addFiles(r), this.setPluginState(xE);
		};
		render() {
			let { prompt: e, results: t, checkedResultIds: n, loading: r, loadingMessageIndex: i, firstRun: a } = this.getPluginState(), { i18n: o } = this.uppy, s = r ? o(SE[i]) : void 0;
			return a ? G($s, {
				value: e,
				onChange: (e) => this.setPluginState({ prompt: e }),
				onSubmit: this.generate,
				inputLabel: o("generateImagePlaceholder"),
				loading: r,
				children: r ? G("span", {
					className: "uppy-ImageGenerator-generating",
					children: s
				}) : o("generateImage")
			}) : G("div", {
				className: "uppy-ProviderBrowser uppy-ProviderBrowser-viewType--grid",
				children: [
					G(ai, {
						value: e,
						onChange: (e) => this.setPluginState({ prompt: e }),
						onSubmit: this.generate,
						inputLabel: o("search"),
						i18n: o
					}),
					r ? G("div", {
						className: "uppy-Provider-loading uppy-ImageGenerator-generating--darker",
						children: s
					}) : t.length > 0 ? G("div", {
						className: "uppy-ProviderBrowser-body",
						children: G("ul", {
							className: "uppy-ProviderBrowser-list",
							tabIndex: -1,
							children: t.map((t) => G("li", {
								className: `uppy-ProviderBrowserItem ${n.has(t.id) ? "uppy-ProviderBrowserItem--is-checked" : ""}`,
								children: [G("input", {
									type: "checkbox",
									className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid",
									onChange: (e) => this.onCheckboxChange(t, e),
									name: "listitem",
									id: t.id,
									checked: n.has(t.id),
									"data-uppy-super-focusable": !0
								}), G("label", {
									htmlFor: t.id,
									"aria-label": e,
									className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
									children: G("img", {
										src: t.url,
										alt: e,
										referrerPolicy: "no-referrer",
										loading: "lazy"
									})
								})]
							}, t.id))
						})
					}) : G("div", {
						className: "uppy-Provider-empty",
						children: o("noSearchResults")
					}),
					n.size > 0 && G("div", {
						className: "uppy-ProviderBrowser-footer",
						children: G("div", {
							className: "uppy-ProviderBrowser-footer-buttons",
							children: [G("button", {
								className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
								onClick: this.donePicking,
								type: "button",
								children: o("selectX", { smart_count: n.size })
							}), G("button", {
								className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
								onClick: this.cancelSelection,
								type: "button",
								children: o("cancel")
							})]
						})
					})
				]
			});
		}
	};
}));
p(), Z(), dn();
var TE = {
	Component: U,
	h: xt,
	UIPlugin: ar
}, EE = { imageGenerator: () => Promise.resolve().then(() => (wE(), bE)) };
function DE() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e) => (e ^ crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
}
function OE({ abortMultipartUploadUsing: e, acceptedFileTypes: t, adoptUploadUsing: n, callMethodUsing: r, cancelUploadUsing: i, completeMultipartUploadUsing: a, csrfToken: o, deleteUploadedFileUsing: s, describeRemoteFileUsing: c, disconnectRemoteSourceUsing: l, downloadLabel: u, editLabel: f, extensions: p, getUploadedFilesUsing: m, height: h, imageEditor: g, isChunked: _, isDeletable: v, isDisabled: y, isDownloadable: b, isModal: x, isMultiple: S, isOpenable: C, isPreviewable: w, isReorderable: T, listRemoteFilesUsing: E, locale: D, maxFiles: O, maxParallelUploads: k, maxSize: A, minSize: j, placeUploadedFileUsing: M, planRemoteUploadUsing: N, planUploadUsing: P, remoteSources: F, removeUploadedFileUsing: ee, reorderUploadedFilesUsing: te, searchRemoteFilesUsing: ne, signUploadPartsUsing: re, sources: ie, state: ae, uploadFailedMessage: oe, uploadingMessage: se, uploadUsing: ce }) {
	let I = null, le = null, ue = null, de = null, fe = /* @__PURE__ */ new Map(), pe = null;
	return {
		state: ae,
		isRemovingSilently: !1,
		files: [],
		async init() {
			let d = await Xm(D);
			if (I = new ti({
				autoProceed: !0,
				...d ? { locale: d } : {},
				restrictions: {
					allowedFileTypes: t?.length ? t : null,
					maxFileSize: A,
					maxNumberOfFiles: S ? O : 1,
					minFileSize: j
				}
			}).use(wd, {
				target: this.getContainer(),
				...x ? {
					inline: !1,
					closeModalOnClickOutside: !0
				} : {
					inline: !0,
					width: "100%",
					height: h ?? 320
				},
				disabled: y,
				hideUploadButton: !0,
				hideCancelButton: !0,
				doneButtonHandler: null,
				showRemoveButtonAfterComplete: v && !y,
				showLinkToFileUploadResult: C,
				disableThumbnailGenerator: !w,
				thumbnailType: "image/png",
				proudlyDisplayPoweredByUppy: !1,
				theme: this.getTheme()
			}).use(kd, {
				abortUsing: e,
				adoptUsing: n,
				cancelUploadUsing: i,
				completeUsing: a,
				signPartsUsing: re,
				csrfToken: o,
				isChunked: _,
				planRemoteUsing: N,
				planUsing: P,
				maxParallelUploads: k ?? 2,
				uploadFailedMessage: oe,
				uploadUsing: ce
			}), y || (await Ox(I, ie ?? [], { acceptedFileTypes: t }), await Dx(I, F, {
				describe: c,
				disconnect: l,
				failedMessage: oe,
				list: E,
				search: ne
			})), I.on("file-added", (e) => {
				I.setFileMeta(e.id, { fileKey: DE() });
			}), I.on("file-removed", (e) => {
				I.getFiles().some((e) => e.error) || I.setState({ error: null }), !this.isRemovingSilently && e.meta.fileKey && (this.isStoredFile(e.meta.fileKey) ? s(e.meta.fileKey) : ee(e.meta.fileKey));
			}), I.on("upload", () => {
				this.dispatchFormEvent("form-processing-started", { message: se });
			}), I.on("complete", () => {
				this.dispatchFormEvent("form-processing-finished"), T && !y && this.saveFileOrder();
			}), T && !y && this.enableReordering(), !y) for (let { script: e, options: t } of p ?? []) {
				let { default: n } = await import(
					/* @vite-ignore */
					e
);
				await n({
					uppy: I,
					options: t,
					root: this.$el,
					call: r,
					modules: TE,
					plugins: EE
				});
			}
			g && !y && (await bf(I, g), I.on("file-editor:complete", (e) => this.replaceFile(e)), I.on("upload-success", (e) => {
				fe.has(e.id) && (M(e.meta.fileKey, fe.get(e.id)), fe.delete(e.id));
			})), ue = Cf(I, this.getContainer(), (e) => [...xf(I, e) && !y ? [{
				name: "edit",
				label: f,
				onClick: (e) => this.editFile(e)
			}] : [], ...e.meta.downloadUrl ? [{
				name: "download",
				label: u,
				href: e.meta.downloadUrl
			}] : []]), x && I.on("state-update", () => this.summarize()), pe = () => I.getPlugin("Dashboard").setOptions({ theme: this.getTheme() }), window.addEventListener("theme-changed", pe), await this.syncFiles(), this.$watch("state", () => this.syncFiles());
		},
		destroy() {
			window.removeEventListener("theme-changed", pe), le?.disconnect(), ue?.(), this.isRemovingSilently = !0, I?.destroy(), de?.remove();
		},
		getUppy() {
			return I;
		},
		getContainer() {
			return x ? (de || (de = document.createElement("div"), de.className = "fi-fluppy fi-fluppy-modal", T && !y && de.classList.add("fi-fluppy-reorderable"), document.body.append(de)), de) : this.$refs.dashboard;
		},
		openModal() {
			I.getPlugin("Dashboard").openModal();
		},
		removeFile(e) {
			I.removeFile(e);
		},
		summarize() {
			this.files = I.getFiles().map((e) => ({
				id: e.id,
				name: e.name,
				size: d(e.size ?? 0),
				percentage: Math.round(e.progress.percentage ?? 0),
				isComplete: !!e.progress.uploadComplete,
				error: e.error ?? null
			}));
		},
		async editFile(e) {
			let t = I.getFile(e);
			if (t.source === "Fluppy" && t.data.size === 0) try {
				let n = await fetch(t.meta.url);
				if (!n.ok) throw Error(n.statusText);
				I.setFileState(e, { data: await n.blob() });
			} catch {
				I.info(oe, "error");
				return;
			}
			I.getPlugin("Dashboard").openFileEditor(I.getFile(e));
		},
		replaceFile(e) {
			let t = Object.keys(I.getState().files).indexOf(e.id);
			I.removeFile(e.id);
			let n = e.type.split("/")[1].replace("jpeg", "jpg"), r = I.addFile({
				name: /\.\w+$/.test(e.name) ? e.name : `${e.name}.${n}`,
				type: e.type,
				data: e.data,
				source: "ImageEditor"
			}), { files: i } = I.getState(), a = Object.keys(i).filter((e) => e !== r);
			a.splice(t, 0, r), I.setState({ files: Object.fromEntries(a.map((e) => [e, i[e]])) });
			let o = a[t + 1];
			o && fe.set(r, i[o].meta.fileKey);
		},
		getTheme() {
			return this.$store.theme === "dark" ? "dark" : "light";
		},
		getFileKeysInState() {
			return Object.keys(this.state ?? {});
		},
		isStoredFile(e) {
			let t = this.state?.[e];
			return typeof t == "string" && !t.startsWith("livewire-file:");
		},
		async syncFiles() {
			let e = this.getFileKeysInState(), t = I.getFiles();
			this.isRemovingSilently = !0, t.filter((t) => t.progress.uploadComplete && !e.includes(t.meta.fileKey)).forEach((e) => I.removeFile(e.id)), this.isRemovingSilently = !1;
			let n = I.getFiles().map((e) => e.meta.fileKey);
			if (e.every((e) => n.includes(e))) return;
			let r = await m() ?? {};
			Object.entries(r).filter(([e, t]) => t && !n.includes(e)).forEach(([e, t]) => this.showStoredFile(e, t)), I.getFiles().every((e) => e.progress.uploadComplete) && I.setState({ totalProgress: 100 });
		},
		showStoredFile(e, { name: t, size: n, type: r, url: i, openableUrl: a, downloadableUrl: o }) {
			let s = `fluppy-${e}`;
			I.setState({ files: {
				...I.getState().files,
				[s]: {
					id: s,
					name: t,
					extension: t.includes(".") ? t.split(".").pop() : "",
					type: r,
					size: n,
					data: new Blob([], { type: r ?? "" }),
					meta: {
						name: t,
						type: r,
						fileKey: e,
						url: i,
						downloadUrl: b ? o ?? i : null
					},
					source: "Fluppy",
					isRemote: !1,
					isGhost: !1,
					preview: w && r?.startsWith("image/") ? i : void 0,
					uploadURL: a ?? i,
					progress: {
						percentage: 100,
						bytesUploaded: n,
						bytesTotal: n,
						uploadComplete: !0,
						uploadStarted: Date.now()
					}
				}
			} });
		},
		enableReordering() {
			let e = this.getContainer(), t = (e) => e.target.closest?.(".uppy-Dashboard-Item"), n = (e) => e.id.replace(/^uppy_/, ""), r = null, i = null, a = (e) => {
				i?.removeAttribute("data-fluppy-drop-target"), i = e, i?.setAttribute("data-fluppy-drop-target", "");
			};
			le = new MutationObserver(() => {
				e.querySelectorAll(".uppy-Dashboard-Item:not([draggable])").forEach((e) => e.draggable = !0);
			}), le.observe(e, {
				childList: !0,
				subtree: !0
			}), e.addEventListener("dragstart", (e) => {
				let i = t(e);
				i && (r = n(i), e.dataTransfer.effectAllowed = "move");
			}), e.addEventListener("dragover", (e) => {
				if (!r) return;
				e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "move";
				let i = t(e);
				a(i && n(i) !== r ? i : null);
			}, !0), e.addEventListener("drop", (e) => {
				if (!r) return;
				e.preventDefault(), e.stopPropagation();
				let i = t(e);
				i && this.moveFile(r, n(i));
			}, !0), e.addEventListener("dragend", () => {
				r = null, a(null);
			});
		},
		moveFile(e, t) {
			let { files: n } = I.getState(), r = Object.keys(n), i = r.indexOf(e), a = r.indexOf(t);
			i !== -1 && a !== -1 && i !== a && (r.splice(a, 0, r.splice(i, 1)[0]), I.setState({ files: Object.fromEntries(r.map((e) => [e, n[e]])) }), this.saveFileOrder());
		},
		saveFileOrder() {
			let e = I.getFiles().map((e) => e.meta.fileKey);
			e.join() !== this.getFileKeysInState().filter((t) => e.includes(t)).join() && te(e);
		},
		dispatchFormEvent(e, t = {}) {
			this.$el.closest("form")?.dispatchEvent(new CustomEvent(e, {
				composed: !0,
				cancelable: !0,
				detail: t
			}));
		}
	};
}
//#endregion
export { OE as default };
