<!--
 * @Author: Yyy
 * @Date: 2024-11-05 15:27:46
 * @LastEditTime: 2024-11-07 10:48:41
 * @Description: pro - 高级页面
-->

<script setup lang="ts">
import type { PaginationProps } from '@pureadmin/table'

import { ref, reactive, onMounted } from 'vue'
import { PureTableBar } from '@/components'

interface Props {
  /** 唯一标识 */
  rowKey: string
  /** 列配置 */
  columns: any[]
  /** api 接口 */
  api: any
  /** 表格头样式 */
  headerCellStyle: any
  /** 分页配置 */
  pagination: PaginationProps
  /** 高度自适应 */
  adaptive: boolean
  /** 高度自适应配置 */
  adaptiveConfig: any
  /** 统一对齐 */
  alignWhole: string
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  headerCellStyle: () => ({ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }),
  pagination: () => ({ total: 0, pageSize: 10, currentPage: 1, background: true }),
  adaptive: true,
  adaptiveConfig: () => ({ offsetBottom: 96 }),
  alignWhole: 'center',
  rowKey: 'id'
})

onMounted(() => {
  onSearch()
})

/**
 * ! 分页逻辑
 */
const pagination = reactive<PaginationProps>(props.pagination)

function handleSizeChange(val: number) {
  pagination.pageSize = val
  onSearch()
}

function handleCurrentChange(val: number) {
  pagination.currentPage = val
  onSearch()
}

/**
 * ! 业务逻辑
 */

const tableRef = ref(null)
const tableData = ref([])

async function onSearch() {
  const { pageSize, currentPage } = pagination
  const searchParams = { pageSize, currentPage }

  const { data, total } = await props.api(searchParams)
  pagination.total = total
  tableData.value = data
}

/**
 * ! 批量逻辑
 */
const selectedNum = ref(0)

function handleSelectionChange(val) {
  selectedNum.value = val.length
  tableRef.value.setAdaptive()
}
function onSelectionCancel() {
  selectedNum.value = 0
  tableRef.value.getTableRef().clearSelection()
}
</script>

<template>
  <div>
    <PureTableBar :columns="columns" @refresh="onSearch">
      <template #title>
        <slot name="action"><div /></slot>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <!-- 批量操作 -->
        <div
          v-if="selectedNum > 0"
          v-motion-fade
          class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
        >
          <div class="flex-auto">
            <span
              style="font-size: var(--el-font-size-base)"
              class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
            >
              已选 {{ selectedNum }} 项
            </span>

            <el-button type="primary" text @click="onSelectionCancel"> 取消选择 </el-button>
          </div>

          <slot name="subAction"></slot>
        </div>

        <!-- pure 表格 -->
        <pure-table
          ref="tableRef"
          :row-key="props.rowKey"
          :columns="dynamicColumns"
          :data="tableData"
          :size="size"
          :alignWhole="props.alignWhole"
          :header-cell-style="props.headerCellStyle"
          :adaptive="props.adaptive"
          :adaptiveConfig="props.adaptiveConfig"
          :pagination="{ ...pagination, size }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
        >
          <template v-for="item in props.columns.filter((item) => item.slot)" :key="item.slot" #[item.slot]="scope">
            <slot :name="item.slot" v-bind="scope" />
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss"></style>
