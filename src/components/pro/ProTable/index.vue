<!--
 * @Author: Yyy
 * @Date: 2024-12-12 15:08:27
 * @LastEditTime: 2024-12-13 23:06:45
 * @Description: 高级表格
-->

<script setup lang="ts">
import { useColumnsHook } from './hook'
import type { Emits, Props } from './type'

defineOptions({ name: 'components-pro-table' })

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  pageSize: 15,
  pageSizes: () => [10, 15, 30, 50, 100],
  alignWhole: 'center',
  showOverflowTooltip: true,
  adaptive: true,
  showIndex: true,
  showPagination: true
})

onMounted(() => {
  emits('register', { ref: tableRef?.value.getTableRef() })
})

const tableRef = ref()

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

const { columns } = useColumnsHook({ columns: props.columns, showIndex: props.showIndex, action: props.action })
</script>

<template>
  <PureTable
    ref="tableRef"
    :row-key="props.rowKey"
    :columns
    :data="props.data"
    :size="props.size"
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
    <template v-for="item in columns.filter((item) => item.slot)" :key="item.prop" #[item.prop]="{ row }">
      <div v-if="item.prop === '__operation__'">
        <el-button
          v-for="item in props.action"
          :key="item.text"
          type="primary"
          link
          :size
          :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
          @click="() => emits('row-click', { row, item })"
        >
          {{ item.text }}
        </el-button>
      </div>

      <component
        :is="item.el"
        v-else
        v-model="row[item.prop]"
        class="align-middle"
        v-bind="item.elProps"
        :disabled="typeof item.disabled === 'function' ? item.disabled(row) : item.disabled"
        :options="item.options"
        @click="() => emits('row-click', { row, item })"
      >
        {{ row[item.prop] }}
      </component>
    </template>
  </PureTable>
</template>

<style scoped lang="scss">
/** 分页隐藏时取消分割线 */
:deep(.el-table__inner-wrapper::before) {
  height: v-bind('props.showPagination === true ? "1px" : 0 ');
}
</style>
