<?php

namespace Saade\FilamentSkeleton\Tests\Fixtures;

use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

class TestPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->colors(['danger' => Color::Rose])
            ->plugin(
                FilamentSkeletonPlugin::make()
                    ->primaryColor(fn (): array => Color::Teal),
            );
    }
}
