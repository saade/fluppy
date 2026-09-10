<?php

namespace Saade\FilamentSkeleton;

use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentSkeletonServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-skeleton';

    public function configurePackage(Package $package): void
    {
        $package
            ->hasTranslations() // @extra:lang
            ->hasConfigFile() // @extra:config
            ->hasMigration('create_filament_skeleton_table') // @extra:migrations
            ->name(static::$name);
    }

    public function packageBooted(): void
    {
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName(),
        );
    }

    protected function getAssetPackageName(): ?string
    {
        return 'saade/filament-skeleton';
    }

    /**
     * @return array<Asset>
     */
    protected function getAssets(): array
    {
        return [
            Js::make('filament-skeleton', __DIR__ . '/../resources/dist/filament-skeleton.js')->module(),
        ];
    }
}
