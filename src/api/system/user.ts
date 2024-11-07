/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-11-07 10:05:39
 * @Description: 用户模块
 */

import type { ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取用户列表 */
export async function getUserList(data?: object) {
  const res = await http.request<ResultTable>('post', '/user/list', { data })
  return res
}

/** 获取用户列表2 */
export async function getUserList2(data?: object) {
  const res = await http.request<ResultTable>('post', '/user/list', { data })
  if (res.success) return { total: res.data.total, data: res.data.list }
}
