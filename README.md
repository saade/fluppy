# Fluppy

[![Latest Version on Packagist](https://img.shields.io/packagist/v/saade/fluppy.svg?style=flat-square)](https://packagist.org/packages/saade/fluppy)
[![Total Downloads](https://img.shields.io/packagist/dt/saade/fluppy.svg?style=flat-square)](https://packagist.org/packages/saade/fluppy)
[![Tests](https://img.shields.io/github/actions/workflow/status/saade/fluppy/run-tests.yml?branch=1.x&label=tests&style=flat-square)](https://github.com/saade/fluppy/actions/workflows/run-tests.yml)

Fluppy for Filament

# Version compatibility

| Plugin | Filament | Install                                            |
| ------ | -------- | -------------------------------------------------- |
| 1.x    | 4.x, 5.x | `composer require saade/fluppy:"^1.0"` |

# Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Large files](#large-files)
- [Styling](#styling)
- [Translations](#translations)
- [Testing](#testing)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Credits](#credits)
- [License](#license)

# Installation

1. Install the package via composer:

```bash
composer require saade/fluppy:"^1.0"
```

2. Add the plugin's styles to your panel's [custom theme](https://filamentphp.com/docs/5.x/styling/overview#creating-a-custom-theme). If the panel does not have a custom theme yet, create one first by following the Filament docs.

```css
@import '../../../../vendor/saade/fluppy/resources/css/fluppy.css';

@source '../../../../vendor/saade/fluppy/resources/views/**/*.blade.php';
```

Then rebuild your assets with `npm run build`.

# Usage

`FluppyField` is Filament's [file upload field](https://filamentphp.com/docs/5.x/forms/file-upload) with [Uppy](https://uppy.io) as its interface. Use it where you would use `FileUpload`:

```php
use Saade\Fluppy\Forms\Components\FluppyField;

FluppyField::make('attachments')
    ->disk('public')
    ->directory('attachments')
    ->multiple()
```

Files are uploaded through Livewire, validated and stored the same way as with `FileUpload`.

# Options

`FluppyField` extends `FileUpload`, so its options are the same and each accepts a closure. These are the ones the field acts on so far:

| Method | Description |
| ------ | ----------- |
| `disk()`, `directory()`, `visibility()` and the other storage options | Where and how files are stored. |
| `multiple()`, `maxFiles(int \| Closure $count)` | Whether several files can be chosen, and how many. |
| `acceptedFileTypes(array \| Closure $types)`, `image()` | The types of file that can be chosen. |
| `maxSize(int \| Closure $size)`, `minSize(int \| Closure $size)` | The size a file can have, in kilobytes. |
| `maxParallelUploads(int \| Closure $count)` | How many files are uploaded at once. 2 by default. |
| `reorderable(bool \| Closure $condition)` | Lets files be put in order by dragging one onto another. |
| `deletable(bool \| Closure $condition)` | Whether a file can be removed. |
| `disabled()` | Shows the files without letting them change. |

It works where `FileUpload` does: pages, modals and slide-overs, repeaters and builder blocks, relation managers, table actions, live forms and panels in SPA mode.

## Not supported yet

These `FileUpload` options belong to FilePond's interface and have no effect on `FluppyField`:

- The image editor, and automatic cropping and resizing of images.
- `openable()`, `downloadable()` and `previewable(false)`.
- `avatar()`, `panelLayout()`, `appendFiles()`, `prependFiles()` and the options that position buttons and indicators.

# Large files

A file larger than one chunk (900 KB by default) is sent in chunks, each in a request of its own, and put together on Livewire's temporary disk. From there it is an ordinary temporary upload: it is validated and stored the same way as any other. So a file can be larger than PHP or the web server accept in one request, and an upload can be paused, resumed and retried. A file chosen again after the page was reloaded continues from the chunks that already arrived.

Nothing has to be set up for this, but one limit is yours to raise: **Livewire's rule for temporary uploads allows 12 MB by default**, and it applies to the assembled file. Set it in `config/livewire.php` to the largest file your app should accept:

```php
'temporary_file_upload' => [
    'rules' => ['required', 'file', 'max:1048576'], // 1 GB, in kilobytes
],
```

A file over that limit, or outside the field's `maxSize()` and `minSize()`, is turned away before any of it is sent, with the reason shown on the file.

| Method | Description |
| ------ | ----------- |
| `chunked(bool \| Closure $condition)` | Whether large files are sent in chunks. On by default. |
| `chunkSize(int \| Closure $size)` | The size of a chunk, in kilobytes. |

To change the defaults for every field, publish the configuration:

```bash
php artisan vendor:publish --tag="fluppy-config"
```

```php
'chunking' => [
    'enabled' => true,
    'chunk_size' => 900, // kilobytes
    's3_part_size' => 5120, // kilobytes
    'throttle' => '600,1', // requests,minutes for the chunk route
],
```

## Choosing a chunk size

Each chunk still has to fit in one request:

- It is lowered automatically to what PHP's `upload_max_filesize` and `post_max_size` allow.
- The web server's limit cannot be read from PHP. nginx allows 1 MB unless `client_max_body_size` says otherwise, which is why the default is just under it. If you raise the chunk size, raise that limit with it, and the limit of any proxy or CDN in front.

Larger chunks mean fewer requests. With the default throttle of 600 chunks a minute, 900 KB chunks top out at about 9 MB per second.

A file no larger than one chunk goes to Livewire in a single request, as with `FileUpload`.

## Checking your setup

```bash
php artisan fluppy:doctor
```

It looks at everything a large upload passes through and says what would stop one:

- the largest file Livewire's rules allow, and whether that is still the 12 MB default;
- the chunk size, and whether it was lowered to fit PHP. It asks the running app for PHP's limits, since PHP on the command line can be configured differently;
- whether a chunk of that size reaches the app, or the web server refuses it. It sends one to find out;
- with S3 as the temporary disk: that the bucket can be reached, how many multipart uploads are open, whether CORS allows `PUT` from your app, and whether a lifecycle rule aborts incomplete uploads;
- whether `fluppy:prune` is scheduled.

It exits with an error when something would make uploads fail, so it can run in a deployment.

| Option | Description |
| ------ | ----------- |
| `--disk=` | A disk your fields store files on, to see whether saving to it [copies inside S3](#saving-without-the-file-passing-through-the-server). Can be given more than once. |
| `--url=` | The address of the app as a browser reaches it, when it is not `APP_URL`. |

## Cleaning up

An upload that is never finished leaves its chunks on the temporary disk, or an open multipart upload in the bucket. Schedule the command that removes them:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('fluppy:prune')->daily();
```

It removes what has not changed for 24 hours (`--hours=` to change that): chunks, multipart uploads that were opened and never completed, and, off S3, temporary uploads that were never saved, the way Livewire removes its own.

## S3 as the temporary disk

When [Livewire's temporary disk is S3](https://livewire.laravel.com/docs/uploads#storing-uploaded-files-on-s3), the browser sends files straight to the bucket. A file larger than one part (5 MB, the least S3 accepts) is sent as a multipart upload: the server opens it and signs an address for each part, the browser sends the parts, and the server completes it. Pause, resume and retry work the same, and a file chosen again continues from the parts the bucket already has.

- **CORS.** The bucket has to accept `PUT` from your app's origin, as it already does for Livewire's own uploads to S3. It does not have to expose the `ETag` header: the parts are read back from S3 when the upload is completed.
- **Part size.** `fluppy.chunking.s3_part_size`, in kilobytes. `chunkSize()` and `chunk_size` are for chunks that go through PHP and do not apply here.
- **Abandoned uploads.** Removing a file aborts its upload in S3. One that is abandoned (the tab was closed) stays in the bucket, and is billed, until it is aborted. [`fluppy:prune`](#cleaning-up) aborts the ones it knows about; also add a lifecycle rule to the bucket that aborts incomplete multipart uploads after a day or so, which catches the rest and removes temporary files nobody saved.
- Requires `league/flysystem-aws-s3-v3`, as S3 disks do.

### Saving without the file passing through the server

`FileUpload` saves a file by reading it from the temporary disk and writing it to the final one, so the whole file passes through PHP. On a server with a time limit, such as a serverless function, a large file does not survive that.

When the temporary disk and the field's `disk()` are both S3, `FluppyField` has S3 copy the file itself, and nothing passes through your server, during the upload or on save. This needs no option, and works:

- within one bucket, and from one bucket to another;
- for files of any size: above 5 GB, the most S3 copies in one request, the copy is made in parts.

For a copy between two buckets, both disks have to be on the same S3 service (the same `endpoint`), and the credentials of the field's disk have to be allowed to read the temporary bucket. If S3 refuses the copy, the error is reported and the file is saved the usual way.

# Styling

The field is styled with your panel's `gray`, `primary`, `danger` and `success` colors and follows its light and dark mode.

Everything the package draws has a class that starts with `fi-fluppy`, to style from your theme. Uppy's own elements keep their `uppy-` classes, which you can style inside `.fi-fluppy`:

```css
.fi-fluppy .uppy-Dashboard-inner {
    @apply rounded-xl;
}
```

| Class | Element |
| ----- | ------- |
| `.fi-fluppy` | The field. |

# Translations

The field speaks your app's locale. Uppy's interface comes from its own [locale packs](https://uppy.io/docs/locales/), and the one that matches `app()->getLocale()` is loaded when the field is shown: `pt_BR` and `pt-BR` load Brazilian Portuguese, `pt` the first Portuguese pack, and a locale Uppy has no pack for falls back to English.

The messages the package adds itself are in its translation files. To change them, or to add a language, publish them:

```bash
php artisan vendor:publish --tag="fluppy-translations"
```

# Testing

```bash
composer test
```

# Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

# Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

# Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

# Credits

- [Saade](https://github.com/saade)
- [All Contributors](../../contributors)

# License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
