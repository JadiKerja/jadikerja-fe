<script setup lang="ts">
import ButtonIndicator from '@/assets/images/ButtonIndicator.vue'

const props = defineProps<{
  activeIndex: number
}>()

</script>

<template>
  <div class="flex flex-row gap-2">
    <ButtonIndicator :isActive="activeIndex" />
  </div>
</template>
