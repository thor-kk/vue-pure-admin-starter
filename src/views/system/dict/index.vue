<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-11 10:06:23
 * @Description: 系统模块 - 字典
-->

<script setup lang="ts">
defineOptions({ name: 'page-system-dict' })

import { nextTick, onMounted, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { Delete, Edit, Plus, Search } from '@element-plus/icons-vue'
import { systemService } from '@/api'

const selectDict = ref()
const searchDict = ref('')
const dictList = ref([])
const itemList = ref()

onMounted(async () => {
  const res = await systemService.dictApi.getDictList()
  dictList.value = res.data
  itemList.value = 25
})

function onClickDictItem(item) {
  if (selectDict.value === item.dictCode) {
    selectDict.value = ''
    return
  }

  selectDict.value = item.dictCode
}

const el = ref(null)
const { height } = useElementSize(el)
const scrollHeight = ref(0)

onMounted(() => {
  nextTick(() => {
    scrollHeight.value = height.value - 20
  })
})
</script>

<template>
  <div class="flex h-full">
    <el-card class="mr-2 w-[250px]" shadow="never" body-class="!p-0 h-full flex flex-col justify-between">
      <div class="flex flex-col h-full">
        <div class="p-2">
          <el-input v-model="searchDict" placeholder="请输入字典名称" :suffix-icon="Search" clearable />
        </div>

        <el-divider class="!m-0" />

        <div ref="el" class="p-2 flex-1 overflow-auto">
          <el-scrollbar :height="scrollHeight">
            <div
              v-for="item in dictList"
              :key="item.dictCode"
              class="dict cursor-pointer p-2 h-full overflow-auto"
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
      </div>

      <div class="p-2">
        <el-button class="w-full" type="primary" :icon="Plus">新增字典</el-button>
      </div>
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
