/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-17 16:15:24
 * @Description: 部门模块
 */

import type { Result } from '../type'

import { http } from '@/utils/http'

/** 获取部门列表 */
export async function getDeptList(data?: object) {
  const res = await http.request<Result>('post', '/dept', { data })
  return res
}
