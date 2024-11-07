import type { ProPageColumn } from '@/components'

export const tableConfig: ProPageColumn[] = [
  {
    label: '名称',
    prop: 'nickname'
  },
  {
    label: '操作',
    prop: 'operation',
    slot: 'operation',
    fixed: 'right'
  }
]
