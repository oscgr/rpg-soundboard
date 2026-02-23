<template>
  <v-app>
    <v-main>
      <v-tabs v-model="tab" align-tabs="center">
        <v-tab>Accueil</v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <router-view />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { shallowRef } from 'vue'

  const tab = shallowRef()
</script>
