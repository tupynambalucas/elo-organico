import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tailwindcss(),
      react(),
      svgr({
        include: '**/*.svg?react',
      }),
    ],

    resolve: {
      tsconfigPaths: true,
    },

    optimizeDeps: {
      exclude: ['@elo-organico/portal-core'],
    },

    base: './',

    server: {
      host: true,
      port: 5174,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      port: 4174,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.names ? assetInfo.names[0] : assetInfo.name || '';
            let extType = info.split('.').at(1) || 'unknown';

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            } else if (/css|scss|sass/i.test(extType)) {
              extType = 'css';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              extType = 'fonts';
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
  };
});
