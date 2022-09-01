<template>
  <view>
    <u-popup :show="showPopup" mode="center" round="4">
      <view style="width: calc(100vw - 64px)">
        <view class="px-32rpx pt-48rpx pb-32rpx">
          <view class="flex justify-start">
            <view>
              <text class="text-38rpx text-hex-333 font-bold">{{ stockItem.name }}</text>
              <text class="ml-12rpx text-24rpx text-hex-999">{{ stockItem.code }}</text>
            </view>
          </view>
          <view class="parentInput flex-center my-90rpx">
            <view class="relative h-58rpx w-160rpx">
              <u-input v-model="inputValue" type="number" input-align="center" color="#333" border="bottom"></u-input>
              <text class="absolute-rb font-bold">{{ unit }}</text>
            </view>
          </view>
          <view class="pt-48rpx pb-24rpx flex">
            <view
              class="flex-1 h-80rpx flex-center border-1px border-solid border-hex-707070 rounded-8rpx mr-24rpx"
              @click="cancel"
            >
              <text class="text-hex-666 text-28rpx">取消</text>
            </view>
            <view class="flex-1 h-80rpx flex-center mr-24rpx bg-primary rounded-8rpx" @click="confirm">
              <text class="text-white text-28rpx">确定</text>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    stockItem: {
      type: Object,
      required: true
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    defaultInputValue: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: '%'
    }
  },
  data() {
    return {
      inputValue: 0
    };
  },
  watch: {
    showPopup() {
      this.inputValue = this.defaultInputValue;
    }
  },

  methods: {
    confirm() {
      this.$emit('confirm', Number(this.inputValue));
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped lang="scss"></style>
