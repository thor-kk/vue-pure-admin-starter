/*
 * @Author: Yyy
 * @Date: 2024-12-11 15:33:52
 * @LastEditTime: 2024-12-13 09:55:23
 * @Description: 组件逻辑
 */

import type { Component } from 'vue'
import { ProAvatar, ProSwitchV2, ProTag } from '@/components'
import { ElLink } from 'element-plus'
import { ElType } from '@/components/type'

/** 分页表格 */
export function handleTableEl(el: ElType | Component) {
  if (el === 'switch') return ProSwitchV2
  if (el === 'tag') return ProTag
  if (el === 'link') return ElLink
  if (el === 'avatar') return ProAvatar
}
