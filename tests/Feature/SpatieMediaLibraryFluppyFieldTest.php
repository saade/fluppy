<?php

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\SpatieMediaLibraryFluppyField;
use Saade\Fluppy\Tests\Fixtures\MediaForm;
use Saade\Fluppy\Tests\Fixtures\Post;

beforeEach(function () {
    // The media library only uses a disk it finds in the configuration,
    // which a faked disk is not by itself.
    foreach (['uploads', 'tmp-for-tests'] as $disk) {
        config(["filesystems.disks.{$disk}" => ['driver' => 'local', 'root' => storage_path("framework/testing/disks/{$disk}")]]);

        Storage::fake($disk);
    }

    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
    });

    (include __DIR__ . '/../../vendor/spatie/laravel-medialibrary/database/migrations/create_media_table.php.stub')->up();

    config(['fluppy.chunking.chunk_size' => 1]);
});

afterEach(fn () => MediaForm::$configureUsing = null);

function mediaForm(Post $post, ?Closure $configureUsing = null): Testable
{
    MediaForm::$configureUsing = $configureUsing;

    return Livewire::test(MediaForm::class, ['record' => $post]);
}

function mediaField(Testable $component): SpatieMediaLibraryFluppyField
{
    return $component->instance()->form->getComponent(fn ($field): bool => $field instanceof SpatieMediaLibraryFluppyField);
}

it('is the media library upload field with the view of the package', function () {
    expect(SpatieMediaLibraryFluppyField::make('attachments'))->toBeInstanceOf(SpatieMediaLibraryFileUpload::class);

    mediaForm(Post::create())
        ->assertOk()
        ->assertSeeHtml(['fluppy(', 'fi-fluppy'])
        ->assertDontSeeHtml('fileUploadFormComponent(');
});

it('adds an upload to the collection of the record when the form is saved', function () {
    $post = Post::create();

    mediaForm($post)
        ->set('data.attachments.a1b2', UploadedFile::fake()->createWithContent('report.txt', 'the report'))
        ->call('save')
        ->assertHasNoErrors();

    $media = $post->refresh()->getMedia('attachments');

    expect($media)->toHaveCount(1)
        ->and($media->first()->name)->toBe('report')
        ->and($media->first()->disk)->toBe('uploads')
        ->and(file_get_contents($media->first()->getPath()))->toBe('the report');
});

it('describes the media a record already has, for the browser to show', function () {
    $post = Post::create();

    $media = $post->addMediaFromString('contents')->usingName('photo')->usingFileName('photo.png')->toMediaCollection('attachments', 'uploads');

    $component = mediaForm($post);

    $component->call('callSchemaComponentMethod', mediaField($component)->getKey(), 'getUploadedFiles');

    expect(data_get($component->effects, 'returns.0')[$media->uuid])
        ->toMatchArray(['name' => 'photo', 'size' => 8]);
});

it('adds a file that was sent in chunks to the collection of the record', function () {
    $post = Post::create();

    $contents = str_repeat('a', 1024) . str_repeat('b', 1024) . 'the end';

    $component = mediaForm($post);

    $component->call('callSchemaComponentMethod', mediaField($component)->getKey(), 'planUpload', [
        'file' => ['name' => 'video.txt', 'size' => strlen($contents), 'type' => 'text/plain', 'lastModified' => 1],
    ]);

    $plan = data_get($component->effects, 'returns.0');

    expect($plan)->strategy->toBe('chunked')->totalChunks->toBe(3);

    foreach ([0, 1, 2] as $index) {
        $response = test()
            ->withCookie(session()->getName(), session()->getId())
            ->post($plan['url'], [
                'capability' => $plan['capability'],
                'index' => $index,
                'name' => 'video.txt',
                'type' => 'text/plain',
                'chunk' => UploadedFile::fake()->createWithContent('video.txt', substr($contents, $index * 1024, 1024)),
            ], ['Accept' => 'application/json'])
            ->assertOk();
    }

    $component->call('callSchemaComponentMethod', mediaField($component)->getKey(), 'adoptUpload', [
        'fileKey' => 'a1b2',
        'reference' => $response->json('reference'),
    ]);

    $component->call('save')->assertHasNoErrors();

    $media = $post->refresh()->getMedia('attachments');

    expect($media)->toHaveCount(1)
        ->and($media->first()->name)->toBe('video')
        ->and(file_get_contents($media->first()->getPath()))->toBe($contents);
});

it('removes the media of a file the browser removes, when the form is saved', function () {
    $post = Post::create();

    $media = $post->addMediaFromString('contents')->usingFileName('photo.png')->toMediaCollection('attachments', 'uploads');

    $component = mediaForm($post);

    $component
        ->call('callSchemaComponentMethod', mediaField($component)->getKey(), 'deleteUploadedFile', ['fileKey' => $media->uuid])
        ->call('save')
        ->assertHasNoErrors();

    expect($post->refresh()->getMedia('attachments'))->toHaveCount(0);
});

it('saves new media in the place the field shows it, not last', function () {
    $post = Post::create();

    $post->addMediaFromString('first')->usingName('first')->usingFileName('first.txt')->toMediaCollection('attachments', 'uploads');
    $last = $post->addMediaFromString('last')->usingName('last')->usingFileName('last.txt')->toMediaCollection('attachments', 'uploads');

    $component = mediaForm($post, fn (SpatieMediaLibraryFluppyField $field) => $field->multiple());

    $component
        ->set('data.attachments.a1b2', UploadedFile::fake()->createWithContent('middle.txt', 'middle'))
        ->call('callSchemaComponentMethod', mediaField($component)->getKey(), 'placeUploadedFile', ['fileKey' => 'a1b2', 'beforeFileKey' => $last->uuid])
        ->call('save')
        ->assertHasNoErrors();

    expect($post->refresh()->getMedia('attachments')->pluck('name')->all())->toBe(['first', 'middle', 'last']);
});

it('keeps the media of a record that is saved without changes', function () {
    $post = Post::create();

    $post->addMediaFromString('contents')->usingFileName('photo.png')->toMediaCollection('attachments', 'uploads');

    mediaForm($post)->call('save')->assertHasNoErrors();

    expect($post->refresh()->getMedia('attachments'))->toHaveCount(1);
});
