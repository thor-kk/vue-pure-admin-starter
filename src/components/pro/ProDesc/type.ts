import type { ElProps, ElType } from '../ProPageV2/el'

/** 通用类型（查询表单、编辑表单、描述列表） */
export interface ProColumns {
  /** 标签 */
  label: string
  /** 字段 */
  prop: string
  /** 元素（组件） */
  el?: ElType | Component
  /** 元素（组件）属性 */
  elProps?: ElProps
  /** 选项（字典） */
  options?: { label: string; value: any; tagType?: 'primary' | 'danger'; switch?: 'active' | 'inactive' }[]
  /** 插槽 */
  slot?: boolean
  /** label 宽度 */
  labelWidth?: number
  /** 格式化 */
  formatter?: (args: { row: any }) => string
}
