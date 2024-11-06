<script setup lang="ts">
import axios from 'axios'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const { id, title, salary, address, contactPersonName, toggleModal } =
  defineProps<{
    id: string
    title: string
    salary: number
    address: string
    contactPersonName: string
    toggleModal: () => void
  }>()

const isLoading = ref(false)

const router = useRouter()
const $toast = useToast()

async function handleApply() {
  try {
    const token = Cookies.get('accessToken')

    isLoading.value = true

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/kerjain/apply`,
      {
        kerjainId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 200) {
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
    class="flex flex-col gap-1 w-full p-4 shadow-[0_2px_3px_rgba(0,0,0,0.25)] rounded-[20px]"
  >
    <div class="grid grid-cols-[0.25fr_1fr_0.75fr]">
      <img
        src="../../../assets/images/check-list.png"
        alt="check-list"
        width="30"
      />
      <div>
        <h4 class="font-medium text-lg">{{ title }}</h4>
        <div class="flex items-center">
          <img
            src="../../../assets/images/location.png"
            alt="location"
            class="w-[20px]"
          />
          <span class="font-medium text-[#AEACAC] text-xs">{{ address }}</span>
        </div>
        <div class="flex items-center gap-[1px]">
          <img
            src="../../../assets/images/person-pin.png"
            alt="person-pin"
            class="w-[19px]"
          />
          <span class="font-medium text-[#AEACAC] text-xs">{{
            contactPersonName
          }}</span>
        </div>
      </div>
      <p class="font-bold text-right">Rp{{ salary.toLocaleString('de-DE') }}</p>
    </div>
    <div class="flex justify-end gap-1">
      <button
        class="w-[80px] py-1 text-[8px] bg-[#F4A91E] hover:bg-[#d39626] text-white font-semibold text-center rounded-[18px] transition-all"
        @click="toggleModal"
        :disabled="isLoading"
      >
        {{ isLoading ? '...' : 'Tawar' }}
      </button>
      <button
        class="w-[80px] py-1 text-[8px] bg-[#D62727] hover:bg-[#771515] text-white font-semibold text-center rounded-[18px] transition-all"
        @click="handleApply"
        :disabled="isLoading"
      >
        {{ isLoading ? '...' : 'Kerja' }}
      </button>
    </div>
  </div>
</template>
