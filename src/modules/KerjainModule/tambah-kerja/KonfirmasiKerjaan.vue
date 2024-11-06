<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { defineEmits } from 'vue'
import ProgressIcon from '@/components/elements/ProgressIcon.vue'
import PencilIcon from '@/assets/images/PencilIcon.vue'
import { useKerjainStore } from '@/stores/kerjainStores'

const kerjainStore = useKerjainStore()
const emit = defineEmits(['next', 'back', 'editIsiKerjaan'])
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
        <WhiteBackButton @click="emit('back')" />

        <p class="text-[1.5rem] font-bold text-white tracking-[0.01563rem]">
          Tambah Kerjaan
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 pb-7 pt-5 gap-5 z-20 bg-[#F8FAFF] h-fit overflow-y-auto custom-scrollbar-hidden"
    >
      <ProgressIcon :pageNumber="3" />
      <div class="flex flex-col gap-1">
        <p class="text-black text-[1.25rem] font-semibold">Konfirmasi</p>
        <p class="text-black text-[0.75rem]">
          Mohon periksa kembali pekerjaan kamu
        </p>
      </div>
      <div class="flex flex-col gap-1 w-full">
        <div class="flex flex-row justify-between">
          <p class="text-black text-[0.875rem] font-semibold">
            Informasi Pribadi
          </p>
          <button
            @click="emit('back')"
            class="bg-[#F4A91E] rounded-[0.625rem] p-[0.3125rem] flex flex-row gap-[1px] font-semibold text-[0.75rem] text-white"
          >
            <PencilIcon />
            <p>Edit</p>
          </button>
        </div>
        <div
          class="w-full p-[0.9375rem] flex flex-col gap-[0.625rem] bg-[#EEF0F3] rounded-[0.9375rem]"
        >
          <div class="flex flex-col gap-1">
            <p class="text-[0.625rem] font-medium text-[#AEACAC]">
              Nama Lengkap
            </p>
            <p class="text-black text-[0.75rem] font-medium">
              {{ kerjainStore.name }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-[0.625rem] font-medium text-[#AEACAC]">
              Nomor Telepon
            </p>
            <p class="text-black text-[0.75rem] font-medium">
              +62{{ kerjainStore.phoneNumber }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1 w-full">
        <div class="flex flex-row justify-between">
          <p class="text-black text-[0.875rem] font-semibold">
            Informasi Pekerjaan
          </p>
          <button
            @click="emit('editIsiKerjaan')"
            class="bg-[#F4A91E] rounded-[0.625rem] p-[0.3125rem] flex flex-row gap-[1px] font-semibold text-[0.75rem] text-white"
          >
            <PencilIcon />
            <p>Edit</p>
          </button>
        </div>
        <div
          class="w-full p-[0.9375rem] flex flex-col gap-[0.625rem] bg-[#EEF0F3] rounded-[0.9375rem]"
        >
          <div class="flex flex-col gap-1">
            <p class="text-[0.625rem] font-medium text-[#AEACAC]">Alamat</p>
            <p class="text-black text-[0.75rem] font-medium">
              {{ kerjainStore.detailAddress }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-[0.625rem] font-medium text-[#AEACAC]">
              Jenis Pekerjaan
            </p>
            <p class="text-black text-[0.75rem] font-medium">
              {{ kerjainStore.jobType }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-[0.625rem] font-medium text-[#AEACAC]">
              Harga yang ditawarkan
            </p>
            <p class="text-black text-[0.75rem] font-medium">
              Rp{{ kerjainStore.price }}
            </p>
          </div>
        </div>
      </div>

      <button
        @click="emit('next')"
        class="w-full py-[0.8125rem] text-white bg-[#D62727] text-center font-semibold rounded-[0.9375rem]"
      >
        Konfirmasi
      </button>
    </div>
  </div>
</template>
