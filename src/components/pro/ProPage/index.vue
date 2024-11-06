<!--
 * @Author: Yyy
 * @Date: 2024-11-05 15:27:46
 * @LastEditTime: 2024-11-05 16:01:52
 * @Description: pro - 高级页面
-->

<script setup lang="ts">
import { ref } from 'vue'
import { PureTableBar } from '@/components'

interface Props {
  /** 列配置 */
  columns: any[]
  /** 表格头样式 */
  headerCellStyle: any
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  headerCellStyle: { background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }
})

/**
 * ! 业务逻辑
 */

const tableRef = ref()

function onSearch() {}

/**
 * ! 批量逻辑
 */
const selectedNum = ref(0)
function onSelectionCancel() {
  selectedNum.value = 0
  tableRef.value.getTableRef().clearSelection()
}
</script>

<template>
  <div>
    <PureTableBar :columns="columns" @refresh="onSearch">
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

          <el-popconfirm title="是否确认删除?">
            <template #reference>
              <el-button type="danger" text class="mr-1"> 批量删除 </el-button>
            </template>
          </el-popconfirm>
        </div>

        <!-- pure 表格 -->
        <pure-table
          ref="tableRef"
          :columns="dynamicColumns"
          :size="size"
          :header-cell-style="props.headerCellStyle"
          :pagination="{ total: 0, pageSize: 10, currentPage: 1, background: true }"
        ></pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss"></style>
