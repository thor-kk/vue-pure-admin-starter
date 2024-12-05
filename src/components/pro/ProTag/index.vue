<script setup lang="ts">
defineOptions({ name: 'components-pro-tag' })

interface Props {
  options: { label: string; value: any; tagType?: 'primary' | 'danger' }[]
}

const props = withDefaults(defineProps<Props>(), {})

const model = defineModel()

const find = ref<{ label: string; value: any; tagType?: 'primary' | 'danger' }>()
watch(model, (val) => (find.value = props.options.find((item) => item.value === val)), { immediate: true })
</script>

<template>
  <el-tag :type="find?.tagType">{{ find?.label }}</el-tag>
</template>

<style scoped lang="scss"></style>
