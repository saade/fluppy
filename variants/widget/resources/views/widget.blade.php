<x-filament-widgets::widget>
    <x-filament::section>
        <div
            wire:ignore
            x-load
            x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-skeleton', 'saade/filament-skeleton') }}"
            x-data="filamentSkeleton({
                greeting: @js($this->getGreeting()),
            })"
            class="fi-sk"
        >
            <p class="fi-sk-greeting" x-text="message"></p>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
