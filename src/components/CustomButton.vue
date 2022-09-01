<template>
  <view class="flex-1 flex">
    <view
      v-for="(button, buttIndex) in buttonList"
      :key="buttIndex"
      class="parentButton flex-1"
      :class="[buttIndex === buttonList.length - 1 ? '' : 'mr-40rpx']"
    >
      <view
        class="h-80rpx flex-center rounded-16rpx"
        :style="{ backgroundColor: button.background, border: button.border }"
        @click="handleOrder(button.title)"
      >
        <text class="text-28rpx text-hex-666">{{ button.title }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    buttonList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleOrder(title) {
      this.$emit('handleOrder', title);
    }
  }
};
</script>

<style scoped lang="scss"></style>
