<?php

namespace Saade\Fluppy\Uploads;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

/**
 * A file sent to Livewire's temporary disk in chunks.
 *
 * Modelled on the chunked uploads Livewire has merged for a later release:
 * the server plans the upload and signs what it planned, the browser posts
 * numbered chunks, and the last one to arrive is answered with the assembled
 * file. Chunks wait in `fluppy/chunks/{fingerprint}` inside Livewire's
 * temporary directory. The fingerprint is the same whenever the same file is
 * chosen again in the same session, which is what lets an upload resume.
 */
class ChunkedUpload
{
    /**
     * Also the most parts S3 accepts in a multipart upload.
     */
    public const MAX_CHUNKS = 10000;

    final public function __construct(
        public readonly string $fingerprint,
        public readonly int $totalChunks,
        public readonly int $chunkSize,
        public readonly int $size,
    ) {}

    public static function isEnabled(): bool
    {
        return (bool) config('fluppy.chunking.enabled', true);
    }

    /**
     * The size of a chunk in bytes: what was asked for, lowered to what PHP
     * accepts in one request, and raised for a file so large that it would
     * otherwise need too many chunks.
     */
    public static function chunkSizeFor(int $size, ?int $kilobytes = null): int
    {
        $chunkSize = max(1, $kilobytes ?? (int) config('fluppy.chunking.chunk_size', 900)) * 1024;

        $limits = array_filter([
            static::iniBytes('upload_max_filesize'),
            // The request carries the chunk and a few fields beside it.
            static::iniBytes('post_max_size') - 64 * 1024,
        ], fn (int $limit): bool => $limit > 0);

        $chunkSize = min([$chunkSize, ...$limits]);

        return max($chunkSize, (int) ceil($size / static::MAX_CHUNKS));
    }

    /**
     * The same for the same file chosen again, and impossible to work out
     * from another session.
     *
     * @param  array{name: string, size: int, type: string, lastModified: int}  $file
     */
    public static function fingerprint(array $file, int $chunkSize): string
    {
        return sha1(implode('|', [
            session()->getId(),
            $file['name'],
            $file['size'],
            $file['type'],
            $file['lastModified'],
            $chunkSize,
        ]));
    }

    /**
     * @param  array{name: string, size: int, type: string, lastModified: int}  $file
     * @return array<string, mixed>
     */
    public static function plan(array $file, ?int $chunkSizeInKilobytes = null): array
    {
        $chunkSize = static::chunkSizeFor($file['size'], $chunkSizeInKilobytes);

        $upload = new static(
            fingerprint: static::fingerprint($file, $chunkSize),
            totalChunks: max(1, (int) ceil($file['size'] / $chunkSize)),
            chunkSize: $chunkSize,
            size: $file['size'],
        );

        return [
            'strategy' => 'chunked',
            'url' => URL::temporarySignedRoute(
                'fluppy.chunks',
                now()->addMinutes((int) FileUploadConfiguration::maxUploadTime()),
                absolute: false,
            ),
            'capability' => $upload->capability(),
            'chunkSize' => $upload->chunkSize,
            'totalChunks' => $upload->totalChunks,
            'receivedChunks' => $upload->receivedChunks(),
            'completed' => $upload->completedReference(),
        ];
    }

    /**
     * Everything the chunk route needs to know about the upload, signed, so
     * that none of it is taken from what the browser sends.
     */
    public function capability(): string
    {
        return Signer::sign('chunks', implode('|', [
            $this->fingerprint,
            $this->totalChunks,
            $this->chunkSize,
            $this->size,
            sha1(session()->getId()),
        ]));
    }

    public static function fromCapability(mixed $capability): ?static
    {
        $payload = Signer::verify('chunks', $capability);

        if ($payload === null || ! preg_match('/^([a-f0-9]{40})\|(\d{1,5})\|(\d{1,10})\|(\d{1,15})\|([a-f0-9]{40})$/', $payload, $matches)) {
            return null;
        }

        [, $fingerprint, $totalChunks, $chunkSize, $size, $session] = $matches;

        if (! hash_equals(sha1(session()->getId()), $session)) {
            return null;
        }

        if ((int) $totalChunks < 1 || (int) $totalChunks > static::MAX_CHUNKS || (int) $chunkSize < 1) {
            return null;
        }

        return new static($fingerprint, (int) $totalChunks, (int) $chunkSize, (int) $size);
    }

    /**
     * Every chunk is full but the last, so a set of chunks that is complete
     * is also exactly as large as the file was said to be.
     */
    public function expectedChunkSize(int $index): int
    {
        return $index < $this->totalChunks - 1
            ? $this->chunkSize
            : $this->size - $this->chunkSize * ($this->totalChunks - 1);
    }

    public function directory(): string
    {
        return FileUploadConfiguration::path("fluppy/chunks/{$this->fingerprint}", false);
    }

    /**
     * @return array<int>
     */
    public function receivedChunks(): array
    {
        return collect($this->storage()->files($this->directory()))
            ->map(fn (string $path): string => basename($path))
            ->filter(fn (string $name): bool => (bool) preg_match('/^\d+\.part$/', $name))
            ->map(fn (string $name): int => (int) $name)
            ->sort()
            ->values()
            ->all();
    }

    public function hasAllChunks(): bool
    {
        return $this->receivedChunks() === range(0, $this->totalChunks - 1);
    }

    public function storeChunk(int $index, UploadedFile $chunk): void
    {
        $this->storage()->putFileAs($this->directory(), $chunk, "{$index}.part");
    }

    /**
     * Once a file is assembled its chunks are gone, so a last chunk that is
     * sent again (its answer was lost, or the page was reloaded) has nothing
     * to assemble. This remembers the answer it should get.
     */
    public function completedReference(): ?string
    {
        $path = "{$this->directory()}.done";

        return $this->storage()->exists($path) ? $this->storage()->get($path) : null;
    }

    /**
     * Puts the chunks together, checks the file against Livewire's rules for
     * temporary uploads and stores it as Livewire stores its own.
     *
     * @return string A signed reference to the file, for the field to adopt.
     */
    public function assemble(string $name, ?string $type): string
    {
        $assembledPath = tempnam(sys_get_temp_dir(), 'fluppy');

        try {
            $assembled = fopen($assembledPath, 'wb');

            foreach ($this->receivedChunks() as $index) {
                $chunk = $this->storage()->readStream("{$this->directory()}/{$index}.part");

                // Clean-up or another request can remove a chunk meanwhile.
                abort_unless(is_resource($chunk), 422, 'The chunked upload is incomplete.');

                stream_copy_to_stream($chunk, $assembled);

                fclose($chunk);
            }

            fclose($assembled);

            $file = new UploadedFile($assembledPath, $name, $type ?: null, null, true);

            Validator::make(['file' => $file], ['file' => FileUploadConfiguration::rules()])->validate();

            $reference = static::referenceTo(static::storeTemporaryFile($file));

            $this->storage()->put("{$this->directory()}.done", $reference);
        } finally {
            @unlink($assembledPath);

            $this->storage()->deleteDirectory($this->directory());
        }

        return $reference;
    }

    public static function referenceTo(string $filename): string
    {
        return Signer::sign('file', $filename);
    }

    /**
     * The temporary upload a reference points to, when the reference is one
     * this application signed and the file is still there.
     */
    public static function fileFromReference(mixed $reference): ?TemporaryUploadedFile
    {
        $filename = Signer::verify('file', $reference);

        if ($filename === null || ! FileUploadConfiguration::storage()->exists(FileUploadConfiguration::path($filename, false))) {
            return null;
        }

        return TemporaryUploadedFile::createFromLivewire($filename);
    }

    /**
     * Stored the way Livewire 3 stores a temporary upload, with the original
     * name inside the file's name. Livewire 4 writes the details to a file
     * beside it instead, and still reads the name from here without one.
     */
    protected static function storeTemporaryFile(UploadedFile $file): string
    {
        $filename = TemporaryUploadedFile::generateHashNameWithOriginalNameEmbedded($file);

        $file->storeAs('/' . FileUploadConfiguration::path('/'), $filename, ['disk' => FileUploadConfiguration::disk()]);

        return $filename;
    }

    protected function storage(): Filesystem
    {
        return FileUploadConfiguration::storage();
    }

    protected static function iniBytes(string $option): int
    {
        $value = trim((string) ini_get($option));

        $bytes = (int) $value;

        return match (strtolower(substr($value, -1))) {
            'g' => $bytes * 1024 ** 3,
            'm' => $bytes * 1024 ** 2,
            'k' => $bytes * 1024,
            default => $bytes,
        };
    }
}
