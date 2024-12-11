/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-12-11 10:50:47
 * @Description: 用户管理
 */

import type { R, ResultTable, RPage } from '../type'

import { http } from '@/utils/http'
import { baseUrl, successCallback } from '../utils'
import { ProMessageBox } from '@/components'

/** 获取用户分页列表 */
export async function getUserPage(params?: object) {
  try {
    const res = await http.request<RPage>('get', baseUrl + '/user/page', { params })
    if (res.code === 200) return res.data
  } catch (error) {
    console.log('🚀 ~ getUserPage ~ error:', error)
  }
}

/** 新增用户 */
export async function createUser(data: any) {
  try {
    const res = await http.request<R>('post', baseUrl + '/user/create', { data })
    return successCallback({ success: res.code === 200 })
  } catch (error) {
    console.log('🚀 ~ createUser ~ error:', error)
  }
}

/** 更新用户 */
export async function updateUser(data: any) {
  try {
    const res = await http.request<R>('put', baseUrl + '/user/update', { data })
    return successCallback({ success: res.code === 200 })
  } catch (error) {
    console.log('🚀 ~ updateUser ~ error:', error)
  }
}

/** 更新用户状态 */
export async function updateUserStatus(args: { userId: any; status: any }) {
  try {
    const res = await http.request<R>('put', baseUrl + '/user/update-status', { data: args })
    return successCallback({ success: res.code === 200 })
  } catch (error) {
    console.log('🚀 ~ updateUser ~ error:', error)
  }
}

/** 删除用户 */
export async function deleteUser(args: { userId: any }) {
  const isConfirm = await ProMessageBox({ type: 'delete' })
  if (!isConfirm) return

  try {
    const res = await http.request<R>('delete', baseUrl + `/user/delete/${args.userId}`)
    return successCallback({ success: res.code === 200 })
  } catch (error) {
    console.log('🚀 ~ deleteUser ~ error:', error)
  }
}

/**
 * ! 以下代码替换完后需要删除
 */

/** 获取用户列表 */
export async function getUserList(data?: object) {
  const res = await http.request<ResultTable>('post', '/user/list', { data })
  return res
}
