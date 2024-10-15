/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:34:31
 * @LastEditTime: 2024-10-15 11:20:15
 * @Description: 字典模块
 */

import { http } from '@/utils/http'
import { Result } from '../type'
import { Login } from './type'

/** 登入 */
export async function login(data?: Login) {
  /** 测试数据 */
  data.username = 'admin'
  data.password = '123456'

  try {
    const res = await http.request<Result<string>>('post', '/login', { data })
    if (res.code === 200) return res.data
  } catch (error) {}
}
