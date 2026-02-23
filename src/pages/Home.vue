<template>
  <v-container class="fill-height" max-width="900">
    <v-row>
      <v-col v-for="sound in sounds" :key="sound.id" cols="6">
        <AudioPlayer :sound="sound" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts" setup>
  import { useObservable } from '@vueuse/rxjs'
  import { liveQuery } from 'dexie'
  import AudioPlayer from '@/components/AudioPlayer.vue'
  import { db, type Sound } from '@/store/db.ts'

  const sounds = useObservable<Sound[]>(liveQuery(() => db.sounds.toArray()))
</script>
