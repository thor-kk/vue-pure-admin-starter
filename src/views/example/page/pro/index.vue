<!--
 * @Author: Yyy
 * @Date: 2024-11-05 15:29:09
 * @LastEditTime: 2024-11-07 10:23:35
 * @Description: 页面示例 - Pro Page
-->

<script setup lang="ts">
defineOptions({ name: 'page-pro' })

import { ProPage } from '@/components'
import { tableConfig } from './data'
import { systemService } from '@/api'
</script>

<template>
  <ProPage :columns="tableConfig" :api="(searchParams) => systemService.userApi.getUserList2(searchParams)">
    <template #operation="{}">
      <el-button class="reset-margin" link type="primary"> 修改 </el-button>
    </template>
  </ProPage>
</template>

<style scoped lang="scss"></style>
