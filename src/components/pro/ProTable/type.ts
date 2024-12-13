export interface Props {
  /** 列配置 */
  columns: any[]
  /** 数据 */
  data: any[]
  /** 总数 */
  total?: number
  /** 分页大小 */
  pageSize?: number
  /** 分页大小配置 */
  pageSizes?: number[]
  /** 列对齐方式（整体） */
  alignWhole?: 'center' | 'left' | 'right'
  /** 文字省略提示（整体） */
  showOverflowTooltip?: boolean
  /** 自适应高度 */
  adaptive?: boolean
  /** 尺寸 */
  size?: any
}
