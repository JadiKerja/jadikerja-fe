<script setup lang="ts">
const props = defineProps<{
  isActive: boolean,
  text: string,
  desc: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <div
      class="w-8 h-8 flex items-center justify-center rounded-full font-semibold"
      :class="{
        'text-white bg-gradient-to-br from-[#D62727] to-[#E55A24]': props.isActive,
        'bg-[#D9D9D9] text-[#AEACAC]': !props.isActive
      }"
    >
      {{ props.text }}
    </div>
    <p
      class="w-max text-[0.625rem] font-semibold tracking-[.00781rem]"
      :class="props.isActive ? 'text-[#D62727]' : 'text-black'"
    >
      {{ props.desc }}
    </p>
  </div>
</template>