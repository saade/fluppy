<?php

namespace Saade\Fluppy\Forms\Components;

use Filament\Forms\Components\FileUpload;
use Saade\Fluppy\Forms\Components\Concerns\InteractsWithUppy;

class FluppyField extends FileUpload
{
    use InteractsWithUppy;

    /**
     * `FileUpload` renders itself from PHP. Having a view makes Filament
     * render that view in its place, so everything else is inherited.
     */
    protected string $view = 'fluppy::field';
}
