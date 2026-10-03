<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Box: its token endpoint, the calls of its API the package
 * makes, and the host a file is downloaded from, which the API only gives
 * the address of. It knows one account, and only answers who brings the
 * token it handed out last. Each renewal gives a new refresh token, as Box
 * does.
 */
class FakeBox
{
    public const CODE = 'a-code-from-box';

    public const DOWNLOAD_HOST = 'dl.boxcloud.com';

    public static int $tokensIssued = 0;

    /**
     * @param  array<string, array<string, array<string, mixed>>>  $folders  Items by id, by the id of the folder they are in (`0` for the top one). An item with `contents` is a file, one with `url` is a bookmark.
     * @param  int  $pageSize  How many items Box gives at once, whatever it is asked for.
     */
    public static function serve(array $folders = [], int $pageSize = 1000): void
    {
        static::$tokensIssued = 0;

        // Not flattened as a collection would: Box's ids are numbers, and
        // those are keys PHP would count again from zero.
        $items = array_reduce($folders, fn (array $items, array $folder): array => $items + $folder, []);

        Http::fake(function (Request $request) use ($folders, $items, $pageSize) {
            $url = strtok($request->url(), '?');

            parse_str((string) parse_url($request->url(), PHP_URL_QUERY), $query);

            if ($url === 'https://api.box.com/oauth2/token') {
                return static::token($request);
            }

            if ($url === 'https://api.box.com/oauth2/revoke') {
                return Http::response('', 200);
            }

            if (str_starts_with($url, 'https://' . static::DOWNLOAD_HOST . '/')) {
                return static::download($request, $items, $query);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::accessToken()) {
                return Http::response(['type' => 'error', 'status' => 401], 401);
            }

            return match (true) {
                $url === 'https://api.box.com/2.0/users/me' => Http::response(['type' => 'user', 'id' => '1', 'login' => 'person@example.com']),
                (bool) preg_match('#/2\.0/folders/(\d+)/items$#', $url, $folder) => isset($folders[$folder[1]])
                    ? Http::response([
                        'entries' => collect($folders[$folder[1]])->slice((int) $query['offset'], $pageSize)->map(fn (array $item, string $id): array => static::item($id, $item))->values()->all(),
                        'total_count' => count($folders[$folder[1]]),
                        'offset' => (int) $query['offset'],
                        'limit' => $pageSize,
                    ])
                    : Http::response(['type' => 'error', 'status' => 404], 404),
                (bool) preg_match('#/2\.0/files/(\d+)/content$#', $url, $file) => isset($items[$file[1]]['contents'])
                    ? Http::response('', 302, ['Location' => 'https://' . static::DOWNLOAD_HOST . "/d/1/{$file[1]}/download?pass=good-for-a-few-minutes"])
                    : Http::response(['type' => 'error', 'status' => 404], 404),
                (bool) preg_match('#/2\.0/files/(\d+)$#', $url, $file) => isset($items[$file[1]]['contents'])
                    ? Http::response(static::item($file[1], $items[$file[1]]))
                    : Http::response(['type' => 'error', 'status' => 404], 404),
                default => Http::response('', 500),
            };
        });
    }

    public static function accessToken(): string
    {
        return 'box.token-' . static::$tokensIssued;
    }

    public static function refreshToken(): string
    {
        return 'box.refresh-' . static::$tokensIssued;
    }

    protected static function token(Request $request): mixed
    {
        $isGoodCode = $request['grant_type'] === 'authorization_code' && $request['code'] === static::CODE;
        $isGoodRefresh = $request['grant_type'] === 'refresh_token' && $request['refresh_token'] === static::refreshToken();

        if ($request['client_id'] !== 'client-id' || $request['client_secret'] !== 'client-secret' || ! ($isGoodCode || $isGoodRefresh)) {
            return Http::response(['error' => 'invalid_grant'], 400);
        }

        static::$tokensIssued++;

        return Http::response([
            'access_token' => static::accessToken(),
            'refresh_token' => static::refreshToken(),
            'expires_in' => 3600,
        ]);
    }

    /**
     * @param  array<string, mixed>  $item
     * @return array<string, mixed>
     */
    protected static function item(string $id, array $item): array
    {
        return match (true) {
            isset($item['contents']) => ['type' => 'file', 'id' => $id, 'name' => $item['name'], 'size' => strlen($item['contents']), 'sha1' => sha1($item['contents']), 'modified_at' => '2026-10-01T10:00:00-07:00'],
            isset($item['url']) => ['type' => 'web_link', 'id' => $id, 'name' => $item['name'], 'url' => $item['url']],
            default => ['type' => 'folder', 'id' => $id, 'name' => $item['name']],
        };
    }

    /**
     * @param  array<string, array<string, mixed>>  $items
     * @param  array<string, mixed>  $query
     */
    protected static function download(Request $request, array $items, array $query): mixed
    {
        if ($request->hasHeader('Authorization') || ($query['pass'] ?? null) !== 'good-for-a-few-minutes') {
            return Http::response('', 401);
        }

        $contents = $items[explode('/', $request->url())[5] ?? '']['contents'] ?? '';

        if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1), 206);
        }

        return Http::response($contents, 200);
    }
}
