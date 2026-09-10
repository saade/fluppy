<?php

use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;

it('registers the script of the theme as a module', function () {
    /** @var Js $script */
    $script = collect(FilamentAsset::getScripts(['saade/filament-skeleton']))->sole();

    expect($script->getId())->toBe('filament-skeleton')
        ->and($script->isModule())->toBeTrue()
        ->and(file_exists($script->getPath()))->toBeTrue();
});
