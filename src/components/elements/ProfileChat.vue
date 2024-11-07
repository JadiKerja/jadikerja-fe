<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ url: string }>()
</script>

<template>
  <div
    class="p-[0.37863rem] bg-[#D62727] rounded-full max-h-[2.9375rem] max-w-[2.9375rem]"
  >
    <img :src="props.url" alt="White Robot" />
  </div>
</template>
