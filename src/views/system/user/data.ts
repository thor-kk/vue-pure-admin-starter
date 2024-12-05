import dayjs from 'dayjs'
import { ProColumns } from '@/components'

export const columns: ProColumns[] = [
  {
    label: '头像',
    prop: 'avatar',
    el: { table: 'avatar' },
    elProps: { table: ({ row }) => ({ src: row.avatar, size: 'small' }) },
    hideDesc: true
  },
  {
    label: '登录名',
    prop: 'username',
    actionCode: 'detail'
  },
  {
    label: '用户名',
    prop: 'nickname',
    showSearch: true
  },
  {
    label: '性别',
    prop: 'sex',
    el: { table: 'tag', desc: 'tag' },
    elProps: { table: { effect: 'plain' } },
    options: [
      { value: 0, label: '男', tagType: 'primary' },
      { value: 1, label: '女', tagType: 'danger' }
    ]
  },
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
  {
    label: '状态',
    prop: 'status',
    el: { table: 'switch' },
    elProps: {
      table: {
        activeValue: 1,
        activeText: '开启',
        inactiveValue: 0,
        inactiveText: '关闭',
        inlinePrompt: true
      }
    }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
  }
]
