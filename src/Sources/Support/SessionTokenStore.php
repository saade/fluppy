<?php

namespace Saade\Fluppy\Sources\Support;

use Illuminate\Contracts\Encryption\DecryptException;

/**
 * Tokens kept in the session, encrypted with the application's key whatever
 * the session's driver does with what it stores. They are gone when the
 * person signs out of the application, and never reach the browser.
 */
class SessionTokenStore implements TokenStore
{
    public function get(string $source): ?Token
    {
        $sealed = session($this->key($source));

        if (! is_string($sealed)) {
            return null;
        }

        try {
            return Token::fromArray(decrypt($sealed));
        } catch (DecryptException) {
            return null;
        }
    }

    public function put(string $source, Token $token): void
    {
        session([$this->key($source) => encrypt($token->toArray())]);
    }

    public function forget(string $source): void
    {
        session()->forget($this->key($source));
    }

    protected function key(string $source): string
    {
        return "fluppy.sources.{$source}.token";
    }
}
