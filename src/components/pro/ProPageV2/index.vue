<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-02 09:46:06
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import { PureTableBar } from '@/components'
import { Props } from './type'

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
  onSearch()
}

function onPageCurrentChange(val) {
  pagination.value.pageNum = val
  onSearch()
}

/** 查询 */
const tableData = ref([])

async function onSearch() {
  /** 查询参数 */
  const searchParams = {
    pageSize: pagination.value.pageSize,
    pageNum: pagination.value.pageNum
  }

  try {
    const { total, records } = await props.api(searchParams)
    pagination.value.total = total
    tableData.value = records
  } catch (error) {
    console.log('🚀 ~ onSearch ~ error:', error)
  }
}

onMounted(() => {
  onSearch()
})
</script>

<template>
  <div>
    <!-- 查询条件 -->

    <PureTableBar :columns="props.columns" @refresh="onSearch">
      <!-- 主要操作 -->
      <template #title>
        <div />
      </template>

      <template v-slot="{ dynamicColumns, size }">
        <!-- 表格 -->
        <PureTable
          :columns="dynamicColumns"
          :data="tableData"
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
