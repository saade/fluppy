<?php

use Illuminate\Support\Facades\Storage;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

const UPPY = "window.Alpine.\$data(document.querySelector('.fi-fluppy')).getUppy()";

/**
 * Hands files to Uppy the way its file picker does. The plugin's own
 * `attach()` gives the browser a path on this machine, which Playwright
 * refuses from a client it does not consider local.
 *
 * @param  array<string, string>  $files  Contents by file name.
 */
function chooseFiles(mixed $page, array $files): mixed
{
    $page->assertSee('browse files');

    $files = json_encode(array_map(
        fn (string $name, string $contents): array => ['name' => $name, 'contents' => base64_encode($contents)],
        array_keys($files),
        $files,
    ));

    $page->script(<<<JS
        (() => {
            const input = document.querySelector('.uppy-Dashboard-input')
            const transfer = new DataTransfer()

            for (const file of {$files}) {
                const bytes = Uint8Array.from(atob(file.contents), (character) => character.charCodeAt(0))

                transfer.items.add(new File([bytes], file.name, { lastModified: 1 }))
            }

            input.files = transfer.files
            input.dispatchEvent(new Event('change', { bubbles: true }))
        })()
    JS);

    return $page;
}

function storedFile(mixed $page): string
{
    return Storage::disk('uploads')->get(json_decode($page->text('#saved')));
}

it('uploads a small file through Livewire and stores it', function () {
    $contents = random_bytes(2000);

    $page = chooseFiles(visit('/fluppy-tests'), ['notes.bin' => $contents])
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page))->toBe($contents);
});

it('uploads a large file in chunks and stores it whole', function () {
    $contents = random_bytes(300 * 1024);

    $page = chooseFiles(visit('/fluppy-tests'), ['video.bin' => $contents])
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page) === $contents)->toBeTrue();
});

it('turns a file away with the reason when it is larger than Livewire allows', function () {
    config(['livewire.temporary_file_upload.rules' => 'file|max:1024']);

    chooseFiles(visit('/fluppy-tests'), ['video.bin' => random_bytes(2 * 1024 * 1024)])
        ->assertSee('Upload failed')
        ->assertScript(UPPY . '.getFiles()[0].error', 'The file is larger than the 1 MB allowed.');
});

it('pauses a large upload and finishes it when resumed', function () {
    $contents = random_bytes(600 * 1024);

    $page = visit('/fluppy-tests');

    // Every chunk is held back for a moment, so the upload is still going
    // when it is paused.
    $page->script(<<<'JS'
        (() => {
            const send = XMLHttpRequest.prototype.send

            XMLHttpRequest.prototype.send = function (...body) {
                setTimeout(() => this.readyState === 1 && send.apply(this, body), 300)
            }
        })()
    JS);

    $pauseOrResume = '(() => { const uppy = ' . UPPY . '; uppy.pauseResume(uppy.getFiles()[0].id) })()';

    chooseFiles($page, ['video.bin' => $contents])
        ->assertSee('Uploading 1 file')
        ->script($pauseOrResume);

    $page->assertSee('Upload paused')
        ->assertScript(UPPY . '.getFiles()[0].progress.uploadComplete', false)
        ->script($pauseOrResume);

    $page->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect(storedFile($page) === $contents)->toBeTrue();
});

it('continues a large upload from the chunks that arrived before the page was reloaded', function () {
    $contents = random_bytes(640 * 1024);

    // Counts the chunks sent, and holds each back so the page can be
    // reloaded while some are still to go.
    $countChunks = <<<'JS'
        (() => {
            const send = XMLHttpRequest.prototype.send
            const open = XMLHttpRequest.prototype.open

            window.chunksSent = 0

            XMLHttpRequest.prototype.open = function (method, url, ...rest) {
                this.isChunk = String(url).includes('fluppy/chunks')

                return open.call(this, method, url, ...rest)
            }

            XMLHttpRequest.prototype.send = function (...body) {
                if (! this.isChunk) {
                    return send.apply(this, body)
                }

                window.chunksSent++

                setTimeout(() => this.readyState === 1 && send.apply(this, body), DELAY)
            }
        })()
    JS;

    $page = visit('/fluppy-tests');

    $page->script(str_replace('DELAY', '700', $countChunks));

    chooseFiles($page, ['video.bin' => $contents])->assertSee('Uploading 1 file')->wait(1.2);

    $page->refresh()->script(str_replace('DELAY', '0', $countChunks));

    chooseFiles($page, ['video.bin' => $contents])
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    expect($page->script('window.chunksSent'))->toBeGreaterThan(0)->toBeLessThan(10)
        ->and(storedFile($page) === $contents)->toBeTrue();
});

it('puts files in the order they are dragged into', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->multiple()->reorderable()->preserveFilenames();

    $page = chooseFiles(visit('/fluppy-tests'), ['a.txt' => 'a', 'b.txt' => 'b', 'c.txt' => 'c'])
        ->assertSee('Upload complete')
        ->drag('.uppy-Dashboard-Item:has-text("c.txt")', '.uppy-Dashboard-Item:has-text("a.txt")')
        ->wait(0.5)
        ->press('Save')
        ->assertSee('Saved:');

    expect(json_decode($page->text('#saved')))->toBe(['c.txt', 'a.txt', 'b.txt']);
});

it('shows the files a field already has', function () {
    Storage::disk('uploads')->put('existing/photo.png', 'contents');

    FluppyForm::$fill = ['attachments' => 'existing/photo.png'];

    visit('/fluppy-tests')
        ->assertSee('photo.png')
        ->assertSee('Upload complete');
});

it('removes a file and saves without it', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->multiple();

    $page = chooseFiles(visit('/fluppy-tests'), ['a.txt' => 'a', 'b.txt' => 'b'])
        ->assertSee('Upload complete')
        ->assertSee('a.txt')
        ->click('.uppy-Dashboard-Item:first-child .uppy-Dashboard-Item-action--remove')
        ->assertDontSee('a.txt')
        ->press('Save')
        ->assertSee('Saved:');

    expect(json_decode($page->text('#saved')))->toHaveCount(1);
});
