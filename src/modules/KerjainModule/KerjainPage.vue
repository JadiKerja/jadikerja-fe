<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GoogleMap, CustomMarker, Marker } from 'vue3-google-map'
import KerjainCard from './module-elements/KerjainCard.vue'
import Cookies from 'js-cookie'
import axios from 'axios'

const center = ref({ lat: -6.201326129999445, lng: 106.82317255776235 })
const markerOptions = ref()
const position = ref()
const userPosition = ref()
const kerjain = ref([])

onMounted(async () => {
  kerjain.value = await fetchData()
})

async function fetchData() {
  const token = Cookies.get('accessToken')

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/kerjain`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.data.code === 200) {
    return response.data.data.kerjain
  }
}

function handleClickMaps(e) {
  markerOptions.value = {
    position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
  }
  position.value = { lat: e.latLng.lat(), lng: e.latLng.lng() }
}

function handlePanToMyLocation() {
  center.value = { lat: center.value.lat + 0.01, lng: center.value.lng + 0.01 }
  navigator.geolocation.getCurrentPosition((pos) => {
    center.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    userPosition.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
  })
}
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAcRvHJpfGRPIL18NHCyKdrmc4R0oR5Zug"
    style="width: 100%; height: 100vh"
    :center="center"
    :zoom="12"
    @click="handleClickMaps"
    class="relative"
    :map-type-control="false"
    :fullscreen-control="false"
  >
    <div v-if="kerjain">
      <Marker
        v-for="(location, i) in kerjain"
        :key="i"
        :options="{ position: { lat: location.lat, lng: location.lng } }"
      />
    </div>
    <CustomMarker
      v-if="userPosition"
      :options="{ position: userPosition, anchorPoint: 'BOTTOM_CENTER' }"
    >
      <img
        src="../../assets/images/current-location.png"
        alt="current-location"
        width="30"
        height="30"
      />
    </CustomMarker>
  </GoogleMap>
  <div
    class="absolute top-10 left-1/2 translate-x-[-50%] flex w-[90%] rounded-[10px] overflow-hidden"
  >
    <input
      type="text"
      class="w-full outline-none px-3 py-1 font-medium text-xs"
    />
    <div
      class="px-3 py-2 bg-red-600 hover:cursor-pointer hover:bg-red-700 transition-all"
    >
      <img
        src="../../assets/images/search.png"
        alt="search"
        width="24"
        height="24"
      />
    </div>
  </div>
  <div class="absolute bottom-0 left-0 w-full">
    <button
      class="custom-btn flex justify-center items-center"
      @click="handlePanToMyLocation"
    >
      <img
        src="../../assets/svg/my-location.svg"
        alt="my-location"
        width="30"
        height="30"
      />
    </button>
    <div class="outer-container bg-white h-[35vh] px-5 pt-6 rounded-t-[40px]">
      <div
        class="absolute top-2 left-1/2 translate-x-[-50%] w-[80px] h-[10px] bg-[#D1D0D0] rounded-full"
      ></div>
      <div
        class="scroll-container custom-scrollbar flex flex-col gap-[10px] h-full pb-2 overflow-hidden overflow-y-auto mr-[-16px]"
      >
        <KerjainCard />
        <KerjainCard />
        <KerjainCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}

.outer-container {
  position: relative;
  overflow: hidden;
  padding-right: 16px; /* Adds space for a scrollbar */
}

.scroll-container {
  overflow-y: auto;
  height: 100%;
  margin-right: -16px; /* Shifts content back into view when scrollbar is shown */
  padding-right: 8px; /* Creates padding so content doesn’t get hidden by scrollbar */
}
</style>
