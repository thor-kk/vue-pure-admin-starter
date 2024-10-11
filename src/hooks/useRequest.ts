/** api 包裹 */

import { onMounted, ref } from 'vue'

export function useRequest(api, { isMounted } = { isMounted: true }) {
  const loading = ref(false)
  const data = ref(null)
  const total = ref(0)
  const error = ref(null)
  const msg = ref('')

  async function onSearch() {
    try {
      loading.value = true

      const res = await api()

      data.value = res.data || res.rows
      total.value = res.total || 0
      msg.value = res.msg || ''
      error.value = res.error || null
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  isMounted && onMounted(() => onSearch())

  const run = () => onSearch()

  return { loading, data, total, msg, error, run }
}
