/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-03 21:21:46
 * @Description: 页面
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
    }
  ]
} satisfies RouteConfigsTable
