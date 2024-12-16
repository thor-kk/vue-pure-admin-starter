/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-16 13:54:30
 * @Description: 角色模块
 */

import type { RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl } from '../utils'

/** 获取角色分页 */
export async function getRolePage(params?: object) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/role/page', { params })
    if (res.code === 200) return res.data
  } catch (error) {}
}
