<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProgressIcon from '@/components/elements/ProgressIcon.vue'
import InputKerjain from '@/components/elements/InputKerjain.vue'
import { useKerjainStore } from '@/stores/kerjainStores'

const router = useRouter()
const emit = defineEmits(['next', 'back'])
const kerjainStore = useKerjainStore()

function goBack() {
  router.back()
  kerjainStore.detailAddress = ''
  kerjainStore.jobType = ''
  kerjainStore.price = ''
  kerjainStore.name = ''
  kerjainStore.phoneNumber = ''
}

const canProceed = computed(() => {
  return (
    kerjainStore.detailAddress && kerjainStore.jobType && kerjainStore.price
  )
})
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
        <WhiteBackButton class="" @click="goBack" />

        <p class="text-[1.5rem] font-bold text-white tracking-[0.01563rem]">
          Tambah Kerjaan
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 pb-7 pt-5 gap-5 z-20 bg-[#F8FAFF] h-fit overflow-y-auto custom-scrollbar-hidden"
    >
      <ProgressIcon :pageNumber="1" />
      <div class="flex flex-col gap-1">
        <p class="text-black text-[1.25rem] font-semibold">Tambah Kerjaan</p>
        <p class="text-black text-[0.75rem]">
          Pekerjaan apa yang mitra kami bisa bantu?
        </p>
      </div>
      <div class="w-full">
        <p class="text-[0.875rem] text-black font-semibold">Alamat</p>
      </div>
      <div class="flex flex-col gap-4">
        <InputKerjain
          :label="'Detail Alamat'"
          :placeholder="'Masukkan Detail Alamat'"
          :field="'detailAddress'"
        />
        <InputKerjain
          :label="'Jenis Pekerjaan'"
          :placeholder="'Masukkan Jenis Pekerjaan'"
          :field="'jobType'"
        />
        <InputKerjain
          :label="'Harga yang Ditawarkan'"
          :placeholder="'Masukkan Harga'"
          :field="'price'"
        />
      </div>

      <button
        @click="emit('next')"
        :disabled="!canProceed"
        class="w-full py-[0.8125rem] text-white bg-[#D62727] text-center font-semibold rounded-[0.9375rem] disabled:bg-gray-400"
      >
        Lanjut
      </button>
    </div>
  </div>
</template>
