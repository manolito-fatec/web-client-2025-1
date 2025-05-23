import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import DashboardViewManager from '../views/DashboardViewManager.vue'
import UserManagementView from "../views/UserManagementView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardViewAdmin from '../views/DashboardViewAdmin.vue'
import SystemLogsView from '@/views/SystemLogsView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name:'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboardManager',
      name: 'dashboardManager',
      component: DashboardViewManager,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboardAdmin/',
      name: 'dashboardAdmin',
      component: DashboardViewAdmin,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: UserManagementView,
      meta: { requiresAuth: true }
    },
    {
      path: '/systemLogs',
      name: 'systemLogs',
      component: SystemLogsView,
      meta: { requiresAuth: true }
    },
  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
})

function checkAuth() {
  return sessionStorage.getItem('token') !== null;
}

export default router
