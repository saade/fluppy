function e(e, t, n, { label: r, connectUrl: i }, { list: a, disconnect: o, failedMessage: s }) {
	let c = () => Object.assign(/* @__PURE__ */ Error("Authorization required"), { isAuthError: !0 }), l = (t) => e.getPlugin(n)?.setPluginState({ authenticated: t }), u = new BroadcastChannel("fluppy"), d = null;
	u.addEventListener("message", ({ data: t }) => {
		if (t?.source === n) {
			if (d) return t.isConnected ? d.resolve() : d.reject(Error(s));
			if (t.isConnected) {
				let t = e.getPlugin(n);
				l(!0), t?.view.openFolder(t.rootFolderId);
			}
		}
	});
	let f = {
		provider: n,
		name: r,
		fetchPreAuthToken: async () => {},
		fileUrl: (e) => e,
		async list(t) {
			let r = await a(n, t ?? null);
			if (r?.authenticated === !1) throw l(!1), c();
			if (!r || r.error) {
				let t = r?.error ?? s;
				throw e.info(t, "error", 5e3), Error(t);
			}
			return l(!0), r;
		},
		login({ signal: e } = {}) {
			let t = window.open(i, "_blank", "popup,width=640,height=760");
			return new Promise((n, r) => {
				let i = null, a = (t) => (n) => {
					clearInterval(i), e?.removeEventListener("abort", o), d = null, t(n);
				}, o = () => {
					t?.close(), d?.reject(Error(s));
				};
				if (d = {
					resolve: a(n),
					reject: a(r)
				}, !t) return d.reject(Error(s));
				e?.addEventListener("abort", o), i = setInterval(() => {
					t.closed && (clearInterval(i), setTimeout(() => d?.reject(Error(s)), 1e3));
				}, 500);
			});
		},
		async logout() {
			return await o(n), {
				ok: !0,
				revoked: !0
			};
		}
	};
	class p extends t {
		constructor(e, t) {
			super(e, t), this.provider = f, this.title = r;
		}
		install() {
			super.install(), this.view.opts.supportsSearch = !1;
		}
		uninstall() {
			u.close(), super.uninstall();
		}
	}
	e.use(p, {
		id: n,
		companionUrl: window.location.origin
	});
}
//#endregion
export { e as useBrowsableSource };
