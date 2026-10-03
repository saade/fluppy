<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Uploads\ChunkedUpload;
use Saade\Fluppy\Uploads\RemoteTransfer;

class RemoteController
{
    protected const WHOLE_FILES_A_MINUTE = 60;

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

            // A chunk or a part asked for again takes the place of the one
            // before it. A file fetched whole is stored anew each time, so
            // it is held to the rate Livewire holds its own uploads to.
            $key = 'fluppy-remote-whole:' . sha1($request->session()->getId());

            if (RateLimiter::tooManyAttempts($key, static::WHOLE_FILES_A_MINUTE)) {
                abort(429, headers: ['Retry-After' => RateLimiter::availableIn($key)]);
            }

            RateLimiter::hit($key, 60);

            return $transfer->fetchWhole();
        } catch (SourceException $exception) {
            abort(422, $exception->getMessage());
        }
    }
}
