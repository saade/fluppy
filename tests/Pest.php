<?php

use Illuminate\Support\Facades\Storage;
use Pest\Browser\Plugin;
use Saade\Fluppy\Tests\BrowserTestCase;
use Saade\Fluppy\Tests\TestCase;

uses(TestCase::class)->in('Feature');
uses(BrowserTestCase::class)->in('Browser');

// The browser plugin needs PHP 8.3, and is left out where that is not there.
if (class_exists(Plugin::class)) {
    pest()->browser()->timeout(20000);
}

const UPPY = "window.Alpine.\$data(document.querySelector('.fi-fluppy')).getUppy()";

function storedFile(mixed $page): string
{
    return Storage::disk('uploads')->get(json_decode($page->text('#saved')));
}
