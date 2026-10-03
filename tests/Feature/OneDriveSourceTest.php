<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\OneDriveSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeOneDrive;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.onedrive' => ['client_id' => 'client-id', 'client_secret' => 'client-secret', 'tenant' => 'common'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['13.107.42.12']);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * A OneDrive with a folder at the top, a notebook and two files beside it
 * (one page holds two items) and a file in the folder.
 */
function oneDrive(): void
{
    FakeOneDrive::serve([
        'root' => [
            'FOLDER!101' => ['name' => 'Holidays'],
            'NOTES!102' => ['name' => 'A notebook', 'package' => true],
            'REPORT!103' => ['name' => 'report.pdf', 'type' => 'application/pdf', 'contents' => str_repeat('r', 2500)],
            'NOTES!104' => ['name' => 'notes.txt', 'type' => 'text/plain', 'contents' => 'notes'],
        ],
        'FOLDER!101' => [
            'BEACH!105' => ['name' => 'beach.mp4', 'type' => 'video/mp4', 'contents' => 'a video'],
        ],
    ]);
}

function connectedToOneDrive(?int $expiresAt = null): void
{
    app(TokenStore::class)->put('onedrive', new Token(FakeOneDrive::accessToken(), FakeOneDrive::refreshToken(), $expiresAt ?? time() + 3600));
}

function oneDriveForm(): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->oneDrive());
}

/**
 * @return array<string, mixed>
 */
function listOneDrive(Testable $component, ?string $path = null): array
{
    return callRemoteField($component, 'listRemoteFiles', ['source' => 'onedrive', 'path' => $path]);
}

/**
 * @return array<string, string>
 */
function startConnectingToOneDrive(): array
{
    $location = test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/onedrive/connect')
        ->assertRedirect()
        ->headers->get('Location');

    parse_str((string) parse_url($location, PHP_URL_QUERY), $query);

    return ['address' => strtok($location, '?'), ...$query];
}

it('sends the person to Microsoft, to the tenant the configuration names', function () {
    expect(startConnectingToOneDrive())
        ->address->toBe('https://login.microsoftonline.com/common/oauth2/v2.0/authorize')
        ->client_id->toBe('client-id')
        ->response_type->toBe('code')
        ->response_mode->toBe('query')
        ->redirect_uri->toBe(url('/fluppy/sources/onedrive/callback'))
        ->scope->toBe('offline_access Files.Read User.Read')
        ->code_challenge_method->toBe('S256');

    config(['fluppy.remote.onedrive.tenant' => 'contoso.onmicrosoft.com']);

    expect(startConnectingToOneDrive())->address->toBe('https://login.microsoftonline.com/contoso.onmicrosoft.com/oauth2/v2.0/authorize');

    config(['fluppy.remote.onedrive.tenant' => 'common/../evil']);

    expect(startConnectingToOneDrive())->address->toBe('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
});

it('trades the code for a token at the same tenant', function () {
    oneDrive();

    $query = startConnectingToOneDrive();

    test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/onedrive/callback?' . http_build_query(['code' => FakeOneDrive::CODE, 'state' => $query['state']]))
        ->assertOk()
        ->assertSee('OneDrive is connected.');

    expect(app(TokenStore::class)->get('onedrive'))
        ->accessToken->toBe('ms.token-1')
        ->refreshToken->toBe('ms.refresh-1');

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://login.microsoftonline.com/common/oauth2/v2.0/token');
});

it('lists the top folder a page at a time, without what is neither a file nor a folder', function () {
    oneDrive();
    connectedToOneDrive();

    $component = oneDriveForm();

    $listing = listOneDrive($component);

    // The second item of the first page is a notebook.
    expect($listing)
        ->authenticated->toBeTrue()
        ->username->toBe('person@example.com')
        ->nextPagePath->toBe('next::2')
        ->items->toBe([
            ['id' => 'FOLDER!101', 'requestPath' => 'FOLDER!101', 'name' => 'Holidays', 'isFolder' => true, 'icon' => 'folder', 'mimeType' => null, 'size' => null, 'modifiedDate' => null],
        ]);

    expect(listOneDrive($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(2)
        ->items->{0}->toMatchArray(['id' => 'REPORT!103', 'name' => 'report.pdf', 'icon' => 'file', 'mimeType' => 'application/pdf', 'size' => 2500, 'modifiedDate' => '2026-10-01T10:00:00Z'])
        ->items->{1}->name->toBe('notes.txt');

    Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://graph.microsoft.com/v1.0/me/drive/root/children?')
        && str_contains($request->url(), '%24skiptoken=2'));
});

it('lists a folder by its id, with the type Microsoft gives a file', function () {
    oneDrive();
    connectedToOneDrive();

    expect(listOneDrive(oneDriveForm(), 'FOLDER!101'))
        ->items->toHaveCount(1)
        ->items->{0}->toMatchArray(['name' => 'beach.mp4', 'icon' => 'video', 'mimeType' => 'video/mp4']);
});

it('refuses what is not the id of a folder or the next page of one, without asking Microsoft', function (string $path) {
    oneDrive();
    connectedToOneDrive();

    expect(listOneDrive(oneDriveForm(), $path))->toHaveKey('error');

    Http::assertNothingSent();
})->with([
    'a path' => ['../../me/messages'],
    'another call' => ['FOLDER!101/content'],
    'a query' => ['FOLDER!101?$expand=children'],
    'another call as the next page' => ['next:FOLDER!101/content:2'],
]);

it('never asks Microsoft at an address the browser names as the next page', function () {
    oneDrive();
    connectedToOneDrive();

    expect(listOneDrive(oneDriveForm(), 'next:https://graph.microsoft.com/v1.0/me/messages:2'))->toHaveKey('error');

    Http::assertNotSent(fn (Request $request): bool => ! str_starts_with($request->url(), 'https://graph.microsoft.com/v1.0/me/drive/items/https/children?'));
});

it('says a folder that is not there cannot be fetched from', function () {
    oneDrive();
    connectedToOneDrive();

    expect(listOneDrive(oneDriveForm(), 'GONE!999'))->error->toBe('Files cannot be fetched from there.');
});

it('tells the browser to offer to connect when the person has not', function () {
    oneDrive();

    expect(listOneDrive(oneDriveForm()))->toBe(['authenticated' => false]);

    Http::assertNothingSent();
});

it('renews a token that has run out, and keeps the new refresh token Microsoft gives with it', function () {
    oneDrive();
    connectedToOneDrive(expiresAt: time() - 10);

    $component = oneDriveForm();

    expect(listOneDrive($component))->authenticated->toBeTrue()
        ->and(app(TokenStore::class)->get('onedrive'))
        ->accessToken->toBe('ms.token-1')
        ->refreshToken->toBe('ms.refresh-1');

    // The first refresh token is spent: only the new one renews again.
    app(TokenStore::class)->put('onedrive', new Token('ms.token-1', 'ms.refresh-1', time() - 10));

    expect(listOneDrive($component, 'FOLDER!101'))->authenticated->toBeTrue()
        ->and(app(TokenStore::class)->get('onedrive'))->refreshToken->toBe('ms.refresh-2');
});

it('fetches a file in parts from the address Microsoft gives, without sending the token there', function () {
    oneDrive();
    connectedToOneDrive();

    $component = oneDriveForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'onedrive', 'reference' => ['fileId' => 'REPORT!103']]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('report.pdf')
        ->size->toBe(2500)
        ->type->toBe('application/pdf')
        ->totalChunks->toBe(3);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe(str_repeat('r', 2500));

    Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://' . FakeOneDrive::DOWNLOAD_HOST . '/download?')
        && $request->header('Range') === ['bytes=1024-2047']
        && ! $request->hasHeader('Authorization'));
});

it('does not fetch from an address Microsoft gives that is not on the public internet', function () {
    oneDrive();
    connectedToOneDrive();

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['10.0.0.5']);

    expect(fn () => app(OneDriveSource::class)->read(['fileId' => 'REPORT!103'], 0, 9))
        ->toThrow(SourceException::class, 'Files cannot be fetched from there.');

    Http::assertNotSent(fn (Request $request): bool => str_contains($request->url(), FakeOneDrive::DOWNLOAD_HOST));
});

it('fetches from the address Microsoft gives whatever hosts links are allowed from', function () {
    oneDrive();
    connectedToOneDrive();

    config(['fluppy.remote.url.hosts' => ['files.example.com'], 'fluppy.remote.url.ports' => [8443]]);

    expect((string) app(OneDriveSource::class)->read(['fileId' => 'NOTES!104']))->toBe('notes');
});

it('does not plan a folder, a notebook, a file that is not there, or what is not an id', function (string $fileId) {
    oneDrive();
    connectedToOneDrive();

    expect(callRemoteField(oneDriveForm(), 'planRemoteUpload', ['source' => 'onedrive', 'reference' => ['fileId' => $fileId]]))
        ->strategy->toBe('reject');
})->with(['FOLDER!101', 'NOTES!102', 'GONE!999', '../me']);

it('forgets the connection when the person disconnects, or Microsoft no longer takes the token', function () {
    oneDrive();
    connectedToOneDrive();

    $component = oneDriveForm();

    expect(callRemoteField($component, 'disconnectRemoteSource', ['source' => 'onedrive']))->toBeTrue()
        ->and(app(TokenStore::class)->get('onedrive'))->toBeNull();

    app(TokenStore::class)->put('onedrive', new Token('a-token-microsoft-revoked', null, time() + 3600));

    expect(listOneDrive($component))->toBe(['authenticated' => false])
        ->and(app(TokenStore::class)->get('onedrive'))->toBeNull();
});

it('gives the browser the address to connect at, and says what is missing when it is not configured', function () {
    $field = oneDriveForm()->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    expect($field->getRemoteSources())->toBe([
        'onedrive' => ['label' => 'OneDrive', 'connectUrl' => '/fluppy/sources/onedrive/connect'],
    ]);

    config(['fluppy.remote.onedrive.client_id' => null]);

    expect(fn () => app(OneDriveSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.onedrive');
});
