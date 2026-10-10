import { t as e } from "./fluppy-rolldown-runtime-B0aSnxlc.js";
import { r as t, t as n } from "./fluppy-UIPlugin-Dz_uZBpD.js";
import { t as r } from "./fluppy-mimeTypes-CcSLKirE.js";
import { t as i } from "./fluppy-getErrorMessage-DxiQuxng.js";
import { t as a } from "./fluppy-getFileTypeExtension-ZfAAaqva.js";
import { t as o } from "./fluppy-isRestrictionError-Dq8RAQXC.js";
import { t as s } from "./fluppy-preact.module-CfEGNJFi.js";
//#region node_modules/@uppy/core/lib/utils/canvasToBlob.js
function c(e, t, n) {
	return new Promise((r) => {
		e.toBlob(r, t, n);
	});
}
//#endregion
//#region node_modules/@uppy/webcam/package.json
var l = (/* @__PURE__ */ e(((e, t) => {
	t.exports = a, t.exports.isMobile = a, t.exports.default = a;
	var n = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|redmi|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, r = /CrOS/, i = /android|ipad|playbook|silk/i;
	function a(e) {
		e ||= {};
		let t = e.ua;
		if (!t && typeof navigator < "u" && (t = navigator.userAgent), t && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string") return !1;
		let a = n.test(t) && !r.test(t) || !!e.tablet && i.test(t);
		return !a && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.indexOf("Macintosh") !== -1 && t.indexOf("Safari") !== -1 && (a = !0), a;
	}
})))(), u = {
	name: "@uppy/webcam",
	description: "Uppy plugin that takes photos or records videos using the device's camera.",
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
		"webcam",
		"picture",
		"photo",
		"video",
		"record",
		"mediarecorder"
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
		"is-mobile": "^5.0.0",
		preact: "^10.29.2"
	},
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
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
};
//#endregion
//#region node_modules/@uppy/webcam/lib/CameraIcon.js
function d() {
	return t("svg", {
		"aria-hidden": "true",
		focusable: "false",
		fill: "#0097DC",
		width: "66",
		height: "55",
		viewBox: "0 0 66 55",
		children: t("path", {
			d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
			fillRule: "evenodd"
		})
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/DiscardButton.js
function f({ onDiscard: e, i18n: n }) {
	return t("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
		type: "button",
		title: n("discardRecordedFile"),
		"aria-label": n("discardRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: t("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 13 13",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: t("g", {
				fill: "#FFF",
				fillRule: "evenodd",
				children: [t("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), t("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })]
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/RecordButton.js
function p({ recording: e, onStartRecording: n, onStopRecording: r, i18n: i }) {
	return e ? t("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
		type: "button",
		title: i("stopRecording"),
		"aria-label": i("stopRecording"),
		onClick: r,
		"data-uppy-super-focusable": !0,
		children: t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: t("rect", {
				x: "15",
				y: "15",
				width: "70",
				height: "70"
			})
		})
	}) : t("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
		type: "button",
		title: i("startRecording"),
		"aria-label": i("startRecording"),
		onClick: n,
		"data-uppy-super-focusable": !0,
		children: t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: t("circle", {
				cx: "50",
				cy: "50",
				r: "40"
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/formatSeconds.js
function m(e) {
	return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
}
//#endregion
//#region node_modules/@uppy/webcam/lib/RecordingLength.js
function h({ recordingLengthSeconds: e }) {
	let n = m(e);
	return t("span", { children: n });
}
//#endregion
//#region node_modules/@uppy/webcam/lib/SnapshotButton.js
function g({ onSnapshot: e, i18n: n }) {
	return t("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
		type: "button",
		title: n("takePicture"),
		"aria-label": n("takePicture"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: d()
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/SubmitButton.js
function _({ onSubmit: e, i18n: n }) {
	return t("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
		type: "button",
		title: n("submitRecordedFile"),
		"aria-label": n("submitRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: t("svg", {
			width: "12",
			height: "9",
			viewBox: "0 0 12 9",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: t("path", {
				fill: "#fff",
				fillRule: "nonzero",
				d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/VideoSourceSelect.js
function v({ currentDeviceId: e, videoSources: n, onChangeVideoSource: r }) {
	return t("div", {
		className: "uppy-Webcam-videoSource",
		children: t("select", {
			className: "uppy-u-reset uppy-Webcam-videoSource-select",
			onChange: (e) => {
				r(e.target.value);
			},
			children: n.map((n) => t("option", {
				value: n.deviceId,
				selected: n.deviceId === e,
				children: n.label
			}, n.deviceId))
		})
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/CameraScreen.js
function y(e, t) {
	return e.includes(t);
}
var b = class extends s {
	videoElement;
	refs;
	componentDidMount() {
		let { onFocus: e } = this.props;
		e();
	}
	componentWillUnmount() {
		let { onStop: e } = this.props;
		e();
	}
	render() {
		let { src: e, recordedVideo: n, capturedSnapshot: r, recording: i, modes: a, supportsRecording: o, videoSources: s, showVideoSourceDropdown: c, showRecordingLength: l, onSubmit: u, i18n: d, mirror: m, onSnapshot: b, onStartRecording: x, onStopRecording: S, onDiscardRecordedMedia: C, recordingLengthSeconds: w } = this.props, T = !!n, E = !!r, D = T || E, O = !D && o && (y(a, "video-only") || y(a, "audio-only") || y(a, "video-audio")), k = !D && y(a, "picture"), A = o && l && !T, j = c && s && s.length > 1, M = { playsInline: !0 };
		return n ? (M.muted = !1, M.controls = !0, M.src = n, this.videoElement && (this.videoElement.srcObject = null)) : (M.muted = !0, M.autoPlay = !0, M.srcObject = e), t("div", {
			className: "uppy uppy-Webcam-container",
			children: [t("div", {
				className: "uppy-Webcam-videoContainer",
				children: r && !i && !n ? t("div", {
					className: "uppy-Webcam-imageContainer",
					children: t("img", {
						src: r,
						className: "uppy-Webcam-video",
						alt: "capturedSnapshot"
					})
				}) : t("video", {
					ref: (e) => {
						this.videoElement = e;
					},
					className: `uppy-Webcam-video  ${m ? "uppy-Webcam-video--mirrored" : ""}`,
					...M
				})
			}), t("div", {
				className: "uppy-Webcam-footer",
				children: [
					t("div", {
						className: "uppy-Webcam-videoSourceContainer",
						children: j ? v(this.props) : null
					}),
					t("div", {
						className: "uppy-Webcam-buttonContainer",
						children: [
							k && t(g, {
								onSnapshot: b,
								i18n: d
							}),
							O && t(p, {
								recording: i,
								onStartRecording: x,
								onStopRecording: S,
								i18n: d
							}),
							(T || E) && t(_, {
								onSubmit: u,
								i18n: d
							}),
							(T || E) && t(f, {
								onDiscard: C,
								i18n: d
							})
						]
					}),
					t("div", {
						className: "uppy-Webcam-recordingLength",
						children: A && t(h, { recordingLengthSeconds: w })
					})
				]
			})]
		});
	}
}, x = { strings: {
	pluginNameCamera: "Camera",
	noCameraTitle: "Camera Not Available",
	noCameraDescription: "In order to take pictures or record video, please connect a camera device",
	recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
	submitRecordedFile: "Submit recorded file",
	discardRecordedFile: "Discard recorded file",
	smile: "Smile!",
	takePicture: "Take a picture",
	startRecording: "Begin video recording",
	stopRecording: "Stop video recording",
	recordingLength: "Recording length %{recording_length}",
	allowAccessTitle: "Please allow access to your camera",
	allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
} };
//#endregion
//#region node_modules/@uppy/webcam/lib/PermissionsScreen.js
function S({ icon: e, i18n: n, hasCamera: r }) {
	return t("div", {
		className: "uppy-Webcam-permissons",
		children: [
			t("div", {
				className: "uppy-Webcam-permissonsIcon",
				children: e()
			}),
			t("div", {
				className: "uppy-Webcam-title",
				children: n(r ? "allowAccessTitle" : "noCameraTitle")
			}),
			t("p", { children: n(r ? "allowAccessDescription" : "noCameraDescription") })
		]
	});
}
//#endregion
//#region node_modules/@uppy/webcam/lib/supportsMediaRecorder.js
function C() {
	return typeof MediaRecorder == "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start == "function";
}
//#endregion
//#region node_modules/@uppy/webcam/lib/Webcam.js
function w(e) {
	return e[0] === "." ? r[e.slice(1)] : e;
}
function T(e) {
	return /^video\/[^*]+$/.test(e);
}
function E(e) {
	return /^image\/[^*]+$/.test(e);
}
function D() {
	return navigator.mediaDevices;
}
function O(e, t) {
	return e.includes(t);
}
var k = {
	onBeforeSnapshot: () => Promise.resolve(),
	countdown: !1,
	modes: [
		"video-audio",
		"video-only",
		"audio-only",
		"picture"
	],
	mirror: !0,
	showVideoSourceDropdown: !1,
	preferredImageMimeType: null,
	preferredVideoMimeType: null,
	showRecordingLength: !1,
	mobileNativeCamera: (0, l.isMobile)({ tablet: !0 })
}, A = class extends n {
	static VERSION = u.version;
	#e;
	mediaDevices;
	supportsUserMedia;
	capturedMediaFile;
	icon;
	webcamActive;
	stream = null;
	recorder = null;
	recordingChunks = null;
	recordingLengthTimer;
	captureInProgress = !1;
	constructor(e, n) {
		super(e, {
			...k,
			...n
		}), this.mediaDevices = D(), this.supportsUserMedia = !!this.mediaDevices, this.id = this.opts.id || "Webcam", this.type = "acquirer", this.capturedMediaFile = null, this.icon = () => t("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "32",
			height: "32",
			viewBox: "0 0 32 32",
			children: t("path", {
				d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
				fill: "#02B383",
				fillRule: "nonzero"
			})
		}), this.defaultLocale = x, this.i18nInit(), this.title = this.i18n("pluginNameCamera"), this.#e = this.opts.mirror, this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.takeSnapshot = this.takeSnapshot.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.discardRecordedMedia = this.discardRecordedMedia.bind(this), this.submit = this.submit.bind(this), this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this), this.focus = this.focus.bind(this), this.changeVideoSource = this.changeVideoSource.bind(this), this.webcamActive = !1, this.opts.countdown && (this.opts.onBeforeSnapshot = this.oneTwoThreeSmile), this.setPluginState({
			hasCamera: !1,
			cameraReady: !1,
			cameraError: null,
			recordingLengthSeconds: 0,
			videoSources: [],
			currentDeviceId: null,
			capturedSnapshot: null
		});
	}
	getStatus() {
		let { recordedVideo: e, capturedSnapshot: t, isRecording: n, cameraReady: r, cameraError: i } = this.getPluginState();
		return n ? "recording" : e != null || t != null ? "captured" : r ? "ready" : i ? "error" : "init";
	}
	setOptions(e) {
		super.setOptions({
			...e,
			videoConstraints: {
				...this.opts.videoConstraints,
				...e?.videoConstraints
			}
		});
	}
	hasCameraCheck() {
		return this.mediaDevices ? this.mediaDevices.enumerateDevices().then((e) => e.some((e) => e.kind === "videoinput")) : Promise.resolve(!1);
	}
	isAudioOnly() {
		return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
	}
	getConstraints(e = null) {
		let t = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1, n = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1), r = {
			...this.opts.videoConstraints || {},
			...e != null && { deviceId: e }
		};
		return {
			audio: t,
			video: n ? r : !1
		};
	}
	start(e = null) {
		if (!this.supportsUserMedia) return Promise.reject(/* @__PURE__ */ Error("Webcam access not supported"));
		this.webcamActive = !0, this.opts.mirror && (this.#e = !0);
		let t = this.getConstraints(e?.deviceId);
		return this.hasCameraCheck().then((n) => (this.setPluginState({ hasCamera: n }), this.mediaDevices.getUserMedia(t).then((t) => {
			this.stream = t;
			let n = null, r = this.isAudioOnly() ? t.getAudioTracks() : t.getVideoTracks();
			e?.deviceId ? r.forEach((t) => {
				t.getSettings().deviceId === e.deviceId && (n = t.getSettings().deviceId);
			}) : n = r[0].getSettings().deviceId, this.updateVideoSources(), this.setPluginState({
				currentDeviceId: n,
				cameraReady: !0
			});
		}).catch((e) => {
			this.setPluginState({
				cameraReady: !1,
				cameraError: e
			}), this.uppy.info(i(e), "error");
		})));
	}
	getMediaRecorderOptions() {
		let e = {};
		if (MediaRecorder.isTypeSupported) {
			let { restrictions: t } = this.uppy.opts, n = [];
			this.opts.preferredVideoMimeType ? n = [this.opts.preferredVideoMimeType] : t.allowedFileTypes && (n = t.allowedFileTypes.map(w).filter(T));
			let r = n.filter((e) => MediaRecorder.isTypeSupported(e) && a(e));
			r.length > 0 && (e.mimeType = r[0]);
		}
		return e;
	}
	startRecording() {
		this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions()), this.recordingChunks = [];
		let e = !1;
		this.recorder.addEventListener("dataavailable", (t) => {
			this.recordingChunks.push(t.data);
			let { restrictions: n } = this.uppy.opts;
			if (this.recordingChunks.length > 1 && n.maxFileSize != null && !e) {
				let t = this.recordingChunks.reduce((e, t) => e + t.size, 0), r = (t - this.recordingChunks[0].size) / (this.recordingChunks.length - 1) * 3;
				t > Math.max(0, n.maxFileSize - r) && (e = !0, this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3), this.stopRecording());
			}
		}), this.recorder.start(500), this.opts.showRecordingLength && (this.recordingLengthTimer = setInterval(() => {
			let e = this.getPluginState().recordingLengthSeconds;
			this.setPluginState({ recordingLengthSeconds: e + 1 });
		}, 1e3)), this.setPluginState({ isRecording: !0 });
	}
	stopRecording() {
		return new Promise((e) => {
			this.recorder.addEventListener("stop", () => {
				e();
			}), this.recorder.stop(), this.opts.showRecordingLength && (clearInterval(this.recordingLengthTimer), this.setPluginState({ recordingLengthSeconds: 0 }));
		}).then(() => (this.setPluginState({ isRecording: !1 }), this.getVideo())).then((e) => {
			try {
				this.capturedMediaFile = e, this.setPluginState({ recordedVideo: URL.createObjectURL(e.data) }), this.#e = !1;
			} catch (e) {
				o(e) || this.uppy.log(e);
			}
		}).then(() => {
			this.recordingChunks = null, this.recorder = null;
		}, (e) => {
			throw this.recordingChunks = null, this.recorder = null, e;
		});
	}
	discardRecordedMedia() {
		let { recordedVideo: e, capturedSnapshot: t } = this.getPluginState();
		e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.setPluginState({
			recordedVideo: null,
			capturedSnapshot: null
		}), this.opts.mirror && (this.#e = !0), this.capturedMediaFile = null;
	}
	submit() {
		try {
			this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile);
		} catch (e) {
			o(e) || this.uppy.log(e, "error");
		}
	}
	async stop() {
		if (this.stream) {
			let e = this.stream.getAudioTracks(), t = this.stream.getVideoTracks();
			e.concat(t).forEach((e) => {
				e.stop();
			});
		}
		this.recorder && await new Promise((e) => {
			this.recorder.addEventListener("stop", e, { once: !0 }), this.recorder.stop(), this.opts.showRecordingLength && clearInterval(this.recordingLengthTimer);
		}), this.recordingChunks = null, this.recorder = null, this.webcamActive = !1, this.stream = null, this.setPluginState({
			recordedVideo: null,
			capturedSnapshot: null,
			isRecording: !1,
			recordingLengthSeconds: 0
		});
	}
	getVideoElement() {
		return this.el.querySelector(".uppy-Webcam-video");
	}
	oneTwoThreeSmile() {
		return new Promise((e, t) => {
			let n = this.opts.countdown, r = setInterval(() => {
				if (!this.webcamActive) return clearInterval(r), this.captureInProgress = !1, t(/* @__PURE__ */ Error("Webcam is not active"));
				n ? (this.uppy.info(`${n}...`, "warning", 800), n--) : (clearInterval(r), this.uppy.info(this.i18n("smile"), "success", 1500), setTimeout(() => e(), 1500));
			}, 1e3);
		});
	}
	async takeSnapshot() {
		if (!this.captureInProgress) {
			this.captureInProgress = !0;
			try {
				await this.opts.onBeforeSnapshot();
			} catch (e) {
				let t = i(e);
				throw this.uppy.info(t, "error", 5e3), Error(`onBeforeSnapshot: ${t}`);
			}
			try {
				let e = await this.getImage();
				if (this.capturedMediaFile = e, e.data == null) throw Error("File data is empty");
				let t = URL.createObjectURL(e.data);
				this.setPluginState({ capturedSnapshot: t }), this.captureInProgress = !1;
			} catch (e) {
				this.captureInProgress = !1, o(e) || this.uppy.log(e);
			}
		}
	}
	async getImage() {
		let e = this.getVideoElement();
		if (!e) return Promise.reject(/* @__PURE__ */ Error("No video element found, likely due to the Webcam tab being closed."));
		let t = e.videoWidth, n = e.videoHeight, r = document.createElement("canvas");
		r.width = t, r.height = n, r.getContext("2d").drawImage(e, 0, 0);
		let { restrictions: i } = this.uppy.opts, o = [];
		this.opts.preferredImageMimeType ? o = [this.opts.preferredImageMimeType] : i.allowedFileTypes && (o = i.allowedFileTypes.map(w).filter(E));
		let s = o[0] || "image/jpeg", l = a(s) || "jpg", u = `cam-${Date.now()}.${l}`;
		return c(r, s).then((e) => ({
			source: this.id,
			name: u,
			data: new Blob([e], { type: s }),
			type: s
		}));
	}
	getVideo() {
		let e = this.recordingChunks.find((e) => e.type?.length > 0).type, t = a(e);
		if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
		let n = `webcam-${Date.now()}.${t}`, r = new Blob(this.recordingChunks, { type: e }), i = {
			source: this.id,
			name: n,
			data: new Blob([r], { type: e }),
			type: e
		};
		return Promise.resolve(i);
	}
	focus() {
		this.opts.countdown && setTimeout(() => {
			this.uppy.info(this.i18n("smile"), "success", 1500);
		}, 1e3);
	}
	changeVideoSource(e) {
		this.stop(), this.start({ deviceId: e });
	}
	updateVideoSources() {
		this.mediaDevices.enumerateDevices().then((e) => {
			this.setPluginState({ videoSources: e.filter((e) => e.kind === "videoinput") });
		});
	}
	render() {
		this.webcamActive || this.start();
		let e = this.getPluginState();
		return !e.cameraReady || !e.hasCamera ? t(S, {
			icon: d,
			i18n: this.i18n,
			hasCamera: e.hasCamera
		}) : t(b, {
			...e,
			onChangeVideoSource: this.changeVideoSource,
			onSnapshot: this.takeSnapshot,
			onStartRecording: this.startRecording,
			onStopRecording: this.stopRecording,
			onDiscardRecordedMedia: this.discardRecordedMedia,
			onSubmit: this.submit,
			onFocus: this.focus,
			onStop: this.stop,
			i18n: this.i18n,
			modes: this.opts.modes,
			showRecordingLength: this.opts.showRecordingLength,
			showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
			supportsRecording: C(),
			recording: e.isRecording,
			mirror: this.#e,
			src: this.stream
		});
	}
	install() {
		let { mobileNativeCamera: e, modes: t, videoConstraints: n } = this.opts, { target: r } = this.opts;
		if (e && r) {
			this.getTargetPlugin(r)?.setOptions({
				showNativeVideoCameraButton: O(t, "video-only") || O(t, "video-audio"),
				showNativePhotoCameraButton: O(t, "picture"),
				nativeCameraFacingMode: n?.facingMode
			});
			return;
		}
		this.setPluginState({
			cameraReady: !1,
			recordingLengthSeconds: 0
		}), r && this.mount(r, this), this.mediaDevices && (this.updateVideoSources(), this.mediaDevices.ondevicechange = () => {
			if (this.updateVideoSources(), this.stream) {
				let e = !0, { videoSources: t, currentDeviceId: n } = this.getPluginState();
				t.forEach((t) => {
					n === t.deviceId && (e = !1);
				}), e && (this.stop(), this.start());
			}
		});
	}
	uninstall() {
		this.stop(), this.unmount();
	}
	onUnmount() {
		this.stop();
	}
};
//#endregion
export { A as default, k as defaultOptions };
