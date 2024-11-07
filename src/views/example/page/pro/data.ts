import type { ProPageColumn } from '@/components'

export const tableConfig: ProPageColumn[] = [
  {
    label: '勾选列', // 如果需要表格多选，此处label必须设置
    type: 'selection',
    prop: 'selection',
    fixed: 'left',
    reserveSelection: true, // 数据刷新后保留选项
    hideInSearch: true
  },
  {
    label: '名称',
    prop: 'nickname'
  },
  {
    label: '操作',
    prop: 'operation',
    slot: 'operation',
    fixed: 'right',
    hideInSearch: true
  }
]
