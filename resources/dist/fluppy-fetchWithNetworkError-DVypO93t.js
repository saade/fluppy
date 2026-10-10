//#region node_modules/@uppy/core/lib/utils/NetworkError.js
var e = class extends Error {
	isNetworkError;
	request;
	constructor(e, t = null) {
		super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t;
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/utils/fetchWithNetworkError.js
function t(...t) {
	return fetch(...t).catch((t) => {
		throw t.name === "AbortError" ? t : new e(t);
	});
}
//#endregion
export { e as n, t };
