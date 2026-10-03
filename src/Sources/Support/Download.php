<?php

namespace Saade\Fluppy\Sources\Support;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\SourceException;

/**
 * A request whose answer is a file, or a part of one.
 *
 * It is never sent with Guzzle's `stream` option. That option hands the
 * request to PHP's own HTTP wrapper instead of cURL, which ignores every
 * cURL option (the address a connection is pinned to among them, silently,
 * or with an exception from Guzzle 8) and waits out a timeout on a machine
 * whose IPv6 does not work. The answer is written to a sink as it arrives,
 * which stops it at a limit.
 */
class Download
{
    /**
     * @param  int | null  $limit  The most bytes to take.
     * @param  callable(array<string, mixed>): Response  $send  Sends the request, with the options it is given added to its own.
     * @param  bool  $isPart  Whether a part of a file was asked for, whose size is then known: more than that is the source not doing as asked, not a file too large.
     *
     * @throws SourceException
     */
    public static function upTo(?int $limit, callable $send, bool $isPart = false): Response
    {
        $sink = new LimitedSink($limit);

        try {
            // The bytes are wanted as the source keeps them. Left to itself
            // the client asks for a compressed answer and unpacks it, and
            // the part of a compressed answer is not that part of the file.
            $response = $send(['sink' => $sink, 'decode_content' => false]);
        } catch (ConnectionException | RequestException) {
            $response = null;
        }

        // Asked whatever came of the request: a client may hand back what
        // arrived of an answer that was cut short as if it were whole.
        if ($sink->isOverLimit()) {
            throw $isPart ? SourceException::unreachable() : SourceException::tooLarge((int) $limit);
        }

        return $response ?? throw SourceException::unreachable();
    }

    public static function bodyOf(Response $response): StreamInterface
    {
        $body = $response->toPsrResponse()->getBody();

        if ($body->isSeekable()) {
            $body->rewind();
        }

        return $body;
    }
}
