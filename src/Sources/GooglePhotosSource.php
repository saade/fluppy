<?php

namespace Saade\Fluppy\Sources;

use LogicException;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\GuardedHttp;
use Saade\Fluppy\Sources\Support\ProbedFile;

/**
 * A photo or a video the person picked in Google's own Photos picker. Like
 * Google Drive's, the picker runs in the browser, where the person signs in
 * and is given an access token that only reaches what they pick. With each
 * item comes the address Google serves it from, which takes that token.
 */
class GooglePhotosSource implements Source
{
    public function __construct(
        protected GuardedHttp $http,
    ) {}

    public function getId(): string
    {
        return 'google-photos';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.google_photos');
    }

    public function getClientOptions(): array
    {
        $clientId = config('fluppy.remote.google_photos.client_id');

        if (blank($clientId)) {
            throw new LogicException('Google Photos needs a client ID. Set `fluppy.remote.google_photos` in the configuration.');
        }

        return ['clientId' => (string) $clientId];
    }

    public function describe(array $reference): RemoteFile
    {
        [$address, $headers] = $this->address($reference);

        $fileId = $reference['fileId'] ?? null;

        if (! is_string($fileId) || ! preg_match('/^[A-Za-z0-9_-]{1,300}$/', $fileId)) {
            throw SourceException::notAllowed();
        }

        // Google's answer says how large the item is, and whether it can be
        // had in parts. What it is called and what kind of file it is the
        // picker told the browser, which is all there is to go by where the
        // answer does not say: no worse than the name a browser gives a
        // file from the device.
        return ProbedFile::describe(
            $this->http->forProvider()->probe($address, [...$headers, ...ProbedFile::FIRST_BYTE]),
            identity: $fileId,
            name: is_string($reference['name'] ?? null) ? $reference['name'] : 'photo',
            type: is_string($reference['type'] ?? null) ? $reference['type'] : null,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        [$address, $headers] = $this->address($reference);

        $isRange = $from !== null && $to !== null;

        $response = $this->http->forProvider()->download(
            $address,
            [...$headers, ...($isRange ? ['Range' => "bytes={$from}-{$to}"] : [])],
            $isRange ? $to - $from + 1 : $limit,
            $isRange,
        );

        if ($response->status() !== ($isRange ? 206 : 200)) {
            throw in_array($response->status(), [401, 403], true)
                ? SourceException::expired()
                : SourceException::failed($response->status());
        }

        return Download::bodyOf($response);
    }

    /**
     * Where the item is served from, and the headers that let the server in.
     *
     * The address comes from the browser. It is only taken when it is one
     * of Google's own for what people upload, so that the token goes nowhere
     * else, and it is still fetched through the guard.
     *
     * @param  array<string, mixed>  $reference
     * @return array{string, array<string, string>}
     */
    protected function address(array $reference): array
    {
        $address = $reference['url'] ?? null;
        $token = $reference['accessToken'] ?? null;

        if (
            ! is_string($address) ||
            strlen($address) > 2048 ||
            ! is_string($token) ||
            $token === '' ||
            strlen($token) > 4096 ||
            ! preg_match('#^https://[a-z0-9-]+\.googleusercontent\.com/#', $address)
        ) {
            throw SourceException::notAllowed();
        }

        return [$address, ['Authorization' => "Bearer {$token}"]];
    }
}
