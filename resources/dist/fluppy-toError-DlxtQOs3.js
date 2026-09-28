//#region node_modules/@uppy/core/lib/utils/toError.js
function e(e) {
	return e instanceof Error || typeof e == "object" && !!e && "message" in e && typeof e.message == "string";
}
function t(t) {
	return e(t) ? t : Error(String(t));
}
//#endregion
export { t as n, e as t };
