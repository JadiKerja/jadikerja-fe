<script setup lang="ts">
import { ref } from 'vue'
import SignUp from '@/modules/AuthModule/register/SignUp.vue'
import DataDiri from '@/modules/AuthModule/register/DataDiri.vue'

const currentView = ref('SignUp')

function goToDataDiri() {
  currentView.value = 'DataDiri'
}

function goToSignUp() {
  currentView.value = 'SignUp'
}
</script>

<template>
  <div>
    <SignUp v-if="currentView === 'SignUp'" @nextStep="goToDataDiri" />
    <DataDiri v-else @back="goToSignUp" />
  </div>
</template>
