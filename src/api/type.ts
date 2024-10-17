/*
 * @Author: Yyy
 * @Date: 2024-10-15 10:51:34
 * @LastEditTime: 2024-10-17 16:04:42
 * @Description: 公共类型定义
 */

export * from './user/type'

export interface Result {
  success: boolean
  data: Array<any>
}

export interface ResultTable {
  success: boolean
  data?: {
    list: Array<any>
    total?: number
    pageSize?: number
    currentPage?: number
  }
}

export interface R<T = any> {
  code: number
  message: string
  data: T
}
