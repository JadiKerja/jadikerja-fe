<script setup lang="ts">
import { useAuthStore } from '@/stores/userStores'
import SearchInput from '@/components/elements/SearchInput.vue'
import Hero from '@/components/elements/Hero.vue'
import BerandaCard from '@/components/elements/card/BerandaCard.vue'
import UpgradeDiriCard from '@/components/elements/card/UpgradeDiriCard.vue'
import { onMounted, ref } from 'vue'
import upgradeImage1 from '@/assets/images/upgrade-diri-1.png'
import upgradeImage2 from '@/assets/images/upgrade-diri-2.png'
import upgradeImage3 from '@/assets/images/upgrade-diri-3.png'

const authStore = useAuthStore()
const isLoading = ref(true)

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchUserData().finally(() => {
      isLoading.value = false
    })
  } else {
    isLoading.value = false
  }
})

console.log(authStore.user)
</script>

<template>
  <div
    class="h-screen flex flex-col px-7 pt-10 overflow-y-auto custom-scrollbar-hidden gap-6 pb-[6.5rem]"
  >
    <template v-if="isLoading">
      <div class="flex justify-center items-center h-full">
        <div class="loader"></div>
      </div>
    </template>

    <template v-else>
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
        <SearchInput :isBeranda="true" />
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
          :imgSrc="upgradeImage1"
          :url="'https://www.udemy.com/course/the-complete-web-development-bootcamp'"
        />
        <UpgradeDiriCard
          :id="'2'"
          :title="'Belajar Digital Marketing'"
          :desc="'Strategi Pemasaran Digital, Pemasaran Media Sosial, WordPress, SEO, ChatGPT, Email, Instagram, Facebook, YouTube, iklan'"
          :name="'Dr. Joni Marjoni, Marketeer and Lecturer'"
          :imgSrc="upgradeImage2"
          :url="'https://www.udemy.com/course/digital-marketing-strategy-course-wordpress-seo-instagram-facebook'"
        />
        <UpgradeDiriCard
          :id="'3'"
          :title="'Belajar Masak Steak Ayam'"
          :desc="'Belajar memasak bersama saya - Saya senang mengajar memasak kepada murid-murid saya'"
          :name="'Rini Yuliana Marsudini, Chef at Abuba Steak'"
          :imgSrc="upgradeImage3"
          :url="'https://www.udemy.com/course/master-chef-cooking-course-12-episodes'"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #D62727;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>