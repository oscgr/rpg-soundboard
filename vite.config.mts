import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-i18n'],
          ui: [
            'vuetify',
            'vuetify/components',
            'vuetify/directives',
          ],
          vendors: ['howler'],
          db: ['dexie'],
        },
        assetFileNames: assetInfo => {
          const fileNames = assetInfo.names || []

          if (fileNames.some(fn => /\.(woff2?)$/i.test(fn))) {
            // return it without the hash
            return 'assets/[name][extname]'
          }

          // default rollup
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 8401,
  },
})
