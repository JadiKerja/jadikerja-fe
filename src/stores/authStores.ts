import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInputStore = defineStore('input', () => {
  const fields = {
    email: ref(''),
    password: ref(''),
    confirmPassword: ref(''),
    fullName: ref(''),
    birthDate: ref(''),
    location: ref(''),
    phoneNumber: ref(''),
  }

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  function toggleShowPassword() {
    showPassword.value = !showPassword.value
  }

  function toggleShowConfirmPassword() {
    showConfirmPassword.value = !showConfirmPassword.value
  }

  return {
    ...fields,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  }
})
