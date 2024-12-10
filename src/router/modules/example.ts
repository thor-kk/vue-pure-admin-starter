/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-12-10 13:55:36
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
    },
    {
      path: '/example/dept-tree',
      name: 'views-example-dept-tree',
      meta: { title: '部门树选择' },
      component: () => import('@/views/example/dept-tree/index.vue')
    }
  ]
} satisfies RouteConfigsTable
