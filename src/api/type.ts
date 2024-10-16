/*
 * @Author: Yyy
 * @Date: 2024-10-15 10:51:34
 * @LastEditTime: 2024-10-16 15:57:31
 * @Description: 公共类型定义
 */

export * from './user/type'

/** 返回结构 - 1 */
export type Result = {
  success: boolean
  data: Array<any>
}

/** 返回结构 - 2 */
export type R<T = any> = {
  code: number
  message: string
  data: T
}
