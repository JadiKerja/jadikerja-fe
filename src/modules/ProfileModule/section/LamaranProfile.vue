<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { useRouter } from 'vue-router'
import LamaranCard from '@/components/elements/card/LamaranCard.vue'

const router = useRouter()

function goBack() {
  router.back()
}
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

        <p class="text-[1.25rem] font-bold text-white tracking-[0.01563rem]">
          Lamaran Saya
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 py-5 gap-4 z-20 bg-[#F8FAFF] h-fit overflow-y-auto custom-scrollbar-hidden"
    >
      <LamaranCard
        :id="'1'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
      <LamaranCard
        :id="'2'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
      <LamaranCard
        :id="'3'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
      <LamaranCard
        :id="'4'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
      <LamaranCard
        :id="'5'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
      <LamaranCard
        :id="'6'"
        :profile-url="'@/assets/images/tokped-icon.png'"
        :job="'Junior Software Engineer'"
        :name="'PT Tokopedia '"
        :address="'Setiabudi, Jakarta Selatan, DKI Jakarta'"
        :salary="'3 jt - 4,5 jt'"
      />
    </div>
  </div>
</template>