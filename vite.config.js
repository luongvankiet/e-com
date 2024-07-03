import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: 'e-com.test',
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, 'resources/js'),
      'ziggy-js': path.resolve('vendor/tightenco/ziggy'),
    },
  },
});
