import type { ElType, ProColumns } from '@/components/type'
import type { PlusColumn } from 'plus-pro-components'
import { ProSwitchV2 } from '@/components'

/** 需要映射的元素 */
const needHandleEl = ['switch']

/** 映射的组件 */
function handleEl(el: ElType | Component) {
  if (el === 'switch') return ProSwitchV2
}

export function useColumnsHook(columns: ProColumns[]) {
  /** 规则 */
  const rules = {}
  /** 默认值 */
  const defaultValues = {}

  const formColumns = columns.map((item) => {
    defaultValues[item.prop] = item.defaultValue
    rules[item.prop] = item.rules

    /** 组件映射 */
    if (needHandleEl.includes(item.el)) {
      if (item.el) item.el = handleEl(item.el) as any
      item.slot = true
    }

    /** 字段映射 */
    return {
      ...item,
      valueType: item.el ?? '',
      fieldProps: item.elProps
    } as PlusColumn
  })

  return { columns: formColumns, rules, defaultValues }
}
