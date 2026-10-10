<?php

namespace Saade\Fluppy\Sources;

/**
 * A listable source that can be asked for what is called something, in the
 * folders below the ones it has listed as well.
 */
interface SearchableSource extends ListableSource
{
    /**
     * @param  string | null  $path  Null to search everything. Otherwise the id of the listed folder to search in.
     *
     * @throws SourceException
     */
    public function search(string $term, ?string $path = null): Listing;
}
