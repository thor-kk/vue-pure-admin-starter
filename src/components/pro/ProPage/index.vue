<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-13 22:56:53
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
import { PureTableBar, ProButton, ProDesc, ProEditForm, ProTable } from '@/components'
import { useSearchHook, useFormHook, useDescHook, useTableHook } from './columns'

defineExpose({
  /** 刷新列表 */
  getList: onSearch
})

const emits = defineEmits<{
  /** 表格行 change 事件 */
  (e: 'row-change', args?: { row?: any }): void
}>()

const props = withDefaults(defineProps<Props>(), {
  tableAdaptive: true,
  tableAlignWhole: 'center',
  tableShowIndex: true,
  tableShowOverflowTooltip: true,
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100],
  searchFormShowNum: 2,
  searchFormCollapseTransition: false,
  rowKey: 'id',
  showPagination: true
})

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}

onMounted(() => onSearch())

const { tableColumns, tableData, tableRef, pagination, total } = useTableHook(props.columns)
const { searchColumns, searchForm } = useSearchHook(props.columns)
const { formColumns, formTitle, formData, formRef, formConfirmApi } = useFormHook({
  columns: props.columns,
  title: props.title
})
const { descColumns, descVisible, descData, descTitle } = useDescHook({ columns: props.columns, title: props.title })

/** 查询 */
async function onSearch() {
  const searchParams = {
    ...searchForm.value,
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

/** 编辑表单点击确认事件 */
async function onEditFormConfirm() {
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
        v-model="searchForm"
        :columns="searchColumns"
        :collapse-transition="props.searchFormCollapseTransition"
        :show-number="props.searchFormShowNum"
        @change="onSearch"
        @search="onSearch"
        @reset="onSearch"
        @collapse="onTableResize"
      />
    </el-card>

    <!-- 表格 -->
    <PureTableBar :columns="tableColumns" :tableRef="tableRef" @refresh="onSearch" @fullscreen="onTableResize">
      <!-- 主要操作 -->
      <template #title>
        <div v-if="props.mainBtn && props.mainBtn.length > 0" class="flex">
          <ProButton
            v-for="item in handleMainBtn"
            :key="item.text"
            @click="() => onBtnClick({ code: item.code, api: item.api, click: item.click })"
          >
            {{ item.text }}
          </ProButton>
        </div>

        <div v-else />
      </template>

      <template v-slot="{ dynamicColumns, size }">
        <ProTable
          :columns="dynamicColumns"
          :data="tableData"
          :size
          :total
          :action="handleTableBtn"
          :row-key="props.rowKey"
          :show-index="props.tableShowIndex"
          :showPagination="props.showPagination"
          @register="({ ref }) => (tableRef = ref)"
          @page-change="onTablePageChange"
          @row-click="({ row, item }) => onBtnClick({ row, code: item.actionCode, ...item })"
        />
      </template>
    </PureTableBar>

    <!-- 编辑弹窗 -->
    <ProEditForm
      ref="formRef"
      v-model="formData"
      :title="formTitle"
      :columns="formColumns"
      :width="props.formWidth"
      :form2Col="props.editForm2Col"
      :form-label-position="props.editFormLabelPosition"
      :form-label-width="props.editFormLabelWidth"
      @confirm="onEditFormConfirm"
    />

    <!-- 详情列表 -->
    <el-dialog v-model="descVisible" shadow="never" :title="descTitle">
      <ProDesc :columns="descColumns" :data="descData" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-descriptions__header) {
  margin-bottom: 0;
}
</style>
