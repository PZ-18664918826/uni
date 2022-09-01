<template>
  <view>
    <view class="flex flex-col">
      <view v-for="item in typeList" :key="item.id" @click="handleCheck(item.id)">
        <view class="flex-y-center justify-between">
          <view class="flex-y-center">
            <image :src="item.imgUrl" class="w-46rpx h-46rpx" />
            <text class="text-primary ml-16rpx">{{ item.title }}</text>
          </view>
          <view v-show="item.isCheck">
            <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/right.png" class="w-35rpx h-35rpx" />
          </view>
        </view>
        <view class="h-1px bg-hex-E3E3E3 mt-12rpx mb-70rpx"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    typeList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      this.$emit('handleCheck', id);
    }
  }
};
</script>

<style scoped lang="scss"></style>
