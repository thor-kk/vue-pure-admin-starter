<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-12 09:25:18
 * @Description: Pro - 状态文本
-->

<script setup lang="ts">
interface Props {
  text: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="flex items-center">
    <div class="h-1.5 w-1.5 mr-2" :style="{ background: props.color, borderRadius: '50%' }" />
    <div>{{ props.text }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
