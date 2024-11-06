<script setup lang="ts">
import { defineEmits } from 'vue'
import YellowVerified from '@/assets/images/YellowVerified.vue';
import TransparentCircle from '@/components/elements/TransparentCircle.vue';
import { RouterLink } from 'vue-router';

const emit = defineEmits(['next', 'back'])
</script>

<template>
  <div class="w-full h-screen flex flex-col relative justify-evenly bg-[#D62727] overflow-hidden p-7">
    <TransparentCircle
      class="z-[1] absolute top-[4rem] -right-[6rem] bg-[#E55A24B2] w-[18.56713rem] h-[18.56713rem]"
    />
    <TransparentCircle
    class="z-[1] absolute top-[8rem] right-[13rem] bg-[#E55A24B2] w-[2.24175rem] h-[2.24175rem]"
    />
    <TransparentCircle
    class="z-[1] absolute top-[11rem] right-[15rem] bg-[#E55A24B2] w-[2.24175rem] h-[2.24175rem]"
    />
    <TransparentCircle
    class="z-[1] absolute -bottom-[1rem] -left-[10rem] bg-[#E55A24B2] w-[18.56713rem] h-[18.56713rem]"
    />
    <TransparentCircle
    class="z-[1] absolute bottom-[4rem] right-[10rem] bg-[#E55A24B2] w-[2.24175rem] h-[2.24175rem]"
    />
    <TransparentCircle
    class="z-[1] absolute bottom-[3rem] right-[11rem] bg-[#E55A24B2] w-[2.24175rem] h-[2.24175rem]"
    />
    <div class="flex flex-col gap-[0.94rem] items-center z-10">
      <YellowVerified />
      <p class="text-[2rem] text-white text-center font-bold">
        Berhasil Menambah Pekerjan
      </p>
      <p class="text-[#EEF0F3] text-center">
        Kamu telah berhasil menambah pekerjaan untuk ditawarkan.
      </p>
    </div>
    <div class="flex flex-col gap-[0.94rem] z-10">
      <RouterLink
      to="/beranda"
      class="w-full rounded-[1.47825rem] bg-white text-[#D62727] py-4 flex justify-center text-[1.25rem] font-semibold text-center">
        Kembali ke Beranda
      </RouterLink>
      <RouterLink
      to="/profile/kerjaan"
      class="w-full rounded-[1.47825rem] bg-[#F4A91E] text-white py-4 flex justify-center text-[1.25rem] font-semibold text-center">
        Lihat Daftar Pekerjaan
      </RouterLink>
    </div>
  </div>
</template>
