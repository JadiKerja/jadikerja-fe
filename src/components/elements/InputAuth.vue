<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import EyeIcon from '@/assets/images/Eye.vue'
import EyeSlashIcon from '@/assets/images/EyeSlash.vue'

const props = defineProps<{
  label: string
  placeholder: string
  LeftIcon?: any
  rightIcon?: boolean
}>()

const inputValue = ref('')
const isFocused = ref(false)
const showPassword = ref(false)

const iconColor = computed(() =>
  inputValue.value || isFocused.value ? '#D62727' : '#AEACAC',
)
const iconPasswordColor = computed(() =>
  inputValue.value || isFocused.value ? '#000' : '#AEACAC',
)
const borderColor = computed(() =>
  inputValue.value || isFocused.value ? 'border-[#D62727]' : 'border-[#AEACAC]',
)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))
const RightIconComponent = computed(() =>
  showPassword.value ? EyeIcon : EyeSlashIcon,
)
</script>

<template>
  <div class="flex flex-col items-start gap-[0.3125rem]">
    <p class="text-black font-semibold tracking-[.0125rem]">
      {{ label }}
    </p>
    <div class="relative w-full items-center flex gap-4">
      <component
        v-if="LeftIcon"
        :is="LeftIcon"
        :color="iconColor"
        class="absolute left-4"
      />
      <input
        :type="inputType"
        v-model="inputValue"
        :placeholder="placeholder"
        :class="[
          'border-[1.506px] border-solid py-4 rounded-[0.6275rem] flex items-center bg-white w-full text-black placeholder:text-[#AEACAC]',
          borderColor,
          LeftIcon ? 'pl-12' : 'pl-4',
          rightIcon ? 'pr-12' : 'pr-4',
        ]"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <component
        v-if="rightIcon"
        :is="RightIconComponent"
        :color="iconPasswordColor"
        class="absolute right-4 cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </div>
  </div>
</template>
