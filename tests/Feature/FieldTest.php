<?php

use Filament\Forms\Components\FileUpload;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(fn () => Storage::fake('uploads'));

afterEach(fn () => FluppyForm::$configureUsing = null);

function fluppyForm(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing;

    return Livewire::test(FluppyForm::class);
}

function fluppyField(Testable $component): FluppyField
{
    return $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);
}

it('is a file upload field with a view of its own', function () {
    expect(FluppyField::make('attachments'))->toBeInstanceOf(FileUpload::class);

    fluppyForm()
        ->assertOk()
        ->assertSeeHtml(['fluppy(', 'fi-fluppy', 'x-ref="dashboard"'])
        ->assertDontSeeHtml('fileUploadFormComponent(');
});

it('passes its options to the browser', function () {
    fluppyForm(fn (FluppyField $field) => $field
        ->multiple()
        ->maxFiles(fn (): int => 3)
        ->maxSize(2048)
        ->minSize(1)
        ->acceptedFileTypes(['image/png'])
        ->maxParallelUploads(1))
        ->assertSeeHtml([
            'isMultiple: true',
            'maxFiles: 3',
            'maxSize: 2097152',
            'minSize: 1024',
            'maxParallelUploads: 1',
            'acceptedFileTypes: JSON.parse(',
        ]);
});

it('gives the browser the methods of the field to call', function () {
    fluppyForm()->assertSeeHtml([
        "'getUploadedFiles'",
        "'removeUploadedFile'",
        "'deleteUploadedFile'",
        '$wire.upload(',
        '$wire.cancelUpload(',
    ]);
});

it('tells the browser when it is disabled or its files cannot be removed', function () {
    fluppyForm(fn (FluppyField $field) => $field->disabled()->deletable(false))
        ->assertSeeHtml(['isDisabled: true', 'isDeletable: false']);
});

it('stores a file uploaded through Livewire when the form is saved', function () {
    $component = fluppyForm()
        ->set('data.attachments.a1b2', UploadedFile::fake()->create('report.pdf', 20, 'application/pdf'))
        ->call('save')
        ->assertHasNoErrors();

    $path = $component->get('data.attachments');

    expect($path)->toBeString();

    Storage::disk('uploads')->assertExists($path);
});

it('validates an uploaded file with the rules of the field', function () {
    fluppyForm(fn (FluppyField $field) => $field->acceptedFileTypes(['image/png']))
        ->set('data.attachments.a1b2', UploadedFile::fake()->create('report.pdf', 20, 'application/pdf'))
        ->call('save')
        ->assertHasErrors();
});

it('describes the files it already has, for the browser to show', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    $component = fluppyForm();

    $component->set('data.attachments', ['k1' => 'existing/photo.png']);

    $files = fluppyField($component)->getUploadedFiles();

    expect($files)->toHaveKey('k1')
        ->and($files['k1'])->toMatchArray(['name' => 'photo.png', 'size' => 8]);
});

it('forgets a file the browser removes', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    $component = fluppyForm();

    $component->set('data.attachments', ['k1' => 'existing/photo.png']);

    fluppyField($component)->removeUploadedFile('k1');

    expect($component->instance()->data['attachments'])->toBe([]);
});
