<template>
  <view>
    <view class="mt-20rpx">
      <view class="px-24rpx bg-white rounded-16rpx">
        <view class="flex-y-center py-32rpx justify-between">
          <view class="text-32rpx font-bold">行业板块</view>
          <view>
            <u-icon name="arrow-rightward" color="#333"></u-icon>
          </view>
        </view>
        <view class="flex flex-wrap justify-around">
          <view
            v-for="item in 6"
            :key="item"
            class="flex-center flex-col justify-around mb-20rpx w-200rpx h-223rpx rounded-16rpx border-1px border-solid border-hex-BEBEBE"
          >
            <view class="text-32rpx text-black">同力日升</view>
            <view class="text-36rpx text-hex-F94358">+29.34%</view>
            <view class="text-20rpx text-black">
              曙光初现
              <text class="text-hex-F94358">-22.65%</text>
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
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
