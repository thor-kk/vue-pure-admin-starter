/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-03 21:21:46
 * @Description: 页面
 */

export default {
  path: '/page',
  meta: { title: '页面示例', icon: 'material-symbols-light:table', rank: 102 },
  children: [
    {
      path: '/page/plus',
      name: 'page-plus',
      meta: { title: 'Plus页面', showParent: true },
      component: () => import('@/views/page/plus/index.vue')
    }
  ]
} satisfies RouteConfigsTable
