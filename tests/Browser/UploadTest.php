<?php

use Illuminate\Support\Facades\Storage;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

const UPPY = "window.Alpine.\$data(document.querySelector('.fi-fluppy')).getUppy()";

const EDITED_IMAGE_IS_UPLOADED = '(() => { const files = ' . UPPY . ".getFiles(); return files.length === 1 && files[0].source === 'ImageEditor' && files[0].progress.uploadComplete === true })()";

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

/**
 * Waits for something in the page that no text on it tells apart, such as
 * an upload that replaces another: "Upload complete" is shown before and
 * after.
 */
function waitUntil(mixed $page, string $expression): mixed
{
    for ($attempt = 0; $attempt < 100; $attempt++) {
        if ($page->script($expression) === true) {
            return $page;
        }

        usleep(100_000);
    }

    test()->fail("Waited 10 seconds for [{$expression}].");
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

it('offers the camera, the microphone and the screen only on a field that has them', function () {
    visit('/fluppy-tests')
        ->assertSee('browse files')
        ->assertDontSee('Camera')
        ->assertScript('Boolean(' . UPPY . ".getPlugin('Webcam'))", false);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->camera()->microphone()->screenCapture();

    visit('/fluppy-tests')
        ->assertSee('My Device')
        ->assertSee('Camera')
        ->assertSee('Audio')
        ->assertSee('Screencast')
        ->click('Camera')
        ->assertScript('Boolean(document.querySelector(".uppy-Webcam-container, .uppy-Webcam-permissons"))', true);
});

it('uploads a picture taken with the camera', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->image()->camera();

    $page = visit('/fluppy-tests')->assertSee('Camera');

    // A drawing stands in for the camera, which a test has none of. It is
    // drawn again and again because a canvas only sends a frame when it
    // changes, and a picture taken before the first frame is empty.
    $page->script(<<<'JS'
        (() => {
            const canvas = document.createElement('canvas')

            canvas.width = 320
            canvas.height = 240

            setInterval(() => {
                const context = canvas.getContext('2d')

                context.fillStyle = `hsl(${Date.now() % 360} 80% 50%)`
                context.fillRect(0, 0, 320, 240)
            }, 50)

            navigator.mediaDevices.getUserMedia = async () => canvas.captureStream(10)
            navigator.mediaDevices.enumerateDevices = async () => [{ kind: 'videoinput', deviceId: 'drawing', label: 'Drawing' }]
        })()
    JS);

    $page->click('Camera')
        ->wait(1)
        ->click('.uppy-Webcam-button--picture')
        ->click('.uppy-Webcam-button--submit')
        ->assertSee('Upload complete')
        ->press('Save')
        ->assertSee('Saved:');

    $stored = json_decode($page->text('#saved'));

    expect($stored)->toEndWith('.jpg')
        ->and(getimagesizefromstring(Storage::disk('uploads')->get($stored)))->toMatchArray([320, 240]);
});

it('only takes pictures with the camera of a field for images', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->image()->camera();

    visit('/fluppy-tests')
        ->assertSee('Camera')
        ->assertScript('JSON.stringify(' . UPPY . ".getPlugin('Webcam').opts.modes)", '["picture"]');
});

it('links a stored file to where it can be opened, only when it is openable', function () {
    Storage::disk('uploads')->put('existing/report.pdf', 'contents');

    FluppyForm::$fill = ['attachments' => 'existing/report.pdf'];

    visit('/fluppy-tests')
        ->assertSee('report.pdf')
        ->assertScript('document.querySelectorAll(".uppy-Dashboard-Item-previewLink").length', 0);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->openable();

    visit('/fluppy-tests')
        ->assertSee('report.pdf')
        ->assertScript('document.querySelector(".uppy-Dashboard-Item-previewLink")?.getAttribute("href")?.includes("existing/report.pdf")', true)
        ->assertScript('document.querySelector(".uppy-Dashboard-Item-previewLink")?.target', '_blank');
});

it('shows no picture of an image when it is not previewable', function () {
    Storage::disk('uploads')->put('existing/photo.png', base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='));

    FluppyForm::$fill = ['attachments' => 'existing/photo.png'];

    visit('/fluppy-tests')
        ->assertSee('photo.png')
        ->assertScript('document.querySelectorAll(".uppy-Dashboard-Item-previewImg").length', 1);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->previewable(false);

    visit('/fluppy-tests')
        ->assertSee('photo.png')
        ->assertScript('document.querySelectorAll(".uppy-Dashboard-Item-previewImg").length', 0);
});

/**
 * A PNG of the given size, for the image editor to work on.
 */
function picture(int $width, int $height): string
{
    $image = imagecreatetruecolor($width, $height);

    imagefill($image, 0, 0, imagecolorallocate($image, 200, 60, 60));

    ob_start();
    imagepng($image);

    return ob_get_clean();
}

it('gives a stored file a download link, only when it is downloadable', function () {
    Storage::disk('uploads')->put('existing/report.pdf', 'contents');

    FluppyForm::$fill = ['attachments' => 'existing/report.pdf'];

    visit('/fluppy-tests')
        ->assertSee('report.pdf')
        ->assertScript('document.querySelectorAll("[data-fluppy-action=download]").length', 0);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->downloadable();

    visit('/fluppy-tests')
        ->assertSee('report.pdf')
        ->assertScript('document.querySelector("[data-fluppy-action=download]")?.getAttribute("href")?.includes("existing/report.pdf")', true)
        ->assertScript('document.querySelector("[data-fluppy-action=download]")?.download', 'report.pdf')
        ->assertScript('document.querySelector("[data-fluppy-action=download]")?.title', 'Download');
});

it('has no edit button without an image editor, or on a file that is not an image', function () {
    chooseFiles(visit('/fluppy-tests'), ['photo.png' => picture(40, 30)])
        ->assertSee('Upload complete')
        ->assertScript('document.querySelectorAll("[data-fluppy-action=edit]").length', 0);

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->multiple()->imageEditor();

    chooseFiles(visit('/fluppy-tests'), ['photo.png' => picture(40, 30), 'notes.txt' => 'notes'])
        ->assertSee('Upload complete')
        ->assertScript('document.querySelectorAll("[data-fluppy-action=edit]").length', 1);
});

it('edits an uploaded image and uploads the result in its place', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->image()->imageEditor();

    $page = chooseFiles(visit('/fluppy-tests'), ['photo.png' => picture(400, 300)])
        ->assertSee('Upload complete')
        ->click('[data-fluppy-action=edit]')
        ->click('.uppy-ImageCropper-controls button[aria-label="Rotate 90°"]')
        ->wait(0.5)
        ->click('.uppy-DashboardContent-save');

    waitUntil($page, EDITED_IMAGE_IS_UPLOADED)
        ->press('Save')
        ->assertSee('Saved:');

    expect(getimagesizefromstring(storedFile($page)))->toMatchArray([300, 400]);
});

it('edits an image that was already stored', function () {
    Storage::disk('uploads')->put('existing/photo.png', picture(400, 300));

    // Public, so the file is at its plain address, which the test serves.
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->image()->imageEditor()->visibility('public');
    FluppyForm::$fill = ['attachments' => 'existing/photo.png'];

    $page = visit('/fluppy-tests')
        ->assertSee('photo.png')
        ->click('[data-fluppy-action=edit]')
        ->click('.uppy-ImageCropper-controls button[aria-label="Rotate 90°"]')
        ->wait(0.5)
        ->click('.uppy-DashboardContent-save');

    waitUntil($page, EDITED_IMAGE_IS_UPLOADED)
        ->press('Save')
        ->assertSee('Saved:');

    expect(json_decode($page->text('#saved')))->not->toBe('existing/photo.png')
        ->and(getimagesizefromstring(storedFile($page)))->toMatchArray([300, 400]);
});

it('offers only the crop shapes the field allows', function () {
    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->image()->imageEditor()->imageEditorAspectRatioOptions([null, '1:1', '4:3']);

    chooseFiles(visit('/fluppy-tests'), ['photo.png' => picture(400, 300)])
        ->assertSee('Upload complete')
        ->assertScript('JSON.stringify(' . UPPY . ".getPlugin('ImageEditor').opts.actions.cropSquare)", 'true')
        ->assertScript('JSON.stringify(' . UPPY . ".getPlugin('ImageEditor').opts.actions.cropWidescreen)", 'false');
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
