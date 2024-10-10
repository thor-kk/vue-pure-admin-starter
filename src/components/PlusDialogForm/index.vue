<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-10 11:09:33
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { FieldValues, PlusDialogFormProps, PlusDialogFormInstance } from 'plus-pro-components'

import { ref } from 'vue'
import { merge } from 'lodash'
import { PlusDialogForm } from 'plus-pro-components'

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

/** 弹窗事件 - 取消 */
function onCancel() {
  form.value = {}
  dialogFormRef.value.formInstance?.resetFields()
}
</script>

<template>
  <PlusDialogForm ref="dialogFormRef" v-bind="mergeProps" v-model:visible="visible" v-model="form" @cancel="onCancel" />
</template>

<style scoped lang="scss"></style>
