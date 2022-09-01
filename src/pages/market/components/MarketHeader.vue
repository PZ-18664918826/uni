<template>
  <view>
    <view class="z-9 relative h-336rpx px-24rpx mt-32rpx bg-white rounded-16rpx">
      <view class="flex-y-center justify-between h-100rpx text-hex-333">
        <text class="text-32rpx font-bold">市场总览</text>
        <text class="text-24rpx">活跃度20.37%</text>
      </view>
      <view class="flex">
        <view v-for="item in 3" :key="item">
          <view class="relative w-200rpx h-120rpx mr-13rpx">
            <view class="absolute-lt wh-full">
              <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/market-rise.png" class="wh-full" />
              <!-- <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/market-drop.png" class="wh-full" /> -->
            </view>
            <view class="relative z-1 h-full flex flex-col justify-around">
              <view class="flex-x-center mt-6rpx text-28rpx font-bold">上证指数</view>
              <view class="flex-x-center text-32rpx text-hex-FF0000">3007.95</view>
              <view class="flex-x-center mb-6rpx text-20rpx text-hex-FF0000">+23.28 +0.78%</view>
            </view>
          </view>
        </view>
      </view>
      <view class="mt-35rpx">
        <u-line-progress
          height="4"
          :percentage="30"
          active-color="#F54446"
          :show-text="false"
          inactive-color="#00B541"
        ></u-line-progress>
      </view>
      <view class="mt-16rpx flex-y-center justify-between text-20rpx">
        <view class="flex text-hex-F54446">
          <text>涨停2304家</text>
          <text class="ml-32rpx">涨2304家</text>
        </view>
        <view class="flex text-hex-00B541">
          <text>跌234家</text>
          <text class="ml-32rpx">跌停1466家</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
