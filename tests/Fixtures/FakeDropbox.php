<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

/**
 * Stands in for Dropbox: its token endpoint, and the calls of its API the
 * package makes. It knows one account, with the folders and files it is
 * given, and only answers who brings the token it handed out last.
 */
class FakeDropbox
{
    public const CODE = 'a-code-from-dropbox';

    public static int $tokensIssued = 0;

    protected static bool $issuesNewTokens = true;

    /**
     * @param  array<string, array<string, array<string, mixed>>>  $folders  Entries by Dropbox id, by the id of the folder they are in (`''` for the top one). An entry with `contents` is a file.
     * @param  int  $expiresIn  The seconds a token lasts.
     * @param  bool  $issuesNewTokens  False to hand out the same token every time, for an application that sets this up again on each request.
     */
    public static function serve(array $folders = [], int $expiresIn = 14400, bool $issuesNewTokens = true): void
    {
        static::$tokensIssued = 0;
        static::$issuesNewTokens = $issuesNewTokens;

        $entries = collect($folders)->flatMap(fn (array $entries): array => $entries)->all();

        Http::fake(function (Request $request) use ($folders, $entries, $expiresIn) {
            if ($request->url() === 'https://api.dropboxapi.com/oauth2/token') {
                return static::token($request, $expiresIn);
            }

            if (($request->header('Authorization')[0] ?? '') !== 'Bearer ' . static::accessToken()) {
                return Http::response(['error_summary' => 'expired_access_token/'], 401);
            }

            $arguments = json_decode($request->body(), true);

            return match ($request->url()) {
                'https://api.dropboxapi.com/2/users/get_current_account' => Http::response(['email' => 'person@example.com']),
                'https://api.dropboxapi.com/2/auth/token/revoke' => Http::response('null'),
                'https://api.dropboxapi.com/2/files/list_folder' => isset($folders[$arguments['path']])
                    ? Http::response(static::page($folders, $arguments['path'], 0))
                    : Http::response(['error_summary' => 'path/not_found/'], 409),
                'https://api.dropboxapi.com/2/files/list_folder/continue' => Http::response(static::page(
                    $folders,
                    explode('|', $arguments['cursor'])[0],
                    (int) explode('|', $arguments['cursor'])[1],
                )),
                'https://api.dropboxapi.com/2/files/get_metadata' => isset($entries[$arguments['path']])
                    ? Http::response(static::entry($arguments['path'], $entries[$arguments['path']]))
                    : Http::response(['error_summary' => 'path/not_found/'], 409),
                'https://content.dropboxapi.com/2/files/download' => static::download($request, $entries),
                default => Http::response('', 500),
            };
        });
    }

    public static function accessToken(): string
    {
        return 'sl.token-' . static::$tokensIssued;
    }

    protected static function token(Request $request, int $expiresIn): mixed
    {
        $isGoodCode = $request['grant_type'] === 'authorization_code' && $request['code'] === static::CODE && filled($request['code_verifier']);
        $isGoodRefresh = $request['grant_type'] === 'refresh_token' && $request['refresh_token'] === 'a-refresh-token';

        if ($request['client_id'] !== 'app-key' || $request['client_secret'] !== 'app-secret' || ! ($isGoodCode || $isGoodRefresh)) {
            return Http::response(['error' => 'invalid_grant'], 400);
        }

        static::$tokensIssued += (int) static::$issuesNewTokens;

        return Http::response([
            'access_token' => static::accessToken(),
            'expires_in' => $expiresIn,
            // As Dropbox does, the refresh token only comes with the first.
            ...($isGoodCode ? ['refresh_token' => 'a-refresh-token'] : []),
        ]);
    }

    /**
     * Two entries to a page, so that a folder of three has a second one.
     *
     * @param  array<string, array<string, array<string, mixed>>>  $folders
     * @return array<string, mixed>
     */
    protected static function page(array $folders, string $folder, int $offset): array
    {
        return [
            'entries' => collect($folders[$folder])->slice($offset, 2)->map(fn (array $entry, string $id): array => static::entry($id, $entry))->values()->all(),
            'cursor' => $folder . '|' . ($offset + 2),
            'has_more' => count($folders[$folder]) > $offset + 2,
        ];
    }

    /**
     * @param  array<string, mixed>  $entry
     * @return array<string, mixed>
     */
    protected static function entry(string $id, array $entry): array
    {
        return isset($entry['contents'])
            ? ['.tag' => 'file', 'id' => $id, 'name' => $entry['name'], 'size' => strlen($entry['contents']), 'rev' => 'rev-1', 'server_modified' => '2026-10-01T10:00:00Z', 'is_downloadable' => $entry['is_downloadable'] ?? true]
            : ['.tag' => 'folder', 'id' => $id, 'name' => $entry['name']];
    }

    /**
     * @param  array<string, array<string, mixed>>  $entries
     */
    protected static function download(Request $request, array $entries): mixed
    {
        $contents = $entries[json_decode($request->header('Dropbox-API-Arg')[0], true)['path']]['contents'] ?? null;

        if ($contents === null) {
            return Http::response(['error_summary' => 'path/not_found/'], 409);
        }

        if (preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1), 206);
        }

        return Http::response($contents, 200);
    }
}
