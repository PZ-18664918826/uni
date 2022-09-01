<template>
  <view :style="{ height: height + 'rpx' }" class="w-full">
    <ucharts-loading :loading="loading" :empty="isEmpty" class="wh-full">
      <echarts ref="echarts" :option="option" :canvas-id="canvasId" />
    </ucharts-loading>
  </view>
</template>

<script>
import Echarts from '@/pagesA/components/echarts/echarts-uniapp/Echarts.vue';

export default {
  components: {
    Echarts
  },
  props: {
    height: {
      type: Number,
      default: 500
    },
    loading: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Object,
      default() {
        return {
          dateList: [],
          series: []
        };
      }
    },
    canvasId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {}
    };
  },
  computed: {
    isEmpty() {
      const { series } = this.chartData;
      let bool = true;
      if (series && series.length) {
        bool = series.every(v => !v.data.length);
      }
      return bool;
    }
  },
  watch: {
    loading: {
      handler(val) {
        if (!val) {
          this.getServerData();
        }
      },
      immediate: true
    }
  },
  methods: {
    getServerData() {
      const { dateList, series } = this.chartData;
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 指示器类型 十字准星指示器
            type: 'cross'
          },
          // 是否将 tooltip 框限制在图表的区域内
          confine: true
        },
        grid: {
          top: '5%',
          left: '4%',
          right: '5%',
          bottom: '5%',
          // grid 区域是否包含坐标轴的刻度标签
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: dateList
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value} %'
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
        },
        series
      };
    }
  }
};
</script>

<style scoped lang="scss"></style>
