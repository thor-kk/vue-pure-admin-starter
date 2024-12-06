/*
 * @Author: Yyy
 * @Date: 2024-10-18 16:48:12
 * @LastEditTime: 2024-12-06 14:46:42
 * @Description: 用户模块
 */

import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { faker } from '@faker-js/faker/locale/zh_CN'

export default defineFakeRoute([
  /** 获取用户分页列表 */
  {
    url: '/user/page',
    method: 'get',
    response: ({}) => {
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

      return {
        code: 200,
        data: { records: list, total: list.length }
      }
    }
  },
  /** 删除用户 */
  {
    url: 'user/delete/:userId',
    method: 'delete',
    response: ({}) => {
      return {
        code: 200
      }
    }
  },
  /** 创建用户 */
  {
    url: 'user/create',
    method: 'post',
    response: ({}) => {
      return {
        code: 200
      }
    }
  },
  /** 更新用户 */
  {
    url: 'user/update',
    method: 'put',
    response: ({}) => {
      return {
        code: 200
      }
    }
  }
])
