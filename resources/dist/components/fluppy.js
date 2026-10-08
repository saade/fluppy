import { r as e, t } from "../fluppy-rolldown-runtime-B0aSnxlc.js";
import { a as n, c as r, d as i, i as a, l as o, n as s, o as c, r as l, s as u, u as d } from "../fluppy-ProviderView-DVSZQmbQ.js";
import { r as f } from "../fluppy-AuthError-CpV_e0tX.js";
import { n as p } from "../fluppy-toError-DlxtQOs3.js";
import { a as m, c as h, d as g, f as _, i as v, l as y, n as b, o as x, r as S, s as C, t as w } from "../fluppy-UIPlugin-ihypjxg2.js";
import { t as T } from "../fluppy-toArray-C4ZyUyu-.js";
import { t as E } from "../fluppy-getErrorMessage-DxiQuxng.js";
import { t as ee } from "../fluppy-isRestrictionError-Dq8RAQXC.js";
import { i as D, n as te, o as ne, s as re, t as O } from "../fluppy-hooks.module-DqAiOXxL.js";
//#region node_modules/@uppy/core/lib/utils/dataURItoBlob.js
var k = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function ie(e, t, n) {
	let r = k.exec(e), i = t.mimeType ?? r?.[1] ?? "plain/text", a;
	if (r?.[2] != null) {
		let e = atob(decodeURIComponent(r[3])), t = new Uint8Array(e.length);
		for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
		a = [t];
	} else r?.[3] != null && (a = [decodeURIComponent(r[3])]);
	return n ? new File(a, t.name || "", { type: i }) : new Blob(a, { type: i });
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/emaFilter.js
function A(e, t, n, r) {
	return n === 0 || e === t ? e : r === 0 ? t : e + (t - e) * 2 ** (-r / n);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/FOCUSABLE_ELEMENTS.js
var ae = [
	"a[href]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"area[href]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"input:not([disabled]):not([inert]):not([aria-hidden])",
	"select:not([disabled]):not([inert]):not([aria-hidden])",
	"textarea:not([disabled]):not([inert]):not([aria-hidden])",
	"button:not([disabled]):not([inert]):not([aria-hidden])",
	"iframe:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"object:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"embed:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"[contenteditable]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])",
	"[tabindex]:not([tabindex^=\"-\"]):not([inert]):not([aria-hidden])"
];
//#endregion
//#region node_modules/@uppy/core/lib/utils/findAllDOMElements.js
function oe(e) {
	if (typeof e == "string") {
		let t = document.querySelectorAll(e);
		return t.length === 0 ? null : Array.from(t);
	}
	return typeof e == "object" && _(e) ? [e] : null;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/fallbackApi.js
function se(e) {
	let t = T(e.files);
	return Promise.resolve(t);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
function j(e, t, n, { onSuccess: r }) {
	e.readEntries((i) => {
		let a = [...t, ...i];
		i.length ? queueMicrotask(() => {
			j(e, a, n, { onSuccess: r });
		}) : r(a);
	}, (e) => {
		n(e), r(t);
	});
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
function ce(e, t) {
	return e == null ? e : {
		kind: e.isFile ? "file" : e.isDirectory ? "directory" : void 0,
		name: e.name,
		getFile() {
			return new Promise((t, n) => e.file(t, n));
		},
		async *values() {
			let n = e.createReader();
			yield* await new Promise((e) => {
				j(n, [], t, { onSuccess: (n) => e(n.map((e) => ce(e, t))) });
			});
		},
		isSameEntry: void 0
	};
}
async function* le(e, t, n = void 0) {
	let r = () => `${t}/${e.name}`;
	if (e.kind === "file") {
		let i = await e.getFile();
		i == null ? n != null && (yield n) : (i.relativePath = t ? r() : null, yield i);
	} else if (e.kind === "directory") for await (let n of e.values()) yield* le(n, t ? r() : e.name);
	else n != null && (yield n);
}
async function* M(e, t) {
	let n = await Promise.all(Array.from(e.items, async (e) => {
		let n;
		return n ??= ce(typeof e.getAsEntry == "function" ? e.getAsEntry() : e.webkitGetAsEntry(), t), {
			fileSystemHandle: n,
			lastResortFile: e.getAsFile()
		};
	}));
	for (let { lastResortFile: e, fileSystemHandle: r } of n) if (r != null) try {
		yield* le(r, "", e);
	} catch (n) {
		e == null ? t(n) : yield e;
	}
	else e != null && (yield e);
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getDroppedFiles/index.js
async function ue(e, t) {
	let n = t?.logDropError ?? Function.prototype;
	try {
		let t = [];
		for await (let r of M(e, n)) t.push(r);
		return t;
	} catch {
		return se(e);
	}
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/getTimeStamp.js
function de(e) {
	return e < 10 ? `0${e}` : e.toString();
}
function N() {
	let e = /* @__PURE__ */ new Date();
	return `${de(e.getHours())}:${de(e.getMinutes())}:${de(e.getSeconds())}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isDragDropSupported.js
function fe() {
	if (typeof window > "u") return !1;
	let e = document.body;
	return !(e == null || window == null || !("draggable" in e) || !("ondragstart" in e) || !("ondrop" in e) || !("FormData" in window) || !("FileReader" in window));
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isObjectURL.js
function pe(e) {
	return e.startsWith("blob:");
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/isPreviewSupported.js
function me(e) {
	return e ? /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(e) : !1;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/secondsToTime.js
function he(e) {
	return {
		hours: Math.floor(e / 3600) % 24,
		minutes: Math.floor(e / 60) % 60,
		seconds: Math.floor(e % 60)
	};
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/prettyETA.js
function ge(e) {
	let t = he(e);
	return `${t.hours === 0 ? "" : `${t.hours}h`}${t.minutes === 0 ? "" : `${t.hours === 0 ? t.minutes : ` ${t.minutes.toString(10).padStart(2, "0")}`}m`}${t.hours === 0 ? `${t.minutes === 0 ? t.seconds : ` ${t.seconds.toString(10).padStart(2, "0")}`}s` : ""}`;
}
//#endregion
//#region node_modules/@uppy/core/lib/utils/truncateString.js
var _e = "...";
function ve(e, t) {
	if (t === 0) return "";
	if (e.length <= t) return e;
	if (t <= 4) return `${e.slice(0, t - 1)}…`;
	let n = t - 3, r = Math.ceil(n / 2), i = Math.floor(n / 2);
	return e.slice(0, r) + _e + e.slice(-i);
}
//#endregion
//#region node_modules/@uppy/core/lib/loggers.js
var ye = {
	debug: () => {},
	warn: () => {},
	error: (...e) => console.error(`[Uppy] [${N()}]`, ...e)
}, be = {
	debug: (...e) => console.debug(`[Uppy] [${N()}]`, ...e),
	warn: (...e) => console.warn(`[Uppy] [${N()}]`, ...e),
	error: (...e) => console.error(`[Uppy] [${N()}]`, ...e)
}, xe = /* @__PURE__ */ t(((e, t) => {
	function n(e, t) {
		this.text = e ||= "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t);
	}
	n.prototype.match = function(e) {
		var t = !0, n = this.parts, r, i = n.length, a;
		if (typeof e == "string" || e instanceof String) {
			if (!this.hasWild && this.text != e) t = !1;
			else {
				for (a = (e || "").split(this.separator), r = 0; t && r < i; r++) if (n[r] === "*") continue;
				else t = r < a.length && n[r] === a[r];
				t &&= a;
			}
		} else if (typeof e.splice == "function") for (t = [], r = e.length; r--;) this.match(e[r]) && (t[t.length] = e[r]);
		else if (typeof e == "object") for (var o in t = {}, e) this.match(o) && (t[o] = e[o]);
		return t;
	}, t.exports = function(e, t, r) {
		var i = new n(e, r || /[\/\.]/);
		return t === void 0 ? i : i.match(t);
	};
})), Se = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = xe(), r = /[\/\+\.]/;
	t.exports = function(e, t) {
		function i(t) {
			var i = n(t, e, r);
			return i && i.length >= 2;
		}
		return t ? i(t.split(";")[0]) : i;
	};
})))(), 1), Ce = {
	maxFileSize: null,
	minFileSize: null,
	maxTotalFileSize: null,
	maxNumberOfFiles: null,
	minNumberOfFiles: null,
	allowedFileTypes: null,
	requiredMetaFields: []
}, P = class extends Error {
	isUserFacing;
	file;
	constructor(e, t) {
		super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
	}
	isRestriction = !0;
}, we = class {
	getI18n;
	getOpts;
	constructor(e, t) {
		this.getI18n = t, this.getOpts = () => {
			let t = e();
			if (t.restrictions?.allowedFileTypes != null && !Array.isArray(t.restrictions.allowedFileTypes)) throw TypeError("`restrictions.allowedFileTypes` must be an array");
			return t;
		};
	}
	validateAggregateRestrictions(e, t) {
		let { maxTotalFileSize: n, maxNumberOfFiles: r } = this.getOpts().restrictions;
		if (r && e.filter((e) => !e.isGhost).length + t.length > r) throw new P(`${this.getI18n()("youCanOnlyUploadX", { smart_count: r })}`);
		if (n) {
			let r = [...e, ...t].reduce((e, t) => e + (t.size ?? 0), 0);
			if (r > n) throw new P(this.getI18n()("aggregateExceedsSize", {
				sizeAllowed: i(n),
				size: i(r)
			}));
		}
	}
	validateSingleFile(e) {
		let { maxFileSize: t, minFileSize: n, allowedFileTypes: r } = this.getOpts().restrictions;
		if (r && !r.some((t) => t.includes("/") ? e.type ? (0, Se.default)(e.type.replace(/;.*?$/, ""), t) : !1 : t[0] === "." && e.extension ? e.extension.toLowerCase() === t.slice(1).toLowerCase() : !1)) {
			let t = r.join(", ");
			throw new P(this.getI18n()("youCanOnlyUploadFileTypes", { types: t }), { file: e });
		}
		if (t && e.size != null && e.size > t) throw new P(this.getI18n()("exceedsSize", {
			size: i(t),
			file: e.name ?? this.getI18n()("unnamed")
		}), { file: e });
		if (n && e.size != null && e.size < n) throw new P(this.getI18n()("inferiorSize", { size: i(n) }), { file: e });
	}
	validate(e, t) {
		t.forEach((e) => {
			this.validateSingleFile(e);
		}), this.validateAggregateRestrictions(e, t);
	}
	validateMinNumberOfFiles(e) {
		let { minNumberOfFiles: t } = this.getOpts().restrictions;
		if (t && Object.keys(e).length < t) throw new P(this.getI18n()("youHaveToAtLeastSelectX", { smart_count: t }));
	}
	getMissingRequiredMetaFields(e) {
		let t = new P(this.getI18n()("missingRequiredMetaFieldOnFile", { fileName: e.name ?? this.getI18n()("unnamed") })), { requiredMetaFields: n } = this.getOpts().restrictions, r = [];
		for (let t of n) (!Object.hasOwn(e.meta, t) || e.meta[t] === "") && r.push(t);
		return {
			missingFields: r,
			error: t
		};
	}
}, Te = /* @__PURE__ */ t(((e, t) => {
	var r = n(), i = c(), a = "Expected a function";
	function o(e, t, n) {
		var o = !0, s = !0;
		if (typeof e != "function") throw TypeError(a);
		return i(n) && (o = "leading" in n ? !!n.leading : o, s = "trailing" in n ? !!n.trailing : s), r(e, t, {
			leading: o,
			maxWait: t,
			trailing: s
		});
	}
	t.exports = o;
})), Ee = /* @__PURE__ */ t(((e, t) => {
	t.exports = function() {
		var e = {}, t = e._fns = {};
		e.emit = function(e, t, i, a, o, s, c) {
			var l = n(e);
			l.length && r(e, l, [
				t,
				i,
				a,
				o,
				s,
				c
			]);
		}, e.on = function(e, n) {
			t[e] || (t[e] = []), t[e].push(n);
		}, e.once = function(t, n) {
			function r() {
				n.apply(this, arguments), e.off(t, r);
			}
			this.on(t, r);
		}, e.off = function(e, t) {
			var n = [];
			if (e && t) for (var r = this._fns[e], i = 0, a = r ? r.length : 0; i < a; i++) r[i] !== t && n.push(r[i]);
			n.length ? this._fns[e] = n : delete this._fns[e];
		};
		function n(e) {
			for (var n = t[e] ? t[e] : [], r = e.indexOf(":"), i = r === -1 ? [e] : [e.substring(0, r), e.substring(r + 1)], a = Object.keys(t), o = 0, s = a.length; o < s; o++) {
				var c = a[o];
				if (c === "*" && (n = n.concat(t[c])), i.length === 2 && i[0] === c) {
					n = n.concat(t[c]);
					break;
				}
			}
			return n;
		}
		function r(e, t, n) {
			for (var r = 0, i = t.length; r < i && t[r]; r++) t[r].event = e, t[r].apply(t[r], n);
		}
		return e;
	};
}));
//#endregion
//#region node_modules/@uppy/core/lib/getFileName.js
function De(e, t) {
	return t.name ? t.name : e.split("/")[0] === "image" ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname";
}
//#endregion
//#region node_modules/@uppy/core/lib/locale.js
var Oe = { strings: {
	addBulkFilesFailed: {
		0: "Failed to add %{smart_count} file due to an internal error",
		1: "Failed to add %{smart_count} files due to internal errors"
	},
	youCanOnlyUploadX: {
		0: "You can only upload %{smart_count} file",
		1: "You can only upload %{smart_count} files"
	},
	youHaveToAtLeastSelectX: {
		0: "You have to select at least %{smart_count} file",
		1: "You have to select at least %{smart_count} files"
	},
	aggregateExceedsSize: "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
	exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
	missingRequiredMetaField: "Missing required meta fields",
	missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
	inferiorSize: "This file is smaller than the allowed size of %{size}",
	youCanOnlyUploadFileTypes: "You can only upload: %{types}",
	noMoreFilesAllowed: "Cannot add more files",
	noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
	companionError: "Connection with Companion failed",
	actionFailed: "The action failed",
	authAborted: "Authentication aborted",
	companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
	failedToUpload: "Failed to upload %{file}",
	noInternetConnection: "No Internet connection",
	connectedToInternet: "Connected to the Internet",
	noFilesFound: "You have no files or folders here",
	noSearchResults: "Unfortunately, there are no results for this search",
	selectX: {
		0: "Select %{smart_count}",
		1: "Select %{smart_count}"
	},
	allFilesFromFolderNamed: "All files from folder %{name}",
	openFolderNamed: "Open folder %{name}",
	openFileNamed: "Open %{name}",
	itemActionsNamed: "Actions for %{name}",
	itemsSelected: {
		0: "%{smart_count} selected",
		1: "%{smart_count} selected"
	},
	selectMultiple: "Select multiple",
	cancelSelection: "Cancel selection",
	close: "Close",
	detailSize: "Size",
	detailType: "Type",
	detailModified: "Modified",
	cancel: "Cancel",
	stopOperation: "Stop",
	dialogConfirm: "OK",
	logOut: "Log out",
	logIn: "Log in",
	pickFiles: "Pick files",
	pickPhotos: "Pick photos",
	filter: "Filter",
	resetFilter: "Reset filter",
	loading: "Loading...",
	loadedXFiles: "Loaded %{numFiles} files",
	authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
	authenticateWith: "Connect to %{pluginName}",
	signInWithGoogle: "Sign in with Google",
	searchImages: "Search for images",
	enterTextToSearch: "Enter text to search for images",
	search: "Search",
	resetSearch: "Reset search",
	emptyFolderAdded: "No files were added from empty folder",
	addedNumFiles: "Added %{numFiles} file(s)",
	folderAlreadyAdded: "The folder \"%{folder}\" was already added",
	folderAdded: {
		0: "Added %{smart_count} file from %{folder}",
		1: "Added %{smart_count} files from %{folder}"
	},
	additionalRestrictionsFailed: "%{count} additional restrictions were not fulfilled",
	unnamed: "Unnamed",
	pleaseWait: "Please wait",
	s3AlreadyExists: "A file or folder with that name already exists",
	s3Conflict: "The file changed while it was being moved. Refresh the folder and try again",
	s3DestinationMustBeFile: "The destination of a file must be a file path",
	s3FileTooLargeToMove: "Files larger than 5 GB cannot be moved or renamed here",
	s3FolderMoveNotSupported: "Folders have to be moved item by item",
	s3FolderIntoItself: "A folder cannot be moved into itself",
	s3FolderNotEmpty: "The folder is not empty",
	s3InvalidGrant: "Your access to this storage could not be verified",
	s3InvalidName: "That name is not allowed",
	s3NotConfigured: "This storage is not available",
	s3NotFound: "The file or folder no longer exists",
	s3OutsideAllowedFolder: "That path is outside the folder you have access to",
	s3ReadOnlySession: "Your session is read-only",
	s3RequestFailed: "The storage request failed",
	s3SelectedInOtherSession: "This file was selected in another storage session. Reconnect and select it again",
	webdavCannotConnect: "Cannot connect to server"
} }, ke = class {
	static VERSION = f.version;
	state = {};
	#e = /* @__PURE__ */ new Set();
	getState() {
		return this.state;
	}
	setState(e) {
		let t = { ...this.state }, n = {
			...this.state,
			...e
		};
		this.state = n, this.#t(t, n, e);
	}
	subscribe(e) {
		return this.#e.add(e), () => {
			this.#e.delete(e);
		};
	}
	#t(...e) {
		this.#e.forEach((t) => {
			t(...e);
		});
	}
};
//#endregion
//#region node_modules/@uppy/core/lib/supportsUploadProgress.js
function Ae(e) {
	if (e == null && typeof navigator < "u" && (e = navigator.userAgent), !e) return !0;
	let t = /Edge\/(\d+\.\d+)/.exec(e);
	if (!t) return !0;
	let n = t[1].split(".", 2), r = parseInt(n[0], 10), i = parseInt(n[1], 10);
	return r < 15 || r === 15 && i < 15063 || r > 18 || r === 18 && i >= 18218;
}
//#endregion
//#region node_modules/@uppy/core/lib/Uppy.js
var je = /* @__PURE__ */ e(Te(), 1), Me = /* @__PURE__ */ e(Ee(), 1), Ne = {
	totalProgress: 0,
	allowNewUpload: !0,
	error: null,
	recoveredState: null
}, Pe = class e {
	static VERSION = f.version;
	#e = Object.create(null);
	#t;
	#n;
	#r = (0, Me.default)();
	#i = /* @__PURE__ */ new Set();
	#a = /* @__PURE__ */ new Set();
	#o = /* @__PURE__ */ new Set();
	defaultLocale;
	locale;
	opts;
	store;
	i18n;
	i18nArray;
	scheduledAutoProceed = null;
	wasOffline = !1;
	constructor(t) {
		this.defaultLocale = Oe;
		let n = {
			id: "uppy",
			autoProceed: !1,
			allowMultipleUploadBatches: !0,
			debug: !1,
			restrictions: Ce,
			meta: {},
			onBeforeFileAdded: (e, t) => !Object.hasOwn(t, e.id),
			onBeforeUpload: (e) => e,
			store: new ke(),
			logger: ye,
			infoTimeout: 5e3
		}, r = {
			...n,
			...t
		};
		this.opts = {
			...r,
			restrictions: {
				...n.restrictions,
				...t?.restrictions
			}
		}, t?.logger && t.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : t?.debug && (this.opts.logger = be), this.log(`Using Core v${e.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
			...Ne,
			plugins: {},
			files: {},
			currentUploads: {},
			capabilities: {
				uploadProgress: Ae(),
				individualCancellation: !0,
				resumableUploads: !1
			},
			meta: { ...this.opts.meta },
			info: []
		}), this.#t = new we(() => this.opts, () => this.i18n), this.#n = this.store.subscribe((e, t, n) => {
			this.emit("state-update", e, t, n), this.updateAll(t);
		}), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), this.#b();
	}
	emit(e, ...t) {
		this.#r.emit(e, ...t);
	}
	on(e, t) {
		return this.#r.on(e, t), this;
	}
	once(e, t) {
		return this.#r.once(e, t), this;
	}
	off(e, t) {
		return this.#r.off(e, t), this;
	}
	updateAll(e) {
		this.iteratePlugins((t) => {
			t.update(e);
		});
	}
	setState(e) {
		this.store.setState(e);
	}
	getState() {
		return this.store.getState();
	}
	patchFilesState(e) {
		let t = this.getState().files;
		this.setState({ files: {
			...t,
			...Object.fromEntries(Object.entries(e).map(([e, n]) => [e, {
				...t[e],
				...n
			}]))
		} });
	}
	setFileState(e, t) {
		if (!this.getState().files[e]) throw Error(`Can’t set state for ${e} (the file could have been removed)`);
		this.patchFilesState({ [e]: t });
	}
	i18nInit() {
		let e = new g([this.defaultLocale, this.opts.locale], { onMissingKey: (e) => this.log(`Missing i18n string: ${e}`, "error") });
		this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.locale = e.locale;
	}
	setOptions(e) {
		this.opts = {
			...this.opts,
			...e,
			restrictions: {
				...this.opts.restrictions,
				...e?.restrictions
			}
		}, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((t) => {
			t.setOptions(e);
		}), this.setState(void 0);
	}
	resetProgress() {
		let e = {
			percentage: 0,
			bytesUploaded: !1,
			uploadComplete: !1,
			uploadStarted: null
		}, t = { ...this.getState().files }, n = Object.create(null);
		Object.keys(t).forEach((r) => {
			n[r] = {
				...t[r],
				progress: {
					...t[r].progress,
					...e
				},
				tus: void 0,
				transloadit: void 0,
				s3Multipart: void 0
			};
		}), this.setState({
			files: n,
			...Ne
		});
	}
	clear() {
		let { capabilities: e, currentUploads: t } = this.getState();
		if (Object.keys(t).length > 0 && !e.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
		this.setState({
			...Ne,
			files: {}
		});
	}
	addPreProcessor(e) {
		this.#i.add(e);
	}
	removePreProcessor(e) {
		return this.#i.delete(e);
	}
	addPostProcessor(e) {
		this.#o.add(e);
	}
	removePostProcessor(e) {
		return this.#o.delete(e);
	}
	addUploader(e) {
		this.#a.add(e);
	}
	removeUploader(e) {
		return this.#a.delete(e);
	}
	setMeta(e) {
		let t = {
			...this.getState().meta,
			...e
		}, n = { ...this.getState().files };
		Object.keys(n).forEach((t) => {
			n[t] = {
				...n[t],
				meta: {
					...n[t].meta,
					...e
				}
			};
		}), this.log("Adding metadata:"), this.log(e), this.setState({
			meta: t,
			files: n
		});
	}
	setFileMeta(e, t) {
		let n = { ...this.getState().files };
		if (!n[e]) {
			this.log(`Was trying to set metadata for a file that has been removed: ${e}`);
			return;
		}
		let r = {
			...n[e].meta,
			...t
		};
		n[e] = {
			...n[e],
			meta: r
		}, this.setState({ files: n });
	}
	getFile(e) {
		return this.getState().files[e];
	}
	getFiles() {
		let { files: e } = this.getState();
		return Object.values(e);
	}
	getFilesByIds(e) {
		return e.map((e) => this.getFile(e));
	}
	getObjectOfFilesPerState() {
		let { files: e, totalProgress: t, error: n } = this.getState(), r = Object.values(e), i = [], a = [], o = [], s = [], c = [], l = [], u = [], d = [], f = [];
		for (let e of r) {
			let { progress: t } = e;
			!t.uploadComplete && t.uploadStarted && (i.push(e), e.isPaused || d.push(e)), t.uploadStarted || a.push(e), (t.uploadStarted || t.preprocess || t.postprocess) && o.push(e), t.uploadStarted && s.push(e), e.isPaused && c.push(e), t.uploadComplete && l.push(e), e.error && u.push(e), (t.preprocess || t.postprocess) && f.push(e);
		}
		return {
			newFiles: a,
			startedFiles: o,
			uploadStartedFiles: s,
			pausedFiles: c,
			completeFiles: l,
			erroredFiles: u,
			inProgressFiles: i,
			inProgressNotPausedFiles: d,
			processingFiles: f,
			isUploadStarted: s.length > 0,
			isAllComplete: t === 100 && l.length === r.length && f.length === 0,
			isAllErrored: !!n && u.length === r.length,
			isAllPaused: i.length !== 0 && c.length === i.length,
			isUploadInProgress: i.length > 0,
			isSomeGhost: r.some((e) => e.isGhost)
		};
	}
	#s(e) {
		for (let t of e) t.isRestriction ? this.emit("restriction-failed", t.file, t) : this.emit("error", t, t.file), this.log(t, "warning");
		let t = e.filter((e) => e.isUserFacing), n = t.slice(0, 4), r = t.slice(4);
		n.forEach(({ message: e, details: t = "" }) => {
			this.info({
				message: e,
				details: t
			}, "error", this.opts.infoTimeout);
		}), r.length > 0 && this.info({ message: this.i18n("additionalRestrictionsFailed", { count: r.length }) });
	}
	validateRestrictions(e, t = this.getFiles()) {
		try {
			this.#t.validate(t, [e]);
		} catch (e) {
			return e;
		}
		return null;
	}
	validateSingleFile(e) {
		try {
			this.#t.validateSingleFile(e);
		} catch (e) {
			return E(e);
		}
		return null;
	}
	validateAggregateRestrictions(e) {
		let t = this.getFiles();
		try {
			this.#t.validateAggregateRestrictions(t, e);
		} catch (e) {
			return E(e);
		}
		return null;
	}
	#c(e) {
		let { missingFields: t, error: n } = this.#t.getMissingRequiredMetaFields(e);
		return t.length > 0 ? (this.setFileState(e.id, {
			missingRequiredMetaFields: t,
			error: n.message
		}), this.log(n.message), this.emit("restriction-failed", e, n), !1) : (t.length === 0 && e.missingRequiredMetaFields && this.setFileState(e.id, { missingRequiredMetaFields: [] }), !0);
	}
	#l(e) {
		let t = !0;
		for (let n of Object.values(e)) this.#c(n) || (t = !1);
		return t;
	}
	#u(e) {
		let { allowNewUpload: t } = this.getState();
		if (t === !1) {
			let t = new P(this.i18n("noMoreFilesAllowed"), { file: e });
			throw this.#s([t]), t;
		}
	}
	checkIfFileAlreadyExists(e) {
		let { files: t } = this.getState();
		return !(!t[e] || t[e].isGhost);
	}
	#d(e) {
		let t = e instanceof File ? {
			name: e.name,
			type: e.type,
			size: e.size,
			data: e,
			meta: {},
			isRemote: !1,
			source: void 0,
			preview: void 0
		} : e, n = o(t), i = De(n, t), a = d(i).extension, s = r(t, this.getID()), c = {
			...t.meta,
			name: i,
			type: n
		}, l = Number.isFinite(t.data.size) ? t.data.size : null;
		return {
			source: t.source || "",
			id: s,
			name: i,
			extension: a || "",
			meta: {
				...this.getState().meta,
				...c
			},
			type: n,
			progress: {
				percentage: 0,
				bytesUploaded: !1,
				bytesTotal: l,
				uploadComplete: !1,
				uploadStarted: null
			},
			size: l,
			isGhost: !1,
			...t.isRemote ? {
				isRemote: !0,
				remote: t.remote,
				data: t.data
			} : {
				isRemote: !1,
				data: t.data
			},
			preview: t.preview
		};
	}
	#f() {
		this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
			this.scheduledAutoProceed = null, this.upload().catch((e) => {
				ee(e) || this.log(e.stack || e.message || e);
			});
		}, 4));
	}
	#p(e) {
		let { files: t } = this.getState(), n = { ...t }, r = [], i = [];
		for (let a of e) try {
			let e = this.#d(a);
			this.#u(e);
			let i = t[e.id], o = i?.isGhost;
			if (o && !e.isRemote) {
				if (e.data == null) throw Error("File data is missing");
				e = {
					...i,
					isGhost: !1,
					data: e.data
				}, this.log(`Replaced the blob in the restored ghost file: ${e.name}, ${e.id}`);
			}
			let s = this.opts.onBeforeFileAdded(e, n);
			if (t = this.getState().files, n = {
				...t,
				...n
			}, !s && this.checkIfFileAlreadyExists(e.id)) throw new P(this.i18n("noDuplicates", { fileName: e.name ?? this.i18n("unnamed") }), { file: e });
			if (s === !1 && !o) throw new P("Cannot add the file because onBeforeFileAdded returned false.", {
				isUserFacing: !1,
				file: e
			});
			typeof s == "object" && s && (e = s), this.#t.validateSingleFile(e), n[e.id] = e, r.push(e);
		} catch (e) {
			i.push(e);
		}
		try {
			this.#t.validateAggregateRestrictions(Object.values(t), r);
		} catch (e) {
			return i.push(e), {
				nextFilesState: t,
				validFilesToAdd: [],
				errors: i
			};
		}
		return {
			nextFilesState: n,
			validFilesToAdd: r,
			errors: i
		};
	}
	addFile(e) {
		let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p([e]), i = r.filter((e) => e.isRestriction);
		if (this.#s(i), r.length > 0) throw r[0];
		this.setState({ files: t });
		let [a] = n;
		return this.emit("file-added", a), this.emit("files-added", n), this.log(`Added file: ${a.name}, ${a.id}, mime type: ${a.type}`), this.#f(), a.id;
	}
	addFiles(e) {
		let { nextFilesState: t, validFilesToAdd: n, errors: r } = this.#p(e), i = r.filter((e) => e.isRestriction);
		this.#s(i);
		let a = r.filter((e) => !e.isRestriction);
		if (a.length > 0) {
			let e = "Multiple errors occurred while adding files:\n";
			if (a.forEach((t) => {
				e += `\n * ${t.message}`;
			}), this.info({
				message: this.i18n("addBulkFilesFailed", { smart_count: a.length }),
				details: e
			}, "error", this.opts.infoTimeout), typeof AggregateError == "function") throw AggregateError(a, e);
			{
				let t = Error(e);
				throw t.errors = a, t;
			}
		}
		this.setState({ files: t }), n.forEach((e) => {
			this.emit("file-added", e);
		}), this.emit("files-added", n), n.length > 5 ? this.log(`Added batch of ${n.length} files`) : Object.values(n).forEach((e) => {
			this.log(`Added file: ${e.name}\n id: ${e.id}\n type: ${e.type}`);
		}), n.length > 0 && this.#f();
	}
	removeFiles(e) {
		let { files: t, currentUploads: n } = this.getState(), r = { ...t }, i = { ...n }, a = Object.create(null);
		e.forEach((e) => {
			t[e] && (a[e] = t[e], delete r[e]);
		});
		function o(e) {
			return a[e] === void 0;
		}
		Object.keys(i).forEach((e) => {
			let t = n[e].fileIDs.filter(o);
			if (t.length === 0) {
				delete i[e];
				return;
			}
			let { capabilities: r } = this.getState();
			if (t.length !== n[e].fileIDs.length && !r.individualCancellation) throw Error("The installed uploader plugin does not allow removing files during an upload.");
			i[e] = {
				...n[e],
				fileIDs: t
			};
		});
		let s = {
			currentUploads: i,
			files: r
		};
		Object.keys(r).length === 0 && (s.allowNewUpload = !0, s.error = null, s.recoveredState = null), this.setState(s), this.#v();
		let c = Object.keys(a);
		c.forEach((e) => {
			this.emit("file-removed", a[e]);
		}), c.length > 5 ? this.log(`Removed ${c.length} files`) : this.log(`Removed files: ${c.join(", ")}`);
	}
	removeFile(e) {
		this.removeFiles([e]);
	}
	pauseResume(e) {
		if (!this.getState().capabilities.resumableUploads || this.getFile(e).progress.uploadComplete) return;
		let t = this.getFile(e), n = !t.isPaused;
		return this.setFileState(e, { isPaused: n }), this.emit("upload-pause", t, n), n;
	}
	pauseAll() {
		let e = { ...this.getState().files };
		Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
			let n = {
				...e[t],
				isPaused: !0
			};
			e[t] = n;
		}), this.setState({ files: e }), this.emit("pause-all");
	}
	resumeAll() {
		let e = { ...this.getState().files };
		Object.keys(e).filter((t) => !e[t].progress.uploadComplete && e[t].progress.uploadStarted).forEach((t) => {
			let n = {
				...e[t],
				isPaused: !1,
				error: null
			};
			e[t] = n;
		}), this.setState({ files: e }), this.emit("resume-all");
	}
	#m() {
		let { files: e } = this.getState();
		return Object.keys(e).filter((t) => {
			let n = e[t];
			return n.error && (!n.missingRequiredMetaFields || n.missingRequiredMetaFields.length === 0);
		});
	}
	async #h() {
		let e = this.#m(), t = { ...this.getState().files };
		if (e.forEach((e) => {
			t[e] = {
				...t[e],
				isPaused: !1,
				error: null
			};
		}), this.setState({
			files: t,
			error: null
		}), this.emit("retry-all", this.getFilesByIds(e)), e.length === 0) return {
			successful: [],
			failed: []
		};
		let n = this.#C(e, { forceAllowNewUpload: !0 });
		return this.#E(n);
	}
	async retryAll() {
		let e = await this.#h();
		return this.emit("complete", e), e;
	}
	cancelAll() {
		this.emit("cancel-all");
		let { files: e } = this.getState(), t = Object.keys(e);
		t.length && this.removeFiles(t), this.setState(Ne);
	}
	retryUpload(e) {
		this.setFileState(e, {
			error: null,
			isPaused: !1
		}), this.emit("upload-retry", this.getFile(e));
		let t = this.#C([e], { forceAllowNewUpload: !0 });
		return this.#E(t);
	}
	logout() {
		this.iteratePlugins((e) => {
			e.provider?.logout?.();
		});
	}
	#g = (e, t) => {
		let n = e ? this.getFile(e.id) : void 0;
		if (e == null || !n) {
			this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
			return;
		}
		if (n.progress.percentage === 100) {
			this.log(`Not setting progress for a file that has been already uploaded: ${e.id}`);
			return;
		}
		let r = {
			bytesTotal: t.bytesTotal,
			percentage: t.bytesTotal != null && Number.isFinite(t.bytesTotal) && t.bytesTotal > 0 ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : void 0
		};
		n.progress.uploadStarted == null ? this.setFileState(e.id, { progress: {
			...n.progress,
			...r
		} }) : this.setFileState(e.id, { progress: {
			...n.progress,
			...r,
			bytesUploaded: t.bytesUploaded
		} }), this.#v();
	};
	#_() {
		let e = this.#y(), t = null;
		e != null && (t = Math.round(e * 100), t > 100 ? t = 100 : t < 0 && (t = 0)), this.emit("progress", t ?? 0), this.setState({ totalProgress: t ?? 0 });
	}
	#v = (0, je.default)(() => this.#_(), 500, {
		leading: !0,
		trailing: !0
	});
	[Symbol.for("uppy test: updateTotalProgress")]() {
		return this.#_();
	}
	#y() {
		let e = this.getFiles().filter((e) => e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess);
		if (e.length === 0) return 0;
		if (e.every((e) => e.progress.uploadComplete)) return 1;
		let t = (e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0, n = e.filter(t), r = e.filter((e) => !t(e));
		if (n.every((e) => e.progress.uploadComplete) && r.length > 0 && !r.every((e) => e.progress.uploadComplete)) return null;
		let i = n.reduce((e, t) => e + (t.progress.bytesTotal ?? 0), 0), a = n.reduce((e, t) => e + (t.progress.bytesUploaded || 0), 0);
		return i === 0 ? 0 : a / i;
	}
	#b() {
		let e = (e, t, n) => {
			let r = e.message || "Unknown error";
			e.details && (r += ` ${e.details}`), this.setState({ error: r }), t != null && t.id in this.getState().files && this.setFileState(t.id, {
				error: r,
				response: n
			});
		};
		this.on("error", e), this.on("upload-error", (t, n, r) => {
			if (e(n, t, r), typeof n == "object" && n.message) {
				this.log(n.message, "error");
				let e = Error(this.i18n("failedToUpload", { file: t?.name ?? "" }));
				e.isUserFacing = !0, e.details = n.message, n.details && (e.details += ` ${n.details}`), this.#s([e]);
			} else this.#s([n]);
		});
		let t = null;
		this.on("upload-stalled", (e, n) => {
			let { message: r } = e, i = n.map((e) => e.meta.name).join(", ");
			t ||= (this.info({
				message: r,
				details: i
			}, "warning", this.opts.infoTimeout), setTimeout(() => {
				t = null;
			}, this.opts.infoTimeout)), this.log(`${r} ${i}`.trim(), "warning");
		}), this.on("upload", () => {
			this.setState({ error: null });
		}), this.on("upload-start", (e) => {
			let t = e.filter((e) => {
				let t = e != null && this.getFile(e.id);
				return t || this.log(`Not setting progress for a file that has been removed: ${e?.id}`), t;
			}), n = Object.fromEntries(t.map((e) => [e.id, { progress: {
				uploadStarted: Date.now(),
				uploadComplete: !1,
				bytesUploaded: 0,
				bytesTotal: e.size
			} }]));
			this.patchFilesState(n);
		}), this.on("upload-progress", this.#g), this.on("upload-success", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let n = this.getFile(e.id).progress, r = this.#o.size > 0;
			this.setFileState(e.id, {
				progress: {
					...n,
					postprocess: r ? { mode: "indeterminate" } : void 0,
					uploadComplete: !0,
					...!r && { complete: !0 },
					percentage: 100,
					bytesUploaded: n.bytesTotal
				},
				response: t,
				uploadURL: t.uploadURL,
				isPaused: !1
			}), e.size ?? this.setFileState(e.id, { size: t.bytesUploaded || n.bytesTotal }), this.#v();
		}), this.on("preprocess-progress", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			this.setFileState(e.id, { progress: {
				...this.getFile(e.id).progress,
				preprocess: t
			} });
		}), this.on("preprocess-complete", (e) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let t = { ...this.getState().files };
			t[e.id] = {
				...t[e.id],
				progress: { ...t[e.id].progress }
			}, delete t[e.id].progress.preprocess, this.setState({ files: t });
		}), this.on("postprocess-progress", (e, t) => {
			if (e == null || !this.getFile(e.id)) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			this.setFileState(e.id, { progress: {
				...this.getState().files[e.id].progress,
				postprocess: t
			} });
		}), this.on("postprocess-complete", (e) => {
			let t = e && this.getFile(e.id);
			if (t == null) {
				this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
				return;
			}
			let { postprocess: n, ...r } = t.progress;
			this.patchFilesState({ [t.id]: { progress: {
				...r,
				complete: !0
			} } });
		}), this.on("restored", () => {
			this.#v();
		}), this.on("dashboard:file-edit-complete", (e) => {
			e && this.#c(e);
		}), typeof window < "u" && window.addEventListener && (window.addEventListener("online", this.#x), window.addEventListener("offline", this.#x), setTimeout(this.#x, 3e3));
	}
	updateOnlineStatus() {
		window.navigator.onLine ?? !0 ? (this.emit("is-online"), this.wasOffline &&= (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
	}
	#x = this.updateOnlineStatus.bind(this);
	getID() {
		return this.opts.id;
	}
	use(e, ...t) {
		if (typeof e != "function") throw TypeError(`Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`);
		let n = new e(this, ...t), r = n.id;
		if (!r) throw Error("Your plugin must have an id");
		if (!n.type) throw Error("Your plugin must have a type");
		let i = this.getPlugin(r);
		if (i) {
			let e = `Already found a plugin named '${i.id}'. Tried to use: '${r}'.\nUppy plugins must have unique \`id\` options.`;
			throw Error(e);
		}
		return e.VERSION && this.log(`Using ${r} v${e.VERSION}`), n.type in this.#e ? this.#e[n.type].push(n) : this.#e[n.type] = [n], n.install(), this.emit("plugin-added", n), this;
	}
	getPlugin(e) {
		for (let t of Object.values(this.#e)) {
			let n = t.find((t) => t.id === e);
			if (n != null) return n;
		}
	}
	[Symbol.for("uppy test: getPlugins")](e) {
		return this.#e[e];
	}
	iteratePlugins(e) {
		Object.values(this.#e).flat(1).forEach(e);
	}
	removePlugin(e) {
		this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
		let t = this.#e[e.type], n = t.findIndex((t) => t.id === e.id);
		n !== -1 && t.splice(n, 1);
		let r = { plugins: {
			...this.getState().plugins,
			[e.id]: void 0
		} };
		this.setState(r);
	}
	destroy() {
		this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll(), this.#n(), this.iteratePlugins((e) => {
			this.removePlugin(e);
		}), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", this.#x), window.removeEventListener("offline", this.#x));
	}
	hideInfo() {
		let { info: e } = this.getState();
		this.setState({ info: e.slice(1) }), this.emit("info-hidden");
	}
	info(e, t = "info", n = 3e3) {
		let r = typeof e == "object";
		this.setState({ info: [...this.getState().info, {
			type: t,
			message: r ? e.message : e,
			details: r ? e.details : null
		}] }), setTimeout(() => this.hideInfo(), n), this.emit("info-visible");
	}
	log(e, t) {
		let { logger: n } = this.opts;
		switch (t) {
			case "error":
				n.error(e);
				break;
			case "warning":
				n.warn(e);
				break;
			default: n.debug(e);
		}
	}
	#S = /* @__PURE__ */ new Map();
	registerRequestClient(e, t) {
		this.#S.set(e, t);
	}
	getRequestClientForFile(e) {
		if (!("remote" in e && e.remote)) throw Error(`Tried to get RequestClient for a non-remote file ${e.id}`);
		let t = this.#S.get(e.remote.requestClientId);
		if (t == null) throw Error(`requestClientId "${e.remote.requestClientId}" not registered for file "${e.id}"`);
		return t;
	}
	async restore(e) {
		this.log(`Core: Running restored upload "${e}"`);
		let t = await this.#E(e);
		return this.emit("complete", t), t;
	}
	#C(e, t = {}) {
		let { forceAllowNewUpload: n = !1 } = t, { allowNewUpload: r, currentUploads: i } = this.getState();
		if (!r && !n) throw Error("Cannot create a new upload: already uploading.");
		let o = a();
		return this.emit("upload", o, this.getFilesByIds(e)), this.setState({
			allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
			currentUploads: {
				...i,
				[o]: {
					fileIDs: e,
					step: 0,
					result: {}
				}
			}
		}), o;
	}
	[Symbol.for("uppy test: createUpload")](...e) {
		return this.#C(...e);
	}
	#w(e) {
		let { currentUploads: t } = this.getState();
		return t[e];
	}
	addResultData(e, t) {
		if (!this.#w(e)) {
			this.log(`Not setting result for an upload that has been removed: ${e}`);
			return;
		}
		let { currentUploads: n } = this.getState(), r = {
			...n[e],
			result: {
				...n[e].result,
				...t
			}
		};
		this.setState({ currentUploads: {
			...n,
			[e]: r
		} });
	}
	#T(e) {
		let { [e]: t, ...n } = this.getState().currentUploads;
		this.setState({ currentUploads: n });
	}
	async #E(e) {
		let t = () => {
			let { currentUploads: t } = this.getState();
			return t[e];
		}, n = t();
		if (!n) throw Error("Nonexistent upload");
		let r = [
			...this.#i,
			...this.#a,
			...this.#o
		];
		try {
			for (let i = n.step || 0; i < r.length; i++) {
				let a = r[i];
				this.setState({ currentUploads: {
					...this.getState().currentUploads,
					[e]: {
						...n,
						step: i
					}
				} });
				let { fileIDs: o } = n;
				if (await a(o, e), n = t(), !n) break;
			}
		} catch (t) {
			throw this.#T(e), t;
		}
		if (n) {
			n.fileIDs.forEach((e) => {
				let t = this.getFile(e);
				t?.progress.postprocess && this.emit("postprocess-complete", t);
			});
			let r = n.fileIDs.map((e) => this.getFile(e)), i = r.filter((e) => !e.error), a = r.filter((e) => e.error);
			this.addResultData(e, {
				successful: i,
				failed: a,
				uploadID: e
			}), n = t();
		}
		let i;
		return n && (i = n.result, this.#T(e)), i ??= (this.log(`Not setting result for an upload that has been removed: ${e}`), {
			successful: [],
			failed: [],
			uploadID: e
		}), i;
	}
	async upload() {
		this.#e.uploader?.length || this.log("No uploader type plugins are used", "warning");
		let { files: e } = this.getState();
		if (this.#m().length > 0) {
			let t = await this.#h();
			if (!(this.getFiles().filter((e) => e.progress.uploadStarted == null).length > 0)) return this.emit("complete", t), t;
			({files: e} = this.getState());
		}
		let t = this.opts.onBeforeUpload(e);
		if (t === !1) throw Error("Not starting the upload because onBeforeUpload returned false");
		t && typeof t == "object" && (e = t, this.setState({ files: e }));
		try {
			if (this.#t.validateMinNumberOfFiles(e), !this.#l(e)) throw new P(this.i18n("missingRequiredMetaField"));
			let { currentUploads: t } = this.getState(), n = Object.values(t).flatMap((e) => e.fileIDs), r = Object.keys(e).filter((e) => {
				let t = this.getFile(e);
				return t && !t.progress.uploadStarted && !n.includes(e);
			}), i = this.#C(r), a = await this.#E(i);
			return this.emit("complete", a), a;
		} catch (e) {
			throw this.#s([p(e)]), e;
		}
	}
};
//#endregion
//#region node_modules/exifr/dist/mini.esm.mjs
function F(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
var Fe = typeof self < "u" ? self : global, I = typeof navigator < "u", Ie = I && typeof HTMLImageElement > "u", Le = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), Re = Fe.Buffer, ze = !!Re, Be = (e) => e !== void 0;
function Ve(e) {
	return e === void 0 || (e instanceof Map ? e.size === 0 : Object.values(e).filter(Be).length === 0);
}
function L(e) {
	let t = Error(e);
	throw delete t.stack, t;
}
function He(e) {
	let t = function(e) {
		let t = 0;
		return e.ifd0.enabled && (t += 1024), e.exif.enabled && (t += 2048), e.makerNote && (t += 2048), e.userComment && (t += 1024), e.gps.enabled && (t += 512), e.interop.enabled && (t += 100), e.ifd1.enabled && (t += 1024), t + 2048;
	}(e);
	return e.jfif.enabled && (t += 50), e.xmp.enabled && (t += 2e4), e.iptc.enabled && (t += 14e3), e.icc.enabled && (t += 6e3), t;
}
var Ue = (e) => String.fromCharCode.apply(null, e), We = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0, R = class e {
	static from(t, n) {
		return t instanceof this && t.le === n ? t : new e(t, void 0, void 0, n);
	}
	constructor(t, n = 0, r, i) {
		if (typeof i == "boolean" && (this.le = i), Array.isArray(t) && (t = new Uint8Array(t)), t === 0) this.byteOffset = 0, this.byteLength = 0;
		else if (t instanceof ArrayBuffer) {
			r === void 0 && (r = t.byteLength - n);
			let e = new DataView(t, n, r);
			this._swapDataView(e);
		} else if (t instanceof Uint8Array || t instanceof DataView || t instanceof e) {
			r === void 0 && (r = t.byteLength - n), (n += t.byteOffset) + r > t.byteOffset + t.byteLength && L("Creating view outside of available memory in ArrayBuffer");
			let e = new DataView(t.buffer, n, r);
			this._swapDataView(e);
		} else if (typeof t == "number") {
			let e = new DataView(new ArrayBuffer(t));
			this._swapDataView(e);
		} else L("Invalid input argument for BufferView: " + t);
	}
	_swapArrayBuffer(e) {
		this._swapDataView(new DataView(e));
	}
	_swapBuffer(e) {
		this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength));
	}
	_swapDataView(e) {
		this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength;
	}
	_lengthToEnd(e) {
		return this.byteLength - e;
	}
	set(t, n, r = e) {
		return t instanceof DataView || t instanceof e ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array || L("BufferView.set(): Invalid data argument."), this.toUint8().set(t, n), new r(this, n, t.byteLength);
	}
	subarray(t, n) {
		return n ||= this._lengthToEnd(t), new e(this, t, n);
	}
	toUint8() {
		return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
	}
	getUint8Array(e, t) {
		return new Uint8Array(this.buffer, this.byteOffset + e, t);
	}
	getString(e = 0, t = this.byteLength) {
		return n = this.getUint8Array(e, t), We ? We.decode(n) : ze ? Buffer.from(n).toString("utf8") : decodeURIComponent(escape(Ue(n)));
		var n;
	}
	getLatin1String(e = 0, t = this.byteLength) {
		return Ue(this.getUint8Array(e, t));
	}
	getUnicodeString(e = 0, t = this.byteLength) {
		let n = [];
		for (let r = 0; r < t && e + r < this.byteLength; r += 2) n.push(this.getUint16(e + r));
		return Ue(n);
	}
	getInt8(e) {
		return this.dataView.getInt8(e);
	}
	getUint8(e) {
		return this.dataView.getUint8(e);
	}
	getInt16(e, t = this.le) {
		return this.dataView.getInt16(e, t);
	}
	getInt32(e, t = this.le) {
		return this.dataView.getInt32(e, t);
	}
	getUint16(e, t = this.le) {
		return this.dataView.getUint16(e, t);
	}
	getUint32(e, t = this.le) {
		return this.dataView.getUint32(e, t);
	}
	getFloat32(e, t = this.le) {
		return this.dataView.getFloat32(e, t);
	}
	getFloat64(e, t = this.le) {
		return this.dataView.getFloat64(e, t);
	}
	getFloat(e, t = this.le) {
		return this.dataView.getFloat32(e, t);
	}
	getDouble(e, t = this.le) {
		return this.dataView.getFloat64(e, t);
	}
	getUintBytes(e, t, n) {
		switch (t) {
			case 1: return this.getUint8(e, n);
			case 2: return this.getUint16(e, n);
			case 4: return this.getUint32(e, n);
			case 8: return this.getUint64 && this.getUint64(e, n);
		}
	}
	getUint(e, t, n) {
		switch (t) {
			case 8: return this.getUint8(e, n);
			case 16: return this.getUint16(e, n);
			case 32: return this.getUint32(e, n);
			case 64: return this.getUint64 && this.getUint64(e, n);
		}
	}
	toString(e) {
		return this.dataView.toString(e, this.constructor.name);
	}
	ensureChunk() {}
};
function Ge(e, t) {
	L(`${e} '${t}' was not loaded, try using full build of exifr.`);
}
var Ke = class extends Map {
	constructor(e) {
		super(), this.kind = e;
	}
	get(e, t) {
		return this.has(e) || Ge(this.kind, e), t && (e in t || function(e, t) {
			L(`Unknown ${e} '${t}'.`);
		}(this.kind, e), t[e].enabled || Ge(this.kind, e)), super.get(e);
	}
	keyList() {
		return Array.from(this.keys());
	}
}, qe = new Ke("file parser"), z = new Ke("segment parser"), B = new Ke("file reader"), Je = Fe.fetch;
function Ye(e, t) {
	return (n = e).startsWith("data:") || n.length > 1e4 ? Ze(e, t, "base64") : Le && e.includes("://") ? Xe(e, t, "url", Qe) : Le ? Ze(e, t, "fs") : I ? Xe(e, t, "url", Qe) : void L("Invalid input argument");
	var n;
}
async function Xe(e, t, n, r) {
	return B.has(n) ? Ze(e, t, n) : r ? async function(e, t) {
		return new R(await t(e));
	}(e, r) : void L(`Parser ${n} is not loaded`);
}
async function Ze(e, t, n) {
	let r = new (B.get(n))(e, t);
	return await r.read(), r;
}
var Qe = (e) => Je(e).then(((e) => e.arrayBuffer())), V = (e) => new Promise(((t, n) => {
	let r = new FileReader();
	r.onloadend = () => t(r.result || /* @__PURE__ */ new ArrayBuffer()), r.onerror = n, r.readAsArrayBuffer(e);
})), $e = class extends Map {
	get tagKeys() {
		return this.allKeys ||= Array.from(this.keys()), this.allKeys;
	}
	get tagValues() {
		return this.allValues ||= Array.from(this.values()), this.allValues;
	}
};
function et(e, t, n) {
	let r = new $e();
	for (let [e, t] of n) r.set(e, t);
	if (Array.isArray(t)) for (let n of t) e.set(n, r);
	else e.set(t, r);
	return r;
}
function tt(e, t, n) {
	let r, i = e.get(t);
	for (r of n) i.set(r[0], r[1]);
}
var nt = /* @__PURE__ */ new Map(), rt = /* @__PURE__ */ new Map(), it = /* @__PURE__ */ new Map(), H = [
	"chunked",
	"firstChunkSize",
	"firstChunkSizeNode",
	"firstChunkSizeBrowser",
	"chunkSize",
	"chunkLimit"
], at = [
	"jfif",
	"xmp",
	"icc",
	"iptc",
	"ihdr"
], ot = ["tiff", ...at], U = [
	"ifd0",
	"ifd1",
	"exif",
	"gps",
	"interop"
], W = [...ot, ...U], G = ["makerNote", "userComment"], st = [
	"translateKeys",
	"translateValues",
	"reviveValues",
	"multiSegment"
], K = [
	...st,
	"sanitize",
	"mergeOutput",
	"silentErrors"
], ct = class {
	get translate() {
		return this.translateKeys || this.translateValues || this.reviveValues;
	}
}, lt = class extends ct {
	get needed() {
		return this.enabled || this.deps.size > 0;
	}
	constructor(e, t, n, r) {
		if (super(), F(this, "enabled", !1), F(this, "skip", /* @__PURE__ */ new Set()), F(this, "pick", /* @__PURE__ */ new Set()), F(this, "deps", /* @__PURE__ */ new Set()), F(this, "translateKeys", !1), F(this, "translateValues", !1), F(this, "reviveValues", !1), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(r), this.canBeFiltered = U.includes(e), this.canBeFiltered && (this.dict = nt.get(e)), n !== void 0) {
			if (Array.isArray(n)) this.parse = this.enabled = !0, this.canBeFiltered && n.length > 0 && this.translateTagSet(n, this.pick);
			else if (typeof n == "object") {
				if (this.enabled = !0, this.parse = !1 !== n.parse, this.canBeFiltered) {
					let { pick: e, skip: t } = n;
					e && e.length > 0 && this.translateTagSet(e, this.pick), t && t.length > 0 && this.translateTagSet(t, this.skip);
				}
				this.applyInheritables(n);
			} else !0 === n || !1 === n ? this.parse = this.enabled = n : L(`Invalid options argument: ${n}`);
		}
	}
	applyInheritables(e) {
		let t, n;
		for (t of st) n = e[t], n !== void 0 && (this[t] = n);
	}
	translateTagSet(e, t) {
		if (this.dict) {
			let n, r, { tagKeys: i, tagValues: a } = this.dict;
			for (n of e) typeof n == "string" ? (r = a.indexOf(n), r === -1 && (r = i.indexOf(Number(n))), r !== -1 && t.add(Number(i[r]))) : t.add(n);
		} else for (let n of e) t.add(n);
	}
	finalizeFilters() {
		!this.enabled && this.deps.size > 0 ? (this.enabled = !0, mt(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && mt(this.pick, this.deps);
	}
}, q = {
	jfif: !1,
	tiff: !0,
	xmp: !1,
	icc: !1,
	iptc: !1,
	ifd0: !0,
	ifd1: !1,
	exif: !0,
	gps: !0,
	interop: !1,
	ihdr: void 0,
	makerNote: !1,
	userComment: !1,
	multiSegment: !1,
	skip: [],
	pick: [],
	translateKeys: !0,
	translateValues: !0,
	reviveValues: !0,
	sanitize: !0,
	mergeOutput: !0,
	silentErrors: !0,
	chunked: !0,
	firstChunkSize: void 0,
	firstChunkSizeNode: 512,
	firstChunkSizeBrowser: 65536,
	chunkSize: 65536,
	chunkLimit: 5
}, ut = /* @__PURE__ */ new Map(), dt = class extends ct {
	static useCached(e) {
		let t = ut.get(e);
		return t !== void 0 || (t = new this(e), ut.set(e, t)), t;
	}
	constructor(e) {
		super(), !0 === e ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : L(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = I ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = !1), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
	}
	setupFromUndefined() {
		let e;
		for (e of H) this[e] = q[e];
		for (e of K) this[e] = q[e];
		for (e of G) this[e] = q[e];
		for (e of W) this[e] = new lt(e, q[e], void 0, this);
	}
	setupFromTrue() {
		let e;
		for (e of H) this[e] = q[e];
		for (e of K) this[e] = q[e];
		for (e of G) this[e] = !0;
		for (e of W) this[e] = new lt(e, !0, void 0, this);
	}
	setupFromArray(e) {
		let t;
		for (t of H) this[t] = q[t];
		for (t of K) this[t] = q[t];
		for (t of G) this[t] = q[t];
		for (t of W) this[t] = new lt(t, !1, void 0, this);
		this.setupGlobalFilters(e, void 0, U);
	}
	setupFromObject(e) {
		let t;
		for (t of (U.ifd0 = U.ifd0 || U.image, U.ifd1 = U.ifd1 || U.thumbnail, Object.assign(this, e), H)) this[t] = pt(e[t], q[t]);
		for (t of K) this[t] = pt(e[t], q[t]);
		for (t of G) this[t] = pt(e[t], q[t]);
		for (t of ot) this[t] = new lt(t, q[t], e[t], this);
		for (t of U) this[t] = new lt(t, q[t], e[t], this.tiff);
		this.setupGlobalFilters(e.pick, e.skip, U, W), !0 === e.tiff ? this.batchEnableWithBool(U, !0) : !1 === e.tiff ? this.batchEnableWithUserValue(U, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, U) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, U);
	}
	batchEnableWithBool(e, t) {
		for (let n of e) this[n].enabled = t;
	}
	batchEnableWithUserValue(e, t) {
		for (let n of e) {
			let e = t[n];
			this[n].enabled = !1 !== e && e !== void 0;
		}
	}
	setupGlobalFilters(e, t, n, r = n) {
		if (e && e.length) {
			for (let e of r) this[e].enabled = !1;
			let t = ft(e, n);
			for (let [e, n] of t) mt(this[e].pick, n), this[e].enabled = !0;
		} else if (t && t.length) {
			let e = ft(t, n);
			for (let [t, n] of e) mt(this[t].skip, n);
		}
	}
	filterNestedSegmentTags() {
		let { ifd0: e, exif: t, xmp: n, iptc: r, icc: i } = this;
		this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), n.enabled || e.skip.add(700), r.enabled || e.skip.add(33723), i.enabled || e.skip.add(34675);
	}
	traverseTiffDependencyTree() {
		let { ifd0: e, exif: t, gps: n, interop: r } = this;
		r.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), n.needed && e.deps.add(34853), this.tiff.enabled = U.some(((e) => !0 === this[e].enabled)) || this.makerNote || this.userComment;
		for (let e of U) this[e].finalizeFilters();
	}
	get onlyTiff() {
		return !at.map(((e) => this[e].enabled)).some(((e) => !0 === e)) && this.tiff.enabled;
	}
	checkLoadedPlugins() {
		for (let e of ot) this[e].enabled && !z.has(e) && Ge("segment parser", e);
	}
};
function ft(e, t) {
	let n, r, i, a, o = [];
	for (i of t) {
		for (a of (n = nt.get(i), r = [], n)) (e.includes(a[0]) || e.includes(a[1])) && r.push(a[0]);
		r.length && o.push([i, r]);
	}
	return o;
}
function pt(e, t) {
	return e === void 0 ? t === void 0 ? void 0 : t : e;
}
function mt(e, t) {
	for (let n of t) e.add(n);
}
F(dt, "default", q);
var ht = class {
	constructor(e) {
		F(this, "parsers", {}), F(this, "output", {}), F(this, "errors", []), F(this, "pushToErrors", ((e) => this.errors.push(e))), this.options = dt.useCached(e);
	}
	async read(e) {
		this.file = await function(e, t) {
			return typeof e == "string" ? Ye(e, t) : I && !Ie && e instanceof HTMLImageElement ? Ye(e.src, t) : e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof DataView ? new R(e) : I && e instanceof Blob ? Xe(e, t, "blob", V) : void L("Invalid input argument");
		}(e, this.options);
	}
	setup() {
		if (this.fileParser) return;
		let { file: e } = this, t = e.getUint16(0);
		for (let [n, r] of qe) if (r.canHandle(e, t)) return this.fileParser = new r(this.options, this.file, this.parsers), e[n] = !0;
		this.file.close && this.file.close(), L("Unknown file format");
	}
	async parse() {
		let { output: e, errors: t } = this;
		return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), Ve(n = e) ? void 0 : n;
		var n;
	}
	async executeParsers() {
		let { output: e } = this;
		await this.fileParser.parse();
		let t = Object.values(this.parsers).map((async (t) => {
			let n = await t.parse();
			t.assignToOutput(e, n);
		}));
		this.options.silentErrors && (t = t.map(((e) => e.catch(this.pushToErrors)))), await Promise.all(t);
	}
	async extractThumbnail() {
		this.setup();
		let { options: e, file: t } = this, n = z.get("tiff", e);
		var r;
		if (t.tiff ? r = {
			start: 0,
			type: "tiff"
		} : t.jpeg && (r = await this.fileParser.getOrFindSegment("tiff")), r === void 0) return;
		let i = await this.fileParser.ensureSegmentChunk(r), a = await (this.parsers.tiff = new n(i, e, t)).extractThumbnail();
		return t.close && t.close(), a;
	}
};
async function gt(e, t) {
	let n = new ht(t);
	return await n.read(e), n.parse();
}
var _t = Object.freeze({
	__proto__: null,
	parse: gt,
	Exifr: ht,
	fileParsers: qe,
	segmentParsers: z,
	fileReaders: B,
	tagKeys: nt,
	tagValues: rt,
	tagRevivers: it,
	createDictionary: et,
	extendDictionary: tt,
	fetchUrlAsArrayBuffer: Qe,
	readBlobAsArrayBuffer: V,
	chunkedProps: H,
	otherSegments: at,
	segments: ot,
	tiffBlocks: U,
	segmentsAndBlocks: W,
	tiffExtractables: G,
	inheritables: st,
	allFormatters: K,
	Options: dt
}), J = class {
	static findPosition(e, t) {
		let n = e.getUint16(t + 2) + 2, r = typeof this.headerLength == "function" ? this.headerLength(e, t, n) : this.headerLength, i = t + r, a = n - r;
		return {
			offset: t,
			length: n,
			headerLength: r,
			start: i,
			size: a,
			end: i + a
		};
	}
	static parse(e, t = {}) {
		return new this(e, new dt({ [this.type]: t }), e).parse();
	}
	normalizeInput(e) {
		return e instanceof R ? e : new R(e);
	}
	constructor(e, t = {}, n) {
		F(this, "errors", []), F(this, "raw", /* @__PURE__ */ new Map()), F(this, "handleError", ((e) => {
			if (!this.options.silentErrors) throw e;
			this.errors.push(e.message);
		})), this.chunk = this.normalizeInput(e), this.file = n, this.type = this.constructor.type, this.globalOptions = this.options = t, this.localOptions = t[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
	}
	translate() {
		this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
	}
	get output() {
		return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
	}
	translateBlock(e, t) {
		let n = it.get(t), r = rt.get(t), i = nt.get(t), a = this.options[t], o = a.reviveValues && !!n, s = a.translateValues && !!r, c = a.translateKeys && !!i, l = {};
		for (let [t, a] of e) o && n.has(t) ? a = n.get(t)(a) : s && r.has(t) && (a = this.translateValue(a, r.get(t))), c && i.has(t) && (t = i.get(t) || t), l[t] = a;
		return l;
	}
	translateValue(e, t) {
		return t[e] || t.DEFAULT || e;
	}
	assignToOutput(e, t) {
		this.assignObjectToOutput(e, this.constructor.type, t);
	}
	assignObjectToOutput(e, t, n) {
		if (this.globalOptions.mergeOutput) return Object.assign(e, n);
		e[t] ? Object.assign(e[t], n) : e[t] = n;
	}
};
F(J, "headerLength", 4), F(J, "type", void 0), F(J, "multiSegment", !1), F(J, "canHandle", (() => !1));
function vt(e) {
	return e === 192 || e === 194 || e === 196 || e === 219 || e === 221 || e === 218 || e === 254;
}
function yt(e) {
	return e >= 224 && e <= 239;
}
function bt(e, t, n) {
	for (let [r, i] of z) if (i.canHandle(e, t, n)) return r;
}
var xt = class extends class {
	constructor(e, t, n) {
		F(this, "errors", []), F(this, "ensureSegmentChunk", (async (e) => {
			let t = e.start, n = e.size || 65536;
			if (this.file.chunked) {
				if (this.file.available(t, n)) e.chunk = this.file.subarray(t, n);
				else try {
					e.chunk = await this.file.readChunk(t, n);
				} catch (t) {
					L(`Couldn't read segment: ${JSON.stringify(e)}. ${t.message}`);
				}
			} else this.file.byteLength > t + n ? e.chunk = this.file.subarray(t, n) : e.size === void 0 ? e.chunk = this.file.subarray(t) : L("Segment unreachable: " + JSON.stringify(e));
			return e.chunk;
		})), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = n;
	}
	injectSegment(e, t) {
		this.options[e].enabled && this.createParser(e, t);
	}
	createParser(e, t) {
		let n = new (z.get(e))(t, this.options, this.file);
		return this.parsers[e] = n;
	}
	createParsers(e) {
		for (let t of e) {
			let { type: e, chunk: n } = t, r = this.options[e];
			if (r && r.enabled) {
				let t = this.parsers[e];
				t && t.append || t || this.createParser(e, n);
			}
		}
	}
	async readSegments(e) {
		let t = e.map(this.ensureSegmentChunk);
		await Promise.all(t);
	}
} {
	constructor(...e) {
		super(...e), F(this, "appSegments", []), F(this, "jpegSegments", []), F(this, "unknownSegments", []);
	}
	static canHandle(e, t) {
		return t === 65496;
	}
	async parse() {
		await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
	}
	setupSegmentFinderArgs(e) {
		!0 === e ? (this.findAll = !0, this.wanted = new Set(z.keyList())) : (e = e === void 0 ? z.keyList().filter(((e) => this.options[e].enabled)) : e.filter(((e) => this.options[e].enabled && z.has(e))), this.findAll = !1, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = !1;
	}
	async findAppSegments(e = 0, t) {
		this.setupSegmentFinderArgs(t);
		let { file: n, findAll: r, wanted: i, remaining: a } = this;
		if (!r && this.file.chunked && (r = Array.from(i).some(((e) => {
			let t = z.get(e), n = this.options[e];
			return t.multiSegment && n.multiSegment;
		})), r && await this.file.readWhole()), e = this.findAppSegmentsInRange(e, n.byteLength), !this.options.onlyTiff && n.chunked) {
			let t = !1;
			for (; a.size > 0 && !t && (n.canReadNextChunk || this.unfinishedMultiSegment);) {
				let { nextChunkOffset: r } = n, i = this.appSegments.some(((e) => !this.file.available(e.offset || e.start, e.length || e.size)));
				if (t = e > r && !i ? !await n.readNextChunk(e) : !await n.readNextChunk(r), (e = this.findAppSegmentsInRange(e, n.byteLength)) === void 0) return;
			}
		}
	}
	findAppSegmentsInRange(e, t) {
		t -= 2;
		let n, r, i, a, o, s, { file: c, findAll: l, wanted: u, remaining: d, options: f } = this;
		for (; e < t; e++) if (c.getUint8(e) === 255) {
			if (n = c.getUint8(e + 1), yt(n)) {
				if (r = c.getUint16(e + 2), i = bt(c, e, r), i && u.has(i) && (a = z.get(i), o = a.findPosition(c, e), s = f[i], o.type = i, this.appSegments.push(o), !l && (a.multiSegment && s.multiSegment ? (this.unfinishedMultiSegment = o.chunkNumber < o.chunkCount, this.unfinishedMultiSegment || d.delete(i)) : d.delete(i), d.size === 0))) break;
				f.recordUnknownSegments && (o = J.findPosition(c, e), o.marker = n, this.unknownSegments.push(o)), e += r + 1;
			} else if (vt(n)) {
				if (r = c.getUint16(e + 2), n === 218 && !1 !== f.stopAfterSos) return;
				f.recordJpegSegments && this.jpegSegments.push({
					offset: e,
					length: r,
					marker: n
				}), e += r + 1;
			}
		}
		return e;
	}
	mergeMultiSegments() {
		if (!this.appSegments.some(((e) => e.multiSegment))) return;
		let e = function(e, t) {
			let n, r, i, a = /* @__PURE__ */ new Map();
			for (let o = 0; o < e.length; o++) n = e[o], r = n[t], a.has(r) ? i = a.get(r) : a.set(r, i = []), i.push(n);
			return Array.from(a);
		}(this.appSegments, "type");
		this.mergedAppSegments = e.map((([e, t]) => {
			let n = z.get(e, this.options);
			return n.handleMultiSegments ? {
				type: e,
				chunk: n.handleMultiSegments(t)
			} : t[0];
		}));
	}
	getSegment(e) {
		return this.appSegments.find(((t) => t.type === e));
	}
	async getOrFindSegment(e) {
		let t = this.getSegment(e);
		return t === void 0 && (await this.findAppSegments(0, [e]), t = this.getSegment(e)), t;
	}
};
F(xt, "type", "jpeg"), qe.set("jpeg", xt);
var St = [
	void 0,
	1,
	1,
	2,
	4,
	8,
	1,
	1,
	2,
	4,
	8,
	4,
	8,
	4
], Ct = class extends J {
	parseHeader() {
		var e = this.chunk.getUint16();
		e === 18761 ? this.le = !0 : e === 19789 && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0;
	}
	parseTags(e, t, n = /* @__PURE__ */ new Map()) {
		let { pick: r, skip: i } = this.options[t];
		r = new Set(r);
		let a = r.size > 0, o = i.size === 0, s = this.chunk.getUint16(e);
		e += 2;
		for (let c = 0; c < s; c++) {
			let s = this.chunk.getUint16(e);
			if (a) {
				if (r.has(s) && (n.set(s, this.parseTag(e, s, t)), r.delete(s), r.size === 0)) break;
			} else !o && i.has(s) || n.set(s, this.parseTag(e, s, t));
			e += 12;
		}
		return n;
	}
	parseTag(e, t, n) {
		let { chunk: r } = this, i = r.getUint16(e + 2), a = r.getUint32(e + 4), o = St[i];
		if (o * a <= 4 ? e += 8 : e = r.getUint32(e + 8), (i < 1 || i > 13) && L(`Invalid TIFF value type. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e}`), e > r.byteLength && L(`Invalid TIFF value offset. block: ${n.toUpperCase()}, tag: ${t.toString(16)}, type: ${i}, offset ${e} is outside of chunk size ${r.byteLength}`), i === 1) return r.getUint8Array(e, a);
		if (i === 2) return (s = function(e) {
			for (; e.endsWith("\0");) e = e.slice(0, -1);
			return e;
		}(s = r.getString(e, a)).trim()) === "" ? void 0 : s;
		var s;
		if (i === 7) return r.getUint8Array(e, a);
		if (a === 1) return this.parseTagValue(i, e);
		{
			let t = new (function(e) {
				switch (e) {
					case 1: return Uint8Array;
					case 3: return Uint16Array;
					case 4: return Uint32Array;
					case 5: return Array;
					case 6: return Int8Array;
					case 8: return Int16Array;
					case 9: return Int32Array;
					case 10: return Array;
					case 11: return Float32Array;
					case 12: return Float64Array;
					default: return Array;
				}
			}(i))(a), n = o;
			for (let r = 0; r < a; r++) t[r] = this.parseTagValue(i, e), e += n;
			return t;
		}
	}
	parseTagValue(e, t) {
		let { chunk: n } = this;
		switch (e) {
			case 1: return n.getUint8(t);
			case 3: return n.getUint16(t);
			case 4: return n.getUint32(t);
			case 5: return n.getUint32(t) / n.getUint32(t + 4);
			case 6: return n.getInt8(t);
			case 8: return n.getInt16(t);
			case 9: return n.getInt32(t);
			case 10: return n.getInt32(t) / n.getInt32(t + 4);
			case 11: return n.getFloat(t);
			case 12: return n.getDouble(t);
			case 13: return n.getUint32(t);
			default: L(`Invalid tiff type ${e}`);
		}
	}
}, wt = class extends Ct {
	static canHandle(e, t) {
		return e.getUint8(t + 1) === 225 && e.getUint32(t + 4) === 1165519206 && e.getUint16(t + 8) === 0;
	}
	async parse() {
		this.parseHeader();
		let { options: e } = this;
		return e.ifd0.enabled && await this.parseIfd0Block(), e.exif.enabled && await this.safeParse("parseExifBlock"), e.gps.enabled && await this.safeParse("parseGpsBlock"), e.interop.enabled && await this.safeParse("parseInteropBlock"), e.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
	}
	safeParse(e) {
		let t = this[e]();
		return t.catch !== void 0 && (t = t.catch(this.handleError)), t;
	}
	findIfd0Offset() {
		this.ifd0Offset === void 0 && (this.ifd0Offset = this.chunk.getUint32(4));
	}
	findIfd1Offset() {
		if (this.ifd1Offset === void 0) {
			this.findIfd0Offset();
			let e = this.chunk.getUint16(this.ifd0Offset), t = this.ifd0Offset + 2 + 12 * e;
			this.ifd1Offset = this.chunk.getUint32(t);
		}
	}
	parseBlock(e, t) {
		let n = /* @__PURE__ */ new Map();
		return this[t] = n, this.parseTags(e, t, n), n;
	}
	async parseIfd0Block() {
		if (this.ifd0) return;
		let { file: e } = this;
		this.findIfd0Offset(), this.ifd0Offset < 8 && L("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && L(`IFD0 offset points to outside of file.\nthis.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, He(this.options));
		let t = this.parseBlock(this.ifd0Offset, "ifd0");
		return t.size === 0 ? void 0 : (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t);
	}
	async parseExifBlock() {
		if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
		this.file.tiff && await this.file.ensureChunk(this.exifOffset, He(this.options));
		let e = this.parseBlock(this.exifOffset, "exif");
		return this.interopOffset ||= e.get(40965), this.makerNote = e.get(37500), this.userComment = e.get(37510), this.options.sanitize && (e.delete(40965), e.delete(37500), e.delete(37510)), this.unpack(e, 41728), this.unpack(e, 41729), e;
	}
	unpack(e, t) {
		let n = e.get(t);
		n && n.length === 1 && e.set(t, n[0]);
	}
	async parseGpsBlock() {
		if (this.gps || (this.ifd0 || await this.parseIfd0Block(), this.gpsOffset === void 0)) return;
		let e = this.parseBlock(this.gpsOffset, "gps");
		return e && e.has(2) && e.has(4) && (e.set("latitude", Tt(...e.get(2), e.get(1))), e.set("longitude", Tt(...e.get(4), e.get(3)))), e;
	}
	async parseInteropBlock() {
		if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), this.interopOffset !== void 0 || this.exif || await this.parseExifBlock(), this.interopOffset !== void 0)) return this.parseBlock(this.interopOffset, "interop");
	}
	async parseThumbnailBlock(e = !1) {
		if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = !0), this.ifd1;
	}
	async extractThumbnail() {
		if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(!0), this.ifd1 === void 0) return;
		let e = this.ifd1.get(513), t = this.ifd1.get(514);
		return this.chunk.getUint8Array(e, t);
	}
	get image() {
		return this.ifd0;
	}
	get thumbnail() {
		return this.ifd1;
	}
	createOutput() {
		let e, t, n, r = {};
		for (t of U) if (e = this[t], !Ve(e)) {
			if (n = this.canTranslate ? this.translateBlock(e, t) : Object.fromEntries(e), this.options.mergeOutput) {
				if (t === "ifd1") continue;
				Object.assign(r, n);
			} else r[t] = n;
		}
		return this.makerNote && (r.makerNote = this.makerNote), this.userComment && (r.userComment = this.userComment), r;
	}
	assignToOutput(e, t) {
		if (this.globalOptions.mergeOutput) Object.assign(e, t);
		else for (let [n, r] of Object.entries(t)) this.assignObjectToOutput(e, n, r);
	}
};
function Tt(e, t, n, r) {
	var i = e + t / 60 + n / 3600;
	return r !== "S" && r !== "W" || (i *= -1), i;
}
F(wt, "type", "tiff"), F(wt, "headerLength", 10), z.set("tiff", wt), Object.freeze({
	__proto__: null,
	default: _t,
	Exifr: ht,
	fileParsers: qe,
	segmentParsers: z,
	fileReaders: B,
	tagKeys: nt,
	tagValues: rt,
	tagRevivers: it,
	createDictionary: et,
	extendDictionary: tt,
	fetchUrlAsArrayBuffer: Qe,
	readBlobAsArrayBuffer: V,
	chunkedProps: H,
	otherSegments: at,
	segments: ot,
	tiffBlocks: U,
	segmentsAndBlocks: W,
	tiffExtractables: G,
	inheritables: st,
	allFormatters: K,
	Options: dt,
	parse: gt
});
var Et = {
	ifd0: !1,
	ifd1: !1,
	exif: !1,
	gps: !1,
	interop: !1,
	sanitize: !1,
	reviveValues: !0,
	translateKeys: !1,
	translateValues: !1,
	mergeOutput: !1
};
Object.assign({}, Et, {
	firstChunkSize: 4e4,
	gps: [
		1,
		2,
		3,
		4
	]
}), Object.assign({}, Et, {
	tiff: !1,
	ifd1: !0,
	mergeOutput: !1
});
var Dt = Object.assign({}, Et, {
	firstChunkSize: 4e4,
	ifd0: [274]
});
async function Ot(e) {
	let t = new ht(Dt);
	await t.read(e);
	let n = await t.parse();
	if (n && n.ifd0) return n.ifd0[274];
}
var kt = Object.freeze({
	1: {
		dimensionSwapped: !1,
		scaleX: 1,
		scaleY: 1,
		deg: 0,
		rad: 0
	},
	2: {
		dimensionSwapped: !1,
		scaleX: -1,
		scaleY: 1,
		deg: 0,
		rad: 0
	},
	3: {
		dimensionSwapped: !1,
		scaleX: 1,
		scaleY: 1,
		deg: 180,
		rad: 180 * Math.PI / 180
	},
	4: {
		dimensionSwapped: !1,
		scaleX: -1,
		scaleY: 1,
		deg: 180,
		rad: 180 * Math.PI / 180
	},
	5: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: -1,
		deg: 90,
		rad: 90 * Math.PI / 180
	},
	6: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: 1,
		deg: 90,
		rad: 90 * Math.PI / 180
	},
	7: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: -1,
		deg: 270,
		rad: 270 * Math.PI / 180
	},
	8: {
		dimensionSwapped: !0,
		scaleX: 1,
		scaleY: 1,
		deg: 270,
		rad: 270 * Math.PI / 180
	}
}), At = !0, jt = !0;
if (typeof navigator == "object") {
	let e = navigator.userAgent;
	if (e.includes("iPad") || e.includes("iPhone")) {
		let t = e.match(/OS (\d+)_(\d+)/);
		if (t) {
			let [, e, n] = t;
			At = Number(e) + .1 * Number(n) < 13.4, jt = !1;
		}
	} else if (e.includes("OS X 10")) {
		let [, t] = e.match(/OS X 10[_.](\d+)/);
		At = jt = Number(t) < 15;
	}
	if (e.includes("Chrome/")) {
		let [, t] = e.match(/Chrome\/(\d+)/);
		At = jt = Number(t) < 81;
	} else if (e.includes("Firefox/")) {
		let [, t] = e.match(/Firefox\/(\d+)/);
		At = jt = Number(t) < 77;
	}
}
async function Mt(e) {
	let t = await Ot(e);
	return Object.assign({
		canvas: At,
		css: jt
	}, kt[t]);
}
var Nt = class extends R {
	constructor(...e) {
		super(...e), F(this, "ranges", new Pt()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
	}
	_tryExtend(e, t, n) {
		if (e === 0 && this.byteLength === 0 && n) {
			let e = new DataView(n.buffer || n, n.byteOffset, n.byteLength);
			this._swapDataView(e);
		} else {
			let n = e + t;
			if (n > this.byteLength) {
				let { dataView: e } = this._extend(n);
				this._swapDataView(e);
			}
		}
	}
	_extend(e) {
		let t;
		t = ze ? Re.allocUnsafe(e) : new Uint8Array(e);
		let n = new DataView(t.buffer, t.byteOffset, t.byteLength);
		return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), {
			uintView: t,
			dataView: n
		};
	}
	subarray(e, t, n = !1) {
		return t ||= this._lengthToEnd(e), n && this._tryExtend(e, t), this.ranges.add(e, t), super.subarray(e, t);
	}
	set(e, t, n = !1) {
		n && this._tryExtend(t, e.byteLength, e);
		let r = super.set(e, t);
		return this.ranges.add(t, r.byteLength), r;
	}
	async ensureChunk(e, t) {
		this.chunked && (this.ranges.available(e, t) || await this.readChunk(e, t));
	}
	available(e, t) {
		return this.ranges.available(e, t);
	}
}, Pt = class {
	constructor() {
		F(this, "list", []);
	}
	get length() {
		return this.list.length;
	}
	add(e, t, n = 0) {
		let r = e + t, i = this.list.filter(((t) => Ft(e, t.offset, r) || Ft(e, t.end, r)));
		if (i.length > 0) {
			e = Math.min(e, ...i.map(((e) => e.offset))), r = Math.max(r, ...i.map(((e) => e.end))), t = r - e;
			let n = i.shift();
			n.offset = e, n.length = t, n.end = r, this.list = this.list.filter(((e) => !i.includes(e)));
		} else this.list.push({
			offset: e,
			length: t,
			end: r
		});
	}
	available(e, t) {
		let n = e + t;
		return this.list.some(((t) => t.offset <= e && n <= t.end));
	}
};
function Ft(e, t, n) {
	return e <= t && t <= n;
}
var It = class extends Nt {
	constructor(e, t) {
		super(0), F(this, "chunksRead", 0), this.input = e, this.options = t;
	}
	async readWhole() {
		this.chunked = !1, await this.readChunk(this.nextChunkOffset);
	}
	async readChunked() {
		this.chunked = !0, await this.readChunk(0, this.options.firstChunkSize);
	}
	async readNextChunk(e = this.nextChunkOffset) {
		if (this.fullyRead) return this.chunksRead++, !1;
		let t = this.options.chunkSize, n = await this.readChunk(e, t);
		return !!n && n.byteLength === t;
	}
	async readChunk(e, t) {
		if (this.chunksRead++, (t = this.safeWrapAddress(e, t)) !== 0) return this._readChunk(e, t);
	}
	safeWrapAddress(e, t) {
		return this.size !== void 0 && e + t > this.size ? Math.max(0, this.size - e) : t;
	}
	get nextChunkOffset() {
		if (this.ranges.list.length !== 0) return this.ranges.list[0].length;
	}
	get canReadNextChunk() {
		return this.chunksRead < this.options.chunkLimit;
	}
	get fullyRead() {
		return this.size !== void 0 && this.nextChunkOffset === this.size;
	}
	read() {
		return this.options.chunked ? this.readChunked() : this.readWhole();
	}
	close() {}
};
B.set("blob", class extends It {
	async readWhole() {
		this.chunked = !1;
		let e = await V(this.input);
		this._swapArrayBuffer(e);
	}
	readChunked() {
		return this.chunked = !0, this.size = this.input.size, super.readChunked();
	}
	async _readChunk(e, t) {
		let n = t ? e + t : void 0, r = await V(this.input.slice(e, n));
		return this.set(r, e, !0);
	}
});
var Lt = {
	name: "@uppy/thumbnail-generator",
	description: "Uppy plugin that generates small previews of images to show on your upload UI.",
	version: "6.0.1",
	license: "MIT",
	type: "module",
	sideEffects: !1,
	scripts: {
		build: "tsc --build tsconfig.build.json",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"thumbnail",
		"preview",
		"resize"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	],
	exports: {
		".": "./lib/index.js",
		"./package.json": "./package.json"
	},
	dependencies: { exifr: "^7.1.3" },
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@vitest/browser-playwright": "^4.1.11",
		"namespace-emitter": "2.0.1",
		playwright: "1.61.1",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" }
}, Rt = { strings: { generatingThumbnails: "Generating thumbnails..." } };
//#endregion
//#region node_modules/@uppy/thumbnail-generator/lib/index.js
function zt(e, t, n) {
	try {
		e.getContext("2d").getImageData(0, 0, 1, 1);
	} catch (e) {
		if (typeof e == "object" && e && "code" in e && e.code === 18) return Promise.reject(/* @__PURE__ */ Error("cannot read image, probably an svg with external resources"));
	}
	return e.toBlob ? new Promise((r) => {
		e.toBlob(r, t, n);
	}).then((e) => {
		if (e === null) throw Error("cannot read image, probably an svg with external resources");
		return e;
	}) : Promise.resolve().then(() => ie(e.toDataURL(t, n), {})).then((e) => {
		if (e === null) throw Error("could not extract blob, probably an old browser");
		return e;
	});
}
function Bt(e, t) {
	let n = e.width, r = e.height;
	(t.deg === 90 || t.deg === 270) && (n = e.height, r = e.width);
	let i = document.createElement("canvas");
	i.width = n, i.height = r;
	let a = i.getContext("2d");
	return a.translate(n / 2, r / 2), t.canvas && (a.rotate(t.rad), a.scale(t.scaleX, t.scaleY)), a.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), i;
}
function Vt(e) {
	let t = e.width / e.height, n = 5e6, r = 4096, i = Math.floor(Math.sqrt(n * t)), a = Math.floor(n / Math.sqrt(n * t));
	if (i > r && (i = r, a = Math.round(i / t)), a > r && (a = r, i = Math.round(t * a)), e.width > i) {
		let t = document.createElement("canvas");
		return t.width = i, t.height = a, t.getContext("2d").drawImage(e, 0, 0, i, a), t;
	}
	return e;
}
var Ht = {
	thumbnailWidth: null,
	thumbnailHeight: null,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	lazy: !1
}, Ut = class extends w {
	static VERSION = Lt.version;
	queue;
	queueProcessing;
	defaultThumbnailDimension;
	thumbnailType;
	constructor(e, t) {
		if (super(e, {
			...Ht,
			...t
		}), this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType, this.defaultLocale = Rt, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) throw Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
	}
	createThumbnail(e, t, n) {
		if (e.data == null) throw Error("File data is empty");
		let r = URL.createObjectURL(e.data), i = new Promise((e, t) => {
			let n = new Image();
			n.src = r, n.addEventListener("load", () => {
				URL.revokeObjectURL(r), e(n);
			}), n.addEventListener("error", (e) => {
				URL.revokeObjectURL(r), t(e.error || /* @__PURE__ */ Error("Could not create thumbnail"));
			});
		}), a = Mt(e.data).catch(() => 1);
		return Promise.all([i, a]).then(([e, r]) => {
			let i = this.getProportionalDimensions(e, t, n, r.deg), a = Bt(e, r);
			return zt(this.resizeImage(a, i.width, i.height), this.thumbnailType, 80);
		}).then((e) => URL.createObjectURL(e));
	}
	getProportionalDimensions(e, t, n, r) {
		let i = e.width / e.height;
		if ((r === 90 || r === 270) && (i = e.height / e.width), t != null) {
			let n = t;
			return e.width < t && (n = e.width), {
				width: n,
				height: Math.round(n / i)
			};
		}
		if (n != null) {
			let t = n;
			return e.height < n && (t = e.height), {
				width: Math.round(t * i),
				height: t
			};
		}
		return {
			width: this.defaultThumbnailDimension,
			height: Math.round(this.defaultThumbnailDimension / i)
		};
	}
	resizeImage(e, t, n) {
		let r = Vt(e), i = Math.ceil(Math.log2(r.width / t));
		i < 1 && (i = 1);
		let a = t * 2 ** (i - 1), o = n * 2 ** (i - 1);
		for (; i--;) {
			let e = document.createElement("canvas");
			e.width = a, e.height = o, e.getContext("2d").drawImage(r, 0, 0, a, o), r = e, a = Math.round(a / 2), o = Math.round(o / 2);
		}
		return r;
	}
	setPreviewURL(e, t) {
		this.uppy.setFileState(e, { preview: t });
	}
	addToQueue(e) {
		this.queue.push(e), this.queueProcessing === !1 && this.processQueue();
	}
	processQueue() {
		if (this.queueProcessing = !0, this.queue.length > 0) {
			let e = this.uppy.getFile(this.queue.shift());
			return e ? this.requestThumbnail(e).catch(() => {}).then(() => this.processQueue()) : (this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error"), Promise.resolve());
		}
		return this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated"), Promise.resolve();
	}
	requestThumbnail(e) {
		return me(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t) => {
			this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t);
		}).catch((t) => {
			this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t);
		}) : Promise.resolve();
	}
	onFileAdded = (e) => {
		!e.preview && e.data && me(e.type) && !e.isRemote && this.addToQueue(e.id);
	};
	onCancelRequest = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1);
	};
	onFileRemoved = (e) => {
		let t = this.queue.indexOf(e.id);
		t !== -1 && this.queue.splice(t, 1), e.preview && pe(e.preview) && URL.revokeObjectURL(e.preview);
	};
	onRestored = () => {
		this.uppy.getFiles().filter((e) => e.isRestored).forEach((e) => {
			(!e.preview || pe(e.preview)) && this.addToQueue(e.id);
		});
	};
	onAllFilesRemoved = () => {
		this.queue = [];
	};
	waitUntilAllProcessed = (e) => {
		e.forEach((e) => {
			let t = this.uppy.getFile(e);
			this.uppy.emit("preprocess-progress", t, {
				mode: "indeterminate",
				message: this.i18n("generatingThumbnails")
			});
		});
		let t = () => {
			e.forEach((e) => {
				let t = this.uppy.getFile(e);
				this.uppy.emit("preprocess-complete", t);
			});
		};
		return new Promise((e) => {
			this.queueProcessing ? this.uppy.once("thumbnail:all-generated", () => {
				t(), e();
			}) : (t(), e());
		});
	};
	install() {
		this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed);
	}
	uninstall() {
		this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed);
	}
}, Wt = "57X6y3wQZNzYjJB2L_10pxbackgroundhimselfUTF-8DEMOGRAPHICSVqvt4KW9", Gt = (e = 21) => {
	let t = "", n = e | 0;
	for (; n-- > 0;) t += Wt[Math.random() * 64 | 0];
	return t;
}, Kt = {
	name: "@uppy/dashboard",
	description: "Universal UI plugin for Uppy.",
	version: "6.0.1",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"dashboard",
		"ui"
	],
	homepage: "https://uppy.io",
	bugs: { url: "https://github.com/transloadit/uppy/issues" },
	repository: {
		type: "git",
		url: "git+https://github.com/transloadit/uppy.git"
	},
	files: [
		"src",
		"lib",
		"dist",
		"CHANGELOG.md"
	],
	exports: {
		".": "./lib/index.js",
		"./css/style.css": "./dist/style.css",
		"./css/style.min.css": "./dist/style.min.css",
		"./css/style.scss": "./src/style.scss",
		"./package.json": "./package.json"
	},
	dependencies: {
		"@transloadit/prettier-bytes": "^2.0.0",
		"@uppy/thumbnail-generator": "^6.0.1",
		classnames: "^2.5.1",
		lodash: "^4.18.1",
		nanoid: "^6.0.1",
		preact: "^10.29.2",
		"shallow-equal": "^3.1.0"
	},
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		"@uppy/core": "^6.2.0",
		"@uppy/dropbox": "^6.0.0",
		"@uppy/google-drive": "^6.0.0",
		"@uppy/url": "^6.0.1",
		"@uppy/webcam": "^6.0.1",
		"@vitest/browser-playwright": "^4.1.11",
		cssnano: "^8.0.1",
		playwright: "1.61.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3",
		vitest: "^4.1.11"
	},
	peerDependencies: { "@uppy/core": "^6.2.0" }
}, qt = class extends v {
	fileInput = null;
	folderInput = null;
	mobilePhotoFileInput = null;
	mobileVideoFileInput = null;
	triggerFileInputClick = () => {
		this.fileInput?.click();
	};
	triggerFolderInputClick = () => {
		this.folderInput?.click();
	};
	triggerVideoCameraInputClick = () => {
		this.mobileVideoFileInput?.click();
	};
	triggerPhotoCameraInputClick = () => {
		this.mobilePhotoFileInput?.click();
	};
	onFileInputChange = (e) => {
		this.props.handleInputChange(e), e.currentTarget.value = "";
	};
	renderHiddenInput = (e, t) => S("input", {
		className: "uppy-Dashboard-input",
		hidden: !0,
		"aria-hidden": "true",
		tabIndex: -1,
		webkitdirectory: e,
		type: "file",
		name: "files[]",
		multiple: this.props.maxNumberOfFiles !== 1,
		onChange: this.onFileInputChange,
		accept: this.props.allowedFileTypes?.join(", "),
		ref: t
	});
	renderHiddenCameraInput = (e, t, n) => {
		let r = {
			photo: "image/*",
			video: "video/*"
		}[e];
		return S("input", {
			className: "uppy-Dashboard-input",
			hidden: !0,
			"aria-hidden": "true",
			tabIndex: -1,
			type: "file",
			name: `camera-${e}`,
			onChange: this.onFileInputChange,
			capture: t === "" ? "environment" : t,
			accept: r,
			ref: n
		});
	};
	renderMyDeviceAcquirer = () => {
		let e = this.props.fileManagerSelectionType === "folders" ? this.triggerFolderInputClick : this.triggerFileInputClick;
		return S("div", {
			className: "uppy-DashboardTab",
			role: "presentation",
			"data-uppy-acquirer-id": "MyDevice",
			children: S("button", {
				type: "button",
				className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
				role: "tab",
				tabIndex: 0,
				"data-uppy-super-focusable": !0,
				onClick: e,
				children: [S("div", {
					className: "uppy-DashboardTab-inner",
					children: S("svg", {
						className: "uppy-DashboardTab-iconMyDevice",
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32",
						children: S("path", {
							d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
							fill: "currentcolor",
							"fill-rule": "evenodd"
						})
					})
				}), S("div", {
					className: "uppy-DashboardTab-name",
					children: this.props.i18n("myDevice")
				})]
			})
		});
	};
	renderPhotoCamera = () => S("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobilePhotoCamera",
		children: S("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerPhotoCameraInputClick,
			children: [S("div", {
				className: "uppy-DashboardTab-inner",
				children: S("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: S("path", {
						d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
						fill: "#02B383",
						"fill-rule": "nonzero"
					})
				})
			}), S("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("takePictureBtn")
			})]
		})
	});
	renderVideoCamera = () => S("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": "MobileVideoCamera",
		children: S("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-uppy-super-focusable": !0,
			onClick: this.triggerVideoCameraInputClick,
			children: [S("div", {
				className: "uppy-DashboardTab-inner",
				children: S("svg", {
					"aria-hidden": "true",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32",
					children: S("path", {
						fill: "#FF675E",
						fillRule: "nonzero",
						d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
					})
				})
			}), S("div", {
				className: "uppy-DashboardTab-name",
				children: this.props.i18n("recordVideoBtn")
			})]
		})
	});
	renderBrowseButton = (e, t) => {
		let n = this.props.acquirers.length;
		return S("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
			onClick: t,
			"data-uppy-super-focusable": n === 0,
			children: e
		});
	};
	renderDropPasteBrowseTagline = (e) => {
		let t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick), n = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick), r = this.props.fileManagerSelectionType, i = r.charAt(0).toUpperCase() + r.slice(1);
		return S("div", {
			class: "uppy-Dashboard-AddFiles-title",
			children: this.props.disableLocalFiles ? this.props.i18n("importFiles") : e > 0 ? this.props.i18nArray(`dropPasteImport${i}`, {
				browseFiles: t,
				browseFolders: n,
				browse: t
			}) : this.props.i18nArray(`dropPaste${i}`, {
				browseFiles: t,
				browseFolders: n,
				browse: t
			})
		});
	};
	[Symbol.for("uppy test: disable unused locale key warning")]() {
		this.props.i18nArray("dropPasteBoth"), this.props.i18nArray("dropPasteFiles"), this.props.i18nArray("dropPasteFolders"), this.props.i18nArray("dropPasteImportBoth"), this.props.i18nArray("dropPasteImportFiles"), this.props.i18nArray("dropPasteImportFolders");
	}
	renderAcquirer = (e) => S("div", {
		className: "uppy-DashboardTab",
		role: "presentation",
		"data-uppy-acquirer-id": e.id,
		children: S("button", {
			type: "button",
			className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
			role: "tab",
			tabIndex: 0,
			"data-cy": e.id,
			"aria-controls": `uppy-DashboardContent-panel--${e.id}`,
			"aria-selected": this.props.activePickerPanel?.id === e.id,
			"data-uppy-super-focusable": !0,
			onClick: () => this.props.showPanel(e.id),
			children: [S("div", {
				className: "uppy-DashboardTab-inner",
				children: e.icon()
			}), S("div", {
				className: "uppy-DashboardTab-name",
				children: e.name
			})]
		})
	});
	renderSourcesList = (e, t) => {
		let { showNativePhotoCameraButton: n, showNativeVideoCameraButton: r } = this.props, i = [], a = "myDevice";
		t || i.push({
			key: a,
			elements: this.renderMyDeviceAcquirer()
		}), n && i.push({
			key: "nativePhotoCameraButton",
			elements: this.renderPhotoCamera()
		}), r && i.push({
			key: "nativePhotoCameraButton",
			elements: this.renderVideoCamera()
		}), i.push(...e.map((e) => ({
			key: e.id,
			elements: this.renderAcquirer(e)
		}))), i.length === 1 && i[0].key === a && (i = []);
		let o = [...i], s = o.splice(i.length - 2, i.length);
		return S(C, { children: [this.renderDropPasteBrowseTagline(i.length), S("div", {
			className: "uppy-Dashboard-AddFiles-list",
			role: "tablist",
			children: [o.map(({ key: e, elements: t }) => S(C, { children: t }, e)), S("span", {
				role: "presentation",
				style: { "white-space": "nowrap" },
				children: s.map(({ key: e, elements: t }) => S(C, { children: t }, e))
			})]
		})] });
	};
	renderPoweredByUppy() {
		let { i18nArray: e } = this.props, t = e("poweredBy", { uppy: S("span", { children: [S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
			width: "11",
			height: "11",
			viewBox: "0 0 11 11",
			children: S("path", {
				d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
				fillRule: "evenodd"
			})
		}), S("span", {
			className: "uppy-Dashboard-poweredByUppy",
			children: "Uppy"
		})] }) });
		return S("a", {
			tabIndex: -1,
			href: "https://uppy.io",
			rel: "noreferrer noopener",
			target: "_blank",
			className: "uppy-Dashboard-poweredBy",
			children: t
		});
	}
	render() {
		let { showNativePhotoCameraButton: e, showNativeVideoCameraButton: t, nativeCameraFacingMode: n } = this.props;
		return S("div", {
			className: "uppy-Dashboard-AddFiles",
			children: [
				this.renderHiddenInput(!1, (e) => {
					this.fileInput = e;
				}),
				this.renderHiddenInput(!0, (e) => {
					this.folderInput = e;
				}),
				e && this.renderHiddenCameraInput("photo", n, (e) => {
					this.mobilePhotoFileInput = e;
				}),
				t && this.renderHiddenCameraInput("video", n, (e) => {
					this.mobileVideoFileInput = e;
				}),
				this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles),
				S("div", {
					className: "uppy-Dashboard-AddFiles-info",
					children: [this.props.note && S("div", {
						className: "uppy-Dashboard-note",
						children: this.props.note
					}), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()]
				})
			]
		});
	}
}, Y = /* @__PURE__ */ e(l(), 1), Jt = (e) => S("div", {
	className: (0, Y.default)("uppy-Dashboard-AddFilesPanel", e.className),
	"data-uppy-panelType": "AddFiles",
	"aria-hidden": !e.showAddFilesPanel,
	children: [S("div", {
		className: "uppy-DashboardContent-bar",
		children: [S("div", {
			className: "uppy-DashboardContent-title",
			role: "heading",
			"aria-level": 1,
			children: e.i18n("addingMoreFiles")
		}), S("button", {
			className: "uppy-DashboardContent-back",
			type: "button",
			onClick: () => e.toggleAddFilesPanel(!1),
			children: e.i18n("back")
		})]
	}), S(qt, { ...e })]
});
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/EditorPanel.js
function Yt(e) {
	let t = e.fileCardFor ? e.files[e.fileCardFor] : void 0;
	return t ? S("div", {
		className: (0, Y.default)("uppy-DashboardContent-panel", e.className),
		role: "tabpanel",
		"data-uppy-panelType": "FileEditor",
		id: "uppy-DashboardContent-panel--editor",
		children: [S("div", {
			className: "uppy-DashboardContent-bar",
			children: [
				S("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": 1,
					children: e.i18nArray("editing", { file: S("span", {
						className: "uppy-DashboardContent-titleFile",
						children: t.meta ? t.meta.name : t.name
					}) })
				}),
				S("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: () => {
						e.uppy.emit("file-editor:cancel", t), e.closeFileEditor();
					},
					children: e.i18n("cancel")
				}),
				S("button", {
					className: "uppy-DashboardContent-save",
					type: "button",
					onClick: e.saveFileEditor,
					children: e.i18n("save")
				})
			]
		}), S("div", {
			className: "uppy-DashboardContent-panelBody",
			children: e.editors.map((t) => e.uppy.getPlugin(t.id).render(e.state))
		})]
	}) : null;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/getFileTypeIcon.js
function Xt() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("g", {
			fill: "#686DE0",
			fillRule: "evenodd",
			children: [
				S("path", {
					d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
					fillRule: "nonzero"
				}),
				S("path", {
					d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
					fillRule: "nonzero"
				}),
				S("circle", {
					cx: "7.5",
					cy: "9.5",
					r: "1.5"
				})
			]
		})
	});
}
function Zt() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("path", {
			d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
			fill: "#049BCF",
			fillRule: "nonzero"
		})
	});
}
function Qt() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("path", {
			d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
			fill: "#19AF67",
			fillRule: "nonzero"
		})
	});
}
function $t() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("path", {
			d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
			fill: "#E2514A",
			fillRule: "nonzero"
		})
	});
}
function en() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("path", {
			d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
			fill: "#00C469",
			fillRule: "nonzero"
		})
	});
}
function tn() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("g", {
			fill: "#A7AFB7",
			fillRule: "nonzero",
			children: [S("path", { d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z" }), S("path", { d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z" })]
		})
	});
}
function nn() {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		className: "uppy-c-icon",
		width: "25",
		height: "25",
		viewBox: "0 0 25 25",
		children: S("path", {
			d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
			fill: "#5A5E69",
			fillRule: "nonzero"
		})
	});
}
function rn(e) {
	let t = {
		color: "#838999",
		icon: tn()
	};
	if (!e) return t;
	let n = e.split("/")[0], r = e.split("/")[1];
	return n === "text" ? {
		color: "#5a5e69",
		icon: nn()
	} : n === "image" ? {
		color: "#686de0",
		icon: Xt()
	} : n === "audio" ? {
		color: "#068dbb",
		icon: Zt()
	} : n === "video" ? {
		color: "#19af67",
		icon: Qt()
	} : n === "application" && r === "pdf" ? {
		color: "#e25149",
		icon: $t()
	} : n === "application" && [
		"zip",
		"x-7z-compressed",
		"x-zip-compressed",
		"x-rar-compressed",
		"x-tar",
		"x-gzip",
		"x-apple-diskimage"
	].indexOf(r) !== -1 ? {
		color: "#00C469",
		icon: en()
	} : t;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/ignoreEvent.js
function X(e) {
	let { tagName: t } = e.target;
	if (t === "INPUT" || t === "TEXTAREA") {
		e.stopPropagation();
		return;
	}
	e.preventDefault(), e.stopPropagation();
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FilePreview.js
function an(e) {
	let { file: t } = e;
	if (t.preview) return S("img", {
		draggable: !1,
		className: "uppy-Dashboard-Item-previewImg",
		alt: t.name,
		src: t.preview
	});
	let { color: n, icon: r } = rn(t.type);
	return S("div", {
		className: "uppy-Dashboard-Item-previewIconWrap",
		children: [S("span", {
			className: "uppy-Dashboard-Item-previewIcon",
			style: { color: n },
			children: r
		}), S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-Dashboard-Item-previewIconBg",
			width: "58",
			height: "76",
			viewBox: "0 0 58 76",
			children: S("rect", {
				fill: "#FFF",
				width: "58",
				height: "76",
				rx: "3",
				fillRule: "evenodd"
			})
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileCard/RenderMetaFields.js
function on(e) {
	let { computedMetaFields: t, requiredMetaFields: n, updateMeta: r, form: i, formState: a } = e, o = { text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input" };
	return t.map((e) => {
		let t = `uppy-Dashboard-FileCard-input-${e.id}`, s = n.includes(e.id);
		return S("fieldset", {
			className: "uppy-Dashboard-FileCard-fieldset",
			children: [S("label", {
				className: "uppy-Dashboard-FileCard-label",
				htmlFor: t,
				children: e.name
			}), e.render === void 0 ? S("input", {
				className: o.text,
				id: t,
				form: i.id,
				type: e.type || "text",
				required: s,
				value: a[e.id],
				placeholder: e.placeholder,
				onInput: (t) => r(t.target.value, e.id),
				"data-uppy-super-focusable": !0
			}) : e.render({
				value: a[e.id],
				onChange: (t) => r(t, e.id),
				fieldCSSClasses: o,
				required: s,
				form: i.id
			}, y)]
		}, e.id);
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileCard/index.js
function sn(e) {
	let { files: t, fileCardFor: n, toggleFileCard: r, saveFileCard: i, metaFields: a, requiredMetaFields: o, openFileEditor: s, i18n: c, i18nArray: l, className: u, canEditFile: d } = e, f = () => typeof a == "function" ? a(t[n]) : a, p = t[n], m = f() ?? [], h = d(p), g = {};
	m.forEach((e) => {
		g[e.id] = p.meta[e.id] ?? "";
	});
	let [_, v] = D(g), y = re((e) => {
		e.preventDefault(), i(_, n);
	}, [
		i,
		_,
		n
	]), b = (e, t) => {
		v({
			..._,
			[t]: e
		});
	}, x = () => {
		r(!1, n);
	}, [C] = D(() => {
		let e = document.createElement("form");
		return e.setAttribute("tabindex", "-1"), e.id = Gt(), e;
	}), w = O(null);
	return ne(() => {
		let e = w.current?.getRootNode() ?? document;
		return e instanceof Document ? e.body.appendChild(C) : (e instanceof ShadowRoot, e.appendChild(C)), C.addEventListener("submit", y), () => {
			C.removeEventListener("submit", y), C.parentNode && C.parentNode.removeChild(C);
		};
	}, [C, y]), S("div", {
		className: (0, Y.default)("uppy-Dashboard-FileCard", u),
		"data-uppy-panelType": "FileCard",
		onDragOver: X,
		onDragLeave: X,
		onDrop: X,
		onPaste: X,
		ref: w,
		children: [S("div", {
			className: "uppy-DashboardContent-bar",
			children: [S("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: l("editing", { file: S("span", {
					className: "uppy-DashboardContent-titleFile",
					children: p.meta ? p.meta.name : p.name
				}) })
			}), S("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				form: C.id,
				title: c("finishEditingFile"),
				onClick: x,
				children: c("cancel")
			})]
		}), S("div", {
			className: "uppy-Dashboard-FileCard-inner",
			children: [
				S("div", {
					className: "uppy-Dashboard-FileCard-preview",
					style: { backgroundColor: rn(p.type).color },
					children: [S(an, { file: p }), h && S("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
						onClick: (e) => {
							y(e), s(p);
						},
						children: c("editImage")
					})]
				}),
				S("div", {
					className: "uppy-Dashboard-FileCard-info",
					children: S(on, {
						computedMetaFields: m,
						requiredMetaFields: o,
						updateMeta: b,
						form: C,
						formState: _
					})
				}),
				S("div", {
					className: "uppy-Dashboard-FileCard-actions",
					children: [S("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
						type: "submit",
						form: C.id,
						children: c("saveChanges")
					}), S("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
						type: "button",
						onClick: x,
						form: C.id,
						children: c("cancel")
					})]
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/shallow-equal/dist/index.modern.mjs
function cn(e, t) {
	if (e === t) return !0;
	if (!e || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t), i = n.length;
	if (r.length !== i) return !1;
	for (let r = 0; r < i; r++) {
		let i = n[r];
		if (e[i] !== t[i] || !Object.prototype.hasOwnProperty.call(t, i)) return !1;
	}
	return !0;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/copyToClipboard.js
function ln(e, t = "Copy the URL below") {
	return new Promise((n) => {
		let r = document.createElement("textarea");
		r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "2em", r.style.height = "2em", r.style.padding = "0", r.style.border = "none", r.style.outline = "none", r.style.boxShadow = "none", r.style.background = "transparent", r.value = e, document.body.appendChild(r), r.select();
		let i = () => {
			document.body.removeChild(r), window.prompt(t, e), n();
		};
		try {
			if (!document.execCommand("copy")) return i();
			document.body.removeChild(r), n();
		} catch {
			return document.body.removeChild(r), i();
		}
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
function un({ file: e, uploadInProgressOrComplete: t, metaFields: n, canEditFile: r, i18n: i, onClick: a }) {
	return !t && n && n.length > 0 || !t && r(e) ? S("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
		type: "button",
		"aria-label": i("editFileWithFilename", { file: e.meta.name }),
		title: i("editFileWithFilename", { file: e.meta.name }),
		onClick: () => a(),
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 14",
			children: S("g", {
				fillRule: "evenodd",
				children: [
					S("path", {
						d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
						fillRule: "nonzero"
					}),
					S("rect", {
						x: "1",
						y: "12.293",
						width: "11",
						height: "1",
						rx: ".5"
					}),
					S("path", {
						fillRule: "nonzero",
						d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
					})
				]
			})
		})
	}) : null;
}
function dn({ i18n: e, onClick: t, file: n }) {
	return S("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
		type: "button",
		"aria-label": e("removeFile", { file: n.meta.name }),
		title: e("removeFile", { file: n.meta.name }),
		onClick: () => t(),
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "18",
			height: "18",
			viewBox: "0 0 18 18",
			children: [S("path", { d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z" }), S("path", {
				fill: "#FFF",
				d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
			})]
		})
	});
}
function fn({ file: e, uppy: t, i18n: n }) {
	let r = (r) => {
		let { currentTarget: i } = r;
		ln(e.uploadURL, n("copyLinkToClipboardFallback")).then(() => {
			t.log("Link copied to clipboard."), t.info(n("copyLinkToClipboardSuccess"), "info", 3e3);
		}).catch(t.log).then(() => i.focus({ preventScroll: !0 }));
	};
	return S("button", {
		className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
		type: "button",
		"aria-label": n("copyLink"),
		title: n("copyLink"),
		onClick: (e) => r(e),
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14",
			height: "14",
			viewBox: "0 0 14 12",
			children: S("path", { d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z" })
		})
	});
}
function pn(e) {
	let { uppy: t, file: n, uploadInProgressOrComplete: r, canEditFile: i, metaFields: a, showLinkToFileUploadResult: o, showRemoveButton: s, i18n: c, toggleFileCard: l, openFileEditor: u } = e;
	return S("div", {
		className: "uppy-Dashboard-Item-actionWrapper",
		children: [
			S(un, {
				i18n: c,
				file: n,
				uploadInProgressOrComplete: r,
				canEditFile: i,
				metaFields: a,
				onClick: () => {
					a && a.length > 0 ? l(!0, n.id) : u(n);
				}
			}),
			o && n.uploadURL ? S(fn, {
				file: n,
				uppy: t,
				i18n: c
			}) : null,
			s ? S(dn, {
				i18n: c,
				file: n,
				onClick: () => t.removeFile(n.id)
			}) : null
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
function mn(e, t, n) {
	return (typeof t == "function" ? t(n) : t)?.find((t) => t.id === e)?.name ?? e;
}
function hn(e) {
	let { file: t, toggleFileCard: n, i18n: r, metaFields: i } = e, { missingRequiredMetaFields: a } = t;
	if (!a?.length) return null;
	let o = a.map((e) => mn(e, i, t)).join(", ");
	return S("div", {
		className: "uppy-Dashboard-Item-errorMessage",
		children: [
			r("missingRequiredMetaFields", {
				smart_count: a.length,
				fields: o
			}),
			" ",
			S("button", {
				type: "button",
				class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
				onClick: () => n(!0, t.id),
				children: r("editFile")
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
var gn = (e) => {
	let { author: t, name: n } = e.file.meta;
	function r() {
		return e.isSingleFile && e.containerHeight >= 350 ? 90 : e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : t ? 20 : 30;
	}
	return S("div", {
		className: "uppy-Dashboard-Item-name",
		title: n,
		children: ve(n, r())
	});
}, _n = (e) => {
	let { author: t } = e.file.meta, n = "remote" in e.file ? e.file.remote?.providerName : void 0;
	return t ? S("div", {
		className: "uppy-Dashboard-Item-author",
		children: [S("a", {
			href: `${t.url}?utm_source=Companion&utm_medium=referral`,
			target: "_blank",
			rel: "noopener noreferrer",
			children: ve(t.name, 13)
		}), n ? S(C, { children: [
			" · ",
			n,
			" · "
		] }) : null]
	}) : null;
}, vn = (e) => e.file.size && S("div", {
	className: "uppy-Dashboard-Item-statusSize",
	children: i(e.file.size)
}), yn = (e) => e.file.isGhost && S("span", { children: [" • ", S("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
	type: "button",
	onClick: () => e.toggleAddFilesPanel(!0),
	children: e.i18n("reSelect")
})] }), bn = ({ file: e, onClick: t }) => e.error ? S("button", {
	className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
	"aria-label": e.error,
	"data-microtip-position": "bottom",
	"data-microtip-size": "medium",
	onClick: t,
	type: "button",
	children: "?"
}) : null;
function xn(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, toggleAddFilesPanel: a, isSingleFile: o, containerHeight: s, containerWidth: c } = e;
	return S("div", {
		className: "uppy-Dashboard-Item-fileInfo",
		"data-uppy-file-source": t.source,
		children: [
			S("div", {
				className: "uppy-Dashboard-Item-fileName",
				children: [gn({
					file: t,
					isSingleFile: o,
					containerHeight: s,
					containerWidth: c
				}), S(bn, {
					file: t,
					onClick: () => alert(t.error)
				})]
			}),
			S("div", {
				className: "uppy-Dashboard-Item-status",
				children: [
					_n({ file: t }),
					vn({ file: t }),
					yn({
						file: t,
						toggleAddFilesPanel: a,
						i18n: n
					})
				]
			}),
			S(hn, {
				file: t,
				i18n: n,
				toggleFileCard: r,
				metaFields: i
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
function Sn(e) {
	let { file: t, i18n: n, toggleFileCard: r, metaFields: i, showLinkToFileUploadResult: a } = e, o = t.preview ? "rgba(255, 255, 255, 0.5)" : rn(t.type).color;
	return S("div", {
		className: "uppy-Dashboard-Item-previewInnerWrap",
		style: { backgroundColor: o },
		children: [
			a && t.uploadURL && S("a", {
				className: "uppy-Dashboard-Item-previewLink",
				href: t.uploadURL,
				rel: "noreferrer noopener",
				target: "_blank",
				"aria-label": t.meta.name,
				children: S("span", {
					hidden: !0,
					children: t.meta.name
				})
			}),
			S(an, { file: t }),
			S(hn, {
				file: t,
				i18n: n,
				toggleFileCard: r,
				metaFields: i
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
function Cn(e) {
	if (!e.isUploaded) {
		if (e.error && !e.hideRetryButton) {
			e.uppy.retryUpload(e.file.id);
			return;
		}
		e.resumableUploads && !e.hidePauseResumeButton ? e.uppy.pauseResume(e.file.id) : e.individualCancellation && !e.hideCancelButton && e.uppy.removeFile(e.file.id);
	}
}
function wn(e) {
	return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : "";
}
function Tn(e) {
	return S("div", {
		className: "uppy-Dashboard-Item-progress",
		children: S("button", {
			className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
			type: "button",
			"aria-label": wn(e),
			title: wn(e),
			onClick: () => Cn(e),
			children: e.children
		})
	});
}
function En({ children: e }) {
	return S("svg", {
		"aria-hidden": "true",
		focusable: "false",
		width: "70",
		height: "70",
		viewBox: "0 0 36 36",
		className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle",
		children: e
	});
}
function Dn({ progress: e }) {
	let t = 2 * Math.PI * 15;
	return S("g", { children: [S("circle", {
		className: "uppy-Dashboard-Item-progressIcon--bg",
		r: "15",
		cx: "18",
		cy: "18",
		"stroke-width": "2",
		fill: "none"
	}), S("circle", {
		className: "uppy-Dashboard-Item-progressIcon--progress",
		r: "15",
		cx: "18",
		cy: "18",
		transform: "rotate(-90, 18, 18)",
		fill: "none",
		"stroke-width": "2",
		"stroke-dasharray": t,
		"stroke-dashoffset": t - t / 100 * e
	})] });
}
function On(e) {
	return !e.file.progress.uploadStarted || e.file.progress.percentage === void 0 ? null : e.isUploaded ? S("div", {
		className: "uppy-Dashboard-Item-progress",
		children: S("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: S(En, { children: [S("circle", {
				r: "15",
				cx: "18",
				cy: "18",
				fill: "#1bb240"
			}), S("polygon", {
				className: "uppy-Dashboard-Item-progressIcon--check",
				transform: "translate(2, 3)",
				points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
			})] })
		})
	}) : e.recoveredState ? null : e.error && !e.hideRetryButton ? S(Tn, {
		...e,
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
			width: "28",
			height: "31",
			viewBox: "0 0 16 19",
			children: [
				S("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }),
				S("path", { d: "M7.9 3H10v2H7.9z" }),
				S("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }),
				S("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })
			]
		})
	}) : e.resumableUploads && !e.hidePauseResumeButton ? S(Tn, {
		...e,
		children: S(En, { children: [S(Dn, { progress: e.file.progress.percentage }), e.file.isPaused ? S("polygon", {
			className: "uppy-Dashboard-Item-progressIcon--play",
			transform: "translate(3, 3)",
			points: "12 20 12 10 20 15"
		}) : S("g", {
			className: "uppy-Dashboard-Item-progressIcon--pause",
			transform: "translate(14.5, 13)",
			children: [S("rect", {
				x: "0",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			}), S("rect", {
				x: "5",
				y: "0",
				width: "2",
				height: "10",
				rx: "0"
			})]
		})] })
	}) : !e.resumableUploads && e.individualCancellation && !e.hideCancelButton ? S(Tn, {
		...e,
		children: S(En, { children: [S(Dn, { progress: e.file.progress.percentage }), S("polygon", {
			className: "cancel",
			transform: "translate(2, 2)",
			points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
		})] })
	}) : S("div", {
		className: "uppy-Dashboard-Item-progress",
		children: S("div", {
			className: "uppy-Dashboard-Item-progressIndicator",
			children: S(En, { children: S(Dn, { progress: e.file.progress.percentage }) })
		})
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileItem/index.js
var kn = class extends v {
	componentDidMount() {
		let { file: e } = this.props;
		e.preview || this.props.handleRequestThumbnail(e);
	}
	shouldComponentUpdate(e) {
		return !cn(this.props, e);
	}
	componentDidUpdate() {
		let { file: e } = this.props;
		e.preview || this.props.handleRequestThumbnail(e);
	}
	componentWillUnmount() {
		let { file: e } = this.props;
		e.preview || this.props.handleCancelThumbnail(e);
	}
	render() {
		let { file: e } = this.props, t = e.progress.preprocess || e.progress.postprocess, n = !!e.progress.uploadComplete && !t && !e.error, r = !!e.progress.uploadStarted || !!t, i = e.progress.uploadStarted && !e.progress.uploadComplete || t, a = e.error || !1, { isGhost: o } = e, s = (this.props.individualCancellation || !i) && !n;
		n && this.props.showRemoveButtonAfterComplete && (s = !0);
		let c = (0, Y.default)({
			"uppy-Dashboard-Item": !0,
			"is-inprogress": i && !this.props.recoveredState,
			"is-processing": t,
			"is-complete": n,
			"is-error": !!a,
			"is-resumable": this.props.resumableUploads,
			"is-noIndividualCancellation": !this.props.individualCancellation,
			"is-ghost": o
		});
		return S("div", {
			className: c,
			id: `uppy_${e.id}`,
			role: this.props.role,
			children: [S("div", {
				className: "uppy-Dashboard-Item-preview",
				children: [S(Sn, {
					file: e,
					showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
					i18n: this.props.i18n,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields
				}), S(On, {
					uppy: this.props.uppy,
					file: e,
					error: a,
					isUploaded: n,
					hideRetryButton: this.props.hideRetryButton,
					hideCancelButton: this.props.hideCancelButton,
					hidePauseResumeButton: this.props.hidePauseResumeButton,
					recoveredState: this.props.recoveredState,
					resumableUploads: this.props.resumableUploads,
					individualCancellation: this.props.individualCancellation,
					i18n: this.props.i18n
				})]
			}), S("div", {
				className: "uppy-Dashboard-Item-fileInfoAndButtons",
				children: [S(xn, {
					file: e,
					containerWidth: this.props.containerWidth,
					containerHeight: this.props.containerHeight,
					i18n: this.props.i18n,
					toggleAddFilesPanel: this.props.toggleAddFilesPanel,
					toggleFileCard: this.props.toggleFileCard,
					metaFields: this.props.metaFields,
					isSingleFile: this.props.isSingleFile
				}), S(pn, {
					file: e,
					metaFields: this.props.metaFields,
					showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
					showRemoveButton: s,
					canEditFile: this.props.canEditFile,
					uploadInProgressOrComplete: r,
					toggleFileCard: this.props.toggleFileCard,
					openFileEditor: this.props.openFileEditor,
					uppy: this.props.uppy,
					i18n: this.props.i18n
				})]
			})]
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/FileList.js
function An(e, t) {
	let n = [], r = [];
	return e.forEach((e) => {
		r.length < t ? r.push(e) : (n.push(r), r = [e]);
	}), r.length && n.push(r), n;
}
function jn({ id: e, i18n: t, uppy: n, files: r, resumableUploads: i, hideRetryButton: a, hidePauseResumeButton: o, hideCancelButton: s, showLinkToFileUploadResult: c, showRemoveButtonAfterComplete: l, metaFields: d, isSingleFile: f, toggleFileCard: p, handleRequestThumbnail: m, handleCancelThumbnail: h, recoveredState: g, individualCancellation: _, itemsPerRow: v, openFileEditor: y, canEditFile: b, toggleAddFilesPanel: x, containerWidth: C, containerHeight: w }) {
	let T = v === 1 ? 71 : 200, E = te(() => {
		let e = (e, t) => Number(r[t].isGhost) - Number(r[e].isGhost), t = Object.keys(r);
		return g && t.sort(e), An(t, v);
	}, [
		r,
		v,
		g
	]), ee = (u) => S("div", {
		class: "uppy-Dashboard-filesInner",
		role: "presentation",
		children: u.map((u) => S(kn, {
			uppy: n,
			id: e,
			i18n: t,
			resumableUploads: i,
			individualCancellation: _,
			hideRetryButton: a,
			hidePauseResumeButton: o,
			hideCancelButton: s,
			showLinkToFileUploadResult: c,
			showRemoveButtonAfterComplete: l,
			metaFields: d,
			recoveredState: g,
			isSingleFile: f,
			containerWidth: C,
			containerHeight: w,
			toggleFileCard: p,
			handleRequestThumbnail: m,
			handleCancelThumbnail: h,
			role: "listitem",
			openFileEditor: y,
			canEditFile: b,
			toggleAddFilesPanel: x,
			file: r[u]
		}, u))
	}, u[0]);
	return f ? S("div", {
		class: "uppy-Dashboard-files",
		children: ee(E[0])
	}) : S(u, {
		class: "uppy-Dashboard-files",
		role: "list",
		data: E,
		renderRow: ee,
		rowHeight: T
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/FadeIn.js
var Mn = 300, Nn = class extends v {
	ref = x();
	componentWillEnter(e) {
		this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, Mn);
	}
	componentWillLeave(e) {
		this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, Mn);
	}
	render() {
		let { children: e } = this.props;
		return S("div", {
			className: "uppy-Informer-animated",
			ref: this.ref,
			children: e
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/TransitionGroup.js
function Pn(e, t) {
	return Object.assign(e, t);
}
function Fn(e, t) {
	return e?.key ?? t;
}
function In(e, t) {
	let n = e._ptgLinkedRefs ||= {};
	return n[t] || (n[t] = (n) => {
		e.refs[t] = n;
	});
}
function Ln(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) if (e[n] != null) {
		let r = Fn(e[n], n.toString(36));
		t[r] = e[n];
	}
	return t;
}
function Rn(e, t) {
	e ||= {}, t ||= {};
	let n = (n) => Object.hasOwn(t, n) ? t[n] : e[n], r = {}, i = [];
	for (let n in e) Object.hasOwn(t, n) ? i.length && (r[n] = i, i = []) : i.push(n);
	let a = {};
	for (let e in t) {
		if (Object.hasOwn(r, e)) for (let t = 0; t < r[e].length; t++) {
			let i = r[e][t];
			a[r[e][t]] = n(i);
		}
		a[e] = n(e);
	}
	for (let e = 0; e < i.length; e++) a[i[e]] = n(i[e]);
	return a;
}
var zn = (e) => e, Bn = class extends v {
	constructor(e, t) {
		super(e, t), this.refs = {}, this.state = { children: Ln(m(m(this.props.children)) || []) }, this.performAppear = this.performAppear.bind(this), this.performEnter = this.performEnter.bind(this), this.performLeave = this.performLeave.bind(this);
	}
	componentWillMount() {
		this.currentlyTransitioningKeys = {}, this.keysToAbortLeave = [], this.keysToEnter = [], this.keysToLeave = [];
	}
	componentDidMount() {
		let e = this.state.children;
		for (let t in e) e[t] && this.performAppear(t);
	}
	componentWillReceiveProps(e) {
		let t = Ln(m(e.children) || []), n = this.state.children;
		this.setState((e) => ({ children: Rn(e.children, t) }));
		let r;
		for (r in t) if (Object.hasOwn(t, r)) {
			let e = n && Object.hasOwn(n, r);
			t[r] && e && this.currentlyTransitioningKeys[r] ? (this.keysToEnter.push(r), this.keysToAbortLeave.push(r)) : t[r] && !e && !this.currentlyTransitioningKeys[r] && this.keysToEnter.push(r);
		}
		for (r in n) if (Object.hasOwn(n, r)) {
			let e = t && Object.hasOwn(t, r);
			n[r] && !e && !this.currentlyTransitioningKeys[r] && this.keysToLeave.push(r);
		}
	}
	componentDidUpdate() {
		let { keysToEnter: e } = this;
		this.keysToEnter = [], e.forEach(this.performEnter);
		let { keysToLeave: t } = this;
		this.keysToLeave = [], t.forEach(this.performLeave);
	}
	_finishAbort(e) {
		let t = this.keysToAbortLeave.indexOf(e);
		t !== -1 && this.keysToAbortLeave.splice(t, 1);
	}
	performAppear(e) {
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e);
	}
	_handleDoneAppearing(e) {
		let t = this.refs[e];
		t?.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
		let n = Ln(m(this.props.children) || []);
		(!n || !Object.hasOwn(n, e)) && this.performLeave(e);
	}
	performEnter(e) {
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e);
	}
	_handleDoneEntering(e) {
		let t = this.refs[e];
		t?.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
		let n = Ln(m(this.props.children) || []);
		(!n || !Object.hasOwn(n, e)) && this.performLeave(e);
	}
	performLeave(e) {
		if (this.keysToAbortLeave.indexOf(e) !== -1) return;
		this.currentlyTransitioningKeys[e] = !0;
		let t = this.refs[e];
		t?.componentWillLeave ? t.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e);
	}
	_handleDoneLeaving(e) {
		if (this.keysToAbortLeave.indexOf(e) !== -1) return;
		let t = this.refs[e];
		t?.componentDidLeave && t.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
		let n = Ln(m(this.props.children) || []);
		if (n && Object.hasOwn(n, e)) this.performEnter(e);
		else {
			let t = Pn({}, this.state.children);
			delete t[e], this.setState({ children: t });
		}
	}
	render({ childFactory: e, transitionLeave: t, transitionName: n, transitionAppear: r, transitionEnter: i, transitionLeaveTimeout: a, transitionEnterTimeout: o, transitionAppearTimeout: s, component: c, ...l }, { children: u }) {
		let d = Object.entries(u).map(([t, n]) => {
			if (!n) return;
			let r = In(this, t);
			return h(e(n), {
				ref: r,
				key: t
			});
		}).filter(Boolean);
		return y(c, l, d);
	}
};
Bn.defaultProps = {
	component: "span",
	childFactory: zn
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Informer/Informer.js
var Vn = class extends v {
	render() {
		let { info: e } = this.props.uppy.getState();
		return S("div", {
			className: "uppy uppy-Informer",
			children: S(Bn, { children: e.map((e) => S(Nn, { children: S("p", {
				role: "alert",
				children: [
					e.message,
					" ",
					e.details && S("span", {
						"aria-label": e.details,
						"data-microtip-position": "top-left",
						"data-microtip-size": "medium",
						role: "tooltip",
						onClick: () => alert(`${e.message} \n\n ${e.details}`),
						children: "?"
					})
				]
			}) }, e.message)) })
		});
	}
};
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/PickerPanelContent.js
function Hn({ activePickerPanel: e, className: t, hideAllPanels: n, i18n: r, state: i, uppy: a }) {
	let o = O(null), s = a.getPlugin(e.id), c = !!s?.opts.standalone, l = (e) => {
		let t = e.target;
		return !!s?.acceptsFileDrops && !!e.dataTransfer?.types.includes("Files") && t.closest("input, textarea, dialog") == null;
	}, u = (e) => {
		l(e) || (X(e), e.type === "dragover" && e.defaultPrevented && e.dataTransfer && (e.dataTransfer.dropEffect = "none"));
	};
	return S("div", {
		className: (0, Y.default)("uppy-DashboardContent-panel", t),
		role: "tabpanel",
		"data-uppy-panelType": "PickerPanel",
		id: `uppy-DashboardContent-panel--${e.id}`,
		onDragOver: u,
		onDragLeave: u,
		onDrop: u,
		onPaste: X,
		children: [!c && S("div", {
			className: "uppy-DashboardContent-bar",
			children: [S("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": 1,
				children: r("importFrom", { name: e.name })
			}), S("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: n,
				children: r("cancel")
			})]
		}), S("div", {
			ref: o,
			className: "uppy-DashboardContent-panelBody",
			children: s?.render(i, o.current)
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/PickerPanelTopBar.js
var Z = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete",
	STATE_PAUSED: "paused"
};
function Un(e, t, n, r = {}) {
	if (e) return Z.STATE_ERROR;
	if (t) return Z.STATE_COMPLETE;
	if (n) return Z.STATE_PAUSED;
	let i = Z.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return Z.STATE_UPLOADING;
		t.preprocess && (i = Z.STATE_PREPROCESSING), t.postprocess && i !== Z.STATE_PREPROCESSING && (i = Z.STATE_POSTPROCESSING);
	}
	return i;
}
function Wn({ files: e, i18n: t, isAllComplete: n, isAllErrored: r, isAllPaused: i, inProgressNotPausedFiles: a, newFiles: o, processingFiles: s }) {
	switch (Un(r, n, i, e)) {
		case "uploading": return t("uploadingXFiles", { smart_count: a.length });
		case "preprocessing":
		case "postprocessing": return t("processingXFiles", { smart_count: s.length });
		case "paused": return t("uploadPaused");
		case "waiting": return t("xFilesSelected", { smart_count: o.length });
		case "complete": return t("uploadComplete");
		case "error": return t("error");
	}
}
function Gn(e) {
	let { i18n: t, isAllComplete: n, hideCancelButton: r, maxNumberOfFiles: i, toggleAddFilesPanel: a, totalFileCount: o, uppy: s } = e, { allowNewUpload: c } = e;
	return c && i && (c = o < i), S("div", {
		className: "uppy-DashboardContent-bar",
		children: [
			!n && !r ? S("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: () => s.cancelAll(),
				children: t("cancel")
			}) : S("div", {}),
			S("div", {
				className: "uppy-DashboardContent-title",
				children: S(Wn, { ...e })
			}),
			c ? S("button", {
				className: "uppy-DashboardContent-addMore",
				type: "button",
				"aria-label": t("addMoreFiles"),
				title: t("addMoreFiles"),
				onClick: () => a(!0),
				children: [S("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					children: S("path", { d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z" })
				}), S("span", {
					className: "uppy-DashboardContent-addMoreCaption",
					children: t("addMore")
				})]
			}) : S("div", {})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/Slide.js
var Q = "uppy-transition-slideDownUp", Kn = 250;
function qn({ children: e }) {
	let [t, n] = D(null), [r, i] = D(""), a = O(), o = O(), s = O(), c = re(() => {
		i(`${Q}-enter`), cancelAnimationFrame(s.current), clearTimeout(o.current), o.current = void 0, s.current = requestAnimationFrame(() => {
			i(`${Q}-enter ${Q}-enter-active`), a.current = setTimeout(() => {
				i("");
			}, Kn);
		});
	}, []), l = re(() => {
		i(`${Q}-leave`), cancelAnimationFrame(s.current), clearTimeout(a.current), a.current = void 0, s.current = requestAnimationFrame(() => {
			i(`${Q}-leave ${Q}-leave-active`), o.current = setTimeout(() => {
				n(null), i("");
			}, Kn);
		});
	}, []);
	return ne(() => {
		let r = m(e)[0];
		t !== r && (r && !t ? c() : t && !r && !o.current && l(), n(r));
	}, [
		e,
		t,
		c,
		l
	]), ne(() => () => {
		clearTimeout(a.current), clearTimeout(o.current), cancelAnimationFrame(s.current);
	}, []), t ? h(t, { className: (0, Y.default)(r, t.props.className) }) : null;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBarStates.js
var $ = {
	STATE_ERROR: "error",
	STATE_WAITING: "waiting",
	STATE_PREPROCESSING: "preprocessing",
	STATE_UPLOADING: "uploading",
	STATE_POSTPROCESSING: "postprocessing",
	STATE_COMPLETE: "complete"
}, Jn = "·", Yn = () => ` ${Jn} `;
function Xn(e) {
	let { newFiles: t, isUploadStarted: n, recoveredState: r, i18n: i, uploadState: a, isSomeGhost: o, startUpload: s } = e, c = (0, Y.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", { "uppy-c-btn-primary": a === $.STATE_WAITING }, { "uppy-StatusBar-actionBtn--disabled": o }), l = i(t && n && !r ? "uploadXNewFiles" : "uploadXFiles", { smart_count: t });
	return S("button", {
		type: "button",
		className: c,
		"aria-label": i("uploadXFiles", { smart_count: t }),
		onClick: s,
		disabled: o,
		"data-uppy-super-focusable": !0,
		children: l
	});
}
function Zn(e) {
	let { i18n: t, uppy: n } = e;
	return S("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
		"aria-label": t("retryUpload"),
		onClick: () => n.retryAll().catch(() => {}),
		"data-uppy-super-focusable": !0,
		"data-cy": "retry",
		children: [S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "8",
			height: "10",
			viewBox: "0 0 8 10",
			children: S("path", { d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z" })
		}), t("retry")]
	});
}
function Qn(e) {
	let { i18n: t, uppy: n } = e;
	return S("button", {
		type: "button",
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		title: t("cancel"),
		"aria-label": t("cancel"),
		onClick: () => n.cancelAll(),
		"data-cy": "cancel",
		"data-uppy-super-focusable": !0,
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: S("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [S("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), S("path", {
					fill: "#FFF",
					d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
				})]
			})
		})
	});
}
function $n(e) {
	let { isAllPaused: t, i18n: n, isAllComplete: r, resumableUploads: i, uppy: a } = e, o = n(t ? "resume" : "pause");
	function s() {
		if (!r) {
			if (!i) {
				a.cancelAll();
				return;
			}
			if (t) {
				a.resumeAll();
				return;
			}
			a.pauseAll();
		}
	}
	return S("button", {
		title: o,
		"aria-label": o,
		className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
		type: "button",
		onClick: s,
		"data-cy": "togglePauseResume",
		"data-uppy-super-focusable": !0,
		children: S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			children: S("g", {
				fill: "none",
				fillRule: "evenodd",
				children: [S("circle", {
					fill: "#888",
					cx: "8",
					cy: "8",
					r: "8"
				}), S("path", {
					fill: "#FFF",
					d: t ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
				})]
			})
		})
	});
}
function er(e) {
	let { i18n: t, doneButtonHandler: n } = e;
	return S("button", {
		type: "button",
		className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: t("done")
	});
}
function tr() {
	return S("svg", {
		className: "uppy-StatusBar-spinner",
		"aria-hidden": "true",
		focusable: "false",
		width: "14",
		height: "14",
		children: S("path", {
			d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
			fillRule: "evenodd"
		})
	});
}
function nr(e) {
	let { progress: t } = e, { value: n, mode: r, message: i } = t;
	return S("div", {
		className: "uppy-StatusBar-content",
		children: [
			S(tr, {}),
			r === "determinate" ? `${Math.round(n * 100)}% · ` : "",
			i
		]
	});
}
function rr(e) {
	let { numUploads: t, complete: n, totalUploadedSize: r, totalSize: a, totalETA: o, i18n: s } = e, c = t > 1, l = i(r);
	return S("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [c && s("filesUploadedOfTotal", {
			complete: n,
			smart_count: t
		}), S("span", {
			className: "uppy-StatusBar-additionalInfo",
			children: [
				c && Yn(),
				a == null ? s("dataUploadedOfUnknown", { complete: l }) : s("dataUploadedOfTotal", {
					complete: l,
					total: i(a)
				}),
				Yn(),
				o != null && s("xTimeLeft", { time: ge(o) })
			]
		})]
	});
}
function ir(e) {
	let { i18n: t, complete: n, numUploads: r } = e;
	return S("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: t("filesUploadedOfTotal", {
			complete: n,
			smart_count: r
		})
	});
}
function ar(e) {
	let { i18n: t, newFiles: n, startUpload: r } = e, i = (0, Y.default)("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
	return S("div", {
		className: "uppy-StatusBar-statusSecondary",
		children: [S("div", {
			className: "uppy-StatusBar-statusSecondaryHint",
			children: t("xMoreFilesAdded", { smart_count: n })
		}), S("button", {
			type: "button",
			className: i,
			"aria-label": t("uploadXFiles", { smart_count: n }),
			onClick: r,
			children: t("upload")
		})]
	});
}
function or(e) {
	let { i18n: t, supportsUploadProgress: n, totalProgress: r, hideProgressDetails: i, isUploadStarted: a, isAllComplete: o, isAllPaused: s, newFiles: c, numUploads: l, complete: u, totalUploadedSize: d, totalSize: f, totalETA: p, startUpload: m } = e, h = c && a;
	if (!a || o) return null;
	let g = t(s ? "paused" : "uploading");
	function _() {
		return !s && !h && !i ? n ? S(rr, {
			numUploads: l,
			complete: u,
			totalUploadedSize: d,
			totalSize: f,
			totalETA: p,
			i18n: t
		}) : S(ir, {
			i18n: t,
			complete: u,
			numUploads: l
		}) : null;
	}
	return S("div", {
		className: "uppy-StatusBar-content",
		title: g,
		children: [s ? null : S(tr, {}), S("div", {
			className: "uppy-StatusBar-status",
			children: [
				S("div", {
					className: "uppy-StatusBar-statusPrimary",
					children: n && r !== 0 ? `${g}: ${r}%` : g
				}),
				_(),
				h ? S(ar, {
					i18n: t,
					newFiles: c,
					startUpload: m
				}) : null
			]
		})]
	});
}
function sr(e) {
	let { i18n: t } = e;
	return S("div", {
		className: "uppy-StatusBar-content",
		role: "status",
		title: t("complete"),
		children: S("div", {
			className: "uppy-StatusBar-status",
			children: S("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [S("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-StatusBar-statusIndicator uppy-c-icon",
					width: "15",
					height: "11",
					viewBox: "0 0 15 11",
					children: S("path", { d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z" })
				}), t("complete")]
			})
		})
	});
}
function cr(e) {
	let { error: t, i18n: n, complete: r, numUploads: i } = e;
	function a() {
		let e = `${n("uploadFailed")} \n\n ${t}`;
		alert(e);
	}
	return S("div", {
		className: "uppy-StatusBar-content",
		title: n("uploadFailed"),
		children: [S("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-StatusBar-statusIndicator uppy-c-icon",
			width: "11",
			height: "11",
			viewBox: "0 0 11 11",
			children: S("path", { d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z" })
		}), S("div", {
			className: "uppy-StatusBar-status",
			children: [S("div", {
				className: "uppy-StatusBar-statusPrimary",
				children: [n("uploadFailed"), S("button", {
					className: "uppy-u-reset uppy-StatusBar-details",
					"aria-label": n("showErrorDetails"),
					"data-microtip-position": "top-right",
					"data-microtip-size": "medium",
					onClick: a,
					type: "button",
					children: "?"
				})]
			}), S(ir, {
				i18n: n,
				complete: r,
				numUploads: i
			})]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/calculateProcessingProgress.js
function lr(e) {
	let t = [], n = "indeterminate", r;
	for (let { progress: i } of Object.values(e)) {
		let { preprocess: e, postprocess: a } = i;
		r == null && (e || a) && ({mode: n, message: r} = e || a), e?.mode === "determinate" && t.push(e.value), a?.mode === "determinate" && t.push(a.value);
	}
	let i = t.reduce((e, n) => e + n / t.length, 0);
	return {
		mode: n,
		message: r,
		value: i
	};
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBarUI.js
var { STATE_ERROR: ur, STATE_WAITING: dr, STATE_PREPROCESSING: fr, STATE_UPLOADING: pr, STATE_POSTPROCESSING: mr, STATE_COMPLETE: hr } = $;
function gr({ newFiles: e, allowNewUpload: t, isUploadInProgress: n, isAllPaused: r, resumableUploads: i, error: a, hideUploadButton: o = void 0, hidePauseResumeButton: s = !1, hideCancelButton: c = !1, hideRetryButton: l = !1, recoveredState: u, uploadState: d, totalProgress: f, files: p, supportsUploadProgress: m, hideAfterFinish: h = !1, isSomeGhost: g, doneButtonHandler: _ = void 0, isUploadStarted: v, i18n: y, startUpload: b, uppy: x, isAllComplete: C, hideProgressDetails: w = void 0, numUploads: T, complete: E, totalSize: ee, totalETA: D, totalUploadedSize: te }) {
	function ne() {
		switch (d) {
			case mr:
			case fr: {
				let e = lr(p);
				return e.mode === "determinate" ? e.value * 100 : f;
			}
			case ur: return null;
			case pr: return m ? f : null;
			default: return f;
		}
	}
	function re() {
		switch (d) {
			case mr:
			case fr: {
				let { mode: e } = lr(p);
				return e === "indeterminate";
			}
			case pr: return !m;
			default: return !1;
		}
	}
	let O = ne(), k = O ?? 100, ie = !a && e && (!n && !r || u) && t && !o, A = !c && d !== dr && d !== hr, ae = i && !s && d === pr, oe = a && !C && !l, se = _ && d === hr, j = (0, Y.default)("uppy-StatusBar-progress", { "is-indeterminate": re() }), ce = (0, Y.default)("uppy-StatusBar", `is-${d}`, { "has-ghosts": g }), le = (() => {
		switch (d) {
			case fr:
			case mr: return S(nr, { progress: lr(p) });
			case hr: return S(sr, { i18n: y });
			case ur: return S(cr, {
				error: a,
				i18n: y,
				numUploads: T,
				complete: E
			});
			case pr: return S(or, {
				i18n: y,
				supportsUploadProgress: m,
				totalProgress: f,
				hideProgressDetails: w,
				isUploadStarted: v,
				isAllComplete: C,
				isAllPaused: r,
				newFiles: e,
				numUploads: T,
				complete: E,
				totalUploadedSize: te,
				totalSize: ee,
				totalETA: D,
				startUpload: b
			});
			default: return null;
		}
	})();
	return !(ie || oe || ae || A || se) && !le || d === hr && h ? null : S("div", {
		className: ce,
		children: [
			S("div", {
				className: j,
				style: { width: `${k}%` },
				role: "progressbar",
				"aria-label": `${k}%`,
				"aria-valuetext": `${k}%`,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": O
			}),
			le,
			S("div", {
				className: "uppy-StatusBar-actions",
				children: [
					ie ? S(Xn, {
						newFiles: e,
						isUploadStarted: v,
						recoveredState: u,
						i18n: y,
						isSomeGhost: g,
						startUpload: b,
						uploadState: d
					}) : null,
					oe ? S(Zn, {
						i18n: y,
						uppy: x
					}) : null,
					ae ? S($n, {
						isAllPaused: r,
						i18n: y,
						isAllComplete: C,
						resumableUploads: i,
						uppy: x
					}) : null,
					A ? S(Qn, {
						i18n: y,
						uppy: x
					}) : null,
					se ? S(er, {
						i18n: y,
						doneButtonHandler: _
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/components/StatusBar/StatusBar.js
var _r = 2e3, vr = 2e3;
function yr(e, t, n, r) {
	if (e) return $.STATE_ERROR;
	if (t) return $.STATE_COMPLETE;
	if (n) return $.STATE_WAITING;
	let i = $.STATE_WAITING, a = Object.keys(r);
	for (let e = 0; e < a.length; e++) {
		let { progress: t } = r[a[e]];
		if (t.uploadStarted && !t.uploadComplete) return $.STATE_UPLOADING;
		t.preprocess && (i = $.STATE_PREPROCESSING), t.postprocess && i !== $.STATE_PREPROCESSING && (i = $.STATE_POSTPROCESSING);
	}
	return i;
}
var br = class extends v {
	#e;
	#t;
	#n;
	#r;
	componentDidMount() {
		this.#e = performance.now(), this.#t = this.props.uppy.getFiles().reduce((e, t) => e + (t.progress.bytesUploaded || 0), 0), this.props.uppy.on("upload", this.#i);
	}
	componentWillUnmount() {
		this.props.uppy.off("upload", this.#i);
	}
	#i = () => {
		let { recoveredState: e } = this.props.uppy.getState();
		if (this.#n = null, this.#r = null, e) {
			this.#t = Object.values(e.files).reduce((e, { progress: t }) => e + (t.bytesUploaded || 0), 0);
			return;
		}
		this.#e = performance.now(), this.#t = 0;
	};
	#a(e) {
		if (e.total == null || e.total === 0) return null;
		let t = e.total - e.uploaded;
		if (t <= 0) return null;
		this.#e ??= performance.now();
		let n = performance.now() - this.#e;
		if (n === 0) return Math.round((this.#r ?? 0) / 100) / 10;
		if (this.#t == null) return this.#t = e.uploaded, null;
		let r = e.uploaded - this.#t;
		if (this.#t = e.uploaded, r <= 0) return Math.round((this.#r ?? 0) / 100) / 10;
		let i = r / n;
		if (!Number.isFinite(i) || i <= 0) return null;
		let a = this.#n == null ? i : A(i, this.#n, _r, n);
		if (!Number.isFinite(a) || a <= 0) return null;
		this.#n = a;
		let o = t / a;
		if (!Number.isFinite(o) || o < 0) return null;
		let s = Math.max((this.#r ?? 0) - n, 0), c = this.#r == null ? o : A(o, s, vr, n);
		return !Number.isFinite(c) || c < 0 ? null : (this.#r = c, this.#e = performance.now(), Math.round(c / 100) / 10);
	}
	startUpload = () => {
		let { recoveredState: e } = this.props.uppy.getState();
		e ? this.props.uppy.emit("restore-confirmed") : this.props.uppy.upload().catch((() => {}));
	};
	render() {
		let { capabilities: e, files: t, allowNewUpload: n, totalProgress: r, error: i, recoveredState: a } = this.props.uppy.getState(), { newFiles: o, startedFiles: s, completeFiles: c, isUploadStarted: l, isAllComplete: u, isAllPaused: d, isUploadInProgress: f, isSomeGhost: p } = this.props.uppy.getObjectOfFilesPerState(), m = a ? Object.values(t) : o, h = !!e.resumableUploads, g = e.uploadProgress !== !1, _ = null, v = 0;
		s.every((e) => e.progress.bytesTotal != null && e.progress.bytesTotal !== 0) ? (_ = 0, s.forEach((e) => {
			_ += e.progress.bytesTotal || 0, v += e.progress.bytesUploaded || 0;
		})) : s.forEach((e) => {
			v += e.progress.bytesUploaded || 0;
		});
		let y = this.#a({
			uploaded: v,
			total: _
		});
		return S(gr, {
			error: i,
			uploadState: yr(i, u, a, t || {}),
			allowNewUpload: n,
			totalProgress: r,
			totalSize: _,
			totalUploadedSize: v,
			isAllComplete: u,
			isAllPaused: d,
			isUploadStarted: l,
			isUploadInProgress: f,
			isSomeGhost: p,
			recoveredState: a,
			complete: c.length,
			newFiles: m.length,
			numUploads: s.length,
			totalETA: y,
			files: t,
			i18n: this.props.i18n,
			uppy: this.props.uppy,
			startUpload: this.startUpload,
			doneButtonHandler: this.props.doneButtonHandler,
			resumableUploads: h,
			supportsUploadProgress: g,
			hideProgressDetails: this.props.hideProgressDetails,
			hideUploadButton: this.props.hideUploadButton,
			hideRetryButton: this.props.hideRetryButton,
			hidePauseResumeButton: this.props.hidePauseResumeButton,
			hideCancelButton: this.props.hideCancelButton,
			hideAfterFinish: this.props.hideAfterFinish
		});
	}
}, xr = 900, Sr = 700, Cr = 576, wr = 330;
function Tr(e) {
	let { activePickerPanel: t, fileCardFor: n } = e, r = e.totalFileCount === 0, i = e.totalFileCount === 1, a = e.containerHeight > wr, o = (0, Y.default)({
		"uppy-Dashboard": !0,
		"uppy-Dashboard--isDisabled": e.disabled,
		"uppy-Dashboard--animateOpenClose": e.animateOpenClose,
		"uppy-Dashboard--isClosing": e.isClosing,
		"uppy-Dashboard--isDraggingOver": e.isDraggingOver,
		"uppy-Dashboard--modal": !e.inline,
		"uppy-size--md": e.containerWidth > Cr,
		"uppy-size--lg": e.containerWidth > Sr,
		"uppy-size--xl": e.containerWidth > xr,
		"uppy-size--height-md": e.containerHeight > wr,
		"uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel,
		"uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible,
		"uppy-Dashboard--singleFile": e.singleFileFullScreen && i && a
	}), s = 1;
	e.containerWidth > xr ? s = 5 : e.containerWidth > Sr ? s = 4 : e.containerWidth > Cr && (s = 3);
	let c = e.showSelectedFiles && !r, l = e.recoveredState ? Object.keys(e.recoveredState.files).length : null, u = e.files ? Object.keys(e.files).filter((t) => e.files[t].isGhost).length : 0, d = () => u > 0 ? e.i18n("recoveredXFiles", { smart_count: u }) : e.i18n("recoveredAllFiles");
	return S("div", {
		className: o,
		"data-uppy-theme": e.theme,
		"data-uppy-num-acquirers": e.acquirers.length,
		"data-uppy-drag-drop-supported": !e.disableLocalFiles && fe(),
		"aria-hidden": e.inline ? "false" : e.isHidden,
		"aria-disabled": e.disabled,
		"aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
		onPaste: e.handlePaste,
		onDragOver: e.handleDragOver,
		onDragLeave: e.handleDragLeave,
		onDrop: e.handleDrop,
		children: [S("div", {
			"aria-hidden": "true",
			className: "uppy-Dashboard-overlay",
			tabIndex: -1,
			onClick: e.handleClickOutside
		}), S("div", {
			className: "uppy-Dashboard-inner",
			role: e.inline ? void 0 : "dialog",
			style: {
				width: e.inline && e.width ? e.width : "",
				height: e.inline && e.height ? e.height : ""
			},
			children: [e.inline ? null : S("button", {
				className: "uppy-u-reset uppy-Dashboard-close",
				type: "button",
				"aria-label": e.i18n("closeModal"),
				title: e.i18n("closeModal"),
				onClick: e.closeModal,
				children: S("span", {
					"aria-hidden": "true",
					children: "×"
				})
			}), S("div", {
				className: "uppy-Dashboard-innerWrap",
				children: [
					S("div", {
						className: "uppy-Dashboard-dropFilesHereHint",
						children: e.i18n("dropHint")
					}),
					c && S(Gn, { ...e }),
					l != null && l > 0 && S("div", {
						className: "uppy-Dashboard-serviceMsg",
						children: [
							S("svg", {
								className: "uppy-Dashboard-serviceMsg-icon",
								"aria-hidden": "true",
								focusable: "false",
								width: "21",
								height: "16",
								viewBox: "0 0 24 19",
								children: S("g", {
									transform: "translate(0 -1)",
									fill: "none",
									fillRule: "evenodd",
									children: [
										S("path", {
											d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
											fill: "#FFD300"
										}),
										S("path", {
											fill: "#000",
											d: "M11 6h2l-.3 8h-1.4z"
										}),
										S("circle", {
											fill: "#000",
											cx: "12",
											cy: "17",
											r: "1"
										})
									]
								})
							}),
							S("strong", {
								className: "uppy-Dashboard-serviceMsg-title",
								children: e.i18n("sessionRestored")
							}),
							S("div", {
								className: "uppy-Dashboard-serviceMsg-text",
								children: d()
							})
						]
					}),
					c ? S(jn, {
						id: e.id,
						i18n: e.i18n,
						uppy: e.uppy,
						files: e.files,
						resumableUploads: e.resumableUploads,
						hideRetryButton: e.hideRetryButton,
						hidePauseResumeButton: e.hidePauseResumeButton,
						hideCancelButton: e.hideCancelButton,
						showLinkToFileUploadResult: e.showLinkToFileUploadResult,
						showRemoveButtonAfterComplete: e.showRemoveButtonAfterComplete,
						metaFields: e.metaFields,
						toggleFileCard: e.toggleFileCard,
						handleRequestThumbnail: e.handleRequestThumbnail,
						handleCancelThumbnail: e.handleCancelThumbnail,
						recoveredState: e.recoveredState,
						individualCancellation: e.individualCancellation,
						openFileEditor: e.openFileEditor,
						canEditFile: e.canEditFile,
						toggleAddFilesPanel: e.toggleAddFilesPanel,
						isSingleFile: i,
						itemsPerRow: s,
						containerWidth: e.containerWidth,
						containerHeight: e.containerHeight
					}) : S(qt, {
						i18n: e.i18n,
						i18nArray: e.i18nArray,
						acquirers: e.acquirers,
						handleInputChange: e.handleInputChange,
						maxNumberOfFiles: e.maxNumberOfFiles,
						allowedFileTypes: e.allowedFileTypes,
						showNativePhotoCameraButton: e.showNativePhotoCameraButton,
						showNativeVideoCameraButton: e.showNativeVideoCameraButton,
						nativeCameraFacingMode: e.nativeCameraFacingMode,
						showPanel: e.showPanel,
						activePickerPanel: e.activePickerPanel,
						disableLocalFiles: e.disableLocalFiles,
						fileManagerSelectionType: e.fileManagerSelectionType,
						note: e.note,
						proudlyDisplayPoweredByUppy: e.proudlyDisplayPoweredByUppy
					}),
					S(qn, { children: e.showAddFilesPanel ? S(Jt, { ...e }, "AddFiles") : null }),
					S(qn, { children: n ? S(sn, {
						...e,
						fileCardFor: n
					}, "FileCard") : null }),
					S(qn, { children: t ? S(Hn, {
						...e,
						activePickerPanel: t
					}, "Picker") : null }),
					S(qn, { children: e.showFileEditor ? S(Yt, { ...e }, "Editor") : null }),
					S("div", {
						className: "uppy-Dashboard-progressindicators",
						children: [
							!e.disableInformer && S(Vn, { uppy: e.uppy }),
							!e.disableStatusBar && S(br, {
								uppy: e.uppy,
								i18n: e.i18n,
								hideProgressDetails: e.hideProgressDetails,
								hideUploadButton: e.hideUploadButton,
								hideRetryButton: e.hideRetryButton,
								hidePauseResumeButton: e.hidePauseResumeButton,
								hideCancelButton: e.hideCancelButton,
								hideAfterFinish: e.hideProgressAfterFinish,
								doneButtonHandler: e.doneButtonHandler
							}),
							!e.disableInformer && S(Vn, { uppy: e.uppy }),
							e.progressindicators.map((t) => e.uppy.getPlugin(t.id).render(e.state))
						]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/locale.js
var Er = { strings: {
	closeModal: "Close Modal",
	addMoreFiles: "Add more files",
	addingMoreFiles: "Adding more files",
	importFrom: "Import from %{name}",
	dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
	dashboardTitle: "Uppy Dashboard",
	copyLinkToClipboardSuccess: "Link copied to clipboard.",
	copyLinkToClipboardFallback: "Copy the URL below",
	copyLink: "Copy link",
	back: "Back",
	removeFile: "Remove file",
	editFile: "Edit file",
	editImage: "Edit image",
	editing: "Editing %{file}",
	error: "Error",
	finishEditingFile: "Finish editing file",
	saveChanges: "Save changes",
	myDevice: "My Device",
	dropHint: "Drop your files here",
	uploadComplete: "Upload complete",
	uploadPaused: "Upload paused",
	resumeUpload: "Resume upload",
	pauseUpload: "Pause upload",
	retryUpload: "Retry upload",
	cancelUpload: "Cancel upload",
	xFilesSelected: {
		0: "%{smart_count} file selected",
		1: "%{smart_count} files selected"
	},
	uploadingXFiles: {
		0: "Uploading %{smart_count} file",
		1: "Uploading %{smart_count} files"
	},
	processingXFiles: {
		0: "Processing %{smart_count} file",
		1: "Processing %{smart_count} files"
	},
	poweredBy: "Powered by %{uppy}",
	addMore: "Add more",
	editFileWithFilename: "Edit file %{file}",
	save: "Save",
	cancel: "Cancel",
	dropPasteFiles: "Drop files here or %{browseFiles}",
	dropPasteFolders: "Drop files here or %{browseFolders}",
	dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
	dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
	dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
	dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
	importFiles: "Import files from:",
	browseFiles: "browse files",
	browseFolders: "browse folders",
	recoveredXFiles: {
		0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
		1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
	},
	recoveredAllFiles: "We restored all files. You can now resume the upload.",
	sessionRestored: "Session restored",
	reSelect: "Re-select",
	missingRequiredMetaFields: {
		0: "Missing required meta field: %{fields}.",
		1: "Missing required meta fields: %{fields}."
	},
	takePictureBtn: "Take Picture",
	recordVideoBtn: "Record Video",
	uploading: "Uploading",
	complete: "Complete",
	uploadFailed: "Upload failed",
	paused: "Paused",
	retry: "Retry",
	pause: "Pause",
	resume: "Resume",
	done: "Done",
	filesUploadedOfTotal: {
		0: "%{complete} of %{smart_count} file uploaded",
		1: "%{complete} of %{smart_count} files uploaded"
	},
	dataUploadedOfTotal: "%{complete} of %{total}",
	dataUploadedOfUnknown: "%{complete} of unknown",
	xTimeLeft: "%{time} left",
	uploadXFiles: {
		0: "Upload %{smart_count} file",
		1: "Upload %{smart_count} files"
	},
	uploadXNewFiles: {
		0: "Upload +%{smart_count} file",
		1: "Upload +%{smart_count} files"
	},
	upload: "Upload",
	xMoreFilesAdded: {
		0: "%{smart_count} more file added",
		1: "%{smart_count} more files added"
	},
	showErrorDetails: "Show error details"
} };
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
function Dr(e, t) {
	if (t) {
		let n = e.querySelector(`[data-uppy-paneltype="${t}"]`);
		if (n) return n;
	}
	return e;
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/createSuperFocus.js
var Or = /* @__PURE__ */ e(n(), 1);
function kr() {
	let e = !1;
	return (0, Or.default)((t, n) => {
		let r = Dr(t, n), i = r.contains(document.activeElement);
		if (i && e) return;
		let a = r.querySelector("[data-uppy-super-focusable]");
		(!i || a) && (a ? (a.focus({ preventScroll: !0 }), e = !0) : (r.querySelector(ae.join(","))?.focus({ preventScroll: !0 }), e = !1));
	}, 260);
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/utils/trapFocus.js
function Ar(e, t) {
	let n = t[0];
	n && (n.focus(), e.preventDefault());
}
function jr(e, t) {
	let n = t[t.length - 1];
	n && (n.focus(), e.preventDefault());
}
function Mr(e) {
	return e.contains(document.activeElement);
}
function Nr(e, t, n) {
	let r = Dr(n, t), i = T(r.querySelectorAll(ae.join(","))), a = i.indexOf(document.activeElement);
	Mr(r) ? e.shiftKey && a === 0 ? jr(e, i) : !e.shiftKey && a === i.length - 1 && Ar(e, i) : Ar(e, i);
}
function Pr(e, t, n) {
	t === null || Nr(e, t, n);
}
//#endregion
//#region node_modules/@uppy/dashboard/lib/Dashboard.js
var Fr = 9, Ir = 27;
function Lr() {
	let e = {};
	return e.promise = new Promise((t, n) => {
		e.resolve = t, e.reject = n;
	}), e;
}
var Rr = {
	target: "body",
	metaFields: [],
	thumbnailWidth: 280,
	thumbnailType: "image/jpeg",
	waitForThumbnailsBeforeUpload: !1,
	defaultPickerIcon: s,
	showLinkToFileUploadResult: !1,
	hideProgressDetails: !1,
	hideUploadButton: !1,
	hideCancelButton: !1,
	hideRetryButton: !1,
	hidePauseResumeButton: !1,
	hideProgressAfterFinish: !1,
	note: null,
	singleFileFullScreen: !0,
	disableStatusBar: !1,
	disableInformer: !1,
	disableThumbnailGenerator: !1,
	fileManagerSelectionType: "files",
	proudlyDisplayPoweredByUppy: !0,
	showSelectedFiles: !0,
	showRemoveButtonAfterComplete: !1,
	showNativePhotoCameraButton: !1,
	showNativeVideoCameraButton: !1,
	theme: "light",
	autoOpen: null,
	disabled: !1,
	disableLocalFiles: !1,
	nativeCameraFacingMode: "",
	onDragLeave: () => {},
	onDragOver: () => {},
	onDrop: () => {},
	plugins: [],
	doneButtonHandler: void 0,
	onRequestCloseModal: null,
	inline: !1,
	animateOpenClose: !0,
	browserBackButtonClose: !1,
	closeAfterFinish: !1,
	closeModalOnClickOutside: !1,
	disablePageScrollWhenModalOpen: !0,
	trigger: null,
	width: 750,
	height: 550
}, zr = class extends w {
	static VERSION = Kt.version;
	#e;
	modalName = `uppy-Dashboard-${Gt()}`;
	superFocus = kr();
	ifFocusedOnUppyRecently = !1;
	dashboardIsDisabled;
	savedActiveElement;
	resizeObserver;
	darkModeMediaQuery;
	makeDashboardInsidesVisibleAnywayTimeout;
	constructor(e, t) {
		let n = t?.autoOpen ?? null;
		super(e, {
			...Rr,
			...t,
			autoOpen: n
		}), this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.defaultLocale = Er, this.opts.doneButtonHandler === void 0 && (this.opts.doneButtonHandler = () => {
			this.uppy.clear(), this.requestCloseModal();
		}), this.opts.onRequestCloseModal ??= () => this.closeModal(), this.i18nInit();
	}
	removeTarget = (e) => {
		let t = this.getPluginState().targets.filter((t) => t.id !== e.id);
		this.setPluginState({ targets: t });
	};
	addTarget = (e) => {
		let t = e.id || e.constructor.name, n = e.title || t, r = e.type;
		if (r !== "acquirer" && r !== "progressindicator" && r !== "editor") return this.uppy.log("Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor", "error"), null;
		let i = {
			id: t,
			name: n,
			type: r
		}, a = this.getPluginState().targets.slice();
		return a.push(i), this.setPluginState({ targets: a }), this.el;
	};
	hideAllPanels = () => {
		let e = this.getPluginState(), t = {
			activePickerPanel: void 0,
			showAddFilesPanel: !1,
			activeOverlayType: null,
			fileCardFor: null,
			showFileEditor: !1
		};
		(e.activePickerPanel !== t.activePickerPanel || e.showAddFilesPanel !== t.showAddFilesPanel || e.showFileEditor !== t.showFileEditor || e.activeOverlayType !== t.activeOverlayType) && (this.setPluginState(t), this.uppy.emit("dashboard:close-panel", e.activePickerPanel?.id));
	};
	showPanel = (e) => {
		let { targets: t } = this.getPluginState(), n = t.find((t) => t.type === "acquirer" && t.id === e);
		this.setPluginState({
			activePickerPanel: n,
			activeOverlayType: "PickerPanel"
		}), this.uppy.emit("dashboard:show-panel", e);
	};
	canEditFile = (e) => {
		let { targets: t } = this.getPluginState();
		return this.#s(t).some((t) => this.uppy.getPlugin(t.id).canEditFile(e));
	};
	openFileEditor = (e) => {
		let { targets: t } = this.getPluginState(), n = this.#s(t);
		this.setPluginState({
			showFileEditor: !0,
			fileCardFor: e.id || null,
			activeOverlayType: "FileEditor"
		}), n.forEach((t) => {
			this.uppy.getPlugin(t.id).selectFile(e);
		});
	};
	closeFileEditor = () => {
		let { metaFields: e } = this.getPluginState();
		e && e.length > 0 ? this.setPluginState({
			showFileEditor: !1,
			activeOverlayType: "FileCard"
		}) : this.setPluginState({
			showFileEditor: !1,
			fileCardFor: null,
			activeOverlayType: "AddFiles"
		});
	};
	saveFileEditor = () => {
		let { targets: e } = this.getPluginState();
		this.#s(e).forEach((e) => {
			this.uppy.getPlugin(e.id).save();
		}), this.closeFileEditor();
	};
	openModal = () => {
		let { promise: e, resolve: t } = Lr();
		if (this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing) {
			let e = () => {
				this.setPluginState({ isHidden: !1 }), this.el.removeEventListener("animationend", e, !1), t();
			};
			this.el.addEventListener("animationend", e, !1);
		} else this.setPluginState({ isHidden: !1 }), t();
		return this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), e;
	};
	closeModal = (e) => {
		let t = e?.manualClose ?? !0, { isHidden: n, isClosing: r } = this.getPluginState();
		if (n || r) return;
		let { promise: i, resolve: a } = Lr();
		if (this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose) {
			this.setPluginState({ isClosing: !0 });
			let e = () => {
				this.setPluginState({
					isHidden: !0,
					isClosing: !1
				}), this.superFocus.cancel(), this.savedActiveElement.focus(), this.el.removeEventListener("animationend", e, !1), a();
			};
			this.el.addEventListener("animationend", e, !1);
		} else this.setPluginState({ isHidden: !0 }), this.superFocus.cancel(), this.savedActiveElement.focus(), a();
		return document.removeEventListener("keydown", this.handleKeyDownInModal), t && this.opts.browserBackButtonClose && history.state?.[this.modalName] && history.back(), this.uppy.emit("dashboard:modal-closed"), i;
	};
	isModalOpen = () => !this.getPluginState().isHidden || !1;
	requestCloseModal = () => this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal();
	setDarkModeCapability = (e) => {
		let { capabilities: t } = this.uppy.getState();
		this.uppy.setState({ capabilities: {
			...t,
			darkMode: e
		} });
	};
	handleSystemDarkModeChange = (e) => {
		let t = e.matches;
		this.uppy.log(`[Dashboard] Dark mode is ${t ? "on" : "off"}`), this.setDarkModeCapability(t);
	};
	toggleFileCard = (e, t) => {
		let n = this.uppy.getFile(t);
		e ? this.uppy.emit("dashboard:file-edit-start", n) : this.uppy.emit("dashboard:file-edit-complete", n), this.setPluginState({
			fileCardFor: e ? t : null,
			activeOverlayType: e ? "FileCard" : null
		});
	};
	toggleAddFilesPanel = (e) => {
		this.setPluginState({
			showAddFilesPanel: e,
			activeOverlayType: e ? "AddFiles" : null
		});
	};
	addFiles = (e) => {
		let t = e.map((e) => ({
			source: this.id,
			name: e.name,
			type: e.type,
			data: e,
			meta: { relativePath: e.relativePath || e.webkitRelativePath || null }
		}));
		try {
			this.uppy.addFiles(t);
		} catch (e) {
			this.uppy.log(e);
		}
	};
	startListeningToResize = () => {
		this.resizeObserver = new ResizeObserver((e) => {
			let { width: t, height: n } = e[0].contentRect;
			this.setPluginState({
				containerWidth: t,
				containerHeight: n,
				areInsidesReadyToBeVisible: !0
			});
		}), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
			let e = this.getPluginState(), t = !this.opts.inline && e.isHidden;
			!e.areInsidesReadyToBeVisible && !t && (this.uppy.log("[Dashboard] resize event didn’t fire on time: defaulted to mobile layout", "warning"), this.setPluginState({ areInsidesReadyToBeVisible: !0 }));
		}, 1e3);
	};
	stopListeningToResize = () => {
		this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
	};
	recordIfFocusedOnUppyRecently = (e) => {
		this.el.contains(e.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel());
	};
	disableInteractiveElements = (e) => {
		let t = this.#e ?? T(this.el.querySelectorAll([
			"a[href]",
			"input:not([disabled])",
			"select:not([disabled])",
			"textarea:not([disabled])",
			"button:not([disabled])",
			"[role=\"button\"]:not([disabled])"
		])).filter((e) => !e.classList.contains("uppy-Dashboard-close"));
		for (let n of t) n.tagName === "A" ? n.setAttribute("aria-disabled", e) : n.disabled = e;
		this.#e = e ? t : null, this.dashboardIsDisabled = e;
	};
	updateBrowserHistory = () => {
		history.state?.[this.modalName] || history.pushState({
			...history.state,
			[this.modalName]: !0
		}, ""), window.addEventListener("popstate", this.handlePopState, !1);
	};
	handlePopState = (e) => {
		this.isModalOpen() && !e.state?.[this.modalName] && this.closeModal({ manualClose: !1 }), !this.isModalOpen() && e.state?.[this.modalName] && history.back();
	};
	handleKeyDownInModal = (e) => {
		e.keyCode === Ir && this.requestCloseModal(), e.keyCode === Fr && Nr(e, this.getPluginState().activeOverlayType, this.el);
	};
	handleClickOutside = () => {
		this.opts.closeModalOnClickOutside && this.requestCloseModal();
	};
	handlePaste = (e) => {
		this.uppy.iteratePlugins((t) => {
			t.type === "acquirer" && t.handleRootPaste?.(e);
		});
		let t = T(e.clipboardData.files);
		t.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(t));
	};
	handleInputChange = (e) => {
		e.preventDefault();
		let t = T(e.currentTarget.files || []);
		t.length > 0 && (this.uppy.log("[Dashboard] Files selected through input"), this.addFiles(t));
	};
	handleDragOver = (e) => {
		e.preventDefault(), e.stopPropagation();
		let t = () => {
			let t = !0;
			return this.uppy.iteratePlugins((n) => {
				n.canHandleRootDrop?.(e) && (t = !0);
			}), t;
		}, n = () => {
			let { types: t } = e.dataTransfer;
			return t.some((e) => e === "Files");
		}, r = t(), i = n();
		if (!r && !i || this.opts.disabled || this.opts.disableLocalFiles && (i || !r) || !this.uppy.getState().allowNewUpload) {
			e.dataTransfer.dropEffect = "none";
			return;
		}
		e.dataTransfer.dropEffect = "copy", this.setPluginState({ isDraggingOver: !0 }), this.opts.onDragOver(e);
	};
	handleDragLeave = (e) => {
		e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.opts.onDragLeave(e);
	};
	handleDrop = async (e) => {
		e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.uppy.iteratePlugins((t) => {
			t.type === "acquirer" && t.handleRootDrop?.(e);
		});
		let t = !1, n = (e) => {
			this.uppy.log(e, "error"), t ||= (this.uppy.info(e.message, "error"), !0);
		};
		this.uppy.log("[Dashboard] Processing dropped files");
		let r = await ue(e.dataTransfer, { logDropError: n });
		r.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(r)), this.opts.onDrop(e);
	};
	handleRequestThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", e);
	};
	handleCancelThumbnail = (e) => {
		this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", e);
	};
	handleKeyDownInInline = (e) => {
		e.keyCode === Fr && Pr(e, this.getPluginState().activeOverlayType, this.el);
	};
	handlePasteOnBody = (e) => {
		this.el.contains(document.activeElement) && this.handlePaste(e);
	};
	handleComplete = ({ failed: e }) => {
		this.opts.closeAfterFinish && !e?.length && this.requestCloseModal();
	};
	#t = () => {
		if (this.opts.disableThumbnailGenerator) return;
		let e = this.uppy.getFiles();
		if (e.length === 1) {
			let t = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
			t?.setOptions({ thumbnailWidth: 600 });
			let n = {
				...e[0],
				preview: void 0
			};
			t?.requestThumbnail(n).then(() => {
				t?.setOptions({ thumbnailWidth: this.opts.thumbnailWidth });
			});
		}
	};
	#n = (e) => {
		let t = e[0], { metaFields: n } = this.getPluginState(), r = n && n.length > 0, i = this.canEditFile(t);
		r && this.opts.autoOpen === "metaEditor" ? this.toggleFileCard(!0, t.id) : i && this.opts.autoOpen === "imageEditor" && this.openFileEditor(t);
	};
	initEvents = () => {
		if (this.opts.trigger && !this.opts.inline) {
			let e = oe(this.opts.trigger);
			e ? e.forEach((e) => {
				e.addEventListener("click", this.openModal);
			}) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
		}
		this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-added", this.#u), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), this.uppy.on("files-added", this.#t), this.uppy.on("file-removed", this.#t), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.on("files-added", this.#n);
	};
	removeEvents = () => {
		let e = oe(this.opts.trigger);
		!this.opts.inline && e && e.forEach((e) => {
			e.removeEventListener("click", this.openModal);
		}), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-added", this.#u), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), this.uppy.off("files-added", this.#t), this.uppy.off("file-removed", this.#t), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.off("files-added", this.#n);
	};
	superFocusOnEachUpdate = () => {
		let e = this.el.contains(document.activeElement), t = document.activeElement === document.body || document.activeElement === null, n = this.uppy.getState().info.length === 0, r = !this.opts.inline;
		n && (r || e || t && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel();
	};
	afterUpdate = () => {
		if (this.opts.disabled && !this.dashboardIsDisabled) {
			this.disableInteractiveElements(!0);
			return;
		}
		!this.opts.disabled && this.dashboardIsDisabled && this.disableInteractiveElements(!1), this.superFocusOnEachUpdate();
	};
	saveFileCard = (e, t) => {
		this.uppy.setFileMeta(t, e), this.toggleFileCard(!1, t);
	};
	#r = (e) => {
		let t = this.uppy.getPlugin(e.id);
		return {
			...e,
			icon: t.icon || this.opts.defaultPickerIcon,
			render: t.render
		};
	};
	#i = (e) => {
		let t = this.uppy.getPlugin(e.id);
		return typeof t.isSupported != "function" || t.isSupported();
	};
	#a = (e) => e.filter((e) => e.type === "acquirer" && this.#i(e)).map(this.#r);
	#o = (e) => e.filter((e) => e.type === "progressindicator").map(this.#r);
	#s = (e) => e.filter((e) => e.type === "editor").map(this.#r);
	render = (e) => {
		let t = this.getPluginState(), { files: n, capabilities: r, allowNewUpload: i } = e, { newFiles: a, uploadStartedFiles: o, completeFiles: s, erroredFiles: c, inProgressFiles: l, inProgressNotPausedFiles: u, processingFiles: d, isUploadStarted: f, isAllComplete: p, isAllPaused: m } = this.uppy.getObjectOfFilesPerState(), h = this.#a(t.targets), g = this.#o(t.targets), _ = this.#s(t.targets), v;
		return v = this.opts.theme === "auto" ? r.darkMode ? "dark" : "light" : this.opts.theme, [
			"files",
			"folders",
			"both"
		].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), Tr({
			state: e,
			isHidden: t.isHidden,
			files: n,
			newFiles: a,
			uploadStartedFiles: o,
			completeFiles: s,
			erroredFiles: c,
			inProgressFiles: l,
			inProgressNotPausedFiles: u,
			processingFiles: d,
			isUploadStarted: f,
			isAllComplete: p,
			isAllPaused: m,
			totalFileCount: Object.keys(n).length,
			totalProgress: e.totalProgress,
			allowNewUpload: i,
			acquirers: h,
			theme: v,
			disabled: this.opts.disabled,
			disableLocalFiles: this.opts.disableLocalFiles,
			direction: this.opts.direction,
			activePickerPanel: t.activePickerPanel,
			showFileEditor: t.showFileEditor,
			saveFileEditor: this.saveFileEditor,
			closeFileEditor: this.closeFileEditor,
			disableInteractiveElements: this.disableInteractiveElements,
			animateOpenClose: this.opts.animateOpenClose,
			isClosing: t.isClosing,
			progressindicators: g,
			editors: _,
			autoProceed: this.uppy.opts.autoProceed,
			id: this.id,
			closeModal: this.requestCloseModal,
			handleClickOutside: this.handleClickOutside,
			handleInputChange: this.handleInputChange,
			handlePaste: this.handlePaste,
			inline: this.opts.inline,
			showPanel: this.showPanel,
			hideAllPanels: this.hideAllPanels,
			i18n: this.i18n,
			i18nArray: this.i18nArray,
			uppy: this.uppy,
			note: this.opts.note,
			recoveredState: e.recoveredState,
			metaFields: t.metaFields,
			resumableUploads: r.resumableUploads || !1,
			individualCancellation: r.individualCancellation,
			isMobileDevice: r.isMobileDevice,
			fileCardFor: t.fileCardFor,
			toggleFileCard: this.toggleFileCard,
			toggleAddFilesPanel: this.toggleAddFilesPanel,
			showAddFilesPanel: t.showAddFilesPanel,
			saveFileCard: this.saveFileCard,
			openFileEditor: this.openFileEditor,
			canEditFile: this.canEditFile,
			width: this.opts.width,
			height: this.opts.height,
			showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
			fileManagerSelectionType: this.opts.fileManagerSelectionType,
			proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
			showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
			containerWidth: t.containerWidth,
			containerHeight: t.containerHeight,
			areInsidesReadyToBeVisible: t.areInsidesReadyToBeVisible,
			parentElement: this.el,
			allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
			maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
			requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
			showSelectedFiles: this.opts.showSelectedFiles,
			showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
			showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
			nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
			singleFileFullScreen: this.opts.singleFileFullScreen,
			handleRequestThumbnail: this.handleRequestThumbnail,
			handleCancelThumbnail: this.handleCancelThumbnail,
			isDraggingOver: t.isDraggingOver,
			handleDragOver: this.handleDragOver,
			handleDragLeave: this.handleDragLeave,
			handleDrop: this.handleDrop,
			disableInformer: this.opts.disableInformer,
			disableStatusBar: this.opts.disableStatusBar,
			hideProgressDetails: this.opts.hideProgressDetails,
			hideUploadButton: this.opts.hideUploadButton,
			hideRetryButton: this.opts.hideRetryButton,
			hidePauseResumeButton: this.opts.hidePauseResumeButton,
			hideCancelButton: this.opts.hideCancelButton,
			hideProgressAfterFinish: this.opts.hideProgressAfterFinish,
			doneButtonHandler: this.opts.doneButtonHandler
		});
	};
	#c = () => {
		let { plugins: e } = this.opts;
		e.forEach((e) => {
			let t = this.uppy.getPlugin(e);
			t ? t.mount(this, t) : this.uppy.log(`[Uppy] Dashboard could not find plugin '${e}', make sure to uppy.use() the plugins you are specifying`, "warning");
		});
	};
	#l = () => {
		this.uppy.iteratePlugins(this.#u);
	};
	#u = (e) => {
		e && !e.opts?.target && ["acquirer", "editor"].includes(e.type) && (this.getPluginState().targets.some((t) => e.id === t.id) || e.mount(this, e));
	};
	#d() {
		let { thumbnailWidth: e, thumbnailHeight: t, thumbnailType: n, waitForThumbnailsBeforeUpload: r } = this.opts;
		return {
			thumbnailWidth: e,
			thumbnailHeight: t,
			thumbnailType: n,
			waitForThumbnailsBeforeUpload: r,
			lazy: !r
		};
	}
	setOptions(e) {
		super.setOptions(e), this.uppy.getPlugin(this.#f())?.setOptions(this.#d());
	}
	#f() {
		return `${this.id}:ThumbnailGenerator`;
	}
	install = () => {
		this.setPluginState({
			isHidden: !0,
			fileCardFor: null,
			activeOverlayType: null,
			showAddFilesPanel: !1,
			activePickerPanel: void 0,
			showFileEditor: !1,
			metaFields: this.opts.metaFields,
			targets: [],
			areInsidesReadyToBeVisible: !1,
			isDraggingOver: !1
		});
		let { inline: e, closeAfterFinish: t } = this.opts;
		if (e && t) throw Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
		let { allowMultipleUploads: n, allowMultipleUploadBatches: r } = this.uppy.opts;
		(n || r) && t && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
		let { target: i } = this.opts;
		i && this.mount(i, this), this.opts.disableThumbnailGenerator || this.uppy.use(Ut, {
			id: this.#f(),
			...this.#d()
		}), this.darkModeMediaQuery = typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
		let a = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : !1;
		this.uppy.log(`[Dashboard] Dark mode is ${a ? "on" : "off"}`), this.setDarkModeCapability(a), this.opts.theme === "auto" && this.darkModeMediaQuery?.addListener(this.handleSystemDarkModeChange), this.#c(), this.#l(), this.initEvents();
	};
	uninstall = () => {
		if (!this.opts.disableThumbnailGenerator) {
			let e = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
			e && this.uppy.removePlugin(e);
		}
		let { plugins: e } = this.opts;
		e.forEach((e) => {
			let t = this.uppy.getPlugin(e);
			t && t.unmount();
		}), this.opts.theme === "auto" && this.darkModeMediaQuery?.removeListener(this.handleSystemDarkModeChange), this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.unmount(), this.removeEvents();
	};
}, Br = 3, Vr = 4, Hr = class extends Error {}, Ur = class extends Error {}, Wr = class extends b {
	transfers = /* @__PURE__ */ new Map();
	constructor(e, t) {
		super(e, t), this.id = "LivewireUpload", this.type = "uploader";
	}
	install() {
		this.uppy.addUploader(this.upload), this.uppy.on("file-removed", this.cancel), this.uppy.on("upload-pause", this.pauseOrResume), this.uppy.on("pause-all", this.pauseAll), this.uppy.on("resume-all", this.resumeAll), this.opts.isChunked && this.uppy.setState({ capabilities: {
			...this.uppy.getState().capabilities,
			resumableUploads: !0
		} });
	}
	uninstall() {
		this.uppy.removeUploader(this.upload), this.uppy.off("file-removed", this.cancel), this.uppy.off("upload-pause", this.pauseOrResume), this.uppy.off("pause-all", this.pauseAll), this.uppy.off("resume-all", this.resumeAll);
	}
	upload = (e) => {
		let t = this.uppy.getFilesByIds(e);
		this.uppy.emit("upload-start", t);
		let n = [...t];
		return Promise.all(Array.from({ length: this.opts.maxParallelUploads }, async () => {
			for (; n.length;) await this.uploadFile(n.shift());
		}));
	};
	async uploadFile(e) {
		try {
			let t = await this.plan(e);
			if (!this.uppy.getFile(e.id)) return;
			if (t.strategy === "reject") throw Error(t.message);
			if (e.isRemote && this.showAsPlanned(e, t), this.isTransfer(t) ? await this.transfer(e, t) : await this.uploadThroughLivewire(e), !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-success", this.uppy.getFile(e.id), {
				status: 200,
				body: {}
			});
		} catch (t) {
			if (t instanceof Ur || !this.uppy.getFile(e.id)) return;
			this.uppy.emit("upload-error", this.uppy.getFile(e.id), t);
		}
	}
	plan(e) {
		return e.isRemote ? this.opts.planRemoteUsing(e.source, e.remote.body) : this.opts.planUsing({
			name: e.name,
			size: e.size,
			type: e.type ?? "",
			lastModified: e.data.lastModified ?? 0
		});
	}
	showAsPlanned(e, t) {
		let n = t.name ?? e.name, r = t.type ?? e.type;
		this.uppy.setFileState(e.id, {
			name: n,
			type: r,
			size: t.size ?? e.size,
			extension: n.includes(".") ? n.split(".").pop() : "",
			meta: {
				...this.uppy.getFile(e.id).meta,
				name: n,
				type: r
			}
		});
	}
	isTransfer(e) {
		return [
			"chunked",
			"s3",
			"remote"
		].includes(e.strategy);
	}
	uploadThroughLivewire(e) {
		return new Promise((t, n) => {
			this.opts.uploadUsing(e.meta.fileKey, e.data instanceof File && e.data.name === e.name ? e.data : new File([e.data], e.name, { type: e.type }), t, () => n(this.failure()), (t) => this.reportProgress(e, e.size * t / 100, e.size));
		});
	}
	async transfer(e, t) {
		let n = {
			isPaused: !1,
			isCancelled: !1,
			requests: /* @__PURE__ */ new Set(),
			resume: null,
			abort: null
		};
		this.transfers.set(e.id, n);
		try {
			let r = t.completed;
			for (; !r;) {
				let { capability: i } = t;
				n.abort = t.strategy === "s3" ? () => Promise.resolve().then(() => this.opts.abortUsing(i)).catch(() => {}) : null;
				try {
					r = await this.send(e, t, n);
				} catch (i) {
					if (!(i instanceof Hr) && i.status !== 401) throw i;
					for (; n.isPaused && !n.isCancelled;) await new Promise((e) => n.resume = e);
					if (n.isCancelled) throw new Ur();
					if (t = await this.plan(e), !this.isTransfer(t)) throw this.failure(t.message);
					r = t.completed;
				}
			}
			if (!await this.opts.adoptUsing(e.meta.fileKey, r)) throw this.failure();
		} finally {
			this.transfers.delete(e.id);
		}
	}
	send(e, t, n) {
		return {
			chunked: () => this.sendChunks(e, t, n),
			s3: () => this.sendParts(e, t, n),
			remote: () => this.fetchWhole(e, t, n)
		}[t.strategy]();
	}
	async sendPieces(e, { missing: t, sizeOf: n, arrived: r, send: i, total: a }) {
		let o = /* @__PURE__ */ new Map(), s = [...t], c = () => this.reportProgress(e, [...r].reduce((e, t) => e + n(t), 0) + [...o.values()].reduce((e, t) => e + t, 0), a);
		c(), await Promise.all(Array.from({ length: Br }, async () => {
			for (; s.length;) {
				let e = s.shift(), t = await i(e, s, (t) => {
					o.set(e, t), c();
				});
				o.delete(e), r.add(e), c(), t && (s.length = 0);
			}
		}));
	}
	async sendChunks(e, t, n) {
		let r = t.size ?? e.size, i = new Set(t.receivedChunks), a = (e) => [e * t.chunkSize, Math.min(r, (e + 1) * t.chunkSize)], o = (r, i) => this.attempt(n, () => this.post(n, t, t.sealed ? { index: r } : {
			index: r,
			name: e.name,
			type: e.type ?? "",
			chunk: [e.data.slice(...a(r)), e.name]
		}, i)), s = null, c = t.totalChunks - 1;
		await this.sendPieces(e, {
			missing: this.range(0, t.totalChunks - 1).filter((e) => !i.has(e)),
			sizeOf: (e) => a(e)[1] - a(e)[0],
			arrived: i,
			total: r,
			send: async (e, t, n) => {
				c = e;
				let r = await o(e, n);
				return s = r?.complete ? r.reference : s, !!s;
			}
		});
		for (let e = 0; !s && e < Vr; e++) {
			await this.wait(1e3 * (e + 1));
			let t = await o(c, () => {});
			s = t?.complete ? t.reference : null;
		}
		if (!s) throw this.failure();
		return s;
	}
	async sendParts(e, t, n) {
		let r = t.size ?? e.size, i = new Set(t.uploadedParts), a = /* @__PURE__ */ new Map(), o = (e) => [(e - 1) * t.partSize, Math.min(r, e * t.partSize)], s = null, c = async (e, n) => {
			if (await s, a.has(e) || (s = this.opts.signPartsUsing(t.capability, [e, ...n.slice(0, 9)]).then((e) => Object.entries(e ?? {}).forEach(([e, t]) => a.set(Number(e), t))).finally(() => s = null), await s), !a.has(e)) throw this.failure();
			let r = a.get(e);
			return a.delete(e), r;
		};
		await this.sendPieces(e, {
			missing: this.range(1, t.totalParts).filter((e) => !i.has(e)),
			sizeOf: (e) => o(e)[1] - o(e)[0],
			arrived: i,
			total: r,
			send: async (r, i, a) => (await this.attempt(n, async () => t.sealed ? this.post(n, t, { part: r }, a) : this.request(n, {
				method: "PUT",
				url: await c(r, i),
				body: e.data.slice(...o(r)),
				onProgress: a
			}), { retryForbidden: !t.sealed }), !1)
		});
		let l = await this.opts.completeUsing(t.capability);
		if (!l) throw this.failure();
		return l;
	}
	async fetchWhole(e, t, n) {
		let r = await this.attempt(n, () => this.post(n, t, {}, () => {}));
		if (!r?.reference) throw this.failure();
		return this.uppy.getFile(e.id) && r.size && this.uppy.setFileState(e.id, { size: r.size }), r.reference;
	}
	post(e, t, n, r) {
		let i = new FormData();
		return Object.entries({
			capability: t.capability,
			sealed: t.sealed,
			...n
		}).filter(([, e]) => e != null).forEach(([e, t]) => Array.isArray(t) ? i.append(e, ...t) : i.append(e, t)), this.request(e, {
			method: "POST",
			url: t.url,
			headers: {
				Accept: "application/json",
				"X-CSRF-TOKEN": this.opts.csrfToken
			},
			body: i,
			onProgress: r
		});
	}
	async attempt(e, t, { retryForbidden: n = !1 } = {}) {
		for (let r = 1;; r++) {
			if (e.isCancelled) throw new Ur();
			if (e.isPaused) throw new Hr();
			try {
				return await t();
			} catch (e) {
				if (e instanceof Hr || e instanceof Ur || !(!e.status || n && e.status === 403 || e.status === 429 || e.status >= 500) || r === Vr) throw e;
				await this.wait(e.retryAfter ?? 1e3 * 2 ** (r - 1));
			}
		}
	}
	request(e, { method: t, url: n, headers: r = {}, body: i, onProgress: a }) {
		return new Promise((o, s) => {
			let c = new XMLHttpRequest();
			e.requests.add(c);
			let l = (t) => {
				e.requests.delete(c), s(t);
			};
			c.open(t, n), Object.entries(r).forEach(([e, t]) => c.setRequestHeader(e, t)), c.upload.addEventListener("progress", (e) => a(e.loaded)), c.addEventListener("load", () => {
				if (c.status >= 200 && c.status < 300) return e.requests.delete(c), o(this.json(c));
				let t = this.failure(this.json(c)?.message);
				t.status = c.status;
				let n = Number(c.getResponseHeader("Retry-After"));
				n && (t.retryAfter = n * 1e3), l(t);
			}), c.addEventListener("error", () => l(this.failure())), c.addEventListener("abort", () => l(e.isCancelled ? new Ur() : new Hr())), c.send(i);
		});
	}
	json(e) {
		try {
			return JSON.parse(e.responseText);
		} catch {
			return null;
		}
	}
	failure(e) {
		return Error(e || this.opts.uploadFailedMessage);
	}
	range(e, t) {
		return Array.from({ length: t - e + 1 }, (t, n) => e + n);
	}
	reportProgress(e, t, n) {
		let r = this.uppy.getFile(e.id);
		r && n && this.uppy.emit("upload-progress", r, {
			uploadStarted: r.progress.uploadStarted ?? Date.now(),
			bytesUploaded: Math.min(t, n),
			bytesTotal: n
		});
	}
	wait(e) {
		return new Promise((t) => setTimeout(t, e));
	}
	setPaused(e, t) {
		let n = this.transfers.get(e);
		n && n.isPaused !== t && (n.isPaused = t, t ? n.requests.forEach((e) => e.abort()) : n.resume?.());
	}
	pauseOrResume = (e, t) => {
		this.setPaused(e?.id ?? e, t);
	};
	pauseAll = () => {
		this.transfers.forEach((e, t) => this.setPaused(t, !0));
	};
	resumeAll = () => {
		this.transfers.forEach((e, t) => this.setPaused(t, !1));
	};
	cancel = (e) => {
		let t = this.transfers.get(e.id);
		if (t) {
			t.isCancelled = !0, t.requests.forEach((e) => e.abort()), t.resume?.(), t.abort?.();
			return;
		}
		e.progress.uploadStarted && !e.progress.uploadComplete && this.opts.cancelUploadUsing(e.meta.fileKey);
	};
}, Gr = (e, t) => Math.abs(e - t) < .01;
async function Kr(e, { aspectRatios: t, fixedAspectRatio: n }) {
	let { default: r } = await import("../fluppy-lib-BrUqQ-2x.js"), i = (e) => !n && (!t.length || t.some((t) => Gr(t, e)));
	e.use(r, {
		actions: {
			cropSquare: i(1),
			cropWidescreen: i(16 / 9),
			cropWidescreenVertical: i(9 / 16)
		},
		cropperOptions: n ? { aspectRatio: n } : {}
	});
}
function qr(e, t) {
	return !!(t.progress.uploadComplete && e.getPlugin("ImageEditor")?.canEditFile(t));
}
//#endregion
//#region resources/js/item-actions.js
var Jr = {
	download: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z\"/><path d=\"M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z\"/></svg>",
	edit: "<svg aria-hidden=\"true\" focusable=\"false\" class=\"uppy-c-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path d=\"m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z\"/></svg>"
};
function Yr(e, t, n) {
	let r = () => {
		t.querySelectorAll(".uppy-Dashboard-Item").forEach((t) => {
			let r = e.getFile(t.id.replace(/^uppy_/, "")), a = t.querySelector(".uppy-Dashboard-Item-actionWrapper");
			if (!r || !a) return;
			let o = n(r), s = o.map(({ name: e, href: t }) => `${e}:${t ?? ""}`).join("|"), c = [...a.querySelectorAll("[data-fluppy-action]")];
			(a.dataset.fluppyActions !== s || c.length !== o.length) && (c.forEach((e) => e.remove()), a.dataset.fluppyActions = s, a.prepend(...o.map((e) => i(e, r))));
		});
	}, i = ({ name: e, label: t, href: n, onClick: r }, i) => {
		let a = document.createElement(n ? "a" : "button");
		return a.className = "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit", a.dataset.fluppyAction = e, a.title = t, a.setAttribute("aria-label", t), a.innerHTML = Jr[e], n ? (a.href = n, a.download = i.name, a.target = "_blank", a.rel = "noopener noreferrer") : (a.type = "button", a.addEventListener("click", () => r(i.id))), a;
	}, a = !1, o = () => {
		a || (a = !0, setTimeout(() => {
			a = !1, r();
		}));
	}, s = new MutationObserver(o);
	return s.observe(t, {
		childList: !0,
		subtree: !0
	}), e.on("state-update", o), () => s.disconnect();
}
//#endregion
//#region resources/js/locale.js
var Xr = Object.fromEntries(Object.entries(/* #__PURE__ */ Object.assign({
	"../../node_modules/@uppy/locales/lib/ar_SA.js": () => import("../fluppy-ar_SA-CQZhzxTe.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/az_AZ.js": () => import("../fluppy-az_AZ-DB1xAzP0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/bg_BG.js": () => import("../fluppy-bg_BG-ClXXsxcL.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ca_ES.js": () => import("../fluppy-ca_ES-ZPSb7vJZ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/cs_CZ.js": () => import("../fluppy-cs_CZ-Dsg97WQz.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/da_DK.js": () => import("../fluppy-da_DK-OaLjfu4E.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/de_DE.js": () => import("../fluppy-de_DE-H_i9ctOT.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/el_GR.js": () => import("../fluppy-el_GR-6ne9Osl3.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_ES.js": () => import("../fluppy-es_ES-BCbT0y0-.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/es_MX.js": () => import("../fluppy-es_MX-BSIBOj7u.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fa_IR.js": () => import("../fluppy-fa_IR-DAvzeluH.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fi_FI.js": () => import("../fluppy-fi_FI-0J0wsJwt.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/fr_FR.js": () => import("../fluppy-fr_FR-ONUiN_EA.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/gl_ES.js": () => import("../fluppy-gl_ES-BGQclE6M.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/he_IL.js": () => import("../fluppy-he_IL-DLrc5R85.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hi_IN.js": () => import("../fluppy-hi_IN-C4jaKbK6.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hr_HR.js": () => import("../fluppy-hr_HR-CMT5zhTQ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/hu_HU.js": () => import("../fluppy-hu_HU-sDS4h4T0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/id_ID.js": () => import("../fluppy-id_ID-By4kfpsR.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/is_IS.js": () => import("../fluppy-is_IS-Zi5-Epc_.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/it_IT.js": () => import("../fluppy-it_IT-BkxaTd6-.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ja_JP.js": () => import("../fluppy-ja_JP-DihuvdDM.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ko_KR.js": () => import("../fluppy-ko_KR-DLVOMz2B.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/mn_MN.js": () => import("../fluppy-mn_MN-DwbFk0s0.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ms_MY.js": () => import("../fluppy-ms_MY-D-2AIZDL.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nb_NO.js": () => import("../fluppy-nb_NO-Da_zpiNU.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nl_NL.js": () => import("../fluppy-nl_NL-DPVrpXDH.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/nn_NO.js": () => import("../fluppy-nn_NO-BQ5qQCQ3.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pl_PL.js": () => import("../fluppy-pl_PL-BVOi6Vjd.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_BR.js": () => import("../fluppy-pt_BR-DbkW6VJf.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/pt_PT.js": () => import("../fluppy-pt_PT-DuJd6bQp.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ro_RO.js": () => import("../fluppy-ro_RO-BcV4_VVm.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/ru_RU.js": () => import("../fluppy-ru_RU-XByOQ53A.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sk_SK.js": () => import("../fluppy-sk_SK-C_AuHbUQ.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Cyrillic.js": () => import("../fluppy-sr_RS_Cyrillic-BNlMwayO.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sr_RS_Latin.js": () => import("../fluppy-sr_RS_Latin-C5bMypPr.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/sv_SE.js": () => import("../fluppy-sv_SE-CL6PD6-v.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/th_TH.js": () => import("../fluppy-th_TH-5x4-DvEu.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/tr_TR.js": () => import("../fluppy-tr_TR-DIexgnUB.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uk_UA.js": () => import("../fluppy-uk_UA-pKYMXHm1.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/uz_UZ.js": () => import("../fluppy-uz_UZ-DNdWw7Bl.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/vi_VN.js": () => import("../fluppy-vi_VN-CRXFH0mz.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_CN.js": () => import("../fluppy-zh_CN-GAVY8KdU.js").then((e) => e.default),
	"../../node_modules/@uppy/locales/lib/zh_TW.js": () => import("../fluppy-zh_TW-DUEsd-Z_.js").then((e) => e.default)
})).map(([e, t]) => [e.split("/").pop().slice(0, -3), t]));
function Zr(e) {
	let [t, ...n] = String(e ?? "").toLowerCase().replace(/-/g, "_").split("_"), r = Object.keys(Xr).filter((e) => e.toLowerCase().startsWith(`${t}_`));
	return r.find((e) => n.some((t) => e.toLowerCase().includes(`_${t.slice(0, 3)}`))) ?? r[0] ?? null;
}
async function Qr(e) {
	let t = Zr(e);
	return t ? await Xr[t]() : null;
}
//#endregion
//#region resources/js/sources.js
var $r = {
	camera: () => import("../fluppy-lib-BvYWrjlf.js"),
	microphone: () => import("../fluppy-lib-TQ9qpZbC.js"),
	screenCapture: () => import("../fluppy-lib-DuQ2dm8L.js")
}, ei = (e, t) => !!e?.length && e.every((e) => e.startsWith(`${t}/`)), ti = {
	box: () => import("../fluppy-lib-D5D4e5pC.js"),
	dropbox: () => import("../fluppy-lib-DAMwpQ2y.js"),
	facebook: () => import("../fluppy-lib-DNBklbSb.js"),
	onedrive: () => import("../fluppy-lib-CF8wSfHt.js"),
	zoom: () => import("../fluppy-lib-Bx2bOway.js")
}, ni = {
	url: async (e, { label: t }, { describe: n, failedMessage: r }) => {
		let { default: i } = await import("../fluppy-lib-BfewsBLD.js");
		e.use(i, {
			id: "url",
			companionUrl: window.location.origin,
			locale: { strings: { pluginNameUrl: t } }
		}), e.getPlugin("url").addFile = async (t) => {
			if (t.startsWith("blob")) return;
			let i = /^[a-z0-9]+:\/\//i.test(t) ? t : `https://${t}`, a = await n("url", { url: i }).catch(() => null);
			if (!a || a.error) {
				e.info(a?.error ?? r, "error", 5e3);
				return;
			}
			try {
				return e.addFile({
					source: "url",
					name: a.name,
					type: a.type,
					data: { size: a.size },
					isRemote: !0,
					remote: { body: { url: i } }
				});
			} catch {}
		};
	},
	"google-drive": async (e, { label: t, clientId: n, apiKey: r, appId: i, exports: a }) => {
		let { default: o } = await import("../fluppy-lib-Dt5eVrDy.js");
		ri(e, o, "google-drive", {
			clientId: n,
			apiKey: r,
			appId: i,
			locale: { strings: { pluginNameGoogleDrivePicker: t } }
		}), e.setOptions({ onBeforeFileAdded: (t) => {
			if (!(t.remote?.requestClientId === o.requestClientId && t.type?.startsWith("application/vnd.google-apps.") && t.type !== "application/vnd.google-apps.shortcut") || e.checkIfFileAlreadyExists(t.id)) return;
			let [n, r] = a[t.type] ?? a["*"], i = t.name.toLowerCase().endsWith(`.${r}`) ? t.name : `${t.name}.${r}`;
			return {
				...t,
				name: i,
				type: n,
				extension: r,
				meta: {
					...t.meta,
					name: i,
					type: n
				}
			};
		} });
	},
	"google-photos": async (e, { label: t, clientId: n }) => {
		let { default: r } = await import("../fluppy-lib-BSP0y7N7.js");
		ri(e, r, "google-photos", {
			clientId: n,
			locale: { strings: { pluginNameGooglePhotosPicker: t } }
		}, (e) => ({
			name: e.name,
			type: e.type
		}));
	}
};
function ri(e, t, n, r, i = () => ({})) {
	e.use(t, {
		companionUrl: window.location.origin,
		storage: {
			getItem: async (e) => sessionStorage.getItem(e),
			setItem: async (e, t) => sessionStorage.setItem(e, t),
			removeItem: async (e) => sessionStorage.removeItem(e)
		},
		...r
	}), e.on("file-added", (r) => {
		r.remote?.requestClientId === t.requestClientId && e.setFileState(r.id, {
			source: n,
			remote: {
				...r.remote,
				body: {
					...r.remote.body,
					...i(r)
				}
			}
		});
	});
}
async function ii(e, t, n) {
	for (let [r, i] of Object.entries(t ?? {})) {
		if (r in ti) {
			let [{ default: t }, { useBrowsableSource: a }] = await Promise.all([ti[r](), import("../fluppy-browsable-source-DdhkK874.js")]);
			a(e, t, r, i, n);
			continue;
		}
		await ni[r]?.(e, i, n);
	}
}
async function ai(e, t, { acceptedFileTypes: n }) {
	for (let r of t.filter((e) => e in $r)) {
		let { default: t } = await $r[r]();
		e.use(t, r === "camera" && ei(n, "image") ? { modes: ["picture"] } : r === "camera" && ei(n, "video") ? { modes: ["video-audio"] } : {});
	}
}
//#endregion
//#region resources/js/index.js
function oi() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e) => (e ^ crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(1))[0] & 15 >> e / 4).toString(16));
}
function si({ abortMultipartUploadUsing: e, acceptedFileTypes: t, adoptUploadUsing: n, cancelUploadUsing: r, completeMultipartUploadUsing: a, csrfToken: o, deleteUploadedFileUsing: s, describeRemoteFileUsing: c, disconnectRemoteSourceUsing: l, downloadLabel: u, editLabel: d, getUploadedFilesUsing: f, height: p, imageEditor: m, isChunked: h, isDeletable: g, isDisabled: _, isDownloadable: v, isModal: y, isMultiple: b, isOpenable: x, isPreviewable: S, isReorderable: C, listRemoteFilesUsing: w, locale: T, maxFiles: E, maxParallelUploads: ee, maxSize: D, minSize: te, placeUploadedFileUsing: ne, planRemoteUploadUsing: re, planUploadUsing: O, remoteSources: k, removeUploadedFileUsing: ie, reorderUploadedFilesUsing: A, signUploadPartsUsing: ae, sources: oe, state: se, uploadFailedMessage: j, uploadingMessage: ce, uploadUsing: le }) {
	let M = null, ue = null, de = null, N = null, fe = /* @__PURE__ */ new Map(), pe = null;
	return {
		state: se,
		isRemovingSilently: !1,
		files: [],
		async init() {
			let i = await Qr(T);
			M = new Pe({
				autoProceed: !0,
				...i ? { locale: i } : {},
				restrictions: {
					allowedFileTypes: t?.length ? t : null,
					maxFileSize: D,
					maxNumberOfFiles: b ? E : 1,
					minFileSize: te
				}
			}).use(zr, {
				target: this.getContainer(),
				...y ? {
					inline: !1,
					closeModalOnClickOutside: !0
				} : {
					inline: !0,
					width: "100%",
					height: p ?? 320
				},
				disabled: _,
				hideUploadButton: !0,
				hideCancelButton: !0,
				doneButtonHandler: null,
				showRemoveButtonAfterComplete: g && !_,
				showLinkToFileUploadResult: x,
				disableThumbnailGenerator: !S,
				proudlyDisplayPoweredByUppy: !1,
				theme: this.getTheme()
			}).use(Wr, {
				abortUsing: e,
				adoptUsing: n,
				cancelUploadUsing: r,
				completeUsing: a,
				signPartsUsing: ae,
				csrfToken: o,
				isChunked: h,
				planRemoteUsing: re,
				planUsing: O,
				maxParallelUploads: ee ?? 2,
				uploadFailedMessage: j,
				uploadUsing: le
			}), _ || (await ai(M, oe ?? [], { acceptedFileTypes: t }), await ii(M, k, {
				describe: c,
				disconnect: l,
				failedMessage: j,
				list: w
			})), M.on("file-added", (e) => {
				M.setFileMeta(e.id, { fileKey: oi() });
			}), M.on("file-removed", (e) => {
				M.getFiles().some((e) => e.error) || M.setState({ error: null }), !this.isRemovingSilently && e.meta.fileKey && (this.isStoredFile(e.meta.fileKey) ? s(e.meta.fileKey) : ie(e.meta.fileKey));
			}), M.on("upload", () => {
				this.dispatchFormEvent("form-processing-started", { message: ce });
			}), M.on("complete", () => {
				this.dispatchFormEvent("form-processing-finished"), C && !_ && this.saveFileOrder();
			}), C && !_ && this.enableReordering(), m && !_ && (await Kr(M, m), M.on("file-editor:complete", (e) => this.replaceFile(e)), M.on("upload-success", (e) => {
				fe.has(e.id) && (ne(e.meta.fileKey, fe.get(e.id)), fe.delete(e.id));
			})), de = Yr(M, this.getContainer(), (e) => [...qr(M, e) && !_ ? [{
				name: "edit",
				label: d,
				onClick: (e) => this.editFile(e)
			}] : [], ...e.meta.downloadUrl ? [{
				name: "download",
				label: u,
				href: e.meta.downloadUrl
			}] : []]), y && M.on("state-update", () => this.summarize()), pe = () => M.getPlugin("Dashboard").setOptions({ theme: this.getTheme() }), window.addEventListener("theme-changed", pe), await this.syncFiles(), this.$watch("state", () => this.syncFiles());
		},
		destroy() {
			window.removeEventListener("theme-changed", pe), ue?.disconnect(), de?.(), this.isRemovingSilently = !0, M?.destroy(), N?.remove();
		},
		getUppy() {
			return M;
		},
		getContainer() {
			return y ? (N || (N = document.createElement("div"), N.className = "fi-fluppy fi-fluppy-modal", C && !_ && N.classList.add("fi-fluppy-reorderable"), document.body.append(N)), N) : this.$refs.dashboard;
		},
		openModal() {
			M.getPlugin("Dashboard").openModal();
		},
		removeFile(e) {
			M.removeFile(e);
		},
		summarize() {
			this.files = M.getFiles().map((e) => ({
				id: e.id,
				name: e.name,
				size: i(e.size ?? 0),
				percentage: Math.round(e.progress.percentage ?? 0),
				isComplete: !!e.progress.uploadComplete,
				error: e.error ?? null
			}));
		},
		async editFile(e) {
			let t = M.getFile(e);
			if (t.source === "Fluppy" && t.data.size === 0) try {
				let n = await fetch(t.meta.url);
				if (!n.ok) throw Error(n.statusText);
				M.setFileState(e, { data: await n.blob() });
			} catch {
				M.info(j, "error");
				return;
			}
			M.getPlugin("Dashboard").openFileEditor(M.getFile(e));
		},
		replaceFile(e) {
			let t = Object.keys(M.getState().files).indexOf(e.id);
			M.removeFile(e.id);
			let n = e.type.split("/")[1].replace("jpeg", "jpg"), r = M.addFile({
				name: /\.\w+$/.test(e.name) ? e.name : `${e.name}.${n}`,
				type: e.type,
				data: e.data,
				source: "ImageEditor"
			}), { files: i } = M.getState(), a = Object.keys(i).filter((e) => e !== r);
			a.splice(t, 0, r), M.setState({ files: Object.fromEntries(a.map((e) => [e, i[e]])) });
			let o = a[t + 1];
			o && fe.set(r, i[o].meta.fileKey);
		},
		getTheme() {
			return this.$store.theme === "dark" ? "dark" : "light";
		},
		getFileKeysInState() {
			return Object.keys(this.state ?? {});
		},
		isStoredFile(e) {
			let t = this.state?.[e];
			return typeof t == "string" && !t.startsWith("livewire-file:");
		},
		async syncFiles() {
			let e = this.getFileKeysInState(), t = M.getFiles();
			this.isRemovingSilently = !0, t.filter((t) => t.progress.uploadComplete && !e.includes(t.meta.fileKey)).forEach((e) => M.removeFile(e.id)), this.isRemovingSilently = !1;
			let n = M.getFiles().map((e) => e.meta.fileKey);
			if (e.every((e) => n.includes(e))) return;
			let r = await f() ?? {};
			Object.entries(r).filter(([e, t]) => t && !n.includes(e)).forEach(([e, t]) => this.showStoredFile(e, t)), M.getFiles().every((e) => e.progress.uploadComplete) && M.setState({ totalProgress: 100 });
		},
		showStoredFile(e, { name: t, size: n, type: r, url: i, openableUrl: a, downloadableUrl: o }) {
			let s = `fluppy-${e}`;
			M.setState({ files: {
				...M.getState().files,
				[s]: {
					id: s,
					name: t,
					extension: t.includes(".") ? t.split(".").pop() : "",
					type: r,
					size: n,
					data: new Blob([], { type: r ?? "" }),
					meta: {
						name: t,
						type: r,
						fileKey: e,
						url: i,
						downloadUrl: v ? o ?? i : null
					},
					source: "Fluppy",
					isRemote: !1,
					isGhost: !1,
					preview: S && r?.startsWith("image/") ? i : void 0,
					uploadURL: a ?? i,
					progress: {
						percentage: 100,
						bytesUploaded: n,
						bytesTotal: n,
						uploadComplete: !0,
						uploadStarted: Date.now()
					}
				}
			} });
		},
		enableReordering() {
			let e = this.getContainer(), t = (e) => e.target.closest?.(".uppy-Dashboard-Item"), n = (e) => e.id.replace(/^uppy_/, ""), r = null, i = null, a = (e) => {
				i?.removeAttribute("data-fluppy-drop-target"), i = e, i?.setAttribute("data-fluppy-drop-target", "");
			};
			ue = new MutationObserver(() => {
				e.querySelectorAll(".uppy-Dashboard-Item:not([draggable])").forEach((e) => e.draggable = !0);
			}), ue.observe(e, {
				childList: !0,
				subtree: !0
			}), e.addEventListener("dragstart", (e) => {
				let i = t(e);
				i && (r = n(i), e.dataTransfer.effectAllowed = "move");
			}), e.addEventListener("dragover", (e) => {
				if (!r) return;
				e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "move";
				let i = t(e);
				a(i && n(i) !== r ? i : null);
			}, !0), e.addEventListener("drop", (e) => {
				if (!r) return;
				e.preventDefault(), e.stopPropagation();
				let i = t(e);
				i && this.moveFile(r, n(i));
			}, !0), e.addEventListener("dragend", () => {
				r = null, a(null);
			});
		},
		moveFile(e, t) {
			let { files: n } = M.getState(), r = Object.keys(n), i = r.indexOf(e), a = r.indexOf(t);
			i !== -1 && a !== -1 && i !== a && (r.splice(a, 0, r.splice(i, 1)[0]), M.setState({ files: Object.fromEntries(r.map((e) => [e, n[e]])) }), this.saveFileOrder());
		},
		saveFileOrder() {
			let e = M.getFiles().map((e) => e.meta.fileKey);
			e.join() !== this.getFileKeysInState().filter((t) => e.includes(t)).join() && A(e);
		},
		dispatchFormEvent(e, t = {}) {
			this.$el.closest("form")?.dispatchEvent(new CustomEvent(e, {
				composed: !0,
				cancelable: !0,
				detail: t
			}));
		}
	};
}
//#endregion
export { si as default };
