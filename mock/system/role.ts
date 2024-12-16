/*
 * @Author: Yyy
 * @Date: 2024-10-18 16:48:12
 * @LastEditTime: 2024-12-02 09:48:50
 * @Description: 角色
 */

import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  /** 获取用户列表 */
  {
    url: '/role/page',
    method: 'get',
    response: ({}) => {
      let list = [
        {
          createTime: 1605456000000, // 时间戳（毫秒ms）
          updateTime: 1684512000000,
          id: 1,
          name: '超级管理员',
          code: 'admin',
          status: 1, // 状态 1 启用 0 停用
          remark: '超级管理员拥有最高权限'
        },
        {
          createTime: 1605456000000,
          updateTime: 1684512000000,
          id: 2,
          name: '普通角色',
          code: 'common',
          status: 1,
          remark: '普通角色拥有部分权限'
        }
      ]

      return {
        code: 200,
        msg: '',
        data: { total: list.length, records: list }
      }
    }
  }
])
