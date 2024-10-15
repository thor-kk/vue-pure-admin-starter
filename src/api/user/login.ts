/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-15 10:54:59
 * @Description: 字典模块
 */

import { http } from '@/utils/http'
import { Result } from '../type'

/** 登入 */
export async function login(data?: { username: string; password: string }) {
  try {
    const res = await http.request<Result<string>>('post', '/login', { data })
    if (res.code === 200) return res.data
  } catch (error) {}
}
