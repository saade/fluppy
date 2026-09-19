<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Fluppy</title>

        @filamentStyles
        <link rel="stylesheet" href="/fluppy-tests/uppy.css" />
    </head>
    <body>
        @livewire('fluppy-page')

        @filamentScripts(withCore: true)
    </body>
</html>
