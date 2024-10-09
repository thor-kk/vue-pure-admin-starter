/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:05:57
 * @LastEditTime: 2024-10-09 15:41:02
 * @Description: 数据配置
 */

import { PlusColumn } from 'plus-pro-components'

export const columns: PlusColumn[] = [
  {
    label: '字典名称',
    prop: 'dictName'
  },
  {
    label: '字典编码',
    prop: 'dictCode'
  },
  {
    label: '状态',
    prop: 'status'
  },
  {
    label: '备注',
    prop: 'remark',
    hideInSearch: true
  }
]
