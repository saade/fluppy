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

## Upload limits

A file is sent to Livewire in one request, as with `FileUpload`, so it has to fit within the limits of every layer it passes through:

- PHP's `upload_max_filesize` and `post_max_size`.
- The web server's request size (`client_max_body_size` in nginx), and any proxy or CDN in front of it.
- Livewire's own rule for temporary uploads, 12 MB by default, set with `livewire.temporary_file_upload.rules`.

When Livewire's temporary disk is S3, the browser sends the file straight to the bucket and the first two do not apply.

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
