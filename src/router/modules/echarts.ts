/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-08 14:29:08
 * @Description: 图表
 */

export default {
  path: '/echarts',
  meta: {
    title: '图表示例',
    icon: 'raphael:piechart',
    rank: 100,
    showLink: false
  },
  children: [
    {
      path: '/echarts/demo1',
      name: 'echarts-demo1',
      component: () => import('@/views/echarts/demo1.vue'),
      meta: { title: '示例一' }
    },
    {
      path: '/echarts/demo2',
      name: 'echarts-demo2',
      component: () => import('@/views/echarts/demo2.vue'),
      meta: { title: '示例二' }
    }
  ]
} satisfies RouteConfigsTable
