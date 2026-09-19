<?php

use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Saade\Fluppy\Tests\Fixtures\FakeS3MultipartUpload;
use Saade\Fluppy\Uploads\S3MultipartUpload;

beforeEach(function () {
    FileUploadConfiguration::storage()->deleteDirectory(FileUploadConfiguration::path());

    FakeS3MultipartUpload::$uploads = [];

    app()->bind(S3MultipartUpload::class, FakeS3MultipartUpload::class);
});

/**
 * Puts a file in Livewire's temporary directory, last changed so many hours ago.
 */
function temporaryFile(string $path, int $hoursAgo, string $contents = 'x'): string
{
    $storage = FileUploadConfiguration::storage();
    $path = FileUploadConfiguration::path($path, false);

    $storage->put($path, $contents);

    touch($storage->path($path), now()->subHours($hoursAgo)->getTimestamp());

    return $path;
}

it('removes the chunks of an upload that stopped a day ago and keeps one still arriving', function () {
    $abandoned = temporaryFile('fluppy/chunks/' . str_repeat('a', 40) . '/0.part', 30);
    temporaryFile('fluppy/chunks/' . str_repeat('b', 40) . '/0.part', 30);
    $arriving = temporaryFile('fluppy/chunks/' . str_repeat('b', 40) . '/1.part', 1);

    test()->artisan('fluppy:prune')->assertSuccessful()->expectsOutputToContain('Removed 1 chunked');

    expect(FileUploadConfiguration::storage()->exists($abandoned))->toBeFalse()
        ->and(FileUploadConfiguration::storage()->exists($arriving))->toBeTrue()
        ->and(FileUploadConfiguration::storage()->directories(FileUploadConfiguration::path('fluppy/chunks', false)))->toHaveCount(1);
});

it('forgets the answers it remembered for uploads that finished a day ago', function () {
    $old = temporaryFile('fluppy/chunks/' . str_repeat('a', 40) . '.done', 30);
    $recent = temporaryFile('fluppy/chunks/' . str_repeat('b', 40) . '.done', 1);

    test()->artisan('fluppy:prune')->assertSuccessful();

    expect(FileUploadConfiguration::storage()->exists($old))->toBeFalse()
        ->and(FileUploadConfiguration::storage()->exists($recent))->toBeTrue();
});

it('aborts the multipart uploads that were opened a day ago and never completed', function () {
    FakeS3MultipartUpload::$uploads = [
        'old' => ['key' => 'livewire-tmp/old.bin', 'parts' => [], 'isCompleted' => false],
        'recent' => ['key' => 'livewire-tmp/recent.bin', 'parts' => [], 'isCompleted' => false],
    ];

    $old = temporaryFile('fluppy/multipart/' . str_repeat('a', 40) . '.json', 30, json_encode(['uploadId' => 'old', 'key' => 'livewire-tmp/old.bin']));
    $recent = temporaryFile('fluppy/multipart/' . str_repeat('b', 40) . '.json', 1, json_encode(['uploadId' => 'recent', 'key' => 'livewire-tmp/recent.bin']));
    $done = temporaryFile('fluppy/multipart/' . str_repeat('c', 40) . '.done', 30);

    test()->artisan('fluppy:prune')->assertSuccessful()->expectsOutputToContain('1 multipart');

    expect(array_keys(FakeS3MultipartUpload::$uploads))->toBe(['recent'])
        ->and(FileUploadConfiguration::storage()->exists($old))->toBeFalse()
        ->and(FileUploadConfiguration::storage()->exists($done))->toBeFalse()
        ->and(FileUploadConfiguration::storage()->exists($recent))->toBeTrue();
});

it('removes temporary uploads older than a day, as Livewire does', function () {
    $old = temporaryFile('old-upload.bin', 30);
    $recent = temporaryFile('recent-upload.bin', 1);

    test()->artisan('fluppy:prune')->assertSuccessful()->expectsOutputToContain('1 temporary');

    expect(FileUploadConfiguration::storage()->exists($old))->toBeFalse()
        ->and(FileUploadConfiguration::storage()->exists($recent))->toBeTrue();
});

it('leaves temporary uploads alone when Livewire is told not to clean them up', function () {
    config(['livewire.temporary_file_upload.cleanup' => false]);

    $old = temporaryFile('old-upload.bin', 30);

    test()->artisan('fluppy:prune')->assertSuccessful();

    expect(FileUploadConfiguration::storage()->exists($old))->toBeTrue();
});

it('leaves temporary uploads on S3 to the lifecycle rules of the bucket', function () {
    config(['filesystems.disks.s3.driver' => 's3', 'livewire.temporary_file_upload.disk' => 's3']);

    $old = temporaryFile('old-upload.bin', 30);

    test()->artisan('fluppy:prune')->assertSuccessful();

    expect(FileUploadConfiguration::storage()->exists($old))->toBeTrue();
});

it('takes the age from an option', function () {
    $file = temporaryFile('fluppy/chunks/' . str_repeat('a', 40) . '/0.part', 3);

    test()->artisan('fluppy:prune')->assertSuccessful();

    expect(FileUploadConfiguration::storage()->exists($file))->toBeTrue();

    test()->artisan('fluppy:prune', ['--hours' => 2])->assertSuccessful();

    expect(FileUploadConfiguration::storage()->exists($file))->toBeFalse();
});
