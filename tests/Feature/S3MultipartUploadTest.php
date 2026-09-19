<?php

use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FakeS3MultipartUpload;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;
use Saade\Fluppy\Uploads\S3MultipartUpload;

const TWELVE_MEGABYTES = 12 * 1024 * 1024;

beforeEach(function () {
    Storage::fake('uploads');

    FakeS3MultipartUpload::$uploads = [];

    app()->bind(S3MultipartUpload::class, FakeS3MultipartUpload::class);

    config([
        'filesystems.disks.s3.driver' => 's3',
        'livewire.temporary_file_upload.disk' => 's3',
        'livewire.temporary_file_upload.rules' => 'file|max:102400',
    ]);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

function multipartForm(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing;

    return Livewire::test(FluppyForm::class);
}

function callMultipartField(Testable $component, string $method, array $arguments = []): mixed
{
    $field = $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    $component->call('callSchemaComponentMethod', $field->getKey(), $method, $arguments);

    return data_get($component->effects, 'returns.0');
}

/**
 * @return array<string, mixed>
 */
function planMultipartUpload(Testable $component, int $size = TWELVE_MEGABYTES): array
{
    return callMultipartField($component, 'planUpload', [
        'file' => ['name' => 'video.mp4', 'size' => $size, 'type' => 'video/mp4', 'lastModified' => 1],
    ]);
}

it('sends a file of one part or less to the bucket in one request', function () {
    expect(planMultipartUpload(multipartForm(), 5 * 1024 * 1024))->toBe(['strategy' => 'livewire'])
        ->and(FakeS3MultipartUpload::$uploads)->toBe([]);
});

it('opens a multipart upload for a larger file', function () {
    $plan = planMultipartUpload(multipartForm());

    expect($plan)
        ->strategy->toBe('s3')
        ->partSize->toBe(5 * 1024 * 1024)
        ->totalParts->toBe(3)
        ->uploadedParts->toBe([])
        ->completed->toBeNull()
        ->and(FakeS3MultipartUpload::$uploads)->toHaveCount(1)
        ->and(head(FakeS3MultipartUpload::$uploads)['key'])->toStartWith('livewire-tmp/')->toEndWith('.mp4');
});

it('plans on a disk that throws when a file is not there', function () {
    Storage::fake('tmp-for-tests', ['throw' => true]);

    expect(planMultipartUpload(multipartForm()))->strategy->toBe('s3')->completed->toBeNull();
});

it('uses the part size of the configuration, and never less than S3 accepts', function () {
    config(['fluppy.chunking.s3_part_size' => 6 * 1024]);

    expect(planMultipartUpload(multipartForm()))->partSize->toBe(6 * 1024 * 1024)->totalParts->toBe(2);

    config(['fluppy.chunking.s3_part_size' => 100]);

    expect(planMultipartUpload(multipartForm()))->partSize->toBe(5 * 1024 * 1024);
});

it('continues the same upload when the same file is planned again', function () {
    $component = multipartForm();

    planMultipartUpload($component);

    FakeS3MultipartUpload::receivePart(2, 5 * 1024 * 1024);

    expect(planMultipartUpload($component))->uploadedParts->toBe([2])
        ->and(FakeS3MultipartUpload::$uploads)->toHaveCount(1);
});

it('starts over when S3 no longer has the upload', function () {
    $component = multipartForm();

    planMultipartUpload($component);

    FakeS3MultipartUpload::$uploads = [];

    expect(planMultipartUpload($component))->uploadedParts->toBe([])
        ->and(FakeS3MultipartUpload::$uploads)->toHaveCount(1);
});

it('signs an address for each part that was asked for and exists', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    $addresses = callMultipartField($component, 'signUploadParts', [
        'capability' => $plan['capability'],
        'partNumbers' => [1, 3, 4, 0, 'x'],
    ]);

    expect(array_keys($addresses))->toBe([1, 3])
        ->and($addresses[3])->toContain('partNumber=3');
});

it('signs nothing for a capability it did not issue', function () {
    $component = multipartForm();

    planMultipartUpload($component);

    expect(callMultipartField($component, 'signUploadParts', [
        'capability' => base64_encode(str_repeat('a', 40) . '|' . sha1(session()->getId())) . '.' . str_repeat('0', 64),
        'partNumbers' => [1],
    ]))->toBe([]);
});

it('signs nothing for a capability from another session', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    session()->setId(str_repeat('b', 40));

    expect(callMultipartField($component, 'signUploadParts', [
        'capability' => $plan['capability'],
        'partNumbers' => [1],
    ]))->toBe([]);
});

it('completes the upload into a temporary upload the field can store', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    FakeS3MultipartUpload::receivePart(1, 5 * 1024 * 1024);
    FakeS3MultipartUpload::receivePart(2, 5 * 1024 * 1024);
    FakeS3MultipartUpload::receivePart(3, 2 * 1024 * 1024);

    $reference = callMultipartField($component, 'completeMultipartUpload', ['capability' => $plan['capability']]);

    expect($reference)->toBeString()
        ->and(head(FakeS3MultipartUpload::$uploads)['isCompleted'])->toBeTrue()
        ->and(callMultipartField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => $reference]))->toBeTrue()
        ->and($component->instance()->data['attachments']['a1b2'])->toBeInstanceOf(TemporaryUploadedFile::class);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->size($component->get('data.attachments')))->toBe(TWELVE_MEGABYTES);
});

it('answers with the same file when it is completed or planned again', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    FakeS3MultipartUpload::receivePart(1, 5 * 1024 * 1024);
    FakeS3MultipartUpload::receivePart(2, 5 * 1024 * 1024);
    FakeS3MultipartUpload::receivePart(3, 2 * 1024 * 1024);

    $reference = callMultipartField($component, 'completeMultipartUpload', ['capability' => $plan['capability']]);

    expect(callMultipartField($component, 'completeMultipartUpload', ['capability' => $plan['capability']]))->toBe($reference)
        ->and(planMultipartUpload($component))->completed->toBe($reference);
});

it('does not complete an upload that is missing a part', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    FakeS3MultipartUpload::receivePart(1, 5 * 1024 * 1024);
    FakeS3MultipartUpload::receivePart(3, 2 * 1024 * 1024);

    $component
        ->call('callSchemaComponentMethod', $component->instance()->form->getComponent('attachments')->getKey(), 'completeMultipartUpload', ['capability' => $plan['capability']])
        ->assertStatus(422);

    expect(head(FakeS3MultipartUpload::$uploads)['isCompleted'])->toBeFalse();
});

it('aborts the upload in S3 and forgets it', function () {
    $component = multipartForm();

    $plan = planMultipartUpload($component);

    callMultipartField($component, 'abortMultipartUpload', ['capability' => $plan['capability']]);

    expect(FakeS3MultipartUpload::$uploads)->toBe([])
        ->and(FileUploadConfiguration::storage()->allFiles(FileUploadConfiguration::path('fluppy/multipart', false)))->toBe([]);
});

it('turns away a file larger than Livewire allows before opening an upload', function () {
    config(['livewire.temporary_file_upload.rules' => 'file|max:10240']);

    expect(planMultipartUpload(multipartForm()))->strategy->toBe('reject')
        ->and(FakeS3MultipartUpload::$uploads)->toBe([]);
});
