import BugsnagPerformance from '@bugsnag/browser-performance'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

if (!import.meta.env.DEV) {
  Bugsnag.start({
    apiKey: '39a2ddcc3c0c0089f1e8033862eb50f5',
    plugins: [new BugsnagPluginVue()],
  })
  BugsnagPerformance.start({ apiKey: '39a2ddcc3c0c0089f1e8033862eb50f5' })
}
