<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-10-12 14:24:32
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
  <span>
    <span
      v-if="props.color"
      class="h-1.5 w-1.5 mr-2 inline-block relative -top-0.5"
      :style="{ background: props.color, borderRadius: '50%' }"
    />
    <span>{{ props.text }}</span>
  </span>
</template>

<style scoped lang="scss"></style>
