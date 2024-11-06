<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import { useKerjainStore } from '@/stores/kerjainStores'

const props = defineProps<{
  label: string
  placeholder: string
  field: keyof ReturnType<typeof useKerjainStore>
}>()

const kerjainStore = useKerjainStore()
const isFocused = ref(false)

const iconColor = computed(() =>
  kerjainStore[props.field] || isFocused.value ? '#D62727' : '#AEACAC',
)

const borderColor = computed(() =>
  kerjainStore[props.field] || isFocused.value
    ? 'border-[#D62727]'
    : 'border-[#AEACAC]',
)

const fieldPrefix = computed(() => {
  if (props.field === 'phoneNumber') {
    return '+62 |'
  } else if (props.field === 'price') {
    return 'Rp'
  }
  return ''
})
</script>

<template>
  <div class="flex flex-col items-start gap-[0.3125rem] w-full">
    <p class="text-[0.875rem] text-black font-semibold tracking-[.0125rem]">{{ label }}</p>
    <div class="relative w-full items-center flex gap-4">
      <component
        :color="iconColor"
        class="absolute left-4"
      />
      
      <p
        v-if="fieldPrefix"
        class="absolute left-4 text-black font-semibold"
      >
        {{ fieldPrefix }}
      </p>

      <input
        v-model="kerjainStore[props.field]"
        :placeholder="placeholder"
        :class="[ 
          'pr-4 border-[1.506px] border-solid py-4 rounded-[0.6275rem] flex items-center bg-white w-full text-black placeholder:text-[#AEACAC]',
          borderColor,
          props.field === 'phoneNumber' ? 'pl-16' : props.field === 'price' ? 'pl-10' : 'pl-4'
        ]"
        @focus="isFocused = true"
        @blur="isFocused = false"
        required
      />
    </div>
  </div>
</template>
