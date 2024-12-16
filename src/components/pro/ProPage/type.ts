import type { ElProps, ElType } from '@/components'

/** CRUD编码 */
export type ActionCode = 'create' | 'update' | 'delete' | 'detail'

/** 操作按钮 */
export interface Action {
  /** 按钮文字 */
  text?: string
  /** CRUD 编码 */
  code?: ActionCode
  /** CRUD Api */
  api?: any
  /** click 事件 */
  click?: any
  /** 其他 */
  [key: string]: any
}

export interface ProPageColumn {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 表格列类型 */
  type?: 'index' | 'selection'
  /** 表格列固定 */
  fixed?: 'left' | 'right'
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
  /** 选项（用于下拉选择组件） */
  options?: any
  /** 是否是字典（开启后可以根据 value 值和 options 自动翻译） */
  dict?: { table: boolean }
  /** 格式化（用于表格翻译） */
  formatter?: ({ row }: { row: any }) => string
  /** CRUD编码（可以快速打开内置编辑弹窗、描述列表弹窗） */
  actionCode?: ActionCode
  /** 查询表单展示（因为大部分字段用不到查询条件，所以只需要特定展示即可） */
  showSearch?: boolean
  /** 表格隐藏 */
  hideTable?: boolean
  /** 表单隐藏 */
  hideForm?: boolean
  /** 描述列表隐藏 */
  hideDesc?: boolean
  /** 其他 */
  [key: string]: any
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
  /** 表格状态改变接口 */
  statusChangeApi?: any
  /** 主要操作按钮 */
  mainAction?: Action[]
  /** 表格操作按钮 */
  tableAction?: Action[]
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
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
