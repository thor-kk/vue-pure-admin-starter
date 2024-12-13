/** 通用类型（查询表单、编辑表单、描述列表）*/
export interface ProColumns {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 元素（组件） */
  el?: ElType
  /** 元素（组件）属性 */
  elProps?: ElProps
  /** 默认值 */
  defaultValue?: any
  /** 规则 */
  rules?: any
  /** 选项（字典） */
  options?: { label: string; value: any; tagType?: 'primary' | 'danger'; switch?: 'active' | 'inactive' }[]
  /** label 宽度 */
  labelWidth?: number
  /** 格式化 */
  formatter?: (args: { row: any }) => string
  /** 其他属性 */
  [key: string]: any
}

/** 组件类型 */
export type ElType =
  /** 下拉选择 */
  | 'select'
  /** 时间选择 */
  | 'date-picker'
  /** 单选 */
  | 'radio'
  /** 开关 */
  | 'switch'
  /** 链接 */
  | 'link'
  /** 标签 */
  | 'tag'
  /** 头像 */
  | 'avatar'
  /** 文本域 */
  | 'textarea'

/** 常用组件属性的提示 */
export interface ElProps {
  /** 提示语 */
  placeholder?: string
  /** 其他扩展 */
  [key: string]: any
}
