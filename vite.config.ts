// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Tailwind Fluid',
      fileName: 'tailwind-fluid',
    },
    rollupOptions: {
      external: ['tailwindcss'],
      output: {
        globals: {
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
  plugins: [
    dts(),
  ],
})
