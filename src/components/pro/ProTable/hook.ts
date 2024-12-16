import type { ElType, ProColumn } from '@/components/type'
import { ProAvatar, ProSwitch, ProTag } from '@/components'
import { ElLink } from 'element-plus'

export function handleTableEl(el: ElType) {
  if (el === 'avatar') return ProAvatar
  if (el === 'switch') return ProSwitch
  if (el === 'tag') return ProTag
  if (el === 'link') return ElLink
}

export function useColumnsHook(args: { columns: ProColumn[]; showIndex?: boolean; action?: any }) {
  const { columns, showIndex, action } = args

  /** 序号列 */
  if (showIndex) {
    columns.unshift({ label: '序号', prop: 'index', type: 'index', width: 60, fixed: 'left' })
  }

  /** 操作列 */
  if (action && action.length > 0) {
    columns.push({
      label: '操作',
      prop: '__operation__',
      fixed: 'right',
      width: 60 * action.length,
      __slot__: true
    })
  }

  const _columns = columns.map((item) => {
    /** 组件映射 */
    if (item.el) {
      item.el = handleTableEl(item.el) as any
      item.__slot__ = true
    }

    return {
      ...item,
      slot: item.__slot__ && item.prop,
      formatter: item.formatter ? (row) => item.formatter({ row }) : undefined
    } as ProColumn
  })

  return { columns: _columns }
}
