<!--
 * @Author: Yyy
 * @Date: 2024-10-08 14:27:05
 * @LastEditTime: 2024-10-12 14:54:07
 * @Description: 字典列表
-->

<script setup lang="ts">
defineOptions({ name: 'dict-list' })

import { onMounted, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import { ProButton } from '@/components'
import { systemService } from '@/api'
import { useRequest } from '@/hooks'

const emits = defineEmits<{
  (e: 'click', data: { key: string }): void
}>()

const selectDict = ref()
const dictName = ref('')

/** 查询 */
const {
  data: dictList,
  loading,
  run
} = useRequest(() => systemService.dictApi.getDictList({ dictName: dictName.value }))

/** 动态计算字典列表高度 */
const scrollHeight = ref(0)
const el = ref(null)
const { height } = useElementSize(el)

onMounted(() => {
  scrollHeight.value = height.value
})

/** 字典项 - 点击事件 */
function onClickDictItem(item) {
  selectDict.value = item.dictCode

  emits('click', { key: item.dictCode })
}
</script>

<template>
  <el-card shadow="never" body-class="!p-0 h-full flex flex-col justify-between">
    <div class="flex flex-col h-full">
      <div class="p-2">
        <el-input v-model="dictName" placeholder="请输入字典名称" clearable>
          <template #append>
            <el-button :icon="Search" :loading="loading" @click="run" />
          </template>
        </el-input>
      </div>

      <el-divider class="!m-0" />

      <div ref="el" v-loading="loading" class="px-2 my-2 flex-1">
        <el-scrollbar :height="scrollHeight">
          <div v-if="!dictList?.length" class="text-center"><el-text type="info">暂无字典...</el-text></div>

          <div
            v-for="item in dictList"
            v-else
            :key="item.dictCode"
            class="dict cursor-pointer p-2 h-full"
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
      <ProButton class="w-full">新增字典</ProButton>
    </div>
  </el-card>
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
