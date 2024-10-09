<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-09 16:00:38
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { PlusPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'

function onAction() {
  console.log('onAction')
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
    <PlusPage
      :columns="columns"
      :request="systemService.dictApi.getDict"
      :table="{
        actionBar: {
          buttons: [
            { text: '字典项', code: 'view', props: { type: 'primary' }, onClick: onTableAction },
            { text: '删除', code: 'delete', props: { type: 'danger' }, onClick: onTableAction }
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
  </div>
</template>

<style scoped lang="scss"></style>
