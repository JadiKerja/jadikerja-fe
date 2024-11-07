<script setup lang="ts">
import ChecklistIcon from '@/assets/images/ChecklistIcon.vue'
import LocationPin from '@/assets/images/LocationPin.vue'
import ProfilePin from '@/assets/images/ProfilePin.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: String,
  title: String,
  lat: Number,
  lng: Number,
  salary: Number,
  address: String,
  contactName: String,
  contactPhone: String,
})
</script>

<template>
  <div class="flex flex-col gap-4 px-3 py-5 rounded-[0.9375rem] bg-white">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row gap-2">
        <ChecklistIcon />
        <div class="flex flex-col gap-1">
          <p class="font-semibold text-[1.125rem] tracking-[0.01356rem]">
            {{ props.title }}
          </p>
          <div class="flex flex-row gap-1">
            <LocationPin />
            <p
              class="text-[0.875rem] font-medium text-[#AEACAC] tracking-[.00906rem] -mt-[2px]"
            >
              {{ props.address }}
            </p>
          </div>
          <div class="flex flex-row gap-1">
            <ProfilePin />
            <p
              class="text-[0.875rem] font-medium text-[#AEACAC] tracking-[.00906rem] -mt-[2px]"
            >
              {{ props.contactName }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-1 items-center justify-center self-start">
        <img src="@/assets/images/green-checklist.svg" alt="Checklist" />
        <p class="font-bold tracking-[.01131rem]">Rp{{ props.salary }}</p>
      </div>
    </div>
    <div class="flex w-full gap-2">
      <RouterLink
        :to="`/kerjain/${props.id}/edit`"
        class="w-[80px] py-2 text-[10px] bg-[#D62727] hover:bg-[#771515] text-white font-semibold text-center rounded-[18px] transition-all"
      >
        Edit
      </RouterLink>
      <RouterLink
        :to="`/kerjain/${props.id}/penawaran`"
        class="w-[80px] py-2 text-[10px] bg-[#F4A91E] hover:bg-[#d39626] text-white font-semibold text-center rounded-[18px] transition-all"
      >
        Penawaran
      </RouterLink>
      <button
        class="w-[80px] py-2 text-[10px] bg-[#198f51] hover:bg-[#d39626] text-white font-semibold text-center rounded-[18px] transition-all"
      >
        Selesaikan
      </button>
    </div>
  </div>
</template>
