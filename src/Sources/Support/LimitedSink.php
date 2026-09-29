<?php

namespace Saade\Fluppy\Sources\Support;

use GuzzleHttp\Psr7\Utils;
use Psr\Http\Message\StreamInterface;

/**
 * Where a download is written as it arrives, and no further than a limit.
 * Past it the sink takes nothing more, which makes cURL give the transfer
 * up: what a source says of a file's size is not to be relied on, and often
 * it says nothing.
 *
 * It is a temporary stream, held in memory while it is small and on disk
 * once it is not.
 */
class LimitedSink implements StreamInterface
{
    protected StreamInterface $stream;

    protected int $written = 0;

    protected bool $isOverLimit = false;

    final public function __construct(
        protected ?int $limit,
    ) {
        $this->stream = Utils::streamFor(fopen('php://temp/maxmemory:2097152', 'w+b'));
    }

    public function isOverLimit(): bool
    {
        return $this->isOverLimit;
    }

    public function write($string): int
    {
        if ($this->limit !== null && $this->written + strlen($string) > $this->limit) {
            $this->isOverLimit = true;

            return 0;
        }

        $this->written += strlen($string);

        return $this->stream->write($string);
    }

    public function __toString(): string
    {
        return (string) $this->stream;
    }

    public function close(): void
    {
        $this->stream->close();
    }

    public function detach()
    {
        return $this->stream->detach();
    }

    public function getSize(): ?int
    {
        return $this->stream->getSize();
    }

    public function tell(): int
    {
        return $this->stream->tell();
    }

    public function eof(): bool
    {
        return $this->stream->eof();
    }

    public function isSeekable(): bool
    {
        return $this->stream->isSeekable();
    }

    public function seek($offset, $whence = SEEK_SET): void
    {
        $this->stream->seek($offset, $whence);
    }

    public function rewind(): void
    {
        $this->stream->rewind();
    }

    public function isWritable(): bool
    {
        return $this->stream->isWritable();
    }

    public function isReadable(): bool
    {
        return $this->stream->isReadable();
    }

    public function read($length): string
    {
        return $this->stream->read($length);
    }

    public function getContents(): string
    {
        return $this->stream->getContents();
    }

    public function getMetadata($key = null)
    {
        return $this->stream->getMetadata($key);
    }
}
