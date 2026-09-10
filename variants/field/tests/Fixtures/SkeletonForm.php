<?php

namespace Saade\FilamentSkeleton\Tests\Fixtures;

use Closure;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Saade\FilamentSkeleton\Forms\Components\SkeletonField;

class SkeletonForm extends Component implements HasSchemas
{
    use InteractsWithSchemas;

    /**
     * Lets a test configure the field before the component is rendered.
     */
    public static ?Closure $configureUsing = null;

    /**
     * @var array<string, mixed> | null
     */
    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Schema $schema): Schema
    {
        $field = SkeletonField::make('amount');

        return $schema
            ->statePath('data')
            ->components([
                static::$configureUsing ? (static::$configureUsing)($field) : $field,
            ]);
    }

    public function save(): void
    {
        $this->data = $this->form->getState();
    }

    public function render(): string
    {
        return '<div>{{ $this->form }}</div>';
    }
}
