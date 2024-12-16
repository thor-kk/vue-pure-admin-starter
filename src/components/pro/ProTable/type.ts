export interface Action {
  text?: string
  [key: string]: any
}

export interface Emits {
  /** 分页数据改变 */
  (e: 'page-change', args: { pageNum: any; pageSize: any }): void
  /** 行事件 */
  (e: 'row-change' | 'row-click', args: { item: any; row: any }): void
  /** action 点击事件 */
  (e: 'action-click', args: { item: any; row?: any }): void
}

export interface Props {
  /** 列配置 */
  columns: any[]
  /** 数据 */
  data: any[]
  /** 行 key */
  rowKey?: string
  /** 加载 */
  loading?: boolean
  /** 主操作 */
  mainAction?: Action[]
  /** 列表操作 */
  tableAction?: Action[]
  /** 显示索引 */
  showIndex?: boolean
  /** 列对齐方式（整体） */
  alignWhole?: 'center' | 'left' | 'right'
  /** 文字省略提示（整体） */
  showOverflowTooltip?: boolean
  /** 大小 */
  size?: any
  /** 自适应高度 */
  adaptive?: boolean
  /** 树形列表展开 */
  expandAll?: boolean
  /** 总数 */
  total?: number
  /** 分页大小 */
  pageSize?: number
  /** 分页大小配置 */
  pageSizes?: number[]
  /** 显示分页 */
  showPagination?: boolean
}
