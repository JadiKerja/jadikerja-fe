<script setup lang="ts">
import { useAuthStore } from '@/stores/userStores'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import axios from 'axios'
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import UserBubble from './module-elements/UserBubble.vue'
import PeerBubble from './module-elements/PeerBubble.vue'
import { parseISO, format } from 'date-fns'
import { io } from 'socket.io-client'
import { useToast } from 'vue-toast-notification'
import { uuid } from 'vue-uuid'
import DateChip from './module-elements/DateChip.vue'

const messages = ref([])
const groupedMessages = ref(groupMessagesByDate(messages.value))
const peerName = ref()
const peerProfileUrl = ref()
const authorEmail = ref()
const isLoading = ref(false)
const textInput = ref('')
const socket = ref()
const chatContainer = ref(null)

const $toast = useToast()
const userStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const kerjainApplyId = route.params.id

onMounted(async () => {
  if (!userStore.user) {
    userStore.fetchUserData()
  }

  await fetchData()

  const token = Cookies.get('accessToken')

  socket.value = io(
    `${import.meta.env.VITE_API_URL}/chat?roomId=${kerjainApplyId}`,
    {
      extraHeaders: { Authorization: `Bearer ${token}` },
    },
  )

  socket.value.on('connect', () => {
    console.log('Connected to socket server')
  })

  socket.value.on('chat', (response) => {
    handleIncomingMessage(response)
  })

  socket.value.on('error', (error) => {
    console.error(error)

    $toast.error(error || 'Terjadi kesalahan. Coba beberapa saat lagi', {
      position: 'top',
    })
  })
})

onUnmounted(() => {
  socket.value.off('connect')
  socket.value.off('chat')
  socket.value.off('error')
})

function handleIncomingMessage(response) {
  const existingMessageIndex = messages.value.findIndex(
    (message) => message.id === response.id,
  )

  if (existingMessageIndex !== -1) {
    messages.value[existingMessageIndex] = response
  } else {
    messages.value.push(response)
  }

  groupedMessages.value = groupMessagesByDate(messages.value)
}

async function fetchData() {
  try {
    const token = Cookies.get('accessToken')

    isLoading.value = true

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kerjain/message/${kerjainApplyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 200) {
      messages.value = response.data.data.message
      peerName.value = response.data.data.peerName
      peerProfileUrl.value = response.data.data.peerProfileUrl
      authorEmail.value = response.data.data.authorEmail
      groupedMessages.value = groupMessagesByDate(messages.value)
      scrollToBottom()
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function groupMessagesByDate(messages) {
  let lastValidDate = null

  return messages.reduce((groups, message) => {
    let date: string | undefined

    if (message.createdAt) {
      try {
        const parsedDate = parseISO(message.createdAt) // Safely parse ISO date
        date = format(parsedDate, 'MM/dd/yyyy') // Format it in a cross-browser-compatible way
        lastValidDate = date
      } catch (e) {
        console.error('Invalid date format:', message.createdAt)
        console.error(e)
      }
    } else {
      date = lastValidDate || format(new Date(), 'MM/dd/yyyy')
    }

    if (date) {
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    }

    return groups
  }, {})
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSendMessage()
  }
}

function handleSendMessage() {
  if (!textInput.value) return

  const payload = {
    id: uuid.v4(),
    message: textInput.value,
  }

  try {
    JSON.stringify(payload)
  } catch (e) {
    console.error('Circular reference in payload:', e)
    return
  }

  socket.value.emit('chat', payload)

  messages.value.push({
    id: payload.id,
    role: authorEmail.value === userStore.user.email ? 'AUTHOR' : 'CLIENT',
    createdAt: new Date().toISOString(),
    message: payload.message,
  })

  groupedMessages.value = groupMessagesByDate(messages.value)

  textInput.value = ''
  scrollToBottom()
}

watch(messages, scrollToBottom)
watch(groupedMessages, scrollToBottom)
</script>

<template>
  <div class="h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full pb-[4.5rem] pt-[3rem] px-7 gap-6 overflow-hidden"
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
      <div class="flex flex-row justify-between w-full z-10">
        <WhiteBackButton @click="router.back" />

        <p class="text-[1.5rem] font-bold text-white tracking-[0.01563rem]">
          {{ peerName ? peerName : '...' }}
        </p>
        <div></div>
      </div>
    </div>
    <div
      ref="chatContainer"
      class="relative w-full h-full rounded-[1.875rem] mt-[-2rem] flex flex-col justify-between px-7 pb-7 pt-5 gap-4 z-20 bg-[#F8FAFF] overflow-y-auto custom-scrollbar-hidden"
    >
      <div
        v-for="(messages, date) in groupedMessages"
        :key="date"
        class="flex flex-col gap-2"
      >
        <DateChip :date="new Date(date)" />
        <div v-for="message in messages" :key="message.id">
          <UserBubble
            v-if="
              (authorEmail === userStore.user.email &&
                message.role === 'AUTHOR') ||
              (authorEmail !== userStore.user.email &&
                message.role === 'CLIENT')
            "
            :chat="message.message"
            :profile-url="userStore.user.client.profileUrl"
            :date="message.createdAt"
          />
          <PeerBubble
            v-else
            :chat="message.message"
            :profile-url="peerProfileUrl"
            :date="message.createdAt"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-between gap-2 px-7 pt-6 pb-3 border-t-2 border-[#E9E9E9]"
    >
      <textarea
        v-model="textInput"
        placeholder="Tuliskan pesanmu disini..."
        class="w-full bg-transparent outline-none focus:outline-none"
        @keydown="handleKeyDown"
      ></textarea>
      <button class="min-w-[42px] h-[42px] bg-[#D62727] rounded-full"></button>
    </div>
  </div>
</template>
