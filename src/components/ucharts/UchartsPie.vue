<template>
  <view :style="{ height: height + 'rpx', width: width + 'rpx' }">
    <ucharts-loading :loading="loading" :empty="!chartData.series.length" class="wh-full">
      <canvas
        v-if="chartData.series.length"
        :id="canvasId"
        :canvas-id="canvasId"
        :style="{ height: height + 'rpx', width: width + 'rpx' }"
        type="2d"
        @touchend="tap"
      />
    </ucharts-loading>
  </view>
</template>

<script>
import UCharts from './ucharts.js';

const uChartsInstance = {};
export default {
  props: {
    width: {
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 250
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
      cWidth: 0,
      cHeight: 0,
      pixelRatio: 2,
      id: ''
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
              type: 'ring',
              context: ctx,
              width: this.cWidth * this.pixelRatio,
              height: this.cHeight * this.pixelRatio,
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
              padding: [0, 0, 0, 0],
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
                position: 'right',
                lineHeight: 25,
                float: 'center',
                padding: 5,
                margin: 5,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 0,
                fontSize: 13,
                fontColor: '#666666',
                hiddenColor: '#CECECE',
                itemGap: 10
              },
              title: {
                name: '',
                fontSize: 15,
                color: '#666666',
                offsetX: 0,
                offsetY: 0
              },
              subtitle: {
                name: '',
                fontSize: 25,
                color: '#7cb5ec',
                offsetX: 0,
                offsetY: 0
              },
              extra: {
                ring: {
                  ringWidth: 30,
                  activeOpacity: 0.5,
                  activeRadius: 0,
                  offsetAngle: 0,
                  labelWidth: 15,
                  border: false,
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                  centerColor: '#FFFFFF',
                  customRadius: 0,
                  linearType: 'none'
                },
                tooltip: {
                  showBox: false,
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
                  horizentalLine: false,
                  xAxisLabel: false,
                  yAxisLabel: false,
                  labelBgColor: '#FFFFFF',
                  labelBgOpacity: 0.7,
                  labelFontColor: '#666666'
                }
              }
            });
          }
        });
    },
    tap(e) {
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
