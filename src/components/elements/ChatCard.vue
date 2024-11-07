<script setup lang="ts">
import WhiteRobot from './WhiteRobot.vue';
import ProfileChat from './ProfileChat.vue';

const props = defineProps<{
  role: string;
  text: string;
  profileUrl: string;
}>();
</script>

<template>
  <div 
    class="flex gap-2 w-full items-start"
    :class="props.role === 'CLIENT' ? 'flex-row-reverse justify-end' : ''"
  >
    <component 
      :is="props.role === 'CLIENT' ? ProfileChat : WhiteRobot" 
      v-bind="props.role === 'CLIENT' ? { src: props.profileUrl } : {}"
    />
    <div 
      class="flex rounded-[0.9375rem]"
      :class="props.role === 'CLIENT' ? 'bg-[#EEF0F3]' : 'bg-[rgba(214, 39, 39, 0.20)]'"
    >
      <p class="text-black text-[0.875rem]">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>