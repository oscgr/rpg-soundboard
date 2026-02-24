<template>
  <v-app>
    <v-main>
      <v-row no-gutters>
        <v-col class="d-md-flex align-center justify-start pl-4 d-none" cols="3">
          <Teleport defer :disabled="mdAndUp" to="#phone-menu-global-vol">
            <v-slider
              :key="`global-vol-slider-${mdAndUp?'not-mob':'mob'}`"
              v-model="volume"
              density="compact"
              hide-details
              :max="1"
              :min="0"
              :width="mdAndUp ? 180 : ''"
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
          </Teleport>
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
            show-arrows
            stacked
          >
            <v-tab>
              <v-icon :icon="mdiSurroundSound" />
              <span v-text="$t('soundboard')" />
            </v-tab>
            <v-tab>
              <v-icon :icon="mdiMotionSensor" />
              <span v-text="$t('motionDetector')" />
            </v-tab>
          </v-tabs>
          <v-menu
            attach
            :close-on-content-click="false"
            :disabled="mdAndUp"
            eager
            min-width="300px"
          >
            <template #activator="{props: menuProps, isActive}">
              <v-btn v-if="smAndDown" :icon="isActive ? mdiMenuClose : mdiMenu" v-bind="menuProps" variant="flat" />
            </template>
            <v-card min-width="300px">
              <div id="phone-menu-global-vol" class="py-1 mx-4" />
              <v-divider />
              <v-list>
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
            </v-card>
          </v-menu>
        </v-col>
        <v-col class="d-none d-md-flex justify-end align-center pr-4" cols="3">
          <v-btn
            :icon="theme.current.value.dark ? mdiMoonWaningCrescent : mdiWeatherSunny"
            variant="flat"
            @click="theme.toggle(['light', 'dark'])"
          />
          <v-btn href="https://github.com/oscgr/rpg-soundboard" :icon="mdiGithub" target="_blank" variant="flat" />
        </v-col>
      </v-row>
      <v-divider />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <Soundboard />
        </v-tabs-window-item>
        <v-tabs-window-item>
          <div class="text-center mt-5">
            Comming soon...
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {
    mdiGithub,
    mdiMenu,
    mdiMenuClose,
    mdiMoonWaningCrescent,
    mdiMotionSensor,
    mdiSurroundSound,
    mdiVolumeHigh,
    mdiVolumeOff,
    mdiWeatherSunny,
  } from '@mdi/js'
  import { useSessionStorage, useToggle } from '@vueuse/core'
  import { shallowRef, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay, useTheme } from 'vuetify/framework'
  import Soundboard from '@/pages/Soundboard.vue'

  const tab = shallowRef()
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
