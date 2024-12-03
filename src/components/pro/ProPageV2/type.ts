import type { Component } from 'vue'
import { Page } from '@/api'

/** 组件类型 */
type ElType =
  /** 输入框（用于：查询表单、编辑表单） */
  | 'input'
  /** 下拉选择（用于：查询表单、编辑表单） */
  | 'select'
  /** 开关（用于：表格、编辑表单） */
  | 'switch'
  /** 事件（用于：查询表单、编辑表单） */
  | 'time'

/** 组件属性 */
interface ElProps {
  /** 提示语（用于输入框组件） */
  placeholder?: string
  /** 其他扩展 */
  [key: string]: any
}

export interface ProColumns {
  /** 标题 */
  label: string
  /** 字段 */
  prop: string
  /** 插槽（表格、查询表单、编辑表单、描述列表分别开启） */
  slot?: { table?: boolean; search?: boolean; form?: boolean; desc?: boolean }
  /** 通用组件元素（在表格、描述列表、查询表单、编辑表单中分别映射）*/
  el?: { table?: ElType | Component; search?: ElType; form?: ElType; desc?: ElType }
  /** 通用组件传递的属性 */
  elProps?: ElProps
  /** 选项（用于下拉选择组件） */
  options?: { label: string; value: any }[]
  /** 格式化（用于表格翻译） */
  formatter?: ({ row }: { row: any }) => string
  /** 查询表单展示（因为大部分字段用不到查询条件，所以只需要特定展示即可） */
  showSearch?: boolean
  /** 表格隐藏 */
  hideTable?: boolean
  /** 表单隐藏 */
  hideForm?: boolean
}

export interface Props {
  /** 配置 */
  columns: ProColumns[]
  /** 请求接口 */
  api: (searchParams: any) => Promise<Page>
  /** 主要操作按钮 */
  mainBtn?: { code?: 'add' | 'edit'; confirm?: ({ data }: { data: any }) => any; text?: string; click?: any }[]
  /** 表格操作按钮 */
  tableBtn?: { code?: 'add' | 'edit'; confirm?: ({ data }: { data: any }) => any; text: string; click?: any }[]
  /** 表格 - 自适应高度 */
  tableAdaptive?: boolean
  /** 表格 - 统一对齐方式 */
  tableAlignWhole?: 'center' | 'left' | 'right'
  /** 分页 - 默认条目个数 */
  paginationPageSize?: number
  /** 分页 - 每页显示个数选择器的选项设置 */
  paginationPageSizes?: number[]
  /** 查询表单 - 条件个数 */
  searchFormShowNum?: number
  /** 查询表单 - 折叠动画 */
  searchFormCollapseTransition?: boolean
}
