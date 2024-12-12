<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-12 14:17:10
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
 ? 编辑表单组件 - PlusProComponents（https://plus-pro-components.com/components/dialog-form.html）
 ? 描述列表组件 - PlusProComponents（https://plus-pro-components.com/components/descriptions.html）
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import type { ActionBtn, Props } from './type'
import type { PlusDialogFormInstance } from 'plus-pro-components'

import { cloneDeep } from 'lodash'
import { PlusSearch, PlusDialogForm } from 'plus-pro-components'
import { PureTableBar, ProButton, ProDesc, ProEditForm } from '@/components'
import { handleFormColumns, searchColumnsHook, handleTableColumns, descColumnsHook } from './columns'

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
async function onSearch() {
  const searchParams = {
    ...searchForm.value,
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

/**
 * ! 表格
 */

/** 表格数据 */
const tableData = ref([])
/** 表格列配置 */
const tableColumns = computed(() => handleTableColumns(props.columns, props.tableIndex, props.tableBtn))

/** 表格行事件 - change */
async function onTableRowChange(args: { row: any; column: any }) {
  /** 表格状态改变逻辑 */
  if (args.column.property === 'status') {
    const isSuccess = await props.statusChangeApi({ row: args.row })
    if (isSuccess) return onSearch()
  }

  emits('row-change', { row: args.row })
}

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}

/** 分页配置 */
const pagination = ref({ total: 0, pageNum: 1, pageSize: props.paginationPageSize })

/** 分页事件 - 每页条数变更 */
function onPageSizeChange(val) {
  pagination.value.pageSize = val
  onSearch()
}

/** 分页事件 - 页码变更 */
function onPageCurrentChange(val) {
  pagination.value.pageNum = val
  onSearch()
}

/**
 * ! 查询表单
 */

const { searchForm, searchColumns } = searchColumnsHook(props.columns)

/**
 * ! 编辑弹窗
 */

/** 表单弹窗实例 */
const editFormRef = ref<PlusDialogFormInstance>()
/** 表单弹窗显示 */
const editVisible = ref(false)
/** 表单弹窗标题 */
const editTitle = ref(props.title)
/** 表单数据 */
const editForm = ref({})
/** 表单初始数据 */
const defaultEditForm = ref(handleFormColumns(props.columns).defaultValues)
/** 表单点击确认 Api */
const editConfirmApi = ref()
/** 表单配置 */
const editColumns = computed(() => handleFormColumns(props.columns).formColumns)

/** 打开编辑表单弹窗 */
function openEditForm() {
  editVisible.value = true
  /** 赋予默认值 - PlusDialogForm 组件会有一些问题 */
  editForm.value = cloneDeep(defaultEditForm.value)
}

/** 关闭编辑表单弹窗 */
function closeEditForm() {
  editVisible.value = false
  /** 重置表单校验 */
  editFormRef.value.formInstance?.resetFields()
  /** 重置默认值 - PlusDialogForm 组件会有一些问题 */
  editForm.value = cloneDeep(defaultEditForm.value)
}

/** 编辑表单点击确认事件 */
async function onEditFormConfirm() {
  const isSuccess = await editConfirmApi.value(editForm.value)
  if (isSuccess) onSearch()
  closeEditForm()
}

/**
 * ! 描述列表
 */

/** 描述列表配置 */
const { descColumns, descVisible, descData, descTitle } = descColumnsHook({
  columns: props.columns,
  title: props.title
})

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
    openEditForm()
    editConfirmApi.value = api
    editTitle.value = '新增' + props.title
    return
  }

  /** 修改 */
  if (code === 'update') {
    openEditForm()

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
        <PureTable
          :columns="dynamicColumns"
          :data="tableData"
          :size
          :align-whole="props.tableAlignWhole"
          :show-overflow-tooltip="props.tableShowOverflowTooltip"
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
        >
          <template
            v-for="item in tableColumns.filter((item) => item.slot)"
            :key="item.prop"
            #[item.prop]="{ row, column }"
          >
            <!-- 操作列 -->
            <div v-if="item.prop === 'operation'">
              <el-button
                v-for="item in handleTableBtn"
                :key="item.text"
                type="primary"
                link
                :size
                @click="() => onBtnClick({ row, ...item })"
              >
                {{ item.text }}
              </el-button>
            </div>

            <component
              :is="item.el?.table"
              v-else
              v-model="row[item.prop]"
              class="align-middle"
              v-bind="typeof item.elProps?.table === 'function' ? item.elProps?.table({ row }) : item.elProps?.table"
              :options="item.options"
              @change="() => onTableRowChange({ row, column })"
              @click="() => onBtnClick({ code: item.actionCode, row })"
            >
              {{
                item.dict?.table ? item.options?.find((dict) => dict.value === row[item.prop]).label : row[item.prop]
              }}
            </component>
          </template>
        </PureTable>
      </template>
    </PureTableBar>

    <!-- 编辑弹窗 -->
    <ProEditForm
      v-model="editForm"
      v-model:visible="editVisible"
      :title="editTitle"
      :columns="editColumns"
      :form2Col="props.editForm2Col"
      :form-label-position="props.editFormLabelPosition"
      :form-label-width="props.editFormLabelWidth"
      @confirm="onEditFormConfirm"
      @cancel="closeEditForm"
      @register="(form) => (editFormRef = form)"
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
