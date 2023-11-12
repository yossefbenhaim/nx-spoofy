/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  const env = dotenv.config({ path: `.env.${mode}` }).parsed;

  return {
    cacheDir: '../../node_modules/.vite/nx-spoofy',
    server: {
      port: 4200,
      host: 'localhost',
      fs: {
        allow: ['../'],
      },
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },
    define: {
      'process.env': JSON.stringify(env),
    },

    plugins: [react(), nxViteTsPaths(), tsconfigpaths()],

    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
