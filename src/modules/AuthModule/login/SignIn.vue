<script setup lang="ts">
import { defineEmits, onMounted, ref } from 'vue'
import Logo from '@/assets/images/Logo.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import MessageIcon from '@/assets/images/MessageIcon.vue'
import LockIcon from '@/assets/images/LockIcon.vue'
import GoogleButton from '@/components/elements/button/GoogleButton.vue'
import { RouterLink, useRouter } from 'vue-router'
import { useInputStore } from '@/stores/authStores'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/userStores'

const emit = defineEmits(['loginSuccess'])
const auth = useInputStore()
const router = useRouter()
const authPiniaStore = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref('') // Error message state

async function handleLogin() {
  isLoading.value = true
  errorMessage.value = '' // Reset error message

  try {
    const formData = {
      email: auth.email,
      password: auth.password,
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/basic-login`,
      formData,
    )
    const { accessToken, user } = response.data.data

    Cookies.set('accessToken', accessToken)
    authPiniaStore.setUser(user)

    emit('loginSuccess')
  } catch (error) {
    console.error('Error logging in:', error)
    errorMessage.value = 'Login belum berhasil. Cek kembali email dan password kamu'
  } finally {
    isLoading.value = false
  }
}

function clearFields() {
  auth.email = ''
  auth.password = ''
}

onMounted(() => {
  router.beforeEach((to) => {
    if (to.path === '/register') {
      clearFields()
    }
    return true
  })
})

function handleGoogleLoginSuccess() {
  emit('loginSuccess')
}
</script>

<template>
  <div class="flex flex-col w-full min-h-screen items-center py-12 px-7 gap-3">
    <Logo class="w-[7.9375rem] h-[8.36513rem]" />
    <p class="text-black text-[1.25rem] font-bold tracking-[.0125rem]">
      Sign In
    </p>
    <form @submit.prevent="handleLogin" class="flex flex-col w-full gap-5">
      <InputAuth
        label="Email"
        placeholder="Masukkan Email"
        field="email"
        :LeftIcon="MessageIcon"
      />
      <InputAuth
        label="Password"
        placeholder="Masukkan Password"
        type="password"
        field="password"
        :LeftIcon="LockIcon"
        :rightIcon="true"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2 flex self-center">
        {{ errorMessage }}
      </p>
      <button
        type="submit"
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Masuk</span>
        <div v-else class="loader"></div>
      </button>
    </form>
    <div class="flex flex-col gap-3 w-full justify-center items-center">
      <p class="text-sm font-semibold text-black">
        Belum Punya Akun?
        <RouterLink to="/register" @click="clearFields" class="text-[#D62727]">
          Daftar
        </RouterLink>
      </p>
      <div class="flex flex-row items-center gap-3 w-full">
        <div class="w-full h-[0.0625rem] bg-[#B9BCC4]"></div>
        <p class="text-sm font-semibold">Atau</p>
        <div class="w-full h-[0.0625rem] bg-[#B9BCC4]"></div>
      </div>
      <GoogleButton class="mt-1" @loginSuccess="handleGoogleLoginSuccess" />
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ffffff;
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