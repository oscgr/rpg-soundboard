import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    newVersionAvailable: {
      content: 'A new version is available. Would you like to reload the page to fetch it? The current version will still work until you reload this page.',
      yes: 'Yes',
      no: 'No',
    },
    menu: 'Parameters',
    save: 'Save',
    cancel: 'Cancel',
    soundboard: 'Soundboard',
    motionDetector: 'Motion detector',
    toggleTheme: 'Toggle theme',
    linkToGithub: 'Link to source',
    globalMute: 'Global mute',
    addSound: 'Add sound',
    addSoundDialog: {
      constraintError: 'Name \'{0}\' already exists',
      name: 'Name',
      fileTypeError: 'File {0} is not audio.',
      noFileError: 'No file uploaded.',
    },
    noSound: 'No sound available',
    audioPlayer: {
      delete: 'Delete',
      rateTooltip: 'Rate (reset to 1)',
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      loop: 'Loop',
    },
  },
  fr: {
    newVersionAvailable: {
      content: 'Une nouvelle version est disponible. Souhaitez-vous recharger la page pour la télécharger? La version actuelle continuera de fonctionner jusqu\'à ce que vous rechargez cette page.',
      yes: 'Oui',
      no: 'Non',
    },
    menu: 'Paramètres',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    motionDetector: 'Détecteur de mouvements',
    toggleTheme: 'Changer le thème',
    globalMute: 'Couper le son global',
    linkToGithub: 'Lien vers la source',
    soundboard: 'Soundboard',
    addSound: 'Ajouter un son',
    addSoundDialog: {
      constraintError: 'Le nom "{0}" est déjà utilisé',
      name: 'Nom',
      fileTypeError: 'Le fichier {0} n\'est pas une piste audio.',
      noFileError: 'Aucun fichier téléversé.',
    },
    noSound: 'Aucun son disponible',
    audioPlayer: {
      delete: 'Supprimer',
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
