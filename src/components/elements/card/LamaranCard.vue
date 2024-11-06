<script setup lang="ts">
import ChecklistIcon from '@/assets/images/ChecklistIcon.vue'
import LocationPin from '@/assets/images/LocationPin.vue'
import ProfilePin from '@/assets/images/ProfilePin.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: String,
  profileUrl: String,
  job: String,
  name: String,
  address: String,
  salary: String,
})
</script>

<template>
  <div
    class="flex flex-col gap-4 px-3 py-5 rounded-[0.9375rem] bg-white w-full"
  >
    <div class="flex flex-row gap-4">
      <img src="@/assets/images/tokped-icon.png" :alt="name" class="w-16 h-16" />
      <div class="flex flex-col gap-1">
        <p class="text-black text-[0.875rem] font-semibold">
          {{ props.job }}
        </p>
        <div class="flex flex-col">
          <p class="text-[0.625rem] font-medium text-black">
            {{ props.name }}
          </p>
          <p class="text-[0.5rem] text-black font-light">
            {{ props.address }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-end flex-row px-3">
      <p class="text-[#E55A24] text-[0.75rem] font-semibold">
        {{ props.salary }}
      </p>
    </div>
  </div>
</template>
