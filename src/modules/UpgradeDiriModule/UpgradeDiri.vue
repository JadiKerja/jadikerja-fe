<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/userStores'
import SearchInput from '@/components/elements/SearchInput.vue';
import TwoUserIcon from '@/assets/images/TwoUserIcon.vue';
import { RouterLink } from 'vue-router';
import WhiteRobot from '@/components/elements/WhiteRobot.vue';
import UpgradeDiriCard from '@/components/elements/card/UpgradeDiriCard.vue';

const profileStore = useAuthStore()

onMounted(() => {
  if (!profileStore.user) {
    profileStore.fetchUserData()
  }
})

</script>

<template>
  <div class="min-h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full py-8 px-7 gap-6 overflow-hidden"
    >
      <TransparentCircle
        class="absolute -top-[4rem] -right-[6rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -top-[3rem] -right-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[3rem] -left-[5rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[2rem] -left-[3rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />

      <p class="text-[1.875rem] leading-[140%] font-bold text-white tracking-[0.02188rem] z-10">
        Upgrade Diri
      </p>
      <SearchInput 
      :isBeranda="false"
      class="w-full z-10"
      />
    </div>
    <div
      class="flex flex-col px-7 pt-4 pb-[7rem] text-black font-semibold w-full gap-5"
    >
      <div class="flex flex-col gap-3">
        <div class="flex flex-row gap-3">
          <TwoUserIcon />
          <p class="text-[0.753rem] font-medium text-[#AAA5A5]">
            Bot Pesan
          </p>
        </div>
        <RouterLink 
        to="/jedai"
        class="w-full flex flex-row py-3 px-4 bg-[#F8C2C2] rounded-[1.875rem] gap-4">
          <WhiteRobot class="w-[2.05531rem]"/>
          <div class="flex flex-col">
            <p class="text-black text-[0.875rem] font-semibold">Jed AI</p>
            <p class="text-black text-[0.6875rem] font-normal">Temukan kursus cocok untukmu disini</p>
          </div>
        </RouterLink>
      </div>
      <p class="text-black font-bold">
        Tingkatkan kemampuan diri 
      </p>
      <div class="flex flex-col gap-2">
        <UpgradeDiriCard
          :id="'1'"
          :title="'Belajar Pemrograman Web'"
          :desc="'Menjadi Pengembang Web Full-Stack hanya dengan SATU kursus. HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, dan DApps.'"
          :name="'Dr. Siti Zubaedah, Developer and Lecturer'"
        />
        <UpgradeDiriCard
          :id="'2'"
          :title="'Belajar Digital Marketing'"
          :desc="'Strategi Pemasaran Digital, Pemasaran Media Sosial, WordPress, SEO, ChatGPT, Email, Instagram, Facebook, YouTube, iklan'"
          :name="'Dr. Joni marjoni, Marketeer and Lecturer'"
        />
        <UpgradeDiriCard
          :id="'3'"
          :title="'Belajar Masak Steak Ayam'"
          :desc="'Belajar memasak bersama saya - Saya senang mengajar memasak kepada murid-murid saya'"
          :name="'Rini Yuliana Marsudini, Chef at Abuba Steak'"
        />
      </div>
    </div>
  </div>
</template>