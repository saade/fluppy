# Changelog

All notable changes to `fluppy` will be documented in this file.

## v1.0.0 - 2026-10-12

<p align="center">
    <img src="https://raw.githubusercontent.com/saade/fluppy/1.x/art/cover.png" alt="Fluppy: the last upload field your Filament app will need" width="800" />
</p>
This is the first release of Fluppy 🎉

Fluppy is [Uppy](https://uppy.io) as a Filament form field. It extends Filament's own `FileUpload`, so your validation rules, disks and options keep working the way you already know them. You change one word:

```php
use Saade\Fluppy\Forms\Components\FluppyField;

FluppyField::make('attachments')
    ->disk('public')
    ->directory('attachments')
    ->multiple()

```
### What you get

- **Large files.** A file that is bigger than your server accepts in one request is uploaded in chunks, and can be paused, resumed and retried. If the tab is reloaded, selecting the same file again continues from where it stopped.
- **Straight to S3.** With S3 as Livewire's temporary disk, large files go to the bucket as multipart uploads, with the same pause and resume.
- **More places to get a file from.** The camera, the microphone, the screen, a URL, your application's own disks, Google Drive, Google Photos, Dropbox, OneDrive, Box, Zoom and Facebook. There's no Companion server to run: your Laravel app does the work.
- **Still a Filament field.** It follows your panel's colors, dark mode and locale, and works in modals, slide-overs, repeaters, builders, relation managers and table actions. `imageEditor()`, `reorderable()`, `openable()` and `downloadable()` do what you'd expect, and there's a `SpatieMediaLibraryFluppyField` for the media library plugin.
- **Two commands for the boring parts.** `php artisan fluppy:doctor` checks everything a large upload passes through (Livewire, PHP, your web server, the bucket's CORS rules), and `php artisan fluppy:prune` removes what unfinished uploads leave behind.

### Installing

Fluppy needs PHP 8.2 or later and Filament 4 or 5:

```bash
composer require saade/fluppy:"^1.0"

```
Its styles are compiled by your panel's custom theme, so add these lines to the theme's CSS file and rebuild your assets:

```css
@import '../../../../vendor/saade/fluppy/resources/css/fluppy.css';

@source '../../../../vendor/saade/fluppy/resources/views/**/*.blade.php';

```
Everything else is in the [README](https://github.com/saade/fluppy#readme), including how to set up each source and what to check before allowing large uploads.

### Fluppy Pro

Fluppy is free and MIT licensed. [Fluppy Pro](https://github.com/saade/fluppy-pro) is a paid package that builds on it, with AI image generation, sources you write yourself as a class and a Blade view, and ready-made ones for AI image editing, stock photos, icons, GIFs, signatures, QR codes, maps, templates and text to speech.

That's it. Try it, break it, and tell me what you find 💛

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
- A package can extend the field in the browser by overriding `getExtensions()`.
- The picture of an image with transparency keeps it, on a light checkered background, where Uppy's own turned what the image leaves empty black.
- `facebook()` lets a person connect their Facebook account and pick from their photos, by album.
- `zoom()` lets a person connect their Zoom account and pick from its cloud recordings, listed by month.
- `googlePhotos()` lets photos and videos be picked from Google Photos, in Google's own picker.
- `box()` and `oneDrive()` do for Box and OneDrive what `dropbox()` does for Dropbox. OneDrive takes personal, work and school accounts.
- `dropbox()` lets a person connect their Dropbox and pick files from it, in a file browser inside the field. The tokens are kept on the server, in the session.
- `googleDrive()` lets files be picked from Google Drive, in Google's own Picker. The server fetches them from Google, and only ever reaches the files a person picks.
- `importFromDisk()` lets files be picked from one of the application's own disks, in a file browser inside the field. Its search looks through the folders below the open one, on the server, and `filterUsing` decides which files and folders are listed. A button changes the list into a grid with a picture of each image. The server copies what is picked, in parts when a file is large.
- `importFromUrl()` lets a file be imported from a link. The server fetches it, in parts when the file is large, after checking that the address is on the public internet.
- `camera()`, `microphone()` and `screenCapture()` let a file be taken or recorded on the spot.
- `php artisan fluppy:doctor` checks everything a large upload passes through: Livewire's limit, PHP's and the web server's, and the bucket's CORS and lifecycle rules.
- `php artisan fluppy:prune` removes what unfinished uploads left behind. Schedule it daily.
- When the temporary and the final disk are both S3, a file is copied inside S3 on save, within a bucket or from one to another, instead of passing through the server.
- A file that is too large or too small is turned away before it is sent, with the reason shown on the file.
- `reorderable()` lets files be put in order by dragging one onto another.
- The field no longer leaves a listener behind when it is removed from the page, which raised an error on the next theme change.
- A file that was uploaded but not saved yet is still shown when the field is drawn again, for instance after being hidden and shown.
- The upload field is shown in the app's locale, with the matching Uppy locale pack.
