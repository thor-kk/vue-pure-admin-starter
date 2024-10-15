/*
 * @Author: Yyy
 * @Date: 2024-10-15 10:51:34
 * @LastEditTime: 2024-10-15 10:53:02
 * @Description: 统一类型定义
 */

export type Result<T = any> = {
  code: number
  message: string
  data: T
}
