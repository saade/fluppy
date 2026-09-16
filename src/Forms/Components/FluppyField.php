<?php

namespace Saade\Fluppy\Forms\Components;

use Closure;
use Filament\Forms\Components\FileUpload;
use Filament\Support\Components\Attributes\ExposedLivewireMethod;
use Illuminate\Support\Number;
use Livewire\Attributes\Renderless;
use Livewire\Features\SupportFileUploads\FileUploadConfiguration;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Saade\Fluppy\Uploads\ChunkedUpload;

class FluppyField extends FileUpload
{
    /**
     * `FileUpload` renders itself from PHP. Having a view makes Filament
     * render that view in its place, so everything else is inherited.
     */
    protected string $view = 'fluppy::field';

    protected bool | Closure | null $isChunked = null;

    protected int | Closure | null $chunkSize = null;

    public function chunked(bool | Closure | null $condition = true): static
    {
        $this->isChunked = $condition;

        return $this;
    }

    /**
     * In kilobytes, as the other sizes of the field are.
     */
    public function chunkSize(int | Closure | null $size): static
    {
        $this->chunkSize = $size;

        return $this;
    }

    public function isChunked(): bool
    {
        return (bool) ($this->evaluate($this->isChunked) ?? ChunkedUpload::isEnabled());
    }

    public function getChunkSize(): ?int
    {
        return $this->evaluate($this->chunkSize);
    }

    /**
     * Decides how the browser should send a file, from what the browser says
     * about it, before any of it is sent. A file that could never be
     * accepted is turned away here with the reason.
     *
     * Passing this is not approval: the rules of the field run on the file
     * itself when the form is validated.
     *
     * @param  array<string, mixed>  $file
     * @return array<string, mixed>
     */
    #[ExposedLivewireMethod]
    #[Renderless]
    public function planUpload(array $file): array
    {
        $file = [
            'name' => is_string($file['name'] ?? null) ? $file['name'] : '',
            'size' => max(0, (int) ($file['size'] ?? 0)),
            'type' => is_string($file['type'] ?? null) ? $file['type'] : '',
            'lastModified' => (int) ($file['lastModified'] ?? 0),
        ];

        if ($message = $this->getUploadRejectionMessage($file['size'])) {
            return ['strategy' => 'reject', 'message' => $message];
        }

        // With S3 as Livewire's temporary disk the browser already sends the
        // file straight to the bucket.
        if (
            ! $this->isChunked() ||
            FileUploadConfiguration::isUsingS3() ||
            $file['size'] <= ChunkedUpload::chunkSizeFor($file['size'], $this->getChunkSize())
        ) {
            return ['strategy' => 'livewire'];
        }

        return ChunkedUpload::plan($file, $this->getChunkSize());
    }

    /**
     * Puts a file the chunk route assembled into the state, as a temporary
     * upload, the way Livewire does at the end of an upload of its own.
     */
    #[ExposedLivewireMethod]
    #[Renderless]
    public function adoptUpload(string $fileKey, string $reference): bool
    {
        if ($this->isDisabled()) {
            return false;
        }

        $file = ChunkedUpload::fileFromReference($reference);

        if (! $file) {
            return false;
        }

        $this->rawState([
            ...($this->getRawState() ?? []),
            $fileKey => $file,
        ]);

        $this->callAfterStateUpdated();

        return true;
    }

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

    protected function getUploadRejectionMessage(int $size): ?string
    {
        if ($this->isDisabled()) {
            return __('fluppy::fluppy.upload_failed');
        }

        $maxSizes = array_filter([
            $this->getMaxSize(),
            $this->getTemporaryUploadMaxSize(),
        ]);

        if ($maxSizes && $size > min($maxSizes) * 1024) {
            return __('fluppy::fluppy.file_too_large', ['max' => Number::fileSize(min($maxSizes) * 1024)]);
        }

        if (($minSize = $this->getMinSize()) && $size < $minSize * 1024) {
            return __('fluppy::fluppy.file_too_small', ['min' => Number::fileSize($minSize * 1024)]);
        }

        return null;
    }

    /**
     * The largest file Livewire's rules for temporary uploads allow, in
     * kilobytes, when they set a limit.
     */
    protected function getTemporaryUploadMaxSize(): ?int
    {
        foreach (FileUploadConfiguration::rules() as $rule) {
            if (is_string($rule) && preg_match('/^max:(\d+)$/', $rule, $matches)) {
                return (int) $matches[1];
            }
        }

        return null;
    }
}
