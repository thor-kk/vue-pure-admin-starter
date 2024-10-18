/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-18 15:04:15
 * @Description: router - 系统监控
 */

export default {
  path: '/monitor',
  meta: { title: '系统监控', icon: 'icon-park-outline:system', rank: 1000 },
  children: [
    {
      path: '/monitor/online',
      name: 'page-monitor-online',
      meta: { title: '在线用户', showParent: true },
      component: () => import('@/views/monitor/online/index.vue')
    }
  ]
} satisfies RouteConfigsTable
