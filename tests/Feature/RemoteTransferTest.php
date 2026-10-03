<?php

use Illuminate\Http\Client\Factory;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\Features\SupportTesting\Testable;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Tests\Fixtures\FakeS3MultipartUpload;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;
use Saade\Fluppy\Uploads\S3MultipartUpload;

const A_LINK = 'https://files.example.com/videos/holiday.mp4';

beforeEach(function () {
    Storage::fake('uploads');

    config(['fluppy.remote.part_size' => 1]);

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['93.184.216.34']);
});

afterEach(fn () => FluppyForm::$configureUsing = null);

/**
 * A server at the other end of every link, with one file on it.
 *
 * @param  array<string, string>  $headers
 */
function fileServer(string $contents, bool $acceptsRanges = true, array $headers = [], bool $saysItsSize = true): void
{
    Http::fake(function (Request $request) use ($contents, $acceptsRanges, $headers, $saysItsSize) {
        $headers = ['Content-Type' => 'video/mp4; codecs=avc1', ...$headers];

        if ($acceptsRanges && preg_match('/^bytes=(\d+)-(\d+)$/', $request->header('Range')[0] ?? '', $range)) {
            return Http::response(
                substr($contents, (int) $range[1], (int) $range[2] - (int) $range[1] + 1),
                206,
                [...$headers, 'Content-Range' => "bytes {$range[1]}-{$range[2]}/" . strlen($contents)],
            );
        }

        return Http::response($contents, 200, $saysItsSize ? [...$headers, 'Content-Length' => (string) strlen($contents)] : $headers);
    });
}

/**
 * @return array<string, mixed>
 */
function planRemoteFile(Testable $component, string $url = A_LINK): array
{
    return callRemoteField($component, 'planRemoteUpload', ['source' => 'url', 'reference' => ['url' => $url]]);
}

it('offers no remote source unless the field turns one on', function () {
    fileServer('contents');

    $component = remoteForm(fn (FluppyField $field) => $field);

    expect(planRemoteFile($component))->strategy->toBe('reject')
        ->and(callRemoteField($component, 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))->toHaveKey('error');

    Http::assertNothingSent();
});

it('does not offer a source that is not registered, or a field that is disabled', function () {
    fileServer('contents');

    expect(callRemoteField(remoteForm(), 'planRemoteUpload', ['source' => 'nowhere', 'reference' => []]))->strategy->toBe('reject')
        ->and(planRemoteFile(remoteForm(fn (FluppyField $field) => $field->importFromUrl()->disabled())))->strategy->toBe('reject');

    Http::assertNothingSent();
});

it('tells the browser which sources a field has', function () {
    $field = fn (Testable $component): FluppyField => $component->instance()->form->getComponent('attachments');

    expect($field(remoteForm(fn (FluppyField $field) => $field))->getRemoteSources())->toBe([])
        ->and($field(remoteForm())->getRemoteSources())->toBe(['url' => ['label' => 'Link']])
        ->and($field(remoteForm(fn (FluppyField $field) => $field->importFromUrl(fn (): bool => false)))->getRemoteSources())->toBe([])
        ->and($field(remoteForm(fn (FluppyField $field) => $field->remoteSource('nowhere')))->getRemoteSources())->toBe([]);

    remoteForm()->assertSeeHtml('remoteSources: JSON.parse(');
});

it('says what a link points to', function () {
    fileServer(str_repeat('a', 2500));

    expect(callRemoteField(remoteForm(), 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))
        ->toBe(['name' => 'holiday.mp4', 'size' => 2500, 'type' => 'video/mp4']);
});

it('takes the name of a file from its server when it gives one', function (string $disposition, string $name) {
    fileServer('contents', headers: ['Content-Disposition' => $disposition]);

    expect(callRemoteField(remoteForm(), 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))
        ->name->toBe($name);
})->with([
    ['attachment; filename="summer.mp4"', 'summer.mp4'],
    ["attachment; filename*=UTF-8''ver%C3%A3o.mp4", 'verão.mp4'],
    ['attachment; filename="../../etc/passwd"', 'passwd'],
    ['attachment; filename="C:\\Users\\me\\summer.mp4"', 'summer.mp4'],
]);

it('fetches a file larger than one part in chunks, and stores it whole', function () {
    $contents = random_bytes(2500);

    fileServer($contents);

    $component = remoteForm();

    $plan = planRemoteFile($component);

    expect($plan)
        ->strategy->toBe('chunked')
        ->name->toBe('holiday.mp4')
        ->size->toBe(2500)
        ->chunkSize->toBe(1024)
        ->totalChunks->toBe(3)
        ->receivedChunks->toBe([])
        ->and($plan['url'])->toContain('fluppy/remote');

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 2])->assertOk()->assertJson(['complete' => false, 'received' => [2]]);
    askForPart($plan, ['capability' => $plan['capability'], 'index' => 0])->assertOk()->assertJson(['complete' => false, 'received' => [0, 2]]);

    $reference = askForPart($plan, ['capability' => $plan['capability'], 'index' => 1])->assertOk()->assertJson(['complete' => true])->json('reference');

    expect(callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => $reference]))->toBeTrue()
        ->and($component->instance()->data['attachments']['a1b2'])->toBeInstanceOf(TemporaryUploadedFile::class)
        ->and($component->instance()->data['attachments']['a1b2']->getClientOriginalName())->toBe('holiday.mp4');

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe($contents);

    Http::assertSent(fn (Request $request): bool => $request->header('Range') === ['bytes=1024-2047']);
});

it('continues from the parts it has when the same link is planned again', function () {
    fileServer(random_bytes(2500));

    $component = remoteForm();

    $plan = planRemoteFile($component);

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 1])->assertOk();

    expect(planRemoteFile($component))->receivedChunks->toBe([1])
        ->and(planRemoteFile($component, 'https://files.example.com/videos/another.mp4'))->receivedChunks->toBe([]);
});

it('answers with the same file when it is fetched or planned again', function () {
    fileServer(random_bytes(2500));

    $component = remoteForm();

    $plan = planRemoteFile($component);

    $reference = fetchInChunks($plan);

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 0])->assertOk()->assertJson(['complete' => true, 'reference' => $reference]);

    expect(planRemoteFile($component))->completed->toBe($reference);
});

it('fetches a small file in one request', function () {
    fileServer('small contents');

    $component = remoteForm();

    $plan = planRemoteFile($component);

    expect($plan)->strategy->toBe('remote')->size->toBe(14);

    $reference = askForPart($plan)->assertOk()->assertJson(['complete' => true])->json('reference');

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => $reference]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe('small contents');
});

it('fetches a file in one request from a server that has no parts to give', function () {
    $contents = random_bytes(2500);

    fileServer($contents, acceptsRanges: false);

    $component = remoteForm();

    $plan = planRemoteFile($component);

    expect($plan)->strategy->toBe('remote')->size->toBe(2500);

    callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => askForPart($plan)->assertOk()->json('reference')]);

    $component->call('save')->assertHasNoErrors();

    expect(Storage::disk('uploads')->get($component->get('data.attachments')))->toBe($contents);
});

it('fetches a file whole when the field does not chunk', function () {
    fileServer(random_bytes(2500));

    expect(planRemoteFile(remoteForm(fn (FluppyField $field) => $field->importFromUrl()->chunked(false))))->strategy->toBe('remote');
});

it('turns away a file larger than is allowed before fetching it', function () {
    fileServer(random_bytes(2500));

    expect(planRemoteFile(remoteForm(fn (FluppyField $field) => $field->importFromUrl()->maxSize(2))))
        ->strategy->toBe('reject')
        ->message->toContain('2 KB');

    config(['livewire.temporary_file_upload.rules' => 'file|max:1']);

    expect(planRemoteFile(remoteForm()))->strategy->toBe('reject')->message->toContain('1 KB');
});

it('stops fetching a file of unknown size once it is larger than is allowed', function () {
    fileServer(random_bytes(3 * 1024 * 1024), acceptsRanges: false, saysItsSize: false);

    $plan = planRemoteFile(remoteForm(fn (FluppyField $field) => $field->importFromUrl()->maxSize(1024)));

    expect($plan)->strategy->toBe('remote')->size->toBeNull();

    askForPart($plan)->assertStatus(422)->assertJsonFragment(['message' => 'The file is larger than the 1 MB allowed.']);

    expect(FileUploadConfiguration::storage()->files(FileUploadConfiguration::path()))->toBe([]);
});

it('refuses a link to somewhere that is not the public internet', function (string $url) {
    Http::fake();

    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['10.0.0.5']);

    expect(planRemoteFile(remoteForm(), $url))
        ->strategy->toBe('reject')
        ->message->toBe('Files cannot be fetched from there.');

    Http::assertNothingSent();
})->with([
    'a name that resolves inside the network' => 'https://intranet.example.com/secret.pdf',
    'cloud metadata' => 'http://169.254.169.254/latest/meta-data/iam/security-credentials/',
    'this machine' => 'http://127.0.0.1/server-status',
    'another scheme' => 'file:///etc/passwd',
]);

it('refuses a link that redirects to somewhere that is not the public internet', function () {
    Http::fake([
        'files.example.com/*' => Http::response('', 302, ['Location' => 'http://169.254.169.254/latest/meta-data/']),
        '*' => Http::response('secret'),
    ]);

    expect(planRemoteFile(remoteForm()))->strategy->toBe('reject')->message->toBe('Files cannot be fetched from there.');

    Http::assertSentCount(1);
});

it('follows a redirect to somewhere public', function () {
    Http::fake([
        'files.example.com/*' => Http::response('', 302, ['Location' => 'https://cdn.example.com/holiday.mp4']),
        'cdn.example.com/*' => Http::response('contents', 200, ['Content-Length' => '8']),
    ]);

    expect(planRemoteFile(remoteForm()))->strategy->toBe('remote')->size->toBe(8);
});

it('gives up on a link that keeps redirecting', function () {
    Http::fake(['*' => Http::response('', 302, ['Location' => A_LINK])]);

    expect(planRemoteFile(remoteForm()))->strategy->toBe('reject');

    Http::assertSentCount(6);
});

it('says so when the server of a link does not have the file', function () {
    Http::fake(['*' => Http::response('Not Found', 404)]);

    expect(planRemoteFile(remoteForm()))->strategy->toBe('reject')->message->toContain('404');
});

it('does not keep a part that is not the size that was planned', function () {
    $component = remoteForm();

    fileServer(random_bytes(2500));

    $plan = planRemoteFile($component);

    // The file is shorter by the time its parts are asked for.
    Http::swap(new Factory);

    Http::fake(['*' => Http::response('short', 206, ['Content-Range' => 'bytes 0-4/5'])]);

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 0])->assertStatus(422);

    expect(FileUploadConfiguration::storage()->allFiles(FileUploadConfiguration::path('fluppy/chunks', false)))->toBe([]);
});

it('does not take a whole file for the part that was asked for', function () {
    $component = remoteForm();

    fileServer(random_bytes(2500));

    $plan = planRemoteFile($component);

    Http::swap(new Factory);

    fileServer(random_bytes(2500), acceptsRanges: false);

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 0])->assertStatus(422);
});

it('refuses a sealed file it did not seal, or sealed for another session', function () {
    fileServer(random_bytes(2500));

    $plan = planRemoteFile(remoteForm());

    askForPart([...$plan, 'sealed' => 'made-up'], ['capability' => $plan['capability'], 'index' => 0])->assertForbidden();
    askForPart([...$plan, 'sealed' => encrypt(['source' => 'url'])], ['capability' => $plan['capability'], 'index' => 0])->assertForbidden();

    session()->setId(str_repeat('b', 40));

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 0])->assertForbidden();
});

it('does not take for a sealed file something else the application encrypted for the same session', function () {
    fileServer('small contents');

    $plan = planRemoteFile(remoteForm());

    $lookalike = encrypt([
        'source' => 'url',
        'reference' => ['url' => A_LINK],
        'identity' => A_LINK,
        'name' => 'holiday.mp4',
        'type' => 'video/mp4',
        'size' => 14,
        'limit' => null,
        'session' => sha1(session()->getId()),
    ]);

    askForPart([...$plan, 'sealed' => $lookalike])->assertForbidden();

    Http::assertSentCount(1);
});

it('holds files fetched whole to the rate Livewire holds its uploads to', function () {
    fileServer('small contents');

    $plan = planRemoteFile(remoteForm());

    foreach (range(1, 60) as $fetch) {
        RateLimiter::hit('fluppy-remote-whole:' . sha1(session()->getId()), 60);
    }

    askForPart($plan)->assertStatus(429)->assertHeader('Retry-After');

    RateLimiter::clear('fluppy-remote-whole:' . sha1(session()->getId()));

    askForPart($plan)->assertOk()->assertJson(['complete' => true]);
});

it('stops asking sources on behalf of a session that asks too much', function () {
    fileServer('small contents');

    config(['fluppy.remote.throttle' => '2,1']);

    $component = remoteForm();

    expect(planRemoteFile($component))->strategy->toBe('remote')
        ->and(callRemoteField($component, 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))->toHaveKey('name')
        ->and(planRemoteFile($component))
        ->strategy->toBe('reject')
        ->message->toBe('Too many files were asked for at once. Wait a moment and try again.')
        ->and(callRemoteField($component, 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))->toHaveKey('error');

    Http::assertSentCount(2);
});

it('only takes from a server what has the shape of a type', function (string $header, ?string $type) {
    fileServer('contents', headers: ['Content-Type' => $header]);

    expect(callRemoteField(remoteForm(), 'describeRemoteFile', ['source' => 'url', 'reference' => ['url' => A_LINK]]))
        ->type->toBe($type);
})->with([
    ['Text/HTML; charset=utf-8', 'text/html'],
    ['application/vnd.ms-excel', 'application/vnd.ms-excel'],
    ['<script>alert(1)</script>', null],
    ['video/' . str_repeat('a', 300), null],
    ['', null],
]);

it('refuses the capability of one file with the sealed description of another', function () {
    fileServer(random_bytes(2500));

    $component = remoteForm();

    $one = planRemoteFile($component);
    $other = planRemoteFile($component, 'https://files.example.com/videos/another.mp4');

    askForPart($one, ['capability' => $other['capability'], 'index' => 0])->assertForbidden();
});

it('refuses a part that was not planned, and an address it did not sign', function () {
    fileServer(random_bytes(2500));

    $plan = planRemoteFile(remoteForm());

    askForPart($plan, ['capability' => $plan['capability'], 'index' => 3])->assertStatus(422);
    askForPart([...$plan, 'url' => route('fluppy.remote', absolute: false)], ['capability' => $plan['capability'], 'index' => 0])->assertUnauthorized();
});

it('sends the parts of a file on to the bucket when the temporary disk is S3', function () {
    FakeS3MultipartUpload::$uploads = [];

    app()->bind(S3MultipartUpload::class, FakeS3MultipartUpload::class);

    config([
        'filesystems.disks.s3.driver' => 's3',
        'livewire.temporary_file_upload.disk' => 's3',
        'livewire.temporary_file_upload.rules' => 'file|max:102400',
    ]);

    $size = 12 * 1024 * 1024;

    fileServer(str_repeat('a', $size));

    $component = remoteForm();

    $plan = planRemoteFile($component);

    expect($plan)
        ->strategy->toBe('s3')
        ->totalParts->toBe(3)
        ->uploadedParts->toBe([])
        ->and($plan['url'])->toContain('fluppy/remote');

    foreach ([1, 2, 3] as $part) {
        askForPart($plan, ['capability' => $plan['capability'], 'part' => $part])->assertOk()->assertJson(['part' => $part]);
    }

    expect(head(FakeS3MultipartUpload::$uploads)['parts'])->toBe([1 => 5 * 1024 * 1024, 2 => 5 * 1024 * 1024, 3 => 2 * 1024 * 1024])
        ->and(planRemoteFile($component))->uploadedParts->toBe([1, 2, 3]);

    $reference = callRemoteField($component, 'completeMultipartUpload', ['capability' => $plan['capability']]);

    expect(callRemoteField($component, 'adoptUpload', ['fileKey' => 'a1b2', 'reference' => $reference]))->toBeTrue();

    askForPart($plan, ['capability' => $plan['capability'], 'part' => 4])->assertForbidden();
});
