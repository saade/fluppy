<?php

namespace Saade\Fluppy\Tests\Fixtures;

/**
 * The fixture form as a page a browser can use: with a button to save it,
 * and what was saved shown afterwards.
 */
class FluppyPage extends FluppyForm
{
    public ?string $saved = null;

    public function save(): void
    {
        parent::save();

        $this->saved = json_encode($this->data['attachments'] ?? null);
    }

    public function render(): string
    {
        return <<<'BLADE'
            <div>
                <form wire:submit="save">
                    {{ $this->form }}

                    <button type="submit">Save</button>
                </form>

                @if ($saved)
                    <p>Saved: <output id="saved">{{ $saved }}</output></p>
                @endif
            </div>
        BLADE;
    }
}
