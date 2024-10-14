/*
 * @Author: Yyy
 * @Date: 2024-10-08 14:30:36
 * @LastEditTime: 2024-10-14 14:13:34
 * @Description: 字典模块
 */

import { defineStore } from 'pinia'
import { store } from '../utils'
import { systemService } from '@/api'

type dictItem = { label: string; value: any; color?: string; identifier?: string }

type dictType = {
  dict?: { [key: string]: dictItem[] }
  /** 请求锁 */
  loadingPromises?: any
}

export const useDictStore = defineStore({
  id: 'store-dict',

  state: (): dictType => ({
    dict: {},
    loadingPromises: {}
  }),

  actions: {
    /** 获取字典 */
    async getDict(key: string): Promise<dictItem[]> {
      // 如果数据已存在，直接返回
      if (this.dict[key]) return this.dict[key]

      // 使用 Promise 机制避免重复加载
      if (!this.loadingPromises[key]) {
        this.loadingPromises[key] = new Promise(async (resolve) => {
          try {
            const res = await systemService.dictApi.getDict({ key })
            this.dict[key] = res.data.map((item: any) => ({
              label: item.dictItemName,
              value: item.dictItemValue,
              color: item.color,
              identifier: item.identifier
            }))
            resolve(this.dict[key])
          } catch (error) {}
        })
      }

      // 等待数据加载完成
      const result = await this.loadingPromises[key]
      return result
    }
  }
})

export function useDictStoreHook() {
  return useDictStore(store)
}
