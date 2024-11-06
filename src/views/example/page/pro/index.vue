<!--
 * @Author: Yyy
 * @Date: 2024-11-05 15:29:09
 * @LastEditTime: 2024-11-05 15:47:55
 * @Description: 页面示例 - Pro Page
-->

<script setup lang="ts">
defineOptions({ name: 'page-pro' })

import { ProPage } from '@/components'
import { tableConfig } from './data'
</script>

<template>
  <ProPage :columns="tableConfig" />
</template>

<style scoped lang="scss"></style>
