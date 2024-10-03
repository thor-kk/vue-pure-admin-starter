<!--
 * @Author: Yyy
 * @Date: 2024-10-03 21:12:53
 * @LastEditTime: 2024-10-03 23:27:29
 * @Description: 页面示例 - Plus Page
-->

<script setup lang="ts">
import type { PageInfo } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { PlusPage } from '@/components'

import { tableConfig } from './data'

defineOptions({ name: 'page-plus' })

const { buttons } = useTable()

const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 20, status, name } = query || {}
  const total = 30
  const List = Array.from({ length: total }).map((item, index) => {
    return {
      id: index,
      name: index === 0 ? 'name'.repeat(20) : index + 'name',
      status: String(index % 3),
      tag:
        index === 1
          ? 'success'
          : index === 2
            ? 'warning'
            : index === 3
              ? 'info'
              : 'danger',
      progress: 10,
      rate: index > 3 ? 2 : 3.5,
      switch: index % 2 === 0 ? true : false,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      time: new Date(),
      code: `
          const getData = async params => {
            const data = await getData(params)
            return { list: data.data, ...data }
          }`,
      custom: 'custom' + index
    }
  })

  const mockList = List.filter(item => {
    if (status && status !== item.status) {
      return false
    }
    if (name && name !== item.name) {
      return false
    }

    return true
  })

  const pageList = mockList.filter(
    (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
  )

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 2000)
  })

  return { data: pageList, success: true, total: mockList.length }
}

// 按钮
buttons.value = [
  {
    text: '编辑',
    code: 'update',
    props: { type: 'success' }
  },
  {
    text: '删除',
    code: 'delete',
    confirm: true,
    props: { type: 'warning' }
  },
  {
    text: '查看',
    code: 'view',
    props: { type: 'info' }
  }
]

// 按钮操作
function handleTableOption({ row, buttonRow }) {
  console.log(row, buttonRow)
}

const formChange = ({ value, prop, index }) => {
  console.log(value, prop, index)
}
</script>

<template>
  <div>
    <PlusPage
      :columns="tableConfig"
      :request="getList"
      :table="{
        isSelection: true,
        actionBar: { buttons, width: 140 },
        onClickAction: handleTableOption,
        onFormChange: formChange
      }"
    >
      <template #table-title>
        <el-row class="button-row">
          <el-button type="primary"> 添加 </el-button>
          <el-button type="danger"> 批量删除 </el-button>
        </el-row>
      </template>
    </PlusPage>
  </div>
</template>

<style scoped lang="scss"></style>
