<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-09 17:38:46
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-user-v2' })

import { ProPageV2 } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <ProPageV2
    title="用户"
    edit-form-2-col
    :columns
    :api="systemService.userApi.getUserPage"
    :main-btn="[
      {
        code: 'create',
        api: systemService.userApi.createUser
      }
    ]"
    :table-btn="[
      {
        code: 'update',
        api: systemService.userApi.updateUser
      },
      {
        code: 'delete',
        api: ({ row }) => systemService.userApi.deleteUser({ userId: row.id })
      }
    ]"
    :table-status-change-api="({ row }) => systemService.userApi.updateUser({ data: row })"
  />
</template>

<style scoped lang="scss"></style>
