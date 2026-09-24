import { n as e, t } from "../fluppy-rolldown-runtime-DtPi1Y-2.js";
import { n, t as r } from "../fluppy-getErrorMessage-e5OqMKex.js";
import { a as i, c as a, d as o, f as s, i as c, l, n as u, o as d, r as f, s as p, t as m } from "../fluppy-UIPlugin-ihypjxg2.js";
import { t as h } from "../fluppy-mimeTypes-CcSLKirE.js";
import { t as g } from "../fluppy-isRestrictionError-Dq8RAQXC.js";
import { a as _, i as v, n as y, o as b, r as x, s as S, t as C } from "../fluppy-hooks.module-DqAiOXxL.js";
//#region node_modules/@uppy/core/lib/utils/dataURItoBlob.js
var w = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function T(e, t, n) {
	let r = w.exec(e), i = t.mimeType ?? r?.[1] ?? "plain/text", a;
	if (r?.[2] != null) {
		let e = atob(decodeURIComponent(r[3])), t = new Uint8Array(e.length);
		for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
		a = [t];
	} else r?.[3] != null && (a = [decodeURIComponent(r[3])]);
	return n ? new File(a, t.name || "", { type: i }) : new Blob(a, { type: i });
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/ErrorWithCause.js
var E = class extends Error {
	isNetworkError;
	constructor(e, t) {
		super(e), this.cause = t?.cause, this.isNetworkError = this.cause && Object.hasOwn(this.cause, "isNetworkError") ? this.cause.isNetworkError : !1;
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/utils/emaFilter.js
function D(e, t, n, r) {
	return n === 0 || e === t ? e : r === 0 ? t : e + (t - e) * 2 ** (-r / n);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/FOCUSABLE_ELEMENTS.js
var O = [
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
//#endregion
//#region node_modules/@uppy/core/lib/utils/findAllDOMElements.js
function ee(e) {
	if (typeof e == "string") {
		let t = document.querySelectorAll(e);
		return t.length === 0 ? null : Array.from(t);
	}
	return typeof e == "object" && s(e) ? [e] : null;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileNameAndExtension.js
function te(e) {
	let t = e.lastIndexOf(".");
	return t === -1 || t === e.length - 1 ? {
		name: e,
		extension: void 0
	} : {
		name: e.slice(0, t),
		extension: e.slice(t + 1)
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileType.js
function ne(e) {
	if (e.type) return e.type;
	let t = e.name ? te(e.name).extension?.toLowerCase() : null;
	return t && t in h ? h[t] : "application/octet-stream";
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/generateFileID.js
function re(e) {
	return e.charCodeAt(0).toString(32);
}
function k(e) {
	let t = "";
	return e.replace(/[^A-Z0-9]/gi, (e) => (t += `-${re(e)}`, "/")) + t;
}
function A(e, t) {
	let n = t || "uppy";
	return typeof e.name == "string" && (n += `-${k(e.name.toLowerCase())}`), e.type !== void 0 && (n += `-${e.type}`), e.meta && typeof e.meta.relativePath == "string" && (n += `-${k(e.meta.relativePath.toLowerCase())}`), e.data?.size !== void 0 && (n += `-${e.data.size}`), e.data.lastModified !== void 0 && (n += `-${e.data.lastModified}`), n;
}
function j(e) {
	return !e.isRemote || !e.remote ? !1 : (/* @__PURE__ */ new Set([
		"box",
		"dropbox",
		"drive",
		"facebook",
		"unsplash"
	])).has(e.remote.provider);
}
function M(e, t) {
	if (j(e)) return e.id;
	let n = ne(e);
	return A({
		...e,
		type: n
	}, t);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/toArray.js
var N = Array.from;
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/fallbackApi.js
function P(e) {
	let t = N(e.files);
	return Promise.resolve(t);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
function ie(e, t, n, { onSuccess: r }) {
	e.readEntries((i) => {
		let a = [...t, ...i];
		i.length ? queueMicrotask(() => {
			ie(e, a, n, { onSuccess: r });
		}) : r(a);
	}, (e) => {
		n(e), r(t);
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
function ae(e, t) {
	return e == null ? e : {
		kind: e.isFile ? "file" : e.isDirectory ? "directory" : void 0,
		name: e.name,
		getFile() {
			return new Promise((t, n) => e.file(t, n));
		},
		async *values() {
			let n = e.createReader();
			yield* await new Promise((e) => {
				ie(n, [], t, { onSuccess: (n) => e(n.map((e) => ae(e, t))) });
			});
		},
		isSameEntry: void 0
	};
}
async function* oe(e, t, n = void 0) {
	let r = () => `${t}/${e.name}`;
	if (e.kind === "file") {
		let i = await e.getFile();
		i == null ? n != null && (yield n) : (i.relativePath = t ? r() : null, yield i);
	} else if (e.kind === "directory") for await (let n of e.values()) yield* oe(n, t ? r() : e.name);
	else n != null && (yield n);
}
async function* se(e, t) {
	let n = await Promise.all(Array.from(e.items, async (e) => {
		let n;
		return n ??= ae(typeof e.getAsEntry == "function" ? e.getAsEntry() : e.webkitGetAsEntry(), t), {
			fileSystemHandle: n,
			lastResortFile: e.getAsFile()
		};
	}));
	for (let { lastResortFile: e, fileSystemHandle: r } of n) if (r != null) try {
		yield* oe(r, "", e);
	} catch (n) {
		e == null ? t(n) : yield e;
	}
	else e != null && (yield e);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/index.js
async function ce(e, t) {
	let n = t?.logDropError ?? Function.prototype;
	try {
		let t = [];
		for await (let r of se(e, n)) t.push(r);
		return t;
	} catch {
		return P(e);
	}
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTimeStamp.js
function le(e) {
	return e < 10 ? `0${e}` : e.toString();
}
function ue() {
	let e = /* @__PURE__ */ new Date();
	return `${le(e.getHours())}:${le(e.getMinutes())}:${le(e.getSeconds())}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isAbortError.js
function de(e) {
	return typeof e == "object" && !!e && "name" in e && e.name === "AbortError";
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isDragDropSupported.js
function fe() {
	if (typeof window > "u") return !1;
	let e = document.body;
	return !(e == null || window == null || !("draggable" in e) || !("ondragstart" in e) || !("ondrop" in e) || !("FormData" in window) || !("FileReader" in window));
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isObjectURL.js
function pe(e) {
	return e.startsWith("blob:");
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isPreviewSupported.js
function me(e) {
	return e ? /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(e) : !1;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/secondsToTime.js
function he(e) {
	return {
		hours: Math.floor(e / 3600) % 24,
		minutes: Math.floor(e / 60) % 60,
		seconds: Math.floor(e % 60)
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/prettyETA.js
function ge(e) {
	let t = he(e);
	return `${t.hours === 0 ? "" : `${t.hours}h`}${t.minutes === 0 ? "" : `${t.hours === 0 ? t.minutes : ` ${t.minutes.toString(10).padStart(2, "0")}`}m`}${t.hours === 0 ? `${t.minutes === 0 ? t.seconds : ` ${t.seconds.toString(10).padStart(2, "0")}`}s` : ""}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/remoteFileObjToLocal.js
function _e(e) {
	return {
		...e,
		type: e.mimeType,
		extension: e.name ? te(e.name).extension : null
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/truncateString.js
var ve = "...";
function ye(e, t) {
	if (t === 0) return "";
	if (e.length <= t) return e;
	if (t <= 4) return `${e.slice(0, t - 1)}…`;
	let n = t - 3, r = Math.ceil(n / 2), i = Math.floor(n / 2);
	return e.slice(0, r) + ve + e.slice(-i);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/VirtualList.js
var be = {
	position: "relative",
	width: "100%",
	minHeight: "100%"
}, xe = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	overflow: "visible"
};
function Se({ data: e, rowHeight: t, renderRow: n, overscanCount: r = 10, padding: i = 4, ...a }) {
	let o = C(null), [s, c] = v(0), [l, u] = v(0);
	b(() => {
		function e() {
			o.current != null && l !== o.current.offsetHeight && u(o.current.offsetHeight);
		}
		return e(), window.addEventListener("resize", e), () => {
			window.removeEventListener("resize", e);
		};
	}, [l]);
	let d = S(() => {
		o.current && c(o.current.scrollTop);
	}, []), p = Math.floor(s / t), m = Math.floor(l / t);
	r && (p = Math.max(0, p - p % r), m += r);
	let h = p + m + i, g = e.slice(p, h), _ = {
		...be,
		height: e.length * t
	}, y = {
		...xe,
		top: p * t
	};
	return f("div", {
		onScroll: d,
		ref: o,
		...a,
		children: f("div", {
			role: "presentation",
			style: _,
			children: f("div", {
				role: "presentation",
				style: y,
				children: g.map(n)
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/loggers.js
var Ce = {
	debug: () => {},
	warn: () => {},
	error: (...e) => console.error(`[Uppy] [${ue()}]`, ...e)
}, we = {
	debug: (...e) => console.debug(`[Uppy] [${ue()}]`, ...e),
	warn: (...e) => console.warn(`[Uppy] [${ue()}]`, ...e),
	error: (...e) => console.error(`[Uppy] [${ue()}]`, ...e)
}, Te = [
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
function F(e, t) {
	if (typeof e != "number" || Number.isNaN(e)) throw TypeError(`Expected a number, got ${typeof e}`);
	let n = e < 0, r = Math.abs(e);
	if (n && (r = -r), r === 0) return "0 B";
	let i = t ? Te.indexOf(t) : Math.min(Math.floor(Math.log(r) / Math.log(1024)), Te.length - 1), a = Number(r / 1024 ** i), o = Te[i];
	return i >= 3 ? a % 1 == 0 ? `${Math.round(a)} ${o}` : `${a.toFixed(2)} ${o}` : `${a >= 10 || a % 1 == 0 ? Math.round(a) : a.toFixed(1)} ${o}`;
}
//#endregion
//#region node_modules/wildcard/index.js
var Ee = /* @__PURE__ */ t(((e, t) => {
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
})), De = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = Ee(), r = /[\/\+\.]/;
	t.exports = function(e, t) {
		function i(t) {
			var i = n(t, e, r);
			return i && i.length >= 2;
		}
		return t ? i(t.split(";")[0]) : i;
	};
})))(), 1), Oe = {
	maxFileSize: null,
	minFileSize: null,
	maxTotalFileSize: null,
	maxNumberOfFiles: null,
	minNumberOfFiles: null,
	allowedFileTypes: null,
	requiredMetaFields: []
}, I = class extends Error {
	isUserFacing;
	file;
	constructor(e, t) {
		super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
	}
	isRestriction = !0;
}, ke = class {
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
		if (r && e.filter((e) => !e.isGhost).length + t.length > r) throw new I(`${this.getI18n()("youCanOnlyUploadX", { smart_count: r })}`);
		if (n) {
			let r = [...e, ...t].reduce((e, t) => e + (t.size ?? 0), 0);
			if (r > n) throw new I(this.getI18n()("aggregateExceedsSize", {
				sizeAllowed: F(n),
				size: F(r)
			}));
		}
	}
	validateSingleFile(e) {
		let { maxFileSize: t, minFileSize: n, allowedFileTypes: r } = this.getOpts().restrictions;
		if (r && !r.some((t) => t.includes("/") ? e.type ? (0, De.default)(e.type.replace(/;.*?$/, ""), t) : !1 : t[0] === "." && e.extension ? e.extension.toLowerCase() === t.slice(1).toLowerCase() : !1)) {
			let t = r.join(", ");
			throw new I(this.getI18n()("youCanOnlyUploadFileTypes", { types: t }), { file: e });
		}
		if (t && e.size != null && e.size > t) throw new I(this.getI18n()("exceedsSize", {
			size: F(t),
			file: e.name ?? this.getI18n()("unnamed")
		}), { file: e });
		if (n && e.size != null && e.size < n) throw new I(this.getI18n()("inferiorSize", { size: F(n) }), { file: e });
	}
	validate(e, t) {
		t.forEach((e) => {
			this.validateSingleFile(e);
		}), this.validateAggregateRestrictions(e, t);
	}
	validateMinNumberOfFiles(e) {
		let { minNumberOfFiles: t } = this.getOpts().restrictions;
		if (t && Object.keys(e).length < t) throw new I(this.getI18n()("youHaveToAtLeastSelectX", { smart_count: t }));
	}
	getMissingRequiredMetaFields(e) {
		let t = new I(this.getI18n()("missingRequiredMetaFieldOnFile", { fileName: e.name ?? this.getI18n()("unnamed") })), { requiredMetaFields: n } = this.getOpts().restrictions, r = [];
		for (let t of n) (!Object.hasOwn(e.meta, t) || e.meta[t] === "") && r.push(t);
		return {
			missingFields: r,
			error: t
		};
	}
}, Ae = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), je = /* @__PURE__ */ t(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), Me = /* @__PURE__ */ t(((e, t) => {
	var n = je(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), Ne = /* @__PURE__ */ t(((e, t) => {
	var n = Me();
	t.exports = function() {
		return n.Date.now();
	};
})), Pe = /* @__PURE__ */ t(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), Fe = /* @__PURE__ */ t(((e, t) => {
	var n = Pe(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), Ie = /* @__PURE__ */ t(((e, t) => {
	t.exports = Me().Symbol;
})), Le = /* @__PURE__ */ t(((e, t) => {
	var n = Ie(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
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
})), Re = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), ze = /* @__PURE__ */ t(((e, t) => {
	var n = Ie(), r = Le(), i = Re(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), Be = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), Ve = /* @__PURE__ */ t(((e, t) => {
	var n = ze(), r = Be(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), He = /* @__PURE__ */ t(((e, t) => {
	var n = Fe(), r = Ae(), i = Ve(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
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
})), Ue = /* @__PURE__ */ t(((e, t) => {
	var n = Ae(), r = Ne(), i = He(), a = "Expected a function", o = Math.max, s = Math.min;
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
})), We = /* @__PURE__ */ t(((e, t) => {
	var n = Ue(), r = Ae(), i = "Expected a function";
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
})), Ge = /* @__PURE__ */ t(((e, t) => {
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
})), Ke = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", qe = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += Ke[Math.random() * 64 | 0];
	return t;
}, Je = {
	name: "@uppy/core",
	description: "Core module for the extensible JavaScript file upload widget with support for drag&drop, resumable uploads, previews, restrictions, file processing/encoding, remote providers like Dropbox, Google Drive, S3 and more :dog:",
	version: "6.2.0",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && sass --load-path=../../ src/provider-views/style.scss dist/provider-views.css && postcss dist/style.css -u cssnano -o dist/style.min.css && postcss dist/provider-views.css -u cssnano -o dist/provider-views.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	},
	keywords: [
		"file uploader",
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
	},
	dependencies: {
		"@transloadit/prettier-bytes": "^2.0.0",
		classnames: "^2.5.1",
		lodash: "^4.18.1",
		"mime-match": "^1.0.2",
		"namespace-emitter": "^2.0.1",
		nanoid: "^6.0.1",
		"p-queue": "^9.3.3",
		"p-retry": "^8.0.0",
		preact: "^10.29.2"
	},
	devDependencies: {
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
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/getFileName.js
function Ye(e, t) {
	return t.name ? t.name : e.split("/")[0] === "image" ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname";
}
//#endregion
//#region node_modules/@uppy/core/lib/locale.js
var Xe = { strings: {
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
} }, Ze = class {
	static VERSION = Je.version;
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
//#endregion
//#region node_modules/@uppy/core/lib/supportsUploadProgress.js
function Qe(e) {
	if (e == null && typeof navigator < "u" && (e = navigator.userAgent), !e) return !0;
	let t = /Edge\/(\d+\.\d+)/.exec(e);
	if (!t) return !0;
	let n = t[1].split(".", 2), r = parseInt(n[0], 10), i = parseInt(n[1], 10);
	return r < 15 || r === 15 && i < 15063 || r > 18 || r === 18 && i >= 18218;
}
//#endregion
//#region node_modules/@uppy/core/lib/Uppy.js
var $e = /* @__PURE__ */ e(We(), 1), et = /* @__PURE__ */ e(Ge(), 1), tt = {
	totalProgress: 0,
	allowNewUpload: !0,
	error: null,
	recoveredState: null
}, nt = class e {
	static VERSION = Je.version;
	#e = Object.create(null);
	#t;
	#n;
	#r = (0, et.default)();
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
		this.defaultLocale = Xe;
		let n = {
			id: "uppy",
			autoProceed: !1,
			allowMultipleUploadBatches: !0,
			debug: !1,
			restrictions: Oe,
			meta: {},
			onBeforeFileAdded: (e, t) => !Object.hasOwn(t, e.id),
			onBeforeUpload: (e) => e,
			store: new Ze(),
			logger: Ce,
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
		}, t?.logger && t.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : t?.debug && (this.opts.logger = we), this.log(`Using Core v${e.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
			...tt,
			plugins: {},
			files: {},
			currentUploads: {},
			capabilities: {
				uploadProgress: Qe(),
				individualCancellation: !0,
				resumableUploads: !1
			},
			meta: { ...this.opts.meta },
			info: []
		}), this.#t = new ke(() => this.opts, () => this.i18n), this.#n = this.store.subscribe((e, t, n) => {
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
		let e = new o([this.defaultLocale, this.opts.locale], { onMissingKey: (e) => this.log(`Missing i18n string: ${e}`, "error") });
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
			...tt
		});
	}
	clear() {
		let { capabilities: e, currentUploads: t } = this.getState();
		if (Object.keys(t).length > 0 && !e.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
		this.setState({
			...tt,
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
			return r(e);
		}
		return null;
	}
	validateAggregateRestrictions(e) {
		let t = this.getFiles();
		try {
			this.#t.validateAggregateRestrictions(t, e);
		} catch (e) {
			return r(e);
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
			let t = new I(this.i18n("noMoreFilesAllowed"), { file: e });
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
		} : e, n = ne(t), r = Ye(n, t), i = te(r).extension, a = M(t, this.getID()), o = {
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
				g(e) || this.log(e.stack || e.message || e);
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
			}, !s && this.checkIfFileAlreadyExists(e.id)) throw new I(this.i18n("noDuplicates", { fileName: e.name ?? this.i18n("unnamed") }), { file: e });
			if (s === !1 && !o) throw new I("Cannot add the file because onBeforeFileAdded returned false.", {
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
		t.length && this.removeFiles(t), this.setState(tt);
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
	#v = (0, $e.default)(() => this.#_(), 500, {
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
		let a = qe();
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
			if (this.#t.validateMinNumberOfFiles(e), !this.#l(e)) throw new I(this.i18n("missingRequiredMetaField"));
			let { currentUploads: t } = this.getState(), n = Object.values(t).flatMap((e) => e.fileIDs), r = Object.keys(e).filter((e) => {
				let t = this.getFile(e);
				return t && !t.progress.uploadStarted && !n.includes(e);
			}), i = this.#C(r), a = await this.#E(i);
			return this.emit("complete", a), a;
		} catch (e) {
			throw this.#s([n(e)]), e;
		}
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/useSearchForm.js
function rt(e) {
	let t = S((t) => {
		t.preventDefault(), e();
	}, [e]), [n] = v(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = qe(), e;
	});
	return b(() => (document.body.appendChild(n), n.addEventListener("submit", t), () => {
		n.removeEventListener("submit", t), n.remove();
	}), [n, t]), { formId: n.id };
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FilterInput.js
function it({ value: e, onChange: t, onSubmit: n, inputLabel: r, i18n: i, disabled: a = !1 }) {
	let { formId: o } = rt(n);
	return f("section", {
		className: "uppy-ProviderBrowser-searchFilter",
		children: [
			f("input", {
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
			f("svg", {
				"aria-hidden": "true",
				focusable: "false",
				className: "uppy-c-icon uppy-ProviderBrowser-searchFilterIcon",
				width: "12",
				height: "12",
				viewBox: "0 0 12 12",
				children: f("path", { d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z" })
			}),
			e && f("button", {
				className: "uppy-u-reset uppy-ProviderBrowser-searchFilterReset",
				type: "button",
				"aria-label": i("resetFilter"),
				disabled: a,
				onClick: () => t(""),
				children: f("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					viewBox: "0 0 19 19",
					children: f("path", { d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z" })
				})
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/AuthError.js
function at(e) {
	return e instanceof Error && "isAuthError" in e && e.isAuthError === !0;
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/AuthView.js
function ot() {
	return f("svg", {
		width: "26",
		height: "26",
		viewBox: "0 0 26 26",
		xmlns: "http://www.w3.org/2000/svg",
		children: f("g", {
			fill: "none",
			"fill-rule": "evenodd",
			children: [
				f("circle", {
					fill: "#FFF",
					cx: "13",
					cy: "13",
					r: "13"
				}),
				f("path", {
					d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
					fill: "#4285F4",
					"fill-rule": "nonzero"
				}),
				f("path", {
					d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
					fill: "#34A853",
					"fill-rule": "nonzero"
				}),
				f("path", {
					d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
					fill: "#FBBC05",
					"fill-rule": "nonzero"
				}),
				f("path", {
					d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
					fill: "#EA4335",
					"fill-rule": "nonzero"
				}),
				f("path", { d: "M4 4h18v18H4z" })
			]
		})
	});
}
function st({ pluginName: e, i18n: t, onAuth: n }) {
	let r = e === "Google Drive", i = S((e) => {
		e.preventDefault(), n();
	}, [n]);
	return f("form", {
		onSubmit: i,
		children: r ? f("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
			"data-uppy-super-focusable": !0,
			children: [f(ot, {}), t("signInWithGoogle")]
		}) : f("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
			"data-uppy-super-focusable": !0,
			children: t("authenticateWith", { pluginName: e })
		})
	});
}
var ct = ({ pluginName: e, i18n: t, onAuth: n }) => f(st, {
	pluginName: e,
	i18n: t,
	onAuth: n
});
function lt({ loading: e, pluginName: t, pluginIcon: n, i18n: r, handleAuth: i, renderForm: a = ct }) {
	return f("div", {
		className: "uppy-Provider-auth",
		children: [
			f("div", {
				className: "uppy-Provider-authIcon",
				children: n()
			}),
			f("div", {
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
//#endregion
//#region node_modules/classnames/index.js
var ut = /* @__PURE__ */ t(((e, t) => {
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
})), dt = {
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
function ft(e, t) {
	let { code: n } = t;
	return n && Object.hasOwn(dt, n) ? e(dt[n]) : n && t.message === n ? e("companionError") : t.message;
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsMenu.js
var pt = ({ appliesTo: e = "all" }, t) => e === "all" || e === (t.data.isFolder ? "folder" : "file");
function mt(e, t) {
	return e.filter((e) => pt(e, t));
}
function ht({ file: e, actions: t, open: n, onToggle: r, i18n: i }) {
	return t.some((t) => pt(t, e)) ? f("div", {
		className: "uppy-ProviderBrowserItem-actions",
		children: f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsBtn",
			"aria-label": i("itemActionsNamed", { name: e.data.name ?? i("unnamed") }),
			"aria-haspopup": "menu",
			"aria-expanded": n,
			onClick: (e) => {
				e.stopPropagation(), e.preventDefault(), r(e.currentTarget);
			},
			children: f("svg", {
				"aria-hidden": "true",
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				focusable: "false",
				children: [
					f("circle", {
						cx: "3",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					f("circle", {
						cx: "8",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					f("circle", {
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
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ModalDialog.js
function gt(e) {
	e.key === "Escape" && e.stopPropagation();
}
var _t = (e) => {
	let t = e.currentTarget;
	if (e.target !== t) return !1;
	let n = t.getBoundingClientRect();
	return e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom;
};
function vt({ onDismiss: e, restoreFocus: t, children: n, ...r }) {
	let i = C(null), a = C(!1), o = C(t);
	return o.current = t, b(() => {
		let e = i.current;
		if (!e) return;
		let t = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		return typeof e.showModal == "function" ? e.showModal() : (e.setAttribute("open", ""), e.querySelector("button")?.focus()), () => {
			e.open && typeof e.close == "function" && e.close();
			let { activeElement: n } = document;
			(n === document.body || e.contains(n)) && (t?.isConnected ? t : o.current?.(e))?.focus();
		};
	}, []), f("dialog", {
		...r,
		ref: i,
		onCancel: (t) => {
			t.preventDefault(), e();
		},
		onPointerDown: (e) => {
			a.current = _t(e);
		},
		onClick: (t) => {
			a.current && _t(t) && e(), a.current = !1;
		},
		onKeyDown: (t) => {
			t.key !== "Escape" || t.isComposing || (t.preventDefault(), t.stopPropagation(), e());
		},
		children: n
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsPopover.js
var L = /* @__PURE__ */ e(ut(), 1), yt = 4;
function bt({ file: e, actions: t, anchor: n, containerRef: r, runAction: i, onClose: a, i18n: o }) {
	let s = C(null), [c, l] = v(null), u = S(() => {
		let e = s.current;
		if (!e) return;
		let t = n.getBoundingClientRect(), r = e.offsetHeight, i = t.bottom + yt + r <= window.innerHeight ? t.bottom + yt : Math.max(0, t.top - yt - r);
		l(getComputedStyle(n).direction === "rtl" ? {
			top: i,
			left: Math.max(0, t.left)
		} : {
			top: i,
			right: Math.max(0, window.innerWidth - t.right)
		});
	}, [n]);
	x(u, [u]), b(() => {
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
	}, p = (e) => {
		let t = Array.from(s.current?.querySelectorAll("[role=\"menuitem\"]") ?? []), n = t.indexOf(document.activeElement), r = (n) => {
			e.preventDefault(), t[(n + t.length) % t.length]?.focus({ preventScroll: !0 });
		};
		switch (e.key) {
			case "Escape":
				gt(e), typeof s.current?.hidePopover != "function" && d();
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
	return f("div", {
		ref: s,
		className: "uppy-ProviderBrowserItem-actionsMenu",
		popover: "auto",
		role: "menu",
		"aria-label": o("itemActionsNamed", { name: e.data.name ?? o("unnamed") }),
		style: c ? {
			top: `${c.top}px`,
			..."left" in c ? { left: `${c.left}px` } : { right: `${c.right}px` }
		} : { visibility: "hidden" },
		onKeyDown: p,
		children: t.map((t) => f("button", {
			type: "button",
			role: "menuitem",
			className: (0, L.default)("uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsMenuItem", t.danger && "uppy-ProviderBrowserItem-actionsMenuItem--danger"),
			onClick: (n) => {
				n.stopPropagation(), n.preventDefault(), d(), i(t, e);
			},
			children: t.label
		}, t.id))
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/useItemMenu.js
function xt(e) {
	let [t, n] = v(null), r = t ? e.find(({ id: e }) => e === t.id) : void 0;
	return {
		open: t && r ? {
			item: r,
			anchor: t.anchor
		} : null,
		close: S(() => n(null), []),
		toggle: S((e, t) => n((n) => n?.id === e ? null : {
			id: e,
			anchor: t
		}), [])
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemIcon.js
function St() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: 11,
		height: 14.5,
		viewBox: "0 0 44 58",
		children: f("path", { d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z" })
	});
}
function Ct() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		style: {
			minWidth: 16,
			marginRight: 3
		},
		viewBox: "0 0 276.157 276.157",
		children: f("path", { d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z" })
	});
}
function wt() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		style: {
			width: 16,
			marginRight: 4
		},
		viewBox: "0 0 58 58",
		children: [f("path", { d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z" }), f("path", { d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z" })]
	});
}
function Tt({ itemIconString: e, alt: t = void 0 }) {
	if (e === null) return null;
	switch (e) {
		case "file": return f(St, {});
		case "folder": return f(Ct, {});
		case "video": return f(wt, {});
		default: return f("img", {
			src: e,
			alt: t,
			referrerPolicy: "no-referrer",
			loading: "lazy",
			width: 16,
			height: 16
		});
	}
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/GridItem.js
function Et({ file: e, toggleCheckbox: t, className: n, isDisabled: r, restrictionError: i, showTitles: a, children: o = null, i18n: s, actionsMenu: c = null, selectable: l = !0, onFileClick: u }) {
	let d = e.data.name ?? s("unnamed"), m = f(p, { children: [
		f(Tt, { itemIconString: e.data.thumbnail || e.data.icon }),
		a && d,
		o
	] });
	return f("li", {
		className: n,
		title: r && i ? i : void 0,
		children: [
			l && f("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid",
				onChange: t,
				name: "listitem",
				id: e.id,
				checked: e.status === "checked",
				disabled: r,
				"data-uppy-super-focusable": !0
			}),
			!l && u && !e.data.isFolder ? f("button", {
				type: "button",
				"aria-label": s("openFileNamed", { name: d }),
				"data-uppy-item-id": e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				onClick: () => u(e),
				children: m
			}) : f("label", {
				htmlFor: l ? e.id : void 0,
				"aria-label": d,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: m
			}),
			c
		]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ListItem.js
function Dt({ file: e, openFolder: t, className: n, isDisabled: r, restrictionError: i, toggleCheckbox: a, showTitles: o, i18n: s, actionsMenu: c = null, selectable: l = !0, onFileClick: u }) {
	let d = f(p, { children: [f("div", {
		className: "uppy-ProviderBrowserItem-iconWrap",
		children: f(Tt, { itemIconString: e.data.icon })
	}), o && f("span", {
		className: "uppy-truncate-text",
		children: e.data.name ?? s("unnamed")
	})] });
	return f("li", {
		className: n,
		title: e.status !== "checked" && i ? i : void 0,
		children: [
			l && f("input", {
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
			e.data.isFolder ? f("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				onClick: () => t(e.id),
				"aria-label": s("openFolderNamed", { name: e.data.name ?? s("unnamed") }),
				children: [f("div", {
					className: "uppy-ProviderBrowserItem-iconWrap",
					children: f(Tt, { itemIconString: e.data.icon })
				}), o && e.data.name ? f("span", {
					className: "uppy-truncate-text",
					children: e.data.name
				}) : s("unnamed")]
			}) : l ? f("label", {
				htmlFor: e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: d
			}) : f("button", {
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
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/index.js
function Ot(e) {
	let { viewType: t, toggleCheckbox: n, showTitles: r, i18n: i, openFolder: a, file: o, utmSource: s, actions: c = [], menuOpen: l = !1, toggleMenu: u, selectable: d = !0, onFileClick: p } = e, m = c.length > 0 && u ? f(ht, {
		file: o,
		actions: c,
		open: l,
		onToggle: u,
		i18n: i
	}) : null, h = o.type === "folder" ? null : o.restrictionError, g = !!h && o.status !== "checked", _ = {
		file: o,
		openFolder: a,
		toggleCheckbox: n,
		utmSource: s,
		i18n: i,
		viewType: t,
		showTitles: r,
		className: (0, L.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": g }, { "uppy-ProviderBrowserItem--noPreview": o.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": o.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": o.status === "partial" }),
		isDisabled: g,
		restrictionError: h,
		actionsMenu: m,
		selectable: d,
		onFileClick: p
	};
	switch (t) {
		case "grid": return f(Et, { ..._ });
		case "list": return f(Dt, { ..._ });
		case "unsplash": return f(Et, {
			..._,
			children: f("a", {
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
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Browser.js
function kt(e) {
	let { displayedPartialTree: t, viewType: n, toggleCheckbox: r, handleScroll: i, showTitles: a, i18n: o, isLoading: s, onCancelLoading: c, openFolder: l, noResultsLabel: u, virtualList: d, utmSource: p, actions: m = [], runAction: h, selectable: g = !0, onFileClick: _ } = e, [y, x] = v(!1), S = xt(t), w = C(null);
	b(() => {
		let e = (e) => {
			e.key === "Shift" && x(!1);
		}, t = (e) => {
			e.key === "Shift" && x(!0);
		};
		return document.addEventListener("keyup", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("keyup", e), document.removeEventListener("keydown", t);
		};
	}, []);
	let T = C(null), E = !!(s && c);
	if (b(() => {
		E && T.current?.focus();
	}, [E]), s) return f("div", {
		className: "uppy-Provider-loading",
		children: [f("span", {
			role: "status",
			children: typeof s == "string" ? s : o("loading")
		}), c && f("button", {
			ref: T,
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Provider-loadingCancel",
			onClick: c,
			children: o("stopOperation")
		})]
	});
	if (t.length === 0) return f("div", {
		className: "uppy-Provider-empty",
		children: u
	});
	let D = (e) => f(Ot, {
		viewType: n,
		toggleCheckbox: (t) => {
			t.stopPropagation(), t.preventDefault(), document.getSelection()?.removeAllRanges(), r(e, y);
		},
		showTitles: a,
		i18n: o,
		openFolder: l,
		file: e,
		utmSource: p,
		actions: m,
		menuOpen: S.open?.item.id === e.id,
		toggleMenu: h ? (t) => S.toggle(e.id, t) : void 0,
		selectable: g,
		onFileClick: _
	}, e.id), O = S.open && h ? f(bt, {
		file: S.open.item,
		actions: mt(m, S.open.item),
		anchor: S.open.anchor,
		containerRef: w,
		runAction: h,
		onClose: S.close,
		i18n: o
	}, S.open.item.id) : null;
	return d ? f("div", {
		className: "uppy-ProviderBrowser-body",
		ref: w,
		children: [f(Se, {
			className: "uppy-ProviderBrowser-list",
			data: t,
			renderRow: D,
			rowHeight: 35.5
		}), O]
	}) : f("div", {
		className: "uppy-ProviderBrowser-body",
		ref: w,
		children: [f("ul", {
			className: "uppy-ProviderBrowser-list",
			onScroll: i,
			tabIndex: -1,
			children: t.map(D)
		}), O]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/BulkActions.js
function At({ selectedCount: e, bulkActions: t, runBulkAction: n, i18n: r }) {
	return e === 0 || t.length === 0 ? null : f("div", {
		className: "uppy-ProviderBrowser-footer",
		children: f("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [f("span", {
				className: "uppy-ProviderBrowser-footer-count",
				children: r("itemsSelected", { smart_count: e })
			}), t.map((e) => f("button", {
				type: "button",
				className: (0, L.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-ProviderDialog-confirm--danger": e.danger }),
				onClick: () => n(e),
				children: e.label
			}, e.id))]
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/utils/PartialTreeUtils/getNumberOfSelectedFiles.js
var jt = (e) => e.filter((t) => t.type === "file" && t.status === "checked" || t.type === "folder" && t.status === "checked" && !e.some((e) => e.type !== "root" && e.parentId === t.id)).length;
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FooterActions.js
function Mt({ cancelSelection: e, donePicking: t, i18n: n, partialTree: r, validateAggregateRestrictions: i }) {
	let a = y(() => i(r), [r, i]), o = y(() => jt(r), [r]);
	return o === 0 ? null : f("div", {
		className: "uppy-ProviderBrowser-footer",
		children: [f("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [f("button", {
				className: (0, L.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-c-btn--disabled": a }),
				disabled: !!a,
				onClick: t,
				type: "button",
				children: n("selectX", { smart_count: o })
			}), f("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
				onClick: e,
				type: "button",
				children: n("cancel")
			})]
		}), a && f("div", {
			className: "uppy-ProviderBrowser-footer-error",
			children: a
		})]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ItemDetailDialog.js
function Nt({ item: e, actions: t, runAction: n, getPreviewUrl: r, onClose: i, i18n: a }) {
	let [o, s] = v(null), c = _(), [l] = v(e);
	b(() => {
		if (!r || l.data.isFolder) return;
		let e = !1;
		return Promise.resolve().then(() => r(l)).then((t) => {
			e || s(t);
		}).catch(() => {}), () => {
			e = !0;
		};
	}, [r, l]);
	let u = e.data.name ?? a("unnamed"), d = mt(t, e), m = e.type === "file" ? e.data : void 0, h = m?.size, g = m?.mimeType, y = m?.modifiedDate;
	return f(vt, {
		className: "uppy-ProviderDialog uppy-ItemDetail",
		"aria-labelledby": c,
		onDismiss: i,
		restoreFocus: (t) => {
			let n = t.closest(".uppy-ProviderBrowser");
			return n?.querySelector(`[data-uppy-item-id="${CSS.escape(e.id)}"]`) ?? n?.querySelector(".uppy-ProviderBrowser-list");
		},
		children: [
			f("header", {
				className: "uppy-ItemDetail-header",
				children: [f("h3", {
					id: c,
					className: "uppy-ItemDetail-name",
					children: u
				}), f("button", {
					type: "button",
					className: "uppy-u-reset uppy-c-btn uppy-ItemDetail-close",
					"aria-label": a("close"),
					onClick: i,
					children: f("svg", {
						"aria-hidden": "true",
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						children: f("path", {
							d: "M2 2l10 10M12 2L2 12",
							stroke: "currentColor",
							"stroke-width": "1.6",
							"stroke-linecap": "round"
						})
					})
				})]
			}),
			f("div", {
				className: "uppy-ItemDetail-body",
				children: [f("div", {
					className: "uppy-ItemDetail-preview",
					"data-testid": "file-detail-preview",
					children: o ? f("img", {
						src: o,
						alt: "",
						className: "uppy-ItemDetail-previewImage"
					}) : f("span", {
						className: "uppy-ItemDetail-previewIcon",
						"aria-hidden": "true",
						children: f(Tt, { itemIconString: e.data.icon })
					})
				}), f("dl", {
					className: "uppy-ItemDetail-facts",
					children: [
						typeof h == "number" ? f(p, { children: [f("dt", { children: a("detailSize") }), f("dd", { children: F(h) })] }) : null,
						g ? f(p, { children: [f("dt", { children: a("detailType") }), f("dd", { children: g })] }) : null,
						y ? f(p, { children: [f("dt", { children: a("detailModified") }), f("dd", { children: y })] }) : null
					]
				})]
			}),
			f("footer", {
				className: "uppy-ItemDetail-actions",
				children: d.map((t) => f("button", {
					type: "button",
					className: (0, L.default)("uppy-u-reset uppy-c-btn uppy-ItemDetail-action", t.danger && "uppy-ItemDetail-action--danger"),
					onClick: () => {
						i(), n(t, e);
					},
					children: t.label
				}, t.id))
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderDialog.js
function Pt({ dialog: e, i18n: t, onConfirm: n, onCancel: r }) {
	let [i, a] = v(e.kind === "prompt" ? e.defaultValue ?? "" : ""), o = C(null), s = C(null), c = C(null), l = _(), u = e.kind === "prompt", d = e.kind === "confirm" && e.danger === !0;
	return b(() => {
		(o.current ?? (d ? c : s).current)?.focus(), o.current?.select();
	}, [d]), f(vt, {
		className: "uppy-ProviderDialog",
		"aria-labelledby": l,
		onDismiss: r,
		children: f("form", {
			className: "uppy-ProviderDialog-form",
			onSubmit: (e) => {
				e.preventDefault(), n(u ? i : void 0);
			},
			children: [
				f("h3", {
					id: l,
					className: "uppy-ProviderDialog-title",
					children: e.title
				}),
				e.kind === "prompt" ? f("label", {
					className: "uppy-ProviderDialog-label",
					children: [e.label && f("span", {
						className: "uppy-ProviderDialog-labelText",
						children: e.label
					}), f("input", {
						ref: o,
						type: "text",
						className: "uppy-u-reset uppy-c-textInput uppy-ProviderDialog-input",
						value: i,
						onInput: (e) => a(e.target.value)
					})]
				}) : e.message && f("p", {
					className: "uppy-ProviderDialog-message",
					children: e.message
				}),
				f("div", {
					className: "uppy-ProviderDialog-actions",
					children: [f("button", {
						ref: c,
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
						onClick: r,
						children: t("cancel")
					}), f("button", {
						ref: s,
						type: "submit",
						className: (0, L.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", d && "uppy-ProviderDialog-confirm--danger"),
						children: e.confirmLabel ?? t("dialogConfirm")
					})]
				})
			]
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderDialogController.js
var Ft = class {
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
}, It = (e, t, n) => {
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
}, Lt = (e, t, n) => {
	let r = e.map((e) => It(e, t, n)), i = [], a = [];
	r.forEach((e) => {
		t.uppy.checkIfFileAlreadyExists(M(e, t.uppy.getID())) ? a.push(e) : i.push(e);
	}), i.length > 0 && t.uppy.info(t.uppy.i18n("addedNumFiles", { numFiles: i.length })), a.length > 0 && t.uppy.info(`Not adding ${a.length} files because they already exist`), t.uppy.addFiles(i);
}, Rt = (e, t, n, r) => {
	let i = t.findIndex((e) => e.id === r);
	if (i !== -1 && n) {
		let n = t.findIndex((t) => t.id === e);
		return t.slice(Math.min(i, n), Math.max(i, n) + 1).map((e) => e.id);
	}
	return [e];
}, R = (e) => (t) => {
	if (at(t)) return;
	let r = n(t);
	if (de(r)) {
		e.log("Aborting request", "warning");
		return;
	}
	e.log(r, "error"), r.name === "UserFacingApiError" && e.info({
		message: e.i18n("companionError"),
		details: ft(e.i18n, r)
	}, "warning", 5e3);
}, zt = (e, t) => {
	let n = e.find((e) => e.id === t), r = [];
	for (; r = [n, ...r], n.type !== "root";) {
		let t = n.parentId;
		n = e.find((e) => e.id === t);
	}
	return r;
}, Bt = (e, t, n) => {
	let r = t === null ? "null" : t;
	if (n[r]) return n[r];
	let i = e.find((e) => e.id === t);
	if (i.type === "root") return [];
	let a = [...Bt(e, i.parentId, n), i];
	return n[r] = a, a;
}, Vt = (e) => {
	let t = Object.create(null);
	return e.filter((e) => e.type === "file" && e.status === "checked").map((n) => {
		let r = Bt(e, n.id, t), i = r.findIndex((e) => e.type === "folder" && e.status === "checked"), a = r.slice(i), o = `/${r.map((e) => e.data.name).join("/")}`, s = a.length === 1 ? void 0 : a.map((e) => e.data.name).join("/");
		return {
			...n.data,
			absDirPath: o,
			relDirPath: s
		};
	});
}, Ht = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))(), 1), Ut = class e extends Error {
	name = "TimeoutError";
	constructor(t, n) {
		super(t, n), Error.captureStackTrace?.(this, e);
	}
}, Wt = (e) => e.reason ?? new DOMException("This operation was aborted.", "AbortError");
function Gt(e, t) {
	let { milliseconds: n, fallback: r, message: i, customTimers: a = {
		setTimeout,
		clearTimeout
	}, signal: o } = t, s, c, l = new Promise((t, l) => {
		if (typeof n != "number" || Math.sign(n) !== 1) throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${n}\``);
		if (o?.aborted) {
			l(Wt(o)), e.then(t, l);
			return;
		}
		if (o && (c = () => {
			l(Wt(o));
		}, o.addEventListener("abort", c, { once: !0 })), e.then(t, l), n === Infinity) return;
		let u = new Ut();
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
//#endregion
//#region node_modules/p-queue/dist/lower-bound.js
function Kt(e, t, n) {
	let r = 0, i = e.length;
	for (; i > 0;) {
		let a = Math.trunc(i / 2), o = r + a;
		n(e[o], t) <= 0 ? (r = ++o, i -= a + 1) : i = a;
	}
	return r;
}
//#endregion
//#region node_modules/p-queue/dist/priority-queue.js
var qt = 100, Jt = class {
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
		let o = Kt(this.#e, a, (e, t) => t.priority - e.priority);
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
		return this.#t++, this.#t === this.#e.length ? (this.#e.length = 0, this.#t = 0) : this.#t > qt && this.#t > this.#e.length / 2 && this.#n(), e?.run;
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
}, Yt = class extends Ht.default {
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
			queueClass: Jt,
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
					if (t.timeout !== void 0 && (r = Gt(Promise.resolve(r), {
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
				if (this.#p instanceof Jt) {
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
}, Xt = (e) => e.map((e) => ({ ...e })), Zt = async (e, t, n, r, i) => {
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
		e.add(() => Zt(e, t, n, r, i));
	});
}, Qt = async (e, t, n, r) => {
	let i = new Yt({ concurrency: 6 }), a = Xt(e);
	return a.filter((e) => e.type === "folder" && e.status === "checked" && (e.cached === !1 || e.nextPagePath)).forEach((e) => {
		i.add(() => Zt(i, a, e, t, n));
	}), i.on("completed", () => {
		let e = a.filter((e) => e.type === "file" && e.status === "checked").length;
		r(e);
	}), await i.onIdle(), a;
}, $t = (e, t, n, r, i) => {
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
}, en = (e, t, n, r, i) => {
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
}, tn = (e, t, n) => {
	e.filter((e) => e.type !== "root" && e.parentId === t).forEach((t) => {
		t.status = n && !(t.type === "file" && t.restrictionError) ? "checked" : "unchecked", tn(e, t.id, n);
	});
}, nn = (e, t) => {
	let n = e.find((e) => e.id === t);
	if (n.type === "root") return;
	let r = e.filter((e) => e.type !== "root" && e.parentId === n.id && !(e.type === "file" && e.restrictionError)), i = r.every((e) => e.status === "checked"), a = r.every((e) => e.status === "unchecked");
	n.status = i && n.cached ? "checked" : a ? "unchecked" : "partial", nn(e, n.parentId);
}, rn = {
	afterOpenFolder: $t,
	afterScrollFolder: en,
	afterToggleCheckbox: (e, t) => {
		let n = Xt(e), r = n.filter((e) => e.type !== "root" && t.includes(e.id));
		return r.forEach((e) => {
			let t = e.status === "checked" ? "unchecked" : "checked";
			e.status = e.type === "file" && e.restrictionError ? "unchecked" : t, tn(n, e.id, e.status === "checked");
		}), nn(n, r[0].parentId), n;
	},
	afterFill: Qt
}, an = (e) => {
	let { scrollHeight: t, scrollTop: n, offsetHeight: r } = e.target;
	return t - (n + r) < 50;
}, on = ({ i18n: e, item: t, toggleCheckbox: n, openFolder: r }) => {
	let i = "restrictionError" in t && t.restrictionError != null && t.status !== "checked";
	return f("li", {
		className: (0, L.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": i }, { "uppy-ProviderBrowserItem--noPreview": t.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": t.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": t.status === "partial" }),
		title: ("restrictionError" in t ? t.restrictionError : void 0) ?? void 0,
		children: [f("input", {
			type: "checkbox",
			className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox",
			onChange: () => n(t, !1),
			checked: t.status === "checked",
			"aria-label": t.data.name ?? e("unnamed"),
			disabled: i,
			"data-uppy-super-focusable": !0
		}), f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
			disabled: i,
			"aria-label": t.data.name,
			onClick: () => {
				t.data.isFolder && r(t.id);
			},
			children: [f("div", {
				className: "uppy-ProviderBrowserItem-iconWrap",
				children: f(Tt, { itemIconString: t.data.icon })
			}), t.data.name ?? e("unnamed")]
		})]
	});
}, sn = ({ searchResults: e, toggleCheckbox: t, openFolder: n, i18n: r }) => e.length === 0 ? f("div", {
	className: "uppy-Provider-empty",
	children: r("noFilesFound")
}) : f("div", {
	className: "uppy-ProviderBrowser-body",
	children: f("ul", {
		className: "uppy-ProviderBrowser-list",
		children: e.map((e) => f(on, {
			i18n: r,
			item: e,
			toggleCheckbox: t,
			openFolder: n
		}, e.id))
	})
});
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Breadcrumbs.js
function cn(e) {
	let { openFolder: t, title: n, breadcrumbsIcon: r, breadcrumbs: i, i18n: a, disabled: o = !1 } = e;
	return f("div", {
		className: "uppy-Provider-breadcrumbs",
		children: [f("div", {
			className: "uppy-Provider-breadcrumbsIcon",
			children: r
		}), i.map((e, r) => {
			let s = e.type === "root" ? n : e.data.name ?? a("unnamed"), c = i.length === r + 1;
			return f(p, { children: [f("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				onClick: c ? void 0 : () => t(e.id),
				"aria-current": c ? "page" : void 0,
				disabled: !c && o,
				title: s,
				children: s
			}), !c && f("span", {
				"aria-hidden": "true",
				className: "uppy-Provider-breadcrumbsSeparator",
				children: "/"
			})] }, e.id);
		})]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/User.js
function ln({ i18n: e, logout: t, username: n, disabled: r = !1 }) {
	return f(p, { children: [n && f("span", {
		className: "uppy-ProviderBrowser-user",
		children: n
	}, "username"), f("button", {
		type: "button",
		onClick: t,
		disabled: r,
		className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
		children: e("logOut")
	}, "logout")] });
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/Header.js
function un(e) {
	let t = e.toolbarActions ?? [], n = e.busy ?? !1;
	return f("div", {
		className: "uppy-ProviderBrowser-header",
		children: f("div", {
			className: (0, L.default)("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple"),
			children: [
				e.showBreadcrumbs && f(cn, {
					openFolder: e.openFolder,
					breadcrumbs: e.breadcrumbs,
					breadcrumbsIcon: e.pluginIcon?.(),
					title: e.title,
					i18n: e.i18n,
					disabled: n
				}),
				(t.length > 0 || e.selectionToggle) && f("div", {
					className: "uppy-ProviderBrowser-toolbar",
					children: [e.selectionToggle && f("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: e.selectionToggle.onToggle,
						disabled: n,
						children: e.selectionToggle.active ? e.i18n("cancelSelection") : e.i18n("selectMultiple")
					}), t.map((t) => f("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: () => e.runToolbarAction?.(t),
						disabled: n,
						children: t.label
					}, t.id))]
				}),
				!e.standalone && f(ln, {
					logout: e.logout,
					username: e.username,
					i18n: e.i18n,
					disabled: n
				})
			]
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/ProviderView.js
var dn = /* @__PURE__ */ e(Ue(), 1);
function fn() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "30",
		height: "30",
		viewBox: "0 0 30 30",
		children: f("path", { d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z" })
	});
}
var pn = (e) => ({
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
});
function mn(e, t) {
	let n = [t], r = e.get(t.parentId);
	for (; r && r.type !== "root";) n.push(r), r = e.get(r.parentId);
	return n;
}
(class e {
	static VERSION = Je.version;
	static [Symbol.for("uppy test: searchDebounceMs")];
	plugin;
	provider;
	opts;
	isHandlingScroll = !1;
	previousCheckbox = null;
	#e;
	constructor(t, n) {
		this.plugin = t, this.provider = n.provider, this.#c = new Ft(t);
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
		this.#e = (0, dn.default)(this.#f, a, o);
	}
	resetPluginState() {
		this.#s.clear(), this.#c.cancel(), this.plugin.setPluginState(pn(this.plugin.rootFolderId));
	}
	refreshCurrentFolder = async (e = !1) => {
		let { partialTree: t, currentFolderId: n } = this.plugin.getPluginState();
		if (t == null || this.#i) return;
		let r = ++this.#o, i = t.flatMap((e) => e.type !== "root" && e.parentId === n && e.status === "checked" ? [e.id] : []), a = new Map(t.map((e) => [e.id, e])), o = (e) => mn(a, e).some(({ parentId: e }) => e === n), s = new Set(zt(t, n).map((e) => e.id)), c = t.filter((e) => e.type === "root" || !o(e)).filter((t) => !e || s.has(t.id)).map((t) => (e || t.id === n) && t.type !== "file" ? {
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
		f.length > 0 && this.plugin.setPluginState({ partialTree: rn.afterToggleCheckbox(l, f) });
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
		if (de(e)) {
			t.log("[ProviderView] action cancelled", "warning");
			return;
		}
		t.log(`[ProviderView] action failed: ${r(e)}`, "error");
		let n = e instanceof Error && e.name === "UserFacingApiError" ? ft(t.i18n, e) : e instanceof E || at(e) ? t.i18n("companionError") : t.i18n("actionFailed");
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
		let { partialTree: e } = this.plugin.getPluginState(), t = new Map(e.map((e) => [e.id, e])), n = e.filter((e) => e.type !== "root" && e.status === "checked" && (e.type === "file" || mn(t, e).some(({ id: e }) => this.#s.has(e)))), r = new Set(n.map((e) => e.id));
		return n.filter((e) => !mn(t, e).slice(1).some(({ id: e }) => r.has(e)));
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
		}).catch(R(this.plugin.uppy)), this.#d();
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
			let o = rn.afterOpenFolder(t, a, n, i, this.validateSingleFile);
			this.plugin.setPluginState({
				partialTree: o,
				currentFolderId: e,
				searchString: ""
			});
		}).catch(R(this.plugin.uppy)), this.#d();
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
					...pn(this.plugin.rootFolderId),
					authenticated: !1
				});
			}
		}).catch(R(this.plugin.uppy));
	}
	async handleAuth(e) {
		await this.#u(async (t) => {
			this.setLoading(!0), await this.provider.login({
				authFormData: e,
				signal: t
			}), this.plugin.setPluginState({ authenticated: !0 }), await Promise.all([this.provider.fetchPreAuthToken(), this.openFolder(this.plugin.rootFolderId)]);
		}).catch(R(this.plugin.uppy)), this.#d();
	}
	async handleScroll(e) {
		an(e) && await this.loadNextPage();
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
				let s = rn.afterScrollFolder(o.partialTree, t, a, i, this.validateSingleFile);
				this.plugin.setPluginState({ partialTree: s }), r = !0;
			}).catch(R(this.plugin.uppy)), this.isHandlingScroll = !1, r;
		}
		return !1;
	}
	validateSingleFile = (e) => {
		let t = _e(e);
		return this.plugin.uppy.validateSingleFile(t);
	};
	async donePicking() {
		let { partialTree: e } = this.plugin.getPluginState();
		this.isLoading || (this.setLoading(!0), await this.#u(async (t) => {
			let n = await rn.afterFill(e, (e) => this.provider.list(e, { signal: t }), this.validateSingleFile, (e) => {
				this.setLoading(this.plugin.uppy.i18n("addedNumFiles", { numFiles: e }));
			});
			if (this.validateAggregateRestrictions(n)) {
				this.plugin.setPluginState({ partialTree: n });
				return;
			}
			Lt(Vt(n), this.plugin, this.provider), this.resetPluginState();
		}).catch(R(this.plugin.uppy)), this.#d());
	}
	toggleCheckbox(e, t) {
		let { partialTree: n } = this.plugin.getPluginState(), r = Rt(e.id, this.getDisplayedPartialTree(), t, this.previousCheckbox), i = rn.afterToggleCheckbox(n, r), a = new Map(i.map((e) => [e.id, e.type === "root" ? void 0 : e.status]));
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
		return zt(e, t);
	};
	getSelectedAmount = () => {
		let { partialTree: e } = this.plugin.getPluginState();
		return jt(e);
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
		return f(sn, {
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
		}, { authenticated: a, loading: o } = this.plugin.getPluginState(), s = this.plugin.icon || fn;
		if (a === !1) return f(lt, {
			pluginName: this.plugin.title,
			pluginIcon: s,
			handleAuth: this.handleAuth,
			i18n: this.plugin.uppy.i18n,
			renderForm: i.renderAuthForm,
			loading: o
		});
		let { partialTree: c, currentFolderId: l, username: u, searchString: d, searchResults: p, dialog: m, selectionActive: h = !1, detailItemId: g } = this.plugin.getPluginState(), _ = this.getBreadcrumbs(), v = i.mode === "manager", y = !v || h, b = this.#i !== void 0, x = c.find(({ id: e }) => e === l), S = x?.type !== "file" && x?.cached === !0 && !c.some((e) => e.type !== "root" && e.parentId === l);
		g && (this.#a = c.find((e) => e.type !== "root" && e.id === g) ?? this.#a);
		let C = this.#a?.id === g ? this.#a : void 0;
		return f("div", {
			className: (0, L.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${i.viewType}`),
			children: [
				f(un, {
					showBreadcrumbs: i.showBreadcrumbs,
					openFolder: this.openFolder,
					breadcrumbs: _,
					pluginIcon: s,
					title: this.plugin.title,
					logout: this.logout,
					username: u,
					i18n: r,
					toolbarActions: i.toolbarActions ?? [],
					runToolbarAction: this.runToolbarAction,
					standalone: i.standalone ?? !1,
					selectionToggle: v && (i.bulkActions?.length ?? 0) > 0 && (h || !S) ? {
						active: h,
						onToggle: this.toggleSelectionMode
					} : void 0,
					busy: b
				}),
				i.showFilter && f(it, {
					value: d,
					onChange: (e) => this.onSearchInput(e),
					onSubmit: () => {},
					inputLabel: r("filter"),
					i18n: r,
					disabled: b
				}),
				p ? this.#h() : f(kt, {
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
					selectable: y,
					onFileClick: v && !h ? this.openItemDetail : void 0
				}),
				b ? null : v ? h && f(At, {
					selectedCount: this.getBulkActionItems().length,
					bulkActions: i.bulkActions ?? [],
					runBulkAction: this.runBulkAction,
					i18n: r
				}) : f(Mt, {
					partialTree: c,
					donePicking: this.donePicking,
					cancelSelection: this.cancelSelection,
					i18n: r,
					validateAggregateRestrictions: this.validateAggregateRestrictions
				}),
				C && f(Nt, {
					item: C,
					actions: i.actions ?? [],
					runAction: this.runAction,
					getPreviewUrl: i.getPreviewUrl,
					onClose: this.closeItemDetail,
					i18n: r
				}, C.id),
				m && f(Pt, {
					dialog: m,
					i18n: r,
					onConfirm: this.#c.submit,
					onCancel: this.#c.cancel
				}, this.#c.revision)
			]
		});
	}
});
//#endregion
//#region node_modules/exifr/dist/mini.esm.mjs
function z(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var hn = typeof self < "u" ? self : global, gn = typeof navigator < "u", _n = gn && typeof HTMLImageElement > "u", vn = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), yn = hn.Buffer, bn = !!yn, xn = (e) => e !== void 0;
function Sn(e) {
	return e === void 0 || (e instanceof Map ? e.size === 0 : Object.values(e).filter(xn).length === 0);
}
function B(e) {
	let t = Error(e);
	throw delete t.stack, t;
}
function Cn(e) {
	let t = function(e) {
		let t = 0;
		return e.ifd0.enabled && (t += 1024), e.exif.enabled && (t += 2048), e.makerNote && (t += 2048), e.userComment && (t += 1024), e.gps.enabled && (t += 512), e.interop.enabled && (t += 100), e.ifd1.enabled && (t += 1024), t + 2048;
	}(e);
	return e.jfif.enabled && (t += 50), e.xmp.enabled && (t += 2e4), e.iptc.enabled && (t += 14e3), e.icc.enabled && (t += 6e3), t;
}
var wn = (e) => String.fromCharCode.apply(null, e), Tn = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0, En = class e {
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
			r === void 0 && (r = t.byteLength - n), (n += t.byteOffset) + r > t.byteOffset + t.byteLength && B("Creating view outside of available memory in ArrayBuffer");
			let e = new DataView(t.buffer, n, r);
			this._swapDataView(e);
		} else if (typeof t == "number") {
			let e = new DataView(new ArrayBuffer(t));
			this._swapDataView(e);
		} else B("Invalid input argument for BufferView: " + t);
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
		return t instanceof DataView || t instanceof e ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array || B("BufferView.set(): Invalid data argument."), this.toUint8().set(t, n), new r(this, n, t.byteLength);
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
		return n = this.getUint8Array(e, t), Tn ? Tn.decode(n) : bn ? Buffer.from(n).toString("utf8") : decodeURIComponent(escape(wn(n)));
		var n;
	}
	getLatin1String(e = 0, t = this.byteLength) {
		return wn(this.getUint8Array(e, t));
	}
	getUnicodeString(e = 0, t = this.byteLength) {
		let n = [];
		for (let r = 0; r < t && e + r < this.byteLength; r += 2) n.push(this.getUint16(e + r));
		return wn(n);
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
function Dn(e, t) {
	B(`${e} '${t}' was not loaded, try using full build of exifr.`);
}
var On = class extends Map {
	constructor(e) {
		super(), this.kind = e;
	}
	get(e, t) {
		return this.has(e) || Dn(this.kind, e), t && (e in t || function(e, t) {
			B(`Unknown ${e} '${t}'.`);
		}(this.kind, e), t[e].enabled || Dn(this.kind, e)), super.get(e);
	}
	keyList() {
		return Array.from(this.keys());
	}
}, kn = new On("file parser"), V = new On("segment parser"), An = new On("file reader"), jn = hn.fetch;
function Mn(e, t) {
	return (n = e).startsWith("data:") || n.length > 1e4 ? Pn(e, t, "base64") : vn && e.includes("://") ? Nn(e, t, "url", Fn) : vn ? Pn(e, t, "fs") : gn ? Nn(e, t, "url", Fn) : void B("Invalid input argument");
	var n;
}
async function Nn(e, t, n, r) {
	return An.has(n) ? Pn(e, t, n) : r ? async function(e, t) {
		return new En(await t(e));
	}(e, r) : void B(`Parser ${n} is not loaded`);
}
async function Pn(e, t, n) {
	let r = new (An.get(n))(e, t);
	return await r.read(), r;
}
var Fn = (e) => jn(e).then(((e) => e.arrayBuffer())), In = (e) => new Promise(((t, n) => {
	let r = new FileReader();
	r.onloadend = () => t(r.result || /* @__PURE__ */ new ArrayBuffer()), r.onerror = n, r.readAsArrayBuffer(e);
})), Ln = class extends Map {
	get tagKeys() {
		return this.allKeys ||= Array.from(this.keys()), this.allKeys;
	}
	get tagValues() {
		return this.allValues ||= Array.from(this.values()), this.allValues;
	}
};
function Rn(e, t, n) {
	let r = new Ln();
	for (let [e, t] of n) r.set(e, t);
	if (Array.isArray(t)) for (let n of t) e.set(n, r);
	else e.set(t, r);
	return r;
}
function zn(e, t, n) {
	let r, i = e.get(t);
	for (r of n) i.set(r[0], r[1]);
}
var Bn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), H = [
	"chunked",
	"firstChunkSize",
	"firstChunkSizeNode",
	"firstChunkSizeBrowser",
	"chunkSize",
	"chunkLimit"
], Un = [
	"jfif",
	"xmp",
	"icc",
	"iptc",
	"ihdr"
], Wn = ["tiff", ...Un], U = [
	"ifd0",
	"ifd1",
	"exif",
	"gps",
	"interop"
], W = [...Wn, ...U], G = ["makerNote", "userComment"], Gn = [
	"translateKeys",
	"translateValues",
	"reviveValues",
	"multiSegment"
], K = [
	...Gn,
	"sanitize",
	"mergeOutput",
	"silentErrors"
], Kn = class {
	get translate() {
		return this.translateKeys || this.translateValues || this.reviveValues;
	}
}, qn = class extends Kn {
	get needed() {
		return this.enabled || this.deps.size > 0;
	}
	constructor(e, t, n, r) {
		if (super(), z(this, "enabled", !1), z(this, "skip", /* @__PURE__ */ new Set()), z(this, "pick", /* @__PURE__ */ new Set()), z(this, "deps", /* @__PURE__ */ new Set()), z(this, "translateKeys", !1), z(this, "translateValues", !1), z(this, "reviveValues", !1), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(r), this.canBeFiltered = U.includes(e), this.canBeFiltered && (this.dict = Bn.get(e)), n !== void 0) {
			if (Array.isArray(n)) this.parse = this.enabled = !0, this.canBeFiltered && n.length > 0 && this.translateTagSet(n, this.pick);
			else if (typeof n == "object") {
				if (this.enabled = !0, this.parse = !1 !== n.parse, this.canBeFiltered) {
					let { pick: e, skip: t } = n;
					e && e.length > 0 && this.translateTagSet(e, this.pick), t && t.length > 0 && this.translateTagSet(t, this.skip);
				}
				this.applyInheritables(n);
			} else !0 === n || !1 === n ? this.parse = this.enabled = n : B(`Invalid options argument: ${n}`);
		}
	}
	applyInheritables(e) {
		let t, n;
		for (t of Gn) n = e[t], n !== void 0 && (this[t] = n);
	}
	translateTagSet(e, t) {
		if (this.dict) {
			let n, r, { tagKeys: i, tagValues: a } = this.dict;
			for (n of e) typeof n == "string" ? (r = a.indexOf(n), r === -1 && (r = i.indexOf(Number(n))), r !== -1 && t.add(Number(i[r]))) : t.add(n);
		} else for (let n of e) t.add(n);
	}
	finalizeFilters() {
		!this.enabled && this.deps.size > 0 ? (this.enabled = !0, Qn(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && Qn(this.pick, this.deps);
	}
}, q = {
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
}, Jn = /* @__PURE__ */ new Map(), Yn = class extends Kn {
	static useCached(e) {
		let t = Jn.get(e);
		return t !== void 0 || (t = new this(e), Jn.set(e, t)), t;
	}
	constructor(e) {
		super(), !0 === e ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : B(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = gn ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = !1), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
	}
	setupFromUndefined() {
		let e;
		for (e of H) this[e] = q[e];
		for (e of K) this[e] = q[e];
		for (e of G) this[e] = q[e];
		for (e of W) this[e] = new qn(e, q[e], void 0, this);
	}
	setupFromTrue() {
		let e;
		for (e of H) this[e] = q[e];
		for (e of K) this[e] = q[e];
		for (e of G) this[e] = !0;
		for (e of W) this[e] = new qn(e, !0, void 0, this);
	}
	setupFromArray(e) {
		let t;
		for (t of H) this[t] = q[t];
		for (t of K) this[t] = q[t];
		for (t of G) this[t] = q[t];
		for (t of W) this[t] = new qn(t, !1, void 0, this);
		this.setupGlobalFilters(e, void 0, U);
	}
	setupFromObject(e) {
		let t;
		for (t of (U.ifd0 = U.ifd0 || U.image, U.ifd1 = U.ifd1 || U.thumbnail, Object.assign(this, e), H)) this[t] = Zn(e[t], q[t]);
		for (t of K) this[t] = Zn(e[t], q[t]);
		for (t of G) this[t] = Zn(e[t], q[t]);
		for (t of Wn) this[t] = new qn(t, q[t], e[t], this);
		for (t of U) this[t] = new qn(t, q[t], e[t], this.tiff);
		this.setupGlobalFilters(e.pick, e.skip, U, W), !0 === e.tiff ? this.batchEnableWithBool(U, !0) : !1 === e.tiff ? this.batchEnableWithUserValue(U, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, U) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, U);
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
			let t = Xn(e, n);
			for (let [e, n] of t) Qn(this[e].pick, n), this[e].enabled = !0;
		} else if (t && t.length) {
			let e = Xn(t, n);
			for (let [t, n] of e) Qn(this[t].skip, n);
		}
	}
	filterNestedSegmentTags() {
		let { ifd0: e, exif: t, xmp: n, iptc: r, icc: i } = this;
		this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), n.enabled || e.skip.add(700), r.enabled || e.skip.add(33723), i.enabled || e.skip.add(34675);
	}
	traverseTiffDependencyTree() {
		let { ifd0: e, exif: t, gps: n, interop: r } = this;
		r.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), n.needed && e.deps.add(34853), this.tiff.enabled = U.some(((e) => !0 === this[e].enabled)) || this.makerNote || this.userComment;
		for (let e of U) this[e].finalizeFilters();
	}
	get onlyTiff() {
		return !Un.map(((e) => this[e].enabled)).some(((e) => !0 === e)) && this.tiff.enabled;
	}
	checkLoadedPlugins() {
		for (let e of Wn) this[e].enabled && !V.has(e) && Dn("segment parser", e);
	}
};
function Xn(e, t) {
	let n, r, i, a, o = [];
	for (i of t) {
		for (a of (n = Bn.get(i), r = [], n)) (e.includes(a[0]) || e.includes(a[1])) && r.push(a[0]);
		r.length && o.push([i, r]);
	}
	return o;
}
function Zn(e, t) {
	return e === void 0 ? t === void 0 ? void 0 : t : e;
}
function Qn(e, t) {
	for (let n of t) e.add(n);
}
z(Yn, "default", q);
var $n = class {
	constructor(e) {
		z(this, "parsers", {}), z(this, "output", {}), z(this, "errors", []), z(this, "pushToErrors", ((e) => this.errors.push(e))), this.options = Yn.useCached(e);
	}
	async read(e) {
		this.file = await function(e, t) {
			return typeof e == "string" ? Mn(e, t) : gn && !_n && e instanceof HTMLImageElement ? Mn(e.src, t) : e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof DataView ? new En(e) : gn && e instanceof Blob ? Nn(e, t, "blob", In) : void B("Invalid input argument");
		}(e, this.options);
	}
	setup() {
		if (this.fileParser) return;
		let { file: e } = this, t = e.getUint16(0);
		for (let [n, r] of kn) if (r.canHandle(e, t)) return this.fileParser = new r(this.options, this.file, this.parsers), e[n] = !0;
		this.file.close && this.file.close(), B("Unknown file format");
	}
	async parse() {
		let { output: e, errors: t } = this;
		return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), Sn(n = e) ? void 0 : n;
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
		let { options: e, file: t } = this, n = V.get("tiff", e);
		var r;
		if (t.tiff ? r = {
			start: 0,
			type: "tiff"
		} : t.jpeg && (r = await this.fileParser.getOrFindSegment("tiff")), r === void 0) return;
		let i = await this.fileParser.ensureSegmentChunk(r), a = await (this.parsers.tiff = new n(i, e, t)).extractThumbnail();
		return t.close && t.close(), a;
	}
};
async function er(e, t) {
	let n = new $n(t);
	return await n.read(e), n.parse();
}
var tr = Object.freeze({
	__proto__: null,
	parse: er,
	Exifr: $n,
	fileParsers: kn,
	segmentParsers: V,
	fileReaders: An,
	tagKeys: Bn,
	tagValues: Vn,
	tagRevivers: Hn,
	createDictionary: Rn,
	extendDictionary: zn,
	fetchUrlAsArrayBuffer: Fn,
	readBlobAsArrayBuffer: In,
	chunkedProps: H,
	otherSegments: Un,
	segments: Wn,
	tiffBlocks: U,
	segmentsAndBlocks: W,
	tiffExtractables: G,
	inheritables: Gn,
	allFormatters: K,
	Options: Yn
}), J = class {
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
		return new this(e, new Yn({ [this.type]: t }), e).parse();
	}
	normalizeInput(e) {
		return e instanceof En ? e : new En(e);
	}
	constructor(e, t = {}, n) {
		z(this, "errors", []), z(this, "raw", /* @__PURE__ */ new Map()), z(this, "handleError", ((e) => {
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
		let n = Hn.get(t), r = Vn.get(t), i = Bn.get(t), a = this.options[t], o = a.reviveValues && !!n, s = a.translateValues && !!r, c = a.translateKeys && !!i, l = {};
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
z(J, "headerLength", 4), z(J, "type", void 0), z(J, "multiSegment", !1), z(J, "canHandle", (() => !1));
function nr(e) {
	return e === 192 || e === 194 || e === 196 || e === 219 || e === 221 || e === 218 || e === 254;
}
function rr(e) {
	return e >= 224 && e <= 239;
}
function ir(e, t, n) {
	for (let [r, i] of V) if (i.canHandle(e, t, n)) return r;
}
var ar = class extends class {
	constructor(e, t, n) {
		z(this, "errors", []), z(this, "ensureSegmentChunk", (async (e) => {
			let t = e.start, n = e.size || 65536;
			if (this.file.chunked) {
				if (this.file.available(t, n)) e.chunk = this.file.subarray(t, n);
				else try {
					e.chunk = await this.file.readChunk(t, n);
				} catch (t) {
					B(`Couldn't read segment: ${JSON.stringify(e)}. ${t.message}`);
				}
			} else this.file.byteLength > t + n ? e.chunk = this.file.subarray(t, n) : e.size === void 0 ? e.chunk = this.file.subarray(t) : B("Segment unreachable: " + JSON.stringify(e));
			return e.chunk;
		})), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = n;
	}
	injectSegment(e, t) {
		this.options[e].enabled && this.createParser(e, t);
	}
	createParser(e, t) {
		let n = new (V.get(e))(t, this.options, this.file);
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
		super(...e), z(this, "appSegments", []), z(this, "jpegSegments", []), z(this, "unknownSegments", []);
	}
	static canHandle(e, t) {
		return t === 65496;
	}
	async parse() {
		await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
	}
	setupSegmentFinderArgs(e) {
		!0 === e ? (this.findAll = !0, this.wanted = new Set(V.keyList())) : (e = e === void 0 ? V.keyList().filter(((e) => this.options[e].enabled)) : e.filter(((e) => this.options[e].enabled && V.has(e))), this.findAll = !1, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = !1;
	}
	async findAppSegments(e = 0, t) {
		this.setupSegmentFinderArgs(t);
		let { file: n, findAll: r, wanted: i, remaining: a } = this;
		if (!r && this.file.chunked && (r = Array.from(i).some(((e) => {
			let t = V.get(e), n = this.options[e];
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
			if (n = c.getUint8(e + 1), rr(n)) {
				if (r = c.getUint16(e + 2), i = ir(c, e, r), i && u.has(i) && (a = V.get(i), o = a.findPosition(c, e), s = f[i], o.type = i, this.appSegments.push(o), !l && (a.multiSegment && s.multiSegment ? (this.unfinishedMultiSegment = o.chunkNumber < o.chunkCount, this.unfinishedMultiSegment || d.delete(i)) : d.delete(i), d.size === 0))) break;
				f.recordUnknownSegments && (o = J.findPosition(c, e), o.marker = n, this.unknownSegments.push(o)), e += r + 1;
			} else if (nr(n)) {
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
			let n = V.get(e, this.options);
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
z(ar, "type", "jpeg"), kn.set("jpeg", ar);
var or = [
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
], sr = class extends J {
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
		let { chunk: r } = this, i = r.getUint16(e + 2), a = r.getUint32(e + 4), o = or[i];
		if (o * a <= 4 ? e += 8 : e = r.getUint32(e + 8), (i < 1 || i > 13) && B(`Invalid TIFF value type. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e}`), e > r.byteLength && B(`Invalid TIFF value offset. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e} is outside of chunk size ${r.byteLength}`), i === 1) return r.getUint8Array(e, a);
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
			default: B(`Invalid tiff type ${e}`);
		}
	}
}, cr = class extends sr {
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
		this.findIfd0Offset(), this.ifd0Offset < 8 && B("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && B(`IFD0 offset points to outside of file.\nthis.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, Cn(this.options));
		let t = this.parseBlock(this.ifd0Offset, "ifd0");
		return t.size === 0 ? void 0 : (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t);
	}
	async parseExifBlock() {
		if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
		this.file.tiff && await this.file.ensureChunk(this.exifOffset, Cn(this.options));
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
		return e && e.has(2) && e.has(4) && (e.set("latitude", lr(...e.get(2), e.get(1))), e.set("longitude", lr(...e.get(4), e.get(3)))), e;
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
		for (t of U) if (e = this[t], !Sn(e)) {
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
function lr(e, t, n, r) {
	var i = e + t / 60 + n / 3600;
	return r !== "S" && r !== "W" || (i *= -1), i;
}
z(cr, "type", "tiff"), z(cr, "headerLength", 10), V.set("tiff", cr), Object.freeze({
	__proto__: null,
	default: tr,
	Exifr: $n,
	fileParsers: kn,
	segmentParsers: V,
	fileReaders: An,
	tagKeys: Bn,
	tagValues: Vn,
	tagRevivers: Hn,
	createDictionary: Rn,
	extendDictionary: zn,
	fetchUrlAsArrayBuffer: Fn,
	readBlobAsArrayBuffer: In,
	chunkedProps: H,
	otherSegments: Un,
	segments: Wn,
	tiffBlocks: U,
	segmentsAndBlocks: W,
	tiffExtractables: G,
	inheritables: Gn,
	allFormatters: K,
	Options: Yn,
	parse: er
});
var ur = {
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
Object.assign({}, ur, {
	firstChunkSize: 4e4,
	gps: [
		1,
		2,
		3,
		4
	]
}), Object.assign({}, ur, {
	tiff: !1,
	ifd1: !0,
	mergeOutput: !1
});
var dr = Object.assign({}, ur, {
	firstChunkSize: 4e4,
	ifd0: [274]
});
async function fr(e) {
	let t = new $n(dr);
	await t.read(e);
	let n = await t.parse();
	if (n && n.ifd0) return n.ifd0[274];
}
var pr = Object.freeze({
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
}), mr = !0, Y = !0;
if (typeof navigator == "object") {
	let e = navigator.userAgent;
	if (e.includes("iPad") || e.includes("iPhone")) {
		let t = e.match(/OS (\d+)_(\d+)/);
		if (t) {
			let [, e, n] = t;
			mr = Number(e) + .1 * Number(n) < 13.4, Y = !1;
		}
	} else if (e.includes("OS X 10")) {
		let [, t] = e.match(/OS X 10[_.](\d+)/);
		mr = Y = Number(t) < 15;
	}
	if (e.includes("Chrome/")) {
		let [, t] = e.match(/Chrome\/(\d+)/);
		mr = Y = Number(t) < 81;
	} else if (e.includes("Firefox/")) {
		let [, t] = e.match(/Firefox\/(\d+)/);
		mr = Y = Number(t) < 77;
	}
}
async function hr(e) {
	let t = await fr(e);
	return Object.assign({
		canvas: mr,
		css: Y
	}, pr[t]);
}
var gr = class extends En {
	constructor(...e) {
		super(...e), z(this, "ranges", new _r()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
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
		t = bn ? yn.allocUnsafe(e) : new Uint8Array(e);
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
}, _r = class {
	constructor() {
		z(this, "list", []);
	}
	get length() {
		return this.list.length;
	}
	add(e, t, n = 0) {
		let r = e + t, i = this.list.filter(((t) => vr(e, t.offset, r) || vr(e, t.end, r)));
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
function vr(e, t, n) {
	return e <= t && t <= n;
}
var yr = class extends gr {
	constructor(e, t) {
		super(0), z(this, "chunksRead", 0), this.input = e, this.options = t;
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
An.set("blob", class extends yr {
	async readWhole() {
		this.chunked = !1;
		let e = await In(this.input);
		this._swapArrayBuffer(e);
	}
	readChunked() {
		return this.chunked = !0, this.size = this.input.size, super.readChunked();
	}
	async _readChunk(e, t) {
		let n = t ? e + t : void 0, r = await In(this.input.slice(e, n));
		return this.set(r, e, !0);
	}
});
var br = {
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
}, xr = { strings: { generatingThumbnails: "Generating thumbnails..." } };
//#endregion
//#region node_modules/@uppy/thumbnail-generator/lib/index.js
function Sr(e, t, n) {
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
	}) : Promise.resolve().then(() => T(e.toDataURL(t, n), {})).then((e) => {
		if (e === null) throw Error("could not extract blob, probably an old browser");
		return e;
	});
}
function Cr(e, t) {
	let n = e.width, r = e.height;
	(t.deg === 90 || t.deg === 270) && (n = e.height, r = e.width);
	let i = document.createElement("canvas");
	i.width = n, i.height = r;
	let a = i.getContext("2d");
	return a.translate(n / 2, r / 2), t.canvas && (a.rotate(t.rad), a.scale(t.scaleX, t.scaleY)), a.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), i;
}
function wr(e) {
	let t = e.width / e.height, n = 5e6, r = 4096, i = Math.floor(Math.sqrt(n * t)), a = Math.floor(n / Math.sqrt(n * t));
	if (i > r && (i = r, a = Math.round(i / t)), a > r && (a = r, i = Math.round(t * a)), e.width > i) {
		let t = document.createElement("canvas");
		return t.width = i, t.height = a, t.getContext("2d").drawImage(e, 0, 0, i, a), t;
	}
	return e;
}
var Tr = {
	thumbnailWidth: null,
	thumbnailHeight: null,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	lazy: !1
}, Er = class extends m {
	static VERSION = br.version;
	queue;
	queueProcessing;
	defaultThumbnailDimension;
	thumbnailType;
	constructor(e, t) {
		if (super(e, {
			...Tr,
			...t
		}), this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType, this.defaultLocale = xr, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) throw Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
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
		}), a = hr(e.data).catch(() => 1);
		return Promise.all([i, a]).then(([e, r]) => {
			let i = this.getProportionalDimensions(e, t, n, r.deg), a = Cr(e, r);
			return Sr(this.resizeImage(a, i.width, i.height), this.thumbnailType, 80);
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
		let r = wr(e), i = Math.ceil(Math.log2(r.width / t));
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
		return me(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t) => {
			this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t);
		}).catch((t) => {
			this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t);
		}) : Promise.resolve();
	}
	onFileAdded = (e) => {
		!e.preview && e.data && me(e.type) && !e.isRemote && this.addToQueue(e.id);
	};
	onCancelRequest = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1);
	};
	onFileRemoved = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1), e.preview && pe(e.preview) && URL.revokeObjectURL(e.preview);
	};
	onRestored = () => {
		this.uppy.getFiles().filter((e) => e.isRestored).forEach((e) => {
			(!e.preview || pe(e.preview)) && this.addToQueue(e.id);
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
}, Dr = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", Or = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += Dr[Math.random() * 64 | 0];
	return t;
}, kr = {
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
}, Ar = class extends c {
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
	renderHiddenInput = (e, t) => f("input", {
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
		return f("input", {
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
	renderMyDeviceAcquirer = () => {
		let e = this.props.fileManagerSelectionType === "folders" ? this.triggerFolderInputClick : this.triggerFileInputClick;
		return f("div", {
			className: "uppy-DashboardTab",
			role: "presentation",
			"data-uppy-acquirer-id": "MyDevice",
			children: f("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
				role: "tab",
				tabIndex: 0,
				"data-uppy-super-focusable": !0,
				onClick: e,
				children: [f("div", {
					className: "uppy-DashboardTab-inner",
					children: f("svg", {
						className: "uppy-DashboardTab-iconMyDevice",
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32",
						children: f("path", {
							d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
							fill: "currentcolor",
							"fill-rule": "evenodd"
						})
					})
				}), f("div", {
					className: "uppy-DashboardTab-name",
					children: this.props.i18n("myDevice")
				})]
			})
		});
	};
	renderPhotoCamera = () => f("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobilePhotoCamera",
		children: f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerPhotoCameraInputClick,
			children: [f("div", {
				className: "uppy-DashboardTab-inner",
				children: f("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: f("path", {
						d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
						fill: "#02B383",
						"fill-rule": "nonzero"
					})
				})
			}), f("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("takePictureBtn")
			})]
		})
	});
	renderVideoCamera = () => f("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobileVideoCamera",
		children: f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerVideoCameraInputClick,
			children: [f("div", {
				className: "uppy-DashboardTab-inner",
				children: f("svg", {
					"aria-hidden": "true",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: f("path", {
						fill: "#FF675E",
						fillRule: "nonzero",
						d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
					})
				})
			}), f("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("recordVideoBtn")
			})]
		})
	});
	renderBrowseButton = (e, t) => {
		let n = this.props.acquirers.length;
		return f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
			onClick: t,
			"data-uppy-super-focusable": n === 0,
			children: e
		});
	};
	renderDropPasteBrowseTagline = (e) => {
		let t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick), n = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick), r = this.props.fileManagerSelectionType, i = r.charAt(0).toUpperCase() + r.slice(1);
		return f("div", {
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
	renderAcquirer = (e) => f("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": e.id,
		children: f("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-cy": e.id,
			"aria-controls": `uppy-DashboardContent-panel--${e.id}`,
			"aria-selected": this.props.activePickerPanel?.id === e.id,
			"data-uppy-super-focusable": !0,
			onClick: () => this.props.showPanel(e.id),
			children: [f("div", {
				className: "uppy-DashboardTab-inner",
				children: e.icon()
			}), f("div", {
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
		return f(p, { children: [this.renderDropPasteBrowseTagline(i.length), f("div", {
			className: "uppy-Dashboard-AddFiles-list",
			role: "tablist",
			children: [o.map(({ key: e, elements: t }) => f(p, { children: t }, e)), f("span", {
				role: "presentation",
				style: { "white-space": "nowrap" },
				children: s.map(({ key: e, elements: t }) => f(p, { children: t }, e))
			})]
		})] });
	};
	renderPoweredByUppy() {
		let { i18nArray: e } = this.props, t = e("poweredBy", { uppy: f("span", { children: [f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
			width: "11",
			height: "11",
			viewBox: "0 0 11 11",
			children: f("path", {
				d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
				fillRule: "evenodd"
			})
		}), f("span", {
			className: "uppy-Dashboard-poweredByUppy",
			children: "Uppy"
		})] }) });
		return f("a", {
			tabIndex: -1,
			href: "https://uppy.io",
			rel: "noreferrer noopener",
			target: "_blank",
			className: "uppy-Dashboard-poweredBy",
			children: t
		});
	}
	render() {
		let { showNativePhotoCameraButton: e, showNativeVideoCameraButton: t, nativeCameraFacingMode: n } = this.props;
		return f("div", {
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
				f("div", {
					className: "uppy-Dashboard-AddFiles-info",
					children: [this.props.note && f("div", {
						className: "uppy-Dashboard-note",
						children: this.props.note
					}), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()]
				})
			]
		});
	}
}, jr = (e) => f("div", {
	className: (0, L.default)("uppy-Dashboard-AddFilesPanel", e.className),
	"data-uppy-panelType": "AddFiles",
	"aria-hidden": !e.showAddFilesPanel,
	children: [f("div", {
		className: "uppy-DashboardContent-bar",
		children: [f("div", {
			className: "uppy-DashboardContent-title",
			role: "heading",
			"aria-level": 1,
			children: e.i18n("addingMoreFiles")
		}), f("button", {
			className: "uppy-DashboardContent-back",
			type: "button",
			onClick: () => e.toggleAddFilesPanel(!1),
			children: e.i18n("back")
		})]
	}), f(Ar, { ...e })]
});
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/EditorPanel.js
function Mr(e) {
	let t = e.fileCardFor ? e.files[e.fileCardFor] : void 0;
	return t ? f("div", {
		className: (0, L.default)("uppy-DashboardContent-panel", e.className),
		role: "tabpanel",
		"data-uppy-panelType": "FileEditor",
		id: "uppy-DashboardContent-panel--editor",
		children: [f("div", {
			className: "uppy-DashboardContent-bar",
			children: [
				f("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": 1,
					children: e.i18nArray("editing", { file: f("span", {
						className: "uppy-DashboardContent-titleFile",
						children: t.meta ? t.meta.name : t.name
					}) })
				}),
				f("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: () => {
						e.uppy.emit("file-editor:cancel", t), e.closeFileEditor();
					},
					children: e.i18n("cancel")
				}),
				f("button", {
					className: "uppy-DashboardContent-save",
					type: "button",
					onClick: e.saveFileEditor,
					children: e.i18n("save")
				})
			]
		}), f("div", {
			className: "uppy-DashboardContent-panelBody",
			children: e.editors.map((t) => e.uppy.getPlugin(t.id).render(e.state))
		})]
	}) : null;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/getFileTypeIcon.js
function Nr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("g", {
			fill: "#686DE0",
			fillRule: "evenodd",
			children: [
				f("path", {
					d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
					fillRule: "nonzero"
				}),
				f("path", {
					d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
					fillRule: "nonzero"
				}),
				f("circle", {
					cx: "7.5",
					cy: "9.5",
					r: "1.5"
				})
			]
		})
	});
}
function Pr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("path", {
			d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
			fill: "#049BCF",
			fillRule: "nonzero"
		})
	});
}
function Fr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("path", {
			d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
			fill: "#19AF67",
			fillRule: "nonzero"
		})
	});
}
function Ir() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("path", {
			d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
			fill: "#E2514A",
			fillRule: "nonzero"
		})
	});
}
function Lr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("path", {
			d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
			fill: "#00C469",
			fillRule: "nonzero"
		})
	});
}
function Rr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("g", {
			fill: "#A7AFB7",
			fillRule: "nonzero",
			children: [f("path", { d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z" }), f("path", { d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z" })]
		})
	});
}
function zr() {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: f("path", {
			d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
			fill: "#5A5E69",
			fillRule: "nonzero"
		})
	});
}
function Br(e) {
	let t = {
		color: "#838999",
		icon: Rr()
	};
	if (!e) return t;
	let n = e.split("/")[0], r = e.split("/")[1];
	return n === "text" ? {
		color: "#5a5e69",
		icon: zr()
	} : n === "image" ? {
		color: "#686de0",
		icon: Nr()
	} : n === "audio" ? {
		color: "#068dbb",
		icon: Pr()
	} : n === "video" ? {
		color: "#19af67",
		icon: Fr()
	} : n === "application" && r === "pdf" ? {
		color: "#e25149",
		icon: Ir()
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
		icon: Lr()
	} : t;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/ignoreEvent.js
function X(e) {
	let { tagName: t } = e.target;
	if (t === "INPUT" || t === "TEXTAREA") {
		e.stopPropagation();
		return;
	}
	e.preventDefault(), e.stopPropagation();
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FilePreview.js
function Vr(e) {
	let { file: t } = e;
	if (t.preview) return f("img", {
		draggable: !1,
		className: "uppy-Dashboard-Item-previewImg",
		alt: t.name,
		src: t.preview
	});
	let { color: n, icon: r } = Br(t.type);
	return f("div", {
		className: "uppy-Dashboard-Item-previewIconWrap",
		children: [f("span", {
			className: "uppy-Dashboard-Item-previewIcon",
			style: { color: n },
			children: r
		}), f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-Dashboard-Item-previewIconBg",
			width: "58",
			height: "76",
			viewBox: "0 0 58 76",
			children: f("rect", {
				fill: "#FFF",
				width: "58",
				height: "76",
				rx: "3",
				fillRule: "evenodd"
			})
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileCard/RenderMetaFields.js
function Hr(e) {
	let { computedMetaFields: t, requiredMetaFields: n, updateMeta: r, form: i, formState: a } = e, o = { text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input" };
	return t.map((e) => {
		let t = `uppy-Dashboard-FileCard-input-${e.id}`, s = n.includes(e.id);
		return f("fieldset", {
			className: "uppy-Dashboard-FileCard-fieldset",
			children: [f("label", {
				className: "uppy-Dashboard-FileCard-label",
				htmlFor: t,
				children: e.name
			}), e.render === void 0 ? f("input", {
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
			}, l)]
		}, e.id);
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileCard/index.js
function Ur(e) {
	let { files: t, fileCardFor: n, toggleFileCard: r, saveFileCard: i, metaFields: a, requiredMetaFields: o, openFileEditor: s, i18n: c, i18nArray: l, className: u, canEditFile: d } = e, p = () => typeof a == "function" ? a(t[n]) : a, m = t[n], h = p() ?? [], g = d(m), _ = {};
	h.forEach((e) => {
		_[e.id] = m.meta[e.id] ?? "";
	});
	let [y, x] = v(_), w = S((e) => {
		e.preventDefault(), i(y, n);
	}, [
		i,
		y,
		n
	]), T = (e, t) => {
		x({
			...y,
			[t]: e
		});
	}, E = () => {
		r(!1, n);
	}, [D] = v(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = Or(), e;
	}), O = C(null);
	return b(() => {
		let e = O.current?.getRootNode() ?? document;
		return e instanceof Document ? e.body.appendChild(D) : (e instanceof ShadowRoot, e.appendChild(D)), D.addEventListener("submit", w), () => {
			D.removeEventListener("submit", w), D.parentNode && D.parentNode.removeChild(D);
		};
	}, [D, w]), f("div", {
		className: (0, L.default)("uppy-Dashboard-FileCard", u),
		"data-uppy-panelType": "FileCard",
		onDragOver: X,
		onDragLeave: X,
		onDrop: X,
		onPaste: X,
		ref: O,
		children: [f("div", {
			className: "uppy-DashboardContent-bar",
			children: [f("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: l("editing", { file: f("span", {
					className: "uppy-DashboardContent-titleFile",
					children: m.meta ? m.meta.name : m.name
				}) })
			}), f("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				form: D.id,
				title: c("finishEditingFile"),
				onClick: E,
				children: c("cancel")
			})]
		}), f("div", {
			className: "uppy-Dashboard-FileCard-inner",
			children: [
				f("div", {
					className: "uppy-Dashboard-FileCard-preview",
					style: { backgroundColor: Br(m.type).color },
					children: [f(Vr, { file: m }), g && f("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
						onClick: (e) => {
							w(e), s(m);
						},
						children: c("editImage")
					})]
				}),
				f("div", {
					className: "uppy-Dashboard-FileCard-info",
					children: f(Hr, {
						computedMetaFields: h,
						requiredMetaFields: o,
						updateMeta: T,
						form: D,
						formState: y
					})
				}),
				f("div", {
					className: "uppy-Dashboard-FileCard-actions",
					children: [f("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
						type: "submit",
						form: D.id,
						children: c("saveChanges")
					}), f("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
						type: "button",
						onClick: E,
						form: D.id,
						children: c("cancel")
					})]
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/shallow-equal/dist/index.modern.mjs
function Wr(e, t) {
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
function Gr(e, t = "Copy the URL below") {
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
function Kr({ file: e, uploadInProgressOrComplete: t, metaFields: n, canEditFile: r, i18n: i, onClick: a }) {
	return !t && n && n.length > 0 || !t && r(e) ? f("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
		type: "button",
		"aria-label": i("editFileWithFilename", { file: e.meta.name }),
		title: i("editFileWithFilename", { file: e.meta.name }),
		onClick: () => a(),
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 14",
			children: f("g", {
				fillRule: "evenodd",
				children: [
					f("path", {
						d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
						fillRule: "nonzero"
					}),
					f("rect", {
						x: "1",
						y: "12.293",
						width: "11",
						height: "1",
						rx: ".5"
					}),
					f("path", {
						fillRule: "nonzero",
						d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
					})
				]
			})
		})
	}) : null;
}
function qr({ i18n: e, onClick: t, file: n }) {
	return f("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
		type: "button",
		"aria-label": e("removeFile", { file: n.meta.name }),
		title: e("removeFile", { file: n.meta.name }),
		onClick: () => t(),
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "18",
			height: "18",
			viewBox: "0 0 18 18",
			children: [f("path", { d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z" }), f("path", {
				fill: "#FFF",
				d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
			})]
		})
	});
}
function Jr({ file: e, uppy: t, i18n: n }) {
	let r = (r) => {
		let { currentTarget: i } = r;
		Gr(e.uploadURL, n("copyLinkToClipboardFallback")).then(() => {
			t.log("Link copied to clipboard."), t.info(n("copyLinkToClipboardSuccess"), "info", 3e3);
		}).catch(t.log).then(() => i.focus({ preventScroll: !0 }));
	};
	return f("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
		type: "button",
		"aria-label": n("copyLink"),
		title: n("copyLink"),
		onClick: (e) => r(e),
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 12",
			children: f("path", { d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z" })
		})
	});
}
function Yr(e) {
	let { uppy: t, file: n, uploadInProgressOrComplete: r, canEditFile: i, metaFields: a, showLinkToFileUploadResult: o, showRemoveButton: s, i18n: c, toggleFileCard: l, openFileEditor: u } = e;
	return f("div", {
		className: "uppy-Dashboard-Item-actionWrapper",
		children: [
			f(Kr, {
				i18n: c,
				file: n,
				uploadInProgressOrComplete: r,
				canEditFile: i,
				metaFields: a,
				onClick: () => {
					a && a.length > 0 ? l(!0, n.id) : u(n);
				}
			}),
			o && n.uploadURL ? f(Jr, {
				file: n,
				uppy: t,
				i18n: c
			}) : null,
			s ? f(qr, {
				i18n: c,
				file: n,
				onClick: () => t.removeFile(n.id)
			}) : null
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
function Xr(e, t, n) {
	return (typeof t == "function" ? t(n) : t)?.find((t) => t.id === e)?.name ?? e;
}
function Zr(e) {
	let { file: t, toggleFileCard: n, i18n: r, metaFields: i } = e, { missingRequiredMetaFields: a } = t;
	if (!a?.length) return null;
	let o = a.map((e) => Xr(e, i, t)).join(", ");
	return f("div", {
		className: "uppy-Dashboard-Item-errorMessage",
		children: [
			r("missingRequiredMetaFields", {
				smart_count: a.length,
				fields: o
			}),
			" ",
			f("button", {
				type: "button",
				class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
				onClick: () => n(!0, t.id),
				children: r("editFile")
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
var Qr = (e) => {
	let { author: t, name: n } = e.file.meta;
	function r() {
		return e.isSingleFile && e.containerHeight >= 350 ? 90 : e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : t ? 20 : 30;
	}
	return f("div", {
		className: "uppy-Dashboard-Item-name",
		title: n,
		children: ye(n, r())
	});
}, $r = (e) => {
	let { author: t } = e.file.meta, n = "remote" in e.file ? e.file.remote?.providerName : void 0;
	return t ? f("div", {
		className: "uppy-Dashboard-Item-author",
		children: [f("a", {
			href: `${t.url}?utm_source=Companion&utm_medium=referral`,
			target: "_blank",
			rel: "noopener noreferrer",
			children: ye(t.name, 13)
		}), n ? f(p, { children: [
			" · ",
			n,
			" · "
		] }) : null]
	}) : null;
}, ei = (e) => e.file.size && f("div", {
	className: "uppy-Dashboard-Item-statusSize",
	children: F(e.file.size)
}), ti = (e) => e.file.isGhost && f("span", { children: [" • ", f("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
	type: "button",
	onClick: () => e.toggleAddFilesPanel(!0),
	children: e.i18n("reSelect")
})] }), ni = ({ file: e, onClick: t }) => e.error ? f("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
	"aria-label": e.error,
	"data-microtip-position": "bottom",
	"data-microtip-size": "medium",
	onClick: t,
	type: "button",
	children: "?"
}) : null;
function ri(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, toggleAddFilesPanel: a, isSingleFile: o, containerHeight: s, containerWidth: c } = e;
	return f("div", {
		className: "uppy-Dashboard-Item-fileInfo",
		"data-uppy-file-source": t.source,
		children: [
			f("div", {
				className: "uppy-Dashboard-Item-fileName",
				children: [Qr({
					file: t,
					isSingleFile: o,
					containerHeight: s,
					containerWidth: c
				}), f(ni, {
					file: t,
					onClick: () => alert(t.error)
				})]
			}),
			f("div", {
				className: "uppy-Dashboard-Item-status",
				children: [
					$r({ file: t }),
					ei({ file: t }),
					ti({
						file: t,
						toggleAddFilesPanel: a,
						i18n: n
					})
				]
			}),
			f(Zr, {
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
function ii(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, showLinkToFileUploadResult: a } = e, o = t.preview ? "rgba(255, 255, 255, 0.5)" : Br(t.type).color;
	return f("div", {
		className: "uppy-Dashboard-Item-previewInnerWrap",
		style: { backgroundColor: o },
		children: [
			a && t.uploadURL && f("a", {
				className: "uppy-Dashboard-Item-previewLink",
				href: t.uploadURL,
				rel: "noreferrer noopener",
				target: "_blank",
				"aria-label": t.meta.name,
				children: f("span", {
					hidden: !0,
					children: t.meta.name
				})
			}),
			f(Vr, { file: t }),
			f(Zr, {
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
function ai(e) {
	if (!e.isUploaded) {
		if (e.error && !e.hideRetryButton) {
			e.uppy.retryUpload(e.file.id);
			return;
		}
		e.resumableUploads && !e.hidePauseResumeButton ? e.uppy.pauseResume(e.file.id) : e.individualCancellation && !e.hideCancelButton && e.uppy.removeFile(e.file.id);
	}
}
function oi(e) {
	return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : "";
}
function si(e) {
	return f("div", {
		className: "uppy-Dashboard-Item-progress",
		children: f("button", {
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
			type: "button",
			"aria-label": oi(e),
			title: oi(e),
			onClick: () => ai(e),
			children: e.children
		})
	});
}
function ci({ children: e }) {
	return f("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "70",
		height: "70",
		viewBox: "0 0 36 36",
		className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle",
		children: e
	});
}
function li({ progress: e }) {
	let t = 2 * Math.PI * 15;
	return f("g", { children: [f("circle", {
		className: "uppy-Dashboard-Item-progressIcon--bg",
		r: "15",
		cx: "18",
		cy: "18",
		"stroke-width": "2",
		fill: "none"
	}), f("circle", {
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
function ui(e) {
	return !e.file.progress.uploadStarted || e.file.progress.percentage === void 0 ? null : e.isUploaded ? f("div", {
		className: "uppy-Dashboard-Item-progress",
		children: f("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: f(ci, { children: [f("circle", {
				r: "15",
				cx: "18",
				cy: "18",
				fill: "#1bb240"
			}), f("polygon", {
				className: "uppy-Dashboard-Item-progressIcon--check",
				transform: "translate(2, 3)",
				points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
			})] })
		})
	}) : e.recoveredState ? null : e.error && !e.hideRetryButton ? f(si, {
		...e,
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
			width: "28",
			height: "31",
			viewBox: "0 0 16 19",
			children: [
				f("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }),
				f("path", { d: "M7.9 3H10v2H7.9z" }),
				f("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }),
				f("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })
			]
		})
	}) : e.resumableUploads && !e.hidePauseResumeButton ? f(si, {
		...e,
		children: f(ci, { children: [f(li, { progress: e.file.progress.percentage }), e.file.isPaused ? f("polygon", {
			className: "uppy-Dashboard-Item-progressIcon--play",
			transform: "translate(3, 3)",
			points: "12 20 12 10 20 15"
		}) : f("g", {
			className: "uppy-Dashboard-Item-progressIcon--pause",
			transform: "translate(14.5, 13)",
			children: [f("rect", {
				x: "0",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			}), f("rect", {
				x: "5",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			})]
		})] })
	}) : !e.resumableUploads && e.individualCancellation && !e.hideCancelButton ? f(si, {
		...e,
		children: f(ci, { children: [f(li, { progress: e.file.progress.percentage }), f("polygon", {
			className: "cancel",
			transform: "translate(2, 2)",
			points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
		})] })
	}) : f("div", {
		className: "uppy-Dashboard-Item-progress",
		children: f("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: f(ci, { children: f(li, { progress: e.file.progress.percentage }) })
		})
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/index.js
var di = class extends c {
	componentDidMount() {
		let { file: e } = this.props;
		e.preview || this.props.handleRequestThumbnail(e);
	}
	shouldComponentUpdate(e) {
		return !Wr(this.props, e);
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
		n && this.props.showRemoveButtonAfterComplete && (s = !0);
		let c = (0, L.default)({
			"uppy-Dashboard-Item": !0,
			"is-inprogress": i && !this.props.recoveredState,
			"is-processing": t,
			"is-complete": n,
			"is-error": !!a,
			"is-resumable": this.props.resumableUploads,
			"is-noIndividualCancellation": !this.props.individualCancellation,
			"is-ghost": o
		});
		return f("div", {
			className: c,
			id: `uppy_${e.id}`,
			role: this.props.role,
			children: [f("div", {
				className: "uppy-Dashboard-Item-preview",
				children: [f(ii, {
					file: e,
					showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
					i18n: this.props.i18n,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields
				}), f(ui, {
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
			}), f("div", {
				className: "uppy-Dashboard-Item-fileInfoAndButtons",
				children: [f(ri, {
					file: e,
					containerWidth: this.props.containerWidth,
					containerHeight: this.props.containerHeight,
					i18n: this.props.i18n,
					toggleAddFilesPanel: this.props.toggleAddFilesPanel,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields,
					isSingleFile: this.props.isSingleFile
				}), f(Yr, {
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
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileList.js
function fi(e, t) {
	let n = [], r = [];
	return e.forEach((e) => {
		r.length < t ? r.push(e) : (n.push(r), r = [e]);
	}), r.length && n.push(r), n;
}
function pi({ id: e, i18n: t, uppy: n, files: r, resumableUploads: i, hideRetryButton: a, hidePauseResumeButton: o, hideCancelButton: s, showLinkToFileUploadResult: c, showRemoveButtonAfterComplete: l, metaFields: u, isSingleFile: d, toggleFileCard: p, handleRequestThumbnail: m, handleCancelThumbnail: h, recoveredState: g, individualCancellation: _, itemsPerRow: v, openFileEditor: b, canEditFile: x, toggleAddFilesPanel: S, containerWidth: C, containerHeight: w }) {
	let T = v === 1 ? 71 : 200, E = y(() => {
		let e = (e, t) => Number(r[t].isGhost) - Number(r[e].isGhost), t = Object.keys(r);
		return g && t.sort(e), fi(t, v);
	}, [
		r,
		v,
		g
	]), D = (v) => f("div", {
		class: "uppy-Dashboard-filesInner",
		role: "presentation",
		children: v.map((v) => f(di, {
			uppy: n,
			id: e,
			i18n: t,
			resumableUploads: i,
			individualCancellation: _,
			hideRetryButton: a,
			hidePauseResumeButton: o,
			hideCancelButton: s,
			showLinkToFileUploadResult: c,
			showRemoveButtonAfterComplete: l,
			metaFields: u,
			recoveredState: g,
			isSingleFile: d,
			containerWidth: C,
			containerHeight: w,
			toggleFileCard: p,
			handleRequestThumbnail: m,
			handleCancelThumbnail: h,
			role: "listitem",
			openFileEditor: b,
			canEditFile: x,
			toggleAddFilesPanel: S,
			file: r[v]
		}, v))
	}, v[0]);
	return d ? f("div", {
		class: "uppy-Dashboard-files",
		children: D(E[0])
	}) : f(Se, {
		class: "uppy-Dashboard-files",
		role: "list",
		data: E,
		renderRow: D,
		rowHeight: T
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/FadeIn.js
var mi = 300, hi = class extends c {
	ref = d();
	componentWillEnter(e) {
		this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, mi);
	}
	componentWillLeave(e) {
		this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, mi);
	}
	render() {
		let { children: e } = this.props;
		return f("div", {
			className: "uppy-Informer-animated",
			ref: this.ref,
			children: e
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/TransitionGroup.js
function gi(e, t) {
	return Object.assign(e, t);
}
function _i(e, t) {
	return e?.key ?? t;
}
function vi(e, t) {
	let n = e._ptgLinkedRefs ||= {};
	return n[t] || (n[t] = (n) => {
		e.refs[t] = n;
	});
}
function yi(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) if (e[n] != null) {
		let r = _i(e[n], n.toString(36));
		t[r] = e[n];
	}
	return t;
}
function bi(e, t) {
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
var xi = (e) => e, Si = class extends c {
	constructor(e, t) {
		super(e, t), this.refs = {}, this.state = { children: yi(i(i(this.props.children)) || []) }, this.performAppear = this.performAppear.bind(this), this.performEnter = this.performEnter.bind(this), this.performLeave = this.performLeave.bind(this);
	}
	componentWillMount() {
		this.currentlyTransitioningKeys = {}, this.keysToAbortLeave = [], this.keysToEnter = [], this.keysToLeave = [];
	}
	componentDidMount() {
		let e = this.state.children;
		for (let t in e) e[t] && this.performAppear(t);
	}
	componentWillReceiveProps(e) {
		let t = yi(i(e.children) || []), n = this.state.children;
		this.setState((e) => ({ children: bi(e.children, t) }));
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
		let n = yi(i(this.props.children) || []);
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
		let n = yi(i(this.props.children) || []);
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
		let n = yi(i(this.props.children) || []);
		if (n && Object.hasOwn(n, e)) this.performEnter(e);
		else {
			let t = gi({}, this.state.children);
			delete t[e], this.setState({ children: t });
		}
	}
	render({ childFactory: e, transitionLeave: t, transitionName: n, transitionAppear: r, transitionEnter: i, transitionLeaveTimeout: o, transitionEnterTimeout: s, transitionAppearTimeout: c, component: u, ...d }, { children: f }) {
		let p = Object.entries(f).map(([t, n]) => {
			if (!n) return;
			let r = vi(this, t);
			return a(e(n), {
				ref: r,
				key: t
			});
		}).filter(Boolean);
		return l(u, d, p);
	}
};
Si.defaultProps = {
	component: "span",
	childFactory: xi
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/Informer.js
var Ci = class extends c {
	render() {
		let { info: e } = this.props.uppy.getState();
		return f("div", {
			className: "uppy uppy-Informer",
			children: f(Si, { children: e.map((e) => f(hi, { children: f("p", {
				role: "alert",
				children: [
					e.message,
					" ",
					e.details && f("span", {
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
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
function wi({ activePickerPanel: e, className: t, hideAllPanels: n, i18n: r, state: i, uppy: a }) {
	let o = C(null), s = a.getPlugin(e.id), c = !!s?.opts.standalone, l = (e) => {
		let t = e.target;
		return !!s?.acceptsFileDrops && !!e.dataTransfer?.types.includes("Files") && t.closest("input, textarea, dialog") == null;
	}, u = (e) => {
		l(e) || (X(e), e.type === "dragover" && e.defaultPrevented && e.dataTransfer && (e.dataTransfer.dropEffect = "none"));
	};
	return f("div", {
		className: (0, L.default)("uppy-DashboardContent-panel", t),
		role: "tabpanel",
		"data-uppy-panelType": "PickerPanel",
		id: `uppy-DashboardContent-panel--${e.id}`,
		onDragOver: u,
		onDragLeave: u,
		onDrop: u,
		onPaste: X,
		children: [!c && f("div", {
			className: "uppy-DashboardContent-bar",
			children: [f("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: r("importFrom", { name: e.name })
			}), f("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: n,
				children: r("cancel")
			})]
		}), f("div", {
			ref: o,
			className: "uppy-DashboardContent-panelBody",
			children: s?.render(i, o.current)
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/PickerPanelTopBar.js
var Z = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete",
	STATE_PAUSED: "paused"
};
function Ti(e, t, n, r = {}) {
	if (e) return Z.STATE_ERROR;
	if (t) return Z.STATE_COMPLETE;
	if (n) return Z.STATE_PAUSED;
	let i = Z.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return Z.STATE_UPLOADING;
		t.preprocess && (i = Z.STATE_PREPROCESSING), t.postprocess && i !== Z.STATE_PREPROCESSING && (i = Z.STATE_POSTPROCESSING);
	}
	return i;
}
function Ei({ files: e, i18n: t, isAllComplete: n, isAllErrored: r, isAllPaused: i, inProgressNotPausedFiles: a, newFiles: o, processingFiles: s }) {
	switch (Ti(r, n, i, e)) {
		case "uploading": return t("uploadingXFiles", { smart_count: a.length });
		case "preprocessing":
		case "postprocessing": return t("processingXFiles", { smart_count: s.length });
		case "paused": return t("uploadPaused");
		case "waiting": return t("xFilesSelected", { smart_count: o.length });
		case "complete": return t("uploadComplete");
		case "error": return t("error");
	}
}
function Di(e) {
	let { i18n: t, isAllComplete: n, hideCancelButton: r, maxNumberOfFiles: i, toggleAddFilesPanel: a, totalFileCount: o, uppy: s } = e, { allowNewUpload: c } = e;
	return c && i && (c = o < i), f("div", {
		className: "uppy-DashboardContent-bar",
		children: [
			!n && !r ? f("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: () => s.cancelAll(),
				children: t("cancel")
			}) : f("div", {}),
			f("div", {
				className: "uppy-DashboardContent-title",
				children: f(Ei, { ...e })
			}),
			c ? f("button", {
				className: "uppy-DashboardContent-addMore",
				type: "button",
				"aria-label": t("addMoreFiles"),
				title: t("addMoreFiles"),
				onClick: () => a(!0),
				children: [f("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					children: f("path", { d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z" })
				}), f("span", {
					className: "uppy-DashboardContent-addMoreCaption",
					children: t("addMore")
				})]
			}) : f("div", {})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Slide.js
var Q = "uppy-transition-slideDownUp", Oi = 250;
function ki({ children: e }) {
	let [t, n] = v(null), [r, o] = v(""), s = C(), c = C(), l = C(), u = S(() => {
		o(`${Q}-enter`), cancelAnimationFrame(l.current), clearTimeout(c.current), c.current = void 0, l.current = requestAnimationFrame(() => {
			o(`${Q}-enter ${Q}-enter-active`), s.current = setTimeout(() => {
				o("");
			}, Oi);
		});
	}, []), d = S(() => {
		o(`${Q}-leave`), cancelAnimationFrame(l.current), clearTimeout(s.current), s.current = void 0, l.current = requestAnimationFrame(() => {
			o(`${Q}-leave ${Q}-leave-active`), c.current = setTimeout(() => {
				n(null), o("");
			}, Oi);
		});
	}, []);
	return b(() => {
		let r = i(e)[0];
		t !== r && (r && !t ? u() : t && !r && !c.current && d(), n(r));
	}, [
		e,
		t,
		u,
		d
	]), b(() => () => {
		clearTimeout(s.current), clearTimeout(c.current), cancelAnimationFrame(l.current);
	}, []), t ? a(t, { className: (0, L.default)(r, t.props.className) }) : null;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBarStates.js
var $ = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete"
}, Ai = "·", ji = () => ` ${Ai} `;
function Mi(e) {
	let { newFiles: t, isUploadStarted: n, recoveredState: r, i18n: i, uploadState: a, isSomeGhost: o, startUpload: s } = e, c = (0, L.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", { "uppy-c-btn-primary": a === $.STATE_WAITING }, { "uppy-StatusBar-actionBtn--disabled": o }), l = i(t && n && !r ? "uploadXNewFiles" : "uploadXFiles", { smart_count: t });
	return f("button", {
		type: "button",
		className: c,
		"aria-label": i("uploadXFiles", { smart_count: t }),
		onClick: s,
		disabled: o,
		"data-uppy-super-focusable": !0,
		children: l
	});
}
function Ni(e) {
	let { i18n: t, uppy: n } = e;
	return f("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
		"aria-label": t("retryUpload"),
		onClick: () => n.retryAll().catch(() => {}),
		"data-uppy-super-focusable": !0,
		"data-cy": "retry",
		children: [f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "8",
			height: "10",
			viewBox: "0 0 8 10",
			children: f("path", { d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z" })
		}), t("retry")]
	});
}
function Pi(e) {
	let { i18n: t, uppy: n } = e;
	return f("button", {
		type: "button",
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		title: t("cancel"),
		"aria-label": t("cancel"),
		onClick: () => n.cancelAll(),
		"data-cy": "cancel",
		"data-uppy-super-focusable": !0,
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: f("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [f("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), f("path", {
					fill: "#FFF",
					d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
				})]
			})
		})
	});
}
function Fi(e) {
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
	return f("button", {
		title: o,
		"aria-label": o,
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		type: "button",
		onClick: s,
		"data-cy": "togglePauseResume",
		"data-uppy-super-focusable": !0,
		children: f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: f("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [f("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), f("path", {
					fill: "#FFF",
					d: t ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
				})]
			})
		})
	});
}
function Ii(e) {
	let { i18n: t, doneButtonHandler: n } = e;
	return f("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: t("done")
	});
}
function Li() {
	return f("svg", {
		className: "uppy-StatusBar-spinner",
		"aria-hidden": "true",
		focusable: "false",
		width: "14",
		height: "14",
		children: f("path", {
			d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
			fillRule: "evenodd"
		})
	});
}
function Ri(e) {
	let { progress: t } = e, { value: n, mode: r, message: i } = t;
	return f("div", {
		className: "uppy-StatusBar-content",
		children: [
			f(Li, {}),
			r === "determinate" ? `${Math.round(n * 100)}% · ` : "",
			i
		]
	});
}
function zi(e) {
	let { numUploads: t, complete: n, totalUploadedSize: r, totalSize: i, totalETA: a, i18n: o } = e, s = t > 1, c = F(r);
	return f("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [s && o("filesUploadedOfTotal", {
			complete: n,
			smart_count: t
		}), f("span", {
			className: "uppy-StatusBar-additionalInfo",
			children: [
				s && ji(),
				i == null ? o("dataUploadedOfUnknown", { complete: c }) : o("dataUploadedOfTotal", {
					complete: c,
					total: F(i)
				}),
				ji(),
				a != null && o("xTimeLeft", { time: ge(a) })
			]
		})]
	});
}
function Bi(e) {
	let { i18n: t, complete: n, numUploads: r } = e;
	return f("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: t("filesUploadedOfTotal", {
			complete: n,
			smart_count: r
		})
	});
}
function Vi(e) {
	let { i18n: t, newFiles: n, startUpload: r } = e, i = (0, L.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
	return f("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [f("div", {
			className: "uppy-StatusBar-statusSecondaryHint",
			children: t("xMoreFilesAdded", { smart_count: n })
		}), f("button", {
			type: "button",
			className: i,
			"aria-label": t("uploadXFiles", { smart_count: n }),
			onClick: r,
			children: t("upload")
		})]
	});
}
function Hi(e) {
	let { i18n: t, supportsUploadProgress: n, totalProgress: r, hideProgressDetails: i, isUploadStarted: a, isAllComplete: o, isAllPaused: s, newFiles: c, numUploads: l, complete: u, totalUploadedSize: d, totalSize: p, totalETA: m, startUpload: h } = e, g = c && a;
	if (!a || o) return null;
	let _ = t(s ? "paused" : "uploading");
	function v() {
		return !s && !g && !i ? n ? f(zi, {
			numUploads: l,
			complete: u,
			totalUploadedSize: d,
			totalSize: p,
			totalETA: m,
			i18n: t
		}) : f(Bi, {
			i18n: t,
			complete: u,
			numUploads: l
		}) : null;
	}
	return f("div", {
		className: "uppy-StatusBar-content",
		title: _,
		children: [s ? null : f(Li, {}), f("div", {
			className: "uppy-StatusBar-status",
			children: [
				f("div", {
					className: "uppy-StatusBar-statusPrimary",
					children: n && r !== 0 ? `${_}: ${r}%` : _
				}),
				v(),
				g ? f(Vi, {
					i18n: t,
					newFiles: c,
					startUpload: h
				}) : null
			]
		})]
	});
}
function Ui(e) {
	let { i18n: t } = e;
	return f("div", {
		className: "uppy-StatusBar-content",
		role: "status",
		title: t("complete"),
		children: f("div", {
			className: "uppy-StatusBar-status",
			children: f("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [f("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-StatusBar-statusIndicator uppy-c-icon",
					width: "15",
					height: "11",
					viewBox: "0 0 15 11",
					children: f("path", { d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z" })
				}), t("complete")]
			})
		})
	});
}
function Wi(e) {
	let { error: t, i18n: n, complete: r, numUploads: i } = e;
	function a() {
		let e = `${n("uploadFailed")} \n\n ${t}`;
		alert(e);
	}
	return f("div", {
		className: "uppy-StatusBar-content",
		title: n("uploadFailed"),
		children: [f("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-StatusBar-statusIndicator uppy-c-icon",
			width: "11",
			height: "11",
			viewBox: "0 0 11 11",
			children: f("path", { d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z" })
		}), f("div", {
			className: "uppy-StatusBar-status",
			children: [f("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [n("uploadFailed"), f("button", {
					className: "uppy-u-reset uppy-StatusBar-details",
					"aria-label": n("showErrorDetails"),
					"data-microtip-position": "top-right",
					"data-microtip-size": "medium",
					onClick: a,
					type: "button",
					children: "?"
				})]
			}), f(Bi, {
				i18n: n,
				complete: r,
				numUploads: i
			})]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/calculateProcessingProgress.js
function Gi(e) {
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
var { STATE_ERROR: Ki, STATE_WAITING: qi, STATE_PREPROCESSING: Ji, STATE_UPLOADING: Yi, STATE_POSTPROCESSING: Xi, STATE_COMPLETE: Zi } = $;
function Qi({ newFiles: e, allowNewUpload: t, isUploadInProgress: n, isAllPaused: r, resumableUploads: i, error: a, hideUploadButton: o = void 0, hidePauseResumeButton: s = !1, hideCancelButton: c = !1, hideRetryButton: l = !1, recoveredState: u, uploadState: d, totalProgress: p, files: m, supportsUploadProgress: h, hideAfterFinish: g = !1, isSomeGhost: _, doneButtonHandler: v = void 0, isUploadStarted: y, i18n: b, startUpload: x, uppy: S, isAllComplete: C, hideProgressDetails: w = void 0, numUploads: T, complete: E, totalSize: D, totalETA: O, totalUploadedSize: ee }) {
	function te() {
		switch (d) {
			case Xi:
			case Ji: {
				let e = Gi(m);
				return e.mode === "determinate" ? e.value * 100 : p;
			}
			case Ki: return null;
			case Yi: return h ? p : null;
			default: return p;
		}
	}
	function ne() {
		switch (d) {
			case Xi:
			case Ji: {
				let { mode: e } = Gi(m);
				return e === "indeterminate";
			}
			case Yi: return !h;
			default: return !1;
		}
	}
	let re = te(), k = re ?? 100, A = !a && e && (!n && !r || u) && t && !o, j = !c && d !== qi && d !== Zi, M = i && !s && d === Yi, N = a && !C && !l, P = v && d === Zi, ie = (0, L.default)("uppy-StatusBar-progress", { "is-indeterminate": ne() }), ae = (0, L.default)("uppy-StatusBar", `is-${d}`, { "has-ghosts": _ }), oe = (() => {
		switch (d) {
			case Ji:
			case Xi: return f(Ri, { progress: Gi(m) });
			case Zi: return f(Ui, { i18n: b });
			case Ki: return f(Wi, {
				error: a,
				i18n: b,
				numUploads: T,
				complete: E
			});
			case Yi: return f(Hi, {
				i18n: b,
				supportsUploadProgress: h,
				totalProgress: p,
				hideProgressDetails: w,
				isUploadStarted: y,
				isAllComplete: C,
				isAllPaused: r,
				newFiles: e,
				numUploads: T,
				complete: E,
				totalUploadedSize: ee,
				totalSize: D,
				totalETA: O,
				startUpload: x
			});
			default: return null;
		}
	})();
	return !(A || N || M || j || P) && !oe || d === Zi && g ? null : f("div", {
		className: ae,
		children: [
			f("div", {
				className: ie,
				style: { width: `${k}%` },
				role: "progressbar",
				"aria-label": `${k}%`,
				"aria-valuetext": `${k}%`,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": re
			}),
			oe,
			f("div", {
				className: "uppy-StatusBar-actions",
				children: [
					A ? f(Mi, {
						newFiles: e,
						isUploadStarted: y,
						recoveredState: u,
						i18n: b,
						isSomeGhost: _,
						startUpload: x,
						uploadState: d
					}) : null,
					N ? f(Ni, {
						i18n: b,
						uppy: S
					}) : null,
					M ? f(Fi, {
						isAllPaused: r,
						i18n: b,
						isAllComplete: C,
						resumableUploads: i,
						uppy: S
					}) : null,
					j ? f(Pi, {
						i18n: b,
						uppy: S
					}) : null,
					P ? f(Ii, {
						i18n: b,
						doneButtonHandler: v
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBar.js
var $i = 2e3, ea = 2e3;
function ta(e, t, n, r) {
	if (e) return $.STATE_ERROR;
	if (t) return $.STATE_COMPLETE;
	if (n) return $.STATE_WAITING;
	let i = $.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return $.STATE_UPLOADING;
		t.preprocess && (i = $.STATE_PREPROCESSING), t.postprocess && i !== $.STATE_PREPROCESSING && (i = $.STATE_POSTPROCESSING);
	}
	return i;
}
var na = class extends c {
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
		let a = this.#n == null ? i : D(i, this.#n, $i, n);
		if (!Number.isFinite(a) || a <= 0) return null;
		this.#n = a;
		let o = t / a;
		if (!Number.isFinite(o) || o < 0) return null;
		let s = Math.max((this.#r ?? 0) - n, 0), c = this.#r == null ? o : D(o, s, ea, n);
		return !Number.isFinite(c) || c < 0 ? null : (this.#r = c, this.#e = performance.now(), Math.round(c / 100) / 10);
	}
	startUpload = () => {
		let { recoveredState: e } = this.props.uppy.getState();
		e ? this.props.uppy.emit("restore-confirmed") : this.props.uppy.upload().catch((() => {}));
	};
	render() {
		let { capabilities: e, files: t, allowNewUpload: n, totalProgress: r, error: i, recoveredState: a } = this.props.uppy.getState(), { newFiles: o, startedFiles: s, completeFiles: c, isUploadStarted: l, isAllComplete: u, isAllPaused: d, isUploadInProgress: p, isSomeGhost: m } = this.props.uppy.getObjectOfFilesPerState(), h = a ? Object.values(t) : o, g = !!e.resumableUploads, _ = e.uploadProgress !== !1, v = null, y = 0;
		s.every((e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0) ? (v = 0, s.forEach((e) => {
			v += e.progress.bytesTotal || 0, y += e.progress.bytesUploaded || 0;
		})) : s.forEach((e) => {
			y += e.progress.bytesUploaded || 0;
		});
		let b = this.#a({
			uploaded: y,
			total: v
		});
		return f(Qi, {
			error: i,
			uploadState: ta(i, u, a, t || {}),
			allowNewUpload: n,
			totalProgress: r,
			totalSize: v,
			totalUploadedSize: y,
			isAllComplete: u,
			isAllPaused: d,
			isUploadStarted: l,
			isUploadInProgress: p,
			isSomeGhost: m,
			recoveredState: a,
			complete: c.length,
			newFiles: h.length,
			numUploads: s.length,
			totalETA: b,
			files: t,
			i18n: this.props.i18n,
			uppy: this.props.uppy,
			startUpload: this.startUpload,
			doneButtonHandler: this.props.doneButtonHandler,
			resumableUploads: g,
			supportsUploadProgress: _,
			hideProgressDetails: this.props.hideProgressDetails,
			hideUploadButton: this.props.hideUploadButton,
			hideRetryButton: this.props.hideRetryButton,
			hidePauseResumeButton: this.props.hidePauseResumeButton,
			hideCancelButton: this.props.hideCancelButton,
			hideAfterFinish: this.props.hideAfterFinish
		});
	}
}, ra = 900, ia = 700, aa = 576, oa = 330;
function sa(e) {
	let { activePickerPanel: t, fileCardFor: n } = e, r = e.totalFileCount === 0, i = e.totalFileCount === 1, a = e.containerHeight > oa, o = (0, L.default)({
		"uppy-Dashboard": !0,
		"uppy-Dashboard--isDisabled": e.disabled,
		"uppy-Dashboard--animateOpenClose": e.animateOpenClose,
		"uppy-Dashboard--isClosing": e.isClosing,
		"uppy-Dashboard--isDraggingOver": e.isDraggingOver,
		"uppy-Dashboard--modal": !e.inline,
		"uppy-size--md": e.containerWidth > aa,
		"uppy-size--lg": e.containerWidth > ia,
		"uppy-size--xl": e.containerWidth > ra,
		"uppy-size--height-md": e.containerHeight > oa,
		"uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel,
		"uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible,
		"uppy-Dashboard--singleFile": e.singleFileFullScreen && i && a
	}), s = 1;
	e.containerWidth > ra ? s = 5 : e.containerWidth > ia ? s = 4 : e.containerWidth > aa && (s = 3);
	let c = e.showSelectedFiles && !r, l = e.recoveredState ? Object.keys(e.recoveredState.files).length : null, u = e.files ? Object.keys(e.files).filter((t) => e.files[t].isGhost).length : 0, d = () => u > 0 ? e.i18n("recoveredXFiles", { smart_count: u }) : e.i18n("recoveredAllFiles");
	return f("div", {
		className: o,
		"data-uppy-theme": e.theme,
		"data-uppy-num-acquirers": e.acquirers.length,
		"data-uppy-drag-drop-supported": !e.disableLocalFiles && fe(),
		"aria-hidden": e.inline ? "false" : e.isHidden,
		"aria-disabled": e.disabled,
		"aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
		onPaste: e.handlePaste,
		onDragOver: e.handleDragOver,
		onDragLeave: e.handleDragLeave,
		onDrop: e.handleDrop,
		children: [f("div", {
			"aria-hidden": "true",
			className: "uppy-Dashboard-overlay",
			tabIndex: -1,
			onClick: e.handleClickOutside
		}), f("div", {
			className: "uppy-Dashboard-inner",
			role: e.inline ? void 0 : "dialog",
			style: {
				width: e.inline && e.width ? e.width : "",
				height: e.inline && e.height ? e.height : ""
			},
			children: [e.inline ? null : f("button", {
				className: "uppy-u-reset uppy-Dashboard-close",
				type: "button",
				"aria-label": e.i18n("closeModal"),
				title: e.i18n("closeModal"),
				onClick: e.closeModal,
				children: f("span", {
					"aria-hidden": "true",
					children: "×"
				})
			}), f("div", {
				className: "uppy-Dashboard-innerWrap",
				children: [
					f("div", {
						className: "uppy-Dashboard-dropFilesHereHint",
						children: e.i18n("dropHint")
					}),
					c && f(Di, { ...e }),
					l != null && l > 0 && f("div", {
						className: "uppy-Dashboard-serviceMsg",
						children: [
							f("svg", {
								className: "uppy-Dashboard-serviceMsg-icon",
								"aria-hidden": "true",
								focusable: "false",
								width: "21",
								height: "16",
								viewBox: "0 0 24 19",
								children: f("g", {
									transform: "translate(0 -1)",
									fill: "none",
									fillRule: "evenodd",
									children: [
										f("path", {
											d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
											fill: "#FFD300"
										}),
										f("path", {
											fill: "#000",
											d: "M11 6h2l-.3 8h-1.4z"
										}),
										f("circle", {
											fill: "#000",
											cx: "12",
											cy: "17",
											r: "1"
										})
									]
								})
							}),
							f("strong", {
								className: "uppy-Dashboard-serviceMsg-title",
								children: e.i18n("sessionRestored")
							}),
							f("div", {
								className: "uppy-Dashboard-serviceMsg-text",
								children: d()
							})
						]
					}),
					c ? f(pi, {
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
					}) : f(Ar, {
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
					f(ki, { children: e.showAddFilesPanel ? f(jr, { ...e }, "AddFiles") : null }),
					f(ki, { children: n ? f(Ur, {
						...e,
						fileCardFor: n
					}, "FileCard") : null }),
					f(ki, { children: t ? f(wi, {
						...e,
						activePickerPanel: t
					}, "Picker") : null }),
					f(ki, { children: e.showFileEditor ? f(Mr, { ...e }, "Editor") : null }),
					f("div", {
						className: "uppy-Dashboard-progressindicators",
						children: [
							!e.disableInformer && f(Ci, { uppy: e.uppy }),
							!e.disableStatusBar && f(na, {
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
							!e.disableInformer && f(Ci, { uppy: e.uppy }),
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
var ca = { strings: {
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
function la(e, t) {
	if (t) {
		let n = e.querySelector(`[data-uppy-paneltype="${t}"]`);
		if (n) return n;
	}
	return e;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/createSuperFocus.js
function ua() {
	let e = !1;
	return (0, dn.default)((t, n) => {
		let r = la(t, n), i = r.contains(document.activeElement);
		if (i && e) return;
		let a = r.querySelector("[data-uppy-super-focusable]");
		(!i || a) && (a ? (a.focus({ preventScroll: !0 }), e = !0) : (r.querySelector(O.join(","))?.focus({ preventScroll: !0 }), e = !1));
	}, 260);
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/trapFocus.js
function da(e, t) {
	let n = t[0];
	n && (n.focus(), e.preventDefault());
}
function fa(e, t) {
	let n = t[t.length - 1];
	n && (n.focus(), e.preventDefault());
}
function pa(e) {
	return e.contains(document.activeElement);
}
function ma(e, t, n) {
	let r = la(n, t), i = N(r.querySelectorAll(O.join(","))), a = i.indexOf(document.activeElement);
	pa(r) ? e.shiftKey && a === 0 ? fa(e, i) : !e.shiftKey && a === i.length - 1 && da(e, i) : da(e, i);
}
function ha(e, t, n) {
	t === null || ma(e, t, n);
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/Dashboard.js
var ga = 9, _a = 27;
function va() {
	let e = {};
	return e.promise = new Promise((t, n) => {
		e.resolve = t, e.reject = n;
	}), e;
}
var ya = {
	target: "body",
	metaFields: [],
	thumbnailWidth: 280,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	defaultPickerIcon: fn,
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
}, ba = class extends m {
	static VERSION = kr.version;
	#e;
	modalName = `uppy-Dashboard-${Or()}`;
	superFocus = ua();
	ifFocusedOnUppyRecently = !1;
	dashboardIsDisabled;
	savedActiveElement;
	resizeObserver;
	darkModeMediaQuery;
	makeDashboardInsidesVisibleAnywayTimeout;
	constructor(e, t) {
		let n = t?.autoOpen ?? null;
		super(e, {
			...ya,
			...t,
			autoOpen: n
		}), this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.defaultLocale = ca, this.opts.doneButtonHandler === void 0 && (this.opts.doneButtonHandler = () => {
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
		let { promise: e, resolve: t } = va();
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
		let { promise: i, resolve: a } = va();
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
		let t = this.#e ?? N(this.el.querySelectorAll([
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
		e.keyCode === _a && this.requestCloseModal(), e.keyCode === ga && ma(e, this.getPluginState().activeOverlayType, this.el);
	};
	handleClickOutside = () => {
		this.opts.closeModalOnClickOutside && this.requestCloseModal();
	};
	handlePaste = (e) => {
		this.uppy.iteratePlugins((t) => {
			t.type === "acquirer" && t.handleRootPaste?.(e);
		});
		let t = N(e.clipboardData.files);
		t.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(t));
	};
	handleInputChange = (e) => {
		e.preventDefault();
		let t = N(e.currentTarget.files || []);
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
		let r = await ce(e.dataTransfer, { logDropError: n });
		r.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(r)), this.opts.onDrop(e);
	};
	handleRequestThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", e);
	};
	handleCancelThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", e);
	};
	handleKeyDownInInline = (e) => {
		e.keyCode === ga && ha(e, this.getPluginState().activeOverlayType, this.el);
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
			let e = ee(this.opts.trigger);
			e ? e.forEach((e) => {
				e.addEventListener("click", this.openModal);
			}) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
		}
		this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-added", this.#u), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), this.uppy.on("files-added", this.#t), this.uppy.on("file-removed", this.#t), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.on("files-added", this.#n);
	};
	removeEvents = () => {
		let e = ee(this.opts.trigger);
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
		].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), sa({
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
		i && this.mount(i, this), this.opts.disableThumbnailGenerator || this.uppy.use(Er, {
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
}, xa = 3, Sa = 4, Ca = class extends Error {}, wa = class extends Error {}, Ta = class extends u {
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
			if (this.isInPieces(t) ? await this.uploadInPieces(e, t) : await this.uploadThroughLivewire(e), !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
				status: 200,
				body: {}
			});
		} catch (t) {
			if (t instanceof wa || !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-error", this.uppy.getFile(e.id), t);
		}
	}
	plan(e) {
		return this.opts.planUsing({
			name: e.name,
			size: e.size,
			type: e.type ?? "",
			lastModified: e.data.lastModified ?? 0
		});
	}
	isInPieces(e) {
		return e.strategy === "chunked" || e.strategy === "s3";
	}
	uploadThroughLivewire(e) {
		return new Promise((t, n) => {
			this.opts.uploadUsing(e.meta.fileKey, e.data instanceof File && e.data.name === e.name ? e.data : new File([e.data], e.name, { type: e.type }), t, () => n(this.failure()), (t) => this.reportProgress(e, e.size * t / 100));
		});
	}
	async uploadInPieces(e, t) {
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
					r = t.strategy === "s3" ? await this.sendParts(e, t, n) : await this.sendChunks(e, t, n);
				} catch (i) {
					if (!(i instanceof Ca) && i.status !== 401) throw i;
					for (; n.isPaused && !n.isCancelled;) await new Promise((e) => n.resume = e);
					if (n.isCancelled) throw new wa();
					if (t = await this.plan(e), !this.isInPieces(t)) throw this.failure(t.message);
					r = t.completed;
				}
			}
			if (!await this.opts.adoptUsing(e.meta.fileKey, r)) throw this.failure();
		} finally {
			this.transfers.delete(e.id);
		}
	}
	async sendPieces(e, { missing: t, sizeOf: n, arrived: r, send: i }) {
		let a = /* @__PURE__ */ new Map(), o = [...t], s = () => this.reportProgress(e, [...r].reduce((e, t) => e + n(t), 0) + [...a.values()].reduce((e, t) => e + t, 0));
		s(), await Promise.all(Array.from({ length: xa }, async () => {
			for (; o.length;) {
				let e = o.shift(), t = await i(e, o, (t) => {
					a.set(e, t), s();
				});
				a.delete(e), r.add(e), s(), t && (o.length = 0);
			}
		}));
	}
	async sendChunks(e, t, n) {
		let r = new Set(t.receivedChunks), i = (n) => e.data.slice(n * t.chunkSize, Math.min(e.size, (n + 1) * t.chunkSize)), a = (r, a) => {
			let o = new FormData();
			return o.append("capability", t.capability), o.append("index", r), o.append("name", e.name), o.append("type", e.type ?? ""), o.append("chunk", i(r), e.name), this.attempt(n, () => this.request(n, {
				method: "POST",
				url: t.url,
				headers: {
					Accept: "application/json",
					"X-CSRF-TOKEN": this.opts.csrfToken
				},
				body: o,
				onProgress: a
			}));
		}, o = null, s = t.totalChunks - 1;
		await this.sendPieces(e, {
			missing: this.range(0, t.totalChunks - 1).filter((e) => !r.has(e)),
			sizeOf: (e) => i(e).size,
			arrived: r,
			send: async (e, t, n) => {
				s = e;
				let r = await a(e, n);
				return o = r?.complete ? r.reference : o, !!o;
			}
		});
		for (let e = 0; !o && e < Sa; e++) {
			await this.wait(1e3 * (e + 1));
			let t = await a(s, () => {});
			o = t?.complete ? t.reference : null;
		}
		if (!o) throw this.failure();
		return o;
	}
	async sendParts(e, t, n) {
		let r = new Set(t.uploadedParts), i = /* @__PURE__ */ new Map(), a = (n) => e.data.slice((n - 1) * t.partSize, Math.min(e.size, n * t.partSize)), o = null, s = async (e, n) => {
			if (await o, i.has(e) || (o = this.opts.signPartsUsing(t.capability, [e, ...n.slice(0, 9)]).then((e) => Object.entries(e ?? {}).forEach(([e, t]) => i.set(Number(e), t))).finally(() => o = null), await o), !i.has(e)) throw this.failure();
			let r = i.get(e);
			return i.delete(e), r;
		};
		await this.sendPieces(e, {
			missing: this.range(1, t.totalParts).filter((e) => !r.has(e)),
			sizeOf: (e) => a(e).size,
			arrived: r,
			send: async (e, t, r) => (await this.attempt(n, async () => this.request(n, {
				method: "PUT",
				url: await s(e, t),
				body: a(e),
				onProgress: r
			}), { retryForbidden: !0 }), !1)
		});
		let c = await this.opts.completeUsing(t.capability);
		if (!c) throw this.failure();
		return c;
	}
	async attempt(e, t, { retryForbidden: n = !1 } = {}) {
		for (let r = 1;; r++) {
			if (e.isCancelled) throw new wa();
			if (e.isPaused) throw new Ca();
			try {
				return await t();
			} catch (e) {
				if (e instanceof Ca || e instanceof wa || !(!e.status || n && e.status === 403 || e.status === 429 || e.status >= 500) || r === Sa) throw e;
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
			}), c.addEventListener("error", () => l(this.failure())), c.addEventListener("abort", () => l(e.isCancelled ? new wa() : new Ca())), c.send(i);
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
	reportProgress(e, t) {
		let n = this.uppy.getFile(e.id);
		n && this.uppy.emit("upload-progress", n, {
			uploadStarted: n.progress.uploadStarted ?? Date.now(),
			bytesUploaded: Math.min(t, e.size),
			bytesTotal: e.size
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
}, Ea = (e, t) => Math.abs(e - t) < .01;
async function Da(e, { aspectRatios: t, fixedAspectRatio: n }) {
	let { default: r } = await import("../fluppy-lib-CKSx7XHo.js"), i = (e) => !n && (!t.length || t.some((t) => Ea(t, e)));
	e.use(r, {
		actions: {
			cropSquare: i(1),
			cropWidescreen: i(16 / 9),
			cropWidescreenVertical: i(9 / 16)
		},
		cropperOptions: n ? { aspectRatio: n } : {}
	});
}
function Oa(e, t) {
	return !!(t.progress.uploadComplete && e.getPlugin("ImageEditor")?.canEditFile(t));
}
//#endregion
//#region resources/js/item-actions.js
var ka = {
	download: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z\"/><path d=\"M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z\"/></svg>",
	edit: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z\"/></svg>"
};
function Aa(e, t, n) {
	let r = () => {
		t.querySelectorAll(".uppy-Dashboard-Item").forEach((t) => {
			let r = e.getFile(t.id.replace(/^uppy_/, "")), a = t.querySelector(".uppy-Dashboard-Item-actionWrapper");
			if (!r || !a) return;
			let o = n(r), s = o.map(({ name: e, href: t }) => `${e}:${t ?? ""}`).join("|"), c = [...a.querySelectorAll("[data-fluppy-action]")];
			(a.dataset.fluppyActions !== s || c.length !== o.length) && (c.forEach((e) => e.remove()), a.dataset.fluppyActions = s, a.prepend(...o.map((e) => i(e, r))));
		});
	}, i = ({ name: e, label: t, href: n, onClick: r }, i) => {
		let a = document.createElement(n ? "a" : "button");
		return a.className = "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit", a.dataset.fluppyAction = e, a.title = t, a.setAttribute("aria-label", t), a.innerHTML = ka[e], n ? (a.href = n, a.download = i.name, a.target = "_blank", a.rel = "noopener noreferrer") : (a.type = "button", a.addEventListener("click", () => r(i.id))), a;
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
//#region resources/js/locale.js
var ja = Object.fromEntries(Object.entries(/* #__PURE__ */ Object.assign({
	"../../node_modules/@uppy/locales/lib/ar_SA.js": () => import("../fluppy-ar_SA-CQZhzxTe.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/az_AZ.js": () => import("../fluppy-az_AZ-DB1xAzP0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/bg_BG.js": () => import("../fluppy-bg_BG-ClXXsxcL.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ca_ES.js": () => import("../fluppy-ca_ES-ZPSb7vJZ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/cs_CZ.js": () => import("../fluppy-cs_CZ-Dsg97WQz.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/da_DK.js": () => import("../fluppy-da_DK-OaLjfu4E.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/de_DE.js": () => import("../fluppy-de_DE-H_i9ctOT.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/el_GR.js": () => import("../fluppy-el_GR-6ne9Osl3.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_ES.js": () => import("../fluppy-es_ES-BCbT0y0-.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_MX.js": () => import("../fluppy-es_MX-BSIBOj7u.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fa_IR.js": () => import("../fluppy-fa_IR-DAvzeluH.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fi_FI.js": () => import("../fluppy-fi_FI-0J0wsJwt.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fr_FR.js": () => import("../fluppy-fr_FR-ONUiN_EA.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/gl_ES.js": () => import("../fluppy-gl_ES-BGQclE6M.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/he_IL.js": () => import("../fluppy-he_IL-DLrc5R85.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hi_IN.js": () => import("../fluppy-hi_IN-C4jaKbK6.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hr_HR.js": () => import("../fluppy-hr_HR-CMT5zhTQ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hu_HU.js": () => import("../fluppy-hu_HU-sDS4h4T0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/id_ID.js": () => import("../fluppy-id_ID-By4kfpsR.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/is_IS.js": () => import("../fluppy-is_IS-Zi5-Epc_.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/it_IT.js": () => import("../fluppy-it_IT-BkxaTd6-.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ja_JP.js": () => import("../fluppy-ja_JP-DihuvdDM.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ko_KR.js": () => import("../fluppy-ko_KR-DLVOMz2B.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/mn_MN.js": () => import("../fluppy-mn_MN-DwbFk0s0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ms_MY.js": () => import("../fluppy-ms_MY-D-2AIZDL.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nb_NO.js": () => import("../fluppy-nb_NO-Da_zpiNU.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nl_NL.js": () => import("../fluppy-nl_NL-DPVrpXDH.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nn_NO.js": () => import("../fluppy-nn_NO-BQ5qQCQ3.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pl_PL.js": () => import("../fluppy-pl_PL-BVOi6Vjd.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_BR.js": () => import("../fluppy-pt_BR-DbkW6VJf.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_PT.js": () => import("../fluppy-pt_PT-DuJd6bQp.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ro_RO.js": () => import("../fluppy-ro_RO-BcV4_VVm.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ru_RU.js": () => import("../fluppy-ru_RU-XByOQ53A.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sk_SK.js": () => import("../fluppy-sk_SK-C_AuHbUQ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Cyrillic.js": () => import("../fluppy-sr_RS_Cyrillic-BNlMwayO.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Latin.js": () => import("../fluppy-sr_RS_Latin-C5bMypPr.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sv_SE.js": () => import("../fluppy-sv_SE-CL6PD6-v.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/th_TH.js": () => import("../fluppy-th_TH-5x4-DvEu.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/tr_TR.js": () => import("../fluppy-tr_TR-DIexgnUB.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uk_UA.js": () => import("../fluppy-uk_UA-pKYMXHm1.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uz_UZ.js": () => import("../fluppy-uz_UZ-DNdWw7Bl.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/vi_VN.js": () => import("../fluppy-vi_VN-CRXFH0mz.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_CN.js": () => import("../fluppy-zh_CN-GAVY8KdU.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_TW.js": () => import("../fluppy-zh_TW-DUEsd-Z_.js").then((e) => e.default)
})).map(([e, t]) => [e.split("/").pop().slice(0, -3), t]));
function Ma(e) {
	let [t, ...n] = String(e ?? "").toLowerCase().replace(/-/g, "_").split("_"), r = Object.keys(ja).filter((e) => e.toLowerCase().startsWith(`${t}_`));
	return r.find((e) => n.some((t) => e.toLowerCase().includes(`_${t.slice(0, 3)}`))) ?? r[0] ?? null;
}
async function Na(e) {
	let t = Ma(e);
	return t ? await ja[t]() : null;
}
//#endregion
//#region resources/js/sources.js
var Pa = {
	camera: () => import("../fluppy-lib-CNdrJVl1.js"),
	microphone: () => import("../fluppy-lib-BVk_BzRn.js"),
	screenCapture: () => import("../fluppy-lib-DuQ2dm8L.js")
}, Fa = (e, t) => !!e?.length && e.every((e) => e.startsWith(`${t}/`));
async function Ia(e, t, { acceptedFileTypes: n }) {
	for (let r of t.filter((e) => e in Pa)) {
		let { default: t } = await Pa[r]();
		e.use(t, r === "camera" && Fa(n, "image") ? { modes: ["picture"] } : r === "camera" && Fa(n, "video") ? { modes: ["video-audio"] } : {});
	}
}
//#endregion
//#region resources/js/index.js
function La() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e) => (e ^ crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
}
function Ra({ abortMultipartUploadUsing: e, acceptedFileTypes: t, adoptUploadUsing: n, cancelUploadUsing: r, completeMultipartUploadUsing: i, csrfToken: a, deleteUploadedFileUsing: o, downloadLabel: s, editLabel: c, getUploadedFilesUsing: l, imageEditor: u, isChunked: d, isDeletable: f, isDisabled: p, isDownloadable: m, isMultiple: h, isOpenable: g, isPreviewable: _, isReorderable: v, locale: y, maxFiles: b, maxParallelUploads: x, maxSize: S, minSize: C, placeUploadedFileUsing: w, planUploadUsing: T, removeUploadedFileUsing: E, reorderUploadedFilesUsing: D, signUploadPartsUsing: O, sources: ee, state: te, uploadFailedMessage: ne, uploadingMessage: re, uploadUsing: k }) {
	let A = null, j = null, M = null, N = /* @__PURE__ */ new Map(), P = null;
	return {
		state: te,
		isRemovingSilently: !1,
		async init() {
			let l = await Na(y);
			A = new nt({
				autoProceed: !0,
				...l ? { locale: l } : {},
				restrictions: {
					allowedFileTypes: t?.length ? t : null,
					maxFileSize: S,
					maxNumberOfFiles: h ? b : 1,
					minFileSize: C
				}
			}).use(ba, {
				target: this.$refs.dashboard,
				inline: !0,
				width: "100%",
				height: 320,
				disabled: p,
				hideUploadButton: !0,
				hideCancelButton: !0,
				doneButtonHandler: null,
				showRemoveButtonAfterComplete: f && !p,
				showLinkToFileUploadResult: g,
				disableThumbnailGenerator: !_,
				proudlyDisplayPoweredByUppy: !1,
				theme: this.getTheme()
			}).use(Ta, {
				abortUsing: e,
				adoptUsing: n,
				cancelUploadUsing: r,
				completeUsing: i,
				signPartsUsing: O,
				csrfToken: a,
				isChunked: d,
				planUsing: T,
				maxParallelUploads: x ?? 2,
				uploadFailedMessage: ne,
				uploadUsing: k
			}), p || await Ia(A, ee ?? [], { acceptedFileTypes: t }), A.on("file-added", (e) => {
				A.setFileMeta(e.id, { fileKey: La() });
			}), A.on("file-removed", (e) => {
				A.getFiles().some((e) => e.error) || A.setState({ error: null }), !this.isRemovingSilently && e.meta.fileKey && (this.isStoredFile(e.meta.fileKey) ? o(e.meta.fileKey) : E(e.meta.fileKey));
			}), A.on("upload", () => {
				this.dispatchFormEvent("form-processing-started", { message: re });
			}), A.on("complete", () => {
				this.dispatchFormEvent("form-processing-finished"), v && !p && this.saveFileOrder();
			}), v && !p && this.enableReordering(), u && !p && (await Da(A, u), A.on("file-editor:complete", (e) => this.replaceFile(e)), A.on("upload-success", (e) => {
				N.has(e.id) && (w(e.meta.fileKey, N.get(e.id)), N.delete(e.id));
			})), M = Aa(A, this.$refs.dashboard, (e) => [...Oa(A, e) && !p ? [{
				name: "edit",
				label: c,
				onClick: (e) => this.editFile(e)
			}] : [], ...e.meta.downloadUrl ? [{
				name: "download",
				label: s,
				href: e.meta.downloadUrl
			}] : []]), P = () => A.getPlugin("Dashboard").setOptions({ theme: this.getTheme() }), window.addEventListener("theme-changed", P), await this.syncFiles(), this.$watch("state", () => this.syncFiles());
		},
		destroy() {
			window.removeEventListener("theme-changed", P), j?.disconnect(), M?.(), this.isRemovingSilently = !0, A?.destroy();
		},
		getUppy() {
			return A;
		},
		async editFile(e) {
			let t = A.getFile(e);
			if (t.source === "Fluppy" && t.data.size === 0) try {
				let n = await fetch(t.meta.url);
				if (!n.ok) throw Error(n.statusText);
				A.setFileState(e, { data: await n.blob() });
			} catch {
				A.info(ne, "error");
				return;
			}
			A.getPlugin("Dashboard").openFileEditor(A.getFile(e));
		},
		replaceFile(e) {
			let t = Object.keys(A.getState().files).indexOf(e.id);
			A.removeFile(e.id);
			let n = e.type.split("/")[1].replace("jpeg", "jpg"), r = A.addFile({
				name: /\.\w+$/.test(e.name) ? e.name : `${e.name}.${n}`,
				type: e.type,
				data: e.data,
				source: "ImageEditor"
			}), { files: i } = A.getState(), a = Object.keys(i).filter((e) => e !== r);
			a.splice(t, 0, r), A.setState({ files: Object.fromEntries(a.map((e) => [e, i[e]])) });
			let o = a[t + 1];
			o && N.set(r, i[o].meta.fileKey);
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
			let e = this.getFileKeysInState(), t = A.getFiles();
			this.isRemovingSilently = !0, t.filter((t) => t.progress.uploadComplete && !e.includes(t.meta.fileKey)).forEach((e) => A.removeFile(e.id)), this.isRemovingSilently = !1;
			let n = A.getFiles().map((e) => e.meta.fileKey);
			if (e.every((e) => n.includes(e))) return;
			let r = await l() ?? {};
			Object.entries(r).filter(([e, t]) => t && !n.includes(e)).forEach(([e, t]) => this.showStoredFile(e, t)), A.getFiles().every((e) => e.progress.uploadComplete) && A.setState({ totalProgress: 100 });
		},
		showStoredFile(e, { name: t, size: n, type: r, url: i, openableUrl: a, downloadableUrl: o }) {
			let s = `fluppy-${e}`;
			A.setState({ files: {
				...A.getState().files,
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
						downloadUrl: m ? o ?? i : null
					},
					source: "Fluppy",
					isRemote: !1,
					isGhost: !1,
					preview: _ && r?.startsWith("image/") ? i : void 0,
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
			let e = this.$refs.dashboard, t = (e) => e.target.closest?.(".uppy-Dashboard-Item"), n = (e) => e.id.replace(/^uppy_/, ""), r = null, i = null, a = (e) => {
				i?.removeAttribute("data-fluppy-drop-target"), i = e, i?.setAttribute("data-fluppy-drop-target", "");
			};
			j = new MutationObserver(() => {
				e.querySelectorAll(".uppy-Dashboard-Item:not([draggable])").forEach((e) => e.draggable = !0);
			}), j.observe(e, {
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
			let { files: n } = A.getState(), r = Object.keys(n), i = r.indexOf(e), a = r.indexOf(t);
			i !== -1 && a !== -1 && i !== a && (r.splice(a, 0, r.splice(i, 1)[0]), A.setState({ files: Object.fromEntries(r.map((e) => [e, n[e]])) }), this.saveFileOrder());
		},
		saveFileOrder() {
			let e = A.getFiles().map((e) => e.meta.fileKey);
			e.join() !== this.getFileKeysInState().filter((t) => e.includes(t)).join() && D(e);
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
export { Ra as default };
