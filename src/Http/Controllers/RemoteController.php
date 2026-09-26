<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Http\Request;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Uploads\ChunkedUpload;
use Saade\Fluppy\Uploads\RemoteTransfer;

class RemoteController
{
    /**
     * @return array<string, mixed>
     */
    public function __invoke(Request $request): array
    {
        abort_unless($request->hasValidRelativeSignature(), 401);

        $transfer = RemoteTransfer::unseal($request->input('sealed'));

        abort_if($transfer === null, 403, 'Invalid remote upload reference.');

        try {
            if ($request->has('index')) {
                $upload = ChunkedUpload::fromCapability($request->input('capability'));

                abort_if($upload === null, 403, 'Invalid remote upload reference.');

                return $transfer->fetchChunk($upload, $request->integer('index'));
            }

            if ($request->has('part')) {
                return $transfer->fetchPart($request->input('capability'), $request->integer('part'));
            }

            return $transfer->fetchWhole();
        } catch (SourceException $exception) {
            abort(422, $exception->getMessage());
        }
    }
}
