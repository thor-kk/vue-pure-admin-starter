/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-21 14:30:43
 * @Description: router - 系统监控
 */

export default {
  path: '/monitor',
  meta: { title: '系统监控', icon: 'material-symbols:monitor-outline', rank: 1000 },
  children: [
    {
      path: '/monitor/online',
      name: 'page-monitor-online',
      meta: { title: '在线用户' },
      component: () => import('@/views/monitor/online/index.vue')
    },
    {
      path: '/monitor/logs/login',
      name: 'page-monitor-logs-login',
      meta: { title: '登录日志' },
      component: () => import('@/views/monitor/logs/login/index.vue')
    },
    {
      path: '/monitor/logs/operation',
      name: 'page-monitor-logs-operation',
      meta: { title: '操作日志' },
      component: () => import('@/views/monitor/logs/operation/index.vue')
    },
    {
      path: '/monitor/logs/request',
      name: 'page-monitor-logs-request',
      meta: { title: '请求日志' },
      component: () => import('@/views/monitor/logs/request/index.vue')
    }
  ]
} satisfies RouteConfigsTable
