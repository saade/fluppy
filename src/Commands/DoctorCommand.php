<?php

namespace Saade\Fluppy\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Number;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Saade\Fluppy\Uploads\ChunkedUpload;
use Saade\Fluppy\Uploads\S3Copy;
use Saade\Fluppy\Uploads\S3MultipartUpload;
use Throwable;

class DoctorCommand extends Command
{
    protected $signature = 'fluppy:doctor
        {--disk=* : A disk that fields store their files on, to check against the temporary disk}
        {--url= : The address of the app as a browser reaches it, when it is not APP_URL}';

    protected $description = 'Check everything a large upload passes through';

    protected bool $hasFailures = false;

    public function handle(): int
    {
        $this->checkLivewire();

        FileUploadConfiguration::isUsingS3()
            ? $this->checkS3()
            : $this->checkChunks();

        $this->checkSaving();
        $this->checkPruning();

        return $this->hasFailures ? static::FAILURE : static::SUCCESS;
    }

    protected function checkLivewire(): void
    {
        $this->components->info('Livewire');

        $disk = config('livewire.temporary_file_upload.disk') ?: config('filesystems.default');

        $this->passes('Temporary disk', sprintf('%s (%s)', $disk, config("filesystems.disks.{$disk}.driver") ?? 'not configured'));

        $max = $this->temporaryUploadMaxSize();

        match (true) {
            $max === null => $this->warns('Largest file', 'no limit in livewire.temporary_file_upload.rules'),
            config('livewire.temporary_file_upload.rules') === null => $this->warns('Largest file', Number::fileSize($max * 1024) . ', Livewire\'s default. Raise it in livewire.temporary_file_upload.rules'),
            default => $this->passes('Largest file', Number::fileSize($max * 1024)),
        };

        ChunkedUpload::isEnabled()
            ? $this->passes('Chunked uploads', 'on')
            : $this->warns('Chunked uploads', 'off in fluppy.chunking.enabled: every file is sent in one request');
    }

    protected function checkChunks(): void
    {
        $this->components->info('Chunks');

        try {
            $path = FileUploadConfiguration::path('fluppy/doctor.tmp', false);

            FileUploadConfiguration::storage()->put($path, 'x');
            FileUploadConfiguration::storage()->delete($path);

            $this->passes('Temporary disk', 'can be written to');
        } catch (Throwable $exception) {
            $this->fails('Temporary disk', 'cannot be written to: ' . $exception->getMessage());
        }

        $this->checkChunkSize();
    }

    /**
     * The limits that count are those of PHP behind the web server, and of
     * the web server itself, neither of which can be read from here. So the
     * app is asked for the first, and sent a chunk of the size it would
     * plan to find out about the second.
     */
    protected function checkChunkSize(): void
    {
        $url = rtrim($this->option('url') ?: config('app.url'), '/')
            . URL::temporarySignedRoute('fluppy.doctor', now()->addMinutes(5), absolute: false);

        try {
            $limits = Http::timeout(30)->acceptJson()->attach('chunk', 'x', 'doctor.bin')->post($url);
        } catch (Throwable $exception) {
            $this->warns('Chunk size', "the app could not be reached at {$url} to check it: " . $exception->getMessage());

            return;
        }

        if (! is_int($chunkSize = $limits->json('chunk_size'))) {
            $this->fails('Chunk size', "the app answered {$limits->status()} at {$url}");

            return;
        }

        $configured = (int) config('fluppy.chunking.chunk_size', 900) * 1024;

        $chunkSize < $configured
            ? $this->warns('Chunk size', sprintf(
                '%s, lowered from %s to fit upload_max_filesize (%s) and post_max_size (%s)',
                Number::fileSize($chunkSize),
                Number::fileSize($configured),
                $limits->json('upload_max_filesize'),
                $limits->json('post_max_size'),
            ))
            : $this->passes('Chunk size', Number::fileSize($chunkSize));

        $response = Http::timeout(60)->acceptJson()->attach('chunk', str_repeat('0', $chunkSize), 'doctor.bin')->post($url);

        match (true) {
            $response->status() === 413 => $this->fails('A chunk', sprintf(
                'of %s is refused by the web server (413). Raise its request size (client_max_body_size in nginx) or lower fluppy.chunking.chunk_size',
                Number::fileSize($chunkSize),
            )),
            $response->json('received') === $chunkSize => $this->passes('A chunk', sprintf('of %s reaches the app whole', Number::fileSize($chunkSize))),
            default => $this->fails('A chunk', sprintf('of %s does not reach the app (status %d)', Number::fileSize($chunkSize), $response->status())),
        };
    }

    protected function checkS3(): void
    {
        $this->components->info('S3');

        try {
            $storage = FileUploadConfiguration::storage();
        } catch (Throwable $exception) {
            $this->fails('Temporary disk', $exception->getMessage());

            return;
        }

        if (! $storage instanceof AwsS3V3Adapter) {
            $this->fails('Temporary disk', 'is not an S3 disk. Is league/flysystem-aws-s3-v3 installed?');

            return;
        }

        $client = $storage->getClient();
        $bucket = $storage->getConfig()['bucket'];

        $this->passes('Part size', Number::fileSize(S3MultipartUpload::partSizeFor(0)));

        try {
            $uploads = $client->listMultipartUploads(['Bucket' => $bucket])['Uploads'] ?? [];

            $this->passes('Bucket', sprintf('%s can be reached, %d multipart %s open', $bucket, count($uploads), str('upload')->plural(count($uploads))));
        } catch (Throwable $exception) {
            $this->fails('Bucket', "{$bucket} cannot list multipart uploads: " . $this->reason($exception));
        }

        try {
            $rules = $client->getBucketCors(['Bucket' => $bucket])['CORSRules'] ?? [];

            collect($rules)->contains(fn (array $rule): bool => in_array('PUT', $rule['AllowedMethods'] ?? []) && $this->allowsOrigin($rule['AllowedOrigins'] ?? []))
                ? $this->passes('CORS', "PUT is allowed from {$this->origin()}")
                : $this->fails('CORS', "no rule allows PUT from {$this->origin()}: the browser cannot send parts to the bucket");
        } catch (Throwable $exception) {
            $this->reason($exception) === 'NoSuchCORSConfiguration'
                ? $this->warns('CORS', "the bucket has no CORS rules. Unless the service allows every origin by itself, as MinIO does, the browser cannot send parts from {$this->origin()}")
                : $this->warns('CORS', $this->unreadable($exception) . ": check that PUT is allowed from {$this->origin()}");
        }

        try {
            $rules = $client->getBucketLifecycleConfiguration(['Bucket' => $bucket])['Rules'] ?? [];

            collect($rules)->contains(fn (array $rule): bool => ($rule['Status'] ?? null) === 'Enabled' && isset($rule['AbortIncompleteMultipartUpload']))
                ? $this->passes('Lifecycle', 'incomplete multipart uploads are aborted')
                : $this->warns('Lifecycle', 'no rule aborts incomplete multipart uploads: abandoned ones stay, and are billed');
        } catch (Throwable $exception) {
            $this->warns('Lifecycle', $this->unreadable($exception) . ': check that a rule aborts incomplete multipart uploads');
        }
    }

    protected function checkSaving(): void
    {
        if (! $this->option('disk')) {
            return;
        }

        $this->components->info('Saving');

        foreach ($this->option('disk') as $disk) {
            try {
                app(S3Copy::class)->isPossible($disk)
                    ? $this->passes($disk, 'files are copied inside S3')
                    : $this->warns($disk, 'files pass through the server on save: a large file needs the time and the room');
            } catch (Throwable $exception) {
                $this->fails($disk, $exception->getMessage());
            }
        }
    }

    protected function checkPruning(): void
    {
        $this->components->info('Clean-up');

        collect(app(Schedule::class)->events())->contains(fn ($event): bool => str_contains((string) $event->command, 'fluppy:prune'))
            ? $this->passes('fluppy:prune', 'is scheduled')
            : $this->warns('fluppy:prune', 'is not scheduled: unfinished uploads are never removed');
    }

    protected function temporaryUploadMaxSize(): ?int
    {
        foreach (FileUploadConfiguration::rules() as $rule) {
            if (is_string($rule) && preg_match('/^max:(\d+)$/', $rule, $matches)) {
                return (int) $matches[1];
            }
        }

        return null;
    }

    protected function origin(): string
    {
        $url = parse_url($this->option('url') ?: config('app.url'));

        return ($url['scheme'] ?? 'https') . '://' . ($url['host'] ?? '') . (isset($url['port']) ? ":{$url['port']}" : '');
    }

    /**
     * @param  array<string>  $allowedOrigins
     */
    protected function allowsOrigin(array $allowedOrigins): bool
    {
        return collect($allowedOrigins)->contains(fn (string $allowed): bool => str($this->origin())->is($allowed));
    }

    protected function reason(Throwable $exception): string
    {
        return method_exists($exception, 'getAwsErrorCode') && $exception->getAwsErrorCode()
            ? $exception->getAwsErrorCode()
            : $exception->getMessage();
    }

    /**
     * A key that may only read and write objects, which is all uploads
     * need, is refused the settings of the bucket.
     */
    protected function unreadable(Throwable $exception): string
    {
        return match ($reason = $this->reason($exception)) {
            'AccessDenied' => 'this key may not read the bucket\'s settings',
            'NoSuchLifecycleConfiguration' => 'the bucket has no lifecycle rules',
            default => "could not be read ({$reason})",
        };
    }

    protected function passes(string $check, string $result): void
    {
        $this->components->twoColumnDetail($check, "<fg=green>{$result}</>");
    }

    protected function warns(string $check, string $result): void
    {
        $this->components->twoColumnDetail($check, "<fg=yellow>{$result}</>");
    }

    protected function fails(string $check, string $result): void
    {
        $this->hasFailures = true;

        $this->components->twoColumnDetail($check, "<fg=red>{$result}</>");
    }
}
