/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-16 15:58:17
 * @Description: 菜单管理
 */

import type { Result } from '../type'

import { http } from '@/utils/http'

/** 获取菜单列表 */
export async function getMenuList(data?: object) {
  const res = await http.request<Result>('post', '/menu', { data })
  if (res.success) return res
}
