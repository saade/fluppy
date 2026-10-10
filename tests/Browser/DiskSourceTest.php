<?php

use Illuminate\Support\Facades\Storage;
use Saade\Fluppy\Forms\Components\FluppyField;
use Saade\Fluppy\Tests\Fixtures\FluppyForm;

beforeEach(function () {
    config(['fluppy.remote.part_size' => 64]);

    Storage::fake('library');
    Storage::disk('library')->put('brand/logo.txt', 'a logo, in words');
    Storage::disk('library')->put('brand/manuals/manual.bin', random_bytes(150 * 1024));

    FluppyForm::$configureUsing = fn (FluppyField $field) => $field->multiple()->importFromDisk('library', 'brand', 'Brand assets');
});

it('browses a disk of the application with nothing to connect and nobody to log out', function () {
    visit('/fluppy-tests')
        ->click('Brand assets')
        ->assertSee('logo.txt')
        ->assertSee('manuals')
        ->assertDontSee('Log out')
        ->assertScript("document.querySelectorAll('.uppy-Provider-authBtn').length", 0);

    visit('/fluppy-tests')
        ->assertSee('Brand assets')
        ->assertScript("document.querySelectorAll('.uppy-DashboardTab[data-uppy-acquirer-id=disk] .fi-fluppy-source-icon svg').length", 1);
});

it('searches the folders below the one that is open, on the server, and copies what is found and picked', function () {
    Storage::disk('library')->put('brand/manuals/older/first.txt', 'the first manual');

    $page = visit('/fluppy-tests')
        ->click('Brand assets')
        ->assertSee('manuals')
        ->type('.uppy-ProviderBrowser-searchFilterInput', 'first');

    waitUntil($page, "[...document.querySelectorAll('.uppy-ProviderBrowserItem')].some((item) => item.textContent.includes('first.txt'))");

    $page->assertDontSee('logo.txt');

    $page->script("[...document.querySelectorAll('.uppy-ProviderBrowserItem')].find((item) => item.textContent.includes('first.txt')).querySelector('input').click()");

    $page->click('.uppy-ProviderBrowser-footer .uppy-c-btn-primary')
        ->assertSee('Upload complete')
        ->assertScript('JSON.stringify(' . UPPY . '.getFiles().map((file) => [file.name, file.source]))', '[["first.txt","disk"]]')
        ->press('Save')
        ->assertSee('Saved:');

    expect(Storage::disk('uploads')->get(json_decode($page->text('#saved'))[0]))->toBe('the first manual');
});

it('shows a folder as a grid, with a picture of each image, and remembers that it was asked to', function () {
    config(['filesystems.disks.library.visibility' => 'public']);

    Storage::disk('library')->put('brand/logo.png', picture(20, 20));

    $page = visit('/fluppy-tests')
        ->click('Brand assets')
        ->assertSee('logo.png')
        ->assertScript("document.querySelectorAll('.uppy-ProviderBrowser-viewType--list').length", 1)
        ->assertScript("document.querySelector('.uppy-ProviderBrowser-toolbarBtn').textContent", 'Grid')
        ->click('.uppy-ProviderBrowser-toolbarBtn')
        ->assertScript("document.querySelectorAll('.uppy-ProviderBrowser-viewType--grid').length", 1)
        ->assertScript("document.querySelector('.uppy-ProviderBrowser-toolbarBtn').textContent", 'List')
        ->assertScript("[...document.querySelectorAll('.uppy-ProviderBrowserItem img')].some((image) => image.getAttribute('src').includes('brand/logo.png'))", true);

    // A click on a folder of the grid opens it, where Uppy's own ticks it.
    $page->script("document.querySelector('.uppy-ProviderBrowserItem-inner[for=\"%2Fmanuals\"]').click()");

    $page->assertSee('manual.bin')
        ->assertScript(UPPY . '.getFiles().length', 0);

    $page->script('window.location.reload()');

    $page
        ->click('Brand assets')
        ->assertSee('logo.png')
        ->assertScript("document.querySelectorAll('.uppy-ProviderBrowser-viewType--grid').length", 1);
});

it('copies every file of a folder that is picked whole', function () {
    Storage::disk('library')->put('brand/manuals/older/first.txt', 'the first manual');

    $page = visit('/fluppy-tests')
        ->click('Brand assets')
        ->assertSee('manuals');

    $page->script("[...document.querySelectorAll('.uppy-ProviderBrowserItem')].find((item) => item.textContent.includes('manuals')).querySelector('input').click()");

    $page->click('.uppy-ProviderBrowser-footer .uppy-c-btn-primary');

    waitUntil($page, '(() => { const files = ' . UPPY . '.getFiles(); return files.length === 2 && files.every((file) => file.progress.uploadComplete) })()');

    $page->assertScript('JSON.stringify(' . UPPY . '.getFiles().map((file) => file.name).sort())', '["first.txt","manual.bin"]');
});

it('opens a folder of the disk and has the server copy the file that is picked', function () {
    $page = visit('/fluppy-tests')
        ->click('Brand assets')
        ->assertSee('manuals');

    $page->script("[...document.querySelectorAll('.uppy-ProviderBrowserItem button')].find((button) => button.textContent.includes('manuals')).click()");

    $page->assertSee('manual.bin');

    $page->script("[...document.querySelectorAll('.uppy-ProviderBrowserItem')].find((item) => item.textContent.includes('manual.bin')).querySelector('input').click()");

    $page->click('.uppy-ProviderBrowser-footer .uppy-c-btn-primary')
        ->assertSee('Upload complete')
        ->assertScript('JSON.stringify(' . UPPY . '.getFiles().map((file) => [file.name, file.source, file.isRemote, file.size]))', '[["manual.bin","disk",true,153600]]')
        ->press('Save')
        ->assertSee('Saved:');

    expect(Storage::disk('uploads')->get(json_decode($page->text('#saved'))[0]))
        ->toBe(Storage::disk('library')->get('brand/manuals/manual.bin'));
});
