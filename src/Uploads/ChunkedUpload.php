<?php

namespace Saade\Fluppy\Uploads;

use DateTimeInterface;
use Illuminate\Contracts\Cache\Lock;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Throwable;

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
     * from another session. `origin` tells apart files that only a remote
     * source can tell apart: which source, and which file there.
     *
     * @param  array{name: string, size: int, type: string, lastModified: int, origin?: string}  $file
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
            $file['origin'] ?? '',
        ]));
    }

    /**
     * @param  array{name: string, size: int, type: string, lastModified: int}  $file
     * @return array<string, mixed>
     */
    public static function plan(array $file, ?int $chunkSizeInKilobytes = null): array
    {
        return static::planInChunksOf($file, static::chunkSizeFor($file['size'], $chunkSizeInKilobytes));
    }

    /**
     * @param  array{name: string, size: int, type: string, lastModified: int, origin?: string}  $file
     * @return array<string, mixed>
     */
    public static function planInChunksOf(array $file, int $chunkSize): array
    {
        $upload = static::for($file, $chunkSize);

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
     * @param  array{name: string, size: int, type: string, lastModified: int, origin?: string}  $file
     */
    public static function for(array $file, int $chunkSize): static
    {
        $chunkSize = max($chunkSize, (int) ceil($file['size'] / static::MAX_CHUNKS));

        return new static(
            fingerprint: static::fingerprint($file, $chunkSize),
            totalChunks: max(1, (int) ceil($file['size'] / $chunkSize)),
            chunkSize: $chunkSize,
            size: $file['size'],
        );
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

    /**
     * @return array{int, int} The first and the last byte of a chunk in the file.
     */
    public function rangeOfChunk(int $index): array
    {
        $from = $index * $this->chunkSize;

        return [$from, $from + $this->expectedChunkSize($index) - 1];
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

    public function storeChunk(int $index, UploadedFile $chunk): bool
    {
        $stream = fopen($chunk->getRealPath(), 'rb');

        try {
            return $this->storeChunkFromStream($index, $stream);
        } finally {
            fclose($stream);
        }
    }

    /**
     * Stores a chunk from wherever its bytes are being read, and keeps it
     * only if exactly as many arrived as the chunk was planned to have.
     *
     * @param  resource  $stream
     */
    public function storeChunkFromStream(int $index, $stream): bool
    {
        // Written under another name first. A chunk counts as received as
        // soon as its file is there, and chunks arrive side by side: one
        // still being written would be assembled as it is, short.
        $incoming = "{$this->directory()}/{$index}." . Str::random(16) . '.incoming';

        $this->storage()->writeStream($incoming, $stream);

        if ($this->storage()->size($incoming) !== $this->expectedChunkSize($index)) {
            $this->storage()->delete($incoming);

            return false;
        }

        $this->storage()->move($incoming, "{$this->directory()}/{$index}.part");

        return true;
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
     * What a request that brought a chunk is told: which chunks there are
     * now, or, once they are all there, where the assembled file is.
     *
     * @return array<string, mixed>
     */
    public function answer(string $name, ?string $type): array
    {
        if (count($received = $this->receivedChunks()) < $this->totalChunks) {
            return ['complete' => false, 'received' => $received];
        }

        // Two requests can each believe they brought the last chunk
        // (parallel chunks, a second tab). Only one may assemble: the other
        // would find the chunks half deleted.
        $lock = $this->lock();

        try {
            $lock?->block(15);
        } catch (LockTimeoutException) {
            return ['complete' => false, 'received' => $this->receivedChunks()];
        }

        try {
            if ($reference = $this->completedReference()) {
                return ['complete' => true, 'reference' => $reference];
            }

            abort_unless($this->hasAllChunks(), 422, 'The chunked upload is incomplete.');

            return ['complete' => true, 'reference' => $this->assemble($name, $type)];
        } finally {
            $lock?->release();
        }
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

            abort_unless(filesize($assembledPath) === $this->size, 422, 'The chunked upload is incomplete.');

            $reference = TemporaryUpload::store($assembledPath, $name, $type);

            $this->storage()->put("{$this->directory()}.done", $reference);
        } finally {
            @unlink($assembledPath);

            $this->storage()->deleteDirectory($this->directory());
        }

        return $reference;
    }

    /**
     * Removes the chunks of uploads that received nothing since the given
     * time, and the answers remembered for finished ones.
     *
     * @return int The number of unfinished uploads removed.
     */
    public static function prune(DateTimeInterface $before): int
    {
        $storage = FileUploadConfiguration::storage();
        $directory = FileUploadConfiguration::path('fluppy/chunks', false);
        $isOld = fn (string $file): bool => $storage->lastModified($file) < $before->getTimestamp();

        $abandoned = array_filter(
            $storage->directories($directory),
            fn (string $upload): bool => collect($storage->files($upload))->every($isOld),
        );

        array_map($storage->deleteDirectory(...), $abandoned);

        $storage->delete(array_filter($storage->files($directory), $isOld));

        return count($abandoned);
    }

    /**
     * Not every cache store has locks. Without one, the remembered answer
     * and the check for missing chunks are what is left.
     */
    protected function lock(): ?Lock
    {
        try {
            return Cache::lock("fluppy-assemble:{$this->fingerprint}", 60);
        } catch (Throwable) {
            return null;
        }
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
