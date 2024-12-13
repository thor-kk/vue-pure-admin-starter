<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-12-13 16:24:32
 * @Description: 高级开关
-->

<script setup lang="ts">
interface Props {
  options?: { label: string; value: any; switch?: 'active' | 'inactive' }[]
  inlinePrompt?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inlinePrompt: true,
  options: () => [
    { label: '', value: 1, switch: 'active' },
    { label: '', value: 0, switch: 'inactive' }
  ]
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
