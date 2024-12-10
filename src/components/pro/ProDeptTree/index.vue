<!--
 * @Author: Yyy
 * @Date: 2024-12-10 13:52:10
 * @LastEditTime: 2024-12-10 16:54:23
 * @Description: 部门选择树
-->

<script setup lang="ts">
defineOptions({ name: 'components-pro-dept-tree' })

import { Search } from '@element-plus/icons-vue'

interface Props {
  /** 部门树 Api */
  api: (args?: { deptName?: string }) => Promise<any[]>
  /** 树 label 字段映射 */
  treeLabel?: string
}

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits<{
  /** 部门点击事件（传递选中部门数据） */
  (e: 'click', args: { row?: any }): void
}>()

const loading = ref(false)
const deptName = ref()
const deptTree = ref()

async function onSearch() {
  try {
    loading.value = true
    const res = await props.api({ deptName: deptName.value })
    deptTree.value = res
  } catch (error) {
    console.log('🚀 ~ onSearch ~ error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  onSearch()
})

/** 节点选中（传递选中行数据） */
function handleNodeClick(row: any) {
  emits('click', { row })
}
</script>

<template>
  <el-card class="w-[250px] h-full" body-class="!p-0" shadow="never">
    <div class="p-2">
      <el-input v-model="deptName" placeholder="请输入部门名称" clearable>
        <template #append>
          <el-button :icon="Search" :loading="loading" @click="onSearch" />
        </template>
      </el-input>
    </div>

    <el-divider class="!m-0" />

    <el-tree
      v-loading="loading"
      :data="deptTree"
      :props="{ label: props.treeLabel }"
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<style scoped lang="scss"></style>
