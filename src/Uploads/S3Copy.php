<?php

namespace Saade\Fluppy\Uploads;

use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use LogicException;

/**
 * Copies a temporary upload to its final place inside S3, so the file never
 * passes through the server. Without it the file is read from the temporary
 * disk and written to the final one by PHP, which a large file does not
 * survive on a server with a time limit.
 *
 * Works within a bucket and from one bucket to another, as long as both are
 * on the same S3 service and the final disk's credentials can read the
 * temporary bucket.
 */
class S3Copy
{
    public function isPossible(string $disk): bool
    {
        return $this->disks($disk) !== null;
    }

    public function copy(TemporaryUploadedFile $file, string $disk, string $path): void
    {
        [$temporary, $final] = $this->disks($disk) ?? throw new LogicException("A file cannot be copied inside S3 to the [{$disk}] disk.");

        // The client copies in parts by itself when the file is larger than
        // S3 copies in one request, which is 5 GB.
        $final->getClient()->copy(
            $temporary->getConfig()['bucket'],
            $temporary->path(FileUploadConfiguration::path($file->getFilename(), false)),
            $final->getConfig()['bucket'],
            $final->path($path),
            ($final->getConfig()['visibility'] ?? null) === 'public' ? 'public-read' : 'private',
            ['params' => ['ContentType' => $file->getMimeType(), 'MetadataDirective' => 'REPLACE']],
        );
    }

    /**
     * @return array{AwsS3V3Adapter, AwsS3V3Adapter} | null The temporary and the final disk, when both are on one S3 service.
     */
    protected function disks(string $disk): ?array
    {
        $temporary = FileUploadConfiguration::storage();
        $final = Storage::disk($disk);

        if (! $temporary instanceof AwsS3V3Adapter || ! $final instanceof AwsS3V3Adapter) {
            return null;
        }

        if (($temporary->getConfig()['endpoint'] ?? null) !== ($final->getConfig()['endpoint'] ?? null)) {
            return null;
        }

        return [$temporary, $final];
    }
}
