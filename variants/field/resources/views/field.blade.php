<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    @php
        $isDisabled = $isDisabled();
        $step = $getStep();
    @endphp

    <div
        wire:ignore
        wire:key="{{ $getLivewireKey() }}.{{ md5(serialize([$isDisabled, $step])) }}"
        x-load
        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('filament-skeleton', 'saade/filament-skeleton') }}"
        x-data="filamentSkeleton({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$getStatePath()}')") }},
            step: @js($step),
        })"
        class="fi-sk"
    >
        <x-filament::button color="gray" :disabled="$isDisabled" x-on:click="decrement()">
            −
        </x-filament::button>

        <span class="fi-sk-value" x-text="state ?? 0"></span>

        <x-filament::button color="gray" :disabled="$isDisabled" x-on:click="increment()">
            +
        </x-filament::button>
    </div>
</x-dynamic-component>
