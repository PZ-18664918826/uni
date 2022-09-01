<template>
  <u-popup :show="showPopup" mode="center" round="4">
    <view class="px-32rpx" style="width: calc(100vw - 63px)">
      <view class="py-32rpx flex-center">
        <text class="text-32rpx text-hex-333 font-500">{{ title }}</text>
      </view>
      <view class="flex-center">
        <text class="text-26rpx text-hex-333">{{ content }}</text>
      </view>
      <view class="pt-48rpx pb-24rpx flex">
        <view
          class="flex-1 h-80rpx flex-center border-1px border-solid border-hex-707070 rounded-8rpx mr-24rpx"
          @click="cancel"
        >
          <text class="text-hex-666 text-28rpx">{{ cancelText }}</text>
        </view>
        <view class="flex-1 h-80rpx flex-center mr-24rpx rounded-8rpx" :class="conFirmClass" @click="confirm">
          <text class="text-28rpx">{{ confirmText }}</text>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      required: true
    },
    conFirmClass: {
      type: Array,
      default: () => {
        return ['bg-primary', 'text-white'];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped lang="scss"></style>
