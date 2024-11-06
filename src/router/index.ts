import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import EditProfile from '@/views/EditProfile.vue'
import BerandaView from '@/views/BerandaView.vue'
import ProfileView from '@/views/ProfileView.vue'
import KerjainView from '../views/KerjainView.vue'
import EditingProfile from '@/views/profile/EditingProfile.vue'
import SyaratKetentuanView from '@/views/profile/SyaratKetentuanView.vue'
import PekerjaanSayaView from '@/views/profile/PekerjaanSayaView.vue'
import EditPekerjaanView from '@/views/kerjain/EditPekerjaanView.vue'
import LamaranView from '@/views/profile/LamaranView.vue'
import KerjainChatView from '../views/kerjain/KerjainChatView.vue'
import AddKerjainView from '@/views/kerjain/AddKerjainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/lengkapi-profile',
      name: 'lengkapi profile',
      component: EditProfile,
    },
    {
      path: '/beranda',
      name: 'beranda',
      component: BerandaView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/profile/edit',
      name: 'profile edit',
      component: EditingProfile,
    },
    {
      path: '/profile/snk',
      name: 'syarat dan ketentuan',
      component: SyaratKetentuanView,
    },
    {
      path: '/kerjain',
      name: 'kerjain',
      component: KerjainView,
    },
    {
      path: '/profile/pekerjaan',
      name: 'pekerjaan saya',
      component: PekerjaanSayaView,
    },
    {
      path: '/profile/pekerjaan/:id',
      name: 'detail pekerjaan',
      component: EditPekerjaanView,
      props: true,
    },
    {
      path: '/profile/lamaran',
      name: 'lamaran saya',
      component: LamaranView,
    },
    {
      path: '/kerjain/chat/:id',
      name: 'chat kerjain',
      component: KerjainChatView,
      props: true,
    },
    {
      path: '/kerjain/add',
      name: 'add kerjain',
      component: AddKerjainView,
    },
  ],
})

export default router
