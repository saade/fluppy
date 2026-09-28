<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\GoogleDriveSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Tests\Fixtures\FakeGoogleDrive;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

const A_GOOGLE_TOKEN = FakeGoogleDrive::TOKEN;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.google_drive' => ['client_id' => 'client.apps.googleusercontent.com', 'api_key' => 'AIza-key', 'app_id' => '1234567890'],
    ]);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * @param  array<string, array<string, mixed>>  $files
 */
function googleDrive(array $files): void
{
    FakeGoogleDrive::serve($files);
}

/**
 * @return array{fileId: string, accessToken: string, platform: string}
 */
function pickedFile(string $fileId, string $accessToken = A_GOOGLE_TOKEN): array
{
    return ['fileId' => $fileId, 'accessToken' => $accessToken, 'platform' => 'drive'];
}

it('describes a picked file from what Google says of it', function () {
    googleDrive(['abc_123-XYZ' => ['name' => 'holiday.mp4', 'mimeType' => 'video/mp4', 'size' => '2500', 'md5Checksum' => 'd41d8']]);

    expect(app(GoogleDriveSource::class)->describe(pickedFile('abc_123-XYZ')))
        ->identity->toBe('abc_123-XYZ|d41d8')
        ->name->toBe('holiday.mp4')
        ->size->toBe(2500)
        ->type->toBe('video/mp4')
        ->acceptsRanges->toBeTrue()
        ->reference->toBe(['fileId' => 'abc_123-XYZ', 'accessToken' => A_GOOGLE_TOKEN, 'export' => null]);

    Http::assertSent(fn (Request $request): bool => str_contains($request->url(), 'supportsAllDrives=true') && str_contains($request->url(), 'fields='));
});

it('describes the file a shortcut leads to', function () {
    googleDrive([
        'shortcut' => ['name' => 'A shortcut', 'mimeType' => 'application/vnd.google-apps.shortcut', 'shortcutDetails' => ['targetId' => 'target']],
        'target' => ['name' => 'report.pdf', 'mimeType' => 'application/pdf', 'size' => '10', 'md5Checksum' => 'abc'],
    ]);

    expect(app(GoogleDriveSource::class)->describe(pickedFile('shortcut')))
        ->name->toBe('report.pdf')
        ->reference->fileId->toBe('target');
});

it('exports a document made in Google\'s editors, whole and under a name with an extension', function (string $type, string $exportedAs, string $name) {
    googleDrive(['doc' => ['name' => 'Plan', 'mimeType' => $type, 'modifiedTime' => '2026-10-01T10:00:00Z']]);

    $source = app(GoogleDriveSource::class);

    $file = $source->describe(pickedFile('doc'));

    expect($file)
        ->identity->toBe('doc|2026-10-01T10:00:00Z')
        ->name->toBe($name)
        ->size->toBeNull()
        ->type->toBe($exportedAs)
        ->acceptsRanges->toBeFalse()
        ->and((string) $source->read($file->reference))->toBe("exported as {$exportedAs}");
})->with([
    ['application/vnd.google-apps.document', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Plan.docx'],
    ['application/vnd.google-apps.spreadsheet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Plan.xlsx'],
    ['application/vnd.google-apps.presentation', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'Plan.pptx'],
    ['application/vnd.google-apps.drawing', 'image/png', 'Plan.png'],
    ['application/vnd.google-apps.jam', 'application/pdf', 'Plan.pdf'],
]);

it('reads the part of a file it is asked for', function () {
    googleDrive(['abc' => ['name' => 'letters.txt', 'mimeType' => 'text/plain', 'size' => '26', 'contents' => 'abcdefghijklmnopqrstuvwxyz']]);

    $source = app(GoogleDriveSource::class);

    expect((string) $source->read(pickedFile('abc'), 2, 5))->toBe('cdef')
        ->and((string) $source->read(pickedFile('abc')))->toBe('abcdefghijklmnopqrstuvwxyz');

    Http::assertSent(fn (Request $request): bool => $request->header('Range') === ['bytes=2-5'] && str_contains($request->url(), 'alt=media'));
});

it('refuses what is not the id of a file, without asking Google', function (mixed $fileId) {
    googleDrive([]);

    expect(fn () => app(GoogleDriveSource::class)->describe([...pickedFile('abc'), 'fileId' => $fileId]))
        ->toThrow(SourceException::class, 'Files cannot be fetched from there.');

    Http::assertNothingSent();
})->with([
    'a path' => ['../about'],
    'another address' => ['abc/export?mimeType=text/plain'],
    'a query' => ['abc?alt=media'],
    'nothing' => [''],
    'not a string' => [['abc']],
]);

it('refuses a file that comes without a token, or to export to a type it does not export to', function () {
    googleDrive(['abc' => ['name' => 'a.txt', 'mimeType' => 'text/plain', 'size' => '1']]);

    $source = app(GoogleDriveSource::class);

    expect(fn () => $source->describe(['fileId' => 'abc']))->toThrow(SourceException::class)
        ->and(fn () => $source->describe(pickedFile('abc', '')))->toThrow(SourceException::class)
        ->and(fn () => $source->read([...pickedFile('abc'), 'export' => 'text/html']))->toThrow(SourceException::class);

    Http::assertNothingSent();
});

it('says that access expired when Google refuses the token, and what Google answered otherwise', function () {
    googleDrive(['abc' => ['name' => 'a.txt', 'mimeType' => 'text/plain', 'size' => '1']]);

    $source = app(GoogleDriveSource::class);

    expect(fn () => $source->describe(pickedFile('abc', 'an-old-token')))->toThrow(SourceException::class, 'has expired')
        ->and(fn () => $source->read(pickedFile('abc', 'an-old-token'), 0, 0))->toThrow(SourceException::class, 'has expired')
        ->and(fn () => $source->describe(pickedFile('gone')))->toThrow(SourceException::class, '404');
});

it('gives the browser what the Picker needs, and says what is missing when it is not configured', function () {
    $component = remoteForm(fn (FluppyField $field) => $field->googleDrive());

    $field = $component->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    expect($field->getRemoteSources())->toBe([
        'google-drive' => [
            'label' => 'Google Drive',
            'clientId' => 'client.apps.googleusercontent.com',
            'apiKey' => 'AIza-key',
            'appId' => '1234567890',
        ],
    ]);

    config(['fluppy.remote.google_drive.api_key' => null]);

    expect(fn () => app(GoogleDriveSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.google_drive');
});

it('fetches a picked file in parts and stores it, without the token ever going back to the browser in the clear', function () {
    $contents = random_bytes(2500);

    googleDrive(['abc' => ['name' => 'holiday.mp4', 'mimeType' => 'video/mp4', 'size' => '2500', 'md5Checksum' => 'd41d8', 'contents' => $contents]]);

    $component = remoteForm(fn (FluppyField $field) => $field->googleDrive());

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'google-drive', 'reference' => pickedFile('abc')]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('holiday.mp4')
        ->size->toBe(2500)
        ->totalChunks->toBe(3)
        ->and(json_encode($plan))->not->toContain(A_GOOGLE_TOKEN);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe($contents);

    // What the file is was asked once, when it was planned, and not again
    // for each of its three parts.
    Http::assertSentCount(4);
});

it('fetches an exported document whole', function () {
    googleDrive(['doc' => ['name' => 'Plan', 'mimeType' => 'application/vnd.google-apps.document', 'modifiedTime' => '2026-10-01T10:00:00Z']]);

    $component = remoteForm(fn (FluppyField $field) => $field->googleDrive());

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'google-drive', 'reference' => pickedFile('doc')]);

    expect($plan)->strategy->toBe('remote')->name->toBe('Plan.docx')->size->toBeNull();

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => askForPart($plan)->assertOk()->json('reference')]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))
        ->toBe('exported as application/vnd.openxmlformats-officedocument.wordprocessingml.document');
});

it('does not fetch from Google Drive for a field that does not have it on', function () {
    googleDrive(['abc' => ['name' => 'a.txt', 'mimeType' => 'text/plain', 'size' => '1']]);

    expect(callRemoteField(remoteForm(), 'planRemoteUpload', ['source' => 'google-drive', 'reference' => pickedFile('abc')]))
        ->strategy->toBe('reject');

    Http::assertNothingSent();
});
