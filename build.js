const build = await Bun.build({
    entrypoints: ["src/index.ts"],
    outdir: "./",
    minify: true,
});

if (!build.success) {
    console.log('build failed', build);
    process.exit(1);
}
