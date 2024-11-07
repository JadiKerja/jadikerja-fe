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
  <div class="flex gap-2">
    <img
      :src="profileUrl"
      alt="peer-profile-image"
      class="w-[40px] min-w-[40px] h-[40px] rounded-full overflow-hidden"
    />
    <div class="flex flex-col">
      <vue-markdown
        :source="chat?.replaceAll(/\n/gi, '\n\n')"
        class="px-4 py-2 text-xs bg-[#D6272720] rounded-xl"
      />
      <span class="text-[8px]">{{ format(date, 'HH:mm') }}</span>
    </div>
  </div>
</template>
