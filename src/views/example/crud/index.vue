<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-06 15:46:04
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
    <ProPageV2 :columns="[]" :api="systemService.userApi.getUserPage" />
  </div>
</template>

<style scoped lang="scss"></style>
