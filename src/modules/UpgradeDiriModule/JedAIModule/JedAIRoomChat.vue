<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/userStores'
import RedRobot from '@/components/elements/RedRobot.vue'
import SentIcon from '@/assets/images/SentIcon.vue'
import ChatCard from '@/components/elements/ChatCard.vue'

const message = ref('')

function handleSendMessage() {
  if (message.value.trim()) {
    message.value = ''
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
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col p-7 gap-5 z-20 bg-[#F8FAFF] overflow-y-auto custom-scrollbar-hidden"
    ></div>
    <div
      class="w-full z-50 flex flex-col items-center fixed bottom-0 max-w-[393px] px-5"
    >
      <div class="w-full h-[1px] bg-[#E9E9E9]"></div>
      <div class="w-full flex flex-row items-center gap-2">
        <input
          type="text"
          v-model="message"
          class="py-8 w-full bg-[#F8FAFF] placeholder:text-[#A4A5AB] px-3 focus:outline-none focus:border-none"
          placeholder="Tuliskan pesanmu disini..."
          @keydown.enter="handleSendMessage"
        />
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
