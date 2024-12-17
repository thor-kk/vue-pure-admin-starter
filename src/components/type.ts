/** 通用类型 */
export interface ProColumn {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 元素 */
  el?: ElType
  /** 元素属性 */
  elProps?: ElProps
  /** 默认值 */
  defaultValue?: any
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 规则 */
  rules?: any
  /** 选项 */
  options?: DictItem[]
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
  /** 树选择 */
  | 'tree-select'
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
  /** 图标 */
  | 'icon'

/** 常用组件属性的提示 */
export interface ElProps {
  /** 提示语 */
  placeholder?: string
  /** 其他扩展 */
  [key: string]: any
}

export interface DictItem {
  /** 字典标签 */
  label: string
  /** 字典值 */
  value: any
  /** tag 标识 */
  tagType?: string
  /** switch 标识 */
  switch?: 'active' | 'inactive'
}
