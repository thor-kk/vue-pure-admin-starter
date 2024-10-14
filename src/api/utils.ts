/*
 * @Author: Yyy
 * @Date: 2024-10-14 15:25:44
 * @LastEditTime: 2024-10-14 15:34:30
 * @Description: api 通用方法
 */

import { ElMessage } from 'element-plus'

/** 基础路径 */
export const baseUrl = ''

/** 请求成功的回调方法 */
export function successCallback(options?: { success?: string | number | boolean; callback?: Function }) {
  if (options.success) {
    ElMessage.success('操作成功')
    if (options.callback) options.callback()
  }
}
