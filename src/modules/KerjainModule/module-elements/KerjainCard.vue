<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col gap-1 w-full p-4 shadow-[0_2px_3px_rgba(0,0,0,0.25)] rounded-[20px]"
  >
    <div class="grid grid-cols-[0.25fr_1fr_0.75fr]">
      <img
        src="../../../assets/images/check-list.png"
        alt="check-list"
        width="30"
      />
      <div>
        <h4 class="font-medium text-lg">Potong Rumput</h4>
        <div class="flex items-center">
          <img
            src="../../../assets/images/location.png"
            alt="location"
            class="w-[20px]"
          />
          <span class="font-medium text-[#AEACAC] text-xs"
            >Jalan Cinta No. 05</span
          >
        </div>
        <div class="flex items-center gap-[1px]">
          <img
            src="../../../assets/images/person-pin.png"
            alt="person-pin"
            class="w-[19px]"
          />
          <span class="font-medium text-[#AEACAC] text-xs">Tono Sukimin</span>
        </div>
      </div>
      <p class="font-bold text-right">Rp75.000</p>
    </div>
    <div class="flex justify-end gap-1">
      <button
        class="w-[80px] py-1 text-[8px] bg-[#F4A91E] hover:bg-[#d39626] text-white font-semibold text-center rounded-[18px] transition-all"
      >
        Tawar
      </button>
      <button
        class="w-[80px] py-1 text-[8px] bg-[#D62727] hover:bg-[#771515] text-white font-semibold text-center rounded-[18px] transition-all"
      >
        Kerja
      </button>
    </div>
  </div>
</template>
