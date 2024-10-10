/*
 * @Author: Yyy
 * @Date: 2024-10-08 14:30:36
 * @LastEditTime: 2024-10-10 11:28:10
 * @Description: 字典模块
 */

import { defineStore } from 'pinia'
import { store } from '../utils'
import { systemService } from '@/api'

type dictType = {
  dict?: { [key: string]: { label: string; value: any; color?: string }[] }
}

export const useDictStore = defineStore({
  id: 'store-dict',

  state: (): dictType => ({
    dict: {}
  }),

  actions: {
    /** 获取字典 */
    async getDict(key: string) {
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
