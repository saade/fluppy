<?php

namespace Saade\Fluppy\Sources;

use Closure;
use GuzzleHttp\Psr7\LimitStream;
use GuzzleHttp\Psr7\Utils;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use League\Flysystem\FileAttributes;
use League\Flysystem\StorageAttributes;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\FileType;
use Throwable;

use function Filament\Support\generate_icon_html;

/**
 * Which disk, which folder of it and which of its files, is the field's to
 * say: the field gives them to a copy of the source with `in()` before it
 * lists or describes anything. The route that fetches a file has no field,
 * so `describe()` puts the disk and the path in what `read()` is given,
 * where the browser cannot change them.
 */
class DiskSource implements SearchableSource
{
    protected const SEARCH_LIMIT = 200;

    protected ?string $disk = null;

    protected string $directory = '';

    /**
     * @var (Closure(string, bool): bool) | null
     */
    protected ?Closure $filter = null;

    public function getId(): string
    {
        return 'disk';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.disk');
    }

    public function getClientOptions(): array
    {
        return [
            'icon' => generate_icon_html('heroicon-o-archive-box')->toHtml(),
            'isSearchable' => true,
            'views' => [
                'grid' => __('fluppy::fluppy.sources.grid_view'),
                'list' => __('fluppy::fluppy.sources.list_view'),
            ],
        ];
    }

    /**
     * @param  (Closure(string, bool): bool) | null  $filter  Given the path of a file or a folder and whether it is a folder. What it turns away is neither listed nor fetched, and a folder it turns away is not opened.
     */
    public function in(string $disk, ?string $directory = null, ?Closure $filter = null): static
    {
        $source = clone $this;

        $source->disk = $disk;
        $source->directory = trim((string) $directory, '/');
        $source->filter = $filter;

        return $source;
    }

    public function list(?string $path = null): Listing
    {
        $disk = $this->getDisk();

        return new Listing(
            $this->items(collect($disk->getDriver()->listContents($this->path($path, isFolder: true), false)))
                ->sort(fn (StorageAttributes $first, StorageAttributes $second): int => ($first->isFile() <=> $second->isFile())
                    ?: strnatcasecmp(basename($first->path()), basename($second->path())))
                ->map(fn (StorageAttributes $item): ListedItem => $this->item($disk, $item))
                ->values()
                ->all(),
        );
    }

    public function search(string $term, ?string $path = null): Listing
    {
        $disk = $this->getDisk();
        $folder = $this->path($path, isFolder: true);
        $term = trim($term);

        if ($term === '') {
            return new Listing([]);
        }

        return new Listing(
            $this->items(collect($disk->getDriver()->listContents($folder, true)))
                ->filter(fn (StorageAttributes $item): bool => Str::contains(basename($item->path()), $term, ignoreCase: true))
                ->filter(fn (StorageAttributes $item): bool => $this->isReachable(dirname($item->path()), $folder))
                ->sortBy(fn (StorageAttributes $item): string => mb_strtolower($item->path()))
                ->take(static::SEARCH_LIMIT)
                ->map(fn (StorageAttributes $item): ListedItem => $this->item($disk, $item))
                ->values()
                ->all(),
        );
    }

    public function describe(array $reference): RemoteFile
    {
        $disk = $this->getDisk();
        $path = $this->path($reference['fileId'] ?? null);

        if ($path === $this->directory || ! $disk->fileExists($path) || ! $this->isListed($path, false)) {
            throw SourceException::notAllowed();
        }

        return new RemoteFile(
            identity: "{$this->disk}:{$path}@" . $disk->lastModified($path),
            name: basename($path),
            size: $disk->size($path),
            type: $disk->mimeType($path) ?: FileType::ofName($path),
            acceptsRanges: true,
            reference: ['disk' => $this->disk, 'path' => $path],
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $disk = Storage::disk($reference['disk']);
        $isRange = $from !== null && $to !== null;

        // S3 is asked for the range itself. A stream of the whole object
        // would be read from its first byte for every part of the file.
        if ($isRange && $disk instanceof AwsS3V3Adapter) {
            return Utils::streamFor($disk->getClient()->getObject([
                'Bucket' => $disk->getConfig()['bucket'],
                'Key' => $disk->path($reference['path']),
                'Range' => "bytes={$from}-{$to}",
            ])['Body']);
        }

        $stream = Utils::streamFor($disk->readStream($reference['path']));

        return $isRange ? new LimitStream($stream, $to - $from + 1, $from) : $stream;
    }

    protected function getDisk(): Filesystem
    {
        return $this->disk === null
            ? throw SourceException::notAllowed()
            : Storage::disk($this->disk);
    }

    /**
     * The path on the disk of what the browser named, which can only be
     * inside the folder the field chose, and in no folder the field's
     * filter turns away.
     */
    protected function path(?string $path, bool $isFolder = false): string
    {
        $path = trim(rawurldecode((string) $path), '/');

        if (str_contains($path, "\0") || array_intersect(explode('/', $path), ['.', '..'])) {
            throw SourceException::notAllowed();
        }

        $path = trim("{$this->directory}/{$path}", '/');

        if (! $this->isReachable($isFolder ? $path : dirname($path), $this->directory)) {
            throw SourceException::notAllowed();
        }

        return $path;
    }

    /**
     * Whether every folder from `$from` down to `$folder` is one that is
     * listed.
     */
    protected function isReachable(string $folder, string $from): bool
    {
        $folder = $folder === '.' ? '' : $folder;

        while ($folder !== $from && strlen($folder) > strlen($from)) {
            if (! $this->isListed($folder, true)) {
                return false;
            }

            $folder = dirname($folder) === '.' ? '' : dirname($folder);
        }

        return true;
    }

    protected function isListed(string $path, bool $isFolder): bool
    {
        return ! str_starts_with(basename($path), '.')
            && ($this->filter === null || ($this->filter)($path, $isFolder));
    }

    /**
     * @param  Collection<int, StorageAttributes>  $items
     * @return Collection<int, StorageAttributes>
     */
    protected function items(Collection $items): Collection
    {
        return $items->filter(fn (StorageAttributes $item): bool => $this->isListed($item->path(), $item->isDir()));
    }

    protected function item(Filesystem $disk, StorageAttributes $item): ListedItem
    {
        $type = $item->isFile() ? FileType::ofName($item->path()) : null;

        return new ListedItem(
            id: $this->id($item->path()),
            name: basename($item->path()),
            isFolder: $item->isDir(),
            size: $item instanceof FileAttributes ? $item->fileSize() : null,
            type: $type,
            modifiedAt: $item->lastModified() ? date(DATE_ATOM, $item->lastModified()) : null,
            thumbnail: str_starts_with((string) $type, 'image/') ? $this->getUrl($disk, $item->path()) : null,
        );
    }

    /**
     * What the browser knows a file or a folder by: its path below the
     * folder the field chose, written the way Uppy's file browser writes
     * the paths of what a search finds, so that the two are the same.
     */
    protected function id(string $path): string
    {
        $relative = $this->directory === '' ? $path : substr($path, strlen($this->directory) + 1);

        return strtr(rawurlencode("/{$relative}"), ['%21' => '!', '%2A' => '*', '%27' => "'", '%28' => '(', '%29' => ')']);
    }

    protected function getUrl(Filesystem $disk, string $path): ?string
    {
        try {
            return match (true) {
                $disk->providesTemporaryUrls() => $disk->temporaryUrl($path, now()->addMinutes(30)),
                (config("filesystems.disks.{$this->disk}.visibility") === 'public') => $disk->url($path),
                default => null,
            };
        } catch (Throwable) {
            return null;
        }
    }
}
