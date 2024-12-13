<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-13 11:05:54
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
import { PureTableBar, ProButton, ProDesc, ProEditForm, ProEditFormInstance, ProTable } from '@/components'
import { searchColumnsHook, handleTableColumns, useFormHook, useDescHook } from './columns'

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
  tableIndex: true,
  tableShowOverflowTooltip: true,
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100],
  searchFormShowNum: 2,
  searchFormCollapseTransition: false
})

onMounted(() => onSearch())

/** 查询 */
const pagination = ref<any>({})
const total = ref()
async function onSearch() {
  const searchParams = {
    ...searchForm.value,
    pageSize: pagination.value?.pageSize,
    pageNum: pagination.value?.pageNum
  }

  try {
    const { total, records } = await props.api(searchParams)
    pagination.value.total = total
    tableData.value = records
  } catch (error) {
    console.log('🚀 ~ onSearch ~ error:', error)
  }
}

/**
 * ! 表格
 */

/** 表格数据 */
const tableData = ref([])
/** 表格列配置 */
const tableColumns = computed(() => handleTableColumns(props.columns))

/** 表格行事件 - change */
async function onTableRowChange(args: { row: any; column: any }) {
  /** 表格状态改变逻辑 */
  if (args.column.property === 'status') {
    const isSuccess = await props.statusChangeApi({ row: args.row })
    if (isSuccess) return onSearch()
  }

  emits('row-change', { row: args.row })
}

/**
 * ! 查询表单
 */

const { searchForm, searchColumns } = searchColumnsHook(props.columns)

/**
 * ! 编辑表单
 */

/** 编辑表单实例 */
const editFormRef = ref<ProEditFormInstance>()
/** 编辑表单标题 */
const editTitle = ref(props.title)
/** 编辑表单数据 */
const editForm = ref({})
/** 编辑表单点击确认 Api */
const editConfirmApi = ref()
/** 编辑表单列配置 */
const { formColumns } = useFormHook(props.columns)

/** 编辑表单点击确认事件 */
async function onEditFormConfirm() {
  const isSuccess = await editConfirmApi.value(editForm.value)
  if (isSuccess) onSearch()
  editFormRef.value.close()
}

/**
 * ! 描述列表
 */

/** 描述列表配置 */
const { descColumns, descVisible, descData, descTitle } = useDescHook({
  columns: props.columns,
  title: props.title
})

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
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
    editFormRef.value?.open()
    editConfirmApi.value = api
    editTitle.value = '新增' + props.title
    return
  }

  /** 修改 */
  if (code === 'update') {
    editFormRef.value.open()

    if (data) {
      editForm.value = cloneDeep(data(row))
    } else {
      editForm.value = cloneDeep(row)
    }

    editConfirmApi.value = api
    editTitle.value = '修改' + props.title
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
    <PureTableBar :columns="tableColumns" @refresh="onSearch" @fullscreen="onTableResize">
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
          :total="total"
          :btn="handleTableBtn"
          @page-change="(pageParams) => (pagination = pageParams)"
          @row-click="({ row, item }) => onBtnClick({ row, code: item.actionCode, ...item })"
        />
      </template>
    </PureTableBar>

    <!-- 编辑弹窗 -->
    <ProEditForm
      ref="editFormRef"
      v-model="editForm"
      :title="editTitle"
      :columns="formColumns"
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
