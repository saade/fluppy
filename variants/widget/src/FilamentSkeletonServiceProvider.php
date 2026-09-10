<?php

namespace Saade\FilamentSkeleton;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentSkeletonServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-skeleton';

    public static string $viewNamespace = 'filament-skeleton';

    public function configurePackage(Package $package): void
    {
        $package
            ->name(static::$name)
            ->hasTranslations() // @extra:lang
            ->hasConfigFile() // @extra:config
            ->hasMigration('create_filament_skeleton_table') // @extra:migrations
            ->hasViews();
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
        $directory = __DIR__ . '/../resources/dist';

        // A build that splits the component into chunks leaves them next to
        // this folder, and the component imports them by relative path, so
        // they are published under the names they were built with.
        return [
            AlpineComponent::make('filament-skeleton', "{$directory}/components/filament-skeleton.js"),
            ...array_map(
                fn (string $path): Js => Js::make(basename($path, '.js'), $path)->loadedOnRequest(),
                glob("{$directory}/*.js") ?: [],
            ),
        ];
    }
}
