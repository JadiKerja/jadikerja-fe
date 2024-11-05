import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(Cookies.get('accessToken') || '')
  const isLoading = ref(false)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUserData() {
    const token = Cookies.get('accessToken')

    if (token) {
      isLoading.value = true
      try {
        const response = await axios.get(`${import.meta.env.VUE_APP_API_URL}/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data) {
          user.value = response.data.data.user
        }
      } catch (error) {
        console.error('Failed to fetch user data', error)
        user.value = null
      } finally {
        isLoading.value = false
      }
    }
  }

  function setUser(userData) {
    user.value = userData
  }

  watchEffect(() => {
    if (accessToken.value) {
      fetchUserData()
    }
  })

  return { user, isLoading, isLoggedIn, fetchUserData, setUser }
})