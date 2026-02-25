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
import 'unfonts.css'

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
