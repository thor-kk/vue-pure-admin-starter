<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-05 14:52:03
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-user-v2' })

import { ProPageV2 } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <ProPageV2 :columns :api="systemService.userApi.getUserPage" @table-row-change="({ row }) => console.log(row)" />
</template>

<style scoped lang="scss"></style>
