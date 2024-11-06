<script setup lang="ts">
import LengkapiProfile from '@/modules/AuthModule/lengkapi-profile/LengkapiProfile.vue'
import SuccessLogin from '@/modules/AuthModule/login/SuccessLogin.vue'
import { ref } from 'vue'
const currentView = ref('SignIn')

function showSuccessLogin() {
  currentView.value = 'SuccessLogin'
}
</script>

<template>
  <div>
    <LengkapiProfile
      v-if="currentView === 'SignIn'"
      @loginSuccess="showSuccessLogin"
    />
    <SuccessLogin v-else />
  </div>
</template>
