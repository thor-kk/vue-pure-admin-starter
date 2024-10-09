/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-09 10:51:17
 * @Description: 字典模块
 */

import { http } from '@/utils/http'

type Result = {
  success: boolean
  data: { data: Array<any>; total: number }
}

export async function getDict(data?: any) {
  try {
    const res = await http.request<Result>('get', '/dict', { params: data })
    if (res.success) return res.data
  } catch (error) {}
}
