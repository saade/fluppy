<?php

namespace Saade\Fluppy\Commands;

use Illuminate\Console\Command;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Saade\Fluppy\Uploads\ChunkedUpload;
use Saade\Fluppy\Uploads\S3MultipartUpload;

class PruneCommand extends Command
{
    protected $signature = 'fluppy:prune {--hours=24 : How old, in hours, an unfinished upload has to be}';

    protected $description = 'Remove what unfinished uploads left on the temporary disk';

    public function handle(): int
    {
        $before = now()->subHours(max(1, (int) $this->option('hours')));

        $this->components->info(sprintf(
            'Removed %d chunked and %d multipart uploads, and %d temporary files.',
            ChunkedUpload::prune($before),
            app(S3MultipartUpload::class)->prune($before),
            $this->pruneTemporaryFiles($before->getTimestamp()),
        ));

        return static::SUCCESS;
    }

    /**
     * Livewire removes its old temporary files when one of its own uploads
     * finishes, and never on S3. A file sent in chunks does not finish
     * through Livewire, so an app that only receives large files would keep
     * them all. The same rule is applied here: off S3, and unless Livewire's
     * clean-up is switched off.
     */
    protected function pruneTemporaryFiles(int $before): int
    {
        if (FileUploadConfiguration::isUsingS3() || ! FileUploadConfiguration::shouldCleanupOldUploads()) {
            return 0;
        }

        $storage = FileUploadConfiguration::storage();

        $files = array_filter(
            $storage->files(FileUploadConfiguration::path()),
            fn (string $file): bool => $storage->lastModified($file) < $before,
        );

        $storage->delete($files);

        return count($files);
    }
}
