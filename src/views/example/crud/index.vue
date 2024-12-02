<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-02 09:44:29
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
    <ProPageV2 :columns :api="systemService.roleApi.getRolePage" />
  </div>
</template>

<style scoped lang="scss"></style>
