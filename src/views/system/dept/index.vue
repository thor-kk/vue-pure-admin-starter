<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-16 17:03:53
 * @Description: 部门管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-dept' })

import { ProPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <ProPage
      title="部门"
      row-key="deptId"
      :form-width="500"
      :table-show-index="false"
      :show-pagination="false"
      :desc-column="1"
      :columns
      :api="systemService.deptApi.getDeptTree"
      :main-action="[{ code: 'create', api: systemService.userApi.createUser }]"
      :table-action="[
        {
          code: 'create',
          api: systemService.userApi.createUser,
          data: ({ row }) => ({ parId: row.parId })
        },
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
