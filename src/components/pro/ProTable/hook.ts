import type { PlusColumn } from 'plus-pro-components'
import type { ElType, ProColumns } from '@/components/type'
import { ProAvatar, ProSwitchV2, ProTag } from '@/components'
import { ElLink } from 'element-plus'

export function handleTableEl(el: ElType) {
  if (el === 'avatar') return ProAvatar
  if (el === 'switch') return ProSwitchV2
  if (el === 'tag') return ProTag
  if (el === 'link') return ElLink
}

export function useColumnsHook(args: { columns: ProColumns[]; showIndex?: boolean; action?: any }) {
  const { columns, showIndex, action } = args

  /** 序号列 */
  if (showIndex) {
    columns.unshift({ label: '序号', prop: 'index', type: 'index', width: 60, fixed: 'left' })
  }

  /** 操作列 */
  if (action && action.length > 0) {
    columns.push({ label: '操作', prop: '__operation__', fixed: 'right', __slot__: true })
  }

  const tableColumns = columns.map((item) => {
    /** 组件映射 */
    if (item.el) item.el = shallowRef(handleTableEl(item.el)) as any

    /** 字段映射 */
    return {
      ...item,
      slot: (item.el || item.__slot__) && item.prop,
      formatter: item.formatter ? (row) => item.formatter({ row }) : undefined
    } as PlusColumn
  })

  return { columns: tableColumns }
}
