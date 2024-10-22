/*
 * @Author: Yyy
 * @Date: 2024-10-18 16:48:12
 * @LastEditTime: 2024-10-22 14:35:04
 * @Description: 用户模块 mock
 */

import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/notice/list',
    method: 'get',
    response: ({}) => {
      const list = [{ no: '1', title: '通知1', type: '01', createTime: '2024-10-22' }]

      return {
        success: true,
        data: { list, total: 2 }
      }
    }
  }
])
