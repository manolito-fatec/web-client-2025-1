import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import DashboardViewManager from '@/views/DashboardViewManager.vue'
import UserManagement from "@/components/UserManagement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/dashboardManager/',
      name: 'dashboardManager',
      component: DashboardViewManager,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: UserManagement,
    },
  ],
})

export default router
