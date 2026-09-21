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
use Saade\Fluppy\Uploads\S3Copy;
use Saade\Fluppy\Uploads\S3MultipartUpload;
use Throwable;

class FluppyField extends FileUpload
{
    /**
     * `FileUpload` renders itself from PHP. Having a view makes Filament
     * render that view in its place, so everything else is inherited.
     */
    protected string $view = 'fluppy::field';

    protected bool | Closure | null $isChunked = null;

    protected int | Closure | null $chunkSize = null;

    protected bool | Closure $hasCamera = false;

    protected bool | Closure $hasMicrophone = false;

    protected bool | Closure $hasScreenCapture = false;

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

    /**
     * Lets a picture or a video be taken with the device's camera.
     */
    public function camera(bool | Closure $condition = true): static
    {
        $this->hasCamera = $condition;

        return $this;
    }

    /**
     * Lets audio be recorded with the device's microphone.
     */
    public function microphone(bool | Closure $condition = true): static
    {
        $this->hasMicrophone = $condition;

        return $this;
    }

    /**
     * Lets the screen, a window or a browser tab be recorded.
     */
    public function screenCapture(bool | Closure $condition = true): static
    {
        $this->hasScreenCapture = $condition;

        return $this;
    }

    /**
     * @return array<string> The places, other than the device's files, a file can come from.
     */
    public function getSources(): array
    {
        return array_keys(array_filter([
            'camera' => $this->evaluate($this->hasCamera),
            'microphone' => $this->evaluate($this->hasMicrophone),
            'screenCapture' => $this->evaluate($this->hasScreenCapture),
        ]));
    }

    /**
     * What Uppy's image editor can take from the options of Filament's:
     * the shapes an image may be cropped to, as width divided by height.
     * Null when the field has no image editor.
     *
     * @return array{aspectRatios: array<float>, fixedAspectRatio: ?float} | null
     */
    public function getImageEditorOptions(): ?array
    {
        if (! $this->hasImageEditor()) {
            return null;
        }

        $toFloat = function (?string $ratio): ?float {
            if (blank($ratio) || ! preg_match('/^(\d+(?:\.\d+)?)\s*[:\/]\s*(\d+(?:\.\d+)?)$/', $ratio, $sides) || (float) $sides[2] === 0.0) {
                return null;
            }

            return (float) $sides[1] / (float) $sides[2];
        };

        return [
            'aspectRatios' => array_values(array_filter(
                array_map(fn (mixed $ratio): ?float => is_numeric($ratio) ? (float) $ratio : null, $this->getImageEditorAspectRatioOptionsForJs()),
            )),
            'fixedAspectRatio' => $toFloat($this->getAutomaticallyCropImagesAspectRatio()),
        ];
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
            // The name ends up inside the name of the temporary file.
            'name' => is_string($file['name'] ?? null) ? mb_substr(basename($file['name']), 0, 255) : '',
            'size' => max(0, (int) ($file['size'] ?? 0)),
            'type' => is_string($file['type'] ?? null) ? $file['type'] : '',
            'lastModified' => (int) ($file['lastModified'] ?? 0),
        ];

        if ($message = $this->getUploadRejectionMessage($file['size'])) {
            return ['strategy' => 'reject', 'message' => $message];
        }

        if (! $this->isChunked()) {
            return ['strategy' => 'livewire'];
        }

        if (FileUploadConfiguration::isUsingS3()) {
            return $file['size'] > S3MultipartUpload::partSizeFor($file['size'])
                ? app(S3MultipartUpload::class)->plan($file)
                : ['strategy' => 'livewire'];
        }

        return $file['size'] > ChunkedUpload::chunkSizeFor($file['size'], $this->getChunkSize())
            ? ChunkedUpload::plan($file, $this->getChunkSize())
            : ['strategy' => 'livewire'];
    }

    /**
     * @param  array<mixed>  $partNumbers
     * @return array<int, string> Where to send each part, by part number.
     */
    #[ExposedLivewireMethod]
    #[Renderless]
    public function signUploadParts(string $capability, array $partNumbers): array
    {
        if ($this->isDisabled()) {
            return [];
        }

        return app(S3MultipartUpload::class)->signParts($capability, $partNumbers) ?? [];
    }

    /**
     * @return string | null A reference to the finished file, to adopt.
     */
    #[ExposedLivewireMethod]
    #[Renderless]
    public function completeMultipartUpload(string $capability): ?string
    {
        if ($this->isDisabled()) {
            return null;
        }

        return app(S3MultipartUpload::class)->complete($capability);
    }

    #[ExposedLivewireMethod]
    #[Renderless]
    public function abortMultipartUpload(string $capability): void
    {
        app(S3MultipartUpload::class)->abort($capability);
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
     * `FileUpload` saves a file by reading it from the temporary disk and
     * writing it to the final one. When both are in S3 the file is copied
     * there instead, and only if that fails is it saved the usual way.
     */
    public function saveUploadedFile(TemporaryUploadedFile $file): ?string
    {
        $copy = app(S3Copy::class);

        if (! $copy->isPossible($this->getDiskName()) || ! rescue(fn (): bool => $file->exists(), false, report: false)) {
            return parent::saveUploadedFile($file);
        }

        $path = trim($this->getDirectory() . '/' . $this->getUploadedFileNameForStorage($file), '/');

        try {
            $copy->copy($file, $this->getDiskName(), $path);
        } catch (Throwable $exception) {
            report($exception);

            return parent::saveUploadedFile($file);
        }

        if ($this->getVisibility() === 'public') {
            rescue(fn () => $this->getDisk()->setVisibility($path, 'public'), report: false);
        }

        return $path;
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
