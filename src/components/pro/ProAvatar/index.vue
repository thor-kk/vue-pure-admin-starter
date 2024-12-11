<script setup lang="ts">
defineOptions({ name: 'components-pro-avatar' })

const model = defineModel<string>()
</script>

<template>
  <el-avatar :src="model"></el-avatar>
</template>

<style scoped lang="scss"></style>
