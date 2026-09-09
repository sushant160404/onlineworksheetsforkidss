import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  try {
    await esbuild.build({
      entryPoints: [path.join(__dirname, 'server.ts')],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      outfile: path.join(__dirname, '../dist/ssr.cjs'),
      sourcemap: true,
      minify: true,
    });
    console.log('✓ SSR server built successfully');
  } catch (err) {
    console.error('✗ SSR build failed:', err);
    process.exit(1);
  }
}

build();
