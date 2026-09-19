<?php

namespace Saade\Fluppy\Uploads;

use Aws\Exception\AwsException;
use DateTimeInterface;
use Illuminate\Contracts\Cache\Lock;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Throwable;

use function Livewire\invade;

/**
 * A large file sent straight from the browser to the bucket that is
 * Livewire's temporary disk, as an S3 multipart upload.
 *
 * Modelled on the multipart uploads Livewire has merged for a later release.
 * The server opens the upload and signs an address for each part; the browser
 * sends the parts; the server completes it. A small file,
 * `fluppy/multipart/{fingerprint}.json` on the temporary disk, ties the
 * fingerprint of a file to its upload in S3, which is what lets it resume:
 * S3 is asked which parts it has.
 *
 * The parts are read back from S3 when completing, so the bucket does not
 * have to expose the `ETag` header to the browser.
 */
class S3MultipartUpload
{
    /**
     * The smallest part S3 accepts, apart from the last one.
     */
    public const MIN_PART_SIZE = 5 * 1024 * 1024;

    public const MAX_PARTS_SIGNED_AT_ONCE = 50;

    public static function partSizeFor(int $size): int
    {
        return max(
            static::MIN_PART_SIZE,
            (int) config('fluppy.chunking.s3_part_size', 5120) * 1024,
            (int) ceil($size / ChunkedUpload::MAX_CHUNKS),
        );
    }

    /**
     * @param  array{name: string, size: int, type: string, lastModified: int}  $file
     * @return array<string, mixed>
     */
    public function plan(array $file): array
    {
        $partSize = static::partSizeFor($file['size']);

        $fingerprint = ChunkedUpload::fingerprint($file, $partSize);

        $capability = Signer::sign('s3', $fingerprint . '|' . sha1(session()->getId()));

        if ($filename = $this->completedFilename($fingerprint)) {
            return [
                'strategy' => 's3',
                'capability' => $capability,
                'completed' => ChunkedUpload::referenceTo($filename),
            ];
        }

        // Two requests planning the same file would each open an upload in
        // S3 and leave one of them behind.
        $mapping = $this->withLock($fingerprint, fn (): array => $this->existing($fingerprint) ?? $this->create($fingerprint, $file, $partSize));

        return [
            'strategy' => 's3',
            'capability' => $capability,
            'partSize' => $mapping['partSize'],
            'totalParts' => $this->totalParts($mapping),
            'uploadedParts' => array_keys($this->listParts($mapping)),
            'completed' => null,
        ];
    }

    /**
     * @param  array<mixed>  $partNumbers
     * @return array<int, string> | null
     */
    public function signParts(mixed $capability, array $partNumbers): ?array
    {
        $mapping = $this->mappingFromCapability($capability);

        if (! $mapping) {
            return null;
        }

        return collect($partNumbers)
            ->take(static::MAX_PARTS_SIGNED_AT_ONCE)
            ->map(fn (mixed $number): int => (int) $number)
            ->filter(fn (int $number): bool => $number >= 1 && $number <= $this->totalParts($mapping))
            ->mapWithKeys(fn (int $number): array => [$number => $this->signPart($mapping, $number)])
            ->all();
    }

    /**
     * @return string | null A signed reference to the file, for the field to adopt.
     */
    public function complete(mixed $capability): ?string
    {
        $fingerprint = $this->fingerprintFromCapability($capability);

        if (! $fingerprint) {
            return null;
        }

        if ($filename = $this->completedFilename($fingerprint)) {
            return ChunkedUpload::referenceTo($filename);
        }

        $mapping = $this->mapping($fingerprint);

        if (! $mapping) {
            return null;
        }

        $parts = $this->listParts($mapping);

        // S3 completes whatever parts it is given, so a part that never
        // arrived would leave a shorter file and no error.
        abort_if(
            count($parts) < $this->totalParts($mapping) || array_sum(array_column($parts, 'size')) !== $mapping['size'],
            422,
            'The multipart upload is incomplete.',
        );

        $this->completeUpload($mapping, $parts);

        FileUploadConfiguration::storage()->put($this->mappingPath($fingerprint, 'done'), $mapping['filename']);
        FileUploadConfiguration::storage()->delete($this->mappingPath($fingerprint));

        return ChunkedUpload::referenceTo($mapping['filename']);
    }

    public function abort(mixed $capability): void
    {
        $fingerprint = $this->fingerprintFromCapability($capability);

        $mapping = $fingerprint ? $this->mapping($fingerprint) : null;

        if (! $mapping) {
            return;
        }

        rescue(fn () => $this->abortUpload($mapping), report: false);

        FileUploadConfiguration::storage()->delete($this->mappingPath($fingerprint));
    }

    /**
     * Aborts the uploads that were opened before the given time and never
     * completed, and forgets the answers remembered for finished ones.
     *
     * @return int The number of unfinished uploads aborted.
     */
    public function prune(DateTimeInterface $before): int
    {
        $storage = FileUploadConfiguration::storage();
        $aborted = 0;

        foreach ($storage->files(FileUploadConfiguration::path('fluppy/multipart', false)) as $file) {
            if ($storage->lastModified($file) >= $before->getTimestamp()) {
                continue;
            }

            if (str_ends_with($file, '.json') && ($mapping = json_decode((string) $storage->get($file), true))) {
                rescue(fn () => $this->abortUpload($mapping), report: false);

                $aborted++;
            }

            $storage->delete($file);
        }

        return $aborted;
    }

    /**
     * @param  array{name: string, size: int, type: string, lastModified: int}  $file
     * @return array<string, mixed>
     */
    protected function create(string $fingerprint, array $file, int $partSize): array
    {
        $filename = TemporaryUploadedFile::generateHashNameWithOriginalNameEmbedded(
            UploadedFile::fake()->create($file['name']),
        );

        $key = FileUploadConfiguration::path($filename);

        $mapping = [
            'filename' => $filename,
            'key' => $key,
            'uploadId' => $this->createUpload($key, $file['type'] ?: 'application/octet-stream'),
            'partSize' => $partSize,
            'size' => $file['size'],
        ];

        FileUploadConfiguration::storage()->put($this->mappingPath($fingerprint), json_encode($mapping));

        return $mapping;
    }

    /**
     * @return array<string, mixed> | null
     */
    protected function existing(string $fingerprint): ?array
    {
        $mapping = $this->mapping($fingerprint);

        if (! $mapping) {
            return null;
        }

        try {
            $this->listParts($mapping);
        } catch (Throwable $exception) {
            // Only when S3 says the upload is gone. Any other failure
            // (throttling, a timeout) must not make a live upload start over.
            if (! $this->isMissingUpload($exception)) {
                throw $exception;
            }

            FileUploadConfiguration::storage()->delete($this->mappingPath($fingerprint));

            return null;
        }

        return $mapping;
    }

    /**
     * @param  array<string, mixed>  $mapping
     */
    protected function totalParts(array $mapping): int
    {
        return max(1, (int) ceil($mapping['size'] / $mapping['partSize']));
    }

    /**
     * @return array<string, mixed> | null
     */
    protected function mapping(string $fingerprint): ?array
    {
        $contents = FileUploadConfiguration::storage()->get($this->mappingPath($fingerprint));

        return $contents ? json_decode($contents, true) : null;
    }

    /**
     * @return array<string, mixed> | null
     */
    protected function mappingFromCapability(mixed $capability): ?array
    {
        $fingerprint = $this->fingerprintFromCapability($capability);

        return $fingerprint ? $this->mapping($fingerprint) : null;
    }

    protected function fingerprintFromCapability(mixed $capability): ?string
    {
        $payload = Signer::verify('s3', $capability);

        if ($payload === null || ! preg_match('/^([a-f0-9]{40})\|([a-f0-9]{40})$/', $payload, $matches)) {
            return null;
        }

        return hash_equals(sha1(session()->getId()), $matches[2]) ? $matches[1] : null;
    }

    protected function completedFilename(string $fingerprint): ?string
    {
        return FileUploadConfiguration::storage()->get($this->mappingPath($fingerprint, 'done'));
    }

    protected function mappingPath(string $fingerprint, string $extension = 'json'): string
    {
        return FileUploadConfiguration::path("fluppy/multipart/{$fingerprint}.{$extension}", false);
    }

    /**
     * @template TReturn
     *
     * @param  callable(): TReturn  $callback
     * @return TReturn
     */
    protected function withLock(string $fingerprint, callable $callback): mixed
    {
        $lock = rescue(fn (): Lock => Cache::lock("fluppy-multipart:{$fingerprint}", 60), report: false);

        try {
            $lock?->block(15);
        } catch (LockTimeoutException) {
            // The other request has written its mapping by now.
            return $callback();
        }

        try {
            return $callback();
        } finally {
            $lock?->release();
        }
    }

    protected function createUpload(string $key, string $type): string
    {
        return $this->client()->createMultipartUpload([
            'Bucket' => $this->bucket(),
            'Key' => $key,
            'ACL' => 'private',
            'ContentType' => $type,
        ])['UploadId'];
    }

    /**
     * @param  array<string, mixed>  $mapping
     * @return array<int, array{size: int, etag: string}> By part number.
     */
    protected function listParts(array $mapping): array
    {
        $parts = [];
        $marker = null;

        do {
            $result = $this->client()->listParts(array_filter([
                'Bucket' => $this->bucket(),
                'Key' => $mapping['key'],
                'UploadId' => $mapping['uploadId'],
                'PartNumberMarker' => $marker,
            ]));

            foreach ($result['Parts'] ?? [] as $part) {
                $parts[(int) $part['PartNumber']] = ['size' => (int) $part['Size'], 'etag' => $part['ETag']];
            }

            $marker = $result['NextPartNumberMarker'] ?? null;
        } while (($result['IsTruncated'] ?? false) && $marker);

        ksort($parts);

        return $parts;
    }

    /**
     * @param  array<string, mixed>  $mapping
     * @param  array<int, array{size: int, etag: string}>  $parts
     */
    protected function completeUpload(array $mapping, array $parts): void
    {
        $this->client()->completeMultipartUpload([
            'Bucket' => $this->bucket(),
            'Key' => $mapping['key'],
            'UploadId' => $mapping['uploadId'],
            'MultipartUpload' => [
                'Parts' => collect($parts)
                    ->map(fn (array $part, int $number): array => ['PartNumber' => $number, 'ETag' => $part['etag']])
                    ->values()
                    ->all(),
            ],
        ]);
    }

    /**
     * @param  array<string, mixed>  $mapping
     */
    protected function abortUpload(array $mapping): void
    {
        $this->client()->abortMultipartUpload([
            'Bucket' => $this->bucket(),
            'Key' => $mapping['key'],
            'UploadId' => $mapping['uploadId'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $mapping
     */
    protected function signPart(array $mapping, int $partNumber): string
    {
        $storage = FileUploadConfiguration::storage();

        $uri = $this->client()->createPresignedRequest(
            $this->client()->getCommand('uploadPart', [
                'Bucket' => $this->bucket(),
                'Key' => $mapping['key'],
                'UploadId' => $mapping['uploadId'],
                'PartNumber' => $partNumber,
            ]),
            '+' . FileUploadConfiguration::maxUploadTime() . ' minutes',
        )->getUri();

        // A disk can be reached by the browser at another address than by the
        // server. Laravel keeps the method that swaps it to itself.
        if (filled($url = $storage->getConfig()['temporary_url'] ?? null)) {
            $uri = invade($storage)->replaceBaseUrl($uri, $url);
        }

        return (string) $uri;
    }

    protected function isMissingUpload(Throwable $exception): bool
    {
        return $exception instanceof AwsException && $exception->getAwsErrorCode() === 'NoSuchUpload';
    }

    protected function client(): mixed
    {
        return FileUploadConfiguration::storage()->getClient();
    }

    protected function bucket(): string
    {
        return FileUploadConfiguration::storage()->getConfig()['bucket'];
    }
}
