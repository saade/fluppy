import esbuild from 'esbuild'

const isDev = process.argv.includes('--dev')

const options = {
    entryPoints: ['resources/js/index.js'],
    outfile: 'resources/dist/components/filament-skeleton.js',
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    treeShaking: true,
    minify: !isDev,
    sourcemap: isDev ? 'inline' : false,
    define: {
        'process.env.NODE_ENV': isDev ? `'development'` : `'production'`,
    },
}

if (isDev) {
    const context = await esbuild.context(options)

    await context.watch()

    console.log(`Watching ${options.entryPoints[0]}`)
} else {
    await esbuild.build(options)

    console.log(`Built ${options.outfile}`)
}
