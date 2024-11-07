import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import axios from 'axios'

export type OpenAIRole = 'user' | 'assistant' | 'system'

export const useJedAIStore = defineStore('jedAI', {
  state: () => ({
    chat: [{ role: 'assistant', content: 'Halo! Adakah yang bisa Jed bantu?' }],
    isLoading: false,
  }),

  actions: {
    async sendMessageToAI() {
      try {
        const token = Cookies.get('accessToken')

        this.isLoading = true

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/openai`,
          { messages: this.chat },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.data.code === 201) {
          this.chat.push({
            role: response.data.data.role,
            content: response.data.data.content,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async sendMessage(message) {
      this.chat.push(message)

      await this.sendMessageToAI()
    },
  },
})
