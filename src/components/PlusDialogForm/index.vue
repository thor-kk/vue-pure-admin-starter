<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-14 15:52:34
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { FieldValues, PlusDialogFormProps, PlusDialogFormInstance } from 'plus-pro-components'

import { ref } from 'vue'
import { cloneDeep, merge } from 'lodash'
import { PlusDialogForm } from 'plus-pro-components'

const emits = defineEmits<{
  (e: 'confirm', data: { data?: any; code: 'add' | 'edit'; runClose?: Function }): void
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
function open(options: { code: 'add' | 'edit'; title?: string; data?: any }) {
  visible.value = true
  title.value = options.title || ''
  code.value = options.code

  if (options.data) form.value = cloneDeep(options.data) || {}
}

/** 关闭弹窗 */
function close() {
  visible.value = false
  form.value = {}
  dialogFormRef.value.formInstance?.resetFields()
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
    @cancel="close"
    @confirm="emits('confirm', { data: form, code, runClose: close })"
  />
</template>

<style scoped lang="scss"></style>
