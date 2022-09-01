<template>
  <view class="w-200rpx h-250rpx">
    <echarts ref="echarts" :option="option" canvas-id="echartsPie" />
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
      tooltip: {
        trigger: 'none'
      },
      series: [
        {
          type: 'pie',
          // 饼图的半径 内部40% 外圆半径100%
          radius: ['40%', '100%'],
          label: {
            show: false,
            position: 'center'
          },
          // 是否显示视觉引导线。
          labelLine: {
            show: false
          },
          emphasis: {
            disabled: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>
