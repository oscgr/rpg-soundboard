// Types
import type { App } from 'vue'
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import Bugsnag from '@bugsnag/js'

import { createRulesPlugin } from 'vuetify/labs/rules'
import i18n from './i18n'
// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  if (!import.meta.env.DEV) {
    const bugsnagVue = Bugsnag.getPlugin('vue')
    // @ts-ignore
    app.use(bugsnagVue)
  }
  app.use(vuetify)
  app.use(createRulesPlugin({ /* options */}, vuetify.locale))
  app.use(i18n)
}
