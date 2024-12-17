<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-17 11:10:33
 * @Description: 菜单管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-menu' })

import { ProPage } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <ProPage
      title="菜单"
      row-key="menuId"
      :table-show-index="false"
      :show-pagination="false"
      :table-expand-all="false"
      :table-action-num="3"
      form-2-col
      :columns
      :api="systemService.menuApi.getMenuTree"
      :main-action="[{ code: 'create', api: systemService.userApi.createUser }]"
      :table-action="[
        {
          code: 'create',
          api: systemService.userApi.createUser,
          data: ({ row }) => ({ parId: row.menuId })
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
