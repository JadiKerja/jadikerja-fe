<script setup lang="ts">
import { useAuthStore } from '@/stores/userStores'
import SearchInput from '@/components/elements/SearchInput.vue'
import Hero from '@/components/elements/Hero.vue'
import BerandaCard from '@/components/elements/card/BerandaCard.vue'
import UpgradeDiriCard from '@/components/elements/card/UpgradeDiriCard.vue'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchUserData()
  }
})

console.log(authStore.user)
</script>

<template>
  <div
    class="h-screen flex flex-col px-7 pt-10 overflow-y-auto custom-scrollbar-hidden gap-6 pb-[6.5rem]"
  >
    <div class="flex flex-col">
      <p class="text-[1.125rem] text-[#909090] tracking-[.01406rem]">
        Selamat datang,
      </p>
      <p
        class="text-[1.5rem] text-[#0A0E32] font-bold tracking-[.01875rem]"
        v-if="authStore.user"
      >
        {{ authStore.user.client.fullName }}
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <SearchInput />
      <Hero />
      <p class="text-black font-bold">Rekomendasi Pekerjaan untukmu</p>

      <div class="w-full flex flex-row gap-4">
        <BerandaCard
          :id="'1'"
          :title="'Junior Software Engineer'"
          :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
          :name="'PT Tokopedia'"
          :isKhusus="true"
          :tags="[
            'Kerja di kantor',
            'Penuh Waktu',
            'Minimal Sarjana(S1)',
            'apa aja',
            'test',
          ]"
          class="w-full"
        />
        <BerandaCard
          :id="'2'"
          :title="'Cuci Mobil'"
          :address="'Tebet, Jakarta Selatan, DKI Jakarta'"
          :name="'Jono Sujono'"
          :isKhusus="false"
          :tags="['Kerja di kantor', 'Tanpa Minimal Pendidikan', 'Penuh Waktu']"
          class="w-full"
        />
      </div>
    </div>
    <p class="text-black font-bold">Tingkatkan kemampuan diri</p>
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
</template>
