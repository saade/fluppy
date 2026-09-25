<?php

use Filament\Forms\Components\FileUpload;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Js;
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

it('passes the locale of the app and its own messages in that locale', function () {
    app()->setLocale('pt_BR');

    fluppyForm()->assertSeeHtml([
        "locale: 'pt_BR'",
        'uploadFailedMessage: ' . Js::from('Não foi possível enviar o arquivo.'),
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

it('describes a file that was uploaded but not saved yet', function () {
    $component = fluppyForm()
        ->set('data.attachments.a1b2', UploadedFile::fake()->create('report.pdf', 20, 'application/pdf'));

    $files = fluppyField($component)->getUploadedFiles();

    expect($files)->toHaveKey('a1b2')
        ->and($files['a1b2'])->toMatchArray(['name' => 'report.pdf', 'size' => 20 * 1024, 'url' => null]);
});

it('lets the browser ask for its files', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    $component = fluppyForm();

    $component
        ->set('data.attachments', ['k1' => 'existing/photo.png'])
        ->call('callSchemaComponentMethod', fluppyField($component)->getKey(), 'getUploadedFiles');

    expect(data_get($component->effects, 'returns.0'))->toHaveKey('k1.name', 'photo.png');
});

it('tells the browser where else files can come from', function () {
    expect(fluppyField(fluppyForm())->getSources())->toBe([]);

    $component = fluppyForm(fn (FluppyField $field) => $field->camera()->screenCapture(fn (): bool => true)->microphone(false));

    expect(fluppyField($component)->getSources())->toBe(['camera', 'screenCapture']);
});

it('is drawn in the form unless it is a modal', function () {
    fluppyForm()
        ->assertSeeHtml(['isModal: false', 'height: null', 'x-ref="dashboard"'])
        ->assertDontSeeHtml('fi-fluppy-summary');

    fluppyForm(fn (FluppyField $field) => $field->height(fn (): int => 480))
        ->assertSeeHtml('height: 480');

    fluppyForm(fn (FluppyField $field) => $field->modal())
        ->assertSeeHtml(['isModal: true', 'fi-fluppy-summary', 'Choose files'])
        ->assertDontSeeHtml('x-ref="dashboard"');

    fluppyForm(fn (FluppyField $field) => $field->modal()->disabled())
        ->assertSeeHtml('View files')
        ->assertDontSeeHtml('removeFile(');
});

it('lets files be reordered only when it is reorderable', function () {
    fluppyForm()
        ->assertSeeHtml('isReorderable: false')
        ->assertDontSeeHtml('fi-fluppy-reorderable');

    fluppyForm(fn (FluppyField $field) => $field->multiple()->reorderable())
        ->assertSeeHtml(['isReorderable: true', 'fi-fluppy-reorderable', "'reorderUploadedFiles'"]);

    fluppyForm(fn (FluppyField $field) => $field->multiple()->reorderable()->disabled())
        ->assertDontSeeHtml('fi-fluppy-reorderable');
});

it('saves the order the browser gives its files', function () {
    $component = fluppyForm(fn (FluppyField $field) => $field->multiple()->reorderable());

    $component
        ->set('data.attachments', ['k1' => 'a.txt', 'k2' => 'b.txt', 'k3' => 'c.txt'])
        ->call('callSchemaComponentMethod', fluppyField($component)->getKey(), 'reorderUploadedFiles', ['fileKeys' => ['k3', 'k1', 'k2']]);

    expect(array_keys($component->get('data.attachments')))->toBe(['k3', 'k1', 'k2']);
});

it('deletes a stored file the browser removes', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    $component = fluppyForm();

    $component
        ->set('data.attachments', ['k1' => 'existing/photo.png'])
        ->call('callSchemaComponentMethod', fluppyField($component)->getKey(), 'deleteUploadedFile', ['fileKey' => 'k1']);

    expect($component->get('data.attachments'))->toBe([]);
});

it('forgets a file the browser removes', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    $component = fluppyForm();

    $component->set('data.attachments', ['k1' => 'existing/photo.png']);

    fluppyField($component)->removeUploadedFile('k1');

    expect($component->instance()->data['attachments'])->toBe([]);
});
