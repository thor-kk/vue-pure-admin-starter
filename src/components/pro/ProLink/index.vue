<script setup lang="ts">
defineOptions({ name: '' })

interface Props {
  text: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <el-link type="primary">primary</el-link>
</template>

<style scoped lang="scss"></style>
