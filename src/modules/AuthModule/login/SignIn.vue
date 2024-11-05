<script setup lang="ts">
import { defineEmits, onMounted } from 'vue'
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

async function handleLogin() {
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
      <button
        type="submit"
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
      >
        Masuk
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