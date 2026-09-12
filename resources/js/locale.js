// The names of the locale packs in `@uppy/locales`, filled in by the build.
const packs = __UPPY_LOCALES__

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

    const packsForLanguage = packs.filter((pack) =>
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

    // English is built into Uppy.
    if (!name || name === 'en_US') {
        return null
    }

    const pack = await import(`../../node_modules/@uppy/locales/lib/${name}.js`)

    return pack.default
}
