<?php

namespace Saade\Fluppy\Sources;

use Illuminate\Http\Client\Response;
use Psr\Http\Message\StreamInterface;
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

        // One byte is asked for. A server that takes ranges answers with
        // that byte and the size of the whole file; one that does not
        // starts sending the file, which is left unread.
        $response = $this->http->get($url, ['Range' => 'bytes=0-0']);

        if (! in_array($response->status(), [200, 206], true)) {
            throw SourceException::failed($response->status());
        }

        $acceptsRanges = $response->status() === 206;

        return new RemoteFile(
            identity: $url,
            name: $this->name($response, $url),
            size: $this->size($response, $acceptsRanges),
            type: trim(explode(';', (string) $response->header('Content-Type'))[0]) ?: null,
            acceptsRanges: $acceptsRanges,
        );
    }

    public function read(array $reference, ?int $from = null, ?int $to = null): StreamInterface
    {
        $isRange = $from !== null && $to !== null;

        $response = $this->http->get($this->url($reference), $isRange ? ['Range' => "bytes={$from}-{$to}"] : []);

        // A server that ignores the range sends the whole file with a 200,
        // which is not the part that was asked for.
        if ($response->status() !== ($isRange ? 206 : 200)) {
            throw SourceException::failed($response->status());
        }

        return $response->toPsrResponse()->getBody();
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
