<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:30:07
 * @LastEditTime: 2024-12-03 14:36:06
 * @Description: 高级页面
 ? 表格组件 - pure-admin-table (https://pure-admin.cn/pages/components/#pure-admin-table)
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-page' })

import type { Props } from './type'
import type { PlusColumn } from 'plus-pro-components'

import { PlusSearch, PlusDialogForm, PlusDescriptions } from 'plus-pro-components'
import { ProSwitch, PureTableBar, ProButton } from '@/components'

const props = withDefaults(defineProps<Props>(), {
  tableAdaptive: true,
  tableAlignWhole: 'center',
  paginationPageSize: 15,
  paginationPageSizes: () => [10, 15, 30, 50, 100],
  searchFormShowNum: 2,
  searchFormCollapseTransition: false
})

const emits = defineEmits<{
  (e: 'table-row-change', data?: { row: any }): void
}>()

/** 查询条件 */
const searchForm = ref()
const searchColumns = computed(() =>
  props.columns
    .filter((item) => item.showSearch)
    .map((item) => {
      return {
        ...item,
        valueType: item.el?.search ?? '',
        fieldProps: item.elProps
      } as PlusColumn
    })
)

/** 表格 */
const tableColumns = computed(() => {
  {
    /** 过滤 */
    const columns = props.columns.filter((item) => !item.hideTable)

    /** 操作列 */
    if (props.tableBtn && props.tableBtn.length > 0) {
      columns.push({ label: '操作', prop: 'operation', slot: { table: true } })
    }

    /** 字段映射 */
    return columns.map((item) => {
      if (item.el?.table === 'switch') item.el.table = ProSwitch

      return {
        ...item,
        formatter: item.formatter ? (row) => item.formatter({ row }) : undefined,
        slot: item.slot?.table && item.prop
      }
    })
  }
})

/** 分页 */
const pagination = ref({
  total: 0,
  pageNum: 1,
  pageSize: props.paginationPageSize
})

function onPageSizeChange(val) {
  pagination.value.pageSize = val
  onSearch()
}

function onPageCurrentChange(val) {
  pagination.value.pageNum = val
  onSearch()
}

/** 查询 */
const tableData = ref([])

async function onSearch() {
  /** 查询参数 */
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

onMounted(() => {
  onSearch()
})

/** 重新计算表格高度 */
function onTableResize() {
  setTimeout(() => window.dispatchEvent(new Event('resize')), 160)
}

/** 编辑弹窗 */
const editForm = ref()
const editVisible = ref(false)
const editColumns = computed(() =>
  props.columns
    .filter((item) => !item.hideForm)
    .map((item) => {
      return {
        ...item,
        valueType: item.el?.form ?? '',
        fieldProps: item.elProps
      } as PlusColumn
    })
)

/** 描述列表 */
const descData = ref()
const detailVisible = ref(false)
const descColumns = computed(() =>
  props.columns
    .filter((item) => !item.hideForm)
    .map((item) => {
      return {
        ...item,
        formatter: item.formatter ? (_, col) => item.formatter({ row: col.row }) : undefined,
        valueType: item.el?.form ?? '',
        fieldProps: item.elProps
      } as PlusColumn
    })
)

/** 按钮点击事件 */
const editConfirm = ref()
function onBtnClick(data: any) {
  const { code, confirm, click, row } = data
  if (code === 'add') {
    editVisible.value = true
    editConfirm.value = confirm
  }
  if (code === 'detail') {
    detailVisible.value = true
    descData.value = row
  }
  click && click()
}
</script>

<template>
  <div>
    <!-- 查询条件 -->
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

    <!-- table bar -->
    <PureTableBar :columns="tableColumns" @refresh="onSearch" @fullscreen="onTableResize">
      <!-- 主要操作 -->
      <template #title>
        <div v-if="props.mainBtn && props.mainBtn.length > 0" class="flex">
          <ProButton
            v-for="item in props.mainBtn"
            :key="item.text"
            @click="() => onBtnClick({ code: item.code, confirm: item.confirm, click: item.click })"
          >
            {{ item.text }}
          </ProButton>
        </div>
        <div v-else />
      </template>

      <template v-slot="{ dynamicColumns, size }">
        <!-- 表格 -->
        <PureTable
          :columns="dynamicColumns"
          :data="tableData"
          :size
          :align-whole="props.tableAlignWhole"
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
          <template v-for="item in tableColumns.filter((item) => item.slot)" :key="item.prop" #[item.prop]="{ row }">
            <!-- 操作列 -->
            <div v-if="item.prop === 'operation'">
              <el-button
                v-for="item in props.tableBtn"
                :key="item.text"
                type="primary"
                link
                :size
                @click="() => onBtnClick({ code: item.code, confirm: item.confirm, click: item.click, row })"
              >
                {{ item.text }}
              </el-button>
            </div>

            <component
              :is="item.el?.table"
              v-else
              v-model="row[item.prop]"
              v-bind="item.elProps"
              @change="() => emits('table-row-change', { row })"
            />
          </template>
        </PureTable>
      </template>
    </PureTableBar>

    <!-- 编辑弹窗 -->
    <PlusDialogForm
      v-model:visible="editVisible"
      v-model="editForm"
      :form="{ columns: editColumns }"
      @confirm="() => editConfirm({ data: editForm })"
    />

    <!-- 详情列表 -->
    <el-dialog v-model="detailVisible" shadow="never" title="详情">
      <PlusDescriptions :column="3" :columns="descColumns" :data="descData" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-descriptions__header) {
  margin-bottom: 0;
}
</style>
