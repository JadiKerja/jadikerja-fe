<script setup lang="ts">
import SearchIcon from '@/assets/images/SearchIcon.vue'
</script>

<template>
  <div class="flex flex-row">
    <input
      type="text"
      placeholder="Cari kerja gak pake ribet di sini!"
      class="text-[0.753rem] font-medium placeholder:text-[#AAA5A5] text-[#0A0E32] py-4 px-5 bg-white w-full rounded-l-[0.6275rem]"
    />
    <button class="p-2 bg-[#D62727] rounded-r-[0.6275rem]">
      <SearchIcon />
    </button>
  </div>
</template>
