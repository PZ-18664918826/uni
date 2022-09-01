<template>
  <view class="w-full h-400rpx">
    <echarts ref="echarts" :option="option" canvas-id="echartsBar" />
  </view>
</template>

<script>
import Echarts from '@/pagesA/components/echarts/echarts-uniapp/Echarts.vue';

export default {
  components: {
    Echarts
  },
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    this.option = {
      color: ['#207CEF'],

      tooltip: {
        // axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
        trigger: 'axis',
        axisPointer: {
          // 指示器类型 十字准星指示器
          type: 'cross'
        },
        // 是否将 tooltip 框限制在图表的区域内
        confine: true
      },
      // y轴左右距离  bottom距离每层网格之间的距离
      grid: {
        top: 10,
        left: 21,
        right: 17,
        bottom: '5%',
        // grid 区域是否包含坐标轴的刻度标签
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['2020Q1', '2020Q2', '2020Q3', '2020Q4', '2021Q1'],
          axisTick: {
            // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          // 'value' 数值轴，适用于连续数据。
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value} 亿元'
          },
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#F0F3F8'],
              width: 1,
              type: 'solid'
            }
          }
        }
      ],
      series: [
        {
          // 用于tooltip的显示
          name: '营业收入',
          type: 'bar',
          barWidth: '22',
          data: [960, 520, 280, 560, 890]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>
