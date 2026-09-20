import { f as e, i as t, r as n, s as r, t as i } from "./fluppy-UIPlugin-Cg6ptWEb.js";
import { t as a } from "./fluppy-getFileTypeExtension-ZfAAaqva.js";
var o = {
	name: "@uppy/screen-capture",
	description: "Uppy plugin that captures video from display or application.",
	version: "6.0.1",
	license: "MIT",
	style: "dist/style.min.css",
	type: "module",
	sideEffects: ["*.css"],
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build"
	},
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"screen capture",
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
	dependencies: { preact: "^10.29.2" },
	peerDependencies: { "@uppy/core": "^6.2.0" },
	publishConfig: { access: "public" },
	devDependencies: {
		"@uppy-dev/tsconfig": "^0.0.0",
		cssnano: "^8.0.1",
		postcss: "^8.5.23",
		"postcss-cli": "^11.0.1",
		sass: "^1.89.2",
		typescript: "^6.0.3"
	}
}, s = { strings: {
	pluginNameScreenCapture: "Screencast",
	startCapturing: "Begin screen capturing",
	stopCapturing: "Stop screen capturing",
	submitRecordedFile: "Submit recorded file",
	streamActive: "Stream active",
	streamPassive: "Stream passive",
	micDisabled: "Microphone access denied by user",
	recording: "Recording",
	takeScreenshot: "Take Screenshot",
	discardMediaFile: "Discard Media"
} };
//#endregion
//#region node_modules/@uppy/screen-capture/lib/DiscardButton.js
function c({ onDiscard: e, i18n: t }) {
	return n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--discard",
		type: "button",
		title: t("discardMediaFile"),
		"aria-label": t("discardMediaFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			children: [n("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), n("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})]
		})
	});
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/RecordButton.js
function l({ recording: e, onStartRecording: t, onStopRecording: r, i18n: i }) {
	return e ? n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
		type: "button",
		title: i("stopCapturing"),
		"aria-label": i("stopCapturing"),
		onClick: r,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			children: n("rect", {
				x: "15",
				y: "15",
				width: "70",
				height: "70"
			})
		})
	}) : n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
		type: "button",
		title: i("startCapturing"),
		"aria-label": i("startCapturing"),
		onClick: t,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			children: n("path", { d: "M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" })
		})
	});
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenshotButton.js
function u({ onScreenshot: e, i18n: t }) {
	return n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--screenshot",
		type: "button",
		title: t("takeScreenshot"),
		"aria-label": t("takeScreenshot"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			children: [n("path", { d: "M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" }), n("path", {
				"fill-rule": "evenodd",
				d: "M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
				"clip-rule": "evenodd"
			})]
		})
	});
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/StopWatch.js
function d(e) {
	return (e - (e %= 60)) / 60 + (e > 9 ? ":" : ":0") + e;
}
var f = class extends t {
	wrapperStyle = {
		width: "100%",
		height: "100%",
		display: "flex"
	};
	overlayStyle = {
		position: "absolute",
		width: "100%",
		height: "100%",
		background: "black",
		opacity: .7
	};
	infoContainerStyle = {
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "auto",
		marginBottom: "auto",
		zIndex: 1,
		color: "white"
	};
	infotextStyle = {
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: "1rem",
		fontSize: "1.5rem"
	};
	timeStyle = {
		display: "block",
		fontWeight: "bold",
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: "3rem",
		fontFamily: "Courier New"
	};
	timerRunning = !1;
	timer;
	constructor(e) {
		super(e), this.state = { elapsedTime: 0 };
	}
	startTimer() {
		this.timerTick(), this.timerRunning = !0;
	}
	resetTimer() {
		clearTimeout(this.timer), this.setState({ elapsedTime: 0 }), this.timerRunning = !1;
	}
	timerTick() {
		this.timer = setTimeout(() => {
			this.setState((e) => ({ elapsedTime: e.elapsedTime + 1 })), this.timerTick();
		}, 1e3);
	}
	render() {
		let { recording: e, i18n: t } = { ...this.props }, { elapsedTime: r } = this.state, i = d(r);
		return e && !this.timerRunning && this.startTimer(), !e && this.timerRunning && this.resetTimer(), e ? n("div", {
			style: this.wrapperStyle,
			children: [n("div", { style: this.overlayStyle }), n("div", {
				style: this.infoContainerStyle,
				children: [n("div", {
					style: this.infotextStyle,
					children: t("recording")
				}), n("div", {
					style: this.timeStyle,
					children: i
				})]
			})]
		}) : null;
	}
};
//#endregion
//#region node_modules/@uppy/screen-capture/lib/StreamStatus.js
function p({ streamActive: e, i18n: t }) {
	return e ? n("div", {
		title: t("streamActive"),
		className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive",
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: [
				n("path", {
					d: "M0 0h24v24H0z",
					opacity: ".1",
					fill: "none"
				}),
				n("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				n("path", { d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })
			]
		})
	}) : n("div", {
		title: t("streamPassive"),
		className: "uppy-ScreenCapture-icon--stream",
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			children: [
				n("path", {
					d: "M0 0h24v24H0z",
					opacity: ".1",
					fill: "none"
				}),
				n("path", {
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				n("path", { d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z" })
			]
		})
	});
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/SubmitButton.js
function m({ recording: e, recordedVideo: t, onSubmit: r, capturedScreenshotUrl: i, i18n: a }) {
	return (t || i) && !e ? n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
		type: "button",
		title: a("submitRecordedFile"),
		"aria-label": a("submitRecordedFile"),
		onClick: r,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			width: "12",
			height: "9",
			viewBox: "0 0 12 9",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			children: n("path", {
				fill: "#fff",
				fillRule: "nonzero",
				d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
			})
		})
	}) : null;
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/RecorderScreen.js
var h = class extends t {
	videoElement = null;
	componentWillUnmount() {
		let { onStop: e } = this.props;
		e();
	}
	render() {
		let { recording: e, stream: t, recordedVideo: i, enableScreenshots: a, capturedScreenshotUrl: o } = this.props, s = { playsinline: !0 };
		return (e || !i && !e) && (s.muted = !0, s.autoplay = !0, s.srcObject = t), i && !e && (s.muted = !1, s.controls = !0, s.src = i, this.videoElement && (this.videoElement.srcObject = null)), n("div", {
			className: "uppy uppy-ScreenCapture-container",
			children: [n("div", {
				className: "uppy-ScreenCapture-mediaContainer",
				children: [
					n(p, { ...this.props }),
					o && !e && !i ? n("div", {
						className: "uppy-ScreenCapture-imageContainer",
						children: n("img", {
							src: o,
							className: "uppy-ScreenCapture-media",
							alt: "screenshotPreview"
						})
					}) : n("video", {
						ref: (e) => {
							this.videoElement = e;
						},
						className: "uppy-ScreenCapture-media",
						...s
					}),
					n("div", { children: n(f, { ...this.props }) })
				]
			}), n("div", {
				className: "uppy-ScreenCapture-buttonContainer",
				children: i || o ? n(r, { children: [n(m, { ...this.props }), n(c, { ...this.props })] }) : n(r, { children: [a && !e && n(u, { ...this.props }), n(l, { ...this.props })] })
			})]
		});
	}
};
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenRecIcon.js
function g() {
	return n("svg", {
		className: "uppy-DashboardTab-iconScreenRec",
		"aria-hidden": "true",
		focusable: "false",
		width: "32",
		height: "32",
		viewBox: "0 0 32 32",
		children: n("g", {
			fill: "currentcolor",
			fillRule: "evenodd",
			children: [n("path", { d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z" }), n("circle", {
				cx: "16",
				cy: "16",
				r: "2"
			})]
		})
	});
}
//#endregion
//#region node_modules/@uppy/screen-capture/lib/ScreenCapture.js
function _() {
	return window.MediaRecorder && navigator.mediaDevices?.getDisplayMedia;
}
function v() {
	return window.MediaRecorder && navigator.mediaDevices;
}
var y = [
	"image/png",
	"image/jpeg",
	"image/webp"
], b = {
	displayMediaConstraints: { video: {
		width: 1280,
		height: 720,
		frameRate: {
			ideal: 3,
			max: 5
		},
		cursor: "motion",
		displaySurface: "monitor"
	} },
	userMediaConstraints: { audio: !0 },
	preferredVideoMimeType: "video/webm",
	preferredImageMimeType: "image/png",
	enableScreenshots: !0
}, x = class extends i {
	static VERSION = o.version;
	mediaDevices;
	protocol;
	icon;
	streamInterrupted;
	captureActive;
	capturedMediaFile;
	videoStream = null;
	audioStream = null;
	userDenied = !1;
	recorder = null;
	outputStream = null;
	recordingChunks = null;
	constructor(e, t) {
		super(e, {
			...b,
			...t
		}), this.mediaDevices = v(), this.protocol = location.protocol === "https:" ? "https" : "http", this.id = this.opts.id || "ScreenCapture", this.type = "acquirer", this.icon = g, this.defaultLocale = s, this.i18nInit(), this.title = this.i18n("pluginNameScreenCapture"), this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.submit = this.submit.bind(this), this.streamInterrupted = this.streamInactivated.bind(this), this.captureScreenshot = this.captureScreenshot.bind(this), this.discardRecordedMedia = this.discardRecordedMedia.bind(this), this.captureActive = !1, this.capturedMediaFile = null, this.setPluginState({
			streamActive: !1,
			audioStreamActive: !1,
			recording: !1,
			recordedVideo: null,
			screenRecError: null,
			capturedScreenshotUrl: null,
			status: "init"
		});
	}
	install() {
		if (!_()) return this.uppy.log("Screen recorder access is not supported", "warning"), null;
		this.setPluginState({
			streamActive: !1,
			audioStreamActive: !1,
			status: "init"
		});
		let { target: e } = this.opts;
		e && this.mount(e, this);
	}
	uninstall() {
		this.videoStream && this.stop(), this.unmount();
	}
	start() {
		return this.mediaDevices ? (this.captureActive = !0, this.selectAudioStreamSource(), this.selectVideoStreamSource().then((e) => {
			e === !1 && this.parent?.hideAllPanels && (this.parent.hideAllPanels(), this.captureActive = !1);
		})) : Promise.reject(/* @__PURE__ */ Error("Screen recorder access not supported"));
	}
	selectVideoStreamSource() {
		return this.videoStream ? new Promise((e) => e(this.videoStream)) : this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((e) => (this.videoStream = e, this.videoStream.addEventListener("inactive", () => {
			this.streamInactivated();
		}), this.setPluginState({
			streamActive: !0,
			status: "ready",
			screenRecError: null
		}), e)).catch((e) => (this.setPluginState({
			screenRecError: e,
			status: "error"
		}), this.userDenied = !0, setTimeout(() => {
			this.userDenied = !1;
		}, 1e3), !1));
	}
	selectAudioStreamSource() {
		return this.audioStream ? new Promise((e) => e(this.audioStream)) : this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((e) => (this.audioStream = e, this.setPluginState({ audioStreamActive: !0 }), e)).catch((e) => (e.name === "NotAllowedError" && (this.uppy.info(this.i18n("micDisabled"), "error", 5e3), this.uppy.log(this.i18n("micDisabled"), "warning")), !1));
	}
	startRecording() {
		let e = {};
		this.capturedMediaFile = null, this.recordingChunks = [];
		let { preferredVideoMimeType: t } = this.opts;
		this.selectVideoStreamSource().then((n) => {
			if (n === !1) throw Error("No video stream available");
			t && MediaRecorder.isTypeSupported(t) && a(t) && (e.mimeType = t);
			let r = [n.getVideoTracks()[0]];
			this.audioStream && r.push(this.audioStream.getAudioTracks()[0]), this.outputStream = new MediaStream(r), this.recorder = new MediaRecorder(this.outputStream, e), this.recorder.addEventListener("dataavailable", (e) => {
				this.recordingChunks.push(e.data);
			}), this.recorder.start(), this.setPluginState({
				recording: !0,
				status: "recording"
			});
		}).catch((e) => {
			this.uppy.log(e, "error"), this.setPluginState({
				screenRecError: e,
				status: "error"
			});
		});
	}
	streamInactivated() {
		let { recordedVideo: e, recording: t } = { ...this.getPluginState() };
		!e && !t ? (this.parent?.hideAllPanels && this.parent.hideAllPanels(), this.setPluginState({ status: "init" })) : t && (this.uppy.log("Capture stream inactive — stop recording"), this.stopRecording()), this.videoStream = null, this.audioStream = null, this.setPluginState({
			streamActive: !1,
			audioStreamActive: !1
		});
	}
	stopRecording() {
		return new Promise((e) => {
			this.recorder.addEventListener("stop", () => {
				e();
			}), this.recorder.stop();
		}).then(() => (this.setPluginState({ recording: !1 }), this.getVideo())).then((e) => {
			this.capturedMediaFile = e, this.setPluginState({
				recordedVideo: URL.createObjectURL(e.data),
				status: "captured"
			});
		}).then(() => {
			this.recordingChunks = null, this.recorder = null;
		}, (e) => {
			throw this.recordingChunks = null, this.recorder = null, e;
		});
	}
	discardRecordedMedia() {
		let { capturedScreenshotUrl: e, recordedVideo: t } = this.getPluginState();
		e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.capturedMediaFile = null, this.setPluginState({
			recordedVideo: null,
			capturedScreenshotUrl: null,
			status: this.getPluginState().streamActive ? "ready" : "init"
		});
	}
	submit() {
		try {
			this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile);
		} catch (t) {
			e(t) || this.uppy.log(t, "warning");
		}
	}
	stop() {
		this.videoStream &&= (this.videoStream.getVideoTracks().forEach((e) => {
			e.stop();
		}), this.videoStream.getAudioTracks().forEach((e) => {
			e.stop();
		}), null), this.audioStream &&= (this.audioStream.getAudioTracks().forEach((e) => {
			e.stop();
		}), this.audioStream.getVideoTracks().forEach((e) => {
			e.stop();
		}), null), this.outputStream &&= (this.outputStream.getAudioTracks().forEach((e) => {
			e.stop();
		}), this.outputStream.getVideoTracks().forEach((e) => {
			e.stop();
		}), null);
		let { capturedScreenshotUrl: e, recordedVideo: t } = this.getPluginState();
		e && URL.revokeObjectURL(e), t && URL.revokeObjectURL(t), this.setPluginState({
			recording: !1,
			streamActive: !1,
			audioStreamActive: !1,
			recordedVideo: null,
			capturedScreenshotUrl: null,
			status: "init"
		}), this.captureActive = !1;
	}
	getVideo() {
		let e = this.recordingChunks[0].type, t = a(e);
		if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
		let n = `screencap-${Date.now()}.${t}`, r = new Blob(this.recordingChunks, { type: e }), i = {
			source: this.id,
			name: n,
			data: new Blob([r], { type: e }),
			type: e
		};
		return Promise.resolve(i);
	}
	async captureScreenshot() {
		if (!this.mediaDevices?.getDisplayMedia) throw Error("Screen capture is not supported");
		try {
			let t = this.videoStream;
			if (!t) {
				let e = await this.selectVideoStreamSource();
				if (!e) throw Error("Failed to get screen capture stream");
				t = e;
			}
			let n = document.createElement("video");
			n.srcObject = t, await new Promise((e) => {
				n.onloadedmetadata = () => {
					n.play(), e(null);
				};
			});
			let r = document.createElement("canvas");
			r.width = n.videoWidth, r.height = n.videoHeight;
			let i = r.getContext("2d");
			if (!i) throw Error("Failed to get canvas context");
			i.drawImage(n, 0, 0, r.width, r.height);
			let o = this.opts.preferredImageMimeType;
			return (!o || !y.includes(o)) && (this.uppy.log(`Unsupported image type "${o}", falling back to image/png`, "warning"), o = "image/png"), new Promise((t, i) => {
				r.toBlob((s) => {
					if (!s) {
						i(/* @__PURE__ */ Error("Failed to create screenshot blob"));
						return;
					}
					let c = a(o) || "png", l = {
						source: this.id,
						name: `Screenshot ${(/* @__PURE__ */ new Date()).toISOString()}.${c}`,
						type: o,
						data: s
					};
					try {
						this.capturedMediaFile = l;
						let e = URL.createObjectURL(s);
						this.setPluginState({
							capturedScreenshotUrl: e,
							status: "captured"
						}), t();
					} catch (t) {
						this.getPluginState().capturedScreenshotUrl && this.setPluginState({ capturedScreenshotUrl: null }), e(t) || this.uppy.log(t, "error"), i(t);
					} finally {
						n.srcObject = null, r.remove(), n.remove();
					}
				}, o, 1);
			});
		} catch (e) {
			throw this.uppy.log(e, "error"), e;
		}
	}
	render() {
		let e = this.getPluginState();
		return !e.streamActive && !this.captureActive && !this.userDenied && this.start(), n(h, {
			...e,
			onStartRecording: this.startRecording,
			onStopRecording: this.stopRecording,
			enableScreenshots: this.opts.enableScreenshots,
			onScreenshot: this.captureScreenshot,
			onStop: this.stop,
			onSubmit: this.submit,
			i18n: this.i18n,
			stream: this.videoStream,
			onDiscard: this.discardRecordedMedia
		});
	}
};
//#endregion
export { x as default };
