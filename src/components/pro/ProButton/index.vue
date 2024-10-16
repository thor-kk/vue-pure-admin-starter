<!--
 * @Author: Yyy
 * @Date: 2024-03-28 22:08:10
 * @LastEditTime: 2024-10-12 11:01:28
 * @Description: Pro - 图表按钮
-->

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ButtonProps } from 'element-plus'

import { computed } from 'vue'
import { Plus, Delete, Download } from '@element-plus/icons-vue'

interface Props extends Partial<ButtonProps> {
  /** 开启自动图标匹配 */
  autoIcon?: boolean
  /** 开启自动 type 匹配 */
  autoType?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoIcon: true,
  autoType: true
})

const slots = defineSlots<{
  default?: any
}>()

/** 自动匹配 */
const auto = computed(() => {
  /** 正则匹配函数 */
  function match(text: string, keywords: string[]) {
    // 将关键词数组转换为正则表达式，使用'|'作为或运算符
    const regex = new RegExp(keywords.join('|'), 'i')
    // 测试文本是否匹配正则表达式
    return regex.test(text)
  }

  const config: { icon: any; type: 'primary' | 'danger' | 'default' } = { icon: undefined, type: undefined }

  if (!slots.default) return config
  const text = slots.default()[0].children

  if (match(text, ['新增', '添加'])) {
    config.icon = Plus
    config.type = 'primary'
  }

  if (match(text, ['删除'])) {
    config.icon = Delete
    config.type = 'danger'
  }

  if (match(text, ['导出', '下载'])) {
    config.icon = Download
    config.type = 'default'
  }

  return config
})

/** 动态判断显示的 icon */
function getIcon() {
  if (props.icon) return props.icon
  if (props.autoIcon) return auto.value.icon
}

/** 动态判断显示的 type */
function getType() {
  if (props.type) return props.type
  if (props.autoType) return auto.value.type
}

/** 去除 slot 标签产生无用占位符后的样式 */
const slotStyle = computed(() => {
  const style: CSSProperties = { marginLeft: '6px' }
  if (!slots.default) style.marginLeft = 0
  return style
})
</script>

<template>
  <el-button v-bind="props" :icon="getIcon()" :type="getType()">
    <slot />
  </el-button>
</template>

<style lang="scss" scoped>
/** 去除 slot 标签生产无用占位符后的样式 */
.el-button {
  :deep([class*='el-icon'] + span) {
    margin-left: v-bind('slotStyle.marginLeft');
  }
}
</style>
