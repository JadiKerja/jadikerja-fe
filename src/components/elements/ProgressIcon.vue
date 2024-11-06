<script setup lang="ts">
import CircleElement from './CircleElement.vue'

const props = defineProps<{
  pageNumber: number
}>()
</script>

<template>
  <div class="flex flex-row gap-2 w-full items-center justify-center">
    <CircleElement :isActive="true" :text="'1'" :desc="'Isi Kerjaan'" />

    <div
      class="w-[5.75031rem] h-[0.1875rem] -mt-5"
      :class="props.pageNumber >= 2 ? 'bg-[#E55A24]' : 'bg-[#D9D9D9]'"
    ></div>

    <CircleElement
      :isActive="props.pageNumber >= 2"
      :text="'2'"
      :desc="'Data Diri'"
    />

    <div
      class="w-[5.75031rem] h-[0.1875rem] -mt-5"
      :class="props.pageNumber >= 3 ? 'bg-[#E55A24]' : 'bg-[#D9D9D9]'"
    ></div>

    <CircleElement
      :isActive="props.pageNumber >= 3"
      :text="'3'"
      :desc="'Konfirmasi'"
    />
  </div>
</template>
