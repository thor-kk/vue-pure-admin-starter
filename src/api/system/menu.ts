import { http } from '@/utils/http'

type Result = {
  success: boolean
  data?: Array<any>
}

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<Result>('post', '/menu', { data })
}
