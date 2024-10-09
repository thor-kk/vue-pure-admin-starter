<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-09 10:49:47
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { PlusPage } from '@/components'

import { systemService } from '@/api'
import { columns } from './data'
</script>

<template>
  <div>
    <PlusPage :columns="columns" :request="systemService.dictApi.getDict" />
  </div>
</template>

<style scoped lang="scss"></style>
