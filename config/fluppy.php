<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Chunked uploads
    |--------------------------------------------------------------------------
    |
    | A file larger than one chunk is sent to Livewire's temporary disk in
    | pieces, so it can be larger than a single request may be, and can be
    | paused, resumed and retried. The assembled file still has to pass
    | `livewire.temporary_file_upload.rules`, which allow 12 MB by default.
    |
    | `chunk_size` is in kilobytes. Each chunk is one request, so it has to
    | fit within PHP's `upload_max_filesize` and `post_max_size` (it is
    | lowered to fit them) and within the web server's request size, which
    | is 1 MB on an untouched nginx.
    |
    | When Livewire's temporary disk is S3, the browser sends the file to the
    | bucket as a multipart upload instead. `s3_part_size` is the size of a
    | part, in kilobytes; S3 accepts no less than 5 MB.
    |
    | `throttle` is the rate limit of the chunk route, as attempts,minutes.
    |
    */

    'chunking' => [
        'enabled' => true,
        'chunk_size' => 900,
        's3_part_size' => 5120,
        'throttle' => '600,1',
    ],

    /*
    |--------------------------------------------------------------------------
    | Remote sources
    |--------------------------------------------------------------------------
    |
    | A file from a remote source (a link, a cloud drive) is fetched by the
    | server, one part for each request the browser makes, into Livewire's
    | temporary disk. `part_size` is in kilobytes. No part is uploaded to
    | PHP, so its limits on uploads do not apply; what does is how long a
    | request may run, and `timeout`, the seconds one request to a source
    | may take.
    |
    | `url` is for files imported from a link. The server only fetches from
    | addresses on the public internet, on these `ports`. Set `hosts` to a
    | list of names (`*.example.com` matches any name under it) to fetch
    | from those and no others.
    |
    | `google_drive` is for files picked in Google's Picker. All three come
    | from a project in the Google Cloud console and are sent to the page:
    | none of them is a secret.
    |
    | `dropbox` is the app key and the app secret of an app in Dropbox's App
    | Console. The secret never leaves the server.
    |
    | `onedrive` is the client ID and a client secret of an app registered in
    | Microsoft Entra. `tenant` says which accounts may connect: `common` for
    | personal, work and school ones alike, `consumers` or `organizations`
    | for one kind, or the ID of one organization.
    |
    */

    'remote' => [
        'part_size' => 5120,
        'timeout' => 60,
        'throttle' => '600,1',
        'url' => [
            'ports' => [80, 443],
            'hosts' => null,
        ],
        'google_drive' => [
            'client_id' => env('FLUPPY_GOOGLE_CLIENT_ID'),
            'api_key' => env('FLUPPY_GOOGLE_API_KEY'),
            'app_id' => env('FLUPPY_GOOGLE_APP_ID'),
        ],
        'dropbox' => [
            'client_id' => env('FLUPPY_DROPBOX_CLIENT_ID'),
            'client_secret' => env('FLUPPY_DROPBOX_CLIENT_SECRET'),
        ],
        'onedrive' => [
            'client_id' => env('FLUPPY_ONEDRIVE_CLIENT_ID'),
            'client_secret' => env('FLUPPY_ONEDRIVE_CLIENT_SECRET'),
            'tenant' => env('FLUPPY_ONEDRIVE_TENANT', 'common'),
        ],
    ],

];
