/*
 * @Author: Yyy
 * @Date: 2024-10-08 14:30:36
 * @LastEditTime: 2024-10-12 15:47:32
 * @Description: 字典模块
 */

import { defineStore } from 'pinia'
import { store } from '../utils'
import { systemService } from '@/api'

type dictItem = { label: string; value: any; color?: string; identifier?: string }

type dictType = {
  dict?: { [key: string]: dictItem[] }
  /** 请求锁 */
  lock?: boolean
}

export const useDictStore = defineStore({
  id: 'store-dict',

  state: (): dictType => ({
    dict: {},
    lock: false
  }),

  actions: {
    /** 获取字典 */
    async getDict(key: string): Promise<dictItem[]> {
      if (this.lock) return
      if (!this.dict[key]) {
        this.lock = true
        const res = await systemService.dictApi.getDict({ key })
        this.lock = false

        this.dict[key] = res.data.map((item: any) => ({
          label: item.dictItemName,
          value: item.dictItemValue,
          color: item.color,
          identifier: item.identifier
        }))
      }

      return this.dict[key] || []
    }
  }
})

export function useDictStoreHook() {
  return useDictStore(store)
}
