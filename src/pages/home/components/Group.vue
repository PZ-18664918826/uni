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

            <view class="flex justify-start ml-40rpx h-146rpx">
              <!-- #ifdef MP-WEIXIN -->
              <ucharts-area
                :height="146"
                :width="226"
                :loading="loading"
                :is-show-tool-tip="false"
                canvas-id="uchartsArea"
                :color="['#F80000']"
                :chart-data="chartDataArea"
              />
              <!-- #endif -->
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

            <view class="flex justify-start ml-40rpx h-146rpx">
              <!-- #ifdef MP-WEIXIN -->
              <ucharts-area
                :height="146"
                :width="226"
                :loading="loading"
                :is-show-tool-tip="false"
                canvas-id="uchartsArea"
                :color="['#1A916D']"
                :chart-data="chartDataArea"
              />
              <!-- #endif -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UchartsArea from '@/components/ucharts/UchartsArea';

export default {
  components: { UchartsArea },
  data() {
    return {
      stockSelected: true,
      fundSelected: false,
      isRise: true,
      isDrop: false,
      loading: false,
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
  onReady() {
    this.loading = true;
  },
  methods: {
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
</style>
