<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-16 15:57:19
 * @Description: 角色管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-role-v2' })

import { ProPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <ProPage
    title="角色"
    :columns
    :form-width="550"
    :desc-width="550"
    :desc-column="1"
    :api="systemService.roleApi.getRolePage"
    :main-action="[{ code: 'create', api: systemService.userApi.createUser }]"
    :table-action="[
      {
        code: 'update',
        api: systemService.userApi.updateUser,
        disabled: ({ row }) => row.code === 'admin'
      },
      {
        code: 'delete',
        api: ({ row }) => systemService.userApi.deleteUser({ userId: row.id }),
        disabled: ({ row }) => row.code === 'admin'
      }
    ]"
    :table-status-change-api="
      ({ row }) => systemService.userApi.updateUserStatus({ userId: row.id, status: row.status })
    "
  />
</template>

<style scoped lang="scss"></style>
