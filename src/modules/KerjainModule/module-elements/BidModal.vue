<script setup lang="ts">
import { ref, computed } from 'vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const props = defineProps<{
  isModalOpen: boolean
  kerjainId: string
  toggleModal: () => void
}>()

const bidPrice = ref('')
const isLoading = ref(false)

const router = useRouter()
const $toast = useToast()

const formattedBidPrice = computed({
  get: () => {
    const numericValue = bidPrice.value.replace(/[^\d]/g, '')
    const number = parseInt(numericValue, 10)

    if (!isNaN(number)) {
      return 'Rp' + number.toLocaleString()
    }
    return 'Rp0'
  },
  set: (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '')
    bidPrice.value = numericValue
  },
})

function handleClickOverlay() {
  bidPrice.value = ''
  props.toggleModal()
}

async function handleSubmit() {
  try {
    const token = Cookies.get('accessToken')

    isLoading.value = true

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/kerjain/apply`,
      {
        kerjainId: props.kerjainId,
        bidPrice: Number(bidPrice.value.replace(/[^\d]/g, '')),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 201) {
      router.push(`/kerjain/chat/${response.data.data.kerjain.id}`)
      return
    }
  } catch (error) {
    $toast.error(error.response.data.message || 'Oops, terjadi kesalahan.', {
      position: 'top',
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    v-if="isModalOpen"
    class="absolute left-0 top-0 bg-black/50 w-full h-screen"
    @click="handleClickOverlay"
  ></div>
  <div
    v-if="isModalOpen"
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] mx-auto flex flex-col bg-white rounded-[30px] overflow-hidden"
  >
    <p class="text-center text-white font-bold py-4 bg-[#D62727]">
      Tawar Harga
    </p>
    <div class="flex flex-col gap-7 px-7 py-11">
      <div class="flex flex-col gap-1">
        <label for="bidPrice" class="font-semibold text-xs"
          >Masukkan Harga Penawaran</label
        >
        <input
          type="text"
          id="bidPrice"
          v-model="formattedBidPrice"
          class="px-3 py-2 font-semibold text-xs border border-[#AEACAC] rounded-lg"
        />
      </div>
      <button
        class="font-semibold text-xs text-white px-8 py-2 bg-[#D62727] hover:bg-red-800 rounded-[10px] transition-all"
        @click="handleSubmit"
        :disabled="isLoading"
      >
        {{ isLoading ? '...' : 'Submit' }}
      </button>
    </div>
  </div>
</template>
