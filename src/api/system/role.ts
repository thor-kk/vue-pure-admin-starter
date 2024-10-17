/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-17 16:13:07
 * @Description: 角色模块
 */

import type { Result, ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取角色列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>('post', '/role', { data })
}

/** 获取所有角色列表 */
export async function getAllRoleList() {
  const res = await http.request<Result>('get', '/list-all-role')
  return res
}

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>('post', '/role-menu', { data })
}

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>('post', '/role-menu-ids', { data })
}
