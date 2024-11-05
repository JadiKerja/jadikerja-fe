<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  isActive: number;
}>()

const color1 = computed(() => (props.isActive === 1 ? '#D62727' : '#AEACAC'))
const color2 = computed(() => (props.isActive === 2 ? '#D62727' : '#AEACAC'))
const color3 = computed(() => (props.isActive === 3 ? '#D62727' : '#AEACAC'))
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="8" viewBox="0 0 36 8" fill="none">
    <circle :fill="color1" cx="4" cy="4.00015" r="4" />
    <circle :fill="color2" cx="17.9996" cy="4" r="4" />
    <circle :fill="color3" cx="31.9999" cy="4" r="4" />
  </svg>
</template>
