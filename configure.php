#!/usr/bin/env php
<?php

// Turns this skeleton into a package: php configure.php
//
// Run it once, from the root of a fresh copy. It asks what kind of package
// this is, keeps the files for that kind, renames everything, and removes
// what was only here for it: `variants/`, laravel/prompts and itself.
//
// Every answer can be given up front, and --no-interaction takes the defaults
// for the rest:
//
//   php configure.php --kind=field --plugin --build=vite --extras=lang,config
//
//   --name=  --class=  --short=  --title=  --prefix=  --description=  --branch=
//   --kind=field|widget|theme    --plugin | --no-plugin    --script | --no-script
//   --build=esbuild|vite         --extras=lang,config,migrations
//   --install | --no-install     --no-interaction

use Laravel\Prompts\Prompt;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\info;
use function Laravel\Prompts\intro;
use function Laravel\Prompts\multiselect;
use function Laravel\Prompts\outro;
use function Laravel\Prompts\select;
use function Laravel\Prompts\table;
use function Laravel\Prompts\text;
use function Laravel\Prompts\warning;

$root = __DIR__;

chdir($root);

if (! file_exists("{$root}/vendor/autoload.php")) {
    echo 'Installing the dependencies the configuration needs...' . PHP_EOL;

    // The package's own provider does not exist until it has been configured,
    // so Composer must not run the scripts that would look for it.
    passthru('composer install --no-interaction --no-scripts', $status);

    if ($status !== 0) {
        exit($status);
    }
}

require "{$root}/vendor/autoload.php";

/**
 * @return array<string, string | bool>
 */
function options(array $arguments): array
{
    $options = [];

    foreach (array_slice($arguments, 1) as $argument) {
        if (! str_starts_with($argument, '--')) {
            continue;
        }

        [$name, $value] = array_pad(explode('=', substr($argument, 2), 2), 2, null);

        if (($value === null) && str_starts_with($name, 'no-')) {
            $options[substr($name, 3)] = false;
        } else {
            $options[$name] = $value ?? true;
        }
    }

    return $options;
}

function studly(string $value): string
{
    return str_replace(' ', '', ucwords(str_replace(['-', '_'], ' ', $value)));
}

function headline(string $value): string
{
    return ucwords(str_replace(['-', '_'], ' ', $value));
}

/**
 * @return list<string>
 */
function files(string $directory): array
{
    $skipped = ['.git', 'vendor', 'node_modules', 'build', 'docs', 'dist'];
    $files = [];

    foreach (scandir($directory) ?: [] as $entry) {
        if (in_array($entry, ['.', '..', ...$skipped], true)) {
            continue;
        }

        $path = "{$directory}/{$entry}";

        if (is_dir($path)) {
            $files = [...$files, ...files($path)];
        } elseif (! in_array($entry, ['configure.php', 'composer.lock', 'package-lock.json'], true)) {
            $files[] = $path;
        }
    }

    return $files;
}

function copyDirectory(string $from, string $to): void
{
    foreach (scandir($from) ?: [] as $entry) {
        if (in_array($entry, ['.', '..'], true)) {
            continue;
        }

        if (is_dir("{$from}/{$entry}")) {
            if (! is_dir("{$to}/{$entry}")) {
                mkdir("{$to}/{$entry}", recursive: true);
            }

            copyDirectory("{$from}/{$entry}", "{$to}/{$entry}");
        } else {
            copy("{$from}/{$entry}", "{$to}/{$entry}");
        }
    }
}

function removeDirectory(string $directory): void
{
    foreach (scandir($directory) ?: [] as $entry) {
        if (in_array($entry, ['.', '..'], true)) {
            continue;
        }

        is_dir("{$directory}/{$entry}") ? removeDirectory("{$directory}/{$entry}") : unlink("{$directory}/{$entry}");
    }

    rmdir($directory);
}

$options = options($argv);

if (($options['interaction'] ?? true) === false) {
    Prompt::interactive(false);
}

intro('Filament plugin skeleton');

$slug = text('Package name', default: (string) ($options['name'] ?? basename($root)), required: true, hint: 'As on Packagist, after "saade/".');
$class = text('Class prefix', default: (string) ($options['class'] ?? studly($slug)), required: true, hint: 'The namespace becomes Saade\\<prefix>.');
$short = text('Short name', default: (string) ($options['short'] ?? (preg_replace('/^Filament/', '', $class) ?: $class)), required: true, hint: 'For the example classes, such as <short>Field or <short>Widget.');
$title = text('Title', default: (string) ($options['title'] ?? headline($slug)), required: true);
$prefix = text('CSS class prefix', default: (string) ($options['prefix'] ?? ('fi-' . strtolower(substr($short, 0, 2)))), required: true, hint: 'Every class the package owns starts with it.');
$description = text('Description', default: (string) ($options['description'] ?? "{$title} for Filament"), required: true);
$branch = text('Release branch', default: (string) ($options['branch'] ?? '1.x'), required: true);

$kind = select('What kind of package is it?', [
    'field' => 'A form field',
    'widget' => 'A widget or page',
    'theme' => 'A theme',
], default: (string) ($options['kind'] ?? 'field'));

$hasPlugin = match ($kind) {
    'field' => confirm('Add a panel plugin?', default: (bool) ($options['plugin'] ?? false), hint: 'For defaults that apply to every field in a panel.'),
    default => true,
};

$hasScript = match ($kind) {
    'theme' => confirm('Does the theme need JavaScript?', default: (bool) ($options['script'] ?? false)),
    default => true,
};

$build = $hasScript
    ? select('Which build tool?', [
        'esbuild' => 'esbuild',
        'vite' => 'Vite',
    ], default: (string) ($options['build'] ?? 'esbuild'), hint: 'esbuild writes one file. Vite can split the script into parts that load on demand.')
    : null;

$chosenExtras = multiselect('Anything else?', [
    'lang' => 'Translations',
    'config' => 'A config file',
    'migrations' => 'A migration',
], default: isset($options['extras'])
    ? array_filter(explode(',', (string) $options['extras']))
    : ($kind === 'theme' ? [] : ['lang']), hint: 'Space to select, enter to confirm.');

$extras = array_fill_keys(['lang', 'config', 'migrations'], false);

foreach ($chosenExtras as $extra) {
    $extras[$extra] = true;
}

table(['', ''], [
    ['Package', "saade/{$slug}"],
    ['Namespace', "Saade\\{$class}"],
    ['Title', $title],
    ['CSS prefix', $prefix],
    ['Description', $description],
    ['Branch', $branch],
    ['Kind', $kind . (($kind === 'field' && $hasPlugin) ? ', with a panel plugin' : '')],
    ['Build', $build ?? 'none'],
    ['Extras', implode(', ', $chosenExtras) ?: 'none'],
]);

if (! confirm('Configure the package with these?', default: true)) {
    warning('Nothing was changed.');

    exit(1);
}

// Later folders overwrite earlier ones, so an add-on can replace a file of
// the kind it extends.
$variants = array_filter([
    $kind,
    ($kind === 'field' && $hasPlugin) ? 'field-plugin' : null,
    ($kind === 'theme' && $hasScript) ? 'theme-js' : null,
    $build ? "build-{$build}" : null,
    ...array_map(fn (string $extra): string => "extra-{$extra}", $chosenExtras),
]);

foreach ($variants as $variant) {
    copyDirectory("{$root}/variants/{$variant}", $root);
}

removeDirectory("{$root}/variants");

if (! $hasScript) {
    unlink("{$root}/.github/workflows/build-assets.yml");
}

// A theme's script is a plain module, not an Alpine component, so it is not
// built into the folder Filament publishes components from.
if ($kind === 'theme' && $hasScript) {
    foreach (['vite.config.js', 'bin/build.js'] as $file) {
        if (file_exists("{$root}/{$file}")) {
            file_put_contents("{$root}/{$file}", str_replace('components/filament-skeleton.js', 'filament-skeleton.js', file_get_contents("{$root}/{$file}")));
        }
    }
}

// Only this script needed it.
$composer = json_decode(file_get_contents("{$root}/composer.json"), associative: true);

unset($composer['require-dev']['laravel/prompts']);

file_put_contents("{$root}/composer.json", json_encode($composer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL);

// Longer names first, so a shorter one never rewrites part of a longer one.
$replacements = [
    'This is my package filament-skeleton' => $description,
    'FilamentSkeleton' => $class,
    'filamentSkeleton' => lcfirst($class),
    'Filament Skeleton' => $title,
    'filament-skeleton' => $slug,
    'filament_skeleton' => str_replace('-', '_', $slug),
    'Skeleton' => $short,
    'skeleton' => lcfirst($short),
    'fi-sk' => $prefix,
    '1.x' => $branch,
];

foreach (files($root) as $file) {
    $contents = file_get_contents($file);

    // A line marked for an extra stays, without its mark, when the extra was
    // chosen, and goes otherwise.
    $replaced = preg_replace_callback(
        '/^(.*?) \/\/ @extra:(\w+)\n/m',
        fn (array $matches): string => ($extras[$matches[2]] ?? false) ? $matches[1] . "\n" : '',
        $contents,
    );

    $replaced = str_replace(array_keys($replacements), array_values($replacements), $replaced);

    if ($replaced !== $contents) {
        file_put_contents($file, $replaced);
    }

    $name = str_replace(
        ['FilamentSkeleton', 'filament-skeleton', 'filament_skeleton', 'Skeleton'],
        [$class, $slug, str_replace('-', '_', $slug), $short],
        basename($file),
    );

    if ($name !== basename($file)) {
        rename($file, dirname($file) . '/' . $name);
    }
}

unlink(__FILE__);

info("saade/{$slug} is configured.");

// composer.json changed, so the autoloader has to be rebuilt either way.
$commands = array_filter([
    'composer update --no-interaction',
    'npm install',
    $hasScript ? 'npm run build' : null,
    'composer test',
]);

if (confirm('Install the dependencies' . ($hasScript ? ', build the assets' : '') . ' and run the tests?', default: (bool) ($options['install'] ?? true))) {
    passthru(implode(' && ', $commands), $status);

    $status === 0
        ? outro('Done. Write the README, then replace the example with the real thing.')
        : warning('A step failed. Its output is above.');

    exit($status);
}

outro('Done. Run these before anything else: ' . implode(' && ', $commands));
