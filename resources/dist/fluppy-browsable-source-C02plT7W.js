import { s as e } from "./fluppy-preact.module-CfEGNJFi.js";
//#region resources/js/browsable-source.js
var t = "popup,width=640,height=760", n = 1e3;
function r(r, i, a, { label: o, connectUrl: s, icon: c, isSearchable: l, views: u }, { list: d, search: f, disconnect: p, failedMessage: m }) {
	let h = () => {
		try {
			return localStorage.getItem(`fluppy:view:${a}`) === "grid" ? "grid" : "list";
		} catch {
			return null;
		}
	}, g = (e) => {
		try {
			localStorage.setItem(`fluppy:view:${a}`, e);
		} catch {}
	}, _ = () => Object.assign(/* @__PURE__ */ Error("Authorization required"), { isAuthError: !0 }), v = (e) => r.getPlugin(a)?.setPluginState({ authenticated: e }), y = new BroadcastChannel("fluppy"), b = null;
	y.addEventListener("message", ({ data: e }) => {
		if (e?.source === a) {
			if (b) return e.isConnected ? b.resolve() : b.reject(Error(m));
			if (e.isConnected) {
				let e = r.getPlugin(a);
				v(!0), e?.view.openFolder(e.rootFolderId);
			}
		}
	});
	let x = {
		provider: a,
		name: o,
		fetchPreAuthToken: async () => {},
		fileUrl: (e) => e,
		async list(e) {
			let t = await d(a, e ?? null);
			if (t?.authenticated === !1) throw v(!1), _();
			if (!t || t.error) {
				let e = t?.error ?? m;
				throw r.info(e, "error", 5e3), Error(e);
			}
			return v(!0), t;
		},
		async search(e, { path: t } = {}) {
			let n = await f(a, e, t ?? null);
			if (!n || n.error) {
				let e = n?.error ?? m;
				throw r.info(e, "error", 5e3), Error(e);
			}
			return n;
		},
		login({ signal: e } = {}) {
			let r = window.open(s, "_blank", t);
			return new Promise((t, i) => {
				let a = null, o = (t) => (n) => {
					clearInterval(a), e?.removeEventListener("abort", s), b = null, t(n);
				}, s = () => {
					r?.close(), b?.reject(Error(m));
				};
				if (b = {
					resolve: o(t),
					reject: o(i)
				}, !r) return b.reject(Error(m));
				e?.addEventListener("abort", s), a = setInterval(() => {
					r.closed && (clearInterval(a), setTimeout(() => b?.reject(Error(m)), n));
				}, 500);
			});
		},
		async logout() {
			return await p(a), {
				ok: !0,
				revoked: !0
			};
		}
	};
	class S extends i {
		constructor(t, n) {
			super(t, n), this.provider = x, this.title = o, c && (this.icon = () => e("span", {
				class: "fi-fluppy-source-icon",
				dangerouslySetInnerHTML: { __html: c }
			}));
		}
		install() {
			super.install(), this.view.opts.supportsSearch = !!l, this.view.opts.standalone = !s, u && this.showAs(h() ?? "list");
		}
		mount(e, t) {
			let n = super.mount(e, t);
			return u && n?.addEventListener("click", this.openGridFolder), n;
		}
		uninstall() {
			y.close(), this.el?.removeEventListener("click", this.openGridFolder), super.uninstall();
		}
		showAs(e) {
			let t = e === "grid" ? "list" : "grid";
			this.view.opts.viewType = e, this.view.opts.virtualList = e !== "grid", this.view.opts.toolbarActions = [{
				id: "fluppy-view",
				label: u[t],
				refresh: !1,
				run: () => (g(t), this.showAs(t), this.setPluginState({}), !1)
			}];
		}
		openGridFolder = (e) => {
			if (this.view.opts.viewType !== "grid") return;
			let t = e.target.closest?.(".uppy-ProviderBrowserItem-inner")?.getAttribute("for");
			t && r.getPlugin("Dashboard")?.getPluginState().activePickerPanel?.id === a && this.getPluginState().partialTree?.find((e) => e.id === t)?.type === "folder" && (e.preventDefault(), this.view.openFolder(t));
		};
	}
	r.use(S, {
		id: a,
		companionUrl: window.location.origin
	});
}
//#endregion
export { r as useBrowsableSource };
