<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\FacebookSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeFacebook;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.facebook' => ['client_id' => 'app-id', 'client_secret' => 'app-secret'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['157.240.12.35']);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * A person on Facebook with three albums (it gives two things at once), the
 * first with three photos.
 */
function facebook(): void
{
    FakeFacebook::serve([
        '1001' => ['name' => 'Holidays', 'photos' => ['2001' => str_repeat('p', 2500), '2002' => 'a picture', '2003' => 'another']],
        '1002' => ['name' => 'Profile pictures', 'photos' => ['2004' => 'me']],
        '1003' => ['name' => 'Timeline photos', 'photos' => []],
    ], pageSize: 2);
}

function connectedToFacebook(string $token = FakeFacebook::TOKEN): void
{
    app(TokenStore::class)->put('facebook', new Token($token, null, time() + 86400));
}

function facebookForm(): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->facebook());
}

/**
 * @return array<string, mixed>
 */
function listFacebook(Testable $component, ?string $path = null): array
{
    return callRemoteField($component, 'listRemoteFiles', ['source' => 'facebook', 'path' => $path]);
}

it('sends the person to Facebook for their photos alone, and trades the code for a token that lasts', function () {
    facebook();

    $location = test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/facebook/connect')
        ->assertRedirect()
        ->headers->get('Location');

    parse_str((string) parse_url($location, PHP_URL_QUERY), $query);

    expect(strtok($location, '?'))->toBe('https://www.facebook.com/dialog/oauth')
        ->and($query)
        ->client_id->toBe('app-id')
        ->scope->toBe('user_photos')
        ->redirect_uri->toBe(url('/fluppy/sources/facebook/callback'))
        ->not->toHaveKey('code_challenge');

    test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/facebook/callback?' . http_build_query(['code' => FakeFacebook::CODE, 'state' => $query['state']]))
        ->assertOk()
        ->assertSee('Facebook is connected.');

    expect(app(TokenStore::class)->get('facebook'))
        ->accessToken->toBe(FakeFacebook::TOKEN)
        ->refreshToken->toBeNull()
        ->expiresAt->toBeGreaterThan(time() + 50 * 86400);
});

it('lists the albums of the person as folders, a page at a time', function () {
    facebook();
    connectedToFacebook();

    $component = facebookForm();

    $listing = listFacebook($component);

    expect($listing)
        ->authenticated->toBeTrue()
        ->username->toBe('A Person')
        ->nextPagePath->toBe('next:albums:' . base64_encode('2'))
        ->items->toBe([
            ['id' => '1001', 'requestPath' => '1001', 'name' => 'Holidays', 'isFolder' => true, 'icon' => 'folder', 'mimeType' => null, 'size' => null, 'modifiedDate' => null],
            ['id' => '1002', 'requestPath' => '1002', 'name' => 'Profile pictures', 'isFolder' => true, 'icon' => 'folder', 'mimeType' => null, 'size' => null, 'modifiedDate' => null],
        ]);

    expect(listFacebook($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(1)
        ->items->{0}->name->toBe('Timeline photos');
});

it('lists the photos of an album with a small picture of each, named after the day and the id', function () {
    facebook();
    connectedToFacebook();

    $component = facebookForm();

    $listing = listFacebook($component, '1001');

    expect($listing)
        ->nextPagePath->toBe('next:1001:' . base64_encode('2'))
        ->items->toHaveCount(2)
        ->items->{0}->toBe([
            'id' => '2001',
            'requestPath' => '2001',
            'name' => '2026-09-03 2001.jpg',
            'isFolder' => false,
            'icon' => 'file',
            'mimeType' => 'image/jpeg',
            'size' => null,
            'modifiedDate' => '2026-09-03T14:00:00+0000',
            'thumbnail' => FakeFacebook::addressOf('2001', 320),
        ]);

    expect(listFacebook($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(1)
        ->items->{0}->id->toBe('2003');
});

it('refuses what is not an album or the next page of one, without asking Facebook', function (string $path) {
    facebook();
    connectedToFacebook();

    expect(listFacebook(facebookForm(), $path))->toHaveKey('error');

    Http::assertNothingSent();
})->with(['me', '1001/photos', '../me', 'albums', 'next:1001:../x', 'next:me:Mg==', 'next:1001:https://graph.facebook.com/me']);

it('asks to connect again when Facebook no longer takes the token, which it says with a 400', function () {
    facebook();
    connectedToFacebook('a-token-facebook-expired');

    expect(listFacebook(facebookForm()))->toBe(['authenticated' => false])
        ->and(app(TokenStore::class)->get('facebook'))->toBeNull();
});

it('asks to connect again once the token has run out, since Facebook gives nothing to renew it with', function () {
    facebook();

    app(TokenStore::class)->put('facebook', new Token(FakeFacebook::TOKEN, null, time() - 10));

    expect(listFacebook(facebookForm()))->toBe(['authenticated' => false]);

    Http::assertNothingSent();
});

it('describes a photo as the largest size Facebook keeps, and asks where it is kept how large that is', function () {
    facebook();
    connectedToFacebook();

    expect(app(FacebookSource::class)->describe(['fileId' => '2001']))
        ->identity->toBe('2001|2048x1365')
        ->name->toBe('2026-09-03 2001.jpg')
        ->size->toBe(2500)
        ->type->toBe('image/jpeg')
        ->acceptsRanges->toBeTrue()
        ->reference->toBe(['fileId' => '2001', 'address' => FakeFacebook::addressOf('2001')]);
});

it('fetches a photo in parts from where it is kept, without sending the token there or asking Facebook again', function () {
    facebook();
    connectedToFacebook();

    $component = facebookForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'facebook', 'reference' => ['fileId' => '2001']]);

    expect($plan)->strategy->toBe('chunked')->name->toBe('2026-09-03 2001.jpg')->size->toBe(2500)->totalChunks->toBe(3);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe(str_repeat('p', 2500));

    Http::assertNotSent(fn (Request $request): bool => str_contains($request->url(), FakeFacebook::PHOTO_HOST) && $request->hasHeader('Authorization'));

    // The photo was asked of the Graph API once, to plan it.
    Http::assertSentCount(5);
});

it('only fetches a photo from a host of Facebook\'s', function (string $address) {
    facebook();
    connectedToFacebook();

    expect(fn () => app(FacebookSource::class)->read(['fileId' => '2001', 'address' => $address]))
        ->toThrow(SourceException::class, 'Files cannot be fetched from there.');

    Http::assertNothingSent();
})->with([
    'another host' => ['https://files.example.com/2001.jpg'],
    'plain HTTP' => ['http://scontent.fgru1-1.fna.fbcdn.net/2001.jpg'],
    'a host that only ends like one' => ['https://notfbcdn.net/2001.jpg'],
    'a host that only starts like one' => ['https://scontent.fbcdn.net.example.com/2001.jpg'],
    'a user name that looks like one' => ['https://scontent.fbcdn.net@example.com/2001.jpg'],
]);

it('does not plan an album, a photo that is not there, or what is not an id', function (string $fileId) {
    facebook();
    connectedToFacebook();

    expect(callRemoteField(facebookForm(), 'planRemoteUpload', ['source' => 'facebook', 'reference' => ['fileId' => $fileId]]))
        ->strategy->toBe('reject');
})->with(['1001', '9999', 'me', '2001/likes']);

it('takes back what the person allowed when they disconnect', function () {
    facebook();
    connectedToFacebook();

    expect(callRemoteField(facebookForm(), 'disconnectRemoteSource', ['source' => 'facebook']))->toBeTrue()
        ->and(app(TokenStore::class)->get('facebook'))->toBeNull();

    Http::assertSent(fn (Request $request): bool => $request->method() === 'DELETE'
        && $request->url() === 'https://graph.facebook.com/me/permissions'
        && $request->header('Authorization') === ['Bearer ' . FakeFacebook::TOKEN]);
});

it('says what is missing when Facebook is not configured', function () {
    config(['fluppy.remote.facebook.client_secret' => null]);

    expect(fn () => app(FacebookSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.facebook');
});
