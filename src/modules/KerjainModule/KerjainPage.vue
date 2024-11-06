<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GoogleMap, CustomMarker, Marker } from 'vue3-google-map'
import KerjainCard from './module-elements/KerjainCard.vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useAuthStore } from '@/stores/userStores'
import LoadingCard from './module-elements/InformationCard.vue'
import BidModal from './module-elements/BidModal.vue'
import RedBackArrow from '@/assets/images/RedBackArrow.vue'
import { useRouter } from 'vue-router'

const center = ref({ lat: -6.201326129999445, lng: 106.82317255776235 })
const markerOptions = ref()
const position = ref()
const userPosition = ref()
const kerjain = ref([])
const search = ref('')
const isLoading = ref(false)
const isModalOpen = ref(false)
const selectedKerjainId = ref('')

const userStore = useAuthStore()
const router = useRouter()

function goBack() {
  router.back()
}

onMounted(async () => {
  if (!userStore.user) {
    userStore.fetchUserData()
  }

  kerjain.value = await fetchData()
})

function toggleModal(id?: string) {
  selectedKerjainId.value = id || ''
  isModalOpen.value = !isModalOpen.value
}

async function fetchData() {
  try {
    const token = Cookies.get('accessToken')

    isLoading.value = true

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kerjain`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 200) {
      return response.data.data.kerjain
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
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

async function handleSearch() {
  if (!search.value) {
    kerjain.value = await fetchData()
    center.value = { lat: -6.201326129999445, lng: 106.82317255776235 }
    return
  }

  try {
    const token = Cookies.get('accessToken')

    isLoading.value = true

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/kerjain`,
      {
        params: { search: search.value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.data.code === 200) {
      kerjain.value = response.data.data.kerjain
      center.value = response.data.data.searchLocation
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleSearch()
  }
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
    <button class="bg-white rounded-full p-3 mr-2" @click="goBack">
    <RedBackArrow />
    </button>
    
    <input
      type="text"
      v-model="search"
      placeholder="Masukkan lokasi"
      class="w-full outline-none px-3 py-1 font-medium text-xs rounded-l-[0.6275rem]"
      @keydown="handleKeyDown"
    />
    <div
      class="px-3 py-2 bg-red-600 hover:cursor-pointer hover:bg-red-700 transition-all"
      @click="handleSearch"
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
    <div class="relative bg-white h-[35vh] px-5 pt-6 rounded-t-[40px]">
      <div
        class="absolute top-2 left-1/2 translate-x-[-50%] w-[80px] h-[10px] bg-[#D1D0D0] rounded-full"
      ></div>
      <LoadingCard v-if="isLoading" title="Mencari pekerjaan..." />
      <div
        v-else
        class="custom-scrollbar-hidden flex flex-col gap-[10px] h-full pb-2 overflow-hidden overflow-y-auto"
      >
        <LoadingCard
          v-if="kerjain.length == 0"
          title="Belum ada pekerjaan di sekitar..."
        />
        <KerjainCard
          v-else
          v-for="(value, i) in kerjain"
          :key="i"
          :id="value.id"
          :title="value.title"
          :salary="value.salary"
          :contact-person-name="value.contactPersonName"
          :address="value.address"
          :toggle-modal="() => toggleModal(value.id)"
        />
      </div>
    </div>
  </div>
  <BidModal
    :is-modal-open="isModalOpen"
    :toggle-modal="toggleModal"
    :kerjain-id="selectedKerjainId"
  />
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
