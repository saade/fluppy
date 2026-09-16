<?php

namespace Saade\Fluppy;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\Facades\Route;
use Saade\Fluppy\Http\Controllers\ChunkController;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FluppyServiceProvider extends PackageServiceProvider
{
    public static string $name = 'fluppy';

    public static string $viewNamespace = 'fluppy';

    public function configurePackage(Package $package): void
    {
        $package
            ->name(static::$name)
            ->hasTranslations()
            ->hasConfigFile()
            ->hasViews();
    }

    public function packageBooted(): void
    {
        FilamentAsset::register(
            $this->getAssets(),
            $this->getAssetPackageName(),
        );

        Route::post('fluppy/chunks', ChunkController::class)
            ->middleware(['web', 'throttle:' . config('fluppy.chunking.throttle', '600,1')])
            ->name('fluppy.chunks');
    }

    protected function getAssetPackageName(): ?string
    {
        return 'saade/fluppy';
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
            AlpineComponent::make('fluppy', "{$directory}/components/fluppy.js"),
            ...array_map(
                fn (string $path): Js => Js::make(basename($path, '.js'), $path)->loadedOnRequest(),
                glob("{$directory}/*.js") ?: [],
            ),
        ];
    }
}
