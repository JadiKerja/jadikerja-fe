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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: Cookies.get('accessToken'),
    isLoading: false,
    isLoggedIn: false,
  }),
  actions: {
    async fetchUserData() {
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
        } finally {
          this.isLoading = false
        }
      }
    },

    setUser(user) {
      this.user = user
    },
  },
})

// export const useAuthStore = defineStore('auth', () => {
//   const user = ref<User | null>(null)
//   const accessToken = Cookies.get('accessToken')
//   const isLoading = ref(false)
//   const hasFetched = ref(false) // Flag to indicate if data has been fetched
//   const isLoggedIn = computed(() => !!user.value)

//   async function fetchUserData() {
//     if (accessToken && !hasFetched.value) { // Check if data hasn't been fetched
//       isLoading.value = true
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/auth/user`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           },
//         )
//         if (response.data.data) {
//           user.value = response.data.data.user as User
//           hasFetched.value = true // Set the flag after fetching data
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data', error)
//         user.value = null
//       } finally {
//         isLoading.value = false
//       }
//     }
//   }

//   // Automatically call fetchUserData whenever this store is accessed
//   watchEffect(() => {
//     if (!hasFetched.value) {
//       fetchUserData()
//     }
//   })

//   function setUser(userData: User | null) {
//     user.value = userData
//     hasFetched.value = true // Update the flag when setting user manually
//   }

//   return { user, isLoading, isLoggedIn, fetchUserData, setUser }
// })
