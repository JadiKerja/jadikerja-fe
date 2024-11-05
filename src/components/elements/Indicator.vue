<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ButtonIndicator from '@/assets/images/ButtonIndicator.vue'

const props = defineProps<{
  activeIndex: number
}>()

// const emits = defineEmits<{
//   (e: 'update:activeIndex', index: number): void;
// }>();
</script>

<template>
  <div class="flex flex-row gap-2">
    <ButtonIndicator :isActive="activeIndex" />
  </div>
</template>
