<template>
  <v-dialog v-model="dialog" :fullscreen="mobile" max-width="900px" @after-leave="onAfterLeave">
    <template #activator="{props}">
      <v-btn :append-icon="mdiPlus" :text="$t('addSound')" v-bind="props" />
    </template>
    <v-form ref="form" @submit.prevent="save">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span v-text="$t('addSound')" />
          <v-btn :icon="mdiClose" variant="text" @click="dialog = false" />
        </v-card-title>
        <v-card-text>
          <v-file-upload
            v-model="file"
            class="mb-4"
            :density="file ? 'compact' : 'comfortable'"
            filter-by-type="audio/*"
            :icon="mdiCloudUploadOutline"
            :multiple="false"
            @rejected="onFileUploadRejected"
          />
          <v-expand-transition>
            <div v-show="!!fileError" class="text-error" v-text="fileError" />
          </v-expand-transition>
          <v-expand-transition>
            <div v-if="!!file">
              <v-text-field
                v-model="name"
                :label="$t('addSoundDialog.name')"
                :rules="[rules.required(), rules.maxLength(255), () => (constraintError === name) ? $t('addSoundDialog.constraintError', [constraintError]) : true]"
              >
                <template v-if="singleFile?.name" #details>
                  <span class="text-decoration-underline cursor-pointer" @click="name = singleFile?.name?.split('.')?.[0]" v-text="singleFile?.name?.split('.')?.[0]" />
                </template>
              </v-text-field>
            </div>
          </v-expand-transition>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :text="$t('cancel')" @click="dialog = false" />
          <v-btn :text="$t('save')" type="submit" variant="outlined" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
  import type { VForm } from 'vuetify/components'
  import type { Sound } from '@/store/db.ts'
  import { mdiClose, mdiCloudUploadOutline, mdiPlus } from '@mdi/js'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify/framework'
  import { useRules } from 'vuetify/labs/rules'
  import useDB from '@/store/useDB.ts'
  import fileUtils from '@/utils/fileUtils.ts'

  const form = ref<VForm>()
  const { mobile } = useDisplay()
  const rules = useRules()
  const dialog = ref<boolean>(false)
  const file = ref<File[] | File | undefined>()
  const name = ref<string | undefined>('')
  const fileError = ref<false | string>(false)
  const constraintError = ref<false | string>(false)
  const { addSound } = useDB()
  const { t } = useI18n()

  const singleFile = computed(() => Array.isArray(file.value) ? file.value[0] : file.value)

  // Drag-and-drop from outside context
  function open (externalFile: File) {
    dialog.value = true
    file.value = externalFile
  }

  watch(file, v => {
    if (v) {
      fileError.value = false
    }
  })
  function onFileUploadRejected (files: File | File[]) {
    const _singleFile = Array.isArray(files) ? files[0] : files
    if (!_singleFile)
      return // not happening?
    fileError.value = t('addSoundDialog.fileTypeError', [_singleFile.name])
  }

  function onAfterLeave () {
    form.value?.reset()
    file.value = undefined
    fileError.value = false
    constraintError.value = false
  }

  async function save () {
    const result = await form.value?.validate()
    if (!result?.valid)
      return
    if (!singleFile.value) {
      fileError.value = t('addSoundDialog.noFileError')
      return
    }
    if (!name.value)
      return // should never happen thanks to form validation & rules
    const sound = {
      name: name.value,
      content: await fileUtils.toBase64(singleFile.value),
      preferences: {},
    } satisfies Omit<Sound, 'id'>
    try {
      await addSound(sound)
      dialog.value = false
    } catch (error: any) {
      if (error?.name === 'ConstraintError') {
        constraintError.value = name.value
        await form.value?.validate() // ensure error is displayed
      } else {
        throw error
      }
    }
  }

  defineExpose({ open })
</script>
