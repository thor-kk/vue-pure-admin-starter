<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-06 14:40:36
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
    :columns
    :api="systemService.userApi.getUserPage"
    :table-btn="[
      {
        text: '删除',
        code: 'delete',
        click: ({ row }) => systemService.userApi.deleteUser({ userId: row.id })
      }
    ]"
    @table-row-change="({ row }) => console.log(row)"
  />
</template>

<style scoped lang="scss"></style>
