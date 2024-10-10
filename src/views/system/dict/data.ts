/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:05:57
 * @LastEditTime: 2024-10-10 10:47:32
 * @Description: 数据配置
 */

import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'

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

export const rules: FormRules = {
  dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  dictCode: [{ required: true, message: '请输入字典编码', trigger: 'blur' }]
}
