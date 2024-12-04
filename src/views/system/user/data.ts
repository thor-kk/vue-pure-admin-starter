import dayjs from 'dayjs'
import { ProColumns } from '@/components'

export const columns: ProColumns[] = [
  { label: '头像', prop: 'avatar' },
  { label: '登录名', prop: 'username' },
  {
    label: '用户名',
    prop: 'nickname',
    showSearch: true
  },
  { label: '性别', prop: 'sex' },
  {
    label: '部门',
    prop: 'dept',
    formatter: ({ row }) => row.dept.name
  },
  { label: '手机号', prop: 'phone' },
  {
    label: '邮箱',
    prop: 'email',
    hideTable: true
  },
  { label: '状态', prop: 'status' },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
  }
]
