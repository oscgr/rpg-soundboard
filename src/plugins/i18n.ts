import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
    },
  },
}

export default createI18n({
  legacy: false,
  locale: navigator.language?.slice(0, 2),
  fallbackLocale: 'en',
  messages,
})
