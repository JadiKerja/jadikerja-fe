<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStores'
import { computed } from 'vue'
import InputImage from '@/components/elements/InputImage.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import BackButton from '@/components/elements/button/BackButton.vue'

const profileStore = useProfileStore()
const selectedImage = computed(() => profileStore.selectedImage)

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profileStore.setSelectedImage(file)
  }
}

const emit = defineEmits(['back'])
</script>

<template>
  <div class="flex flex-col w-full min-h-screen items-center py-12 px-7 gap-4">
    <BackButton @click="emit('back')" class="self-start absolute" />
    <p class="text-black text-[1.25rem] font-bold tracking-[.0125rem]">
      Isi data diri dulu yuk!
    </p>
    <form
      method="POST"
      enctype="multipart/form-data"
      class="flex flex-col items-center gap-5 w-full"
    >
      <InputImage />
      <InputAuth
        label="Nama Lengkap"
        placeholder="Nama Lengkap"
        field="fullName"
      />
      <InputAuth
        label="Tanggal Lahir"
        placeholder="DD/MM/YYYY"
        field="birthDate"
        type="date"
      />
      <InputAuth label="Domisili" placeholder="Domisili" field="location" />
      <InputAuth
        label="No. Telepon"
        placeholder="No. Telepon"
        field="phoneNumber"
      />
      <button
        type="submit"
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
      >
        Simpan
      </button>
    </form>
  </div>
</template>
