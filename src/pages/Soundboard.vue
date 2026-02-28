<template>
  <v-container class="fill-height" fluid>
    <v-row class="w-100">
      <v-col v-for="sound in sounds" :key="sound.id" :cols="cols">
        <AudioPlayer :sound="sound" />
      </v-col>
      <v-col v-if="sounds.length === 0" cols="12">
        <v-empty-state :icon="mdiVolumeMute" :title="$t('noSound')" />
      </v-col>
      <v-col class="text-center" cols="12">
        <AddSoundDialog />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts" setup>
  import { mdiVolumeMute } from '@mdi/js'
  import { liveQuery } from 'dexie'
  import { computed, onUnmounted, ref } from 'vue'
  import { useDisplay } from 'vuetify/framework'
  import AddSoundDialog from '@/components/AddSoundDialog.vue'
  import AudioPlayer from '@/components/AudioPlayer.vue'
  import { db, type Sound } from '@/store/db.ts'

  const sounds = ref<Sound[]>([])
  const { mdAndUp, lgAndUp, xlAndUp } = useDisplay()

  const subscription = liveQuery(() => db.sounds.orderBy('name').toArray())
    .subscribe(result => {
      sounds.value = result
    })

  const cols = computed(() => {
    if (xlAndUp.value)
      return 3
    if (lgAndUp.value)
      return 4
    if (mdAndUp.value)
      return 6
    return 12
  })

  onUnmounted(() => {
    subscription.unsubscribe()
  })
</script>
