import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import EditProfile from '@/views/EditProfile.vue'
import BerandaView from '@/views/BerandaView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditingProfile from '@/views/profile/EditingProfile.vue'
import SyaratKetentuanView from '@/views/profile/SyaratKetentuanView.vue'

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
  ],
})

export default router
