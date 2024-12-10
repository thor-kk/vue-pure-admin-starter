/*
 * @Author: Yyy
 * @Date: 2024-10-18 16:48:12
 * @LastEditTime: 2024-12-10 14:22:31
 * @Description: 用户模块
 */

import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  /** 获取部门树 */
  {
    url: '/dept/tree',
    method: 'get',
    timeout: 500,
    response: ({}) => {
      return {
        code: 200,
        msg: 'ok',
        data: [
          {
            creator: 1,
            createTime: '2024-08-20 09:43:35',
            updater: 1,
            updateTime: '2024-08-22 10:08:34',
            deptId: 1,
            name: '市城运中心',
            status: '01',
            sort: 0,
            children: [
              {
                creator: 1,
                createTime: '2024-08-22 12:42:25',
                updater: 1,
                updateTime: '2024-08-22 12:42:47',
                deptId: 2,
                name: '梁溪城运中心',
                parId: 1,
                status: '01',
                sort: 1
              },
              {
                creator: 1,
                createTime: '2024-08-22 12:42:43',
                updater: 1,
                updateTime: '2024-08-22 12:42:49',
                deptId: 3,
                name: '滨湖城运中心',
                parId: 1,
                status: '01',
                sort: 2
              }
            ]
          },
          {
            creator: 1,
            createTime: '2024-08-22 13:57:11',
            updater: 1,
            updateTime: '2024-11-14 15:35:54',
            deptId: 11,
            name: '市公安局',
            status: '01',
            sort: 0,
            children: [
              {
                creator: 1,
                createTime: '2024-08-22 13:57:27',
                updater: 1,
                updateTime: '2024-08-22 13:57:27',
                deptId: 12,
                name: '梁溪公安局',
                parId: 11,
                status: '01',
                sort: 0
              },
              {
                creator: 1,
                createTime: '2024-08-22 13:57:37',
                updater: 1,
                updateTime: '2024-08-22 13:57:37',
                deptId: 13,
                name: '惠山公安局',
                parId: 11,
                status: '01',
                sort: 0
              }
            ]
          }
        ]
      }
    }
  }
])
