<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  text: string
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    class="flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-white min-w-[9.9375rem] text-black font-semibold"
  >
    {{ text }}
  </button>
</template>
