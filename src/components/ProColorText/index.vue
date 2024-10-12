<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-12 14:25:36
 * @Description: Pro - 颜色文本
-->

<script setup lang="ts">
interface Props {
  text: string
  color: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <span :style="{ color: props.color }">{{ props.text }}</span>
</template>

<style scoped lang="scss"></style>
