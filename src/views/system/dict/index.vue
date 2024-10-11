<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-11 09:06:19
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { onMounted, ref } from 'vue'
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import { systemService } from '@/api'

const selectDict = ref('')
const searchDict = ref('')
const dictList = ref([])

onMounted(async () => {
  const res = await systemService.dictApi.getDictList()
  dictList.value = res.data
})

function onClickDictItem(item) {
  if (selectDict.value === item.dictCode) {
    selectDict.value = ''
    return
  }

  selectDict.value = item.dictCode
}
</script>

<template>
  <div class="flex h-full">
    <el-card class="mr-2 w-[250px]" shadow="never" body-style="padding: 0;">
      <div class="p-2">
        <el-input v-model="searchDict" placeholder="请输入字典名称" :suffix-icon="Search" clearable />
      </div>

      <el-divider class="!m-0" />

      <div class="p-2" style="height: calc(100vh - 236px)">
        <el-scrollbar :noresize="true">
          <div
            v-for="item in dictList.filter((item) => item.dictName.includes(searchDict))"
            :key="item.dictCode"
            class="dict cursor-pointer p-2"
            :class="{ active: selectDict === item.dictCode }"
            @click="() => onClickDictItem(item)"
          >
            <div class="flex justify-between">
              <el-text>{{ `${item.dictName}（${item.dictCode}）` }}</el-text>

              <div v-show="selectDict === item.dictCode" class="flex items-center">
                <el-tooltip effect="dark" content="修改" placement="top">
                  <el-button :icon="Edit" link type="primary" @click.stop="() => {}" />
                </el-tooltip>

                <el-tooltip effect="dark" content="删除" placement="top">
                  <el-button :icon="Delete" link type="danger" @click.stop="() => {}" />
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="p-2"><el-button class="w-full" type="primary" :icon="Plus">新增字典</el-button></div>
    </el-card>

    <div class="flex-1 bg-white rounded">2</div>
  </div>
</template>

<style scoped lang="scss">
.dict {
  &:hover {
    :deep(.el-text) {
      color: #409eff;
    }
  }
}

.active {
  background-color: #40a0ff34;
  border-radius: 4px;
  :deep(.el-text) {
    color: #409eff;
  }
}
</style>
