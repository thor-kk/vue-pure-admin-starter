import { Page } from '@/api'

export interface ProColumns {
  /** 标题 */
  label: string
  /** 字段 */
  prop: string
  /** 查询表单展示（因为大部分字段用不到查询条件，所以只需要特定展示即可） */
  showSearch?: boolean
  /** 表格隐藏 */
  hideTable?: boolean
}

export interface Props {
  /** 配置 */
  columns: ProColumns[]
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
