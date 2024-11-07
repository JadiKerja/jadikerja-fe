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
    class="flex flex-row gap-4 w-full"
  >
    <img
      :src="props.profileUrl"
      :alt="props.name"
      class="bg-[#D62727] h-[3.125rem] min-w-[3.125rem] w-[3.125rem] rounded-full overflow-hidden"
    />
    <div class="flex flex-col gap-1 w-full">
      <p class="text-black font-semibold">
        {{ props.name }}
      </p>
      <p class="text-black text-[0.75rem]">
        {{ props.address }}
      </p>
      <div class="w-full h-[1px] bg-[#D9D9D9]"></div>
    </div>
  </RouterLink>
</template>
