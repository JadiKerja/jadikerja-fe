<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
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
        <WhiteBackButton class="" @click="goBack" />

        <p class="text-[1.25rem] font-bold text-white tracking-[0.01563rem]">
          Syarat dan Ketentuan
        </p>
        <div></div>
      </div>
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col p-7 gap-5 z-20 bg-[#F8FAFF] overflow-y-auto custom-scrollbar-hidden"
    >
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Kebijakan Privasi Pengguna
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
          erat at turpis pharetra, quis gravida nunc venenatis. Suspendisse
          aliquam lectus et orci gravida tempor non quis sapien. Proin porttitor
          libero in elementum finibus. Ut tellus eros, imperdiet vitae orci ut,
          posuere placerat diam. Aliquam erat volutpat. Sed et malesuada mi. Sed
          rhoncus tincidunt felis, in venenatis nisi cursus vel. Suspendisse
          ornare eros sit amet magna molestie tincidunt. Proin tempor feugiat
          sapien sed dignissim. Donec volutpat tellus luctus, gravida nibh nec,
          rutrum augue
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          JadiKerja
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
          erat at turpis pharetra, quis gravida nunc venenatis. Suspendisse
          aliquam lectus et orci gravida tempor non quis sapien. Proin porttitor
          libero in elementum finibus. Ut tellus eros, imperdiet vitae orci ut,
          posuere placerat diam. Aliquam erat volutpat. Sed et malesuada mi. Sed
          rhoncus tincidunt felis, in venenatis nisi cursus vel. Suspendisse
          ornare eros sit amet magna molestie tincidunt. Proin tempor feugiat
          sapien sed dignissim. Donec volutpat tellus luctus, gravida nibh nec,
          rutrum augue
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Ketentuan
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
          erat at turpis pharetra, quis gravida nunc venenatis. Suspendisse
          aliquam lectus et orci gravida tempor non quis sapien. Proin porttitor
          libero in elementum finibus. Ut tellus eros, imperdiet vitae orci ut,
          posuere placerat diam. Aliquam erat volutpat. Sed et malesuada mi. Sed
          rhoncus tincidunt felis, in venenatis nisi cursus vel. Suspendisse
          ornare eros sit amet magna molestie tincidunt. Proin tempor feugiat
          sapien sed dignissim. Donec volutpat tellus luctus, gravida nibh nec,
          rutrum augue
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>