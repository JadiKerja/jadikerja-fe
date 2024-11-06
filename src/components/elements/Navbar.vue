<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import HomeIcon from '@/assets/images/HomeIcon.vue'
import BagIcon from '@/assets/images/BagIcon.vue'
import UpgradeIcon from '@/assets/images/UpgradeIcon.vue'
import ProfileIcon from '@/assets/images/ProfileIcon.vue'

const route = useRoute()

function getFillColor(path: string) {
  return route.path.startsWith(path) ? '#D62727' : '#EEF0F3'
}
</script>

<template>
  <nav
    class="bg-white w-full z-50 flex py-[1.125rem] px-[1.625rem] items-center justify-center gap-[1.875rem] fixed bottom-0 max-w-[393px]"
  >
    <RouterLink
      to="/beranda"
      class="flex flex-col items-center gap-2 text-[0.75rem] font-semibold tracking-[.00944rem]"
    >
      <HomeIcon :color="getFillColor('/beranda')" />
      <span
        :class="{
          'text-[#D62727]': route.path.startsWith('/beranda'),
          'text-[#EEF0F3]': !route.path.startsWith('/beranda'),
        }"
        >Beranda</span
      >
    </RouterLink>
    <RouterLink
      to="/carikerja"
      class="flex flex-col items-center gap-2 text-[0.75rem] font-semibold tracking-[.00944rem]"
    >
      <BagIcon :color="getFillColor('/carikerja')" />
      <span
        :class="{
          'text-[#D62727]': route.path.startsWith('/carikerja'),
          'text-[#EEF0F3]': !route.path.startsWith('/carikerja'),
        }"
        >Cari Kerja</span
      >
    </RouterLink>
    <RouterLink
      to="/upgrade"
      class="flex flex-col items-center gap-2 text-[0.75rem] font-semibold tracking-[.00944rem]"
    >
      <UpgradeIcon :color="getFillColor('/upgrade')" />
      <span
        :class="{
          'text-[#D62727]': route.path.startsWith('/upgrade'),
          'text-[#EEF0F3]': !route.path.startsWith('/upgrade'),
        }"
        >Upgrade Diri</span
      >
    </RouterLink>
    <RouterLink
      to="/profile"
      class="flex flex-col items-center gap-2 text-[0.75rem] font-semibold tracking-[.00944rem]"
    >
      <ProfileIcon :color="getFillColor('/profile')" />
      <span
        :class="{
          'text-[#D62727]': route.path.startsWith('/profile'),
          'text-[#EEF0F3]': !route.path.startsWith('/profile'),
        }"
        >Profile</span
      >
    </RouterLink>
  </nav>
</template>
