<?php

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;

const ASSET_PACKAGE = 'saade/filament-skeleton';

function skeletonComponentAsset(): AlpineComponent
{
    return collect(FilamentAsset::getAlpineComponents([ASSET_PACKAGE]))->sole();
}

it('registers the component and every file it can load', function () {
    $scripts = collect(FilamentAsset::getScripts([ASSET_PACKAGE]))
        ->map(fn (Js $asset): string => $asset->getId())
        ->sort()
        ->values()
        ->all();

    $built = collect(glob(realpath(__DIR__ . '/../../resources/dist') . '/*.js'))
        ->map(fn (string $path): string => basename($path, '.js'))
        ->sort()
        ->values()
        ->all();

    expect(skeletonComponentAsset()->getId())->toBe('filament-skeleton')
        ->and(file_exists(skeletonComponentAsset()->getPath()))->toBeTrue()
        ->and($scripts)->toBe($built);
});

it('does not put the on-demand files on every page', function () {
    expect(collect(FilamentAsset::getScripts([ASSET_PACKAGE]))->every(fn (Js $asset): bool => $asset->isLoadedOnRequest()))
        ->toBeTrue();
});
