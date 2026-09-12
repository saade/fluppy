<?php

namespace Saade\Fluppy\Forms\Components;

use Filament\Forms\Components\FileUpload;
use Filament\Support\Components\Attributes\ExposedLivewireMethod;
use Livewire\Attributes\Renderless;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class FluppyField extends FileUpload
{
    /**
     * `FileUpload` renders itself from PHP. Having a view makes Filament
     * render that view in its place, so everything else is inherited.
     */
    protected string $view = 'fluppy::field';

    /**
     * `FileUpload` describes stored files only, so a file that was uploaded
     * but not saved yet disappears from a field that is drawn again (hidden
     * and shown, moved in a repeater) while staying in the form's state.
     *
     * @return array<string, array{name: string, size: int, type: ?string, url: ?string} | null> | null
     */
    #[ExposedLivewireMethod]
    #[Renderless]
    public function getUploadedFiles(): ?array
    {
        $files = parent::getUploadedFiles();

        foreach ($this->getRawState() ?? [] as $fileKey => $file) {
            if (! $file instanceof TemporaryUploadedFile) {
                continue;
            }

            $files[$fileKey] = [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'type' => $file->getMimeType(),
                'url' => $file->isPreviewable() ? $file->temporaryUrl() : null,
            ];
        }

        return $files;
    }
}
