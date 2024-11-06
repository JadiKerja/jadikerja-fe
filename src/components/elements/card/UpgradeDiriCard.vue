<script setup lang="ts">
const props = defineProps({
  id: String,
  title: String,
  desc: String,
  name: String,
  imgSrc: String,
  url: String,
})

function openUrl() {
  if (props.url) {
    window.open(props.url, '_blank')
  }
}
</script>

<template>
  <div
    class="rounded-[0.9375rem] bg-white flex flex-row p-[0.625rem] shadow-sm gap-2 items-center"
  >
    <img
      :src="imgSrc"
      alt="Photo"
      class="w-[9.87425rem] h-[5.43413rem]"
    />
    <div class="flex flex-col gap-[0.375rem]">
      <p class="text-black text-[0.625rem] font-medium">
        {{ props.title }}
      </p>
      <p class="text-black text-[0.375rem]">
        {{ props.desc }}
      </p>
      <div
        class="py-[0.1rem] text-[0.375rem] px-[0.225rem] bg-[#EEF0F3] rounded-[0.3125rem] w-fit"
      >
        {{ props.name }}
      </div>
      <button
        class="w-fit rounded-[0.3125rem] py-1 px-3 min-w-[5.1875rem] bg-[#D62727] text-white flex items-center justify-center text-[0.5rem] font-semibold"
        @click="openUrl"
      >
        Mulai Belajar
      </button>
    </div>
  </div>
</template>