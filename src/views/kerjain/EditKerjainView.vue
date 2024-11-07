<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import EditIsi from '@/modules/KerjainModule/edit-kerja/EditIsi.vue'
import EditDataDiri from '@/modules/KerjainModule/edit-kerja/EditDataDiri.vue'
import KonfirmasiEdit from '@/modules/KerjainModule/edit-kerja/KonfirmasiEdit.vue'
import SuccessEdit from '@/modules/KerjainModule/edit-kerja/SuccessEdit.vue'
import { useKerjainStore } from '@/stores/kerjainStores'

const step = ref(1)
const kerjainData = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const route = useRoute()
const router = useRouter()

const kerjainStore = useKerjainStore()

async function fetchKerjainData() {
  const id = route.params.id
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kerjain/${id}`,
    )
    kerjainData.value = response.data.data
  } catch (error) {
    console.error('Error fetching Kerjain data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchKerjainData()
})

function goToNextStep() {
  if (step.value < 4) step.value += 1
}

function goToPreviousStep() {
  if (step.value > 1) step.value -= 1
}

function goBackToRoute() {
  router.back()
}

function goToIsiKerjaan() {
  step.value = 1
}
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
    <div>Loading...</div>
  </div>
  <div v-else-if="errorMessage" class="text-red-500 text-center">
    {{ errorMessage }}
  </div>
  <div v-else class="min-h-screen flex flex-col bg-[#F8FAFF]">
    <template v-if="step === 1">
      <EditIsi
        :kerjain="kerjainData"
        @next="goToNextStep"
        @back="goBackToRoute"
      />
    </template>
    <template v-else-if="step === 2">
      <EditDataDiri
        :kerjain="kerjainData"
        @next="goToNextStep"
        @back="goToPreviousStep"
      />
    </template>
    <template v-else-if="step === 3">
      <KonfirmasiEdit
        :kerjain="kerjainData"
        @next="goToNextStep"
        @back="goToPreviousStep"
        @editIsiKerjaan="goToIsiKerjaan"
      />
    </template>
    <template v-else-if="step === 4">
      <SuccessEdit />
    </template>
  </div>
</template>
