/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-12 15:55:21
 * @Description: 字典模块
 */

import { http } from '@/utils/http'

type Result = {
  success: boolean
  data: { data: Array<any>; total: number }
}

/** 获取字典 */
export async function getDictList(data?: any) {
  try {
    const res = await http.request<Result>('get', '/dict/list', { params: data })
    if (res.success) return res.data
  } catch (error) {}
}

/** 获取字典项 */
export async function getDict(data?: { key: string }) {
  if (!data.key) return

  try {
    const res = await http.request<Result>('get', '/dict', { params: data })
    if (res.success) return res.data
  } catch (error) {}
}
