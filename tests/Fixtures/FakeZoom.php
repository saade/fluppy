<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Zoom: its token endpoint, which takes the application's
 * credentials in a header and in no other way, the calls of its API the
 * package makes, and where a recording is downloaded from, which sends the
 * request on to another host. It knows one account, made on 15 August 2026,
 * and only answers who brings the token it handed out last.
 */
class FakeZoom
{
    public const CODE = 'a-code-from-zoom';

    public const STORAGE_HOST = 'ssrweb.zoom.us';

    public static int $tokensIssued = 0;

    /**
     * @param  array<string, array<string, mixed>>  $meetings  By uuid: `topic`, `start_time` and `recording_files`, each with an `id`, a `file_type`, `contents` and whatever else Zoom says of one.
     */
    public static function serve(array $meetings = []): void
    {
        static::$tokensIssued = 0;

        Http::fake(function (Request $request) use ($meetings) {
            $url = strtok($request->url(), '?');

            parse_str((string) parse_url($request->url(), PHP_URL_QUERY), $query);

            if ($url === 'https://zoom.us/oauth/token') {
                return static::token($request);
            }

            if ($url === 'https://zoom.us/oauth/revoke') {
                return Http::response(['status' => 'success']);
            }

            if (str_starts_with($url, 'https://' . static::STORAGE_HOST . '/')) {
                return static::stored($request, $meetings, $query);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::accessToken()) {
                return Http::response(['code' => 124, 'message' => 'Invalid access token.'], 401);
            }

            if (preg_match('#^https://zoom\.us/rec/download/(.+)$#', $url, $file)) {
                return Http::response('', 302, ['Location' => 'https://' . static::STORAGE_HOST . "/file/{$file[1]}?signature=good-for-a-while"]);
            }

            return match (true) {
                $url === 'https://api.zoom.us/v2/users/me' => Http::response(['email' => 'person@example.com', 'created_at' => '2026-08-15T09:30:00Z']),
                $url === 'https://api.zoom.us/v2/users/me/recordings' => Http::response(static::page($meetings, $query)),
                (bool) preg_match('#/v2/meetings/(.+)/recordings$#', $url, $meeting) => isset($meetings[$uuid = rawurldecode(rawurldecode($meeting[1]))])
                    ? Http::response(static::meeting($uuid, $meetings[$uuid]))
                    : Http::response(['code' => 3301, 'message' => 'There is no recording for this meeting.'], 404),
                default => Http::response('', 500),
            };
        });
    }

    public static function accessToken(): string
    {
        return 'zoom.token-' . static::$tokensIssued;
    }

    public static function refreshToken(): string
    {
        return 'zoom.refresh-' . static::$tokensIssued;
    }

    protected static function token(Request $request): mixed
    {
        $isGoodCode = $request['grant_type'] === 'authorization_code' && $request['code'] === static::CODE && filled($request['code_verifier']);
        $isGoodRefresh = $request['grant_type'] === 'refresh_token' && $request['refresh_token'] === static::refreshToken();

        $hasCredentials = ($request->header('Authorization')[0] ?? '') === 'Basic ' . base64_encode('client-id:client-secret')
            && ! isset($request->data()['client_secret']);

        if (! $hasCredentials || ! ($isGoodCode || $isGoodRefresh)) {
            return Http::response(['reason' => 'Invalid client_id or client_secret', 'error' => 'invalid_client'], 400);
        }

        static::$tokensIssued++;

        return Http::response([
            'access_token' => static::accessToken(),
            'refresh_token' => static::refreshToken(),
            'expires_in' => 3599,
        ]);
    }

    /**
     * The meetings that started in the span asked for, one to a page.
     *
     * @param  array<string, array<string, mixed>>  $meetings
     * @param  array<string, mixed>  $query
     * @return array<string, mixed>
     */
    protected static function page(array $meetings, array $query): array
    {
        $inSpan = collect($meetings)
            ->filter(fn (array $meeting): bool => substr($meeting['start_time'], 0, 10) >= $query['from'] && substr($meeting['start_time'], 0, 10) <= $query['to'])
            ->map(fn (array $meeting, string $uuid): array => static::meeting($uuid, $meeting))
            ->values();

        $offset = (int) ($query['next_page_token'] ?? 0);

        return [
            'from' => $query['from'],
            'to' => $query['to'],
            'meetings' => $inSpan->slice($offset, 1)->values()->all(),
            'next_page_token' => $inSpan->count() > $offset + 1 ? (string) ($offset + 1) : '',
        ];
    }

    /**
     * @param  array<string, mixed>  $meeting
     * @return array<string, mixed>
     */
    protected static function meeting(string $uuid, array $meeting): array
    {
        return [
            'uuid' => $uuid,
            'topic' => $meeting['topic'],
            'start_time' => $meeting['start_time'],
            'recording_files' => array_map(fn (array $file): array => [
                'status' => 'completed',
                'recording_start' => $meeting['start_time'],
                'file_extension' => $file['file_type'],
                'file_size' => strlen($file['contents'] ?? ''),
                'download_url' => "https://zoom.us/rec/download/{$file['id']}",
                ...array_diff_key($file, ['contents' => true]),
            ], $meeting['recording_files']),
        ];
    }

    /**
     * @param  array<string, array<string, mixed>>  $meetings
     * @param  array<string, mixed>  $query
     */
    protected static function stored(Request $request, array $meetings, array $query): mixed
    {
        // The address is its own pass: a token sent along with it would be
        // one given away to a host that is not the API's.
        if ($request->hasHeader('Authorization') || ($query['signature'] ?? null) !== 'good-for-a-while') {
            return Http::response('', 401);
        }

        $contents = collect($meetings)
            ->flatMap(fn (array $meeting): array => $meeting['recording_files'])
            ->firstWhere('id', basename(strtok($request->url(), '?')))['contents'] ?? '';

        if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(
                substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1),
                206,
                ['Content-Range' => "bytes {$range[1]}-{$range[2]}/" . strlen($contents)],
            );
        }

        return Http::response($contents, 200, ['Content-Length' => (string) strlen($contents)]);
    }
}
