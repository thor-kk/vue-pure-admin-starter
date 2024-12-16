import type { PlusColumn } from 'plus-pro-components'
import type { ElType, ProColumn } from '@/components/type'
import { ProTag } from '@/components'

/** 需要映射的元素 */
const needHandleEl = ['tag']

/** 映射的组件 */
function handleEl(el: ElType) {
  if (el === 'tag') return ProTag
}

export function useColumnsHook(columns: ProColumn[]) {
  const descColumns = columns.map((item) => {
    /** 组件映射 */
    if (needHandleEl.includes(item.el)) {
      if (item.el) item.el = handleEl(item.el) as any
      item.__slot__ = true
    }

    /** 字段映射 */
    return {
      ...item,
      formatter: item.formatter ? (_, col) => item.formatter({ row: col.row }) : undefined,
      valueType: item.el ?? '',
      fieldProps: item.elProps
    } as PlusColumn
  })

  return { columns: descColumns }
}
