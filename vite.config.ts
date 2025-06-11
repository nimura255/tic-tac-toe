import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const srcPath = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $app: path.resolve(srcPath, 'app'),
      $entities: path.resolve(srcPath, 'entities'),
      $features: path.resolve(srcPath, 'features'),
      $pages: path.resolve(srcPath, 'pages'),
      $shared: path.resolve(srcPath, 'shared'),
      $widgets: path.resolve(srcPath, 'widgets'),
    },
  },
});
