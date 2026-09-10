<?php

namespace Saade\FilamentSkeleton\Tests\Fixtures;

use Filament\Panel;
use Filament\PanelProvider;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

class TestPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->plugin(
                FilamentSkeletonPlugin::make()
                    ->greeting('Hello from the panel'),
            );
    }
}
