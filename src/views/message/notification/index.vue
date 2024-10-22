<!--
 * @Author: Yyy
 * @Date: 2024-10-21 14:23:50
 * @LastEditTime: 2024-10-22 14:30:15
 * @Description: 消息管理 - 通知公告
-->

<script setup lang="ts">
defineOptions({ name: 'page-message-notification' })

import { onMounted, ref } from 'vue'
import { columns } from './data'
import { PureTableBar, ProButton } from '@/components'
import { messageService } from '@/api'

const dataList = ref([])
const selectedNum = ref(0)

async function onSearch() {
  const { data } = await messageService.notificationApi.getNoticeList({})
  dataList.value = data.list
}

onMounted(() => {
  onSearch()
})

const tableRef = ref()

function handleSelectionChange(val) {
  selectedNum.value = val.length
  tableRef.value.setAdaptive()
}

function onSelectionCancel() {
  selectedNum.value = 0
  tableRef.value.getTableRef().clearSelection()
}
</script>

<template>
  <div>
    <PureTableBar :columns="columns" @refresh="onSearch">
      <template #title>
        <ProButton type="primary">添加公告</ProButton>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <div
          v-if="selectedNum > 0"
          v-motion-fade
          class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
        >
          <div class="flex-auto">
            <span
              style="font-size: var(--el-font-size-base)"
              class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
            >
              已选 {{ selectedNum }} 项
            </span>
            <el-button type="primary" text @click="onSelectionCancel"> 取消选择 </el-button>
          </div>

          <el-popconfirm title="是否确认删除?">
            <template #reference>
              <el-button type="danger" text class="mr-1"> 批量删除 </el-button>
            </template>
          </el-popconfirm>
        </div>

        <pure-table
          ref="tableRef"
          row-key="id"
          alignWhole="center"
          :columns="dynamicColumns"
          :size="size"
          :data="dataList"
          :adaptive="true"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :pagination="{ total: 0, pageSize: 10, currentPage: 1, background: true }"
          :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
          @selection-change="handleSelectionChange"
        >
          <template #operation="{}">
            <el-button class="reset-margin" link type="primary"> 修改 </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss"></style>
