<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#C8CED7',
  },
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.2009 6.44044C16.2009 9.88064 13.4426 12.6391 9.99996 12.6391C6.5585 12.6391 3.799 9.88064 3.799 6.44044C3.799 3.00024 6.5585 0.24292 9.99996 0.24292C13.4426 0.24292 16.2009 3.00024 16.2009 6.44044ZM9.99996 23.4655C4.91921 23.4655 0.629395 22.6397 0.629395 19.4536C0.629395 16.2665 4.94616 15.4699 9.99996 15.4699C15.0819 15.4699 19.3705 16.2957 19.3705 19.4818C19.3705 22.669 15.0538 23.4655 9.99996 23.4655Z"
      :fill="color"
    />
  </svg>
</template>
