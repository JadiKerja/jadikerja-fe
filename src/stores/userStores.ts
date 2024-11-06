import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: Cookies.get('accessToken'),
    isLoading: false,
    isLoggedIn: false,
  }),
  actions: {
    async fetchUserData() {
      const router = useRouter() // Initialize router here
      if (this.accessToken) {
        this.isLoading = true

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/user`,
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`,
              },
            },
          )
          if (response.data.data) {
            this.user = response.data.data as User
          }
        } catch (error) {
          console.error('Failed to fetch user data', error)
          this.user = null
          router.push('/login')
        } finally {
          this.isLoading = false
        }
      } else {
        router.push('/login')
      }
    },

    setUser(user: User | null) {
      this.user = user
    },
  },
})
