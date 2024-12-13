/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-13 21:45:23
 * @Description: 部门模块
 */

import type { R, Result } from '../type'

import { http } from '@/utils/http'
import { baseUrl } from '../utils'

/** 获取部门列表树 */
export async function getDeptTree(params?: object) {
  try {
    const res = await http.request<R>('get', baseUrl + '/dept/tree', { params })
    if (res.code === 200) return res.data
  } catch (error) {
    console.log('🚀 ~ getDeptTree ~ error:', error)
  }
}

/**
 * ! 以下代码替换完后需要删除
 */

/** 获取部门列表 */
export async function getDeptList(data?: object) {
  const res = await http.request<Result>('post', '/dept', { data })
  return res
}
