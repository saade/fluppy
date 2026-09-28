<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeGoogleDrive;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

const A_LINK_TO_IMPORT = 'https://files.example.com/videos/holiday.mp4';

beforeEach(function () {
    config([
        // 64 KB, so that a file of a few hundred is fetched in several parts.
        'fluppy.remote.part_size' => 64,
        'fluppy.remote.google_drive' => ['client_id' => 'client.apps.googleusercontent.com', 'api_key' => 'AIza-key', 'app_id' => '1234567890'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['93.184.216.34']);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->importFromUrl();
});

function serveAtEveryLink(string $contents, bool $acceptsRanges = true): void
{
    Http::fake(function (Request $request) use ($contents, $acceptsRanges) {
        if ($acceptsRanges && preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(
                substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1),
                206,
                ['Content-Type' => 'video/mp4', 'Content-Range' => "bytes {$range[1]}-{$range[2]}/" . strlen($contents)],
            );
        }

        return Http::response($contents, 200, ['Content-Type' => 'video/mp4', 'Content-Length' => (string) strlen($contents)]);
    });
}

function importFromLink(mixed $page, string $link = A_LINK_TO_IMPORT): mixed
{
    return $page
        ->click('Link')
        ->type('.uppy-Url-input', $link)
        ->click('.uppy-Url-importButton');
}

it('offers to import from a link only on a field that has it', function () {
    visit('/fluppy-tests')
        ->assertSee('My Device')
        ->assertSee('Link');

    FluppyForm::$configureUsing = null;

    visit('/fluppy-tests')
        ->assertSee('browse files')
        ->assertDontSee('Link')
        ->assertScript('Boolean(' . UPPY . ".getPlugin('url'))", false);
});

it('imports a file from a link, which the server fetches in parts', function () {
    $contents = random_bytes(300 * 1024);

    serveAtEveryLink($contents);

    $page = importFromLink(visit('/fluppy-tests'))
        ->assertSee('holiday.mp4')
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page) === $contents)->toBeTrue();

    // One request to find out what the file is, when it is added and again
    // when it is planned, and one for each of its five parts.
    Http::assertSentCount(7);
});

it('imports a file whole from a server that has no parts to give', function () {
    $contents = random_bytes(300 * 1024);

    serveAtEveryLink($contents, acceptsRanges: false);

    $page = importFromLink(visit('/fluppy-tests'))
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page) === $contents)->toBeTrue();
});

it('says why a link is turned away, and fetches nothing from it', function () {
    serveAtEveryLink('contents');

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['10.0.0.5']);

    importFromLink(visit('/fluppy-tests'))
        ->assertSee('Files cannot be fetched from there.')
        ->assertScript(UPPY . '.getFiles().length', 0);

    Http::assertNothingSent();
});

/**
 * Adds files to Uppy as its Google Drive plugin does once they are picked.
 * The Picker itself is Google's, and only opens for a real account.
 *
 * @param  array<string, string>  $files  Names as the Picker gives them, by file id.
 */
function pickFromGoogleDrive(mixed $page, array $files): mixed
{
    $page->assertSee('Google Drive');

    $files = json_encode(array_map(
        fn (string $id, string $name): array => ['id' => $id, 'name' => $name],
        array_keys($files),
        $files,
    ));

    $token = json_encode(FakeGoogleDrive::TOKEN);

    $page->script(<<<JS
        (() => {
            const uppy = window.Alpine.\$data(document.querySelector('.fi-fluppy')).getUppy()
            const { requestClientId } = uppy.getPlugin('GoogleDrivePicker')

            uppy.addFiles({$files}.map(({ id, name }) => ({
                name,
                data: { size: null },
                isRemote: true,
                remote: { requestClientId, body: { fileId: id, accessToken: {$token}, platform: 'drive' } },
            })))
        })()
    JS);

    return $page;
}

it('offers Google Drive only on a field that has it, with what the Picker needs', function () {
    visit('/fluppy-tests')
        ->assertDontSee('Google Drive')
        ->assertScript('Boolean(' . UPPY . ".getPlugin('GoogleDrivePicker'))", false);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->googleDrive();

    visit('/fluppy-tests')
        ->assertSee('My Device')
        ->assertSee('Google Drive')
        ->assertScript(UPPY . ".getPlugin('GoogleDrivePicker').opts.clientId", 'client.apps.googleusercontent.com')
        ->assertScript(UPPY . ".getPlugin('GoogleDrivePicker').opts.appId", '1234567890');
});

it('fetches a file picked in Google Drive in parts, and shows the size the server found', function () {
    $contents = random_bytes(300 * 1024);

    FakeGoogleDrive::serve(['abc' => ['name' => 'holiday.mp4', 'mimeType' => 'video/mp4', 'size' => (string) strlen($contents), 'md5Checksum' => 'd41d8', 'contents' => $contents]]);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->googleDrive();

    $page = pickFromGoogleDrive(visit('/fluppy-tests'), ['abc' => 'holiday.mp4'])
        ->assertSee('Upload complete')
        ->assertSee('300 KB')
        ->assertScript(UPPY . '.getFiles()[0].source', 'google-drive')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page) === $contents)->toBeTrue();
});

it('stores a Google document under the name it is exported with', function () {
    FakeGoogleDrive::serve(['doc' => ['name' => 'Plan', 'mimeType' => 'application/vnd.google-apps.document', 'modifiedTime' => '2026-10-01T10:00:00Z']]);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->googleDrive();

    $page = pickFromGoogleDrive(visit('/fluppy-tests'), ['doc' => 'Plan'])
        ->assertSee('Upload complete')
        ->assertSee('Plan.docx')
        ->assertScript(UPPY . '.getFiles()[0].size', strlen('exported as application/vnd.openxmlformats-officedocument.wordprocessingml.document'))
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page))->toBe('exported as application/vnd.openxmlformats-officedocument.wordprocessingml.document');
});

it('says on the file why Google Drive would not give it', function () {
    FakeGoogleDrive::serve(['abc' => ['name' => 'a.txt', 'mimeType' => 'text/plain', 'size' => '1']]);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->googleDrive();

    pickFromGoogleDrive(visit('/fluppy-tests'), ['gone' => 'gone.txt'])
        ->assertSee('Upload failed')
        ->assertScript(UPPY . '.getFiles()[0].error', 'The file could not be fetched: its server answered 404.');
});

it('turns a linked file away when it is larger than the field allows', function () {
    serveAtEveryLink(random_bytes(300 * 1024));

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->importFromUrl()->maxSize(100);

    importFromLink(visit('/fluppy-tests'))
        ->assertSee('exceeds maximum allowed size')
        ->assertScript(UPPY . '.getFiles().length', 0);
});
