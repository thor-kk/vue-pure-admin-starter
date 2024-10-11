<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-11 16:55:38
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import type { PlusPageInstance } from '@/components'

import { ref } from 'vue'
import { PlusPage, ProSwitch } from '@/components'
import { useDictStoreHook } from '@/store'
import { systemService } from '@/api'
import { dictItemColumns } from './data'

import DictList from './DictList.vue'

const plusPageRef = ref<PlusPageInstance>()
const selectKey = ref('')

const options = ref([])
const showItem = ref(true)
async function onClick(key) {
  selectKey.value = key
  plusPageRef.value.getList()

  showItem.value = false
  options.value = await useDictStoreHook().getDict(selectKey.value)
  showItem.value = true
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
      <template #plus-cell-dictItemName="scoped">
        <PlusDisplayItem
          v-if="showItem"
          :column="{ prop: 'dictItemValue', valueType: 'select', options }"
          :row="scoped.row"
        />
      </template>

      <template #plus-cell-status="scoped">
        <ProSwitch v-model="scoped.row['status']" dict="status" />
      </template>
    </PlusPage>
  </div>
</template>

<style scoped lang="scss"></style>
