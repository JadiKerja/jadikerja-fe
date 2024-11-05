<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Indicator from '@/components/elements/Indicator.vue';
import NextButton from '@/components/elements/NextButton.vue';
import SkipButton from '@/components/elements/SkipButton.vue';

const activeIndex = ref(1);
const router = useRouter();

const paragraphText = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit');

const updateActiveIndex = () => {
  if (activeIndex.value < 3) {
    activeIndex.value += 1;
    if (activeIndex.value === 2) {
      paragraphText.value = 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    } else if (activeIndex.value === 3) {
      paragraphText.value = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';
    }
  } else {
    router.push('/login');
  }
};

const skipIndex = () => {
  router.push('/login');
};
</script>

<template>
  <div class="w-full flex justify-center items-end min-h-screen bg-[#D62727]">
    <div class="rounded-t-[2.9475rem] w-full bg-white flex flex-col items-center gap-[1.875rem] py-[6.5rem] px-[1.8125rem]">
      <p>{{ paragraphText }}</p>

      <Indicator :activeIndex="activeIndex" @update:activeIndex="updateActiveIndex" />

      <div class="flex flex-row gap-[1.1375rem]">
        <SkipButton text="Lewati" @click="skipIndex"/>
        <NextButton text="Lanjut" @click="updateActiveIndex" />
      </div>
    </div>
  </div>
</template>
