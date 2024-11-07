<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import { useAuthStore } from '@/stores/userStores'
import SearchInput from '@/components/elements/SearchInput.vue'
import DropdownIcon from '@/assets/images/DropdownIcon.vue'
import CariKerjaCard from '@/components/elements/card/CariKerjaCard.vue'

const profileStore = useAuthStore()
const isLoading = ref(true)
const searchQuery = ref('')
const selectedJobType = ref('')

const jobData = ref([
  {
    id: '1',
    title: 'Web Developer',
    address: 'Jakarta',
    name: 'PT. Web Indo',
    isKhusus: true,
    tags: ['HTML', 'CSS', 'JavaScript'],
    salary: '1jt - 3jt',
  },
  {
    id: '2',
    title: 'Digital Marketer',
    address: 'Bandung',
    name: 'Digital Media',
    isKhusus: true,
    tags: ['SEO', 'Content', 'Social Media'],
    salary: '2jt - 4jt',
  },
  {
    id: '3',
    title: 'Software Engineer',
    address: 'Surabaya',
    name: 'Tech Solutions',
    isKhusus: true,
    tags: ['Java', 'Spring', 'MySQL'],
    salary: '5jt - 8jt',
  },
  {
    id: '4',
    title: 'Customer Support',
    address: 'Yogyakarta',
    name: 'HelpCenter Co.',
    isKhusus: false,
    tags: ['Communication', 'Customer Service'],
    salary: '1.5jt - 2.5jt',
  },
  {
    id: '5',
    title: 'Graphic Designer',
    address: 'Jakarta',
    name: 'Creative Hub',
    isKhusus: true,
    tags: ['Photoshop', 'Illustrator', 'Design'],
    salary: '3jt - 5jt',
  },
  {
    id: '6',
    title: 'Sales Representative',
    address: 'Bali',
    name: 'Sales Pro',
    isKhusus: false,
    tags: ['Sales', 'Negotiation'],
    salary: '2jt - 3.5jt',
  },
  {
    id: '7',
    title: 'Office Administrator',
    address: 'Medan',
    name: 'Admin Solutions',
    isKhusus: false,
    tags: ['Organization', 'Administration'],
    salary: '1.8jt - 2.8jt',
  },
  {
    id: '8',
    title: 'Data Analyst',
    address: 'Jakarta',
    name: 'Data Insights',
    isKhusus: true,
    tags: ['Excel', 'SQL', 'Python'],
    salary: '4jt - 6jt',
  },
  {
    id: '9',
    title: 'Project Manager',
    address: 'Bandung',
    name: 'ManageCo',
    isKhusus: true,
    tags: ['Leadership', 'Planning', 'Communication'],
    salary: '7jt - 10jt',
  },
  {
    id: '10',
    title: 'Content Writer',
    address: 'Semarang',
    name: 'WriteUp',
    isKhusus: false,
    tags: ['Writing', 'SEO', 'Research'],
    salary: '2jt - 4jt',
  },
])

const filteredJobs = computed(() => {
  return jobData.value.filter((job) => {
    const matchesQuery = searchQuery.value
      ? job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true
    const matchesType =
      selectedJobType.value === 'keterampilan-khusus'
        ? job.isKhusus
        : selectedJobType.value === 'tanpa-ket-khusus'
          ? !job.isKhusus
          : true
    return matchesQuery && matchesType
  })
})

function handleSearch(query: string) {
  searchQuery.value = query
}

onMounted(async () => {
  if (!profileStore.user) {
    await profileStore.fetchUserData()
  }
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="min-h-screen flex justify-center items-center">
    <div class="loader"></div>
  </div>
  <div v-else class="h-screen flex flex-col items-center w-full">
    <div
      class="bg-[rgb(214,39,39)] flex flex-col items-center relative w-full min-h-[12rem] py-8 px-7 gap-6 overflow-hidden"
    >
      <TransparentCircle
        class="absolute -top-[4rem] -right-[6rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -top-[3rem] -right-[5rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[3rem] -left-[5rem] bg-[#E55A24B2] w-[10.66975rem] h-[10.66975rem]"
      />
      <TransparentCircle
        class="absolute -bottom-[2rem] -left-[3rem] bg-[#E55A2466] w-[10.66975rem] h-[10.66975rem]"
      />

      <p class="text-[1.75rem] font-bold text-white tracking-[0.02188rem] z-30">
        Cari Kerja
      </p>
      <SearchInput
        :isBeranda="false"
        :isCariKerja="true"
        class="w-full z-30"
        @search="handleSearch"
      />
    </div>
    <div
      class="w-full rounded-[1.875rem] mt-[-2rem] flex flex-col px-7 pb-[6.5rem] pt-5 gap-5 z-20 bg-[#F8FAFF] h-fit overflow-y-auto custom-scrollbar-hidden"
    >
      <div
        class="bg-white rounded-[0.625rem] w-full flex justify-between items-center flex-row p-3 relative"
      >
        <p
          class="text-[#182046] text-[0.875rem] font-semibold tracking-[0.01094rem] w-full"
        >
          Jenis Pekerjaan
        </p>
        <div class="relative w-full">
          <select
            v-model="selectedJobType"
            name="jobType"
            id="jobType"
            class="rounded-[0.9375rem] bg-[#F8C2C2] pl-4 pr-6 py-3 w-full appearance-none"
          >
            <option value="">Semua</option>
            <option value="keterampilan-khusus">Keterampilan Khusus</option>
            <option value="tanpa-ket-khusus">Tanpa Ket. Khusus</option>
          </select>
          <DropdownIcon
            class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <div v-for="job in filteredJobs" :key="job.id" class="mt-4">
        <CariKerjaCard
          :id="job.id"
          :title="job.title"
          :address="job.address"
          :name="job.name"
          :isKhusus="job.isKhusus"
          :tags="job.tags"
          :salary="job.salary"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
option,
select {
  color: var(--Primary-Red, #d62727);
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.00781rem;
}
</style>
