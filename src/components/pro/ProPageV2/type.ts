export interface Props {
  /** 配置 */
  columns: any[]
  /** 数据 */
  data: any[]
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
  /** 分页 - 默认条目个数 */
  paginationPageSize?: number
  /** 分页 - 每页显示个数选择器的选项设置 */
  paginationPageSizes?: number[]
}
