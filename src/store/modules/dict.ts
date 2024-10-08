import { defineStore } from 'pinia'
import { store } from '../utils'

type dictType = {
  dict?: any
}

export const useDictStore = defineStore({
  id: 'store-dict',

  state: (): dictType => ({}),

  actions: {}
})

export function useDictStoreHook() {
  return useDictStore(store)
}
