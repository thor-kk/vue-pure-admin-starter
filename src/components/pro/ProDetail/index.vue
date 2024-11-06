<!--
 * @Author: Yyy
 * @Date: 2024-11-06 13:56:20
 * @LastEditTime: 2024-11-06 15:40:12
 * @Description: pro - 高级详情页
-->

<script setup lang="ts"></script>

<template>
  <div class="pro-page">
    <div class="header">
      <slot name="header">基本信息</slot>
    </div>

    <div class="content">
      <slot>我是内容</slot>
    </div>

    <div class="footer">
      <slot name="footer">操作页脚</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pro-page {
  overflow: auto;
  height: calc(100vh - 82px);
  margin: -24px;
}

.header,
.footer {
  position: sticky;
  background-color: white;
  padding: 20px;
}

.header {
  top: 0;
}

.footer {
  bottom: 0;
}

.content {
  min-height: calc(100vh - 82px - 128px);
}
</style>
