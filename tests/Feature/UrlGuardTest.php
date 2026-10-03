<?php

use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\Support\UrlGuard;

/**
 * A guard whose names resolve to what the test says, and to nothing else.
 *
 * @param  array<string, array<string>>  $hosts
 */
function urlGuard(array $hosts = []): UrlGuard
{
    return app(UrlGuard::class)->resolveHostsUsing(fn (string $host): array => $hosts[$host] ?? []);
}

it('lets a name on the public internet through, with the address to connect to', function () {
    expect(urlGuard(['files.example.com' => ['93.184.216.34']])->check('https://files.example.com/report.pdf'))
        ->toBe(['host' => 'files.example.com', 'port' => 443, 'address' => '93.184.216.34']);

    expect(urlGuard(['files.example.com' => ['2606:2800:220:1:248:1893:25c8:1946']])->check('http://FILES.example.com/'))
        ->toMatchArray(['host' => 'files.example.com', 'port' => 80]);
});

it('refuses an address that is not the public internet', function (string $address) {
    expect(app(UrlGuard::class)->isPublic($address))->toBeFalse();

    expect(fn () => urlGuard(['internal.example.com' => [$address]])->check('http://internal.example.com/'))
        ->toThrow(SourceException::class);
})->with([
    'this machine' => '127.0.0.1',
    'this machine, another way' => '127.8.8.8',
    'unspecified' => '0.0.0.0',
    'private, class A' => '10.1.2.3',
    'private, class B' => '172.16.5.4',
    'private, class C' => '192.168.1.10',
    'link-local, where cloud metadata lives' => '169.254.169.254',
    'carrier-grade NAT' => '100.64.0.1',
    'benchmarking' => '198.18.0.1',
    'multicast' => '224.0.0.1',
    'reserved' => '240.0.0.1',
    'broadcast' => '255.255.255.255',
    'IPv6 this machine' => '::1',
    'IPv6 unspecified' => '::',
    'IPv6 unique local' => 'fd00::1',
    'IPv6 link-local' => 'fe80::1',
    'IPv6 multicast' => 'ff02::1',
    'IPv4 inside IPv6' => '::ffff:127.0.0.1',
    'IPv4 inside IPv6, even a public one' => '::ffff:8.8.8.8',
    'NAT64 carrying this machine' => '64:ff9b::7f00:1',
    '6to4 carrying a private address' => '2002:0a00:0001::',
    'not an address' => 'not-an-address',
]);

it('takes a public address for what it is', function (string $address) {
    expect(app(UrlGuard::class)->isPublic($address))->toBeTrue();
})->with(['8.8.8.8', '93.184.216.34', '2606:4700:4700::1111']);

it('refuses a name when any of its addresses is not public', function () {
    expect(fn () => urlGuard(['rebind.example.com' => ['93.184.216.34', '127.0.0.1']])->check('https://rebind.example.com/'))
        ->toThrow(SourceException::class);
});

it('refuses a name that resolves to nothing', function () {
    expect(fn () => urlGuard()->check('https://nowhere.example.com/'))->toThrow(SourceException::class);
});

it('refuses what is not a plain link to a file', function (string $url) {
    expect(fn () => urlGuard(['files.example.com' => ['93.184.216.34']])->check($url))->toThrow(SourceException::class);
})->with([
    'another scheme' => 'ftp://files.example.com/report.pdf',
    'a file on the server' => 'file:///etc/passwd',
    'a scheme curl knows and browsers do not' => 'gopher://files.example.com/',
    'no scheme' => 'files.example.com/report.pdf',
    'a user name and password' => 'https://user:secret@files.example.com/',
    'a user name' => 'https://user@files.example.com/',
    'another port' => 'https://files.example.com:8443/',
    'the port of a database' => 'http://files.example.com:5432/',
    'nothing' => '',
    'not a link' => 'https://',
]);

it('refuses an address written so that it does not look like one', function (string $url) {
    // Resolved the way the system would: these would all reach this machine.
    expect(fn () => urlGuard()->resolveHostsUsing(fn (string $host): array => ['127.0.0.1'])->check($url))
        ->toThrow(SourceException::class);
})->with([
    'localhost' => 'http://localhost/',
    'an address as one number' => 'http://2130706433/',
    'an address with parts left out' => 'http://127.1/',
    'an address in hexadecimal' => 'http://0x7f000001/',
    'an address in octal' => 'http://0177.0.0.1/',
    'this machine, in full' => 'http://127.0.0.1/',
    'this machine, in IPv6' => 'http://[::1]/',
    'cloud metadata' => 'http://169.254.169.254/latest/meta-data/',
    'a name with no dot' => 'http://intranet/',
]);

it('lets other ports through when the configuration allows them', function () {
    config(['fluppy.remote.url.ports' => [80, 443, 8443]]);

    expect(urlGuard(['files.example.com' => ['93.184.216.34']])->check('https://files.example.com:8443/'))
        ->toMatchArray(['port' => 8443]);
});

it('only fetches from the hosts the configuration lists, when it lists any', function () {
    config(['fluppy.remote.url.hosts' => ['*.example.com', 'cdn.example.org']]);

    $guard = urlGuard([
        'files.example.com' => ['93.184.216.34'],
        'cdn.example.org' => ['93.184.216.34'],
        'elsewhere.test.net' => ['93.184.216.34'],
    ]);

    expect($guard->check('https://files.example.com/'))->toMatchArray(['host' => 'files.example.com'])
        ->and($guard->check('https://cdn.example.org/'))->toMatchArray(['host' => 'cdn.example.org'])
        ->and(fn () => $guard->check('https://elsewhere.test.net/'))->toThrow(SourceException::class);
});

it('lets an address a provider hands out through whatever hosts and ports links are allowed on', function () {
    config(['fluppy.remote.url.hosts' => ['files.example.com'], 'fluppy.remote.url.ports' => [8443]]);

    expect(urlGuard(['download.provider.net' => ['93.184.216.34']])->check('https://download.provider.net/a?token=b', isFromProvider: true))
        ->toBe(['host' => 'download.provider.net', 'port' => 443, 'address' => '93.184.216.34']);
});

it('still refuses an address a provider hands out that is not HTTPS on its own port, or not public', function (string $url) {
    config(['fluppy.remote.url.ports' => [80, 443, 8443]]);

    $guard = urlGuard(['download.provider.net' => ['93.184.216.34'], 'inside.provider.net' => ['10.0.0.5']]);

    expect(fn () => $guard->check($url, isFromProvider: true))->toThrow(SourceException::class);
})->with([
    'plain HTTP' => ['http://download.provider.net/a'],
    'another port' => ['https://download.provider.net:8443/a'],
    'a private address' => ['https://inside.provider.net/a'],
    'this machine' => ['https://127.0.0.1/a'],
    'a user name' => ['https://user@download.provider.net/a'],
]);
