<script setup lang="ts">
import { ref } from 'vue'
import { GoogleMap, CustomControl, CustomMarker, Marker } from 'vue3-google-map'

const center = ref({ lat: -6.201326129999445, lng: 106.82317255776235 })
const markerOptions = ref()
const position = ref()
const userPosition = ref()

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
  >
    <Marker
      v-for="(location, i) in locations"
      :key="i"
      :options="{ position: location }"
    />
    <CustomMarker
      v-if="userPosition"
      :options="{ position: userPosition, anchorPoint: 'BOTTOM_CENTER' }"
    >
      <img
        src="../assets/images/current-location.png"
        alt="current-location"
        width="30"
        height="30"
      />
    </CustomMarker>
    <CustomControl position="RIGHT_BOTTOM">
      <button
        class="custom-btn flex justify-center items-center"
        @click="handlePanToMyLocation"
      >
        <img
          src="../assets/svg/my-location.svg"
          alt="my-location"
          width="30"
          height="30"
        />
      </button>
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
