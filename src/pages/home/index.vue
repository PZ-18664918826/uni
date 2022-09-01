<template>
  <view class="relative min-h-full bg-bgColor px-32rpx pb-50rpx">
    <nav-bar :show-left-slot="false" :is-fixed="false" bg-color="transparent" @getHeight="getHeight">
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
    <bg-image :height="navBarHeight" />
    <group />
    <tab-bar />
  </view>
</template>

<script>
import { toRegister, toTestUcharts } from '@/hooks/useRouterPush.js';
import BgImage from './components/BgImage';
import Group from './components/Group';

export default {
  components: {
    BgImage,
    Group
  },
  data() {
    return {
      navBarHeight: 0
    };
  },

  methods: {
    toRegister,
    toTestUcharts,
    getHeight(height) {
      this.navBarHeight = height;
    }
  }
};
</script>

<style scoped lang="scss"></style>
