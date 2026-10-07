<?php

namespace Saade\Fluppy\Sources;

use Carbon\CarbonImmutable;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\FileType;
use Saade\Fluppy\Sources\Support\ProbedFile;
use Saade\Fluppy\Sources\Support\Token;
use Throwable;

/**
 * The cloud recordings of a person's Zoom account. Zoom has no folders: it
 * is asked for the recordings of a span of time, a month at most. So the
 * months since the account was made are what is listed at the top, and
 * inside each, the files of the meetings recorded in it.
 */
class ZoomSource extends OAuthSource
{
    protected const API = 'https://api.zoom.us/v2';

    protected const MONTH = 'month:';

    protected const FILE = 'file:';

    protected const NEXT_PAGE = 'next:';

    // Twenty years: an account is not older, and a date that is not one
    // cannot make the list endless.
    protected const MOST_MONTHS = 240;

    public function getId(): string
    {
        return 'zoom';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.zoom');
    }

    protected function getAuthorizationEndpoint(): string
    {
        return 'https://zoom.us/oauth/authorize';
    }

    protected function getTokenEndpoint(): string
    {
        return 'https://zoom.us/oauth/token';
    }

    // Zoom takes the application's credentials in a header.
    protected function postForToken(array $parameters): Response
    {
        $credentials = $this->getCredentials();

        return Http::asForm()
            ->acceptJson()
            ->withBasicAuth($credentials['client_id'], $credentials['client_secret'])
            ->connectTimeout(5)
            ->timeout(15)
            ->post($this->getTokenEndpoint(), $parameters);
    }

    protected function revoke(Token $token): void
    {
        $credentials = $this->getCredentials();

        Http::asForm()
            ->withBasicAuth($credentials['client_id'], $credentials['client_secret'])
            ->connectTimeout(5)
            ->timeout(15)
            ->post('https://zoom.us/oauth/revoke', ['token' => $token->accessToken]);
    }

    public function list(?string $path = null): Listing
    {
        if ($path === null) {
            return $this->months();
        }

        [$month, $nextPageToken] = $this->page($path);

        $response = $this->send(fn (): Response => $this->request()->get(static::API . '/users/me/recordings', [
            'from' => $month->startOfMonth()->toDateString(),
            'to' => $month->endOfMonth()->toDateString(),
            'page_size' => 300,
            ...($nextPageToken === null ? [] : ['next_page_token' => $nextPageToken]),
        ]));

        $items = collect($response->json('meetings') ?? [])
            ->filter(fn (mixed $meeting): bool => is_array($meeting) && is_string($meeting['uuid'] ?? null))
            ->flatMap(fn (array $meeting): array => collect($meeting['recording_files'] ?? [])
                ->filter(fn (mixed $file): bool => is_array($file) && $this->isFetchable($file))
                ->map(fn (array $file): ListedItem => new ListedItem(
                    id: static::FILE . $this->encode($meeting['uuid']) . ':' . $file['id'],
                    name: $name = $this->name($meeting, $file),
                    size: isset($file['file_size']) ? (int) $file['file_size'] : null,
                    type: FileType::ofName($name),
                    modifiedAt: $file['recording_start'] ?? null,
                ))
                ->all())
            ->values()
            ->all();

        return new Listing(
            $items,
            filled($response->json('next_page_token')) ? static::NEXT_PAGE . $month->format('Y-m') . ':' . $response->json('next_page_token') : null,
            $this->rememberAccount(fn (): ?string => $this->me()['email'] ?? null),
        );
    }

    public function describe(array $reference): RemoteFile
    {
        [$meeting, $file] = $this->recording($reference);

        $name = $this->name($meeting, $file);

        // Zoom's API says how large a recording is, but not whether the
        // host it is downloaded from gives it in parts: that it is asked.
        $probe = ProbedFile::describe(
            $this->http->forProvider()->probe($this->address($file), [...$this->authorization(), ...ProbedFile::FIRST_BYTE]),
            identity: '',
            name: $name,
        );

        return new RemoteFile(
            identity: $meeting['uuid'] . '|' . $file['id'] . '|' . ($file['file_size'] ?? ''),
            name: $name,
            size: isset($file['file_size']) ? (int) $file['file_size'] : $probe->size,
            type: FileType::ofName($name),
            acceptsRanges: $probe->acceptsRanges,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        [, $file] = $this->recording($reference);

        return $this->downloadFrom($this->address($file), $from, $to, $limit, $this->authorization());
    }

    protected function months(): Listing
    {
        $me = $this->me();

        $this->rememberAccount(fn (): ?string => $me['email'] ?? null);

        $month = CarbonImmutable::now()->startOfMonth();

        try {
            $first = CarbonImmutable::parse((string) ($me['created_at'] ?? 'now'))->startOfMonth();
        } catch (Throwable) {
            $first = $month;
        }

        $items = [];

        while ($month >= $first && count($items) < static::MOST_MONTHS) {
            $items[] = new ListedItem(
                id: static::MONTH . $month->format('Y-m'),
                name: $month->translatedFormat('F Y'),
                isFolder: true,
            );

            $month = $month->subMonth();
        }

        return new Listing($items, account: $me['email'] ?? null);
    }

    /**
     * @return array{CarbonImmutable, ?string} The month to list, and where in it to go on from.
     */
    protected function page(string $path): array
    {
        $nextPageToken = null;

        if (str_starts_with($path, static::NEXT_PAGE)) {
            [$month, $nextPageToken] = [...explode(':', substr($path, strlen(static::NEXT_PAGE)), 2), ''];

            $path = static::MONTH . $month;
        }

        if (! preg_match('/^' . static::MONTH . '(\d{4})-(0[1-9]|1[0-2])$/', $path, $matches)) {
            throw SourceException::notAllowed();
        }

        return [CarbonImmutable::createFromDate((int) $matches[1], (int) $matches[2], 1)->startOfMonth(), $nextPageToken];
    }

    /**
     * The meeting and the file of it that a reference names, as Zoom has
     * them now.
     *
     * @param  array<string, mixed>  $reference
     * @return array{array<string, mixed>, array<string, mixed>}
     */
    protected function recording(array $reference): array
    {
        $fileId = $reference['fileId'] ?? null;

        if (! is_string($fileId) || ! preg_match('/^' . static::FILE . '([A-Za-z0-9_-]{1,200}):([A-Za-z0-9-]{1,100})$/', $fileId, $matches)) {
            throw SourceException::notAllowed();
        }

        $uuid = $this->decode($matches[1]);

        // A meeting's id can have slashes in it. Zoom wants one that does
        // encoded twice, so that it is still one step of the address once
        // it has been decoded on the way.
        $inAddress = str_starts_with($uuid, '/') || str_contains($uuid, '//')
            ? rawurlencode(rawurlencode($uuid))
            : rawurlencode($uuid);

        $response = $this->send(fn (): Response => $this->request()->get(static::API . "/meetings/{$inAddress}/recordings"), [200, 404]);

        $meeting = $response->json();

        $file = collect(is_array($meeting) ? ($meeting['recording_files'] ?? []) : [])
            ->first(fn (mixed $file): bool => is_array($file) && ($file['id'] ?? null) === $matches[2] && $this->isFetchable($file));

        if ($response->status() === 404 || ! is_array($file)) {
            throw SourceException::notAllowed();
        }

        return [[...$meeting, 'uuid' => $uuid], $file];
    }

    /**
     * @param  array<string, mixed>  $file
     */
    protected function isFetchable(array $file): bool
    {
        return is_string($file['id'] ?? null)
            && filled($file['download_url'] ?? null)
            && ($file['status'] ?? 'completed') === 'completed';
    }

    /**
     * Where Zoom says a recording is downloaded from. The person's token is
     * sent there, so it is only taken when it is one of Zoom's own hosts.
     *
     * @param  array<string, mixed>  $file
     */
    protected function address(array $file): string
    {
        $address = (string) $file['download_url'];

        if (! preg_match('#^https://([a-z0-9-]+\.)*zoom\.us/#', $address)) {
            throw SourceException::notAllowed();
        }

        return $address;
    }

    /**
     * @return array<string, string>
     */
    protected function authorization(): array
    {
        return ['Authorization' => "Bearer {$this->getAccessToken()}"];
    }

    /**
     * A recording has no name of its own: it is a kind of file (the video,
     * the audio, the chat) of a meeting that has a topic and a time.
     *
     * @param  array<string, mixed>  $meeting
     * @param  array<string, mixed>  $file
     */
    protected function name(array $meeting, array $file): string
    {
        $topic = trim((string) ($meeting['topic'] ?? '')) ?: 'Zoom';
        $kind = str_replace('_', ' ', (string) ($file['recording_type'] ?? $file['file_type'] ?? 'recording'));
        $extension = strtolower((string) ($file['file_extension'] ?? $file['file_type'] ?? ''));

        try {
            $date = CarbonImmutable::parse((string) ($file['recording_start'] ?? $meeting['start_time'] ?? ''))->format('Y-m-d H.i');
        } catch (Throwable) {
            $date = '';
        }

        $name = trim("{$topic} {$date} {$kind}");

        // Kept clear of what a file's name cannot have, since it is one.
        $name = mb_substr(trim((string) preg_replace('#[\\\\/:*?"<>|\x00-\x1f\s]+#', ' ', $name)), 0, 200) ?: 'recording';

        return preg_match('/^[a-z0-9]{1,8}$/', $extension) ? "{$name}.{$extension}" : $name;
    }

    /**
     * @return array<string, mixed>
     */
    protected function me(): array
    {
        return (array) $this->send(fn (): Response => $this->request()->get(static::API . '/users/me'))->json();
    }

    protected function encode(string $uuid): string
    {
        return rtrim(strtr(base64_encode($uuid), '+/', '-_'), '=');
    }

    protected function decode(string $encoded): string
    {
        return (string) base64_decode(strtr($encoded, '-_', '+/'), true);
    }
}
