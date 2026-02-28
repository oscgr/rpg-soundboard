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
        manualChunks: id => {
          if (id.includes('howler') || id.includes('dexie')) {
            return 'vendors'
          }
          if (id.includes('node_modules/vuetify')) {
            return 'vuetify'
          }
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue') || id.includes('node_modules/vue-i18n')) {
            return 'vue'
          }
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
    Vuetify({
      autoImport: true,
    }),
    {
      name: 'generate-version',
      generateBundle () {
        this.emitFile({
          type: 'asset',
          fileName: `version`,
          source: Date.now() + '',
        })
      },
    },
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  server: {
    port: 8401,
    strictPort: true,
  },
})
