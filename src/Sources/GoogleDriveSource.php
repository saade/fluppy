<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use LogicException;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;

/**
 * A file the person picked in Google's own Picker. The Picker runs in the
 * browser, where the person signs in to Google and is given an access token
 * that only reaches the files they pick. That token comes here with each
 * file, and is all the server ever has: no client secret, nothing stored.
 */
class GoogleDriveSource implements Source
{
    protected const API = 'https://www.googleapis.com/drive/v3/files';

    protected const FIELDS = 'id,name,mimeType,size,md5Checksum,modifiedTime,shortcutDetails(targetId)';

    protected const SHORTCUT = 'application/vnd.google-apps.shortcut';

    /**
     * Documents made in Google's editors have no bytes of their own: they
     * are exported, to these types. Any other is exported as a PDF.
     */
    protected const EXPORTS = [
        'application/vnd.google-apps.document' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
        'application/vnd.google-apps.spreadsheet' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
        'application/vnd.google-apps.presentation' => ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
        'application/vnd.google-apps.drawing' => ['image/png', 'png'],
    ];

    public function getId(): string
    {
        return 'google-drive';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.google_drive');
    }

    public function getClientOptions(): array
    {
        $options = [
            'clientId' => config('fluppy.remote.google_drive.client_id'),
            'apiKey' => config('fluppy.remote.google_drive.api_key'),
            'appId' => config('fluppy.remote.google_drive.app_id'),
        ];

        if (in_array(null, array_map(fn (mixed $option): ?string => filled($option) ? (string) $option : null, $options), true)) {
            throw new LogicException('Google Drive needs a client ID, an API key and an app ID. Set `fluppy.remote.google_drive` in the configuration.');
        }

        return array_map(strval(...), $options);
    }

    public function describe(array $reference): RemoteFile
    {
        $file = $this->metadata($reference, $this->fileId($reference['fileId'] ?? null));

        if (($file['mimeType'] ?? null) === static::SHORTCUT) {
            $file = $this->metadata($reference, $this->fileId($file['shortcutDetails']['targetId'] ?? null));
        }

        $export = $this->exportOf($file);

        return new RemoteFile(
            identity: $file['id'] . '|' . ($file['md5Checksum'] ?? $file['modifiedTime'] ?? ''),
            name: $this->name($file, $export),
            size: $export || ! is_numeric($file['size'] ?? null) ? null : (int) $file['size'],
            type: $export[0] ?? ($file['mimeType'] ?? null),
            acceptsRanges: ! $export,
            // Each part is read in a request of its own, which should not
            // have to ask again where a shortcut leads and what to export.
            reference: [
                'fileId' => $file['id'],
                'accessToken' => $reference['accessToken'],
                'export' => $export[0] ?? null,
            ],
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $fileId = $this->fileId($reference['fileId'] ?? null);

        $export = $reference['export'] ?? null;

        if ($export !== null && ! in_array($export, ['application/pdf', ...array_column(static::EXPORTS, 0)], true)) {
            throw SourceException::notAllowed();
        }

        $isRange = ! $export && $from !== null && $to !== null;

        $request = $this->request($reference)->withHeaders($isRange ? ['Range' => "bytes={$from}-{$to}"] : []);

        $response = Download::upTo(
            $isRange ? $to - $from + 1 : $limit,
            fn (array $options): Response => $request->withOptions($options)->get(
                $export ? static::API . "/{$fileId}/export" : static::API . "/{$fileId}",
                $export ? ['mimeType' => $export] : ['alt' => 'media', 'supportsAllDrives' => 'true'],
            ),
            $isRange,
        );

        if ($response->status() !== ($isRange ? 206 : 200)) {
            throw $this->failure($response);
        }

        return Download::bodyOf($response);
    }

    /**
     * @param  array<string, mixed>  $reference
     * @return array<string, mixed>
     */
    protected function metadata(array $reference, string $fileId): array
    {
        $response = $this->send($this->request($reference), static::API . "/{$fileId}", [
            'fields' => static::FIELDS,
            'supportsAllDrives' => 'true',
        ]);

        if (! $response->successful() || ! is_array($file = $response->json()) || blank($file['id'] ?? null)) {
            throw $this->failure($response);
        }

        return $file;
    }

    /**
     * @param  array<string, mixed>  $reference
     */
    protected function request(array $reference): PendingRequest
    {
        $token = $reference['accessToken'] ?? null;

        if (! is_string($token) || $token === '' || strlen($token) > 4096) {
            throw SourceException::notAllowed();
        }

        return Http::withToken($token)
            ->withOptions(['allow_redirects' => ['max' => 3, 'protocols' => ['https']]])
            ->connectTimeout(5)
            ->timeout((int) config('fluppy.remote.timeout', 60));
    }

    /**
     * @param  array<string, string>  $query
     */
    protected function send(PendingRequest $request, string $url, array $query): Response
    {
        try {
            return $request->get($url, $query);
        } catch (ConnectionException) {
            throw SourceException::unreachable();
        }
    }

    // The id comes from the browser and goes into an address.
    protected function fileId(mixed $fileId): string
    {
        if (! is_string($fileId) || ! preg_match('/^[A-Za-z0-9_-]{1,200}$/', $fileId)) {
            throw SourceException::notAllowed();
        }

        return $fileId;
    }

    /**
     * @param  array<string, mixed>  $file
     * @return array{string, string} | null The type a document is exported to and its extension. Null for a file that has bytes of its own.
     */
    protected function exportOf(array $file): ?array
    {
        $type = (string) ($file['mimeType'] ?? '');

        if (! str_starts_with($type, 'application/vnd.google-apps.')) {
            return null;
        }

        return static::EXPORTS[$type] ?? ['application/pdf', 'pdf'];
    }

    /**
     * @param  array<string, mixed>  $file
     * @param  array{string, string} | null  $export
     */
    protected function name(array $file, ?array $export): string
    {
        $name = mb_substr(basename(str_replace('\\', '/', (string) ($file['name'] ?? ''))), 0, 250) ?: 'file';

        if ($export && ! str_ends_with(strtolower($name), ".{$export[1]}")) {
            $name .= ".{$export[1]}";
        }

        return $name;
    }

    protected function failure(Response $response): SourceException
    {
        return in_array($response->status(), [401, 403], true)
            ? SourceException::expired()
            : SourceException::failed($response->status());
    }
}
