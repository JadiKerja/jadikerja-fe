import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const selectedImage = ref<File | null>(null)
  const selectedImageUrl = ref<string | null>(null)

  function setSelectedImage(file: File) {
    selectedImage.value = file
    selectedImageUrl.value = URL.createObjectURL(file)
  }

  function clearSelectedImage() {
    selectedImage.value = null
  }

  return {
    selectedImage,
    selectedImageUrl,
    setSelectedImage,
    clearSelectedImage,
  }
})
