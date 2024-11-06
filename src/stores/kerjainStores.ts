import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKerjainStore = defineStore('input', () => {
  const fields = {
    detailAddress: ref(''),
    jobType: ref(''),
    price: ref(''),
    name: ref(''),
    phoneNumber: ref(''),
  }

  return {
    ...fields,
  }
})
