<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import AllChatCard from '@/components/elements/card/AllChatCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}

const chatList = [
  {
    id: '1',
    name: 'John Doe',
    address: 'Jakarta, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: 'Bandung, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    address: 'Surabaya, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Emily Davis',
    address: 'Medan, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    name: 'Michael Brown',
    address: 'Yogyakarta, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    name: 'Sarah Wilson',
    address: 'Bali, Indonesia',
    profileUrl: 'https://via.placeholder.com/150',
  },
]
</script>

<template>
  <div class="h-screen flex flex-col items-center w-full">
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
      <div v-for="(chat, index) in chatList" :key="index">
        <AllChatCard
          :id="chat.id"
          :name="chat.name"
          :address="chat.address"
          :profileUrl="chat.profileUrl"
        />
      </div>
    </div>
  </div>
</template>
