<template>
  <v-card :elevation="isPlaying ? 2 : 1" rounded>
    <audio
      ref="audioEl"
      :src="sound"
      @ended="onAudioEnded()"
      @loadedmetadata="onLoadedMetadata()"
      @timeupdate="onTimeUpdate()"
    />

    <v-card-title class="font-weight-light d-flex pa-2">Face-hugger cris
      <v-spacer />
      <v-menu open-on-hover>
        <template #activator="{props: menuProps}">
          <v-btn density="comfortable" flat :icon="mdiDotsVertical" v-bind="menuProps" />
        </template>
        <v-list density="compact">
          <!--          <v-list-item title="" />-->
        </v-list>
      </v-menu>
    </v-card-title>
    <v-slider
      density="comfortable"
      :disabled="!isLoaded"
      hide-details
      :max="duration"
      :min="0"
      :model-value="currentTime"
      thumb-label
      @update:model-value="seek"
    >
      <template #prepend>
        <v-btn
          v-if="isPlaying"
          density="comfortable"
          :disabled="!isLoaded"
          flat
          :icon="mdiPause"
          @click="onTogglePlayPause"
        />
        <v-btn
          v-else
          density="comfortable"
          :disabled="!isLoaded"
          flat
          :icon="mdiPlay"
          @click="onTogglePlayPause"
        />
      </template>
      <template #append>
        <v-btn
          v-tooltip="{openDelay: 200, text: 'Loop'}"
          :color="isLooping ? 'primary' : ''"
          density="comfortable"
          :disabled="!isLoaded"
          flat
          :icon="mdiSync"
          @click="toggleLoop()"
        />

      </template>
    </v-slider>
    <div class="d-flex">
      <v-slider
        v-model="volume"
        density="comfortable"
        :disabled="!isLoaded"
        hide-details
        :max="1"
        :min="0"
        thumb-label
      >
        <template #prepend>
          <v-btn
            density="comfortable"
            :disabled="!isLoaded"
            flat
            :icon="(volume > 0) ? mdiVolumeHigh : mdiVolumeOff"
            @click="() => volume = ((volume > 0) ? 0 : 1)"
          />
        </template>
      </v-slider>
      <div class="px-4" />
      <v-slider
        v-model="rate"
        density="comfortable"
        :disabled="!isLoaded"
        hide-details
        :max="1.2"
        :min="0.8"
        :step="0.02"
        thumb-label
      >
        <template #append>
          <v-btn
            density="comfortable"
            :disabled="!isLoaded"
            flat
            :icon="(rate === 1) ? mdiSpeedometerMedium : (rate > 1 ? mdiSpeedometer : mdiSpeedometerSlow)"
            @click="() => rate = 1"
          />
        </template>
      </v-slider>
    </div>
  </v-card>
</template>
<script setup lang="ts">

  import {
    mdiDotsVertical, mdiPause, mdiPlay,
    mdiSpeedometer, mdiSpeedometerMedium, mdiSpeedometerSlow, mdiSync, mdiVolumeHigh, mdiVolumeOff,
  } from '@mdi/js'
  import { useToggle } from '@vueuse/core'
  import { reactive, ref, toRefs, watch } from 'vue'

  const audioEl = ref<HTMLAudioElement>()

  const [isLooping, toggleLoop] = useToggle() // todo var

  defineProps<{
    sound: string
  }>()

  const state = reactive({
    currentTime: 0,
    volume: 1, // todo var
    rate: 1,
    duration: 0,
    isPlaying: false,
    isLoaded: false,
  })

  function onLoadedMetadata () {
    state.duration = audioEl.value?.duration || 0
    state.volume = audioEl.value?.volume || 1
    state.isLoaded = true
    if (audioEl.value) { // todo var||defaults
      audioEl.value.preservesPitch = false
    //   audioEl.value.playbackRate = 1
    }
  }

  function onTimeUpdate () {
    state.currentTime = audioEl.value?.currentTime || 0
  }

  function onAudioEnded () {
    state.currentTime = 0
    if (isLooping.value) {
      audioEl.value?.play()
    } else {
      state.isPlaying = false
    }
  }

  function onTogglePlayPause () {
    // Play or pause track depending on state
    if (state.isPlaying) {
      audioEl.value?.pause()
      state.isPlaying = false
    } else if (!state.isPlaying) {
      audioEl.value?.play()
      state.isPlaying = true
    }
  }
  function seek (value: number) {
    if (!audioEl.value)
      return
    audioEl.value.currentTime = value
    state.currentTime = value
  }

  const {
    currentTime,
    volume,
    duration,
    isPlaying,
    isLoaded,
    rate,
  } = toRefs(state)

  watch(() => state.volume, v => {
    if (!audioEl.value)
      return
    audioEl.value.volume = v
  })
  watch(() => state.rate, r => {
    if (!audioEl.value)
      return
    audioEl.value.playbackRate = r
  })
</script>
