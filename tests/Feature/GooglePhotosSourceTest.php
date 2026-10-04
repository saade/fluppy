<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\GooglePhotosSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeGooglePhotos;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    Storage::fake('uploads');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.google_photos' => ['client_id' => 'client.apps.googleusercontent.com'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['142.250.79.33']);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * @param  array<string, mixed>  $with
 * @return array<string, mixed>
 */
function pickedPhoto(string $id, array $with = []): array
{
    return [
        'fileId' => $id,
        'accessToken' => FakeGooglePhotos::TOKEN,
        'platform' => 'photos',
        'url' => FakeGooglePhotos::address($id),
        'name' => 'IMG_0001.jpg',
        'type' => 'image/jpeg',
        ...$with,
    ];
}

it('describes a picked item from what Google answers for it', function () {
    FakeGooglePhotos::serve(['abc' => ['name' => 'holiday.mp4', 'type' => 'video/mp4', 'contents' => str_repeat('v', 2500)]]);

    expect(app(GooglePhotosSource::class)->describe(pickedPhoto('abc')))
        ->identity->toBe('abc')
        ->name->toBe('holiday.mp4')
        ->size->toBe(2500)
        ->type->toBe('video/mp4')
        ->acceptsRanges->toBeTrue();

    Http::assertSent(fn (Request $request): bool => $request->header('Range') === ['bytes=0-0']
        && $request->header('Authorization') === ['Bearer ' . FakeGooglePhotos::TOKEN]);
});

it('goes by what the picker said of an item where Google does not say', function () {
    FakeGooglePhotos::serve(['abc' => ['type' => '', 'contents' => 'a picture']]);

    expect(app(GooglePhotosSource::class)->describe(pickedPhoto('abc', ['name' => '../../IMG 0002.heic', 'type' => 'image/heic'])))
        ->name->toBe('IMG 0002.heic')
        ->type->toBe('image/heic');
});

it('only asks at an address of Google\'s own for what people upload', function (string $address) {
    FakeGooglePhotos::serve(['abc' => ['type' => 'image/jpeg', 'contents' => 'a picture']]);

    $source = app(GooglePhotosSource::class);

    expect(fn () => $source->describe(pickedPhoto('abc', ['url' => $address])))->toThrow(SourceException::class, 'Files cannot be fetched from there.')
        ->and(fn () => $source->read(pickedPhoto('abc', ['url' => $address])))->toThrow(SourceException::class);

    Http::assertNothingSent();
})->with([
    'another host' => ['https://files.example.com/ppa/abc=d'],
    'plain HTTP' => ['http://lh3.googleusercontent.com/ppa/abc=d'],
    'a host that only starts like one' => ['https://lh3.googleusercontent.com.example.com/ppa/abc=d'],
    'a user name that looks like one' => ['https://lh3.googleusercontent.com@example.com/ppa/abc=d'],
    'another port' => ['https://lh3.googleusercontent.com:8443/ppa/abc=d'],
    'the parent domain' => ['https://googleusercontent.com/ppa/abc=d'],
]);

it('refuses an item that comes without a token, or with an id that is not one', function () {
    FakeGooglePhotos::serve(['abc' => ['type' => 'image/jpeg', 'contents' => 'a picture']]);

    $source = app(GooglePhotosSource::class);

    expect(fn () => $source->describe(pickedPhoto('abc', ['accessToken' => ''])))->toThrow(SourceException::class)
        ->and(fn () => $source->describe(pickedPhoto('abc', ['fileId' => '../abc'])))->toThrow(SourceException::class)
        ->and(fn () => $source->describe(pickedPhoto('abc', ['fileId' => ['abc']])))->toThrow(SourceException::class);

    Http::assertNothingSent();
});

it('does not ask at an address that is not on the public internet', function () {
    FakeGooglePhotos::serve(['abc' => ['type' => 'image/jpeg', 'contents' => 'a picture']]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['10.0.0.5']);

    expect(fn () => app(GooglePhotosSource::class)->describe(pickedPhoto('abc')))->toThrow(SourceException::class);

    Http::assertNothingSent();
});

it('does not send the token on to a host Google redirects to', function () {
    FakeGooglePhotos::serve(['abc' => ['redirect' => 'https://storage.example.net/abc']]);

    expect((string) app(GooglePhotosSource::class)->read(pickedPhoto('abc')))->toBe('elsewhere');

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://storage.example.net/abc'
        && ! $request->hasHeader('Authorization'));
});

it('says that access expired when Google refuses the token', function () {
    FakeGooglePhotos::serve(['abc' => ['type' => 'image/jpeg', 'contents' => 'a picture']]);

    expect(fn () => app(GooglePhotosSource::class)->read(pickedPhoto('abc', ['accessToken' => 'an-old-token']), 0, 3))
        ->toThrow(SourceException::class, 'has expired');
});

it('fetches a picked video in parts and stores it, without the token going back to the browser in the clear', function () {
    $contents = random_bytes(2500);

    FakeGooglePhotos::serve(['abc' => ['name' => 'holiday.mp4', 'type' => 'video/mp4', 'contents' => $contents]]);

    $component = remoteForm(fn (FluppyField $field) => $field->googlePhotos());

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'google-photos', 'reference' => pickedPhoto('abc')]);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('holiday.mp4')
        ->size->toBe(2500)
        ->totalChunks->toBe(3)
        ->and(json_encode($plan))->not->toContain(FakeGooglePhotos::TOKEN);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe($contents);
});

it('gives the browser the client ID, says so when there is none, and fetches nothing for a field that does not have it on', function () {
    FakeGooglePhotos::serve(['abc' => ['type' => 'image/jpeg', 'contents' => 'a picture']]);

    $field = remoteForm(fn (FluppyField $field) => $field->googlePhotos())
        ->instance()->form->getComponent(fn ($field): bool => $field instanceof FluppyField);

    expect($field->getRemoteSources())->toBe([
        'google-photos' => ['label' => 'Google Photos', 'clientId' => 'client.apps.googleusercontent.com'],
    ]);

    expect(callRemoteField(remoteForm(), 'planRemoteUpload', ['source' => 'google-photos', 'reference' => pickedPhoto('abc')]))
        ->strategy->toBe('reject');

    Http::assertNothingSent();

    config(['fluppy.remote.google_photos.client_id' => null]);

    expect(fn () => app(GooglePhotosSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.google_photos');
});
