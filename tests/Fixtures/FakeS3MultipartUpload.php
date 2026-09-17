<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use RuntimeException;
use Saade\Fluppy\Uploads\S3MultipartUpload;
use Throwable;

/**
 * Stands in for S3: multipart uploads are kept in memory, and completing one
 * writes a file of the right size to Livewire's temporary disk.
 */
class FakeS3MultipartUpload extends S3MultipartUpload
{
    /**
     * @var array<string, array{key: string, parts: array<int, int>, isCompleted: bool}>
     */
    public static array $uploads = [];

    public static function receivePart(int $partNumber, int $size, ?string $uploadId = null): void
    {
        static::$uploads[$uploadId ?? array_key_last(static::$uploads)]['parts'][$partNumber] = $size;
    }

    protected function createUpload(string $key, string $type): string
    {
        $uploadId = 'upload-' . (count(static::$uploads) + 1);

        static::$uploads[$uploadId] = ['key' => $key, 'parts' => [], 'isCompleted' => false];

        return $uploadId;
    }

    protected function listParts(array $mapping): array
    {
        if (! isset(static::$uploads[$mapping['uploadId']])) {
            throw new RuntimeException('NoSuchUpload');
        }

        $parts = static::$uploads[$mapping['uploadId']]['parts'];

        ksort($parts);

        return array_map(fn (int $size): array => ['size' => $size, 'etag' => 'etag'], $parts);
    }

    protected function completeUpload(array $mapping, array $parts): void
    {
        static::$uploads[$mapping['uploadId']]['isCompleted'] = true;

        FileUploadConfiguration::storage()->put(
            FileUploadConfiguration::path($mapping['filename'], false),
            str_repeat('a', array_sum(array_column($parts, 'size'))),
        );
    }

    protected function abortUpload(array $mapping): void
    {
        unset(static::$uploads[$mapping['uploadId']]);
    }

    protected function signPart(array $mapping, int $partNumber): string
    {
        return "https://bucket.test/{$mapping['key']}?partNumber={$partNumber}&uploadId={$mapping['uploadId']}";
    }

    protected function isMissingUpload(Throwable $exception): bool
    {
        return $exception->getMessage() === 'NoSuchUpload';
    }
}
