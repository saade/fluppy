# Working on this package

A Filament plugin by Saade. These are the conventions the package was set up with; follow them unless told otherwise.

## Support

- Filament 4 and 5. Run the tests on both before calling something done:
  `composer update --with "filament/filament:^4.0" -W`, then `composer update -W` to come back.
- PHP 8.2 and up.

## Styles

- The package ships uncompiled CSS in `resources/css`, written with Tailwind's `@apply`. Users import it into their panel's custom theme, with an `@source` line for the views. Do not replace this with a compiled stylesheet registered through `FilamentAsset`, and do not remove the theme step from the README.
- Every class the package owns starts with its prefix (see `resources/css`). Third-party classes are only styled inside an element that has it.
- Use Filament's own Blade components and color names before writing custom markup or colors.

## Scripts

- Sources are in `resources/js`, built with `npm run build` into `resources/dist`, which is committed.
- CI rebuilds and commits `resources/dist` after a merge. Run `npm run build` to try a change; committing the result is optional.

## Settings

- Every setting accepts a closure.
- When the package has a panel plugin, a panel-wide setting lives on it. A field or widget reads it through `Plugin::current()`, which works on a panel that does not register the plugin and outside a panel, and may override it with an option of its own.

## Tests

- Pest with Testbench. `tests/Feature` is the main suite. When there is a `tests/Standalone`, it runs with no panel, for what has to work outside one.
- Fixtures go in `tests/Fixtures`. Give helper functions in test files unique names: Pest loads them all into one namespace.

## Docs

- `README.md` documents every public feature. `CHANGELOG.md` gets a line for every change a user can notice. A change to existing behavior also goes in `UPGRADING.md`, as a step with a diff.
- `docs/` is git-ignored and local: plans, task lists, research and drafts go there and are never committed.

## Git

- One branch per major version (`1.x`). Non-breaking fixes go to the current release branch; behavior changes wait for the next major.
- Commit messages are a single Conventional Commits line.
