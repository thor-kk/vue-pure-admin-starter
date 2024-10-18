/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-18 16:26:10
 * @Description: 角色模块
 */

import type { Result, ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取角色列表 */
export async function getRoleList(data?: object) {
  const res = await http.request<ResultTable>('post', '/role', { data })
  return res
}

/** 获取所有角色列表 */
export async function getAllRoleList() {
  const res = await http.request<Result>('get', '/list-all-role')
  return res
}
