<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\Response;
use Psr\Http\Message\StreamInterface;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\GuardedHttp;

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
        $response = $this->http->probe($url, ['Range' => 'bytes=0-0']);

        if (! in_array($response->status(), [200, 206], true)) {
            throw SourceException::failed($response->status());
        }

        $acceptsRanges = $response->status() === 206;

        return new RemoteFile(
            identity: $url,
            name: $this->name($response, $url),
            size: $this->size($response, $acceptsRanges),
            type: $this->type($response),
            acceptsRanges: $acceptsRanges,
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

    // Whatever server the link leads to wrote this header: only what has
    // the shape of a type is taken from it.
    protected function type(Response $response): ?string
    {
        $type = strtolower(trim(explode(';', (string) $response->header('Content-Type'))[0]));

        return preg_match('#^[a-z0-9][a-z0-9.+_-]{0,99}/[a-z0-9][a-z0-9.+_-]{0,99}$#', $type) ? $type : null;
    }

    protected function size(Response $response, bool $acceptsRanges): ?int
    {
        if ($acceptsRanges) {
            return preg_match('/\/(\d+)\s*$/', (string) $response->header('Content-Range'), $total) ? (int) $total[1] : null;
        }

        return is_numeric($length = $response->header('Content-Length')) ? (int) $length : null;
    }

    protected function name(Response $response, string $url): string
    {
        $disposition = (string) $response->header('Content-Disposition');

        if (preg_match("/filename\\*=UTF-8''([^;]+)/i", $disposition, $name)) {
            $name = rawurldecode($name[1]);
        } elseif (preg_match('/filename="?([^";]+)"?/i', $disposition, $name)) {
            $name = $name[1];
        } else {
            $name = rawurldecode(basename((string) parse_url($url, PHP_URL_PATH)));
        }

        return mb_substr(basename(str_replace('\\', '/', $name)), 0, 255) ?: 'file';
    }
}
