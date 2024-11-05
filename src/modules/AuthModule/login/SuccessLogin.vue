<script setup lang="ts">
import SuccessLoginChar from '@/assets/images/SuccessLoginChar.vue'
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
</script>

<template>
  <div
    class="w-full relative flex justify-center items-end overflow-hidden h-screen bg-[#D62727]"
  >
    <p
      class="text-[2rem] font-semibold text-white absolute bottom-[38rem] left-8"
    >
      Selamat Datang Kembali
    </p>
    <TransparentCircle
      class="absolute -top-[10rem] -right-[20rem]"
    ></TransparentCircle>
    <SuccessLoginChar class="absolute bottom-0 right-0" />
    <TransparentCircle
      class="absolute top-[13rem] -left-[11rem]"
    ></TransparentCircle>
    <div
      class="rounded-t-[2.9475rem] w-full bg-white flex flex-col items-center gap-[1.25rem] pt-[2.5rem] pb-[4.5rem] px-[3rem] z-10"
    >
      <div class="text-center">
        <p class="text-[1.25rem] font-semibold text-black">
          Mulai Cari Kerja yuk!
        </p>
        <p class="font-medium text-[#AEACAC]">
          Temukan pekerjaan yang sesuai denganmu!
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