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
      <VersionChecker />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import AppBar from '@/AppBar.vue'
  import VersionChecker from '@/components/VersionChecker.vue'
  import Soundboard from '@/pages/Soundboard.vue'

  const tab = shallowRef()
</script>
<style lang="css">
html, body, .v-application {
  font-family: "Barlow", sans-serif !important;
}

/* Target Vuetify's specific typography utility classes.
  We use a wildcard for classes starting with "text-" so we
  don't accidentally override icon fonts like ".mdi"
*/
.v-application [class*="text-"] {
  font-family: "Barlow", sans-serif !important;
}

/* Also ensure standard buttons pick up the font */
.v-btn {
  font-family: "Barlow", sans-serif !important;
}
</style>
