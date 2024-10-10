import type { App } from 'vue'
import { createPinia } from 'pinia'
const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }

/** 统一导出 */
export * from './modules/dict'
