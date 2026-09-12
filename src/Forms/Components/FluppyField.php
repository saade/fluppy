<?php

namespace Saade\Fluppy\Forms\Components;

use Filament\Forms\Components\FileUpload;

class FluppyField extends FileUpload
{
    /**
     * `FileUpload` renders itself from PHP. Having a view makes Filament
     * render that view in its place, so everything else is inherited.
     */
    protected string $view = 'fluppy::field';
}
