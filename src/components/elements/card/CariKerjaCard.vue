<script setup lang="ts">
import KerjainIcon from '@/assets/images/KerjainIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  id: String,
  title: String,
  address: String,
  name: String,
  isKhusus: Boolean,
  tags: Array as () => string[],
  salary: String,
})

const displayedTags = computed(() =>
  props.isKhusus ? props.tags.slice(0, 3) : props.tags.slice(0, 4),
)
const remainingTagCount = computed(
  () => props.tags.length - (props.isKhusus ? 3 : 4),
)
</script>

<template>
  <div
    class="rounded-[0.9375rem] bg-white flex-col p-[0.625rem] shadow-sm flex gap-2"
  >
    <p class="text-black text-[0.5rem] font-semibold">
      {{ props.title }}
    </p>

    <div class="flex flex-wrap gap-1">
      <div
        v-if="isKhusus"
        class="p-[0.19rem] rounded-[0.3125rem] text-[0.375rem] font-medium text-[#E55A24] bg-[#F4A91E80] flex items-center justify-center"
      >
        Keterampilan Khusus
      </div>

      <div
        v-for="tag in displayedTags"
        :key="tag"
        class="p-[0.19rem] text-[0.375rem] rounded-[0.3125rem] bg-[#EEF0F3] flex items-center justify-center"
      >
        {{ tag }}
      </div>

      <div
        v-if="props.tags.length > (isKhusus ? 3 : 4)"
        class="p-[0.19rem] rounded-[0.3125rem] bg-[#EEF0F3] text-[0.375rem] font-medium text-gray-600 flex items-center justify-center"
      >
        +{{ remainingTagCount }}
      </div>
    </div>

    <div class="flex flex-row gap-1 mt-2">
      <KerjainIcon />
      <div class="flex flex-col">
        <p class="text-black text-[0.375rem] font-medium">
          {{ props.name }}
        </p>
        <p class="text-black text-[0.375rem] font-light">
          {{ props.address }}
        </p>
      </div>
    </div>

    <div class="flex flex-row justify-between items-center">
      <RouterLink
        :to="`/carikerja/${id}`"
        class="px-2 py-1 items-center justify-center bg-[#D62727] rounded-[0.3125rem] text-[0.625rem] font-semibold text-white"
      >
        Lihat Detail
      </RouterLink>
      <div
        class="px-[0.62rem] py-[0.31rem] bg-[#E55A24] text-[#FFFFFF] text-[0.625rem] font-semibold rounded-[0.3125rem] flex items-center justify-center"
      >
        {{ salary }}
      </div>
    </div>
  </div>
</template>
