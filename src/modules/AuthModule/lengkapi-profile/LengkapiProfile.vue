<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStores'
import { useInputStore } from '@/stores/authStores'
import { useAuthStore } from '@/stores/userStores'
import { computed, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import InputImage from '@/components/elements/InputImage.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import { uploadFile } from '@/services/postFile'

const profileStore = useProfileStore()
const authStore = useInputStore()
const authPiniaStore = useAuthStore()
const selectedImage = computed(() => profileStore.selectedImage)
const imageUploadError = ref<string | null>(null)
const formError = ref<string | null>(null)
const isSubmitting = ref(false)
const emit = defineEmits(['loginSuccess'])

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profileStore.setSelectedImage(file)
    imageUploadError.value = null
  }
}

async function handleSubmit() {
  formError.value = null
  imageUploadError.value = null
  isSubmitting.value = true

  if (
    !authStore.fullName ||
    !authStore.birthDate ||
    !authStore.location ||
    !authStore.phoneNumber ||
    !profileStore.selectedImage
  ) {
    formError.value = 'Please fill in all fields.'
    isSubmitting.value = false
    return
  }

  try {
    let imageUrl = null

    if (profileStore.selectedImage instanceof File) {
      imageUrl = await uploadFile({
        file: profileStore.selectedImage,
        folder: 'profile_pictures',
      })
    }

    if (!imageUrl) {
      imageUploadError.value = 'Failed to upload image. Please try again.'
      isSubmitting.value = false
      return
    }

    const formData = {
      fullName: authStore.fullName,
      birthDate: authStore.birthDate,
      domicile: authStore.location,
      phone: authStore.phoneNumber,
      profileUrl: imageUrl,
    }

    const token = Cookies.get('accessToken')
    if (!token) {
      formError.value = 'Authentication error. Please log in again.'
      isSubmitting.value = false
      return
    }

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/auth/user`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 200) {
      const { user } = response.data.data
      authPiniaStore.setUser(user)
      emit('loginSuccess')
    }
  } catch (error) {
    console.error('Error submitting profile:', error)
    imageUploadError.value =
      'An error occurred during submission. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex flex-col w-full min-h-screen items-center py-12 px-7 gap-4">
    <p class="text-black text-[1.25rem] font-bold tracking-[.0125rem]">
      Isi data diri dulu yuk!
    </p>
    <form
      method="POST"
      enctype="multipart/form-data"
      class="flex flex-col items-center gap-5 w-full"
      @submit.prevent="handleSubmit"
    >
      <InputImage :selectedImage="selectedImage" @change="handleFileChange" />

      <InputAuth
        label="Nama Lengkap"
        placeholder="Nama Lengkap"
        field="fullName"
        @keyup.enter="handleSubmit"
      />
      <InputAuth
        label="Tanggal Lahir"
        placeholder="DD/MM/YYYY"
        field="birthDate"
        type="date"
        @keyup.enter="handleSubmit"
      />
      <InputAuth
        label="Domisili"
        placeholder="Domisili"
        field="location"
        @keyup.enter="handleSubmit"
      />
      <InputAuth
        label="No. Telepon"
        placeholder="No. Telepon"
        field="phoneNumber"
        @keyup.enter="handleSubmit"
      />

      <p v-if="imageUploadError" class="text-red-500 text-sm">
        {{ imageUploadError }}
      </p>
      <p v-if="formError" class="text-red-500 text-sm">
        {{ formError }}
      </p>

      <button
        type="submit"
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Simpan Perubahan</span>
        <div v-else class="loader"></div>
      </button>
    </form>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
