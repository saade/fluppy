import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'

// Uppy ships its stylesheet precompiled. The application's theme imports the
// package's CSS from `vendor/`, where `node_modules/@uppy` does not exist, so
// a copy that matches the bundled scripts is kept in the package.
function uppyStyles() {
    return {
        name: 'fluppy-uppy-styles',
        buildStart() {
            const require = createRequire(import.meta.url)
            const styles = [
                '@uppy/core',
                '@uppy/dashboard',
                '@uppy/webcam',
                '@uppy/screen-capture',
                '@uppy/audio',
                '@uppy/image-editor',
                '@uppy/url',
                '@uppy/image-generator',
            ].map((name) => {
                const { version } = require(`${name}/package.json`)
                const css = readFileSync(
                    require.resolve(`${name}/css/style.min.css`),
                    'utf8',
                )
                    .replace(/^@charset "UTF-8";/, '')
                    .replace(/\/\*# sourceMappingURL=[^*]*\*\//g, '')

                return `/* ${name} ${version} */\n${css}`
            })

            writeFileSync(
                'resources/css/uppy.css',
                `/* Copied by vite.config.js. Do not edit. */\n${styles.join('\n')}\n`,
            )
        },
    }
}

// One file, as Filament's own components are: what the field loads on demand
// is built into it. Chunks would each be published into the application's
// `public` folder under a name with a hash in it, and the ones an upgrade
// replaces would be left there.
export default defineConfig({
    plugins: [uppyStyles()],
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
        outDir: 'resources/dist',
        emptyOutDir: true,
        sourcemap: false,
        minify: true,
        lib: {
            entry: 'resources/js/index.js',
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                entryFileNames: 'components/fluppy.js',
                inlineDynamicImports: true,
            },
        },
    },
})
