<!--
 * @Author: Yyy
 * @Date: 2024-12-12 09:48:41
 * @LastEditTime: 2024-12-17 11:02:31
 * @Description: 高级描述列表
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-desc' })

import type { Props } from './type'

import { PlusDescriptions } from 'plus-pro-components'
import { useColumnsHook } from './hook'

const props = withDefaults(defineProps<Props>(), {
  column: 2
})

const { columns } = useColumnsHook(props.columns)

console.log(props.data)
</script>

<template>
  <PlusDescriptions :columns :data="props.data" :column="props.column">
    <template
      v-for="item in columns.filter((item) => item.__slot__)"
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
