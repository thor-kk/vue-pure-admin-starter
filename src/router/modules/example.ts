/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-10-21 14:13:28
 * @Description: 示例
 */

export default {
  path: '/example',
  meta: { title: '示例展示', icon: 'carbon:demo', rank: 1001 },
  children: [
    {
      path: '/page',
      meta: { title: '页面示例', icon: 'material-symbols-light:table' },
      children: [
        {
          path: '/page/plus',
          name: 'page-plus',
          meta: { title: 'Plus页面', showParent: true },
          component: () => import('@/views/example/page/plus/index.vue')
        }
      ]
    },
    {
      path: '/form',
      meta: { title: '表单示例', icon: 'mdi:form' },
      children: [
        {
          path: '/form/plus',
          meta: { title: 'Plus组件' },
          children: [
            {
              path: '/form/plus/basic',
              name: 'page-form-plus-basic',
              component: () => import('@/views/example/form/basic/index.vue'),
              meta: { title: '基础表单', showParent: true }
            },
            {
              path: '/form/plus/search',
              name: 'page-form-plus-search',
              component: () => import('@/views/example/form/search/index.vue'),
              meta: { title: '查询表单', showParent: true }
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      redirect: '/error/403',
      meta: { icon: 'ri:information-line', title: '异常页面' },
      children: [
        {
          path: '/error/403',
          name: '403',
          component: () => import('@/views/example/error/403.vue'),
          meta: {
            title: '403'
          }
        },
        {
          path: '/error/404',
          name: '404',
          component: () => import('@/views/example/error/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/error/500',
          name: '500',
          component: () => import('@/views/example/error/500.vue'),
          meta: {
            title: '500'
          }
        }
      ]
    },
    {
      path: '/example/echarts',
      meta: { title: '图表示例', icon: 'raphael:piechart' },
      children: [
        {
          path: '/example/echarts/demo1',
          name: 'echarts-demo1',
          component: () => import('@/views/example/echarts/demo1.vue'),
          meta: { title: '示例一' }
        },
        {
          path: '/example/echarts/demo2',
          name: 'echarts-demo2',
          component: () => import('@/views/example/echarts/demo2.vue'),
          meta: { title: '示例二' }
        }
      ]
    }
  ]
} satisfies RouteConfigsTable
