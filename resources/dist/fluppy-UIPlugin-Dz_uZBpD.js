import { c as e, i as t } from "./fluppy-preact.module-CfEGNJFi.js";
//#region node_modules/@uppy/core/lib/utils/isDOMElement.js
function n(e) {
	return typeof e != "object" || !e || !("nodeType" in e) ? !1 : e.nodeType === Node.ELEMENT_NODE;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/findDOMElement.js
function r(e, t = document) {
	return typeof e == "string" ? t.querySelector(e) : n(e) ? e : null;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTextDirection.js
function i(e) {
	for (; e && !e.dir;) e = e.parentNode;
	return e?.dir;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/Translator.js
function a(e, t, n) {
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
function o(e, t) {
	let n = /\$/g, r = [e];
	if (t == null) return r;
	for (let e of Object.keys(t)) if (e !== "_") {
		let i = t[e];
		typeof i == "string" && (i = n[Symbol.replace](i, "$$$$")), r = a(r, RegExp(`%\\{${e}\\}`, "g"), i);
	}
	return r;
}
var s = (e) => {
	throw Error(`missing string: ${e}`);
}, c = class {
	locale;
	constructor(e, { onMissingKey: t = s } = {}) {
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
				return o(n[e], t);
			}
			throw Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
		}
		if (typeof n != "string") throw Error("string was not a string");
		return o(n, t);
	}
}, l = 0;
Array.isArray;
function u(t, n, r, i, a, o) {
	n ||= {};
	var s, c, u = n;
	if ("ref" in u) for (c in u = {}, n) c == "ref" ? s = n[c] : u[c] = n[c];
	var d = {
		type: t,
		props: u,
		key: r,
		ref: s,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --l,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof t == "function" && (s = t.defaultProps)) for (c in s) u[c] === void 0 && (u[c] = s[c]);
	return e.vnode && e.vnode(d), d;
}
//#endregion
//#region node_modules/@uppy/core/lib/BasePlugin.js
var d = class {
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
		let e = new c([
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
function f(e) {
	let t = null, n;
	return (...r) => (n = r, t ||= Promise.resolve().then(() => (t = null, e(...n))), t);
}
var p = class e extends d {
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
	mount(e, n) {
		let a = n.id, o = r(e);
		if (o) {
			this.isTargetDOMEl = !0;
			let n = document.createElement("div");
			return n.classList.add("uppy-Root"), this.#e = f((e) => {
				this.uppy.getPlugin(this.id) && (t(this.render(e, n), n), this.afterUpdate());
			}), this.uppy.log(`Installing ${a} to a DOM element '${e}'`), this.opts.replaceTargetContent && (o.innerHTML = ""), t(this.render(this.uppy.getState(), n), n), this.el = n, o.appendChild(n), n.dir = this.opts.direction || i(n) || "ltr", this.onMount(), this.el;
		}
		let s = this.getTargetPlugin(e);
		if (s) return this.uppy.log(`Installing ${a} to ${s.id}`), this.parent = s, this.el = s.addTarget(n), this.onMount(), this.el;
		this.uppy.log(`Not installing ${a}`);
		let c = `Invalid target option given to ${a}.`;
		throw c += typeof e == "function" ? " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", Error(c);
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
export { n as a, c as i, d as n, u as r, p as t };
