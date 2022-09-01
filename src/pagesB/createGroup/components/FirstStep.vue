<template>
  <view>
    <view class="flex-center mt-194rpx text-40rpx text-hex-333 font-bold">请你取一个新组合的名称</view>
    <view class="parentInput mt-64rpx px-80rpx">
      <u-input
        v-model="groupName"
        placeholder="组合名称不得超过10个字"
        placeholder-class="uni-input-placeholder"
        border="bottom"
        clearable
        @blur="blurInput"
      ></u-input>
      <view v-show="!isTrue" class="text-red-550">组合名称不得超过10个字</view>
    </view>
  </view>
</template>

<script>
import { REGEXP_GROUP } from '@/utils/common/rules';

export default {
  options: {
    styleIsolation: 'shared' //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
  },
  data() {
    return {
      groupName: '',
      isTrue: true
    };
  },
  methods: {
    blurInput(e) {
      this.isTrue = REGEXP_GROUP.test(e);
      if (this.isTrue) {
        this.$emit('finishGroupName', e);
        this.active = 1;
      }
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .parentInput .u-input {
  border-bottom: 1px solid #e3e3e3;
  height: 58rpx;
}

/deep/ .parentInput .uni-input-placeholder {
  display: flex;
  justify-content: center;
}
</style>
