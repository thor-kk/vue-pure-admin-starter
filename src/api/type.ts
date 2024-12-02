/*
 * @Author: Yyy
 * @Date: 2024-10-15 10:51:34
 * @LastEditTime: 2024-12-02 09:39:01
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
  code: 200 | 401 | 500
  msg: string
  data: T
}

export interface Page<T = any> {
  total: number
  records: T[]
}

export type RPage<T = any> = R<Page<T>>
