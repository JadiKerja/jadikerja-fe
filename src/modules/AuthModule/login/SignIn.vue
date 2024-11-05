<script setup lang="ts">
import { defineEmits } from 'vue'
import Logo from '@/assets/images/Logo.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import MessageIcon from '@/assets/images/MessageIcon.vue'
import LockIcon from '@/assets/images/LockIcon.vue'
import GoogleButton from '@/components/elements/button/GoogleButton.vue'

const emit = defineEmits(['loginSuccess'])

function handleLogin() {
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
        <a href="/register" class="text-[#D62727]">Daftar</a>
      </p>
      <div class="flex flex-row items-center gap-3 w-full">
        <div class="w-full h-[0.0625rem] bg-[#B9BCC4]"></div>
        <p class="text-sm font-semibold">Atau</p>
        <div class="w-full h-[0.0625rem] bg-[#B9BCC4]"></div>
      </div>
      <GoogleButton class="mt-1" />
    </div>
  </div>
</template>
