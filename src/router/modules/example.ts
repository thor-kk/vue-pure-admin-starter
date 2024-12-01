/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-12-01 21:56:08
 * @Description: 示例
 */

export default {
  path: '/example',
  redirect: '/example/crud',
  meta: { title: '示例', icon: 'noto:evergreen-tree', rank: 9999 },
  children: [
    {
      path: '/example/crud',
      name: 'views-example-crud',
      meta: { title: 'CRUD', showParent: true },
      component: () => import('@/views/example/crud/index.vue')
    }
  ]
} satisfies RouteConfigsTable
