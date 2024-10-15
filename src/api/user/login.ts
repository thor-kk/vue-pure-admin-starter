/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-15 14:57:26
 * @Description: 字典模块
 */

import type { R, Result } from '../type'
import type { Login, RefreshTokenResult, UserResult } from './type'

import { http } from '@/utils/http'

/** 登录 */
export async function getLogin(data?: object) {
  try {
    const res = await http.request<UserResult>('post', '/login', { data })
    return res
  } catch (error) {}
}

/** 获取动态路由 */
export function getAsyncRoutes() {
  try {
    return http.request<Result>('get', '/get-async-routes')
  } catch (error) {}
}

/** 刷新`token` */
export async function refreshTokenApi(data?: object) {
  try {
    return http.request<RefreshTokenResult>('post', '/refresh-token', { data })
  } catch (error) {}
}

/** 登录 - 正式联调 */
export async function login(data?: Login) {
  /** 测试数据 */
  data.username = 'admin'
  data.password = '123456'

  try {
    const res = await http.request<R<string>>('post', '/login', { data })
    if (res.code === 200) return res.data
  } catch (error) {}
}
