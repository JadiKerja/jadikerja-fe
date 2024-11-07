<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/userStores'
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import RedRobot from '@/components/elements/RedRobot.vue'
import SentIcon from '@/assets/images/SentIcon.vue'
import ChatCard from '@/components/elements/ChatCard.vue'

const message = ref('')
const ListChat = ref<{ role: string, text: string }[]>([
  { role: 'ASSISTANT', text: 'Halo! Adakah yang bisa Jed bantu?' }
])

const chatContainerRef = ref<HTMLElement | null>(null)

function handleSendMessage() {
  if (message.value.trim()) {
    ListChat.value.push({ role: 'CLIENT', text: message.value.trim() })
    message.value = ''
    nextTick(() => scrollToBottom())
  }
}

function scrollToBottom() {
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
  }
}

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(true)

function goBack() {
  router.back()
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUserData()
  }
  isLoading.value = false
  nextTick(() => scrollToBottom())
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <div class="loader"></div>
  </div>
  <div v-else class="h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full pb-[3.5rem] pt-[2.5rem] px-7 gap-6 overflow-hidden"
    >
      <TransparentCircle
        class="z-[1] absolute -top-[5rem] -right-[6rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -top-[4rem] -right-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -bottom-[6rem] -left-[7rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="z-[1] absolute -bottom-[5rem] -left-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <div class="flex flex-row gap-5 w-full z-10">
        <WhiteBackButton class="" @click="goBack" />
        <div class="flex flex-row gap-5 items-center">
          <RedRobot />
          <div class="flex flex-col">
            <p class="text-white text-[1.875rem] font-bold leading-[140%]">
              Jed AI
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div
      ref="chatContainerRef"
      class="w-full rounded-[1.875rem] mt-[-2rem] max-h-[80vh] flex flex-col py-7 px-4 gap-5 z-20 bg-[#F8FAFF] overflow-y-auto custom-scrollbar-hidden"
    >
      <ChatCard
        v-for="(chat, index) in ListChat"
        :key="index"
        :role="chat.role"
        :text="chat.text"
      />
    </div>
    <div
      class="w-full z-30 flex flex-col items-center fixed bottom-0 max-w-[393px] px-5 bg-[#F8FAFF]">
      <div class="w-full h-[1px] bg-[#E9E9E9]"></div>
        <div
          class="w-full flex flex-row items-center gap-2 py-4"
        >
          <textarea
            v-model="message"
            class="py-4 w-full bg-[#F8FAFF] placeholder:text-[#A4A5AB] px-3 focus:outline-none focus:border-none resize-none custom-scrollbar-hidden"
            placeholder="Tuliskan pesanmu disini..."
            @input="scrollToBottom"
            @keydown.enter="handleSendMessage"
            rows="1"
          ></textarea>
          <button
            class="bg-[#D62727] p-2 rounded-full"
            @click="handleSendMessage"
          >
            <SentIcon />
          </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d62727;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>