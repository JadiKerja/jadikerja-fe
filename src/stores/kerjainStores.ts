import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

export const useKerjainStore = defineStore('input', {
  state: () => ({
    id: '',
    title: '',
    price: 0,
    address: '',
    lat: null,
    lng: null,
    newLat: null,
    newLng: null,
    contactPersonName: '',
    phoneNumber: '',
    isLoading: false,
  }),

  actions: {
    setState({
      id = null,
      title = null,
      salary = null,
      address = null,
      lat = null,
      lng = null,
      newLat = null,
      newLng = null,
      contactPersonName = null,
      contactPersonPhone = null,
    }) {
      this.id = id || this.id
      this.title = title || this.title
      this.price = salary || this.price
      this.address = address || this.address
      this.lat = lat || this.lat
      this.lng = lng || this.lng
      this.newLat = newLat || this.newLat
      this.newLng = newLng || this.newLng
      this.contactPersonName = contactPersonName || this.contactPersonName
      this.phoneNumber = contactPersonPhone || this.phoneNumber
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
            salary: Number(this.price.replace(/[^\d]/g, '')),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            contactPersonName: this.contactPersonName,
            contactPersonPhone: this.phoneNumber,
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

    async editKerjain() {
      const $toast = useToast()
      const router = useRouter()

      try {
        const token = Cookies.get('accessToken')

        if (!token) return router.replace('/login')

        this.isLoading = true

        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/kerjain`,
          {
            id: this.id,
            title: this.title,
            salary: Number(this.price.replace(/[^\d]/g, '')),
            address: this.address,
            lat: this.newLat ? this.newLat : this.lat,
            lng: this.newLng ? this.newLng : this.lng,
            contactPersonName: this.contactPersonName,
            contactPersonPhone: this.phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data.code !== 200) {
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
      this.id = ''
      this.title = ''
      this.salary = ''
      this.address = ''
      this.lat = null
      this.lng = null
      this.newLat = null
      this.newLng = null
      this.contactPersonName = ''
      this.phoneNumber = ''
    },
  },
})
