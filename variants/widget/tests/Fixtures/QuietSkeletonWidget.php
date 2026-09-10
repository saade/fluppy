<?php

namespace Saade\FilamentSkeleton\Tests\Fixtures;

use Saade\FilamentSkeleton\Widgets\SkeletonWidget;

class QuietSkeletonWidget extends SkeletonWidget
{
    protected ?string $greeting = 'Psst';
}
