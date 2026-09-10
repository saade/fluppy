import { defineConfig } from 'vite'

// The output mirrors where Filament publishes assets (Alpine components in
// `components/`, scripts one level up) so relative imports between a
// component and the chunks it loads on demand still resolve once published.
export default defineConfig({
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
                entryFileNames: 'components/filament-skeleton.js',
                chunkFileNames: 'filament-skeleton-[name]-[hash].js',
            },
        },
    },
})
