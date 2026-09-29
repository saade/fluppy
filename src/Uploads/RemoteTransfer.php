<?php

namespace Saade\Fluppy\Uploads;

use GuzzleHttp\Psr7\StreamWrapper;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\URL;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Saade\Fluppy\Sources\RemoteFile;
use Saade\Fluppy\Sources\Source;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\SourceManager;

/**
 * A file the server fetches from a remote source into Livewire's temporary
 * disk, because the browser asked it to, a part at a time.
 *
 * It is planned once, by the field, which finds out what the file is and
 * whether it may come in. What it found is then sealed (encrypted with the
 * application's key) and handed to the browser, which sends it back with
 * each request for a part. So the route that fetches parts takes nothing
 * about the file from the browser that the browser could have changed, and
 * what a reference holds in secret (a token, a private link) stays unread.
 */
class RemoteTransfer
{
    /**
     * @param  array<string, mixed>  $reference  What the source knows the file by.
     * @param  int | null  $limit  The largest the file may be, in bytes.
     */
    final public function __construct(
        public readonly string $source,
        public readonly array $reference,
        public readonly string $identity,
        public readonly string $name,
        public readonly ?string $type,
        public readonly ?int $size,
        public readonly ?int $limit,
    ) {}

    public static function partSize(): int
    {
        return max(1, (int) config('fluppy.remote.part_size', 5120)) * 1024;
    }

    /**
     * @param  array<string, mixed>  $reference
     * @return array<string, mixed>
     */
    public static function plan(Source $source, array $reference, RemoteFile $file, ?int $limit, bool $inParts = true): array
    {
        $transfer = new static($source->getId(), $file->reference ?? $reference, $file->identity, $file->name, $file->type, $file->size, $limit);

        $plan = [
            'sealed' => $transfer->seal(),
            'url' => URL::temporarySignedRoute(
                'fluppy.remote',
                now()->addMinutes((int) FileUploadConfiguration::maxUploadTime()),
                absolute: false,
            ),
            'name' => $file->name,
            'size' => $file->size,
            'type' => $file->type,
        ];

        // A file of unknown size, or from somewhere that only sends files
        // whole, has no parts to ask for.
        if (! $inParts || $file->size === null || ! $file->acceptsRanges || $file->size <= static::partSize()) {
            return ['strategy' => 'remote', ...$plan];
        }

        return FileUploadConfiguration::isUsingS3()
            ? [...app(S3MultipartUpload::class)->plan($transfer->file()), ...$plan]
            : [...ChunkedUpload::planInChunksOf($transfer->file(), static::partSize()), ...$plan];
    }

    public function seal(): string
    {
        return encrypt([
            'source' => $this->source,
            'reference' => $this->reference,
            'identity' => $this->identity,
            'name' => $this->name,
            'type' => $this->type,
            'size' => $this->size,
            'limit' => $this->limit,
            'session' => sha1(session()->getId()),
        ]);
    }

    public static function unseal(mixed $sealed): ?static
    {
        try {
            $payload = is_string($sealed) ? decrypt($sealed) : null;
        } catch (DecryptException) {
            return null;
        }

        if (! is_array($payload) || ! hash_equals(sha1(session()->getId()), (string) ($payload['session'] ?? ''))) {
            return null;
        }

        return new static(
            $payload['source'],
            $payload['reference'],
            $payload['identity'],
            $payload['name'],
            $payload['type'],
            $payload['size'],
            $payload['limit'],
        );
    }

    /**
     * The file as a chunked or a multipart upload knows one. What tells it
     * apart from another is where it comes from, since nobody chose it from
     * a device.
     *
     * @return array{name: string, size: int, type: string, lastModified: int, origin: string}
     */
    public function file(): array
    {
        return [
            'name' => $this->name,
            'size' => (int) $this->size,
            'type' => (string) $this->type,
            'lastModified' => 0,
            'origin' => "{$this->source}|{$this->identity}",
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function fetchChunk(ChunkedUpload $upload, int $index): array
    {
        // The capability and the sealed file each came from the plan; this
        // checks they came from the same one.
        abort_unless($upload->fingerprint === ChunkedUpload::fingerprint($this->file(), $upload->chunkSize), 403, 'Invalid remote upload reference.');

        if ($reference = $upload->completedReference()) {
            return ['complete' => true, 'reference' => $reference];
        }

        abort_unless($index >= 0 && $index < $upload->totalChunks, 422, 'There is no such part.');

        [$from, $to] = $upload->rangeOfChunk($index);

        $stream = StreamWrapper::getResource($this->source()->read($this->reference, $from, $to));

        try {
            $isWhole = $upload->storeChunkFromStream($index, $stream);
        } finally {
            is_resource($stream) && fclose($stream);
        }

        if (! $isWhole) {
            throw SourceException::unreachable();
        }

        return $upload->answer($this->name, $this->type);
    }

    /**
     * @return array<string, mixed>
     */
    public function fetchPart(mixed $capability, int $partNumber): array
    {
        $isStored = app(S3MultipartUpload::class)->storePart(
            $capability,
            $partNumber,
            $this->file(),
            fn (int $from, int $to) => $this->source()->read($this->reference, $from, $to),
        );

        abort_unless($isStored, 403, 'Invalid remote upload reference.');

        return ['complete' => false, 'part' => $partNumber];
    }

    /**
     * @return array<string, mixed>
     */
    public function fetchWhole(): array
    {
        $stream = $this->source()->read($this->reference, limit: $this->limit);
        $path = tempnam(sys_get_temp_dir(), 'fluppy');
        $file = fopen($path, 'wb');

        try {
            $written = 0;

            while (! $stream->eof()) {
                $written += fwrite($file, $stream->read(1024 * 1024));

                // What a source says of a file's size is not to be relied
                // on, and often it says nothing.
                if ($this->limit !== null && $written > $this->limit) {
                    throw SourceException::tooLarge($this->limit);
                }
            }

            fclose($file);

            return ['complete' => true, 'reference' => TemporaryUpload::store($path, $this->name, $this->type), 'size' => $written];
        } finally {
            is_resource($file) && fclose($file);
            $stream->close();
            @unlink($path);
        }
    }

    protected function source(): Source
    {
        return app(SourceManager::class)->get($this->source) ?? throw SourceException::notAllowed();
    }
}
