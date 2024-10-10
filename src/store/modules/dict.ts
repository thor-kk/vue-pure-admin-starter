/*
 * @Author: Yyy
 * @Date: 2024-10-08 14:30:36
 * @LastEditTime: 2024-10-10 14:49:43
 * @Description: 字典模块
 */

import { defineStore } from 'pinia'
import { store } from '../utils'
import { systemService } from '@/api'

type dictItem = { label: string; value: any; color?: string; identifier?: string }

type dictType = {
  dict?: { [key: string]: dictItem[] }
}

export const useDictStore = defineStore({
  id: 'store-dict',

  state: (): dictType => ({
    dict: {}
  }),

  actions: {
    /** 获取字典 */
    async getDict(key: string): Promise<dictItem[]> {
      if (!this.dict[key]) {
        const res = await systemService.dictApi.getDict({ key })
        this.dict[key] = res.data
      }

      return this.dict[key] || []
    }
  }
})

export function useDictStoreHook() {
  return useDictStore(store)
}
