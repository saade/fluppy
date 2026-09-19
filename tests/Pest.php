<?php

use Pest\Browser\Plugin;
use Saade\Fluppy\Tests\BrowserTestCase;
use Saade\Fluppy\Tests\TestCase;

uses(TestCase::class)->in('Feature');
uses(BrowserTestCase::class)->in('Browser');

// The browser plugin needs PHP 8.3, and is left out where that is not there.
if (class_exists(Plugin::class)) {
    pest()->browser()->timeout(20000);
}
