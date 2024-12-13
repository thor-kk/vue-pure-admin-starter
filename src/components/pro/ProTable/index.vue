<!--
 * @Author: Yyy
 * @Date: 2024-12-12 15:08:27
 * @LastEditTime: 2024-12-13 10:27:08
 * @Description: 高级表格
-->

<script setup lang="ts">
import type { Props } from './type'

defineOptions({ name: 'components-pro-table' })

const emits = defineEmits<{
  /** 分页数据改变 */
  (e: 'page-change', args: { pageNum: any; pageSize: any }): void
  /** 行点击事件 */
  (e: 'row-click', args: { row: any; item: any }): void
}>()

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  pageSize: 15,
  pageSizes: () => [10, 15, 30, 50, 100],
  alignWhole: 'center',
  showOverflowTooltip: true,
  adaptive: true
})

/** 分页配置 */
const pagination = ref({
  total: props.total,
  pageNum: 1,
  pageSize: props.pageSize
})

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
</script>

<template>
  <PureTable
    :columns="props.columns"
    :data="props.data"
    :size="props.size"
    :align-whole="props.alignWhole"
    :show-overflow-tooltip="props.showOverflowTooltip"
    :adaptive="props.adaptive"
    :pagination="{
      total: pagination.total,
      pageSize: pagination.pageSize,
      currentPage: pagination.pageNum,
      pageSizes: props.pageSizes,
      size
    }"
    @page-size-change="onPageSizeChange"
    @page-current-change="onPageCurrentChange"
  >
    <template v-for="item in props.columns.filter((item) => item.slot)" :key="item.prop" #[item.prop]="{ row }">
      <div v-if="item.prop === 'operation'">
        <el-button
          v-for="item in props.btn"
          :key="item.text"
          type="primary"
          link
          :size
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
        :options="item.options"
        @click="() => emits('row-click', { row, item })"
      >
        {{ row[item.prop] }}
      </component>
    </template>
  </PureTable>
</template>

<style scoped lang="scss"></style>
