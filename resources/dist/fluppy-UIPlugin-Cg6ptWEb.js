//#region node_modules/@uppy/core/lib/utils/isDOMElement.js
function e(e) {
	return typeof e != "object" || !e || !("nodeType" in e) ? !1 : e.nodeType === Node.ELEMENT_NODE;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/findDOMElement.js
function t(t, n = document) {
	return typeof t == "string" ? n.querySelector(t) : e(t) ? t : null;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTextDirection.js
function n(e) {
	for (; e && !e.dir;) e = e.parentNode;
	return e?.dir;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isRestrictionError.js
function r(e) {
	return e instanceof Error && "isRestriction" in e && e.isRestriction === !0;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/Translator.js
function i(e, t, n) {
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
function a(e, t) {
	let n = /\$/g, r = [e];
	if (t == null) return r;
	for (let e of Object.keys(t)) if (e !== "_") {
		let a = t[e];
		typeof a == "string" && (a = n[Symbol.replace](a, "$$$$")), r = i(r, RegExp(`%\\{${e}\\}`, "g"), a);
	}
	return r;
}
var o = (e) => {
	throw Error(`missing string: ${e}`);
}, s = class {
	locale;
	constructor(e, { onMissingKey: t = o } = {}) {
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
				return a(n[e], t);
			}
			throw Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
		}
		if (typeof n != "string") throw Error("string was not a string");
		return a(n, t);
	}
}, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S = {}, C = [], w = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, T = Array.isArray;
function E(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function D(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function O(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? c.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return k(e, o, r, i, null);
}
function k(e, t, n, r, i) {
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
		__v: i ?? ++u,
		__i: -1,
		__u: 0
	};
	return i == null && l.vnode != null && l.vnode(a), a;
}
function A() {
	return { current: null };
}
function j(e) {
	return e.children;
}
function M(e, t) {
	this.props = e, this.context = t;
}
function N(e, t) {
	if (t == null) return e.__ ? N(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? N(e) : null;
}
function P(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = E({}, t);
		a.__v = t.__v + 1, l.vnode && l.vnode(a), K(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? N(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, J(r, a, i), t.__e = t.__ = null, a.__e != n && F(a);
	}
}
function F(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), F(e);
}
function I(e) {
	(!e.__d && (e.__d = !0) && d.push(e) && !L.__r++ || f != l.debounceRendering) && ((f = l.debounceRendering) || p)(L);
}
function L() {
	try {
		for (var e, t = 1; d.length;) d.length > t && d.sort(m), e = d.shift(), t = d.length, P(e);
	} finally {
		d.length = L.__r = 0;
	}
}
function R(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || C, v = t.length;
	for (c = z(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || S, p.__i = d, g = K(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && X(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = B(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function z(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = k(null, o, null, null, null) : T(o) ? o = e.__k[a] = k(j, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = k(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = H(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = N(s)), Z(s, s));
	return r;
}
function B(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = B(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = N(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function V(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (T(e) ? e.some(function(e) {
		V(e, t);
	}) : t.push(e)), t;
}
function H(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function U(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || w.test(t) ? n : n + "px";
}
function W(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || U(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || U(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(v, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[_] = r[_] : (n[_] = y, e.addEventListener(t, a ? x : b, a)) : e.removeEventListener(t, a ? x : b, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function G(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[g] == null) t[g] = y++;
			else if (t[g] < n[_]) return;
			return n(l.event ? l.event(t) : t);
		}
	};
}
function K(e, t, n, r, i, a, o, s, c, u) {
	var d, f, p, m, h, g, _, v, y, b, x, S, w, O, k, A, P = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (d = l.__b) && d(t);
	n: if (typeof P == "function") {
		f = o.length;
		try {
			if (y = t.props, b = P.prototype && P.prototype.render, x = (d = P.contextType) && r[d.__c], S = d ? x ? x.props.value : d.__ : r, n.__c ? v = (p = t.__c = n.__c).__ = p.__E : (b ? t.__c = p = new P(y, S) : (t.__c = p = new M(y, S), p.constructor = P, p.render = te), x && x.sub(p), p.state || (p.state = {}), p.__n = r, m = p.__d = !0, p.__h = [], p._sb = []), b && p.__s == null && (p.__s = p.state), b && P.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = E({}, p.__s)), E(p.__s, P.getDerivedStateFromProps(y, p.__s))), h = p.props, g = p.state, p.__v = t, m) b && P.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), b && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (b && P.getDerivedStateFromProps == null && y !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(y, S), t.__v == n.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(y, p.__s, S)) {
					t.__v != n.__v && (p.props = y, p.state = p.__s, p.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), C.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && o.push(p), s = N(n);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(y, p.__s, S), b && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, g, _);
				});
			}
			if (p.context = S, p.props = y, p.__P = e, p.__e = !1, w = l.__r, O = 0, b) p.state = p.__s, p.__d = !1, w && w(t), d = p.render(p.props, p.state, p.context), C.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, w && w(t), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++O < 25);
			p.state = p.__s, p.getChildContext != null && (r = E(E({}, r), p.getChildContext())), b && !m && p.getSnapshotBeforeUpdate != null && (_ = p.getSnapshotBeforeUpdate(h, g)), k = d != null && d.type === j && d.key == null ? Y(d.props.children) : d, s = R(e, T(k) ? k : [k], t, n, r, i, a, o, s, c, u), p.base = t.__e, t.__u &= -161, p.__h.length && o.push(p), v && (p.__E = p.__ = null);
		} catch (e) {
			if (o.length = f, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (A = a.length; A--;) D(a[A]);
			} else t.__e = n.__e;
			t.__k ??= n.__k || [], e.then || q(t), l.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = ee(n.__e, t, n, r, i, a, o, c, u);
	return (d = l.diffed) && d(t), 128 & t.__u ? void 0 : s;
}
function q(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(q));
}
function J(e, t, n) {
	for (var r = 0; r < n.length; r++) X(n[r], n[++r], n[++r]);
	l.__c && l.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			l.__e(e, t.__v);
		}
	});
}
function Y(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : T(e) ? e.map(Y) : e.constructor === void 0 ? E({}, e) : null;
}
function ee(e, t, n, r, i, a, o, s, u) {
	var d, f, p, m, h, g, _, v = n.props || S, y = t.props, b = t.type;
	if (b == "svg" ? i = "http://www.w3.org/2000/svg" : b == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i ||= "http://www.w3.org/1999/xhtml", a != null) {
		for (d = 0; d < a.length; d++) if ((h = a[d]) && "setAttribute" in h == !!b && (b ? h.localName == b : h.nodeType == 3)) {
			e = h, a[d] = null;
			break;
		}
	}
	if (e == null) {
		if (b == null) return document.createTextNode(y);
		e = document.createElementNS(i, b, y.is && y), s &&= (l.__m && l.__m(t, a), !1), a = null;
	}
	if (b == null) v === y || s && e.data == y || (e.data = y);
	else {
		if (a = b == "textarea" && y.defaultValue != null ? null : a && c.call(e.childNodes), !s && a != null) for (v = {}, d = 0; d < e.attributes.length; d++) v[(h = e.attributes[d]).name] = h.value;
		for (d in v) h = v[d], d == "dangerouslySetInnerHTML" ? p = h : d == "children" || d in y || d == "value" && "defaultValue" in y || d == "checked" && "defaultChecked" in y || W(e, d, null, h, i);
		for (d in y) h = y[d], d == "children" ? m = h : d == "dangerouslySetInnerHTML" ? f = h : d == "value" ? g = h : d == "checked" ? _ = h : s && typeof h != "function" || v[d] === h || W(e, d, h, v[d], i);
		if (f) s || p && (f.__html == p.__html || f.__html == e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
		else if (p && (e.innerHTML = ""), R(t.type == "template" ? e.content : e, T(m) ? m : [m], t, n, r, b == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && N(n, 0), s, u), a != null) for (d = a.length; d--;) D(a[d]);
		s && b != "textarea" || (d = "value", b == "progress" && g == null ? e.removeAttribute("value") : g != null && (g !== e[d] || b == "progress" && !g || b == "option" && g != v[d]) && W(e, d, g, v[d], i), d = "checked", _ != null && _ != e[d] && W(e, d, _, v[d], i));
	}
	return e;
}
function X(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		l.__e(e, n);
	}
}
function Z(e, t, n) {
	var r, i;
	if (l.unmount && l.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || X(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			l.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Z(r[i], t, n || typeof e.type != "function");
	n || D(e.__e), e.__c = e.__ = e.__e = void 0;
}
function te(e, t, n) {
	return this.constructor(e, n);
}
function Q(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), l.__ && l.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], K(t, e = (!r && n || t).__k = O(j, null, [e]), i || S, S, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? c.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), J(a, e, o), e.props.children = null;
}
function ne(e, t, n) {
	var r, i, a, o, s = E({}, e.props);
	for (a in e.type && e.type.defaultProps && (o = e.type.defaultProps), t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : s[a] = t[a] === void 0 && o != null ? o[a] : t[a];
	return arguments.length > 2 && (s.children = arguments.length > 3 ? c.call(arguments, 2) : n), k(e.type, s, r || e.key, i || e.ref, null);
}
c = C.slice, l = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, u = 0, M.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = E({}, this.state);
	typeof e == "function" && (e = e(E({}, n), this.props)), e && E(n, e), e != null && this.__v && (t && this._sb.push(t), I(this));
}, M.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), I(this));
}, M.prototype.render = j, d = [], p = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, m = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, L.__r = 0, h = Math.random().toString(8), g = "__d" + h, _ = "__a" + h, v = /(PointerCapture)$|Capture$/i, y = 0, b = G(!1), x = G(!0);
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var re = 0;
Array.isArray;
function ie(e, t, n, r, i, a) {
	t ||= {};
	var o, s, c = t;
	if ("ref" in c) for (s in c = {}, t) s == "ref" ? o = t[s] : c[s] = t[s];
	var u = {
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
		__v: --re,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return l.vnode && l.vnode(u), u;
}
//#endregion
//#region node_modules/@uppy/core/lib/BasePlugin.js
var $ = class {
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
		let e = new s([
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
//#endregion
//#region node_modules/@uppy/core/lib/UIPlugin.js
function ae(e) {
	let t = null, n;
	return (...r) => (n = r, t ||= Promise.resolve().then(() => (t = null, e(...n))), t);
}
var oe = class e extends $ {
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
	mount(e, r) {
		let i = r.id, a = t(e);
		if (a) {
			this.isTargetDOMEl = !0;
			let t = document.createElement("div");
			return t.classList.add("uppy-Root"), this.#e = ae((e) => {
				this.uppy.getPlugin(this.id) && (Q(this.render(e, t), t), this.afterUpdate());
			}), this.uppy.log(`Installing ${i} to a DOM element '${e}'`), this.opts.replaceTargetContent && (a.innerHTML = ""), Q(this.render(this.uppy.getState(), t), t), this.el = t, a.appendChild(t), t.dir = this.opts.direction || n(t) || "ltr", this.onMount(), this.el;
		}
		let o = this.getTargetPlugin(e);
		if (o) return this.uppy.log(`Installing ${i} to ${o.id}`), this.parent = o, this.el = o.addTarget(r), this.onMount(), this.el;
		this.uppy.log(`Not installing ${i}`);
		let s = `Invalid target option given to ${i}.`;
		throw s += typeof e == "function" ? " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", Error(s);
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
//#endregion
export { V as a, ne as c, s as d, r as f, M as i, O as l, $ as n, A as o, e as p, ie as r, j as s, oe as t, l as u };
