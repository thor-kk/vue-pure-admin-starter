<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-12 14:23:17
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import type { PlusPageInstance } from '@/components'

import { ref } from 'vue'
import { PlusPage, ProSwitch, ProStatusText, ProColorText, ProButton } from '@/components'
import { systemService } from '@/api'
import { dictItemColumns } from './data'

import DictList from './DictList.vue'

const plusPageRef = ref<PlusPageInstance>()
const selectKey = ref('')

function onClick(key: string) {
  selectKey.value = key
  plusPageRef.value.getList()
}
</script>

<template>
  <div class="flex h-full">
    <DictList class="mr-2 h-full" style="min-width: 250px" @click="({ key }) => onClick(key)" />

    <PlusPage
      ref="plusPageRef"
      style="width: calc(100% - 250px)"
      :columns="dictItemColumns"
      :request="(search) => systemService.dictApi.getDict({ key: selectKey, ...search })"
    >
      <ProButton>新增字典项</ProButton>

      <template #plus-cell-dictItemName="{ row }">
        <ProStatusText :text="row.dictItemName" :color="row.color" />
      </template>

      <template #plus-cell-color="{ row }">
        <ProColorText :text="row.color" :color="row.color" />
      </template>

      <template #plus-cell-status="{ row }">
        <ProSwitch v-model="row['status']" dict="status" />
      </template>
    </PlusPage>
  </div>
</template>

<style scoped lang="scss"></style>
