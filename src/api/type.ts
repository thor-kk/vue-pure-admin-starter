/*
 * @Author: Yyy
 * @Date: 2024-10-15 10:51:34
 * @LastEditTime: 2024-10-15 14:12:07
 * @Description: 公共类型定义
 */

export * from './user/type'

export type Result = {
  success: boolean
  data: Array<any>
}

export type R<T = any> = {
  code: number
  message: string
  data: T
}
