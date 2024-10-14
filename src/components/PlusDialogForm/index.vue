<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-14 20:05:18
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { FieldValues, PlusDialogFormProps, PlusDialogFormInstance } from 'plus-pro-components'

import { ref } from 'vue'
import { cloneDeep, merge } from 'lodash'
import { PlusDialogForm } from 'plus-pro-components'

const emits = defineEmits<{
  (e: 'confirm', data: { data?: any; code?: string; runClose?: Function }): void
}>()

interface Props extends PlusDialogFormProps {}

const props = withDefaults(defineProps<Props>(), {
  hasErrorTip: false,
  dialog: () => ({}),
  form: () => ({})
})

const defaultConfig: Partial<Props> = {
  dialog: { width: '50%' },
  form: { labelPosition: 'right', labelSuffix: '' }
}

/** !!! 合并会丢失所有响应式 */
const mergeProps = merge(defaultConfig, props)

const visible = defineModel<boolean>('visible')
const form = defineModel<FieldValues>()

/**
 * ! 逻辑
 */

const dialogFormRef = ref<PlusDialogFormInstance>()
const title = ref('')
const code = ref()

/** 打开弹窗 */
function open(options: { code?: string; title?: string; data?: any; confirmFn?: ({ data }) => Promise<boolean> }) {
  visible.value = true
  title.value = options.title || ''
  code.value = options.code
  confirmFn.value = options.confirmFn || undefined

  if (options.data) form.value = cloneDeep(options.data) || {}
}

/** 关闭弹窗 */
function close() {
  visible.value = false
  form.value = {}
  confirmFn.value = undefined
  dialogFormRef.value.formInstance?.resetFields()
}

/** 弹窗事件 - 确认 */
const loading = ref(false)
const confirmFn = ref<({ data }) => Promise<boolean> | undefined>()

async function onConfirm() {
  if (!confirmFn.value) return emits('confirm', { data: form.value, code: code.value })

  try {
    loading.value = true
    const success = await confirmFn.value({ data: form.value })
    if (success) close()
  } catch (error) {
  } finally {
    loading.value = false
  }
}

defineExpose({
  /** 打开弹窗 */
  open,
  /** 关闭弹窗 */
  close
})
</script>

<template>
  <PlusDialogForm
    ref="dialogFormRef"
    v-bind="mergeProps"
    v-model:visible="visible"
    v-model="form"
    :title="title"
    :dialog="{ ...mergeProps.dialog, confirmLoading: loading }"
    @cancel="close"
    @confirm="onConfirm"
  />
</template>

<style scoped lang="scss"></style>
