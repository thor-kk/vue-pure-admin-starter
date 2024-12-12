import { PlusColumn } from 'plus-pro-components'
import { handleFormEl, plusEl } from '../ProPageV2/el'
import { ProColumns } from '@/components/type'

export function useColumnsHook(columns: ProColumns[]) {
  /** 规则 */
  const rules = {}
  /** 默认值 */
  const defaultValues = {}

  const formColumns = columns.map((item) => {
    defaultValues[item.prop] = item.defaultValue
    rules[item.prop] = item.rules

    /** 组件映射 */
    if (plusEl.includes(item.el as string)) {
      if (item.el) item.el = handleFormEl(item.el)
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
