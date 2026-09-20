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
            abortMultipartUploadUsing: async (capability) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'abortMultipartUpload', { capability })
            },
            acceptedFileTypes: @js($getAcceptedFileTypes()),
            adoptUploadUsing: async (fileKey, reference) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'adoptUpload', { fileKey, reference })
            },
            cancelUploadUsing: (fileKey) => {
                $wire.cancelUpload(`{{ $statePath }}.${fileKey}`)
            },
            completeMultipartUploadUsing: async (capability) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'completeMultipartUpload', { capability })
            },
            csrfToken: @js(csrf_token()),
            deleteUploadedFileUsing: async (fileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'deleteUploadedFile', { fileKey })
            },
            getUploadedFilesUsing: async () => {
                return await $wire.callSchemaComponentMethod(@js($key), 'getUploadedFiles')
            },
            isChunked: @js($isChunked()),
            isDeletable: @js($isDeletable()),
            isDisabled: @js($isDisabled),
            isMultiple: @js($isMultiple),
            isReorderable: @js($isReorderable),
            locale: @js(app()->getLocale()),
            maxFiles: @js($getMaxFiles()),
            maxParallelUploads: @js($getMaxParallelUploads()),
            maxSize: @js($maxSize ? $maxSize * 1024 : null),
            minSize: @js($minSize ? $minSize * 1024 : null),
            planUploadUsing: async (file) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'planUpload', { file })
            },
            removeUploadedFileUsing: async (fileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'removeUploadedFile', { fileKey })
            },
            reorderUploadedFilesUsing: async (fileKeys) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'reorderUploadedFiles', { fileKeys })
            },
            signUploadPartsUsing: async (capability, partNumbers) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'signUploadParts', { capability, partNumbers })
            },
            sources: @js($getSources()),
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
