<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\FileType;
use Saade\Fluppy\Sources\Support\Token;

class BoxSource extends OAuthSource
{
    protected const API = 'https://api.box.com/2.0';

    protected const TOP_FOLDER = '0';

    protected const PAGE = 1000;

    protected const NEXT_PAGE = 'next:';

    public function getId(): string
    {
        return 'box';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.box');
    }

    protected function getAuthorizationEndpoint(): string
    {
        return 'https://account.box.com/api/oauth2/authorize';
    }

    protected function getTokenEndpoint(): string
    {
        return 'https://api.box.com/oauth2/token';
    }

    // Box's documentation of the flow has no PKCE in it.
    protected function usesPkce(): bool
    {
        return false;
    }

    protected function revoke(Token $token): void
    {
        Http::asForm()
            ->connectTimeout(5)
            ->timeout(15)
            ->post('https://api.box.com/oauth2/revoke', [...$this->getCredentials(), 'token' => $token->accessToken]);
    }

    public function list(?string $path = null): Listing
    {
        [$folder, $offset] = $this->page($path);

        $response = $this->send(fn (): Response => $this->request()->get(static::API . "/folders/{$folder}/items", [
            'fields' => 'id,name,type,size,modified_at',
            'limit' => static::PAGE,
            'offset' => $offset,
        ]), [200, 404]);

        if ($response->status() === 404) {
            throw SourceException::notAllowed();
        }

        // A bookmark is listed among the files and folders, and is neither.
        $items = collect($response->json('entries') ?? [])
            ->filter(fn (mixed $entry): bool => is_array($entry) && in_array($entry['type'] ?? null, ['file', 'folder'], true))
            ->map(fn (array $entry): ListedItem => new ListedItem(
                id: (string) $entry['id'],
                name: (string) $entry['name'],
                isFolder: $entry['type'] === 'folder',
                size: $entry['type'] === 'file' && isset($entry['size']) ? (int) $entry['size'] : null,
                type: $entry['type'] === 'file' ? FileType::ofName((string) $entry['name']) : null,
                modifiedAt: $entry['modified_at'] ?? null,
            ))
            ->values()
            ->all();

        // Counted from what came, not from what was asked for: Box may give
        // fewer at once than the limit it is sent.
        $given = count((array) $response->json('entries'));
        $next = $offset + $given;

        return new Listing(
            $items,
            $given > 0 && $next < (int) $response->json('total_count') ? static::NEXT_PAGE . "{$folder}:{$next}" : null,
            $this->account(),
        );
    }

    public function describe(array $reference): RemoteFile
    {
        $fileId = $this->id($reference['fileId'] ?? null);

        $response = $this->send(fn (): Response => $this->request()->get(static::API . "/files/{$fileId}", [
            'fields' => 'id,name,size,sha1',
        ]), [200, 404]);

        $file = $response->json();

        if ($response->status() === 404 || ! is_array($file) || ($file['type'] ?? null) !== 'file') {
            throw SourceException::notAllowed();
        }

        return new RemoteFile(
            identity: $file['id'] . '|' . ($file['sha1'] ?? ''),
            name: mb_substr(basename(str_replace('\\', '/', (string) $file['name'])), 0, 255) ?: 'file',
            size: isset($file['size']) ? (int) $file['size'] : null,
            type: FileType::ofName((string) $file['name']),
            acceptsRanges: true,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $fileId = $this->id($reference['fileId'] ?? null);

        // Box does not send the file from here. It answers with an address
        // that is its own pass and good for a few minutes, on another host.
        $response = $this->send(fn (): Response => $this->request()
            ->withOptions(['allow_redirects' => false])
            ->get(static::API . "/files/{$fileId}/content"), [302, 404]);

        if ($response->status() === 404 || blank($address = $response->header('Location'))) {
            throw SourceException::notAllowed();
        }

        return $this->downloadFrom($address, $from, $to, $limit);
    }

    /**
     * @return array{string, int} The folder to list, and how many of its items to pass over.
     */
    protected function page(?string $path): array
    {
        if ($path === null) {
            return [static::TOP_FOLDER, 0];
        }

        if (! str_starts_with($path, static::NEXT_PAGE)) {
            return [$this->id($path), 0];
        }

        [$folder, $offset] = [...explode(':', substr($path, strlen(static::NEXT_PAGE)), 2), ''];

        if (! ctype_digit($offset)) {
            throw SourceException::notAllowed();
        }

        return [$this->id($folder), (int) $offset];
    }

    // The id comes from the browser and goes into an address. Box's are
    // numbers.
    protected function id(mixed $id): string
    {
        if (! is_string($id) || ! preg_match('/^\d{1,30}$/', $id)) {
            throw SourceException::notAllowed();
        }

        return $id;
    }

    protected function account(): ?string
    {
        return $this->rememberAccount(function (): ?string {
            $account = $this->send(fn (): Response => $this->request()->get(static::API . '/users/me', ['fields' => 'login,name']))->json();

            return $account['login'] ?? $account['name'] ?? null;
        });
    }
}
