<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Saade\Fluppy\Sources\DropboxSource;

/**
 * Dropbox, except that the person is sent to a page of the test application
 * to let it in, which a browser test can reach and Dropbox's it cannot.
 */
class LocalDropboxSource extends DropboxSource
{
    protected function getAuthorizationEndpoint(): string
    {
        return url('fluppy-tests/authorize');
    }
}
