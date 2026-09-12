@php
    use Filament\Support\Facades\FilamentAsset;

    $key = $getKey();
    $statePath = $getStatePath();
    $isDisabled = $isDisabled();
    $isMultiple = $isMultiple();
    $maxSize = $getMaxSize();
    $minSize = $getMinSize();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div
        wire:ignore
        wire:key="{{ $getLivewireKey() }}.{{ md5(serialize([$isDisabled, $isMultiple])) }}"
        x-load
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('fluppy', 'saade/fluppy') }}"
        x-data="fluppy({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            cancelUploadUsing: (fileKey) => {
                $wire.cancelUpload(`{{ $statePath }}.${fileKey}`)
            },
            getUploadedFilesUsing: async () => {
                return await $wire.callSchemaComponentMethod(@js($key), 'getUploadedFiles')
            },
            isDeletable: @js($isDeletable()),
            isDisabled: @js($isDisabled),
            isMultiple: @js($isMultiple),
            maxFiles: @js($getMaxFiles()),
            maxParallelUploads: @js($getMaxParallelUploads()),
            maxSize: @js($maxSize ? $maxSize * 1024 : null),
            minSize: @js($minSize ? $minSize * 1024 : null),
            removeUploadedFileUsing: async (fileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'removeUploadedFile', { fileKey })
            },
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            uploadingMessage: @js($getUploadingMessage()),
            uploadUsing: (fileKey, file, success, error, progress) => {
                $wire.upload(
                    `{{ $statePath }}.${fileKey}`,
                    file,
                    success,
                    error,
                    (progressEvent) => progress(progressEvent.detail.progress),
                )
            },
        })"
        class="fi-fluppy"
    >
        <div x-ref="dashboard"></div>
    </div>
</x-dynamic-component>
