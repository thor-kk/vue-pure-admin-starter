/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-17 09:35:55
 * @Description: 菜单模块
 */

import type { R } from '../type'

import { http } from '@/utils/http'

/** 获取菜单列表树 */
export async function getMenuTree(params?: object) {
  try {
    const res = await http.request<R>('get', '/menu/tree', { params })
    if (res.code === 200) return res.data
  } catch (error) {
    console.log('🚀 ~ getMenuList ~ error:', error)
  }
}
