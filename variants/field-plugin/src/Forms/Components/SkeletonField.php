<?php

namespace Saade\FilamentSkeleton\Forms\Components;

use Closure;
use Filament\Forms\Components\Field;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

class SkeletonField extends Field
{
    protected string $view = 'filament-skeleton::field';

    protected int | Closure | null $step = null;

    public function step(int | Closure | null $step): static
    {
        $this->step = $step;

        return $this;
    }

    /**
     * A field's own value wins over the panel plugin's, so one field can
     * differ from the rest without the plugin being registered at all.
     */
    public function getStep(): int
    {
        return $this->evaluate($this->step) ?? FilamentSkeletonPlugin::current()->getStep();
    }
}
