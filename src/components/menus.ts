import { type Menu } from '@/types/menu'
export const menuData: Array<Menu> = [
  {
    id: 1,
    title: '系统首页',
    index: '/dashboard',
    icon: 'Odometer'
  },
  {
    id: 2,
    title: '系统管理',
    index: '2',
    icon: 'HomeFilled',
    children: [
      {
        id: 21,
        pid: '2',
        index: '/system-user',
        title: '用户管理'
      },
      {
        id: 22,
        pid: '2',
        index: '/system-role',
        title: '角色管理'
      },
      {
        id: 23,
        pid: '2',
        index: '/system-menu',
        title: '菜单管理'
      }
    ]
  },
  {
    id: 3,
    title: '表格',
    index: '3',
    icon: 'Calendar',
    children: [
      {
        id: 31,
        pid: '3',
        index: '/basic-table',
        title: '基础表格'
      }
    ]
  }
]
