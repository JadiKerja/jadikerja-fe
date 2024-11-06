<script setup lang="ts">
import PekerjaanProfile from '@/modules/ProfileModule/section/PekerjaanProfile.vue'
import PlusButton from '@/components/elements/button/PlusButton.vue'
</script>

<template>
  <div class="min-h-screen flex relative flex-col bg-[#F8FAFF]">
    <PekerjaanProfile />
    <PlusButton class="absolute bottom-10 right-10" />
  </div>
</template>
