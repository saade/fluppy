<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;
use Saade\Fluppy\Uploads\S3Copy;

beforeEach(fn () => Storage::fake('uploads'));

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * Stands in for S3: the copy is made on the fake disks, and remembered.
 */
function fakeS3Copy(bool $fails = false): S3Copy
{
    $copy = new class extends S3Copy
    {
        public bool $fails = false;

        /** @var array<string> */
        public array $copied = [];

        public function isPossible(string $disk): bool
        {
            return true;
        }

        public function copy(TemporaryUploadedFile $file, string $disk, string $path): void
        {
            throw_if($this->fails, RuntimeException::class, 'Access Denied');

            Storage::disk($disk)->put($path, $file->get());

            $this->copied[] = $path;
        }
    };

    $copy->fails = $fails;

    app()->instance(S3Copy::class, $copy);

    return $copy;
}

function formWithUpload(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing;

    return Livewire::test(FluppyForm::class)
        ->set('data.attachments.a1b2', UploadedFile::fake()->createWithContent('report.txt', 'contents'));
}

it('is not possible between disks that are not both S3', function () {
    expect(app(S3Copy::class)->isPossible('uploads'))->toBeFalse();
});

it('copies the file inside S3 instead of through the server', function () {
    $copy = fakeS3Copy();

    $component = formWithUpload()->call('save')->assertHasNoErrors();

    expect($copy->copied)->toBe([$component->get('data.attachments')])
        ->and(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe('contents');
});

it('puts the copy where the field stores its files', function () {
    $copy = fakeS3Copy();

    formWithUpload(fn (FluppyField $field) => $field->directory('reports')->preserveFilenames())
        ->call('save')
        ->assertHasNoErrors();

    expect($copy->copied)->toBe(['reports/report.txt']);
});

it('saves the file the usual way when S3 refuses the copy', function () {
    $copy = fakeS3Copy(fails: true);

    $component = formWithUpload()->call('save')->assertHasNoErrors();

    expect($copy->copied)->toBe([])
        ->and(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe('contents');
});
