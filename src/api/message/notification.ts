/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-22 14:32:04
 * @Description: 字典模块
 */

import type { ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取通知公告列表 */
export async function getNoticeList(data?: object) {
  const res = await http.request<ResultTable>('get', '/notice/list', { params: data })
  if (res.success) return res
}
