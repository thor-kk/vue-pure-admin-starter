<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-14 19:52:30
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import type { PlusDialogFormInstance, PlusPageInstance } from '@/components'

import { ref } from 'vue'
import { PlusPage, ProSwitch, ProStatusText, ProColorText, ProButton, PlusDialogForm } from '@/components'
import { systemService } from '@/api'
import { dictItemColumns } from './data'

import DictList from './DictList.vue'

const plusPageRef = ref<PlusPageInstance>()
const editDialogRef = ref<PlusDialogFormInstance>()

const selectKey = ref('')
const selectedIds = ref([])

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
      :table="{
        isSelection: true,
        onSelectionChange: (rows) => (selectedIds = rows.map((item) => item.id)),
        actionBar: {
          width: 140,
          align: 'center',
          buttons: [
            {
              text: '修改',
              props: { type: 'primary' },
              onClick: ({ row }) =>
                editDialogRef.open({
                  title: '修改字典项',
                  data: { ...row, dictItemValue: JSON.stringify(row.dictItemValue) },
                  confirmFn: ({ data }) =>
                    systemService.dictApi.updateDictItem({ data, successCallback: plusPageRef.getList })
                })
            },
            {
              text: '删除',
              props: { type: 'danger' },
              onClick: ({ row }) =>
                systemService.dictApi.deleteDictItem({ ids: [row.id], successCallback: plusPageRef.getList })
            }
          ]
        }
      }"
    >
      <ProButton
        :disabled="!selectKey"
        @click="
          () =>
            editDialogRef.open({
              title: '新增字典项',
              confirmFn: ({ data }) =>
                systemService.dictApi.createDictItem({ data, successCallback: plusPageRef.getList })
            })
        "
      >
        新增字典项
      </ProButton>

      <ProButton
        :disabled="!selectKey"
        @click="() => systemService.dictApi.deleteDictItem({ ids: selectedIds, successCallback: plusPageRef.getList })"
      >
        批量删除
      </ProButton>

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

    <!-- 编辑弹窗 -->
    <PlusDialogForm ref="editDialogRef" :form="{ columns: dictItemColumns }" />
  </div>
</template>

<style scoped lang="scss"></style>
