<!--
 * @Author: Yyy
 * @Date: 2024-12-01 21:50:29
 * @LastEditTime: 2024-12-01 22:49:13
 * @Description: crud
-->

<script setup lang="ts">
defineOptions({ name: 'views-example-crud' })

import { ProPageV2 } from '@/components'
import { columns, data } from './data'
</script>

<template>
  <div>
    <ProPageV2 :columns :data />
  </div>
</template>

<style scoped lang="scss"></style>
