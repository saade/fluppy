<?php

namespace Saade\Fluppy\Forms\Components;

use Closure;
use Filament\Forms\Components\Field;

class FluppyField extends Field
{
    protected string $view = 'fluppy::field';

    protected int | Closure $step = 1;

    public function step(int | Closure $step): static
    {
        $this->step = $step;

        return $this;
    }

    public function getStep(): int
    {
        return $this->evaluate($this->step);
    }
}
