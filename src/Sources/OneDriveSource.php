<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\Response;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\GuardedHttp;
use Saade\Fluppy\Sources\Support\TokenStore;

class OneDriveSource extends OAuthSource
{
    protected const API = 'https://graph.microsoft.com/v1.0';

    protected const NEXT_PAGE = 'next:';

    public function __construct(
        TokenStore $tokens,
        protected GuardedHttp $http,
    ) {
        parent::__construct($tokens);
    }

    public function getId(): string
    {
        return 'onedrive';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.onedrive');
    }

    protected function getAuthorizationEndpoint(): string
    {
        return "https://login.microsoftonline.com/{$this->getTenant()}/oauth2/v2.0/authorize";
    }

    protected function getTokenEndpoint(): string
    {
        return "https://login.microsoftonline.com/{$this->getTenant()}/oauth2/v2.0/token";
    }

    protected function getAuthorizationParameters(): array
    {
        return [
            'response_mode' => 'query',
            // `offline_access` is what makes Microsoft give a refresh token.
            'scope' => 'offline_access Files.Read User.Read',
        ];
    }

    /**
     * Which accounts may connect: `common` for personal, work and school
     * ones alike, `consumers` or `organizations` for one kind, or the id or
     * the domain of one organization.
     */
    protected function getTenant(): string
    {
        $tenant = (string) config('fluppy.remote.onedrive.tenant', 'common');

        return preg_match('/^[A-Za-z0-9.-]+$/', $tenant) ? $tenant : 'common';
    }

    public function list(?string $path = null): Listing
    {
        [$folder, $skipToken] = $this->page($path);

        $response = $this->send(fn (): Response => $this->request()->get(
            static::API . ($folder === null ? '/me/drive/root/children' : "/me/drive/items/{$folder}/children"),
            [
                '$select' => 'id,name,size,file,folder,lastModifiedDateTime',
                '$top' => 200,
                ...($skipToken === null ? [] : ['$skiptoken' => $skipToken]),
            ],
        ), [200, 404]);

        if ($response->status() === 404) {
            throw SourceException::notAllowed();
        }

        // What is neither a file nor a folder is left out: a notebook, for
        // one, has no bytes to give.
        $items = collect($response->json('value') ?? [])
            ->filter(fn (mixed $item): bool => is_array($item) && (isset($item['file']) || isset($item['folder'])))
            ->map(fn (array $item): ListedItem => new ListedItem(
                id: (string) $item['id'],
                name: (string) $item['name'],
                isFolder: isset($item['folder']),
                size: isset($item['file'], $item['size']) ? (int) $item['size'] : null,
                type: $item['file']['mimeType'] ?? null,
                modifiedAt: $item['lastModifiedDateTime'] ?? null,
            ))
            ->values()
            ->all();

        // Read as a key of the answer: `json()` would take the dot in its
        // name for a step into it.
        return new Listing($items, $this->nextPath($folder, $response->json()['@odata.nextLink'] ?? null), $this->account());
    }

    public function describe(array $reference): RemoteFile
    {
        $fileId = $this->id($reference['fileId'] ?? null);

        $response = $this->send(fn (): Response => $this->request()->get(
            static::API . "/me/drive/items/{$fileId}",
            ['$select' => 'id,name,size,file,cTag'],
        ), [200, 404]);

        $item = $response->json();

        if ($response->status() === 404 || ! is_array($item) || ! isset($item['file'])) {
            throw SourceException::notAllowed();
        }

        return new RemoteFile(
            // The `cTag` changes when what is in the file does.
            identity: $item['id'] . '|' . ($item['cTag'] ?? ''),
            name: mb_substr(basename(str_replace('\\', '/', (string) $item['name'])), 0, 255) ?: 'file',
            size: isset($item['size']) ? (int) $item['size'] : null,
            type: $item['file']['mimeType'] ?? null,
            acceptsRanges: true,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $fileId = $this->id($reference['fileId'] ?? null);

        $isRange = $from !== null && $to !== null;

        // Microsoft does not send the file from here. It answers with an
        // address that is good for a few minutes and needs no token, on a
        // host of its own choosing.
        $response = $this->send(fn (): Response => $this->request()
            ->withOptions(['allow_redirects' => false])
            ->get(static::API . "/me/drive/items/{$fileId}/content"), [302, 404]);

        if ($response->status() === 404 || blank($address = $response->header('Location'))) {
            throw SourceException::notAllowed();
        }

        $download = $this->http->forProvider()->download(
            $address,
            $isRange ? ['Range' => "bytes={$from}-{$to}"] : [],
            $isRange ? $to - $from + 1 : $limit,
            $isRange,
        );

        if ($download->status() !== ($isRange ? 206 : 200)) {
            throw SourceException::failed($download->status());
        }

        return Download::bodyOf($download);
    }

    /**
     * @return array{?string, ?string} The folder to list, null for the top one, and where in it to go on from.
     */
    protected function page(?string $path): array
    {
        if ($path === null) {
            return [null, null];
        }

        if (! str_starts_with($path, static::NEXT_PAGE)) {
            return [$this->id($path), null];
        }

        [$folder, $skipToken] = [...explode(':', substr($path, strlen(static::NEXT_PAGE)), 2), ''];

        return [$folder === '' ? null : $this->id($folder), $skipToken];
    }

    // Microsoft gives the address of the next page whole. Only the token in
    // it is kept and sent back: the path comes from the browser, and an
    // address taken from there would be one the server then asks with the
    // person's token.
    protected function nextPath(?string $folder, mixed $nextLink): ?string
    {
        if (! is_string($nextLink)) {
            return null;
        }

        parse_str((string) parse_url($nextLink, PHP_URL_QUERY), $query);

        $skipToken = collect($query)->first(fn (mixed $value, string $key): bool => strtolower($key) === '$skiptoken');

        return is_string($skipToken) ? static::NEXT_PAGE . $folder . ':' . $skipToken : null;
    }

    // The id comes from the browser and goes into an address.
    protected function id(mixed $id): string
    {
        if (! is_string($id) || ! preg_match('/^[A-Za-z0-9!_.-]{1,200}$/', $id)) {
            throw SourceException::notAllowed();
        }

        return $id;
    }

    protected function account(): ?string
    {
        return $this->rememberAccount(function (): ?string {
            $account = $this->send(fn (): Response => $this->request()->get(
                static::API . '/me',
                ['$select' => 'userPrincipalName,mail,displayName'],
            ))->json();

            return $account['mail'] ?? $account['userPrincipalName'] ?? $account['displayName'] ?? null;
        });
    }
}
