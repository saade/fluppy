<?php

namespace Saade\Fluppy\Sources\Support;

use GuzzleHttp\Exception\TransferException;
use GuzzleHttp\Psr7\UriResolver;
use GuzzleHttp\Psr7\Utils;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use LogicException;
use Psr\Http\Message\ResponseInterface;
use RuntimeException;
use Saade\Fluppy\Sources\SourceException;

/**
 * Fetches an address that `UrlGuard` has to allow first, in a way that keeps
 * what the guard decided true: the connection goes to the very address that
 * was checked, and a redirect is another address to check, not something to
 * follow blindly.
 */
class GuardedHttp
{
    protected const MAX_REDIRECTS = 5;

    public function __construct(
        protected UrlGuard $guard,
    ) {}

    /**
     * What a server answers before it sends a file: its status and its
     * headers. The transfer is given up as soon as those are in, so that a
     * server asked about a file does not get to send the whole of it.
     *
     * @param  array<string, string>  $headers
     *
     * @throws SourceException
     */
    public function probe(string $url, array $headers = []): Response
    {
        return $this->follow($url, function (PendingRequest $request, string $url): Response {
            $answer = null;

            try {
                $response = $request
                    ->withOptions(['on_headers' => function (ResponseInterface $response) use (&$answer): void {
                        $answer = $response;

                        throw new RuntimeException('The headers are all that was wanted.');
                    }])
                    ->get($url);
            } catch (ConnectionException | RequestException | TransferException) {
                if ($answer === null) {
                    throw SourceException::unreachable();
                }
            }

            // No headers were handed over when the answer is a faked one,
            // which comes whole.
            return $answer ? new Response($answer->withBody(Utils::streamFor(''))) : $response;
        }, $headers);
    }

    /**
     * @param  array<string, string>  $headers
     * @param  int | null  $limit  The most bytes to take.
     * @param  bool  $isPart  Whether the headers ask for a part of the file.
     *
     * @throws SourceException
     */
    public function download(string $url, array $headers = [], ?int $limit = null, bool $isPart = false): Response
    {
        return $this->follow($url, fn (PendingRequest $request, string $url): Response => Download::upTo(
            $limit,
            fn (array $options): Response => $request->withOptions($options)->get($url),
            $isPart,
        ), $headers);
    }

    /**
     * @param  callable(PendingRequest, string): Response  $send
     * @param  array<string, string>  $headers
     *
     * @throws SourceException
     */
    protected function follow(string $url, callable $send, array $headers = []): Response
    {
        // The address a connection is pinned to is a cURL option, which
        // PHP's own HTTP wrapper, Guzzle's other way out, does not have.
        if (! extension_loaded('curl')) {
            throw new LogicException('Fetching a file from a link needs the cURL extension of PHP.');
        }

        for ($redirects = 0; $redirects <= static::MAX_REDIRECTS; $redirects++) {
            $checked = $this->guard->check($url);

            $response = $send(
                Http::withHeaders($headers)
                    ->withOptions([
                        'allow_redirects' => false,
                        'curl' => [
                            // The name was looked up once, by the guard. The
                            // connection is made to what it found, whatever
                            // the name answers by now.
                            CURLOPT_RESOLVE => [sprintf(
                                '%s:%d:%s',
                                $checked['host'],
                                $checked['port'],
                                str_contains($checked['address'], ':') ? "[{$checked['address']}]" : $checked['address'],
                            )],
                        ],
                    ])
                    ->connectTimeout(5)
                    ->timeout((int) config('fluppy.remote.timeout', 60)),
                $url,
            );

            if (! in_array($response->status(), [301, 302, 303, 307, 308], true) || blank($response->header('Location'))) {
                return $response;
            }

            $url = (string) UriResolver::resolve(Utils::uriFor($url), Utils::uriFor($response->header('Location')));
        }

        throw SourceException::unreachable();
    }
}
