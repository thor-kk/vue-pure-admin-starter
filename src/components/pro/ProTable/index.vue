<!--
 * @Author: Yyy
 * @Date: 2024-12-12 15:08:27
 * @LastEditTime: 2024-12-16 17:30:11
 * @Description: 高级表格
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-table' })

import type { Emits, Props } from './type'

import { PureTableBar, ProButton } from '@/components'
import { useColumnsHook } from './hook'

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  alignWhole: 'center',
  adaptive: true,
  showIndex: true,
  showOverflowTooltip: true,
  /** 分页 */
  total: 0,
  pageSize: 15,
  pageSizes: () => [10, 15, 30, 50, 100],
  showPagination: true,
  expandAll: undefined
})

/** 分页配置 */
const pagination = ref({ pageNum: 1, pageSize: props.pageSize })

/** 分页事件 - 每页条数变更 */
function onPageSizeChange(val) {
  pagination.value.pageSize = val
  emits('page-change', { pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize })
}

/** 分页事件 - 页码变更 */
function onPageCurrentChange(val) {
  pagination.value.pageNum = val
  emits('page-change', { pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize })
}

const { columns } = useColumnsHook({ columns: props.columns, showIndex: props.showIndex, action: props.tableAction })

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}

const tableRef = ref()
</script>

<template>
  <PureTableBar
    :columns
    :tableRef="props.expandAll === undefined ? {} : tableRef?.getTableRef()"
    :is-expand-all="props.expandAll"
    @fullscreen="onTableResize"
  >
    <template #title>
      <div v-if="props.mainAction && props.mainAction.length > 0" class="flex">
        <ProButton v-for="item in mainAction" :key="item.text" @click="() => emits('action-click', { item })">
          {{ item.text }}
        </ProButton>
      </div>

      <div v-else />
    </template>

    <template v-slot="{ dynamicColumns, size }">
      <PureTable
        ref="tableRef"
        :default-expand-all="props.expandAll"
        :loading="props.loading"
        :row-key="props.rowKey"
        :columns="dynamicColumns"
        :data="props.data"
        :size
        :align-whole="props.alignWhole"
        :show-overflow-tooltip="props.showOverflowTooltip"
        :adaptive="props.adaptive"
        :adaptiveConfig="{ offsetBottom: props.showPagination ? 98 : 34 }"
        :pagination="
          props.showPagination
            ? {
                total: props.total,
                pageSize: pagination.pageSize,
                currentPage: pagination.pageNum,
                pageSizes: props.pageSizes,
                size
              }
            : undefined
        "
        @page-size-change="onPageSizeChange"
        @page-current-change="onPageCurrentChange"
      >
        <template v-for="item in columns.filter((item) => item.__slot__)" :key="item.prop" #[item.prop]="{ row }">
          <div v-if="item.prop === '__operation__'">
            <el-button
              v-for="btn in props.tableAction"
              :key="btn.text"
              type="primary"
              link
              :size
              :disabled="typeof btn.disabled === 'function' ? btn.disabled({ row }) : btn.disabled"
              @click="() => emits('action-click', { row, item: btn })"
            >
              {{ btn.text }}
            </el-button>
          </div>

          <component
            :is="item.el"
            v-else
            v-model="row[item.prop]"
            class="align-middle"
            v-bind="item.elProps"
            :disabled="typeof item.disabled === 'function' ? item.disabled({ row }) : item.disabled"
            :options="item.options"
            @change="() => emits('row-change', { row, item })"
            @click="() => emits('row-click', { row, item })"
          >
            {{ row[item.prop] }}
          </component>
        </template>
      </PureTable>
    </template>
  </PureTableBar>
</template>

<style scoped lang="scss">
/** 分页隐藏时取消分割线 */
:deep(.el-table__inner-wrapper::before) {
  height: v-bind('props.showPagination === true ? "1px" : 0 ');
}
</style>
