# Filament Skeleton

[![Latest Version on Packagist](https://img.shields.io/packagist/v/saade/filament-skeleton.svg?style=flat-square)](https://packagist.org/packages/saade/filament-skeleton)
[![Total Downloads](https://img.shields.io/packagist/dt/saade/filament-skeleton.svg?style=flat-square)](https://packagist.org/packages/saade/filament-skeleton)
[![Tests](https://img.shields.io/github/actions/workflow/status/saade/filament-skeleton/run-tests.yml?branch=1.x&label=tests&style=flat-square)](https://github.com/saade/filament-skeleton/actions/workflows/run-tests.yml)

This is my package filament-skeleton

# Version compatibility

| Plugin | Filament | Install                                            |
| ------ | -------- | -------------------------------------------------- |
| 1.x    | 4.x, 5.x | `composer require saade/filament-skeleton:"^1.0"` |

# Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Panel defaults](#panel-defaults)
- [Styling](#styling)
- [Testing](#testing)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Credits](#credits)
- [License](#license)

# Installation

1. Install the package via composer:

```bash
composer require saade/filament-skeleton:"^1.0"
```

2. Add the plugin's styles to your panel's [custom theme](https://filamentphp.com/docs/5.x/styling/overview#creating-a-custom-theme). If the panel does not have a custom theme yet, create one first by following the Filament docs.

```css
@import '../../../../vendor/saade/filament-skeleton/resources/css/filament-skeleton.css';

@source '../../../../vendor/saade/filament-skeleton/resources/views/**/*.blade.php';
```

Then rebuild your assets with `npm run build`.

3. Register the plugin on the panel to set defaults for every field in it. This step is optional: without it, the package's own defaults are used.

```php
use Filament\Panel;
use Saade\FilamentSkeleton\FilamentSkeletonPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        // ...
        ->plugin(FilamentSkeletonPlugin::make());
}
```

# Usage

Add the field to a form:

```php
use Saade\FilamentSkeleton\Forms\Components\SkeletonField;

SkeletonField::make('amount')
```

# Options

Each option accepts a closure:

| Method | Default | Description |
| ------ | ------- | ----------- |
| `step(int \| Closure \| null $step)` | The panel's, or `1` | How much each press adds or takes away. |

# Panel defaults

The same options on the panel plugin set the default for every field in the panel. A field's own option wins:

```php
FilamentSkeletonPlugin::make()
    ->step(10)
```

# Styling

Everything the package draws has a class that starts with `fi-sk`, to style from your theme:

| Class | Element |
| ----- | ------- |
| `.fi-sk` | The field. |
| `.fi-sk-value` | The current value. |

# Testing

```bash
composer test
```

# Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

# Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

# Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

# Credits

- [Saade](https://github.com/saade)
- [All Contributors](../../contributors)

# License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
