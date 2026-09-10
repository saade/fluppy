<?php

namespace Saade\FilamentSkeleton;

use Closure;
use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\Support\Colors\Color;
use Filament\Support\Concerns\EvaluatesClosures;

class FilamentSkeletonPlugin implements Plugin
{
    use EvaluatesClosures;

    /**
     * @var array<int | string, string | int> | string | Closure
     */
    protected array | string | Closure $primaryColor = Color::Indigo;

    public function getId(): string
    {
        return 'filament-skeleton';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }

    /**
     * What the theme sets on the panel. The stylesheet does the rest, and is
     * imported by the application's own Filament theme, not registered here.
     */
    public function register(Panel $panel): void
    {
        $panel->colors(fn (): array => [
            'primary' => $this->getPrimaryColor(),
        ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    /**
     * @param  array<int | string, string | int> | string | Closure  $color
     */
    public function primaryColor(array | string | Closure $color): static
    {
        $this->primaryColor = $color;

        return $this;
    }

    /**
     * @return array<int | string, string | int> | string
     */
    public function getPrimaryColor(): array | string
    {
        return $this->evaluate($this->primaryColor);
    }
}
