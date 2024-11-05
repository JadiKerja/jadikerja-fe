<script setup lang="ts">
import SuccessRegisChar from '@/assets/images/SuccessRegisChar.vue'
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
</script>

<template>
  <div
    class="w-full relative flex justify-center items-end min-h-screen bg-[#D62727]"
  >
    <TransparentCircle
      class="absolute top-[13rem] -left-[11rem]"
    ></TransparentCircle>
    <SuccessRegisChar class="absolute top-0 right-5" />
    <div
      class="flex flex-col font-semibold text-white absolute top-[15rem] max-w-40 left-10"
    >
      <p class="text-[2.25rem]">Yes!</p>
      <p class="text-[1.25rem]">Akunmu berhasil dibuat</p>
    </div>
    <div
      class="rounded-t-[2.9475rem] w-full bg-white flex flex-col items-center gap-[1.25rem] pt-[2.5rem] pb-[4.5rem] px-[3rem] z-10"
    >
      <div class="text-center">
        <span
          class="text-[1.25rem] font-semibold text-black flex flex-row gap-1"
        >
          Selamat datang di
          <span class="text-[#D62727] text-[1.25rem] font-semibold"
            >Jadi<span class="text-[#E55A24] text-[1.25rem] font-semibold"
              >Kerja</span
            ></span
          >
        </span>
        <p class="font-medium text-[#AEACAC]">
          Mulai cari kerja dari sekarang yuk
        </p>
      </div>
      <button
        class="w-full flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
      >
        Lanjut ke Beranda
      </button>
    </div>
  </div>
</template>
