<?php

use GuzzleHttp\Psr7\Response as PsrResponse;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Psr\Http\Message\RequestInterface;
use Saade\Fluppy\Sources\GoogleDriveSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\Download;
use Saade\Fluppy\Sources\Support\LimitedSink;
use Saade\Fluppy\Sources\Support\UrlGuard;
use Saade\Fluppy\Sources\UrlSource;
use Saade\Fluppy\Tests\Fixtures\FakeGoogleDrive;

/**
 * The options every request of the HTTP client is sent with from here on,
 * in the order they are sent. A faked answer never reaches a handler, so
 * this is as close as a test gets to how a request would be made.
 *
 * @return ArrayObject<int, array<string, mixed>>
 */
function recordedRequestOptions(): ArrayObject
{
    $recorded = new ArrayObject;

    Http::globalMiddleware(fn (callable $handler): Closure => function (RequestInterface $request, array $options) use ($handler, $recorded) {
        $recorded[] = $options;

        return $handler($request, $options);
    });

    return $recorded;
}

it('takes what it is given up to its limit, and nothing once that is passed', function () {
    $sink = new LimitedSink(10);

    expect($sink->write('12345'))->toBe(5)
        ->and($sink->write('67890'))->toBe(5)
        ->and($sink->isOverLimit())->toBeFalse()
        ->and($sink->write('1'))->toBe(0)
        ->and($sink->isOverLimit())->toBeTrue()
        ->and((string) $sink)->toBe('1234567890');
});

it('takes everything when it has no limit', function () {
    $sink = new LimitedSink(null);

    expect($sink->write(str_repeat('a', 5_000_000)))->toBe(5_000_000)
        ->and($sink->isOverLimit())->toBeFalse()
        ->and($sink->getSize())->toBe(5_000_000);
});

it('says a file is too large when the download passed its limit, however the request ended', function () {
    $pastTheLimit = function (array $options): Response {
        $options['sink']->write('12345');

        return new Response(new PsrResponse(200));
    };

    $cutShort = function (array $options): never {
        $options['sink']->write('12345');

        throw new ConnectionException('cURL error 23: Failure writing output to destination');
    };

    expect(fn () => Download::upTo(4, $pastTheLimit))->toThrow(SourceException::class, 'The file is larger than the 4 B allowed.')
        ->and(fn () => Download::upTo(4, $cutShort))->toThrow(SourceException::class, 'The file is larger than the 4 B allowed.')
        ->and(fn () => Download::upTo(4, $pastTheLimit, isPart: true))->toThrow(SourceException::class, 'The file could not be fetched from where it is.')
        ->and(Download::upTo(5, $pastTheLimit)->status())->toBe(200);
});

it('says the file could not be fetched when the request fails for another reason', function () {
    expect(fn () => Download::upTo(null, fn () => throw new ConnectionException('cURL error 28: timed out')))
        ->toThrow(SourceException::class, 'The file could not be fetched from where it is.');
});

it('sends what it fetches from a link through cURL, to the address the guard checked', function () {
    app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => ['93.184.216.34']);

    Http::fake(fn (Request $request) => $request->hasHeader('Range')
        ? Http::response('a', 206, ['Content-Range' => 'bytes 0-0/8'])
        : Http::response('contents', 200));

    $options = recordedRequestOptions();

    $source = app(UrlSource::class);

    $source->describe(['url' => 'https://files.example.com:443/a.txt']);
    $source->read(['url' => 'https://files.example.com/a.txt'], 0, 0);
    $source->read(['url' => 'http://files.example.com/a.txt'], limit: 100);

    // Guzzle sends a request with `stream` through PHP's own HTTP wrapper,
    // where no cURL option applies: the pin would be ignored without a word.
    expect($options)->toHaveCount(3)
        ->each(fn ($request) => $request
            ->not->toHaveKey('stream')
            ->allow_redirects->toBeFalse())
        ->and($options[0]['curl'])->toBe([CURLOPT_RESOLVE => ['files.example.com:443:93.184.216.34']])
        ->and($options[2]['curl'])->toBe([CURLOPT_RESOLVE => ['files.example.com:80:93.184.216.34']])
        ->and($options[0])->toHaveKey('on_headers')->not->toHaveKey('sink')
        ->and($options[1]['sink'])->toBeInstanceOf(LimitedSink::class)
        ->and($options[2]['sink'])->toBeInstanceOf(LimitedSink::class);
});

it('sends what it fetches from Google Drive through cURL too, into a sink', function () {
    FakeGoogleDrive::serve(['abc' => ['name' => 'a.txt', 'mimeType' => 'text/plain', 'size' => '8', 'contents' => 'contents']]);

    $options = recordedRequestOptions();

    app(GoogleDriveSource::class)->read(['fileId' => 'abc', 'accessToken' => FakeGoogleDrive::TOKEN], 0, 3);

    expect($options)->toHaveCount(1)
        ->and($options[0])->not->toHaveKey('stream')->sink->toBeInstanceOf(LimitedSink::class);
});
