<script setup lang="ts">
import TransparentCircle from './TransparentCircle.vue';
import HeroChar from '@/assets/images/HeroChar.vue';
import JakIcon from '@/assets/images/JakIcon.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col relative w-full rounded-[1.875rem] bg-[#D62727] overflow-hidden p-4 gap-4">
    <TransparentCircle class="w-[10.66975rem] h-[10.66975rem] bg-[#E55A2480] absolute -top-[2rem] -right-[2rem]"/>
    <TransparentCircle class="w-[10.66975rem] h-[10.66975rem] bg-[#E55A2480] absolute -left-[6rem] -bottom-[3rem]"/>
    <HeroChar class="absolute right-0 bottom-0"/>
    <div class="flex flex-row items-center z-10">
      <JakIcon />
      <div class="flex flex-col">
        <p class="text-[0.875rem] font-extrabold text-white tracking-[.00875rem]">JadiKerja</p>
        <p class="text-[0.375rem] font-semibold text-white tracking-[.00313rem]">Talenta Berkarya, Jakarta Menyala!</p>
      </div>
    </div>
    <p class="text-[1.25rem] font-semibold text-white max-w-[10.375rem] z-10">
      Mulai Cari Kerja di sini yuk!
    </p>
    <RouterLink
    to="/kerjain"
    class="p-[0.625rem] min-w-[7.1875rem] items-center justify-center flex bg-[#F4A91E] text-white text-[0.753rem] font-semibold w-fit rounded-[0.9375rem] z-10">
      Mulai
    </RouterLink>
  </div>
</template>
