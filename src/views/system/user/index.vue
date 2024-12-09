<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-09 15:01:31
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
    edit-form-2-col
  />
</template>

<style scoped lang="scss"></style>
