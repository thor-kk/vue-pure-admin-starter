/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-12-02 09:37:26
 * @Description: 字典模块
 */

import type { Result, ResultTable } from '../type'

import { http } from '@/utils/http'
import { ElMessage } from 'element-plus'
import { ProMessageBox } from '@/components'
import { successCallback } from '../utils'

export interface PlusResult {
  success: boolean
  data: { data: Array<any>; total: number }
}

export interface R<T = any> {
  code: number
  message: string
  data: T
}

/** 获取字典 */
export async function getDictList(data?: any) {
  try {
    const res = await http.request<PlusResult>('get', '/dict/list', { params: data })
    if (res.success) return res.data
  } catch (error) {}
}

/** 新增字典项 */
export async function createDictItem({ data, callback }: { data?: any; callback?: Function }): Promise<boolean> {
  try {
    const res = await http.request<PlusResult>('post', '/dict/create', { data })
    return successCallback({ success: res.success, callback })
  } catch (error) {}
}

/** 修改字典项 */
export async function updateDictItem({ data, callback }: { data?: any; callback?: Function }): Promise<boolean> {
  try {
    const res = await http.request<PlusResult>('put', '/dict/update', { data })
    return successCallback({ success: res.success, callback })
  } catch (error) {}
}

/** 获取字典项 */
export async function getDict(data?: { key: string }) {
  if (!data.key) return

  try {
    const res = await http.request<PlusResult>('get', '/dict', { params: data })
    if (res.success) return res.data
  } catch (error) {}
}

/** 删除字典项 */
export async function deleteDictItem({ ids, callback }: { ids: string[]; callback?: Function }) {
  if (ids.length === 0) return ElMessage.warning('请选择要删除的数据')

  const isConfirm = await ProMessageBox({ type: 'delete' })
  if (!isConfirm) return

  try {
    const res = await http.request<PlusResult>('delete', '/dict/item', { data: { ids } })
    successCallback({ success: res.success, callback })
  } catch (error) {}
}

/** 获取字典列表 - pure */
export async function getDictTree() {
  const res = await http.request<Result>('get', '/dict-tree')
  return res
}

/** 获取字典详情 - pure */
export async function getDictDetail(data?: object) {
  const res = await http.request<ResultTable>('post', '/dict-detail', { data })
  return res
}
