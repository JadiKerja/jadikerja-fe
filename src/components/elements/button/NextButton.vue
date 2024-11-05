<script setup lang="ts">

const props = defineProps<{
  text: string
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    class="flex p-[0.6275rem] justify-center items-center rounded-[1.5rem] bg-[#D62727] min-w-[9.9375rem] text-white font-semibold"
  >
    {{ text }}
  </button>
</template>
