<template>
  <view>
    <view class="absolute-lt w-full h-450rpx z-1">
      <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-user.png" class="wh-full" />
    </view>
    <view class="relative z-2 flex h-147rpx mt-50rpx rounded-16rpx px-32rpx">
      <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-info.png" class="absolute-lt wh-full" />
      <view class="relative mr-21rpx -mt-24rpx w-150rpx h-150rpx">
        <image src="@/static/login/wechat.png" class="wh-full rounded-full" />
        <image
          src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/vip-sign.png"
          class="absolute-rb w-48rpx h-48rpx"
        />
      </view>
      <view class="flex flex-col mt-24rpx text-hex-333">
        <text class="z-9 text-32rpx font-bold">法外狂徒张三</text>
        <!-- <view class="mt-24rpx text-24rpx">普通用户</view> -->
        <view class="z-9 w-130rpx h-40rpx mt-24rpx">
          <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/vip-user.png" class="wh-full" />
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
