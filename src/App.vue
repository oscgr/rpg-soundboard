<template>
  <v-app>
    <AppBar v-model="tab" />
    <v-main>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <Soundboard />
        </v-tabs-window-item>
        <v-tabs-window-item>
          <div class="text-center mt-5">
            Coming soon...
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import AppBar from '@/AppBar.vue'
  import Soundboard from '@/pages/Soundboard.vue'

  const tab = shallowRef()

</script>
