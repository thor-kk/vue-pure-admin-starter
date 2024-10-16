/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-16 14:09:53
 * @Description: router - 系统管理
 */

export default {
  path: '/system',
  meta: { title: '系统管理', icon: 'icon-park-outline:system', rank: 999 },
  children: [
    {
      path: '/system/dict',
      name: 'page-system-dict',
      meta: { title: '字典管理', showParent: true },
      component: () => import('@/views/system/dict/index.vue')
    },
    {
      path: '/system/menu',
      name: 'page-system-menu',
      meta: { title: '菜单管理' },
      component: () => import('@/views/system/menu/index.vue')
    }
  ]
} satisfies RouteConfigsTable
