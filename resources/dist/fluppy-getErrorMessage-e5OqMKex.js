//#region node_modules/@uppy/core/lib/utils/toError.js
function e(e) {
	return e instanceof Error || typeof e == "object" && !!e && "message" in e && typeof e.message == "string";
}
function t(t) {
	return e(t) ? t : Error(String(t));
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getErrorMessage.js
function n(t) {
	return e(t) ? t.message : String(t);
}
//#endregion
export { t as n, n as t };
