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
| `camera(bool \| Closure $condition)` | Lets a picture or a video be taken with the device's camera. |
| `microphone(bool \| Closure $condition)` | Lets audio be recorded with the device's microphone. |
| `screenCapture(bool \| Closure $condition)` | Lets the screen, a window or a browser tab be recorded. |
| `imageEditor(bool \| Closure $condition)` | Lets an uploaded image be cropped, rotated and flipped. See [Editing images](#editing-images). |
| `openable(bool \| Closure $condition)` | Makes the picture of a stored file a link that opens it in a new tab. |
| `downloadable(bool \| Closure $condition)` | Gives a stored file a download button. |
| `previewable(bool \| Closure $condition)` | Whether images are shown as pictures. On by default. |
| `height(int \| Closure $height)` | How tall the field is, in pixels. 320 by default. |
| `modal(bool \| Closure $condition)` | Shows a button and a list of files in the form, and opens Uppy over the page. See [Layout](#layout). |
| `deletable(bool \| Closure $condition)` | Whether a file can be removed. |
| `disabled()` | Shows the files without letting them change. |

It works where `FileUpload` does: pages, modals and slide-overs, repeaters and builder blocks, relation managers, table actions, live forms and panels in SPA mode.

## Camera, microphone and screen

```php
FluppyField::make('photo')
    ->image()
    ->camera()
```

Each one adds a button next to "My Device". What is taken or recorded is uploaded like any other file, and has to pass the same rules.

- A field that only accepts images takes pictures and does not record videos; one that only accepts videos does the opposite.
- The script of a source is loaded only by fields that have it on.
- Browsers give access to the camera, the microphone and the screen on HTTPS pages only (and on `localhost`), and ask the person for it the first time. If your app sends a `Permissions-Policy` header, it has to allow `camera`, `microphone` and `display-capture` for your own origin.

## Importing from a link

```php
FluppyField::make('video')
    ->importFromUrl()
```

This adds a "Link" button. The person pastes the address of a file, and **your server fetches it**: the file never passes through their device. Once fetched it is a temporary upload like any other, and has to pass the field's rules and Livewire's.

- A large file is fetched in parts of 5 MB, each in a short request the browser asks for, so neither a queue nor a long-running request is needed, and the import shows its progress and can be paused. Set the size of a part with `fluppy.remote.part_size`, in kilobytes.
- A server that does not answer range requests, or does not say how large the file is, gives the file whole, in one request. That request has to finish within PHP's `max_execution_time` and within `fluppy.remote.timeout` (60 seconds), and shows no progress until it is done.
- With S3 as the temporary disk, each part goes from your server to the bucket as a part of a multipart upload.

Fetching an address someone typed is a way to make your server reach places only it can reach, so the address is checked before anything is requested from it:

- Only `http` and `https`, on ports 80 and 443 (`fluppy.remote.url.ports`), and without a user name or password in the address.
- Every address the host name resolves to has to be on the public internet. Loopback, private and link-local addresses are refused, which includes the metadata address of cloud providers.
- The connection is made to the address that was checked, so the name cannot answer differently a moment later.
- A redirect is checked the same way before it is followed, five at most.
- Only IPv4 is looked up: a file on a host with no IPv4 address cannot be imported.
- It needs PHP's cURL extension, which is what lets a connection be made to a chosen address.

To only allow some hosts, list them in `fluppy.remote.url.hosts`; `*` matches any part of a name:

```php
// config/fluppy.php
'remote' => [
    'url' => [
        'hosts' => ['files.example.com', '*.cdn.example.com'],
    ],
],
```

The route that fetches is only of use to the session a field planned an import for, and is throttled (`fluppy.remote.throttle`, 600 requests a minute). The same limit holds what one session can make a field ask of sources, and a file fetched whole is held to 60 a minute, the rate Livewire allows uploads at.

One thing to weigh before opening a field with remote sources to people you do not know: a part is fetched while a request waits, so a slow host keeps one of your PHP workers busy for up to `fluppy.remote.timeout` seconds. Lower the timeout, or list the hosts you allow, if that matters to you.

## Google Drive

```php
FluppyField::make('attachments')
    ->multiple()
    ->googleDrive()
```

This adds a "Google Drive" button that opens [Google's own Picker](https://developers.google.com/workspace/drive/picker/guides/overview). The person signs in to Google in a window Google opens, picks files, and your server fetches each one from Google, in parts when it is large.

It needs three values from a project in the [Google Cloud console](https://console.cloud.google.com/):

1. Enable the **Google Picker API** and the **Google Drive API** for the project.
2. Set up the OAuth consent screen with the scope `https://www.googleapis.com/auth/drive.file`.
3. Create an **OAuth client ID** of the type "Web application", with your app's origin (`https://your-app.com`) under "Authorized JavaScript origins". Google only signs a person in from an origin listed there, so every address the app is opened at needs its own entry. No redirect address is needed.
4. Create an **API key**. If you restrict it to some APIs, the Picker API has to be one of them. Check the key's restrictions first when the Picker opens saying "The API developer key is invalid".
5. The **app ID** is the project number, shown on the project's dashboard.

```dotenv
FLUPPY_GOOGLE_CLIENT_ID=1234567890-abc.apps.googleusercontent.com
FLUPPY_GOOGLE_API_KEY=AIza...
FLUPPY_GOOGLE_APP_ID=1234567890
```

None of the three is a secret: Google's scripts need them in the page. A field with `googleDrive()` on raises an exception while any of them is missing.

What to know:

- **Your app only ever reaches the files a person picks.** That is what the `drive.file` scope means, and why this uses the Picker and not a file browser of Uppy's own, which would need access to the whole Drive.
- There is no client secret and nothing is stored. The access token Google gives the browser is kept there for the tab's session, sent to your server with each picked file, and used to fetch that file. What your server sends back of it is encrypted. It lasts about an hour: a file still being fetched after that fails, saying access expired.
- Documents made in Google's editors have no file of their own and are exported: Docs as `.docx`, Sheets as `.xlsx`, Slides as `.pptx`, Drawings as `.png`, anything else as a PDF. An export is fetched whole, in one request, and Google does not export documents larger than 10 MB. A field that only accepts some types holds a document to them as the file it will be exported to: one that accepts `.docx` takes a Google Doc, and one that only accepts images does not.
- How large a picked file is only shows once its upload starts: the Picker does not say. A file larger than the field or Livewire allows is turned away then.
- The Picker and Google's sign-in are loaded from `apis.google.com` and `accounts.google.com`. If your app sends a `Content-Security-Policy` header, it has to allow those scripts and the frames Google opens.

## Google Photos

```php
FluppyField::make('photos')
    ->multiple()
    ->googlePhotos()
```

This adds a "Google Photos" button that opens [Google's own Photos picker](https://developers.google.com/photos/picker/guides/get-started-picker) in a window. The person signs in, picks photos and videos there, and your server fetches each one from Google, in parts when it is large.

It uses the same Google Cloud project and OAuth client as Google Drive, with two additions:

1. Enable the **Google Photos Picker API** for the project.
2. Add the scope `https://www.googleapis.com/auth/photospicker.mediaitems.readonly` to the OAuth consent screen.

```dotenv
FLUPPY_GOOGLE_CLIENT_ID=1234567890-abc.apps.googleusercontent.com
```

It needs the client ID alone: no API key, no app ID. To use another client than Google Drive's, set `fluppy.remote.google_photos.client_id`.

What to know:

- As with Google Drive, your app only reaches what a person picks, there is no client secret, and nothing is stored: the token Google gives the browser comes to your server with each item and is used to fetch it.
- Google serves a picked item from an address that comes with it and is good for an hour. Your server only asks at an address on Google's own host for what people upload, through the same guard as a link a person typed, and does not send the token on if Google redirects elsewhere.
- Photos come as the original file. What an item is called and what type it is are what the picker says, where Google's answer for the file does not say.

## Dropbox

```php
FluppyField::make('attachments')
    ->multiple()
    ->dropbox()
```

This adds a "Dropbox" button. The first time, it asks the person to connect: a window opens on Dropbox, they let your app in, and the window closes. From then on the button opens a browser of their files, inside the field, where they pick files or whole folders. Your server fetches what they pick from Dropbox, in parts when a file is large.

It needs an app in the [Dropbox App Console](https://www.dropbox.com/developers/apps):

1. Create an app with scoped access.
2. Under "Permissions", turn on `account_info.read`, `files.metadata.read` and `files.content.read`.
3. Under "Settings", add the redirect address `https://your-app.com/fluppy/sources/dropbox/callback`. Dropbox only sends a person back to an address listed there, so every address the app is opened at needs its own entry.
4. Copy the app key and the app secret:

```dotenv
FLUPPY_DROPBOX_CLIENT_ID=your-app-key
FLUPPY_DROPBOX_CLIENT_SECRET=your-app-secret
```

A field with `dropbox()` on raises an exception while either is missing.

What to know:

- **The tokens stay on your server.** Dropbox's answer is traded for tokens by your server, which keeps them in the person's session, encrypted with your app's key. Nothing of them reaches the browser, and they are gone when the session ends. "Log out", in the file browser, also tells Dropbox to stop honoring them.
- To keep a connection longer than a session, bind your own `Saade\Fluppy\Sources\Support\TokenStore` in a service provider: three methods, `get()`, `put()` and `forget()`, each given the id of the source.
- Connecting is OAuth's authorization code flow with PKCE. The answer has to carry a random value your server put in the session when the window was opened, so a link cannot connect somebody's session to an account of another person's choosing.
- The two addresses a person connects through (`fluppy/sources/{source}/connect` and `/callback`) are open to guests, because a field can be on a public form. All a guest can do there is connect their own account to their own session, where nothing uses it. To keep them to people who are signed in, set `fluppy.remote.connect_middleware` to `['auth']`, or `['auth:admin']` for another guard.
- Dropbox does not say what type a file is, so the type is worked out from the file's name. That is what a field that only accepts some types goes by when it greys files out in the browser. The file itself is still checked by your rules once it is fetched.

## OneDrive

```php
FluppyField::make('attachments')
    ->multiple()
    ->oneDrive()
```

OneDrive works the way Dropbox does: a "OneDrive" button, a window to connect the first time, then a browser of the person's files inside the field. Everything said above about where the tokens are kept applies to it too.

It needs an app registered in [Microsoft Entra](https://entra.microsoft.com/) (App registrations, New registration):

1. Choose which accounts may sign in. That choice has to agree with the tenant below.
2. Add a redirect address of the type "Web": `https://your-app.com/fluppy/sources/onedrive/callback`.
3. Under "API permissions", add the delegated Microsoft Graph permissions `Files.Read`, `User.Read` and `offline_access`.
4. Under "Certificates & secrets", create a client secret, and copy its value. Copy the application (client) ID from the overview.

```dotenv
FLUPPY_ONEDRIVE_CLIENT_ID=00000000-0000-0000-0000-000000000000
FLUPPY_ONEDRIVE_CLIENT_SECRET=the-value-of-the-secret
FLUPPY_ONEDRIVE_TENANT=common
```

The tenant is `common` unless you set it: personal, work and school accounts alike. Use `consumers` for personal accounts only, `organizations` for work and school ones, or the ID or domain of one organization to let only its people in.

What to know:

- Microsoft does not send a file from the place it is asked at. It answers with an address that is good for a few minutes, on a host of its choosing, and your server fetches the file from there. That address is checked like a link a person typed (public internet only, the connection made to the address that was checked) and is never sent the person's token. The hosts you allow links from in `fluppy.remote.url.hosts` do not apply to it.
- A client secret in Entra expires (the portal offers up to two years). When it has, connecting fails until you set a new one.
- Only what is in the person's own OneDrive is listed. Notebooks and other items that are neither a file nor a folder are left out.

## Box

```php
FluppyField::make('attachments')
    ->multiple()
    ->box()
```

Box works the way Dropbox and OneDrive do: a button, a window to connect the first time, then a browser of the person's files inside the field, with the tokens kept on your server.

It needs a custom app in the [Box Developer Console](https://app.box.com/developers/console):

1. Press "New App" and choose the app type "User", the one for apps where people link their own Box accounts. A "Server" app, which is what a new developer account starts with, has nowhere to put a redirect address and cannot be used for this.
2. Under "Configuration", add the redirect address `https://your-app.com/fluppy/sources/box/callback`.
3. Under "Application Scopes", "Content Actions", keep both "Read all files and folders stored in Box" and "Write all files and folders stored in Box" ticked. Box's console says of the second that it is needed to download files. Fluppy never writes to a person's Box.
4. Copy the client ID and the client secret:

```dotenv
FLUPPY_BOX_CLIENT_ID=your-client-id
FLUPPY_BOX_CLIENT_SECRET=your-client-secret
```

What to know:

- Like Microsoft, Box answers a download with a short-lived address on another host. Your server fetches from there, through the same guard as a link a person typed, and does not send the person's token along.
- Box does not say what type a file is, so the type is worked out from the file's name, as for Dropbox.
- Bookmarks, which Box lists among files, are left out.

## Editing images

```php
FluppyField::make('photos')
    ->image()
    ->multiple()
    ->imageEditor()
```

An uploaded image gets an edit button, which opens [Uppy's image editor](https://uppy.io/docs/image-editor/): crop, rotate, flip and zoom. Saving uploads the edited image in the place of the one it was made from. An image that was already stored can be edited too; it is fetched into the browser first, so its address has to be readable from your app's origin.

The editor is Uppy's, not the one `FileUpload` has, so only part of Filament's editor options carry over:

| Option | Effect |
| ------ | ------ |
| `imageEditor()` | Turns the editor on. Its script is loaded only by fields that have it. |
| `imageEditorAspectRatioOptions()` | Limits the crop shapes offered. Uppy has three: a square (`1:1`), `16:9` and `9:16`. Any other ratio in the list is left out. |
| `automaticallyCropImagesToAspectRatio()` | The editor only crops to that ratio. The image is not cropped by itself: the person has to open the editor. |

These have no effect: `imageEditorMode()`, `imageEditorViewportWidth()` and `imageEditorViewportHeight()`, `imageEditorEmptyFillColor()`, `circleCropper()`, and automatic resizing.

## Opening and downloading

`openable()` makes the picture of a stored file a link that opens it in a new tab, and `downloadable()` gives it a download button. Both use the file's address on its disk, or the one you give with `getOpenableFileUrlUsing()` and `getDownloadableFileUrlUsing()`.

## Layout

By default Uppy is drawn in the form, 320 pixels tall. `height()` changes that, which gives the image editor more room:

```php
FluppyField::make('photo')
    ->image()
    ->imageEditor()
    ->height(480)
```

`modal()` keeps the field small instead. The form shows a button and the list of the field's files, each with its size or its progress and a button to remove it; the button opens Uppy over the page, where files are added, edited and put in order:

```php
FluppyField::make('attachments')
    ->multiple()
    ->modal()
```

The modal closes with its close button, the Escape key or a click outside it, and can be opened from a field that is itself inside one of Filament's modals.

## Spatie's media library

With [Filament's media library plugin](https://filamentphp.com/plugins/filament-spatie-media-library) installed, use `SpatieMediaLibraryFluppyField` where you would use `SpatieMediaLibraryFileUpload`. It is that field, with the same options, and everything on this page applies to it:

```bash
composer require filament/spatie-laravel-media-library-plugin
```

```php
use Saade\Fluppy\Forms\Components\SpatieMediaLibraryFluppyField;

SpatieMediaLibraryFluppyField::make('attachments')
    ->collection('attachments')
    ->multiple()
```

One thing differs. The plugin's field reads each uploaded file into memory to hand it to the media library, which a large file does not fit in. This one points the media library at the file on the temporary disk, and the library copies it from there as a stream.

## Not supported yet

These `FileUpload` options belong to FilePond's interface and have no effect on `FluppyField`:

- Automatic cropping and resizing of images, and the editor options listed above.
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

- **CORS.** The bucket has to accept `PUT` from your app's origin, as it already does for Livewire's own uploads to S3. It does not have to expose the `ETag` header: the parts are read back from S3 when the upload is completed. Allow your own origin rather than every one:

  ```json
  [
      {
          "AllowedOrigins": ["https://your-app.com"],
          "AllowedMethods": ["PUT"],
          "AllowedHeaders": ["*"],
          "MaxAgeSeconds": 3000
      }
  ]
  ```

- **Permissions.** The credentials of the temporary disk need no more than this on the temporary bucket. `s3:ListBucketMultipartUploads`, on the bucket itself, is only used by `fluppy:doctor`.

  ```json
  {
      "Effect": "Allow",
      "Action": [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:AbortMultipartUpload",
          "s3:ListMultipartUploadParts"
      ],
      "Resource": "arn:aws:s3:::your-temporary-bucket/livewire-tmp/*"
  }
  ```
- **Part size.** `fluppy.chunking.s3_part_size`, in kilobytes. `chunkSize()` and `chunk_size` are for chunks that go through PHP and do not apply here.
- **Abandoned uploads.** Removing a file aborts its upload in S3. One that is abandoned (the tab was closed) stays in the bucket, and is billed, until it is aborted. [`fluppy:prune`](#cleaning-up) aborts the ones it knows about; also add a lifecycle rule to the bucket that aborts incomplete multipart uploads after a day or so, which catches the rest and removes temporary files nobody saved.
- Requires `league/flysystem-aws-s3-v3`, as S3 disks do.

### S3-compatible services

Anything Laravel's `s3` driver talks to should work, since only standard multipart calls and presigned addresses are used. Tried so far:

| Service | Notes |
| ------- | ----- |
| Cloudflare R2 | Works, including the copy on save. Use `'region' => 'auto'` and `'use_path_style_endpoint' => true`. A new bucket has no CORS rules: add the one above. R2 already aborts incomplete multipart uploads after 7 days. |
| MinIO | Works, including the copy on save. It allows every origin by itself, and has no per-bucket CORS or lifecycle rules to read. |

`fluppy:doctor` cannot read a bucket's CORS and lifecycle rules with a key that may only read and write objects. It says so, and uploads are not affected.

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
| `.fi-fluppy-reorderable` | The field, when its files can be put in order. |
| `.fi-fluppy-summary` | What a field shown as a modal has in the form: its button and its files. |
| `.fi-fluppy-summary-files`, `.fi-fluppy-summary-file` | The list of files, and one of them. |
| `.fi-fluppy-summary-file-name`, `.fi-fluppy-summary-file-status` | The name of a file, and its size, progress or error. |
| `.fi-fluppy-summary-file-failed` | A file that could not be uploaded. |
| `.fi-fluppy-modal` | The element at the end of the page that holds Uppy for a field shown as a modal. It also has `.fi-fluppy`. |

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

Some of the tests drive a real browser, which has to be installed once:

```bash
npm install
npx playwright install chromium
```

To run only the others: `vendor/bin/pest --testsuite=Feature`.

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
