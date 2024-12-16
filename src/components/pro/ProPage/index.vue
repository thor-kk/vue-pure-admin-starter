<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-16 17:29:47
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
 ? 编辑表单组件 - PlusProComponents（https://plus-pro-components.com/components/dialog-form.html）
 ? 描述列表组件 - PlusProComponents（https://plus-pro-components.com/components/descriptions.html）
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import type { Action, Emits, Expose, Props } from './type'

import { cloneDeep } from 'lodash'
import { PlusSearch } from 'plus-pro-components'
import { ProDesc, ProDialogForm, ProTable } from '@/components'
import { useSearchHook, useFormHook, useDescHook, useTableHook, useActionHook } from './hook'

defineExpose<Expose>({ getList: onSearch })

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  showPagination: true,
  tableAdaptive: true,
  tableAlignWhole: 'center',
  tableShowIndex: true,
  tableShowOverflowTooltip: true,
  tableExpandAll: undefined,
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100],
  searchShowNum: 2,
  searchCollapseTransition: false
})

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}

onMounted(() => onSearch())

const { tableColumns, tableData, pagination, total } = useTableHook(props.columns)
const { searchColumns, searchData } = useSearchHook(props.columns)
const { formColumns, formTitle, formData, formRef, formConfirmApi } = useFormHook({
  columns: props.columns,
  title: props.title
})
const { descColumns, descVisible, descData, descTitle } = useDescHook({ columns: props.columns, title: props.title })
const { mainAction, tableAction } = useActionHook({
  mainAction: props.mainAction,
  tableAction: props.tableAction,
  title: props.title
})

/** 查询 */
const loading = ref(false)
async function onSearch() {
  const searchParams = {
    ...searchData.value,
    pageSize: pagination.value?.pageSize,
    pageNum: pagination.value?.pageNum
  }

  try {
    loading.value = true
    const res = await props.api(searchParams)
    total.value = res.total
    tableData.value = res.records || res
  } catch (error) {
    console.log('🚀 ~ onSearch ~ error:', error)
  } finally {
    loading.value = false
  }
}

/** 表格分页改变事件 */
function onTablePageChange(_pagination: any) {
  pagination.value = _pagination
  onSearch()
}

/** 表单确认事件 */
async function onFormConfirm() {
  const isSuccess = await formConfirmApi.value(formData.value)
  if (isSuccess) onSearch()
  formRef.value.close()
}

/** 表格按钮事件 - click */
async function onTableActionClick({ code, api, click, row, data }: Action) {
  /** 新增 */
  if (code === 'create') {
    formRef.value?.open()
    if (data) formData.value = cloneDeep(data({ row }))
    formConfirmApi.value = api
    formTitle.value = '新增' + props.title
    return
  }

  /** 修改 */
  if (code === 'update') {
    formRef.value.open()

    if (data) {
      formData.value = cloneDeep(data({ row }))
    } else {
      formData.value = cloneDeep(row)
    }

    formConfirmApi.value = api
    formTitle.value = '修改' + props.title
    return
  }

  /** 详情 */
  if (code === 'detail') {
    descVisible.value = true
    descData.value = row
    return
  }

  /** 删除 */
  if (code === 'delete') {
    const isSuccess = await api({ row })
    if (isSuccess) onSearch()
    return
  }

  click && click({ row })
}
/** 表格行事件 - change */
async function onTableRowChange({ row, column }: { row: any; column: any }) {
  if (column.prop === 'status' && props.tableStatusChangeApi) {
    const isSuccess = await props.tableStatusChangeApi({ row })
    if (isSuccess) return onSearch()
  }

  emits('table-row-change', { row })
}

/** 表格行事件 - click */
function onTableRowClick({ row, column }: { row: any; column: any }) {
  if (column.actionCode === 'detail') {
    return onTableActionClick({ row, code: column.actionCode })
  }

  emits('table-row-click', { row })
}
</script>

<template>
  <div>
    <!-- 查询表单 -->
    <el-card v-if="searchColumns.length" shadow="never" :class="{ 'mb-2': searchColumns.length > 0 }">
      <PlusSearch
        v-model="searchData"
        :columns="searchColumns"
        :collapse-transition="props.searchCollapseTransition"
        :show-number="props.searchShowNum"
        :search-loading="loading"
        @change="onSearch"
        @search="onSearch"
        @reset="onSearch"
        @collapse="onTableResize"
      />
    </el-card>

    <!-- 表格 -->
    <ProTable
      :loading
      :row-key="props.rowKey"
      :columns="tableColumns"
      :data="tableData"
      :total
      :show-index="props.tableShowIndex"
      :expand-all="props.tableExpandAll"
      :showPagination="props.showPagination"
      :main-action="mainAction"
      :table-action="tableAction"
      @page-change="onTablePageChange"
      @row-change="({ row, item }) => onTableRowChange({ row, column: item })"
      @row-click="({ row, item }) => onTableRowClick({ row, column: item })"
      @action-click="({ row, item }) => onTableActionClick({ row, ...item })"
    />

    <!-- 编辑弹窗 -->
    <ProDialogForm
      ref="formRef"
      v-model="formData"
      :title="formTitle"
      :columns="formColumns"
      :width="props.formWidth"
      :form2Col="props.form2Col"
      :label-width="props.formLabelWidth"
      @confirm="onFormConfirm"
    />

    <!-- 描述列表 -->
    <el-dialog v-model="descVisible" :title="descTitle" shadow="never" :width="props.descWidth">
      <ProDesc :columns="descColumns" :data="descData" :column="props.descColumn" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-descriptions__header) {
  margin-bottom: 0;
}
</style>
