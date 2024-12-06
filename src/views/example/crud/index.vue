<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-04 14:12:40
 * @Description: crud
-->

<script setup lang="ts">
defineOptions({ name: 'views-example-crud' })

import { ProPageV2 } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <ProPageV2
      :columns
      :api="systemService.roleApi.getRolePage"
      :main-btn="[
        {
          code: 'create',
          text: '新增',
          api: ({ form }) => console.log(form)
        }
      ]"
      :table-btn="[
        {
          code: 'update',
          text: '编辑',
          data: ({ row }) => console.log(row),
          api: ({ form }) => console.log(form)
        },
        {
          text: '删除',
          click: ({ row }) => console.log('删除', row)
        }
      ]"
      @table-row-change="({ row }) => console.log(row)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
