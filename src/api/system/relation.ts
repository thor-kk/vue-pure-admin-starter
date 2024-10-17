/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-17 16:21:09
 * @Description: 授权模块
 */

import type { Result } from '../type'

import { http } from '@/utils/http'

/** 获取用户角色列表 */
export async function getUserRoleIds(data?: { userId: number }) {
  const res = await http.request<Result>('post', '/list-role-ids', { data })
  return res
}
