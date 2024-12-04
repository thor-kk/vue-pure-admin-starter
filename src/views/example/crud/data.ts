import type { ProColumns } from '@/components'
import { systemService } from '@/api'

const statusOptions = await systemService.dictApi.getDict({ key: 'status' })

export const columns: ProColumns[] = [
  {
    label: '姓名',
    prop: 'name',
    actionCode: 'detail',
    slot: { table: true },
    el: { table: 'link' },
    elProps: { type: 'primary' },
    showSearch: true
  },
  {
    label: '状态',
    prop: 'status',
    slot: { table: true },
    el: { search: 'select', table: 'switch' },
    elProps: {},
    options: statusOptions.data,
    formatter: ({ row }) => statusOptions.data.find((item) => item.value === row.status)?.label,
    showSearch: true
  },
  {
    label: '日期',
    prop: 'createTime'
  }
]
