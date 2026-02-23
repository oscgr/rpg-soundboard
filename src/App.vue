<template>
  <v-app>
    <v-main>
      <v-row no-gutters>
        <v-col class="d-flex align-center justify-start pl-4" cols="3">
          <div>
            <v-slider
              v-model="volume"
              density="compact"
              hide-details
              :max="1"
              :min="0"
              :prepend-icon="mdiVolumeHigh"
              width="180"
            >
              <template #prepend>
                <v-btn
                  v-tooltip:left="{openDelay: 200, text: t('audioPlayer.mute')}"
                  density="comfortable"
                  :icon="isGloballyMuted ? mdiVolumeOff : mdiVolumeHigh"
                  variant="text"
                  @click="toggleGlobalMute()"
                />
              </template>

            </v-slider>
          </div>
        </v-col>
        <v-col cols="6">
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab>Accueil</v-tab>
          </v-tabs>
        </v-col>
        <v-col class="d-flex align-center justify-end pr-4" cols="3">
          <v-btn :icon="mdiWeatherSunny" variant="flat" @click="theme.toggle(['light', 'dark'])" />
        </v-col>
      </v-row>
      <v-divider />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <Soundboard />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { mdiVolumeHigh, mdiVolumeOff, mdiWeatherSunny } from '@mdi/js'
  import { useToggle } from '@vueuse/core'
  import { ref, shallowRef, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify/framework'
  import Soundboard from '@/pages/Soundboard.vue'

  const tab = shallowRef()
  const theme = useTheme()
  const [isGloballyMuted, toggleGlobalMute] = useToggle() // todo var

  const { t } = useI18n()
  const volume = ref(1)

  watch(volume, v => {
    Howler.volume(v)
  })

  watch(isGloballyMuted, m => {
    Howler.mute(m)
  })
</script>
