<?php

namespace Saade\Fluppy\Sources;

use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\GuardedHttp;
use Saade\Fluppy\Sources\Support\ProbedFile;

/**
 * A file at a link the person gives. Every request goes through the guard:
 * the link is theirs to choose, and so is wherever it redirects to.
 */
class UrlSource implements Source
{
    public function __construct(
        protected GuardedHttp $http,
    ) {}

    public function getId(): string
    {
        return 'url';
    }

    public function getLabel(): string
    {
        return __('fluppy::fluppy.sources.url');
    }

    public function getClientOptions(): array
    {
        return [];
    }

    public function describe(array $reference): RemoteFile
    {
        $url = $this->url($reference);

        // One byte is asked for. A server that takes ranges says so in its
        // answer, with the size of the whole file; one that does not would
        // send the file, which is not waited for.
        return ProbedFile::describe(
            $this->http->probe($url, ProbedFile::FIRST_BYTE),
            identity: $url,
            name: rawurldecode(basename((string) parse_url($url, PHP_URL_PATH))),
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null, ?int $limit = null): StreamInterface
    {
        $isRange = $from !== null && $to !== null;

        $response = $this->http->download(
            $this->url($reference),
            $isRange ? ['Range' => "bytes={$from}-{$to}"] : [],
            $isRange ? $to - $from + 1 : $limit,
            $isRange,
        );

        // A server that ignores the range sends the whole file with a 200,
        // which is not the part that was asked for.
        if ($response->status() !== ($isRange ? 206 : 200)) {
            throw SourceException::failed($response->status());
        }

        return Download::bodyOf($response);
    }

    /**
     * @param  array<string, mixed>  $reference
     */
    protected function url(array $reference): string
    {
        $url = $reference['url'] ?? null;

        if (! is_string($url) || strlen($url) > 2048) {
            throw SourceException::notAllowed();
        }

        return $url;
    }
}
