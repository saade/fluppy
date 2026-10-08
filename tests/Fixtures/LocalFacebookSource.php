<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Saade\Fluppy\Sources\FacebookSource;

/**
 * Facebook, except that the person is sent to a page of the test application
 * to let it in, which a browser test can reach and Facebook's it cannot.
 */
class LocalFacebookSource extends FacebookSource
{
    protected function getAuthorizationEndpoint(): string
    {
        return url('fluppy-tests/authorize');
    }
}
