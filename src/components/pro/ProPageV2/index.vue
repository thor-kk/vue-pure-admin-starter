<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-02 10:32:27
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import type { Props } from './type'

import { PlusSearch } from 'plus-pro-components'
import { PureTableBar } from '@/components'

const props = withDefaults(defineProps<Props>(), {
  tableAdaptive: true,
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100],
  searchFormShowNum: 2
})

/** 查询条件 */
const searchForm = ref()
const searchColumns = computed(() => props.columns.filter((item) => item.showSearch))

/** 表格 */
const tableColumns = computed(() => props.columns.filter((item) => !item.hideTable))

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

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}
</script>

<template>
  <div>
    <!-- 查询条件 -->
    <el-card v-if="searchColumns.length" shadow="never">
      <PlusSearch
        v-model="searchForm"
        :columns="searchColumns"
        :show-number="props.searchFormShowNum"
        @change="onSearch"
        @search="onSearch"
        @reset="onSearch"
        @collapse="onTableResize"
      />
    </el-card>

    <!-- table bar -->
    <PureTableBar :columns="tableColumns" @refresh="onSearch" @fullscreen="onTableResize">
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
