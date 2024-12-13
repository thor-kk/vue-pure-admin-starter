<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-13 14:41:28
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-role-v2' })

import { ProPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <ProPage
      title="用户"
      edit-form-2-col
      :columns
      :api="systemService.userApi.getUserPage"
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
