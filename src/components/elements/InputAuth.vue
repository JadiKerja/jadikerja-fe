<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import { useInputStore } from '@/stores/authStores'
import EyeIcon from '@/assets/images/Eye.vue'
import EyeSlashIcon from '@/assets/images/EyeSlash.vue'

const props = defineProps<{
  label: string
  placeholder: string
  type?: string
  field: keyof ReturnType<typeof useInputStore>
  LeftIcon?: any
  rightIcon?: boolean
}>()

const inputStore = useInputStore()
const isFocused = ref(false)

const iconColor = computed(() =>
  inputStore[props.field] || isFocused.value ? '#D62727' : '#AEACAC',
)
const iconPasswordColor = computed(() =>
  inputStore[props.field] || isFocused.value ? '#000' : '#AEACAC',
)
const borderColor = computed(() =>
  inputStore[props.field] || isFocused.value
    ? 'border-[#D62727]'
    : 'border-[#AEACAC]',
)

const inputType = computed(() => {
  if (props.type === 'password') {
    return props.field === 'password'
      ? inputStore.showPassword
        ? 'text'
        : 'password'
      : inputStore.showConfirmPassword
        ? 'text'
        : 'password'
  }
  return props.type || 'text'
})

const RightIconComponent = computed(() =>
  props.field === 'password'
    ? inputStore.showPassword
      ? EyeIcon
      : EyeSlashIcon
    : inputStore.showConfirmPassword
      ? EyeIcon
      : EyeSlashIcon,
)

function togglePasswordVisibility() {
  if (props.field === 'password') {
    inputStore.toggleShowPassword()
  } else if (props.field === 'confirmPassword') {
    inputStore.toggleShowConfirmPassword()
  }
}
</script>

<template>
  <div class="flex flex-col items-start gap-[0.3125rem] w-full">
    <p class="text-black font-semibold tracking-[.0125rem]">{{ label }}</p>
    <div class="relative w-full items-center flex gap-4">
      <component
        v-if="LeftIcon && props.field !== 'phoneNumber'"
        :is="LeftIcon"
        :color="iconColor"
        class="absolute left-4"
      />
      <p
        v-if="props.field === 'phoneNumber'"
        class="absolute left-4 text-black font-semibold"
      >
        +62 |
      </p>

      <input
        :type="inputType"
        v-model="inputStore[props.field]"
        :placeholder="placeholder"
        :class="[
          'border-[1.506px] border-solid py-4 rounded-[0.6275rem] flex items-center bg-white w-full text-black placeholder:text-[#AEACAC]',
          borderColor,
          LeftIcon || props.field === 'phoneNumber' ? 'pl-16' : 'pl-4',
          rightIcon && props.type === 'password' ? 'pr-12' : 'pr-4',
        ]"
        @focus="isFocused = true"
        @blur="isFocused = false"
        required
      />

      <component
        v-if="rightIcon && props.type === 'password'"
        :is="RightIconComponent"
        :color="iconPasswordColor"
        class="absolute right-4 cursor-pointer"
        @click="togglePasswordVisibility"
      />
    </div>
  </div>
</template>
