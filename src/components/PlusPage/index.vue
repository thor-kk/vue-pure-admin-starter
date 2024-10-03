<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-03 23:24:35
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { PlusPageProps } from 'plus-pro-components'
import { PlusPage } from 'plus-pro-components'

interface Props extends PlusPageProps {}

const props = withDefaults(defineProps<Props>(), {
  isCard: true,
  immediate: true,
  pagination: () => ({
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper'
  }),
  search: () => ({ collapseTransition: false }),
  searchCardProps: () => ({ shadow: 'never' }),
  tableCardProps: () => ({ shadow: 'never' })
})
</script>

<template>
  <div>
    <PlusPage v-bind="props">
      <template #table-title>
        <slot name="table-title" />
      </template>
    </PlusPage>
  </div>
</template>

<style scoped lang="scss"></style>
