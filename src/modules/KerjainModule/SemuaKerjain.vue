<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SemuaKerjainSaya from '@/components/elements/card/SemuaKerjainSaya.vue'
import BackButton from '@/components/elements/button/BackButton.vue'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/userStores'

const router = useRouter()
const pekerjaanList = ref([])
const isLoading = ref(true)
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.user) {
    isLoading.value = true
    await authStore.fetchUserData()
  }
})

function goBack() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col p-7 gap-8">
    <div class="flex flex-row justify-center relative">
      <BackButton class="self-start absolute left-0" @click="goBack" />
      <p class="text-[#0A0E32] text-[1.5rem] font-bold tracking-[.01875rem]">
        Daftar Kerjain
      </p>
      <div></div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <template v-else>
      <p
        v-if="pekerjaanList.length === 0"
        class="text-center text-[#0A0E32] text-sm"
      >
        Anda belum memposting pekerjaan
      </p>
      <div
        v-else
        v-for="pekerjaan in pekerjaanList"
        :key="pekerjaan.id"
        class="flex flex-col gap-3"
      >
        <SemuaKerjainSaya
          :id="pekerjaan.id"
          :title="pekerjaan.title"
          :lat="pekerjaan.lat"
          :lng="pekerjaan.lng"
          :salary="pekerjaan.salary"
          :address="pekerjaan.address"
          :contactName="pekerjaan.contactPersonName"
          :contactPhone="pekerjaan.contactPersonPhone"
          :isOpen="pekerjaan.isOpen"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d62727;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
