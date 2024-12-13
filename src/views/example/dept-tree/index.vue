<script setup lang="ts">
defineOptions({ name: 'views-example-dept-tree' })

import { ProDeptTree } from '@/components'
import { systemService } from '@/api'
</script>

<template>
  <div class="h-full">
    <ProDeptTree
      tree-label="name"
      :api="({ deptName }) => systemService.deptApi.getDeptTree({ name: deptName })"
      @click="({ row }) => {}"
    />
  </div>
</template>

<style scoped lang="scss"></style>
