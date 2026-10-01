<?php

namespace Saade\Fluppy\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Saade\Fluppy\Sources\BrowsableSource;
use Saade\Fluppy\Sources\SourceException;
use Saade\Fluppy\Sources\SourceManager;

class SourceConnectionController
{
    public function connect(Request $request, string $source): RedirectResponse
    {
        $source = $this->source($source);

        $state = Str::random(40);
        $verifier = Str::random(64);

        $request->session()->put($this->key($source), ['state' => $state, 'verifier' => $verifier]);

        return redirect()->away($source->getAuthorizationUrl(
            $this->redirectUrl($source),
            $state,
            rtrim(strtr(base64_encode(hash('sha256', $verifier, true)), '+/', '-_'), '='),
        ));
    }

    public function callback(Request $request, string $source): Response
    {
        $source = $this->source($source);

        // Taken out whatever happens next: a state is good for one answer.
        $connecting = $request->session()->pull($this->key($source));

        $isConnected = false;

        // The state is what ties the answer to the window this session
        // opened. Without that check, a link could connect the session to
        // an account of somebody else's choosing.
        if (
            is_array($connecting) &&
            is_string($request->query('state')) &&
            hash_equals((string) ($connecting['state'] ?? ''), $request->query('state')) &&
            is_string($request->query('code'))
        ) {
            try {
                $source->connect($request->query('code'), $this->redirectUrl($source), (string) $connecting['verifier']);

                $isConnected = true;
            } catch (SourceException) {
                $isConnected = false;
            }
        }

        return response()->view('fluppy::source-connection', [
            'isConnected' => $isConnected,
            'label' => $source->getLabel(),
            'source' => $source->getId(),
        ]);
    }

    protected function source(string $id): BrowsableSource
    {
        $source = app(SourceManager::class)->get($id);

        abort_unless($source instanceof BrowsableSource, 404);

        return $source;
    }

    // Always the same for a source, so that it can be registered with the
    // provider, which refuses any other.
    protected function redirectUrl(BrowsableSource $source): string
    {
        return route('fluppy.sources.callback', ['source' => $source->getId()]);
    }

    protected function key(BrowsableSource $source): string
    {
        return "fluppy.sources.{$source->getId()}.connecting";
    }
}
