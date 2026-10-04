<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for the host Google serves picked photos and videos from. It
 * gives an item whole or by range, to who brings the token and to nobody
 * else, and says what the item is the way Google's own answer does.
 */
class FakeGooglePhotos
{
    public const TOKEN = 'ya29.a-token-from-the-photos-picker';

    public const HOST = 'lh3.googleusercontent.com';

    public static function address(string $id): string
    {
        return 'https://' . static::HOST . "/ppa/{$id}=d";
    }

    /**
     * @param  array<string, array<string, mixed>>  $items  By id: `contents`, `type`, and `name` when Google says what the item is called, or `redirect` for an address it sends the request on to.
     */
    public static function serve(array $items): void
    {
        Http::fake(function (Request $request) use ($items) {
            if (! preg_match('#^https://' . preg_quote(static::HOST, '#') . '/ppa/([^=]+)=d$#', $request->url(), $matches)) {
                return Http::response('elsewhere', 200, ['Content-Type' => 'text/plain']);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::TOKEN) {
                return Http::response('', 401);
            }

            $item = $items[$matches[1]] ?? null;

            if ($item === null) {
                return Http::response('', 404);
            }

            if (isset($item['redirect'])) {
                return Http::response('', 302, ['Location' => $item['redirect']]);
            }

            $headers = [
                'Content-Type' => $item['type'],
                ...(isset($item['name']) ? ['Content-Disposition' => "attachment; filename=\"{$item['name']}\""] : []),
            ];

            if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
                return Http::response(
                    substr($item['contents'], (int) $range[1], (int) $range[2] - (int) $range[1] + 1),
                    206,
                    [...$headers, 'Content-Range' => "bytes {$range[1]}-{$range[2]}/" . strlen($item['contents'])],
                );
            }

            return Http::response($item['contents'], 200, [...$headers, 'Content-Length' => (string) strlen($item['contents'])]);
        });
    }
}
