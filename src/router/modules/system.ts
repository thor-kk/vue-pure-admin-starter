/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-11-26 22:47:16
 * @Description: router - 系统管理
 */

export default {
  path: '/system',
  redirect: '/system/user',
  meta: { title: '系统管理', icon: 'icon-park-outline:system', rank: 999 },
  children: [
    {
      path: '/system/user',
      name: 'page-system-user',
      meta: { title: '用户管理' },
      component: () => import('@/views/system/pure/user/index.vue')
    },
    {
      path: '/system/role',
      name: 'page-system-role',
      meta: { title: '角色管理' },
      component: () => import('@/views/system/pure/role/index.vue')
    },
    {
      path: '/system/dept',
      name: 'page-system-dept',
      meta: { title: '部门管理' },
      component: () => import('@/views/system/pure/dept/index.vue')
    },
    {
      path: '/system/menu',
      name: 'page-system-menu',
      meta: { title: '菜单管理' },
      component: () => import('@/views/system/pure/menu/index.vue')
    },
    {
      path: '/system/dict',
      name: 'page-system-dict',
      meta: { title: '字典管理', showParent: true },
      component: () => import('@/views/system/pure/dict/index.vue')
    },
    {
      path: '/system/dict-plus',
      name: 'page-system-dict-plus',
      meta: { title: '字典管理-plus', showParent: true },
      component: () => import('@/views/system/plus/dict/index.vue')
    }
  ]
} satisfies RouteConfigsTable
