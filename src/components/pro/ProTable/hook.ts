import type { ElType, ProColumns } from '@/components/type'
import { ProAvatar, ProSwitch, ProTag } from '@/components'
import { ElLink } from 'element-plus'

export function handleTableEl(el: ElType) {
  if (el === 'avatar') return ProAvatar
  if (el === 'switch') return ProSwitch
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

  columns.forEach((item) => {
    /** 组件映射 */
    if (item.el) item.el = shallowRef(handleTableEl(item.el)) as any

    item.slot = (item.el || item.__slot__) && item.prop

    const originalFormatter = item.formatter
    item.formatter = originalFormatter ? (row) => originalFormatter({ row }) : undefined
  })

  return { columns }
}
