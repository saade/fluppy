import { n as e } from "./fluppy-rolldown-runtime-B0aSnxlc.js";
import { t } from "./fluppy-RequestClient-Df9M7aiv.js";
import { a as n, i as r, l as i, r as a, s as o, t as s, u as c } from "./fluppy-UIPlugin-ihypjxg2.js";
import { i as l, n as u, o as d, r as f, t as p } from "./fluppy-hooks.module-DqAiOXxL.js";
import { t as m } from "./fluppy-AuthView-CI-CoxsO.js";
//#region node_modules/preact/compat/dist/compat.module.js
function h(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function g(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function _(e, t) {
	var n = t(), r = l({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return f(function() {
		i.__ = n, i.u = t, v(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), d(function() {
		return v(i) && a({ t: i }), e(function() {
			v(i) && a({ t: i });
		});
	}, [e]), n;
}
function v(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function y(e, t) {
	this.props = e, this.context = t;
}
(y.prototype = new r()).isPureReactComponent = !0, y.prototype.shouldComponentUpdate = function(e, t) {
	return g(this.props, e) || g(this.state, t);
};
var b = c.__b;
c.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), b && b(e);
}, typeof Symbol < "u" && Symbol.for;
var x = c.__e;
c.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	x(e, t, n, r);
};
var S = c.unmount;
function C(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = h({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return C(e, t, n);
	})), e;
}
function w(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return w(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function T() {
	this.__u = 0, this.o = null, this.__b = null;
}
function E(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function D() {
	this.i = null, this.l = null;
}
c.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), S && S(e);
}, (T.prototype = new r()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = E(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = w(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, T.prototype.componentWillUnmount = function() {
	this.o = [];
}, T.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = C(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var a = t.__a && i(o, null, e.fallback);
	return a && (a.__u &= -33), [i(o, null, t.__a ? null : e.children), a];
};
var O = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(D.prototype = new r()).__a = function(e) {
	var t = this, n = E(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), O(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, D.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = n(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var r = t.length; r--;) this.l.set(t[r], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, D.prototype.componentDidUpdate = D.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		O(e, n, t);
	});
};
var k = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, A = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ee = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, te = /[A-Z0-9]/g, ne = typeof document < "u", re = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
r.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(r.prototype, e, {
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
});
var j = c.event;
c.event = function(e) {
	return j && (e = j(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var M = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, N = c.vnode;
c.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, r = e.type, i = {}, a = r.indexOf("-") == -1;
		for (var o in t) {
			var s = t[o];
			if (!(o === "value" && "defaultValue" in t && s == null || ne && o === "children" && r === "noscript" || o === "class" || o === "className")) {
				var c = o.toLowerCase();
				o === "defaultValue" && "value" in t && t.value == null ? o = "value" : o === "download" && !0 === s ? s = "" : c === "translate" && s === "no" ? s = !1 : c[0] === "o" && c[1] === "n" ? c === "ondoubleclick" ? o = "ondblclick" : c !== "onchange" || r !== "input" && r !== "textarea" || re(t.type) ? c === "onfocus" ? o = "onfocusin" : c === "onblur" ? o = "onfocusout" : ee.test(o) && (o = c) : c = o = "oninput" : a && A.test(o) ? o = o.replace(te, "-$&").toLowerCase() : s === null && (s = void 0), c === "oninput" && i[o = c] && (o = "oninputCapture"), i[o] = s;
			}
		}
		r == "select" && (i.multiple && Array.isArray(i.value) && (i.value = n(t.children).forEach(function(e) {
			e.props.selected = i.value.indexOf(e.props.value) != -1;
		})), i.defaultValue != null && (i.value = n(t.children).forEach(function(e) {
			e.props.selected = i.multiple ? i.defaultValue.indexOf(e.props.value) != -1 : i.defaultValue == e.props.value;
		}))), t.class && !t.className ? (i.class = t.class, Object.defineProperty(i, "className", M)) : t.className && (i.class = i.className = t.className), e.props = i;
	}(e), e.$$typeof = k, N && N(e);
};
var P = c.__r;
c.__r = function(e) {
	P && P(e), e.__c;
};
var F = c.diffed;
c.diffed = function(e) {
	F && F(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/googlePicker.js
var I = (e) => ({ authorization: `Bearer ${e}` }), L = /* @__PURE__ */ new Set(), R = !1;
async function z(e) {
	L.has(e) || (await new Promise((t, n) => {
		let r = document.createElement("script");
		r.src = e, r.addEventListener("load", () => t()), r.addEventListener("error", (e) => n(e.error)), document.head.appendChild(r);
	}), L.add(e));
}
async function B(e) {
	await Promise.all([z("https://accounts.google.com/gsi/client"), (async () => {
		await z("https://apis.google.com/js/api.js"), e === "drive" && !R && (await new Promise((e) => gapi.load("client:picker", () => e())), await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"), R = !0);
	})()]);
}
async function V(e, t) {
	return !!(await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${encodeURIComponent(e)}`, { signal: t })).ok;
}
async function H({ pickerType: e, clientId: t, accessToken: n }) {
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
async function U(e) {
	await new Promise((t) => google.accounts.oauth2.revoke(e, t));
}
var W = class extends Error {
	constructor() {
		super("Invalid or expired token"), this.name = "InvalidTokenError";
	}
};
async function G({ doc: e, token: t, signal: n }) {
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
	let r = I(t), i = [], a;
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
		for (let e of c.files) i.push(...await G({
			doc: e,
			token: t,
			signal: n
		}));
	} while (a);
	return i;
}
async function K({ token: e, apiKey: t, appId: n, onFilesPicked: r, signal: i, onLoadingChange: a, onError: o }) {
	if (!await V(e, i)) throw new W();
	let s = new google.picker.PickerBuilder().enableFeature(google.picker.Feature.NAV_HIDDEN).enableFeature(google.picker.Feature.MULTISELECT_ENABLED).setDeveloperKey(t).setAppId(n).setOAuthToken(e).addView(new google.picker.DocsView(google.picker.ViewId.DOCS).setIncludeFolders(!0).setSelectFolderEnabled(!0).setMode(google.picker.DocsViewMode.LIST)).setCallback(async (t) => {
		if (t.action === google.picker.Action.PICKED) try {
			a(!0);
			let n = [];
			for (let r of t.docs ?? []) n.push(...await G({
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
async function q({ token: e, pickingSession: t, onPickingSessionChange: n, signal: r }) {
	let i = I(e), a = t;
	if (a == null) {
		let e = await fetch("https://photospicker.googleapis.com/v1/sessions", {
			method: "post",
			headers: i,
			signal: r
		});
		if (e.status === 401 && (await e.json()).error?.status === "UNAUTHENTICATED") throw new W();
		if (!e.ok) throw Error("Failed to create a session");
		a = await e.json(), n(a);
	}
	let o = window.open(a.pickerUri);
	r?.addEventListener("abort", () => o?.close());
}
async function J({ accessToken: e, pickingSession: t, signal: n }) {
	let r = I(e), i, a = [];
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
async function Y({ getPickingSession: e, getAccessToken: t, onPickingSessionClear: n, signal: r, onFilesPicked: i, onError: a }) {
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
			let e = I(s), t = await fetch(`https://photospicker.googleapis.com/v1/sessions/${encodeURIComponent(a.id)}`, {
				headers: e,
				signal: r
			});
			if (!t.ok) throw Error("Failed to get session");
			if ((await t.json()).mediaItemsSet) {
				let e = await J({
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
var ie = ({ requestClientId: e, accessToken: t, companionUrl: n }, { id: r, mimeType: i, name: a, platform: o, ...s }) => ({
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
function ae({ uppy: e, getPluginState: t, setPluginState: n }) {
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
function oe({ uppy: e, store: t, storage: n = X, pickerType: r, companionUrl: i, requestClientId: a = r === "drive" ? "GoogleDrivePicker" : "GooglePhotosPicker", clientId: o, apiKey: s, appId: c }) {
	let l = `uppy:google-${r}-picker:accessToken`, u = new AbortController(), d, f, p = async (t, n) => {
		e.addFiles(t.map((e) => ie({
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
			u = new AbortController(), m(await n.getItem(l)), u.signal.throwIfAborted(), r === "photos" && Y({
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
				await K({
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
			} else await q({
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
				if (await B(r), n ??= await H({
					clientId: o,
					pickerType: r
				}), n == null) throw Error();
				await i(n), m(n);
			} catch (t) {
				if (t instanceof W) e.log("Token is invalid or expired, reauthenticating"), n = await H({
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
		e && (await U(e), m(null), f = void 0);
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
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/tokenStorage.js
var X = /* @__PURE__ */ e({
	getItem: () => ce,
	removeItem: () => Z,
	setItem: () => se
});
async function se(e, t) {
	localStorage.setItem(e, t);
}
async function ce(e) {
	return localStorage.getItem(e);
}
async function Z(e) {
	localStorage.removeItem(e);
}
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/GooglePicker/icons.js
var le = () => a("svg", {
	"aria-hidden": "true",
	focusable: "false",
	width: "32",
	height: "32",
	viewBox: "-7 -7 73 73",
	children: a("g", {
		fill: "none",
		"fill-rule": "evenodd",
		children: [a("path", { d: "M-3-3h64v64H-3z" }), a("g", {
			"fill-rule": "nonzero",
			children: [
				a("path", {
					fill: "#FBBC04",
					d: "M14.8 13.4c8.1 0 14.7 6.6 14.7 14.8v1.3H1.3c-.7 0-1.3-.6-1.3-1.3C0 20 6.6 13.4 14.8 13.4z"
				}),
				a("path", {
					fill: "#EA4335",
					d: "M45.6 14.8c0 8.1-6.6 14.7-14.8 14.7h-1.3V1.3c0-.7.6-1.3 1.3-1.3C39 0 45.6 6.6 45.6 14.8z"
				}),
				a("path", {
					fill: "#4285F4",
					d: "M44.3 45.6c-8.2 0-14.8-6.6-14.8-14.8v-1.3h28.2c.7 0 1.3.6 1.3 1.3 0 8.2-6.6 14.8-14.8 14.8z"
				}),
				a("path", {
					fill: "#34A853",
					d: "M13.4 44.3c0-8.2 6.6-14.8 14.8-14.8h1.3v28.2c0 .7-.6 1.3-1.3 1.3-8.2 0-14.8-6.6-14.8-14.8z"
				})
			]
		})]
	})
}), Q = () => a("svg", {
	"aria-hidden": "true",
	focusable: "false",
	width: "32",
	height: "32",
	viewBox: "0 0 32 32",
	children: a("g", {
		fillRule: "nonzero",
		fill: "none",
		children: [
			a("path", {
				d: "M6.663 22.284l.97 1.62c.202.34.492.609.832.804l3.465-5.798H5c0 .378.1.755.302 1.096l1.361 2.278z",
				fill: "#0066DA"
			}),
			a("path", {
				d: "M16 12.09l-3.465-5.798c-.34.195-.63.463-.832.804l-6.4 10.718A2.15 2.15 0 005 18.91h6.93L16 12.09z",
				fill: "#00AC47"
			}),
			a("path", {
				d: "M23.535 24.708c.34-.195.63-.463.832-.804l.403-.67 1.928-3.228c.201-.34.302-.718.302-1.096h-6.93l1.474 2.802 1.991 2.996z",
				fill: "#EA4335"
			}),
			a("path", {
				d: "M16 12.09l3.465-5.798A2.274 2.274 0 0018.331 6h-4.662c-.403 0-.794.11-1.134.292L16 12.09z",
				fill: "#00832D"
			}),
			a("path", {
				d: "M20.07 18.91h-8.14l-3.465 5.798c.34.195.73.292 1.134.292h12.802c.403 0 .794-.11 1.134-.292L20.07 18.91z",
				fill: "#2684FC"
			}),
			a("path", {
				d: "M23.497 12.455l-3.2-5.359a2.252 2.252 0 00-.832-.804L16 12.09l4.07 6.82h6.917c0-.377-.1-.755-.302-1.096l-3.188-5.359z",
				fill: "#FFBA00"
			})
		]
	})
});
//#endregion
//#region node_modules/@uppy/core/lib/provider-views/GooglePicker/GooglePickerView.js
function ue({ uppy: e, requestClientId: t, companionUrl: n, pickerType: r, clientId: i, apiKey: a, appId: o, storage: s, store: c }) {
	let { subscribe: l, getSnapshot: f } = c, { reset: p, init: m, ...h } = u(() => oe({
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
	return d(() => (m(), () => {
		p();
	}), [p, m]), {
		..._(l, f),
		...h
	};
}
function de({ getPluginState: e, setPluginState: t, uppy: n, i18n: r, clientId: i, pickerType: o, apiKey: s, appId: c, storage: l, requestClientId: f, companionUrl: h }) {
	let g = ue({
		uppy: n,
		requestClientId: f,
		companionUrl: h,
		pickerType: o,
		clientId: i,
		apiKey: s,
		appId: c,
		storage: l,
		store: u(() => ae({
			uppy: n,
			getPluginState: e,
			setPluginState: t
		}), [
			n,
			e,
			t
		])
	}), _ = p(!1);
	return d(() => {
		g.accessToken === void 0 || _.current || (_.current = !0, g.show());
	}, [g.show, g.accessToken]), g.loading ? a("div", { children: [r("pleaseWait"), "..."] }) : g.accessToken == null ? a(m, {
		pluginName: r(o === "drive" ? "pluginNameGoogleDrivePicker" : "pluginNameGooglePhotosPicker"),
		pluginIcon: o === "drive" ? Q : le,
		handleAuth: g.show,
		i18n: r,
		loading: g.loading
	}) : a("div", {
		style: { textAlign: "center" },
		children: [a("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
			style: {
				display: "block",
				marginBottom: "1em"
			},
			disabled: g.loading,
			onClick: g.show,
			children: r(o === "drive" ? "pickFiles" : "pickPhotos")
		}), a("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn",
			disabled: g.loading,
			onClick: g.logout,
			children: r("logOut")
		})]
	});
}
var fe = {
	name: "@uppy/google-drive-picker",
	description: "The Google Drive Picker plugin for Uppy lets users import files from their Google Drive account",
	version: "2.0.0",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	},
	keywords: [
		"file uploader",
		"google drive",
		"google picker",
		"cloud storage",
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
	dependencies: { preact: "^10.29.2" },
	peerDependencies: { "@uppy/core": "^6.0.0" },
	devDependencies: {
		"@uppy/core": "^6.0.0",
		typescript: "^6.0.3"
	}
}, $ = { strings: { pluginNameGoogleDrivePicker: "Google Drive" } }, pe = class e extends s {
	static VERSION = fe.version;
	static requestClientId = e.name;
	type = "acquirer";
	icon = Q;
	storage;
	defaultLocale = $;
	requestClientId = e.requestClientId;
	constructor(n, r) {
		super(n, r), this.id = this.opts.id || "GoogleDrivePicker", this.storage = this.opts.storage || X, this.defaultLocale = $, this.i18nInit(), this.title = this.i18n("pluginNameGoogleDrivePicker"), this.setPluginState({
			loading: !1,
			accessToken: void 0
		}), this.getPluginState = this.getPluginState.bind(this), this.setPluginState = this.setPluginState.bind(this);
		let i = new t(n, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionCookiesRule: this.opts.companionCookiesRule,
			companionKeysParams: this.opts.companionKeysParams
		});
		this.uppy.registerRequestClient(e.requestClientId, i);
	}
	install() {
		let { target: e } = this.opts;
		e && this.mount(e, this);
	}
	uninstall() {
		this.unmount();
	}
	render = () => a(de, {
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
//#endregion
export { pe as default };
