<?php

namespace Saade\Fluppy\Sources;

interface ListableSource extends Source
{
    /**
     * @param  string | null  $path  Null for the top folder. Otherwise the id of a listed folder, or the `nextPath` of a listing.
     *
     * @throws SourceException
     */
    public function list(?string $path = null): Listing;
}
