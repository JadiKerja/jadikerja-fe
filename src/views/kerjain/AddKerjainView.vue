<script setup lang="ts">
import { ref } from 'vue'
import IsiKerjaan from '@/modules/KerjainModule/tambah-kerja/IsiKerjaan.vue'
import DataDiriKerjaan from '@/modules/KerjainModule/tambah-kerja/DataDiriKerjaan.vue'
import KonfirmasiKerjaan from '@/modules/KerjainModule/tambah-kerja/KonfirmasiKerjaan.vue'
import SuccessAddKerjaan from '@/modules/KerjainModule/tambah-kerja/SuccessAddKerjaan.vue'
import { useRouter } from 'vue-router'

const step = ref(1)

function goToNextStep() {
  if (step.value < 4) step.value += 1
}

function goToPreviousStep() {
  if (step.value > 1) step.value -= 1
}

function goBackToRoute() {
  const router = useRouter()
  router.back()
}

function goToIsiKerjaan() {
  step.value = 1
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F8FAFF]">
    <template v-if="step === 1">
      <IsiKerjaan @next="goToNextStep" @back="goBackToRoute" />
    </template>
    <template v-else-if="step === 2">
      <DataDiriKerjaan @next="goToNextStep" @back="goToPreviousStep" />
    </template>
    <template v-else-if="step === 3">
      <KonfirmasiKerjaan
        @next="goToNextStep"
        @back="goToPreviousStep"
        @editIsiKerjaan="goToIsiKerjaan"
      />
    </template>
    <template v-else-if="step === 4">
      <SuccessAddKerjaan />
    </template>
  </div>
</template>
