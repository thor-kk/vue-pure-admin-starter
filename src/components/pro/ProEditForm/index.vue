<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-12 14:25:56
 * @Description: 高级编辑表单
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-edit-form' })

import { PlusDialogForm } from 'plus-pro-components'
import { useColumnsHook } from './hook'

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
  /** 规则错误提示 */
  hasErrorTip?: boolean
  /** 表单开启两列 */
  form2Col?: boolean
  /** 表单 label 宽度 */
  formLabelWidth?: number
  /** 表单 label 位置 */
  formLabelPosition?: 'left' | 'right' | 'top'
}

const props = withDefaults(defineProps<Props>(), {
  hasErrorTip: false,
  formLabelWidth: 80,
  formLabelPosition: 'right'
})

onMounted(() => {
  emits('register', editFormRef.value)
})

const { rules, columns, defaultValues } = useColumnsHook(props.columns)

const formData = defineModel<any>()
const visible = defineModel<boolean>('visible')
const editFormRef = ref()
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
      labelWidth: props.formLabelWidth,
      labelPosition: props.formLabelPosition
    }"
    :hasErrorTip="props.hasErrorTip"
    @confirm="() => emits('confirm')"
    @cancel="() => emits('cancel')"
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
