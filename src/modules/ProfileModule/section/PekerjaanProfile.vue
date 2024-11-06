<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import KerjainCard from '@/components/elements/card/KerjainCard.vue'
import BackButton from '@/components/elements/button/BackButton.vue'
import Cookies from 'js-cookie'

const router = useRouter()
const pekerjaanList = ref([])

async function fetchPekerjaan() {
  const accessToken = Cookies.get('accessToken')
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kerjain/author`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log(response.data.data)
    pekerjaanList.value = response.data.data.kerjain
  } catch (error) {
    console.error('Failed to fetch pekerjaan data:', error)
  }
}

onMounted(fetchPekerjaan)

function goBack() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col p-7 gap-8">
    <div class="flex flex-row justify-between items-center">
      <BackButton class="self-start" @click="goBack" />
      <p class="text-[#0A0E32] text-[1.5rem] font-bold tracking-[.01875rem]">
        Daftar Pekerjaan
      </p>
      <div></div>
    </div>

    <div
      v-for="pekerjaan in pekerjaanList"
      :key="pekerjaan.id"
      class="flex flex-col gap-3"
    >
      <KerjainCard
        :id="pekerjaan.id"
        :title="pekerjaan.title"
        :lat="pekerjaan.lat"
        :lng="pekerjaan.lng"
        :salary="pekerjaan.salary"
        :address="pekerjaan.address"
        :contactName="pekerjaan.contactPersonName"
        :contactPhone="pekerjaan.contactPersonPhone"
      />
    </div>
  </div>
</template>
