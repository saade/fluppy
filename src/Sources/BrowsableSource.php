<?php

namespace Saade\Fluppy\Sources;

/**
 * A source a person connects their account of, and then browses inside the
 * field: a cloud drive. Connecting is OAuth's authorization code flow, with
 * PKCE; what it yields is kept by the `TokenStore`.
 */
interface BrowsableSource extends Source
{
    public function getAuthorizationUrl(string $redirectUrl, string $state, string $codeChallenge): string;

    /**
     * Trades the code the provider sent the person back with for a token,
     * and keeps it.
     *
     * @throws SourceException
     */
    public function connect(string $code, string $redirectUrl, string $codeVerifier): void;

    /**
     * Ends the connection, at the provider too where it has a way to.
     */
    public function disconnect(): void;

    public function isConnected(): bool;

    /**
     * @param  string | null  $path  Null for the top folder. Otherwise the id of a listed folder, or the `nextPath` of a listing.
     *
     * @throws SourceException
     */
    public function list(?string $path = null): Listing;
}
