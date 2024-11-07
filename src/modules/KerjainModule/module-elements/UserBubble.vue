<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'
import { format } from 'date-fns'

const { chat, profileUrl } = defineProps<{
  chat: string
  profileUrl: string
  date: Date
}>()
</script>

<template>
  <div class="flex justify-end gap-2">
    <div class="flex flex-col">
      <vue-markdown
        :source="chat?.replaceAll(/\n/gi, '\n\n')"
        class="px-4 py-2 text-xs bg-[#EEF0F3] rounded-xl"
      />
      <span class="text-[8px] text-right">{{ format(date, 'HH:mm') }}</span>
    </div>
    <img
      :src="profileUrl"
      alt="user-profile-image"
      class="w-[40px] min-w-[40px] h-[40px] rounded-full overflow-hidden"
    />
  </div>
</template>
