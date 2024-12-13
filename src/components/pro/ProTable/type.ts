export interface Props {
  /** 列配置 */
  columns: any
  /** 数据 */
  data: any
  /** 尺寸 */
  size?: any
  /** 总数 */
  total?: number
  /** 分页大小 */
  pageSize?: number
  /** 分页大小配置 */
  pageSizes?: number[]
  /** 列对齐方式(全部) */
  alignWhole?: 'center' | 'left' | 'right'
  /** 显示上溢工具提示 */
  showOverflowTooltip?: boolean
  /** 表格自适应高度 */
  adaptive?: boolean
}
