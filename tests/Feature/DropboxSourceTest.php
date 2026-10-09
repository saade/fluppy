<?php

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\TestResponse;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\FluppyServiceProvider;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\DropboxSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Tests\Fixtures\FakeDropbox;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.dropbox' => ['client_id' => 'app-key', 'client_secret' => 'app-secret'],
    ]);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * A Dropbox with a folder at the top, three files beside it (one page holds
 * two entries) and a file in the folder.
 */
function dropbox(int $expiresIn = 14400): void
{
    FakeDropbox::serve([
        '' => [
            'id:folder' => ['name' => 'Holidays'],
            'id:report' => ['name' => 'report.pdf', 'contents' => str_repeat('r', 2500)],
            'id:notes' => ['name' => 'notes.txt', 'contents' => 'notes'],
            'id:paper' => ['name' => 'A paper doc.paper', 'contents' => '', 'is_downloadable' => false],
        ],
        'id:folder' => [
            'id:beach' => ['name' => 'beach.MOV', 'contents' => 'a video'],
            'id:clip' => ['name' => 'clip.mp4', 'contents' => 'another'],
        ],
    ], $expiresIn);
}

function connectedToDropbox(?int $expiresAt = null): void
{
    app(TokenStore::class)->put('dropbox', new Token(FakeDropbox::accessToken(), 'a-refresh-token', $expiresAt ?? time() + 3600));
}

function dropboxForm(): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->dropbox());
}

/**
 * @return array<string, mixed>
 */
function listDropbox(Testable $component, ?string $path = null): array
{
    return callRemoteField($component, 'listRemoteFiles', ['source' => 'dropbox', 'path' => $path]);
}

function visitInSession(string $url): TestResponse
{
    return test()->withCookie(session()->getName(), session()->getId())->get($url);
}

/**
 * Goes to the address a field opens in a window, and says where Dropbox was
 * asked to send the person back and with what.
 *
 * @return array<string, string>
 */
function startConnectingToDropbox(): array
{
    $location = visitInSession('/fluppy/sources/dropbox/connect')->assertRedirect()->headers->get('Location');

    parse_str((string) parse_url($location, PHP_URL_QUERY), $query);

    return ['address' => strtok($location, '?'), ...$query];
}

it('sends the person to Dropbox with what the code flow with PKCE needs', function () {
    expect(startConnectingToDropbox())
        ->address->toBe('https://www.dropbox.com/oauth2/authorize')
        ->client_id->toBe('app-key')
        ->response_type->toBe('code')
        ->redirect_uri->toBe(url('/fluppy/sources/dropbox/callback'))
        ->code_challenge_method->toBe('S256')
        ->token_access_type->toBe('offline')
        ->scope->toBe('account_info.read files.metadata.read files.content.read')
        ->state->toHaveLength(40)
        ->code_challenge->toMatch('/^[A-Za-z0-9_-]{43}$/');
});

it('only connects sources that are connected that way', function () {
    visitInSession('/fluppy/sources/url/connect')->assertNotFound();
    visitInSession('/fluppy/sources/google-drive/connect')->assertNotFound();
    visitInSession('/fluppy/sources/nowhere/callback?code=a&state=b')->assertNotFound();
});

it('lets guests connect by default, and only who the configured middleware lets through otherwise', function () {
    expect(Route::getRoutes()->getByName('fluppy.sources.connect')->gatherMiddleware())->toBe(['web', 'throttle:60,1,fluppy-connect:']);

    test()->getJson('/fluppy/sources/dropbox/connect')->assertRedirect();

    config(['fluppy.remote.connect_middleware' => ['auth']]);

    // The routes are registered when the application boots, with the
    // configuration as it is then.
    app()->getProvider(FluppyServiceProvider::class)->packageBooted();

    Route::getRoutes()->refreshNameLookups();

    expect(Route::getRoutes()->getByName('fluppy.sources.connect')->gatherMiddleware())->toBe(['web', 'throttle:60,1,fluppy-connect:', 'auth'])
        ->and(Route::getRoutes()->getByName('fluppy.sources.callback')->gatherMiddleware())->toBe(['web', 'throttle:60,1,fluppy-connect:', 'auth']);

    test()->getJson('/fluppy/sources/dropbox/connect')->assertUnauthorized();
    test()->getJson('/fluppy/sources/dropbox/callback?code=a&state=b')->assertUnauthorized();

    test()->actingAs(new User)->getJson('/fluppy/sources/dropbox/connect')->assertRedirect();
});

it('trades the code for a token and keeps it in the session, encrypted', function () {
    dropbox();

    $query = startConnectingToDropbox();

    visitInSession('/fluppy/sources/dropbox/callback?' . http_build_query(['code' => FakeDropbox::CODE, 'state' => $query['state']]))
        ->assertOk()
        ->assertSee('Dropbox is connected.')
        ->assertSee("new BroadcastChannel('fluppy')", escape: false)
        ->assertSee('isConnected: true', escape: false);

    expect(app(TokenStore::class)->get('dropbox'))
        ->accessToken->toBe('sl.token-1')
        ->refreshToken->toBe('a-refresh-token')
        ->and(json_encode(session()->all()))->not->toContain('sl.token-1')->not->toContain('a-refresh-token');

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.dropboxapi.com/oauth2/token'
        && $request['redirect_uri'] === url('/fluppy/sources/dropbox/callback')
        && rtrim(strtr(base64_encode(hash('sha256', $request['code_verifier'], true)), '+/', '-_'), '=') === $query['code_challenge']);
});

it('does not connect on an answer that does not carry the state it sent, and takes a state once', function () {
    dropbox();

    $query = startConnectingToDropbox();

    visitInSession('/fluppy/sources/dropbox/callback?' . http_build_query(['code' => FakeDropbox::CODE, 'state' => 'another']))
        ->assertOk()
        ->assertSee('Dropbox could not be connected.')
        ->assertSee('isConnected: false', escape: false);

    visitInSession('/fluppy/sources/dropbox/callback?' . http_build_query(['code' => FakeDropbox::CODE, 'state' => $query['state']]))
        ->assertSee('Dropbox could not be connected.');

    expect(app(TokenStore::class)->get('dropbox'))->toBeNull();

    Http::assertNothingSent();
});

it('does not connect when the person refused, or Dropbox refuses the code', function () {
    dropbox();

    $query = startConnectingToDropbox();

    visitInSession('/fluppy/sources/dropbox/callback?' . http_build_query(['error' => 'access_denied', 'state' => $query['state']]))
        ->assertSee('Dropbox could not be connected.');

    $query = startConnectingToDropbox();

    visitInSession('/fluppy/sources/dropbox/callback?' . http_build_query(['code' => 'a-code-of-mine', 'state' => $query['state']]))
        ->assertSee('Dropbox could not be connected.');

    expect(app(TokenStore::class)->get('dropbox'))->toBeNull();
});

it('tells the browser to offer to connect when the person has not', function () {
    dropbox();

    expect(listDropbox(dropboxForm()))->toBe(['authenticated' => false]);

    Http::assertNothingSent();
});

it('lists the top folder the way the file browser of Uppy takes it, a page at a time', function () {
    dropbox();
    connectedToDropbox();

    $component = dropboxForm();

    $listing = listDropbox($component);

    expect($listing)
        ->authenticated->toBeTrue()
        ->username->toBe('person@example.com')
        ->nextPagePath->toBe('cursor:|2')
        ->items->toBe([
            ['id' => 'id:folder', 'requestPath' => 'id:folder', 'name' => 'Holidays', 'isFolder' => true, 'icon' => 'folder', 'mimeType' => null, 'size' => null, 'modifiedDate' => null],
            ['id' => 'id:report', 'requestPath' => 'id:report', 'name' => 'report.pdf', 'isFolder' => false, 'icon' => 'file', 'mimeType' => 'application/pdf', 'size' => 2500, 'modifiedDate' => '2026-10-01T10:00:00Z'],
        ]);

    // The fourth entry is one Dropbox cannot give the bytes of.
    expect(listDropbox($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(1)
        ->items->{0}->name->toBe('notes.txt');
});

it('lists a folder by its id, and says a video is one from its name', function () {
    dropbox();
    connectedToDropbox();

    expect(listDropbox(dropboxForm(), 'id:folder'))
        ->items->toHaveCount(2)
        ->items->{0}->toMatchArray(['name' => 'beach.MOV', 'icon' => 'video', 'mimeType' => 'video/quicktime'])
        ->items->{1}->toMatchArray(['name' => 'clip.mp4', 'icon' => 'video', 'mimeType' => 'video/mp4']);
});

it('refuses what is not the id of a folder, without asking Dropbox', function (string $path) {
    dropbox();
    connectedToDropbox();

    expect(listDropbox(dropboxForm(), $path))->toHaveKey('error');

    Http::assertNothingSent();
})->with(['/Holidays', '../', 'id:a/b', 'id:']);

it('does not list for a field that does not have Dropbox on', function () {
    dropbox();
    connectedToDropbox();

    expect(listDropbox(remoteForm()))->toHaveKey('error')->not->toHaveKey('items');

    Http::assertNothingSent();
});

it('renews a token that has run out, once, and keeps the refresh token it had', function () {
    dropbox();
    connectedToDropbox(expiresAt: time() - 10);

    $component = dropboxForm();

    expect(listDropbox($component))->authenticated->toBeTrue()
        ->and(listDropbox($component, 'id:folder'))->authenticated->toBeTrue()
        ->and(FakeDropbox::$tokensIssued)->toBe(1)
        ->and(app(TokenStore::class)->get('dropbox'))
        ->accessToken->toBe('sl.token-1')
        ->refreshToken->toBe('a-refresh-token');
});

it('forgets a connection it cannot renew, or that Dropbox no longer takes', function () {
    dropbox();

    app(TokenStore::class)->put('dropbox', new Token('sl.token-0', 'a-refresh-token-of-mine', time() - 10));

    expect(listDropbox(dropboxForm()))->toBe(['authenticated' => false])
        ->and(app(TokenStore::class)->get('dropbox'))->toBeNull();

    app(TokenStore::class)->put('dropbox', new Token('a-token-dropbox-revoked', 'a-refresh-token', time() + 3600));

    expect(listDropbox(dropboxForm()))->toBe(['authenticated' => false])
        ->and(app(TokenStore::class)->get('dropbox'))->toBeNull();
});

it('fetches a file in parts and stores it', function () {
    dropbox();
    connectedToDropbox();

    $component = dropboxForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'dropbox', 'reference' => ['fileId' => 'id:report']]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('report.pdf')
        ->size->toBe(2500)
        ->type->toBe('application/pdf')
        ->totalChunks->toBe(3);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe(str_repeat('r', 2500));

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://content.dropboxapi.com/2/files/download'
        && $request->header('Dropbox-API-Arg') === ['{"path":"id:report"}']
        && $request->header('Range') === ['bytes=1024-2047']
        && $request->body() === '');
});

it('does not plan a folder, a file that is not there, or anything while not connected', function () {
    dropbox();

    $component = dropboxForm();

    expect(callRemoteField($component, 'planRemoteUpload', ['source' => 'dropbox', 'reference' => ['fileId' => 'id:report']]))
        ->strategy->toBe('reject')
        ->message->toBe('Connect to Dropbox to fetch files from it.');

    connectedToDropbox();

    expect(callRemoteField($component, 'planRemoteUpload', ['source' => 'dropbox', 'reference' => ['fileId' => 'id:folder']]))->strategy->toBe('reject')
        ->and(callRemoteField($component, 'planRemoteUpload', ['source' => 'dropbox', 'reference' => ['fileId' => 'id:gone']]))->strategy->toBe('reject')
        ->and(callRemoteField($component, 'planRemoteUpload', ['source' => 'dropbox', 'reference' => ['fileId' => '/report.pdf']]))->strategy->toBe('reject');
});

it('ends the connection at Dropbox too when the person disconnects', function () {
    dropbox();
    connectedToDropbox();

    $component = dropboxForm();

    expect(callRemoteField($component, 'disconnectRemoteSource', ['source' => 'dropbox']))->toBeTrue()
        ->and(app(TokenStore::class)->get('dropbox'))->toBeNull()
        ->and(listDropbox($component))->toBe(['authenticated' => false]);

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.dropboxapi.com/2/auth/token/revoke');
});

it('gives the browser the address to connect at, and says what is missing when it is not configured', function () {
    $field = dropboxForm()->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    expect($field->getRemoteSources())->toBe([
        'dropbox' => ['label' => 'Dropbox', 'connectUrl' => '/fluppy/sources/dropbox/connect'],
    ]);

    config(['fluppy.remote.dropbox.client_secret' => null]);

    expect(fn () => app(DropboxSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.dropbox')
        ->and(fn () => app(DropboxSource::class)->describe(['fileId' => 'id:report']))->toThrow(SourceException::class);
});
