<script setup lang="ts">
import WhiteRobot from './WhiteRobot.vue'
import ProfileChat from './ProfileChat.vue'
import { useAuthStore } from '@/stores/userStores';

const userAuth = useAuthStore();

const props = defineProps<{
  role: string
  text: string
}>()
</script>

<template>
  <div
    class="flex gap-2 w-full items-start"
    :class="props.role === 'CLIENT' ? 'flex-row-reverse' : ''"
  >
    <ProfileChat v-if="props.role === 'CLIENT'" :url="userAuth.user.client.profileUrl" />
    <WhiteRobot v-else />

    <div
      class="flex rounded-[0.9375rem] p-[1.125rem]"
      :class="
        props.role === 'CLIENT'
          ? 'bg-[#EEF0F3]'
          : 'bg-[#d6272733]'
      "
    >
      <p class="text-black text-[0.875rem]">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>
