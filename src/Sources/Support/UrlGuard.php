<?php

namespace Saade\Fluppy\Sources\Support;

use Closure;
use Saade\Fluppy\Sources\SourceException;
use Symfony\Component\HttpFoundation\IpUtils;

/**
 * Decides whether the server may fetch an address that somebody else chose:
 * a link a person typed, or a download address a provider handed out.
 *
 * Without it, "import from a link" lets anyone who can reach the field make
 * the server talk to its own network: the database, a cloud metadata
 * service, an admin page that trusts where a request comes from.
 *
 * An address passes when it is plain `http` or `https`, on an allowed port,
 * and every address its host resolves to is on the public internet. The
 * caller then has to connect to the address that was checked here, not to
 * the name again: `GuardedHttp` does.
 */
class UrlGuard
{
    /**
     * Every range that is not the public internet: this machine, private
     * and link-local networks, carrier and benchmark ranges, documentation
     * examples, multicast, what is reserved, and the IPv6 prefixes that
     * carry an IPv4 address inside them, which could be any of the above.
     *
     * Written out instead of asked of PHP's `FILTER_FLAG_GLOBAL_RANGE`,
     * which lets multicast and NAT64 addresses through.
     */
    protected const NOT_PUBLIC = [
        '0.0.0.0/8',
        '10.0.0.0/8',
        '100.64.0.0/10',
        '127.0.0.0/8',
        '169.254.0.0/16',
        '172.16.0.0/12',
        '192.0.0.0/24',
        '192.0.2.0/24',
        '192.88.99.0/24',
        '192.168.0.0/16',
        '198.18.0.0/15',
        '198.51.100.0/24',
        '203.0.113.0/24',
        '224.0.0.0/4',
        '240.0.0.0/4',
        '::/128',
        '::1/128',
        '::ffff:0:0/96',
        '64:ff9b::/96',
        '64:ff9b:1::/48',
        '100::/64',
        '2001::/23',
        '2001:db8::/32',
        '2002::/16',
        'fc00::/7',
        'fe80::/10',
        'ff00::/8',
    ];

    /**
     * @var (Closure(string): array<string>) | null
     */
    protected ?Closure $resolveHostsUsing = null;

    /**
     * Replaces the DNS lookup, for tests.
     *
     * @param  (Closure(string): array<string>) | null  $callback
     */
    public function resolveHostsUsing(?Closure $callback): static
    {
        $this->resolveHostsUsing = $callback;

        return $this;
    }

    /**
     * @return array{host: string, port: int, address: string} The host, its port, and the checked address to connect to.
     *
     * @throws SourceException
     */
    public function check(string $url): array
    {
        $parts = parse_url($url);

        if (
            $parts === false ||
            ! in_array(strtolower($parts['scheme'] ?? ''), ['http', 'https'], true) ||
            blank($parts['host'] ?? null) ||
            isset($parts['user']) ||
            isset($parts['pass'])
        ) {
            throw SourceException::notAllowed();
        }

        $scheme = strtolower($parts['scheme']);
        $host = strtolower(trim($parts['host'], '[]'));
        $port = $parts['port'] ?? ($scheme === 'https' ? 443 : 80);

        if (! in_array($port, array_map(intval(...), (array) config('fluppy.remote.url.ports', [80, 443])), true)) {
            throw SourceException::notAllowed();
        }

        if (! $this->isAllowedHost($host)) {
            throw SourceException::notAllowed();
        }

        $addresses = filter_var($host, FILTER_VALIDATE_IP) ? [$host] : $this->resolve($host);

        // One address that is not public is enough to refuse: which of them
        // a connection would use is not for the name's owner to decide.
        if ($addresses === [] || ! collect($addresses)->every($this->isPublic(...))) {
            throw SourceException::notAllowed();
        }

        return ['host' => $host, 'port' => $port, 'address' => $addresses[0]];
    }

    public function isPublic(string $address): bool
    {
        return filter_var($address, FILTER_VALIDATE_IP) !== false
            && ! IpUtils::checkIp($address, static::NOT_PUBLIC);
    }

    /**
     * @return array<string>
     */
    protected function resolve(string $host): array
    {
        // A name like `2130706433` or `127.1` is an address to the system's
        // resolver. Real names have a dot and do not end in a number.
        if (! preg_match('/^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,61}[a-z0-9]$/', $host)) {
            return [];
        }

        if ($this->resolveHostsUsing) {
            return array_values(($this->resolveHostsUsing)($host));
        }

        // Asked of the system's resolver, as the connection itself would.
        // `dns_get_record()` asks the name servers itself, and has been seen
        // to never return under PHP-FPM on macOS. This only finds IPv4
        // addresses, so a file on a host that has none cannot be fetched.
        return gethostbynamel($host) ?: [];
    }

    protected function isAllowedHost(string $host): bool
    {
        $allowed = config('fluppy.remote.url.hosts');

        return blank($allowed) || str($host)->is((array) $allowed);
    }
}
