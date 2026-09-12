// One chunk per locale pack in `@uppy/locales`, loaded when asked for.
// English is built into Uppy, so its pack is left out.
const packs = Object.fromEntries(
    Object.entries(
        import.meta.glob(
            [
                '../../node_modules/@uppy/locales/lib/*.js',
                '!../../node_modules/@uppy/locales/lib/en_US.js',
            ],
            { import: 'default' },
        ),
    ).map(([path, load]) => [path.split('/').pop().slice(0, -3), load]),
)

/**
 * Laravel names a locale `pt_BR`, `pt-BR`, `pt` or `sr_Latn`; Uppy names its
 * packs `pt_BR` or `sr_RS_Latin`. The pack for the language whose name
 * mentions the region or script wins, then the first pack for the language.
 */
export function getUppyLocaleName(locale) {
    const [language, ...subtags] = String(locale ?? '')
        .toLowerCase()
        .replace(/-/g, '_')
        .split('_')

    const packsForLanguage = Object.keys(packs).filter((pack) =>
        pack.toLowerCase().startsWith(`${language}_`),
    )

    return (
        packsForLanguage.find((pack) =>
            subtags.some((subtag) =>
                pack.toLowerCase().includes(`_${subtag.slice(0, 3)}`),
            ),
        ) ??
        packsForLanguage[0] ??
        null
    )
}

export async function loadUppyLocale(locale) {
    const name = getUppyLocaleName(locale)

    return name ? await packs[name]() : null
}
