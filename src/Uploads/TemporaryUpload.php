<?php

namespace Saade\Fluppy\Uploads;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

/**
 * A file that reached the server some other way than through Livewire's own
 * upload (put together from chunks, fetched from a remote source, sent
 * straight to the bucket), made into what Livewire would have made of it.
 */
class TemporaryUpload
{
    /**
     * @return string A signed reference to the file, for a field to adopt.
     */
    public static function store(string $path, string $name, ?string $type): string
    {
        $file = new UploadedFile($path, $name, $type ?: null, null, true);

        Validator::make(['file' => $file], ['file' => FileUploadConfiguration::rules()])->validate();

        // Stored the way Livewire 3 stores a temporary upload, with the
        // original name inside the file's name. Livewire 4 writes the
        // details to a file beside it instead, and still reads the name
        // from here without one.
        $filename = TemporaryUploadedFile::generateHashNameWithOriginalNameEmbedded($file);

        // Without the root an S3 disk may have: the disk adds its own.
        FileUploadConfiguration::storage()->putFileAs(FileUploadConfiguration::path('', false), $file, $filename);

        return static::referenceTo($filename);
    }

    public static function referenceTo(string $filename): string
    {
        return Signer::sign('file', $filename);
    }

    /**
     * The temporary upload a reference points to, when the reference is one
     * this application signed and the file is still there.
     */
    public static function fromReference(mixed $reference): ?TemporaryUploadedFile
    {
        $filename = Signer::verify('file', $reference);

        if ($filename === null || ! FileUploadConfiguration::storage()->exists(FileUploadConfiguration::path($filename, false))) {
            return null;
        }

        return TemporaryUploadedFile::createFromLivewire($filename);
    }
}
