<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-12-09 16:03:23
 * @Description: Plus - 高级开关
-->

<script setup lang="ts">
interface Props {
  options?: { label: string; value: any; tagType?: 'primary' | 'danger'; switch?: 'active' | 'inactive' }[]
  inlinePrompt?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inlinePrompt: true
})
</script>

<template>
  <el-switch
    :inlinePrompt="props.inlinePrompt"
    :activeValue="options.find((item) => item.switch === 'active').value"
    :activeText="options.find((item) => item.switch === 'active').label"
    :inactiveValue="options.find((item) => item.switch === 'inactive').value"
    :inactiveText="options.find((item) => item.switch === 'inactive').label"
  />
</template>

<style scoped lang="scss"></style>
