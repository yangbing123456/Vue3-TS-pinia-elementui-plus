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
        meta: {
          title: '系统首页',
          noAuth: true
        },
        component: () => import('@/views/dashboard.vue')
      },
      {
        path: '/system-user',
        name: 'system-user',
        meta: {
          title: '用户管理',
          permiss: '11'
        },
        component: () => import('@/views/system/user.vue')
      },
      {
        path: '/system-role',
        name: 'system-role',
        meta: {
          title: '角色管理',
          permiss: '12'
        },
        component: () => import('@/views/system/role.vue')
      },
      {
        path: '/system-menu',
        name: 'system-menu',
        meta: {
          title: '菜单管理',
          permiss: '13'
        },
        component: () => import('@/views/system/menu.vue')
      },
      {
        path: '/basic-table',
        name: 'basic-table',
        meta: {
          title: '基础表格',
          permiss: '21'
        },
        component: () => import('@/views/table/basicTable.vue')
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      noAuth: true
    },
    component: () => import('@/views/login.vue'),
    name: 'Login'
  },
  {
    path: '/forget',
    meta: {
      title: '重置密码',
      noAuth: true
    },
    component: () => import('@/views/forget-password.vue'),
    name: 'forget'
  },
  {
    path: '/register',
    meta: {
      title: '注册',
      noAuth: true
    },
    component: () => import('@/views/register.vue'),
    name: 'register'
  }
]
export default routes
