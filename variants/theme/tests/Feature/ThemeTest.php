<?php

use Filament\Facades\Filament;
use Filament\Support\Colors\Color;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

it('sets the primary color of the panel and leaves its other colors alone', function () {
    $colors = Filament::getPanel('admin')->getColors();

    expect($colors['primary'])->toBe(Color::Teal)
        ->and($colors['danger'])->toBe(Color::Rose);
});

it('has a default primary color', function () {
    expect(FilamentSkeletonPlugin::make()->getPrimaryColor())->toBe(Color::Indigo);
});

it('ships a stylesheet for the application to import', function () {
    expect(file_exists(__DIR__ . '/../../resources/css/filament-skeleton.css'))->toBeTrue();
});
