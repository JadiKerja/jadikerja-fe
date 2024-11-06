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
import { useRouter } from 'vue-router'
import BackButton from '@/components/elements/button/BackButton.vue'

const profileStore = useProfileStore()
const authStore = useInputStore()
const authPiniaStore = useAuthStore()
const router = useRouter()

function formatDateToYYYYMMDD(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

authStore.fullName = authPiniaStore.user.client.fullName
authStore.birthDate = formatDateToYYYYMMDD(authPiniaStore.user.client.birthDate)
authStore.location = authPiniaStore.user.client.domicile
authStore.phoneNumber = authPiniaStore.user.client.phone
profileStore.selectedImageUrl = authPiniaStore.user.client.profileUrl

const selectedImage = computed(() => profileStore.selectedImage)
const imageUploadError = ref<string | null>(null)
const formError = ref<string | null>(null)

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

  if (
    !authStore.fullName ||
    !authStore.birthDate ||
    !authStore.location ||
    !authStore.phoneNumber
  ) {
    formError.value = 'Please fill in all fields.'
    return
  }

  try {
    let imageUrl = null
    if (profileStore.selectedImage) {
      if (profileStore.selectedImage instanceof File) {
        imageUrl = await uploadFile({
          file: profileStore.selectedImage,
          folder: 'profile_pictures',
        })
      }

      if (!imageUrl) {
        imageUploadError.value = 'Failed to upload image. Please try again.'
        return
      }
    }

    const formData = {
      fullName: authStore.fullName,
      birthDate: authStore.birthDate,
      domicile: authStore.location,
      phone: authStore.phoneNumber,
      profileUrl: imageUrl ? imageUrl : profileStore.selectedImageUrl,
    }

    const token = Cookies.get('accessToken')
    if (!token) {
      formError.value = 'Authentication error. Please log in again.'
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
      router.push('/profile')
    }
  } catch (error) {
    console.error('Error submitting profile:', error)
    imageUploadError.value =
      'An error occurred during submission. Please try again.'
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div
    class="flex flex-col relative w-full min-h-screen items-center pb-[6.5rem] pt-12 px-7 gap-4"
  >
    <BackButton class="self-start absolute" @click="goBack" />
    <p class="text-black text-[1.25rem] font-bold tracking-[.0125rem]">
      Edit Akun
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
      />
      <InputAuth
        label="Tanggal Lahir"
        placeholder="DD/MM/YYYY"
        field="birthDate"
        type="date"
        :value="authStore.birthDate"
      />
      <InputAuth label="Domisili" placeholder="Domisili" field="location" />
      <InputAuth
        label="No. Telepon"
        placeholder="No. Telepon"
        field="phoneNumber"
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
      >
        Simpan Perubahan
      </button>
    </form>
  </div>
</template>
