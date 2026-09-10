<?php

namespace Saade\FilamentSkeleton\Tests;

use Saade\FilamentSkeleton\Tests\Fixtures\TestPanelProvider;

/**
 * An application with no panel, for what the package has to do on a page
 * that is not part of one.
 */
class StandaloneTestCase extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return array_values(array_diff(parent::getPackageProviders($app), [
            TestPanelProvider::class,
        ]));
    }
}
