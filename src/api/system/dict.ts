/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-14 10:48:02
 * @Description: 字典模块
 */

import { http } from '@/utils/http'
import { ElMessage } from 'element-plus'
import { ProMessageBox } from '@/components'

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

/** 删除字典项 */
export async function deleteDictItem(data?: { ids: string[]; callback?: Function }) {
  if (data.ids.length === 0) return ElMessage.warning('请选择要删除的数据')

  const isConfirm = await ProMessageBox({ type: 'delete' })
  if (!isConfirm) return

  try {
    const res = await http.request<Result>('delete', '/dict/item', { data })
    if (res.success) {
      ElMessage.success('操作成功')
      if (data.callback) data.callback()
      return
    }
  } catch (error) {}
}
