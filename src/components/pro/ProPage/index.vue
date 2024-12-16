<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-16 13:46:01
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
 ? 编辑表单组件 - PlusProComponents（https://plus-pro-components.com/components/dialog-form.html）
 ? 描述列表组件 - PlusProComponents（https://plus-pro-components.com/components/descriptions.html）
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import type { ActionBtn, Props } from './type'

import { cloneDeep } from 'lodash'
import { PlusSearch } from 'plus-pro-components'
import { ProDesc, ProDialogForm, ProTable } from '@/components'
import { useSearchHook, useFormHook, useDescHook, useTableHook } from './hook'

defineExpose({
  /** 刷新列表 */
  getList: onSearch
})

const emits = defineEmits<{
  /** 表格行 change 事件 */
  (e: 'row-change', args?: { row?: any }): void
}>()

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  showPagination: true,
  tableAdaptive: true,
  tableAlignWhole: 'center',
  tableShowIndex: true,
  tableShowOverflowTooltip: true,
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

/** 查询 */
async function onSearch() {
  const searchParams = {
    ...searchData.value,
    pageSize: pagination.value?.pageSize,
    pageNum: pagination.value?.pageNum
  }

  try {
    const res = await props.api(searchParams)
    total.value = res.total
    tableData.value = res.records || res
  } catch (error) {
    console.log('🚀 ~ onSearch ~ error:', error)
  }
}

/** 表格分页改变事件 */
function onTablePageChange(_pagination: any) {
  pagination.value = _pagination
  onSearch()
}

/** 表格行事件 - change */
async function onTableRowChange(args: { row: any; column: any }) {
  /** 表格状态改变逻辑 */
  if (args.column.property === 'status') {
    const isSuccess = await props.statusChangeApi({ row: args.row })
    if (isSuccess) return onSearch()
  }

  emits('row-change', { row: args.row })
}

/** 表单确认事件 */
async function onFormConfirm() {
  const isSuccess = await formConfirmApi.value(formData.value)
  if (isSuccess) onSearch()
  formRef.value.close()
}

/**
 * ! CRUD 和 按钮点击逻辑
 */

/** 主要按钮 */
const handleMainBtn = computed(() =>
  props.mainBtn.map((item) => {
    if (item.code === 'create') item.text = '新增' + props.title
    return item
  })
)

/** 操作按钮 */
const handleTableBtn = computed(() =>
  props.tableBtn.map((item) => {
    if (item.code === 'update') item.text = '修改'
    if (item.code === 'delete') item.text = '删除'
    return item
  })
)

/** 按钮点击逻辑 */
async function onBtnClick(args: {
  code?: ActionBtn['code']
  api?: ActionBtn['api']
  click?: ActionBtn['click']
  row?: any
  data?: any
}) {
  const { code, api, click, row, data } = args

  /** 新增 */
  if (code === 'create') {
    formRef.value?.open()
    formConfirmApi.value = api
    formTitle.value = '新增' + props.title
    return
  }

  /** 修改 */
  if (code === 'update') {
    formRef.value.open()

    if (data) {
      formData.value = cloneDeep(data(row))
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
</script>

<template>
  <div>
    <!-- 查询表单 -->
    <el-card v-if="searchColumns.length" shadow="never">
      <PlusSearch
        v-model="searchData"
        :columns="searchColumns"
        :collapse-transition="props.searchCollapseTransition"
        :show-number="props.searchShowNum"
        @change="onSearch"
        @search="onSearch"
        @reset="onSearch"
        @collapse="onTableResize"
      />
    </el-card>

    <!-- 表格 -->
    <ProTable
      :row-key="props.rowKey"
      :columns="tableColumns"
      :data="tableData"
      :total
      :action="handleTableBtn"
      :show-index="props.tableShowIndex"
      :showPagination="props.showPagination"
      :main-action="handleMainBtn"
      :table-action="handleTableBtn"
      @page-change="onTablePageChange"
      @row-click="({ row, item }) => onBtnClick({ row, code: item.actionCode, ...item })"
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
