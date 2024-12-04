<!--
 * @Author: Yyy
 * @Date: 2024-12-04 14:26:47
 * @LastEditTime: 2024-12-04 15:50:50
 * @Description: 用户管理
-->

<script setup lang="ts">
defineOptions({ name: 'views-system-user-v2' })

import { ProPageV2 } from '@/components'
import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <ProPageV2 :columns :api="systemService.userApi.getUserPage" />
</template>

<style scoped lang="scss"></style>
