import { ProPageColumn } from '@/components'
import { systemService } from '@/api'
import dayjs from 'dayjs'

const deptTree = await systemService.deptApi.getDeptTree()

export const columns: ProPageColumn[] = [
  {
    label: '上级部门',
    prop: 'parId',
    el: { form: 'tree-select' },
    elProps: { form: { data: deptTree, props: { label: 'name', value: 'deptId' }, checkStrictly: true } },
    hide: { table: true }
  },
  {
    label: '部门名称',
    prop: 'name',
    align: 'left',
    actionCode: 'detail',
    hide: { search: false }
  },
  {
    label: '状态',
    prop: 'status',
    el: { table: 'switch', form: 'switch', desc: 'tag' },
    defaultValue: { form: '01' },
    options: [
      { value: '01', label: '启用', switch: 'active', tagType: 'primary' },
      { value: '02', label: '禁用', switch: 'inactive', tagType: 'danger' }
    ],
    hide: { form: true }
  },
  {
    label: '备注',
    prop: ' remark'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
    hide: { form: true }
  }
]
