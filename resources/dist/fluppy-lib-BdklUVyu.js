import { r as e, t } from "./fluppy-rolldown-runtime-B0aSnxlc.js";
import { t as n } from "./fluppy-ErrorWithCause-C1-jdBfU.js";
import { n as r, t as i } from "./fluppy-fetchWithNetworkError-DVypO93t.js";
import { n as a } from "./fluppy-toError-DlxtQOs3.js";
import { n as o, r as s, t as c } from "./fluppy-UIPlugin-ihypjxg2.js";
import { n as l, t as u } from "./fluppy-FilterInput-CB8h947h.js";
//#region node_modules/@uppy/core/lib/utils/fileFilters.js
var d = (e) => "error" in e && !!e.error, f = (e) => e.progress.uploadComplete;
function p(e) {
	return e.filter((e) => !d(e) && !f(e));
}
function m(e) {
	return e.filter((e) => !e.progress?.uploadStarted || !e.isRestored);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getAllowedMetaFields.js
function h(e, t) {
	return e === !0 ? Object.keys(t) : Array.isArray(e) ? e : [];
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/hasProperty.js
var g = Object.hasOwn;
//#endregion
//#region node_modules/@uppy/core/lib/utils/isNetworkError.js
function _(e) {
	return e ? e.readyState === 4 && e.status === 0 : !1;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/RateLimitedQueue.js
function v(e) {
	return Error("Cancelled", { cause: e });
}
function y(e) {
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
var b = class {
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
				abortOn: y,
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
						t = v(e);
					};
				}, t);
			});
			return i.abort = (e) => {
				r.abort(e);
			}, i.abortOn = y, i;
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
}, x = class {
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
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/SearchView.js
function S({ value: e, onChange: t, onSubmit: n, inputLabel: r, loading: i = !1, children: a }) {
	let { formId: o } = l(n);
	return s("section", {
		className: "uppy-SearchProvider",
		children: [s("input", {
			className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
			type: "search",
			"aria-label": r,
			placeholder: r,
			value: e,
			onInput: (e) => t(e.target.value),
			form: o,
			disabled: i,
			"data-uppy-super-focusable": !0
		}), s("button", {
			disabled: i,
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
			type: "submit",
			form: o,
			children: a
		})]
	});
}
//#endregion
//#region node_modules/tus-js-client/lib.esm/error.js
function C(e) {
	"@babel/helpers - typeof";
	return C = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, C(e);
}
function w(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ee(r.key), r);
	}
}
function T(e, t, n) {
	return t && w(e.prototype, t), n && w(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ee(e) {
	var t = E(e, "string");
	return C(t) == "symbol" ? t : t + "";
}
function E(e, t) {
	if (C(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (C(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function te(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function D(e, t, n) {
	return t = j(t), O(e, ae() ? Reflect.construct(t, n || [], j(e).constructor) : t.apply(e, n));
}
function O(e, t) {
	if (t && (C(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return k(e);
}
function k(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function ne(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && A(e, t);
}
function re(e) {
	var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
	return re = function(e) {
		if (e === null || !oe(e)) return e;
		if (typeof e != "function") throw TypeError("Super expression must either be null or a function");
		if (t !== void 0) {
			if (t.has(e)) return t.get(e);
			t.set(e, n);
		}
		function n() {
			return ie(e, arguments, j(this).constructor);
		}
		return n.prototype = Object.create(e.prototype, { constructor: {
			value: n,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), A(n, e);
	}, re(e);
}
function ie(e, t, n) {
	if (ae()) return Reflect.construct.apply(null, arguments);
	var r = [null];
	r.push.apply(r, t);
	var i = new (e.bind.apply(e, r))();
	return n && A(i, n.prototype), i;
}
function ae() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (ae = function() {
		return !!e;
	})();
}
function oe(e) {
	try {
		return Function.toString.call(e).indexOf("[native code]") !== -1;
	} catch {
		return typeof e == "function";
	}
}
function A(e, t) {
	return A = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, A(e, t);
}
function j(e) {
	return j = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, j(e);
}
var M = /*#__PURE__*/ function(e) {
	function t(e) {
		var n, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
		if (te(this, t), n = D(this, t, [e]), n.originalRequest = i, n.originalResponse = a, n.causingError = r, r != null && (e += `, caused by ${r.toString()}`), i != null) {
			var o = i.getHeader("X-Request-ID") || "n/a", s = i.getMethod(), c = i.getURL(), l = a ? a.getStatus() : "n/a", u = a ? a.getBody() || "" : "n/a";
			e += `, originated from request (method: ${s}, url: ${c}, response code: ${l}, response text: ${u}, request id: ${o})`;
		}
		return n.message = e, n;
	}
	return ne(t, e), T(t);
}(/*#__PURE__*/ re(Error));
//#endregion
//#region node_modules/tus-js-client/lib.esm/noopUrlStorage.js
function N(e) {
	"@babel/helpers - typeof";
	return N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, N(e);
}
function se(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ce(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ue(r.key), r);
	}
}
function le(e, t, n) {
	return t && ce(e.prototype, t), n && ce(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ue(e) {
	var t = de(e, "string");
	return N(t) == "symbol" ? t : t + "";
}
function de(e, t) {
	if (N(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (N(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var fe = /*#__PURE__*/ function() {
	function e() {
		se(this, e);
	}
	return le(e, [
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
}(), pe = "3.9.4", me = pe, he = typeof TextDecoder == "function" ? new TextDecoder("utf-8", { ignoreBOM: !0 }) : void 0, ge = typeof TextEncoder == "function" ? new TextEncoder() : void 0, P = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="), _e = ((e) => {
	let t = {};
	return e.forEach((e, n) => t[e] = n), t;
})(P), ve = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, F = String.fromCharCode.bind(String), ye = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : (e) => new Uint8Array(Array.prototype.slice.call(e, 0)), be = (e) => e.replace(/=/g, "").replace(/[+\/]/g, (e) => e == "+" ? "-" : "_"), xe = (e) => e.replace(/[^A-Za-z0-9\+\/]/g, ""), Se = (e) => {
	let t, n, r, i, a = "", o = e.length % 3;
	for (let o = 0; o < e.length;) {
		if ((n = e.charCodeAt(o++)) > 255 || (r = e.charCodeAt(o++)) > 255 || (i = e.charCodeAt(o++)) > 255) throw TypeError("invalid character found");
		t = n << 16 | r << 8 | i, a += P[t >> 18 & 63] + P[t >> 12 & 63] + P[t >> 6 & 63] + P[t & 63];
	}
	return o ? a.slice(0, o - 3) + "===".substring(o) : a;
}, Ce = typeof btoa == "function" ? (e) => btoa(e) : Se, we = typeof Uint8Array.prototype.toBase64 == "function" ? (e) => e.toBase64() : (e) => {
	let t = 4096, n = [];
	for (let r = 0, i = e.length; r < i; r += t) n.push(F.apply(null, e.subarray(r, r + t)));
	return Ce(n.join(""));
}, I = (e, t = !1) => t ? be(we(e)) : we(e), Te = (e) => {
	if (e.length < 2) {
		var t = e.charCodeAt(0);
		return t < 128 ? e : t < 2048 ? F(192 | t >>> 6) + F(128 | t & 63) : F(224 | t >>> 12 & 15) + F(128 | t >>> 6 & 63) + F(128 | t & 63);
	}
	var t = 65536 + (e.charCodeAt(0) - 55296) * 1024 + (e.charCodeAt(1) - 56320);
	return F(240 | t >>> 18 & 7) + F(128 | t >>> 12 & 63) + F(128 | t >>> 6 & 63) + F(128 | t & 63);
}, Ee = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/g, De = (e) => e.replace(Ee, Te), Oe = ge ? (e) => we(ge.encode(e)) : (e) => Ce(De(e)), L = (e, t = !1) => t ? be(Oe(e)) : Oe(e), ke = (e) => L(e, !0), Ae = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, je = (e) => {
	switch (e.length) {
		case 4:
			var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
			return F((t >>> 10) + 55296) + F((t & 1023) + 56320);
		case 3: return F((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
		default: return F((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
	}
}, Me = (e) => e.replace(Ae, je), Ne = (e) => {
	if (e = e.replace(/\s+/g, ""), !ve.test(e)) throw TypeError("malformed base64.");
	e += "==".slice(2 - (e.length & 3));
	let t, n, r, i = [];
	for (let a = 0; a < e.length;) t = _e[e.charAt(a++)] << 18 | _e[e.charAt(a++)] << 12 | (n = _e[e.charAt(a++)]) << 6 | (r = _e[e.charAt(a++)]), n === 64 ? i.push(F(t >> 16 & 255)) : r === 64 ? i.push(F(t >> 16 & 255, t >> 8 & 255)) : i.push(F(t >> 16 & 255, t >> 8 & 255, t & 255));
	return i.join("");
}, Pe = typeof atob == "function" ? (e) => atob(xe(e)) : Ne, Fe = typeof Uint8Array.fromBase64 == "function" ? (e) => Uint8Array.fromBase64(e) : (e) => ye(Pe(e).split("").map((e) => e.charCodeAt(0))), Ie = (e) => Fe(Re(e)), Le = he ? (e) => he.decode(Fe(e)) : (e) => Me(Pe(e)), Re = (e) => xe(e.replace(/[-_]/g, (e) => e == "-" ? "+" : "/")), ze = (e) => Le(Re(e)), Be = (e) => {
	if (typeof e != "string") return !1;
	let t = e.replace(/\s+/g, "").replace(/={0,2}$/, "");
	return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t);
}, Ve = (e) => ({
	value: e,
	enumerable: !1,
	writable: !0,
	configurable: !0
}), He = function() {
	let e = (e, t) => Object.defineProperty(String.prototype, e, Ve(t));
	e("fromBase64", function() {
		return ze(this);
	}), e("toBase64", function(e) {
		return L(this, e);
	}), e("toBase64URI", function() {
		return L(this, !0);
	}), e("toBase64URL", function() {
		return L(this, !0);
	}), e("toUint8Array", function() {
		return Ie(this);
	});
}, Ue = function() {
	let e = (e, t) => Object.defineProperty(Uint8Array.prototype, e, Ve(t));
	e("toBase64", function(e) {
		return I(this, e);
	}), e("toBase64URI", function() {
		return I(this, !0);
	}), e("toBase64URL", function() {
		return I(this, !0);
	});
}, We = {
	version: pe,
	VERSION: me,
	atob: Pe,
	atobPolyfill: Ne,
	btoa: Ce,
	btoaPolyfill: Se,
	fromBase64: ze,
	toBase64: L,
	encode: L,
	encodeURI: ke,
	encodeURL: ke,
	utob: De,
	btou: Me,
	decode: ze,
	isValid: Be,
	fromUint8Array: I,
	toUint8Array: Ie,
	extendString: He,
	extendUint8Array: Ue,
	extendBuiltins: () => {
		He(), Ue();
	}
}, Ge = /* @__PURE__ */ t(((e, t) => {
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
})), Ke = /* @__PURE__ */ t(((e) => {
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
})), qe = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = Ge(), r = Ke(), i = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, a = /[\n\r\t]/g, o = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, s = /:\d+$/, c = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, l = /^[a-zA-Z]:/;
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
})))());
function Je() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
		var t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
//#endregion
//#region node_modules/tus-js-client/lib.esm/upload.js
function Ye() {
	Ye = function() {
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
		return i(o, "_invoke", { value: ee(e, n, new O(r || [])) }), o;
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
	var x = Object.getPrototypeOf, S = x && x(x(k([])));
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
				return u && R(u) == "object" && r.call(u, "__await") ? t.resolve(u.__await).then(function(e) {
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
	function ee(t, n, r) {
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
					var c = E(s, r);
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
	function E(t, n) {
		var r = n.method, i = t.iterator[r];
		if (i === e) return n.delegate = null, r === "throw" && t.iterator.return && (n.method = "return", n.arg = e, E(t, n), n.method === "throw") || r !== "return" && (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("The iterator does not provide a '" + r + "' method")), g;
		var a = d(i, t.iterator, n.arg);
		if (a.type === "throw") return n.method = "throw", n.arg = a.arg, n.delegate = null, g;
		var o = a.arg;
		return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, n.method !== "return" && (n.method = "next", n.arg = e), n.delegate = null, g) : o : (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("iterator result is not an object"), n.delegate = null, g);
	}
	function te(e) {
		var t = { tryLoc: e[0] };
		1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
	}
	function D(e) {
		var t = e.completion || {};
		t.type = "normal", delete t.arg, e.completion = t;
	}
	function O(e) {
		this.tryEntries = [{ tryLoc: "root" }], e.forEach(te, this), this.reset(!0);
	}
	function k(t) {
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
		throw TypeError(R(t) + " is not iterable");
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
	}, t.values = k, O.prototype = {
		constructor: O,
		reset: function(t) {
			if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(D), !t) for (var n in this) n.charAt(0) === "t" && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
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
				if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), D(n), g;
			}
		},
		catch: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.tryLoc === e) {
					var r = n.completion;
					if (r.type === "throw") {
						var i = r.arg;
						D(n);
					}
					return i;
				}
			}
			throw Error("illegal catch attempt");
		},
		delegateYield: function(t, n, r) {
			return this.delegate = {
				iterator: k(t),
				resultName: n,
				nextLoc: r
			}, this.method === "next" && (this.arg = e), g;
		}
	}, t;
}
function Xe(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function Ze(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, i) {
			var a = e.apply(t, n);
			function o(e) {
				Xe(a, r, i, o, s, "next", e);
			}
			function s(e) {
				Xe(a, r, i, o, s, "throw", e);
			}
			o(void 0);
		});
	};
}
function Qe(e, t) {
	return tt(e) || et(e, t) || rt(e, t) || $e();
}
function $e() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function et(e, t) {
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
function tt(e) {
	if (Array.isArray(e)) return e;
}
function R(e) {
	"@babel/helpers - typeof";
	return R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, R(e);
}
function nt(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = rt(e)) || t && e && typeof e.length == "number") {
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
function rt(e, t) {
	if (e) {
		if (typeof e == "string") return it(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
		if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return it(e, t);
	}
}
function it(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function at(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function z(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? at(Object(n), !0).forEach(function(t) {
			ot(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : at(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ot(e, t, n) {
	return t = ut(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function st(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ct(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ut(r.key), r);
	}
}
function lt(e, t, n) {
	return t && ct(e.prototype, t), n && ct(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function ut(e) {
	var t = dt(e, "string");
	return R(t) == "symbol" ? t : t + "";
}
function dt(e, t) {
	if (R(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (R(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var ft = "tus-v1", B = "ietf-draft-03", V = "ietf-draft-05", pt = {
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
	onShouldRetry: bt,
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
	protocol: ft
}, H = /*#__PURE__*/ function() {
	function e(t, n) {
		st(this, e), "resume" in n && console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead."), this.options = n, this.options.chunkSize = Number(this.options.chunkSize), this._urlStorage = this.options.urlStorage, this.file = t, this.url = null, this._req = null, this._fingerprint = null, this._urlStorageKey = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0, this._parallelUploads = null, this._parallelUploadUrls = null;
	}
	return lt(e, [
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
					ft,
					B,
					V
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
					return n == null || `${n}`, e._fingerprint = n, e._source ? e._source : e.options.fileReader.openFile(t, e.options.chunkSize);
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
				var i = this._parallelUploadUrls == null ? this.options.parallelUploads : this._parallelUploadUrls.length, a = this.options.parallelUploadBoundaries ?? St(this._source.size, i);
				this._parallelUploadUrls && a.forEach(function(e, n) {
					e.uploadUrl = t._parallelUploadUrls[n] || null;
				}), this._parallelUploadUrls = Array(a.length);
				var o = a.map(function(i, o) {
					var s = 0;
					return t._source.slice(i.start, i.end).then(function(c) {
						var l = c.value;
						return new Promise(function(c, u) {
							var d = new e(l, z(z({}, t.options), {}, {
								uploadUrl: i.uploadUrl || null,
								storeFingerprintForResuming: !1,
								removeFingerprintOnSuccess: !1,
								parallelUploads: 1,
								parallelUploadBoundaries: null,
								metadata: t.options.metadataForPartialUploads,
								headers: z(z({}, t.options.headers), {}, { "Upload-Concat": "partial" }),
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
					var e = mt(t.options.metadata);
					return e !== "" && s.setHeader("Upload-Metadata", e), t._sendRequest(s, null);
				}).then(function(e) {
					if (!U(e.getStatus(), 200)) {
						t._emitHttpError(s, e, "tus: unexpected response while creating upload");
						return;
					}
					var n = e.getHeader("Location");
					if (n == null) {
						t._emitHttpError(s, e, "tus: invalid or missing Location header");
						return;
					}
					t.url = xt(t.options.endpoint, n), `${t.url}`, t._emitSuccess(e);
				}).catch(function(e) {
					t._emitError(e);
				});
			}
		},
		{
			key: "_startSingleUpload",
			value: function() {
				if (this._aborted = !1, this.url != null) {
					`${this.url}`, this._resumeUpload();
					return;
				}
				if (this.options.uploadUrl != null) {
					`${this.options.uploadUrl}`, this.url = this.options.uploadUrl, this._resumeUpload();
					return;
				}
				this._createUpload();
			}
		},
		{
			key: "abort",
			value: function(t) {
				var n = this;
				if (this._parallelUploads != null) {
					var r = nt(this._parallelUploads), i;
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
				this._emitError(new M(n, r, e, t));
			}
		},
		{
			key: "_emitError",
			value: function(e) {
				var t = this;
				if (!this._aborted) {
					if (this.options.retryDelays != null && (this._offset != null && this._offset > this._offsetBeforeRetry && (this._retryAttempt = 0), yt(e, this._retryAttempt, this.options))) {
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
				var n = mt(this.options.metadata);
				n !== "" && t.setHeader("Upload-Metadata", n);
				var r;
				this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred ? (this._offset = 0, r = this._addChunkToRequest(t)) : ((this.options.protocol === B || this.options.protocol === V) && t.setHeader("Upload-Complete", "?0"), r = this._sendRequest(t, null)), r.then(function(n) {
					if (!U(n.getStatus(), 200)) {
						e._emitHttpError(t, n, "tus: unexpected response while creating upload");
						return;
					}
					var r = n.getHeader("Location");
					if (r == null) {
						e._emitHttpError(t, n, "tus: invalid or missing Location header");
						return;
					}
					if (e.url = xt(e.options.endpoint, r), `${e.url}`, typeof e.options.onUploadUrlAvailable == "function" && e.options.onUploadUrlAvailable(), e._size === 0) {
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
					if (!U(r, 200)) {
						if (r === 423) {
							e._emitHttpError(t, n, "tus: upload is currently locked; retry later");
							return;
						}
						if (U(r, 400) && e._removeFromUrlStorage(), !e.options.endpoint) {
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
					if (Number.isNaN(a) && !e.options.uploadLengthDeferred && e.options.protocol === ft) {
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
						if (!U(n.getStatus(), 200)) {
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
				}), this.options.protocol === ft ? e.setHeader("Content-Type", "application/offset+octet-stream") : this.options.protocol === V && e.setHeader("Content-Type", "application/partial-upload"), (r === Infinity || r > this._size) && !this.options.uploadLengthDeferred && (r = this._size), this._source.slice(n, r).then(function(n) {
					var r = n.value, i = n.done, a = r != null && r.size ? r.size : 0;
					t.options.uploadLengthDeferred && i && (t._size = t._offset + a, e.setHeader("Upload-Length", `${t._size}`));
					var o = t._offset + a;
					return !t.options.uploadLengthDeferred && i && o !== t._size ? Promise.reject(/* @__PURE__ */ Error(`upload was configured with a size of ${t._size} bytes, but the source is done after ${o} bytes`)) : r === null ? t._sendRequest(e) : ((t.options.protocol === B || t.options.protocol === V) && e.setHeader("Upload-Complete", i ? "?1" : "?0"), t._emitProgress(t._offset, t._size), t._sendRequest(e, r));
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
				var n = ht(e, t, this.options);
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
				return gt(e, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, this.options);
			}
		}
	], [{
		key: "terminate",
		value: function(t) {
			var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = ht("DELETE", t, n);
			return gt(r, null, n).then(function(e) {
				if (e.getStatus() !== 204) throw new M("tus: unexpected response while terminating upload", null, r, e);
			}).catch(function(i) {
				if (i instanceof M || (i = new M("tus: failed to terminate upload", i, r, null)), !yt(i, 0, n)) throw i;
				var a = n.retryDelays[0], o = n.retryDelays.slice(1), s = z(z({}, n), {}, { retryDelays: o });
				return new Promise(function(e) {
					return setTimeout(e, a);
				}).then(function() {
					return e.terminate(t, s);
				});
			});
		}
	}]);
}();
function mt(e) {
	return Object.entries(e).map(function(e) {
		var t = Qe(e, 2), n = t[0], r = t[1];
		return `${n} ${We.encode(String(r))}`;
	}).join(",");
}
function U(e, t) {
	return e >= t && e < t + 100;
}
function ht(e, t, n) {
	var r = n.httpStack.createRequest(e, t);
	n.protocol === B ? r.setHeader("Upload-Draft-Interop-Version", "5") : n.protocol === V ? r.setHeader("Upload-Draft-Interop-Version", "6") : r.setHeader("Tus-Resumable", "1.0.0");
	for (var i = n.headers || {}, a = 0, o = Object.entries(i); a < o.length; a++) {
		var s = Qe(o[a], 2), c = s[0], l = s[1];
		r.setHeader(c, l);
	}
	if (n.addRequestId) {
		var u = Je();
		r.setHeader("X-Request-ID", u);
	}
	return r;
}
function gt(e, t, n) {
	return _t.apply(this, arguments);
}
function _t() {
	return _t = Ze(/*#__PURE__*/ Ye().mark(function e(t, n, r) {
		var i;
		return Ye().wrap(function(e) {
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
	})), _t.apply(this, arguments);
}
function vt() {
	var e = !0;
	return typeof navigator < "u" && navigator.onLine === !1 && (e = !1), e;
}
function yt(e, t, n) {
	return n.retryDelays == null || t >= n.retryDelays.length || e.originalRequest == null ? !1 : n && typeof n.onShouldRetry == "function" ? n.onShouldRetry(e, t, n) : bt(e);
}
function bt(e) {
	var t = e.originalResponse ? e.originalResponse.getStatus() : 0;
	return (!U(t, 400) || t === 409 || t === 423) && vt();
}
function xt(e, t) {
	return new qe.default(t, e).toString();
}
function St(e, t) {
	for (var n = Math.floor(e / t), r = [], i = 0; i < t; i++) r.push({
		start: n * i,
		end: n * (i + 1)
	});
	return r[t - 1].end = e, r;
}
H.defaultOptions = pt;
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/isReactNative.js
var Ct = function() {
	return typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
};
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/uriToBlob.js
function wt(e) {
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/isCordova.js
var Tt = function() {
	return typeof window < "u" && (window.PhoneGap !== void 0 || window.Cordova !== void 0 || window.cordova !== void 0);
};
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/readAsByteArray.js
function Et(e) {
	return new Promise(function(t, n) {
		var r = new FileReader();
		r.onload = function() {
			t({ value: new Uint8Array(r.result) });
		}, r.onerror = function(e) {
			n(e);
		}, r.readAsArrayBuffer(e);
	});
}
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/FileSource.js
function W(e) {
	"@babel/helpers - typeof";
	return W = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, W(e);
}
function Dt(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Ot(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, At(r.key), r);
	}
}
function kt(e, t, n) {
	return t && Ot(e.prototype, t), n && Ot(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function At(e) {
	var t = jt(e, "string");
	return W(t) == "symbol" ? t : t + "";
}
function jt(e, t) {
	if (W(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (W(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Mt = /*#__PURE__*/ function() {
	function e(t) {
		Dt(this, e), this._file = t, this.size = t.size;
	}
	return kt(e, [{
		key: "slice",
		value: function(e, t) {
			if (Tt()) return Et(this._file.slice(e, t));
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/sources/StreamSource.js
function G(e) {
	"@babel/helpers - typeof";
	return G = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, G(e);
}
function Nt(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Pt(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, It(r.key), r);
	}
}
function Ft(e, t, n) {
	return t && Pt(e.prototype, t), n && Pt(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function It(e) {
	var t = Lt(e, "string");
	return G(t) == "symbol" ? t : t + "";
}
function Lt(e, t) {
	if (G(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (G(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Rt(e) {
	return e === void 0 ? 0 : e.size === void 0 ? e.length : e.size;
}
function zt(e, t) {
	if (e.concat) return e.concat(t);
	if (e instanceof Blob) return new Blob([e, t], { type: e.type });
	if (e.set) {
		var n = new e.constructor(e.length + t.length);
		return n.set(e), n.set(t, e.length), n;
	}
	throw Error("Unknown data type");
}
var Bt = /*#__PURE__*/ function() {
	function e(t) {
		Nt(this, e), this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1;
	}
	return Ft(e, [
		{
			key: "slice",
			value: function(e, t) {
				return e < this._bufferOffset ? Promise.reject(/* @__PURE__ */ Error("Requested data is before the reader's current offset")) : this._readUntilEnoughDataOrDone(e, t);
			}
		},
		{
			key: "_readUntilEnoughDataOrDone",
			value: function(e, t) {
				var n = this, r = t <= this._bufferOffset + Rt(this._buffer);
				if (this._done || r) {
					var i = this._getDataFromBuffer(e, t), a = i == null && this._done;
					return Promise.resolve({
						value: i,
						done: a
					});
				}
				return this._reader.read().then(function(r) {
					var i = r.value;
					return r.done ? n._done = !0 : n._buffer = n._buffer === void 0 ? i : zt(n._buffer, i), n._readUntilEnoughDataOrDone(e, t);
				});
			}
		},
		{
			key: "_getDataFromBuffer",
			value: function(e, t) {
				e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
				var n = Rt(this._buffer) === 0;
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/fileReader.js
function K(e) {
	"@babel/helpers - typeof";
	return K = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, K(e);
}
function Vt() {
	Vt = function() {
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
		return i(o, "_invoke", { value: ee(e, n, new O(r || [])) }), o;
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
	var x = Object.getPrototypeOf, S = x && x(x(k([])));
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
				return u && K(u) == "object" && r.call(u, "__await") ? t.resolve(u.__await).then(function(e) {
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
	function ee(t, n, r) {
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
					var c = E(s, r);
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
	function E(t, n) {
		var r = n.method, i = t.iterator[r];
		if (i === e) return n.delegate = null, r === "throw" && t.iterator.return && (n.method = "return", n.arg = e, E(t, n), n.method === "throw") || r !== "return" && (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("The iterator does not provide a '" + r + "' method")), g;
		var a = d(i, t.iterator, n.arg);
		if (a.type === "throw") return n.method = "throw", n.arg = a.arg, n.delegate = null, g;
		var o = a.arg;
		return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, n.method !== "return" && (n.method = "next", n.arg = e), n.delegate = null, g) : o : (n.method = "throw", n.arg = /* @__PURE__ */ TypeError("iterator result is not an object"), n.delegate = null, g);
	}
	function te(e) {
		var t = { tryLoc: e[0] };
		1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
	}
	function D(e) {
		var t = e.completion || {};
		t.type = "normal", delete t.arg, e.completion = t;
	}
	function O(e) {
		this.tryEntries = [{ tryLoc: "root" }], e.forEach(te, this), this.reset(!0);
	}
	function k(t) {
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
		throw TypeError(K(t) + " is not iterable");
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
	}, t.values = k, O.prototype = {
		constructor: O,
		reset: function(t) {
			if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(D), !t) for (var n in this) n.charAt(0) === "t" && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
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
				if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), D(n), g;
			}
		},
		catch: function(e) {
			for (var t = this.tryEntries.length - 1; t >= 0; --t) {
				var n = this.tryEntries[t];
				if (n.tryLoc === e) {
					var r = n.completion;
					if (r.type === "throw") {
						var i = r.arg;
						D(n);
					}
					return i;
				}
			}
			throw Error("illegal catch attempt");
		},
		delegateYield: function(t, n, r) {
			return this.delegate = {
				iterator: k(t),
				resultName: n,
				nextLoc: r
			}, this.method === "next" && (this.arg = e), g;
		}
	}, t;
}
function Ht(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function Ut(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, i) {
			var a = e.apply(t, n);
			function o(e) {
				Ht(a, r, i, o, s, "next", e);
			}
			function s(e) {
				Ht(a, r, i, o, s, "throw", e);
			}
			o(void 0);
		});
	};
}
function Wt(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function Gt(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, qt(r.key), r);
	}
}
function Kt(e, t, n) {
	return t && Gt(e.prototype, t), n && Gt(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function qt(e) {
	var t = Jt(e, "string");
	return K(t) == "symbol" ? t : t + "";
}
function Jt(e, t) {
	if (K(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (K(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Yt = /*#__PURE__*/ function() {
	function e() {
		Wt(this, e);
	}
	return Kt(e, [{
		key: "openFile",
		value: function() {
			var e = Ut(/*#__PURE__*/ Vt().mark(function e(t, n) {
				var r;
				return Vt().wrap(function(e) {
					for (;;) switch (e.prev = e.next) {
						case 0:
							if (!(Ct() && t && t.uri !== void 0)) {
								e.next = 11;
								break;
							}
							return e.prev = 1, e.next = 4, wt(t.uri);
						case 4: return r = e.sent, e.abrupt("return", new Mt(r));
						case 8: throw e.prev = 8, e.t0 = e.catch(1), Error(`tus: cannot fetch \`file.uri\` as Blob, make sure the uri is correct and accessible. ${e.t0}`);
						case 11:
							if (typeof t.slice != "function" || t.size === void 0) {
								e.next = 13;
								break;
							}
							return e.abrupt("return", Promise.resolve(new Mt(t)));
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
						case 17: return e.abrupt("return", Promise.resolve(new Bt(t, n)));
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/fileSignature.js
function Xt(e, t) {
	return Ct() ? Promise.resolve(Zt(e, t)) : Promise.resolve([
		"tus-br",
		e.name,
		e.type,
		e.size,
		e.lastModified,
		t.endpoint
	].join("-"));
}
function Zt(e, t) {
	var n = e.exif ? Qt(JSON.stringify(e.exif)) : "noexif";
	return [
		"tus-rn",
		e.name || "noname",
		e.size || "nosize",
		n,
		t.endpoint
	].join("/");
}
function Qt(e) {
	var t = 0;
	if (e.length === 0) return t;
	for (var n = 0; n < e.length; n++) {
		var r = e.charCodeAt(n);
		t = (t << 5) - t + r, t &= t;
	}
	return t;
}
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/httpStack.js
function q(e) {
	"@babel/helpers - typeof";
	return q = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, q(e);
}
function $t(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function en(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, nn(r.key), r);
	}
}
function tn(e, t, n) {
	return t && en(e.prototype, t), n && en(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function nn(e) {
	var t = rn(e, "string");
	return q(t) == "symbol" ? t : t + "";
}
function rn(e, t) {
	if (q(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (q(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var an = /*#__PURE__*/ function() {
	function e() {
		$t(this, e);
	}
	return tn(e, [{
		key: "createRequest",
		value: function(e, t) {
			return new on(e, t);
		}
	}, {
		key: "getName",
		value: function() {
			return "XHRHttpStack";
		}
	}]);
}(), on = /*#__PURE__*/ function() {
	function e(t, n) {
		$t(this, e), this._xhr = new XMLHttpRequest(), this._xhr.open(t, n, !0), this._method = t, this._url = n, this._headers = {};
	}
	return tn(e, [
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
						n(new sn(e._xhr));
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
}(), sn = /*#__PURE__*/ function() {
	function e(t) {
		$t(this, e), this._xhr = t;
	}
	return tn(e, [
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/urlStorage.js
function J(e) {
	"@babel/helpers - typeof";
	return J = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, J(e);
}
function cn(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function ln(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, dn(r.key), r);
	}
}
function un(e, t, n) {
	return t && ln(e.prototype, t), n && ln(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function dn(e) {
	var t = fn(e, "string");
	return J(t) == "symbol" ? t : t + "";
}
function fn(e, t) {
	if (J(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (J(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var pn = !1;
try {
	pn = "localStorage" in window;
	var mn = "tusSupport", hn = localStorage.getItem(mn);
	localStorage.setItem(mn, hn), hn === null && localStorage.removeItem(mn);
} catch (e) {
	if (e.code === e.SECURITY_ERR || e.code === e.QUOTA_EXCEEDED_ERR) pn = !1;
	else throw e;
}
var gn = pn, _n = /*#__PURE__*/ function() {
	function e() {
		cn(this, e);
	}
	return un(e, [
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
//#endregion
//#region node_modules/tus-js-client/lib.esm/browser/index.js
function Y(e) {
	"@babel/helpers - typeof";
	return Y = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Y(e);
}
function vn(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
function yn(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, kn(r.key), r);
	}
}
function bn(e, t, n) {
	return t && yn(e.prototype, t), n && yn(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function xn(e, t, n) {
	return t = X(t), Sn(e, wn() ? Reflect.construct(t, n || [], X(e).constructor) : t.apply(e, n));
}
function Sn(e, t) {
	if (t && (Y(t) === "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return Cn(e);
}
function Cn(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
function wn() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (wn = function() {
		return !!e;
	})();
}
function X(e) {
	return X = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, X(e);
}
function Tn(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && En(e, t);
}
function En(e, t) {
	return En = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, En(e, t);
}
function Dn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Z(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dn(Object(n), !0).forEach(function(t) {
			On(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function On(e, t, n) {
	return t = kn(t), t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function kn(e) {
	var t = An(e, "string");
	return Y(t) == "symbol" ? t : t + "";
}
function An(e, t) {
	if (Y(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Y(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var jn = Z(Z({}, H.defaultOptions), {}, {
	httpStack: new an(),
	fileReader: new Yt(),
	urlStorage: gn ? new _n() : new fe(),
	fingerprint: Xt
}), Mn = /*#__PURE__*/ function(e) {
	function t() {
		var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		return vn(this, t), n = Z(Z({}, jn), n), xn(this, t, [e, n]);
	}
	return Tn(t, e), bn(t, null, [{
		key: "terminate",
		value: function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			return t = Z(Z({}, jn), t), H.terminate(e, t);
		}
	}]);
}(H);
typeof XMLHttpRequest == "function" && typeof Blob == "function" && Blob.prototype.slice;
var Nn = {
	name: "@uppy/tus",
	description: "Resumable uploads for Uppy using Tus.io",
	version: "6.0.0",
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
		"upload",
		"resumable",
		"tus"
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
	dependencies: { "tus-js-client": "^4.3.1" },
	devDependencies: {
		"@uppy/core": "^6.0.0",
		"@vitest/browser-playwright": "^4.1.6",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.6"
	},
	peerDependencies: { "@uppy/core": "^6.0.0" }
};
//#endregion
//#region node_modules/@uppy/tus/lib/getFingerprint.js
function Pn() {
	return typeof window < "u" && (window.PhoneGap !== void 0 || window.Cordova !== void 0 || window.cordova !== void 0);
}
function Fn() {
	return typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
}
function In(e) {
	return (t, n) => {
		if (Pn() || Fn()) return jn.fingerprint(t, n);
		let r = [
			"tus",
			e.id,
			n.endpoint
		].join("-");
		return Promise.resolve(r);
	};
}
//#endregion
//#region node_modules/@uppy/tus/lib/index.js
var Ln = {
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
}, Rn = {
	limit: 20,
	retryDelays: Ln.retryDelays,
	withCredentials: !1,
	allowedMetaFields: !0
}, zn = class extends o {
	static VERSION = Nn.version;
	#e;
	requests;
	uploaders;
	uploaderEvents;
	constructor(e, t) {
		if (super(e, {
			...Rn,
			...t
		}), this.type = "uploader", this.id = this.opts.id || "Tus", t?.allowedMetaFields === void 0 && "metaFields" in this.opts) throw Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
		if ("autoRetry" in t) throw Error("The `autoRetry` option was deprecated and has been removed.");
		this.requests = this.opts.rateLimitedQueue ?? new b(this.opts.limit), this.#e = this.opts.retryDelays?.values(), this.uploaders = Object.create(null), this.uploaderEvents = Object.create(null);
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
		return new Promise((n, i) => {
			let a, o, s, c = {
				...this.opts,
				...e.tus || {}
			};
			typeof c.headers == "function" && (c.headers = c.headers(e));
			let { onShouldRetry: l, onBeforeRequest: u, ...d } = c, f = {
				...Ln,
				...d
			};
			f.fingerprint = In(e), f.onBeforeRequest = async (t) => {
				let n = t.getUnderlyingObject();
				n && (n.withCredentials = !!c.withCredentials);
				let r;
				if (typeof u == "function" && (r = u(t, e)), g(a, "shouldBeRequeued")) {
					if (!a.shouldBeRequeued) return Promise.reject();
					let t, n = new Promise((e) => {
						t = e;
					});
					a = this.requests.run(() => (e.isPaused && a.abort(), t(), () => {})), await Promise.all([n, r]);
					return;
				}
				return r;
			}, f.onError = (n) => {
				this.uppy.log(n);
				let o = n.originalResponse;
				o != null && (t = {
					status: o.getStatus(),
					body: { xhr: o.getUnderlyingObject() }
				});
				let s = n.originalRequest == null ? null : n.originalRequest.getUnderlyingObject();
				_(s) && (n = new r(n, s)), this.#n(e.id), a?.abort(), typeof c.onError == "function" && c.onError(n), i(n);
			}, f.onProgress = (t, n) => {
				this.onReceiveUploadUrl(e, s.url), typeof c.onProgress == "function" && c.onProgress(t, n);
				let r = this.uppy.getFile(e.id);
				this.uppy.emit("upload-progress", r, {
					uploadStarted: r.progress.uploadStarted ?? 0,
					bytesUploaded: t,
					bytesTotal: n
				});
			}, f.onSuccess = (t) => {
				let r = {
					uploadURL: s.url ?? void 0,
					status: 200,
					body: { xhr: t.lastResponse.getUnderlyingObject() }
				};
				this.uppy.emit("upload-success", this.uppy.getFile(e.id), r), this.#t(e.id), this.#n(e.id), a.done(), s.url && this.uppy.log(`Download ${s.url}`), typeof c.onSuccess == "function" && c.onSuccess(t), n(s);
			};
			let p = (e) => {
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
				return a.abort(), a = {
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
			f.onShouldRetry = l == null ? p : (e, t) => l(e, t, c, p);
			let m = (e, t, n) => {
				g(e, t) && !g(e, n) && (e[n] = e[t]);
			}, v = {};
			if (h(c.allowedMetaFields, e.meta).forEach((t) => {
				v[t] = String(e.meta[t]);
			}), m(v, "type", "filetype"), m(v, "name", "filename"), f.metadata = v, e.data == null) throw Error("File data is empty");
			s = new Mn(e.data, f), this.uploaders[e.id] = s;
			let y = new x(this.uppy);
			this.uploaderEvents[e.id] = y, o = () => (e.isPaused || s.start(), () => {}), s.findPreviousUploads().then((t) => {
				let n = t[0];
				n && (this.uppy.log(`[Tus] Resuming upload of ${e.id} started at ${n.creationTime}`), s.resumeFromPreviousUpload(n)), a = this.requests.run(o);
			}), y.onFileRemove(e.id, (t) => {
				a.abort(), this.#t(e.id, !!s.url), this.#n(e.id), n(`upload ${t} was removed`);
			}), y.onPause(e.id, (e) => {
				a.abort(), e ? s.abort() : a = this.requests.run(o);
			}), y.onPauseAll(e.id, () => {
				a.abort(), s.abort();
			}), y.onCancelAll(e.id, () => {
				a.abort(), this.#t(e.id, !!s.url), this.#n(e.id), n(`upload ${e.id} was canceled`);
			}), y.onResumeAll(e.id, () => {
				a.abort(), e.error && s.abort(), a = this.requests.run(o);
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
		let t = p(e), n = m(t);
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
}, Bn = {
	name: "@uppy/transloadit",
	description: "The Transloadit plugin can be used to upload files to Transloadit for all kinds of processing, such as transcoding video, resizing images, zipping/unzipping, and more",
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
	dependencies: {
		"@transloadit/types": "^4.4.0",
		"@uppy/tus": "^6.0.0",
		"component-emitter": "^2.0.0"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" },
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@uppy/core": "^6.2.0",
		"@vitest/browser-playwright": "^4.1.11",
		msw: "^2.15.0",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	}
}, Vn = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))(), 1), Hn = "ASSEMBLY_UPLOADING", Un = "ASSEMBLY_EXECUTING", Wn = "ASSEMBLY_COMPLETED", Gn = [
	Hn,
	Un,
	Wn
];
function Kn(e, t) {
	return typeof e == "string" && Gn.indexOf(e) >= Gn.indexOf(t);
}
var qn = class extends Vn.default {
	#e;
	#t;
	#n = !1;
	#r = null;
	#i;
	pollInterval;
	closed;
	constructor(e, t) {
		super(), this.#i = e, this.pollInterval = null, this.closed = !1, this.#e = t, this.#t = t.wrapPromiseFunction(i);
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
			let t = $(this.status), n = await this.#t(t);
			if (this.#n = !1, this.closed) return;
			if (n.status === 429) {
				this.#e.rateLimit(2e3);
				return;
			}
			if (!n.ok) {
				this.#s(new r(n.statusText));
				return;
			}
			let i = await n.json();
			if (this.closed) return;
			e ? this.updateStatus(i) : this.status = i;
		} catch (e) {
			this.#s(a(e));
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
		let i = Kn(r, Un) && !Kn(n, Un);
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
		}), Kn(r, Wn) && !Kn(n, Wn) && this.emit("finished");
	}
	close() {
		this.closed = !0, this.#r &&= (this.#r.close(), null), clearInterval(this.pollInterval), this.pollInterval = null;
	}
}, Jn = class extends Vn.default {
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
}, Yn = "/assemblies", Xn = class extends Error {
	details;
	assembly;
	constructor(e, t, n) {
		super(e), this.details = t, this.assembly = n;
	}
}, Zn = class {
	#e = {};
	#t;
	opts;
	constructor(e) {
		this.opts = e, this.opts.client != null && (this.#e["Transloadit-Client"] = this.opts.client), this.#t = this.opts.rateLimitedQueue.wrapPromiseFunction(i);
	}
	async #n(...e) {
		let t = await this.#t(...e);
		if (t.status === 429) return this.opts.rateLimitedQueue.rateLimit(2e3), this.#n(...e);
		if (!t.ok) {
			let n = Error(t.statusText);
			return n.statusCode = t.status, `${e[0]}`.endsWith(Yn) ? t.json().then((e) => {
				if (!e.error) throw n;
				let t = new Xn(e.error, e.message, e);
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
		let a = new URL(Yn, `${this.opts.service}`).href;
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
		let n = encodeURIComponent(t.size), r = `${$(e)}/reserve_file?size=${n}`;
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
		let n = encodeURIComponent(t.size), r = encodeURIComponent(t.uploadURL), i = `size=${n}&filename=${encodeURIComponent(t.name ?? "Unnamed")}&fieldname=file&s3Url=${r}`, a = `${$(e)}/add_file?${i}`;
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
		let t = $(e);
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
}, Qn = { strings: {
	creatingAssembly: "Preparing upload...",
	creatingAssemblyFailed: "Transloadit: Could not create Assembly",
	encoding: "Encoding..."
} }, $n = {
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
}, er = (e) => (t) => {
	let r = new n("Failed to send error to the client", { cause: t });
	console.error(r, e);
};
function tr(e) {
	if (e == null) throw Error("Transloadit: The `params` option is required.");
	let t;
	if (typeof e == "string") try {
		t = JSON.parse(e);
	} catch (e) {
		throw new n("Transloadit: The `params` option is a malformed JSON string.", { cause: e });
	}
	else t = e;
	if (!t.auth?.key) throw Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/c/template-credentials");
}
function Q(e) {
	if (!e.assembly_id) throw console.warn("Assembly status is missing `assembly_id`.", e), Error("Transloadit: Assembly status is missing `assembly_id`.");
	return e.assembly_id;
}
function nr(e, ...t) {
	for (let e of t) if (typeof e == "string" && e.length > 0) return e;
	throw Error(`Transloadit: Assembly status is missing ${e}.`);
}
function rr(e) {
	return nr("`assembly_url`", e.assembly_url, e.assembly_ssl_url);
}
function $(e) {
	return nr("`assembly_ssl_url`", e.assembly_ssl_url, e.assembly_url);
}
var ir = "https://api2.transloadit.com/companion", ar = /\.transloadit\.com$/, or = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/;
(class extends o {
	static VERSION = Bn.version;
	static COMPANION_URL = ir;
	static COMPANION_ALLOWED_HOSTS = ar;
	#e;
	client;
	#t;
	#n;
	completedFiles;
	restored = null;
	constructor(e, t) {
		super(e, {
			...$n,
			...t
		}), this.type = "uploader", this.id = this.opts.id || "Transloadit", this.defaultLocale = Qn, this.#e = new b(this.opts.limit), this.i18nInit(), this.client = new Zn({
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
			`uppy-tus:${zn.VERSION}`
		], t = (t, n) => {
			let r = this.uppy.getPlugin(t);
			r && e.push(`${n}:${r.constructor.VERSION}`);
		};
		return this.opts.importFromUploadURLs && (t("XHRUpload", "uppy-xhr-upload"), t("AwsS3", "uppy-aws-s3"), t("AwsS3Multipart", "uppy-aws-s3-multipart")), t("Dropbox", "uppy-dropbox"), t("Box", "uppy-box"), t("Facebook", "uppy-facebook"), t("GoogleDrive", "uppy-google-drive"), t("GoogleDrivePicker", "uppy-google-drive-picker"), t("GooglePhotosPicker", "uppy-google-photos-picker"), t("OneDrive", "uppy-onedrive"), t("Zoom", "uppy-zoom"), t("Url", "uppy-url"), this.opts.clientName != null && e.push(this.opts.clientName), e.join(",");
	}
	#i(e, t) {
		let n = rr(t), r = nr("`tus_url`", t.tus_url), i = Q(t), a = {
			...e.meta,
			assembly_url: n,
			filename: e.name,
			fieldname: "file"
		}, o = {
			...e.tus,
			endpoint: r,
			addRequestId: !0
		}, s;
		if ("remote" in e && e.remote && ({remote: s} = e, t.companion_url && or.test(e.remote.companionUrl))) {
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
			let i = new qn(n, this.#e), { status: a } = i, o = Q(a), s = {};
			return r.forEach((e) => {
				s[e.id] = this.#i(e, a);
			}), this.uppy.setState({ files: {
				...this.uppy.getState().files,
				...s
			} }), this.uppy.emit("transloadit:assembly-created", a, e), this.uppy.log(`[Transloadit] Created Assembly ${o}`), i;
		} catch (e) {
			let t = a(e), r = new n(`${this.i18n("creatingAssemblyFailed")}: ${t.message}`, { cause: t });
			throw "details" in t && (r.details = t.details), "assembly" in t && (r.assembly = t.assembly), r;
		}
	}
	#o(e) {
		let t = Array.isArray(e) ? e : [e], n = new Jn(this.uppy, t);
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
		let t = $(e.status);
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
			let e = {}, n = [], r = Q(t);
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
			let o = new qn(t, this.#e);
			return o.status = t, this.assembly = o, this.setPluginState({
				files: e,
				results: n
			}), e;
		}, r = (e) => {
			this.#o(Q(t)), this.#v(this.assembly, e);
		}, i = () => this.assembly?.update();
		this.restored = (async () => {
			let e = n();
			r(Object.keys(e)), await i(), this.restored = null;
		})(), this.restored.catch((e) => {
			this.uppy.log("Failed to restore", e);
		});
	};
	#v(e, t) {
		let { status: n } = e, r = Q(n);
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
		t.fields = { ...t.fields ?? {} }, tr(t.params);
		try {
			let n = this.assembly ?? await this.#a(e, t);
			if (n == null) throw Error("All files were canceled after assembly was created");
			this.opts.importFromUploadURLs && await this.#c(n, e), e.forEach((e) => {
				let t = this.uppy.getFile(e);
				this.uppy.emit("preprocess-complete", t);
			}), this.#o(Q(n.status)), this.assembly = n, this.#v(n, e);
		} catch (t) {
			throw e.forEach((e) => {
				let n = this.uppy.getFile(e);
				this.uppy.emit("preprocess-complete", n), this.uppy.emit("upload-error", n, a(t));
			}), this.uppy.setState({ allowNewUpload: !0 }), t;
		}
	};
	#b = async (e, t) => {
		try {
			await this.restored;
			let n = e.map((e) => this.uppy.getFile(e)).filter((e) => !e.error), r = this.assembly ? Q(this.assembly.status) : void 0, i = () => {
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
		this.#x(), this.assembly = void 0, this.client.submitError(e).catch(er(e)), this.uppy.setState({ allowNewUpload: !0 });
	};
	#C = (e, t) => {
		if (this.#x(), t?.message?.startsWith("tus: ")) {
			let e = t.originalRequest?.getUnderlyingObject()?.responseURL;
			this.client.submitError(t, { endpoint: e }).catch(er(t));
		}
	};
	install() {
		this.uppy.addPreProcessor(this.#y), this.uppy.addPostProcessor(this.#b), this.uppy.on("error", this.#S), this.uppy.on("cancel-all", this.#g), this.uppy.on("upload-error", this.#C), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", this.#u) : this.uppy.use(zn, {
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
});
//#endregion
//#region node_modules/@uppy/image-generator/lib/locale.js
var sr = { strings: {
	generateImage: "Generate image",
	generateImagePlaceholder: "A serene sunset over a mountain lake, with pine trees reflecting in the water",
	generating1: "AI is thinking...",
	generating2: "Crunching pixels...",
	generating3: "Summoning images...",
	generating4: "AI is working...",
	generating5: "Creating magic..."
} }, cr = {
	prompt: "",
	results: [],
	checkedResultIds: /* @__PURE__ */ new Set(),
	loading: !1,
	loadingMessageIndex: 0,
	firstRun: !0
}, lr = [
	"generating1",
	"generating2",
	"generating3",
	"generating4",
	"generating5"
], ur = class extends c {
	loadingInterval = null;
	rateLimitedQueue;
	client;
	assembly = null;
	icon;
	constructor(e, t) {
		super(e, t), this.id = this.opts.id || "ImageGenerator", this.title = "AI image", this.type = "acquirer", this.defaultLocale = sr, this.rateLimitedQueue = new b(10), this.client = new Zn({
			service: "https://api2.transloadit.com",
			rateLimitedQueue: this.rateLimitedQueue,
			errorReporting: !0
		}), this.setPluginState(cr), this.i18nInit(), this.icon = () => s("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			xmlnsXlink: "http://www.w3.org/1999/xlink",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: [
				s("title", { children: "ai-image-generator" }),
				s("defs", { children: s("circle", {
					id: "uppyImageGeneratorCircle",
					cx: "12",
					cy: "12",
					r: "12"
				}) }),
				s("g", {
					fill: "none",
					fillRule: "evenodd",
					children: [
						s("mask", {
							id: "uppyImageGeneratorMask",
							fill: "#fff",
							children: s("use", { xlinkHref: "#uppyImageGeneratorCircle" })
						}),
						s("use", {
							xlinkHref: "#uppyImageGeneratorCircle",
							fill: "#004b9d"
						}),
						s("path", {
							fill: "#fff",
							d: "m21.98 15.453 2.793.254a.295.295 0 0 1 0 .586l-2.794.254a6 6 0 0 0-5.432 5.432l-.254 2.794a.295.295 0 0 1-.586 0l-.254-2.794a6 6 0 0 0-5.432-5.432l-2.794-.254a.295.295 0 0 1 0-.586l2.794-.254a6 6 0 0 0 5.432-5.432l.254-2.794a.295.295 0 0 1 .586 0l.254 2.794a6 6 0 0 0 5.432 5.432",
							mask: "url(#uppyImageGeneratorMask)"
						}),
						s("path", {
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
			let { loadingMessageIndex: e } = this.getPluginState(), t = (e + 1) % lr.length;
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
			let e = await this.opts.assemblyOptions(this.getPluginState().prompt), t = new qn(await this.client.createAssembly({
				params: e.params,
				fields: e.fields ?? {},
				signature: e.signature,
				expectedFiles: 0
			}), this.rateLimitedQueue);
			this.assembly = t, t.on("result", (e, t) => {
				let { results: n } = this.getPluginState();
				this.setPluginState({
					results: [...n, t],
					firstRun: !1
				});
			}), t.on("error", i), t.on("finished", r), t.connect(), await n;
		} catch (e) {
			throw this.client.submitError(e).catch(() => {}), this.uppy.info("Image could not be generated", "error"), e;
		} finally {
			this.uppy.off("dashboard:close-panel", o), this.clearLoadingInterval(), this.closeAssembly(!0), this.setPluginState(a ? cr : { loading: !1 });
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
		this.uppy.addFiles(r), this.setPluginState(cr);
	};
	render() {
		let { prompt: e, results: t, checkedResultIds: n, loading: r, loadingMessageIndex: i, firstRun: a } = this.getPluginState(), { i18n: o } = this.uppy, c = r ? o(lr[i]) : void 0;
		return a ? s(S, {
			value: e,
			onChange: (e) => this.setPluginState({ prompt: e }),
			onSubmit: this.generate,
			inputLabel: o("generateImagePlaceholder"),
			loading: r,
			children: r ? s("span", {
				className: "uppy-ImageGenerator-generating",
				children: c
			}) : o("generateImage")
		}) : s("div", {
			className: "uppy-ProviderBrowser uppy-ProviderBrowser-viewType--grid",
			children: [
				s(u, {
					value: e,
					onChange: (e) => this.setPluginState({ prompt: e }),
					onSubmit: this.generate,
					inputLabel: o("search"),
					i18n: o
				}),
				r ? s("div", {
					className: "uppy-Provider-loading uppy-ImageGenerator-generating--darker",
					children: c
				}) : t.length > 0 ? s("div", {
					className: "uppy-ProviderBrowser-body",
					children: s("ul", {
						className: "uppy-ProviderBrowser-list",
						tabIndex: -1,
						children: t.map((t) => s("li", {
							className: `uppy-ProviderBrowserItem ${n.has(t.id) ? "uppy-ProviderBrowserItem--is-checked" : ""}`,
							children: [s("input", {
								type: "checkbox",
								className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid",
								onChange: (e) => this.onCheckboxChange(t, e),
								name: "listitem",
								id: t.id,
								checked: n.has(t.id),
								"data-uppy-super-focusable": !0
							}), s("label", {
								htmlFor: t.id,
								"aria-label": e,
								className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
								children: s("img", {
									src: t.url,
									alt: e,
									referrerPolicy: "no-referrer",
									loading: "lazy"
								})
							})]
						}, t.id))
					})
				}) : s("div", {
					className: "uppy-Provider-empty",
					children: o("noSearchResults")
				}),
				n.size > 0 && s("div", {
					className: "uppy-ProviderBrowser-footer",
					children: s("div", {
						className: "uppy-ProviderBrowser-footer-buttons",
						children: [s("button", {
							className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
							onClick: this.donePicking,
							type: "button",
							children: o("selectX", { smart_count: n.size })
						}), s("button", {
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
//#endregion
export { ur as default };
