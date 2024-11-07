<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStores'
import { useInputStore } from '@/stores/authStores'
import { useAuthStore } from '@/stores/userStores'
import { computed, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import InputImage from '@/components/elements/InputImage.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import BackButton from '@/components/elements/button/BackButton.vue'
import { uploadFile } from '@/services/postFile'

const profileStore = useProfileStore()
const authStore = useInputStore()
const authPiniaStore = useAuthStore()
const selectedImage = computed(() => profileStore.selectedImage)
const emit = defineEmits(['back', 'submit'])
const imageUploadError = ref<string | null>(null)
const isLoading = ref(false)

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profileStore.setSelectedImage(file)
    imageUploadError.value = null
  }
}

async function handleSubmit() {
  isLoading.value = true
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
      isLoading.value = false
      return
    }

    const formData = {
      email: authStore.email,
      password: authStore.password,
      confirmationPassword: authStore.confirmPassword,
      fullName: authStore.fullName,
      birthDate: authStore.birthDate,
      domicile: authStore.location,
      phone: authStore.phoneNumber,
      profileUrl: imageUrl,
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      formData,
    )
    const { accessToken, user } = response.data.data

    Cookies.set('accessToken', accessToken)
    authPiniaStore.setUser(user)

    emit('submit')
  } catch (error) {
    console.error('Error submitting profile:', error)
    imageUploadError.value =
      'Maksimal image size 1MB'
  } finally {
    isLoading.value = false
  }
}
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
      @submit.prevent="handleSubmit"
    >
      <InputImage :selectedImage="selectedImage" @change="handleFileChange" />
      <p v-if="imageUploadError" class="text-red-500 text-sm">
        {{ imageUploadError }}
      </p>

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

      <button
        type="submit"
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Simpan</span>
        <div v-else class="loader"></div>
      </button>
    </form>
  </div>
</template>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
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
