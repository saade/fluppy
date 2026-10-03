<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Saade\Fluppy\Sources\OneDriveSource;

/**
 * OneDrive, except that the person is sent to a page of the test application
 * to let it in, which a browser test can reach and Microsoft's it cannot.
 */
class LocalOneDriveSource extends OneDriveSource
{
    protected function getAuthorizationEndpoint(): string
    {
        return url('fluppy-tests/authorize');
    }
}
