<script setup lang="ts">
import TransparentCircle from '@/components/elements/TransparentCircle.vue'
import WhiteBackButton from '@/components/elements/button/WhiteBackButton.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/userStores'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(true)

function goBack() {
  router.back()
}

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUserData()
  }
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <div class="loader"></div>
  </div>
  <div v-else class="h-screen flex flex-col items-center w-full">
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
          JadiKerja
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          JadiKerja adalah aplikasi yang membantu pencari kerja menemukan
          pekerjaan sesuai kebutuhan mereka. Dengan fitur pencarian pekerjaan,
          pengembangan keterampilan, dan rekomendasi khusus, kami berkomitmen
          untuk mendukung masyarakat dalam mencapai peluang kerja yang lebih
          baik.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Kebijakan Privasi Pengguna
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Di JadiKerja, kami menghargai privasi dan keamanan data pengguna kami.
          Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
          menggunakan, dan melindungi informasi pribadi yang Anda berikan
          melalui aplikasi JadiKerja.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Pengumpulan Informasi
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Kami mengumpulkan informasi yang Anda berikan secara langsung saat
          mendaftar, seperti nama, alamat email, nomor telepon, serta informasi
          pekerjaan dan keterampilan. Kami juga dapat mengumpulkan data tambahan
          seperti lokasi dan preferensi pekerjaan untuk menyediakan layanan yang
          lebih sesuai dengan kebutuhan Anda.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Penggunaan Informasi
        </p>
        <div class="flex flex-col gap-1">
          <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
            Data yang kami kumpulkan digunakan untuk:
          </p>

          <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
            Menghubungkan Anda dengan pekerjaan yang sesuai, memberikan
            rekomendasi pekerjaan dan pelatihan, mengelola akun Anda,
            memperbarui Anda mengenai perubahan pada kebijakan kami, memastikan
            keamanan layanan kami dan mencegah penipuan.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Pilihan Pengguna
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Anda memiliki hak untuk memperbarui, mengubah, atau menghapus
          informasi pribadi Anda kapan saja melalui pengaturan akun. Anda juga
          dapat memilih untuk tidak menerima pemberitahuan tertentu dari kami.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Pilihan Pengguna
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Anda memiliki hak untuk memperbarui, mengubah, atau menghapus
          informasi pribadi Anda kapan saja melalui pengaturan akun. Anda juga
          dapat memilih untuk tidak menerima pemberitahuan tertentu dari kami.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Penggunaan Layanan
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Pengguna diharapkan menggunakan aplikasi ini hanya untuk mencari
          pekerjaan atau mengakses pelatihan yang disediakan. Penyalahgunaan,
          seperti memberikan informasi palsu atau menyalahgunakan data pengguna
          lain, akan mengakibatkan penangguhan akun.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Konten dan Tanggung Jawab Pengguna
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Anda bertanggung jawab atas informasi yang Anda unggah di aplikasi
          JadiKerja, termasuk informasi pribadi dan pengalaman kerja. Kami tidak
          bertanggung jawab atas ketepatan atau kebenaran informasi yang
          diunggah oleh pengguna lain.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Keamanan dan Privasi
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Anda setuju untuk menjaga keamanan akun Anda dan tidak membagikan kata
          sandi atau informasi akun Anda kepada orang lain. Jika ada pelanggaran
          keamanan atau kehilangan akses, segera hubungi tim dukungan kami.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p
          class="text-[0.875rem] text-black font-semibold tracking-[.01094rem]"
        >
          Perubahan Kebijakan
        </p>
        <p class="text-[0.75rem] tracking-[0.00938rem] text-[#AEACAC]">
          Kami dapat memperbarui Kebijakan Privasi dan Ketentuan Penggunaan dari
          waktu ke waktu untuk mencerminkan perubahan layanan atau hukum yang
          berlaku. Kami akan memberi tahu Anda jika ada perubahan signifikan
          melalui aplikasi atau email.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d62727;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
