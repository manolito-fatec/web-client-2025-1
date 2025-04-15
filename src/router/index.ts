import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewManager from '../views/DashboardViewManager.vue'
import ProfileView from '@/views/ProfileView.vue'
import DashboardViewManager from '@/views/DashboardViewManager.vue'

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
      component: DashboardViewManager,
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
  ],
})

export default router
