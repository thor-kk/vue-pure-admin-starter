<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-03 15:22:51
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
          confirm: ({ data }) => console.log(data)
        }
      ]"
      :table-btn="[
        {
          code: 'edit',
          text: '编辑',
          click: () => console.log('编辑')
        },
        {
          text: '删除',
          click: () => console.log('删除')
        }
      ]"
      @table-row-change="({ row }) => console.log(row)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
