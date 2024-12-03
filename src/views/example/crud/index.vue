<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-03 09:16:12
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
      :main-btn="[{ code: 'add', text: '新增', ok: () => {} }]"
      @table-row-change="({ row }) => console.log(row)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
