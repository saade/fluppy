<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\TestResponse;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\Features\SupportTesting\Testable;
use Livewire\Livewire;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config(['fluppy.chunking.chunk_size' => 1]);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

function chunkedForm(?Closure $configureUsing = null): Testable
{
    FluppyForm::$configureUsing = $configureUsing;

    return Livewire::test(FluppyForm::class);
}

function chunkedField(Testable $component): FluppyField
{
    return $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);
}

/**
 * @return array<string, mixed>
 */
function planChunkedUpload(Testable $component, string $contents, string $name = 'report.txt'): array
{
    $component->call('callSchemaComponentMethod', chunkedField($component)->getKey(), 'planUpload', [
        'file' => ['name' => $name, 'size' => strlen($contents), 'type' => 'text/plain', 'lastModified' => 1],
    ]);

    return data_get($component->effects, 'returns.0');
}

/**
 * @param  array<string, mixed>  $plan
 */
function sendChunk(array $plan, string $contents, int $index, ?string $bytes = null): TestResponse
{
    $bytes ??= substr($contents, $index * $plan['chunkSize'], $plan['chunkSize']);

    return test()
        ->withCookie(session()->getName(), session()->getId())
        ->post($plan['url'], [
            'capability' => $plan['capability'],
            'index' => $index,
            'name' => 'report.txt',
            'type' => 'text/plain',
            'chunk' => UploadedFile::fake()->createWithContent('report.txt', $bytes),
        ], ['Accept' => 'application/json']);
}

it('sends a small file through Livewire', function () {
    expect(planChunkedUpload(chunkedForm(), str_repeat('a', 1024)))->toBe(['strategy' => 'livewire']);
});

it('sends a larger file in chunks', function () {
    $plan = planChunkedUpload(chunkedForm(), str_repeat('a', 2500));

    expect($plan)
        ->strategy->toBe('chunked')
        ->chunkSize->toBe(1024)
        ->totalChunks->toBe(3)
        ->receivedChunks->toBe([])
        ->completed->toBeNull();
});

it('does not chunk when the field or the configuration says not to', function () {
    expect(planChunkedUpload(chunkedForm(fn (FluppyField $field) => $field->chunked(false)), str_repeat('a', 2500)))
        ->toBe(['strategy' => 'livewire']);

    config(['fluppy.chunking.enabled' => false]);

    expect(planChunkedUpload(chunkedForm(), str_repeat('a', 2500)))->toBe(['strategy' => 'livewire']);
});

it('uses the chunk size of the field', function () {
    $plan = planChunkedUpload(chunkedForm(fn (FluppyField $field) => $field->chunkSize(2)), str_repeat('a', 2500));

    expect($plan)->chunkSize->toBe(2048)->totalChunks->toBe(2);
});

it('turns away a file larger than Livewire allows, with the reason', function () {
    config(['livewire.temporary_file_upload.rules' => 'file|max:2']);

    expect(planChunkedUpload(chunkedForm(), str_repeat('a', 2500)))
        ->strategy->toBe('reject')
        ->message->toContain('2 KB');
});

it('turns away a file outside the sizes of the field', function () {
    $component = chunkedForm(fn (FluppyField $field) => $field->maxSize(2)->minSize(1));

    expect(planChunkedUpload($component, str_repeat('a', 2500)))->strategy->toBe('reject')
        ->and(planChunkedUpload($component, 'a'))->strategy->toBe('reject');
});

it('assembles the chunks into a temporary upload the field can store', function () {
    $contents = str_repeat('a', 1024) . str_repeat('b', 1024) . 'the end';

    $component = chunkedForm();

    $plan = planChunkedUpload($component, $contents);

    sendChunk($plan, $contents, 1)->assertOk()->assertJson(['complete' => false, 'received' => [1]]);
    sendChunk($plan, $contents, 0)->assertOk()->assertJson(['complete' => false, 'received' => [0, 1]]);

    $reference = sendChunk($plan, $contents, 2)->assertOk()->assertJson(['complete' => true])->json('reference');

    $component->call('callSchemaComponentMethod', chunkedField($component)->getKey(), 'adoptUpload', [
        'fileKey' => 'a1b2',
        'reference' => $reference,
    ]);

    expect(data_get($component->effects, 'returns.0'))->toBeTrue()
        ->and($component->instance()->data['attachments']['a1b2'])->toBeInstanceOf(TemporaryUploadedFile::class);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe($contents);
});

it('says which chunks it has when the same file is planned again', function () {
    $contents = str_repeat('a', 2500);

    $component = chunkedForm();

    sendChunk(planChunkedUpload($component, $contents), $contents, 1)->assertOk();

    expect(planChunkedUpload($component, $contents))->receivedChunks->toBe([1]);
});

it('answers a last chunk that is sent again with the same file', function () {
    $contents = str_repeat('a', 1500);

    $component = chunkedForm();

    $plan = planChunkedUpload($component, $contents);

    sendChunk($plan, $contents, 0);

    $reference = sendChunk($plan, $contents, 1)->json('reference');

    sendChunk($plan, $contents, 1)->assertOk()->assertJson(['complete' => true, 'reference' => $reference]);

    expect(planChunkedUpload($component, $contents))->completed->toBe($reference);
});

it('leaves no chunks behind once the file is assembled', function () {
    $contents = str_repeat('a', 1500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    sendChunk($plan, $contents, 0);
    sendChunk($plan, $contents, 1);

    expect(FileUploadConfiguration::storage()->allFiles(FileUploadConfiguration::path('fluppy/chunks', false)))
        ->toHaveCount(1)
        ->each->toEndWith('.done');
});

it('refuses a chunk that is not the size that was planned', function () {
    $contents = str_repeat('a', 2500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    sendChunk($plan, $contents, 0, str_repeat('a', 2000))->assertStatus(422);
    sendChunk($plan, $contents, 2, str_repeat('a', 1024))->assertStatus(422);
});

it('refuses a chunk beyond the ones that were planned', function () {
    $contents = str_repeat('a', 2500);

    sendChunk(planChunkedUpload(chunkedForm(), $contents), $contents, 3, 'a')->assertStatus(422);
});

it('refuses a capability it did not sign', function () {
    $contents = str_repeat('a', 2500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    $plan['capability'] = base64_encode(str_repeat('a', 40) . '|1|999999|999999|' . sha1(session()->getId())) . '.' . str_repeat('0', 64);

    sendChunk($plan, $contents, 0)->assertForbidden();
});

it('refuses a capability from another session', function () {
    $contents = str_repeat('a', 2500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    session()->setId(str_repeat('b', 40));

    sendChunk($plan, $contents, 0)->assertForbidden();
});

it('refuses an address it did not sign', function () {
    $contents = str_repeat('a', 2500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    $plan['url'] = route('fluppy.chunks', absolute: false);

    sendChunk($plan, $contents, 0)->assertUnauthorized();
});

it('does not adopt a reference it did not sign', function () {
    $component = chunkedForm();

    $component->call('callSchemaComponentMethod', chunkedField($component)->getKey(), 'adoptUpload', [
        'fileKey' => 'a1b2',
        'reference' => base64_encode('../../.env') . '.' . str_repeat('0', 64),
    ]);

    expect(data_get($component->effects, 'returns.0'))->toBeFalse()
        ->and($component->get('data.attachments'))->toBe([]);
});

it('checks the assembled file against the rules Livewire has for temporary uploads', function () {
    $contents = str_repeat('a', 2500);

    $plan = planChunkedUpload(chunkedForm(), $contents);

    config(['livewire.temporary_file_upload.rules' => 'file|max:1']);

    sendChunk($plan, $contents, 0);
    sendChunk($plan, $contents, 1);
    sendChunk($plan, $contents, 2)->assertStatus(422)->assertJsonValidationErrors('file');
});
