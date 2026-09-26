<?php

namespace Saade\Fluppy\Sources;

use Psr\Http\Message\StreamInterface;

/**
 * Somewhere other than the person's device that a file can come from: a
 * link, a cloud drive. The browser only says which file; the server fetches
 * it, a part at a time, into Livewire's temporary disk.
 *
 * `$reference` is what the source's plugin in the browser knows a file by
 * (a link, an id), and comes from the browser: a source checks it.
 */
interface Source
{
    public function getId(): string;

    public function getLabel(): string;

    /**
     * What the source's plugin in the browser needs to be set up with.
     * Nothing secret: it is sent to the page.
     *
     * @return array<string, mixed>
     */
    public function getClientOptions(): array;

    /**
     * @param  array<string, mixed>  $reference
     *
     * @throws SourceException When the file cannot be had, with a message for the person.
     */
    public function describe(array $reference): RemoteFile;

    /**
     * The bytes of the file, or of the range from `$from` to `$to` included
     * when both are given. Only asked for a range when `describe()` said the
     * file accepts them.
     *
     * @param  array<string, mixed>  $reference
     *
     * @throws SourceException
     */
    public function read(array $reference, ?int $from = null, ?int $to = null): StreamInterface;
}
