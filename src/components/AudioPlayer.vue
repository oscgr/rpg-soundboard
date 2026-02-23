<template>
  <v-card :elevation="isPlaying ? 2 : 1" :loading="loading" rounded>

    <v-card-title class="font-weight-light d-flex pa-2">Face-hugger cris
      <v-spacer />
      <v-menu open-on-hover>
        <template #activator="{props: menuProps}">
          <v-btn
            density="comfortable"
            flat
            :icon="mdiDotsVertical"
            variant="text"
            v-bind="menuProps"
          />
        </template>
        <v-list density="compact">
          <!--          <v-list-item title="" />-->
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
          v-tooltip:left="{openDelay: 200, text: isPlaying ? 'Pause' : 'Play'}"
          density="comfortable"
          :disabled="loading"
          flat
          :icon="isPlaying ? mdiPause : mdiPlay"
          variant="text"
          @click="togglePlay()"
        />
      </template>
      <template #append>
        <v-btn
          v-tooltip:right="{openDelay: 200, text: 'Loop'}"
          :color="isLooping ? 'primary' : ''"
          density="comfortable"
          :disabled="loading"
          flat
          :icon="mdiSync"
          variant="text"
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
        thumb-label
      >
        <template #prepend>
          <v-btn
            v-tooltip:left="{openDelay: 200, text: 'Mute'}"
            density="comfortable"
            :disabled="loading"
            flat
            :icon="isMuted ? mdiVolumeOff : mdiVolumeHigh"
            variant="text"
            @click="toggleMute()"
          />
        </template>
      </v-slider>
      <div class="px-4" />
      <v-slider
        v-model="rate"
        density="comfortable"
        :disabled="loading"
        hide-details
        :max="1.2"
        :min="0.8"
        :step="0.02"
        thumb-label
      >
        <template #append>
          <v-btn
            v-tooltip:right="{openDelay: 200, text: 'Rate (reset to 1)'}"
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

  import {
    mdiDotsVertical,
    mdiPause,
    mdiPlay,
    mdiSpeedometer,
    mdiSpeedometerMedium,
    mdiSpeedometerSlow,
    mdiSync,
    mdiVolumeHigh,
    mdiVolumeOff,
  } from '@mdi/js'
  import { useToggle } from '@vueuse/core'
  import { Howl } from 'howler'
  import { onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'

  let soundInstance: Howl | null = null
  let animationFrameId: number

  const [isLooping, toggleLoop] = useToggle() // todo var
  const [isMuted, toggleMute] = useToggle() // todo var
  const [isPlaying, togglePlay] = useToggle() // todo var

  const props = defineProps<{
    sound: string
  }>()

  const state = reactive({
    currentTime: 0,
    volume: 1, // todo var
    rate: 1,
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
  })
  watch(() => state.rate, r => {
    if (soundInstance)
      soundInstance.rate(r)
  })
  watch(isMuted, m => {
    if (soundInstance)
      soundInstance.mute(m)
  })
  watch(isLooping, l => {
    if (soundInstance)
      soundInstance.loop(l)
  })
  watch(isPlaying, p => {
    if (!soundInstance)
      return

    if (soundInstance.playing()) {
      soundInstance.pause()
    } else {
      soundInstance.play()
    }
  })

  watch(() => props.sound, () => {
    initSoundInstance()
  })

  // On init + sound change
  function initSoundInstance () {
    soundInstance = new Howl({
      src: [props.sound],
      html5: false,
      autoplay: false,
      volume: 1, // todo var
      loop: false, // todo var
      rate: 1, // todo var
      mute: false, // todo var
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
    volume,
    duration,
    loading,
    rate,
  } = toRefs(state)

</script>
