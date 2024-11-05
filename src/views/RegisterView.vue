<script setup lang="ts">
import { ref } from 'vue'
import SignUp from '@/modules/AuthModule/register/SignUp.vue'
import DataDiri from '@/modules/AuthModule/register/DataDiri.vue'
import SuccessCreate from '@/modules/AuthModule/register/SuccessCreate.vue'

const currentView = ref('SignUp')

function goToDataDiri() {
  currentView.value = 'DataDiri'
}

function goToSignUp() {
  currentView.value = 'SignUp'
}

function goToSuccessCreate() {
  currentView.value = 'SuccessCreate'
}
</script>

<template>
  <div>
    <SignUp v-if="currentView === 'SignUp'" @nextStep="goToDataDiri" />
    <DataDiri v-else-if="currentView === 'DataDiri'" @back="goToSignUp" @submit="goToSuccessCreate" />
    <SuccessCreate v-else />
  </div>
</template>