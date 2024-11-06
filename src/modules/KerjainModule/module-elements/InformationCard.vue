<script setup lang="ts">
defineProps({ title: String })
</script>

<template>
  <div class="flex items-center gap-4 py-6">
    <img
      src="@/assets/images/search-kerja.png"
      alt="search-kerja"
      width="90"
      height="90"
    />
    <p class="font-bold text-xl">{{ title }}</p>
  </div>
</template>
