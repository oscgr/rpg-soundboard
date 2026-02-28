<template>
  <v-card :elevation="isPlaying ? 2 : 1" :loading="loading" rounded>

    <v-card-title class="font-weight-light align-center d-flex pa-2 w-100">
      <span v-tooltip:top="{openDelay: 2000, text: sound.name}" class="text-truncate" v-text="sound.name" />
      <v-spacer />
      <v-menu>
        <template #activator="{props: menuProps}">
          <v-btn
            :aria-label="t('menu')"
            density="comfortable"
            :icon="mdiDotsVertical"
            variant="text"
            v-bind="menuProps"
          />
        </template>
        <v-list density="compact">
          <v-list-item :append-icon="mdiTrashCan" :title="t('audioPlayer.delete')" @click="deleteSound(sound.id)" />
        </v-list>
      </v-menu>
    </v-card-title>
    <v-slider
      density="comfortable"
      hide-details
      :max="duration"
      :min="0"
      :model-value="currentTime"
      thumb-label
      @update:model-value="seek"
    >
      <template #prepend>
        <v-btn
          v-tooltip:left="{openDelay: 200, text: isPlaying ? t('audioPlayer.pause') : t('audioPlayer.play')}"
          :aria-label="t('audioPlayer.pause')"
          density="comfortable"
          :disabled="loading"
          :icon="isPlaying ? mdiPause : mdiPlay"
          variant="text"
          @click="togglePlay()"
        />
      </template>
      <template #append>
        <v-btn
          v-tooltip:right="{openDelay: 200, text: t('audioPlayer.loop')}"
          :aria-label="t('audioPlayer.loop')"
          density="comfortable"
          :disabled="loading"
          :icon="mdiRepeatVariant"
          :variant="isLooping ? 'outlined' : 'text'"
          @click="toggleLoop()"
        />

      </template>
    </v-slider>
    <div class="d-flex">
      <v-slider
        v-model="volume"
        density="comfortable"
        :disabled="loading"
        hide-details
        :max="1"
        :min="0"
        :step="0.001"
      >
        <template #prepend>
          <v-btn
            v-tooltip:left="{openDelay: 200, text: t('audioPlayer.mute')}"
            :aria-label="t('audioPlayer.mute')"
            density="comfortable"
            :disabled="loading"
            :icon="isMuted ? mdiVolumeOff : mdiVolumeHigh"
            variant="text"
            @click="toggleMute()"
          />
        </template>
      </v-slider>
      <div v-show="smAndUp" class="px-4" />
      <v-slider
        v-model="rate"
        density="comfortable"
        :disabled="loading"
        hide-details
        :max="1.2"
        :min="0.8"
        :step="0.01"
        thumb-label
      >
        <template #thumb-label="{modelValue}">
          x{{ modelValue }}
        </template>
        <template #append>
          <v-btn
            v-tooltip:right="{openDelay: 200, text: t('audioPlayer.rateTooltip')}"
            :aria-label="t('audioPlayer.rateTooltip')"
            density="comfortable"
            :disabled="loading || rate === 1"
            :icon="(rate === 1) ? mdiSpeedometerMedium : (rate > 1 ? mdiSpeedometer : mdiSpeedometerSlow)"
            variant="text"
            @click="() => rate = 1"
          />
        </template>
      </v-slider>
    </div>
  </v-card>
</template>
<script setup lang="ts">

  import type { Sound } from '@/store/db.ts'
  import {
    mdiDotsVertical,
    mdiPause,
    mdiPlay,
    mdiRepeatVariant,
    mdiSpeedometer,
    mdiSpeedometerMedium,
    mdiSpeedometerSlow,
    mdiTrashCan,
    mdiVolumeHigh,
    mdiVolumeOff,
  } from '@mdi/js'
  import { useDebounceFn, useToggle } from '@vueuse/core'
  import { Howl } from 'howler'
  import { onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import useDB from '@/store/useDB.ts'

  const { t } = useI18n()
  const { smAndUp } = useDisplay()

  let soundInstance: Howl | null = null
  let animationFrameId: number

  const { deleteSound, patchSoundPreferences } = useDB()

  const props = defineProps<{
    sound: Sound
  }>()

  const [isLooping, toggleLoop] = useToggle(props.sound.preferences.loop)
  const [isMuted, toggleMute] = useToggle(props.sound.preferences.mute)
  const [isPlaying, togglePlay] = useToggle()

  const state = reactive({
    currentTime: 0,
    volume: props.sound.preferences.volume || 1,
    rate: props.sound.preferences.rate || 1,
    duration: 0,
    loading: true,
  })

  // Seek + progress updates
  function seek (value: number) {
    if (!soundInstance)
      return

    currentTime.value = value
    soundInstance.seek(value)
  }

  function updateProgress () {
    if (!soundInstance || !soundInstance.playing()) return

    currentTime.value = soundInstance.seek()

    // Loop the function to match the browser's refresh rate
    animationFrameId = requestAnimationFrame(updateProgress)
  }

  // toggle watchers
  watch(() => state.volume, v => {
    if (soundInstance)
      soundInstance.volume(v)

    onPreferenceChange()
  })

  watch(() => state.rate, r => {
    if (soundInstance)
      soundInstance.rate(r)

    onPreferenceChange()
  })

  watch(isMuted, m => {
    if (soundInstance)
      soundInstance.mute(m)

    onPreferenceChange()
  })

  watch(isLooping, l => {
    if (soundInstance)
      soundInstance.loop(l)

    onPreferenceChange()
  })

  watch(isPlaying, p => {
    if (!soundInstance)
      return

    if (p && !soundInstance.playing()) {
      soundInstance.play()
    } else if (!p && soundInstance.playing()) {
      soundInstance.pause()
    }
  })

  watch(() => props.sound.content, () => {
    initSoundInstance()
  })

  const onPreferenceChange = useDebounceFn(() => {
    patchSoundPreferences(props.sound.id, {
      volume: state.volume,
      rate: state.rate,
      mute: isMuted.value,
      loop: isLooping.value,
    })
  }, 200)

  // On init + sound change
  function initSoundInstance () {
    soundInstance = new Howl({
      src: [props.sound.content],
      html5: false,
      autoplay: false,
      volume: state.volume,
      loop: isLooping.value,
      rate: state.rate,
      mute: isMuted.value,
      onload: () => {
        state.loading = false
        state.duration = soundInstance!.duration()
      },
      onplay: () => {
        updateProgress()
      },
      onpause: () => {
        cancelAnimationFrame(animationFrameId)
      },
      onend: () => {
        if (!isLooping.value) {
          state.currentTime = 0
          togglePlay(false)
          cancelAnimationFrame(animationFrameId)
        }
      },
    })
  }

  onMounted(() => {
    initSoundInstance()
  })

  onUnmounted(() => {
    if (soundInstance)
      soundInstance.unload()
  })

  const {
    currentTime,
    duration,
    volume,
    rate,
    loading,
  } = toRefs(state)

</script>
