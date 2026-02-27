<template>
  <v-app-bar>
    <v-row no-gutters>
      <v-col class="d-md-flex align-center justify-start pl-4 d-none" cols="3">
        <v-slider
          :key="`global-vol-slider-${mdAndUp?'not-mob':'mob'}`"
          v-model="volume"
          density="compact"
          hide-details
          :max="1"
          :min="0"
          :step="0.001"
          :width="mdAndUp ? 180 : ''"
        >
          <template #prepend>
            <v-btn
              v-tooltip:left="{openDelay: 200, text: t('globalMute')}"
              density="comfortable"
              :icon="isGloballyMuted ? mdiVolumeOff : mdiVolumeHigh"
              variant="text"
              @click="toggleGlobalMute"
            />
          </template>
        </v-slider>
      </v-col>
      <v-col
        class="d-flex align-center"
        :class="{'justify-space-between': smAndDown, 'justify-center': mdAndUp}"
        :cols="mdAndUp ? 6 : 12"
      >
        <v-tabs
          v-model="tab"
          align-tabs="center"
          density="comfortable"
          stacked
        >
          <v-tab>
            <v-icon :icon="mdiSurroundSound" />
            <span v-text="t('soundboard')" />
          </v-tab>
          <v-tab>
            <v-icon :icon="mdiWifiStrength3" />
            <span v-text="t('motionDetector')" />
          </v-tab>
        </v-tabs>
        <v-bottom-sheet
          :close-on-content-click="false"
          :disabled="mdAndUp"
          eager
          min-width="300px"
        >
          <template #activator="{props: menuProps, isActive}">
            <v-btn v-if="smAndDown" :icon="isActive ? mdiClose : mdiMenu" v-bind="menuProps" variant="flat" />
          </template>
          <v-list>
            <v-list-item>
              <v-slider
                :key="`global-vol-slider-${mdAndUp?'not-mob':'mob'}`"
                v-model="volume"
                class="mx-4"
                density="compact"
                hide-details
                :max="1"
                :min="0"
                :step="0.001"
                :width="mdAndUp ? 180 : ''"
              >
                <template #prepend>
                  <v-btn
                    v-tooltip:top="{openDelay: 200, text: t('globalMute')}"
                    density="comfortable"
                    :icon="isGloballyMuted ? mdiVolumeOff : mdiVolumeHigh"
                    variant="text"
                    @click="toggleGlobalMute"
                  />
                </template>
              </v-slider>
            </v-list-item>
            <v-divider />
            <v-list-item
              :append-icon="theme.current.value.dark ? mdiMoonWaningCrescent : mdiWeatherSunny"
              :title="t('toggleTheme')"
              @click="theme.toggle(['light', 'dark'])"
            />
            <v-list-item
              :append-icon="mdiGithub"
              href="https://github.com/oscgr/rpg-soundboard"
              target="_blank"
              :title="t('linkToGithub')"
            />
          </v-list>
        </v-bottom-sheet>
      </v-col>
      <v-col class="d-none d-md-flex justify-end align-center pr-4" cols="3">
        <v-btn
          v-tooltip:left="{openDelay: 200, text: t('toggleTheme')}"
          :icon="theme.current.value.dark ? mdiMoonWaningCrescent : mdiWeatherSunny"
          variant="flat"
          @click="theme.toggle(['light', 'dark'])"
        />
        <v-btn
          v-tooltip:left="{openDelay: 200, text: t('linkToGithub')}"
          href="https://github.com/oscgr/rpg-soundboard"
          :icon="mdiGithub"
          target="_blank"
          variant="flat"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
  import {
    mdiClose, mdiGithub,
    mdiMenu,
    mdiMoonWaningCrescent,
    mdiSurroundSound,
    mdiVolumeHigh,
    mdiVolumeOff, mdiWeatherSunny,
    mdiWifiStrength3,
  } from '@mdi/js'
  import { useSessionStorage, useToggle } from '@vueuse/core'
  import { watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay, useTheme } from 'vuetify/framework'

  const tab = defineModel()
  const theme = useTheme()
  const { mdAndUp, smAndDown } = useDisplay()
  const [isGloballyMuted, toggleGlobalMute] = useToggle()

  const { t } = useI18n()

  const volume = useSessionStorage('global-volume', 1)

  watch(volume, v => {
    Howler.volume(v)
  })

  watch(isGloballyMuted, m => {
    Howler.mute(m)
  })
</script>
