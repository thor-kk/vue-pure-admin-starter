<!--
 * @Author: Yyy
 * @Date: 2024-09-10 16:49:37
 * @LastEditTime: 2024-09-10 17:51:30
 * @Description: 图表 - 示例一
-->

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

defineOptions({ name: 'echarts-demo1' })

const option: EChartsOption = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: { text: 'Gradient Stacked Area Chart' },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } }
  },
  legend: { data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'] },
  toolbox: { feature: { saveAsImage: {} } },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [{ type: 'value' }],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(128, 255, 165)' },
          { offset: 1, color: 'rgb(1, 191, 236)' }
        ])
      },
      emphasis: { focus: 'series' },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      smooth: true,
      lineStyle: { width: 0 },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(0, 221, 255)' },
          { offset: 1, color: 'rgb(77, 119, 255)' }
        ])
      },
      emphasis: { focus: 'series' },
      data: [120, 282, 111, 234, 220, 340, 310],
      markPoint: {
        data: [{ name: '周最低', value: 282, xAxis: 'Tue', yAxis: 282 }]
      }
    },
    {
      name: 'Line 3',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120],
      markPoint: {
        data: [{ name: '周最低', value: 134, xAxis: 'Thu', yAxis: 134 }]
      }
    },
    {
      name: 'Line 5',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(255, 191, 0)' },
          { offset: 1, color: 'rgb(224, 62, 76)' }
        ])
      },
      emphasis: { focus: 'series' },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
}

const myChart = ref()

function change() {
  option.series[0].data = [
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000),
    Math.round(Math.random() * 1000)
  ]

  myChart.value.setOption(option)
}

onMounted(() => {
  const chartDom = document.getElementById('echarts-demo1')
  myChart.value = echarts.init(chartDom)
  myChart.value.setOption(option)
})
</script>

<template>
  <el-card>
    <div id="echarts-demo1" style="height: 400px" />
    <el-button @click="() => change()">更新数据</el-button>
  </el-card>
</template>

<style scoped lang="scss"></style>
