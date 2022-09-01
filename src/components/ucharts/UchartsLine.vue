<template>
  <view :style="{ height: height + 'rpx' }" class="w-full">
    <ucharts-loading :loading="loading" :empty="!chartData.series.length" class="wh-full">
      <canvas
        v-if="chartData.series.length"
        :id="canvasId"
        :canvas-id="canvasId"
        type="2d"
        :style="{ height: height + 'rpx' }"
        class="w-full"
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
    // // 这里的 750 对应 css .charts 的 width
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
              type: 'line',
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
              padding: [16, 36, 0, 16],
              fontSize: 12,
              fontColor: '#666666',
              dataLabel: false,
              dataPointShape: false,
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
                fontSize: 13,
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
                labelCount: 1,
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
                gridType: 'dash',
                dashLength: 2,
                disabled: false,
                disableGrid: false,
                splitNumber: 4,
                gridColor: '#F0F3F8',
                padding: 10,
                showTitle: false,
                data: [{ unit: '%', max: 450, min: -150 }]
              },
              extra: {
                line: {
                  type: 'straight',
                  width: 2
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
                  gridColor: '#cccccc',
                  fontColor: '#FFFFFF',
                  splitLine: true,
                  horizentalLine: true,
                  xAxisLabel: false,
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
          return `${item.name}：${item.data}%`;
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
