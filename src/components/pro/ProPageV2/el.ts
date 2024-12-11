/*
 * @Author: Yyy
 * @Date: 2024-12-11 15:33:52
 * @LastEditTime: 2024-12-11 16:19:59
 * @Description: 组件逻辑
 */

import type { Component } from 'vue'
import { ProSwitchV2, ProTag } from '@/components'
import { ElAvatar, ElLink } from 'element-plus'

/** 表格 */
export function handleTableEl(el: ElType | Component) {
  if (el === 'switch') return ProSwitchV2
  if (el === 'tag') return ProTag
  if (el === 'link') return ElLink
  if (el === 'avatar') return ElAvatar
}

/** 查询表单、编辑表单、描述列表 */

export const plusEl = ['switch', 'tag']

export function handleFormEl(el: ElType | Component) {
  if (el === 'switch') return ProSwitchV2
}

export function handleDescEl(el: ElType | Component) {
  if (el === 'tag') return ProTag
}

/** 组件类型 */
export type ElType =
  /** 下拉选择（查询表单、编辑表单） */
  | 'select'
  /** 时间选择（查询表单、编辑表单）*/
  | 'date-picker'
  /** 单选（编辑表单）*/
  | 'radio'
  /** 开关（表格、编辑表单） */
  | 'switch'
  /** 链接（表格、描述列表） */
  | 'link'
  /** 标签（表格、描述列表） */
  | 'tag'
  /** 头像（表格） */
  | 'avatar'

/** 常用组件属性的提示 */
export interface ElProps {
  /** 提示语 */
  placeholder?: string
  /** 其他扩展 */
  [key: string]: any
}
