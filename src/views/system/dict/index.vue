<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-10 16:48:33
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import { PlusPage, PlusDialogForm, ProSwitch } from '@/components'
import { systemService } from '@/api'
import { columns, rules, getDictItemColumns } from './data'

function onTableAction({ row }) {
  console.log(row)
}

function onChange({ row }) {
  console.log(row)
}

/**
 * ! 编辑表单
 */

const editDialogVisible = ref(false)
const editForm = ref({})
const editTitle = ref('')

/** 打开弹窗 */
function openEditDialog(options?: { code: 'add' | 'edit'; data?: any }) {
  editDialogVisible.value = true

  if (options.code === 'add') {
    editTitle.value = '新增字典'
  }

  if (options.code === 'edit') {
    editTitle.value = '编辑字典'
    editForm.value = cloneDeep(options.data)
  }
}

function onEditConfirm() {
  console.log(editForm.value)
}

/**
 * ! 字典项
 */

const dictDrawerVisible = ref(false)
const dictTitle = ref('')
const selectDict = ref('')

/** 打开弹窗 */
function openDictDrawer(options?: { data?: any }) {
  dictDrawerVisible.value = true
  selectDict.value = options.data.dictCode
  dictTitle.value = `字典项 【${options.data.dictName} - ${options.data.dictCode}】`
}
</script>

<template>
  <div>
    <!-- 列表 -->
    <PlusPage
      :columns="columns"
      :request="systemService.dictApi.getDictList"
      :search="{ showNumber: 3 }"
      :table="{
        actionBar: {
          buttons: [
            { text: '字典项', props: { type: 'primary' }, onClick: ({ row }) => openDictDrawer({ data: row }) },
            {
              text: '编辑',
              props: { type: 'primary' },
              onClick: ({ row }) => openEditDialog({ code: 'edit', data: row })
            },
            { text: '删除', props: { type: 'danger' }, onClick: onTableAction }
          ],
          width: 180
        }
      }"
    >
      <template #table-action>
        <el-button type="primary" @click="() => openEditDialog({ code: 'add' })">新增字典</el-button>
      </template>

      <template #plus-cell-status="scoped">
        <ProSwitch v-model="scoped.row['status']" dict="status" @change="() => onChange({ row: scoped.row })" />
      </template>
    </PlusPage>

    <!-- 编辑弹窗 -->
    <PlusDialogForm
      v-model:visible="editDialogVisible"
      v-model="editForm"
      :title="editTitle"
      :form="{ columns, rules }"
      @confirm="onEditConfirm"
    />

    <!-- 字典项弹窗 -->
    <el-drawer
      v-model="dictDrawerVisible"
      size="80%"
      :close-on-click-modal="false"
      :title="dictTitle"
      :destroy-on-close="true"
      direction="rtl"
    >
      <PlusPage
        :columns="getDictItemColumns({ key: selectDict })"
        :request="(search) => systemService.dictApi.getDict({ key: selectDict, ...search })"
        :search="{ showNumber: 2 }"
        :table="{
          actionBar: {
            buttons: [
              {
                text: '编辑',
                props: { type: 'primary' },
                onClick: ({ row }) => openEditDialog({ code: 'edit', data: row })
              },
              { text: '删除', props: { type: 'danger' }, onClick: onTableAction }
            ],
            width: 140
          }
        }"
      >
        <template #table-action>
          <el-button type="primary" @click="() => openEditDialog({ code: 'add' })">新增字典</el-button>
        </template>

        <template #plus-cell-status="scoped">
          <ProSwitch v-model="scoped.row['status']" dict="status" @change="() => onChange({ row: scoped.row })" />
        </template>
      </PlusPage>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
