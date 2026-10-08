<?php

namespace Saade\Fluppy\Sources;

use Carbon\CarbonImmutable;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\ProbedFile;
use Saade\Fluppy\Sources\Support\Token;
use Throwable;

/**
 * The photos a person has on Facebook, by album: an album is a folder, and
 * a photo in it a file, fetched at the largest size Facebook keeps of it.
 */
class FacebookSource extends OAuthSource
{
    // Without a version in it: Facebook then answers with the oldest one
    // the application may still use, where a version written here would be
    // one Facebook retires.
    protected const GRAPH = 'https://graph.facebook.com';

    protected const NEXT_PAGE = 'next:';

    protected const ALBUMS = 'albums';

    // The code of the error Facebook gives for a token it no longer takes.
    // It comes with a status of 400, not 401.
    protected const TOKEN_REFUSED = 190;

    public function getId(): string
    {
        return 'facebook';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.facebook');
    }

    protected function getAuthorizationEndpoint(): string
    {
        return 'https://www.facebook.com/dialog/oauth';
    }

    protected function getTokenEndpoint(): string
    {
        return static::GRAPH . '/oauth/access_token';
    }

    protected function getAuthorizationParameters(): array
    {
        return ['scope' => 'user_photos'];
    }

    // Facebook's documentation of this flow has no PKCE in it.
    protected function usesPkce(): bool
    {
        return false;
    }

    protected function postForToken(array $parameters): Response
    {
        $ask = fn (array $query): Response => Http::acceptJson()
            ->connectTimeout(5)
            ->timeout(15)
            ->get($this->getTokenEndpoint(), [...$this->getCredentials(), ...$query]);

        $response = $ask(Arr::only($parameters, ['code', 'redirect_uri']));

        if (! $response->successful() || ! is_string($response->json('access_token'))) {
            return $response;
        }

        // The token a person comes back with lasts an hour or two, and
        // Facebook gives nothing to renew one with. It is traded for one
        // that lasts about sixty days.
        $lasting = $ask(['grant_type' => 'fb_exchange_token', 'fb_exchange_token' => $response->json('access_token')]);

        return $lasting->successful() && is_string($lasting->json('access_token')) ? $lasting : $response;
    }

    protected function revoke(Token $token): void
    {
        Http::withToken($token->accessToken)
            ->connectTimeout(5)
            ->timeout(15)
            ->delete(static::GRAPH . '/me/permissions');
    }

    public function list(?string $path = null): Listing
    {
        [$album, $after] = $this->page($path);

        $page = $this->graph($album === null ? '/me/albums' : "/{$album}/photos", [
            'fields' => $album === null ? 'id,name' : 'id,images,created_time',
            'limit' => 100,
            ...($after === null ? [] : ['after' => $after]),
        ]);

        $items = collect($page['data'] ?? [])
            ->filter(fn (mixed $item): bool => is_array($item) && $this->isId($item['id'] ?? null))
            ->map(fn (array $item): ?ListedItem => $album === null ? $this->album($item) : $this->photo($item))
            ->filter()
            ->values()
            ->all();

        $next = $page['paging']['cursors']['after'] ?? null;

        return new Listing(
            $items,
            // The address of the next page tells there is one. Only the
            // cursor is kept: an address would come back from the browser.
            is_string($next) && filled($page['paging']['next'] ?? null) ? static::NEXT_PAGE . ($album ?? static::ALBUMS) . ':' . $next : null,
            $this->rememberAccount(fn (): ?string => $this->graph('/me', ['fields' => 'name'])['name'] ?? null),
        );
    }

    public function describe(array $reference): RemoteFile
    {
        $fileId = $reference['fileId'] ?? null;

        if (! $this->isId($fileId)) {
            throw SourceException::notAllowed();
        }

        $photo = $this->graph("/{$fileId}", ['fields' => 'id,images,created_time']);

        $image = $this->largest($photo['images'] ?? null) ?? throw SourceException::notAllowed();

        // Facebook says how wide and tall a photo is, not how many bytes,
        // nor what kind of file it is kept as: the host it is on is asked.
        $probed = ProbedFile::describe(
            $this->http->forProvider()->probe($this->address($image['source']), ProbedFile::FIRST_BYTE),
            identity: '',
            name: '',
            type: 'image/jpeg',
        );

        return new RemoteFile(
            identity: "{$fileId}|{$image['width']}x{$image['height']}",
            name: $this->name($photo, (string) $probed->type),
            size: $probed->size,
            type: $probed->type,
            acceptsRanges: $probed->acceptsRanges,
            // The address is its own pass, so the parts of a photo do not
            // each have to ask Facebook for it again.
            reference: ['fileId' => $fileId, 'address' => $image['source']],
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $address = $reference['address'] ?? null;

        if (! is_string($address)) {
            throw SourceException::notAllowed();
        }

        return $this->downloadFrom($this->address($address), $from, $to, $limit);
    }

    /**
     * Asks Facebook's Graph API, and tells apart what it answers a refused
     * token with from its other errors, which all come as a 400.
     *
     * @param  array<string, mixed>  $query
     * @return array<string, mixed>
     */
    protected function graph(string $path, array $query = []): array
    {
        $response = $this->send(fn (): Response => $this->request()->get(static::GRAPH . $path, $query), [200, 400, 403, 404]);

        if ($response->successful()) {
            return (array) $response->json();
        }

        if ((int) $response->json('error.code') === static::TOKEN_REFUSED) {
            $this->forget();

            throw SourceException::notConnected($this->getLabel());
        }

        throw SourceException::notAllowed();
    }

    /**
     * @return array{?string, ?string} The album to list, null for the list of albums, and the cursor to go on from.
     */
    protected function page(?string $path): array
    {
        if ($path === null) {
            return [null, null];
        }

        $after = null;

        if (str_starts_with($path, static::NEXT_PAGE)) {
            [$path, $after] = [...explode(':', substr($path, strlen(static::NEXT_PAGE)), 2), ''];

            if (! preg_match('/^[A-Za-z0-9_=-]{1,500}$/', $after)) {
                throw SourceException::notAllowed();
            }
        }

        if ($path === static::ALBUMS && $after !== null) {
            return [null, $after];
        }

        return $this->isId($path) ? [$path, $after] : throw SourceException::notAllowed();
    }

    /**
     * @param  array<string, mixed>  $album
     */
    protected function album(array $album): ListedItem
    {
        return new ListedItem(id: $album['id'], name: (string) ($album['name'] ?? $album['id']), isFolder: true);
    }

    /**
     * @param  array<string, mixed>  $photo
     */
    protected function photo(array $photo): ?ListedItem
    {
        $images = $photo['images'] ?? null;

        if ($this->largest($images) === null) {
            return null;
        }

        return new ListedItem(
            id: $photo['id'],
            name: $this->name($photo, 'image/jpeg'),
            type: 'image/jpeg',
            modifiedAt: $photo['created_time'] ?? null,
            thumbnail: $this->smallest($images)['source'],
        );
    }

    /**
     * Of the sizes Facebook keeps of a photo, the one with the most in it.
     *
     * @return array{source: string, width: int, height: int} | null
     */
    protected function largest(mixed $images): ?array
    {
        return $this->sizes($images)->sortByDesc(fn (array $image): int => $image['width'] * $image['height'])->first();
    }

    /**
     * The smallest size that still makes a picture to choose a photo by.
     *
     * @return array{source: string, width: int, height: int} | null
     */
    protected function smallest(mixed $images): ?array
    {
        $sizes = $this->sizes($images)->sortBy(fn (array $image): int => $image['width'] * $image['height']);

        return $sizes->first(fn (array $image): bool => $image['width'] >= 200) ?? $sizes->last();
    }

    /**
     * @return Collection<int, array{source: string, width: int, height: int}>
     */
    protected function sizes(mixed $images): Collection
    {
        return collect(is_array($images) ? $images : [])
            ->filter(fn (mixed $image): bool => is_array($image) && is_string($image['source'] ?? null) && is_numeric($image['width'] ?? null) && is_numeric($image['height'] ?? null))
            ->map(fn (array $image): array => ['source' => $image['source'], 'width' => (int) $image['width'], 'height' => (int) $image['height']])
            ->values();
    }

    /**
     * Where a photo is kept. No token goes there, and it is fetched through
     * the guard, but it is still only taken when it is a host of Facebook's:
     * `read()` is given it back, and what gives it back is the browser.
     */
    protected function address(string $address): string
    {
        if (strlen($address) > 2048 || ! preg_match('#^https://([a-z0-9-]+\.)+(fbcdn\.net|facebook\.com)/#', $address)) {
            throw SourceException::notAllowed();
        }

        return $address;
    }

    /**
     * A photo on Facebook has no name: it is called after the day it was
     * put there and its id.
     *
     * @param  array<string, mixed>  $photo
     */
    protected function name(array $photo, string $type): string
    {
        try {
            $day = filled($photo['created_time'] ?? null) ? CarbonImmutable::parse((string) $photo['created_time'])->format('Y-m-d') . ' ' : '';
        } catch (Throwable) {
            $day = '';
        }

        $extension = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'][$type] ?? 'jpg';

        return "{$day}{$photo['id']}.{$extension}";
    }

    // Facebook's ids are numbers. They come from the browser and go into
    // an address.
    protected function isId(mixed $id): bool
    {
        return is_string($id) && (bool) preg_match('/^\d{1,40}$/', $id);
    }
}
