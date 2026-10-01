<?php

namespace Saade\Fluppy\Sources\Support;

class Token
{
    /**
     * @param  int | null  $expiresAt  A Unix time. Null for a token that does not expire.
     */
    final public function __construct(
        public readonly string $accessToken,
        public readonly ?string $refreshToken = null,
        public readonly ?int $expiresAt = null,
    ) {}

    // A minute early, so that a token is not sent in the second it runs out.
    public function hasExpired(): bool
    {
        return $this->expiresAt !== null && $this->expiresAt - 60 <= time();
    }

    /**
     * @return array{accessToken: string, refreshToken: ?string, expiresAt: ?int}
     */
    public function toArray(): array
    {
        return [
            'accessToken' => $this->accessToken,
            'refreshToken' => $this->refreshToken,
            'expiresAt' => $this->expiresAt,
        ];
    }

    public static function fromArray(mixed $token): ?static
    {
        if (! is_array($token) || ! is_string($token['accessToken'] ?? null) || $token['accessToken'] === '') {
            return null;
        }

        return new static(
            $token['accessToken'],
            is_string($token['refreshToken'] ?? null) ? $token['refreshToken'] : null,
            is_int($token['expiresAt'] ?? null) ? $token['expiresAt'] : null,
        );
    }
}
