import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],

  build: {
    rollupOptions: {
      output: {
        chunkFileNames: ({ name }) => {
          console.info(`nameCf: ${JSON.stringify(name, null, 2)}`);

          if (/all.*/.test(name)) {
            return 'locales/[name].js';
          }

          return 'chunks/[name]-[hash].js';
        },
        entryFileNames: 'entry/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (!name) {
            return 'assets/[name]-[hash][extname]';
          }

          if (name.match(/^all\..*\.js$/)) {
            return 'locales/[name]-[hash][extname]';
          }

          if (/\.(gif|jpe?g|png|svg)/.test(name)) {
            return 'images/[name]-[hash][extname]';
          }

          if (/\.(css)$/.test(name)) {
            return 'styles/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
