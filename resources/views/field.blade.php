@php
    use Filament\Support\Facades\FilamentAsset;

    $key = $getKey();
    $statePath = $getStatePath();
    $isDisabled = $isDisabled();
    $isDeletable = $isDeletable();
    $isModal = $isModal();
    $isMultiple = $isMultiple();
    $isReorderable = $isReorderable();
    $maxSize = $getMaxSize();
    $minSize = $getMinSize();
    $extensions = $isDisabled ? [] : $getExtensions();
    $extensionOptions = array_map(fn (array $extension): array => [
        'script' => $extension['script'],
        'options' => $extension['options'] ?? [],
    ], $extensions);
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div
        wire:ignore
        wire:key="{{ $getLivewireKey() }}.{{ md5(serialize([$isDisabled, $isModal, $isMultiple, $isReorderable])) }}"
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
            callMethodUsing: async (method, parameters = {}) => {
                return await $wire.callSchemaComponentMethod(@js($key), method, parameters)
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
            describeRemoteFileUsing: async (source, reference) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'describeRemoteFile', { source, reference })
            },
            disconnectRemoteSourceUsing: async (source) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'disconnectRemoteSource', { source })
            },
            downloadLabel: @js(__('fluppy::fluppy.download')),
            editLabel: @js(__('fluppy::fluppy.edit')),
            extensions: @js($extensionOptions),
            height: @js($getHeight()),
            imageEditor: @js($getImageEditorOptions()),
            isChunked: @js($isChunked()),
            isDownloadable: @js($isDownloadable()),
            isModal: @js($isModal),
            isDeletable: @js($isDeletable),
            isDisabled: @js($isDisabled),
            isMultiple: @js($isMultiple),
            isOpenable: @js($isOpenable()),
            isPreviewable: @js($isPreviewable()),
            isReorderable: @js($isReorderable),
            listRemoteFilesUsing: async (source, path) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'listRemoteFiles', { source, path })
            },
            locale: @js(app()->getLocale()),
            maxFiles: @js($getMaxFiles()),
            maxParallelUploads: @js($getMaxParallelUploads()),
            maxSize: @js($maxSize ? $maxSize * 1024 : null),
            minSize: @js($minSize ? $minSize * 1024 : null),
            placeUploadedFileUsing: async (fileKey, beforeFileKey) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'placeUploadedFile', { fileKey, beforeFileKey })
            },
            planRemoteUploadUsing: async (source, reference) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'planRemoteUpload', { source, reference })
            },
            planUploadUsing: async (file) => {
                return await $wire.callSchemaComponentMethod(@js($key), 'planUpload', { file })
            },
            remoteSources: @js($getRemoteSources()),
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
        @if ($isModal)
            <div class="fi-fluppy-summary">
                <x-filament::button
                    color="gray"
                    icon="heroicon-m-arrow-up-tray"
                    x-on:click="openModal()"
                >
                    {{ $isDisabled ? __('fluppy::fluppy.view_files') : __('fluppy::fluppy.choose_files') }}
                </x-filament::button>

                <ul x-cloak x-show="files.length" class="fi-fluppy-summary-files">
                    <template x-for="file in files" x-bind:key="file.id">
                        <li
                            x-bind:class="{ 'fi-fluppy-summary-file-failed': file.error }"
                            class="fi-fluppy-summary-file"
                        >
                            <span
                                x-text="file.name"
                                class="fi-fluppy-summary-file-name"
                            ></span>

                            <span
                                x-text="file.error ?? (file.isComplete ? file.size : `${file.percentage}%`)"
                                class="fi-fluppy-summary-file-status"
                            ></span>

                            @if ($isDeletable && ! $isDisabled)
                                <x-filament::icon-button
                                    color="gray"
                                    icon="heroicon-m-x-mark"
                                    size="sm"
                                    :label="__('fluppy::fluppy.remove')"
                                    x-on:click="removeFile(file.id)"
                                />
                            @endif
                        </li>
                    </template>
                </ul>
            </div>
        @else
            <div x-ref="dashboard"></div>
        @endif

        @foreach ($extensions as $extension)
            {{ $extension['view'] ?? null }}
        @endforeach
    </div>
</x-dynamic-component>
