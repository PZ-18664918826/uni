<template>
  <view>
    <view class="relative z-9 mt-37rpx rounded-16rpx">
      <view class="relative flex-y-center h-107rpx px-24rpx">
        <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-gray.png" class="absolute-lt wh-full" />
        <view class="z-10 flex-y-center justify-between w-full">
          <image
            src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/vip-member.png"
            class="w-136rpx h-60rpx"
          />
          <view class="text-white text-24rpx">您的VIP在2022-10-15到期</view>
          <image
            src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/user-renew.png"
            class="w-150rpx h-60rpx"
          />
        </view>
      </view>
      <view class="bg-white rounded-b-16rpx px-24rpx">
        <view class="flex-y-center h-106rpx text-black text-30rpx font-bold">我的服务</view>
        <view class="h-1px bg-hex-BBB"></view>
        <view class="flex flex-col">
          <view v-for="item in managerList" :key="item.id" class="h-106rpx flex-y-center justify-between">
            <view class="flex-y-center">
              <image :src="item.imgUrl" class="w-40rpx h-40rpx mr-24rpx" />
              {{ item.title }}
            </view>
            <view>
              <u-icon name="arrow-rightward" color="#E6E6E6"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const managerList = [
  { id: 0, title: '消息中心', imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/user-message.png' },
  { id: 1, title: '意见反馈', imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/user-opinion.png' },
  { id: 2, title: '隐私协议', imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/user-privacy.png' },
  { id: 3, title: '帮助中心', imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/user-help.png' }
];
export default {
  data() {
    return {
      managerList
    };
  }
};
</script>

<style scoped lang="scss"></style>
