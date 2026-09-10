<?php

namespace Saade\FilamentSkeleton\Widgets;

use Filament\Widgets\Widget;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

class SkeletonWidget extends Widget
{
    protected string $view = 'filament-skeleton::widget';

    protected int | string | array $columnSpan = 'full';

    protected ?string $greeting = null;

    /**
     * A widget's own value wins over the panel plugin's, so one widget can
     * differ from the rest without the plugin being registered at all.
     */
    public function getGreeting(): string
    {
        return $this->greeting ?? FilamentSkeletonPlugin::current()->getGreeting();
    }
}
