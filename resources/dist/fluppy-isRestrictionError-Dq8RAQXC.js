//#region node_modules/@uppy/core/lib/utils/isRestrictionError.js
function e(e) {
	return e instanceof Error && "isRestriction" in e && e.isRestriction === !0;
}
//#endregion
export { e as t };
