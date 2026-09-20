//#region node_modules/@uppy/core/lib/utils/getFileTypeExtension.js
var e = {
	__proto__: null,
	"audio/mp3": "mp3",
	"audio/mp4": "mp4",
	"audio/ogg": "ogg",
	"audio/webm": "webm",
	"image/gif": "gif",
	"image/heic": "heic",
	"image/heif": "heif",
	"image/jpeg": "jpg",
	"image/webp": "webp",
	"image/png": "png",
	"image/svg+xml": "svg",
	"video/mp4": "mp4",
	"video/ogg": "ogv",
	"video/quicktime": "mov",
	"video/webm": "webm",
	"video/x-matroska": "mkv",
	"video/x-msvideo": "avi"
};
function t(t) {
	return [t] = t.split(";", 1), e[t] || null;
}
//#endregion
export { t };
