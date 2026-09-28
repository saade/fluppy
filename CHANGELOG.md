# Changelog

All notable changes to `fluppy` will be documented in this file.

## 1.x

### Added

- The first release.
- The upload field uses the panel's colors and follows its light and dark mode.
- Large files are uploaded in chunks, so they can be larger than one request allows, and can be paused, resumed and retried. See "Large files" in the README; `chunked()` and `chunkSize()` set it per field.
- With S3 as Livewire's temporary disk, large files go straight to the bucket as multipart uploads, with the same pause, resume and retry.
- `height()` sets how tall the field is, and `modal()` shows it as a button and a list of files that opens Uppy over the page.
- `SpatieMediaLibraryFluppyField`, the upload field of Filament's media library plugin with Uppy as its interface. It adds files to the library without reading them into memory.
- `imageEditor()` lets an uploaded or stored image be cropped, rotated and flipped, with Uppy's image editor.
- `openable()`, `downloadable()` and `previewable()` are respected.
- `googleDrive()` lets files be picked from Google Drive, in Google's own Picker. The server fetches them from Google, and only ever reaches the files a person picks.
- `importFromUrl()` lets a file be imported from a link. The server fetches it, in parts when the file is large, after checking that the address is on the public internet.
- `camera()`, `microphone()` and `screenCapture()` let a file be taken or recorded on the spot.
- `php artisan fluppy:doctor` checks everything a large upload passes through: Livewire's limit, PHP's and the web server's, and the bucket's CORS and lifecycle rules.
- `php artisan fluppy:prune` removes what unfinished uploads left behind. Schedule it daily.
- When the temporary and the final disk are both S3, a file is copied inside S3 on save, within a bucket or from one to another, instead of passing through the server.
- A file that is too large or too small is turned away before it is sent, with the reason shown on the file.
- `reorderable()` lets files be put in order by dragging one onto another.
- The field no longer leaves a listener behind when it is removed from the page, which raised an error on the next theme change.
- A file that was uploaded but not saved yet is still shown when the field is drawn again, for instance after being hidden and shown.
- The upload field is shown in the app's locale, loading the matching Uppy locale pack on demand.
