import { t as e } from "./fluppy-getErrorMessage-DxiQuxng.js";
import { n as t, t as n } from "./fluppy-RequestClient-CHna867h.js";
import { n as r } from "./fluppy-AuthError-BgrGWmji.js";
//#region node_modules/@uppy/core/lib/companion-client/getAllowedHosts.js
function i(e) {
	return e.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
function a(e) {
	if (typeof e == "string") return new RegExp(e);
	if (e instanceof RegExp) return e;
}
function o(e, t) {
	if (e) {
		let t = (e) => {
			if (!(typeof e == "string" && a(e)) && !(e instanceof RegExp)) throw TypeError("The option \"companionAllowedHosts\" must be one of string, Array, RegExp");
		};
		return Array.isArray(e) ? e.every(t) : t(e), e;
	}
	let n = t;
	return /^(?!https?:\/\/).*$/i.test(n) && (n = `https://${t.replace(/^\/\//, "")}`), n = new URL(n).origin, n = i(n), n;
}
//#endregion
//#region node_modules/@uppy/core/lib/companion-client/Provider.js
var s = (e) => e.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
function c() {
	return location.origin;
}
var l = class extends n {
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
		super(e, t), this.provider = t.provider, this.id = this.provider, this.name = t.name || s(this.id), this.pluginId = t.pluginId, this.tokenKey = `companion-${this.pluginId}-auth-token`, this.companionKeysParams = this.opts.companionKeysParams, this.preAuthToken = null, this.supportsRefreshToken = !!t.supportsRefreshToken;
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
			state: btoa(JSON.stringify({ origin: c() })),
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
	async loginOAuth({ uppyVersions: n, authFormData: r, signal: i }) {
		await this.ensurePreAuth(), i.throwIfAborted();
		let a = crypto.randomUUID(), o = this.authUrl({
			query: { uppyVersions: n },
			authFormData: r,
			authCallbackToken: a
		}), s = window.open(o, "_blank"), c, l;
		try {
			let e = t(this.opts.companionUrl), n = await new Promise((t, n) => {
				l = new WebSocket(`${e}/api2/auth-callback/token/${a}`), l.addEventListener("close", () => {
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
				}), i.addEventListener("abort", () => n(/* @__PURE__ */ Error("Authentication was aborted"))), s && (c = window.setInterval(() => {
					s.closed && n(/* @__PURE__ */ Error("Auth window was closed by the user"));
				}, 500));
			});
			this.setAuthToken(n);
		} catch (t) {
			let n = this.uppy.i18n("authAborted");
			throw this.uppy.info({ message: n }, "warning", 5e3), this.uppy.log(`Authentication failed: ${e(t)}`, "warning"), t;
		} finally {
			setTimeout(() => s?.close(), 1), this.uppy.log(`Closing auth callback socket ${a}`), l?.close(), clearInterval(c);
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
			if (!r(t) || !n) throw t;
			return this.#e ??= (async () => {
				try {
					this.uppy.log("[CompanionClient] Refreshing expired auth token");
					let e = await super.request({
						path: this.refreshTokenUrl(),
						method: "POST"
					});
					await this.setAuthToken(e.uppyAuthToken);
				} catch (e) {
					throw r(e) && await this.removeAuthToken(), t;
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
//#endregion
export { o as n, l as t };
