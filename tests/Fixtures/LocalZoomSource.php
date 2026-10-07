<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Saade\Fluppy\Sources\ZoomSource;

/**
 * Zoom, except that the person is sent to a page of the test application to
 * let it in, which a browser test can reach and Zoom's it cannot.
 */
class LocalZoomSource extends ZoomSource
{
    protected function getAuthorizationEndpoint(): string
    {
        return url('fluppy-tests/authorize');
    }
}
