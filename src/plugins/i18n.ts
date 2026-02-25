import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    save: 'Save',
    cancel: 'Cancel',
    soundboard: 'Soundboard',
    motionDetector: 'Motion detector',
    toggleTheme: 'Toggle theme',
    linkToGithub: 'Link to source',
    globalMute: 'Global mute',
    addSound: 'Add sound',
    addSoundDialog: {
      name: 'Name',
      fileTypeError: 'File {0} is not audio.',
      noFileError: 'No file uploaded.',
    },
    noSound: 'No sound available',
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
      rateTooltip: 'Rate (reset to 1)',
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      loop: 'Loop',
    },
  },
  fr: {
    save: 'Sauvegarder',
    cancel: 'Annuler',
    motionDetector: 'Détecteur de mouvements',
    toggleTheme: 'Changer le thème',
    globalMute: 'Couper le son global',
    linkToGithub: 'Lien vers la source',
    soundboard: 'Soundboard',
    addSound: 'Ajouter un son',
    addSoundDialog: {
      name: 'Nom',
      fileTypeError: 'Le fichier {0} n\'est pas une piste audio.',
      noFileError: 'Aucun fichier téléversé.',
    },
    noSound: 'Aucun son disponible',
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
      rateTooltip: 'Changement de vitesse (reset à x1)',
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
