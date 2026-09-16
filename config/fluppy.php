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
    | `throttle` is the rate limit of the chunk route, as attempts,minutes.
    |
    */

    'chunking' => [
        'enabled' => true,
        'chunk_size' => 900,
        'throttle' => '600,1',
    ],

];
