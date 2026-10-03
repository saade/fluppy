<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\BoxSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeBox;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.box' => ['client_id' => 'client-id', 'client_secret' => 'client-secret'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['74.112.186.144']);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * A Box with a folder at the top, a bookmark and two files beside it (it
 * gives two items at once) and a file in the folder.
 */
function box(): void
{
    FakeBox::serve([
        '0' => [
            '101' => ['name' => 'Holidays'],
            '102' => ['name' => 'A bookmark', 'url' => 'https://example.com'],
            '103' => ['name' => 'report.pdf', 'contents' => str_repeat('r', 2500)],
            '104' => ['name' => 'clip.mp4', 'contents' => 'a video'],
        ],
        '101' => [
            '105' => ['name' => 'beach.jpg', 'contents' => 'a picture'],
        ],
    ], pageSize: 2);
}

function connectedToBox(?int $expiresAt = null): void
{
    app(TokenStore::class)->put('box', new Token(FakeBox::accessToken(), FakeBox::refreshToken(), $expiresAt ?? time() + 3600));
}

function boxForm(): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->box());
}

/**
 * @return array<string, mixed>
 */
function listBox(Testable $component, ?string $path = null): array
{
    return callRemoteField($component, 'listRemoteFiles', ['source' => 'box', 'path' => $path]);
}

it('sends the person to Box without PKCE, and trades the code for a token without it', function () {
    box();

    $location = test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/box/connect')
        ->assertRedirect()
        ->headers->get('Location');

    parse_str((string) parse_url($location, PHP_URL_QUERY), $query);

    expect(strtok($location, '?'))->toBe('https://account.box.com/api/oauth2/authorize')
        ->and($query)
        ->client_id->toBe('client-id')
        ->response_type->toBe('code')
        ->redirect_uri->toBe(url('/fluppy/sources/box/callback'))
        ->state->toHaveLength(40)
        ->not->toHaveKey('code_challenge');

    test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/box/callback?' . http_build_query(['code' => FakeBox::CODE, 'state' => $query['state']]))
        ->assertOk()
        ->assertSee('Box is connected.');

    expect(app(TokenStore::class)->get('box'))
        ->accessToken->toBe('box.token-1')
        ->refreshToken->toBe('box.refresh-1');

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.box.com/oauth2/token'
        && ! isset($request->data()['code_verifier']));
});

it('lists the top folder a page at a time, without what is neither a file nor a folder', function () {
    box();
    connectedToBox();

    $component = boxForm();

    $listing = listBox($component);

    // The second item of the first page is a bookmark.
    expect($listing)
        ->authenticated->toBeTrue()
        ->username->toBe('person@example.com')
        ->nextPagePath->toBe('next:0:2')
        ->items->toBe([
            ['id' => '101', 'requestPath' => '101', 'name' => 'Holidays', 'isFolder' => true, 'icon' => 'folder', 'mimeType' => null, 'size' => null, 'modifiedDate' => null],
        ]);

    expect(listBox($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(2)
        ->items->{0}->toMatchArray(['id' => '103', 'name' => 'report.pdf', 'icon' => 'file', 'mimeType' => 'application/pdf', 'size' => 2500, 'modifiedDate' => '2026-10-01T10:00:00-07:00'])
        ->items->{1}->toMatchArray(['name' => 'clip.mp4', 'icon' => 'video', 'mimeType' => 'video/mp4']);
});

it('lists a folder by its id', function () {
    box();
    connectedToBox();

    expect(listBox(boxForm(), '101'))
        ->items->toHaveCount(1)
        ->items->{0}->name->toBe('beach.jpg');
});

it('refuses what is not the id of a folder or the next page of one, without asking Box', function (string $path) {
    box();
    connectedToBox();

    expect(listBox(boxForm(), $path))->toHaveKey('error');

    Http::assertNothingSent();
})->with([
    'a path' => ['../users/me'],
    'what is not a number' => ['abc'],
    'another call' => ['101/collaborations'],
    'a next page that is not a number' => ['next:101:x'],
    'a next page of what is not a folder' => ['next:../users:2'],
]);

it('tells the browser to offer to connect when the person has not, and when Box no longer takes the token', function () {
    box();

    expect(listBox(boxForm()))->toBe(['authenticated' => false]);

    app(TokenStore::class)->put('box', new Token('a-token-box-revoked', null, time() + 3600));

    expect(listBox(boxForm()))->toBe(['authenticated' => false])
        ->and(app(TokenStore::class)->get('box'))->toBeNull();
});

it('renews a token that has run out, and keeps the new refresh token Box gives with it', function () {
    box();
    connectedToBox(expiresAt: time() - 10);

    expect(listBox(boxForm()))->authenticated->toBeTrue()
        ->and(app(TokenStore::class)->get('box'))
        ->accessToken->toBe('box.token-1')
        ->refreshToken->toBe('box.refresh-1');
});

it('fetches a file in parts from the address Box gives, without sending the token there', function () {
    box();
    connectedToBox();

    $component = boxForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'box', 'reference' => ['fileId' => '103']]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('report.pdf')
        ->size->toBe(2500)
        ->type->toBe('application/pdf')
        ->totalChunks->toBe(3);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe(str_repeat('r', 2500));

    Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://' . FakeBox::DOWNLOAD_HOST . '/')
        && $request->header('Range') === ['bytes=1024-2047']
        && ! $request->hasHeader('Authorization'));
});

it('does not fetch from an address Box gives that is not on the public internet', function () {
    box();
    connectedToBox();

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['10.0.0.5']);

    expect(fn () => app(BoxSource::class)->read(['fileId' => '103'], 0, 9))
        ->toThrow(SourceException::class, 'Files cannot be fetched from there.');
});

it('does not plan a folder, a bookmark, a file that is not there, or what is not an id', function (string $fileId) {
    box();
    connectedToBox();

    expect(callRemoteField(boxForm(), 'planRemoteUpload', ['source' => 'box', 'reference' => ['fileId' => $fileId]]))
        ->strategy->toBe('reject');
})->with(['101', '102', '999', '../users/me']);

it('ends the connection at Box too when the person disconnects', function () {
    box();
    connectedToBox();

    expect(callRemoteField(boxForm(), 'disconnectRemoteSource', ['source' => 'box']))->toBeTrue()
        ->and(app(TokenStore::class)->get('box'))->toBeNull();

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.box.com/oauth2/revoke'
        && $request['token'] === 'box.token-0'
        && $request['client_secret'] === 'client-secret');
});

it('says what is missing when Box is not configured', function () {
    config(['fluppy.remote.box.client_secret' => null]);

    expect(fn () => app(BoxSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.box');
});
