<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\Response;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\Token;
use Symfony\Component\Mime\MimeTypes;

class DropboxSource extends OAuthSource
{
    protected const API = 'https://api.dropboxapi.com/2';

    protected const CONTENT = 'https://content.dropboxapi.com/2';

    protected const NEXT_PAGE = 'cursor:';

    public function getId(): string
    {
        return 'dropbox';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.dropbox');
    }

    protected function getAuthorizationEndpoint(): string
    {
        return 'https://www.dropbox.com/oauth2/authorize';
    }

    protected function getTokenEndpoint(): string
    {
        return 'https://api.dropboxapi.com/oauth2/token';
    }

    protected function getAuthorizationParameters(): array
    {
        return [
            // Without it Dropbox gives a token that lasts four hours and
            // nothing to renew it with.
            'token_access_type' => 'offline',
            'scope' => 'account_info.read files.metadata.read files.content.read',
        ];
    }

    protected function revoke(Token $token): void
    {
        $this->rpc('auth/token/revoke');
    }

    protected function forget(): void
    {
        parent::forget();

        session()->forget('fluppy.sources.dropbox.account');
    }

    public function list(?string $path = null): Listing
    {
        $folder = str_starts_with((string) $path, static::NEXT_PAGE)
            ? $this->rpc('files/list_folder/continue', ['cursor' => substr($path, strlen(static::NEXT_PAGE))])
            : $this->rpc('files/list_folder', ['path' => $path === null ? '' : $this->id($path), 'limit' => 1000]);

        $items = collect($folder['entries'] ?? [])
            ->filter(fn (mixed $entry): bool => is_array($entry) && in_array($entry['.tag'] ?? null, ['file', 'folder'], true) && ($entry['is_downloadable'] ?? true))
            ->map(fn (array $entry): ListedItem => new ListedItem(
                id: (string) $entry['id'],
                name: (string) $entry['name'],
                isFolder: $entry['.tag'] === 'folder',
                size: isset($entry['size']) ? (int) $entry['size'] : null,
                type: $entry['.tag'] === 'file' ? $this->typeOf((string) $entry['name']) : null,
                modifiedAt: $entry['server_modified'] ?? null,
            ))
            ->values()
            ->all();

        return new Listing(
            $items,
            ($folder['has_more'] ?? false) ? static::NEXT_PAGE . $folder['cursor'] : null,
            $this->account(),
        );
    }

    public function describe(array $reference): RemoteFile
    {
        $file = $this->rpc('files/get_metadata', ['path' => $this->id($reference['fileId'] ?? null)]);

        if (($file['.tag'] ?? null) !== 'file') {
            throw SourceException::notAllowed();
        }

        return new RemoteFile(
            identity: $file['id'] . '|' . ($file['rev'] ?? ''),
            name: mb_substr(basename(str_replace('\\', '/', (string) $file['name'])), 0, 255) ?: 'file',
            size: isset($file['size']) ? (int) $file['size'] : null,
            type: $this->typeOf((string) $file['name']),
            acceptsRanges: true,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $fileId = $this->id($reference['fileId'] ?? null);

        $isRange = $from !== null && $to !== null;

        $request = $this->request()
            ->withHeaders([
                'Dropbox-API-Arg' => json_encode(['path' => $fileId]),
                ...($isRange ? ['Range' => "bytes={$from}-{$to}"] : []),
            ])
            // Dropbox refuses a download that says its (empty) body is a
            // form or JSON.
            ->withBody('', 'application/octet-stream');

        return Download::bodyOf($this->send(fn (): Response => Download::upTo(
            $isRange ? $to - $from + 1 : $limit,
            fn (array $options): Response => $request->withOptions($options)->post(static::CONTENT . '/files/download'),
            $isRange,
        ), [$isRange ? 206 : 200]));
    }

    /**
     * @param  array<string, mixed> | null  $arguments
     * @return array<string, mixed>
     */
    protected function rpc(string $endpoint, ?array $arguments = null): array
    {
        $request = $this->request()->withBody((string) json_encode($arguments), 'application/json');

        // A file or folder that is not there, or not the person's to see,
        // is answered with a 409.
        $response = $this->send(fn () => $request->post(static::API . "/{$endpoint}"), [200, 409]);

        if ($response->status() === 409) {
            throw SourceException::notAllowed();
        }

        return (array) $response->json();
    }

    // Dropbox knows a file or a folder by an id like this, wherever it is
    // moved to. It comes from the browser.
    protected function id(mixed $id): string
    {
        if (! is_string($id) || ! preg_match('/^id:[A-Za-z0-9_-]{1,200}$/', $id)) {
            throw SourceException::notAllowed();
        }

        return $id;
    }

    protected function account(): ?string
    {
        return session()->remember('fluppy.sources.dropbox.account', function (): ?string {
            $account = $this->rpc('users/get_current_account');

            return $account['email'] ?? ($account['name']['display_name'] ?? null);
        });
    }

    // Dropbox does not say what kind of file a file is, and a field that
    // only takes some kinds has to know before the file is fetched.
    protected function typeOf(string $name): ?string
    {
        $types = MimeTypes::getDefault()->getMimeTypes(strtolower(pathinfo($name, PATHINFO_EXTENSION)));

        // An extension can stand for several types, and the first is not
        // always the one a field asks for: `.mp4` is `application/mp4`
        // before it is `video/mp4`.
        return collect($types)->first(fn (string $type): bool => (bool) preg_match('#^(video|audio)/#', $type))
            ?? $types[0]
            ?? null;
    }
}
