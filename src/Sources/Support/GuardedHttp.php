<?php

namespace Saade\Fluppy\Sources\Support;

use GuzzleHttp\Psr7\UriResolver;
use GuzzleHttp\Psr7\Utils;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
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
     * The response is streamed: its body is read by whoever asked, as far
     * as they want it.
     *
     * @param  array<string, string>  $headers
     *
     * @throws SourceException
     */
    public function get(string $url, array $headers = []): Response
    {
        for ($redirects = 0; $redirects <= static::MAX_REDIRECTS; $redirects++) {
            $checked = $this->guard->check($url);

            try {
                $response = Http::withHeaders($headers)
                    ->withOptions([
                        'allow_redirects' => false,
                        'stream' => true,
                        'curl' => [
                            CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
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
                    ->timeout((int) config('fluppy.remote.timeout', 60))
                    ->get($url);
            } catch (ConnectionException) {
                throw SourceException::unreachable();
            }

            if (! in_array($response->status(), [301, 302, 303, 307, 308], true) || blank($response->header('Location'))) {
                return $response;
            }

            $url = (string) UriResolver::resolve(Utils::uriFor($url), Utils::uriFor($response->header('Location')));
        }

        throw SourceException::unreachable();
    }
}
