export interface Props {
  /** 列配置 */
  columns: any
  /** 标题 */
  title?: string
  /** 表单宽度 */
  width?: any
  /** 表单 label 宽度 */
  labelWidth?: number
  /** 表单 label 位置 */
  labelPosition?: 'left' | 'right' | 'top'
  /** 表单开启两列 */
  form2Col?: boolean
  /** 规则错误提示 */
  hasErrorTip?: boolean
}

export interface Emits {
  (e: 'confirm' | 'cancel'): void
}

export interface Expose {
  close: any
  open: any
}
