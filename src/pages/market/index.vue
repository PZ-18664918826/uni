<template>
  <view class="min-h-full bg-bgColor px-32rpx">
    <nav-bar :show-left-slot="false" :is-fixed="false" bg-color="transparent">
      <template #left>
        <view class="w-370rpx h-56rpx">
          <u-search
            placeholder="请输入股票/基金代码"
            bg-color="#4E84FF"
            search-icon-color="#fff"
            placeholder-color="#fff"
            :disabled="true"
            :show-action="false"
            shape="round"
          ></u-search>
        </view>
      </template>
    </nav-bar>
    <view class="absolute-lt w-full h-305rpx z-1">
      <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/bg-market.png" class="wh-full" />
    </view>
    <market-header />
    <view class="mt-20rpx w-full h-112rpx">
      <image src="https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/open-vip.png" class="wh-full" />
    </view>
    <market-plate />
    <view class="mt-44rpx leading-40rpx text-26rpx text-gray-550">
      免责声明：数据资料、资讯信息主要来源于第三方，平台无法核实信息的真实性、准确性、完整性和原创性等，内容仅供用户参考，不代表平台观点，不构成任何投资建议，您自行承担因信赖或使用第三方信息而导致的任何损失。市场有风险，投资需谨慎。
      <text class="text-hex-3487EF">详情</text>
    </view>
    <tab-bar />
  </view>
</template>

<script>
import { toRegister } from '@/hooks/useRouterPush.js';
import MarketHeader from './components/MarketHeader';
import MarketPlate from './components/MarketPlate';

export default {
  components: {
    MarketHeader,
    MarketPlate
  },
  data() {
    return {
      navBarHeight: 1
    };
  },

  methods: {
    toRegister
  }
};
</script>

<style scoped lang="scss"></style>
