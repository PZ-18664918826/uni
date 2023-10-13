<template>
  <view class="bg-white rounded-16rpx">
    <view class="mt-18rpx rounded-t-16rpx rounded-r-16rpx">
      <view class="flex text-32rpx">
        <view
          class="flex-1 flex-center h-84rpx"
          :class="[stockSelected ? 'selected' : 'unSelected']"
          @click="clickStock"
        >
          股票组合
        </view>
        <view :class="[fundSelected ? 'selected' : 'unSelected']" class="flex-1 flex-center h-84rpx" @click="clickFund">
          基金组合
        </view>
      </view>
      <view class="px-24rpx pb-24rpx">
        <view class="my-16rpx px-32rpx py-24rpx rounded-16rpx" :class="[isRise ? 'bgRed' : 'bgGreen']">
          <view class="flex-y-center">
            <view class="flex flex-col w-308rpx">
              <view class="flex h-60rpx">
                <view class="flex-y-center text-30rpx text-hex-333 font-bold">王小小的窝</view>
              </view>
              <view class="flex-y-center justify-between h-50rpx">
                <text class="text-36rpx" :class="[isRise ? 'text-red-550' : 'text-green-550']">-38.95%</text>
                <text
                  class="flex-y-center w-100rpx justify-start text-24rpx text-hex-666"
                  :class="[isRise ? 'text-red-550' : 'text-green-550']"
                >
                  -1.44%
                </text>
              </view>
              <view class="flex items-end justify-between h-36rpx">
                <text class="flex-y-center text-24rpx">成立以来涨跌幅</text>
                <text class="w-100rpx justify-start text-24rpx text-hex-666">日涨跌幅</text>
              </view>
            </view>

            <view class="flex justify-start ml-40rpx charts-box">
              <qiun-data-charts type="area" :opts="opts" :chart-data="chartData" />
            </view>
          </view>
        </view>
        <view class="my-16rpx px-32rpx py-24rpx rounded-16rpx" :class="[isDrop ? 'bgRed' : 'bgGreen']">
          <view class="flex-y-center">
            <view class="flex flex-col w-308rpx">
              <view class="flex h-60rpx">
                <view class="flex-y-center text-30rpx text-hex-333 font-bold">王小小的窝</view>
              </view>
              <view class="flex-y-center justify-between h-50rpx">
                <text class="text-36rpx" :class="[isDrop ? 'text-red-550' : 'text-green-550']">-38.95%</text>
                <text
                  class="flex-y-center w-100rpx justify-start text-24rpx text-hex-666"
                  :class="[isDrop ? 'text-red-550' : 'text-green-550']"
                >
                  -1.44%
                </text>
              </view>
              <view class="flex items-end justify-between h-36rpx">
                <text class="flex-y-center text-24rpx">成立以来涨跌幅</text>
                <text class="w-100rpx justify-start text-24rpx text-hex-666">日涨跌幅</text>
              </view>
            </view>

            <view class="flex justify-start ml-40rpx charts-box">
              <qiun-data-charts type="area" :opts="opts" :chart-data="chartData" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      stockSelected: true,
      fundSelected: false,
      isRise: true,
      isDrop: false,
      loading: false,
      chartData: {},
      opts: {
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
      },
      chartDataArea: {
        categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
        series: [
          {
            name: '成交量A',
            data: [35, 8, 25, 37, 4, 20]
          }
        ]
      }
    };
  },
  created() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        const res = {
          categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
          series: [
            {
              name: '成交量A',
              data: [35, 8, 25, 37, 4, 20]
            },
            {
              name: '成交量B',
              data: [70, 40, 65, 100, 44, 68]
            },
            {
              name: '成交量C',
              data: [100, 80, 95, 150, 112, 132]
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    clickStock() {
      this.stockSelected = true;
      this.fundSelected = false;
    },
    clickFund() {
      this.fundSelected = true;
      this.stockSelected = false;
    }
  }
};
</script>

<style scoped lang="scss">
.selected {
  border-radius: 16rpx 16rpx 0 0;
  background-color: white;
  color: #3487ef;
}
.unSelected {
  border-radius: 0 16rpx 0 16rpx;
  background-color: #e4e3e3;
  color: #333;
}
.bgRed {
  background: linear-gradient(88deg, #fff3f3 0%, #ffffff 40%, #ffffff 85%, #ffffff 85%, #ffffff 100%);
  box-shadow: 1px 1px 1px 1px rgba(136, 136, 136, 0.16);
}
.bgGreen {
  background: linear-gradient(88deg, #effaf5 0%, #feffff 32%, #ffffff 100%);
  box-shadow: 1px 1px 1px 1px rgba(136, 136, 136, 0.16);
  border: 1px solid #e3e3e3;
}

.charts-box {
  width: 200rpx;
  height: 146rpx;
}
</style>
