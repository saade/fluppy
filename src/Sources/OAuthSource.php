<?php

namespace Saade\Fluppy\Sources;

use Closure;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use LogicException;
use Saade\Fluppy\Sources\Support\Token;
use Saade\Fluppy\Sources\Support\TokenStore;

/**
 * What the sources that are connected through OAuth have in common: the
 * authorization code flow with PKCE, a token that is refreshed when it has
 * run out, and requests that carry it.
 */
abstract class OAuthSource implements BrowsableSource
{
    public function __construct(
        protected TokenStore $tokens,
    ) {}

    abstract protected function getAuthorizationEndpoint(): string;

    abstract protected function getTokenEndpoint(): string;

    /**
     * What the authorization address carries besides what every provider
     * asks for: scopes, and whatever makes the provider give a refresh token.
     *
     * @return array<string, string>
     */
    protected function getAuthorizationParameters(): array
    {
        return [];
    }

    /**
     * Tells the provider that a token is no longer to be honored, where the
     * provider has a way to be told.
     */
    protected function revoke(Token $token): void {}

    public function getClientOptions(): array
    {
        $this->getCredentials();

        return [
            'connectUrl' => route('fluppy.sources.connect', ['source' => $this->getId()], absolute: false),
        ];
    }

    public function getAuthorizationUrl(string $redirectUrl, string $state, string $codeChallenge): string
    {
        return $this->getAuthorizationEndpoint() . '?' . http_build_query([
            'client_id' => $this->getCredentials()['client_id'],
            'response_type' => 'code',
            'redirect_uri' => $redirectUrl,
            'state' => $state,
            'code_challenge' => $codeChallenge,
            'code_challenge_method' => 'S256',
            ...$this->getAuthorizationParameters(),
        ]);
    }

    public function connect(string $code, string $redirectUrl, string $codeVerifier): void
    {
        $this->tokens->put($this->getId(), $this->requestToken([
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => $redirectUrl,
            'code_verifier' => $codeVerifier,
        ]));
    }

    public function isConnected(): bool
    {
        return $this->tokens->get($this->getId()) !== null;
    }

    public function disconnect(): void
    {
        if ($token = $this->tokens->get($this->getId())) {
            rescue(fn () => $this->revoke($token), report: false);
        }

        $this->forget();
    }

    protected function forget(): void
    {
        $this->tokens->forget($this->getId());

        session()->forget("fluppy.sources.{$this->getId()}.account");
    }

    /**
     * Whose account is connected, as the person would know it. Asked of the
     * provider once and kept in the session, since the file browser shows it
     * with every folder it lists.
     *
     * @param  Closure(): ?string  $ask
     */
    protected function rememberAccount(Closure $ask): ?string
    {
        return session()->remember("fluppy.sources.{$this->getId()}.account", $ask);
    }

    /**
     * A request that carries the person's token, refreshed first when it has
     * run out.
     *
     * @throws SourceNotConnectedException
     */
    protected function request(): PendingRequest
    {
        $token = $this->tokens->get($this->getId()) ?? throw SourceException::notConnected($this->getLabel());

        if ($token->hasExpired()) {
            $token = $this->refresh($token);
        }

        return Http::withToken($token->accessToken)
            ->connectTimeout(5)
            ->timeout((int) config('fluppy.remote.timeout', 60));
    }

    /**
     * @param  callable(): Response  $send
     * @param  array<int>  $expected  The statuses that are an answer.
     *
     * @throws SourceException
     */
    protected function send(callable $send, array $expected = [200]): Response
    {
        try {
            $response = $send();
        } catch (ConnectionException) {
            throw SourceException::unreachable();
        }

        // The provider no longer takes the token: it was revoked there, or
        // the person removed the application from their account.
        if ($response->status() === 401) {
            $this->forget();

            throw SourceException::notConnected($this->getLabel());
        }

        if (! in_array($response->status(), $expected, true)) {
            throw SourceException::failed($response->status());
        }

        return $response;
    }

    protected function refresh(Token $token): Token
    {
        if ($token->refreshToken === null) {
            $this->forget();

            throw SourceException::notConnected($this->getLabel());
        }

        try {
            $refreshed = $this->requestToken([
                'grant_type' => 'refresh_token',
                'refresh_token' => $token->refreshToken,
            ], $token);
        } catch (SourceNotConnectedException $exception) {
            $this->forget();

            throw $exception;
        }

        $this->tokens->put($this->getId(), $refreshed);

        return $refreshed;
    }

    /**
     * @param  array<string, string>  $parameters
     *
     * @throws SourceException
     */
    protected function requestToken(array $parameters, ?Token $previous = null): Token
    {
        try {
            $response = Http::asForm()
                ->acceptJson()
                ->connectTimeout(5)
                ->timeout(15)
                ->post($this->getTokenEndpoint(), [...$this->getCredentials(), ...$parameters]);
        } catch (ConnectionException) {
            throw SourceException::unreachable();
        }

        // The provider refuses the code or the refresh token: there is no
        // connection to speak of.
        if ($response->clientError()) {
            throw SourceException::notConnected($this->getLabel());
        }

        if (! $response->successful() || ! is_string($response->json('access_token'))) {
            throw SourceException::failed($response->status());
        }

        return new Token(
            $response->json('access_token'),
            // Not every provider sends the refresh token again when it is
            // used: the one there was is still the one to use.
            is_string($response->json('refresh_token')) ? $response->json('refresh_token') : $previous?->refreshToken,
            is_numeric($response->json('expires_in')) ? time() + (int) $response->json('expires_in') : null,
        );
    }

    /**
     * @return array{client_id: string, client_secret: string}
     */
    protected function getCredentials(): array
    {
        $key = str_replace('-', '_', $this->getId());

        $credentials = [
            'client_id' => config("fluppy.remote.{$key}.client_id"),
            'client_secret' => config("fluppy.remote.{$key}.client_secret"),
        ];

        if (blank($credentials['client_id']) || blank($credentials['client_secret'])) {
            throw new LogicException("{$this->getLabel()} needs a client ID and a client secret. Set `fluppy.remote.{$key}` in the configuration.");
        }

        return array_map(strval(...), $credentials);
    }
}
