<template>
  <view :style="{ height: height + 'rpx' }" class="w-full">
    <ucharts-loading :loading="loading" :empty="!chartData.series.length" class="wh-full">
      <canvas
        v-if="chartData.series.length"
        :id="canvasId"
        class="w-750rpx"
        :style="{ height: height + 'rpx' }"
        :canvas-id="canvasId"
        type="2d"
        @touchstart="touchStart"
        @touchend="tap"
        @touchmove="touchMove"
      />
    </ucharts-loading>
  </view>
</template>

<script>
import UCharts from './ucharts.js';

const uChartsInstance = {};

export default {
  props: {
    columnWidth: {
      type: Number,
      default: 30
    },
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
      id: '',
      cWidth: 750,
      cHeight: 0,
      pixelRatio: 2,
      lastMoveTime: null
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
              type: 'column',
              context: ctx,
              width: this.cWidth * this.pixelRatio,
              height: this.cHeight * this.pixelRatio,
              categories: data.categories,
              series: data.series,
              animation: true,
              pixelRatio: this.pixelRatio,
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
              enableScroll: false,
              enableMarkLine: false,
              legend: {
                show: false,
                position: 'bottom',
                float: 'center',
                padding: 5,
                margin: 5,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 0,
                fontSize: 12,
                fontColor: '#666666',
                lineHeight: 11,
                hiddenColor: '#CECECE',
                itemGap: 10
              },
              xAxis: {
                disableGrid: true,
                disabled: false,
                axisLine: true,
                axisLineColor: '#CCCCCC',
                calibration: false,
                fontColor: '#666666',
                fontSize: 13,
                rotateLabel: false,
                rotateAngle: 45,
                itemCount: 5,
                boundaryGap: 'center',
                splitNumber: 5,
                gridColor: '#CCCCCC',
                gridType: 'solid',
                dashLength: 4,
                gridEval: 1,
                scrollShow: false,
                scrollAlign: 'left',
                scrollColor: '#A6A6A6',
                scrollBackgroundColor: '#EFEBEF',
                formatter: ''
              },
              yAxis: {
                data: [
                  {
                    min: 0,
                    unit: '亿'
                  }
                ],
                disabled: false,
                disableGrid: false,
                splitNumber: 5,
                gridType: 'solid',
                dashLength: 8,
                gridColor: '#F0F3F8',
                padding: 10,
                showTitle: false
              },
              extra: {
                column: {
                  type: 'group',
                  width: this.columnWidth,
                  activeBgColor: '#000000',
                  activeBgOpacity: 0,
                  seriesGap: 2,
                  categoryGap: 3,
                  barBorderCircle: false,
                  linearType: 'none',
                  linearOpacity: 1,
                  colorStop: 0,
                  meterBorder: 1,
                  meterFillColor: '#FFFFFF'
                },
                tooltip: {
                  showBox: true,
                  showArrow: true,
                  showCategory: true,
                  borderWidth: 0,
                  borderRadius: 4,
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
                  xAxisLabel: true,
                  yAxisLabel: true,
                  labelBgColor: '#FFFFFF',
                  labelBgOpacity: 0.7,
                  labelFontColor: '#666666'
                },
                markLine: {
                  type: 'solid',
                  dashLength: 4,
                  data: []
                }
              }
            });
          }
        });
    },

    tap(e) {
      uChartsInstance[this.id].touchLegend(e);
      this.showToolTip(e);
    },
    // 更新配置
    updateCharts(data) {
      uChartsInstance[this.id].updateData({
        categories: data.categories,
        series: data.series
      });
    },
    showToolTip(e) {
      uChartsInstance[this.id].showToolTip(e, {
        formatter: item => {
          return `${item.name}：${item.data}亿`;
        }
      });
    },
    touchStart() {
      this.lastMoveTime = Date.now();
    },
    touchMove(e) {
      const currMoveTime = Date.now();
      const duration = currMoveTime - this.lastMoveTime;
      const touchMoveLimit = 24;
      if (duration < Math.floor(1000 / touchMoveLimit)) return; // 每秒24帧
      this.lastMoveTime = currMoveTime;
      this.showToolTip(e);
    }
  }
};
</script>

<style scoped></style>
