<template>
  <view>
    <view class="absolute-lt w-full h-405rpx z-1">
      <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-head.png" class="wh-full" />
    </view>
    <view class="z-2 relative w-full" :style="{ marginTop: spaceHeight + 'rpx' }">
      <view class="h-230rpx">
        <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-Ai.png" class="wh-full" />
      </view>
    </view>
    <view class="mt-16rpx p-24rpx rounded-8rpx" style="background: white">
      <view class="flex">
        <view class="relative w-300rpx h-400rpx z-1">
          <image
            src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-group.png"
            class="wh-full"
            @click="createGroup"
          />
          <!-- <wx-phone @success="handleSuccess" /> -->
        </view>

        <view class="ml-16rpx flex flex-col">
          <view class="w-314rpx h-188rpx z-1">
            <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-investigate.png" class="wh-full" />
          </view>
          <view class="w-314rpx h-188rpx mt-24rpx z-1">
            <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-complain.png" class="wh-full" />
          </view>
        </view>
      </view>
    </view>
    <group-popup :show-popup="showPopup" @cancel="showPopup = false" @confirm="confirm" />
  </view>
</template>

<script>
import WxPhone from '@/components/WxPhone';
import { toCreateGroup } from '@/hooks/useRouterPush.js';
import GroupPopup from './GroupPopup';

export default {
  components: {
    GroupPopup,
    WxPhone
  },
  props: {
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showPopup: false
    };
  },
  computed: {
    spaceHeight() {
      return `${312 - this.height * 2}`;
    }
  },
  options: {
    styleIsolation: 'shared' //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
  },

  methods: {
    toCreateGroup,
    createGroup() {
      this.showPopup = true;
    },
    confirm() {
      this.showPopup = false;
      this.toCreateGroup();
    },
    handleSuccess() {}
  }
};
</script>

<style scoped lang="scss">
.parentButton {
  width: 100%;
  height: 100%;
}
/deep/ .parentButton .u-button {
  width: 100%;
  height: 100% !important;
}
</style>
