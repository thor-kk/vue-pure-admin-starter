<script setup lang="ts">
defineOptions({ name: 'components-pro-tag' })

interface Props {}

const props = withDefaults(defineProps<Props>(), {})

const model = defineModel<string>()
</script>

<template>
  <IconifyIconOnline class="inline" :icon="model" />
</template>

<style scoped lang="scss"></style>
