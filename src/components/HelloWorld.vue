<template>
  <v-container class="fill-height" max-width="900">
    <v-row>
      <v-col v-for="sound in ['/samples/schrieks.ogg', '/samples/motion.ogg']" :key="sound" cols="4">
        <AudioPlayer :sound="sound" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
  import AudioPlayer from '@/components/AudioPlayer.vue'

</script>
