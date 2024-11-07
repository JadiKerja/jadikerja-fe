import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

export const useKerjainStore = defineStore('input', {
  state: () => ({
    title: '',
    salary: '',
    address: '',
    lat: null,
    lng: null,
    contactPersonName: '',
    contactPersonPhone: '',
    isLoading: false,
  }),

  actions: {
    setState({
      title = null,
      salary = null,
      address = null,
      lat = null,
      lng = null,
      contactPersonName = null,
      contactPersonPhone = null,
    }) {
      this.title = title || this.title
      this.salary = salary || this.salary
      this.address = address || this.address
      this.lat = lat || this.lat
      this.lng = lng || this.lng
      this.contactPersonName = contactPersonName || this.contactPersonName
      this.contactPersonPhone = contactPersonPhone || this.contactPersonPhone
    },

    async createKerjain() {
      const $toast = useToast()
      const router = useRouter()

      try {
        const token = Cookies.get('accessToken')

        if (!token) return router.replace('/login')

        this.isLoading = true

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/kerjain`,
          {
            title: this.title,
            salary: Number(parseInt(this.salary.replace(/[^\d]/g, ''))),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            contactPersonName: this.contactPersonName,
            contactPersonPhone: this.contactPersonPhone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data.code !== 201) {
          $toast.error(
            response.data.message ||
              'Terjadi kesalahan. Coba beberapa saat lagi',
            {
              position: 'top',
            },
          )
          router.replace('/profile/pekerjaan')
        }
      } catch (error) {
        console.error(error)
        $toast.error(error || 'Terjadi kesalahan. Coba beberapa saat lagi', {
          position: 'top',
        })
        router.replace('/profile/pekerjaan')
      } finally {
        this.isLoading = false
      }
    },

    resetState() {
      this.title = ''
      this.salary = ''
      this.address = ''
      this.lat = null
      this.lng = null
      this.contactPersonName = ''
      this.contactPersonPhone = ''
    },
  },
})
