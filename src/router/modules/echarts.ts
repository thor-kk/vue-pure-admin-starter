/*
 * @Author: Yyy
 * @Date: 2024-09-10 16:46:30
 * @LastEditTime: 2024-09-10 17:00:22
 * @Description: 图表
 */

export default {
  path: "/echarts",
  meta: { title: "图表示例", rank: 100 },
  children: [
    {
      path: "/echarts/demo1",
      name: "echarts-demo1",
      component: () => import("@/views/echarts/demo1.vue"),
      meta: { title: "示例一" }
    },
    {
      path: "/echarts/demo2",
      name: "echarts-demo2",
      component: () => import("@/views/echarts/demo2.vue"),
      meta: { title: "示例二" }
    }
  ]
} satisfies RouteConfigsTable;
