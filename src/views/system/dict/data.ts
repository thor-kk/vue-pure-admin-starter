/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:05:57
 * @LastEditTime: 2024-10-10 14:49:30
 * @Description: 数据配置
 */

import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'

import { useDictStoreHook } from '@/store/modules/dict'

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
    options: useDictStoreHook().getDict('status')
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
