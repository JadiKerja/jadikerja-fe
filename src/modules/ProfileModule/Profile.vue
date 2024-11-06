<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import IconProfile from '@/assets/images/IconProfile.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/userStores'
import { RouterLink } from 'vue-router'
import EditProfileIcon from '@/assets/images/EditProfileIcon.vue'
import BuildingIcon from '@/assets/images/BuildingIcon.vue'
import InfoIcon from '@/assets/images/InfoIcon.vue'
import LamaranIcon from '@/assets/images/LamaranIcon.vue'
import LogoutIcon from '@/assets/images/LogoutIcon.vue'
import Cookies from 'js-cookie'

const profileStore = useAuthStore()
// const profileImageUrl = ref(profileStore.user?.client?.profileUrl || '')
// const fullName = ref(profileStore.user?.client?.fullName || 'Guest')

onMounted(() => {
  if (!profileStore.user) {
    profileStore.fetchUserData()
  }
})

console.log(profileStore.user)

function handleLogout() {
  profileStore.setUser(null)
  Cookies.remove('accessToken')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full pt-6 pb-[2.5rem] gap-6 overflow-hidden"
    >
      <TransparentCircle
        class="absolute -top-[4rem] -right-[6rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -top-[3rem] -right-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[2rem] -left-[7rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[3rem] -left-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />

      <p class="text-[1.75rem] font-bold text-white tracking-[0.02188rem]">
        Profil Akun
      </p>

      <div
        class="flex relative items-center justify-center w-[5.9375rem] h-[6.1875rem] mt-4"
      >
        <div
          class="absolute w-full h-full rounded-full"
          :style="{
            backgroundImage: profileStore.user?.client?.profileUrl
              ? `url(${profileStore.user?.client?.profileUrl})`
              : '',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <IconProfile
            v-if="!profileStore.user?.client?.profileUrl"
            class="w-full h-full"
          />
        </div>
      </div>
      <p class="text-[1.25rem] font-semibold tracking-[.01563rem] text-white">
        {{ profileStore.user?.client?.fullName ?? 'Guest' }}
      </p>
    </div>
    <div
      class="flex flex-col px-7 pt-5 pb-[7rem] text-black font-semibold w-full gap-5"
    >
      <p class="text-[1.25rem] tracking-[.01563rem]">Pengaturan Akun</p>
      <div class="flex flex-col gap-4">
        <RouterLink to="/profile/edit" class="flex flex-row gap-8 items-center">
          <EditProfileIcon />
          Edit Profil
        </RouterLink>
        <RouterLink
          to="/profile/lamaran"
          class="flex flex-row gap-8 items-center"
        >
          <LamaranIcon />
          Lamaran Saya
        </RouterLink>
        <RouterLink
          to="/profile/pekerjaan"
          class="flex flex-row gap-8 items-center"
        >
          <BuildingIcon />
          Daftar Pekerjaan
        </RouterLink>
        <RouterLink to="/profile/snk" class="flex flex-row gap-8 items-center">
          <InfoIcon />
          Syarat dan Ketentuan
        </RouterLink>
        <RouterLink
          to="/login"
          class="flex flex-row gap-8 items-center"
          @click="handleLogout"
        >
          <LogoutIcon />
          Keluar
        </RouterLink>
      </div>
    </div>
  </div>
</template>
