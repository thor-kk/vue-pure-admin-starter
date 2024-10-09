<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-09 16:05:52
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { PlusPageProps } from 'plus-pro-components'
import { ref, watch } from 'vue'
import { merge } from 'lodash'
import { PlusPage } from 'plus-pro-components'

interface Props extends PlusPageProps {}

const props = withDefaults(defineProps<Props>(), {
  isCard: true,
  immediate: true,
  pagination: () => ({}),
  search: () => ({}),
  table: () => ({})
})

const defaultConfig: Partial<Props> = {
  pagination: {
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper'
  },
  table: { border: false, hasIndexColumn: true },
  search: { collapseTransition: false },
  tableCardProps: { shadow: 'never' },
  searchCardProps: { shadow: 'never' }
}

const mergeProps = ref<Props>()

watch(
  () => props,
  (val) => {
    mergeProps.value = merge(defaultConfig, val)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <PlusPage v-bind="mergeProps">
      <template #table-title>
        <slot name="table-action" />
      </template>

      <template v-for="item in props.columns" :key="item.prop" #[`plus-cell-${item.prop}`]="scoped">
        <slot :name="`plus-cell-${[item.prop]}`" v-bind="{ ...scoped }">
          {{ scoped.value }}
        </slot>
      </template>
    </PlusPage>
  </div>
</template>

<style scoped lang="scss"></style>
