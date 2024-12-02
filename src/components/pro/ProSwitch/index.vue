<!--
 * @Author: Yyy
 * @Date: 2024-09-19 19:59:08
 * @LastEditTime: 2024-12-02 16:01:05
 * @Description: Plus - 高级页面
-->

<script setup lang="ts">
import type { SwitchProps } from 'element-plus'

import { ref, watch, watchEffect } from 'vue'
import { merge } from 'lodash'
import { useDictStoreHook } from '@/store'

interface Props extends Partial<SwitchProps> {
  /** 引用的字典项 */
  dict?: string
}

const props = withDefaults(defineProps<Props>(), {
  inlinePrompt: true
})

const defaultConfig: Partial<Props> = {}

const mergeProps = ref()

watchEffect(async () => {
  if (!props.dict) return

  /** 查询字典 */
  const dict = await useDictStoreHook().getDict(props.dict)
  const activeItem = dict.find((item) => item.identifier === 'active')
  const inactiveItem = dict.find((item) => item.identifier === 'inactive')

  mergeProps.value = merge(defaultConfig, { ...props }, {
    activeText: activeItem.label,
    inactiveText: inactiveItem.label,
    style: { '--el-switch-on-color': activeItem.color, '--el-switch-off-color': inactiveItem.color }
  } as Partial<SwitchProps>)
})

const model = defineModel()
</script>

<template>
  <el-switch v-bind="mergeProps" v-model="model" :active-value="1" :inactive-value="0" />
</template>

<style scoped lang="scss"></style>
