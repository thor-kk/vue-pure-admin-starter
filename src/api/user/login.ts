/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-15 14:32:38
 * @Description: 字典模块
 */

import { http } from '@/utils/http'
import { R, Result } from '../type'
import { Login, RefreshTokenResult, UserResult } from './type'

/** 登录 */
export async function getLogin(data?: object) {
  try {
    const res = await http.request<UserResult>('post', '/login', { data })
    return res
  } catch (error) {}
}

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>('post', '/refresh-token', { data })
}

/** 获取动态路由 */
export const getAsyncRoutes = () => {
  return http.request<Result>('get', '/get-async-routes')
}

/** 登录 */
export async function login(data?: Login) {
  /** 测试数据 */
  data.username = 'admin'
  data.password = '123456'

  try {
    const res = await http.request<R<string>>('post', '/login', { data })
    if (res.code === 200) return res.data
  } catch (error) {}
}
