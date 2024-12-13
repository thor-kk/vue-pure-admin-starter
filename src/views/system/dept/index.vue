<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-13 23:06:34
 * @Description: 部门管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-dept-v2' })

import { ProPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <ProPage
      title="部门"
      row-key="deptId"
      :table-show-index="false"
      :form-width="550"
      :show-pagination="false"
      :columns
      :api="systemService.deptApi.getDeptTree"
      :main-btn="[{ code: 'create', api: systemService.userApi.createUser }]"
      :table-btn="[
        { code: 'update', api: systemService.userApi.updateUser, disabled: true },
        { code: 'delete', api: ({ row }) => systemService.userApi.deleteUser({ userId: row.id }) }
      ]"
      :status-change-api="({ row }) => systemService.userApi.updateUserStatus({ userId: row.id, status: row.status })"
    />
  </div>
</template>

<style scoped lang="scss"></style>
