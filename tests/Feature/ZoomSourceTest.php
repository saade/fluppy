<?php

use Carbon\CarbonImmutable;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Sources\ZoomSource;
use Saade\Fluppy\Tests\Fixtures\FakeZoom;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

const A_MEETING = 'aB3dEf+gH1jKlMnOpQrStU==';
const A_MEETING_WITH_SLASHES = '/x9Yz//AbCdEfGhIjKlMnOpQ==';

beforeEach(function () {
    Storage::fake('uploads');

    CarbonImmutable::setTestNow('2026-10-10 12:00:00');

    config([
        'fluppy.remote.part_size' => 1,
        'fluppy.remote.zoom' => ['client_id' => 'client-id', 'client_secret' => 'client-secret'],
    ]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['170.114.52.2']);
});

afterEach(function () {
    FluppyForm::$configureUsing = null;

    CarbonImmutable::setTestNow();
});

/**
 * A Zoom account with two meetings recorded in September 2026, the second
 * with a recording Zoom is still working on, and one in October.
 */
function zoom(): void
{
    FakeZoom::serve([
        A_MEETING => [
            'topic' => 'Weekly: sync/planning',
            'start_time' => '2026-09-03T14:00:00Z',
            'recording_files' => [
                ['id' => 'f1e2d3c4-0001', 'file_type' => 'MP4', 'recording_type' => 'shared_screen_with_speaker_view', 'contents' => str_repeat('v', 2500)],
                ['id' => 'f1e2d3c4-0002', 'file_type' => 'M4A', 'recording_type' => 'audio_only', 'contents' => 'audio'],
            ],
        ],
        A_MEETING_WITH_SLASHES => [
            'topic' => 'Retro',
            'start_time' => '2026-09-24T09:00:00Z',
            'recording_files' => [
                ['id' => 'f1e2d3c4-0003', 'file_type' => 'MP4', 'recording_type' => 'speaker_view', 'contents' => 'a video'],
                ['id' => 'f1e2d3c4-0004', 'file_type' => 'MP4', 'recording_type' => 'gallery_view', 'status' => 'processing', 'contents' => ''],
            ],
        ],
        'OctoberMeeting0000000000==' => [
            'topic' => 'Kick-off',
            'start_time' => '2026-10-02T10:00:00Z',
            'recording_files' => [
                ['id' => 'f1e2d3c4-0005', 'file_type' => 'CHAT', 'file_extension' => 'TXT', 'contents' => 'hello'],
            ],
        ],
    ]);
}

function connectedToZoom(?int $expiresAt = null): void
{
    app(TokenStore::class)->put('zoom', new Token(FakeZoom::accessToken(), FakeZoom::refreshToken(), $expiresAt ?? time() + 3600));
}

function zoomForm(): Testable
{
    return remoteForm(fn (FluppyField $field) => $field->zoom());
}

/**
 * @return array<string, mixed>
 */
function listZoom(Testable $component, ?string $path = null): array
{
    return callRemoteField($component, 'listRemoteFiles', ['source' => 'zoom', 'path' => $path]);
}

function zoomFileId(string $meeting, string $file): string
{
    return 'file:' . rtrim(strtr(base64_encode($meeting), '+/', '-_'), '=') . ':' . $file;
}

it('gives Zoom the credentials of the application in a header, and never in the body', function () {
    zoom();

    $location = test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/zoom/connect')
        ->assertRedirect()
        ->headers->get('Location');

    parse_str((string) parse_url($location, PHP_URL_QUERY), $query);

    expect(strtok($location, '?'))->toBe('https://zoom.us/oauth/authorize')
        ->and($query)->client_id->toBe('client-id')->code_challenge_method->toBe('S256');

    test()
        ->withCookie(session()->getName(), session()->getId())
        ->get('/fluppy/sources/zoom/callback?' . http_build_query(['code' => FakeZoom::CODE, 'state' => $query['state']]))
        ->assertOk()
        ->assertSee('Zoom is connected.');

    expect(app(TokenStore::class)->get('zoom'))->accessToken->toBe('zoom.token-1')->refreshToken->toBe('zoom.refresh-1');
});

it('lists the months since the account was made, the latest first', function () {
    zoom();
    connectedToZoom();

    expect(listZoom(zoomForm()))
        ->authenticated->toBeTrue()
        ->username->toBe('person@example.com')
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(3)
        ->items->{0}->toMatchArray(['id' => 'month:2026-10', 'name' => 'October 2026', 'isFolder' => true, 'icon' => 'folder'])
        ->items->{1}->toMatchArray(['id' => 'month:2026-09', 'name' => 'September 2026'])
        ->items->{2}->toMatchArray(['id' => 'month:2026-08', 'name' => 'August 2026']);
});

it('lists the recordings of a month, a page of meetings at a time, named after the meeting and what kind they are', function () {
    zoom();
    connectedToZoom();

    $component = zoomForm();

    $listing = listZoom($component, 'month:2026-09');

    expect($listing)
        ->nextPagePath->toBe('next:2026-09:1')
        ->items->toHaveCount(2)
        ->items->{0}->toBe([
            'id' => zoomFileId(A_MEETING, 'f1e2d3c4-0001'),
            'requestPath' => zoomFileId(A_MEETING, 'f1e2d3c4-0001'),
            'name' => 'Weekly sync planning 2026-09-03 14.00 shared screen with speaker view.mp4',
            'isFolder' => false,
            'icon' => 'video',
            'mimeType' => 'video/mp4',
            'size' => 2500,
            'modifiedDate' => '2026-09-03T14:00:00Z',
        ])
        ->items->{1}->toMatchArray(['name' => 'Weekly sync planning 2026-09-03 14.00 audio only.m4a', 'mimeType' => 'audio/mp4']);

    // The second meeting has a recording Zoom is still working on.
    expect(listZoom($component, $listing['nextPagePath']))
        ->nextPagePath->toBeNull()
        ->items->toHaveCount(1)
        ->items->{0}->name->toBe('Retro 2026-09-24 09.00 speaker view.mp4');

    Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://api.zoom.us/v2/users/me/recordings?')
        && $request['from'] === '2026-09-01'
        && $request['to'] === '2026-09-30');
});

it('names a recording that is not a video after what it is', function () {
    zoom();
    connectedToZoom();

    expect(listZoom(zoomForm(), 'month:2026-10'))
        ->items->{0}->toMatchArray(['name' => 'Kick-off 2026-10-02 10.00 CHAT.txt', 'mimeType' => 'text/plain', 'icon' => 'file']);
});

it('refuses what is not a month or the next page of one, without asking Zoom', function (string $path) {
    zoom();
    connectedToZoom();

    expect(listZoom(zoomForm(), $path))->toHaveKey('error');

    Http::assertNothingSent();
})->with(['month:2026-13', 'month:../users', '2026-09', 'next:2026-9:1', 'month:2026-09/../../users/me']);

it('describes a recording from what Zoom has of it, and asks where it is kept whether it gives parts', function () {
    zoom();
    connectedToZoom();

    expect(app(ZoomSource::class)->describe(['fileId' => zoomFileId(A_MEETING, 'f1e2d3c4-0001')]))
        ->identity->toBe(A_MEETING . '|f1e2d3c4-0001|2500')
        ->name->toBe('Weekly sync planning 2026-09-03 14.00 shared screen with speaker view.mp4')
        ->size->toBe(2500)
        ->type->toBe('video/mp4')
        ->acceptsRanges->toBeTrue();
});

it('asks for a meeting whose id has slashes in it by that id encoded twice', function () {
    zoom();
    connectedToZoom();

    expect(app(ZoomSource::class)->describe(['fileId' => zoomFileId(A_MEETING_WITH_SLASHES, 'f1e2d3c4-0003')]))
        ->name->toBe('Retro 2026-09-24 09.00 speaker view.mp4');

    Http::assertSent(fn (Request $request): bool => str_contains($request->url(), '/v2/meetings/' . rawurlencode(rawurlencode(A_MEETING_WITH_SLASHES)) . '/recordings'));
});

it('fetches a recording in parts, with the token for Zoom and without it for where Zoom sends the request on to', function () {
    zoom();
    connectedToZoom();

    $component = zoomForm();

    $plan = callRemoteField($component, 'planRemoteUpload', ['source' => 'zoom', 'reference' => ['fileId' => zoomFileId(A_MEETING, 'f1e2d3c4-0001')]]);

    expect($plan)->strategy->toBe('chunked')->size->toBe(2500)->totalChunks->toBe(3);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => fetchInChunks($plan)]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe(str_repeat('v', 2500));

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://zoom.us/rec/download/f1e2d3c4-0001'
        && $request->header('Authorization') === ['Bearer zoom.token-0']
        && $request->header('Range') === ['bytes=1024-2047']);

    Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://' . FakeZoom::STORAGE_HOST . '/')
        && ! $request->hasHeader('Authorization')
        && $request->header('Range') === ['bytes=1024-2047']);
});

it('does not plan a recording that is not there, one Zoom is still working on, or what is not an id', function (string $fileId) {
    zoom();
    connectedToZoom();

    expect(callRemoteField(zoomForm(), 'planRemoteUpload', ['source' => 'zoom', 'reference' => ['fileId' => $fileId]]))
        ->strategy->toBe('reject');
})->with([
    'a file the meeting does not have' => [fn () => zoomFileId(A_MEETING, 'f1e2d3c4-9999')],
    'a meeting that is not there' => [fn () => zoomFileId('NoSuchMeeting00000000000==', 'f1e2d3c4-0001')],
    'a recording still being worked on' => [fn () => zoomFileId(A_MEETING_WITH_SLASHES, 'f1e2d3c4-0004')],
    'what is not an id' => ['file:../../users/me'],
    'a month' => ['month:2026-09'],
]);

it('does not send the token to where a recording is said to be when that is not a host of Zoom', function () {
    Http::fake([
        'api.zoom.us/v2/meetings/*' => Http::response([
            'uuid' => A_MEETING,
            'topic' => 'Weekly',
            'recording_files' => [['id' => 'f1e2d3c4-0001', 'status' => 'completed', 'file_type' => 'MP4', 'file_size' => 10, 'download_url' => 'https://zoom.us.example.com/rec/download/1']],
        ]),
    ]);

    connectedToZoom();

    expect(fn () => app(ZoomSource::class)->read(['fileId' => zoomFileId(A_MEETING, 'f1e2d3c4-0001')]))
        ->toThrow(SourceException::class, 'Files cannot be fetched from there.');

    Http::assertSentCount(1);
});

it('renews a token that has run out, forgets one Zoom no longer takes, and revokes on disconnecting', function () {
    zoom();
    connectedToZoom(expiresAt: time() - 10);

    $component = zoomForm();

    expect(listZoom($component))->authenticated->toBeTrue()
        ->and(app(TokenStore::class)->get('zoom'))->accessToken->toBe('zoom.token-1')->refreshToken->toBe('zoom.refresh-1')
        ->and(callRemoteField($component, 'disconnectRemoteSource', ['source' => 'zoom']))->toBeTrue()
        ->and(app(TokenStore::class)->get('zoom'))->toBeNull()
        ->and(listZoom($component))->toBe(['authenticated' => false]);

    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://zoom.us/oauth/revoke'
        && $request['token'] === 'zoom.token-1'
        && $request->header('Authorization') === ['Basic ' . base64_encode('client-id:client-secret')]);
});

it('says what is missing when Zoom is not configured', function () {
    config(['fluppy.remote.zoom.client_id' => null]);

    expect(fn () => app(ZoomSource::class)->getClientOptions())->toThrow(LogicException::class, 'fluppy.remote.zoom');
});
