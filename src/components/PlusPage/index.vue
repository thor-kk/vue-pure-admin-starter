<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-12 11:07:04
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
  table: { adaptive: { offsetBottom: 25 }, border: false, hasIndexColumn: true },
  search: { collapseTransition: false, onCollapse: handleCollapse },
  tableCardProps: { shadow: 'never', bodyStyle: { paddingBottom: 0 } },
  searchCardProps: { shadow: 'never' }
}

const mergeProps = merge(defaultConfig, props)

const plusPageRef = ref<PlusPageInstance>()

defineExpose({
  getList: () => plusPageRef.value?.getList()
})

/** 查询卡片事件 - 展开/收起 */
function handleCollapse() {
  // 延时是为了拿到最新的位置
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  }, 160)
}
</script>

<template>
  <PlusPage ref="plusPageRef" v-bind="mergeProps">
    <!-- 主操作按钮 -->
    <template #table-title>
      <!-- <slot name="table-action" /> -->
      <slot />
    </template>

    <!-- 副操作按钮 -->
    <template #table-toolbar>
      <slot name="table-sub-action" />
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

<style scoped lang="scss">
:deep(.plus-page__table_wrapper) {
  margin-top: 8px;
}
</style>
