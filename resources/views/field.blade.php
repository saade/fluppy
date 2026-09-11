<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    @php
        $isDisabled = $isDisabled();
        $step = $getStep();
    @endphp

    <div
        wire:ignore
        wire:key="{{ $getLivewireKey() }}.{{ md5(serialize([$isDisabled, $step])) }}"
        x-load
        x-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('fluppy', 'saade/fluppy') }}"
        x-data="fluppy({
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$getStatePath()}')") }},
            step: @js($step),
        })"
        class="fi-fluppy"
    >
        <x-filament::button color="gray" :disabled="$isDisabled" x-on:click="decrement()">
            −
        </x-filament::button>

        <span class="fi-fluppy-value" x-text="state ?? 0"></span>

        <x-filament::button color="gray" :disabled="$isDisabled" x-on:click="increment()">
            +
        </x-filament::button>
    </div>
</x-dynamic-component>
