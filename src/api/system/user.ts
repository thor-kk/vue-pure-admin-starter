/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-04 14:39:43
 * @Description: 用户模块
 */

import type { ResultTable, RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl } from '../utils'

/** 获取用户分页列表 */
export async function getUserPage(args?: { searchParams: any }) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/user/page', { data: args.searchParams })
    if (res.code === 200) return res.data
  } catch (error) {
    console.log('🚀 ~ getUserPage ~ error:', error)
  }
}

/** 获取用户列表 */
export async function getUserList(data?: object) {
  const res = await http.request<ResultTable>('post', '/user/list', { data })
  return res
}
