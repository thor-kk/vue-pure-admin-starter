<!--
 * @Author: Yyy
 * @Date: 2024-10-16 14:10:56
 * @LastEditTime: 2024-10-16 15:46:22
 * @Description: 系统管理 - 菜单管理
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-menu' })

import { ref } from 'vue'
import { useMenu } from './utils/hook'
import { PureTableBar } from '@/components/pure/RePureTableBar'
import { useRenderIcon } from '@/components/pure/ReIcon/src/hooks'

import Delete from '@iconify-icons/ep/delete'
import EditPen from '@iconify-icons/ep/edit-pen'
import Refresh from '@iconify-icons/ep/refresh'
import AddFill from '@iconify-icons/ri/add-circle-line'

const formRef = ref()
const tableRef = ref()
const { form, loading, columns, dataList, onSearch, resetForm, openDialog, handleDelete, handleSelectionChange } =
  useMenu()
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
    >
      <el-form-item label="菜单名称：" prop="title">
        <el-input v-model="form.title" placeholder="请输入菜单名称" clearable class="!w-[180px]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="useRenderIcon('ri:search-line')" :loading="loading" @click="onSearch">
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置 </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      title="菜单管理（仅演示，操作后不生效）"
      :columns="columns"
      :isExpandAll="false"
      :tableRef="tableRef?.getTableRef()"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button type="primary" :icon="useRenderIcon(AddFill)" @click="openDialog()"> 新增菜单 </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 32 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('修改', row)"
            >
              修改
            </el-button>

            <el-button
              v-show="row.menuType !== 3"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(AddFill)"
              @click="openDialog('新增', { parentId: row.id } as any)"
            >
              新增
            </el-button>

            <el-popconfirm title="是否确认删除这条数据" @confirm="handleDelete(row)">
              <template #reference>
                <el-button class="reset-margin" link type="primary" :size="size" :icon="useRenderIcon(Delete)">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
