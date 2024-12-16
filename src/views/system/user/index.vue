<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-16 16:23:40
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-user' })
import type { ProPageInstance } from '@/components'

import { ProPage, ProDeptTree } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'

const proPageRef = ref<ProPageInstance>()
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

    <ProPage
      ref="proPageRef"
      class="ml-[258px]"
      title="用户"
      form-2-col
      :columns
      :api="(params) => systemService.userApi.getUserPage({ ...params, deptId })"
      :main-action="[{ code: 'create', api: systemService.userApi.createUser }]"
      :table-action="[
        { code: 'update', api: systemService.userApi.updateUser },
        { code: 'delete', api: ({ row }) => systemService.userApi.deleteUser({ userId: row.id }) }
      ]"
      :table-status-change-api="
        ({ row }) => systemService.userApi.updateUserStatus({ userId: row.id, status: row.status })
      "
    />
  </div>
</template>

<style scoped lang="scss"></style>
