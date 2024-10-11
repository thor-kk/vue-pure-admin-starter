/*
 * @Author: Yyy
 * @Date: 2024-10-09 10:05:57
 * @LastEditTime: 2024-10-11 16:42:07
 * @Description: 数据配置
 */

import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'

import { useDictStoreHook } from '@/store'

/** 字典 */
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

/** 字典项 */
export function getDictItemColumns(): PlusColumn[] {
  return [
    {
      label: '字典标签',
      prop: 'dictItemName',
      slot: true
    },
    {
      label: '字典值',
      prop: 'dictItemValue'
    },
    {
      label: '状态',
      prop: 'status',
      valueType: 'select',
      slot: true,
      options: useDictStoreHook().getDict('status')
    },
    {
      label: '颜色',
      prop: 'color',
      hideInSearch: true
    },
    {
      label: '标识符',
      prop: 'identifier',
      hideInSearch: true
    },
    {
      label: '排序',
      prop: 'sort',
      hideInSearch: true
    },
    {
      label: '备注',
      prop: 'remark',
      hideInSearch: true
    }
  ]
}
