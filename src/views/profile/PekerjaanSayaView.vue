<script setup lang="ts">
import PekerjaanProfile from '@/modules/ProfileModule/section/PekerjaanProfile.vue'
import PlusButton from '@/components/elements/button/PlusButton.vue'
</script>

<template>
  <div class="min-h-screen flex relative flex-col bg-[#F8FAFF]">
    <PekerjaanProfile />
    <PlusButton
      class="fixed bottom-10 right-0 mr-[calc((100vw-393px+40px)/2)]"
    />
  </div>
</template>
