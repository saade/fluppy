<?php

namespace Saade\Fluppy\Sources\Support;

use Symfony\Component\Mime\MimeTypes;

class FileType
{
    /**
     * The type of a file as its name tells it, for a source that does not
     * say what kind of file a file is. A field that only takes some kinds
     * has to know before the file is fetched.
     */
    public static function ofName(string $name): ?string
    {
        $types = MimeTypes::getDefault()->getMimeTypes(strtolower(pathinfo($name, PATHINFO_EXTENSION)));

        // An extension can stand for several types, and the first is not
        // always the one a field asks for: `.mp4` is `application/mp4`
        // before it is `video/mp4`.
        return collect($types)->first(fn (string $type): bool => (bool) preg_match('#^(video|audio)/#', $type))
            ?? $types[0]
            ?? null;
    }
}
