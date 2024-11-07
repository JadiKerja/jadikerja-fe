<script setup lang="ts">
import SearchIcon from '@/assets/images/SearchIcon.vue'

const props = defineProps<{
  isBeranda: boolean
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement
  emit('search', target.value)
}
</script>

<template>
  <div class="flex flex-row">
    <input
      type="text"
      :placeholder="
        isBeranda ? 'Cari kerja gak pake ribet di sini!' : 'Cari materi disini'
      "
      :class="[
        'text-[0.753rem] font-medium text-[#0A0E32] bg-white w-full rounded-l-[0.6275rem]',
        isBeranda
          ? 'py-4 px-5 placeholder:text-[#AAA5A5]'
          : 'py-3 px-5 placeholder:text-[#AAA5A5]',
      ]"
      @input="handleSearch"
    />
    <button
      :class="[
        'rounded-r-[0.6275rem]',
        isBeranda ? 'bg-[#D62727] p-2' : 'bg-[#F4A91E] py-2 px-3',
      ]"
    >
      <SearchIcon />
    </button>
  </div>
</template>
