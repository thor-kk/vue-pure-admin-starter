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
  /** 时间（用于：查询表单、编辑表单） */
  | 'time'
  /** 链接（用于：表格） */
  | 'link'
  /** 头像（用于：表格） */
  | 'avatar'
  /** 标签（用于：表格） */
  | 'tag'

/** 组件属性 */
interface ElProps {
  /** 提示语（用于输入框组件） */
  placeholder?: string
  /** 图片链接（用于头像组件） */
  src?: string
  /** 激活值（用于开关组件） */
  activeValue?: string | boolean | number
  /** 激活文字（用于开关组件） */
  activeText?: string
  /** 未激活值（用于开关组件） */
  inactiveValue?: string | boolean | number
  /** 未激活文字（用于开关组件） */
  inactiveText?: string
  /** 文字内联（用于开关组件） */
  inlinePrompt?: boolean
  /** 其他扩展 */
  [key: string]: any
}

/** CRUD编码 */
export type ActionCode = 'add' | 'edit' | 'detail'

/** 操作按钮 */
export interface ActionBtn {
  /** 按钮文本 */
  text?: string
  /** 按钮点击事件（表格按钮会传递当前行数据 row） */
  click?: (args?: { row: any }) => void
  /** CRUD编码（可以快速打开内置编辑弹窗、描述列表弹窗） */
  code?: ActionCode
  /** CRUD事件（对应编辑弹框的确认按钮，会传递表单数据 form，需要返回一个 boolean，判断是否继续执行） */
  confirm?: (args?: { form: any }) => boolean | Promise<boolean> | any
  /** CRUD数据（通常用于传入编辑弹窗的回显数据） */
  data?: (args?: { row: any }) => any
}

export interface ProColumns {
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
  /** 插槽（表格、查询表单、编辑表单、描述列表分别开启） */
  slot?: { table?: boolean; search?: boolean; form?: boolean; desc?: boolean }
  /** 通用组件元素（在表格、描述列表、查询表单、编辑表单中分别映射）*/
  el?: { table?: ElType | Component; search?: ElType; form?: ElType; desc?: ElType }
  /** 通用组件传递的属性 */
  elProps?: { table?: ElProps | (({ row }) => ElProps); search?: ElProps; form?: ElProps; desc?: ElProps }
  /** 选项（用于下拉选择组件） */
  options?: { label: string; value: any }[]
  /** 是否是字典（开启后可以根据 value 值和 options 自动翻译） */
  dict?: { table: boolean }
  /** 格式化（用于表格翻译） */
  formatter?: ({ row }: { row: any }) => string
  /** 查询表单展示（因为大部分字段用不到查询条件，所以只需要特定展示即可） */
  /** CRUD编码（可以快速打开内置编辑弹窗、描述列表弹窗） */
  actionCode?: ActionCode
  showSearch?: boolean
  /** 表格隐藏 */
  hideTable?: boolean
  /** 表单隐藏 */
  hideForm?: boolean
  /** 描述列表隐藏 */
  hideDesc?: boolean
}

export interface Props {
  /** 配置 */
  columns: ProColumns[]
  /** 请求接口 */
  api: (args?: { searchParams: any }) => Promise<Page>
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
}
