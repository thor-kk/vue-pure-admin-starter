/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-18 16:35:44
 * @Description: 监控模块
 */

import type { Result, ResultTable } from '../type'

import { http } from '@/utils/http'

/** 获取在线用户列表 */
export async function getOnlineLogsList(data?: object) {
  const res = await http.request<ResultTable>('post', '/online-logs', { data })
  return res
}

/** 获取登录日志列表 */
export async function getLoginLogsList(data?: object) {
  const res = await http.request<ResultTable>('post', '/login-logs', { data })
  return res
}

/** 获取操作日志列表 */
export async function getOperationLogsList(data?: object) {
  const res = await http.request<ResultTable>('post', '/operation-logs', { data })
  return res
}

/** 获取请求日志列表 */
export async function getSystemLogsList(data?: object) {
  const res = await http.request<ResultTable>('post', '/system-logs', { data })
  return res
}

/** 获取请求日志详情 */
export async function getSystemLogsDetail(data?: object) {
  const res = await http.request<Result>('post', '/system-logs-detail', { data })
  return res
}
