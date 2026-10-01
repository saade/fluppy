import { t as e } from "./fluppy-ProviderView-DVSZQmbQ.js";
import { n as t } from "./fluppy-AuthError-CpV_e0tX.js";
import { n, t as r } from "./fluppy-RequestClient-B3NweaQs.js";
import { r as i, t as a } from "./fluppy-UIPlugin-ihypjxg2.js";
import { t as o } from "./fluppy-getErrorMessage-DxiQuxng.js";
import { t as s } from "./fluppy-tokenStorage-CoxIVt8_.js";
//#region node_modules/@uppy/core/lib/companion-client/getAllowedHosts.js
function c(e) {
	return e.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
function l(e) {
	if (typeof e == "string") return new RegExp(e);
	if (e instanceof RegExp) return e;
}
function u(e, t) {
	if (e) {
		let t = (e) => {
			if (!(typeof e == "string" && l(e)) && !(e instanceof RegExp)) throw TypeError("The option \"companionAllowedHosts\" must be one of string, Array, RegExp");
		};
		return Array.isArray(e) ? e.every(t) : t(e), e;
	}
	let n = t;
	return /^(?!https?:\/\/).*$/i.test(n) && (n = `https://${t.replace(/^\/\//, "")}`), n = new URL(n).origin, n = c(n), n;
}
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/Provider.js
var d = (e) => e.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
function f() {
	return location.origin;
}
var p = class extends r {
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
		super(e, t), this.provider = t.provider, this.id = this.provider, this.name = t.name || d(this.id), this.pluginId = t.pluginId, this.tokenKey = `companion-${this.pluginId}-auth-token`, this.companionKeysParams = this.opts.companionKeysParams, this.preAuthToken = null, this.supportsRefreshToken = !!t.supportsRefreshToken;
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
			state: btoa(JSON.stringify({ origin: f() })),
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
	async loginOAuth({ uppyVersions: e, authFormData: t, signal: r }) {
		await this.ensurePreAuth(), r.throwIfAborted();
		let i = crypto.randomUUID(), a = this.authUrl({
			query: { uppyVersions: e },
			authFormData: t,
			authCallbackToken: i
		}), s = window.open(a, "_blank"), c, l;
		try {
			let e = n(this.opts.companionUrl), t = await new Promise((t, n) => {
				l = new WebSocket(`${e}/api2/auth-callback/token/${i}`), l.addEventListener("close", () => {
					n(/* @__PURE__ */ Error("Socket closed"));
				}), l.addEventListener("error", (e) => {
					this.uppy.log(`Companion socket error ${JSON.stringify(e)}, closing socket`, "warning"), l?.close();
				}), l.addEventListener("message", (e) => {
					try {
						let { token: r, error: i } = JSON.parse(e.data);
						i ? n(/* @__PURE__ */ Error("Authentication reported error")) : r ? t(r) : n(/* @__PURE__ */ Error("Authentication did not return a token"));
					} catch (e) {
						n(e);
					}
				}), r.addEventListener("abort", () => n(/* @__PURE__ */ Error("Authentication was aborted"))), s && (c = window.setInterval(() => {
					s.closed && n(/* @__PURE__ */ Error("Auth window was closed by the user"));
				}, 500));
			});
			this.setAuthToken(t);
		} catch (e) {
			let t = this.uppy.i18n("authAborted");
			throw this.uppy.info({ message: t }, "warning", 5e3), this.uppy.log(`Authentication failed: ${o(e)}`, "warning"), e;
		} finally {
			setTimeout(() => s?.close(), 1), this.uppy.log(`Closing auth callback socket ${i}`), l?.close(), clearInterval(c);
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
		} catch (n) {
			if (!this.supportsRefreshToken) throw n;
			let r = await this.#t();
			if (!t(n) || !r) throw n;
			return this.#e ??= (async () => {
				try {
					this.uppy.log("[CompanionClient] Refreshing expired auth token");
					let e = await super.request({
						path: this.refreshTokenUrl(),
						method: "POST"
					});
					await this.setAuthToken(e.uppyAuthToken);
				} catch (e) {
					throw t(e) && await this.removeAuthToken(), n;
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
}, m = {
	name: "@uppy/dropbox",
	description: "Import files from Dropbox, into Uppy.",
	version: "6.0.0",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"dropbox"
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
}, h = { strings: { pluginNameDropbox: "Dropbox" } }, g = class extends a {
	static VERSION = m.version;
	icon;
	provider;
	view;
	storage;
	files;
	rootFolderId = null;
	constructor(e, t) {
		super(e, t), this.id = this.opts.id || "Dropbox", this.type = "acquirer", this.storage = this.opts.storage || s, this.files = [], this.icon = () => i("svg", {
			className: "uppy-DashboardTab-iconDropbox",
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: i("path", {
				d: "M10.5 7.5L5 10.955l5.5 3.454 5.5-3.454 5.5 3.454 5.5-3.454L21.5 7.5 16 10.955zM10.5 21.319L5 17.864l5.5-3.455 5.5 3.455zM16 17.864l5.5-3.455 5.5 3.455-5.5 3.455zM16 25.925l-5.5-3.455 5.5-3.454 5.5 3.454z",
				fill: "currentcolor",
				fillRule: "nonzero"
			})
		}), this.opts.companionAllowedHosts = u(this.opts.companionAllowedHosts, this.opts.companionUrl), this.provider = new p(e, {
			companionUrl: this.opts.companionUrl,
			companionHeaders: this.opts.companionHeaders,
			companionKeysParams: this.opts.companionKeysParams,
			companionCookiesRule: this.opts.companionCookiesRule,
			provider: "dropbox",
			pluginId: this.id,
			supportsRefreshToken: !0
		}), this.defaultLocale = h, this.i18nInit(), this.title = this.i18n("pluginNameDropbox"), this.render = this.render.bind(this);
	}
	install() {
		this.view = new e(this, {
			provider: this.provider,
			loadAllFiles: !0,
			virtualList: !0,
			supportsSearch: !0
		});
		let { target: t } = this.opts;
		t && this.mount(t, this);
	}
	uninstall() {
		this.view.tearDown(), this.unmount();
	}
	render(e) {
		return this.view.render(e);
	}
};
//#endregion
export { g as default };
