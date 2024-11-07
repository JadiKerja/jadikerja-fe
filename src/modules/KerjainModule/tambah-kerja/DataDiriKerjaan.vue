<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { defineEmits, computed } from 'vue'
import ProgressIcon from '@/components/elements/ProgressIcon.vue'
import InputKerjain from '@/components/elements/InputKerjain.vue'
import { useKerjainStore } from '@/stores/kerjainStores'

const emit = defineEmits(['next', 'back'])
const kerjainStore = useKerjainStore()

// Computed property to check if all required fields are filled
const canProceed = computed(() => {
  return kerjainStore.contactPersonName && kerjainStore.phoneNumber
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
        <WhiteBackButton class="" @click="emit('back')" />

        <p class="text-[1.5rem] font-bold text-white tracking-[0.01563rem]">
          Tambah Kerjaan
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 pb-7 pt-5 gap-5 z-20 bg-[#F8FAFF] h-fit overflow-y-auto custom-scrollbar-hidden"
    >
      <ProgressIcon :pageNumber="2" />
      <div class="flex flex-col gap-1">
        <p class="text-black text-[1.25rem] font-semibold">Informasi Diri</p>
        <p class="text-black text-[0.75rem]">
          Isi informasi untuk memudahkan mitra
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <InputKerjain
          label="Nama"
          placeholder="Masukkan Nama"
          field="contactPersonName"
        />
        <InputKerjain
          label="Nomor Telepon"
          placeholder="Masukkan Nomor Telepon"
          field="phoneNumber"
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
