<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Indicator from '@/components/elements/Indicator.vue'
import NextButton from '@/components/elements/button/NextButton.vue'
import SkipButton from '@/components/elements/button/SkipButton.vue'
import FirstCharIntro from '@/assets/images/FirstCharIntro.vue'
import SecondCharIntro from '@/assets/images/SecondCharIntro.vue'
import ThirdCharIntro from '@/assets/images/ThirdCharIntro.vue'

const activeIndex = ref(1)
const router = useRouter()

const paragraphText = ref(
  'Cari Kerjaanmu Disini!',
)

const descriptionText = ref (
  'Cari pekerjaan impianmu dengan JadiKerja, platform terpercaya untuk berbagai peluang kerja!'
)

const updateActiveIndex = () => {
  if (activeIndex.value < 3) {
    activeIndex.value += 1
    if (activeIndex.value === 2) {
      paragraphText.value =
        'Raih Peluang Kerja Sesuai Kualifikasi!'
      descriptionText.value =
        'JadiKerja membantu kamu menemukan pekerjaan yang sesuai dengan bakat dan kebutuhanmu.'
      } else if (activeIndex.value === 3) {
        paragraphText.value =
        'Berbagai Pilihan Kerja Menantimu di JadiKerja!'
        descriptionText.value =
          'Mulai perjalanan karirmu dengan peluang kerja yang beragam dan sesuai keinginanmu.'
    }
  } else {
    router.push('/login')
  }
}

const skipIndex = () => {
  router.push('/login')
}

const currentCharacter = computed(() => {
  if (activeIndex.value === 1) return FirstCharIntro
  if (activeIndex.value === 2) return SecondCharIntro
  if (activeIndex.value === 3) return ThirdCharIntro
})

</script>

<template>
  <div class="w-full flex justify-center items-end h-screen bg-[#D62727]">
    <component :is="currentCharacter" class="absolute z-[1] top-[2rem]" />
    <div
      class="rounded-t-[2.9475rem] w-full bg-white flex flex-col items-center gap-[1.5rem] py-[2.5rem] px-6 z-10"
    >
      <div class="flex flex-col gap-4">
        <p class="text-[#0E1446] text-center text-[1.625rem] font-bold tracking-[0.02031rem]">{{ paragraphText }}</p>
        <p class="text-[#B7B7B7] text-center font-medium tracking-[.0125rem]">{{ descriptionText }}</p>
      </div>
      <Indicator
        :activeIndex="activeIndex"
        @update:activeIndex="updateActiveIndex"
      />

      <div class="flex flex-row gap-[1.1375rem]">
        <SkipButton text="Lewati" @click="skipIndex" />
        <NextButton text="Lanjut" @click="updateActiveIndex" />
      </div>
    </div>
  </div>
</template>