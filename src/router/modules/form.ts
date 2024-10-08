/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-09-20 14:59:03
 * @Description: 图表
 */

export default {
  path: '/form',
  meta: { title: '表单示例', icon: 'mdi:form', rank: 101, showLink: false },
  children: [
    {
      path: '/form/plus',
      meta: { title: 'Plus组件' },
      children: [
        {
          path: '/form/plus/basic',
          name: 'page-form-plus-basic',
          component: () => import('@/views/form/basic/index.vue'),
          meta: { title: '基础表单', showParent: true }
        },
        {
          path: '/form/plus/search',
          name: 'page-form-plus-search',
          component: () => import('@/views/form/search/index.vue'),
          meta: { title: '查询表单', showParent: true }
        }
      ]
    }
  ]
} satisfies RouteConfigsTable
