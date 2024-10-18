/*
 * @Author: Yyy
 * @Date: 2024-10-18 16:48:12
 * @LastEditTime: 2024-10-18 16:55:29
 * @Description: 用户模块 mock
 */

import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { faker } from '@faker-js/faker/locale/zh_CN'

export default defineFakeRoute([
  /** 获取用户列表 */
  {
    url: '/user/list',
    method: 'post',
    response: ({ body }) => {
      let list = [
        {
          avatar: 'https://avatars.githubusercontent.com/u/44761321',
          username: 'admin',
          nickname: '小铭',
          phone: '15888886789',
          email: faker.internet.email(),
          sex: 0,
          id: 1,
          status: 1,
          dept: { id: 103, name: '研发部门' },
          remark: '管理员',
          createTime: 1605456000000
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/52823142',
          username: 'common',
          nickname: '小林',
          phone: '18288882345',
          email: faker.internet.email(),
          sex: 1,
          id: 2,
          status: 1,
          dept: { id: 105, name: '测试部门' },
          remark: '普通用户',
          createTime: 1605456000000
        }
      ]

      list = list.filter((item) => item.username.includes(body?.username))
      list = list.filter((item) => String(item.status).includes(String(body?.status)))
      if (body.phone) list = list.filter((item) => item.phone === body.phone)
      if (body.deptId) list = list.filter((item) => item.dept.id === body.deptId)

      return {
        success: true,
        data: { list, total: list.length, pageSize: 10, currentPage: 1 }
      }
    }
  }
])
