/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-17 16:18:01
 * @Description: 用户模块
 */

import type { ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取用户列表 */
export async function getUserList(data?: object) {
  const res = await http.request<ResultTable>('post', '/user', { data })
  return res
}
