<?php

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;

const ASSET_PACKAGE = 'saade/fluppy';

function fluppyComponentAsset(): AlpineComponent
{
    return collect(FilamentAsset::getAlpineComponents([ASSET_PACKAGE]))->sole();
}

it('registers the component', function () {
    expect(fluppyComponentAsset()->getId())->toBe('fluppy')
        ->and(file_exists(fluppyComponentAsset()->getPath()))->toBeTrue();
});

it('is built as one file and publishes nothing else', function () {
    $built = collect(new RecursiveIteratorIterator(new RecursiveDirectoryIterator(realpath(__DIR__ . '/../../resources/dist'), FilesystemIterator::SKIP_DOTS)))
        ->map(fn (SplFileInfo $file): string => $file->getRealPath())
        ->values()
        ->all();

    expect($built)->toBe([realpath(fluppyComponentAsset()->getPath())])
        ->and(FilamentAsset::getScripts([ASSET_PACKAGE]))->toBeEmpty();
});
