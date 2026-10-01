import { n as e } from "./fluppy-rolldown-runtime-B0aSnxlc.js";
//#region node_modules/@uppy/core/lib/companion-client/tokenStorage.js
var t = /* @__PURE__ */ e({
	getItem: () => r,
	removeItem: () => i,
	setItem: () => n
});
async function n(e, t) {
	localStorage.setItem(e, t);
}
async function r(e) {
	return localStorage.getItem(e);
}
async function i(e) {
	localStorage.removeItem(e);
}
//#endregion
export { t };
