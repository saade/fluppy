import { r as e } from "./fluppy-UIPlugin-ihypjxg2.js";
import { s as t } from "./fluppy-hooks.module-DqAiOXxL.js";
//#region node_modules/@uppy/core/lib/provider-views/ProviderView/AuthView.js
function n() {
	return e("svg", {
		width: "26",
		height: "26",
		viewBox: "0 0 26 26",
		xmlns: "http://www.w3.org/2000/svg",
		children: e("g", {
			fill: "none",
			"fill-rule": "evenodd",
			children: [
				e("circle", {
					fill: "#FFF",
					cx: "13",
					cy: "13",
					r: "13"
				}),
				e("path", {
					d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
					fill: "#4285F4",
					"fill-rule": "nonzero"
				}),
				e("path", {
					d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
					fill: "#34A853",
					"fill-rule": "nonzero"
				}),
				e("path", {
					d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
					fill: "#FBBC05",
					"fill-rule": "nonzero"
				}),
				e("path", {
					d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
					fill: "#EA4335",
					"fill-rule": "nonzero"
				}),
				e("path", { d: "M4 4h18v18H4z" })
			]
		})
	});
}
function r({ pluginName: r, i18n: i, onAuth: a }) {
	let o = r === "Google Drive", s = t((e) => {
		e.preventDefault(), a();
	}, [a]);
	return e("form", {
		onSubmit: s,
		children: o ? e("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
			"data-uppy-super-focusable": !0,
			children: [e(n, {}), i("signInWithGoogle")]
		}) : e("button", {
			type: "submit",
			className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
			"data-uppy-super-focusable": !0,
			children: i("authenticateWith", { pluginName: r })
		})
	});
}
var i = ({ pluginName: t, i18n: n, onAuth: i }) => e(r, {
	pluginName: t,
	i18n: n,
	onAuth: i
});
function a({ loading: t, pluginName: n, pluginIcon: r, i18n: a, handleAuth: o, renderForm: s = i }) {
	return e("div", {
		className: "uppy-Provider-auth",
		children: [
			e("div", {
				className: "uppy-Provider-authIcon",
				children: r()
			}),
			e("div", {
				className: "uppy-Provider-authTitle",
				children: a("authenticateWithTitle", { pluginName: n })
			}),
			s({
				pluginName: n,
				i18n: a,
				loading: t,
				onAuth: o
			})
		]
	});
}
//#endregion
export { a as t };
