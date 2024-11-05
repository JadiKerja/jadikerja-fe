import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const selectedImage = ref<string | null>(null)

  function setSelectedImage(file: File) {
    selectedImage.value = URL.createObjectURL(file)
  }

  function clearSelectedImage() {
    selectedImage.value = null
  }

  return { selectedImage, setSelectedImage, clearSelectedImage }
})
