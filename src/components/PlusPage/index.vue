<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-11 13:52:30
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { PlusPageInstance, PlusPageProps } from 'plus-pro-components'

import { merge } from 'lodash'
import { PlusPage } from 'plus-pro-components'
import { ref, defineExpose } from 'vue'

interface Props extends PlusPageProps {}

const props = withDefaults(defineProps<Props>(), {
  isCard: true,
  immediate: true,
  pagination: () => ({}),
  search: () => ({}),
  table: () => ({})
})

const defaultConfig: Partial<Props> = {
  defaultPageInfo: { page: 1, pageSize: 15 },
  pagination: {
    pageSizes: [15, 20, 30, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper'
  },
  table: { border: false, hasIndexColumn: true },
  search: { collapseTransition: false },
  tableCardProps: { shadow: 'never' },
  searchCardProps: { shadow: 'never' }
}

const mergeProps = merge(defaultConfig, props)

const plusPageRef = ref<PlusPageInstance>()

defineExpose({
  getList: () => plusPageRef.value?.getList()
})
</script>

<template>
  <PlusPage ref="plusPageRef" v-bind="mergeProps">
    <template #table-title>
      <slot name="table-action" />
    </template>

    <template
      v-for="item in props.columns.filter((item) => item.slot)"
      :key="item.prop"
      #[`plus-cell-${item.prop}`]="scoped"
    >
      <slot :name="`plus-cell-${[item.prop]}`" v-bind="{ ...scoped }" />
    </template>
  </PlusPage>
</template>

<style scoped lang="scss"></style>
