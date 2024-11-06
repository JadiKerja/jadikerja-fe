import { defineStore } from 'pinia'
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

enum Role {
  Client = 'CLIENT',
  Admin = 'ADMIN',
  Guest = 'GUEST',
}

interface Client {
  id: string
  createdAt: string
  updatedAt: string
  fullName: string
  birthDate: string
  domicile: string
  phone: string
  profileUrl: string
  userEmail: string
}

interface User {
  email: string
  role: Role
  client: Client | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref(Cookies.get('accessToken') || '')
  const isLoading = ref(false)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUserData() {
    const token = Cookies.get('accessToken')

    if (token) {
      isLoading.value = true
      try {
        const response = await axios.get(
          `${import.meta.env.VUE_APP_API_URL}/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data) {
          user.value = response.data.data.user as User
        }
      } catch (error) {
        console.error('Failed to fetch user data', error)
        user.value = null
      } finally {
        isLoading.value = false
      }
    }
  }

  function setUser(userData: User) {
    user.value = userData
  }

  watchEffect(() => {
    if (accessToken.value) {
      fetchUserData()
    }
  })

  return { user, isLoading, isLoggedIn, fetchUserData, setUser }
})
