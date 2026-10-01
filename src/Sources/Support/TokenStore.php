<?php

namespace Saade\Fluppy\Sources\Support;

/**
 * Where the tokens of the sources a person has connected are kept. The
 * package keeps them in the session. Bind another implementation to keep
 * them somewhere that outlives it, such as a column of the user's.
 */
interface TokenStore
{
    public function get(string $source): ?Token;

    public function put(string $source, Token $token): void;

    public function forget(string $source): void;
}
