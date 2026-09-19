<?php

namespace Saade\Fluppy\Uploads;

use RuntimeException;

/**
 * Signs what the server hands the browser to send back later, so it cannot
 * be altered or made up. Livewire signs its upload references the same way
 * from version 4, and not at all on version 3, so the package has its own.
 */
class Signer
{
    public static function sign(string $purpose, string $payload): string
    {
        return base64_encode($payload) . '.' . static::signature($purpose, $payload);
    }

    public static function verify(string $purpose, mixed $signed): ?string
    {
        if (! is_string($signed) || ! str_contains($signed, '.')) {
            return null;
        }

        [$encoded, $signature] = explode('.', $signed, 2);

        $payload = base64_decode($encoded, true);

        if ($payload === false || ! hash_equals(static::signature($purpose, $payload), $signature)) {
            return null;
        }

        return $payload;
    }

    protected static function signature(string $purpose, string $payload): string
    {
        $key = (string) config('app.key');

        // Signed with an empty key, anything could be forged.
        throw_if($key === '', RuntimeException::class, 'The application has no key to sign uploads with.');

        return hash_hmac('sha256', "fluppy|{$purpose}|{$payload}", $key);
    }
}
