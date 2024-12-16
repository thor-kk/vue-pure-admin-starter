import { ProPageColumn } from '@/components'
import dayjs from 'dayjs'

export const columns: ProPageColumn[] = [
  {
    label: '角色名称',
    prop: 'name',
    actionCode: 'detail',
    showSearch: true
  },
  {
    label: '角色标识',
    prop: 'code'
  },
  {
    label: '状态',
    prop: 'status',
    el: { table: 'switch', desc: 'tag' },
    options: [
      { value: 1, label: '启用', switch: 'active', tagType: 'primary' },
      { value: 0, label: '禁用', switch: 'inactive', tagType: 'danger' }
    ],
    disabled: { table: ({ row }) => row.code === 'admin' },
    hideForm: true
  },
  {
    label: '备注',
    prop: 'remark',
    el: { form: 'textarea' }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
    hideForm: true
  }
]
