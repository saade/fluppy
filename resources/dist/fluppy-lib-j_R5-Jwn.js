import { t as e } from "./fluppy-getErrorMessage-e5OqMKex.js";
import { f as t, r as n, t as r } from "./fluppy-UIPlugin-Cg6ptWEb.js";
import { t as i } from "./fluppy-getFileTypeExtension-ZfAAaqva.js";
import { o as a, t as o } from "./fluppy-hooks.module-DdOx1m6x.js";
var s = {
	name: "@uppy/audio",
	description: "Uppy plugin that records audio using the device’s microphone.",
	version: "4.0.1",
	license: "MIT",
	style: "dist/style.min.css",
	keywords: [
		"file uploader",
		"uppy",
		"uppy-plugin",
		"audio",
		"microphone",
		"sound",
		"record",
		"mediarecorder"
	],
	type: "module",
	sideEffects: ["*.css"],
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
	peerDependencies: { "@uppy/core": "^6.2.0" },
	publishConfig: { access: "public" },
	scripts: {
		build: "tsc --build tsconfig.build.json",
		"build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css",
		typecheck: "tsc --build",
		test: "vitest run --silent='passed-only'"
	}
}, c = { strings: {
	pluginNameAudio: "Audio",
	startAudioRecording: "Begin audio recording",
	stopAudioRecording: "Stop audio recording",
	allowAudioAccessTitle: "Please allow access to your microphone",
	allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
	noAudioTitle: "Microphone Not Available",
	noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
	recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
	recordingLength: "Recording length %{recording_length}",
	submitRecordedFile: "Submit recorded file",
	discardRecordedFile: "Discard recorded file"
} }, l = (e) => {
	let { icon: t, hasAudio: r, i18n: i } = e;
	return n("div", {
		className: "uppy-Audio-permissons",
		children: [
			n("div", {
				className: "uppy-Audio-permissonsIcon",
				children: t()
			}),
			n("div", {
				className: "uppy-Audio-title",
				children: i(r ? "allowAudioAccessTitle" : "noAudioTitle")
			}),
			n("p", { children: i(r ? "allowAudioAccessDescription" : "noAudioDescription") })
		]
	});
}, u = ({ currentDeviceId: e, audioSources: t, onChangeSource: r }) => n("div", {
	className: "uppy-Audio-videoSource",
	children: n("select", {
		className: "uppy-u-reset uppy-Audio-audioSource-select",
		onChange: (e) => {
			r(e.target.value);
		},
		children: t.map((t) => n("option", {
			value: t.deviceId,
			selected: t.deviceId === e,
			children: t.label
		}, t.deviceId))
	})
});
//#endregion
//#region node_modules/@uppy/audio/lib/audio-oscilloscope/index.js
function d(e) {
	return typeof e == "function";
}
function f(e) {
	return d(e) ? e() : e;
}
var p = class {
	canvas;
	canvasContext;
	width;
	height;
	analyser;
	bufferLength;
	dataArray;
	onDrawFrame;
	streamSource;
	audioContext;
	source;
	constructor(e, t = {}) {
		let n = t.canvas || {}, r = t.canvasContext || {};
		this.analyser = null, this.bufferLength = 0, this.canvas = e, this.width = f(n.width) || this.canvas.width, this.height = f(n.height) || this.canvas.height, this.canvas.width = this.width, this.canvas.height = this.height, this.canvasContext = this.canvas.getContext("2d"), this.canvasContext.fillStyle = f(r.fillStyle) || "rgb(255, 255, 255)", this.canvasContext.strokeStyle = f(r.strokeStyle) || "rgb(0, 0, 0)", this.canvasContext.lineWidth = f(r.lineWidth) || 1, this.onDrawFrame = d(t.onDrawFrame) ? t.onDrawFrame : () => {};
	}
	addSource(e) {
		this.streamSource = e, this.audioContext = this.streamSource.context, this.analyser = this.audioContext.createAnalyser(), this.analyser.fftSize = 2048, this.bufferLength = this.analyser.frequencyBinCount, this.source = this.audioContext.createBufferSource(), this.dataArray = new Uint8Array(this.bufferLength), this.analyser.getByteTimeDomainData(this.dataArray), this.streamSource.connect(this.analyser);
	}
	draw() {
		let { analyser: e, dataArray: t, bufferLength: n } = this, r = this.canvasContext, i = this.width, a = this.height;
		e && e.getByteTimeDomainData(t), r.fillRect(0, 0, i, a), r.beginPath();
		let o = i * 1 / n, s = 0;
		n || r.moveTo(0, this.height / 2);
		for (let e = 0; e < n; e++) {
			let n = t[e] / 128 * (a / 2);
			e === 0 ? r.moveTo(s, n) : r.lineTo(s, n), s += o;
		}
		r.lineTo(i, a / 2), r.stroke(), this.onDrawFrame(this), requestAnimationFrame(this.#e);
	}
	#e = () => this.draw();
};
//#endregion
//#region node_modules/@uppy/audio/lib/DiscardButton.js
function m({ onDiscard: e, i18n: t }) {
	return n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: t("discardRecordedFile"),
		"aria-label": t("discardRecordedFile"),
		onClick: e,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 13 13",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			className: "uppy-c-icon",
			children: n("g", {
				fill: "#FFF",
				fillRule: "evenodd",
				children: [n("path", { d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z" }), n("path", { d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z" })]
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/audio/lib/RecordButton.js
function h({ recording: e, onStartRecording: t, onStopRecording: r, i18n: i }) {
	return e ? n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: i("stopAudioRecording"),
		"aria-label": i("stopAudioRecording"),
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
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
		type: "button",
		title: i("startAudioRecording"),
		"aria-label": i("startAudioRecording"),
		onClick: t,
		"data-uppy-super-focusable": !0,
		children: n("svg", {
			"aria-hidden": "true",
			focusable: "false",
			className: "uppy-c-icon",
			width: "14px",
			height: "20px",
			viewBox: "0 0 14 20",
			children: n("path", {
				d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z",
				fill: "#FFF",
				"fill-rule": "nonzero"
			})
		})
	});
}
//#endregion
//#region node_modules/@uppy/audio/lib/formatSeconds.js
function g(e) {
	return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
}
//#endregion
//#region node_modules/@uppy/audio/lib/RecordingLength.js
function _({ recordingLengthSeconds: e }) {
	let t = g(e);
	return n("span", { children: t });
}
//#endregion
//#region node_modules/@uppy/audio/lib/SubmitButton.js
function v({ onSubmit: e, i18n: t }) {
	return n("button", {
		className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit",
		type: "button",
		title: t("submitRecordedFile"),
		"aria-label": t("submitRecordedFile"),
		onClick: e,
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
	});
}
//#endregion
//#region node_modules/@uppy/audio/lib/RecordingScreen.js
function y(e) {
	let { stream: t, recordedAudio: r, onStop: i, recording: s, supportsRecording: c, audioSources: l, showAudioSourceDropdown: d, onSubmit: f, i18n: g, onStartRecording: y, onStopRecording: b, onDiscardRecordedAudio: x, recordingLengthSeconds: S } = e, C = o(null), w = o();
	a(() => () => {
		w.current = null, i();
	}, [i]), a(() => {
		if (!r && (w.current = new p(C.current, {
			canvas: {
				width: 600,
				height: 600
			},
			canvasContext: {
				lineWidth: 2,
				fillStyle: "rgb(0,0,0)",
				strokeStyle: "green"
			}
		}), w.current.draw(), t)) {
			let e = new AudioContext().createMediaStreamSource(t);
			w.current.addSource(e);
		}
	}, [r, t]);
	let T = r != null, E = !T && c, D = d && !T && l && l.length > 1;
	return n("div", {
		className: "uppy-Audio-container",
		children: [n("div", {
			className: "uppy-Audio-audioContainer",
			children: T ? n("audio", {
				className: "uppy-Audio-player",
				controls: !0,
				src: r
			}) : n("canvas", {
				ref: C,
				className: "uppy-Audio-canvas"
			})
		}), n("div", {
			className: "uppy-Audio-footer",
			children: [
				n("div", {
					className: "uppy-Audio-audioSourceContainer",
					children: D ? u(e) : null
				}),
				n("div", {
					className: "uppy-Audio-buttonContainer",
					children: [
						E && n(h, {
							recording: s,
							onStartRecording: y,
							onStopRecording: b,
							i18n: g
						}),
						T && n(v, {
							onSubmit: f,
							i18n: g
						}),
						T && n(m, {
							onDiscard: x,
							i18n: g
						})
					]
				}),
				n("div", {
					className: "uppy-Audio-recordingLength",
					children: !T && n(_, { recordingLengthSeconds: S })
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/@uppy/audio/lib/supportsMediaRecorder.js
function b() {
	return typeof MediaRecorder == "function" && typeof MediaRecorder.prototype?.start == "function";
}
//#endregion
//#region node_modules/@uppy/audio/lib/Audio.js
var x = class extends r {
	static VERSION = s.version;
	#e;
	icon;
	#t = null;
	#n = !1;
	#r = null;
	#i = null;
	#a = null;
	#o;
	#s;
	constructor(e, t) {
		super(e, t), this.#o = navigator.mediaDevices, this.#s = this.#o != null, this.id = this.opts.id || "Audio", this.type = "acquirer", this.icon = () => n("svg", {
			className: "uppy-DashboardTab-iconAudio",
			"aria-hidden": "true",
			focusable: "false",
			width: "32px",
			height: "32px",
			viewBox: "0 0 32 32",
			children: n("path", {
				d: "M21.143 12.297c.473 0 .857.383.857.857v2.572c0 3.016-2.24 5.513-5.143 5.931v2.64h2.572a.857.857 0 110 1.714H12.57a.857.857 0 110-1.714h2.572v-2.64C12.24 21.24 10 18.742 10 15.726v-2.572a.857.857 0 111.714 0v2.572A4.29 4.29 0 0016 20.01a4.29 4.29 0 004.286-4.285v-2.572c0-.474.384-.857.857-.857zM16 6.5a3 3 0 013 3v6a3 3 0 01-6 0v-6a3 3 0 013-3z",
				fill: "currentcolor",
				"fill-rule": "nonzero"
			})
		}), this.defaultLocale = c, this.opts = { ...t }, this.i18nInit(), this.title = this.i18n("pluginNameAudio"), this.setPluginState({
			hasAudio: !1,
			audioReady: !1,
			cameraError: null,
			recordingLengthSeconds: 0,
			audioSources: [],
			currentDeviceId: null
		});
	}
	#c() {
		return this.#o ? this.#o.enumerateDevices().then((e) => e.some((e) => e.kind === "audioinput")) : Promise.resolve(!1);
	}
	#l = (t) => this.#s ? (this.#n = !0, this.#c().then((n) => (this.setPluginState({ hasAudio: n }), this.#o.getUserMedia({ audio: !0 }).then((e) => {
		this.#t = e;
		let n = null, r = e.getAudioTracks();
		n = t?.deviceId ? r.findLast((e) => e.getSettings().deviceId === t.deviceId) : r[0].getSettings().deviceId, this.#_(), this.setPluginState({
			currentDeviceId: n,
			audioReady: !0
		});
	}).catch((t) => {
		this.setPluginState({
			audioReady: !1,
			cameraError: t
		}), this.uppy.info(e(t), "error");
	})))) : Promise.reject(/* @__PURE__ */ Error("Microphone access not supported"));
	#u = () => {
		this.#i = new MediaRecorder(this.#t), this.#r = [];
		let e = !1;
		this.#i.addEventListener("dataavailable", (t) => {
			this.#r.push(t.data);
			let { restrictions: n } = this.uppy.opts;
			if (this.#r.length > 1 && n.maxFileSize != null && !e) {
				let t = this.#r.reduce((e, t) => e + t.size, 0), r = (t - this.#r[0].size) / (this.#r.length - 1) * 3;
				t > Math.max(0, n.maxFileSize - r) && (e = !0, this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3), this.#d());
			}
		}), this.#i.start(500), this.#e = setInterval(() => {
			let e = this.getPluginState().recordingLengthSeconds;
			this.setPluginState({ recordingLengthSeconds: e + 1 });
		}, 1e3), this.setPluginState({ isRecording: !0 });
	};
	#d = () => new Promise((e) => {
		this.#i.addEventListener("stop", () => {
			e();
		}), this.#i.stop(), clearInterval(this.#e), this.setPluginState({ recordingLengthSeconds: 0 });
	}).then(() => (this.setPluginState({ isRecording: !1 }), this.#h())).then((e) => {
		try {
			this.#a = e, this.setPluginState({ recordedAudio: URL.createObjectURL(e.data) });
		} catch (e) {
			t(e) || this.uppy.log(e);
		}
	}).then(() => {
		this.#r = null, this.#i = null;
	}, (e) => {
		throw this.#r = null, this.#i = null, e;
	});
	#f = () => {
		this.setPluginState({ recordedAudio: null }), this.#a = null;
	};
	#p = () => {
		try {
			this.#a && this.uppy.addFile(this.#a);
		} catch (e) {
			t(e) || this.uppy.log(e, "warning");
		}
	};
	#m = async () => {
		this.#t && this.#t.getAudioTracks().forEach((e) => {
			e.stop();
		}), this.#i && await new Promise((e) => {
			this.#i.addEventListener("stop", e, { once: !0 }), this.#i.stop(), clearInterval(this.#e);
		}), this.#r = null, this.#i = null, this.#n = !1, this.#t = null, this.setPluginState({
			recordedAudio: null,
			isRecording: !1,
			recordingLengthSeconds: 0
		});
	};
	#h() {
		let e = this.#r.find((e) => e.type?.length > 0).type, t = i(e);
		if (!t) return Promise.reject(/* @__PURE__ */ Error(`Could not retrieve recording: Unsupported media type "${e}"`));
		let n = `audio-${Date.now()}.${t}`, r = new Blob(this.#r, { type: e }), a = {
			source: this.id,
			name: n,
			data: new Blob([r], { type: e }),
			type: e
		};
		return Promise.resolve(a);
	}
	#g = (e) => {
		this.#m(), this.#l({ deviceId: e });
	};
	#_ = () => {
		this.#o.enumerateDevices().then((e) => {
			this.setPluginState({ audioSources: e.filter((e) => e.kind === "audioinput") });
		});
	};
	render() {
		this.#n || this.#l();
		let e = this.getPluginState();
		return !e.audioReady || !e.hasAudio ? n(l, {
			icon: this.icon,
			i18n: this.i18n,
			hasAudio: e.hasAudio
		}) : n(y, {
			...e,
			onChangeSource: this.#g,
			onStartRecording: this.#u,
			onStopRecording: this.#d,
			onDiscardRecordedAudio: this.#f,
			onSubmit: this.#p,
			onStop: this.#m,
			i18n: this.i18n,
			showAudioSourceDropdown: this.opts.showAudioSourceDropdown,
			supportsRecording: b(),
			recording: e.isRecording,
			stream: this.#t
		});
	}
	install() {
		this.setPluginState({
			audioReady: !1,
			recordingLengthSeconds: 0
		});
		let { target: e } = this.opts;
		e && this.mount(e, this), this.#o && (this.#_(), this.#o.ondevicechange = () => {
			if (this.#_(), this.#t) {
				let e = !0, { audioSources: t, currentDeviceId: n } = this.getPluginState();
				t.forEach((t) => {
					n === t.deviceId && (e = !1);
				}), e && (this.#m(), this.#l());
			}
		});
	}
	uninstall() {
		this.#t && this.#m(), this.unmount();
	}
};
//#endregion
export { x as default };
