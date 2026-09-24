<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Closure;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use Livewire\WithFileUploads;
use Saade\Fluppy\Forms\Components\SpatieMediaLibraryFluppyField;

class MediaForm extends Component implements HasSchemas
{
    use InteractsWithSchemas;
    use WithFileUploads;

    /**
     * Lets a test configure the field before the component is rendered.
     */
    public static ?Closure $configureUsing = null;

    /**
     * @var array<string, mixed> | null
     */
    public ?array $data = [];

    public Post $record;

    public function mount(): void
    {
        // Filled the way an edit page does it. Without the record's
        // attributes Filament fills in defaults, and does not ask the
        // record for its media.
        $this->form->fill($this->record->attributesToArray());
    }

    public function form(Schema $schema): Schema
    {
        $field = SpatieMediaLibraryFluppyField::make('attachments')
            ->disk('uploads')
            ->collection('attachments');

        return $schema
            ->statePath('data')
            ->model($this->record)
            ->components([
                static::$configureUsing ? (static::$configureUsing)($field) : $field,
            ]);
    }

    public function save(): void
    {
        $this->form->getState();
        $this->form->saveRelationships();
    }

    public function render(): string
    {
        return '<div>{{ $this->form }}</div>';
    }
}
