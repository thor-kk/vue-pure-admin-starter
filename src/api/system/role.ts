/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-13 21:39:41
 * @Description: 角色模块
 */

import type { Result, ResultTable, RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl } from '../utils'

/** 获取角色分页 */
export async function getRolePage(params?: object) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/role/page', { params })
    if (res.code === 200) return res.data
  } catch (error) {}
}

/**
 * ! 以下代码替换完后需要删除
 */

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
