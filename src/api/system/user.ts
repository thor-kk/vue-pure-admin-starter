/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-06 14:21:27
 * @Description: 用户模块
 */

import type { R, ResultTable, RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl, successCallback } from '../utils'

/** 获取用户分页列表 */
export async function getUserPage(args?: { searchParams: any }) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/user/page', { params: args.searchParams })
    if (res.code === 200) return res.data
  } catch (error) {
    console.log('🚀 ~ getUserPage ~ error:', error)
  }
}

/** 删除用户 */
export async function deleteUser(args?: { userId: string }) {
  try {
    const res = await http.request<R>('delete', baseUrl + `/user/delete/${args.userId}`)
    return successCallback({ success: res.code === 200 })
  } catch (error) {
    console.log('🚀 ~ getUserPage ~ error:', error)
  }
}

/** 获取用户列表 */
export async function getUserList(data?: object) {
  const res = await http.request<ResultTable>('post', '/user/list', { data })
  return res
}
