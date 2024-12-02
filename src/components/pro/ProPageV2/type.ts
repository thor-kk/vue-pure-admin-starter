import { Page } from '@/api'

export interface Props {
  /** 配置 */
  columns: any[]
  /** 请求接口 */
  api: (searchParams: any) => Promise<Page>
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
  /** 分页 - 默认条目个数 */
  paginationPageSize?: number
  /** 分页 - 每页显示个数选择器的选项设置 */
  paginationPageSizes?: number[]
  /** 查询表单 - 条件个数 */
  searchFormShowNum?: number
}
