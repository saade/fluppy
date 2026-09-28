<?php

namespace Saade\Fluppy\Sources;

use RuntimeException;

/**
 * A file could not be had from its source. The message is shown to the
 * person, so it says what they can make sense of and nothing about the
 * inside of the application.
 */
class SourceException extends RuntimeException
{
    public static function notAllowed(): self
    {
        return new self(__('fluppy::fluppy.sources.not_allowed'));
    }

    public static function unreachable(): self
    {
        return new self(__('fluppy::fluppy.sources.unreachable'));
    }

    public static function expired(): self
    {
        return new self(__('fluppy::fluppy.sources.expired'));
    }

    public static function failed(int $status): self
    {
        return new self(__('fluppy::fluppy.sources.failed', ['status' => $status]));
    }
}
