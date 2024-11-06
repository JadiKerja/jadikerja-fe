<script setup lang="ts">
import { ref } from 'vue'
import { GoogleMap, CustomControl, InfoWindow } from 'vue3-google-map'

const center = ref({ lat: -6.201326129999445, lng: 106.82317255776235 })
const markerOptions = ref()
const position = ref()

function handleClickMaps(e) {
  markerOptions.value = {
    position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
  }
  position.value = { lat: e.latLng.lat(), lng: e.latLng.lng() }
}

function handlePanToMyLocation() {
  center.value = { lat: center.value.lat + 0.1, lng: center.value.lng + 0.1 }
  navigator.geolocation.getCurrentPosition((pos) => {
    center.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
  })
}

function handleSaveLocation() {
  alert('AIU')
}
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAcRvHJpfGRPIL18NHCyKdrmc4R0oR5Zug"
    style="width: 100%; height: 100vh"
    :center="center"
    :zoom="12"
    @click="handleClickMaps"
  >
    <InfoWindow :options="{ position: position, content: 'Hello World!' }">
      <button
        class="bg-[#D62727] text-white px-2 py-1 rounded-lg"
        @click="handleSaveLocation"
      >
        <span class="text-body">Choose this location</span>
      </button>
    </InfoWindow>
    <CustomControl position="RIGHT_BOTTOM">
      <button class="custom-btn" @click="handlePanToMyLocation">📌</button>
    </CustomControl>
  </GoogleMap>
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
</style>
