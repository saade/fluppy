<?php

namespace Saade\Fluppy\Tests\Fixtures;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

/**
 * PHP reads the fields and files of a multipart request before any code
 * runs. The server Pest's browser plugin puts in front of the application is
 * not PHP's, and hands over the body as it arrived, without the files. This
 * reads them out of it, for the browser tests only.
 */
class ParseMultipartBody
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! preg_match('/^multipart\/form-data;.*boundary="?([^";]+)"?/i', (string) $request->header('Content-Type'), $boundary)) {
            return $next($request);
        }

        foreach (explode("--{$boundary[1]}", $request->getContent()) as $part) {
            if (! str_contains($part, "\r\n\r\n")) {
                continue;
            }

            [$headers, $body] = explode("\r\n\r\n", ltrim($part, "\r\n"), 2);

            $body = substr($body, 0, -2);

            if (! preg_match('/\bname="([^"]*)"/', $headers, $name)) {
                continue;
            }

            $value = preg_match('/\bfilename="([^"]*)"/', $headers, $filename)
                ? $this->file($filename[1], $headers, $body)
                : $body;

            $bag = $value instanceof UploadedFile ? $request->files : $request->request;

            str_ends_with($name[1], '[]')
                ? $bag->set($key = substr($name[1], 0, -2), [...$bag->all()[$key] ?? [], $value])
                : $bag->set($name[1], $value);
        }

        return $next($request);
    }

    protected function file(string $name, string $headers, string $contents): UploadedFile
    {
        file_put_contents($path = tempnam(sys_get_temp_dir(), 'fluppy'), $contents);

        preg_match('/^Content-Type:\s*(.+)$/mi', $headers, $type);

        return new UploadedFile($path, $name, trim($type[1] ?? '') ?: null, null, true);
    }
}
