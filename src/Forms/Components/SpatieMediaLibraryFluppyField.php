<?php

namespace Saade\Fluppy\Forms\Components;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Illuminate\Database\Eloquent\Model;
use League\Flysystem\UnableToCheckFileExistence;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Saade\Fluppy\Forms\Components\Concerns\InteractsWithUppy;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * The upload field of Filament's media library plugin, with Uppy as its
 * interface. Needs `filament/spatie-laravel-media-library-plugin`.
 */
class SpatieMediaLibraryFluppyField extends SpatieMediaLibraryFileUpload
{
    use InteractsWithUppy;

    protected string $view = 'fluppy::field';

    protected function setUp(): void
    {
        parent::setUp();

        // The plugin's field hands the media library the contents of the
        // file as a string, which for a large file is more memory than PHP
        // has. Here the library is pointed at the file on the temporary
        // disk and copies it from there as a stream.
        $this->saveUploadedFileUsing(static function (SpatieMediaLibraryFluppyField $component, TemporaryUploadedFile $file, ?Model $record): ?string {
            if (! $record instanceof HasMedia) {
                return $file;
            }

            try {
                if (! $file->exists()) {
                    return null;
                }
            } catch (UnableToCheckFileExistence) {
                return null;
            }

            $media = $record
                ->addMediaFromDisk(FileUploadConfiguration::path($file->getFilename(), false), FileUploadConfiguration::disk())
                ->addCustomHeaders([...['ContentType' => $file->getMimeType()], ...$component->getCustomHeaders()])
                ->usingFileName($component->getUploadedFileNameForStorage($file))
                ->usingName($component->getMediaName($file) ?? pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))
                ->storingConversionsOnDisk($component->getConversionsDisk() ?? '')
                ->withCustomProperties($component->getCustomProperties($file))
                ->withManipulations($component->getManipulations())
                ->withResponsiveImagesIf($component->hasResponsiveImages())
                ->withProperties($component->getProperties())
                ->toMediaCollection($component->getCollection() ?? 'default', $component->getDiskName());

            return $media->getAttributeValue('uuid');
        });

        $this->saveRelationshipsUsing(static function (SpatieMediaLibraryFluppyField $component): void {
            $component->deleteAbandonedFiles();
            $component->saveUploadedFiles();
            $component->saveMediaOrder();
        });
    }

    /**
     * The media library puts new media last. An edited image is new media,
     * so it would move to the end of a collection it was in the middle of.
     * The media is put in the order the field shows it in.
     */
    public function saveMediaOrder(): void
    {
        $uuids = array_values(array_filter($this->getRawState() ?? [], is_string(...)));

        if (count($uuids) < 2) {
            return;
        }

        $record = $this->getRecord();

        /** @var class-string<Media> $mediaClass */
        $mediaClass = ($record && method_exists($record, 'getMediaModel')) ? $record->getMediaModel() : config('media-library.media_model', Media::class);

        $ids = $mediaClass::query()->whereIn('uuid', $uuids)->pluck((new $mediaClass)->getKeyName(), 'uuid');

        $mediaClass::setNewOrder(array_values(array_filter(array_map(fn (string $uuid): mixed => $ids[$uuid] ?? null, $uuids))));
    }
}
