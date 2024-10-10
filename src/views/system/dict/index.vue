<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-10 11:01:49
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { ref } from 'vue'
import { cloneDeep } from 'lodash'
import { PlusPage, PlusDialogForm } from '@/components'
import { systemService } from '@/api'
import { columns, rules } from './data'

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
</script>

<template>
  <div>
    <!-- 列表 -->
    <PlusPage
      :columns="columns"
      :request="systemService.dictApi.getDict"
      :search="{ showNumber: 3 }"
      :table="{
        actionBar: {
          buttons: [
            { text: '字典项', props: { type: 'primary' }, onClick: onTableAction },
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
        <el-switch
          v-model="scoped.row['status']"
          style="--el-switch-on-color: #67c23a; --el-switch-off-color: #f56c6c"
          inline-prompt
          active-text="已启用"
          inactive-text="未启用"
          @change="() => onChange({ row: scoped.row })"
        />
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
  </div>
</template>

<style scoped lang="scss"></style>
