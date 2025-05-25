import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import DashboardViewManager from '../views/DashboardViewManager.vue'
import UserManagementView from "../views/UserManagementView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardViewAdmin from '../views/DashboardViewAdmin.vue'
import SystemLogsView from '@/views/SystemLogsView.vue';

import PageNotFound from '@/views/PageNotFound.vue';

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
      meta: { requiresAuth: false}
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, roles: ["ROLE_OPERATOR"] }
    },
    {
      path: '/dashboardManager',
      name: 'dashboardManager',
      component: DashboardViewManager,
      meta: { requiresAuth: true, roles: ["ROLE_MANAGER"] }
    },
    {
      path: '/dashboardAdmin/',
      name: 'dashboardAdmin',
      component: DashboardViewAdmin,
      meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true, roles: ["ROLE_OPERATOR","ROLE_MANAGER", "ROLE_ADMIN"] }
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: UserManagementView,
      meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
    },
    {
      path: '/systemLogs',
      name: 'systemLogs',
      component: SystemLogsView,
      meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
    },
    {
     path: '/pageNotFound',
     name: 'pageNotFound',
     component: PageNotFound,
     meta: { requiresAuth: false, roles: ["ROLE_OPERATOR","ROLE_MANAGER", "ROLE_ADMIN"]}
    },

  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth();
  const userRole = getRole();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.name === 'login' && isAuthenticated && userRole) {
    return next({ name: getDashboardRouteByRole(userRole) });
  }
  if (to.meta.requiresAuth && Array.isArray(to.meta.roles)) {
    const allowedRoles = to.meta.roles as string[];
    const isAuthorized = allowedRoles.includes(userRole!);

    if (!isAuthorized) {
      return next({ name: 'pageNotFound' });
    }
  }

  next();
});

/**
 * Returns the dashboard route path based on the user's role.
 *
 * @param role - The user's role (e.g., 'ROLE_OPERATOR', 'ROLE_MANAGER', 'ROLE_ADMIN').
 * @returns The corresponding dashboard route as a string.
 */
function getDashboardRouteByRole(role: string): string {
  console.log("Powe Query -> ", role);
  const roleMap: Record<string, string> = {
    'ROLE_OPERATOR': 'dashboard',
    'ROLE_MANAGER': 'dashboardManager',
    'ROLE_ADMIN': 'dashboardAdmin'
  };

  return roleMap[role] || 'dashboard';
}

function checkAuth() {
  return sessionStorage.getItem('token') !== null;
}

/**
 * Retrieves the user's role from session storage.
 *
 * @returns The role as a string or null if not found.
 */
function getRole() {
  return sessionStorage.getItem('role')
}

export default router
