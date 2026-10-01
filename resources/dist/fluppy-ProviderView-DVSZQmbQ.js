import { r as e, t } from "./fluppy-rolldown-runtime-B0aSnxlc.js";
import { a as n, i as r, n as i, r as a } from "./fluppy-AuthError-CpV_e0tX.js";
import { n as o } from "./fluppy-toError-DlxtQOs3.js";
import { r as s, s as c } from "./fluppy-UIPlugin-ihypjxg2.js";
import { t as l } from "./fluppy-mimeTypes-CcSLKirE.js";
import { t as u } from "./fluppy-getErrorMessage-DxiQuxng.js";
import { a as d, i as f, n as p, o as m, r as h, s as g, t as _ } from "./fluppy-hooks.module-DqAiOXxL.js";
import { t as v } from "./fluppy-AuthView-CI-CoxsO.js";
//#region node_modules/@transloadit/prettier-bytes/dist/prettierBytes.js
var y = [
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
function b(e, t) {
	if (typeof e != "number" || Number.isNaN(e)) throw TypeError(`Expected a number, got ${typeof e}`);
	let n = e < 0, r = Math.abs(e);
	if (n && (r = -r), r === 0) return "0 B";
	let i = t ? y.indexOf(t) : Math.min(Math.floor(Math.log(r) / Math.log(1024)), y.length - 1), a = Number(r / 1024 ** i), o = y[i];
	return i >= 3 ? a % 1 == 0 ? `${Math.round(a)} ${o}` : `${a.toFixed(2)} ${o}` : `${a >= 10 || a % 1 == 0 ? Math.round(a) : a.toFixed(1)} ${o}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getFileNameAndExtension.js
function x(e) {
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
function S(e) {
	if (e.type) return e.type;
	let t = e.name ? x(e.name).extension?.toLowerCase() : null;
	return t && t in l ? l[t] : "application/octet-stream";
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/generateFileID.js
function C(e) {
	return e.charCodeAt(0).toString(32);
}
function w(e) {
	let t = "";
	return e.replace(/[^A-Z0-9]/gi, (e) => (t += `-${C(e)}`, "/")) + t;
}
function T(e, t) {
	let n = t || "uppy";
	return typeof e.name == "string" && (n += `-${w(e.name.toLowerCase())}`), e.type !== void 0 && (n += `-${e.type}`), e.meta && typeof e.meta.relativePath == "string" && (n += `-${w(e.meta.relativePath.toLowerCase())}`), e.data?.size !== void 0 && (n += `-${e.data.size}`), e.data.lastModified !== void 0 && (n += `-${e.data.lastModified}`), n;
}
function E(e) {
	return !e.isRemote || !e.remote ? !1 : (/* @__PURE__ */ new Set([
		"box",
		"dropbox",
		"drive",
		"facebook",
		"unsplash"
	])).has(e.remote.provider);
}
function D(e, t) {
	if (E(e)) return e.id;
	let n = S(e);
	return T({
		...e,
		type: n
	}, t);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/remoteFileObjToLocal.js
function O(e) {
	return {
		...e,
		type: e.mimeType,
		extension: e.name ? x(e.name).extension : null
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/VirtualList.js
var ee = {
	position: "relative",
	width: "100%",
	minHeight: "100%"
}, te = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	overflow: "visible"
};
function k({ data: e, rowHeight: t, renderRow: n, overscanCount: r = 10, padding: i = 4, ...a }) {
	let o = _(null), [c, l] = f(0), [u, d] = f(0);
	m(() => {
		function e() {
			o.current != null && u !== o.current.offsetHeight && d(o.current.offsetHeight);
		}
		return e(), window.addEventListener("resize", e), () => {
			window.removeEventListener("resize", e);
		};
	}, [u]);
	let p = g(() => {
		o.current && l(o.current.scrollTop);
	}, []), h = Math.floor(c / t), v = Math.floor(u / t);
	r && (h = Math.max(0, h - h % r), v += r);
	let y = h + v + i, b = e.slice(h, y), x = {
		...ee,
		height: e.length * t
	}, S = {
		...te,
		top: h * t
	};
	return s("div", {
		onScroll: p,
		ref: o,
		...a,
		children: s("div", {
			role: "presentation",
			style: x,
			children: s("div", {
				role: "presentation",
				style: S,
				children: b.map(n)
			})
		})
	});
}
//#endregion
//#region node_modules/lodash/isObject.js
var A = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), ne = /* @__PURE__ */ t(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), j = /* @__PURE__ */ t(((e, t) => {
	var n = ne(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), re = /* @__PURE__ */ t(((e, t) => {
	var n = j();
	t.exports = function() {
		return n.Date.now();
	};
})), ie = /* @__PURE__ */ t(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), ae = /* @__PURE__ */ t(((e, t) => {
	var n = ie(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), M = /* @__PURE__ */ t(((e, t) => {
	t.exports = j().Symbol;
})), oe = /* @__PURE__ */ t(((e, t) => {
	var n = M(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
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
})), se = /* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), ce = /* @__PURE__ */ t(((e, t) => {
	var n = M(), r = oe(), i = se(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), le = /* @__PURE__ */ t(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), ue = /* @__PURE__ */ t(((e, t) => {
	var n = ce(), r = le(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), de = /* @__PURE__ */ t(((e, t) => {
	var n = ae(), r = A(), i = ue(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
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
})), N = /* @__PURE__ */ t(((e, t) => {
	var n = A(), r = re(), i = de(), a = "Expected a function", o = Math.max, s = Math.min;
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
})), fe = /* @__PURE__ */ e(N(), 1), pe = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", P = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += pe[Math.random() * 64 | 0];
	return t;
};
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/useSearchForm.js
function me(e) {
	let t = g((t) => {
		t.preventDefault(), e();
	}, [e]), [n] = f(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = P(), e;
	});
	return m(() => (document.body.appendChild(n), n.addEventListener("submit", t), () => {
		n.removeEventListener("submit", t), n.remove();
	}), [n, t]), { formId: n.id };
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FilterInput.js
function he({ value: e, onChange: t, onSubmit: n, inputLabel: r, i18n: i, disabled: a = !1 }) {
	let { formId: o } = me(n);
	return s("section", {
		className: "uppy-ProviderBrowser-searchFilter",
		children: [
			s("input", {
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
			s("svg", {
				"aria-hidden": "true",
				focusable: "false",
				className: "uppy-c-icon uppy-ProviderBrowser-searchFilterIcon",
				width: "12",
				height: "12",
				viewBox: "0 0 12 12",
				children: s("path", { d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z" })
			}),
			e && s("button", {
				className: "uppy-u-reset uppy-ProviderBrowser-searchFilterReset",
				type: "button",
				"aria-label": i("resetFilter"),
				disabled: a,
				onClick: () => t(""),
				children: s("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					viewBox: "0 0 19 19",
					children: s("path", { d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z" })
				})
			})
		]
	});
}
//#endregion
//#region node_modules/classnames/index.js
var F = /* @__PURE__ */ t(((e, t) => {
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
})), I = /* @__PURE__ */ e(F(), 1), L = {
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
function R(e, t) {
	let { code: n } = t;
	return n && Object.hasOwn(L, n) ? e(L[n]) : n && t.message === n ? e("companionError") : t.message;
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsMenu.js
var z = ({ appliesTo: e = "all" }, t) => e === "all" || e === (t.data.isFolder ? "folder" : "file");
function B(e, t) {
	return e.filter((e) => z(e, t));
}
function ge({ file: e, actions: t, open: n, onToggle: r, i18n: i }) {
	return t.some((t) => z(t, e)) ? s("div", {
		className: "uppy-ProviderBrowserItem-actions",
		children: s("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsBtn",
			"aria-label": i("itemActionsNamed", { name: e.data.name ?? i("unnamed") }),
			"aria-haspopup": "menu",
			"aria-expanded": n,
			onClick: (e) => {
				e.stopPropagation(), e.preventDefault(), r(e.currentTarget);
			},
			children: s("svg", {
				"aria-hidden": "true",
				width: "16",
				height: "16",
				viewBox: "0 0 16 16",
				focusable: "false",
				children: [
					s("circle", {
						cx: "3",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					s("circle", {
						cx: "8",
						cy: "8",
						r: "1.5",
						fill: "currentColor"
					}),
					s("circle", {
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
function _e(e) {
	e.key === "Escape" && e.stopPropagation();
}
var V = (e) => {
	let t = e.currentTarget;
	if (e.target !== t) return !1;
	let n = t.getBoundingClientRect();
	return e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom;
};
function H({ onDismiss: e, restoreFocus: t, children: n, ...r }) {
	let i = _(null), a = _(!1), o = _(t);
	return o.current = t, m(() => {
		let e = i.current;
		if (!e) return;
		let t = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		return typeof e.showModal == "function" ? e.showModal() : (e.setAttribute("open", ""), e.querySelector("button")?.focus()), () => {
			e.open && typeof e.close == "function" && e.close();
			let { activeElement: n } = document;
			(n === document.body || e.contains(n)) && (t?.isConnected ? t : o.current?.(e))?.focus();
		};
	}, []), s("dialog", {
		...r,
		ref: i,
		onCancel: (t) => {
			t.preventDefault(), e();
		},
		onPointerDown: (e) => {
			a.current = V(e);
		},
		onClick: (t) => {
			a.current && V(t) && e(), a.current = !1;
		},
		onKeyDown: (t) => {
			t.key !== "Escape" || t.isComposing || (t.preventDefault(), t.stopPropagation(), e());
		},
		children: n
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemActionsPopover.js
var U = 4;
function ve({ file: e, actions: t, anchor: n, containerRef: r, runAction: i, onClose: a, i18n: o }) {
	let c = _(null), [l, u] = f(null), d = g(() => {
		let e = c.current;
		if (!e) return;
		let t = n.getBoundingClientRect(), r = e.offsetHeight, i = t.bottom + U + r <= window.innerHeight ? t.bottom + U : Math.max(0, t.top - U - r);
		u(getComputedStyle(n).direction === "rtl" ? {
			top: i,
			left: Math.max(0, t.left)
		} : {
			top: i,
			right: Math.max(0, window.innerWidth - t.right)
		});
	}, [n]);
	h(d, [d]), m(() => {
		let e = c.current, t = r.current;
		if (!e) return;
		let n = (e) => {
			e.newState === "closed" && a();
		}, i = new AbortController(), { signal: o } = i;
		return e.addEventListener("toggle", n, { signal: o }), typeof e.showPopover == "function" && e.showPopover(), d(), window.addEventListener("scroll", (e) => {
			if (t && e.target instanceof Node && t.contains(e.target)) {
				a();
				return;
			}
			d();
		}, {
			capture: !0,
			signal: o
		}), window.addEventListener("resize", d, { signal: o }), e.querySelector("[role=\"menuitem\"]")?.focus({ preventScroll: !0 }), () => i.abort();
	}, [
		r,
		a,
		d
	]);
	let p = () => {
		a(), n.focus({ preventScroll: !0 });
	}, v = (e) => {
		let t = Array.from(c.current?.querySelectorAll("[role=\"menuitem\"]") ?? []), n = t.indexOf(document.activeElement), r = (n) => {
			e.preventDefault(), t[(n + t.length) % t.length]?.focus({ preventScroll: !0 });
		};
		switch (e.key) {
			case "Escape":
				_e(e), typeof c.current?.hidePopover != "function" && p();
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
	return s("div", {
		ref: c,
		className: "uppy-ProviderBrowserItem-actionsMenu",
		popover: "auto",
		role: "menu",
		"aria-label": o("itemActionsNamed", { name: e.data.name ?? o("unnamed") }),
		style: l ? {
			top: `${l.top}px`,
			..."left" in l ? { left: `${l.left}px` } : { right: `${l.right}px` }
		} : { visibility: "hidden" },
		onKeyDown: v,
		children: t.map((t) => s("button", {
			type: "button",
			role: "menuitem",
			className: (0, I.default)("uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-actionsMenuItem", t.danger && "uppy-ProviderBrowserItem-actionsMenuItem--danger"),
			onClick: (n) => {
				n.stopPropagation(), n.preventDefault(), p(), i(t, e);
			},
			children: t.label
		}, t.id))
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/useItemMenu.js
function ye(e) {
	let [t, n] = f(null), r = t ? e.find(({ id: e }) => e === t.id) : void 0;
	return {
		open: t && r ? {
			item: r,
			anchor: t.anchor
		} : null,
		close: g(() => n(null), []),
		toggle: g((e, t) => n((n) => n?.id === e ? null : {
			id: e,
			anchor: t
		}), [])
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ItemIcon.js
function be() {
	return s("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: 11,
		height: 14.5,
		viewBox: "0 0 44 58",
		children: s("path", { d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z" })
	});
}
function xe() {
	return s("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		style: {
			minWidth: 16,
			marginRight: 3
		},
		viewBox: "0 0 276.157 276.157",
		children: s("path", { d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z" })
	});
}
function Se() {
	return s("svg", {
		"aria-hidden": "true",
		focusable: "false",
		style: {
			width: 16,
			marginRight: 4
		},
		viewBox: "0 0 58 58",
		children: [s("path", { d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z" }), s("path", { d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z" })]
	});
}
function W({ itemIconString: e, alt: t = void 0 }) {
	if (e === null) return null;
	switch (e) {
		case "file": return s(be, {});
		case "folder": return s(xe, {});
		case "video": return s(Se, {});
		default: return s("img", {
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
function G({ file: e, toggleCheckbox: t, className: n, isDisabled: r, restrictionError: i, showTitles: a, children: o = null, i18n: l, actionsMenu: u = null, selectable: d = !0, onFileClick: f }) {
	let p = e.data.name ?? l("unnamed"), m = s(c, { children: [
		s(W, { itemIconString: e.data.thumbnail || e.data.icon }),
		a && p,
		o
	] });
	return s("li", {
		className: n,
		title: r && i ? i : void 0,
		children: [
			d && s("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid",
				onChange: t,
				name: "listitem",
				id: e.id,
				checked: e.status === "checked",
				disabled: r,
				"data-uppy-super-focusable": !0
			}),
			!d && f && !e.data.isFolder ? s("button", {
				type: "button",
				"aria-label": l("openFileNamed", { name: p }),
				"data-uppy-item-id": e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				onClick: () => f(e),
				children: m
			}) : s("label", {
				htmlFor: d ? e.id : void 0,
				"aria-label": p,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: m
			}),
			u
		]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/components/ListItem.js
function Ce({ file: e, openFolder: t, className: n, isDisabled: r, restrictionError: i, toggleCheckbox: a, showTitles: o, i18n: l, actionsMenu: u = null, selectable: d = !0, onFileClick: f }) {
	let p = s(c, { children: [s("div", {
		className: "uppy-ProviderBrowserItem-iconWrap",
		children: s(W, { itemIconString: e.data.icon })
	}), o && s("span", {
		className: "uppy-truncate-text",
		children: e.data.name ?? l("unnamed")
	})] });
	return s("li", {
		className: n,
		title: e.status !== "checked" && i ? i : void 0,
		children: [
			d && s("input", {
				type: "checkbox",
				className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox",
				onChange: a,
				name: "listitem",
				id: e.id,
				checked: e.status === "checked",
				"aria-label": e.data.isFolder ? l("allFilesFromFolderNamed", { name: e.data.name ?? l("unnamed") }) : null,
				disabled: r,
				"data-uppy-super-focusable": !0
			}),
			e.data.isFolder ? s("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				onClick: () => t(e.id),
				"aria-label": l("openFolderNamed", { name: e.data.name ?? l("unnamed") }),
				children: [s("div", {
					className: "uppy-ProviderBrowserItem-iconWrap",
					children: s(W, { itemIconString: e.data.icon })
				}), o && e.data.name ? s("span", {
					className: "uppy-truncate-text",
					children: e.data.name
				}) : l("unnamed")]
			}) : d ? s("label", {
				htmlFor: e.id,
				className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
				children: p
			}) : s("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
				onClick: () => f?.(e),
				"data-uppy-item-id": e.id,
				"aria-label": l("openFileNamed", { name: e.data.name ?? l("unnamed") }),
				children: p
			}),
			u
		]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Item/index.js
function we(e) {
	let { viewType: t, toggleCheckbox: n, showTitles: r, i18n: i, openFolder: a, file: o, utmSource: c, actions: l = [], menuOpen: u = !1, toggleMenu: d, selectable: f = !0, onFileClick: p } = e, m = l.length > 0 && d ? s(ge, {
		file: o,
		actions: l,
		open: u,
		onToggle: d,
		i18n: i
	}) : null, h = o.type === "folder" ? null : o.restrictionError, g = !!h && o.status !== "checked", _ = {
		file: o,
		openFolder: a,
		toggleCheckbox: n,
		utmSource: c,
		i18n: i,
		viewType: t,
		showTitles: r,
		className: (0, I.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": g }, { "uppy-ProviderBrowserItem--noPreview": o.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": o.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": o.status === "partial" }),
		isDisabled: g,
		restrictionError: h,
		actionsMenu: m,
		selectable: f,
		onFileClick: p
	};
	switch (t) {
		case "grid": return s(G, { ..._ });
		case "list": return s(Ce, { ..._ });
		case "unsplash": return s(G, {
			..._,
			children: s("a", {
				href: `${o.data.author.url}?utm_source=${c}&utm_medium=referral`,
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
function Te(e) {
	let { displayedPartialTree: t, viewType: n, toggleCheckbox: r, handleScroll: i, showTitles: a, i18n: o, isLoading: c, onCancelLoading: l, openFolder: u, noResultsLabel: d, virtualList: p, utmSource: h, actions: g = [], runAction: v, selectable: y = !0, onFileClick: b } = e, [x, S] = f(!1), C = ye(t), w = _(null);
	m(() => {
		let e = (e) => {
			e.key === "Shift" && S(!1);
		}, t = (e) => {
			e.key === "Shift" && S(!0);
		};
		return document.addEventListener("keyup", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("keyup", e), document.removeEventListener("keydown", t);
		};
	}, []);
	let T = _(null), E = !!(c && l);
	if (m(() => {
		E && T.current?.focus();
	}, [E]), c) return s("div", {
		className: "uppy-Provider-loading",
		children: [s("span", {
			role: "status",
			children: typeof c == "string" ? c : o("loading")
		}), l && s("button", {
			ref: T,
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Provider-loadingCancel",
			onClick: l,
			children: o("stopOperation")
		})]
	});
	if (t.length === 0) return s("div", {
		className: "uppy-Provider-empty",
		children: d
	});
	let D = (e) => s(we, {
		viewType: n,
		toggleCheckbox: (t) => {
			t.stopPropagation(), t.preventDefault(), document.getSelection()?.removeAllRanges(), r(e, x);
		},
		showTitles: a,
		i18n: o,
		openFolder: u,
		file: e,
		utmSource: h,
		actions: g,
		menuOpen: C.open?.item.id === e.id,
		toggleMenu: v ? (t) => C.toggle(e.id, t) : void 0,
		selectable: y,
		onFileClick: b
	}, e.id), O = C.open && v ? s(ve, {
		file: C.open.item,
		actions: B(g, C.open.item),
		anchor: C.open.anchor,
		containerRef: w,
		runAction: v,
		onClose: C.close,
		i18n: o
	}, C.open.item.id) : null;
	return p ? s("div", {
		className: "uppy-ProviderBrowser-body",
		ref: w,
		children: [s(k, {
			className: "uppy-ProviderBrowser-list",
			data: t,
			renderRow: D,
			rowHeight: 35.5
		}), O]
	}) : s("div", {
		className: "uppy-ProviderBrowser-body",
		ref: w,
		children: [s("ul", {
			className: "uppy-ProviderBrowser-list",
			onScroll: i,
			tabIndex: -1,
			children: t.map(D)
		}), O]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/BulkActions.js
function Ee({ selectedCount: e, bulkActions: t, runBulkAction: n, i18n: r }) {
	return e === 0 || t.length === 0 ? null : s("div", {
		className: "uppy-ProviderBrowser-footer",
		children: s("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [s("span", {
				className: "uppy-ProviderBrowser-footer-count",
				children: r("itemsSelected", { smart_count: e })
			}), t.map((e) => s("button", {
				type: "button",
				className: (0, I.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-ProviderDialog-confirm--danger": e.danger }),
				onClick: () => n(e),
				children: e.label
			}, e.id))]
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/utils/PartialTreeUtils/getNumberOfSelectedFiles.js
var K = (e) => e.filter((t) => t.type === "file" && t.status === "checked" || t.type === "folder" && t.status === "checked" && !e.some((e) => e.type !== "root" && e.parentId === t.id)).length;
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/FooterActions.js
function De({ cancelSelection: e, donePicking: t, i18n: n, partialTree: r, validateAggregateRestrictions: i }) {
	let a = p(() => i(r), [r, i]), o = p(() => K(r), [r]);
	return o === 0 ? null : s("div", {
		className: "uppy-ProviderBrowser-footer",
		children: [s("div", {
			className: "uppy-ProviderBrowser-footer-buttons",
			children: [s("button", {
				className: (0, I.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", { "uppy-c-btn--disabled": a }),
				disabled: !!a,
				onClick: t,
				type: "button",
				children: n("selectX", { smart_count: o })
			}), s("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
				onClick: e,
				type: "button",
				children: n("cancel")
			})]
		}), a && s("div", {
			className: "uppy-ProviderBrowser-footer-error",
			children: a
		})]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ItemDetailDialog.js
function Oe({ item: e, actions: t, runAction: n, getPreviewUrl: r, onClose: i, i18n: a }) {
	let [o, l] = f(null), u = d(), [p] = f(e);
	m(() => {
		if (!r || p.data.isFolder) return;
		let e = !1;
		return Promise.resolve().then(() => r(p)).then((t) => {
			e || l(t);
		}).catch(() => {}), () => {
			e = !0;
		};
	}, [r, p]);
	let h = e.data.name ?? a("unnamed"), g = B(t, e), _ = e.type === "file" ? e.data : void 0, v = _?.size, y = _?.mimeType, x = _?.modifiedDate;
	return s(H, {
		className: "uppy-ProviderDialog uppy-ItemDetail",
		"aria-labelledby": u,
		onDismiss: i,
		restoreFocus: (t) => {
			let n = t.closest(".uppy-ProviderBrowser");
			return n?.querySelector(`[data-uppy-item-id="${CSS.escape(e.id)}"]`) ?? n?.querySelector(".uppy-ProviderBrowser-list");
		},
		children: [
			s("header", {
				className: "uppy-ItemDetail-header",
				children: [s("h3", {
					id: u,
					className: "uppy-ItemDetail-name",
					children: h
				}), s("button", {
					type: "button",
					className: "uppy-u-reset uppy-c-btn uppy-ItemDetail-close",
					"aria-label": a("close"),
					onClick: i,
					children: s("svg", {
						"aria-hidden": "true",
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						children: s("path", {
							d: "M2 2l10 10M12 2L2 12",
							stroke: "currentColor",
							"stroke-width": "1.6",
							"stroke-linecap": "round"
						})
					})
				})]
			}),
			s("div", {
				className: "uppy-ItemDetail-body",
				children: [s("div", {
					className: "uppy-ItemDetail-preview",
					"data-testid": "file-detail-preview",
					children: o ? s("img", {
						src: o,
						alt: "",
						className: "uppy-ItemDetail-previewImage"
					}) : s("span", {
						className: "uppy-ItemDetail-previewIcon",
						"aria-hidden": "true",
						children: s(W, { itemIconString: e.data.icon })
					})
				}), s("dl", {
					className: "uppy-ItemDetail-facts",
					children: [
						typeof v == "number" ? s(c, { children: [s("dt", { children: a("detailSize") }), s("dd", { children: b(v) })] }) : null,
						y ? s(c, { children: [s("dt", { children: a("detailType") }), s("dd", { children: y })] }) : null,
						x ? s(c, { children: [s("dt", { children: a("detailModified") }), s("dd", { children: x })] }) : null
					]
				})]
			}),
			s("footer", {
				className: "uppy-ItemDetail-actions",
				children: g.map((t) => s("button", {
					type: "button",
					className: (0, I.default)("uppy-u-reset uppy-c-btn uppy-ItemDetail-action", t.danger && "uppy-ItemDetail-action--danger"),
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
function ke({ dialog: e, i18n: t, onConfirm: n, onCancel: r }) {
	let [i, a] = f(e.kind === "prompt" ? e.defaultValue ?? "" : ""), o = _(null), c = _(null), l = _(null), u = d(), p = e.kind === "prompt", h = e.kind === "confirm" && e.danger === !0;
	return m(() => {
		(o.current ?? (h ? l : c).current)?.focus(), o.current?.select();
	}, [h]), s(H, {
		className: "uppy-ProviderDialog",
		"aria-labelledby": u,
		onDismiss: r,
		children: s("form", {
			className: "uppy-ProviderDialog-form",
			onSubmit: (e) => {
				e.preventDefault(), n(p ? i : void 0);
			},
			children: [
				s("h3", {
					id: u,
					className: "uppy-ProviderDialog-title",
					children: e.title
				}),
				e.kind === "prompt" ? s("label", {
					className: "uppy-ProviderDialog-label",
					children: [e.label && s("span", {
						className: "uppy-ProviderDialog-labelText",
						children: e.label
					}), s("input", {
						ref: o,
						type: "text",
						className: "uppy-u-reset uppy-c-textInput uppy-ProviderDialog-input",
						value: i,
						onInput: (e) => a(e.target.value)
					})]
				}) : e.message && s("p", {
					className: "uppy-ProviderDialog-message",
					children: e.message
				}),
				s("div", {
					className: "uppy-ProviderDialog-actions",
					children: [s("button", {
						ref: l,
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
						onClick: r,
						children: t("cancel")
					}), s("button", {
						ref: c,
						type: "submit",
						className: (0, I.default)("uppy-u-reset uppy-c-btn uppy-c-btn-primary", h && "uppy-ProviderDialog-confirm--danger"),
						children: e.confirmLabel ?? t("dialogConfirm")
					})]
				})
			]
		})
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderDialogController.js
var Ae = class {
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
}, je = (e, t, n) => {
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
}, Me = (e, t, n) => {
	let r = e.map((e) => je(e, t, n)), i = [], a = [];
	r.forEach((e) => {
		t.uppy.checkIfFileAlreadyExists(D(e, t.uppy.getID())) ? a.push(e) : i.push(e);
	}), i.length > 0 && t.uppy.info(t.uppy.i18n("addedNumFiles", { numFiles: i.length })), a.length > 0 && t.uppy.info(`Not adding ${a.length} files because they already exist`), t.uppy.addFiles(i);
}, Ne = (e, t, n, r) => {
	let i = t.findIndex((e) => e.id === r);
	if (i !== -1 && n) {
		let n = t.findIndex((t) => t.id === e);
		return t.slice(Math.min(i, n), Math.max(i, n) + 1).map((e) => e.id);
	}
	return [e];
}, q = (e) => (t) => {
	if (i(t)) return;
	let n = o(t);
	if (r(n)) {
		e.log("Aborting request", "warning");
		return;
	}
	e.log(n, "error"), n.name === "UserFacingApiError" && e.info({
		message: e.i18n("companionError"),
		details: R(e.i18n, n)
	}, "warning", 5e3);
}, J = (e, t) => {
	let n = e.find((e) => e.id === t), r = [];
	for (; r = [n, ...r], n.type !== "root";) {
		let t = n.parentId;
		n = e.find((e) => e.id === t);
	}
	return r;
}, Y = (e, t, n) => {
	let r = t === null ? "null" : t;
	if (n[r]) return n[r];
	let i = e.find((e) => e.id === t);
	if (i.type === "root") return [];
	let a = [...Y(e, i.parentId, n), i];
	return n[r] = a, a;
}, Pe = (e) => {
	let t = Object.create(null);
	return e.filter((e) => e.type === "file" && e.status === "checked").map((n) => {
		let r = Y(e, n.id, t), i = r.findIndex((e) => e.type === "folder" && e.status === "checked"), a = r.slice(i), o = `/${r.map((e) => e.data.name).join("/")}`, s = a.length === 1 ? void 0 : a.map((e) => e.data.name).join("/");
		return {
			...n.data,
			absDirPath: o,
			relDirPath: s
		};
	});
}, Fe = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
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
})))(), 1), Ie = class e extends Error {
	name = "TimeoutError";
	constructor(t, n) {
		super(t, n), Error.captureStackTrace?.(this, e);
	}
}, X = (e) => e.reason ?? new DOMException("This operation was aborted.", "AbortError");
function Le(e, t) {
	let { milliseconds: n, fallback: r, message: i, customTimers: a = {
		setTimeout,
		clearTimeout
	}, signal: o } = t, s, c, l = new Promise((t, l) => {
		if (typeof n != "number" || Math.sign(n) !== 1) throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${n}\``);
		if (o?.aborted) {
			l(X(o)), e.then(t, l);
			return;
		}
		if (o && (c = () => {
			l(X(o));
		}, o.addEventListener("abort", c, { once: !0 })), e.then(t, l), n === Infinity) return;
		let u = new Ie();
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
function Re(e, t, n) {
	let r = 0, i = e.length;
	for (; i > 0;) {
		let a = Math.trunc(i / 2), o = r + a;
		n(e[o], t) <= 0 ? (r = ++o, i -= a + 1) : i = a;
	}
	return r;
}
//#endregion
//#region node_modules/p-queue/dist/priority-queue.js
var ze = 100, Z = class {
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
		let o = Re(this.#e, a, (e, t) => t.priority - e.priority);
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
		return this.#t++, this.#t === this.#e.length ? (this.#e.length = 0, this.#t = 0) : this.#t > ze && this.#t > this.#e.length / 2 && this.#n(), e?.run;
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
}, Be = class extends Fe.default {
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
			queueClass: Z,
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
					if (t.timeout !== void 0 && (r = Le(Promise.resolve(r), {
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
				if (this.#p instanceof Z) {
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
}, Ve = (e) => e.map((e) => ({ ...e })), He = async (e, t, n, r, i) => {
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
		e.add(() => He(e, t, n, r, i));
	});
}, Ue = async (e, t, n, r) => {
	let i = new Be({ concurrency: 6 }), a = Ve(e);
	return a.filter((e) => e.type === "folder" && e.status === "checked" && (e.cached === !1 || e.nextPagePath)).forEach((e) => {
		i.add(() => He(i, a, e, t, n));
	}), i.on("completed", () => {
		let e = a.filter((e) => e.type === "file" && e.status === "checked").length;
		r(e);
	}), await i.onIdle(), a;
}, We = (e, t, n, r, i) => {
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
}, Ge = (e, t, n, r, i) => {
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
}, Ke = (e, t, n) => {
	e.filter((e) => e.type !== "root" && e.parentId === t).forEach((t) => {
		t.status = n && !(t.type === "file" && t.restrictionError) ? "checked" : "unchecked", Ke(e, t.id, n);
	});
}, qe = (e, t) => {
	let n = e.find((e) => e.id === t);
	if (n.type === "root") return;
	let r = e.filter((e) => e.type !== "root" && e.parentId === n.id && !(e.type === "file" && e.restrictionError)), i = r.every((e) => e.status === "checked"), a = r.every((e) => e.status === "unchecked");
	n.status = i && n.cached ? "checked" : a ? "unchecked" : "partial", qe(e, n.parentId);
}, Q = {
	afterOpenFolder: We,
	afterScrollFolder: Ge,
	afterToggleCheckbox: (e, t) => {
		let n = Ve(e), r = n.filter((e) => e.type !== "root" && t.includes(e.id));
		return r.forEach((e) => {
			let t = e.status === "checked" ? "unchecked" : "checked";
			e.status = e.type === "file" && e.restrictionError ? "unchecked" : t, Ke(n, e.id, e.status === "checked");
		}), qe(n, r[0].parentId), n;
	},
	afterFill: Ue
}, Je = (e) => {
	let { scrollHeight: t, scrollTop: n, offsetHeight: r } = e.target;
	return t - (n + r) < 50;
}, Ye = ({ i18n: e, item: t, toggleCheckbox: n, openFolder: r }) => {
	let i = "restrictionError" in t && t.restrictionError != null && t.status !== "checked";
	return s("li", {
		className: (0, I.default)("uppy-ProviderBrowserItem", { "uppy-ProviderBrowserItem--disabled": i }, { "uppy-ProviderBrowserItem--noPreview": t.data.icon === "video" }, { "uppy-ProviderBrowserItem--is-checked": t.status === "checked" }, { "uppy-ProviderBrowserItem--is-partial": t.status === "partial" }),
		title: ("restrictionError" in t ? t.restrictionError : void 0) ?? void 0,
		children: [s("input", {
			type: "checkbox",
			className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox",
			onChange: () => n(t, !1),
			checked: t.status === "checked",
			"aria-label": t.data.name ?? e("unnamed"),
			disabled: i,
			"data-uppy-super-focusable": !0
		}), s("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowserItem-inner",
			disabled: i,
			"aria-label": t.data.name,
			onClick: () => {
				t.data.isFolder && r(t.id);
			},
			children: [s("div", {
				className: "uppy-ProviderBrowserItem-iconWrap",
				children: s(W, { itemIconString: t.data.icon })
			}), t.data.name ?? e("unnamed")]
		})]
	});
}, Xe = ({ searchResults: e, toggleCheckbox: t, openFolder: n, i18n: r }) => e.length === 0 ? s("div", {
	className: "uppy-Provider-empty",
	children: r("noFilesFound")
}) : s("div", {
	className: "uppy-ProviderBrowser-body",
	children: s("ul", {
		className: "uppy-ProviderBrowser-list",
		children: e.map((e) => s(Ye, {
			i18n: r,
			item: e,
			toggleCheckbox: t,
			openFolder: n
		}, e.id))
	})
});
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/Breadcrumbs.js
function Ze(e) {
	let { openFolder: t, title: n, breadcrumbsIcon: r, breadcrumbs: i, i18n: a, disabled: o = !1 } = e;
	return s("div", {
		className: "uppy-Provider-breadcrumbs",
		children: [s("div", {
			className: "uppy-Provider-breadcrumbsIcon",
			children: r
		}), i.map((e, r) => {
			let l = e.type === "root" ? n : e.data.name ?? a("unnamed"), u = i.length === r + 1;
			return s(c, { children: [s("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn",
				onClick: u ? void 0 : () => t(e.id),
				"aria-current": u ? "page" : void 0,
				disabled: !u && o,
				title: l,
				children: l
			}), !u && s("span", {
				"aria-hidden": "true",
				className: "uppy-Provider-breadcrumbsSeparator",
				children: "/"
			})] }, e.id);
		})]
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/User.js
function Qe({ i18n: e, logout: t, username: n, disabled: r = !1 }) {
	return s(c, { children: [n && s("span", {
		className: "uppy-ProviderBrowser-user",
		children: n
	}, "username"), s("button", {
		type: "button",
		onClick: t,
		disabled: r,
		className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-userLogout",
		children: e("logOut")
	}, "logout")] });
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/Header.js
function $e(e) {
	let t = e.toolbarActions ?? [], n = e.busy ?? !1;
	return s("div", {
		className: "uppy-ProviderBrowser-header",
		children: s("div", {
			className: (0, I.default)("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple"),
			children: [
				e.showBreadcrumbs && s(Ze, {
					openFolder: e.openFolder,
					breadcrumbs: e.breadcrumbs,
					breadcrumbsIcon: e.pluginIcon?.(),
					title: e.title,
					i18n: e.i18n,
					disabled: n
				}),
				(t.length > 0 || e.selectionToggle) && s("div", {
					className: "uppy-ProviderBrowser-toolbar",
					children: [e.selectionToggle && s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: e.selectionToggle.onToggle,
						disabled: n,
						children: e.selectionToggle.active ? e.i18n("cancelSelection") : e.i18n("selectMultiple")
					}), t.map((t) => s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-ProviderBrowser-toolbarBtn",
						onClick: () => e.runToolbarAction?.(t),
						disabled: n,
						children: t.label
					}, t.id))]
				}),
				!e.standalone && s(Qe, {
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
function et() {
	return s("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "30",
		height: "30",
		viewBox: "0 0 30 30",
		children: s("path", { d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z" })
	});
}
var tt = (e) => ({
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
function $(e, t) {
	let n = [t], r = e.get(t.parentId);
	for (; r && r.type !== "root";) n.push(r), r = e.get(r.parentId);
	return n;
}
var nt = class e {
	static VERSION = a.version;
	static [Symbol.for("uppy test: searchDebounceMs")];
	plugin;
	provider;
	opts;
	isHandlingScroll = !1;
	previousCheckbox = null;
	#e;
	constructor(t, n) {
		this.plugin = t, this.provider = n.provider, this.#c = new Ae(t);
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
		this.#e = (0, fe.default)(this.#f, a, o);
	}
	resetPluginState() {
		this.#s.clear(), this.#c.cancel(), this.plugin.setPluginState(tt(this.plugin.rootFolderId));
	}
	refreshCurrentFolder = async (e = !1) => {
		let { partialTree: t, currentFolderId: n } = this.plugin.getPluginState();
		if (t == null || this.#i) return;
		let r = ++this.#o, i = t.flatMap((e) => e.type !== "root" && e.parentId === n && e.status === "checked" ? [e.id] : []), a = new Map(t.map((e) => [e.id, e])), o = (e) => $(a, e).some(({ parentId: e }) => e === n), s = new Set(J(t, n).map((e) => e.id)), c = t.filter((e) => e.type === "root" || !o(e)).filter((t) => !e || s.has(t.id)).map((t) => (e || t.id === n) && t.type !== "file" ? {
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
		f.length > 0 && this.plugin.setPluginState({ partialTree: Q.afterToggleCheckbox(l, f) });
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
		if (r(e)) {
			t.log("[ProviderView] action cancelled", "warning");
			return;
		}
		t.log(`[ProviderView] action failed: ${u(e)}`, "error");
		let a = e instanceof Error && e.name === "UserFacingApiError" ? R(t.i18n, e) : e instanceof n || i(e) ? t.i18n("companionError") : t.i18n("actionFailed");
		t.info(a, "error", 5e3);
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
		let { partialTree: e } = this.plugin.getPluginState(), t = new Map(e.map((e) => [e.id, e])), n = e.filter((e) => e.type !== "root" && e.status === "checked" && (e.type === "file" || $(t, e).some(({ id: e }) => this.#s.has(e)))), r = new Set(n.map((e) => e.id));
		return n.filter((e) => !$(t, e).slice(1).some(({ id: e }) => r.has(e)));
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
		}).catch(q(this.plugin.uppy)), this.#d();
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
			let o = Q.afterOpenFolder(t, a, n, i, this.validateSingleFile);
			this.plugin.setPluginState({
				partialTree: o,
				currentFolderId: e,
				searchString: ""
			});
		}).catch(q(this.plugin.uppy)), this.#d();
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
					...tt(this.plugin.rootFolderId),
					authenticated: !1
				});
			}
		}).catch(q(this.plugin.uppy));
	}
	async handleAuth(e) {
		await this.#u(async (t) => {
			this.setLoading(!0), await this.provider.login({
				authFormData: e,
				signal: t
			}), this.plugin.setPluginState({ authenticated: !0 }), await Promise.all([this.provider.fetchPreAuthToken(), this.openFolder(this.plugin.rootFolderId)]);
		}).catch(q(this.plugin.uppy)), this.#d();
	}
	async handleScroll(e) {
		Je(e) && await this.loadNextPage();
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
				let s = Q.afterScrollFolder(o.partialTree, t, a, i, this.validateSingleFile);
				this.plugin.setPluginState({ partialTree: s }), r = !0;
			}).catch(q(this.plugin.uppy)), this.isHandlingScroll = !1, r;
		}
		return !1;
	}
	validateSingleFile = (e) => {
		let t = O(e);
		return this.plugin.uppy.validateSingleFile(t);
	};
	async donePicking() {
		let { partialTree: e } = this.plugin.getPluginState();
		this.isLoading || (this.setLoading(!0), await this.#u(async (t) => {
			let n = await Q.afterFill(e, (e) => this.provider.list(e, { signal: t }), this.validateSingleFile, (e) => {
				this.setLoading(this.plugin.uppy.i18n("addedNumFiles", { numFiles: e }));
			});
			if (this.validateAggregateRestrictions(n)) {
				this.plugin.setPluginState({ partialTree: n });
				return;
			}
			Me(Pe(n), this.plugin, this.provider), this.resetPluginState();
		}).catch(q(this.plugin.uppy)), this.#d());
	}
	toggleCheckbox(e, t) {
		let { partialTree: n } = this.plugin.getPluginState(), r = Ne(e.id, this.getDisplayedPartialTree(), t, this.previousCheckbox), i = Q.afterToggleCheckbox(n, r), a = new Map(i.map((e) => [e.id, e.type === "root" ? void 0 : e.status]));
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
		return J(e, t);
	};
	getSelectedAmount = () => {
		let { partialTree: e } = this.plugin.getPluginState();
		return K(e);
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
		return s(Xe, {
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
		}, { authenticated: a, loading: o } = this.plugin.getPluginState(), c = this.plugin.icon || et;
		if (a === !1) return s(v, {
			pluginName: this.plugin.title,
			pluginIcon: c,
			handleAuth: this.handleAuth,
			i18n: this.plugin.uppy.i18n,
			renderForm: i.renderAuthForm,
			loading: o
		});
		let { partialTree: l, currentFolderId: u, username: d, searchString: f, searchResults: p, dialog: m, selectionActive: h = !1, detailItemId: g } = this.plugin.getPluginState(), _ = this.getBreadcrumbs(), y = i.mode === "manager", b = !y || h, x = this.#i !== void 0, S = l.find(({ id: e }) => e === u), C = S?.type !== "file" && S?.cached === !0 && !l.some((e) => e.type !== "root" && e.parentId === u);
		g && (this.#a = l.find((e) => e.type !== "root" && e.id === g) ?? this.#a);
		let w = this.#a?.id === g ? this.#a : void 0;
		return s("div", {
			className: (0, I.default)("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${i.viewType}`),
			children: [
				s($e, {
					showBreadcrumbs: i.showBreadcrumbs,
					openFolder: this.openFolder,
					breadcrumbs: _,
					pluginIcon: c,
					title: this.plugin.title,
					logout: this.logout,
					username: d,
					i18n: r,
					toolbarActions: i.toolbarActions ?? [],
					runToolbarAction: this.runToolbarAction,
					standalone: i.standalone ?? !1,
					selectionToggle: y && (i.bulkActions?.length ?? 0) > 0 && (h || !C) ? {
						active: h,
						onToggle: this.toggleSelectionMode
					} : void 0,
					busy: x
				}),
				i.showFilter && s(he, {
					value: f,
					onChange: (e) => this.onSearchInput(e),
					onSubmit: () => {},
					inputLabel: r("filter"),
					i18n: r,
					disabled: x
				}),
				p ? this.#h() : s(Te, {
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
					selectable: b,
					onFileClick: y && !h ? this.openItemDetail : void 0
				}),
				x ? null : y ? h && s(Ee, {
					selectedCount: this.getBulkActionItems().length,
					bulkActions: i.bulkActions ?? [],
					runBulkAction: this.runBulkAction,
					i18n: r
				}) : s(De, {
					partialTree: l,
					donePicking: this.donePicking,
					cancelSelection: this.cancelSelection,
					i18n: r,
					validateAggregateRestrictions: this.validateAggregateRestrictions
				}),
				w && s(Oe, {
					item: w,
					actions: i.actions ?? [],
					runAction: this.runAction,
					getPreviewUrl: i.getPreviewUrl,
					onClose: this.closeItemDetail,
					i18n: r
				}, w.id),
				m && s(ke, {
					dialog: m,
					i18n: r,
					onConfirm: this.#c.submit,
					onCancel: this.#c.cancel
				}, this.#c.revision)
			]
		});
	}
};
//#endregion
export { N as a, D as c, b as d, P as i, S as l, et as n, A as o, F as r, k as s, nt as t, x as u };
