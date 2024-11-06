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
    const goToOnboarding = response.data.data.goToOnboarding

    if (response.data.code === 200 && goToOnboarding) {
      const accessToken = response.data.data.accessToken
      Cookies.set('accessToken', accessToken)
      router.push('/lengkapi-profile')
    } else if (response.data.code === 200) {
      const { accessToken, user } = response.data.data
      authStore.setUser(user)
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
  <button
    @click="handleGoogleLogin"
    :disabled="isLoading"
    class="flex items-center justify-center"
  >
    <template v-if="!isLoading">
      <GoogleIcon />
    </template>
    <template v-else>
      <div class="flex items-center justify-center">
        <div class="loader"></div>
        <span class="text-sm font-semibold ml-2">Loading...</span>
      </div>
    </template>
  </button>
  <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </p>
</template>

<style scoped>
.loader {
  border: 4px solid transparent;
  border-top-color: #d62727;
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
