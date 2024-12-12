<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-12 10:44:01
 * @Description: 高级编辑表单
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-edit-form' })

import { PlusDialogForm } from 'plus-pro-components'

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

interface Props {
  /** 列配置 */
  columns: any
  /** 标题 */
  title?: string
  /** 规则 */
  rules?: any
  form2Col?: boolean
  formLabelWidth?: any
  formLabelPosition?: any
  formHasErrorTip?: any
  register?: any
}

const props = withDefaults(defineProps<Props>(), {})

const formData = defineModel<any>()
const visible = defineModel<boolean>('visible')
const editFormRef = ref()

onMounted(() => {
  props.register(editFormRef.value)
})
</script>

<template>
  <PlusDialogForm
    ref="editFormRef"
    v-model="formData"
    v-model:visible="visible"
    :title="props.title"
    :form="{
      columns: props.columns,
      rules: props.rules,
      rowProps: { gutter: props.form2Col ? 20 : 0 },
      colProps: { span: props.form2Col ? 12 : 24 },
      labelWidth: props.formLabelWidth,
      labelPosition: props.formLabelPosition
    }"
    :hasErrorTip="props.formHasErrorTip"
    @confirm="() => emits('confirm')"
    @cancel="() => emits('cancel')"
  >
    <template
      v-for="item in props.columns.filter((item) => item.slot)"
      :key="item.prop"
      #[`plus-field-${item.prop}`]="{}"
    >
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
