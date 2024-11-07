<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import AllChatCard from '@/components/elements/card/AllChatCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const chatList = ref([])

function goBack() {
  router.back()
}

async function fetchKerjainData() {
  const token = Cookies.get('accessToken')
  const id = route.params.id
  if (token) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/kerjain/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      chatList.value = response.data.data.kerjain.kerjainApply
      console.log(chatList)
    } catch (error) {
      console.error('Error fetching Kerjain data:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    console.error('No access token found.')
    isLoading.value = false
  }
}

onMounted(() => {
  fetchKerjainData()
})
</script>

<template>
  <div v-if="isLoading" class="h-screen flex justify-center items-center w-full">
    <p>Loading...</p>
  </div>
  <div v-else class="h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full pb-[4.5rem] pt-[3rem] px-7 gap-6 overflow-hidden"
    >
      <TransparentCircle
        class="z-[1] absolute -top-[5rem] -right-[6rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -top-[4rem] -right-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -bottom-[6rem] -left-[7rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -bottom-[5rem] -left-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <div class="flex flex-row justify-between w-full z-10">
        <WhiteBackButton @click="goBack" />

        <p class="text-[1.5rem] font-bold text-white tracking-[0.01563rem]">
          Penawaran
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 pb-7 pt-5 gap-4 z-20 bg-[#F8FAFF] overflow-y-auto custom-scrollbar-hidden"
    >
      <p class="text-black text-[1.25rem] font-semibold">Penawaran kamu</p>
      <div v-if="chatList.length > 0" v-for="(chat, index) in chatList" :key="index">
        <AllChatCard
          :id="chat.id"
          :name="chat.fullName"
          :address="chat.domicile"
          :profileUrl="chat.profileUrl"
        />
      </div>
      <div v-else>
        <p class="text-gray-500 text-center">No data available</p>
      </div>
    </div>
  </div>
</template>
