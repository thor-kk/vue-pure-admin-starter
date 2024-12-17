import type { DictItem, ElProps, ElType } from '@/components'

export interface Expose {
  getList: any
}

export interface Emits {
  /** 表格行事件 */
  (e: 'table-row-change' | 'table-row-click', args: { row: any }): void
}

export interface Props {
  /** 标题 */
  title?: string
  /** 配置 */
  columns: ProPageColumn[]
  /** 请求接口 */
  api: (params?: any) => Promise<any>
  /** 行 key */
  rowKey?: string
  /** 主要操作按钮 */
  mainAction?: Action[]
  /** 表格操作按钮 */
  tableAction?: Action[]
  /** 表格操作个数 */
  tableActionNum?: number
  /** 表格状态改变接口 */
  tableStatusChangeApi?: any
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
  /** 表格 - 全部展开 */
  tableExpandAll?: boolean
  /** 表格 - 统一对齐方式 */
  tableAlignWhole?: 'center' | 'left' | 'right'
  /** 表格 - 显示序号索引 */
  tableShowIndex?: boolean
  /** 表格 - 显示溢出工具提示 */
  tableShowOverflowTooltip?: boolean
  /** 分页 - 显示分页 */
  showPagination?: boolean
  /** 分页 - 默认条目个数 */
  paginationPageSize?: number
  /** 分页 - 每页显示个数选择器的选项设置 */
  paginationPageSizes?: number[]
  /** 查询表单 - 条件个数 */
  searchShowNum?: number
  /** 查询表单 - 折叠动画 */
  searchCollapseTransition?: boolean
  /** 编辑表单 - label 宽度 */
  formLabelWidth?: number
  /** 编辑表单 - 校验规则错误提示 */
  formHasErrorTip?: boolean
  /** 编辑表单 - 两列显示 */
  form2Col?: boolean
  /** 编辑表单 - 弹窗宽度 */
  formWidth?: number
  /** 描述列表 - 列数 */
  descColumn?: number
  /** 描述列表 - 宽度 */
  descWidth?: any
}

export interface ProPageColumn {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 默认值 */
  defaultValue?: { search?: any; form?: any }
  /** 规则 */
  rules?: any
  /** 禁用 */
  disabled?: { table?: ({ row }) => boolean; search?: any; form?: any; desc?: any }
  /** 通用组件元素（在表格、描述列表、查询表单、编辑表单中分别映射）*/
  el?: { table?: ElType; search?: ElType; form?: ElType; desc?: ElType }
  /** 通用组件传递的属性 */
  elProps?: { table?: ElProps; search?: ElProps; form?: ElProps; desc?: ElProps }
  /** 选项 */
  options?: DictItem[]
  /** 隐藏 */
  hide?: { table?: boolean; search?: boolean; form?: boolean; desc?: boolean }
  /** CRUD编码（可以快速打开内置编辑弹窗、描述列表弹窗） */
  actionCode?: ActionCode
  /** 格式化（用于表格翻译） */
  formatter?: (args: { row: any }) => string
  /** 其他 */
  [key: string]: any
}

/** CRUD编码 */
export type ActionCode = 'create' | 'update' | 'delete' | 'detail'

/** 操作按钮 */
export interface Action {
  /** 按钮文字 */
  text?: string
  /** 按钮类型 */
  type?: string
  /** CRUD 编码 */
  code?: ActionCode
  /** CRUD Api */
  api?: any
  /** click 事件 */
  click?: any
  /** 其他 */
  [key: string]: any
}
