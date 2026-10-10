//#region node_modules/preact/dist/preact.module.js
var e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = {}, h = [], g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, _ = Array.isArray;
function v(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function y(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function b(t, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? e.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
	return x(t, s, i, a, null);
}
function x(e, r, i, a, o) {
	var s = {
		type: e,
		props: r,
		key: i,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: o ?? ++n,
		__i: -1,
		__u: 0
	};
	return o == null && t.vnode != null && t.vnode(s), s;
}
function S() {
	return { current: null };
}
function C(e) {
	return e.children;
}
function w(e, t) {
	this.props = e, this.context = t;
}
function T(e, t) {
	if (t == null) return e.__ ? T(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? T(e) : null;
}
function E(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = v({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), R(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? T(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, B(i, o, a), n.__e = n.__ = null, o.__e != r && D(o);
	}
}
function D(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), D(e);
}
function O(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !k.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(k);
}
function k() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, E(e);
	} finally {
		r.length = k.__r = 0;
	}
}
function A(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, g, _, v, y = r && r.__k || h, b = t.length;
	for (c = j(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = R(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && U(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = M(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function j(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(C, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = P(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = T(s)), W(s, s));
	return r;
}
function M(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = M(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = T(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function N(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (_(e) ? e.some(function(e) {
		N(e, t);
	}) : t.push(e)), t;
}
function P(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function F(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function I(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || F(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || F(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(u, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[l] = r[l] : (n[l] = d, e.addEventListener(t, a ? p : f, a)) : e.removeEventListener(t, a ? p : f, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function L(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function R(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, S, E, D, O, k, j, M, N, P, F = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof F == "function") {
		f = s.length;
		try {
			if (E = n.props, D = F.prototype && F.prototype.render, O = (d = F.contextType) && i[d.__c], k = d ? O ? O.props.value : d.__ : i, r.__c ? S = (p = n.__c = r.__c).__ = p.__E : (D ? n.__c = p = new F(E, k) : (n.__c = p = new w(E, k), p.constructor = F, p.render = G), O && O.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), D && p.__s == null && (p.__s = p.state), D && F.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, F.getDerivedStateFromProps(E, p.__s))), g = p.props, b = p.state, p.__v = n, m) D && F.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), D && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (D && F.getDerivedStateFromProps == null && E !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(E, k), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(E, p.__s, k)) {
					n.__v != r.__v && (p.props = E, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), h.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = T(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(E, p.__s, k), D && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(g, b, x);
				});
			}
			if (p.context = k, p.props = E, p.__P = e, p.__e = !1, j = t.__r, M = 0, D) p.state = p.__s, p.__d = !1, j && j(n), d = p.render(p.props, p.state, p.context), h.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, j && j(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++M < 25);
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), D && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), N = d != null && d.type === C && d.key == null ? V(d.props.children) : d, c = A(e, _(N) ? N : [N], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), S && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (P = o.length; P--;) y(o[P]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || z(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = H(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function z(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(z));
}
function B(e, n, r) {
	for (var i = 0; i < r.length; i++) U(r[i], r[++i], r[++i]);
	t.__c && t.__c(n, e), e.some(function(n) {
		try {
			e = n.__h, n.__h = [], e.some(function(e) {
				e.call(n);
			});
		} catch (e) {
			t.__e(e, n.__v);
		}
	});
}
function V(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(V) : e.constructor === void 0 ? v({}, e) : null;
}
function H(n, r, i, a, o, s, c, l, u) {
	var d, f, p, h, g, v, b, x = i.props || m, S = r.props, C = r.type;
	if (C == "svg" ? o = "http://www.w3.org/2000/svg" : C == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o ||= "http://www.w3.org/1999/xhtml", s != null) {
		for (d = 0; d < s.length; d++) if ((g = s[d]) && "setAttribute" in g == !!C && (C ? g.localName == C : g.nodeType == 3)) {
			n = g, s[d] = null;
			break;
		}
	}
	if (n == null) {
		if (C == null) return document.createTextNode(S);
		n = document.createElementNS(o, C, S.is && S), l &&= (t.__m && t.__m(r, s), !1), s = null;
	}
	if (C == null) x === S || l && n.data == S || (n.data = S);
	else {
		if (s = C == "textarea" && S.defaultValue != null ? null : s && e.call(n.childNodes), !l && s != null) for (x = {}, d = 0; d < n.attributes.length; d++) x[(g = n.attributes[d]).name] = g.value;
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || I(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || I(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), A(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && T(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && I(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && I(n, d, b, x[d], o));
	}
	return n;
}
function U(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function W(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || U(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && W(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function G(e, t, n) {
	return this.constructor(e, n);
}
function K(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], R(r, n = (!a && i || r).__k = b(C, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), B(s, n, c), n.props.children = null;
}
function q(t, n, r) {
	var i, a, o, s, c = v({}, t.props);
	for (o in t.type && t.type.defaultProps && (s = t.type.defaultProps), n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : c[o] = n[o] === void 0 && s != null ? s[o] : n[o];
	return arguments.length > 2 && (c.children = arguments.length > 3 ? e.call(arguments, 2) : r), x(t.type, c, i || t.key, a || t.ref, null);
}
e = h.slice, t = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, n = 0, w.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = v({}, this.state);
	typeof e == "function" && (e = e(v({}, n), this.props)), e && v(n, e), e != null && this.__v && (t && this._sb.push(t), O(this));
}, w.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), O(this));
}, w.prototype.render = C, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, k.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = L(!1), p = L(!0);
//#endregion
export { C as a, t as c, K as i, N as n, q as o, S as r, b as s, w as t };
