<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-16 10:08:52
 * @Description: 高级编辑表单
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-edit-form' })

import type { Emits, Props } from './type'

import { PlusDialogForm } from 'plus-pro-components'
import { useColumnsHook } from './hook'
import { cloneDeep } from 'lodash'

defineExpose({ open, close })

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  width: '800px',
  labelWidth: 80,
  labelPosition: 'right',
  hasErrorTip: false
})

const { columns, rules, defaultValues } = useColumnsHook(props.columns)

const plusDialogFormRef = ref()
const formData = defineModel<any>()
const visible = defineModel<boolean>('visible')

/** 打开编辑表单弹窗 */
function open() {
  visible.value = true
  /** 赋予默认值 - PlusDialogForm 组件会有一些问题 */
  formData.value = cloneDeep(defaultValues.value)
}

/** 关闭编辑表单弹窗 */
function close() {
  visible.value = false
  /** 重置表单校验 */
  plusDialogFormRef.value.formInstance?.resetFields()
  /** 重置默认值 - PlusDialogForm 组件会有一些问题 */
  formData.value = cloneDeep(defaultValues.value)
}
</script>

<template>
  <PlusDialogForm
    ref="plusDialogFormRef"
    v-model="formData"
    v-model:visible="visible"
    :title="props.title"
    :form="{
      columns,
      rules,
      rowProps: { gutter: props.form2Col ? 20 : 0 },
      colProps: { span: props.form2Col ? 12 : 24 },
      labelWidth: props.labelWidth,
      labelPosition: props.labelPosition
    }"
    :dialog="{ width: props.width }"
    :hasErrorTip="props.hasErrorTip"
    @confirm="() => emits('confirm')"
    @cancel="close"
  >
    <template v-for="item in columns.filter((item) => item.__slot__)" :key="item.prop" #[`plus-field-${item.prop}`]>
      <component
        :is="item.valueType"
        v-model="formData[item.prop]"
        class="align-middle"
        v-bind="item.elProps?.form"
        :options="item.options"
      />
    </template>
  </PlusDialogForm>
</template>

<style scoped lang="scss"></style>
