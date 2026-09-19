<?php

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

/**
 * Answers the command's requests the way the app behind a web server would:
 * a chunk no larger than the limit arrives whole, a larger one gets a 413.
 */
function fakeApp(int $chunkSize = 900 * 1024, ?int $webServerLimit = null): void
{
    Http::fake(function (Request $request) use ($chunkSize, $webServerLimit) {
        $received = strlen($request->data()[0]['contents'] ?? '');

        if ($webServerLimit && $received > $webServerLimit) {
            return Http::response('Request Entity Too Large', 413);
        }

        return Http::response([
            'received' => $received,
            'upload_max_filesize' => '2M',
            'post_max_size' => '8M',
            'chunk_size' => $chunkSize,
        ]);
    });
}

it('passes when a chunk reaches the app whole', function () {
    fakeApp();

    test()->artisan('fluppy:doctor')
        ->expectsOutputToContain('reaches the app whole')
        ->assertSuccessful();
});

it('fails when the web server refuses a chunk', function () {
    fakeApp(webServerLimit: 500 * 1024);

    test()->artisan('fluppy:doctor')
        ->expectsOutputToContain('refused by the web server')
        ->assertFailed();
});

it('says when the chunk size was lowered to fit PHP', function () {
    config(['fluppy.chunking.chunk_size' => 4096]);

    fakeApp(chunkSize: 2 * 1024 * 1024);

    test()->artisan('fluppy:doctor')
        ->expectsOutputToContain('lowered from 4 MB')
        ->assertSuccessful();
});

it('warns about the limit Livewire has by default', function () {
    fakeApp();

    test()->artisan('fluppy:doctor')->expectsOutputToContain('Livewire\'s default');

    config(['livewire.temporary_file_upload.rules' => 'file|max:1048576']);

    test()->artisan('fluppy:doctor')->expectsOutputToContain('1 GB');
});

it('says whether the clean-up is scheduled', function () {
    fakeApp();

    test()->artisan('fluppy:doctor')->expectsOutputToContain('is not scheduled');

    app(Schedule::class)->command('fluppy:prune')->daily();

    test()->artisan('fluppy:doctor')->expectsOutputToContain('is scheduled');
});

it('says how files are saved to a disk it is asked about', function () {
    fakeApp();

    config(['filesystems.disks.uploads' => ['driver' => 'local', 'root' => storage_path('uploads')]]);

    test()->artisan('fluppy:doctor', ['--disk' => ['uploads']])->expectsOutputToContain('pass through the server');
});

it('tells the command what arrived and what PHP allows, only at a signed address', function () {
    test()->post(route('fluppy.doctor', absolute: false))->assertUnauthorized();

    test()
        ->post(URL::signedRoute('fluppy.doctor', absolute: false))
        ->assertOk()
        ->assertJsonStructure(['received', 'upload_max_filesize', 'post_max_size', 'chunk_size']);
});
