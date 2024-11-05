<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useInputStore } from '@/stores/authStores'
import Logo from '@/assets/images/Logo.vue'
import InputAuth from '@/components/elements/InputAuth.vue'
import MessageIcon from '@/assets/images/MessageIcon.vue'
import LockIcon from '@/assets/images/LockIcon.vue'
import GoogleButton from '@/components/elements/button/GoogleButton.vue'

const emit = defineEmits(['nextStep'])
const inputStore = useInputStore()
const errorMessage = ref<string | null>(null)

function validateAndProceed() {
  errorMessage.value = null

  if (
    !inputStore.email ||
    !inputStore.password ||
    !inputStore.confirmPassword
  ) {
    errorMessage.value = 'Please fill in all required fields.'
  } else if (inputStore.password !== inputStore.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
  } else {
    emit('nextStep')
    errorMessage.value = null
  }
}
</script>

<template>
  <div class="flex flex-col w-full min-h-screen items-center py-4 px-7 gap-3">
    <Logo class="w-[7.9375rem] h-[8.36513rem]" />
    <p class="text-black text-[1.25rem] font-bold tracking-[.0125rem]">
      Sign Up
    </p>
    <div class="flex flex-col w-full gap-5">
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
        type="password"
        :LeftIcon="LockIcon"
        :rightIcon="true"
      />
      <InputAuth
        label="Konfirmasi Password"
        placeholder="Masukkan Password"
        field="confirmPassword"
        type="password"
        :LeftIcon="LockIcon"
        :rightIcon="true"
      />
      <!-- Error message under confirm password -->
      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </p>
      <button
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
        @click.prevent="validateAndProceed"
      >
        Buat Akun
      </button>
    </div>
    <div class="flex flex-col gap-3 w-full justify-center items-center">
      <p class="text-sm font-semibold text-black">
        Sudah Punya Akun?
        <a href="/login" class="text-[#D62727]">Masuk</a>
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
