/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-14 19:47:04
 * @Description: 字典模块
 */

import { http } from '@/utils/http'
import { ElMessage } from 'element-plus'
import { ProMessageBox } from '@/components'
import { successCallback } from '../utils'

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

/** 新增字典项 */
export async function createDictItem(options?: { data?: any; successCallback?: Function }): Promise<boolean> {
  try {
    const res = await http.request<Result>('post', '/dict/create', { data: options.data })
    return successCallback({ success: res.success, callback: options?.successCallback })
  } catch (error) {}
}

/** 修改字典项 */
export async function updateDictItem(options?: { data?: any; successCallback?: Function }): Promise<boolean> {
  console.log('data', options.data)

  try {
    const res = await http.request<Result>('put', '/dict/update', { data: options.data })
    return successCallback({ success: res.success, callback: options?.successCallback })
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

/** 删除字典项 */
export async function deleteDictItem(options?: { ids: string[]; successCallback?: Function }) {
  if (options.ids.length === 0) return ElMessage.warning('请选择要删除的数据')

  const isConfirm = await ProMessageBox({ type: 'delete' })
  if (!isConfirm) return

  try {
    const res = await http.request<Result>('delete', '/dict/item', { data: { ids: options.ids } })
    successCallback({ success: res.success, callback: options?.successCallback })
  } catch (error) {}
}
