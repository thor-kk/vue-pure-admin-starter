import type { Component } from 'vue'
import type { ElProps, ElType } from './el'
import { Page } from '@/api'

/** CRUD编码 */
export type ActionCode = 'create' | 'update' | 'delete' | 'detail'

/** 操作按钮 */
export interface ActionBtn {
  /** 按钮文本（传入 CRUD code 时可省略） */
  text?: string
  /** CRUD 编码（可以快速打开内置编辑弹窗、描述列表弹窗并刷新列表） */
  code?: ActionCode
  /** CRUD Api（增删改查对应接口） */
  api?: (args?: { data?: any; row?: any }) => Promise<boolean>
  /** 普通点击事件（表格按钮会传递当前行数据 row） */
  click?: (args?: { row: any }) => any
  /** CRUD 回显数据（需要处理时） */
  data?: (args?: { row: any }) => any
}

export interface ProPageColumns {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 表格列类型 */
  type?: 'index' | 'selection'
  /** 表格列固定 */
  fixed?: 'left' | 'right'
  /** 宽度（用于表格） */
  width?: string | number
  /** 默认值 */
  defaultValue?: { search?: any; form?: any }
  /** 规则 */
  rules?: any
  /** 插槽（表格、查询表单、编辑表单、描述列表分别开启） */
  slot?: { table?: boolean; search?: boolean; form?: boolean; desc?: boolean }
  /** 通用组件元素（在表格、描述列表、查询表单、编辑表单中分别映射）*/
  el?: { table?: ElType | Component; search?: ElType; form?: ElType | Component; desc?: ElType | Component }
  /** 通用组件传递的属性 */
  elProps?: { table?: ElProps | (({ row }) => ElProps); search?: ElProps; form?: ElProps; desc?: ElProps }
  /** 选项（用于下拉选择组件） */
  options?: { label: string; value: any; tagType?: 'primary' | 'danger'; switch?: 'active' | 'inactive' }[]
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
}

export interface Props {
  /** 标题 */
  title?: string
  /** 配置 */
  columns: ProPageColumns[]
  /** 请求接口 */
  api: (params?: any) => Promise<Page>
  /** 表格状态改变接口 */
  statusChangeApi?: (args?: { row: any }) => Promise<boolean>
  /** 主要操作按钮 */
  mainBtn?: ActionBtn[]
  /** 表格操作按钮 */
  tableBtn?: ActionBtn[]
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
  /** 表格 - 统一对齐方式 */
  tableAlignWhole?: 'center' | 'left' | 'right'
  /** 表格 - 显示序号索引 */
  tableIndex?: boolean
  /** 表格 - 显示溢出工具提示 */
  tableShowOverflowTooltip?: boolean
  /** 分页 - 默认条目个数 */
  paginationPageSize?: number
  /** 分页 - 每页显示个数选择器的选项设置 */
  paginationPageSizes?: number[]
  /** 查询表单 - 条件个数 */
  searchFormShowNum?: number
  /** 查询表单 - 折叠动画 */
  searchFormCollapseTransition?: boolean
  /** 编辑表单 - label 宽度 */
  editFormLabelWidth?: number
  /** 编辑表单 - label 显示位置 */
  editFormLabelPosition?: 'left' | 'right' | 'top'
  /** 编辑表单 - 校验规则错误提示 */
  editFormHasErrorTip?: boolean
  /** 编辑表单 - 两列显示 */
  editForm2Col?: boolean
}
