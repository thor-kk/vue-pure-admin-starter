import dayjs from 'dayjs'
import { ProColumns } from '@/components'

export const columns: ProColumns[] = [
  {
    label: '头像',
    prop: 'avatar',
    el: { table: 'avatar' },
    elProps: { table: ({ row }) => ({ src: row.avatar, size: 'small' }) },
    hideDesc: true,
    hideForm: true
  },
  {
    label: '登录名',
    prop: 'username',
    actionCode: 'detail'
  },
  {
    label: '用户名',
    prop: 'nickname',
    defaultValue: { form: '李四', search: '张三' },
    rule: [{ required: true, message: '请输入用户名' }],
    showSearch: true
  },
  {
    label: '性别',
    prop: 'sex',
    rule: [{ required: true, message: '请选择性别' }],
    el: { table: 'tag', desc: 'tag', form: 'select' },
    elProps: { table: { effect: 'plain' }, desc: { effect: 'plain' } },
    options: [
      { value: 0, label: '男', tagType: 'primary' },
      { value: 1, label: '女', tagType: 'danger' }
    ]
  },
  {
    label: '部门',
    prop: 'dept',
    formatter: ({ row }) => row.dept?.name
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
    defaultValue: { form: 1 },
    el: { table: 'switch', desc: 'tag', form: 'switch' },
    elProps: {
      table: {
        activeValue: 1,
        activeText: '启用',
        inactiveValue: 0,
        inactiveText: '禁用',
        inlinePrompt: true
      },
      form: {
        activeValue: 1,
        activeText: '启用',
        inactiveValue: 0,
        inactiveText: '禁用',
        inlinePrompt: true
      }
    },
    options: [
      { value: 1, label: '启用', tagType: 'primary' },
      { value: 0, label: '禁用', tagType: 'danger' }
    ]
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
    hideForm: true
  }
]
