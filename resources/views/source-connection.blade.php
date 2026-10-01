@php
    use Illuminate\Support\Facades\Vite;

    $nonce = Vite::cspNonce();
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>{{ $label }}</title>
    </head>
    <body style="font-family: system-ui, sans-serif; padding: 2rem; text-align: center">
        <p>
            {{ $isConnected ? __('fluppy::fluppy.sources.connected', ['source' => $label]) : __('fluppy::fluppy.sources.connection_failed', ['source' => $label]) }}
        </p>

        <p>{{ __('fluppy::fluppy.sources.close_window') }}</p>

        {{-- Heard only by pages of this same origin, and says nothing secret. --}}
        <script @if ($nonce) nonce="{{ $nonce }}" @endif>
            new BroadcastChannel('fluppy').postMessage({
                source: @js($source),
                isConnected: @js($isConnected),
            })

            window.close()
        </script>
    </body>
</html>
