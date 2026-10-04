<?php

namespace Saade\Fluppy\Sources\Support;

use Illuminate\Http\Client\Response;
use Saade\Fluppy\Sources\RemoteFile;
use Saade\Fluppy\Sources\SourceException;

/**
 * What a file at an address is, as told by the answer to a request for its
 * first byte: a server that takes ranges says so, with the size of the whole
 * file. Every header was written by whatever server the address leads to,
 * so each is only taken for what it has the shape of.
 */
class ProbedFile
{
    public const FIRST_BYTE = ['Range' => 'bytes=0-0'];

    /**
     * @param  string  $name  What to call the file when the server does not say.
     * @param  string | null  $type  What to take the file for when the server does not say.
     *
     * @throws SourceException
     */
    public static function describe(Response $response, string $identity, string $name, ?string $type = null): RemoteFile
    {
        if (! in_array($response->status(), [200, 206], true)) {
            throw SourceException::failed($response->status());
        }

        $acceptsRanges = $response->status() === 206;

        return new RemoteFile(
            identity: $identity,
            name: static::clean(static::nameIn($response) ?? $name),
            size: static::sizeIn($response, $acceptsRanges),
            type: static::typeIn((string) $response->header('Content-Type')) ?? static::typeIn((string) $type),
            acceptsRanges: $acceptsRanges,
        );
    }

    protected static function typeIn(string $header): ?string
    {
        $type = strtolower(trim(explode(';', $header)[0]));

        return preg_match('#^[a-z0-9][a-z0-9.+_-]{0,99}/[a-z0-9][a-z0-9.+_-]{0,99}$#', $type) ? $type : null;
    }

    protected static function sizeIn(Response $response, bool $acceptsRanges): ?int
    {
        if ($acceptsRanges) {
            return preg_match('/\/(\d+)\s*$/', (string) $response->header('Content-Range'), $total) ? (int) $total[1] : null;
        }

        return is_numeric($length = $response->header('Content-Length')) ? (int) $length : null;
    }

    protected static function nameIn(Response $response): ?string
    {
        $disposition = (string) $response->header('Content-Disposition');

        if (preg_match("/filename\\*=UTF-8''([^;]+)/i", $disposition, $name)) {
            return rawurldecode($name[1]);
        }

        return preg_match('/filename="?([^";]+)"?/i', $disposition, $name) ? $name[1] : null;
    }

    protected static function clean(string $name): string
    {
        return mb_substr(basename(str_replace('\\', '/', $name)), 0, 255) ?: 'file';
    }
}
