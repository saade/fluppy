<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Http\Request;
use Saade\Fluppy\Uploads\ChunkedUpload;

/**
 * Answers `fluppy:doctor`, which runs on the command line, where PHP may be
 * configured differently than it is behind the web server. The command sends
 * a chunk here and is told what arrived and what the limits are.
 *
 * Only reachable with an address the application signed.
 */
class DoctorController
{
    /**
     * @return array<string, mixed>
     */
    public function __invoke(Request $request): array
    {
        abort_unless($request->hasValidRelativeSignature(), 401);

        return [
            'received' => $request->file('chunk')?->getSize(),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'chunk_size' => ChunkedUpload::chunkSizeFor(0),
        ];
    }
}
