<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-13 17:17:27
 * @Description: 高级编辑表单
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-edit-form' })

import { PlusDialogForm } from 'plus-pro-components'
import { useColumnsHook } from './hook'
import { cloneDeep } from 'lodash'

defineExpose({ open, close })

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'register', ref: any): void
}>()

interface Props {
  /** 列配置 */
  columns: any
  /** 标题 */
  title?: string
  /** 表单宽度 */
  width?: number
  /** 表单 label 宽度 */
  labelWidth?: number
  /** 表单 label 位置 */
  labelPosition?: 'left' | 'right' | 'top'
  /** 表单开启两列 */
  form2Col?: boolean
  /** 规则错误提示 */
  hasErrorTip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasErrorTip: false,
  formLabelWidth: 80,
  formLabelPosition: 'right'
})

onMounted(() => {
  emits('register', editFormRef.value)
})

const { columns, rules, defaultValues } = useColumnsHook(props.columns)

const formData = defineModel<any>()
const visible = defineModel<boolean>('visible')
const editFormRef = ref()

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
  editFormRef.value.formInstance?.resetFields()
  /** 重置默认值 - PlusDialogForm 组件会有一些问题 */
  formData.value = cloneDeep(defaultValues.value)
}
</script>

<template>
  <PlusDialogForm
    ref="editFormRef"
    v-model="formData"
    v-model:visible="visible"
    :title="props.title"
    :form="{
      columns,
      rules,
      rowProps: { gutter: props.form2Col ? 20 : 0 },
      colProps: { span: props.form2Col ? 12 : 24 },
      labelWidth: props.labelWidth,
      labelPosition: props.formLabelPosition
    }"
    :dialog="{
      width: props.width ? props.width + 'px' : '800px'
    }"
    :hasErrorTip="props.hasErrorTip"
    @confirm="() => emits('confirm')"
    @cancel="close"
  >
    <template v-for="item in columns.filter((item) => item.slot)" :key="item.prop" #[`plus-field-${item.prop}`]>
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
