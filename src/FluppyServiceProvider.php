<?php

namespace Saade\Fluppy;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Asset;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\Facades\Route;
use Saade\Fluppy\Commands\DoctorCommand;
use Saade\Fluppy\Commands\PruneCommand;
use Saade\Fluppy\Http\Controllers\ChunkController;
use Saade\Fluppy\Http\Controllers\DoctorController;
use Saade\Fluppy\Http\Controllers\RemoteController;
use Saade\Fluppy\Http\Controllers\SourceConnectionController;
use Saade\Fluppy\Sources\DropboxSource;
use Saade\Fluppy\Sources\GoogleDriveSource;
use Saade\Fluppy\Sources\OneDriveSource;
use Saade\Fluppy\Sources\SourceManager;
use Saade\Fluppy\Sources\Support\SessionTokenStore;
use Saade\Fluppy\Sources\Support\TokenStore;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Sources\UrlSource;
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
            ->hasCommands([DoctorCommand::class, PruneCommand::class])
            ->hasViews();
    }

    public function packageRegistered(): void
    {
        $this->app->singleton(UrlGuard::class, fn (): UrlGuard => new UrlGuard);

        $this->app->bindIf(TokenStore::class, SessionTokenStore::class);

        $this->app->singleton(SourceManager::class, fn (): SourceManager => (new SourceManager)
            ->extend('url', fn (): UrlSource => app(UrlSource::class))
            ->extend('google-drive', fn (): GoogleDriveSource => app(GoogleDriveSource::class))
            ->extend('dropbox', fn (): DropboxSource => app(DropboxSource::class))
            ->extend('onedrive', fn (): OneDriveSource => app(OneDriveSource::class)));
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

        Route::post('fluppy/remote', RemoteController::class)
            ->middleware(['web', 'throttle:' . config('fluppy.remote.throttle', '600,1')])
            ->name('fluppy.remote');

        Route::middleware(['web', 'throttle:60,1', ...(array) config('fluppy.remote.connect_middleware', [])])->group(function (): void {
            Route::get('fluppy/sources/{source}/connect', [SourceConnectionController::class, 'connect'])
                ->name('fluppy.sources.connect');

            Route::get('fluppy/sources/{source}/callback', [SourceConnectionController::class, 'callback'])
                ->name('fluppy.sources.callback');
        });

        // Called by `fluppy:doctor`, which has no session to pass the `web`
        // group with.
        Route::post('fluppy/doctor', DoctorController::class)
            ->middleware('throttle:10,1')
            ->name('fluppy.doctor');
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
