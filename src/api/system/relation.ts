/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-18 16:26:13
 * @Description: 授权模块
 */

import type { Result } from '../type'

import { http } from '@/utils/http'

/** 获取用户已分配角色 */
export async function getUserRoleIds(data?: { userId: number }) {
  const res = await http.request<Result>('post', '/list-role-ids', { data })
  return res
}

/** 获取角色菜单 */
export async function getRoleMenu(data?: object) {
  const res = await http.request<Result>('post', '/role-menu', { data })
  return res
}

/** 获取角色已分配菜单 */
export async function getRoleMenuIds(data?: { id: string }) {
  const res = await http.request<Result>('post', '/role-menu-ids', { data })
  return res
}
