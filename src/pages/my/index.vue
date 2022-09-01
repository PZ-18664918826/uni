<template>
  <view class="z-66 relative h-full bg-bgColor px-32rpx">
    <nav-bar
      :is-fixed="false"
      :show-arrow-left="false"
      left-text-style="text-white"
      left-text="我的"
      bg-color="transparent"
    ></nav-bar>
    <my-header />
    <my-manager />
    <tab-bar />
  </view>
</template>

<script>
import MyHeader from './components/MyHeader';
import MyManager from './components/MyManager';

export default {
  components: {
    MyHeader,
    MyManager
  },
  data() {
    return {};
  },

  onShow() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
