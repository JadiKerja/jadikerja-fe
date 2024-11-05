<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SplashScreen from '@/modules/HomeModule/SplashScreen.vue'
import IntroPage from '@/modules/HomeModule/IntroPage.vue'

const showSplashScreen = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplashScreen.value = false
  }, 1000)
})
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <transition name="fade">
      <SplashScreen v-show="showSplashScreen" class="absolute" />
    </transition>

    <transition name="fade">
      <IntroPage v-show="!showSplashScreen" class="absolute" />
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
