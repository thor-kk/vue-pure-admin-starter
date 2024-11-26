/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-11-26 22:48:03
 * @Description: router - 消息管理
 */

export default {
  path: '/message',
  redirect: '/message/notification',
  meta: { title: '消息管理', icon: 'ri:message-2-line', rank: 1001 },
  children: [
    {
      path: '/message/notification',
      name: 'page-message-notification',
      meta: { title: '通知公告' },
      component: () => import('@/views/message/notification/index.vue')
    },
    {
      path: '/message/mmstemplate',
      name: 'page-message-mmstemplate',
      meta: { title: '短信模板' },
      component: () => import('@/views/message/mmstemplate/index.vue')
    }
  ]
} satisfies RouteConfigsTable
