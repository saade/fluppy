<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Microsoft: its token endpoint, the calls of Graph the
 * package makes, and the host a file is downloaded from, which Graph only
 * gives the address of. It knows one account, and only answers who brings
 * the token it handed out last. Each renewal gives a new refresh token, as
 * Microsoft does.
 */
class FakeOneDrive
{
    public const CODE = 'a-code-from-microsoft';

    public const DOWNLOAD_HOST = 'public.dm.files.1drv.com';

    public static int $tokensIssued = 0;

    /**
     * @param  array<string, array<string, array<string, mixed>>>  $folders  Items by id, by the id of the folder they are in (`root` for the top one). An item with `contents` is a file, one with `package` is neither a file nor a folder.
     */
    public static function serve(array $folders = []): void
    {
        static::$tokensIssued = 0;

        $items = collect($folders)->flatMap(fn (array $items): array => $items)->all();

        Http::fake(function (Request $request) use ($folders, $items) {
            $url = strtok($request->url(), '?');

            parse_str((string) parse_url($request->url(), PHP_URL_QUERY), $query);

            if (preg_match('#^https://login\.microsoftonline\.com/[^/]+/oauth2/v2\.0/token$#', $url)) {
                return static::token($request);
            }

            if (str_starts_with($url, 'https://' . static::DOWNLOAD_HOST . '/')) {
                return static::download($request, $items, $query);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::accessToken()) {
                return Http::response(['error' => ['code' => 'InvalidAuthenticationToken']], 401);
            }

            return match (true) {
                $url === 'https://graph.microsoft.com/v1.0/me' => Http::response(['mail' => 'person@example.com']),
                $url === 'https://graph.microsoft.com/v1.0/me/drive/root/children' => Http::response(static::page($folders, 'root', $url, $query)),
                (bool) preg_match('#/me/drive/items/([^/]+)/children$#', $url, $folder) => isset($folders[$folder[1]])
                    ? Http::response(static::page($folders, $folder[1], $url, $query))
                    : Http::response(['error' => ['code' => 'itemNotFound']], 404),
                (bool) preg_match('#/me/drive/items/([^/]+)/content$#', $url, $item) => isset($items[$item[1]]['contents'])
                    ? Http::response('', 302, ['Location' => 'https://' . static::DOWNLOAD_HOST . "/download?id={$item[1]}&tempauth=good-for-a-few-minutes"])
                    : Http::response(['error' => ['code' => 'itemNotFound']], 404),
                (bool) preg_match('#/me/drive/items/([^/]+)$#', $url, $item) => isset($items[$item[1]])
                    ? Http::response(static::item($item[1], $items[$item[1]]))
                    : Http::response(['error' => ['code' => 'itemNotFound']], 404),
                default => Http::response('', 500),
            };
        });
    }

    public static function accessToken(): string
    {
        return 'ms.token-' . static::$tokensIssued;
    }

    public static function refreshToken(): string
    {
        return 'ms.refresh-' . static::$tokensIssued;
    }

    protected static function token(Request $request): mixed
    {
        $isGoodCode = $request['grant_type'] === 'authorization_code' && $request['code'] === static::CODE && filled($request['code_verifier']);
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
     * Two items to a page, so that a folder of three has a second one.
     *
     * @param  array<string, array<string, array<string, mixed>>>  $folders
     * @param  array<string, mixed>  $query
     * @return array<string, mixed>
     */
    protected static function page(array $folders, string $folder, string $url, array $query): array
    {
        $offset = (int) ($query['$skiptoken'] ?? 0);

        return [
            'value' => collect($folders[$folder])->slice($offset, 2)->map(fn (array $item, string $id): array => static::item($id, $item))->values()->all(),
            ...(count($folders[$folder]) > $offset + 2
                ? ['@odata.nextLink' => $url . '?' . http_build_query(['$select' => $query['$select'] ?? '', '$top' => 200, '$skiptoken' => $offset + 2])]
                : []),
        ];
    }

    /**
     * @param  array<string, mixed>  $item
     * @return array<string, mixed>
     */
    protected static function item(string $id, array $item): array
    {
        return match (true) {
            isset($item['contents']) => ['id' => $id, 'name' => $item['name'], 'size' => strlen($item['contents']), 'cTag' => 'ctag-1', 'lastModifiedDateTime' => '2026-10-01T10:00:00Z', 'file' => ['mimeType' => $item['type'] ?? 'application/octet-stream']],
            isset($item['package']) => ['id' => $id, 'name' => $item['name'], 'package' => ['type' => 'oneNote']],
            default => ['id' => $id, 'name' => $item['name'], 'folder' => ['childCount' => 0]],
        };
    }

    /**
     * @param  array<string, array<string, mixed>>  $items
     * @param  array<string, mixed>  $query
     */
    protected static function download(Request $request, array $items, array $query): mixed
    {
        // The address is its own pass: a token sent along with it would be
        // one given away to whatever host Microsoft named.
        if ($request->hasHeader('Authorization') || ($query['tempauth'] ?? null) !== 'good-for-a-few-minutes') {
            return Http::response('', 401);
        }

        $contents = $items[$query['id'] ?? '']['contents'] ?? '';

        if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1), 206);
        }

        return Http::response($contents, 200);
    }
}
