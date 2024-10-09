/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:05:57
 * @LastEditTime: 2024-10-09 17:25:52
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
    prop: 'status',
    valueType: 'select',
    slot: true,
    options: [
      {
        label: '已启用',
        value: true,
        color: '#67c23a'
      },
      {
        label: '未启用',
        value: false,
        color: '#f56c6c'
      }
    ]
  },
  {
    label: '备注',
    prop: 'remark',
    hideInSearch: true
  }
]
