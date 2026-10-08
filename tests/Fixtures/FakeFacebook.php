<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Facebook: its token endpoint, which is asked with a GET and
 * trades a short-lived token for a lasting one, the calls of the Graph API
 * the package makes, and the host photos are kept on, which asks for no
 * token. It knows one person, and answers a token it does not take the way
 * Facebook does: with a 400 and error 190.
 */
class FakeFacebook
{
    public const CODE = 'a-code-from-facebook';

    public const SHORT_LIVED_TOKEN = 'fb.short-lived';

    public const TOKEN = 'fb.lasting';

    public const PHOTO_HOST = 'scontent.fgru1-1.fna.fbcdn.net';

    /**
     * @param  array<string, array{name: string, photos: array<string, string>}>  $albums  By album id: its name and the contents of its photos, by photo id.
     * @param  int  $pageSize  How many albums or photos Facebook gives at once.
     */
    public static function serve(array $albums = [], int $pageSize = 100): void
    {
        $photos = array_reduce($albums, fn (array $photos, array $album): array => $photos + $album['photos'], []);

        Http::fake(function (Request $request) use ($albums, $photos, $pageSize) {
            $url = strtok($request->url(), '?');

            parse_str((string) parse_url($request->url(), PHP_URL_QUERY), $query);

            if ($url === 'https://graph.facebook.com/oauth/access_token') {
                return static::token($request, $query);
            }

            if (str_starts_with($url, 'https://' . static::PHOTO_HOST . '/')) {
                return static::stored($request, $photos);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::TOKEN) {
                return Http::response(['error' => ['message' => 'Error validating access token', 'type' => 'OAuthException', 'code' => 190]], 400);
            }

            $path = substr($url, strlen('https://graph.facebook.com'));

            return match (true) {
                $path === '/me/permissions' => Http::response(['success' => true]),
                $path === '/me' => Http::response(['id' => '1', 'name' => 'A Person']),
                $path === '/me/albums' => Http::response(static::page(
                    array_map(fn (array $album, string $id): array => ['id' => $id, 'name' => $album['name']], $albums, array_map(strval(...), array_keys($albums))),
                    $url,
                    $query,
                    $pageSize,
                )),
                (bool) preg_match('#^/(\d+)/photos$#', $path, $album) => isset($albums[$album[1]])
                    ? Http::response(static::page(
                        array_map(fn (string $id): array => static::photo($id, $photos[$id]), array_map(strval(...), array_keys($albums[$album[1]]['photos']))),
                        $url,
                        $query,
                        $pageSize,
                    ))
                    : Http::response(['error' => ['message' => 'Unsupported get request.', 'type' => 'GraphMethodException', 'code' => 100]], 400),
                (bool) preg_match('#^/(\d+)$#', $path, $photo) => isset($photos[$photo[1]])
                    ? Http::response(static::photo($photo[1], $photos[$photo[1]]))
                    : Http::response(['error' => ['message' => 'Unsupported get request.', 'type' => 'GraphMethodException', 'code' => 100]], 400),
                default => Http::response('', 500),
            };
        });
    }

    public static function addressOf(string $photo, int $width = 2048): string
    {
        return 'https://' . static::PHOTO_HOST . "/v/t39/{$photo}_{$width}.jpg?oh=signed";
    }

    /**
     * @param  array<string, mixed>  $query
     */
    protected static function token(Request $request, array $query): mixed
    {
        if ($request->method() !== 'GET' || ($query['client_id'] ?? null) !== 'app-id' || ($query['client_secret'] ?? null) !== 'app-secret') {
            return Http::response(['error' => ['message' => 'Error validating client secret.', 'type' => 'OAuthException', 'code' => 1]], 400);
        }

        if (($query['grant_type'] ?? null) === 'fb_exchange_token' && ($query['fb_exchange_token'] ?? null) === static::SHORT_LIVED_TOKEN) {
            return Http::response(['access_token' => static::TOKEN, 'token_type' => 'bearer', 'expires_in' => 5183944]);
        }

        if (($query['code'] ?? null) === static::CODE && filled($query['redirect_uri'] ?? null)) {
            return Http::response(['access_token' => static::SHORT_LIVED_TOKEN, 'token_type' => 'bearer', 'expires_in' => 5400]);
        }

        return Http::response(['error' => ['message' => 'This authorization code has been used.', 'type' => 'OAuthException', 'code' => 100]], 400);
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @param  array<string, mixed>  $query
     * @return array<string, mixed>
     */
    protected static function page(array $items, string $url, array $query, int $pageSize): array
    {
        $offset = (int) base64_decode((string) ($query['after'] ?? ''));
        $hasMore = count($items) > $offset + $pageSize;

        return [
            'data' => array_slice($items, $offset, $pageSize),
            'paging' => [
                'cursors' => ['before' => base64_encode((string) $offset), 'after' => base64_encode((string) ($offset + $pageSize))],
                ...($hasMore ? ['next' => $url . '?after=' . base64_encode((string) ($offset + $pageSize))] : []),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected static function photo(string $id, string $contents): array
    {
        return [
            'id' => $id,
            'created_time' => '2026-09-03T14:00:00+0000',
            'images' => [
                ['height' => 1365, 'width' => 2048, 'source' => static::addressOf($id)],
                ['height' => 480, 'width' => 720, 'source' => static::addressOf($id, 720)],
                ['height' => 213, 'width' => 320, 'source' => static::addressOf($id, 320)],
                ['height' => 87, 'width' => 130, 'source' => static::addressOf($id, 130)],
            ],
        ];
    }

    /**
     * @param  array<string, string>  $photos
     */
    protected static function stored(Request $request, array $photos): mixed
    {
        // No token is for this host: one sent here would be one given away.
        if ($request->hasHeader('Authorization') || ! preg_match('#/(\d+)_2048\.jpg\?oh=signed$#', $request->url(), $photo)) {
            return Http::response('', 403);
        }

        $contents = $photos[$photo[1]] ?? '';

        if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(
                substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1),
                206,
                ['Content-Type' => 'image/jpeg', 'Content-Range' => "bytes {$range[1]}-{$range[2]}/" . strlen($contents)],
            );
        }

        return Http::response($contents, 200, ['Content-Type' => 'image/jpeg', 'Content-Length' => (string) strlen($contents)]);
    }
}
