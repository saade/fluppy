<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Google Drive's API: it answers what it is told of each file,
 * exports a document as a line that names the type, and gives the bytes of a
 * file whole or by range. Only to who brings the token.
 */
class FakeGoogleDrive
{
    public const TOKEN = 'ya29.a-token-from-the-picker';

    /**
     * @param  array<string, array<string, mixed>>  $files  What Google says of each file, by id, and its `contents`.
     */
    public static function serve(array $files): void
    {
        Http::fake(function (Request $request) use ($files) {
            if (! preg_match('#^https://www\.googleapis\.com/drive/v3/files/([^/?]+)(/export)?\?(.*)$#', $request->url(), $matches)) {
                return Http::response('', 500);
            }

            if ($request->header('Authorization')[0] !== 'Bearer ' . static::TOKEN) {
                return Http::response(['error' => ['code' => 401]], 401);
            }

            [, $id, $isExport, $query] = $matches;

            parse_str($query, $query);

            if (! isset($files[$id])) {
                return Http::response(['error' => ['code' => 404]], 404);
            }

            $contents = $files[$id]['contents'] ?? '';

            if ($isExport) {
                return Http::response("exported as {$query['mimeType']}", 200);
            }

            if (($query['alt'] ?? null) !== 'media') {
                return Http::response(['id' => $id, ...array_diff_key($files[$id], ['contents' => true])]);
            }

            if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
                return Http::response(substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1), 206);
            }

            return Http::response($contents, 200);
        });
    }
}
