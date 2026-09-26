<?php

namespace Saade\Fluppy\Sources;

class RemoteFile
{
    /**
     * @param  string  $identity  What tells this file apart from every other of its source, and from an earlier version of itself where the source can tell.
     * @param  int | null  $size  In bytes. Null when the source does not say.
     * @param  bool  $acceptsRanges  Whether a part of the file can be asked for by itself.
     */
    public function __construct(
        public readonly string $identity,
        public readonly string $name,
        public readonly ?int $size = null,
        public readonly ?string $type = null,
        public readonly bool $acceptsRanges = false,
    ) {}
}
