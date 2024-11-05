<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authFirebase } from '@/components/utils/firebase'
import GoogleIcon from '@/assets/images/GoogleIcon.vue'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/userStores'

const isLoading = ref(false)
const errorMessage = ref('')
const authStore = useAuthStore()
const router = useRouter()
const emit = defineEmits(['loginSuccess'])

async function handleGoogleLogin() {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const provider = new GoogleAuthProvider()
    const { user: googleUser } = await signInWithPopup(authFirebase, provider)
    const firebaseToken = await googleUser.getIdToken()

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/oauth`,
      { firebaseToken },
    )

    if (response.data.code === 200 && response.data.data.goToOnBoarding) {
      const accessToken = response.data.data.accessToken
      Cookies.set('accessToken', accessToken)
      router.push('/lengkapi-profile')
    } else if (response.data.code === 200) {
      const accessToken = response.data.data.accessToken
      Cookies.set('accessToken', accessToken)
      authStore.setUser(response.data.data.user)
      emit('loginSuccess')
    }
  } catch (error) {
    console.error('Google OAuth login failed:', error)
    errorMessage.value = 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <button @click="handleGoogleLogin" :disabled="isLoading">
    <GoogleIcon />
  </button>
  <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </p>
</template>
