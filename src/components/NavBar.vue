<template>
  <view id="navbar" class="relative z-999">
    <u-navbar
      :title="title"
      :border="border"
      :right-text="rightText"
      :bg-color="bgColor"
      :title-style="titleStyle"
      :placeholder="isShowSpace"
      :fixed="isFixed"
      @rightClick="rightClick"
      @leftClick="goBack"
    >
      <view slot="left" :class="leftMargin">
        <slot name="left"></slot>
        <view v-if="showLeftSlot" class="flex-y-center">
          <u-icon v-if="showArrowLeft" name="arrow-left" size="20" :color="leftIconStyle"></u-icon>
          <view class="text-40rpx font-400 ml-10rpx" :class="leftTextStyle">{{ leftText }}</view>
          <u-icon v-if="showHome" name="home" size="20"></u-icon>
        </view>
      </view>
    </u-navbar>
  </view>
</template>

<script>
export default {
  props: {
    isFixed: {
      type: Boolean,
      default: true
    },
    showLeftSlot: {
      type: Boolean,
      default: true
    },
    leftMargin: {
      type: String,
      default: 'ml-32rpx'
    },
    // 是否显示占据的空间
    isShowSpace: {
      type: Boolean,
      default: true
    },
    leftIconStyle: {
      type: String,
      default: '#707070'
    },
    showArrowLeft: {
      type: Boolean,
      default: true
    },
    showHome: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    leftTextStyle: {
      type: String,
      default: 'text-hex-212121'
    },
    closeNavigateBack: {
      type: Boolean,
      default: false
    },
    titleStyle: {
      type: Object,
      default() {
        return { color: '#212121' };
      }
    }
  },
  data() {
    return {
      navbarHeight: 0
    };
  },

  options: {
    styleIsolation: 'shared' //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
  },

  mounted() {
    this.getNavBarHeight();
  },

  methods: {
    rightClick() {
      this.$emit('rightClick');
    },
    getNavBarHeight() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select('#navbar')
        .boundingClientRect(data => {
          if (data) {
            this.navbarHeight = Number(data.height);
            this.$emit('getHeight', this.navbarHeight);
          }
        })
        .exec();
    },
    goBack() {
      if (this.closeNavigateBack) {
        this.$emit('leftClick');
        return;
      }
      this.$Router.back(1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .u-navbar__content__left {
  padding: 0px;
}
</style>
