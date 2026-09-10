<?php

namespace Saade\FilamentSkeleton;

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
}
