<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-11 11:14:50
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-user-v2' })
import type { ProPageV2Instance } from '@/components'

import { ProPageV2, ProDeptTree } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'

const proPageRef = ref<ProPageV2Instance>()
const deptId = ref()
function onDeptClick(row: any) {
  deptId.value = row.deptId
  proPageRef.value.getList()
}
</script>

<template>
  <div class="h-full">
    <ProDeptTree
      class="float-left"
      tree-label="name"
      :api="({ deptName }) => systemService.deptApi.getDeptTree({ name: deptName })"
      @click="({ row }) => onDeptClick(row)"
    />

    <ProPageV2
      ref="proPageRef"
      class="ml-[258px]"
      title="用户"
      edit-form-2-col
      :columns
      :api="(params) => systemService.userApi.getUserPage({ ...params, deptId })"
      :main-btn="[{ code: 'create', api: systemService.userApi.createUser }]"
      :table-btn="[
        { code: 'update', api: systemService.userApi.updateUser },
        { code: 'delete', api: ({ row }) => systemService.userApi.deleteUser({ userId: row.id }) }
      ]"
      :status-change-api="({ row }) => systemService.userApi.updateUserStatus({ userId: row.id, status: row.status })"
    />
  </div>
</template>

<style scoped lang="scss"></style>
