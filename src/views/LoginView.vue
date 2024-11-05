<script setup lang="ts">
import { ref } from 'vue'
import SignIn from '@/modules/AuthModule/login/SignIn.vue'
import SuccessLogin from '@/modules/AuthModule/login/SuccessLogin.vue'

const currentView = ref('SignIn')

function showSuccessLogin() {
  currentView.value = 'SuccessLogin'
}
</script>

<template>
  <div>
    <SignIn v-if="currentView === 'SignIn'" @loginSuccess="showSuccessLogin" />
    <SuccessLogin v-else />
  </div>
</template>
