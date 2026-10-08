<?php

namespace Saade\Fluppy\Sources;

class ListedItem
{
    /**
     * @param  string  $id  For a file, what `describe()` and `read()` are given as `fileId`. For a folder, what `list()` is given to open it.
     * @param  int | null  $size  In bytes.
     * @param  string | null  $modifiedAt  An ISO 8601 date.
     * @param  string | null  $thumbnail  The address of a small picture of the item, which the browser loads itself: one that needs no token.
     */
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly bool $isFolder = false,
        public readonly ?int $size = null,
        public readonly ?string $type = null,
        public readonly ?string $modifiedAt = null,
        public readonly ?string $thumbnail = null,
    ) {}
}
