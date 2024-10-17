/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-17 14:07:10
 * @Description: router - 系统管理
 */

export default {
  path: '/system',
  meta: { title: '系统管理', icon: 'icon-park-outline:system', rank: 999 },
  children: [
    {
      path: '/system/user',
      name: 'page-system-user',
      meta: { title: '用户管理' },
      component: () => import('@/views/system/user/index.vue')
    },
    {
      path: '/system/role',
      name: 'page-system-role',
      meta: { title: '角色管理' },
      component: () => import('@/views/system/role/index.vue')
    },
    // {
    //   path: '/system/dept',
    //   name: 'page-system-dept',
    //   meta: { title: '部门管理' },
    //   component: () => import('@/views/system/dept/index.vue')
    // },
    {
      path: '/system/menu',
      name: 'page-system-menu',
      meta: { title: '菜单管理' },
      component: () => import('@/views/system/menu/index.vue')
    },
    {
      path: '/system/dict',
      name: 'page-system-dict',
      meta: { title: '字典管理', showParent: true },
      component: () => import('@/views/system/dict/index.vue')
    }
  ]
} satisfies RouteConfigsTable
