import { ProPageColumn } from '@/components'
import { systemService } from '@/api'
import { findTreeItem } from '@/utils'
import dayjs from 'dayjs'

const menuTree = await systemService.menuApi.getMenuTree()

export const columns: ProPageColumn[] = [
  {
    label: '父级菜单',
    prop: 'parId',
    el: { form: 'tree-select' },
    elProps: { form: { data: menuTree, props: { label: 'title', value: 'menuId' }, checkStrictly: true } },
    hide: { table: true },
    formatter: ({ row }) => findTreeItem({ tree: menuTree, prop: 'menuId', value: row.parId })?.title
  },
  {
    label: '菜单名称',
    prop: 'title',
    align: 'left',
    actionCode: 'detail',
    hide: { search: false }
  },
  {
    label: '图标',
    prop: 'icon',
    el: { table: 'icon', desc: 'icon' }
  },
  {
    label: '类型',
    prop: 'type',
    el: { table: 'tag', desc: 'tag', form: 'select' },
    options: [
      { value: '01', label: '目录', tagType: 'primary' },
      { value: '02', label: '菜单', tagType: 'info' }
    ]
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
    label: '创建时间',
    prop: 'createTime',
    formatter: ({ row }) => dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss'),
    hide: { form: true }
  }
]
