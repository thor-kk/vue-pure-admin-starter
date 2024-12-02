/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-02 09:40:49
 * @Description: 角色模块
 */

import type { Result, ResultTable, RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl } from '../utils'

/** 获取角色分页 */
export async function getRolePage(data?: object) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/role/page', { params: data })
    if (res.code === 200) return res.data
  } catch (error) {}
}

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
