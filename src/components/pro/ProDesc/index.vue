<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-13 10:10:00
 * @Description: 高级描述列表
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-desc' })

import { PlusDescriptions } from 'plus-pro-components'
import { useColumnsHook } from './hook'

interface Props {
  /** 列配置 */
  columns: any
  /** 数据 */
  data: any
  /** 显示几列 */
  column?: number
}

const props = withDefaults(defineProps<Props>(), {
  column: 2
})

const { columns } = useColumnsHook(props.columns)
</script>

<template>
  <PlusDescriptions :columns="columns" :column="props.column" :data="props.data">
    <template
      v-for="item in columns.filter((item) => item.slot)"
      :key="item.prop"
      #[`plus-desc-${item.prop}`]="{ row }"
    >
      <component
        :is="item.valueType"
        v-model="row[item.prop]"
        class="align-middle"
        v-bind="item.fieldProps"
        :options="item.options"
      />
    </template>
  </PlusDescriptions>
</template>

<style scoped lang="scss"></style>
