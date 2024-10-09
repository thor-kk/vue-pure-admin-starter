<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-09 17:27:24
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import type { FormRules } from 'element-plus'

import { ref } from 'vue'
import { PlusPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'

const editDialogRef = ref()
const editDialogVisible = ref(false)
const editForm = ref({})
const rules: FormRules = {
  dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  dictCode: [{ required: true, message: '请输入字典编码', trigger: 'blur' }]
}

function onEditConfirm() {
  console.log(editForm.value)
}

function onAction() {
  console.log('onAction')

  console.log(editDialogRef.value)

  editDialogRef.value.formInstance?.resetFields()
  editDialogVisible.value = true
}

function onTableAction({ row }) {
  console.log(row)
}

function onChange({ row }) {
  console.log(row)
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
            { text: '删除', props: { type: 'danger' }, onClick: onTableAction }
          ],
          width: 140
        }
      }"
    >
      <template #table-action>
        <el-button type="primary" @click="onAction">新增字典</el-button>
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
      ref="editDialogRef"
      v-model:visible="editDialogVisible"
      v-model="editForm"
      title="新增字典"
      width="600px"
      :form="{ columns, rules, labelPosition: 'right', labelSuffix: '' }"
      :hasErrorTip="false"
      @confirm="onEditConfirm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
