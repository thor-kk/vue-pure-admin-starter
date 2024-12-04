<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-04 09:56:48
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
          code: 'add',
          text: '新增',
          confirm: ({ form }) => console.log(form)
        }
      ]"
      :table-btn="[
        {
          code: 'edit',
          text: '编辑',
          data: ({ row }) => console.log(row),
          confirm: ({ form }) => console.log(form)
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
