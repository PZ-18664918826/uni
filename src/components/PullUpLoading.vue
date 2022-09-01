<template>
  <view>
    <view v-if="length && length > lengthDisplay" :class="bgColor" class="py-12rpx">
      <view>
        <u-loading-icon text="加载中" :show="isShowLoading" :vertical="true"></u-loading-icon>
      </view>
      <view
        v-if="current >= pages && !isShowLoading && length > lengthDisplay"
        class="h-100rpx flex-col flex-center text-hex-999 text-24rpx"
      >
        <view class="flex-y-center">
          <view class="w-100rpx h-1rpx bg-hex-999 mr-10rpx"></view>
          我也是有底线的
          <view class="w-100rpx h-1rpx bg-hex-999 ml-10rpx"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否显示加载
    isShowLoading: {
      type: Boolean,
      required: true
    },
    // 当前页
    current: {
      type: Number,
      required: true
    },
    // 总页数
    pages: {
      type: Number,
      required: true
    },
    // 数据长度
    length: {
      type: Number,
      required: true
    },
    // 大于多少条显示有底线
    lengthDisplay: {
      type: Number,
      required: true
    },
    bgColor: {
      type: String,
      default: 'bg-bgColor'
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
