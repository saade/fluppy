<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Contracts\Cache\Lock;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Saade\Fluppy\Uploads\ChunkedUpload;
use Throwable;

class ChunkController
{
    /**
     * @return array<string, mixed>
     */
    public function __invoke(Request $request): array
    {
        abort_unless($request->hasValidRelativeSignature(), 401);

        $upload = ChunkedUpload::fromCapability($request->input('capability'));

        abort_if($upload === null, 403, 'Invalid chunked upload reference.');

        if ($reference = $upload->completedReference()) {
            return ['complete' => true, 'reference' => $reference];
        }

        $request->validate([
            'index' => ['required', 'integer', 'min:0', 'max:' . ($upload->totalChunks - 1)],
            'chunk' => ['required', 'file'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
        ]);

        $index = $request->integer('index');
        $chunk = $request->file('chunk');

        abort_unless($chunk->getSize() === $upload->expectedChunkSize($index), 422, 'The chunk is not the size that was planned.');

        $upload->storeChunk($index, $chunk);

        if (count($received = $upload->receivedChunks()) < $upload->totalChunks) {
            return ['complete' => false, 'received' => $received];
        }

        return $this->assembleOnce($upload, $request->string('name')->value(), $request->input('type'));
    }

    /**
     * Two requests can each believe they brought the last chunk (parallel
     * chunks, a second tab). Only one may assemble: the other would find the
     * chunks half deleted.
     *
     * @return array<string, mixed>
     */
    protected function assembleOnce(ChunkedUpload $upload, string $name, ?string $type): array
    {
        $lock = $this->lock($upload);

        try {
            $lock?->block(15);
        } catch (LockTimeoutException) {
            return ['complete' => false, 'received' => $upload->receivedChunks()];
        }

        try {
            if ($reference = $upload->completedReference()) {
                return ['complete' => true, 'reference' => $reference];
            }

            abort_unless($upload->hasAllChunks(), 422, 'The chunked upload is incomplete.');

            return ['complete' => true, 'reference' => $upload->assemble($name, $type)];
        } finally {
            $lock?->release();
        }
    }

    /**
     * Not every cache store has locks. Without one, the remembered answer
     * and the check for missing chunks are what is left.
     */
    protected function lock(ChunkedUpload $upload): ?Lock
    {
        try {
            return Cache::lock("fluppy-assemble:{$upload->fingerprint}", 60);
        } catch (Throwable) {
            return null;
        }
    }
}
