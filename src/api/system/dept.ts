/*
 * @Author: Yyy
 * @Date: 2024-10-16 14:21:57
 * @LastEditTime: 2024-10-17 14:10:05
 * @Description: 菜单管理
 */

import type { Result } from '../type'

import { http } from '@/utils/http'

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>('post', '/dept', { data })
}
