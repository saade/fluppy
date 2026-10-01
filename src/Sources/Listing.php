<?php

namespace Saade\Fluppy\Sources;

class Listing
{
    /**
     * @param  array<ListedItem>  $items
     * @param  string | null  $nextPath  What to list next for the rest of the folder. Null when this was all of it.
     * @param  string | null  $account  Whose files these are, as the person would know the account: a name, an e-mail address.
     */
    public function __construct(
        public readonly array $items,
        public readonly ?string $nextPath = null,
        public readonly ?string $account = null,
    ) {}
}
