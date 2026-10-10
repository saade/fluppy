//#region node_modules/@uppy/core/lib/utils/ErrorWithCause.js
var e = class extends Error {
	isNetworkError;
	constructor(e, t) {
		super(e), this.cause = t?.cause, this.isNetworkError = this.cause && Object.hasOwn(this.cause, "isNetworkError") ? this.cause.isNetworkError : !1;
	}
};
//#endregion
export { e as t };
