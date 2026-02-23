import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    audioPlayer: {
      edit: {
        title: 'Edit',
      },
      defaults: {
        rateEnabled: 'Enable rate editing',
        loop: 'Enable loop',
        rate: 'Set default rate to chosen one',
        volume: 'Set default volume to chosen one',
      },
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      loop: 'Loop',
    },
  },
  fr: {
    audioPlayer: {
      edit: {
        title: 'Modifier',
      },
      defaults: {
        rateEnabled: 'Activer le changement de vitesse',
        loop: 'Activer la boucle par défaut',
        rate: 'Mettre la vitesse choisie par défaut',
        volume: 'Mettre le volume choisi par défaut',
      },
      play: 'Jouer',
      pause: 'Mettre en pause',
      mute: 'Couper le son',
      loop: 'Jouer en boucle',
    },
  },
}

export default createI18n({
  legacy: false,
  locale: navigator.language?.slice(0, 2),
  fallbackLocale: 'en',
  messages,
})
