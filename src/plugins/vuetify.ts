/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { en, fr } from 'vuetify/locale'
import 'vuetify/styles'
import '@fontsource/barlow/latin-100.css'
import '@fontsource/barlow/latin-200.css'
import '@fontsource/barlow/latin-300.css'
import '@fontsource/barlow/latin-400.css'
import '@fontsource/barlow/latin-500.css'
import '@fontsource/barlow/latin-600.css'
import '@fontsource/barlow/latin-700.css'
import '@fontsource/barlow/latin-800.css'
import '@fontsource/barlow/latin-900.css'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: navigator.language?.slice(0, 2),
    fallback: 'en',
    messages: { en, fr },
  },
  components: {
    VFileUpload,
  },
  theme: {
    defaultTheme: 'system',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
