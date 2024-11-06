<script setup lang="ts">
import Navbar from '@/components/elements/Navbar.vue'
import EditProfile from '@/modules/ProfileModule/section/EditProfile.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F8FAFF]">
    <EditProfile />
    <Navbar />
  </div>
</template>
