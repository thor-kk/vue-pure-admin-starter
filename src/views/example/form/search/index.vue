<script setup lang="ts">
import { ref } from 'vue'
import { PlusSearch } from 'plus-pro-components'
import { columns } from './data'

defineOptions({ name: 'page-form-plus-search' })

const state = ref({
  status: '0',
  time: new Date().toString()
})

const handleChange = (values: any) => {
  console.log(values, 'change')
}
const handleSearch = (values: any) => {
  console.log(values, 'search')
}
const handleReset = () => {
  console.log('handleReset')
}
</script>

<template>
  <div>
    <el-card shadow="never">
      <PlusSearch
        v-model="state"
        :columns="columns"
        :show-number="2"
        :collapse-transition="false"
        @change="handleChange"
        @search="handleSearch"
        @reset="handleReset"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
