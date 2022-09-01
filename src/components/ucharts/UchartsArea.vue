<template>
  <view :style="{ height: height + 'rpx' }" class="w-full">
    <ucharts-loading :loading="false" :empty="!chartData.series.length" class="wh-full">
      <canvas
        v-if="chartData.series.length"
        :id="canvasId"
        :style="{ height: height + 'rpx', width: width + 'rpx' }"
        :canvas-id="canvasId"
        type="2d"
        @touchend="tap"
      />
    </ucharts-loading>
  </view>
</template>

<script>
import UCharts from './ucharts';

const uChartsInstance = {};
export default {
  props: {
    isShowToolTip: {
      type: Boolean,
      default: true
    },
    color: {
      type: Array,
      default() {
        return ['#F80000', '#1A916D', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];
      }
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 750
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
    // id 不要有数字
    canvasId: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      cWidth: 750,
      cHeight: 0,
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
          this.id = this.canvasId;
          this.getServerData();
        }
      },
      immediate: true
    }
  },

  mounted() {
    // 这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(this.width);
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
              type: 'area',
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
              color: this.color,
              padding: [0, 0, 0, 0],
              fontSize: 13,
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
                disabled: true,
                axisLine: false,
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
                gridType: 'dash',
                dashLength: 2,
                disabled: true,
                disableGrid: true,
                splitNumber: 5,
                gridColor: '#CCCCCC',
                padding: 10,
                showTitle: false,
                data: [
                  {
                    type: 'value',
                    position: 'left',
                    disabled: false,
                    axisLine: true,
                    axisLineColor: '#CCCCCC',
                    calibration: false,
                    fontColor: '#666666',
                    fontSize: 13,
                    textAlign: 'right',
                    title: '',
                    titleFontSize: 13,
                    titleOffsetY: 0,
                    titleOffsetX: 0,
                    titleFontColor: '#666666',
                    min: null,
                    max: null,
                    tofix: null,
                    unit: '',
                    formatter: ''
                  }
                ]
              },
              extra: {
                area: {
                  type: 'straight',
                  opacity: 0.2,
                  addLine: true,
                  width: 2,
                  gradient: true
                },
                tooltip: {
                  showBox: false,
                  showArrow: false,
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
                  horizentalLine: false,
                  xAxisLabel: false,
                  yAxisLabel: false,
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
          } else {
            // eslint-disable-next-line no-console
            console.error('[uCharts]: 未获取到 context');
          }
        });
    },
    tap(e) {
      if (!this.isShowToolTip) return;
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
</script>

<style scoped>
.charts {
  width: 228rpx;
  height: 130rpx;
}
</style>
