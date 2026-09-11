# Filament plugin skeleton

The starting point for a new Filament plugin. Copy it, run the configure script, and you have a package that installs, builds and passes its tests on Filament 4 and 5.

```bash
cp -R saade-plugin-skeleton filament-my-thing
cd filament-my-thing
php configure.php
```

The folder name becomes the default package name. The script asks what the package is and keeps only the files for that:

| Question | Choices |
| --- | --- |
| Kind | A form field, a widget or page, or a theme |
| Panel plugin | For a form field: whether it has panel-wide defaults. Widgets and themes always have one. |
| JavaScript | For a theme: whether it has any. Fields and widgets always do. |
| Build tool | esbuild for one output file, or Vite when the script should be split into parts that load on demand |
| Extras | Translations, a config file, a migration |

It then renames everything, replaces this file with the package's README, and offers to install the dependencies, build the assets and run the tests.

The questions are asked with [Laravel Prompts](https://laravel.com/docs/prompts), which is a dev dependency of the skeleton only. The script runs `composer install` first when there is no `vendor/` yet, and once the package is configured it removes what was only there for it: `variants/`, `laravel/prompts` from `composer.json`, and itself.

### Without the questions

Every answer can be passed as an option. `--no-interaction` takes the default for the rest.

```bash
php configure.php --no-interaction --kind=field --plugin --build=vite --extras=lang,config
```

| Option | Default |
| --- | --- |
| `--name=` | The folder name |
| `--class=` | The name in StudlyCase |
| `--short=` | The class prefix without `Filament` |
| `--title=` | The name as a headline |
| `--prefix=` | `fi-` and the first two letters of the short name |
| `--description=` | `<title> for Filament` |
| `--branch=` | `1.x` |
| `--kind=field\|widget\|theme` | `field` |
| `--plugin`, `--no-plugin` | No plugin, for a field |
| `--script`, `--no-script` | No script, for a theme |
| `--build=esbuild\|vite` | `esbuild` |
| `--extras=lang,config,migrations` | `lang`, or none for a theme |
| `--install`, `--no-install` | Install |

## What is where

- The root holds what every package shares: Composer and tooling config, the changelog, the upgrade guide template and `CLAUDE.md`.
- `variants/common` holds what every package gets but the skeleton itself cannot run: the package's GitHub workflows and Dependabot config.
- `variants/field`, `variants/widget` and `variants/theme` each hold one kind's source, views, assets, tests and README.
- `variants/field-plugin` and `variants/theme-js` are add-ons copied over their kind.
- `variants/build-esbuild` and `variants/build-vite` hold the build setup.
- `variants/extra-*` hold the optional files. A line in a service provider that ends in `// @extra:lang` is kept or dropped with that extra.

## Changing the skeleton

The root cannot run by itself, because the source lives in `variants/`. The `skeleton` workflow does this for every kind on each push. To check a change locally, configure a copy and run its tests:

```bash
cp -R saade-plugin-skeleton /tmp/filament-try && cd /tmp/filament-try
php configure.php
```
