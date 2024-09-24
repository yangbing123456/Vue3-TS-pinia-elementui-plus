const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    name: 'Home',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue')
      },
      {
        path: '/system-user',
        name: 'system-user',
        component: () => import('@/views/system/user.vue')
      },
      {
        path: '/system-role',
        name: 'system-role',
        component: () => import('@/views/system/role.vue')
      },
      {
        path: '/system-menu',
        name: 'system-menu',
        component: () => import('@/views/system/menu.vue')
      },
      {
        path: '/basic-table',
        name: 'basic-table',
        component: () => import('@/views/table/basicTable.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login'
  },
  {
    path: '/forget',
    component: () => import('@/views/forget-password.vue'),
    name: 'forget'
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    name: 'register'
  }
]
export default routes
