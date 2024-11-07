import { defineStore } from 'pinia'

export const useKerjainStore = defineStore('input', {
  state: () => ({
    title: '',
    salary: '',
    address: '',
    lat: null,
    lng: null,
    contactPersonName: '',
    contactPersonPhone: '',
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
  },
})
