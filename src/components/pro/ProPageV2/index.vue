<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-01 22:48:28
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import { PureTableBar } from '@/components'
import { Props } from './type'
import { ref } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  tableAdaptive: true,
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100]
})

/** 分页 */
const pagination = ref({
  total: 0,
  pageNum: 1,
  pageSize: props.paginationPageSize
})

function onPageSizeChange(val) {
  pagination.value.pageSize = val
  console.log(pagination.value)
}

function onPageCurrentChange(val) {
  pagination.value.pageNum = val
  console.log(pagination.value)
}
</script>

<template>
  <div>
    <!-- 查询条件 -->

    <PureTableBar :columns="props.columns">
      <!-- 主要操作 -->
      <template #title>
        <div />
      </template>

      <template v-slot="{ dynamicColumns, size }">
        <!-- 表格 -->
        <PureTable
          :columns="dynamicColumns"
          :data="props.data"
          :size
          :adaptive="props.tableAdaptive"
          :pagination="{
            total: pagination.total,
            pageSize: pagination.pageSize,
            currentPage: pagination.pageNum,
            pageSizes: props.paginationPageSizes,
            size
          }"
          @page-size-change="onPageSizeChange"
          @page-current-change="onPageCurrentChange"
        />
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss"></style>
