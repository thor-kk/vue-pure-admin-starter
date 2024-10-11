<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-11 15:00:41
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { PlusPage } from '@/components'
import { systemService } from '@/api'
import { getDictItemColumns } from './data'

import DictList from './DictList.vue'
</script>

<template>
  <div class="flex h-full">
    <DictList class="mr-2 w-[250px] h-full" />

    <PlusPage
      class="flex-1"
      :columns="getDictItemColumns({ key: 'status' })"
      :request="(search) => systemService.dictApi.getDict({ key: 'status', ...search })"
    />
  </div>
</template>

<style scoped lang="scss"></style>
