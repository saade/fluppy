<?php

namespace Saade\FilamentSkeleton;

use Closure;
use Filament\Contracts\Plugin;
use Filament\Facades\Filament;
use Filament\Panel;
use Filament\Support\Concerns\EvaluatesClosures;
use Throwable;

class FilamentSkeletonPlugin implements Plugin
{
    use EvaluatesClosures;

    protected string | Closure | null $greeting = null;

    public function getId(): string
    {
        return 'filament-skeleton';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    /**
     * The plugin registered on the current panel, or one with the default
     * settings on a panel that does not register it or outside a panel
     * altogether. Registering the plugin is optional because of this.
     */
    public static function current(): static
    {
        try {
            $panel = Filament::getCurrentOrDefaultPanel();
        } catch (Throwable) {
            $panel = null;
        }

        $id = app(static::class)->getId();

        if (! $panel?->hasPlugin($id)) {
            return static::make();
        }

        /** @var static $plugin */
        $plugin = $panel->getPlugin($id);

        return $plugin;
    }

    public function register(Panel $panel): void
    {
        //
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public function greeting(string | Closure | null $greeting): static
    {
        $this->greeting = $greeting;

        return $this;
    }

    public function getGreeting(): string
    {
        return $this->evaluate($this->greeting) ?? 'Hello';
    }
}
