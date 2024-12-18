import type { ElType, ProColumn } from '@/components/type'
import type { PlusColumn } from 'plus-pro-components'
import { ProSwitch } from '@/components'

/** 需要映射的元素 */
const needHandleEl = ['switch']

/** 映射的组件 */
function handleEl(el: ElType) {
  if (el === 'switch') return ProSwitch
}

export function useColumnsHook(columns: ProColumn[]) {
  /** 规则 */
  const rules = ref({})
  /** 默认值 */
  const defaultValues = ref({})

  const _columns = columns.map((item) => {
    defaultValues.value[item.prop] = item.defaultValue
    rules.value[item.prop] = item.rules

    /** 组件映射 */
    if (needHandleEl.includes(item.el)) {
      if (item.el) item.el = handleEl(item.el) as any
      item.__slot__ = true
    }

    /** 字段映射 */
    return {
      ...item,
      valueType: item.el ?? '',
      fieldProps: item.elProps
    } as PlusColumn
  })

  return { columns: _columns, rules, defaultValues }
}
