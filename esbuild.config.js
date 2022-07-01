const { build, analyzeMetafile } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { copy } = require('esbuild-plugin-copy');

build({
  entryPoints: ['./src/index.ts'],
  outdir: './dist/',
  bundle: true,
  minify: true,
  treeShaking: true,
  metafile: true,
  keepNames: true,
  platform: 'node',
  plugins: [
    nodeExternalsPlugin(),
    copy({
      resolveFrom: 'cwd',
      assets: [
        { from: 'package.json', to: 'dist/package.json' },
        { from: 'README.md', to: 'dist/README.md' },
        { from: 'LICENSE', to: 'dist/LICENSE' },
      ],
    }),
  ],
}).then(result => analyzeMetafile(result.metafile).then(console.log));
