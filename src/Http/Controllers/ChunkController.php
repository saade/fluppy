<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Http\Request;
use Saade\Fluppy\Uploads\ChunkedUpload;

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
            'name' => ['required', 'string'],
            'type' => ['nullable', 'string', 'max:255'],
        ]);

        $index = $request->integer('index');
        $chunk = $request->file('chunk');

        abort_unless($upload->storeChunk($index, $chunk), 422, 'The chunk is not the size that was planned.');

        return $upload->answer(mb_substr(basename($request->string('name')->value()), 0, 255), $request->input('type'));
    }
}
