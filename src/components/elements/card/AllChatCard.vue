<script setup lang="ts">

const props = defineProps<{
  id: string
  name: string
  address: string
  profileUrl: string
}>()
</script>

<template>
  <RouterLink 
  :to="`/kerjain/chat/${props.id}`"
  class="flex flex-row gap-4 w-full">
    <div class="p-[0.83rem] bg-[#D62727] rounded-full h-[3.125rem] w-[3.125rem]">
      <img :src="props.profileUrl" :alt="props.name" />
    </div>
    <div class="flex flex-col gap-1 w-full">
      <p class="text-black font-semibold">
        {{ props.name }}
      </p>
      <p class="text-black text-[0.75rem] ">
        {{ props.address }}
      </p>
      <div class="w-full h-[1px] bg-[#D9D9D9]"></div>
    </div>
  </RouterLink>
</template>
