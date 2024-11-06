<script setup lang="ts">
import { format, isToday, isYesterday } from 'date-fns'
import { onMounted, ref } from 'vue'

const { date } = defineProps<{ date: Date }>()

const text = ref('')

onMounted(() => {
  text.value = displayDate()
})

function displayDate() {
  if (isToday(date)) {
    return 'TODAY'
  } else if (isYesterday(date)) {
    return 'YESTERDAY'
  } else {
    return format(date, 'dd/MM/yy')
  }
}

console.log(text.value)
console.log(date)
</script>

<template>
  <div class="flex justify-center">
    <p
      class="w-max px-[10px] py-[2px] font-semibold text-xs bg-[#EEF0F3] rounded-[5px]"
    >
      {{ text }}
    </p>
  </div>
</template>
