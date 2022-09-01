<template>
  <view :style="{ height: height + 'rpx' }" class="w-full">
    <ucharts-loading :loading="loading" :empty="!chartData.series.length" class="wh-full">
      <canvas
        :id="canvasId"
        :canvas-id="canvasId"
        :style="{ height: height + 'rpx' }"
        class="w-750rpx"
        type="2d"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      />
    </ucharts-loading>
  </view>
</template>

<script>
import UCharts from './ucharts.js';

const uChartsInstance = {};
export default {
  props: {
    height: {
      type: Number,
      default: 500
    },
    chartData: {
      type: Object,
      default() {
        return {
          categories: [],
          series: []
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // id 不要有数字
    canvasId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cWidth: 750,
      cHeight: 0,
      id: '',
      pixelRatio: 2
    };
  },
  computed: {
    chartDataProps() {
      return JSON.parse(JSON.stringify(this.chartData));
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
  created() {
    this.id = this.canvasId;
  },
  mounted() {
    // 这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
    // 这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(this.height);
    this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
  },
  methods: {
    getServerData() {
      this.drawCharts(this.chartData);
    },
    drawCharts(data) {
      const { id } = this;
      const query = uni.createSelectorQuery().in(this);
      query
        .select(`#${id}`)
        .fields({ node: true, size: true })
        .exec(res => {
          if (res[0]) {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            canvas.width = res[0].width * this.pixelRatio;
            canvas.height = res[0].height * this.pixelRatio;
            uChartsInstance[id] = new UCharts({
              type: 'candle',
              context: ctx,
              width: this.cWidth * this.pixelRatio,
              height: this.cHeight * this.pixelRatio,
              categories: data.categories,
              series: data.series,
              pixelRatio: this.pixelRatio,
              animation: true,
              timing: 'easeOut',
              duration: 1000,
              rotate: false,
              rotateLock: false,
              background: '#FFFFFF',
              color: [
                '#1890FF',
                '#91CB74',
                '#FAC858',
                '#EE6666',
                '#73C0DE',
                '#3CA272',
                '#FC8452',
                '#9A60B4',
                '#ea7ccc'
              ],
              padding: [16, 16, 0, 16],
              fontSize: 13,
              fontColor: '#666666',
              dataLabel: false,
              dataPointShape: true,
              dataPointShapeType: 'solid',
              touchMoveLimit: 60,
              enableScroll: true,
              enableMarkLine: true,
              legend: {
                show: true,
                position: 'bottom',
                float: 'center',
                padding: 5,
                margin: 5,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 0,
                fontSize: 13,
                fontColor: '#666666',
                lineHeight: 11,
                hiddenColor: '#CECECE',
                itemGap: 10
              },
              xAxis: {
                labelCount: 4,
                itemCount: 40,
                disableGrid: true,
                gridColor: '#CCCCCC',
                gridType: 'solid',
                dashLength: 4,
                scrollShow: true,
                scrollAlign: 'left',
                scrollColor: '#A6A6A6',
                scrollBackgroundColor: '#EFEBEF',
                disabled: false,
                axisLine: true,
                axisLineColor: '#CCCCCC',
                calibration: false,
                fontColor: '#666666',
                fontSize: 13,
                rotateLabel: false,
                rotateAngle: 45,
                boundaryGap: 'center',
                splitNumber: 5,
                gridEval: 1,
                formatter: ''
              },
              yAxis: {
                disabled: false,
                disableGrid: false,
                splitNumber: 5,
                gridType: 'solid',
                dashLength: 8,
                gridColor: '#CCCCCC',
                padding: 10,
                showTitle: false,
                data: []
              },
              extra: {
                candle: {
                  color: {
                    upLine: '#f04864',
                    upFill: '#f04864',
                    downLine: '#2fc25b',
                    downFill: '#2fc25b'
                  },
                  average: {
                    show: true,
                    name: ['MA5', 'MA10', 'MA30'],
                    day: [5, 10, 20],
                    color: ['#1890ff', '#2fc25b', '#facc14']
                  }
                },
                markLine: {
                  type: 'dash',
                  dashLength: 5,
                  data: [
                    {
                      value: 2150,
                      lineColor: '#f04864',
                      showLabel: true
                    },
                    {
                      value: 2350,
                      lineColor: '#f04864',
                      showLabel: true
                    }
                  ]
                },
                tooltip: {
                  showBox: true,
                  showArrow: true,
                  showCategory: false,
                  borderWidth: 0,
                  borderRadius: 0,
                  borderColor: '#000000',
                  borderOpacity: 0.7,
                  bgColor: '#000000',
                  bgOpacity: 0.7,
                  gridType: 'solid',
                  dashLength: 4,
                  gridColor: '#CCCCCC',
                  fontColor: '#FFFFFF',
                  splitLine: true,
                  horizentalLine: true,
                  xAxisLabel: false,
                  yAxisLabel: true,
                  labelBgColor: '#FFFFFF',
                  labelBgOpacity: 0.7,
                  labelFontColor: '#666666'
                }
              }
            });
          }
        });
    },
    touchstart(e) {
      uChartsInstance[this.id].scrollStart(e);
    },
    touchmove(e) {
      uChartsInstance[this.id].scroll(e);
    },
    touchend(e) {
      uChartsInstance[this.id].scrollEnd(e);
      uChartsInstance[this.id].touchLegend(e);
      uChartsInstance[this.id].showToolTip(e);
    },
    // 更新配置
    updateCharts(data) {
      uChartsInstance[this.id].updateData({
        categories: data.categories,
        series: data.series
      });
    }
  }
};
</script>

<style scoped></style>
