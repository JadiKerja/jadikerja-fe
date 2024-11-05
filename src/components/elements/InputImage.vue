<script setup lang="ts">
import { ref } from 'vue'
import { useProfileStore } from '@/stores/profileStores'
import BackgroundProfile from '@/assets/images/BackgroundProfile.vue'
import PenIcon from '@/assets/images/PenIcon.vue'
import IconProfile from '@/assets/images/IconProfile.vue'

const profileStore = useProfileStore()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profileStore.setSelectedImage(file)
  }
}
</script>

<template>
  <div
    class="flex relative items-center justify-center w-[5.9375rem] h-[6.1875rem]"
  >
    <div
      class="absolute w-full h-full rounded-full"
      :style="{
        backgroundImage: profileStore.selectedImage
          ? `url(${profileStore.selectedImageUrl})`
          : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <BackgroundProfile
        v-if="!profileStore.selectedImage"
        class="w-full h-full"
      />
    </div>

    <IconProfile v-if="!profileStore.selectedImage" class="absolute" />

    <PenIcon class="absolute bottom-0 right-0 cursor-pointer" />

    <input
      type="file"
      accept="image/*"
      class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      @change="handleFileChange"
    />
  </div>
</template>