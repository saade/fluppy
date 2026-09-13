@php
    use Filament\Support\Facades\FilamentAsset;

    $key = $getKey();
    $statePath = $getStatePath();
    $isDisabled = $isDisabled();
    $isMultiple = $isMultiple();
    $isReorderable = $isReorderable();
    $maxSize = $getMaxSize();
    $minSize = $getMinSize();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div
        wire:ignore
        wire:key="{{ $getLivewireKey() }}.{{ md5(serialize([$isDisabled, $isMultiple, $isReorderable])) }}"
        x-load
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('fluppy', 'saade/fluppy') }}"
        x-data="fluppy({
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            cancelUploadUsing: (fileKey) => {
                $wire.cancelUpload(`{{ $statePath }}.${fileKey}`)
            },
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'deleteUploadedFile', { fileKey })
            },
            getUploadedFilesUsing: async () => {
                return await $wire.callSchemaComponentMethod(@js($key), 'getUploadedFiles')
            },
            isDeletable: @js($isDeletable()),
            isDisabled: @js($isDisabled),
            isMultiple: @js($isMultiple),
            isReorderable: @js($isReorderable),
            locale: @js(app()->getLocale()),
            maxFiles: @js($getMaxFiles()),
            maxParallelUploads: @js($getMaxParallelUploads()),
            maxSize: @js($maxSize ? $maxSize * 1024 : null),
            minSize: @js($minSize ? $minSize * 1024 : null),
            removeUploadedFileUsing: async (fileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'removeUploadedFile', { fileKey })
            },
            reorderUploadedFilesUsing: async (fileKeys) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'reorderUploadedFiles', { fileKeys })
            },
            state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
            uploadFailedMessage: @js(__('fluppy::fluppy.upload_failed')),
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
        @class([
            'fi-fluppy',
            'fi-fluppy-reorderable' => $isReorderable && ! $isDisabled,
        ])
    >
        <div x-ref="dashboard"></div>
    </div>
</x-dynamic-component>
